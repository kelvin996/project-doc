# GitHub Release 手动操作指南

> 由于 GitHub CLI 未认证，请手动在网页上创建 Release

---

## 操作步骤

### 1. 访问 GitHub 仓库

```
https://github.com/kelvin996/project-doc/releases
```

### 2. 点击 "Draft a new release"

### 3. 填写 Release 信息

**Tag version**: `v0.2.0`

**Release title**: `v0.2.0 - Runtime Core`

**Release notes**（复制以下内容）:

```markdown
## Project-Doc v0.2.0 - Runtime Core

**让文档追着代码跑，现在自动了。**

### 🎉 核心更新

- **runtime/trigger-engine.js**：文件监听触发（自动化核心）
- **runtime/skill-runner.js**：skill 执行器
- **runtime/context-manager.js**：上下文管理
- **runtime/cooldown-guard.js**：防触发风暴机制
- **多语言预设**：`/project-init --lang zh/en`

### 📊 测试覆盖

- 55 个测试全部通过
- Prompt regression 测试（AI 行为变更检测）

### 🔗 与 superpowers 互补

- superpowers：教你写代码
- project-doc：帮你管产物

建议同时安装两者，获得完整 AI 编程体验。

---

**完整更新日志**: 查看 [CHANGELOG.md](CHANGELOG.md)

## Installation

```bash
/plugin install project-doc@claude-plugins-official
```

## Quick Start

```
/project-init
```

---

🤖 Generated with Claude Code
```

### 4. 点击 "Publish release"

---

## 已推送的 Git Tag

```
v0.1.0
v0.2.0
```

Git tag 已推送成功，只需在 GitHub 网页上创建 Release 对应 tag。

---

**完成后请通知 Operations 执行社区发布公告。**