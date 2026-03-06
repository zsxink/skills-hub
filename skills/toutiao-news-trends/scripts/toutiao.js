#!/usr/bin/env node

/**
 * 今日头条热榜获取工具
 * 抓取 https://www.toutiao.com/hot-event/hot-board/ 返回的热点榜单数据
 */

const https = require('https');
const zlib = require('zlib');

// 分类映射：英文 -> 中文
const CATEGORY_MAP = {
  'finance': '财经',
  'car': '汽车',
  'technology': '科技',
  'entertainment': '娱乐',
  'sports': '体育',
  'society': '社会',
  'international': '国际',
  'military': '军事',
  'health': '健康',
  'education': '教育',
  'game': '游戏',
  'travel': '旅游',
  'food': '美食',
  'fashion': '时尚',
  'life': '生活',
};

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/123.0.0.0 Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36',
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

const DEFAULT_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Referer': 'https://www.toutiao.com/',
  'Origin': 'https://www.toutiao.com',
};

function decompressBody(buffer, contentEncoding) {
  if (!contentEncoding) return buffer;
  const encoding = String(contentEncoding).toLowerCase();
  if (encoding.includes('gzip')) return zlib.gunzipSync(buffer);
  if (encoding.includes('deflate')) return zlib.inflateSync(buffer);
  if (encoding.includes('br')) return zlib.brotliDecompressSync(buffer);
  return buffer;
}

/**
 * 发起 HTTP GET 请求并解析 JSON
 * @param {string} url
 * @param {object} headers
 */
function httpGetJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'User-Agent': getRandomUserAgent(),
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          const decompressed = decompressBody(buffer, res.headers['content-encoding']);
          const text = decompressed.toString('utf-8');
          const data = JSON.parse(text);
          resolve(data);
        } catch (e) {
          const status = res.statusCode || 0;
          reject(new Error(`Failed to parse JSON (status=${status}): ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function getHotBoard(limit = 50) {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(200, Math.floor(limit))) : 50;
  const url = 'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc';
  const resp = await httpGetJson(url);

  if (!resp || !Array.isArray(resp.data)) {
    throw new Error('获取今日头条热榜失败：返回结构不符合预期');
  }

  const items = resp.data.map((item, index) => {
    let cleanedLink = '';
    try {
      const u = new URL(item.Url);
      u.search = '';
      u.hash = '';
      cleanedLink = u.toString();
    } catch {
      cleanedLink = typeof item.Url === 'string' ? item.Url : '';
    }

    const popularity = Number.parseInt(item.HotValue, 10);
    const categories = Array.isArray(item.InterestCategory) ? item.InterestCategory : [];
    const categoriesCN = categories.map(cat => CATEGORY_MAP[cat] || cat);

    return {
      rank: index + 1,
      title: item.Title || '',
      popularity: Number.isFinite(popularity) ? popularity : 0,
      link: cleanedLink,
      cover: item.Image && item.Image.url ? item.Image.url : null,
      label: item.LabelDesc || item.Label || null,
      clusterId: String(item.ClusterIdStr || item.ClusterId || ''),
      categories: categories,
      categoriesCN: categoriesCN,
    };
  });

  return items.slice(0, safeLimit);
}

/**
 * 格式化热度值为"万"单位
 */
function formatPopularity(popularity) {
  if (!Number.isFinite(popularity) || popularity < 0) return '0';
  return (popularity / 10000).toFixed(0) + '万';
}

/**
 * 按照规范格式输出 Markdown
 */
function printFormatted(data) {
  console.log(`## 今日头条最新热点新闻 Top ${data.length}`);
  console.log();
  console.log(`**🔥 热度前十名**`);
  console.log();

  data.forEach((item, index) => {
    const categoryStr = item.categoriesCN.length > 0 ? item.categoriesCN.join('/') : '-';
    console.log(`${item.rank}. **${item.title}**`);
    console.log(`热度：${formatPopularity(item.popularity)}`);
    console.log(`分类：${categoryStr}`);
    console.log(`[查看详情](${item.link})`);
    // 在每条新闻后添加分隔线(最后一条除外)
    if (index < data.length - 1) {
      console.log(`---`);
    }
    console.log();
  });
}

function printHelp() {
  console.log(`
今日头条热榜工具

用法:
  node scripts/toutiao.js [command] [limit]

命令:
  (无)                 获取热榜（默认格式化输出，前10条）
  format, fmt         获取热榜（格式化输出，符合规范，默认10条）
  json                获取热榜（JSON 格式，默认50条）
  help                 显示帮助信息

参数:
  limit                获取新闻数量（默认：格式化输出10条，JSON输出50条）

示例:
  # 获取热榜（格式化输出，默认10条）
  node scripts/toutiao.js
  node scripts/toutiao.js format

  # 获取热榜前5条（格式化输出）
  node scripts/toutiao.js 5
  node scripts/toutiao.js format 5

  # 获取热榜（JSON 格式，默认50条）
  node scripts/toutiao.js json

  # 获取热榜前20条（JSON 格式）
  node scripts/toutiao.js json 20
:`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const arg2 = args[1];

  try {
    // 处理第一个参数是数字的情况（格式化输出）
    const firstArgIsNumber = !isNaN(Number.parseInt(command));
    const secondArgIsNumber = arg2 && !isNaN(Number.parseInt(arg2));

    if (firstArgIsNumber) {
      // 第一个参数是数字，直接格式化输出
      const limit = Number.parseInt(command);
      const data = await getHotBoard(limit);
      printFormatted(data);
      return;
    }

    // 默认行为：格式化输出（无命令或格式化命令）
    if (!command || command === 'format' || command === 'fmt' || command === '--format') {
      const limit = secondArgIsNumber ? Number.parseInt(arg2) : 10;
      const data = await getHotBoard(limit);
      printFormatted(data);
      return;
    }

    // JSON 输出（需要明确指定）
    if (command === 'json' || command === '--json') {
      const limit = secondArgIsNumber ? Number.parseInt(arg2) : 50;
      const data = await getHotBoard(limit);
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    // 帮助信息
    printHelp();
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { getHotBoard };

if (require.main === module) {
  main();
}
