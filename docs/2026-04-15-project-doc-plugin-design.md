# Project-Doc Plugin Design Specification

> **设计日期**: 2026-04-15
> **设计者**: Claude + 用户协作 + 外部专家意见
> **插件名称**: project-doc
> **插件范围**: 文档归档 + 任务追踪，轻量级

---

## 1. 问题背景

### 用户痛点

| 维度 | 具体问题 |
|------|----------|
| **需求管理** | 需求散落、变更无追溯、需求与实现脱节 |
| **任务跟踪** | 任务遗漏、进度不透明、上下文丢失 |
| **文档归档** | 位置混乱、分类不清、命名无规范 |

### 现有规则覆盖情况

| 问题 | 现有规则覆盖 | 缺失部分 |
|------|-------------|---------|
| 需求散落 | ✅ 需求分析框架定义了输出格式 | ❌ 未定义需求文档存放位置 |
| 需求变更无追溯 | ❌ 无变更追溯机制 | 需新增 |
| 需求与实现脱节 | ✅ Review 检查点有阻断机制 | ✅ 已覆盖 |
| 任务遗漏 | ✅ Plan First + task_list | ❌ 未定义任务状态追踪文件 |
| 进度不透明 | ❌ 无进度可视化机制 | 需新增 |
| 上下文丢失 | ❌ 无会话恢复机制 | 需新增 |
| 文档位置混乱 | ❌ 未定义文档目录结构 | 需新增 |
| 文档分类不清 | ❌ 未定义文档类型分类 | 需新增 |
| 文档命名无规范 | ❌ 未定义命名规范 | 需新增 |

---

## 2. 设计方案

### 2.1 插件概览

| 项目 | 内容 |
|------|------|
| **插件名称** | project-doc |
| **插件范围** | 文档归档 + 任务追踪，轻量级 |
| **触发方式** | 初始化类手动触发，更新类自动触发 |

### 2.2 文件结构

```
project-doc/
├── plugin.json                    # 插件配置
├── README.md                      # 安装说明（含补丁说明）
├── rules/
│   ├── documentation.md           # 文档归档规则
│   ├── task-tracking.md           # 任务追踪规则
│   └── project-doc-integration.md # 集成规则（自动补全现有工作流）
├── skills/
│   ├── project-init/
│   │   └── SKILL.md               # 手动触发：/project-init
│   ├── requirement-change/
│   │   └── SKILL.md               # 手动触发：/req-change
│   ├── task-update/
│   │   └── SKILL.md               # 自动触发：任务开始/完成时
│   └── doc-sync/
│       └── SKILL.md               # 自动触发：代码变更完成后
└── templates/
    ├── DOC_INDEX.md               # 文档索引模板
    ├── TASK_TRACKER.md            # 任务追踪模板
    ├── CHANGELOG.md               # 变更追溯模板
    ├── REQ_template.md            # 需求文档模板
    ├── ARCH_template.md           # 架构设计模板
    ├── TECH_template.md           # 技术文档模板
    └── MOM_template.md            # 会议纪要模板
```

---

## 3. 核心规则设计

### 3.1 文档目录结构 (MANDATORY)

采用领域驱动型结构，序号前缀确保排序稳定：

```
docs/
├── 01-requirements/     # 需求定义、PRD、用户故事
├── 02-design/           # 架构设计、API 设计、UI/UX、数据库设计
├── 03-technical/        # 环境搭建、部署手册、核心逻辑说明
├── 04-management/       # 会议纪要、变更追溯、任务追踪
├── 05-archive/          # 历史废弃版本
└── DOC_INDEX.md         # 文档总索引（入口）
```

### 3.2 文档命名规范 (MANDATORY)

**格式：** `[序号]_[类型简写]_[描述关键词]_[日期/版本].md`

| 简写 | 全称 | 用途 |
|------|------|------|
| REQ | Requirement | 需求文档 |
| ARCH | Architecture | 架构设计 |
| API | API Specification | API 接口规范 |
| UI | UI/UX Design | UI/UX 设计 |
| DB | Database | 数据库设计 |
| TECH | Technical | 技术文档 |
| MOM | Minutes of Meeting | 会议纪要 |
| REVIEW | Review Report | Review 报告 |

### 3.3 任务状态标识 (MANDATORY)

| 状态标识 | 含义 |
|----------|------|
| `[ ]` | 待办 |
| `[/]` | 进行中 |
| `[x]` | 已完成 |
| `[!]` | 阻塞 |
| `[?]` | 待确认 |

### 3.4 变更追溯格式 (MANDATORY)

```markdown
| 变更 ID | 关联需求 ID | 变更原因 | 影响评估 | 修改人 | 状态 | 关联 Commit |
|:--------|:------------|:---------|:---------|:-------|:-----|:-------------|
| CR-001 | REQ-102 | 增加手机号登录 | 需修改数据库 User 表 | 张三 | 已实施 | feat: add mobile login #77 |
```

---

## 4. 技能触发规则

| 技能 | 命令 | 触发方式 | 执行时机 |
|------|------|----------|----------|
| project-init | `/project-init` | 手动 | 新项目初始化时 |
| requirement-change | `/req-change` | 手动 | 需求变更发起时 |
| task-update | - | 自动 | 任务开始/完成时（规则驱动） |
| doc-sync | - | 自动 | 代码变更完成后（规则驱动） |

---

## 5. 集成规则设计

采用新建集成规则文件方式，自动生效，不修改用户现有规则文件。

### 与 Development Workflow 集成

| 阶段 | 新增指令 |
|------|----------|
| Plan First | 使用 `/project-init` 创建文档目录，按规范存放规划文档 |
| TDD Approach | 开始编写测试前先读取需求文档 |
| Code Review | 检查文档状态：需求文档是否存在、是否已归档 |
| Commit & Push | 更新 TASK_TRACKER.md，记录 CHANGELOG.md |

### 与 Git Workflow 集成

- Commit Message 扩展格式：`<type>: <description> (TASK_ID)`
- PR 描述包含关联需求 ID、任务 ID、变更说明

---

## 6. 模板设计

### 6.1 DOC_INDEX.md 模板

包含：
- 项目名称和简介
- 快速导航链接
- 命名与归档规范汇总
- Claude Code 上下文读取指令

### 6.2 TASK_TRACKER.md 模板

包含：
- 当前迭代信息
- 任务记录表格（ID、描述、负责人、优先级、状态、关联需求、备注）
- 状态标识说明

### 6.3 CHANGELOG.md 模板

包含：
- 变更追溯表格
- 状态标识说明
- 变更流程说明

### 6.4 REQ_template.md 模板

需求文档标准结构：
- 需求 ID 和标题
- 需求描述（背景、目标、用户故事）
- 功能列表
- 非功能性需求
- 验收标准

### 6.5 ARCH_template.md 模板

架构设计标准结构：
- 系统概述
- 技术栈选型
- 核心组件设计
- 数据流图（Mermaid）
- 部署拓扑

### 6.6 TECH_template.md 模板

技术文档标准结构：
- 环境要求
- 安装步骤
- 配置说明
- Troubleshooting

### 6.7 MOM_template.md 模板

会议纪要标准结构：
- 会议基本信息（日期、参会人、议题）
- 决议事项
- 待办事项
- 下次会议安排

---

## 7. 技能内容概要

### 7.1 project-init 技能

**触发命令**: `/project-init`
**触发方式**: 手动
**执行内容**:
1. 创建 `docs/` 目录及子目录（01-requirements ~ 05-archive）
2. 生成 `docs/DOC_INDEX.md` 模板
3. 生成 `docs/04-management/TASK_TRACKER.md` 模板
4. 生成 `docs/04-management/CHANGELOG.md` 模板
5. 询问用户是否需要创建初始需求文档

### 7.2 requirement-change 技能

**触发命令**: `/req-change`
**触发方式**: 手动
**执行内容**:
1. 询问变更信息：关联需求 ID、变更原因、影响评估
2. 生成变更记录 CR-XXX
3. 更新 `docs/04-management/CHANGELOG.md`
4. 提醒用户：变更实施后需更新状态和关联 Commit

### 7.3 task-update 技能

**触发方式**: 自动（规则驱动）
**触发条件**: 规则文件中定义的 Claude Code 执行指令
**执行内容**:
- 开始任务时：读取 TASK_TRACKER.md，更新状态为 `[/]` 进行中
- 完成任务时：更新状态为 `[x]` 已完成，填写关联 Commit
- 阻塞时：更新状态为 `[!]` 阻塞，说明阻塞原因
- 需澄清时：更新状态为 `[?]` 待确认，列出问题

### 7.4 doc-sync 技能

**触发方式**: 自动（规则驱动）
**触发条件**: 规则文件中定义的 Claude Code 执行指令
**执行内容**:
- 代码变更完成后：检查 DOC_INDEX.md 是否需要更新
- 新增文档时：添加到 DOC_INDEX.md 快速导航
- 废弃文档时：移动至 05-archive，更新 DOC_INDEX.md

---

## 8. 实施计划

### 实施步骤

| 步骤 | 内容 | 输出文件 |
|------|------|----------|
| 1 | 创建 plugin.json 配置文件 | plugin.json |
| 2 | 创建 README.md 安装说明 | README.md |
| 3 | 创建 rules 目录及规则文件 | rules/*.md |
| 4 | 创建 skills 目录及技能文件 | skills/*/SKILL.md |
| 5 | 创建 templates 目录及模板文件 | templates/*.md |
| 6 | 测试插件安装和技能触发 | 测试报告 |

### 文件清单

| 文件 | 状态 |
|------|------|
| plugin.json | 待创建 |
| README.md | 待创建 |
| rules/documentation.md | 待创建 |
| rules/task-tracking.md | 待创建 |
| rules/project-doc-integration.md | 待创建 |
| skills/project-init/SKILL.md | 待创建 |
| skills/requirement-change/SKILL.md | 待创建 |
| skills/task-update/SKILL.md | 待创建 |
| skills/doc-sync/SKILL.md | 待创建 |
| templates/DOC_INDEX.md | 待创建 |
| templates/TASK_TRACKER.md | 待创建 |
| templates/CHANGELOG.md | 待创建 |
| templates/REQ_template.md | 待创建 |
| templates/ARCH_template.md | 待创建 |
| templates/TECH_template.md | 待创建 |
| templates/MOM_template.md | 待创建 |

### 外部专家参考意见来源

- 咨询 AI 网页工具获取的项目归档最佳实践
- Kubernetes KEP (Kubernetes Enhancement Proposals)
- Rust RFCs
- Vue.js 文档结构