/**
 * Prompt Regression 测试
 * 检测 AI 行为变更 - 这是 AI 插件最关键的测试类型
 *
 * 原理：
 * - 固定输入 prompt
 * - 记录关键输出结构（snapshot）
 * - 后续变更时比较输出差异
 * - 变化必须人工确认
 */

const fs = require('fs');
const path = require('path');
const SkillRunner = require('../../runtime/skill-runner');
const ContextManager = require('../../runtime/context-manager');

// 固定测试输入
const FIXED_INPUTS = {
  'project-init-zh': {
    projectPath: '/tmp/test-project-zh',
    lang: 'zh'
  },
  'project-init-en': {
    projectPath: '/tmp/test-project-en',
    lang: 'en'
  },
  'doc-sync': {
    filePath: '/tmp/test-project/docs/DOC_INDEX.md',
    triggerType: 'file-change'
  },
  'task-update': {
    taskId: 'T-001',
    status: 'completed',
    triggerType: 'lifecycle',
    event: 'task-complete'
  }
};

// 期望输出结构（关键点）
const EXPECTED_OUTPUT_STRUCTURE = {
  'project-init': {
    requiredKeys: ['skillName', 'skillDef', 'rules', 'input', 'instructions'],
    skillDefKeys: ['name', 'frontmatter', 'description'],
    rulesCount: 1 // documentation.md
  },
  'doc-sync': {
    requiredKeys: ['skillName', 'skillDef', 'rules', 'input'],
    rulesCount: 2 // documentation.md, project-doc-integration.md
  },
  'task-update': {
    requiredKeys: ['skillName', 'skillDef', 'rules', 'input'],
    rulesCount: 2 // task-tracking.md, project-doc-integration.md
  }
};

describe('Prompt Regression Tests', () => {
  let runner;
  let contextManager;
  const pluginPath = path.join(__dirname, '../..');

  beforeAll(() => {
    // 加载 rule-bindings
    const ruleBindingsPath = path.join(pluginPath, '.claude-plugin/rule-binding.json');
    const ruleBindings = JSON.parse(fs.readFileSync(ruleBindingsPath, 'utf8'));

    contextManager = new ContextManager('/tmp/test-regression-contexts');
    runner = new SkillRunner(contextManager, ruleBindings);
    runner.setPluginPath(pluginPath);
  });

  describe('project-init output structure', () => {
    it('zh template output should have required structure', async () => {
      const input = FIXED_INPUTS['project-init-zh'];
      const output = await runner.execute('project-init', input);

      // 检查必需字段
      const expected = EXPECTED_OUTPUT_STRUCTURE['project-init'];
      expected.requiredKeys.forEach(key => {
        expect(output[key]).toBeDefined();
      });

      // 检查 skillDef 结构
      expected.skillDefKeys.forEach(key => {
        expect(output.skillDef[key]).toBeDefined();
      });

      // 检查规则数量
      expect(output.rules.length).toBe(expected.rulesCount);

      // 检查输入语言参数传递正确
      expect(output.input.lang).toBe('zh');
    });

    it('en template output should have required structure', async () => {
      const input = FIXED_INPUTS['project-init-en'];
      const output = await runner.execute('project-init', input);

      // 检查必需字段
      const expected = EXPECTED_OUTPUT_STRUCTURE['project-init'];
      expected.requiredKeys.forEach(key => {
        expect(output[key]).toBeDefined();
      });

      // 检查输入语言参数传递正确
      expect(output.input.lang).toBe('en');
    });

    it('skill instructions should not change unexpectedly', async () => {
      const input = FIXED_INPUTS['project-init-zh'];
      const output = await runner.execute('project-init', input);

      // 检查关键指令内容存在
      const instructions = output.instructions;
      expect(instructions.length).toBeGreaterThan(100);

      // 关键流程步骤应该存在
      expect(instructions).toContain('执行流程');
      expect(instructions).toContain('创建文档目录');
      expect(instructions).toContain('复制模板文件');
    });
  });

  describe('doc-sync output structure', () => {
    it('should have required structure', async () => {
      const input = FIXED_INPUTS['doc-sync'];
      const output = await runner.execute('doc-sync', input);

      const expected = EXPECTED_OUTPUT_STRUCTURE['doc-sync'];
      expected.requiredKeys.forEach(key => {
        expect(output[key]).toBeDefined();
      });

      expect(output.rules.length).toBe(expected.rulesCount);
    });
  });

  describe('task-update output structure', () => {
    it('should have required structure', async () => {
      const input = FIXED_INPUTS['task-update'];
      const output = await runner.execute('task-update', input);

      const expected = EXPECTED_OUTPUT_STRUCTURE['task-update'];
      expected.requiredKeys.forEach(key => {
        expect(output[key]).toBeDefined();
      });

      expect(output.rules.length).toBe(expected.rulesCount);
    });
  });

  describe('frontmatter consistency', () => {
    it('project-init frontmatter should be stable', async () => {
      const input = FIXED_INPUTS['project-init-zh'];
      const output = await runner.execute('project-init', input);

      const fm = output.skillDef.frontmatter;

      // 关键 frontmatter 字段应稳定
      expect(fm.name).toBe('project-init');
      expect(fm.userInvocable).toBe('true');
    });
  });

  describe('rules binding consistency', () => {
    it('each skill should have consistent rule bindings', async () => {
      const skills = ['project-init', 'doc-sync', 'task-update'];

      for (const skillName of skills) {
        const input = { test: true };
        const output = await runner.execute(skillName, input);

        // 检查规则文件路径一致
        output.rules.forEach(rule => {
          expect(rule.file).toBeDefined();
          expect(rule.content).toBeDefined();
          expect(rule.content.length).toBeGreaterThan(100);
        });
      }
    });
  });
});

/**
 * 使用说明：
 *
 * 当 SKILL.md 或 rules 文件变更时：
 * 1. 运行此测试
 * 2. 如果测试失败，检查是否是预期变更
 * 3. 如果是预期变更，更新 EXPECTED_OUTPUT_STRUCTURE
 * 4. 如果不是预期变更，说明行为被意外修改，需要调查
 *
 * Jest snapshot 模式（可选）：
 * expect(output.instructions).toMatchSnapshot()
 * 运行 jest -u 更新 snapshot
 */