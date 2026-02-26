import morgan from "morgan";
import { Request, Response } from "express";
import { logger } from "$/utils/Logger.js";

interface AccessLogPayload {
  requestId: string;
  method: string;
  url: string;
  status: number;
  responseTimeMs: number;
  ip: string;
  userAgent: string | undefined;
}

export const accessLoggerMiddleware = morgan(
  (tokens, req: Request, res: Response): string => {
    const payload: AccessLogPayload = {
      requestId: req.requestId,
      method: tokens.method(req, res) ?? "",
      url: tokens.url(req, res) ?? "",
      status: Number(tokens.status(req, res)),
      responseTimeMs: Number(tokens["response-time"](req, res)),
      ip: tokens["remote-addr"](req, res) ?? "",
      userAgent: tokens["user-agent"](req, res),
    };

    return JSON.stringify(payload);
  },
  {
    stream: {
      write: (message: string) => {
        logger.info(JSON.parse(message));
      },
    },
  },
);
