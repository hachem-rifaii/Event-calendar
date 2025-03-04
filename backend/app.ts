import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./src/middleware/error";
import userRouter from "./src/routes/user.routes";
import eventRouter from "./src/routes/event.routes";

const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "https://event-calendar-iota-six.vercel.app",
    credentials: true,
  })
);

// home route
app.use("/test", (req, res) => {
  res.send("helo from e-shop");
});

// Add asynchronous handling for long-running operations
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

// Example of an async route for a heavy operation
app.post("/api/long-operation", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await performHeavyTask(); // Assume this is a time-consuming task
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Dummy async function for long-running task simulation
async function performHeavyTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task completed");
    }, 5000); // Simulate a task taking 5 seconds
  });
}

// unknown route handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    message: "Route not found",
    statusCode: 404,
  });
});

// error handling middleware
app.use(ErrorMiddleware);

export default app;
