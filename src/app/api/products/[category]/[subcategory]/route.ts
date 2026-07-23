import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ category: string; subcategory: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { category, subcategory } = await context.params;
    const products = await Product.find({ category, subcategory }).sort({ created_at: -1 });
    return successResponse(products);
  } catch (error) {
    return errorResponse("Failed to fetch products", 500);
  }
}
