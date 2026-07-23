import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Farmer from "@/models/Farmer";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const farmers = await Farmer.find().select("-password").sort({ registration_Date: -1 });
    return successResponse(farmers);
  } catch (error) {
    return errorResponse("Failed to fetch farmers", 500);
  }
}
