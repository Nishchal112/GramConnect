import dotenv from 'dotenv';
dotenv.config();
import { S3Client } from '@aws-sdk/client-s3'

export const configAWS = async () => {
    // console.log('configuring AWS');
    // console.log(process.env.AWS_ACCESS_KEY_ID);
    // console.log(process.env.AWS_SECRET_ACCESS_KEY_ID);
    // console.log(process.env.REGION);
    const s3 = new S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID
        }
    });
    return new Promise((resolve, reject) => {
        resolve(s3);
    });
}
