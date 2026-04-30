/**
 * Runtime 入口文件
 * 导出所有 runtime 模块
 */

const Config = require('./config');
const TriggerEngine = require('./trigger-engine');
const SkillRunner = require('./skill-runner');
const ContextManager = require('./context-manager');
const CooldownGuard = require('./cooldown-guard');

module.exports = {
  Config,
  TriggerEngine,
  SkillRunner,
  ContextManager,
  CooldownGuard,

  // 便捷初始化函数
  init(pluginPath) {
    const config = new Config(pluginPath);
    config.loadAll();

    const cooldownGuard = new CooldownGuard(config.triggerSpec.cooldown.default_seconds);
    const contextManager = new ContextManager('.claude/contexts');
    const skillRunner = new SkillRunner(contextManager, config.ruleBindings);
    const triggerEngine = new TriggerEngine(config, cooldownGuard);

    return {
      config,
      triggerEngine,
      skillRunner,
      contextManager,
      cooldownGuard
    };
  }
};