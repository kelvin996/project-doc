# Project-Doc

**让文档追着代码跑，而非反之。**

## 不再有"失踪"的需求，不再有"过期"的 README

你是否也曾经历过：
- 代码改完了，任务看板还没更？
- 需求变了三次，文档还是 V1.0？
- 新人入职问"这个功能在哪看"，你只能发个 git log？

Project-Doc 是专为 **Claude Code** 深度定制的项目治理专家。它不仅仅是 4 个 Skill，而是将**文档自动化**植入你的 Git 循环。

## 核心能力

| 命令 | 功能 | 触发方式 |
|------|------|----------|
| `/project-init` | 一键构建标准文档目录 | 手动 |
| `/req-change` | 需求变更追溯记录 | 手动 |
| `task-update` | 任务状态自动同步 | 自动 |
| `doc-sync` | 文档索引实时同步 | 自动 |

## 为什么选择 Project-Doc？

### 原子化追踪
每一次 `task-update` 都是对未来的负责。任务状态自动关联 Git commit。

### 强一致性
`doc-sync` 确保你的技术规格书与 `main` 分支永远同步，无需手动维护索引。

### 标准化开局
`/project-init` 一键构建符合行业标准的生产级目录结构，告别"文档散落各处"。

### 多语言支持
支持中文/英文模板预设（`--lang zh/en`），中国开发者友好。

## 文档目录结构

```
docs/
├── 01-requirements/   # 需求文档（PRD、用户故事）
├── 02-design/         # 设计文档（架构、API、UI/UX）
├── 03-technical/      # 技术文档（环境、部署、算法）
├── 04-management/     # 管理文档（任务追踪、变更记录）
├── 05-archive/        # 废弃文档归档
└── DOC_INDEX.md       # 文档总索引（入口）
```

## 安装

### Claude Code 插件市场（推荐）

```bash
/plugin install project-doc@claude-plugins-official
```

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/kelvin996/project-doc.git

# 符号链接安装（便于更新）
ln -sf $(pwd)/project-doc ~/.claude/plugins/project-doc
```

### 验证安装

```bash
# 检查配置
cat ~/.claude/plugins/project-doc/.claude-plugin/plugin.json | python3 -m json.tool

# 测试命令
# 在 Claude Code 中输入 /project-init
```

## 快速开始

### 1. 初始化项目

```
/project-init
```

Claude Code 会自动创建标准文档目录结构和核心文件。

### 2. 创建需求文档

在 `docs/01-requirements/` 下创建需求文档，使用命名规范：
- `01_REQ_LoginFeature_2026-04-30.md`

### 3. 记录变更

当需求变更时：

```
/req-change
```

Claude Code 会引导你填写变更内容并记录到 CHANGELOG.md。

### 4. 自动追踪

当你完成代码提交，`task-update` 和 `doc-sync` 会自动更新任务状态和文档索引。

## 与 Git 集成

Project-Doc 扩展了 commit 格式：

```
<type>: <description> (TASK_ID)

示例：
feat: add login feature (T-001)
fix: resolve auth timeout (T-002)
```

任务 ID 自动关联到 `docs/04-management/TASK_TRACKER.md`。

## 安全机制

Project-Doc 内置 **write-guard** 安全规则：

- 自动写入前检查目标文件是否在保护范围
- 已有文档不会被自动覆盖
- 触发冷却机制防止无限循环

## 配置文件

| 文件 | 用途 |
|------|------|
| `.claude-plugin/plugin.json` | 插件配置入口 |
| `.claude-plugin/rule-binding.json` | skills↔rules 依赖映射 |
| `.claude-plugin/trigger-spec.json` | 触发协议定义 |
| `.claude/cooldown-state.json` | 冷却状态存储 |

## 开发状态

| Phase | 目标 | 状态 |
|-------|------|------|
| Phase 1 | 工程化外壳 | ✅ 完成 |
| Phase 2 | runtime 核心（trigger-engine） | 🚧 开发中 |
| Phase 3 | 多平台适配（Cursor、OpenCode） | 📋 待启动 |

## 贡献

欢迎提交 Issue 和 Pull Request！

- GitHub: https://github.com/kelvin996/project-doc
- License: MIT

## 致谢

灵感来源于 [superpowers](https://github.com/obra/superpowers) 插件的工程化实践。