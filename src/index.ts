import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GameMakerMasterTool } from "./tools/game_maker_master_tool.js";
import { z } from "zod";
import * as dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

// Create an MCP server
const server = new McpServer({
  name: "HGN MCP Server",
  version: "1.0.0"
});

// ゲームメーカー
server.tool(
  "get_game_maker_list",
  "ゲームメーカーのリストを取得します。nameを空文字列以外で指定すると部分一致で検索します。",
  { name: z.string() },
  async ({ name }) => {
    return await GameMakerMasterTool.getList(name);
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
