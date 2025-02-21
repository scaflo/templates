import { PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";
export interface CustomAWSRequest extends Request {
    s3Result?: PutObjectCommandOutput | PutObjectCommandOutput[];
}
declare const s3: S3Client;
export { s3 };
//# sourceMappingURL=aws.config.d.ts.map