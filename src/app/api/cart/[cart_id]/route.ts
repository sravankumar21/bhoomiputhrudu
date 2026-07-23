import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ cart_id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { cart_id } = await context.params;
    const { quantity } = await request.json();
    if (!quantity || quantity < 1) return errorResponse("Valid quantity is required");
    const cartItem = await Cart.findByIdAndUpdate(cart_id, { quantity }, { new: true }).populate("product_id");
    if (!cartItem) return errorResponse("Cart item not found", 404);
    return successResponse(cartItem);
  } catch (error) {
    return errorResponse("Failed to update cart", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { cart_id } = await context.params;
    const cartItem = await Cart.findByIdAndDelete(cart_id);
    if (!cartItem) return errorResponse("Cart item not found", 404);
    return successResponse({ message: "Item removed from cart" });
  } catch (error) {
    return errorResponse("Failed to remove from cart", 500);
  }
}
