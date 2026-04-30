const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

describe('plugin.json structure', () => {
  const pluginPath = path.join(ROOT, '.claude-plugin/plugin.json');

  it('should exist', () => {
    expect(fs.existsSync(pluginPath)).toBe(true);
  });

  it('should have valid JSON', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    expect(json.name).toBe('project-doc');
  });

  it('should have required fields', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    expect(json.rules).toBeDefined();
    expect(json.rules.length).toBeGreaterThan(0);
    expect(json.skills).toBeDefined();
    expect(Object.keys(json.skills).length).toBeGreaterThan(0);
  });

  it('should have valid rules paths', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    json.rules.forEach(rulePath => {
      const fullPath = path.join(ROOT, rulePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('should have valid skills paths', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    Object.values(json.skills).forEach(skill => {
      const fullPath = path.join(ROOT, skill.path);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('should have ruleBinding reference', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    expect(json.ruleBinding).toBeDefined();
    const fullPath = path.join(ROOT, json.ruleBinding);
    expect(fs.existsSync(fullPath)).toBe(true);
  });

  it('should have triggerSpec reference', () => {
    const content = fs.readFileSync(pluginPath, 'utf8');
    const json = JSON.parse(content);
    expect(json.triggerSpec).toBeDefined();
    const fullPath = path.join(ROOT, json.triggerSpec);
    expect(fs.existsSync(fullPath)).toBe(true);
  });
});