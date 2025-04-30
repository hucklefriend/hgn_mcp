#!/usr/bin/env node

import { McpClient } from "@modelcontextprotocol/sdk/client/mcp.js";
import { SpawnProcessTransport } from "@modelcontextprotocol/sdk/client/spawn.js";

async function main() {
  const transport = new SpawnProcessTransport({
    command: "node",
    args: ["build/index.js"]
  });
  
  const client = new McpClient({ transport });
  
  try {
    await client.connect();
    const result = await client.invokeFunction("get_game_maker_list", { name: "" });
    console.log(result.content[0].text);
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    await client.disconnect();
  }
}

main().catch(console.error); 