# Project-Doc 专业开发团队

## 团队使命

将 project-doc 从"优秀原型"升级为"工业级可发布插件"，遵循渐进式路线（Phase 1 → 2 → 3）。

## 团队角色

| 角色 | 职责 | 优先级 |
|------|------|--------|
| **Tech Lead** | 技术决策、协调各角色、质量把关 | P0 |
| **Plugin Architect** | 插件架构设计、runtime 设计、依赖映射 | P0 |
| **Skill Developer** | skills 编写/优化、多语言预设 | P1 |
| **Rule Engineer** | rules 设计、rule-binding.json、安全机制 | P1 |
| **QA Engineer** | 测试框架、prompt regression、snapshot tests | P1 |
| **DevOps** | CI/CD、发布流程、版本管理 | P2 |

## 协作流程

```
┌─────────────┐
│  Tech Lead  │ ← 决策中心，协调各角色
└──────┬──────┘
       │
┌──────▼──────┐     ┌─────────────┐     ┌─────────────┐
│ Architect   │────▶│ Skill Dev   │────▶│ QA Engineer │
│ (设计架构)   │     │ (实现技能)   │     │ (测试验证)   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Rule Eng    │     │ Templates   │     │ DevOps      │
│ (规则设计)   │     │ (模板更新)   │     │ (发布部署)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Phase 执行顺序

### Phase 1（可发布，约 2 周）
1. **DevOps** - 初始化工程化外壳（package.json, LICENSE, CHANGELOG）
2. **Architect** - 设计显式依赖映射（rule-binding.json）
3. **Rule Engineer** - 实现 write-guard 安全机制
4. **Skill Developer** - 更新 README，添加 tagline
5. **QA Engineer** - 建立测试框架骨架
6. **DevOps** - CI/CD 配置 + 首次发布

### Phase 2（runtime 核心，约 3 周）
1. **Architect** - runtime/ 目录设计
2. **Skill Developer** - trigger-engine 实现 + 多语言预设
3. **QA Engineer** - prompt regression tests
4. **DevOps** - 版本 bump 流程

### Phase 3（多平台，约 2 周）
1. **Architect** - adapters/ 设计
2. **Skill Developer** - Cursor/OpenCode 适配
3. **DevOps** - npm 发布 + 插件市场提交

## 输入来源（已收集）

- **Gemini（Inspiration）**：品牌文案、多语言预设、自动化 Changelog 建议
- **Codex（Reviewer）**：架构评审 7.3/10，runtime/trigger-engine 方案，显式依赖映射，测试体系

## 使用方法

将对应角色的提示词文件内容复制到新对话中，AI 将作为该角色执行任务。

角色提示词文件：
- `TECH_LEAD.md`
- `PLUGIN_ARCHITECT.md`
- `SKILL_DEVELOPER.md`
- `RULE_ENGINEER.md`
- `QA_ENGINEER.md`
- `DEVOPS.md`