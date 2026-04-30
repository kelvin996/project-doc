const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

describe('skill-rule binding integration', () => {
  const ruleBindingPath = path.join(ROOT, '.claude-plugin/rule-binding.json');
  const triggerSpecPath = path.join(ROOT, '.claude-plugin/trigger-spec.json');
  const pluginPath = path.join(ROOT, '.claude-plugin/plugin.json');

  let ruleBinding, triggerSpec, plugin;

  beforeAll(() => {
    ruleBinding = JSON.parse(fs.readFileSync(ruleBindingPath, 'utf8'));
    triggerSpec = JSON.parse(fs.readFileSync(triggerSpecPath, 'utf8'));
    plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  });

  it('each skill in plugin.json should have binding', () => {
    const skills = Object.keys(plugin.skills);

    skills.forEach(skillName => {
      const binding = ruleBinding.bindings.find(b => b.skill === skillName);
      expect(binding).toBeDefined();
    });
  });

  it('each binding should reference valid rules', () => {
    ruleBinding.bindings.forEach(binding => {
      binding.applies_rules.forEach(ruleFile => {
        const rulePath = path.join(ROOT, 'rules', ruleFile);
        expect(fs.existsSync(rulePath)).toBe(true);
      });
    });
  });

  it('trigger types should match trigger-spec.json', () => {
    ruleBinding.bindings.forEach(binding => {
      expect(triggerSpec.trigger_types[binding.trigger]).toBeDefined();
    });
  });

  it('manual trigger skills should be user invocable', () => {
    ruleBinding.bindings
      .filter(b => b.trigger === 'manual')
      .forEach(binding => {
        expect(binding.user_invocable).toBe(true);
        expect(plugin.skills[binding.skill].userInvocable).toBe(true);
      });
  });

  it('auto trigger skills should have cooldown', () => {
    ruleBinding.bindings
      .filter(b => b.trigger !== 'manual')
      .forEach(binding => {
        expect(binding.cooldown_seconds).toBeDefined();
        expect(binding.cooldown_seconds).toBeGreaterThan(0);
      });
  });

  it('file-change skills should have watch_paths', () => {
    ruleBinding.bindings
      .filter(b => b.trigger === 'file-change')
      .forEach(binding => {
        expect(binding.watch_paths).toBeDefined();
        expect(binding.watch_paths.length).toBeGreaterThan(0);
      });
  });

  it('lifecycle skills should have events', () => {
    ruleBinding.bindings
      .filter(b => b.trigger === 'lifecycle')
      .forEach(binding => {
        expect(binding.events).toBeDefined();
        expect(binding.events.length).toBeGreaterThan(0);
      });
  });
});