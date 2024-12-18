// src/app/api/uploads/route.ts

import { v2 as cloudinary } from 'cloudinary';
import { NextRequest } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const base64String = Buffer.from(buffer).toString('base64');

  const uploadResponse = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64String}`
  );

  return new Response(JSON.stringify({ url: uploadResponse.secure_url }), { status: 200 });
}
