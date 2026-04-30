#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const requiredFiles = [
  '.claude-plugin/plugin.json',
  'package.json',
  'LICENSE',
  'CHANGELOG.md',
  'README.md'
];

const requiredDirs = [
  'rules',
  'skills',
  'templates'
];

let errors = [];
let warnings = [];

// Check files
requiredFiles.forEach(file => {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing file: ${file}`);
  }
});

// Check directories
requiredDirs.forEach(dir => {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing directory: ${dir}`);
  }
});

// Validate plugin.json
try {
  const pluginJson = JSON.parse(
    fs.readFileSync(path.join(ROOT, '.claude-plugin/plugin.json'), 'utf8')
  );

  if (!pluginJson.rules || pluginJson.rules.length === 0) {
    errors.push('plugin.json missing rules field');
  }

  if (!pluginJson.skills || Object.keys(pluginJson.skills).length === 0) {
    errors.push('plugin.json missing skills field');
  }

  // Validate rules paths exist
  if (pluginJson.rules) {
    pluginJson.rules.forEach(rulePath => {
      const fullPath = path.join(ROOT, rulePath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Rule file not found: ${rulePath}`);
      }
    });
  }

  // Validate skills paths exist
  if (pluginJson.skills) {
    Object.entries(pluginJson.skills).forEach(([name, skill]) => {
      const fullPath = path.join(ROOT, skill.path);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Skill file not found: ${skill.path}`);
      }
    });
  }

} catch (e) {
  errors.push(`plugin.json parse error: ${e.message}`);
}

// Validate package.json
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
  );

  if (!packageJson.version) {
    warnings.push('package.json missing version');
  }

  if (!packageJson.scripts || !packageJson.scripts.test) {
    warnings.push('package.json missing test script');
  }

} catch (e) {
  errors.push(`package.json parse error: ${e.message}`);
}

// Check skill directories have SKILL.md
const skillsDir = path.join(ROOT, 'skills');
if (fs.existsSync(skillsDir)) {
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  skillDirs.forEach(skillName => {
    const skillPath = path.join(skillsDir, skillName, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      errors.push(`Skill ${skillName} missing SKILL.md`);
    }
  });
}

// Report
console.log('\n=== Project-Doc Validation ===\n');

if (warnings.length > 0) {
  console.log('Warnings:');
  warnings.forEach(warn => console.log(`  ⚠️  ${warn}`));
  console.log('');
}

if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(err => console.log(`  ❌ ${err}`));
  console.log('\n❌ Validation FAILED\n');
  process.exit(1);
} else {
  console.log('✅ Validation PASSED\n');
  process.exit(0);
}