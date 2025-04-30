import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { config } from "../config/config.js";

/**
 * ツールの基底クラス
 */
export abstract class ToolBase {
  constructor(protected readonly server: McpServer) {
    this.server = server;
  }

  /**
   * HTTPリクエストを送信
   * 
   * @param url リクエスト先URL
   * @param method HTTPメソッド（GET, POST, PUT, DELETEなど）
   * @param params リクエストパラメータ（GETの場合はクエリパラメータ、それ以外はボディとして使用）
   * @returns レスポンス
   */
  protected static fetch(url: string, method: string = 'GET', params?: unknown) {
    const token = config.api.token;
    if (!token) {
      throw new Error('API_TOKEN is not defined');
    }

    const headers = new Headers({
      'X-GPTS-API-KEY': token
    });

    let requestUrl = url;
    const options: RequestInit = {
      method,
      headers
    };

    if (params) {
      if (method === 'GET') {
        // GETリクエストの場合はクエリパラメータとして設定
        const queryParams = new URLSearchParams();
        Object.entries(params as Record<string, string>).forEach(([key, value]) => {
          queryParams.append(key, value);
        });
        requestUrl = `${url}?${queryParams.toString()}`;
      } else {
        // GET以外の場合はボディとして設定
        headers.set('Content-Type', 'application/json');
        options.body = JSON.stringify(params);
      }
    }

    return fetch(requestUrl, options);
  }

  protected static getUrl(path: string)
  {
    const baseUrl = config.api.baseUrl;
    if (!baseUrl) {
      throw new Error('API_BASE_URL is not defined');
    }

    // baseUrlの末尾の/を削除
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    // pathの先頭の/を削除
    const normalizedPath = path.replace(/^\/+/, '');

    return `${normalizedBaseUrl}/${normalizedPath}`;
  }
}


