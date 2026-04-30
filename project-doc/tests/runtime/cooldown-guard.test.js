const fs = require('fs');
const path = require('path');
const CooldownGuard = require('../../runtime/cooldown-guard');

describe('CooldownGuard', () => {
  let guard;

  beforeEach(() => {
    guard = new CooldownGuard(3, 30);
  });

  describe('canTrigger', () => {
    it('should allow first trigger', () => {
      expect(guard.canTrigger('/docs/test.md', 'doc-sync')).toBe(true);
    });

    it('should block trigger within cooldown period', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync');

      // 立即检查应该被阻止
      expect(guard.canTrigger('/docs/test.md', 'doc-sync')).toBe(false);
    });

    it('should allow trigger after cooldown period', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync');

      // 模拟冷却时间已过
      const key = '/docs/test.md:doc-sync';
      guard.state[key].lastTrigger = Date.now() - 4000; // 4 秒前

      expect(guard.canTrigger('/docs/test.md', 'doc-sync')).toBe(true);
    });

    it('should allow different files to trigger independently', () => {
      guard.recordTrigger('/docs/test1.md', 'doc-sync');

      expect(guard.canTrigger('/docs/test1.md', 'doc-sync')).toBe(false);
      expect(guard.canTrigger('/docs/test2.md', 'doc-sync')).toBe(true);
    });

    it('should allow different skills to trigger independently', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync');

      expect(guard.canTrigger('/docs/test.md', 'doc-sync')).toBe(false);
      expect(guard.canTrigger('/docs/test.md', 'task-update')).toBe(true);
    });
  });

  describe('recordTrigger', () => {
    it('should record trigger with default cooldown', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync');

      const key = '/docs/test.md:doc-sync';
      expect(guard.state[key]).toBeDefined();
      expect(guard.state[key].cooldown).toBe(3);
    });

    it('should record trigger with custom cooldown', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync', 10);

      const key = '/docs/test.md:doc-sync';
      expect(guard.state[key].cooldown).toBe(10);
    });

    it('should cap cooldown at maxCooldownSeconds', () => {
      guard.recordTrigger('/docs/test.md', 'doc-sync', 100);

      const key = '/docs/test.md:doc-sync';
      expect(guard.state[key].cooldown).toBe(30); // maxCooldownSeconds
    });
  });

  describe('cleanup', () => {
    it('should remove expired records', () => {
      guard.recordTrigger('/docs/old.md', 'doc-sync');
      guard.recordTrigger('/docs/new.md', 'doc-sync');

      // 设置 old 文件为过期
      const oldKey = '/docs/old.md:doc-sync';
      guard.state[oldKey].lastTrigger = Date.now() - 35000; // 35 秒前

      guard.cleanup();

      expect(guard.state[oldKey]).toBeUndefined();
      expect(guard.state['/docs/new.md:doc-sync']).toBeDefined();
    });
  });

  describe('getStats', () => {
    it('should return correct stats', () => {
      guard.recordTrigger('/docs/test1.md', 'doc-sync');
      guard.recordTrigger('/docs/test2.md', 'task-update');

      const stats = guard.getStats();
      expect(stats.totalRecords).toBe(2);
      expect(stats.cooldownSeconds).toBe(3);
      expect(stats.maxCooldownSeconds).toBe(30);
    });
  });
});