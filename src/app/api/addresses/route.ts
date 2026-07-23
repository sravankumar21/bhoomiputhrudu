import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Address from "@/models/Address";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const addresses = await Address.find({ user_id: decoded.id }).sort({ created_at: -1 });
    return successResponse(addresses);
  } catch (error) {
    return errorResponse("Failed to fetch addresses", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromHeaders(request);
    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    const body = await request.json();
    const { label, address_line1, address_line2, city, state, pincode, country } = body;

    if (!address_line1 || !city || !state || !pincode) {
      return errorResponse("Address line 1, city, state and pincode are required");
    }

    const address = await Address.create({
      user_id: decoded.id,
      label,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
    });

    return successResponse(address, 201);
  } catch (error) {
    return errorResponse("Failed to add address", 500);
  }
}
