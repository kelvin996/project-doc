const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

describe('skills structure', () => {
  const skillsDir = path.join(ROOT, 'skills');

  it('should have skills directory', () => {
    expect(fs.existsSync(skillsDir)).toBe(true);
  });

  it('should have required skills', () => {
    const requiredSkills = ['project-init', 'requirement-change', 'task-update', 'doc-sync'];

    requiredSkills.forEach(skillName => {
      const skillDir = path.join(skillsDir, skillName);
      expect(fs.existsSync(skillDir)).toBe(true);
    });
  });

  it('each skill should have SKILL.md', () => {
    const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    skillDirs.forEach(skillName => {
      const skillPath = path.join(skillsDir, skillName, 'SKILL.md');
      expect(fs.existsSync(skillPath)).toBe(true);
    });
  });

  it('SKILL.md should have required frontmatter', () => {
    const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    skillDirs.forEach(skillName => {
      const skillPath = path.join(skillsDir, skillName, 'SKILL.md');
      const content = fs.readFileSync(skillPath, 'utf8');

      // Check frontmatter exists
      expect(content.startsWith('---')).toBe(true);
      expect(content.includes('name:')).toBe(true);
      expect(content.includes('description:')).toBe(true);
    });
  });
});