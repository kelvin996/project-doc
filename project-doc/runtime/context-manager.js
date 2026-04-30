/**
 * 上下文管理器
 * 管理 skill 执行上下文，保存/恢复状态
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ContextManager {
  /**
   * @param {string} storagePath - 上下文存储目录
   */
  constructor(storagePath = '.claude/contexts') {
    this.storagePath = storagePath;
    this.contexts = {}; // contextId -> context
  }

  /**
   * 创建新上下文
   * @param {string} skillName - Skill 名称
   * @param {object} input - 输入参数
   * @returns {string} - 上下文 ID
   */
  createContext(skillName, input) {
    const contextId = this._generateId();
    const context = {
      id: contextId,
      skillName: skillName,
      triggerType: input.triggerType || 'manual',
      input: input,
      timestamp: new Date().toISOString(),
      state: 'pending', // pending | running | completed | failed
      output: null,
      error: null
    };

    this.contexts[contextId] = context;
    return contextId;
  }

  /**
   * 获取上下文
   * @param {string} contextId - 上下文 ID
   * @returns {object} - 上下文对象
   */
  getContext(contextId) {
    return this.contexts[contextId];
  }

  /**
   * 更新上下文状态
   * @param {string} contextId - 上下文 ID
   * @param {string} state - 新状态
   * @param {object} output - 输出结果（可选）
   * @param {string} error - 错误信息（可选）
   */
  updateState(contextId, state, output = null, error = null) {
    const context = this.contexts[contextId];
    if (!context) {
      throw new ContextError(`Context ${contextId} not found`);
    }

    context.state = state;
    context.output = output;
    context.error = error;

    if (state === 'completed' || state === 'failed') {
      context.completedAt = new Date().toISOString();
    }
  }

  /**
   * 保存上下文到文件
   * @param {string} contextId - 上下文 ID
   */
  save(contextId) {
    const context = this.contexts[contextId];
    if (!context) {
      throw new ContextError(`Context ${contextId} not found`);
    }

    // 确保目录存在
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }

    const filePath = path.join(this.storagePath, `${contextId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(context, null, 2));
  }

  /**
   * 恢复上下文
   * @param {string} contextId - 上下文 ID
   * @returns {object} - 恢复的上下文
   */
  restore(contextId) {
    const filePath = path.join(this.storagePath, `${contextId}.json`);
    if (!fs.existsSync(filePath)) {
      throw new ContextError(`Context file ${filePath} not found`);
    }

    const context = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    this.contexts[contextId] = context;
    return context;
  }

  /**
   * 列出所有已保存的上下文
   * @returns {array} - 上下文 ID 列表
   */
  listSaved() {
    if (!fs.existsSync(this.storagePath)) {
      return [];
    }

    return fs.readdirSync(this.storagePath)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  }

  /**
   * 清理过期的上下文文件
   * @param {number} maxAgeHours - 最大保留时间（小时）
   */
  cleanup(maxAgeHours = 24) {
    const maxAge = maxAgeHours * 60 * 60 * 1000;
    const now = Date.now();

    this.listSaved().forEach(contextId => {
      try {
        const context = this.restore(contextId);
        const completedAt = new Date(context.completedAt || context.timestamp);
        const elapsed = now - completedAt.getTime();

        if (elapsed > maxAge) {
          // 删除文件
          const filePath = path.join(this.storagePath, `${contextId}.json`);
          fs.unlinkSync(filePath);
          // 删除内存中的引用
          delete this.contexts[contextId];
        }
      } catch (e) {
        // 忽略无效文件
      }
    });
  }

  /**
   * 生成上下文 ID
   * @private
   */
  _generateId() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(4).toString('hex');
    return `ctx_${timestamp}_${random}`;
  }
}

class ContextError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ContextError';
  }
}

module.exports = ContextManager;
module.exports.ContextError = ContextError;