import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const orders = await Order.find({ user_id: decoded.id })
      .populate("products.product_id")
      .sort({ order_date: -1 });
    return successResponse(orders);
  } catch (error) {
    return errorResponse("Failed to fetch orders", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const body = await request.json();
    const { products, address, payment_method, total_amount } = body;

    if (!products || !products.length) {
      return errorResponse("Products are required");
    }

    const order = await Order.create({
      user_id: decoded.id,
      products,
      address,
      payment_method,
      total_amount,
      order_date: new Date(),
      status: "pending",
    });

    await Cart.updateMany({ user_id: decoded.id, status: "active" }, { status: "ordered" });

    return successResponse(order, 201);
  } catch (error) {
    return errorResponse("Failed to create order", 500);
  }
}
