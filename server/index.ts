import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World");
});

console.log(`Running on http://localhost:3000`);

serve({
  fetch: app.fetch,
});
