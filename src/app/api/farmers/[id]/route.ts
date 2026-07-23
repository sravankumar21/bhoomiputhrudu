import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Farmer from "@/models/Farmer";
import { successResponse, errorResponse } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const farmer = await Farmer.findById(id).select("-password");
    if (!farmer) return errorResponse("Farmer not found", 404);
    return successResponse(farmer);
  } catch (error) {
    return errorResponse("Failed to fetch farmer", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const farmer = await Farmer.findByIdAndUpdate(id, body, { new: true }).select("-password");
    if (!farmer) return errorResponse("Farmer not found", 404);
    return successResponse(farmer);
  } catch (error) {
    return errorResponse("Failed to update farmer", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const farmer = await Farmer.findByIdAndDelete(id);
    if (!farmer) return errorResponse("Farmer not found", 404);
    return successResponse({ message: "Farmer deleted successfully" });
  } catch (error) {
    return errorResponse("Failed to delete farmer", 500);
  }
}
