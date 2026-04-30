# 团队执行启动指南

## 快速启动

### Step 1：启动 Tech Lead（总协调）

复制到新对话：

```
你是 project-doc 插件的 Tech Lead。

项目路径：/Users/apple/Documents/workspace/rule/project-doc

当前状态：Phase 1 初始化阶段，需要启动工程化外壳建设。

首要任务：
1. 审核并确认 Phase 1 任务优先级
2. 分配第一个任务给 DevOps（创建 package.json）
3. 定义版本策略（semver：0.x.x 开发版 vs 1.x.x 正式版）

请输出 Phase 1 启动计划。
```

### Step 2：按 Tech Lead 分配启动各角色

Tech Lead 会告诉你启动哪个角色。复制对应角色的提示词：

| 角色 | 提示词文件 | 启动时机 |
|------|------------|----------|
| DevOps | `DEVOPS.md` | Phase 1 第一步 |
| Architect | `PLUGIN_ARCHITECT.md` | DevOps 完成后 |
| Skill Developer | `SKILL_DEVELOPER.md` | Architect 设计完成后 |
| Rule Engineer | `RULE_ENGINEER.md` | 与 Architect 并行 |
| QA Engineer | `QA_ENGINEER.md` | 所有代码完成后 |

### Step 3：角色间协作

每个角色完成后会输出 `[xxx] 提交` 格式，包含下一步建议。

将提交结果带回给 Tech Lead，由 Tech Lead 分配下一个任务。

## 协作流程图

```
用户启动 Tech Lead
       │
       ▼
Tech Lead 分配任务 ─────────────────────────────┐
       │                                        │
       ▼                                        │
   DevOps 启动                                  │
   (package.json, CI/CD)                        │
       │                                        │
       ▼                                        │
   DevOps 完成 → [DEVOPS] 提交                   │
       │                                        │
       ▼                                        │
   用户将提交带回 Tech Lead                       │
       │                                        │
       ▼                                        │
Tech Lead 分配下一个任务 ────────────────────────┘
       │
       ▼
   Architect 启动
   (rule-binding.json)
       │
       ▼
   ... (循环直到 Phase 1 完成)
```

## Phase 1 任务执行顺序（推荐）

```
Week 1:
├── Day 1-2: DevOps (package.json + LICENSE + CHANGELOG)
├── Day 3-4: Architect (rule-binding.json + trigger-spec.json)
├── Day 5: Rule Engineer (write-guard.md) + Skill Dev (README)

Week 2:
├── Day 1-2: Skill Dev (templates/zh + templates/en)
├── Day 3-4: QA Engineer (tests/ 骨架 + Jest 配置)
├── Day 5: DevOps (CI/CD 配置) + 首次发布 v0.1.0
```

## 交付物验收清单

### Phase 1 完成标准

```
工程化外壳：
├── package.json          ✓
├── LICENSE               ✓
├── CHANGELOG.md          ✓
├── README.md (重写)      ✓
├── scripts/validate.js   ✓

架构设计：
├── rule-binding.json     ✓
├── trigger-spec.json     ✓
├── write-guard.md        ✓

多语言支持：
├── templates/zh/         ✓
├── templates/en/         ✓

测试框架：
├── tests/structural/     ✓
├── tests/snapshot/       ✓
├── jest.config.js        ✓

CI/CD：
├── .github/workflows/    ✓
├── ISSUE_TEMPLATE/       ✓

发布：
├── v0.1.0 Git tag        ✓
├── GitHub Release        ✓
```

## 角色权限说明

- **Tech Lead**：决策权，可拒绝其他角色提交
- **Architect**：设计权，输出规格给 Skill Developer
- **Skill Developer**：实现权，按 Architect 规格编码
- **Rule Engineer**：规则权，与 Architect 配合
- **QA Engineer**：验证权，可阻止不合格发布
- **DevOps**：发布权，控制版本和发布流程

## 完全授权声明

用户授权团队：
- 无需每步确认，角色可自主执行
- Tech Lead 有最终决策权
- Phase 完成后统一汇报

---

## 提示词文件清单

```
docs/team-prompts/
├── TEAM_OVERVIEW.md      → 团队概述
├── TECH_LEAD.md          → Tech Lead 提示词
├── PLUGIN_ARCHITECT.md   → Architect 提示词
├── SKILL_DEVELOPER.md    → Skill Developer 提示词
├── RULE_ENGINEER.md      → Rule Engineer 提示词
├── QA_ENGINEER.md        → QA Engineer 提示词
├── DEVOPS.md             → DevOps 提示词
└── START_HERE.md         → 本文件（启动指南）
```