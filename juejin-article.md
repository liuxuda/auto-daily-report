# 📝 5秒生成日报！我用 Node.js 写了个 OpenClaw 技能

> 告别"今天做了啥"的灵魂拷问，让 Git 记录帮你写日报

## 前言

作为一个程序员，每天最痛苦的不是写代码，而是**写日报**。

早上写了啥？忘了。
中午改了啥？记不清了。
下班要写日报了？懵了。

于是我用 **OpenClaw + Node.js** 写了个小工具——**自动日报生成器**。

## ✨ 效果对比

### 传统方式（耗时 30 分钟）
1. 打开 Git
2. 翻看今天提交
3. 回忆每一行改动
4. 手动写成日报
5. 检查格式

### 使用工具后（耗时 5 秒）
```bash
node index.js --today
```

搞定！🎉

## 🛠️ 实现原理

核心思路很简单：

### 1. 读取 Git 提交

```javascript
function getTodayCommits(gitDir = './') {
  const today = new Date().toISOString().split('T')[0];
  const command = `cd ${gitDir} && git log --since="${today}" --until="${today}" --pretty=format:"%h|%s|%an|%ad"`;
  const output = execSync(command, { encoding: 'utf-8' });
  
  return output.trim().split('\n').map(line => {
    const [hash, message, author, time] = line.split('|');
    return { hash, message, author, time };
  });
}
```

### 2. 过滤无关提交

自动忽略 test/node_modules/ 等无关目录：

```javascript
function filterCommits(commits, patterns) {
  return commits.filter(commit => {
    return !patterns.some(pattern => commit.message.includes(pattern));
  });
}
```

### 3. 格式化输出

支持三种格式：

| 格式 | 使用场景 |
|------|---------|
| 文本 | 直接复制发送 |
| Markdown | 文档/博客 |
| JSON | 钉钉/企微机器人 |

```javascript
function generateReport(commits, format = 'text') {
  switch (format) {
    case 'json':
      return JSON.stringify(report, null, 2);
    case 'markdown':
      return `# 工作日报\n\n## 提交记录\n\n` + ...;
    default:
      return `工作日报\n\n提交数: ${total}\n\n` + ...;
  }
}
```

## 🚀 使用方法

### 安装

```bash
# 下载项目
git clone https://github.com/your-repo/auto-daily-report.git
cd auto-daily-report
```

### 配置（可选）

创建 `.daily-report.json`:

```json
{
  "gitDir": "./",
  "excludePatterns": [
    "test/",
    "dist/",
    "node_modules/",
    ".git/"
  ],
  "template": "default"
}
```

### 运行

```bash
# 生成今日日报
node index.js --today

# Markdown 格式
node index.js --today --format=markdown

# JSON 格式（对接钉钉/企微）
node index.js --today --format=json
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
```

### Markdown 格式

```markdown
# 工作日报 - 2024-01-18

## 提交记录 (5 条)

- [09:30] feat: 添加用户登录功能 (abc123)
- [10:15] fix: 修复登录页样式问题 (def456)
- [14:20] docs: 更新 API 文档 (ghi789)
```

### JSON 格式

```json
{
  "date": "2024-01-18",
  "author": "子衍",
  "total": 5,
  "commits": [
    {
      "hash": "abc123",
      "message": "feat: 添加用户登录功能",
      "author": "子衍",
      "time": "09:30"
    }
  ]
}
```

## 🎯 适用场景

| 场景 | 使用方式 |
|------|---------|
| 日常汇报 | 直接复制文本发送 |
| 钉钉/企微 | 用 JSON 对接机器人 |
| 文档归档 | 用 Markdown 保存 |
| 周报汇总 | 收集 git log 输出 |

## 🔮 后续计划

- [ ] 支持多项目汇总
- [ ] AI 智能总结（用 LLM 提取关键点）
- [ ] 钉钉/企微机器人集成
- [ ] Web 界面版

## 📦 开源

代码已开源：[GitHub 链接]

MIT 许可证，欢迎 PR/Issue。

## 💬 交流

欢迎在下面留言交流～

---

**如果你也懒得写日报，试试这个工具吧！**

用过的点个赞 👍

---

*技术栈：Node.js + Git + OpenClaw*
