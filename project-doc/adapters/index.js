/**
 * Adapters 入口
 * 自动检测平台并返回对应适配器
 */

const fs = require('fs');
const path = require('path');
const ClaudeAdapter = require('./claude/adapter');
const CursorAdapter = require('./cursor/adapter');
const OpenCodeAdapter = require('./opencode/adapter');
const GeminiAdapter = require('./gemini/adapter');

/**
 * 检测当前平台
 * @returns {string} - 'claude' | 'cursor' | 'opencode' | 'gemini'
 */
function detectPlatform() {
  // 获取项目根目录
  const root = getProjectRoot();

  // 1. 检查 Claude Code
  if (fs.existsSync(path.join(root, '.claude-plugin/plugin.json'))) {
    return 'claude';
  }

  // 2. 检查 Cursor
  if (fs.existsSync(path.join(root, '.cursor-plugin')) ||
      fs.existsSync(path.join(root, '.cursorrules')) ||
      fs.existsSync(path.join(root, '.cursor'))) {
    return 'cursor';
  }

  // 3. 检查 OpenCode
  if (fs.existsSync(path.join(root, '.opencode'))) {
    return 'opencode';
  }

  // 4. 检查 Gemini CLI
  if (fs.existsSync(path.join(root, 'GEMINI.md'))) {
    return 'gemini';
  }

  // 默认 Claude Code
  return 'claude';
}

/**
 * 获取项目根目录
 */
function getProjectRoot() {
  let currentDir = process.cwd();

  while (currentDir !== '/') {
    if (fs.existsSync(path.join(currentDir, 'package.json')) ||
        fs.existsSync(path.join(currentDir, '.git'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return process.cwd();
}

/**
 * 获取适配器实例
 * @param {string} platform - 平台名称（可选，自动检测）
 * @returns {AdapterInterface}
 */
function getAdapter(platform = null) {
  const detectedPlatform = platform || detectPlatform();

  switch (detectedPlatform) {
    case 'claude':
      return new ClaudeAdapter();
    case 'cursor':
      return new CursorAdapter();
    case 'opencode':
      return new OpenCodeAdapter();
    case 'gemini':
      return new GeminiAdapter();
    default:
      return new ClaudeAdapter();
  }
}

/**
 * 初始化 project-doc 到当前平台
 * @param {string} pluginPath - 插件路径
 * @returns {object} - { platform, adapter, initialized }
 */
function initialize(pluginPath) {
  const platform = detectPlatform();
  const adapter = getAdapter(platform);

  adapter.initialize(pluginPath);

  return {
    platform,
    adapter,
    initialized: true
  };
}

module.exports = {
  detectPlatform,
  getAdapter,
  initialize,
  ClaudeAdapter,
  CursorAdapter,
  OpenCodeAdapter,
  GeminiAdapter
};