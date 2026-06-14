import { v2 as cloudinary } from "cloudinary";

function ensureConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

/**
 * Upload a file buffer to Cloudinary and return the secure URL.
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  resourceType: "raw" | "image",
  folder: string
): Promise<string> {
  ensureConfig();

  const publicId = `${Date.now()}-${sanitizeFileName(fileName).replace(/\.[^.]+$/, "")}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: publicId,
        ...(resourceType === "raw" && fileName.toLowerCase().endsWith(".pdf")
          ? { format: "pdf" }
          : {}),
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
}

export async function uploadPdfToCloudinary(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  return uploadToCloudinary(fileBuffer, fileName, "raw", "jobzz/resumes");
}

export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  return uploadToCloudinary(fileBuffer, fileName, "image", "jobzz/avatars");
}
