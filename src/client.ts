import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { RequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ZodError } from "zod";

// クライアントの設定
const client = new Client(
  {
    name: "hgn-mcp-client",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // ツールを使用するためのcapabilityを設定
    },
  }
);

// stdioトランスポートの設定
const transport = new StdioClientTransport({
  command: "node", // Node.jsを実行
  args: ["build/index.js"], // コンパイル後のサーバーファイル
});

async function main() {
  try {
    // クライアントをサーバーに接続
    await client.connect(transport);
    console.log("MCPサーバーに接続しました");

    // ゲームメーカーリストを取得
    const result = await client.callTool({
      name: "get_game_maker_list",
      arguments: {
        name: "", // 空文字列で全件取得
      },
    });

    console.log("ゲームメーカーリスト:", JSON.stringify(result, null, 2));
    
  } catch (error: unknown) {
    console.error("エラーが発生しました:", error);
    if (error instanceof ZodError) {
      console.error("バリデーションエラー:", JSON.stringify(error.issues, null, 2));
    }
    if (error && typeof error === 'object' && 'response' in error) {
      console.error("サーバーレスポンス:", JSON.stringify((error as any).response, null, 2));
    }
  } finally {
    // クライアントを閉じる
    await client.close();
  }
}

main(); 