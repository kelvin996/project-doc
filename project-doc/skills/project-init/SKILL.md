---
name: project-init
description: 初始化项目文档目录结构，创建标准归档体系
userInvocable: true
---

# Project-Init Skill

初始化项目的文档目录结构，创建标准归档体系。

## 执行流程

1. **确认项目路径**
   - 询问用户项目根目录位置（默认当前工作目录）

2. **创建文档目录结构**
   ```
   docs/
   ├── 01-requirements/
   ├── 02-design/
   ├── 03-technical/
   ├── 04-management/
   │   └── tasks/
   ├── 05-archive/
   └── DOC_INDEX.md
   ```

3. **生成核心文件**
   - DOC_INDEX.md（使用模板）
   - TASK_TRACKER.md（使用模板）
   - CHANGELOG.md（使用模板）

4. **询问初始需求**
   - 是否需要创建初始需求文档？
   - 如需要，询问需求名称，生成 REQ-001 模板

5. **输出完成报告**
   - 列出创建的目录和文件
   - 提示用户下一步操作

## 使用方法

手动触发：
```
/project-init
```

## 输出示例

```
✅ 项目文档结构已初始化

创建的目录：
- docs/01-requirements/
- docs/02-design/
- docs/03-technical/
- docs/04-management/
- docs/04-management/tasks/
- docs/05-archive/

创建的文件：
- docs/DOC_INDEX.md
- docs/04-management/TASK_TRACKER.md
- docs/04-management/CHANGELOG.md

下一步：
1. 编辑 DOC_INDEX.md 填写项目名称和简介
2. 在 01-requirements/ 下创建需求文档
3. 使用 /req-change 管理需求变更
```