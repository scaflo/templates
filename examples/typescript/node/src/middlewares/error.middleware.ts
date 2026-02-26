import envConfig from "$/config/env.config.js";
import { AppError, ValidationError } from "$/utils/appError.js";
import { logger } from "$/utils/Logger.js";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// interface AppError extends Error {
//   statusCode?: number;
//   errorCode?: string;
// }

export const notFoundMiddleware = (req: Request, res: Response): void => {
  logger.warn({
    event: "route_not_found",
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(404).json({
    success: false,
    message: "Route not found",
    requestId: req.requestId,
  });
};

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode ?? 500;

  // const validationMessages = err.validationMessages;
  const message = err.message;

  logger.error({
    event: "application_error",
    requestId: req.requestId,
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  if (err instanceof ZodError) {
    res.badRequest({
      statusCode: 400,
      message: err.issues[0].message,
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."), // ex: "email", "user.address.zip"
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof ValidationError) {
    res.badRequest({
      statusCode: 400,
      message,
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message:
      envConfig.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    errorCode: err.errorCode ?? "UNKNOWN_ERROR",
    requestId: req.requestId,
  });
};
