# Discord 社区建设计划

> 生成日期：2026-04-30
> 执行角色：Community Manager

---

## Discord 服务器结构

### 频道设计

```
project-doc Discord
│
├── 📢 #announcements
│   → 版本发布、重要通知
│
├── 💬 #general
│   → 一般讨论、项目介绍
│
├── 🆘 #help
│   → 使用帮助、FAQ
│
├── 💡 #feature-ideas
│   → 功能建议、讨论
│
├── 🐛 #bugs
│   → Bug 报告
│
├── ✨ #showcase
│   → 使用案例分享
│
└── 🔧 #development
    → 开发者讨论、贡献者交流
```

### 角色设计

| 角色 | 说明 |
|------|------|
| `@Admin` | 管理员 |
| `@Moderator` | 内容审核 |
| `@Contributor` | 贡献者 |
| `@Member` | 普通成员 |

---

## 反馈收集流程

### 分类处理

```
用户反馈进入 Discord
         │
         ▼
Community Manager 分类
         │
    ┌────┴────┐
    │         │
   Bug       功能建议
    │         │
    ▼         ▼
GitHub Issue  #feature-ideas 讨论
    │         │
    ▼         ▼
Developer修复  Tech Lead 评估
```

### Issue 模板

已在 `.github/ISSUE_TEMPLATE/` 创建：
- `bug_report.md`
- `feature_request.md`

---

## 社区规则

### 行为准则

1. **友善交流**：尊重所有成员
2. **内容相关**：讨论与 project-doc 相关
3. **无广告**：禁止无关推广
4. **开源精神**：欢迎贡献、分享

---

## 问答时段

### 每周问答（建议）

| 时间 | 形式 |
|------|------|
| 周四晚 8-9 点 | Discord 实时问答 |

### FAQ 文档

将常见问题汇总到：
- `docs/FAQ.md`
- Discord #help 频道置顶

---

## 用户互动策略

### 新用户引导

```
新成员加入 → 欢迎消息 → 
├── 项目简介
├── 快速开始链接
├── 频道说明
└── 提问指南
```

### 欢迎消息模板

```
👋 欢迎 [用户名] 加入 Project-Doc 社区！

这是一个让文档追着代码跑的 Claude Code 插件。

快速开始：
• GitHub: github.com/kelvin996/project-doc
• 安装: /plugin install project-doc

频道说明：
• #general - 一般讨论
• #help - 使用帮助
• #feature-ideas - 功能建议
• #bugs - Bug 报告

有问题随时问！
```

---

## 社区里程碑

| 目标 | 时间 | 数量 |
|------|------|------|
| 初始成员 | D+0 | 10（团队） |
| 首周目标 | D+7 | 30 |
| 首月目标 | D+30 | 100 |
| 首季目标 | D+90 | 500 |

---

## 执行清单

### D+0 - 立即执行

- [ ] 创建 Discord 服务器
- [ ] 设置频道结构
- [ ] 发布 #announcements 公告
- [ ] 邀请初始成员

### D+1 - 次日执行

- [ ] 设置反馈收集流程
- [ ] 创建欢迎消息模板
- [ ] 设置 Community Manager 角色

### D+7 - 首周复盘

- [ ] 收集用户反馈
- [ ] 整理 FAQ
- [ ] 评估社区活跃度

---

## Discord 链接（待创建）

```
https://discord.gg/[invite-code]
```

---

**[COMMUNITY MANAGER] Discord 建设计划完成**

下一步：创建 Discord 服务器并发布公告。