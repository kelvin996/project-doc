/**
 * Claude Adapter 测试
 * 验证 Claude Code 平台适配器功能
 */

const path = require('path');
const fs = require('fs');
const ClaudeAdapter = require(path.join(__dirname, '../../adapters/claude/adapter'));

// Mock ROOT path
const ROOT = path.join(__dirname, '../../');

describe('ClaudeAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new ClaudeAdapter();
  });

  describe('getPlatformName', () => {
    it('should return "claude"', () => {
      expect(adapter.getPlatformName()).toBe('claude');
    });
  });

  describe('detect', () => {
    it('should detect Claude Code environment', () => {
      // Mock .claude-plugin/plugin.json 存在
      const pluginPath = path.join(ROOT, '.claude-plugin/plugin.json');
      expect(adapter.detect()).toBe(fs.existsSync(pluginPath));
    });
  });

  describe('initialize', () => {
    it('should load config from plugin.json', () => {
      const pluginPath = ROOT;
      adapter.initialize(pluginPath);

      expect(adapter.pluginPath).toBe(pluginPath);
      expect(adapter.config).toBeDefined();
      expect(adapter.config.name).toBe('project-doc');
    });
  });

  describe('getSkills', () => {
    it('should return array of skill names', () => {
      adapter.initialize(ROOT);
      const skills = adapter.getSkills();

      expect(Array.isArray(skills)).toBe(true);
      expect(skills).toContain('project-init');
      expect(skills).toContain('requirement-change');
      expect(skills).toContain('task-update');
      expect(skills).toContain('doc-sync');
    });
  });

  describe('getRules', () => {
    it('should return rules array', () => {
      adapter.initialize(ROOT);
      const rules = adapter.getRules();

      expect(Array.isArray(rules)).toBe(true);
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some(r => r.includes('documentation.md'))).toBe(true);
    });
  });

  describe('getContext', () => {
    it('should return context object', () => {
      adapter.initialize(ROOT);
      const context = adapter.getContext();

      expect(context.platform).toBe('claude');
      expect(context.pluginPath).toBe(ROOT);
      expect(context.cwd).toBeDefined();
    });
  });

  describe('loadRule', () => {
    it('should load rule file content', () => {
      adapter.initialize(ROOT);
      const content = adapter.loadRule('rules/documentation.md');

      expect(content).toBeDefined();
      expect(content.length).toBeGreaterThan(0);
    });

    it('should throw error for non-existent rule', () => {
      adapter.initialize(ROOT);
      expect(() => adapter.loadRule('rules/non-existent.md')).toThrow('Rule file not found');
    });
  });

  describe('triggerSkill', () => {
    it('should return skill content', async () => {
      adapter.initialize(ROOT);
      const result = await adapter.triggerSkill('project-init', {});

      expect(result.platform).toBe('claude');
      expect(result.skillName).toBe('project-init');
      expect(result.triggerMethod).toBe('slash-command');
      expect(result.skillContent).toBeDefined();
    });

    it('should throw error for non-existent skill', async () => {
      adapter.initialize(ROOT);
      await expect(adapter.triggerSkill('non-existent', {})).rejects.toThrow('Skill non-existent not found');
    });
  });

  describe('registerSkill', () => {
    it('should register new skill in config', () => {
      adapter.initialize(ROOT);

      const result = adapter.registerSkill('test-skill', {
        userInvocable: true,
        trigger: 'manual'
      });

      expect(result).toBe(true);
      expect(adapter.config.skills['test-skill']).toBeDefined();
      expect(adapter.config.skills['test-skill'].userInvocable).toBe(true);
    });
  });
});