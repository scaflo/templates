import { S3Client } from "@aws-sdk/client-s3";
import envConfig from "./env.config.js";
const s3 = new S3Client({
    region: envConfig.AWS_REGION,
    credentials: {
        accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
    },
});
export { s3 };
