import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z, ZodError } from "zod";
import { config } from "dotenv";

config();

const app = new Hono();
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (c) => {
  return c.text("Hello World");
});

app.post("/api/generate-question", async (c) => {
  try {
    const validator = z.object({
      topic: z.enum(
        [
          "JavaScript",
          "Python",
          "React.js",
          "Next.js",
          "React Native",
          "Java",
          "C",
          "C++",
        ],
        { message: "Topic is invalid" }
      ),
    });
    const data = await c.req.json();
    const { topic } = await validator.parseAsync(data);

    const res = await model.generateContent(
      `Give me a MCQ question on the topic of ${topic}. The response should be in the form: {question: string; option1: string; option2: string; option3: string; option4: string; rightAnswer: "option1" | "option2" | "option3" | "option4"}. Only respond in the specified format's JSON-encoded string. Do not include anything else in the response. Double check the question and make sure there is no mistake.`
    );
    const question = JSON.parse(res.response.text());

    c.status(200);
    return c.json({ question });
  } catch (error) {
    if (error instanceof ZodError) {
      c.status(422);
      return c.json({ error: error.errors[0].message });
    } else {
      c.status(500);
      return c.json({ error: "Some error occured. Please try again later" });
    }
  }
});

console.log(`Running on http://localhost:3000`);

serve({
  fetch: app.fetch,
});
