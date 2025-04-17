import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.API_BASE_URL) {
  throw new Error('API_BASE_URLが設定されていません');
}

export class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`APIリクエストエラー: ${error.message}`);
      }
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`APIリクエストエラー: ${error.message}`);
      }
      throw error;
    }
  }

  // 必要に応じて他のHTTPメソッド（put, delete, patchなど）も追加できます
} 