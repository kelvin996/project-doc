# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- runtime/trigger-engine 自动触发机制（Phase 2）
- 多语言预设 --lang zh/en（Phase 2）
- 多平台适配 Cursor/OpenCode（Phase 3）

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