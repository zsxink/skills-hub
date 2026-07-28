---
name: url-to-markdown
description: 通用网页转Markdown工具。抓取公开网页URL的静态HTML，转换为标准Markdown格式并保存到本地。对于 mp.weixin.qq.com 链接请使用 wechat-article-fetcher。不适用重度客户端渲染的SPA站点。
---

# url-to-markdown

通过 HTTP 抓取公开网页的静态 HTML，使用 Turndown 转换为 Markdown 并保存到本地。

## 相关技能

- **微信公众号文章** → `wechat-article-fetcher`
- **按关键词搜索微信公众号** → `wechat-article-search`
- **掘金热榜（仅榜单）** → `juejin-article-trends`

## 适用场景

- 公开博客、文档、新闻页（服务端渲染的 HTML）
- 对已有 URL 的页面做本地 Markdown 备份

## 不适用场景

- `mp.weixin.qq.com` 链接 → 请用 `wechat-article-fetcher`
- 需要登录或付费的页面
- 重度客户端渲染的 SPA（React/Vue 应用壳，body 几乎为空）

## 安装

```bash
cd skills/url-to-markdown
npm install
```

要求 Node.js >= 14。

## 用法

```bash
node scripts/url-to-markdown.js <URL> [输出文件路径]
```

| 参数 | 必填 | 说明 |
|------|------|------|
| URL | 是 | 公开 http(s) 链接（微信链接会拒绝） |
| 输出文件路径 | 否 | 默认：`output.md` |

```bash
node scripts/url-to-markdown.js https://example.com/post
node scripts/url-to-markdown.js https://docs.example.com/guide ./guide.md
```

## 注意事项

- 使用**静态 HTTP 抓取**，非浏览器渲染，动态内容可能缺失。
- 转换前会去除 `script` / `style` / `noscript` / `iframe` 标签。
- 保留远程图片链接（不下载到本地），防盗链可能导致图片无法显示。
- TLS 证书验证保持**启用**状态。

## 输出格式

```markdown
# 页面标题
来源：https://example.com/page

…转换后的正文…
```

## 常见问题

- **获取失败**：确认 URL 公开可访问；检查网络与 HTTP 状态。
- **内容几乎为空**：可能是 SPA；本工具不适用。
- **图片打不开**：防盗链；链接仍指向原站。
