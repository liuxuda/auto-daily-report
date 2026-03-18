# 📝 OpenClaw 自动日报生成器

> 告别写日报的痛苦，5 秒生成专业日报

## ✨ 核心功能

- ⚡ **自动收集** - 扫描 Git 提交记录，零手动输入
- 🎯 **智能过滤** - 自动忽略 test/node_modules/ 等无关提交
- 📊 **多格式输出** - 支持 文本 / Markdown / JSON
- 🚀 **一键执行** - 单命令完成，无需配置

## 🎁 解决痛点

| 痛点             | 解决方案          |
| ---------------- | ----------------- |
| 忘记今天做了什么 | Git 提交自动记录  |
| 写日报时间太长   | 5 秒生成完成      |
| 格式不规范       | 统一模板输出      |
| 多个项目管理     | 支持任意 Git 目录 |

## 📦 安装

1. 克隆到本地：
```bash
git clone https://github.com/liuxuda/openclaw-auto-daily-report.git ~/.openclaw/skills/auto-daily-report
```

2. 在项目根目录创建配置文件 `.daily-report.json`:
```json
{
  "gitDir": "./",
  "excludePatterns": ["test/", "dist/", "node_modules/", ".git/"],
  "template": "default"
}
```

## 🚀 使用方法

### 基础使用
```bash
# 生成今日日报
node ~/.openclaw/skills/auto-daily-report/index.js

# 输出 Markdown 格式
node ~/.openclaw/skills/auto-daily-report/index.js --format=markdown

# 输出 JSON 格式（对接钉钉/企微）
node ~/.openclaw/skills/auto-daily-report/index.js --format=json
```

### OpenClaw 集成
在 OpenClaw 中直接调用：
```
生成今日日报
```

## 📊 输出示例

### 文本格式
```
工作日报 - 2024-01-18
作者: 子衍
提交数: 5

[09:30] feat: 添加用户登录功能 (abc123)
[10:15] fix: 修复登录页样式问题 (def456)
[14:20] docs: 更新 API 文档 (ghi789)
...
```

### Markdown 格式
```markdown
# 工作日报 - 2024-01-18

## 提交记录 (5 条)

- [09:30] feat: 添加用户登录功能 (abc123)
- [10:15] fix: 修复登录页样式问题 (def456)
- [14:20] docs: 更新 API 文档 (ghi789)
...
```

### JSON 格式
```json
{
  "date": "2024-01-18",
  "author": "子衍",
  "total": 5,
  "commits": [...]
}
```

## 🎯 适用人群

- ✅ 程序员（Git 日常用户）
- ✅ 项目经理（需要团队进度）
- ✅ 自由开发者（记录工作）
- ✅ 学生（学习记录）

## 💡 使用场景

1. **日常汇报** - 一键生成日报发送给领导
2. **周报汇总** - 收集团队成员提交记录
3. **工时统计** - 记录实际工作投入
4. **项目归档** - 长期保存工作足迹

## 🛠️ 技术栈

- Node.js (无需依赖)
- Git
- OpenClaw

## 📝 License

MIT License - 个人和商业使用均可

## 🤝 支持与反馈

- GitHub Issues: https://github.com/liuxuda/auto-daily-report/issues
- 邮箱: daodao@openclaw.ai

---

**⭐ 如果对你有帮助，给个 Star！**
