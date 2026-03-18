# Skill-Hub

一个AI Agent 技能仓库，提供各种实用技能，帮助AI助手更好地完成特定任务。

## ✨ 技能特点

- 🚀 **即装即用**：每个技能都包含完整的脚本和文档
- 📖 **规范输出**：所有技能都遵循统一的输出格式规范
- 🎯 **场景丰富**：覆盖财经、新闻、技术文章等多个领域
- 🔧 **易于扩展**：清晰的目录结构，方便添加新技能

## 🎯 现有技能

| 技能 | 描述 | 核心功能 |
|------|------|---------|
| [a-stock-daily-report](skills/a-stock-daily-report/SKILL.md) | A股每日简报自动生成系统 | 📊 大盘指数 · 🔥 热门板块 · 📈 明日关注 · ⚠️ 风险提示 · 💰 资金动向 |
| [juejin-article-trends](skills/juejin-article-trends/SKILL.md) | 掘金技术文章排行榜查询 | 🏷️ 分类查询 · 📊 热门文章 · 🕐 最新文章 · 📝 阅读数据统计 |
| [toutiao-news-trends](skills/toutiao-news-trends/SKILL.md) | 今日头条热点新闻热榜 | 📰 实时热点 · 🔥 热度排行 · 🏷️ 智能分类 · 🔗 快速链接 |
| [url-to-markdown](skills/url-to-markdown/SKILL.md) | 通用网页转Markdown工具 | 🌐 网页抓取 · 📄 格式转换 · 📚 结构保留 · 💾 本地备份 |
| [wechat-article-fetcher](skills/wechat-article-fetcher/SKILL.md) | 微信公众号文章抓取工具 | 📱 公众号文章 · 📄 Markdown转换 · 🖼️ 图片本地化 · 🗃️ Obsidian适配 |
| [wechat-article-search](skills/wechat-article-search/SKILL.md) | 微信公众号文章智能搜索 | 🔍 关键词检索 · 📄 文章概要 · ⏰ 发布时间 · 📱 来源追踪 |

## 🚀 技能安装

- 方式一：前往 `https://skills.sh/?q=zsxink`
- 方式二：添加具体技能：`npx skills add `https://github.com/zsxink/skills-hub/`  --skill 技能名称`
- 方式三：添加技能仓库：`npx skills add `https://github.com/zsxink/skills-hub` `
- 方式四：手动下载技能文件夹，复制文件到自己的技能目录skills中

## 📁 技能目录结构

每个技能应遵循以下结构：

```
skills/
└── skill-name/
    ├── SKILL.md          # 技能说明和使用指南
    ├── scripts/          # 脚本文件
    └── references/       # 参考资料
```

## ➕ 添加新技能

1. 在`skills/`目录下创建新文件夹
2. 编写`SKILL.md`文档
3. 添加必要的脚本和资料
4. 在README中更新技能列表

## 📄 SKILL.md 模板

每个技能应包含：

- 技能名称和描述
- 使用指引（步骤说明）
- 命令行使用样例
- 参数说明
- 注意事项

## 作者介绍

- 小先（Ryan）[zsxink](https://github.com/zsxink)
- "Ink the code, think the world." （以墨筑码，以思筑界。）
