/**
 * Skill 执行器
 * 执行 skill，管理执行流程
 */

const fs = require('fs');
const path = require('path');
const ContextManager = require('./context-manager');

class SkillRunner {
  /**
   * @param {ContextManager} contextManager - 上下文管理器
   * @param {object} ruleBindings - rule-binding.json 内容
   */
  constructor(contextManager, ruleBindings) {
    this.contextManager = contextManager;
    this.ruleBindings = ruleBindings;
    this.pluginPath = null; // 由外部设置
  }

  /**
   * 设置插件路径
   * @param {string} pluginPath - 插件根目录
   */
  setPluginPath(pluginPath) {
    this.pluginPath = pluginPath;
  }

  /**
   * 执行 skill
   * @param {string} skillName - Skill 名称
   * @param {object} inputContext - 输入上下文
   * @returns {object} - 执行结果
   */
  async execute(skillName, inputContext) {
    // 创建上下文
    const contextId = this.contextManager.createContext(skillName, inputContext);
    this.contextManager.updateState(contextId, 'running');

    try {
      // 1. 加载 skill 定义
      const skillDef = this._loadSkillDefinition(skillName);

      // 2. 获取关联规则
      const rules = this._getAppliedRules(skillName);

      // 3. 执行 skill（模拟，实际由 Claude Code 执行）
      const output = await this._executeSkillLogic(skillName, skillDef, rules, inputContext);

      // 4. 更新状态
      this.contextManager.updateState(contextId, 'completed', output);

      // 5. 保存上下文
      this.contextManager.save(contextId);

      return output;
    } catch (e) {
      // 失败处理
      this.contextManager.updateState(contextId, 'failed', null, e.message);
      this.contextManager.save(contextId);
      throw new SkillExecutionError(`Skill ${skillName} failed: ${e.message}`);
    }
  }

  /**
   * 加载 skill 定义
   * @private
   */
  _loadSkillDefinition(skillName) {
    if (!this.pluginPath) {
      throw new SkillExecutionError('Plugin path not set');
    }

    const skillPath = path.join(
      this.pluginPath,
      'skills',
      skillName,
      'SKILL.md'
    );

    if (!fs.existsSync(skillPath)) {
      throw new SkillExecutionError(`SKILL.md not found for ${skillName}`);
    }

    const content = fs.readFileSync(skillPath, 'utf8');

    // 解析 frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let frontmatter = {};
    if (frontmatterMatch) {
      const fmText = frontmatterMatch[1];
      fmText.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          frontmatter[key] = value;
        }
      });
    }

    return {
      name: skillName,
      frontmatter: frontmatter,
      content: content,
      description: frontmatter.description || '',
      userInvocable: frontmatter.userInvocable === 'true'
    };
  }

  /**
   * 获取关联规则
   * @private
   */
  _getAppliedRules(skillName) {
    const binding = this.ruleBindings.bindings.find(b => b.skill === skillName);
    if (!binding) {
      return [];
    }

    return binding.applies_rules.map(ruleFile => {
      // 规则文件位于 rules/ 目录下
      const rulePath = path.join(this.pluginPath, 'rules', ruleFile);
      if (!fs.existsSync(rulePath)) {
        throw new SkillExecutionError(`Rule file not found: rules/${ruleFile}`);
      }
      return {
        file: `rules/${ruleFile}`,
        content: fs.readFileSync(rulePath, 'utf8')
      };
    });
  }

  /**
   * 执行 skill 逻辑
   * 这里是模拟执行，实际执行由 Claude Code 完成
   * @private
   */
  async _executeSkillLogic(skillName, skillDef, rules, inputContext) {
    // 返回执行信息，供 Claude Code 使用
    return {
      skillName: skillName,
      skillDef: skillDef,
      rules: rules,
      input: inputContext,
      message: `Skill ${skillName} ready for Claude Code execution`,
      instructions: this._extractInstructions(skillDef.content)
    };
  }

  /**
   * 提取 skill 指令
   * @private
   */
  _extractInstructions(content) {
    // 移除 frontmatter
    const body = content.replace(/^---\n[\s\S]*?\n---/, '').trim();
    return body;
  }

  /**
   * 检查 write-guard 安全边界
   * @param {string} filePath - 目标文件路径
   * @returns {object} - { allowed: boolean, reason: string }
   */
  checkWriteGuard(filePath) {
    // 加载 write-guard 规则
    const writeGuardPath = path.join(this.pluginPath, 'rules/write-guard.md');
    if (!fs.existsSync(writeGuardPath)) {
      return { allowed: true, reason: 'write-guard.md not found' };
    }

    const content = fs.readFileSync(writeGuardPath, 'utf8');

    // 解析保护路径（简化版）
    const protectedPatterns = [
      'docs/**/*.md',
      'README.md',
      'CLAUDE.md'
    ];

    const safePatterns = [
      'docs/DOC_INDEX.md',
      'docs/04-management/TASK_TRACKER.md',
      'docs/04-management/CHANGELOG.md',
      '.claude/cooldown-state.json'
    ];

    // 检查是否在安全范围
    const isSafe = safePatterns.some(p => filePath.includes(p.replace('*', '')));
    if (isSafe) {
      return { allowed: true, reason: 'safe_path' };
    }

    // 检查是否在保护范围
    const isProtected = protectedPatterns.some(p => filePath.includes(p.replace('*', '')));
    if (isProtected && fs.existsSync(filePath)) {
      return {
        allowed: false,
        reason: 'protected',
        needConfirm: true,
        message: `File ${filePath} is in protected range. Please confirm before overwrite.`
      };
    }

    return { allowed: true, reason: 'new_file' };
  }
}

class SkillExecutionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SkillExecutionError';
  }
}

module.exports = SkillRunner;
module.exports.SkillExecutionError = SkillExecutionError;