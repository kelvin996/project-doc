# Project-Doc Plugin

文档归档和任务追踪插件，解决以下痛点：
- 需求散落、变更无追溯
- 任务遗漏、进度不透明
- 文档位置混乱、分类不清

## 安装方法

### 方法 1: 直接复制
```bash
cp -r project-doc ~/.claude/plugins/project-doc
```

### 方法 2: 符号链接（推荐，便于更新）
```bash
ln -s /path/to/project-doc ~/.claude/plugins/project-doc
```

## 使用方法

### 手动触发技能
- `/project-init` - 初始化项目文档目录
- `/req-change` - 发起需求变更并记录

### 自动触发（规则驱动）
- 任务开始/完成时自动更新 TASK_TRACKER.md
- 代码变更后自动检查文档状态

## 文档目录结构

```
docs/
├── 01-requirements/     # 需求文档
├── 02-design/           # 设计文档
├── 03-technical/        # 技术文档
├── 04-management/       # 管理文档（任务追踪、变更记录）
├── 05-archive/          # 归档文档
└── DOC_INDEX.md         # 文档索引入口
```

## 与现有规则集成

本插件通过 `project-doc-integration.md` 自动补全现有工作流：
- Plan First 阶段：创建文档目录结构
- Commit & Push 阶段：更新任务状态和变更记录

无需修改你现有的规则文件。