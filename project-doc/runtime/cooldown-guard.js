/**
 * 冷却守护
 * 防止触发风暴（无限循环触发）
 */

const fs = require('fs');
const path = require('path');

class CooldownGuard {
  /**
   * @param {number} cooldownSeconds - 冷却时间（秒）
   * @param {number} maxCooldownSeconds - 最大冷却时间（秒）
   */
  constructor(cooldownSeconds = 3, maxCooldownSeconds = 30) {
    this.cooldownSeconds = cooldownSeconds;
    this.maxCooldownSeconds = maxCooldownSeconds;
    this.state = {}; // filePath:skillName -> { lastTrigger, cooldown }
  }

  /**
   * 检查是否可以触发
   * @param {string} filePath - 触发的文件路径
   * @param {string} skillName - Skill 名称
   * @returns {boolean} - 是否可以触发
   */
  canTrigger(filePath, skillName) {
    const key = this._makeKey(filePath, skillName);
    const record = this.state[key];

    if (!record) {
      return true; // 首次触发，允许
    }

    const elapsed = Date.now() - record.lastTrigger;
    const cooldown = record.cooldown || this.cooldownSeconds;

    return elapsed >= cooldown * 1000;
  }

  /**
   * 记录触发
   * @param {string} filePath - 触发的文件路径
   * @param {string} skillName - Skill 名称
   * @param {number} customCooldown - 自定义冷却时间（可选）
   */
  recordTrigger(filePath, skillName, customCooldown = null) {
    const key = this._makeKey(filePath, skillName);
    const cooldown = Math.min(
      customCooldown || this.cooldownSeconds,
      this.maxCooldownSeconds
    );

    this.state[key] = {
      lastTrigger: Date.now(),
      cooldown: cooldown
    };
  }

  /**
   * 清理过期状态
   * 清理超过 maxCooldownSeconds 的记录
   */
  cleanup() {
    const maxAge = this.maxCooldownSeconds * 1000;
    const now = Date.now();

    Object.keys(this.state).forEach(key => {
      const elapsed = now - this.state[key].lastTrigger;
      if (elapsed > maxAge) {
        delete this.state[key];
      }
    });
  }

  /**
   * 从文件加载状态
   * @param {string} statePath - 状态文件路径
   */
  load(statePath) {
    if (!fs.existsSync(statePath)) {
      return;
    }

    try {
      const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      if (data.cooldowns) {
        this.state = {};
        Object.entries(data.cooldowns).forEach(([key, value]) => {
          this.state[key] = {
            lastTrigger: new Date(value.last_trigger).getTime(),
            cooldown: value.cooldown_seconds
          };
        });
      }
    } catch (e) {
      // 加载失败，使用空状态
      this.state = {};
    }
  }

  /**
   * 保存状态到文件
   * @param {string} statePath - 状态文件路径
   */
  save(statePath) {
    const cooldowns = {};
    Object.entries(this.state).forEach(([key, value]) => {
      cooldowns[key] = {
        last_trigger: new Date(value.lastTrigger).toISOString(),
        cooldown_seconds: value.cooldown
      };
    });

    const data = {
      cooldowns: cooldowns,
      config: {
        cooldown_seconds: this.cooldownSeconds,
        max_cooldown_seconds: this.maxCooldownSeconds
      },
      metadata: {
        last_saved: new Date().toISOString()
      }
    };

    // 确保目录存在
    const dir = path.dirname(statePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(statePath, JSON.stringify(data, null, 2));
  }

  /**
   * 生成状态 key
   * @private
   */
  _makeKey(filePath, skillName) {
    return `${filePath}:${skillName}`;
  }

  /**
   * 获取当前状态统计
   */
  getStats() {
    return {
      totalRecords: Object.keys(this.state).length,
      cooldownSeconds: this.cooldownSeconds,
      maxCooldownSeconds: this.maxCooldownSeconds
    };
  }
}

module.exports = CooldownGuard;