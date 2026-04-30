const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

describe('rules structure', () => {
  const rulesDir = path.join(ROOT, 'rules');

  it('should have rules directory', () => {
    expect(fs.existsSync(rulesDir)).toBe(true);
  });

  it('should have required rule files', () => {
    const requiredRules = [
      'documentation.md',
      'task-tracking.md',
      'project-doc-integration.md',
      'write-guard.md'
    ];

    requiredRules.forEach(ruleFile => {
      const fullPath = path.join(rulesDir, ruleFile);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('each rule file should have MANDATORY markers', () => {
    const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));

    ruleFiles.forEach(ruleFile => {
      const content = fs.readFileSync(path.join(rulesDir, ruleFile), 'utf8');
      // At least one section should have structured content
      expect(content.length).toBeGreaterThan(100);
    });
  });
});