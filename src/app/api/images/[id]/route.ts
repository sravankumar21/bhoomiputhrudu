import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ImageModel from "@/models/Image";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const images = await ImageModel.find({ product_id: id });
    return successResponse(images);
  } catch (error) {
    return errorResponse("Failed to fetch images", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const image = await ImageModel.findByIdAndUpdate(id, body, { new: true });
    if (!image) return errorResponse("Image not found", 404);
    return successResponse(image);
  } catch (error) {
    return errorResponse("Failed to update image", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const image = await ImageModel.findByIdAndDelete(id);
    if (!image) return errorResponse("Image not found", 404);
    return successResponse({ message: "Image deleted successfully" });
  } catch (error) {
    return errorResponse("Failed to delete image", 500);
  }
}
