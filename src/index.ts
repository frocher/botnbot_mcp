import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

if (!API_URL) {
  throw new Error('API_URL environment variable is not set');
}

if (!API_TOKEN) {
  throw new Error('API_TOKEN environment variable is not set');
}

// Create server instance
const server = new McpServer({
  name: "botnbot_mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function for making API requests
async function makeAPIRequest<T>(url: string, token: string): Promise<T | null> {
  const headers = {
    "Authorization": token,
    "Accept": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making API request:", error);
    return null;
  }
}

// Register monitors tool
server.tool(
  "monitors",
  "Get monitors data from the API",
  {},
  async () => {
    const monitorsData = await makeAPIRequest<any>(API_URL, API_TOKEN);

    if (!monitorsData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve monitors data",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(monitorsData, null, 2),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});