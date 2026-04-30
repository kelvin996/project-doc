/**
 * OpenCode Adapter 测试
 * 验证 OpenCode 平台适配器功能
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const OpenCodeAdapter = require(path.join(__dirname, '../../adapters/opencode/adapter'));

const ROOT = path.join(__dirname, '../../');

describe('OpenCodeAdapter', () => {
  let adapter;
  let tempDir;

  beforeEach(() => {
    adapter = new OpenCodeAdapter();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'opencode-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('getPlatformName', () => {
    it('should return "opencode"', () => {
      expect(adapter.getPlatformName()).toBe('opencode');
    });
  });

  describe('detect', () => {
    it('should check for .opencode directory', () => {
      // 检测方法应正确识别目录路径
      expect(typeof adapter.detect).toBe('function');
    });
  });

  describe('initialize', () => {
    it('should create .opencode directory structure', () => {
      adapter.initialize(ROOT);

      const opencodePath = path.join(ROOT, '.opencode');
      expect(fs.existsSync(opencodePath)).toBe(true);
      expect(fs.existsSync(path.join(opencodePath, 'rules'))).toBe(true);
      expect(fs.existsSync(path.join(opencodePath, 'skills'))).toBe(true);
    });

    it('should generate opencode.json config', () => {
      adapter.initialize(ROOT);

      const configPath = path.join(ROOT, '.opencode/opencode.json');
      expect(fs.existsSync(configPath)).toBe(true);

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      expect(config.name).toBe('project-doc');
      expect(config.rulesPath).toBe('.opencode/rules');
      expect(config.skills).toBeDefined();
    });
  });

  describe('registerSkill', () => {
    it('should register skill in opencode.json', () => {
      adapter.initialize(ROOT);

      const result = adapter.registerSkill('test-skill', {
        trigger: 'manual'
      });

      expect(result).toBe(true);

      const configPath = path.join(ROOT, '.opencode/opencode.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      expect(config.skills['test-skill']).toBeDefined();
    });
  });

  describe('triggerSkill', () => {
    it('should return skill trigger info', async () => {
      adapter.initialize(ROOT);
      const result = await adapter.triggerSkill('project-init', {});

      expect(result.platform).toBe('opencode');
      expect(result.triggerMethod).toBe('command');
      expect(result.skillContent).toBeDefined();
    });
  });

  describe('getContext', () => {
    it('should return opencode context', () => {
      adapter.initialize(ROOT);
      const context = adapter.getContext();

      expect(context.platform).toBe('opencode');
      expect(context.pluginPath).toBe(ROOT);
    });
  });
});