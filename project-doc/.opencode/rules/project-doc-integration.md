# Project-Doc Integration Rules

> 本文件定义 project-doc 插件与现有开发工作流的集成指令。
> 安装插件后自动生效，无需修改现有规则文件。

## 与 Development Workflow 集成

在执行 development-workflow 的各阶段时，同步执行以下指令：

### 阶段 0：Research & Reuse
- **无额外指令**，按现有规则执行

### 阶段 1：Plan First
**新增指令 (MANDATORY)：**
1. 使用 `/project-init` 技能创建标准文档目录结构
2. 将规划文档按 documentation.md 规范存放：
   - PRD → `docs/01-requirements/`
   - Architecture → `docs/02-design/`
   - Tech Doc → `docs/03-technical/`
3. 更新 `docs/DOC_INDEX.md` 索引

### 阶段 2：TDD Approach
**新增指令 (MANDATORY)：**
1. 开始编写测试前，先读取 `docs/01-requirements/` 下的相关需求文档
2. 确认测试覆盖的需求点

### 阶段 3：Code Review
**新增指令 (MANDATORY)：**
1. Review 时检查文档状态：
   - 新功能是否有需求文档支撑
   - 需求文档是否已链接到 DOC_INDEX.md

### 阶段 4：Commit & Push
**新增指令 (MANDATORY)：**
1. 更新 `docs/04-management/TASK_TRACKER.md` 任务状态
2. 如涉及需求变更，记录到 `docs/04-management/CHANGELOG.md`
3. 提交消息中引用任务 ID（如 `feat: add login (T-001)`）

## 与 Git Workflow 集成

在执行 git-workflow 时，同步执行以下指令：

### Commit Message Format
**扩展格式：**
```
<type>: <description> (TASK_ID)

<optional body>
```

示例：
```
feat: add user login feature (T-001)

- Implement JWT authentication
- Add login UI component

Relates: REQ-001, T-001
```

### Pull Request Workflow
**新增指令 (MANDATORY)：**
1. PR 描述中包含：
   - 关联需求 ID（如 `Relates: REQ-001`）
   - 任务 ID（如 `Task: T-001`）
   - 变更说明（如有需求变更）
2. PR 合并前检查文档更新状态

## 与 Agents 集成

在使用 agents 时，新增以下代理职责：

### planner agent
- 创建文档目录结构（调用 project-init 技能）
- 生成文档索引 DOC_INDEX.md

### code-reviewer agent
- 检查文档状态：需求文档是否存在、是否已归档
- 检查变更追溯：CHANGELOG.md 是否已更新

### doc-updater agent
- 更新 DOC_INDEX.md 索引
- 更新 TASK_TRACKER.md 任务状态
- 更新 CHANGELOG.md 变更记录

## 执行优先级

当本文件指令与现有规则冲突时：
- **本文件指令优先**（针对文档和任务管理的特定场景）
- 现有规则继续适用于非文档场景

## 自动触发机制

以下场景自动触发对应技能：

| 场景 | 自动触发技能 | 执行内容 |
|------|-------------|----------|
| 开始任务时 | task-update | 更新状态为 [/] 进行中 |
| 完成任务时 | task-update | 更新状态为 [x] 已完成，关联 Commit |
| 代码变更完成后 | doc-sync | 更新 DOC_INDEX.md，同步文档状态 |
| 需求变更发起时 | requirement-change | 创建变更记录（可选手动触发 /req-change） |