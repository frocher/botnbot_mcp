# BotnBot MCP

A Model Context Protocol (MCP) server implementation for monitoring website performance and environmental impact.

## Features

- Monitor website availability and performance
- Track CO2 emissions and environmental impact
- Get detailed metrics about website performance
- Support for multiple monitoring periods (24h, 7d, 30d)

## Installation

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/botnbot_mcp.git
cd botnbot_mcp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```env
API_URL=your_api_url
API_TOKEN=your_api_token
```

### Docker Installation

1. Build the Docker image:
```bash
docker build -t botnbot_mcp .
```

2. Run the container:
```bash
docker run -d \
  --name botnbot_mcp \
  -e API_URL=your_api_url \
  -e API_TOKEN=your_api_token \
  botnbot_mcp
```

## Usage

### Local Usage

Run the MCP server:
```bash
npm start
```

You can also provide configuration via command line arguments:
```bash
npm start -- --url "your_api_url" --token "your_api_token"
```

### Docker Usage

Run the container with environment variables:
```bash
docker run -d \
  --name botnbot_mcp \
  -e API_URL=your_api_url \
  -e API_TOKEN=your_api_token \
  botnbot_mcp
```

Or with command line arguments:
```bash
docker run -d \
  --name botnbot_mcp \
  botnbot_mcp npm start -- --url "your_api_url" --token "your_api_token"
```

## API Endpoints

- `GET /monitors` - List all monitors
- `GET /monitor/:id/co2` - Get CO2 metrics for a specific monitor
- `GET /monitor/:id/health` - Get health status for a specific monitor
- `GET /monitor/:id/performance` - Get performance metrics for a specific monitor

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 