import { ERROR_TYPES } from "../types/error.js";
class AppError extends Error {
    statusCode;
    errorType;
    errorCode;
    isOperational;
    data;
    constructor(errorKey, message, data) {
        const { defaultMessage, statusCode, errorType, errorCode } = ERROR_TYPES[errorKey];
        super(message || defaultMessage);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.errorCode = errorCode;
        this.isOperational = true;
        this.data = data;
        // Error.captureStackTrace(this, this.constructor);
    }
}
class ValidationError extends AppError {
    validationMessages;
    constructor(validationMessages, message) {
        super("VALIDATION_ERROR", message);
        this.validationMessages = validationMessages || [];
    }
}
class NotFoundError extends AppError {
    constructor(message) {
        super("NOT_FOUND_ERROR", message);
    }
}
class UnauthorizedError extends AppError {
    constructor(message) {
        super("UNAUTHORIZED_ERROR", message);
    }
}
class ForbiddenError extends AppError {
    constructor(message) {
        super("FORBIDDEN_ERROR", message);
    }
}
class RateLimiterError extends AppError {
    constructor(message) {
        super("RATE_LIMITER_ERROR", message);
    }
}
class JwtExpiredError extends AppError {
    constructor(message) {
        super("JWT_EXPIRED_ERROR", message);
    }
}
class BadRequestError extends AppError {
    constructor(message) {
        super("BAD_REQUEST_ERROR", message);
    }
}
class InternalServerError extends AppError {
    constructor(message) {
        super("INTERNAL_SERVER_ERROR", message);
    }
}
class CastError extends AppError {
    constructor(message) {
        super("CAST_ERROR", message);
    }
}
class DuplicateFieldError extends AppError {
    constructor(message) {
        super("DUPLICATE_FIELD_ERROR", message);
    }
}
class JwtInvalidError extends AppError {
    constructor(message, data) {
        super("JWT_INVALID_ERROR", message, data);
    }
}
export { AppError, BadRequestError, CastError, DuplicateFieldError, ForbiddenError, InternalServerError, JwtExpiredError, JwtInvalidError, NotFoundError, RateLimiterError, UnauthorizedError, ValidationError, };
