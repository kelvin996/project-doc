/**
 * Cursor IDE Adapter
 * Cursor 使用 .cursor-plugin/ 或 .cursorrules 格式
 */

const fs = require('fs');
const path = require('path');
const AdapterInterface = require('../common/interface');
const { fileExists, mergeMarkdownFiles, getProjectRoot, copyDirectory } = require('../common/utils');

class CursorAdapter extends AdapterInterface {
  constructor() {
    super();
    this.pluginPath = null;
    this.cursorPluginPath = null;
  }

  /**
   * 平台名称
   */
  getPlatformName() {
    return 'cursor';
  }

  /**
   * 检测当前环境是否为 Cursor
   */
  detect() {
    const root = getProjectRoot();
    // Cursor 特征：.cursor-plugin/ 或 .cursorrules 存在
    return fileExists(path.join(root, '.cursor-plugin')) ||
           fileExists(path.join(root, '.cursorrules')) ||
           fileExists(path.join(root, '.cursor'));
  }

  /**
   * 注册 skill
   * Cursor 中 skill 通过 rules 引导 AI 行为
   */
  registerSkill(skillName, skillConfig) {
    // Cursor 不需要显式注册 skill
    // skills 通过 .cursorrules 或 .cursor/rules/ 引导
    return true;
  }

  /**
   * 触发 skill
   * Cursor 中由 AI 自动识别规则触发
   */
  async triggerSkill(skillName, context) {
    const skillPath = path.join(this.pluginPath, 'skills', skillName, 'SKILL.md');

    if (!fs.existsSync(skillPath)) {
      throw new Error(`Skill ${skillName} not found`);
    }

    const skillContent = fs.readFileSync(skillPath, 'utf8');

    return {
      platform: 'cursor',
      skillName: skillName,
      skillContent: skillContent,
      context: context,
      triggerMethod: 'ai-auto-detect',
      instructions: 'Cursor AI will automatically detect and apply skill rules'
    };
  }

  /**
   * 加载规则文件
   * Cursor 需要将 rules 转换为 .cursorrules 格式
   */
  loadRule(rulePath) {
    const fullPath = path.join(this.pluginPath, rulePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Rule file not found: ${rulePath}`);
    }

    // 返回原始内容，格式转换在 initialize 时完成
    return fs.readFileSync(fullPath, 'utf8');
  }

  /**
   * 获取上下文
   */
  getContext() {
    return {
      projectPath: getProjectRoot(),
      pluginPath: this.pluginPath,
      platform: 'cursor',
      cwd: process.cwd()
    };
  }

  /**
   * 初始化插件
   * 将 project-doc 转换为 Cursor 格式
   */
  initialize(pluginPath) {
    this.pluginPath = pluginPath;
    this.cursorPluginPath = path.join(getProjectRoot(), '.cursor');

    // 创建 .cursor 目录
    if (!fs.existsSync(this.cursorPluginPath)) {
      fs.mkdirSync(this.cursorPluginPath, { recursive: true });
    }

    // 复制 rules 到 .cursor/rules/
    const rulesDir = path.join(pluginPath, 'rules');
    const cursorRulesDir = path.join(this.cursorPluginPath, 'rules');

    if (fs.existsSync(rulesDir)) {
      copyDirectory(rulesDir, cursorRulesDir);
    }

    // 复制 skills 到 .cursor/skills/
    const skillsDir = path.join(pluginPath, 'skills');
    const cursorSkillsDir = path.join(this.cursorPluginPath, 'skills');

    if (fs.existsSync(skillsDir)) {
      copyDirectory(skillsDir, cursorSkillsDir);
    }

    // 生成合并的 .cursorrules 文件（可选）
    this._generateCursorRules(rulesDir);

    // 生成 Cursor 配置文件
    this._generateCursorConfig();

    return true;
  }

  /**
   * 生成 .cursorrules 文件
   * @private
   */
  _generateCursorRules(rulesDir) {
    const outputPath = path.join(getProjectRoot(), '.cursorrules');

    // 合并所有 rules
    const rulesFiles = fs.readdirSync(rulesDir)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(rulesDir, f));

    mergeMarkdownFiles(rulesFiles, outputPath, '\n\n---\n\n');

    // 添加 Cursor 专用头部
    const header = `# Project-Doc Rules for Cursor

> This file is auto-generated from project-doc rules.
> Manual modifications may be overwritten.

`;

    const content = fs.readFileSync(outputPath, 'utf8');
    fs.writeFileSync(outputPath, header + content);
  }

  /**
   * 生成 Cursor 配置文件
   * @private
   */
  _generateCursorConfig() {
    const configPath = path.join(this.cursorPluginPath, 'cursor.json');

    const config = {
      name: 'project-doc',
      version: '1.0.0',
      description: 'Documentation automation for Cursor IDE',
      rulesPath: '.cursor/rules',
      skillsPath: '.cursor/skills'
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}

module.exports = CursorAdapter;