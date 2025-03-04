import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./src/middleware/error";
import userRouter from "./src/routes/user.routes";
import eventRouter from "./src/routes/event.routes";
require("dotenv").config();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
  origin: ['https://event-calendar-6fx6.vercel.app'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
}));

// routes
app.use("/api/users" , userRouter)
app.use("/api/events" , eventRouter)


// unkown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.status = 404;
  res.send({
    message: "Route not found",
    statusCode: err.status,
  });
  next(err);
});
app.use(ErrorMiddleware);
