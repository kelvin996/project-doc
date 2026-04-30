/**
 * AdapterInterface 测试
 * 验证基础接口定义
 */

const path = require('path');
const AdapterInterface = require(path.join(__dirname, '../../adapters/common/interface'));

describe('AdapterInterface', () => {
  let adapter;

  beforeEach(() => {
    adapter = new AdapterInterface();
  });

  describe('getPlatformName', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.getPlatformName()).toThrow('must be implemented');
    });
  });

  describe('detect', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.detect()).toThrow('must be implemented');
    });
  });

  describe('registerSkill', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.registerSkill('test', {})).toThrow('must be implemented');
    });
  });

  describe('triggerSkill', () => {
    it('should throw error when not implemented', async () => {
      await expect(adapter.triggerSkill('test', {})).rejects.toThrow('must be implemented');
    });
  });

  describe('loadRule', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.loadRule('test.md')).toThrow('must be implemented');
    });
  });

  describe('getContext', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.getContext()).toThrow('must be implemented');
    });
  });

  describe('initialize', () => {
    it('should throw error when not implemented', () => {
      expect(() => adapter.initialize('/test/path')).toThrow('must be implemented');
    });
  });
});