# Project-Doc

<!-- 徽章区 -->
[![GitHub release](https://img.shields.io/github/v/release/kelvin996/project-doc?include_prereleases)](https://github.com/kelvin996/project-doc/releases)
[![License](https://img.shields.io/github/license/kelvin996/project-doc)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/kelvin996/project-doc?style=social)](https://github.com/kelvin996/project-doc)
[![CI](https://github.com/kelvin996/project-doc/actions/workflows/validate.yml/badge.svg)](https://github.com/kelvin996/project-doc/actions)

**让文档追着代码跑，而非反之。**

> 文档自动化治理插件，专为 Claude Code 打造。
> 与 [superpowers](https://github.com/obra/superpowers) 互补 —— 它教你写代码，我们帮你管产物。

---

## 💡 为什么做这个插件？

**痛点叙事**：

> "我的需求文档散落各处，每次变更都找不到源头...  
> 任务状态全靠脑子记，新人入职一问三不知...  
> git log 里翻半天，才知道这个功能是谁改的..."

**解决方案**：

所以我做了 **project-doc** —— 一个让 AI 帮你管理项目的插件。

**核心理念**：

> 🔄 **让文档追着代码跑**  
> 代码变更时，文档自动同步。  
> 任务完成时，状态自动更新。  
> 不再有"失踪"的需求，不再有"过期"的 README。

---

## ✨ 核心能力

| 命令 | 功能 | 触发方式 | 一句话描述 |
|------|------|----------|------------|
| `/project-init` | 构建文档目录 | 手动 | 一键创建标准结构 |
| `/project-init --lang en` | 英文模板 | 手动 | 多语言预设 |
| `/req-change` | 需求变更追溯 | 手动 | 每次变更有记录 |
| `task-update` | 任务状态同步 | **自动** | commit 后自动更新 |
| `doc-sync` | 文档索引同步 | **自动** | 文件变更自动更新 |

### 🎯 三大差异化优势

| 优势 | 说明 | 竞品对比 |
|------|------|----------|
| **文档自动化** | 文件变更自动触发索引更新 | superpowers 缺此功能 |
| **多语言模板** | `--lang zh/en` 参数支持 | 中国开发者友好 |
| **安全机制** | write-guard 防止覆盖已有文档 | 可靠的自动化 |

---

## 🚀 快速开始（5 分钟）

### 安装

```bash
# Claude Code 插件市场（推荐）
/plugin install project-doc@claude-plugins-official

# 或手动安装
git clone https://github.com/kelvin996/project-doc.git
ln -sf $(pwd)/project-doc ~/.claude/plugins/project-doc
```

### 使用（只需 2 步）

**Step 1: 初始化项目**

```
/project-init
```

输出：
```
✅ 项目文档结构已初始化

创建的目录：
- docs/01-requirements/
- docs/02-design/
- docs/03-technical/
- docs/04-management/
- docs/05-archive/

创建的文件：
- docs/DOC_INDEX.md
- docs/04-management/TASK_TRACKER.md
- docs/04-management/CHANGELOG.md
```

**Step 2: 正常开发**

当你完成代码提交时，`task-update` 和 `doc-sync` 会自动触发：
- 任务状态自动更新到 `TASK_TRACKER.md`
- 文档索引自动同步到 `DOC_INDEX.md`

---

## 📁 文档目录结构

```
docs/
├── 01-requirements/   # 需求文档（PRD、用户故事）
├── 02-design/         # 设计文档（架构、API、UI/UX）
├── 03-technical/      # 技术文档（环境、部署、算法）
├── 04-management/     # 管理文档（任务追踪、变更记录）
├── 05-archive/        # 废弃文档归档
└── DOC_INDEX.md       # 文档总索引（入口）
```

---

## 🔧 功能详解

### `/project-init` - 标准化开局

一键构建生产级文档目录，告别"文档散落各处"。

**参数**：
- `--lang zh`：中文模板（默认）
- `--lang en`：英文模板

### `/req-change` - 需求变更追溯

每次变更记录：
- 变更原因
- 影响范围
- 决策过程

输出到 `CHANGELOG.md`，历史可追溯。

### `task-update` - 自动任务追踪（自动触发）

当 Git commit 包含任务 ID 时自动触发：
```
feat: add login (T-001)
```

自动更新 `TASK_TRACKER.md`：
```markdown
| T-001 | 实现登录功能 | [x] 已完成 | commit: abc123 |
```

### `doc-sync` - 自动索引同步（自动触发）

当 `docs/` 目录文件变更时自动触发：
- 新建文档 → 自动添加到索引
- 删除文档 → 自动移除索引
- 修改文档 → 自动更新摘要

---

## 🛡️ 安全机制

Project-Doc 内置 **write-guard** 安全规则：

| 保护机制 | 说明 |
|----------|------|
| 文件保护 | 已有文档不会被自动覆盖 |
| 冷却机制 | 3秒内不重复触发同一文件 |
| 用户确认 | 关键操作需显式确认 |

---

## 📊 开发路线图

| Phase | 目标 | 状态 | 版本 |
|-------|------|------|------|
| Phase 1 | 工程化外壳（package.json、CI/CD） | ✅ 完成 | v0.1.0 |
| Phase 2 | runtime 核心（trigger-engine、自动触发） | ✅ 完成 | v0.2.0 |
| Phase 3 | 多平台适配（Cursor、OpenCode） | 📋 待启动 | v1.0.0 |

---

## 🤝 与 superpowers 的关系

**互补而非竞争**：

| superpowers | project-doc |
|-------------|-------------|
| 教你**怎么写**代码 | 帮你**管代码产物** |
| TDD、调试、最佳实践 | 文档、任务、变更追溯 |
| 开发流程优化 | 项目治理优化 |

**建议**：同时安装两者，获得完整的 AI 编程体验。

---

## 🙋 常见问题

### Q: 会覆盖我的已有文档吗？

**A**: 不会。write-guard 会检查保护范围，已有文档需用户确认才能修改。

### Q: 自动触发会影响性能吗？

**A**: 不会。cooldown-guard 确保 3 秒内不重复触发，且只监听 `docs/` 目录。

### Q: 支持其他 IDE 吗？

**A**: Phase 3 将支持 Cursor、OpenCode。欢迎贡献适配器！

---

## 📦 配置文件

| 文件 | 用途 |
|------|------|
| `.claude-plugin/plugin.json` | 插件配置入口 |
| `.claude-plugin/rule-binding.json` | skills↔rules 依赖映射 |
| `.claude-plugin/trigger-spec.json` | 触发协议定义 |
| `.claude/cooldown-state.json` | 冷却状态存储 |

---

## 🌟 贡献

欢迎提交 Issue 和 Pull Request！

- **GitHub**: https://github.com/kelvin996/project-doc
- **Issues**: https://github.com/kelvin996/project-doc/issues
- **License**: MIT

---

## 📝 致谢

- 灵感来源于 [superpowers](https://github.com/obra/superpowers) 的工程化实践
- 感谢 Claude Code 提供的 AI 编程平台
- 感谢所有开源贡献者

---

> **让文档追着代码跑**  
> 尝试 `/project-init`，开始你的自动化项目治理之旅。