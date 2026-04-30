# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- 多平台适配 Cursor/OpenCode（Phase 3）

## [0.2.0] - 2026-04-30

### Added
- runtime/trigger-engine.js（文件监听触发）
- runtime/skill-runner.js（skill 执行器）
- runtime/context-manager.js（上下文管理）
- runtime/cooldown-guard.js（防触发风暴）
- runtime/config.js（配置加载器）
- 多语言预设 --lang zh/en（project-init 参数）
- prompt regression 测试（AI 行为变更检测）
- runtime 测试（cooldown-guard, context-manager）

### Changed
- project-init SKILL.md 添加 --lang 参数说明
- SkillRunner 规则路径处理优化

## [0.1.0] - 2026-04-30

### Added
- 4 skills: project-init, requirement-change, task-update, doc-sync
- 3 rules: documentation, task-tracking, project-doc-integration
- 7 templates: DOC_INDEX, TASK_TRACKER, CHANGELOG, REQ, ARCH, TECH, MOM
- write-guard 安全机制
- rule-binding.json 显式依赖映射
- trigger-spec.json 触发协议
- package.json 工程化配置
- Jest 测试框架
- GitHub Actions CI/CD
- 多语言模板 (templates/zh, templates/en)