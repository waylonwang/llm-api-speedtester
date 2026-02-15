// worker.js - Enhanced LLM API Speed Tester
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (request.method === "GET" && url.pathname === "/") {
            const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>LLM API 速度测试工具</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>
          <style>
              * {
                  box-sizing: border-box;
              }
              body {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                  background-color: #1e1e2f;
                  color: #e0e0e0;
                  margin: 0;
                  padding: 20px;
                  font-size: 14px;
              }
              .container {
                  max-width: 1400px;
                  margin: auto;
              }
              h1 {
                  color: #ffffff;
                  text-align: center;
                  margin-bottom: 20px;
                  font-size: 1.8em;
              }
              .tabs {
                  display: flex;
                  gap: 10px;
                  margin-bottom: 20px;
                  background-color: #2a2a40;
                  padding: 10px;
                  border-radius: 8px;
              }
              .tab {
                  padding: 10px 20px;
                  background-color: #3a3a52;
                  border: none;
                  border-radius: 4px;
                  color: #e0e0e0;
                  cursor: pointer;
                  transition: all 0.3s ease;
              }
              .tab:hover {
                  background-color: #4a4a70;
              }
              .tab.active {
                  background-color: #5a5a90;
                  color: #ffffff;
              }
              .tab-content {
                  display: none;
              }
              .tab-content.active {
                  display: block;
              }
              .panel {
                  background-color: #2a2a40;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              }
              .panel h2 {
                  margin-top: 0;
                  color: #ffffff;
                  font-size: 1.3em;
                  border-bottom: 1px solid #4f4f6e;
                  padding-bottom: 10px;
                  margin-bottom: 15px;
              }
              .input-group {
                  display: flex;
                  gap: 10px;
                  margin-bottom: 15px;
                  align-items: center;
                  flex-wrap: wrap;
              }
              .input-group label {
                  color: #b0b0c0;
                  min-width: 100px;
                  flex-shrink: 0;
              }
              input[type="text"], input[type="password"], input[type="number"], select {
                  padding: 10px;
                  background-color: #3a3a52;
                  border: 1px solid #4f4f6e;
                  color: #e0e0e0;
                  border-radius: 4px;
                  font-size: 14px;
                  flex-grow: 1;
              }
              input::placeholder {
                  color: #8a8aa0;
              }
              select {
                  cursor: pointer;
              }
              select option {
                  background-color: #2a2a40;
              }
              button {
                  padding: 10px 20px;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  transition: background-color 0.3s ease;
                  color: white;
              }
              .btn-primary {
                  background-color: #4a90e2;
              }
              .btn-primary:hover {
                  background-color: #5aa0f2;
              }
              .btn-success {
                  background-color: #28a745;
              }
              .btn-success:hover {
                  background-color: #218838;
              }
              .btn-danger {
                  background-color: #dc3545;
              }
              .btn-danger:hover {
                  background-color: #c82333;
              }
              .btn-warning {
                  background-color: #ffc107;
                  color: #212529;
              }
              .btn-warning:hover {
                  background-color: #e0a800;
              }
              .btn-secondary {
                  background-color: #6c757d;
              }
              .btn-secondary:hover {
                  background-color: #5a6268;
              }
              .btn-sm {
                  padding: 6px 12px;
                  font-size: 12px;
              }
              .checkbox-group {
                  display: flex;
                  align-items: center;
                  gap: 8px;
              }
              .checkbox-group input[type="checkbox"] {
                  width: 18px;
                  height: 18px;
                  cursor: pointer;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
              }
              th, td {
                  border: 1px solid #4f4f6e;
                  padding: 10px 8px;
                  text-align: left;
                  font-size: 0.9em;
              }
              th {
                  background-color: #3a3a52;
                  font-weight: bold;
              }
              tr:hover {
                  background-color: #3a3a52;
              }
              .status-message {
                  margin-top: 15px;
                  padding: 10px;
                  background-color: #3a3a52;
                  border-radius: 4px;
                  text-align: center;
                  display: none;
              }
              .loader {
                  border: 3px solid #f3f3f330;
                  border-top: 3px solid #8888ff;
                  border-radius: 50%;
                  width: 16px;
                  height: 16px;
                  animation: spin 1s linear infinite;
                  display: inline-block;
                  margin-left: 8px;
                  vertical-align: middle;
              }
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
              .results-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-top: 20px;
              }
              .results-grid.single {
                  grid-template-columns: 1fr;
              }
              .result-section {
                  background-color: #2a2a40;
                  padding: 15px;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              }
              .result-section h3 {
                  margin-top: 0;
                  color: #ffffff;
                  font-size: 1.1em;
                  border-bottom: 1px solid #4f4f6e;
                  padding-bottom: 8px;
                  margin-bottom: 12px;
              }
              .result-section .subtitle {
                  font-size: 0.85em;
                  color: #a0a0b8;
                  margin-bottom: 12px;
              }
              .data-table th, .data-table td {
                  padding: 6px 4px;
                  text-align: center;
                  min-width: 45px;
                  font-size: 0.8em;
              }
              .data-table td.label-col {
                  font-weight: bold;
                  background-color: #3a3a52;
              }
              .data-table td.placeholder {
                  color: #777;
              }
              .legend {
                  margin-top: 12px;
                  display: flex;
                  justify-content: space-between;
                  font-size: 0.75em;
              }
              .legend span {
                  padding: 2px 6px;
                  border-radius: 3px;
                  color: #1e1e2f;
              }
              .modal {
                  display: none;
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0,0,0,0.7);
                  z-index: 1000;
                  justify-content: center;
                  align-items: center;
              }
              .modal.show {
                  display: flex;
              }
              .modal-content {
                  background-color: #2a2a40;
                  padding: 25px;
                  border-radius: 8px;
                  max-width: 600px;
                  width: 90%;
                  max-height: 80vh;
                  overflow-y: auto;
                  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
              }
              .modal-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
                  border-bottom: 1px solid #4f4f6e;
                  padding-bottom: 10px;
              }
              .modal-header h3 {
                  margin: 0;
                  color: #ffffff;
              }
              .modal-close {
                  background: none;
                  border: none;
                  color: #e0e0e0;
                  font-size: 24px;
                  cursor: pointer;
                  padding: 0;
              }
              .modal-close:hover {
                  color: #ffffff;
              }
              .modal-footer {
                  margin-top: 20px;
                  display: flex;
                  gap: 10px;
                  justify-content: flex-end;
              }
              .tag {
                  display: inline-block;
                  padding: 4px 8px;
                  background-color: #4a4a70;
                  border-radius: 4px;
                  font-size: 0.85em;
                  margin: 2px;
              }
              .tag.active {
                  background-color: #4a90e2;
                  color: #ffffff;
                  font-weight: bold;
              }
              .tag.success {
                  background-color: #28a745;
              }
              .tag.error {
                  background-color: #dc3545;
              }
              .history-item {
                  background-color: #3a3a52;
                  padding: 15px;
                  border-radius: 6px;
                  margin-bottom: 10px;
                  border-left: 4px solid #4a90e2;
              }
              .history-item:hover {
                  background-color: #4a4a62;
              }
              .history-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
              }
              .history-date {
                  color: #a0a0b8;
                  font-size: 0.85em;
              }
              .history-details {
                  font-size: 0.9em;
                  color: #b0b0c0;
              }
              .empty-state {
                  text-align: center;
                  padding: 40px;
                  color: #8a8aa0;
              }
              .empty-state-icon {
                  font-size: 48px;
                  margin-bottom: 15px;
              }
              .progress-bar {
                  width: 100%;
                  height: 8px;
                  background-color: #3a3a52;
                  border-radius: 4px;
                  overflow: hidden;
                  margin-top: 10px;
              }
              .progress-fill {
                  height: 100%;
                  background-color: #4a90e2;
                  transition: width 0.3s ease;
              }
              .api-card {
                  background-color: #3a3a52;
                  padding: 15px;
                  border-radius: 6px;
                  margin-bottom: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }
              .api-card.selected {
                  border: 2px solid #4a90e2;
              }
              .api-info {
                  flex-grow: 1;
              }
              .api-name {
                  font-weight: bold;
                  color: #ffffff;
                  margin-bottom: 4px;
              }
              .api-details {
                  font-size: 0.85em;
                  color: #a0a0b8;
              }
              .api-actions {
                  display: flex;
                  gap: 5px;
              }
              .compare-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 20px;
              }
              .compare-card {
                  background-color: #3a3a52;
                  padding: 15px;
                  border-radius: 8px;
              }
              .compare-card h4 {
                  margin: 0 0 10px 0;
                  color: #ffffff;
                  border-bottom: 1px solid #4f4f6e;
                  padding-bottom: 8px;
              }
              .stat-item {
                  display: flex;
                  justify-content: space-between;
                  padding: 5px 0;
                  border-bottom: 1px solid #4f4f6e;
              }
              .stat-label {
                  color: #a0a0b8;
              }
              .stat-value {
                  color: #ffffff;
                  font-weight: bold;
              }
              @media (max-width: 768px) {
                  .results-grid {
                      grid-template-columns: 1fr;
                  }
                  .input-group {
                      flex-direction: column;
                      align-items: stretch;
                  }
                  .input-group label {
                      min-width: auto;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🚀 LLM API 速度测试工具</h1>

              <div class="tabs">
                  <button class="tab active" onclick="switchTab('test')">📊 快速测试</button>
                  <button class="tab" onclick="switchTab('batch')">🔄 批量测试</button>
                  <button class="tab" onclick="switchTab('compare')">⚖️ 性能对比</button>
                  <button class="tab" onclick="switchTab('history')">📜 历史记录</button>
                  <button class="tab" onclick="switchTab('providers')">🏢 供应商管理</button>
              </div>

              <!-- 快速测试 -->
              <div id="test-tab" class="tab-content active">
                  <div class="panel">
                      <h2>单次测试</h2>
                      <div class="input-group">
                          <label>选择 API:</label>
                          <select id="testApiSelect" onchange="onTestApiSelectChange()">
                              <option value="">-- 选择API --</option>
                          </select>
                      </div>
                      <div class="input-group">
                          <label>选择供应商:</label>
                          <select id="testProviderSelect" onchange="onTestProviderSelectChange()">
                              <option value="">-- 选择供应商 --</option>
                          </select>
                      </div>
                      <div class="input-group">
                          <label>API 地址:</label>
                          <input type="text" id="apiUrl" placeholder="https://api.openai.com/v1/chat/completions">
                      </div>
                      <div class="input-group">
                          <label>模型名称:</label>
                          <input type="text" id="modelName" placeholder="请输入模型名称 (如: gpt-3.5-turbo)">
                      </div>
                      <div class="input-group">
                          <label>API Token:</label>
                          <input type="password" id="apiToken" placeholder="请输入 API Token">
                      </div>
                      <div class="input-group">
                          <button id="testButton" class="btn-primary" onclick="runSingleTest()">🚀 开始测速</button>
                          <button class="btn-warning" onclick="captureResults()">📷 截图结果</button>
                      </div>
                      
                      <div id="statusMessage-test" class="status-message"></div>
                  </div>

                  <div id="resultsContainer" class="results-grid">
                      <div class="result-section">
                          <h3>吞吐量 (每秒 token 数)</h3>
                          <p class="subtitle">数值越高越好</p>
                          <table id="throughputTable" class="data-table"></table>
                          <div class="legend">
                              <span style="background: linear-gradient(90deg, #ff6b6b, #ffd166, #90ee90);">低 ━━━ 中 ━━━ 高</span>
                          </div>
                      </div>
                      <div class="result-section">
                          <h3>首 Token 延迟 (平均秒数)</h3>
                          <p class="subtitle">数值越低越好 (秒)</p>
                          <table id="latencyTable" class="data-table"></table>
                          <div class="legend">
                              <span style="background: linear-gradient(90deg, #90ee90, #ffd166, #ff6b6b);">低 ━━━ 中 ━━━ 高</span>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- 供应商管理 -->
              <div id="providers-tab" class="tab-content">
                  <div class="panel">
                      <h2>供应商管理</h2>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                          <div style="display: flex; gap: 10px;">
                              <button class="btn-success" onclick="showAddProviderModal()">➕ 添加供应商</button>
                              <button class="btn-primary" onclick="showAddApiModal()">➕ 添加 API</button>
                              <button class="btn-danger" onclick="clearAllProviders()">🗑️ 清空所有</button>
                          </div>
                          <div id="tagFilterGroup" style="display: none; align-items: center; gap: 8px;">
                              <label style="margin: 0; white-space: nowrap;">按标签筛选:</label>
                              <div id="tagFilterContainer" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                              <button class="btn-secondary btn-sm" onclick="clearTagFilter()">清除</button>
                          </div>
                      </div>
                      <div id="providersList"></div>
                  </div>
              </div>

              <!-- 批量测试 -->
              <div id="batch-tab" class="tab-content">
                  <div class="panel">
                      <h2>批量测试</h2>
                      <div class="input-group" style="flex-wrap: nowrap;">
                          <div style="display: flex; gap: 20px; flex-grow: 1; align-items: center;">
                              <div class="checkbox-group">
                                  <input type="checkbox" id="selectAllBatchApis" onchange="toggleAllBatchApis()">
                                  <label>全选所有 API</label>
                              </div>
                              <div class="checkbox-group" title="并行测试会同时测试多个API，速度更快但可能不准确">
                                  <input type="checkbox" id="parallelTest">
                                  <label>并行测试</label>
                              </div>
                          </div>
                          <div id="batchTagFilterGroup" style="display: none; align-items: center; gap: 8px; flex-shrink: 0;">
                              <label style="margin: 0; white-space: nowrap;">按标签筛选:</label>
                              <div id="batchTagFilterContainer" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                              <button class="btn-secondary btn-sm" onclick="clearBatchTagFilter()">清除</button>
                          </div>
                      </div>
                      <div id="batchApiList" style="max-height: 300px; overflow-y: auto; background: #3a3a52; border-radius: 4px; padding: 10px; margin-bottom: 15px;">
                      </div>
                      <div class="input-group">
                          <label>测试轮数:</label>
                          <input type="number" id="testRounds" value="1" min="1" max="10" style="width: 100px;">
                      </div>
                      <p style="color: #8a8aa0; font-size: 0.85em; margin: -10px 0 15px 110px;">
                          💡 批量测试使用 128→128/256→256/512→512/1024→1024/2048→2048取平均 tokens 的简化测试，用于快速对比多个 API 性能
                      </p>
                      <div class="input-group">
                          <button class="btn-primary" onclick="runBatchTest()">🚀 开始批量测试</button>
                          <button class="btn-danger" onclick="stopBatchTest()">⏹️ 停止测试</button>
                          <button class="btn-warning" onclick="captureBatchResults()">📷 截图结果</button>
                      </div>
                      
                      <div id="statusMessage-batch" class="status-message"></div>
                      
                      <div id="batchProgress" style="display: none;">
                          <div class="progress-bar">
                              <div id="batchProgressFill" class="progress-fill" style="width: 0%"></div>
                          </div>
                          <p id="batchProgressText" style="margin-top: 10px; color: #a0a0b8;"></p>
                      </div>
                  </div>
                  <div id="batchResults"></div>
              </div>

              <!-- 性能对比 -->
              <div id="compare-tab" class="tab-content">
                  <div class="panel">
                      <h2>性能对比</h2>
                      <div class="input-group" style="flex-wrap: nowrap;">
                          <div style="display: flex; gap: 10px; flex-grow: 1;">
                              <div class="checkbox-group">
                                  <input type="checkbox" id="selectAllCompareApis" onchange="toggleAllCompareApis()">
                                  <label>全选所有 API</label>
                              </div>
                              <div class="checkbox-group">
                                  <input type="checkbox" id="excludeNoDataApis" checked onchange="updateCompareApiList()">
                                  <label>排除无数据API</label>
                              </div>
                          </div>
                          <div id="compareTagFilterGroup" style="display: none; align-items: center; gap: 8px; flex-shrink: 0;">
                              <label style="margin: 0; white-space: nowrap;">按标签筛选:</label>
                              <div id="compareTagFilterContainer" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                              <button class="btn-secondary btn-sm" onclick="clearCompareTagFilter()">清除</button>
                          </div>
                      </div>
                      <div id="compareApiList" style="max-height: 300px; overflow-y: auto; background: #3a3a52; border-radius: 4px; padding: 10px; margin-bottom: 15px;">
                      </div>
                      <div class="input-group">
                          <button class="btn-primary" onclick="runCompareFromHistory()">📊 对比性能</button>
                          <button class="btn-warning" onclick="captureCompareResults()">📷 截图结果</button>
                      </div>
                      
                      <div id="statusMessage-compare" class="status-message"></div>
                  </div>
                  <div id="compareResults"></div>
              </div>

              <!-- 历史记录 -->
              <div id="history-tab" class="tab-content">
                  <div class="panel">
                      <h2>历史记录</h2>
                      <div class="input-group">
                          <button class="btn-danger" onclick="clearAllHistory()">🗑️ 清空历史</button>
                          <button class="btn-success" onclick="exportHistory()">📤 导出历史</button>
                          <button class="btn-warning" onclick="document.getElementById('importHistoryInput').click()">📥 导入历史</button>
                          <input type="file" id="importHistoryInput" accept=".json" style="display: none" onchange="importHistory(event)">
                      </div>
                      <div id="historyList"></div>
                  </div>
              </div>
          </div>

          <!-- 添加供应商模态框 -->
          <div id="addProviderModal" class="modal">
              <div class="modal-content">
                  <div class="modal-header">
                      <h3>添加供应商</h3>
                      <button class="modal-close" onclick="closeModal('addProviderModal')">&times;</button>
                  </div>
                  <div class="input-group">
                      <label>供应商名称:</label>
                      <input type="text" id="providerName" placeholder="如: OpenAI, Claude, 本地模型">
                  </div>
                  <div class="input-group">
                      <label>基础 URL:</label>
                      <input type="text" id="providerBaseUrl" placeholder="https://api.openai.com/v1">
                  </div>
                  <div class="input-group">
                      <label>默认 Token:</label>
                      <input type="password" id="providerDefaultToken" placeholder="默认 API Token (可选)">
                  </div>
                  <div class="input-group">
                      <label>备注:</label>
                      <input type="text" id="providerNotes" placeholder="备注信息 (可选)">
                  </div>
                  <div class="modal-footer">
                      <button class="btn-secondary" onclick="closeModal('addProviderModal')">取消</button>
                      <button class="btn-success" onclick="addProvider()">保存</button>
                  </div>
              </div>
          </div>

          <!-- 添加 API 模态框 -->
          <div id="addApiModal" class="modal">
              <div class="modal-content">
                  <div class="modal-header">
                      <h3 id="apiModalTitle">添加 API</h3>
                      <button class="modal-close" onclick="closeModal('addApiModal')">&times;</button>
                  </div>
                  <div class="input-group">
                      <label>选择供应商:</label>
                      <select id="apiProviderSelect" onchange="loadProviderDefaults()">
                          <option value="">-- 选择供应商 --</option>
                      </select>
                  </div>
                  <div class="input-group">
                      <label>API 名称:</label>
                      <input type="text" id="apiName" placeholder="如: GPT-4 测试">
                  </div>
                  <div class="input-group">
                      <label>模型名称:</label>
                      <input type="text" id="apiModelName" placeholder="如: gpt-4">
                  </div>
                  <div class="input-group">
                      <label>完整 URL:</label>
                      <input type="text" id="apiFullUrl" placeholder="https://api.openai.com/v1/chat/completions">
                  </div>
                  <div class="input-group">
                      <label>API Token:</label>
                      <input type="password" id="apiTokenInput" placeholder="API Token (可选)">
                  </div>
                  <div class="input-group">
                      <label>标签:</label>
                      <input type="text" id="apiTags" placeholder="标签 (逗号分隔, 如: 生产, 高优先级)">
                  </div>
                  <div class="modal-footer">
                      <button class="btn-secondary" onclick="closeModal('addApiModal')">取消</button>
                      <button class="btn-success" onclick="addApi()">保存</button>
                  </div>
              </div>
          </div>

          <!-- 历史详情模态框 -->
          <div id="historyDetailModal" class="modal">
              <div class="modal-content" style="max-width: 800px;">
                  <div class="modal-header">
                      <h3>测试详情</h3>
                      <button class="modal-close" onclick="closeModal('historyDetailModal')">&times;</button>
                  </div>
                  <div id="historyDetailContent"></div>
                  <div class="modal-footer">
                      <button class="btn-secondary" onclick="closeModal('historyDetailModal')">关闭</button>
                      <button class="btn-warning" onclick="screenshotHistoryDetail()">📷 截图</button>
                  </div>
              </div>
          </div>

          <script>
              // ============ 数据结构和存储 ============
              const INPUT_TOKEN_SIZES = [128, 256, 512, 1024, 2048];
              const OUTPUT_TOKEN_SIZES = [128, 256, 512, 1024, 2048];
              const NUM_RUNS_PER_CELL = 2; // 减少测试次数以加快测试速度

              // 状态管理
              let currentTestResults = null;
              let batchTestRunning = false;
              let batchTestAbortController = null;
              let cachedData = null; // 缓存数据

              // ============ API 调用函数 ============
              async function apiGet(endpoint) {
                  try {
                      const response = await fetch(endpoint);
                      const result = await response.json();
                      if (result.success) {
                          return result.data;
                      }
                      throw new Error(result.error || 'API request failed');
                  } catch (e) {
                      console.error('API GET error:', e);
                      return null;
                  }
              }

              async function apiPost(endpoint, data) {
                  try {
                      const response = await fetch(endpoint, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data)
                      });
                      const result = await response.json();
                      if (result.success) {
                          return result;
                      }
                      throw new Error(result.error || 'API request failed');
                  } catch (e) {
                      console.error('API POST error:', e);
                      throw e;
                  }
              }

              async function apiPut(endpoint, data) {
                  try {
                      const response = await fetch(endpoint, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data)
                      });
                      const result = await response.json();
                      if (result.success) {
                          return result;
                      }
                      throw new Error(result.error || 'API request failed');
                  } catch (e) {
                      console.error('API PUT error:', e);
                      throw e;
                  }
              }

              async function apiDelete(endpoint) {
                  try {
                      const response = await fetch(endpoint, { method: 'DELETE' });
                      const result = await response.json();
                      return result.success;
                  } catch (e) {
                      console.error('API DELETE error:', e);
                      return false;
                  }
              }

              // 加载所有数据
              async function loadAllData() {
                  if (!cachedData) {
                      cachedData = await apiGet('/api/data');
                  }
                  return cachedData || { providers: [], apis: [], history: [] };
              }

              // 刷新缓存
              function invalidateCache() {
                  cachedData = null;
              }

              // ============ 供应商管理 ============
              async function getProviders() {
                  const data = await loadAllData();
                  return data.providers || [];
              }

              async function saveProviders(providers) {
                  // 此函数不再需要，保留向后兼容
                  return true;
              }

              function showAddProviderModal() {
                  document.getElementById('providerName').value = '';
                  document.getElementById('providerBaseUrl').value = '';
                  document.getElementById('providerDefaultToken').value = '';
                  document.getElementById('providerNotes').value = '';
                  
                  // 重置保存按钮的行为为添加模式
                  const modal = document.getElementById('addProviderModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = addProvider;
                  
                  showModal('addProviderModal');
              }

              async function addProvider() {
                  const name = document.getElementById('providerName').value.trim();
                  const baseUrl = document.getElementById('providerBaseUrl').value.trim();
                  const defaultToken = document.getElementById('providerDefaultToken').value.trim();
                  const notes = document.getElementById('providerNotes').value.trim();

                  if (!name) {
                      alert('请输入供应商名称');
                      return;
                  }

                  try {
                      await apiPost('/api/providers', { name, baseUrl, defaultToken, notes });
                      invalidateCache();
                      closeModal('addProviderModal');
                      await renderProvidersList();
                      updateProviderSelects();
                      showStatus('供应商添加成功！', 'success');
                  } catch (e) {
                      showStatus('添加失败: ' + e.message, 'error');
                  }
              }

              async function deleteProvider(providerId) {
                  if (!confirm('确定要删除这个供应商吗？相关的 API 配置也会被删除。')) return;

                  try {
                      await apiDelete('/api/providers/' + providerId);
                      invalidateCache();
                      await renderProvidersList();
                      updateProviderSelects();
                      showStatus('供应商已删除', 'success');
                  } catch (e) {
                      showStatus('删除失败: ' + e.message, 'error');
                  }
              }

              // 当前选中的筛选标签
              let selectedFilterTags = [];

              async function renderProvidersList() {
                  const providers = await getProviders();
                  const apis = await getApis();
                  const container = document.getElementById('providersList');

                  // 更新标签筛选器
                  updateTagFilter(apis);

                  if (!providers || providers.length === 0) {
                      container.innerHTML = \`
                          <div class="empty-state">
                              <div class="empty-state-icon">📦</div>
                              <p>还没有添加供应商</p>
                              <p>点击上方"添加供应商"按钮开始</p>
                          </div>
                      \`;
                      return;
                  }

                  // 根据标签筛选 API
                  let filteredApis = apis;
                  if (selectedFilterTags.length > 0) {
                      filteredApis = apis.filter(api => 
                          api.tags && api.tags.some(tag => selectedFilterTags.includes(tag))
                      );
                  }

                  // 只显示有筛选后 API 的供应商
                  let filteredProviders = providers;
                  if (selectedFilterTags.length > 0) {
                      const providerIdsWithFilteredApis = new Set(filteredApis.map(a => a.providerId));
                      filteredProviders = providers.filter(p => providerIdsWithFilteredApis.has(p.id));
                  }

                  if (filteredProviders.length === 0) {
                      container.innerHTML = \`
                          <div class="empty-state">
                              <div class="empty-state-icon">🔍</div>
                              <p>没有找到匹配的供应商</p>
                              <p>请尝试其他标签筛选条件</p>
                          </div>
                      \`;
                      return;
                  }

                  container.innerHTML = filteredProviders.map(provider => {
                      const providerApis = filteredApis.filter(a => a.providerId === provider.id);
                      return \`
                          <div class="panel" style="margin-top: 10px;">
                              <div style="display: flex; justify-content: space-between; align-items: center;">
                                  <h3 style="margin: 0; color: #ffffff;">🏢 \${provider.name}</h3>
                                  <div style="display: flex; gap: 8px;">
                                      <button class="btn-success btn-sm" onclick="showAddApiForProvider('\${provider.id}')">➕ 添加API</button>
                                      <button class="btn-warning btn-sm" onclick="editProvider('\${provider.id}')">✏️ 编辑</button>
                                      <button class="btn-danger btn-sm" onclick="deleteProvider('\${provider.id}')">🗑️ 删除</button>
                                  </div>
                              </div>
                              <p style="color: #a0a0b8; margin: 8px 0;">
                                  <strong>基础 URL:</strong> \${provider.baseUrl || '未设置'}<br>
                                  <strong>备注:</strong> \${provider.notes || '无'}<br>
                                  <strong>API 数量:</strong> \${providerApis.length}
                              </p>
                              <div style="margin-top: 15px;">
                                  <h4 style="color: #ffffff; margin-bottom: 10px;">API 列表:</h4>
                                  \${providerApis.length === 0 ? '<p style="color: #8a8aa0;">暂无 API 配置</p>' : 
                                  providerApis.map(api => \`
                                      <div class="api-card">
                                          <div class="api-info">
                                              <div class="api-name">\${api.name}</div>
                                              <div class="api-details">
                                                  模型: \${api.modelName} | 
                                                  标签: \${api.tags && api.tags.length > 0 ? api.tags.map(t => \`<span class="tag \${selectedFilterTags.includes(t) ? 'active' : ''}">\${t}</span>\`).join('') : '无'}
                                              </div>
                                          </div>
                                          <div class="api-actions">
                                              <button class="btn-primary btn-sm" onclick="quickTestApi('\${api.id}')">测试</button>
                                              <button class="btn-secondary btn-sm" onclick="editApi('\${api.id}')">编辑</button>
                                              <button class="btn-danger btn-sm" onclick="deleteApi('\${api.id}')">删除</button>
                                          </div>
                                      </div>
                                  \`).join('')}
                              </div>
                          </div>
                      \`;
                  }).join('');
              }

              // 更新标签筛选器
              function updateTagFilter(apis) {
                  const allTags = new Set();
                  apis.forEach(api => {
                      if (api.tags) {
                          api.tags.forEach(tag => allTags.add(tag));
                      }
                  });

                  const filterGroup = document.getElementById('tagFilterGroup');
                  const container = document.getElementById('tagFilterContainer');

                  if (allTags.size === 0) {
                      filterGroup.style.display = 'none';
                      return;
                  }

                  filterGroup.style.display = 'flex';
                  container.innerHTML = Array.from(allTags).map(tag => \`
                      <label class="checkbox-group" style="background: #3a3a52; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                          <input type="checkbox" value="\${tag}" \${selectedFilterTags.includes(tag) ? 'checked' : ''} onchange="toggleTagFilter('\${tag}')">
                          <span>\${tag}</span>
                      </label>
                  \`).join('');
              }

              // 切换标签筛选
              async function toggleTagFilter(tag) {
                  const index = selectedFilterTags.indexOf(tag);
                  if (index === -1) {
                      selectedFilterTags.push(tag);
                  } else {
                      selectedFilterTags.splice(index, 1);
                  }
                  await renderProvidersList();
              }

              // 清除标签筛选
              async function clearTagFilter() {
                  selectedFilterTags = [];
                  await renderProvidersList();
              }

              async function clearAllProviders() {
                  if (!confirm('确定要清空所有供应商和 API 配置吗？此操作不可恢复！')) return;
                  // 清空所有供应商（这会同时清空相关的 API）
                  const providers = await getProviders();
                  for (const p of providers) {
                      await apiDelete('/api/providers/' + p.id);
                  }
                  invalidateCache();
                  await renderProvidersList();
                  updateProviderSelects();
                  showStatus('已清空所有数据', 'success');
              }

              // ============ API 管理 ============
              async function getApis() {
                  const data = await loadAllData();
                  return data.apis || [];
              }

              async function saveApis(apis) {
                  // 此函数不再需要，保留向后兼容
                  return true;
              }

              async function showAddApiModal() {
                  await updateProviderSelect('apiProviderSelect');
                  document.getElementById('apiName').value = '';
                  document.getElementById('apiModelName').value = '';
                  document.getElementById('apiFullUrl').value = '';
                  document.getElementById('apiTokenInput').value = '';
                  document.getElementById('apiTags').value = '';
                  
                  // 确保供应商选择框不被锁定
                  document.getElementById('apiProviderSelect').disabled = false;
                  
                  // 默认加载第一个供应商的信息
                  const providerSelect = document.getElementById('apiProviderSelect');
                  if (providerSelect.options.length > 1) {
                      providerSelect.selectedIndex = 1;
                      await loadProviderDefaults();
                  }
                  
                  // 重置保存按钮行为
                  const modal = document.getElementById('addApiModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = addApi;
                  
                  showModal('addApiModal');
              }

              // 为特定供应商添加 API
              async function showAddApiForProvider(providerId) {
                  await updateProviderSelect('apiProviderSelect');
                  document.getElementById('apiProviderSelect').value = providerId;
                  document.getElementById('apiName').value = '';
                  document.getElementById('apiModelName').value = '';
                  document.getElementById('apiTags').value = '';
                  
                  // 锁定供应商选择框
                  document.getElementById('apiProviderSelect').disabled = true;
                  
                  // 加载供应商默认信息到 placeholder
                  const providers = await getProviders();
                  const provider = providers.find(p => p.id === providerId);
                  if (provider) {
                      if (provider.baseUrl) {
                          const defaultUrl = provider.baseUrl.replace(/\\/$/, '') + '/chat/completions';
                          document.getElementById('apiFullUrl').placeholder = defaultUrl;
                      }
                      if (provider.defaultToken) {
                          document.getElementById('apiTokenInput').placeholder = '使用供应商默认 Token';
                      }
                  }
                  
                  // 重置保存按钮行为
                  const modal = document.getElementById('addApiModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = async () => {
                      await addApi();
                      // 恢复供应商选择框状态
                      document.getElementById('apiProviderSelect').disabled = false;
                  };
                  
                  showModal('addApiModal');
              }

              // 编辑供应商
              async function editProvider(providerId) {
                  const providers = await getProviders();
                  const provider = providers.find(p => p.id === providerId);
                  if (!provider) return;

                  document.getElementById('providerName').value = provider.name;
                  document.getElementById('providerBaseUrl').value = provider.baseUrl || '';
                  document.getElementById('providerDefaultToken').value = provider.defaultToken || '';
                  document.getElementById('providerNotes').value = provider.notes || '';

                  showModal('addProviderModal');
                  
                  // 修改保存按钮的行为
                  const modal = document.getElementById('addProviderModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = () => updateProvider(providerId);
              }

              async function updateProvider(providerId) {
                  const name = document.getElementById('providerName').value.trim();
                  const baseUrl = document.getElementById('providerBaseUrl').value.trim();
                  const defaultToken = document.getElementById('providerDefaultToken').value.trim();
                  const notes = document.getElementById('providerNotes').value.trim();

                  if (!name) {
                      alert('请输入供应商名称');
                      return;
                  }

                  try {
                      await apiPut('/api/providers/' + providerId, { name, baseUrl, defaultToken, notes });
                      invalidateCache();
                      closeModal('addProviderModal');
                      // 恢复保存按钮的默认行为
                      const modal = document.getElementById('addProviderModal');
                      const saveBtn = modal.querySelector('.btn-success');
                      saveBtn.onclick = addProvider;
                      await renderProvidersList();
                      updateProviderSelects();
                      showStatus('供应商更新成功！', 'success');
                  } catch (e) {
                      showStatus('更新失败: ' + e.message, 'error');
                  }
              }

              async function loadProviderDefaults() {
                  const providerId = document.getElementById('apiProviderSelect').value;
                  if (!providerId) return;

                  const providers = await getProviders();
                  const provider = providers.find(p => p.id === providerId);
                  if (provider) {
                      if (provider.baseUrl) {
                          const defaultUrl = provider.baseUrl.replace(/\\/$/, '') + '/chat/completions';
                          document.getElementById('apiFullUrl').placeholder = defaultUrl;
                      } else {
                          document.getElementById('apiFullUrl').placeholder = 'https://api.example.com/v1/chat/completions';
                      }
                      if (provider.defaultToken) {
                          document.getElementById('apiTokenInput').placeholder = '使用供应商默认 Token';
                      } else {
                          document.getElementById('apiTokenInput').placeholder = '请输入 API Token（可选）';
                      }
                  }
              }

              async function addApi() {
                  const providerId = document.getElementById('apiProviderSelect').value;
                  const name = document.getElementById('apiName').value.trim();
                  const modelName = document.getElementById('apiModelName').value.trim();
                  const fullUrl = document.getElementById('apiFullUrl').value.trim();
                  const token = document.getElementById('apiTokenInput').value.trim();
                  const tagsStr = document.getElementById('apiTags').value.trim();

                  if (!name || !modelName) {
                      alert('请填写 API 名称和模型名称');
                      return;
                  }

                  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];

                  // 如果 token 为空，不保存供应商的默认 token，留空
                  const finalToken = token || '';

                  try {
                      await apiPost('/api/apis', { providerId, name, modelName, fullUrl, token: finalToken, tags });
                      invalidateCache();
                      closeModal('addApiModal');
                      // 恢复输入状态和按钮行为
                      resetApiModal();
                      await renderProvidersList();
                      updateApiSelects();
                      showStatus('API 添加成功！', 'success');
                  } catch (e) {
                      showStatus('添加失败: ' + e.message, 'error');
                  }
              }

              // 重置 API 对话框状态
              function resetApiModal() {
                  document.getElementById('apiProviderSelect').disabled = false;
                  document.getElementById('apiFullUrl').disabled = false;
                  document.getElementById('apiTokenInput').disabled = false;
                  document.getElementById('apiFullUrl').style.backgroundColor = '';
                  document.getElementById('apiTokenInput').style.backgroundColor = '';
                  document.getElementById('apiModalTitle').textContent = '添加 API';
                  
                  const modal = document.getElementById('addApiModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = addApi;
              }

              async function deleteApi(apiId) {
                  if (!confirm('确定要删除这个 API 配置吗？')) return;
                  try {
                      await apiDelete('/api/apis/' + apiId);
                      invalidateCache();
                      await renderProvidersList();
                      updateApiSelects();
                      showStatus('API 已删除', 'success');
                  } catch (e) {
                      showStatus('删除失败: ' + e.message, 'error');
                  }
              }

              async function editApi(apiId) {
                  const apis = await getApis();
                  const api = apis.find(a => a.id === apiId);
                  if (!api) return;

                  await updateProviderSelect('apiProviderSelect');
                  document.getElementById('apiProviderSelect').value = api.providerId || '';
                  document.getElementById('apiName').value = api.name;
                  document.getElementById('apiModelName').value = api.modelName;
                  document.getElementById('apiFullUrl').value = api.fullUrl || '';
                  document.getElementById('apiTokenInput').value = api.token || '';
                  document.getElementById('apiTags').value = api.tags ? api.tags.join(', ') : '';
                  
                  // 锁定供应商选择框
                  document.getElementById('apiProviderSelect').disabled = true;
                  
                  // 修改标题
                  document.getElementById('apiModalTitle').textContent = '编辑 API';

                  // 修改保存逻辑
                  showModal('addApiModal');
                  // 临时修改保存按钮的行为
                  const modal = document.getElementById('addApiModal');
                  const saveBtn = modal.querySelector('.btn-success');
                  saveBtn.onclick = async () => {
                      await updateApi(apiId);
                      // 恢复对话框状态
                      document.getElementById('apiProviderSelect').disabled = false;
                      document.getElementById('apiModalTitle').textContent = '添加 API';
                  };
              }

              async function updateApi(apiId) {
                  const providerId = document.getElementById('apiProviderSelect').value;
                  const name = document.getElementById('apiName').value.trim();
                  const modelName = document.getElementById('apiModelName').value.trim();
                  const fullUrl = document.getElementById('apiFullUrl').value.trim();
                  const token = document.getElementById('apiTokenInput').value.trim();
                  const tagsStr = document.getElementById('apiTags').value.trim();

                  if (!name || !modelName) {
                      alert('请填写 API 名称和模型名称');
                      return;
                  }

                  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];

                  // 如果 token 为空，不保存供应商的默认 token，留空
                  const finalToken = token || '';

                  try {
                      await apiPut('/api/apis/' + apiId, { providerId, name, modelName, fullUrl, token: finalToken, tags });
                      invalidateCache();
                      closeModal('addApiModal');
                      // 恢复输入状态和按钮行为
                      resetApiModal();
                      await renderProvidersList();
                      updateApiSelects();
                      showStatus('API 更新成功！', 'success');
                  } catch (e) {
                      showStatus('更新失败: ' + e.message, 'error');
                  }
              }

              async function quickTestApi(apiId) {
                  const apis = await getApis();
                  const api = apis.find(a => a.id === apiId);
                  if (!api) return;

                  // 切换到测试标签页
                  switchTab('test');

                  // 设置 API 选择框并触发联动
                  document.getElementById('testApiSelect').value = apiId;
                  await onTestApiSelectChange();

                  // 开始测试
                  runSingleTest();
              }

              // ============ 历史记录 ============
              async function getHistory() {
                  const data = await loadAllData();
                  return data.history || [];
              }

              async function saveHistory(history) {
                  // 此函数不再需要，保留向后兼容
                  return true;
              }

              async function addToHistory(result) {
                  try {
                      await apiPost('/api/history', result);
                      invalidateCache();
                      await renderHistoryList();
                  } catch (e) {
                      console.error('Failed to add history:', e);
                  }
              }

              async function saveCurrentAsHistory() {
                  if (!currentTestResults) {
                      alert('没有测试结果可以保存');
                      return;
                  }

                  const historyItem = {
                      type: 'single',
                      ...currentTestResults
                  };

                  await addToHistory(historyItem);
                  showStatus('测试结果已保存到历史记录！', 'success');
              }

              async function deleteHistoryItem(historyId) {
                  try {
                      await apiDelete('/api/history/' + historyId);
                      invalidateCache();
                      await renderHistoryList();
                      showStatus('历史记录已删除', 'success');
                  } catch (e) {
                      showStatus('删除失败: ' + e.message, 'error');
                  }
              }

              async function clearAllHistory() {
                  if (!confirm('确定要清空所有历史记录吗？')) return;
                  try {
                      await apiDelete('/api/history');
                      invalidateCache();
                      await renderHistoryList();
                      showStatus('历史记录已清空', 'success');
                  } catch (e) {
                      showStatus('清空失败: ' + e.message, 'error');
                  }
              }

              async function renderHistoryList() {
                  const history = await getHistory();
                  const container = document.getElementById('historyList');

                  if (!history || history.length === 0) {
                      container.innerHTML = \`
                          <div class="empty-state">
                              <div class="empty-state-icon">📜</div>
                              <p>还没有历史记录</p>
                              <p>完成测试后可以保存结果到这里</p>
                          </div>
                      \`;
                      return;
                  }

                  container.innerHTML = history.map(item => {
                      const date = new Date(item.timestamp);
                      const dateStr = date.toLocaleString('zh-CN');
                      const typeStr = item.type === 'batch' ? '批量测试' : '单次测试';
                      const statusStr = item.error ? '<span class="tag error">有错误</span>' : '<span class="tag success">成功</span>';

                      let detailsStr = '';
                      if (item.type === 'batch') {
                          detailsStr = \`测试了 \${item.results ? item.results.length : 0} 个 API\`;
                      } else {
                          detailsStr = \`\${item.apiUrl} - \${item.modelName}\`;
                      }

                      return \`
                          <div class="history-item">
                              <div class="history-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                                  <strong>\${item.name || typeStr}</strong>
                                  <span class="history-date">\${dateStr}</span>
                              </div>
                              <div class="history-details" style="margin-top: 4px;">\${detailsStr}</div>
                              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                  <div>
                                      <button class="btn-primary btn-sm" onclick="viewHistoryDetail('\${item.id}')">查看详情</button>
                                      <button class="btn-danger btn-sm" onclick="deleteHistoryItem('\${item.id}')">删除</button>
                                  </div>
                                  <div>\${statusStr}</div>
                              </div>
                          </div>
                      \`;
                  }).join('');
              }

              async function viewHistoryDetail(historyId) {
                  const history = await getHistory();
                  const item = history.find(h => h.id === historyId);
                  if (!item) return;

                  const container = document.getElementById('historyDetailContent');

                  if (item.type === 'batch') {
                      // 批量测试结果
                      container.innerHTML = \`
                          <h4>批量测试结果</h4>
                          <p><strong>测试时间:</strong> \${new Date(item.timestamp).toLocaleString('zh-CN')}</p>
                          <p><strong>API 数量:</strong> \${item.results ? item.results.length : 0}</p>
                          <div class="compare-grid">
                              \${item.results && item.results.map(result => \`
                                  <div class="compare-card">
                                      <h4>\${result.name}</h4>
                                      <p><strong>模型:</strong> \${result.modelName}</p>
                                      <p><strong>平均吞吐量:</strong> \${result.avgThroughput ? result.avgThroughput.toFixed(2) : 'N/A'} t/s</p>
                                      <p><strong>平均首token延迟:</strong> \${result.avgLatency ? result.avgLatency.toFixed(2) : 'N/A'} s</p>
                                  </div>
                              \`).join('')}
                          </div>
                      \`;
                  } else {
                      // 单次测试结果
                      container.innerHTML = \`
                          <h4>测试详情</h4>
                          <p><strong>API URL:</strong> \${item.apiUrl}</p>
                          <p><strong>模型:</strong> \${item.modelName}</p>
                          <p><strong>测试时间:</strong> \${new Date(item.timestamp).toLocaleString('zh-CN')}</p>
                          <div class="results-grid">
                              <div class="result-section">
                                  <h3>吞吐量</h3>
                                  <table class="data-table">\${renderHistoryTable(item.throughputData, ' t/s', true)}</table>
                              </div>
                              <div class="result-section">
                                  <h3>延迟</h3>
                                  <table class="data-table">\${renderHistoryTable(item.latencyData, ' s', false)}</table>
                              </div>
                          </div>
                      \`;
                  }

                  showModal('historyDetailModal');
              }

              function renderHistoryTable(data, unit, higherIsBetter) {
                  if (!data) return '<tr><td colspan="6">无数据</td></tr>';

                  let html = '<tr><th>Input \\ Output</th>';
                  OUTPUT_TOKEN_SIZES.forEach(outSize => html += \`<th>\${outSize}</th>\`);
                  html += '</tr>';

                  INPUT_TOKEN_SIZES.forEach(inSize => {
                      html += \`<tr><td class="label-col">\${inSize}</td>\`;
                      OUTPUT_TOKEN_SIZES.forEach(outSize => {
                          const value = data[\`\${inSize}_\${outSize}\`];
                          if (value !== undefined && value !== null) {
                              const color = getColorForValueStatic(value, higherIsBetter);
                              html += \`<td style="background-color: \${color}">\${value.toFixed(2)}\${unit}</td>\`;
                          } else {
                              html += '<td>-</td>';
                          }
                      });
                      html += '</tr>';
                  });

                  return html;
              }

              async function exportHistory() {
                  const history = await getHistory();
                  if (history.length === 0) {
                      alert('没有历史记录可以导出');
                      return;
                  }

                  const dataStr = JSON.stringify(history, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = \`llm-test-history-\${Date.now()}.json\`;
                  a.click();
                  URL.revokeObjectURL(url);
                  showStatus('历史记录已导出！', 'success');
              }

              async function importHistory(event) {
                  const file = event.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = async (e) => {
                      try {
                          const data = JSON.parse(e.target.result);
                          if (!Array.isArray(data)) {
                              throw new Error('Invalid format');
                          }

                          await apiPost('/api/history/import', data);
                          invalidateCache();
                          await renderHistoryList();
                          showStatus(\`成功导入 \${data.length} 条记录！\`, 'success');
                      } catch (err) {
                          alert('导入失败：文件格式不正确');
                      }
                  };
                  reader.readAsText(file);
                  event.target.value = '';
              }

              // ============ UI 更新函数 ============
              async function updateProviderSelects() {
                  await updateProviderSelect('providerSelect');
                  await updateProviderSelect('apiProviderSelect');
                  await updateProviderSelect('testProviderSelect');
              }

              async function updateProviderSelect(selectId) {
                  const providers = await getProviders();
                  const select = document.getElementById(selectId);
                  if (!select) return;

                  const currentValue = select.value;
                  select.innerHTML = '<option value="">-- 选择供应商 --</option>';
                  providers.forEach(provider => {
                      const option = document.createElement('option');
                      option.value = provider.id;
                      option.textContent = provider.name;
                      select.appendChild(option);
                  });

                  if (currentValue) {
                      select.value = currentValue;
                  }
              }

              async function updateApiSelects() {
                  await updateTestApiSelect();
                  await updateBatchApiList();
                  await updateCompareApiList();
              }

              async function updateTestApiSelect() {
                  const apis = await getApis();
                  const providers = await getProviders();
                  const select = document.getElementById('testApiSelect');
                  if (!select) return;

                  const currentValue = select.value;
                  select.innerHTML = '<option value="">-- 选择API --</option>';
                  apis.forEach(api => {
                      const provider = providers.find(p => p.id === api.providerId);
                      const option = document.createElement('option');
                      option.value = api.id;
                      option.textContent = \` \${provider.name} \${api ? ' - ' + api.name  : ''}\`;
                      select.appendChild(option);
                  });

                  if (currentValue) {
                      select.value = currentValue;
                  }
              }

              // 批量测试页标签筛选状态
              let selectedBatchFilterTags = [];

              // 渲染批量测试 API 复选框列表
              async function updateBatchApiList() {
                  const apis = await getApis();
                  const providers = await getProviders();
                  const container = document.getElementById('batchApiList');
                  if (!container) return;

                  if (apis.length === 0) {
                      container.innerHTML = '<p style="color: #8a8aa0; text-align: center;">暂无 API 配置</p>';
                      return;
                  }

                  // 更新标签筛选器
                  updateBatchTagFilter(apis);

                  // 根据标签筛选API
                  let filteredApis = apis;
                  if (selectedBatchFilterTags.length > 0) {
                      filteredApis = apis.filter(api =>
                          api.tags && api.tags.some(tag => selectedBatchFilterTags.includes(tag))
                      );
                  }

                  if (filteredApis.length === 0) {
                      container.innerHTML = '<p style="color: #8a8aa0; text-align: center;">没有符合条件的 API</p>';
                      return;
                  }

                  // 按供应商分组
                  const apisByProvider = {};
                  filteredApis.forEach(api => {
                      const provider = providers.find(p => p.id === api.providerId);
                      const providerName = provider ? provider.name : '未分类';
                      if (!apisByProvider[providerName]) {
                          apisByProvider[providerName] = [];
                      }
                      apisByProvider[providerName].push(api);
                  });

                  // 渲染分组卡片
                  container.innerHTML = Object.entries(apisByProvider).map(([providerName, providerApis]) => \`
                      <div style="background: #2a2a40; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                          <div style="font-weight: bold; color: #ffffff; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #3a3a52;">
                            🏢 \${providerName}
                          </div>
                          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            \${providerApis.map(api => \`
                              <label class="checkbox-group" style="padding: 6px 10px; background: #3a3a52; border-radius: 4px; cursor: pointer; flex: 0 0 auto; white-space: nowrap;">
                                <input type="checkbox" value="\${api.id}" class="batch-api-checkbox">
                                <span>\${api.name} (\${api.modelName})</span>
                              </label>
                            \`).join('')}
                          </div>
                      </div>
                  \`).join('');
              }

              // 更新批量测试页标签筛选器
              function updateBatchTagFilter(apis) {
                  const allTags = new Set();
                  apis.forEach(api => {
                      if (api.tags) {
                          api.tags.forEach(tag => allTags.add(tag));
                      }
                  });

                  const filterGroup = document.getElementById('batchTagFilterGroup');
                  const container = document.getElementById('batchTagFilterContainer');

                  if (allTags.size === 0) {
                      filterGroup.style.display = 'none';
                      return;
                  }

                  filterGroup.style.display = 'flex';
                  container.innerHTML = Array.from(allTags).map(tag => \`
                      <label class="checkbox-group" style="background: \${selectedBatchFilterTags.includes(tag) ? '#4a90e2' : '#3a3a52'}; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: background 0.3s;">
                          <input type="checkbox" value="\${tag}" \${selectedBatchFilterTags.includes(tag) ? 'checked' : ''} onchange="toggleBatchTagFilter('\${tag}')" style="display: none;">
                          <span>\${tag}</span>
                      </label>
                  \`).join('');
              }

              // 切换批量测试页标签筛选
              async function toggleBatchTagFilter(tag) {
                  const index = selectedBatchFilterTags.indexOf(tag);
                  if (index === -1) {
                      selectedBatchFilterTags.push(tag);
                  } else {
                      selectedBatchFilterTags.splice(index, 1);
                  }
                  await updateBatchApiList();
              }

              // 清除批量测试页标签筛选
              async function clearBatchTagFilter() {
                  selectedBatchFilterTags = [];
                  await updateBatchApiList();
              }

              // 性能对比页标签筛选状态
              let selectedCompareFilterTags = [];

              // 渲染性能对比 API 复选框列表
              async function updateCompareApiList() {
                  const apis = await getApis();
                  const providers = await getProviders();
                  const history = await getHistory();
                  const container = document.getElementById('compareApiList');
                  if (!container) return;

                  if (apis.length === 0) {
                      container.innerHTML = '<p style="color: #8a8aa0; text-align: center;">暂无 API 配置</p>';
                      return;
                  }

                  // 检查是否需要排除无数据的API
                  const excludeNoData = document.getElementById('excludeNoDataApis')?.checked ?? true;

                  // 更新标签筛选器（使用所有API，不只是有数据的）
                  updateCompareTagFilter(apis);

                  // 根据标签筛选API
                  let filteredApis = apis;
                  if (selectedCompareFilterTags.length > 0) {
                      filteredApis = apis.filter(api =>
                          api.tags && api.tags.some(tag => selectedCompareFilterTags.includes(tag))
                      );
                  }

                  // 排除无数据的API
                  if (excludeNoData) {
                      filteredApis = filteredApis.filter(api => {
                          // 检查该API是否有历史数据
                          for (const item of history) {
                              if (item.type === 'batch' && item.results) {
                                  if (item.results.find(r => r.name === api.name || r.modelName === api.modelName)) {
                                      return true;
                                  }
                              } else if (item.type === 'single' && item.modelName === api.modelName) {
                                  return true;
                              }
                          }
                          return false;
                      });
                  }

                  if (filteredApis.length === 0) {
                      container.innerHTML = '<p style="color: #8a8aa0; text-align: center;">没有符合条件的 API</p>';
                      return;
                  }

                  // 按供应商分组
                  const apisByProvider = {};
                  filteredApis.forEach(api => {
                      const provider = providers.find(p => p.id === api.providerId);
                      const providerName = provider ? provider.name : '未分类';
                      if (!apisByProvider[providerName]) {
                          apisByProvider[providerName] = [];
                      }
                      apisByProvider[providerName].push(api);
                  });

                  // 渲染分组卡片
                  container.innerHTML = Object.entries(apisByProvider).map(([providerName, providerApis]) => \`
                      <div style="background: #2a2a40; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                          <div style="font-weight: bold; color: #ffffff; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #3a3a52;">
                            🏢 \${providerName}
                          </div>
                          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            \${providerApis.map(api => \`
                              <label class="checkbox-group" style="padding: 6px 10px; background: #3a3a52; border-radius: 4px; cursor: pointer; flex: 0 0 auto; white-space: nowrap;">
                                <input type="checkbox" value="\${api.id}" class="compare-api-checkbox">
                                <span>\${api.name} (\${api.modelName})</span>
                              </label>
                            \`).join('')}
                          </div>
                      </div>
                  \`).join('');
              }

              // 更新性能对比页标签筛选器
              function updateCompareTagFilter(apis) {
                  const allTags = new Set();
                  apis.forEach(api => {
                      if (api.tags) {
                          api.tags.forEach(tag => allTags.add(tag));
                      }
                  });

                  const filterGroup = document.getElementById('compareTagFilterGroup');
                  const container = document.getElementById('compareTagFilterContainer');

                  if (allTags.size === 0) {
                      filterGroup.style.display = 'none';
                      return;
                  }

                  filterGroup.style.display = 'flex';
                  container.innerHTML = Array.from(allTags).map(tag => \`
                      <label class="checkbox-group" style="background: \${selectedCompareFilterTags.includes(tag) ? '#4a90e2' : '#3a3a52'}; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: background 0.3s;">
                          <input type="checkbox" value="\${tag}" \${selectedCompareFilterTags.includes(tag) ? 'checked' : ''} onchange="toggleCompareTagFilter('\${tag}')" style="display: none;">
                          <span>\${tag}</span>
                      </label>
                  \`).join('');
              }

              // 切换性能对比页标签筛选
              async function toggleCompareTagFilter(tag) {
                  const index = selectedCompareFilterTags.indexOf(tag);
                  if (index === -1) {
                      selectedCompareFilterTags.push(tag);
                  } else {
                      selectedCompareFilterTags.splice(index, 1);
                  }
                  await updateCompareApiList();
              }

              // 清除性能对比页标签筛选
              async function clearCompareTagFilter() {
                  selectedCompareFilterTags = [];
                  await updateCompareApiList();
              }

              // 全选/取消全选批量测试 API
              function toggleAllBatchApis() {
                  const checked = document.getElementById('selectAllBatchApis').checked;
                  document.querySelectorAll('.batch-api-checkbox').forEach(cb => cb.checked = checked);
              }

              // 全选/取消全选性能对比 API
              function toggleAllCompareApis() {
                  const checked = document.getElementById('selectAllCompareApis').checked;
                  document.querySelectorAll('.compare-api-checkbox').forEach(cb => cb.checked = checked);
              }

              // 获取选中的批量测试 API IDs
              function getSelectedBatchApiIds() {
                  return Array.from(document.querySelectorAll('.batch-api-checkbox:checked')).map(cb => cb.value);
              }

              // 获取选中的性能对比 API IDs
              function getSelectedCompareApiIds() {
                  return Array.from(document.querySelectorAll('.compare-api-checkbox:checked')).map(cb => cb.value);
              }

              // ============ 单次测试联动逻辑 ============
              async function onTestApiSelectChange() {
                  const apiId = document.getElementById('testApiSelect').value;
                  const apiUrlInput = document.getElementById('apiUrl');
                  const modelNameInput = document.getElementById('modelName');
                  const apiTokenInput = document.getElementById('apiToken');
                  const providerSelect = document.getElementById('testProviderSelect');

                  if (apiId) {
                      // 选择了 API，填充信息并禁用编辑
                      const apis = await getApis();
                      const providers = await getProviders();
                      const api = apis.find(a => a.id === apiId);
                      if (api) {
                          const provider = api.providerId ? providers.find(p => p.id === api.providerId) : null;
                          
                          // 如果 API 没有 URL，使用供应商的 URL
                          if (api.fullUrl) {
                              apiUrlInput.value = api.fullUrl;
                          } else if (provider && provider.baseUrl) {
                              apiUrlInput.value = provider.baseUrl.replace(/\\/$/, '') + '/chat/completions';
                          } else {
                              apiUrlInput.value = '';
                          }
                          
                          modelNameInput.value = api.modelName;
                          
                          // 如果 API 没有 token，使用供应商的 token
                          if (api.token) {
                              apiTokenInput.value = api.token;
                          } else if (provider) {
                              apiTokenInput.value = provider.defaultToken || '';
                          } else {
                              apiTokenInput.value = '';
                          }
                          
                          // 设置供应商选择
                          providerSelect.value = api.providerId || '';
                          
                          // 禁用所有输入
                          apiUrlInput.disabled = true;
                          modelNameInput.disabled = true;
                          apiTokenInput.disabled = true;
                          providerSelect.disabled = true;
                          
                          // 视觉提示
                          apiUrlInput.style.backgroundColor = '#2a2a40';
                          modelNameInput.style.backgroundColor = '#2a2a40';
                          apiTokenInput.style.backgroundColor = '#2a2a40';
                          providerSelect.style.backgroundColor = '#2a2a40';
                      }
                  } else {
                      // 未选择 API，启用供应商选择
                      providerSelect.disabled = false;
                      providerSelect.style.backgroundColor = '';
                      
                      // 触发供应商联动
                      onTestProviderSelectChange();
                  }
              }

              async function onTestProviderSelectChange() {
                  const apiId = document.getElementById('testApiSelect').value;
                  if (apiId) return; // 如果已选择 API，忽略供应商变化

                  const providerId = document.getElementById('testProviderSelect').value;
                  const apiUrlInput = document.getElementById('apiUrl');
                  const modelNameInput = document.getElementById('modelName');
                  const apiTokenInput = document.getElementById('apiToken');

                  if (providerId) {
                      // 选择了供应商，填充信息并禁用编辑
                      const providers = await getProviders();
                      const provider = providers.find(p => p.id === providerId);
                      if (provider) {
                          if (provider.baseUrl) {
                              apiUrlInput.value = provider.baseUrl.replace(/\\/$/, '') + '/chat/completions';
                          }
                          apiTokenInput.value = provider.defaultToken || '';
                          
                          // 禁用输入
                          apiUrlInput.disabled = true;
                          apiTokenInput.disabled = true;
                          modelNameInput.disabled = false; // 模型名称仍可编辑
                          
                          // 视觉提示
                          apiUrlInput.style.backgroundColor = '#2a2a40';
                          apiTokenInput.style.backgroundColor = '#2a2a40';
                          modelNameInput.style.backgroundColor = '';
                      }
                  } else {
                      // 未选择供应商，启用所有输入
                      apiUrlInput.disabled = false;
                      modelNameInput.disabled = false;
                      apiTokenInput.disabled = false;
                      
                      apiUrlInput.style.backgroundColor = '';
                      modelNameInput.style.backgroundColor = '';
                      apiTokenInput.style.backgroundColor = '';
                  }
              }

              // ============ 标签页切换 ============
              function switchTab(tabName) {
                  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

                  // 找到对应的标签按钮并激活
                  const tabs = document.querySelectorAll('.tab');
                  tabs.forEach(tab => {
                      if (tab.getAttribute('onclick') && tab.getAttribute('onclick').includes(\`'\${tabName}'\`)) {
                          tab.classList.add('active');
                      }
                  });
                  document.getElementById(\`\${tabName}-tab\`).classList.add('active');
              }

              // ============ 模态框 ============
              function showModal(modalId) {
                  document.getElementById(modalId).classList.add('show');
              }

              function closeModal(modalId) {
                  document.getElementById(modalId).classList.remove('show');
              }

              // ============ 状态消息 ============
              function showStatus(message, type = 'info', containerId = null) {
                  // 如果指定了容器ID，使用该容器内的状态消息元素
                  // 否则尝试使用当前活动标签页的状态消息元素
                  let statusMsg = null;
                  
                  if (containerId) {
                      statusMsg = document.getElementById(containerId);
                  } else {
                      // 获取当前活动标签页
                      const activeTab = document.querySelector('.tab-content.active');
                      if (activeTab) {
                          const tabId = activeTab.id;
                          statusMsg = document.getElementById(\`statusMessage-\${tabId.replace('-tab', '')}\`);
                      }
                      
                      // 如果找不到特定标签页的状态消息，尝试使用通用的
                      if (!statusMsg) {
                          statusMsg = document.getElementById('statusMessage-test') || 
                                     document.getElementById('statusMessage');
                      }
                  }
                  
                  if (!statusMsg) {
                      console.error('Status message element not found');
                      return;
                  }
                  
                  statusMsg.textContent = message;
                  statusMsg.style.display = 'block';

                  if (type === 'success') {
                      statusMsg.style.backgroundColor = '#28a745';
                  } else if (type === 'error') {
                      statusMsg.style.backgroundColor = '#dc3545';
                  } else {
                      statusMsg.style.backgroundColor = '#3a3a52';
                  }

                  setTimeout(() => {
                      statusMsg.style.display = 'none';
                  }, 3000);
              }

              // ============ 测试函数 ============
              let observedMinThroughput = Infinity, observedMaxThroughput = -Infinity;
              let observedMinLatency = Infinity, observedMaxLatency = -Infinity;

              function generateDummyText(numTokens) {
                  const charsPerToken = 4;
                  const targetChars = numTokens * charsPerToken;
                  const baseText = "Lorem ipsum dolor sit amet. ";
                  let text = "";
                  while (text.length < targetChars) {
                      text += baseText;
                  }
                  return text.substring(0, targetChars);
              }

              function createTable(tableElement) {
                  tableElement.innerHTML = '';
                  let header = '<tr><th>Input \\ Output</th>';
                  OUTPUT_TOKEN_SIZES.forEach(outSize => header += \`<th>\${outSize}</th>\`);
                  header += '</tr>';
                  tableElement.innerHTML += header;

                  INPUT_TOKEN_SIZES.forEach(inSize => {
                      let row = \`<tr><td class="label-col">\${inSize}</td>\`;
                      OUTPUT_TOKEN_SIZES.forEach(outSize => {
                          row += \`<td id="cell-\${tableElement.id}-\${inSize}-\${outSize}" class="placeholder">-</td>\`;
                      });
                      row += '</tr>';
                      tableElement.innerHTML += row;
                  });
              }

              function updateCell(tableId, inTokens, outTokens, value, unit = "", higherIsBetter = true, error = false, skipColor = false) {
                  const cell = document.getElementById(\`cell-\${tableId}-\${inTokens}-\${outTokens}\`);
                  if (!cell) return;

                  if (error) {
                      cell.textContent = "Error";
                      cell.style.backgroundColor = "#800000";
                      cell.classList.remove('placeholder');
                      return;
                  }

                  if (value === null || isNaN(value)) {
                      cell.textContent = "-";
                      if (!skipColor) cell.style.backgroundColor = "";
                      cell.classList.add('placeholder');
                  } else {
                      cell.textContent = \`\${value.toFixed(2)}\${unit}\`;
                      if (!skipColor) {
                          cell.style.backgroundColor = getColorForValue(value, tableId === 'throughputTable', higherIsBetter);
                      }
                      cell.classList.remove('placeholder');
                  }
              }

              function updateObservedRanges(value, isThroughput) {
                  if (value === null || isNaN(value) || !isFinite(value)) return;
                  if (isThroughput) {
                      observedMinThroughput = Math.min(observedMinThroughput, value);
                      observedMaxThroughput = Math.max(observedMaxThroughput, value);
                  } else {
                      observedMinLatency = Math.min(observedMinLatency, value);
                      observedMaxLatency = Math.max(observedMaxLatency, value);
                  }
              }

              function getColorForValue(value, isThroughput, higherIsBetter) {
                  if (value === null || isNaN(value) || !isFinite(value)) return '#3a3a52';

                  let minVal, maxVal;
                  if (isThroughput) {
                      minVal = observedMinThroughput === Infinity ? 0 : observedMinThroughput;
                      maxVal = observedMaxThroughput === -Infinity ? value * 2 || 100 : observedMaxThroughput;
                  } else {
                      minVal = observedMinLatency === Infinity ? 0 : observedMinLatency;
                      maxVal = observedMaxLatency === -Infinity ? value * 2 || 5 : observedMaxLatency;
                  }

                  if (maxVal === minVal) maxVal = minVal + 1;

                  let percent = (value - minVal) / (maxVal - minVal);
                  percent = Math.max(0, Math.min(1, percent));

                  if (!higherIsBetter) {
                      percent = 1 - percent;
                  }
                  const hue = percent * 120;
                  return \`hsl(\${hue}, 60%, 40%)\`;
              }

              function getColorForValueStatic(value, higherIsBetter) {
                  // 简化的静态颜色计算
                  const percent = higherIsBetter ? Math.min(value / 50, 1) : Math.max(1 - value / 5, 0);
                  const hue = percent * 120;
                  return \`hsl(\${hue}, 60%, 40%)\`;
              }

              async function testApiEndpoint(apiUrl, modelName, apiToken, inTokens, outTokens) {
                  const promptText = generateDummyText(inTokens);
                  const headers = {
                      'Content-Type': 'application/json',
                  };
                  if (apiToken) {
                      headers['Authorization'] = \`Bearer \${apiToken}\`;
                  }

                  const body = JSON.stringify({
                      model: modelName,
                      messages: [{ role: 'user', content: promptText }],
                      max_tokens: outTokens,
                      stream: true
                  });

                  let latencies = [];
                  let throughputs = [];
                  let errorOccurred = false;

                  for (let i = 0; i < NUM_RUNS_PER_CELL; i++) {
                      try {
                          const startTime = performance.now();
                          let firstTokenTime = -1;
                          let totalCharsReceived = 0;

                          const response = await fetch(apiUrl, { method: 'POST', headers, body });

                          if (!response.ok) {
                              console.error(\`API Error (\${response.status}): \${await response.text()}\`);
                              errorOccurred = true;
                              break;
                          }
                          if (!response.body) {
                              console.error('Response body is not readable (not a stream).');
                              errorOccurred = true;
                              break;
                          }

                          const reader = response.body.getReader();
                          const decoder = new TextDecoder();
                          let buffer = '';

                          while (true) {
                              const { value, done } = await reader.read();
                              if (done) break;

                              if (firstTokenTime === -1 && value && value.length > 0) {
                                  firstTokenTime = performance.now();
                              }

                              buffer += decoder.decode(value, { stream: true });
                              let lines = buffer.split('\\n\\n');
                              buffer = lines.pop() || '';

                              for (const line of lines) {
                                  if (line.startsWith('data: ')) {
                                      const jsonData = line.substring(6);
                                      if (jsonData.trim() === '[DONE]') continue;
                                      try {
                                          const parsed = JSON.parse(jsonData);
                                          if (parsed.choices && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                                              totalCharsReceived += parsed.choices[0].delta.content.length;
                                          }
                                      } catch (e) {}
                                  }
                              }
                          }

                          const endTime = performance.now();

                          if (firstTokenTime !== -1) {
                              latencies.push((firstTokenTime - startTime) / 1000);
                          } else {
                              latencies.push((endTime - startTime) / 1000);
                          }

                          const durationSeconds = (endTime - startTime) / 1000;
                          const approxOutputTokens = totalCharsReceived / 4;
                          if (durationSeconds > 0) {
                              throughputs.push(approxOutputTokens / durationSeconds);
                          } else {
                              throughputs.push(0);
                          }

                      } catch (err) {
                          console.error(\`Error during API call for \${inTokens}/\${outTokens}:\`, err);
                          errorOccurred = true;
                          break;
                      }
                  }

                  if (errorOccurred) {
                      return { latency: null, throughput: null, error: true };
                  }

                  const avgLatency = latencies.length ? latencies.reduce((a, b) => a + b, 0) / latencies.length : null;
                  const avgThroughput = throughputs.length ? throughputs.reduce((a, b) => a + b, 0) / throughputs.length : null;

                  return { latency: avgLatency, throughput: avgThroughput, error: false };
              }

              async function runSingleTest() {
                  const apiUrl = document.getElementById('apiUrl').value.trim();
                  const modelName = document.getElementById('modelName').value.trim();
                  const apiToken = document.getElementById('apiToken').value.trim();

                  if (!apiUrl || !modelName) {
                      showStatus("请输入 API 地址和模型名称", "error");
                      return;
                  }

                  const testButton = document.getElementById('testButton');
                  testButton.disabled = true;
                  testButton.innerHTML = '测试中... <span class="loader"></span>';

                  const statusMsg = document.getElementById('statusMessage-test');
                  if (statusMsg) {
                      statusMsg.textContent = "测试正在进行中，请稍候...";
                      statusMsg.style.backgroundColor = '#3a3a52';
                      statusMsg.style.display = 'block';
                  }

                  observedMinThroughput = Infinity;
                  observedMaxThroughput = -Infinity;
                  observedMinLatency = Infinity;
                  observedMaxLatency = -Infinity;

                  const resultsCache = [];
                  const throughputData = {};
                  const latencyData = {};
                  const totalTests = INPUT_TOKEN_SIZES.length * OUTPUT_TOKEN_SIZES.length;
                  let testsCompleted = 0;

                  // 初始化表格
                  createTable(document.getElementById('throughputTable'));
                  createTable(document.getElementById('latencyTable'));

                  // 显示加载动画
                  for (const inTokens of INPUT_TOKEN_SIZES) {
                      for (const outTokens of OUTPUT_TOKEN_SIZES) {
                          const throughputCell = document.getElementById(\`cell-throughputTable-\${inTokens}-\${outTokens}\`);
                          if (throughputCell) throughputCell.innerHTML = '<span class="loader"></span>';
                          const latencyCell = document.getElementById(\`cell-latencyTable-\${inTokens}-\${outTokens}\`);
                          if (latencyCell) latencyCell.innerHTML = '<span class="loader"></span>';
                      }
                  }

                  for (const inTokens of INPUT_TOKEN_SIZES) {
                      for (const outTokens of OUTPUT_TOKEN_SIZES) {
                          if (statusMsg) statusMsg.textContent = \`测试中: \${inTokens} 输入 / \${outTokens} 输出 (\${Math.round(testsCompleted/totalTests*100)}%)\`;
                          const result = await testApiEndpoint(apiUrl, modelName, apiToken, inTokens, outTokens);
                          resultsCache.push({ inTokens, outTokens, ...result });

                          throughputData[\`\${inTokens}_\${outTokens}\`] = result.throughput;
                          latencyData[\`\${inTokens}_\${outTokens}\`] = result.latency;

                          updateObservedRanges(result.throughput, true);
                          updateObservedRanges(result.latency, false);
                          
                          // 实时显示结果（灰色背景，不更新颜色）
                          updateCell('throughputTable', inTokens, outTokens, result.throughput, " t/s", true, result.error, true);
                          updateCell('latencyTable', inTokens, outTokens, result.latency, " s", false, result.error, true);
                          
                          testsCompleted++;
                      }
                  }

                  // 计算平均值
                  const validThroughputs = resultsCache.filter(r => r.throughput !== null).map(r => r.throughput);
                  const validLatencies = resultsCache.filter(r => r.latency !== null).map(r => r.latency);

                  const avgThroughput = validThroughputs.length > 0 ? validThroughputs.reduce((a, b) => a + b, 0) / validThroughputs.length : null;
                  const avgLatency = validLatencies.length > 0 ? validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length : null;

                  // 保存当前结果
                  currentTestResults = {
                      apiUrl,
                      modelName,
                      throughputData,
                      latencyData,
                      avgThroughput,
                      avgLatency,
                      error: resultsCache.some(r => r.error)
                  };

                  // 最后统一更新颜色
                  resultsCache.forEach(res => {
                      updateCell('throughputTable', res.inTokens, res.outTokens, res.throughput, " t/s", true, res.error, false);
                      updateCell('latencyTable', res.inTokens, res.outTokens, res.latency, " s", false, res.error, false);
                  });

                  testButton.disabled = false;
                  testButton.innerHTML = '🚀 开始测速';
                  if (statusMsg) {
                      statusMsg.textContent = "测试完成！已自动保存结果";
                      statusMsg.style.backgroundColor = '#28a745';
                      setTimeout(() => { if (statusMsg) statusMsg.style.display = 'none'; }, 3000);
                  }

                  // 自动保存结果
                  if (!currentTestResults.error) {
                      await saveCurrentAsHistory();
                  }
              }

              // ============ 批量测试 ============
              function toggleAllApis() {
                  const selectAll = document.getElementById('selectAllApis').checked;
                  const select = document.getElementById('batchApiSelect');
                  for (let i = 0; i < select.options.length; i++) {
                      select.options[i].selected = selectAll;
                  }
              }

              async function runBatchTest() {
                  const selectedApiIds = getSelectedBatchApiIds();

                  if (selectedApiIds.length === 0) {
                      alert('请选择至少一个 API 进行测试');
                      return;
                  }

                  const apis = await getApis();
                  const providers = await getProviders();
                  const selectedApis = apis.filter(a => selectedApiIds.includes(a.id));
                  const rounds = parseInt(document.getElementById('testRounds').value) || 1;
                  const isParallel = document.getElementById('parallelTest').checked;

                  // 准备 API 列表，包含实际使用的 URL 和 token
                  const apisWithTokens = selectedApis.map(api => {
                      const provider = api.providerId ? providers.find(p => p.id === api.providerId) : null;
                      // 如果 API 没有 URL，使用供应商的 URL
                      let actualUrl = api.fullUrl;
                      if (!actualUrl && provider && provider.baseUrl) {
                          actualUrl = provider.baseUrl.replace(/\\/$/, '') + '/chat/completions';
                      }
                      // 如果 API 没有 token，使用供应商的 token
                      const actualToken = api.token || (provider ? provider.defaultToken : '') || '';
                      return { ...api, actualUrl, actualToken };
                  });

                  batchTestRunning = true;
                  batchTestAbortController = new AbortController();

                  const progressDiv = document.getElementById('batchProgress');
                  const progressFill = document.getElementById('batchProgressFill');
                  const progressText = document.getElementById('batchProgressText');
                  const resultsDiv = document.getElementById('batchResults');

                  progressDiv.style.display = 'block';
                  
                  // 初始化结果表格，所有API显示为转圈图标
                  // 每个API测试5个token组合(128/256/512/1024/2048)
                  const tokenSizesCount = 5;
                  const totalTests = apisWithTokens.length * rounds * tokenSizesCount;
                  let completedTests = 0;
                  const batchResults = [];
                  
                  // 为每个API初始化结果对象
                  const apiResults = {};
                  apisWithTokens.forEach(api => {
                      const provider = api.providerId ? providers.find(p => p.id === api.providerId) : null;
                      apiResults[api.id] = {
                          id: api.id,
                          name: api.name,
                          modelName: api.modelName,
                          providerName: provider ? provider.name : '未分类',
                          throughputs: [],
                          latencies: [],
                          completed: false
                      };
                  });
                  
                  // 渲染初始表格
                  const renderBatchTable = () => {
                      const results = Object.values(apiResults);
                      let tableHtml = \`
                          <div class="panel">
                              <h2>批量测试结果</h2>
                              <table id="batchResultTable" style="width: 100%; border-collapse: collapse;">
                                  <thead>
                                      <tr style="background: #2a2a40;">
                                          <th style="padding: 10px; text-align: left;">供应商</th>
                                          <th style="padding: 10px; text-align: left;">API 名称</th>
                                          <th style="padding: 10px; text-align: left;">模型</th>
                                          <th style="padding: 10px; text-align: center;">平均吞吐量 (t/s)</th>
                                          <th style="padding: 10px; text-align: center;">平均首token延迟 (s)</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                      \`;
                      results.forEach(r => {
                          tableHtml += \`
                              <tr id="batch-row-\${r.id}" style="border-bottom: 1px solid #3a3a52;">
                                  <td style="padding: 10px; text-align: left;">\${r.providerName}</td>
                                  <td style="padding: 10px; text-align: left;">\${r.name}</td>
                                  <td style="padding: 10px; text-align: left;">\${r.modelName}</td>
                                  <td id="batch-tput-\${r.id}" style="padding: 10px; text-align: center;"><span class="loader"></span></td>
                                  <td id="batch-lat-\${r.id}" style="padding: 10px; text-align: center;"><span class="loader"></span></td>
                              </tr>
                          \`;
                      });
                      tableHtml += \`
                                  </tbody>
                              </table>
                              <div style="margin-top: 15px; display: flex; gap: 20px; font-size: 0.85em; color: #a0a0b8;">
                                  <div>
                                      <strong>吞吐量:</strong>
                                      <span style="background: linear-gradient(90deg, #ff6b6b, #ffd166, #90ee90); padding: 2px 8px; border-radius: 4px; margin-left: 8px; color: #1e1e2f; font-weight: bold;">低 ━━━ 中 ━━━ 高</span>
                                  </div>
                                  <div>
                                      <strong>延迟:</strong>
                                      <span style="background: linear-gradient(90deg, #90ee90, #ffd166, #ff6b6b); padding: 2px 8px; border-radius: 4px; margin-left: 8px; color: #1e1e2f; font-weight: bold;">低 ━━━ 中 ━━━ 高</span>
                                  </div>
                              </div>
                          </div>
                      \`;
                      resultsDiv.innerHTML = tableHtml;
                  };
                  
                  renderBatchTable();

                  // 更新单个API结果的函数
                  const updateApiResult = (apiId) => {
                      const result = apiResults[apiId];
                      if (!result || !result.completed) return;
                      
                      const tputCell = document.getElementById(\`batch-tput-\${apiId}\`);
                      const latCell = document.getElementById(\`batch-lat-\${apiId}\`);
                      
                      if (tputCell && latCell) {
                          const avgThroughput = result.throughputs.length > 0 
                              ? result.throughputs.reduce((a, b) => a + b, 0) / result.throughputs.length 
                              : null;
                          const avgLatency = result.latencies.length > 0 
                              ? result.latencies.reduce((a, b) => a + b, 0) / result.latencies.length 
                              : null;
                          
                          tputCell.textContent = avgThroughput ? avgThroughput.toFixed(2) : 'N/A';
                          latCell.textContent = avgLatency ? avgLatency.toFixed(2) : 'N/A';
                          tputCell.classList.remove('placeholder');
                          latCell.classList.remove('placeholder');
                          
                          // 保存数值用于后续颜色渲染
                          tputCell.dataset.value = avgThroughput || '';
                          latCell.dataset.value = avgLatency || '';
                      }
                  };
                  
                  // 渲染所有单元格颜色的函数
                  const renderBatchColors = () => {
                      // 收集所有有效值
                      const tputValues = [];
                      const latValues = [];
                      
                      Object.keys(apiResults).forEach(apiId => {
                          const result = apiResults[apiId];
                          if (result.completed) {
                              const avgThroughput = result.throughputs.length > 0 
                                  ? result.throughputs.reduce((a, b) => a + b, 0) / result.throughputs.length 
                                  : null;
                              const avgLatency = result.latencies.length > 0 
                                  ? result.latencies.reduce((a, b) => a + b, 0) / result.latencies.length 
                                  : null;
                              
                              if (avgThroughput) tputValues.push(avgThroughput);
                              if (avgLatency) latValues.push(avgLatency);
                          }
                      });
                      
                      const maxTput = tputValues.length > 0 ? Math.max(...tputValues) : 0;
                      const minLat = latValues.length > 0 ? Math.min(...latValues) : 0;
                      
                      // 渲染每个单元格的颜色
                      Object.keys(apiResults).forEach(apiId => {
                          const tputCell = document.getElementById(\`batch-tput-\${apiId}\`);
                          const latCell = document.getElementById(\`batch-lat-\${apiId}\`);
                          
                          if (tputCell && tputCell.dataset.value) {
                              const value = parseFloat(tputCell.dataset.value);
                              const percent = maxTput > 0 ? value / maxTput : 0;
                              const hue = percent * 120;
                              tputCell.style.backgroundColor = \`hsl(\${hue}, 60%, 40%)\`;
                          }
                          
                          if (latCell && latCell.dataset.value) {
                              const value = parseFloat(latCell.dataset.value);
                              // 延迟越低越好，所以反转百分比
                              const percent = minLat > 0 ? Math.min(minLat / value, 1) : 0;
                              const hue = percent * 120;
                              latCell.style.backgroundColor = \`hsl(\${hue}, 60%, 40%)\`;
                          }
                      });
                  };

                  // 更新进度条的函数
                  const updateProgressBar = () => {
                      completedTests++;
                      progressFill.style.width = \`\${(completedTests / totalTests) * 100}%\`;
                  };

                  // 测试单个API的函数
                  const testSingleApi = async (api, round) => {
                      if (!batchTestRunning) return null;

                      // 在测试开始前更新进度提示
                      if (!isParallel) {
                          progressText.textContent = \`第 \${round} 轮 - 测试: \${api.name}\`;
                      }

                      try {
                          // 定义进度回调
                          const onProgress = (size, current, total) => {
                              if (!isParallel) {
                                  progressText.textContent = \`第 \${round} 轮 - 测试: \${api.name} | token: \${size}→\${size} (\${current}/\${total})\`;
                              }
                          };
                          
                          // 定义token组合完成回调，用于更新进度条
                          const onTokenComplete = () => {
                              updateProgressBar();
                          };
                          
                          const result = await runQuickTest(api.actualUrl, api.modelName, api.actualToken, onProgress, onTokenComplete);
                          
                          // 保存结果
                          if (result.avgThroughput) apiResults[api.id].throughputs.push(result.avgThroughput);
                          if (result.avgLatency) apiResults[api.id].latencies.push(result.avgLatency);
                          
                          // 标记为完成并更新显示（如果是最后一轮）
                          if (round === rounds) {
                              apiResults[api.id].completed = true;
                              updateApiResult(api.id);
                          }
                          return {
                              ...api,
                              round,
                              ...result
                          };
                      } catch (err) {
                          // 即使出错也标记为完成（如果是最后一轮）
                          if (round === rounds) {
                              apiResults[api.id].completed = true;
                              updateApiResult(api.id);
                          }
                          updateProgress(api.name);
                          return {
                              ...api,
                              round,
                              error: true,
                              errorMessage: err.message
                          };
                      }
                  };

                  if (isParallel) {
                      // 并行测试：所有API同时测试
                      const testPromises = [];
                      for (let round = 1; round <= rounds; round++) {
                          for (const api of apisWithTokens) {
                              if (!batchTestRunning) break;
                              testPromises.push(testSingleApi(api, round));
                          }
                      }
                      // 显示并行测试进度
                      progressText.textContent = \`并行测试中 - 共 \${testPromises.length} 个 API × 5 种 token 组合\`;
                      await Promise.all(testPromises);
                  } else {
                      // 串行测试：逐个测试
                      for (let round = 1; round <= rounds; round++) {
                          for (const api of apisWithTokens) {
                              if (!batchTestRunning) break;
                              await testSingleApi(api, round);
                          }
                          if (!batchTestRunning) break;
                      }
                  }

                  batchTestRunning = false;
                  progressDiv.style.display = 'none';
                  
                  // 渲染所有单元格颜色
                  renderBatchColors();

                  // 计算最终结果用于保存
                  const finalResults = Object.values(apiResults).map(api => ({
                      name: api.name,
                      modelName: api.modelName,
                      avgThroughput: api.throughputs.length > 0 ? api.throughputs.reduce((a, b) => a + b, 0) / api.throughputs.length : null,
                      avgLatency: api.latencies.length > 0 ? api.latencies.reduce((a, b) => a + b, 0) / api.latencies.length : null
                  }));
                  
                  // 添加完成提示
                  const panel = resultsDiv.querySelector('.panel');
                  if (panel) {
                      panel.innerHTML += \`
                          <div style="margin-top: 15px; color: #a0a0b8;">
                              <p>✅ 测试结果已自动保存到历史记录</p>
                          </div>
                      \`;
                  }

                  // 自动保存结果
                  const batchResultData = {
                      type: 'batch',
                      name: '批量测试',
                      timestamp: new Date().toISOString(),
                      results: finalResults
                  };
                  await addToHistory(batchResultData);
              }

              async function runQuickTest(apiUrl, modelName, apiToken, onProgress = null, onTokenComplete = null) {
                  // 测试多个 token 组合并取平均值
                  const tokenSizes = [128, 256, 512, 1024, 2048];
                  const results = [];
                  
                  for (let i = 0; i < tokenSizes.length; i++) {
                      const size = tokenSizes[i];
                      
                      // 调用进度回调
                      if (onProgress) {
                          onProgress(size, i + 1, tokenSizes.length);
                      }
                      
                      try {
                          const result = await testApiEndpoint(apiUrl, modelName, apiToken, size, size);
                          if (!result.error) {
                              results.push(result);
                          }
                      } catch (err) {
                          console.error('Test failed for size', size, err);
                      }
                      
                      // 每个token组合完成后更新进度条
                      if (onTokenComplete) {
                          onTokenComplete();
                      }
                  }
                  
                  if (results.length === 0) {
                      return {
                          avgThroughput: null,
                          avgLatency: null,
                          error: true
                      };
                  }
                  
                  // 计算平均值
                  const validThroughputs = results.filter(r => r.throughput !== null).map(r => r.throughput);
                  const validLatencies = results.filter(r => r.latency !== null).map(r => r.latency);
                  
                  const avgThroughput = validThroughputs.length > 0 
                      ? validThroughputs.reduce((a, b) => a + b, 0) / validThroughputs.length 
                      : null;
                  const avgLatency = validLatencies.length > 0 
                      ? validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length 
                      : null;
                  
                  return {
                      avgThroughput,
                      avgLatency,
                      error: false
                  };
              }

              function stopBatchTest() {
                  batchTestRunning = false;
                  if (batchTestAbortController) {
                      batchTestAbortController.abort();
                  }
                  showStatus('批量测试已停止', 'info');
              }

              async function saveBatchResults() {
                  if (!window.tempBatchResults) {
                      alert('没有结果可以保存');
                      return;
                  }

                  await addToHistory(window.tempBatchResults);
                  window.tempBatchResults = null;
                  showStatus('批量测试结果已保存！', 'success');
              }

              // ============ 性能对比 ============
              async function runCompareFromHistory() {
                  const selectedApiIds = getSelectedCompareApiIds();

                  if (selectedApiIds.length === 0) {
                      alert('请选择至少一个 API 进行对比');
                      return;
                  }

                  const apis = await getApis();
                  const providers = await getProviders();
                  const history = await getHistory();
                  const resultsDiv = document.getElementById('compareResults');

                  // 从历史记录中获取每个 API 的最近测试数据
                  const results = [];
                  for (const apiId of selectedApiIds) {
                      const api = apis.find(a => a.id === apiId);
                      if (!api) continue;

                      const provider = providers.find(p => p.id === api.providerId);
                      const providerName = provider ? provider.name : '未知供应商';

                      // 查找该 API 的最近历史记录
                      let latestRecord = null;
                      for (const item of history) {
                          if (item.type === 'batch' && item.results) {
                              const apiResult = item.results.find(r => r.name === api.name || r.modelName === api.modelName);
                              if (apiResult && (!latestRecord || new Date(item.timestamp) > new Date(latestRecord.timestamp))) {
                                  latestRecord = { ...apiResult, timestamp: item.timestamp };
                              }
                          } else if (item.type === 'single' && item.modelName === api.modelName) {
                              if (!latestRecord || new Date(item.timestamp) > new Date(latestRecord.timestamp)) {
                                  latestRecord = {
                                      name: api.name,
                                      modelName: api.modelName,
                                      avgThroughput: item.avgThroughput,
                                      avgLatency: item.avgLatency,
                                      timestamp: item.timestamp
                                  };
                              }
                          }
                      }

                      if (latestRecord) {
                          results.push({
                              ...api,
                              providerName,
                              ...latestRecord
                          });
                      } else {
                          results.push({
                              ...api,
                              providerName,
                              avgThroughput: null,
                              avgLatency: null,
                              noData: true
                          });
                      }
                  }

                  // 找出最佳值
                  const validResults = results.filter(r => !r.noData && r.avgThroughput);
                  const maxThroughput = validResults.length > 0 ? Math.max(...validResults.map(r => r.avgThroughput)) : 0;
                  // 计算最低延迟时应该包含所有有延迟数据的结果
                  const resultsWithLatency = results.filter(r => !r.noData && r.avgLatency);
                  const minLatency = resultsWithLatency.length > 0 ? Math.min(...resultsWithLatency.map(r => r.avgLatency)) : 0;

                  // 生成垂直柱状图数据 - 按吞吐量排序：高->低->N/A->无数据
                  const chartDataThroughput = results.map(r => ({
                      name: r.name,
                      providerName: r.providerName,
                      fullName: \`[\${r.providerName}] \${r.name}\`,
                      throughput: r.avgThroughput || 0,
                      latency: r.avgLatency || 0,
                      hasData: !r.noData,
                      dataStatus: r.noData ? 'noData' : (r.avgThroughput ? 'hasData' : 'na')
                  })).sort((a, b) => {
                      // 排序优先级：有数据(高->低) > N/A > 无数据
                      const priorityA = a.dataStatus === 'hasData' ? 2 : (a.dataStatus === 'na' ? 1 : 0);
                      const priorityB = b.dataStatus === 'hasData' ? 2 : (b.dataStatus === 'na' ? 1 : 0);
                      if (priorityA !== priorityB) return priorityB - priorityA;
                      // 同优先级内按吞吐量降序
                      return b.throughput - a.throughput;
                  });

                  // 生成垂直柱状图数据 - 按延迟排序：无数据->N/A->低->高
                  const chartDataLatency = results.map(r => ({
                      name: r.name,
                      providerName: r.providerName,
                      fullName: \`[\${r.providerName}] \${r.name}\`,
                      throughput: r.avgThroughput || 0,
                      latency: r.avgLatency || 0,
                      hasData: !r.noData,
                      dataStatus: r.noData ? 'noData' : (r.avgLatency ? 'hasData' : 'na')
                  })).sort((a, b) => {
                      // 排序优先级：无数据 > N/A > 有数据(低->高)
                      const priorityA = a.dataStatus === 'noData' ? 2 : (a.dataStatus === 'na' ? 1 : 0);
                      const priorityB = b.dataStatus === 'noData' ? 2 : (b.dataStatus === 'na' ? 1 : 0);
                      if (priorityA !== priorityB) return priorityB - priorityA;
                      // 同优先级内按延迟升序
                      return a.latency - b.latency;
                  });

                  const maxChartThroughput = Math.max(...chartDataThroughput.filter(d => d.dataStatus === 'hasData').map(d => d.throughput), 1);
                  const maxChartLatency = Math.max(...chartDataLatency.filter(d => d.dataStatus === 'hasData').map(d => d.latency), 1);

                  // 根据屏幕宽度动态计算柱子宽度
                  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
                  const isMobile = screenWidth < 768;
                  const chartContainerWidth = isMobile ? screenWidth - 60 : Math.min(screenWidth - 100, 800);
                  const barWidth = Math.min(isMobile ? 50 : 80, chartContainerWidth / chartDataThroughput.length);
                  const chartHeight = isMobile ? 150 : 200;
                  const labelHeight = isMobile ? 60 : 150; // 移动端减小标签高度

                  resultsDiv.innerHTML = \`
                      <div class="panel">
                          <h2>性能对比结果</h2>
                          <p style="color: #a0a0b8; margin-bottom: 20px;">数据来源：历史记录中的最近测试结果</p>
                          
                          <h3 style="color: #ffffff; margin-bottom: 15px;">📊 吞吐量对比 (每秒 token 数)</h3>
                          <div style="display: flex; align-items: flex-end; justify-content: \${isMobile && chartDataThroughput.length > 3 ? 'flex-start' : 'center'}; height: \${chartHeight + labelHeight + 80}px; margin-bottom: 30px; padding: \${isMobile ? '10px' : '20px'}; background: #2a2a40; border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch;">
                              \${chartDataThroughput.map(d => \`
                                  <div style="display: flex; flex-direction: column; align-items: center; margin: 0 5px; min-width: \${barWidth}px; position: relative;">
                                      <div style="font-size: 0.85em; color: \${d.dataStatus === 'hasData' ? '#e0e0e0' : '#6c757d'}; margin-bottom: 8px; min-height: 20px; display: flex; align-items: flex-end; padding-bottom: 5px;">
                                          \${d.dataStatus === 'hasData' ? d.throughput.toFixed(1) : (d.dataStatus === 'na' ? 'N/A' : '无数据')}
                                      </div>
                                      <div style="width: \${barWidth - 10}px; height: \${chartHeight}px; background: #3a3a52; border-radius: 4px 4px 0 0; position: relative; display: flex; align-items: flex-end;">
                                          <div style="width: 100%; background: \${d.dataStatus === 'hasData' ? (d.throughput === maxThroughput ? '#28a745' : '#4a90e2') : '#6c757d'}; height: \${d.dataStatus === 'hasData' ? (d.throughput / maxChartThroughput * 100) : 3}%; border-radius: 4px 4px 0 0; transition: height 0.5s ease;"></div>
                                      </div>
                                      <div style="font-size: 0.85em; color: #a0a0b8; margin-top: 5px; height: \${labelHeight}px; position: relative; width: \${barWidth}px;">
                                          <span style="position: absolute; top: 0; right: 50%; transform: rotate(-45deg); transform-origin: top right; white-space: nowrap;" title="\${d.fullName}">
                                              \${d.fullName}
                                          </span>
                                      </div>
                                  </div>
                              \`).join('')}
                          </div>
                          <div style="display: flex; gap: 15px; margin-bottom: 20px; font-size: 0.85em; flex-wrap: wrap;">
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #28a745; border-radius: 2px;"></span> 最高吞吐量</span>
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #4a90e2; border-radius: 2px;"></span> 普通吞吐量</span>
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #6c757d; border-radius: 2px;"></span> 无数据/N/A</span>
                          </div>

                          <h3 style="color: #ffffff; margin-bottom: 15px;">⏱️ 首 Token 延迟 (平均秒数)</h3>
                          <div style="display: flex; align-items: flex-end; justify-content: \${isMobile && chartDataLatency.length > 3 ? 'flex-start' : 'center'}; height: \${chartHeight + labelHeight + 80}px; margin-bottom: 20px; padding: \${isMobile ? '10px' : '20px'}; background: #2a2a40; border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch;">
                              \${chartDataLatency.map(d => \`
                                  <div style="display: flex; flex-direction: column; align-items: center; margin: 0 5px; min-width: \${barWidth}px; position: relative;">
                                      <div style="font-size: 0.85em; color: \${d.dataStatus === 'hasData' ? '#e0e0e0' : '#6c757d'}; margin-bottom: 8px; min-height: 20px; display: flex; align-items: flex-end; padding-bottom: 5px;">
                                          \${d.dataStatus === 'hasData' ? d.latency.toFixed(2) : (d.dataStatus === 'na' ? 'N/A' : '无数据')}
                                      </div>
                                      <div style="width: \${barWidth - 10}px; height: \${chartHeight}px; background: #3a3a52; border-radius: 4px 4px 0 0; position: relative; display: flex; align-items: flex-end;">
                                          <div style="width: 100%; background: \${d.dataStatus === 'hasData' ? (d.latency === minLatency ? '#28a745' : '#ffc107') : '#6c757d'}; height: \${d.dataStatus === 'hasData' ? (d.latency / maxChartLatency * 100) : 3}%; border-radius: 4px 4px 0 0; transition: height 0.5s ease;"></div>
                                      </div>
                                      <div style="font-size: 0.85em; color: #a0a0b8; margin-top: 5px; height: \${labelHeight}px; position: relative; width: \${barWidth}px;">
                                          <span style="position: absolute; top: 0; right: 50%; transform: rotate(-45deg); transform-origin: top right; white-space: nowrap;" title="\${d.fullName}">
                                              \${d.fullName}
                                          </span>
                                      </div>
                                  </div>
                              \`).join('')}
                          </div>
                          <div style="display: flex; gap: 15px; margin-bottom: 20px; font-size: 0.85em; flex-wrap: wrap;">
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #28a745; border-radius: 2px;"></span> 最低延迟</span>
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #ffc107; border-radius: 2px;"></span> 普通延迟</span>
                              <span style="display: flex; align-items: center; gap: 5px; white-space: nowrap;"><span style="width: 12px; height: 12px; background: #6c757d; border-radius: 2px;"></span> 无数据/N/A</span>
                          </div>

                          <div style="margin-top: 20px; padding: 15px; background: #3a3a52; border-radius: 8px;">
                              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                  <h4 style="color: #ffffff; margin: 0;">详细数据</h4>
                                  <div style="display: flex; gap: 10px;">
                                      <button class="btn-secondary btn-sm" onclick="sortCompareTable('throughput')" id="sortByThroughputBtn">按吞吐量排序</button>
                                      <button class="btn-secondary btn-sm" onclick="sortCompareTable('latency')" id="sortByLatencyBtn">按延迟排序 ↓</button>
                                  </div>
                              </div>
                              <table style="width: 100%; border-collapse: collapse;" id="compareTable">
                                  <thead>
                                      <tr style="background: #2a2a40;">
                                          <th style="padding: 10px; text-align: left;">供应商</th>
                                          <th style="padding: 10px; text-align: left;">API</th>
                                          <th style="padding: 10px; text-align: center;">模型</th>
                                          <th style="padding: 10px; text-align: center; cursor: pointer;" onclick="sortCompareTable('throughput')">吞吐量 ↕</th>
                                          <th style="padding: 10px; text-align: center; cursor: pointer;" onclick="sortCompareTable('latency')">首token延迟 ↕</th>
                                          <th style="padding: 10px; text-align: center;">状态</th>
                                      </tr>
                                  </thead>
                                  <tbody id="compareTableBody">
                                      \${generateCompareTableRows(results, maxThroughput, minLatency)}
                                  </tbody>
                              </table>
                          </div>

                          <div style="margin-top: 15px; color: #a0a0b8;">
                              <p>👑 吞吐量最高 | ⚡ 延迟最低</p>
                          </div>
                      </div>
                  \`;

                  // 保存当前结果供排序使用
                  window.currentCompareResults = results;
                  window.currentCompareMaxThroughput = maxThroughput;
                  window.currentCompareMinLatency = minLatency;
              }

              // 生成对比表格行
              function generateCompareTableRows(results, maxThroughput, minLatency, sortBy = 'latency', sortOrder = 'asc') {
                  // 复制数组避免修改原数组
                  let sortedResults = [...results];

                  // 排序
                  sortedResults.sort((a, b) => {
                      // 确定数据状态：hasData(有数据), na(N/A), noData(无数据)
                      const getStatus = (r, type) => {
                          if (r.noData) return 'noData';
                          if (type === 'throughput') return r.avgThroughput ? 'hasData' : 'na';
                          return r.avgLatency ? 'hasData' : 'na';
                      };

                      if (sortBy === 'throughput') {
                          // 吞吐量排序
                          const statusA = getStatus(a, 'throughput');
                          const statusB = getStatus(b, 'throughput');
                          const priorityA = statusA === 'hasData' ? 2 : (statusA === 'na' ? 1 : 0);
                          const priorityB = statusB === 'hasData' ? 2 : (statusB === 'na' ? 1 : 0);
                          if (priorityA !== priorityB) return priorityB - priorityA;
                          // 同优先级内按吞吐量排序（根据sortOrder决定正序或逆序）
                          const diff = (b.avgThroughput || 0) - (a.avgThroughput || 0);
                          return sortOrder === 'asc' ? -diff : diff;
                      } else {
                          // 延迟排序
                          const statusA = getStatus(a, 'latency');
                          const statusB = getStatus(b, 'latency');
                          const priorityA = statusA === 'hasData' ? 2 : (statusA === 'na' ? 1 : 0);
                          const priorityB = statusB === 'hasData' ? 2 : (statusB === 'na' ? 1 : 0);
                          if (priorityA !== priorityB) return priorityB - priorityA;
                          // 同优先级内按延迟排序（根据sortOrder决定正序或逆序）
                          const diff = (b.avgLatency || 0) - (a.avgLatency || 0);
                          return sortOrder === 'asc' ? -diff : diff;
                      }
                  });

                  return sortedResults.map(r => \`
                      <tr>
                          <td style="padding: 10px;">\${r.providerName}</td>
                          <td style="padding: 10px;">\${r.name} \${r.avgThroughput === maxThroughput && !r.noData ? '👑' : ''} \${r.avgLatency === minLatency && !r.noData ? '⚡' : ''}</td>
                          <td style="padding: 10px; text-align: center;">\${r.modelName}</td>
                          <td style="padding: 10px; text-align: center;">\${r.noData ? '-' : (r.avgThroughput ? r.avgThroughput.toFixed(2) + ' t/s' : 'N/A')}</td>
                          <td style="padding: 10px; text-align: center;">\${r.noData ? '-' : (r.avgLatency ? r.avgLatency.toFixed(2) + ' s' : 'N/A')}</td>
                          <td style="padding: 10px; text-align: center;">\${r.noData ? '⚠️ 无数据' : '✅ 有数据'}</td>
                      </tr>
                  \`).join('');
              }

              // 当前排序状态
              let currentSortBy = 'latency';
              let currentSortOrder = 'asc';

              // 排序对比表格
              function sortCompareTable(sortBy) {
                  if (!window.currentCompareResults) return;

                  // 如果点击的是当前排序列，切换排序方向
                  if (sortBy === currentSortBy) {
                      currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
                  } else {
                      currentSortBy = sortBy;
                      // 延迟默认升序（低在前），吞吐量默认降序（高在前）
                      currentSortOrder = sortBy === 'latency' ? 'asc' : 'desc';
                  }

                  // 更新按钮文字
                  const latencyBtn = document.getElementById('sortByLatencyBtn');
                  const throughputBtn = document.getElementById('sortByThroughputBtn');

                  if (latencyBtn) {
                      latencyBtn.textContent = currentSortBy === 'latency'
                          ? (currentSortOrder === 'asc' ? '按延迟排序 ↑' : '按延迟排序 ↓')
                          : '按延迟排序';
                  }
                  if (throughputBtn) {
                      throughputBtn.textContent = currentSortBy === 'throughput'
                          ? (currentSortOrder === 'desc' ? '按吞吐量排序 ↓' : '按吞吐量排序 ↑')
                          : '按吞吐量排序';
                  }

                  // 重新渲染表格
                  const tbody = document.getElementById('compareTableBody');
                  if (tbody) {
                      tbody.innerHTML = generateCompareTableRows(
                          window.currentCompareResults,
                          window.currentCompareMaxThroughput,
                          window.currentCompareMinLatency,
                          currentSortBy,
                          currentSortOrder
                      );
                  }
              }

              // ============ 截图功能 ============
              // 辅助函数：为截图临时设置字体颜色
              function prepareContainerForScreenshot(container, textColor = '#e0e0e0') {
                  // 保存原始样式
                  const originalColor = container.style.color;
                  const originalStyles = new Map();
                  
                  // 设置容器字体颜色
                  container.style.color = textColor;
                  
                  // 设置所有子元素的字体颜色
                  const allElements = container.querySelectorAll('*');
                  allElements.forEach(el => {
                      originalStyles.set(el, el.style.color);
                      // 如果是文本元素，设置颜色
                      if (el.children.length === 0 || el.textContent.trim()) {
                          el.style.color = textColor;
                      }
                  });
                  
                  return () => {
                      // 恢复原始样式
                      container.style.color = originalColor;
                      allElements.forEach(el => {
                          el.style.color = originalStyles.get(el) || '';
                      });
                  };
              }

              function captureResults() {
                  const container = document.getElementById('resultsContainer');
                  if (!container || typeof html2canvas === 'undefined') {
                      alert('无法截图');
                      return;
                  }

                  showStatus("正在生成截图...", "info");
                  
                  // 临时设置字体颜色
                  const restoreStyles = prepareContainerForScreenshot(container, '#e0e0e0');

                  html2canvas(container, {
                      backgroundColor: '#1e1e2f',
                      useCORS: true
                  }).then(canvas => {
                      // 恢复原始样式
                      restoreStyles();
                      
                      const link = document.createElement('a');
                      link.download = \`llm-test-results-\${Date.now()}.png\`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                      showStatus("截图已下载！", "success");
                  }).catch(err => {
                      // 恢复原始样式
                      restoreStyles();
                      console.error("截图失败:", err);
                      showStatus("截图失败", "error");
                  });
              }

              function screenshotHistoryDetail() {
                  const container = document.getElementById('historyDetailContent');
                  if (!container || typeof html2canvas === 'undefined') {
                      alert('无法截图');
                      return;
                  }

                  showStatus("正在生成截图...", "info");

                  // 临时设置字体颜色
                  const restoreStyles = prepareContainerForScreenshot(container, '#e0e0e0');

                  html2canvas(container, {
                      backgroundColor: '#2a2a40',
                      useCORS: true
                  }).then(canvas => {
                      // 恢复原始样式
                      restoreStyles();
                      
                      const link = document.createElement('a');
                      link.download = \`llm-test-history-\${Date.now()}.png\`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                      showStatus("截图已下载！", "success");
                  }).catch(err => {
                      // 恢复原始样式
                      restoreStyles();
                      console.error("截图失败:", err);
                      showStatus("截图失败", "error");
                  });
              }

              // 截图批量测试结果
              function captureBatchResults() {
                  const container = document.getElementById('batchResults');
                  console.log('captureBatchResults called, container:', container);
                  console.log('container.innerHTML:', container ? container.innerHTML.substring(0, 100) : 'null');
                  
                  if (!container || container.innerHTML === '' || typeof html2canvas === 'undefined') {
                      alert('没有可截图的结果');
                      return;
                  }

                  showStatus("正在生成截图...", "info");
                  console.log('showStatus called for 正在生成截图');
                  
                  // 临时设置字体颜色
                  const restoreStyles = prepareContainerForScreenshot(container, '#e0e0e0');

                  html2canvas(container, {
                      backgroundColor: '#1e1e2f',
                      useCORS: true
                  }).then(canvas => {
                      // 恢复原始样式
                      restoreStyles();
                      
                      const link = document.createElement('a');
                      link.download = \`llm-batch-test-\${Date.now()}.png\`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                      showStatus("截图已下载！", "success");
                  }).catch(err => {
                      // 恢复原始样式
                      restoreStyles();
                      console.error("截图失败:", err);
                      showStatus("截图失败", "error");
                  });
              }

              // 截图性能对比结果
              function captureCompareResults() {
                  const container = document.getElementById('compareResults');
                  if (!container || container.innerHTML === '' || typeof html2canvas === 'undefined') {
                      alert('没有可截图的结果');
                      return;
                  }

                  showStatus("正在生成截图...", "info");
                  
                  // 临时设置字体颜色
                  const restoreStyles = prepareContainerForScreenshot(container, '#e0e0e0');

                  html2canvas(container, {
                      backgroundColor: '#1e1e2f',
                      useCORS: true
                  }).then(canvas => {
                      // 恢复原始样式
                      restoreStyles();
                      
                      const link = document.createElement('a');
                      link.download = \`llm-compare-\${Date.now()}.png\`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                      showStatus("截图已下载！", "success");
                  }).catch(err => {
                      // 恢复原始样式
                      restoreStyles();
                      console.error("截图失败:", err);
                      showStatus("截图失败", "error");
                  });
              }

              // ============ 初始化 ============
              document.addEventListener('DOMContentLoaded', async () => {
                  createTable(document.getElementById('throughputTable'));
                  createTable(document.getElementById('latencyTable'));

                  await renderProvidersList();
                  await renderHistoryList();
                  await updateProviderSelects();
                  await updateApiSelects();
              });
          <\/script> 
      </body>
      </html>
      `;

            return new Response(htmlContent, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });

        } else {
            return new Response('Not Found. Access the root path to use the tool.', { status: 404 });
        }
    }
};