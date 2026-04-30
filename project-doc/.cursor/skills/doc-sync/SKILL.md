---
name: doc-sync
description: Automatically triggered when documentation changes are detected - syncs DOC_INDEX.md after documents are added or archived
---

# Doc-Sync Skill

自动同步文档状态，更新 DOC_INDEX.md。由规则文件触发，无需手动调用。

## 触发条件

由 documentation.md 规则驱动：

| 触发时机 | 操作 |
|----------|------|
| 新增文档时 | 添加到 DOC_INDEX.md 快速导航 |
| 废弃文档时 | 移动至 05-archive，更新 DOC_INDEX.md |
| 功能完成时 | 检查文档状态是否需要更新 |

## 执行流程

1. **扫描 docs/ 目录**
   检查是否有新增或变更的文档

2. **更新 DOC_INDEX.md**
   - 新增文档：添加到对应分类的快速导航
   - 废弃文档：移动链接至"归档"部分

3. **检查文档完整性**
   - 新功能是否有需求文档
   - 需求文档是否已链接

4. **输出同步报告**
   列出更新的内容和检查结果

## 输出示例

```
📄 文档状态已同步

检查结果：
✅ 01-requirements/ 有 2 个文档
✅ 02-design/ 有 1 个文档
⚠️ REQ-002 未链接到 DOC_INDEX.md

已更新: docs/DOC_INDEX.md

建议操作：
- 将 REQ-002 链接添加到快速导航
```