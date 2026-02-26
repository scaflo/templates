import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export const requestContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestId = req.header("x-request-id") ?? uuid();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  next();
};
