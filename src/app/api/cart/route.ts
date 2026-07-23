import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const cartItems = await Cart.find({ user_id: decoded.id, status: "active" })
      .populate("product_id")
      .sort({ added_date: -1 });
    return successResponse(cartItems);
  } catch (error) {
    return errorResponse("Failed to fetch cart", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const { product_id, quantity = 1 } = await request.json();

    if (!product_id) return errorResponse("Product ID is required");

    const existingItem = await Cart.findOne({
      user_id: decoded.id,
      product_id,
      status: "active",
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      const populated = await existingItem.populate("product_id");
      return successResponse(populated);
    }

    const cartItem = await Cart.create({
      product_id,
      user_id: decoded.id,
      quantity,
    });
    const populated = await cartItem.populate("product_id");
    return successResponse(populated, 201);
  } catch (error) {
    return errorResponse("Failed to add to cart", 500);
  }
}
