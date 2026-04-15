---
name: requirement-change
description: 管理需求变更并记录追溯
userInvocable: true
---

# Requirement-Change Skill

管理需求变更，创建变更记录并更新 CHANGELOG.md。

## 执行流程

1. **收集变更信息**
   询问用户：
   - 关联需求 ID（如 REQ-001）
   - 变更原因
   - 影响评估（涉及哪些模块/文件）
   - 修改人

2. **生成变更 ID**
   格式：CR-NNN（如 CR-001）
   自动递增序号，基于 CHANGELOG.md 中现有记录

3. **更新 CHANGELOG.md**
   添加新行到变更追溯表：
   ```
   | CR-NNN | REQ-XXX | 变更原因 | 影响评估 | 修改人 | 待实施 | - |
   ```

4. **提示后续操作**
   - 变更实施后需更新状态和关联 Commit
   - 可创建变更详情文档（可选）

## 使用方法

手动触发：
```
/req-change
```

## 输出示例

```
✅ 需求变更已记录

变更 ID: CR-001
关联需求: REQ-001
变更原因: 增加手机号登录
影响评估: 需修改数据库 User 表
状态: 待实施

已更新: docs/04-management/CHANGELOG.md

后续操作：
1. 实施变更后，更新状态为"已实施"
2. 填写关联 Commit（如 feat: add mobile login #77）
```