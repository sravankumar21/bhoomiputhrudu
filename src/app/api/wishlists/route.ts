import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    let filter: Record<string, string> = {};
    if (email) filter.email = email;

    const wishlists = await Wishlist.find(filter)
      .populate("product_id")
      .sort({ added_date: -1 });
    return successResponse(wishlists);
  } catch (error) {
    return errorResponse("Failed to fetch wishlists", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, product_id } = body;

    if (!email || !product_id) {
      return errorResponse("Email and product ID are required");
    }

    const existing = await Wishlist.findOne({ email, product_id });
    if (existing) {
      return errorResponse("Product already in wishlist", 409);
    }

    const wishlist = await Wishlist.create({
      email,
      product_id,
      added_date: new Date(),
    });

    const populated = await wishlist.populate("product_id");
    return successResponse(populated, 201);
  } catch (error) {
    return errorResponse("Failed to add to wishlist", 500);
  }
}
