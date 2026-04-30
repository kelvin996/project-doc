/**
 * 配置加载器
 * 加载 plugin.json, rule-binding.json, trigger-spec.json
 */

const fs = require('fs');
const path = require('path');

class Config {
  constructor(pluginPath) {
    this.pluginPath = pluginPath;
    this.plugin = null;
    this.ruleBindings = null;
    this.triggerSpec = null;
  }

  /**
   * 加载所有配置
   */
  loadAll() {
    this.plugin = this.loadPlugin();
    this.ruleBindings = this.loadRuleBindings();
    this.triggerSpec = this.loadTriggerSpec();
    this.validate();
  }

  /**
   * 加载 plugin.json
   */
  loadPlugin() {
    const filePath = path.join(this.pluginPath, '.claude-plugin/plugin.json');
    if (!fs.existsSync(filePath)) {
      throw new ConfigError(`plugin.json not found at ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * 加载 rule-binding.json
   */
  loadRuleBindings() {
    if (!this.plugin.ruleBinding) {
      throw new ConfigError('ruleBinding not defined in plugin.json');
    }
    const filePath = path.join(this.pluginPath, this.plugin.ruleBinding);
    if (!fs.existsSync(filePath)) {
      throw new ConfigError(`rule-binding.json not found at ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * 加载 trigger-spec.json
   */
  loadTriggerSpec() {
    if (!this.plugin.triggerSpec) {
      throw new ConfigError('triggerSpec not defined in plugin.json');
    }
    const filePath = path.join(this.pluginPath, this.plugin.triggerSpec);
    if (!fs.existsSync(filePath)) {
      throw new ConfigError(`trigger-spec.json not found at ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * 验证配置一致性
   */
  validate() {
    // 验证 skills 一致性
    const pluginSkills = Object.keys(this.plugin.skills);
    const bindingSkills = this.ruleBindings.bindings.map(b => b.skill);

    // 每个 plugin skill 应有 binding
    pluginSkills.forEach(skill => {
      if (!bindingSkills.includes(skill)) {
        throw new ConfigError(`Skill ${skill} missing in rule-binding.json`);
      }
    });

    // 验证 rules 存在
    this.plugin.rules.forEach(rule => {
      const filePath = path.join(this.pluginPath, rule);
      if (!fs.existsSync(filePath)) {
        throw new ConfigError(`Rule file not found: ${rule}`);
      }
    });

    // 验证 trigger 类型一致
    this.ruleBindings.bindings.forEach(binding => {
      if (!this.triggerSpec.trigger_types[binding.trigger]) {
        throw new ConfigError(`Unknown trigger type: ${binding.trigger}`);
      }
    });

    return true;
  }
}

class ConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigError';
  }
}

module.exports = Config;
module.exports.ConfigError = ConfigError;