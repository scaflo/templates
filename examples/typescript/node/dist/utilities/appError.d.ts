import { ErrorKey } from "../types/error.js";
declare class AppError extends Error {
    statusCode: number;
    errorType: string;
    errorCode: string;
    isOperational: boolean;
    data: any;
    constructor(errorKey: ErrorKey, message?: string, data?: any);
}
declare class ValidationError extends AppError {
    validationMessages: string[];
    constructor(validationMessages?: string[], message?: string);
}
declare class NotFoundError extends AppError {
    constructor(message?: string);
}
declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
declare class RateLimiterError extends AppError {
    constructor(message?: string);
}
declare class JwtExpiredError extends AppError {
    constructor(message?: string);
}
declare class BadRequestError extends AppError {
    constructor(message?: string);
}
declare class InternalServerError extends AppError {
    constructor(message?: string);
}
declare class CastError extends AppError {
    constructor(message?: string);
}
declare class DuplicateFieldError extends AppError {
    constructor(message?: string);
}
declare class JwtInvalidError extends AppError {
    constructor(message?: string, data?: any);
}
export { AppError, BadRequestError, CastError, DuplicateFieldError, ForbiddenError, InternalServerError, JwtExpiredError, JwtInvalidError, NotFoundError, RateLimiterError, UnauthorizedError, ValidationError, };
//# sourceMappingURL=appError.d.ts.map