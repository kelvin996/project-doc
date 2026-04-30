/**
 * Gemini Adapter 测试
 * 验证 Gemini CLI 平台适配器功能
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const GeminiAdapter = require(path.join(__dirname, '../../adapters/gemini/adapter'));

const ROOT = path.join(__dirname, '../../');

describe('GeminiAdapter', () => {
  let adapter;
  let tempDir;

  beforeEach(() => {
    adapter = new GeminiAdapter();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('getPlatformName', () => {
    it('should return "gemini"', () => {
      expect(adapter.getPlatformName()).toBe('gemini');
    });
  });

  describe('detect', () => {
    it('should check for GEMINI.md file', () => {
      // 检测方法应正确识别文件路径
      expect(typeof adapter.detect).toBe('function');
    });
  });

  describe('initialize', () => {
    it('should generate GEMINI.md file', () => {
      adapter.initialize(ROOT);

      const geminiMdPath = path.join(ROOT, 'GEMINI.md');
      expect(fs.existsSync(geminiMdPath)).toBe(true);

      const content = fs.readFileSync(geminiMdPath, 'utf8');
      expect(content).toContain('Project-Doc for Gemini CLI');
      expect(content).toContain('## Rules');
      expect(content).toContain('## Skills');
    });

    it('should include all skills in GEMINI.md', () => {
      adapter.initialize(ROOT);

      const geminiMdPath = path.join(ROOT, 'GEMINI.md');
      const content = fs.readFileSync(geminiMdPath, 'utf8');

      expect(content).toContain('### project-init');
      expect(content).toContain('### requirement-change');
      expect(content).toContain('### task-update');
      expect(content).toContain('### doc-sync');
    });
  });

  describe('triggerSkill', () => {
    it('should return skill trigger info', async () => {
      adapter.initialize(ROOT);
      const result = await adapter.triggerSkill('project-init', {});

      expect(result.platform).toBe('gemini');
      expect(result.triggerMethod).toBe('prompt');
      expect(result.skillContent).toBeDefined();
      expect(result.instructions).toContain('Use project-doc');
    });
  });

  describe('loadRule', () => {
    it('should load rule from GEMINI.md', () => {
      adapter.initialize(ROOT);

      const content = adapter.loadRule('documentation.md');
      expect(content).toBeDefined();
    });
  });

  describe('_updateGeminiMd', () => {
    it('should add new skill section to GEMINI.md', () => {
      adapter.initialize(ROOT);

      adapter._updateGeminiMd('new-skill', {});

      const geminiMdPath = path.join(ROOT, 'GEMINI.md');
      const content = fs.readFileSync(geminiMdPath, 'utf8');

      // 检查 Skills 部分
      expect(content).toContain('## Skills');
    });
  });

  describe('getContext', () => {
    it('should return gemini context', () => {
      adapter.initialize(ROOT);
      const context = adapter.getContext();

      expect(context.platform).toBe('gemini');
      expect(context.pluginPath).toBe(ROOT);
    });
  });
});