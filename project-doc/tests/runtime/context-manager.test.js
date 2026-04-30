const ContextManager = require('../../runtime/context-manager');
const fs = require('fs');
const path = require('path');

describe('ContextManager', () => {
  let manager;
  const testStoragePath = '/tmp/test-contexts';

  beforeEach(() => {
    // 清理测试目录
    if (fs.existsSync(testStoragePath)) {
      fs.rmSync(testStoragePath, { recursive: true });
    }
    manager = new ContextManager(testStoragePath);
  });

  afterEach(() => {
    if (fs.existsSync(testStoragePath)) {
      fs.rmSync(testStoragePath, { recursive: true });
    }
  });

  describe('createContext', () => {
    it('should create context with correct structure', () => {
      const contextId = manager.createContext('project-init', {
        projectPath: '/test/project',
        lang: 'zh'
      });

      expect(contextId).toBeDefined();
      expect(contextId.startsWith('ctx_')).toBe(true);

      const context = manager.getContext(contextId);
      expect(context.skillName).toBe('project-init');
      expect(context.state).toBe('pending');
      expect(context.input.projectPath).toBe('/test/project');
      expect(context.input.lang).toBe('zh');
    });
  });

  describe('updateState', () => {
    it('should update state to running', () => {
      const contextId = manager.createContext('test-skill', {});
      manager.updateState(contextId, 'running');

      const context = manager.getContext(contextId);
      expect(context.state).toBe('running');
    });

    it('should update state to completed with output', () => {
      const contextId = manager.createContext('test-skill', {});
      manager.updateState(contextId, 'completed', { result: 'success' });

      const context = manager.getContext(contextId);
      expect(context.state).toBe('completed');
      expect(context.output.result).toBe('success');
      expect(context.completedAt).toBeDefined();
    });

    it('should update state to failed with error', () => {
      const contextId = manager.createContext('test-skill', {});
      manager.updateState(contextId, 'failed', null, 'Something went wrong');

      const context = manager.getContext(contextId);
      expect(context.state).toBe('failed');
      expect(context.error).toBe('Something went wrong');
    });

    it('should throw error for invalid contextId', () => {
      expect(() => {
        manager.updateState('invalid-id', 'running');
      }).toThrow();
    });
  });

  describe('save and restore', () => {
    it('should save context to file', () => {
      const contextId = manager.createContext('test-skill', { test: true });
      manager.updateState(contextId, 'completed', { result: 'done' });
      manager.save(contextId);

      const filePath = path.join(testStoragePath, `${contextId}.json`);
      expect(fs.existsSync(filePath)).toBe(true);

      const saved = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      expect(saved.skillName).toBe('test-skill');
      expect(saved.state).toBe('completed');
    });

    it('should restore context from file', () => {
      const contextId = manager.createContext('test-skill', { test: true });
      manager.updateState(contextId, 'completed', { result: 'done' });
      manager.save(contextId);

      // 清除内存中的上下文
      delete manager.contexts[contextId];

      // 从文件恢复
      const restored = manager.restore(contextId);
      expect(restored.skillName).toBe('test-skill');
      expect(restored.state).toBe('completed');
      expect(restored.output.result).toBe('done');
    });
  });

  describe('listSaved', () => {
    it('should list all saved contexts', () => {
      const id1 = manager.createContext('skill1', {});
      const id2 = manager.createContext('skill2', {});
      manager.save(id1);
      manager.save(id2);

      const saved = manager.listSaved();
      expect(saved.length).toBe(2);
      expect(saved).toContain(id1);
      expect(saved).toContain(id2);
    });

    it('should return empty array when no saved contexts', () => {
      const saved = manager.listSaved();
      expect(saved).toEqual([]);
    });
  });

  describe('cleanup', () => {
    it('should remove old contexts', () => {
      const id1 = manager.createContext('old-skill', {});
      manager.updateState(id1, 'completed');
      manager.save(id1);

      // 修改完成时间为 25 小时前
      const context = manager.getContext(id1);
      context.completedAt = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
      manager.save(id1);

      manager.cleanup(24); // 清理 24 小时以上的

      expect(manager.listSaved()).toEqual([]);
    });

    it('should keep recent contexts', () => {
      const id1 = manager.createContext('new-skill', {});
      manager.updateState(id1, 'completed');
      manager.save(id1);

      manager.cleanup(24); // 清理 24 小时以上的

      expect(manager.listSaved()).toContain(id1);
    });
  });
});