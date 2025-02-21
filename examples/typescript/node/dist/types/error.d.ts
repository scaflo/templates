type ErrorType = {
    defaultMessage: string;
    statusCode: number;
    errorType: string;
    errorCode: string;
};
type ErrorKey = "VALIDATION_ERROR" | "NOT_FOUND_ERROR" | "UNAUTHORIZED_ERROR" | "FORBIDDEN_ERROR" | "INTERNAL_SERVER_ERROR" | "RATE_LIMITER_ERROR" | "CAST_ERROR" | "JWT_EXPIRED_ERROR" | "JWT_INVALID_ERROR" | "DUPLICATE_FIELD_ERROR" | "BAD_REQUEST_ERROR";
declare const ERROR_TYPES: Record<ErrorKey, ErrorType>;
export { ERROR_TYPES, ErrorKey };
//# sourceMappingURL=error.d.ts.map