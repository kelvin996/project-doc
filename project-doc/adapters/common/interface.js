/**
 * Adapter Interface
 * 所有平台适配器必须实现此接口
 */

class AdapterInterface {
  /**
   * 平台名称
   * @returns {string}
   */
  getPlatformName() {
    throw new Error('getPlatformName() must be implemented');
  }

  /**
   * 检测当前环境是否为此平台
   * @returns {boolean}
   */
  detect() {
    throw new Error('detect() must be implemented');
  }

  /**
   * 注册 skill
   * @param {string} skillName
   * @param {object} skillConfig
   * @returns {boolean}
   */
  registerSkill(skillName, skillConfig) {
    throw new Error('registerSkill() must be implemented');
  }

  /**
   * 触发 skill
   * @param {string} skillName
   * @param {object} context
   * @returns {Promise<object>}
   */
  async triggerSkill(skillName, context) {
    throw new Error('triggerSkill() must be implemented');
  }

  /**
   * 加载规则文件
   * @param {string} rulePath
   * @returns {string} - 规则内容（可能需格式转换）
   */
  loadRule(rulePath) {
    throw new Error('loadRule() must be implemented');
  }

  /**
   * 获取上下文
   * @returns {object} - { projectPath, currentFile, ... }
   */
  getContext() {
    throw new Error('getContext() must be implemented');
  }

  /**
   * 初始化插件
   * @param {string} pluginPath
   * @returns {boolean}
   */
  initialize(pluginPath) {
    throw new Error('initialize() must be implemented');
  }
}

module.exports = AdapterInterface;