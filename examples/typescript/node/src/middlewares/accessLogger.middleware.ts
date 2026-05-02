import morgan from "morgan";
import type { Request, Response } from "express";
import { logger } from "@/utils/Logger.js";

interface AccessLogPayload {
  requestId: string;
  method: string;
  url: string;
  status: number;
  responseTimeMs: number;
  ip: string;
  contentLength: string;
  referrer: string;
  userAgent?: string; // optional → must NOT be undefined
}

export const accessLoggerMiddleware = morgan(
  (tokens, req: Request, res: Response): string => {
    const method = tokens.method?.(req, res) ?? "";
    const url = tokens.url?.(req, res) ?? "";
    const status = Number(tokens.status?.(req, res) ?? 0);
    const responseTime = parseFloat(
      tokens["response-time"]?.(req, res) ?? "0"
    );
    const ip = tokens["remote-addr"]?.(req, res) ?? "";
    const userAgent = tokens["user-agent"]?.(req, res);
    const contentLength =
      tokens.res?.(req, res, "content-length") ?? "0";
    const referrer = tokens.referrer?.(req, res) ?? "";

    const payload: AccessLogPayload = {
      requestId: req.requestId,
      method,
      url,
      status,
      responseTimeMs: responseTime,
      ip,
      contentLength,
      referrer,
      ...(userAgent ? { userAgent } : {}), // ✅ only include if defined
    };

    return JSON.stringify(payload);
  },
  {
    stream: {
      write: (message: string) => {
        try {
          logger.info(JSON.parse(message));
        } catch {
          logger.info({ raw: message });
        }
      },
    },
  }
);