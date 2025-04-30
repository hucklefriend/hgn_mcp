import { z } from 'zod';
import { configValues } from './values.js';

// 設定のスキーマ定義
const configSchema = z.object({
  api: z.object({
    baseUrl: z.string().url(),
    token: z.string()
  })
});

// 設定の型定義
export type Config = z.infer<typeof configSchema>;

// 設定の検証
configSchema.parse(configValues);

export { configValues as config }; 