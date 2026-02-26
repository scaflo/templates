import { S3Client, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import envConfig from "./env.config.js";
import { Request } from "express";
export interface CustomAWSRequest extends Request {
  s3Result?: PutObjectCommandOutput | PutObjectCommandOutput[];
}
const s3 = new S3Client({
  region: envConfig.AWS_REGION,
  credentials: {
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
  },
});

export { s3 };
