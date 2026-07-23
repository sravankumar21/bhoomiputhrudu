import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ productId: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { productId } = await context.params;
    const wishlist = await Wishlist.find({ product_id: productId }).populate("product_id");
    if (!wishlist.length) return errorResponse("No wishlist entries found for this product", 404);
    return successResponse(wishlist);
  } catch (error) {
    return errorResponse("Failed to fetch wishlist", 500);
  }
}
