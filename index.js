#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function getTodayCommits(gitDir = './') {
  try {
    // 获取今天的提交
    const today = new Date().toISOString().split('T')[0];
    const command = `cd ${gitDir} && git log --since="${today} 00:00:00" --until="${today} 23:59:59" --pretty=format:"%h|%s|%an|%ad" --date=format:"%H:%M"`;
    const output = execSync(command, { encoding: 'utf-8' });
    
    return output.trim().split('\n').map(line => {
      const [hash, message, author, time] = line.split('|');
      return { hash, message, author, time };
    });
  } catch (error) {
    return [];
  }
}

function getConfig() {
  const configPath = path.join(process.cwd(), '.daily-report.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  return {
    gitDir: './',
    excludePatterns: ['test/', 'dist/', 'node_modules/', '.git/'],
    template: 'default'
  };
}

function filterCommits(commits, patterns) {
  if (!patterns || !Array.isArray(patterns)) return commits;
  return commits.filter(commit => {
    if (!commit || !commit.message) return false;
    return !patterns.some(pattern => commit.message.includes(pattern));
  });
}

function generateReport(commits, format = 'text') {
  if (commits.length === 0) {
    return format === 'json' 
      ? JSON.stringify({ status: 'no_commits', message: '今日无提交记录' }, null, 2)
      : '今日暂无工作提交';
  }

  const report = {
    date: new Date().toISOString().split('T')[0],
    author: commits[0].author,
    commits: commits,
    total: commits.length,
    summary: commits.map(c => c.message).join('\n')
  };

  switch (format) {
    case 'json':
      return JSON.stringify(report, null, 2);
    case 'markdown':
      return `# 工作日报 - ${report.date}\n\n` +
             `## 提交记录 (${report.total} 条)\n\n` +
             commits.map(c => `- [${c.time}] ${c.message} (${c.hash})`).join('\n');
    default:
      return `工作日报 - ${report.date}\n` +
             `作者: ${report.author}\n` +
             `提交数: ${report.total}\n\n` +
             commits.map(c => `[${c.time}] ${c.message}`).join('\n');
  }
}

function main() {
  const args = process.argv.slice(2);
  const config = getConfig();
  
  let format = 'text';
  let filterDate = null;

  // 解析参数
  args.forEach(arg => {
    if (arg === '--format=json') format = 'json';
    if (arg === '--format=markdown') format = 'markdown';
    if (arg === '--today') filterDate = 'today';
  });

  // 获取提交记录
  let commits = getTodayCommits(config.gitDir);
  
  // 过滤
  commits = filterCommits(commits, config.excludePatterns);

  // 生成报告
  const report = generateReport(commits, format);
  console.log(report);
}

main();
