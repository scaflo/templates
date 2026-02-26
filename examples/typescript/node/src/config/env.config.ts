import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  DB_URI: process.env.DB_URI || "",
  PORT: process.env.PORT || 4500,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL!,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD!,
  SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE!,
  RAZOR_KEY_ID: process.env.RAZOR_KEY_ID!,
  RAZOR_KEY_SECRET: process.env.RAZOR_KEY_SECRET!,
  RAZOR_WEBHOOK_SECRET: process.env.RAZOR_WEBHOOK_SECRET!,

  NODE_ENV: process.env.NODE_ENV,
  IS_PROD: process.env.NODE_ENV !== "dev",

  NODE_MAILER_EMAIL: process.env.NODEMAILER_EMAIL || "",
  NODE_MAILER_PASS: process.env.NODEMAILER_PASS || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: Number.parseInt(process.env.SMTP_PORT || "465", 10),

  // AWS
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION!,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  LOG_FILE_VALIDITY: process.env.LOG_FILE_VALIDITY || "1d",

  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || "",
};
export default envConfig;
