const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const DATA_FILE = path.join(__dirname, 'data.json');

const MIME_TYPES = {
  '.html': 'text/html;charset=UTF-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// ============ 数据存储函数 ============
function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const defaultData = { providers: [], apis: [], history: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading data:', error);
    return { providers: [], apis: [], history: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

// ============ 提取 HTML ============
function extractHtmlFromWorker() {
  const workerContent = fs.readFileSync(path.join(__dirname, 'worker.js'), 'utf-8');
  
  const startMarker = 'const htmlContent = `';
  const startIndex = workerContent.indexOf(startMarker);
  
  if (startIndex === -1) {
    throw new Error('Could not find htmlContent in worker.js');
  }
  
  const htmlStart = startIndex + startMarker.length;
  let htmlEnd = htmlStart;
  let depth = 1;
  
  while (htmlEnd < workerContent.length && depth > 0) {
    const char = workerContent[htmlEnd];
    if (char === '`' && workerContent[htmlEnd - 1] !== '\\') {
      depth--;
    }
    htmlEnd++;
  }
  
  if (depth !== 0) {
    throw new Error('Could not find end of htmlContent');
  }
  
  let html = workerContent.substring(htmlStart, htmlEnd - 1);
  // 修复 JavaScript 模板字符串中的转义字符
  html = html.replace(/\\\\/g, '\x00');
  html = html.replace(/\\n/g, '\n');
  html = html.replace(/\\`/g, '`');
  html = html.replace(/\\\$/g, '$');
  html = html.replace(/\\\//g, '/');
  html = html.replace(/\x00/g, '\\');
  return html;
}

// ============ API 路由处理 ============
function handleApiRequest(req, res, pathname, method) {
  // GET /api/data - 获取所有数据
  if (method === 'GET' && pathname === '/api/data') {
    const data = loadData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data }));
    return true;
  }

  // POST /api/providers - 添加供应商
  if (method === 'POST' && pathname === '/api/providers') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const provider = JSON.parse(body);
        const data = loadData();
        provider.id = Date.now().toString();
        provider.createdAt = new Date().toISOString();
        data.providers.push(provider);
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, provider }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  // PUT /api/providers/:id - 更新供应商
  if (method === 'PUT' && pathname.startsWith('/api/providers/')) {
    const id = pathname.replace('/api/providers/', '');
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const data = loadData();
        const index = data.providers.findIndex(p => p.id === id);
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Provider not found' }));
          return;
        }
        data.providers[index] = { ...data.providers[index], ...updates, updatedAt: new Date().toISOString() };
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, provider: data.providers[index] }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  // DELETE /api/providers/:id - 删除供应商
  if (method === 'DELETE' && pathname.startsWith('/api/providers/')) {
    const id = pathname.replace('/api/providers/', '');
    const data = loadData();
    data.providers = data.providers.filter(p => p.id !== id);
    data.apis = data.apis.filter(a => a.providerId !== id);
    saveData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return true;
  }

  // POST /api/apis - 添加 API
  if (method === 'POST' && pathname === '/api/apis') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const api = JSON.parse(body);
        const data = loadData();
        api.id = Date.now().toString();
        api.createdAt = new Date().toISOString();
        data.apis.push(api);
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, api }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  // PUT /api/apis/:id - 更新 API
  if (method === 'PUT' && pathname.startsWith('/api/apis/')) {
    const id = pathname.replace('/api/apis/', '');
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const updatedApi = JSON.parse(body);
        const data = loadData();
        const index = data.apis.findIndex(a => a.id === id);
        if (index !== -1) {
          data.apis[index] = { ...data.apis[index], ...updatedApi, updatedAt: new Date().toISOString() };
          saveData(data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, api: data.apis[index] }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'API not found' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  // DELETE /api/apis/:id - 删除 API
  if (method === 'DELETE' && pathname.startsWith('/api/apis/')) {
    const id = pathname.replace('/api/apis/', '');
    const data = loadData();
    data.apis = data.apis.filter(a => a.id !== id);
    saveData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return true;
  }

  // POST /api/history - 添加历史记录
  if (method === 'POST' && pathname === '/api/history') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const historyItem = JSON.parse(body);
        const data = loadData();
        historyItem.id = Date.now().toString();
        historyItem.timestamp = new Date().toISOString();
        data.history.unshift(historyItem);
        // 只保留最近 50 条
        if (data.history.length > 50) {
          data.history = data.history.slice(0, 50);
        }
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, historyItem }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  // DELETE /api/history/:id - 删除历史记录
  if (method === 'DELETE' && pathname.startsWith('/api/history/')) {
    const id = pathname.replace('/api/history/', '');
    const data = loadData();
    data.history = data.history.filter(h => h.id !== id);
    saveData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return true;
  }

  // DELETE /api/history - 清空所有历史记录
  if (method === 'DELETE' && pathname === '/api/history') {
    const data = loadData();
    data.history = [];
    saveData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return true;
  }

  // POST /api/history/import - 导入历史记录
  if (method === 'POST' && pathname === '/api/history/import') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const importData = JSON.parse(body);
        if (!Array.isArray(importData)) {
          throw new Error('Invalid format');
        }
        const data = loadData();
        const merged = [...importData, ...data.history];
        // 去重并限制数量
        const unique = merged.filter((item, index, self) =>
          index === self.findIndex(t => t.id === item.id)
        ).slice(0, 50);
        data.history = unique;
        saveData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: importData.length }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return true;
  }

  return false;
}

// ============ 主服务器 ============
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 处理 API 请求
  if (pathname.startsWith('/api/')) {
    if (!handleApiRequest(req, res, pathname, method)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'API not found' }));
    }
    return;
  }

  // 根路径返回 HTML
  if (pathname === '/') {
    try {
      const htmlContent = extractHtmlFromWorker();
      res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
      res.end(htmlContent);
      return;
    } catch (error) {
      console.error('Error extracting HTML:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading application: ' + error.message);
      return;
    }
  }

  // 静态文件服务
  const ext = path.extname(pathname);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    let filePath = path.join(__dirname, pathname);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 本地服务器已启动！`);
  console.log(`🌐 访问地址: http://localhost:${PORT}`);
  console.log(`📁 数据文件: ${DATA_FILE}`);
  console.log(`\n按 Ctrl+C 停止服务器\n`);
});
