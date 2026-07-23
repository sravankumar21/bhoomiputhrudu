import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { product_id, url, alt_text } = body;

    if (!product_id || !url) {
      return errorResponse("Product ID and image URL are required");
    }

    const image = await Image.create({ product_id, url, alt_text });
    return successResponse(image, 201);
  } catch (error) {
    return errorResponse("Failed to upload image", 500);
  }
}
