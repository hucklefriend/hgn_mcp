import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolBase } from "./tool_base.js";

export class GameMakerMasterTool extends ToolBase {

    static async getList(name: string)
    {
        const url = this.getUrl("game-makers");
        const response = await this.fetch(url, "GET", { name });

        return {
            content: [
              {
                type: "text" as const,
                text: await response.text()
              }
            ]
          };
    }
}
