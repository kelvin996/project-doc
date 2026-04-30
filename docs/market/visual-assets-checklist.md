# 视觉素材需求清单

> 生成日期：2026-04-30
> 优先级分级：P0（必须）/ P1（推荐）/ P2（可选）

---

## P0 - 必须素材

### 1. GitHub README 徽章

已完成 ✅：
- [x] Release 徽章
- [x] License 徽章
- [x] Stars 徽章（social）
- [x] CI 徽章（GitHub Actions）

### 2. Logo/图标

**需求描述**：
- 尺寸：128x128px（GitHub）、64x64px（npm）
- 风格：简洁、技术感、可缩放
- 颜色建议：深青色主色 + 明黄点缀（参考 Gemini 建议）

**设计方向**：
- 方案 A：文件夹 + 循环箭头 + 勾选框组合
- 方案 B：代码字符 `{ }` 构成的复选框
- 方案 C：多层叠加纸张阶梯（象征项目演进）

**建议**：Phase 1.5 先用文字 logo，Phase 3 设计正式图标。

---

## P1 - 推荐素材

### 3. `/project-init` 演示 GIF

**需求描述**：
- 内容：展示初始化流程和输出结果
- 尺寸：< 5MB，宽度 640px
- 时长：10-15 秒

**制作方式**：
- 使用 terminal 录屏工具（asciinema）
- 或 Claude Code 内置录屏

### 4. 目录结构可视化图

**需求描述**：
- 展示 docs/ 目录层级
- 样式：树状图，配色与品牌一致

**工具建议**：
- 使用 Mermaid diagram
- 或 ASCII tree

### 5. 架构图（runtime）

**需求描述**：
- 展示 runtime 层与 Claude Code 集成
- 数据流图

**参考**：`docs/architecture/runtime-design.md` 已有 Mermaid 图

---

## P2 - 可选素材

### 6. 英文版 README

**需求描述**：
- README-en.md
- 翻译核心内容

**优先级**：Phase 3 多平台适配时制作

### 7. 视频教程

**需求描述**：
- 5 分钟快速上手视频
- 上传 YouTube/Bilibili

**优先级**：Phase 1.5 暂缓，有用户需求后制作

### 8. Discord 服务器图标

**需求描述**：
- 尺寸：128x128px
- 与主 logo 一致

**优先级**：Phase 3 正式建社区时

---

## 素材使用场景

| 场景 | 需要素材 |
|------|----------|
| GitHub README | Logo、徽章、GIF、架构图 |
| npm 包页面 | Logo、README |
| Claude Code 市场 | Logo、简介 |
| 社交媒体推广 | Logo、截图 |
| Discord 社区 | Logo、Banner |

---

## 设计一致性要求

### 颜色方案

| 用途 | 颜色 | 说明 |
|------|------|------|
| 主色 | #1E3A5F（深青） | 专业、稳定 |
| 辅色 | #FFB800（明黄） | 火花感、自动化 |
| 背景 | #FFFFFF | 简洁 |

### 字体

- 标题：无衬线字体（Inter/SF Pro）
- 正文：系统默认

### 品牌语气

- 简洁、技术感、开发者友好
- 无过度营销话术
- 痛点直击 + 功能价值

---

**[BRAND STRATEGIST] 视觉素材清单完成**

下一步：Logo 设计交给外部设计师或 Phase 3 处理。