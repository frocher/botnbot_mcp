import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Load environment variables from .env file
dotenv.config();

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('url', {
    type: 'string',
    description: 'API URL',
  })
  .option('token', {
    type: 'string',
    description: 'API Token',
  })
  .parseSync();

// Get API URL and token from arguments or environment variables
const API_URL = argv.url || process.env.API_URL;
const API_TOKEN = argv.token || process.env.API_TOKEN;

if (!API_URL) {
  throw new Error('API URL must be provided either as a command line argument (--url) or in the .env file (API_URL)');
}

if (!API_TOKEN) {
  throw new Error('API Token must be provided either as a command line argument (--token) or in the .env file (API_TOKEN)');
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
  "get-monitors",
  "Get a list of monitors",
  {},
  async () => {
    const monitorsData = await makeAPIRequest<any>(API_URL + "/monitors", API_TOKEN);

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