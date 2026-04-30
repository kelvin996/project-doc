# 📑 项目文档索引 (DOC_INDEX)

> **项目名称**: [填写项目名称]
> **项目简介**: 一句话描述项目核心功能与目标。
> **最后更新**: YYYY-MM-DD

---

## 🧭 快速导航

### 1. 🟢 需求与规划 (`/01-Requirements`)

* **[业务需求文档 (PRD)](./01-requirements/01_REQ_Main_v1.0.md)**: 定义系统的核心业务逻辑与用户故事。
* **[产品路线图](./01-requirements/02_Roadmap.md)**: 记录近期开发计划与远期愿景。

### 2. 📐 架构与设计 (`/02-Design`)

* **[系统架构说明](./02-design/01_ARCH_Overview.md)**: 包含技术栈、部署拓扑、核心组件交互图。
* **[数据库建模](./02-design/02_DB_Schema.md)**: 实体关系图 (ERD) 及关键表字典。
* **[API 接口规范](./02-design/03_API_Spec.md)**: 外部与内部服务调用的协议定义。

### 3. 🛠️ 技术实现与维护 (`/03-Technical`)

* **[环境搭建指南](./03-technical/01_Setup_Guide.md)**: 本地开发环境配置与依赖安装。
* **[部署手册](./03-technical/02_Deployment.md)**: CI/CD 流程及生产环境运维说明。
* **[核心算法逻辑](./03-technical/03_Logic_Explain.md)**: 针对复杂业务逻辑的专项技术说明。

### 4. 📋 过程管理与追踪 (`/04-Management`)

* **[任务状态追踪表](./04-management/TASK_TRACKER.md)**: **(推荐重点维护)** 当前迭代任务、负责人及进度。
* **[需求变更记录 (ChangeLog)](./04-management/CHANGELOG.md)**: 追溯每一次需求变更的起因、影响与结果。
* **[会议纪要归档](./04-management/MOM_Archive.md)**: 历史决策会议记录索引。

---

## 🏷️ 命名与归档规范

为了保持文档整洁，请遵循以下规则：

1. **文件命名**: `[序号]_[类别]_[关键词]_[日期].md` (例如: `01_REQ_UserAuth_20260414.md`)。
2. **存放位置**: 严禁在根目录乱放文档，必须按上述分类存入对应子文件夹。
3. **废弃处理**: 过时文档应移动至 `/05-Archive` 文件夹，并在文件顶部标注 `[DEPRECATED]`。

---

## 🤖 AI 助手提示 (Claude Code Context)

* **上下文读取**: Claude，在处理代码逻辑变更前，请务必先查阅 `/docs/01-requirements` 下的相关 PRD。
* **同步更新**: 当你完成一个功能点的代码实现后，请同步检查并更新 `/04-management/TASK_TRACKER.md` 中的状态。

---

### 📥 维护者

* 主负责人: @你的名字
* 关联仓库: [代码仓库链接]