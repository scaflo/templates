/**
 * @typedef {Object} ErrorType
 * @property {string} defaultMessage
 * @property {number} statusCode
 * @property {string} errorType
 * @property {string} errorCode
 */

/**
 * @typedef {"VALIDATION_ERROR" | "NOT_FOUND_ERROR" | "UNAUTHORIZED_ERROR" |
 * "FORBIDDEN_ERROR" | "INTERNAL_SERVER_ERROR" | "RATE_LIMITER_ERROR" |
 * "CAST_ERROR" | "JWT_EXPIRED_ERROR" | "JWT_INVALID_ERROR" | "DUPLICATE_FIELD_ERROR" |
 * "BAD_REQUEST_ERROR"} ErrorKey
 */

/** @type {Record<ErrorKey, ErrorType>} */
const ERROR_TYPES = {
  VALIDATION_ERROR: {
    defaultMessage: "Validation Error",
    statusCode: 400,
    errorType: "ValidationError",
    errorCode: "VALIDATION_ERROR",
  },
  NOT_FOUND_ERROR: {
    defaultMessage: "Resource Not Found",
    statusCode: 404,
    errorType: "NotFoundError",
    errorCode: "NOT_FOUND_ERROR",
  },
  UNAUTHORIZED_ERROR: {
    defaultMessage: "Unauthorized Access",
    statusCode: 401,
    errorType: "UnauthorizedError",
    errorCode: "UNAUTHORIZED_ERROR",
  },
  FORBIDDEN_ERROR: {
    defaultMessage: "Forbidden Access",
    statusCode: 403,
    errorType: "ForbiddenError",
    errorCode: "FORBIDDEN_ERROR",
  },
  INTERNAL_SERVER_ERROR: {
    defaultMessage: "Internal Server Error",
    statusCode: 500,
    errorType: "InternalServerError",
    errorCode: "INTERNAL_SERVER_ERROR",
  },
  RATE_LIMITER_ERROR: {
    defaultMessage: "Too Many Requests",
    statusCode: 429,
    errorType: "RateLimiterError",
    errorCode: "RATE_LIMITER_ERROR",
  },
  CAST_ERROR: {
    defaultMessage: "Invalid resource identifier",
    statusCode: 400,
    errorType: "CastError",
    errorCode: "CAST_ERROR",
  },
  JWT_EXPIRED_ERROR: {
    defaultMessage: "Token has expired. Please log in again.",
    statusCode: 401,
    errorType: "TokenExpiredError",
    errorCode: "JWT_EXPIRED_ERROR",
  },
  JWT_INVALID_ERROR: {
    defaultMessage: "Invalid token. Please log in again.",
    statusCode: 401,
    errorType: "JsonWebTokenError",
    errorCode: "JWT_INVALID_ERROR",
  },
  DUPLICATE_FIELD_ERROR: {
    defaultMessage: "Duplicate field value. Please use another value!",
    statusCode: 400,
    errorType: "DuplicateFieldError",
    errorCode: "DUPLICATE_FIELD_ERROR",
  },
  BAD_REQUEST_ERROR: {
    defaultMessage: "Bad Request",
    statusCode: 400,
    errorType: "BadRequestError",
    errorCode: "BAD_REQUEST_ERROR",
  },
};

export { ERROR_TYPES };

/**
 * @class
 * @extends Error
 */
class AppError extends Error {
  constructor(errorKey, message, data) {
    const { defaultMessage, statusCode, errorType, errorCode } =
      ERROR_TYPES[errorKey];
    super(message || defaultMessage);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.isOperational = true;
    this.data = data;
  }
}

class ValidationError extends AppError {
  constructor(validationMessages = [], message) {
    super("VALIDATION_ERROR", message);
    this.validationMessages = validationMessages;
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

export {
  AppError,
  BadRequestError,
  CastError,
  DuplicateFieldError,
  ForbiddenError,
  InternalServerError,
  JwtExpiredError,
  JwtInvalidError,
  NotFoundError,
  RateLimiterError,
  UnauthorizedError,
  ValidationError,
};
