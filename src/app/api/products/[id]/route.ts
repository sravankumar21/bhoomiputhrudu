import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const product = await Product.findById(id);
    if (!product) return errorResponse("Product not found", 404);
    return successResponse(product);
  } catch (error) {
    return errorResponse("Failed to fetch product", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!product) return errorResponse("Product not found", 404);
    return successResponse(product);
  } catch (error) {
    return errorResponse("Failed to update product", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return errorResponse("Product not found", 404);
    return successResponse({ message: "Product deleted successfully" });
  } catch (error) {
    return errorResponse("Failed to delete product", 500);
  }
}
