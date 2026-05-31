import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.S3_REGION || "eu-north-1";
const bucketName = process.env.S3_BUCKET_NAME || "pdf-store-s3";

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

/**
 * Uploads a file buffer to AWS S3 and returns the public file URL.
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder = "resumes"
): Promise<string> {
  const uniqueKey = `${folder}/${Date.now()}-${fileName.replace(/\s+/g, "_")}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      Body: fileBuffer,
      ContentType: contentType,
    })
  );

  // Return the public S3 URL of the uploaded file
  return `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueKey}`;
}
