/**
 * 触发引擎
 * 监听触发源，分发到对应的 skill
 */

const fs = require('fs');
const path = require('path');
const CooldownGuard = require('./cooldown-guard');

class TriggerEngine {
  /**
   * @param {object} config - 配置对象
   * @param {CooldownGuard} cooldownGuard - 冷却守护实例
   */
  constructor(config, cooldownGuard) {
    this.config = config;
    this.cooldownGuard = cooldownGuard;
    this.skillRunner = null; // 由外部注入
    this.watchers = {};
    this.isRunning = false;
  }

  /**
   * 设置 SkillRunner
   * @param {object} runner - SkillRunner 实例
   */
  setSkillRunner(runner) {
    this.skillRunner = runner;
  }

  /**
   * 启动所有监听器
   */
  start() {
    if (this.isRunning) {
      return;
    }

    // 加载冷却状态
    const statePath = path.join(
      this.config.pluginPath,
      '.claude/cooldown-state.json'
    );
    this.cooldownGuard.load(statePath);

    // 启动各类型监听器
    this._startFileChangeWatchers();
    this._startLifecycleHooks();

    this.isRunning = true;
  }

  /**
   * 停止所有监听器
   */
  stop() {
    if (!this.isRunning) {
      return;
    }

    // 停止文件监听
    Object.values(this.watchers).forEach(watcher => {
      if (watcher && watcher.close) {
        watcher.close();
      }
    });
    this.watchers = {};

    // 保存冷却状态
    const statePath = path.join(
      this.config.pluginPath,
      '.claude/cooldown-state.json'
    );
    this.cooldownGuard.save(statePath);

    this.isRunning = false;
  }

  /**
   * 分发触发事件
   * @param {string} triggerType - 触发类型
   * @param {object} context - 触发上下文
   */
  async dispatch(triggerType, context) {
    if (!this.skillRunner) {
      throw new TriggerError('SkillRunner not set');
    }

    // 查找匹配的 binding
    const bindings = this.config.ruleBindings.bindings.filter(
      b => b.trigger === triggerType
    );

    for (const binding of bindings) {
      // 检查冷却
      const filePath = context.filePath || context.projectPath;
      if (!this.cooldownGuard.canTrigger(filePath, binding.skill)) {
        continue; // 冷却中，跳过
      }

      // 记录触发
      this.cooldownGuard.recordTrigger(
        filePath,
        binding.skill,
        binding.cooldown_seconds
      );

      // 执行 skill
      try {
        await this.skillRunner.execute(binding.skill, {
          ...context,
          triggerType: triggerType,
          binding: binding
        });
      } catch (e) {
        // 记录错误，继续下一个
        console.error(`Skill ${binding.skill} execution failed:`, e.message);
      }
    }
  }

  /**
   * 启动文件变更监听器
   * @private
   */
  _startFileChangeWatchers() {
    const fileChangeBindings = this.config.ruleBindings.bindings.filter(
      b => b.trigger === 'file-change'
    );

    fileChangeBindings.forEach(binding => {
      const watchPaths = binding.watch_paths || [];
      const ignorePatterns = binding.ignore_patterns || [];

      // 为每个 watch_path 创建监听
      watchPaths.forEach(watchPath => {
        const fullPath = path.join(this.config.pluginPath, '..', watchPath);
        if (!fs.existsSync(fullPath)) {
          return;
        }

        // 创建简单的轮询监听器（生产环境应使用 chokidar）
        const watcher = this._createPollingWatcher(
          fullPath,
          ignorePatterns,
          (filePath) => {
            this.dispatch('file-change', {
              filePath: filePath,
              binding: binding
            });
          }
        );

        this.watchers[`${binding.skill}:${watchPath}`] = watcher;
      });
    });
  }

  /**
   * 启动 lifecycle hooks
   * @private
   */
  _startLifecycleHooks() {
    // lifecycle hooks 由 Claude Code 外部触发
    // 这里只定义接口，实际触发由 Claude Code 调用
  }

  /**
   * 创建轮询监听器
   * @private
   */
  _createPollingWatcher(watchPath, ignorePatterns, callback) {
    const INTERVAL = 1000; // 1 秒轮询间隔
    const fileStates = {}; // 文件路径 -> 上次修改时间

    // 初始化文件状态
    const initFiles = () => {
      if (!fs.existsSync(watchPath)) return;

      const files = this._listFiles(watchPath, ignorePatterns);
      files.forEach(file => {
        try {
          const stat = fs.statSync(file);
          fileStates[file] = stat.mtimeMs;
        } catch (e) {
          // 忽略
        }
      });
    };

    // 轮询检查
    const poll = () => {
      if (!this.isRunning || !fs.existsSync(watchPath)) return;

      const files = this._listFiles(watchPath, ignorePatterns);

      files.forEach(file => {
        try {
          const stat = fs.statSync(file);
          const prevMtime = fileStates[file];

          if (!prevMtime || stat.mtimeMs > prevMtime) {
            // 文件已变更
            fileStates[file] = stat.mtimeMs;
            callback(file);
          }
        } catch (e) {
          // 文件可能已删除
          delete fileStates[file];
        }
      });
    };

    // 启动监听
    initFiles();
    const timerId = setInterval(poll, INTERVAL);

    return {
      close: () => clearInterval(timerId),
      path: watchPath
    };
  }

  /**
   * 列出目录下所有文件
   * @private
   */
  _listFiles(dir, ignorePatterns) {
    const results = [];

    if (!fs.existsSync(dir)) return results;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);

      // 检查忽略模式
      const shouldIgnore = ignorePatterns.some(pattern => {
        return fullPath.includes(pattern.replace('*', ''));
      });

      if (shouldIgnore) return;

      if (item.isDirectory()) {
        results.push(...this._listFiles(fullPath, ignorePatterns));
      } else if (item.isFile()) {
        results.push(fullPath);
      }
    });

    return results;
  }

  /**
   * 外部触发接口
   * @param {string} event - lifecycle 事件名
   * @param {object} context - 触发上下文
   */
  async triggerLifecycle(event, context) {
    await this.dispatch('lifecycle', {
      ...context,
      event: event
    });
  }
}

class TriggerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TriggerError';
  }
}

module.exports = TriggerEngine;
module.exports.TriggerError = TriggerError;