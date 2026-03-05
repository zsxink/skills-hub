---
name: a-stock-daily-report
description: A股每日简报自动生成系统。抓取东方财富实时数据，生成包含大盘指数、热门板块、资金动向等完整信息的日报报告。
---

# A股日报自动生成系统

自动抓取 A 股市场数据，生成日报。

## 功能

- 📊 **大盘概览**：上证、深证、创业板指数
- 🔥 **热门板块**：涨幅 TOP 5 板块
- 📈 **明日关注**：技术面突破、政策利好板块
- ⚠️ **风险提示**：高估值、资金流出板块
- 💰 **资金动向**：北向资金、主力净流入

## 快速开始

### 1. 手动运行

#### Linux/Mac:
```bash
cd ~/.openclaw/workspace/skills/a-stock-daily-report
node scripts/a-stock-report.js
```

#### Windows:
```bash
cd C:\Users\xian\.openclaw\workspace\skills\a-stock-daily-report
node scripts\a-stock-report.js
```

### 2. 配置定时任务

```bash
# 每天16:00自动运行
openclaw cron add --schedule "0 16 * * 1-5" \
  --timezone "Asia/Shanghai" \
  --command "node ~/.openclaw/workspace/skills/a-stock-daily-report/scripts/a-stock-report.js"
```

### 3. 推送消息（推荐）

技能将报告输出到标准输出，OpenClaw 可以捕获并发送到各种渠道：

```bash
# 推送到飞书
node scripts/a-stock-report.js | openclaw message send --channel feishu

# 推送到其他渠道
node scripts/a-stock-report.js | openclaw message send --channel <channel>
```

### 4. 保存到文件（可选）

如果需要将报告保存到本地文件：

```bash
# 保存到默认目录（~/.openclaw/workspace/reports/a-stock-daily-report/）
node scripts/a-stock-report.js > ~/.openclaw/workspace/reports/a-stock-daily-report/report_$(date +%Y%m%d).md
```

## 文件说明

```
a-stock-daily-report/
├── SKILL.md              # 本文档
└── scripts/
    └── a-stock-report.js    # A股日报生成脚本（Node.js版本）
```

## 数据来源

- **东方财富网**：板块排行、指数行情
- **API**：免费，无需密钥

## 自定义

### 修改推送时间

编辑 crontab：
```bash
crontab -e
```

修改时间表达式：
```cron
# 每天16:00（工作日）
0 16 * * 1-5 node ~/.openclaw/workspace/skills/a-stock-daily-report/scripts/a-stock-report.js | openclaw message send --channel feishu

# 每天15:30（工作日）
30 15 * * 1-5 node ~/.openclaw/workspace/skills/a-stock-daily-report/scripts/a-stock-report.js | openclaw message send --channel feishu
```

### 修改报告内容

编辑 `scripts/a-stock-report.js` 中的 `generateReport()` 函数。

## 环境变量

无需配置环境变量。

## 依赖项

- Node.js 14+
- 无需额外依赖包（使用 Node.js 内置模块）

## 工作原理

1. 从东方财富 API 获取实时大盘指数数据（上证、深证、创业板）
2. 从东方财富 API 获取板块排行数据
3. 分析数据并生成 Markdown 格式的日报
4. 将报告输出到标准输出（stdout），日志输出到标准错误（stderr）
5. OpenClaw 或其他工具可以通过管道捕获报告并发送到各种渠道

## 故障排除

### 数据抓取失败

1. 检查网络连接
2. 检查 Node.js 是否已安装：`node --version`
3. 查看日志输出（stderr）

### 推送失败

1. 检查 OpenClaw 消息发送功能是否正常
2. 检查目标渠道配置
3. 使用 `|` 管道将报告输出到 OpenClaw

### 运行失败

1. 确认 Node.js 版本 >= 14
2. 检查脚本路径是否正确
3. 查看错误日志（stderr 输出）

### 保存文件失败

如果需要保存到文件，确保目录存在：
```bash
mkdir -p ~/.openclaw/workspace/reports/a-stock-daily-report
```

## 输出格式

报告以 Markdown 格式输出，包含以下部分：

```
# 📊 A股市场日报
**YYYY年MM月DD日**

---

## 🎯 大盘概览

| 指数 | 收盘点位 | 涨跌幅 |
|------|---------|--------|
| 上证指数 | xxxx.xx | ±x.xx% |
| 深证成指 | xxxx.xx | ±x.xx% |
| 创业板指 | xxxx.xx | ±x.xx% |

**市场情绪**: 偏多/偏空/中性

---

## 🔥 热门板块 TOP 5

| 排名 | 板块名称 | 涨跌幅 | 领涨股 |
|------|---------|--------|--------|
| 1 | 板块名 | ±x.xx% | 股票名 |
| ...

---

## 📈 明日关注

| 板块名称 | 关注理由 | 技术面 | 操作建议 |
|---------|---------|--------|---------|
| 板块名 | 理由 | 分析 | 建议 |
| ...

---

## ⚠️ 风险提示

| 板块名称 | 风险理由 | 建议 |
|---------|---------|------|
| 板块名 | 原因 | 建议 |
| ...

---

## 💰 资金动向

- **主力流入方向**: 板块1、板块2、板块3
- **北向资金**: 金额
- **融资余额**: 金额

---

## 📝 操作策略

1. **仓位控制**: 建议
2. **关注方向**: 建议
3. **风险控制**: 建议
4. **操作节奏**: 建议

---

**数据来源**: 东方财富网
**生成时间**: YYYY-MM-DD
```
