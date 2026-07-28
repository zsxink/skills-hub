const axios = require('axios');
const TurndownService = require('turndown');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function isWeChatUrl(url) {
  try {
    const host = new URL(url).hostname;
    return host === 'mp.weixin.qq.com' || host.endsWith('.mp.weixin.qq.com');
  } catch {
    return /mp\.weixin\.qq\.com/i.test(url);
  }
}

async function main() {
  const url = process.argv[2];
  const outputPath = process.argv[3] || 'output.md';

  if (!url) {
    console.error('❌ 请输入有效的网页URL');
    console.error('📌 示例：node scripts/url-to-markdown.js https://example.com [输出文件路径]');
    process.exit(1);
  }

  if (isWeChatUrl(url)) {
    console.error('❌ 微信公众号文章请使用 wechat-article-fetcher 技能，本工具不处理 mp.weixin.qq.com 链接');
    console.error('📌 示例：node ../wechat-article-fetcher/scripts/fetch.js https://mp.weixin.qq.com/s/xxx');
    process.exit(1);
  }

  try {
    console.log('🌐 正在获取网页内容（静态 HTML，非浏览器渲染）...');
    const response = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: 15000,
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400,
    });
    const html = response.data;

    const dom = new JSDOM(html, { url });
    const document = dom.window.document;
    document.querySelectorAll('script, style, noscript, iframe').forEach((el) => el.remove());
    const title = (document.title || '').trim() || '无标题网页';
    const bodyHtml = document.body ? document.body.innerHTML : html;

    console.log('🔄 正在转换为Markdown格式...');
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
    });
    turndownService.addRule('images', {
      filter: 'img',
      replacement(content, node) {
        const alt = node.alt || '';
        const src = node.getAttribute('src') || '';
        return src ? `![${alt}](${src})` : '';
      },
    });
    turndownService.addRule('links', {
      filter: 'a',
      replacement(content, node) {
        const href = node.getAttribute('href') || '';
        const text = content.trim() || href;
        return href ? `[${text}](${href})` : text;
      },
    });

    const markdown = turndownService.turndown(bodyHtml);
    const finalMarkdown = `# ${title}\n来源：${url}\n\n${markdown}`;

    fs.writeFileSync(outputPath, finalMarkdown, 'utf8');
    console.log('✅ 转换完成！');
    console.log(`📄 已保存至：${outputPath}`);
  } catch (error) {
    console.error('❌ 转换失败：', error.message);
    process.exit(1);
  }
}

main();
