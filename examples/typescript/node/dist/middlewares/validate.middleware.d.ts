import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
export declare const validateRequest: (schemas: {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validate.middleware.d.ts.map