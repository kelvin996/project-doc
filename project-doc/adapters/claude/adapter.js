/**
 * Claude Code Adapter
 * 主平台适配器
 */

const fs = require('fs');
const path = require('path');
const AdapterInterface = require('../common/interface');
const { fileExists, readJsonFile, writeJsonFile, getProjectRoot } = require('../common/utils');

class ClaudeAdapter extends AdapterInterface {
  constructor() {
    super();
    this.pluginPath = null;
    this.config = null;
  }

  /**
   * 平台名称
   */
  getPlatformName() {
    return 'claude';
  }

  /**
   * 检测当前环境是否为 Claude Code
   */
  detect() {
    // Claude Code 特征：.claude-plugin/plugin.json 存在
    const root = getProjectRoot();
    return fileExists(path.join(root, '.claude-plugin/plugin.json'));
  }

  /**
   * 注册 skill
   */
  registerSkill(skillName, skillConfig) {
    if (!this.config) {
      this.config = readJsonFile(path.join(this.pluginPath, '.claude-plugin/plugin.json'));
    }

    if (!this.config.skills) {
      this.config.skills = {};
    }

    this.config.skills[skillName] = {
      path: `skills/${skillName}/SKILL.md`,
      userInvocable: skillConfig.userInvocable || false,
      trigger: skillConfig.trigger || 'manual'
    };

    writeJsonFile(path.join(this.pluginPath, '.claude-plugin/plugin.json'), this.config);
    return true;
  }

  /**
   * 触发 skill
   * Claude Code 中 skill 由用户输入 `/skill-name` 触发
   * 此方法返回 skill 定义供 Claude Code 执行
   */
  async triggerSkill(skillName, context) {
    const skillPath = path.join(this.pluginPath, 'skills', skillName, 'SKILL.md');

    if (!fs.existsSync(skillPath)) {
      throw new Error(`Skill ${skillName} not found at ${skillPath}`);
    }

    const skillContent = fs.readFileSync(skillPath, 'utf8');

    return {
      platform: 'claude',
      skillName: skillName,
      skillContent: skillContent,
      context: context,
      triggerMethod: 'slash-command',
      instructions: `Execute skill by typing /${skillName} in Claude Code`
    };
  }

  /**
   * 加载规则文件
   * Claude Code 直接加载 .md 文件
   */
  loadRule(rulePath) {
    const fullPath = path.join(this.pluginPath, rulePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Rule file not found: ${rulePath}`);
    }

    return fs.readFileSync(fullPath, 'utf8');
  }

  /**
   * 获取上下文
   */
  getContext() {
    return {
      projectPath: getProjectRoot(),
      pluginPath: this.pluginPath,
      platform: 'claude',
      cwd: process.cwd()
    };
  }

  /**
   * 初始化插件
   */
  initialize(pluginPath) {
    this.pluginPath = pluginPath;

    // 加载配置
    const configPath = path.join(pluginPath, '.claude-plugin/plugin.json');
    if (fs.existsSync(configPath)) {
      this.config = readJsonFile(configPath);
    }

    return true;
  }

  /**
   * 获取所有 skills
   */
  getSkills() {
    if (!this.config || !this.config.skills) {
      return [];
    }
    return Object.keys(this.config.skills);
  }

  /**
   * 获取所有 rules
   */
  getRules() {
    if (!this.config || !this.config.rules) {
      return [];
    }
    return this.config.rules;
  }
}

module.exports = ClaudeAdapter;