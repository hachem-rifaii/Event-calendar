import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "../src/middleware/error";
import userRouter from "../src/routes/user.routes";
import eventRouter from "../src/routes/event.routes";

const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors configuration
app.use(cors({
  origin: ['https://event-calendar-iota-six.vercel.app'],
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// home route
app.get("/", (req, res) => {
  res.send("API is running");
});

// routes
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);



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
