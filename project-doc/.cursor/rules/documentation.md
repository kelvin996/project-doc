# Documentation Standards

> 本文件定义项目文档归档规范，确保文档统一管理、易于追溯、AI 可理解。

## 文档目录结构 (MANDATORY)

所有项目文档必须按以下结构组织：

```
docs/
├── 01-requirements/     # 需求定义、PRD、用户故事
├── 02-design/           # 架构设计、API 设计、UI/UX、数据库设计
├── 03-technical/        # 环境搭建、部署手册、核心逻辑说明
├── 04-management/       # 会议纪要、变更追溯、任务追踪
├── 05-archive/          # 历史废弃版本
└── DOC_INDEX.md         # 文档总索引（入口）
```

**目录职责说明：**

| 目录 | 职责 | 典型文档 |
|------|------|----------|
| 01-requirements | 解决"做什么" | PRD、用户故事、业务流程图、产品路线图 |
| 02-design | 解决"怎么做" | 系统架构、API 规范、UI/UX 设计、数据库建模 |
| 03-technical | 解决"如何用" | 环境搭建、部署手册、Troubleshooting、核心算法说明 |
| 04-management | 解决"谁在做/改了什么" | 会议纪要、任务追踪、变更追溯 |
| 05-archive | 解决"历史记录" | 废弃的需求版本、过时的设计文档 |

## 文档命名规范 (MANDATORY)

**格式：** `[序号]_[类型简写]_[描述关键词]_[日期/版本].md`

**类型简写列表：**

| 简写 | 全称 | 用途 | 示例 |
|------|------|------|------|
| REQ | Requirement | 需求文档 | 01_REQ_UserAuth_v1.0.md |
| ARCH | Architecture | 架构设计 | 02_ARCH_SystemOverview.md |
| API | API Specification | API 接口规范 | 02_API_RestEndpoints.md |
| UI | UI/UX Design | UI/UX 设计 | 02_UI_LoginFlow.md |
| DB | Database | 数据库设计 | 02_DB_Schema.md |
| TECH | Technical | 技术文档 | 03_TECH_SetupGuide_Mac.md |
| MOM | Minutes of Meeting | 会议纪要 | 04_MOM_SprintPlanning_20231025.md |
| REVIEW | Review Report | Review 报告 | 04_REVIEW_CodeQuality.md |

**命名原则：**
- 唯一性：同一目录下文件名不重复
- 可排序：序号前缀确保按类型排序
- 可预测：通过命名即可判断文档类型和用途
- 无空格：使用下划线或连字符替代空格

## 文档总索引 (DOC_INDEX.md)

每个项目必须在 `docs/` 下维护 `DOC_INDEX.md`，作为文档入口。

**DOC_INDEX.md 必须包含：**
1. 项目名称和简介
2. 快速导航：链接到各目录下的核心文档
3. 命名与归档规范汇总
4. Claude Code 上下文读取指令

## 文档生命周期管理

| 生命周期阶段 | 操作 | 说明 |
|-------------|------|------|
| 新建 | 按分类存入对应目录 | 使用标准命名格式 |
| 更新 | 更新 DOC_INDEX.md 索引 | 确保索引与实际文件一致 |
| 版本升级 | 追加版本号或日期 | 如 v1.0 → v1.1 或追加日期 |
| 废弃 | 移动至 05-archive | 文件顶部标注 `[DEPRECATED]` 及废弃原因 |

## Claude Code 执行指令 (MANDATORY)

**代码变更前：**
- 必须先查阅 `docs/01-requirements/` 下的相关 PRD 或需求文档
- 确认需求理解正确后再开始实现

**功能完成后：**
- 同步更新 `docs/04-management/TASK_TRACKER.md` 任务状态
- 如涉及需求变更，记录到 `docs/04-management/CHANGELOG.md`

**新建项目时：**
- 使用 `/project-init` 技能创建标准文档目录结构
- 生成初始 `DOC_INDEX.md` 模板

## 文档质量检查清单

在提交代码前，检查文档状态：

- [ ] 新功能是否有对应需求文档
- [ ] 需求文档是否已链接到 DOC_INDEX.md
- [ ] 变更是否已记录到 CHANGELOG.md
- [ ] 任务状态是否已更新到 TASK_TRACKER.md
- [ ] 废弃文档是否已移动至 05-archive