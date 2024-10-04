import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: import.meta.env.REGION,
  credentials: {
    accessKeyId: import.meta.env.AWS_USER_ID,
    secretAccessKey: import.meta.env.AWS_PASS_KEY,
  },
});

const BUCKET_NAME = import.meta.env.AWS_S3_BUCKET_NAME;

export async function createPresignedPost({ key, contentType }) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const fileLink = `https://${BUCKET_NAME}.s3.${import.meta.env.REGION}.amazonaws.com/${key}`;

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 5 * 60, // 5 minutes - default is 15 mins
  });

  return { fileLink, signedUrl };
}