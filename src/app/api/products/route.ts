import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    let filter: Record<string, string> = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const products = await Product.find(filter).sort({ created_at: -1 });
    return successResponse(products);
  } catch (error) {
    return errorResponse("Failed to fetch products", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return successResponse(product, 201);
  } catch (error) {
    return errorResponse("Failed to create product", 500);
  }
}
