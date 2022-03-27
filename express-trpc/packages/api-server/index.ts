import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

interface ChatMessage {
  user: string;
  message: string;
}

const messages: ChatMessage[] = [
  { user: "user1", message: "message 1" },
  { user: "user2", message: "message 2" },
];

const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return "hello world sdfsdf";
    },
  })
  .query("getMessages", {
    input: z.number().default(10), // gets defined results, 10 is deafult
    resolve({ input }) {
      return messages.slice(-input);
    },
  })
  .mutation("addMessage", {
    input: z.object({
      user: z.string(),
      message: z.string(),
    }),
    resolve({ input }) {
      messages.push(input);
      return input;
    },
  });
//exposes types of app router, maintains types for the routes
export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    //context used for authorization, headers info
    createContext: () => null,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
