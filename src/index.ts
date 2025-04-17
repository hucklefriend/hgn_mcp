import { MCP, MCPConfig } from '@modelcontextprotocol/sdk';
import { APIClient } from './api/client';

const config: MCPConfig = {
  // ここに設定を追加
};

// APIクライアントのインスタンス化
const apiClient = new APIClient();

async function main() {
  try {
    const mcp = new MCP(config);
    console.log('MCPが初期化されました');

    // APIクライアントの使用例
    const response = await apiClient.get('/endpoint');
    console.log('APIレスポンス:', response);
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

main();

