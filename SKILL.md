---
name: auto-daily-report
description: 自动生成日报工具。根据工作记录（Git 提交、文档修改、会议记录等）智能生成结构化日报，支持多种格式输出。
version: 1.0.0
metadata:
  openclaw:
    emoji: "📝"
    requires:
      bins: ["node"]
    homepage: https://github.com/liuxuda/auto-daily-report
---

# Auto Daily Report - 智能日报生成器

## 功能
- 自动读取 Git 提交记录作为工作内容
- 智能生成结构化日报
- 支持多种格式输出（JSON/Markdown/文本）
- 可自定义日报模板

## 安装
将此技能复制到 `~/.openclaw/skills/` 目录即可

## 使用方法
```bash
# 生成今日日报
dr report --today

# 生成自定义时间范围的日报
dr report --from "2024-01-01" --to "2024-01-31"

# 输出为 Markdown 格式
dr report --today --format markdown
```

## 配置
在项目根目录创建 `.daily-report.json`:
```json
{
  "gitDir": "./",
  "excludePatterns": ["test/", "dist/", "node_modules/"],
  "template": "default"
}
```
