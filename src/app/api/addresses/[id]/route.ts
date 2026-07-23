import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Address from "@/models/Address";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const address = await Address.findByIdAndUpdate(id, body, { new: true });
    if (!address) return errorResponse("Address not found", 404);
    return successResponse(address);
  } catch (error) {
    return errorResponse("Failed to update address", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const address = await Address.findByIdAndDelete(id);
    if (!address) return errorResponse("Address not found", 404);
    return successResponse({ message: "Address deleted successfully" });
  } catch (error) {
    return errorResponse("Failed to delete address", 500);
  }
}
