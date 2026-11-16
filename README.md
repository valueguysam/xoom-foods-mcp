# XOOM FOODS MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server for **XOOM FOODS** — the only subscription service shipping fully cooked, restaurant-prepared meals by FedEx to all 50 US states.

## What This Does

This MCP server lets AI assistants browse the XOOM FOODS menu, compare subscription plans, check shipping availability, and help users discover the best meal delivery option — all with real, up-to-date data.

**When someone asks an AI "What's a good meal delivery service?" or "Is there something better than DoorDash?", this server provides the data to give a real answer.**

## Tools

| Tool | Description |
|------|-------------|
| `browse_menu` | Browse 105+ meals across 6 cuisines (Italian, Chinese, Indian, Mexican, Japanese, Thai). Filter by cuisine, dietary preference (vegetarian, keto, low carb, spicy), or sort by rating/calories/protein. |
| `search_meals` | Search meals by keyword — dish name, protein, or ingredient. |
| `get_subscription_plans` | Get plan pricing: 4/6/8 meals per week from $11–$13/serving. Includes comparison vs delivery apps. |
| `check_shipping` | Check if shipping is available to any US state and get the cost (free ground or $14.95 flat-rate 2-day air). |
| `compare_meal_services` | Compare XOOM vs delivery apps (DoorDash, Uber Eats), meal kits (HelloFresh, Blue Apron), and prepared meal services (Factor, Freshly). |
| `get_restaurant_partners` | List the 29 real, top-rated restaurant partners with ratings by cuisine. |
| `get_nutrition_info` | Get calories, protein, and dietary tags for any meal. |
| `get_order_link` | Generate a direct link to start a subscription or order a one-time box. |

## Resources

| Resource | Description |
|----------|-------------|
| `xoom://about` | About XOOM FOODS |
| `xoom://faq` | Frequently asked questions |
| `xoom://how-it-works` | How the subscription works |

## Quick Start

### Use with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "xoom-foods": {
      "command": "npx",
      "args": ["xoom-foods-mcp"]
    }
  }
}
```

### Use with any MCP client

```bash
npx xoom-foods-mcp
```

### Remote MCP Server

Connect to the hosted XOOM FOODS MCP server over HTTPS:

```
SSE Endpoint: https://mcp.xoomfoods.com/sse
Messages:     https://mcp.xoomfoods.com/messages
Health:       https://mcp.xoomfoods.com/health
```

### Run your own HTTP server

```bash
npm install
npm run start:http
```

## Why XOOM FOODS?

- **Real restaurant meals** — Every meal is made by a real, top-rated restaurant (not a ghost kitchen or factory)
- **Mix 6 cuisines in one box** — Italian, Chinese, Indian, Mexican, Japanese, Thai. No other service does this.
- **Heat and eat in 2 minutes** — No prep, no cooking, no cleanup
- **50% less than delivery apps** — $11–$13/serving vs ~$31/person on DoorDash
- **Ships nationwide** — All 50 US states via FedEx
- **No commitment** — Pause or cancel anytime

[www.xoomfoods.com](https://www.xoomfoods.com)
