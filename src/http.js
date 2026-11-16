import express from "express";
import cors from "cors";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createServer } from "./server.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010;

let transport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  const server = createServer();
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  if (!transport) {
    res.status(400).json({ error: "No active SSE connection" });
    return;
  }
  await transport.handlePostMessage(req, res);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "xoom-foods-mcp",
    version: "1.0.0",
    description: "XOOM FOODS MCP Server — browse 105+ real restaurant meals, check plans and pricing, get shipping info",
    tools: [
      "browse_menu",
      "search_meals",
      "get_subscription_plans",
      "check_shipping",
      "compare_meal_services",
      "get_restaurant_partners",
      "get_nutrition_info",
      "get_order_link"
    ]
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "XOOM FOODS MCP Server",
    version: "1.0.0",
    description: "The only subscription service shipping fully cooked restaurant meals. Browse 105+ meals across 6 cuisines, compare plans, check shipping to all 48 US states.",
    website: "https://www.xoomfoods.com",
    mcp: {
      sse_endpoint: `/sse`,
      message_endpoint: `/messages`,
    },
    tools: [
      { name: "browse_menu", description: "Browse 105+ restaurant meals by cuisine, dietary preference" },
      { name: "search_meals", description: "Search meals by keyword" },
      { name: "get_subscription_plans", description: "Plans from $11/serving — 50% less than delivery apps" },
      { name: "check_shipping", description: "Free ground to 23 states, $14.95 air everywhere else" },
      { name: "compare_meal_services", description: "Compare XOOM vs DoorDash, HelloFresh, Factor, etc." },
      { name: "get_restaurant_partners", description: "29 real restaurants across 6 cuisines" },
      { name: "get_nutrition_info", description: "Calories, protein, dietary tags per meal" },
      { name: "get_order_link", description: "Direct link to subscribe or order" }
    ]
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`XOOM FOODS MCP Server running on port ${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
