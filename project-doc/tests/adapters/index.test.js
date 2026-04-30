/**
 * Adapters Index 测试
 * 验证平台检测和适配器选择
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const adapters = require(path.join(__dirname, '../../adapters/index'));

const ROOT = path.join(__dirname, '../../');

describe('Adapters Index', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'adapter-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('detectPlatform', () => {
    it('should detect claude when .claude-plugin/plugin.json exists', () => {
      // 在当前项目根目录，应该检测到 claude
      const platform = adapters.detectPlatform();
      expect(platform).toBe('claude');
    });

    it('should return valid platform name', () => {
      // 验证返回值为有效的平台名称
      const platform = adapters.detectPlatform();
      expect(['claude', 'cursor', 'opencode', 'gemini']).toContain(platform);
    });
  });

  describe('getAdapter', () => {
    it('should return ClaudeAdapter for claude platform', () => {
      const adapter = adapters.getAdapter('claude');
      expect(adapter.getPlatformName()).toBe('claude');
    });

    it('should return CursorAdapter for cursor platform', () => {
      const adapter = adapters.getAdapter('cursor');
      expect(adapter.getPlatformName()).toBe('cursor');
    });

    it('should return OpenCodeAdapter for opencode platform', () => {
      const adapter = adapters.getAdapter('opencode');
      expect(adapter.getPlatformName()).toBe('opencode');
    });

    it('should return GeminiAdapter for gemini platform', () => {
      const adapter = adapters.getAdapter('gemini');
      expect(adapter.getPlatformName()).toBe('gemini');
    });

    it('should auto-detect platform when not specified', () => {
      const adapter = adapters.getAdapter();
      expect(adapter.getPlatformName()).toBeDefined();
    });
  });

  describe('initialize', () => {
    it('should initialize plugin for detected platform', () => {
      const result = adapters.initialize(ROOT);

      expect(result.platform).toBe('claude');
      expect(result.initialized).toBe(true);
      expect(result.adapter).toBeDefined();
    });
  });

  describe('exports', () => {
    it('should export all adapter classes', () => {
      expect(adapters.ClaudeAdapter).toBeDefined();
      expect(adapters.CursorAdapter).toBeDefined();
      expect(adapters.OpenCodeAdapter).toBeDefined();
      expect(adapters.GeminiAdapter).toBeDefined();
    });
  });
});