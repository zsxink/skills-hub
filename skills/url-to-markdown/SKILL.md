---
name: url-to-markdown
description: 通用网页转Markdown工具，支持任意公开网页URL抓取（不处理 mp.weixin.qq.com 链接，请使用 wechat-article-fetcher 技能），自动转换为标准Markdown格式，适合普通网页、博客、新闻、文档等非微信平台内容的快速转码。
---

# url-to-markdown 通用网页转Markdown技能

## 📖 技能概述
专门用于抓取任意公开网页内容（不处理 mp.weixin.qq.com 链接，请使用 wechat-article-fetcher 技能），通过浏览器渲染获取完整HTML后自动转换为标准Markdown格式，保留原文排版、图片、链接、标题层级等结构，适合普通网页、博客、新闻、技术文档等非微信平台内容的快速转码和本地备份。

## 🎯 适用场景
- 📚 普通网页内容快速采集
- 💾 技术文档、博客文章本地备份
- 📝 公开新闻、资讯内容转存
- 🗃️ 非微信公众号平台网页
- 🌐 通用HTML内容转Markdown格式转换

## 🔧 依赖安装
### 环境要求
- Node.js >= 14.0.0
- 操作系统：Windows / Linux / macOS 全平台兼容

### 安装步骤
```bash
# 进入技能目录
cd skills/url-to-markdown

# 安装依赖
npm install
```

## 🚀 使用方法
```bash
# 命令格式
node scripts/url-to-markdown.js <网页URL> [输出文件路径]
```

### 参数说明
| 参数 | 类型 | 是否必填 | 说明 |
|------|------|----------|------|
| 网页URL | string | 是 | 任意公开可访问的网页链接（不支持 mp.weixin.qq.com 链接，请使用 wechat-article-fetcher 技能） |
| 输出文件路径 | string | 否 | 保存的Markdown文件路径，默认值：`output.md` |

### 使用示例
```bash
# 示例1：转换掘金文章，默认保存为output.md
node scripts/url-to-markdown.js https://juejin.cn/post/7345678901234567

# 示例2：转换技术文档，指定输出路径
node scripts/url-to-markdown.js https://docs.openclaw.ai ./openclaw-docs.md
```

## 📂 输出说明
### Markdown文件格式
```markdown
# 网页标题
来源：https://example.com/page-url

## 原文标题1
原文内容...

![图片描述](图片链接)

## 原文标题2
原文内容...
[链接文字](链接地址)
```
自动保留原文的标题层级、段落、列表、引用、图片、链接等完整结构。

## ✨ 核心特性
✅ **真实浏览器渲染**：通过OpenClaw浏览器能力获取完整渲染后的HTML，避免动态内容抓取失败
✅ **标准格式转换**：基于Turndown实现，转换后的Markdown格式规范，兼容性强
✅ **结构完整保留**：自动保留原文标题、段落、列表、引用、图片、链接等所有排版结构
✅ **轻量高效**：无需复杂配置，单命令即可完成转换
✅ **跨平台兼容**：支持Windows/Linux/macOS全平台运行

## ❓ 常见问题
### Q: 抓取失败提示「获取网页HTML失败」怎么办？
A: 请确认网页是公开可访问的，没有设置登录墙或付费墙；部分网站反爬策略严格，可多尝试几次。

### Q: 图片显示不出来怎么办？
A: 部分网站图片设置了防盗链，转换后保留原图片链接，需要在对应网站域名下才能正常访问。

## 📝 更新记录
- **v1.0.0 (2026-03-18)**：初始版本，完成核心网页抓取、HTML转Markdown功能
