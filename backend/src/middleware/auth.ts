import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../utils/ErrorHandler";

import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../model/user.model";
import { catchAsyncError } from './catchAsyncErrors';

export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(new ErrorHandler("Not authenticated", 400));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded.id) {
      return next(new ErrorHandler("access token is not valid", 400));
    }

    req.user = await userModel.findById(decoded.id);

    next();
  }
);
