# Project-Doc 专业团队

## 团队使命

将 project-doc 从"优秀原型"升级为"工业级可发布插件"，并通过全球市场推广赢得开发者口碑。

## 团队架构

### 技术开发团队

| 角色 | 职责 | 优先级 | 提示词文件 |
|------|------|--------|------------|
| **Tech Lead** | 技术决策、协调各角色、质量把关 | P0 | `TECH_LEAD.md` |
| **Plugin Architect** | 插件架构设计、runtime 设计、依赖映射 | P0 | `PLUGIN_ARCHITECT.md` |
| **Skill Developer** | skills 编写/优化、多语言预设 | P1 | `SKILL_DEVELOPER.md` |
| **Rule Engineer** | rules 设计、rule-binding.json、安全机制 | P1 | `RULE_ENGINEER.md` |
| **QA Engineer** | 测试框架、prompt regression、snapshot tests | P1 | `QA_ENGINEER.md` |
| **DevOps** | CI/CD、发布流程、版本管理 | P2 | `DEVOPS.md` |

### 市场推广团队

| 角色 | 职责 | 优先级 | 提示词文件 |
|------|------|--------|------------|
| **Market Analyst** | 竞品分析、市场定位、用户画像 | P0 | `MARKET_ANALYST.md` |
| **Operations Manager** | 发布节奏、内容营销、用户运营 | P0 | `OPERATIONS.md` |
| **Brand Strategist** | README优化、视觉设计、品牌故事 | P1 | `BRAND_STRATEGIST.md` |
| **Growth Hacker** | SEO优化、病毒传播、转化漏斗 | P1 | `GROWTH_HACKER.md` |
| **Community Manager** | Discord运营、用户互动、反馈收集 | P1 | `COMMUNITY_MANAGER.md` |

## 协作流程

```
┌─────────────────────────────────────────────────────────────┐
│                        Tech Lead                             │
│                    (决策中心，协调各角色)                      │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ 技术开发轨道     │  │ 市场推广轨道     │  │ 质量保障轨道     │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ Architect       │  │ Market Analyst  │  │ QA Engineer     │
│ Skill Developer │  │ Operations      │  │ Community Mgr   │
│ Rule Engineer   │  │ Brand Strategist│  │                 │
│ DevOps          │  │ Growth Hacker   │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Phase 执行顺序

### Phase 1（工程化外壳，已完成 ✅）
1. **DevOps** - 初始化工程化外壳（package.json, LICENSE, CHANGELOG）
2. **Architect** - 设计显式依赖映射（rule-binding.json）
3. **Rule Engineer** - 实现 write-guard 安全机制
4. **Skill Developer** - 多语言模板（en/zh）
5. **QA Engineer** - 建立测试框架骨架
6. **DevOps** - CI/CD 配置

### Phase 1.5（发布准备，进行中 🚧）
1. **Market Analyst** - 市场分析、竞品研究、定位确认
2. **Brand Strategist** - README 优化、视觉素材、品牌故事
3. **Operations** - 发布节奏、内容营销、公告准备
4. **Growth Hacker** - SEO 优化、传播机制、转化漏斗
5. **Community Manager** - Discord 建设、反馈流程
6. **DevOps** - GitHub Release v0.1.0
7. **Operations + Community** - 首次公告发布

### Phase 2（runtime 核心）
1. **Architect** - runtime/ 目录设计
2. **Skill Developer** - trigger-engine 实现 + 多语言预设
3. **QA Engineer** - prompt regression tests
4. **DevOps** - 版本 bump 流程

### Phase 3（多平台）
1. **Architect** - adapters/ 设计
2. **Skill Developer** - Cursor/OpenCode 适配
3. **DevOps** - npm 发布 + 插件市场提交

## 角色协作矩阵

| 角色 | 输入来源 | 输出目标 |
|------|----------|----------|
| Tech Lead | 所有角色反馈 | 决策分配 |
| Architect | Tech Lead 指令 | Skill Developer, Rule Engineer |
| Market Analyst | 外部数据 | Tech Lead, Brand Strategist |
| Operations | Tech Lead 决策 | Growth Hacker, Community Manager |
| Brand Strategist | Market Analyst 定位 | Operations, Growth Hacker |
| Community Manager | 用户反馈 | Tech Lead, Operations, QA |

## 使用方法

### 启动流程

1. 阅读 `START_HERE.md` 了解启动步骤
2. 根据当前 Phase 选择对应角色
3. 复制角色提示词文件内容到新对话
4. 角色执行后输出 `[角色名] 提交` 格式结果
5. 将提交结果带回 Tech Lead 分配下一个任务

### 角色权限说明

| 权限级别 | 角色 | 说明 |
|----------|------|------|
| **决策权** | Tech Lead | 可拒绝其他角色提交，分配任务优先级 |
| **设计权** | Architect, Market Analyst | 输出规格给执行角色 |
| **实现权** | Skill Developer, Rule Engineer, Brand Strategist | 按规格编码/输出内容 |
| **验证权** | QA Engineer, Community Manager | 可阻止不合格发布 |
| **发布权** | DevOps, Operations | 控制版本和发布流程 |

## 提示词文件清单

```
docs/team-prompts/
├── TEAM_OVERVIEW.md        → 团队概述（本文件）
├── START_HERE.md           → 启动指南
│
├── 技术开发团队
│   ├── TECH_LEAD.md        → Tech Lead 提示词
│   ├── PLUGIN_ARCHITECT.md → Architect 提示词
│   ├── SKILL_DEVELOPER.md  → Skill Developer 提示词
│   ├── RULE_ENGINEER.md    → Rule Engineer 提示词
│   ├── QA_ENGINEER.md      → QA Engineer 提示词
│   └── DEVOPS.md           → DevOps 提示词
│
└── 市场推广团队
    ├── MARKET_ANALYST.md   → Market Analyst 提示词
    ├── OPERATIONS.md       → Operations Manager 提示词
    ├── BRAND_STRATEGIST.md → Brand Strategist 提示词
    ├── GROWTH_HACKER.md    → Growth Hacker 提示词
    └── COMMUNITY_MANAGER.md → Community Manager 提示词
```