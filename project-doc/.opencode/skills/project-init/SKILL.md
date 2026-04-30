---
name: project-init
description: Use when the user asks to "initialize project docs", "create doc structure", "project-init", or starts a new project - creates standard documentation directory structure with templates
userInvocable: true
---

# Project-Init Skill

初始化项目的文档目录结构，创建标准归档体系。

## 参数

`/project-init [--lang zh|en]`

| 参数 | 值 | 说明 |
|------|-----|------|
| `--lang` | `zh` | 中文模板（默认） |
| `--lang` | `en` | 英文模板 |

**示例**：
- `/project-init` - 使用中文模板初始化
- `/project-init --lang en` - 使用英文模板初始化

## 执行流程

1. **解析参数**
   - 检测 `--lang` 参数
   - 默认值：`zh`（中文）

2. **确认项目路径**
   - 询问用户项目根目录位置（默认当前工作目录）

3. **选择模板目录**
   - 根据 `--lang` 参数选择：
     - `zh` → `templates/zh/`
     - `en` → `templates/en/`

4. **创建文档目录结构**
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

5. **复制模板文件**
   - 从 `{lang}/DOC_INDEX.md` 复制到 `docs/DOC_INDEX.md`
   - 从 `{lang}/TASK_TRACKER.md` 复制到 `docs/04-management/TASK_TRACKER.md`
   - 从 `{lang}/CHANGELOG.md` 复制到 `docs/04-management/CHANGELOG.md`

6. **询问初始需求**
   - 是否需要创建初始需求文档？
   - 如需要，询问需求名称，使用 `{lang}/REQ_template.md` 生成 REQ-001

7. **输出完成报告**
   - 列出创建的目录和文件
   - 显示使用的语言模板
   - 提示用户下一步操作

## 使用方法

手动触发：
```
/project-init                  # 中文模板（默认）
/project-init --lang zh        # 中文模板
/project-init --lang en        # 英文模板
```

## 输出示例（中文）

```
✅ 项目文档结构已初始化

语言模板：中文 (zh)

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

## 输出示例（英文）

```
✅ Project documentation structure initialized

Language template: English (en)

Created directories:
- docs/01-requirements/
- docs/02-design/
- docs/03-technical/
- docs/04-management/
- docs/04-management/tasks/
- docs/05-archive/

Created files:
- docs/DOC_INDEX.md
- docs/04-management/TASK_TRACKER.md
- docs/04-management/CHANGELOG.md

Next steps:
1. Edit DOC_INDEX.md to fill in project name and description
2. Create requirement documents in 01-requirements/
3. Use /req-change to manage requirement changes
```

## 与 runtime 集成

当通过 runtime 执行时，参数通过 inputContext 传入：

```javascript
{
  projectPath: '/path/to/project',
  lang: 'zh' // 或 'en'
}
```

runtime 会自动选择对应的模板目录并复制文件。