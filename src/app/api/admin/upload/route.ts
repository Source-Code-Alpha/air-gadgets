import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { minioClient, BUCKET_NAME } from "@/lib/minio";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB" },
        { status: 400 }
      );
    }

    // Ensure bucket exists
    const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
    if (!bucketExists) {
      await minioClient.makeBucket(BUCKET_NAME);
      // Set bucket policy to public read
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `products/${randomUUID()}.${ext}`;

    // Upload to MinIO
    const buffer = Buffer.from(await file.arrayBuffer());
    await minioClient.putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": file.type,
    });

    // Build public URL
    const endpoint = process.env.MINIO_ENDPOINT || "192.168.1.43";
    const port = process.env.MINIO_PORT || "9000";
    const url = `http://${endpoint}:${port}/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
