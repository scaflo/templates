declare const envConfig: {
    NODE_ENV: string | undefined;
    PORT: string | number;
    DB_URI: string;
    JWT_SECRET: string;
    JWT_SECRET_EXPIRY: string;
    API_RATE_LIMIT_MAX: number;
    API_RATE_LIMIT_WINDOW_MS: number;
    OTP_RATE_LIMIT_MAX: number;
    OTP_RATE_LIMIT_WINDOW_MS: number;
    CORS_ORIGIN: string;
    REDIS_URL: string | undefined;
    REDIS_DEFAULT_TTL: number;
    LOG_FILE_VALIDITY: string;
    NODE_MAILER_EMAIL: string;
    NODE_MAILER_PASS: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_BUCKET_NAME: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    AWS_ACCESS_KEY_ID: string | undefined;
};
export default envConfig;
//# sourceMappingURL=env.config.d.ts.map