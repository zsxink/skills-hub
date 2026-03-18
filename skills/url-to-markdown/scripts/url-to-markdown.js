const axios = require('axios');
const TurndownService = require('turndown');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const https = require('https');

// 配置
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

async function main() {
  // 1. 校验参数
  const url = process.argv[2];
  const outputPath = process.argv[3] || 'output.md';
  if (!url) {
    console.error('❌ 请输入有效的网页URL');
    console.error('📌 示例：node scripts/html-to-markdown.js https://example.com [输出文件路径]');
    process.exit(1);
  }

  try {
    // 2. 获取网页HTML
    console.log('🌐 正在获取网页内容...');
    const response = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: 15000,
      httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
    });
    const html = response.data;

    // 3. 提取标题并移除script/style标签
    const dom = new JSDOM(html);
    // 移除script和style标签，避免转换为文本
    const scripts = dom.window.document.querySelectorAll('script, style');
    scripts.forEach(el => el.remove());
    const title = dom.window.document.title.trim() || '无标题网页';

    // 4. 转换为Markdown
    console.log('🔄 正在转换为Markdown格式...');
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced'
    });
    // 处理图片和链接（保留原始属性）
    turndownService.addRule('images', {
      filter: 'img',
      replacement: function (content, node) {
        const alt = node.alt || '';
        const src = node.src || '';
        return src ? `![${alt}](${src})` : '';
      }
    });
    turndownService.addRule('links', {
      filter: 'a',
      replacement: function (content, node) {
        const href = node.getAttribute('href') || '';
        const text = content.trim() || href;
        return href ? `[${text}](${href})` : text;
      }
    });
    const markdown = turndownService.turndown(html);

    // 5. 生成最终Markdown（包含标题和来源）
    const finalMarkdown = `# ${title}\n来源：${url}\n\n${markdown}`;

    // 6. 保存文件
    const fs = require('fs');
    fs.writeFileSync(outputPath, finalMarkdown, 'utf8');
    console.log('✅ 转换完成！');
    console.log(`📄 已保存至：${outputPath}`);

  } catch (error) {
    console.error('❌ 转换失败：', error.message);
    process.exit(1);
  }
}

main();