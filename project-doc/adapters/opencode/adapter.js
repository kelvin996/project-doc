/**
 * OpenCode Adapter
 * OpenCode 使用 .opencode/ 目录和 JSON 配置
 */

const fs = require('fs');
const path = require('path');
const AdapterInterface = require('../common/interface');
const { fileExists, readJsonFile, writeJsonFile, getProjectRoot, copyDirectory } = require('../common/utils');

class OpenCodeAdapter extends AdapterInterface {
  constructor() {
    super();
    this.pluginPath = null;
    this.opencodePath = null;
  }

  /**
   * 平台名称
   */
  getPlatformName() {
    return 'opencode';
  }

  /**
   * 检测当前环境是否为 OpenCode
   */
  detect() {
    const root = getProjectRoot();
    // OpenCode 特征：.opencode/ 目录存在
    return fileExists(path.join(root, '.opencode'));
  }

  /**
   * 注册 skill
   */
  registerSkill(skillName, skillConfig) {
    // OpenCode 通过配置文件注册
    const configPath = path.join(this.opencodePath, 'opencode.json');
    let config = readJsonFile(configPath) || {};

    if (!config.skills) {
      config.skills = {};
    }

    config.skills[skillName] = {
      path: `skills/${skillName}/SKILL.md`,
      trigger: skillConfig.trigger || 'manual'
    };

    writeJsonFile(configPath, config);
    return true;
  }

  /**
   * 触发 skill
   */
  async triggerSkill(skillName, context) {
    const skillPath = path.join(this.opencodePath, 'skills', skillName, 'SKILL.md');

    if (!fs.existsSync(skillPath)) {
      throw new Error(`Skill ${skillName} not found`);
    }

    const skillContent = fs.readFileSync(skillPath, 'utf8');

    return {
      platform: 'opencode',
      skillName: skillName,
      skillContent: skillContent,
      context: context,
      triggerMethod: 'command',
      instructions: `Execute skill via OpenCode command: opencode --skill ${skillName}`
    };
  }

  /**
   * 加载规则文件
   */
  loadRule(rulePath) {
    const fullPath = path.join(this.opencodePath, rulePath);

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
      platform: 'opencode',
      cwd: process.cwd()
    };
  }

  /**
   * 初始化插件
   */
  initialize(pluginPath) {
    this.pluginPath = pluginPath;
    this.opencodePath = path.join(getProjectRoot(), '.opencode');

    // 创建 .opencode 目录
    if (!fs.existsSync(this.opencodePath)) {
      fs.mkdirSync(this.opencodePath, { recursive: true });
    }

    // 复制 rules
    const rulesDir = path.join(pluginPath, 'rules');
    const opencodeRulesDir = path.join(this.opencodePath, 'rules');

    if (fs.existsSync(rulesDir)) {
      copyDirectory(rulesDir, opencodeRulesDir);
    }

    // 复制 skills
    const skillsDir = path.join(pluginPath, 'skills');
    const opencodeSkillsDir = path.join(this.opencodePath, 'skills');

    if (fs.existsSync(skillsDir)) {
      copyDirectory(skillsDir, opencodeSkillsDir);
    }

    // 生成 OpenCode 配置
    this._generateOpenCodeConfig();

    return true;
  }

  /**
   * 生成 OpenCode 配置文件
   * @private
   */
  _generateOpenCodeConfig() {
    const configPath = path.join(this.opencodePath, 'opencode.json');

    // 读取 plugin.json 作为基础
    const pluginConfig = readJsonFile(path.join(this.pluginPath, '.claude-plugin/plugin.json'));

    const config = {
      name: pluginConfig.name || 'project-doc',
      version: pluginConfig.version || '1.0.0',
      description: pluginConfig.description || '',
      rulesPath: '.opencode/rules',
      skillsPath: '.opencode/skills',
      skills: pluginConfig.skills || {}
    };

    writeJsonFile(configPath, config);
  }
}

module.exports = OpenCodeAdapter;