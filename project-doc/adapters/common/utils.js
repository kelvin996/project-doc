/**
 * 共享工具函数
 */

const fs = require('fs');
const path = require('path');

/**
 * 合并多个 markdown 文件为单个文件
 * @param {string[]} files - 文件路径列表
 * @param {string} outputPath - 输出文件路径
 * @param {string} separator - 分隔符
 */
function mergeMarkdownFiles(files, outputPath, separator = '\n\n---\n\n') {
  let content = '';

  files.forEach(file => {
    if (fs.existsSync(file)) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const fileName = path.basename(file);
      content += `## ${fileName}\n\n${fileContent}${separator}`;
    }
  });

  fs.writeFileSync(outputPath, content);
  return content;
}

/**
 * 检测文件是否存在
 * @param {string} filePath
 * @returns {boolean}
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * 读取 JSON 文件
 * @param {string} filePath
 * @returns {object}
 */
function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * 写入 JSON 文件
 * @param {string} filePath
 * @param {object} data
 */
function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * 获取项目根目录
 * @returns {string}
 */
function getProjectRoot() {
  // 向上查找直到找到 package.json 或 .git
  let currentDir = process.cwd();

  while (currentDir !== '/') {
    if (fs.existsSync(path.join(currentDir, 'package.json')) ||
        fs.existsSync(path.join(currentDir, '.git'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return process.cwd();
}

/**
 * 复制目录
 * @param {string} src
 * @param {string} dest
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * 深度合并对象
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
function deepMerge(target, source) {
  const result = { ...target };

  Object.keys(source).forEach(key => {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

module.exports = {
  mergeMarkdownFiles,
  fileExists,
  readJsonFile,
  writeJsonFile,
  getProjectRoot,
  copyDirectory,
  deepMerge
};