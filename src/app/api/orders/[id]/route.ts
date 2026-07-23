import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const order = await Order.findById(id).populate("products.product_id");
    if (!order) return errorResponse("Order not found", 404);
    return successResponse(order);
  } catch (error) {
    return errorResponse("Failed to fetch order", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    if (!order) return errorResponse("Order not found", 404);
    return successResponse(order);
  } catch (error) {
    return errorResponse("Failed to update order", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return errorResponse("Order not found", 404);
    return successResponse({ message: "Order deleted successfully" });
  } catch (error) {
    return errorResponse("Failed to delete order", 500);
  }
}
