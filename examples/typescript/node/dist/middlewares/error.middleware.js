import envConfig from "../config/env.config.js";
import { ValidationError } from "../utilities/appError.js";
export const notFoundMiddleware = (req, res) => {
    console.warn(`⚠️ 404 - Route [${req.method}] ${req.originalUrl} not found`);
    res.status(404).json({
        success: false,
        message: `Route [${req.method}] ${req.originalUrl} not found`,
    });
};
export const errorHandler = (err, req, res, _next) => {
    const { statusCode = 500, errorCode = "UNKNOWN_ERROR", message = "An unexpected error occurred", validationMessages, } = err;
    console.error(`[${errorCode}] ${message} - Method: ${req.method} - URL: ${req.originalUrl}\n${envConfig.NODE_ENV === "development" ? err.stack : ""}`);
    if (err instanceof ValidationError) {
        res.status(400).json({
            success: false,
            message,
            errorCode: "VALIDATION_ERROR",
            errors: validationMessages,
        });
        return;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorCode,
        error: envConfig.NODE_ENV === "development" ? err.stack : undefined,
    });
    return;
};
