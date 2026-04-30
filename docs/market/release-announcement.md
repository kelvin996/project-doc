# 发布公告草案

> 生成日期：2026-04-30
> 状态：待 Operations 审核发布

---

## GitHub Release 公告

### v0.2.0 Release Notes

```markdown
## Project-Doc v0.2.0 - Runtime Core

**让文档追着代码跑，现在自动了。**

### 🎉 核心更新

- **runtime/trigger-engine.js**：文件监听触发（自动化核心）
- **runtime/skill-runner.js**：skill 执行器
- **runtime/cooldown-guard.js**：防触发风暴机制
- **多语言预设**：`/project-init --lang zh/en`

### 📊 测试覆盖

- 55 个测试全部通过
- Prompt regression 测试（AI 行为变更检测）

### 🔗 与 superpowers 互补

- superpowers：教你写代码
- project-doc：帮你管产物

建议同时安装两者，获得完整 AI 编程体验。

---

**完整更新日志**: 查看 [CHANGELOG.md](CHANGELOG.md)
```

---

## 社区发布公告

### Hacker News 格式

```
标题: Show HN: Project-Doc – Let docs follow your code (Claude Code plugin)

正文:
嗨 HN，

我做了一个 Claude Code 插件，解决一个被忽略的痛点：
文档总是跟不上代码变更。

project-doc 让 AI 自动管理你的项目文档：
- 文件变更时，索引自动更新
- commit 时，任务状态自动同步
- 需求变更，全程可追溯

与 superpowers 互补：它教你写代码，我帮你管产物。

GitHub: https://github.com/kelvin996/project-doc

欢迎反馈！
```

### V2EX 格式

```
标题: [分享] Project-Doc - 让文档追着代码跑（Claude Code 插件）

正文:
做开发的朋友可能都有这个痛点：
- 代码改完了，文档忘记更新
- 需求变了三次，文档还是 V1.0
- 新人入职问"这个功能在哪"，只能翻 git log

我做了一个 Claude Code 插件解决这个问题：
/project-init 一键建文档结构
task-update、doc-sync 自动触发同步

中文模板默认支持，适合国内开发者。

GitHub: https://github.com/kelvin996/project-doc
欢迎试用反馈。
```

### 即刻/微博格式

```
🎉 Project-Doc v0.2.0 发布！

一个让文档追着代码跑的 Claude Code 插件：
- 文件变更 → 索引自动更新
- commit 提交 → 任务状态同步
- 需求变更 → 全程可追溯

与 superpowers 互补，建议同时安装。

GitHub: github.com/kelvin996/project-doc

#AI编程 #ClaudeCode #开源
```

---

## Discord 公告格式

```
📢 Project-Doc v0.2.0 发布！

一个专注于文档自动化治理的 Claude Code 插件。

核心功能：
• /project-init：一键建文档结构
• task-update：自动任务状态同步
• doc-sync：自动文档索引更新

差异点：
• 文档自动化（superpowers 缺此功能）
• 多语言模板（zh/en）
• write-guard 安全机制

GitHub: https://github.com/kelvin996/project-doc

欢迎试用、反馈、共建！
```

---

## 渠道适配建议

| 渠道 | 建议发布时间 | 格式选择 |
|------|--------------|----------|
| GitHub Release | 立即 | Release Notes |
| Hacker News | 周二/周三上午 | Show HN 格式 |
| V2EX | 工作日中午 | 分享格式 |
| 即刻/微博 | 晚间 | 短内容格式 |
| Discord | 发布后立即 | 社区格式 |

---

**[BRAND STRATEGIST] 发布公告草案完成**

下一步：传递给 Operations Manager 进行发布节奏安排。