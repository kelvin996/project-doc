const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

describe('templates snapshot', () => {
  const templatesDir = path.join(ROOT, 'templates');

  it('should have templates directory', () => {
    expect(fs.existsSync(templatesDir)).toBe(true);
  });

  it('should have zh (Chinese) templates', () => {
    const zhDir = path.join(templatesDir, 'zh');
    expect(fs.existsSync(zhDir)).toBe(true);
  });

  it('should have en (English) templates', () => {
    const enDir = path.join(templatesDir, 'en');
    expect(fs.existsSync(enDir)).toBe(true);
  });

  it('should have all required templates in zh', () => {
    const requiredTemplates = [
      'DOC_INDEX.md',
      'TASK_TRACKER.md',
      'CHANGELOG.md',
      'REQ_template.md',
      'ARCH_template.md',
      'TECH_template.md',
      'MOM_template.md'
    ];

    const zhDir = path.join(templatesDir, 'zh');
    requiredTemplates.forEach(template => {
      const fullPath = path.join(zhDir, template);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('should have all required templates in en', () => {
    const requiredTemplates = [
      'DOC_INDEX.md',
      'TASK_TRACKER.md',
      'CHANGELOG.md',
      'REQ_template.md',
      'ARCH_template.md',
      'TECH_template.md',
      'MOM_template.md'
    ];

    const enDir = path.join(templatesDir, 'en');
    requiredTemplates.forEach(template => {
      const fullPath = path.join(enDir, template);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('template content should have basic structure', () => {
    const zhDir = path.join(templatesDir, 'zh');
    const docIndexPath = path.join(zhDir, 'DOC_INDEX.md');
    const content = fs.readFileSync(docIndexPath, 'utf8');

    expect(content.includes('项目')).toBe(true);
    expect(content.includes('导航')).toBe(true);
  });
});