import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Farmer from "@/models/Farmer";
import { signToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { firstname, lastname, email, mobile_no, password } = body;

    if (!firstname || !lastname || !mobile_no || !password) {
      return errorResponse("First name, last name, mobile number and password are required");
    }

    const existingFarmer = await Farmer.findOne({ $or: [{ email }, { mobile_no }] });
    if (existingFarmer) {
      return errorResponse("Farmer with this email or mobile number already exists", 409);
    }

    const farmer = await Farmer.create({ firstname, lastname, email, mobile_no, password });
    const token = signToken({ id: farmer._id.toString(), mobile_no: farmer.mobile_no });

    const farmerObj = farmer.toObject();
    delete farmerObj.password;

    return successResponse({ token, farmer: farmerObj }, 201);
  } catch (error) {
    return errorResponse("Signup failed", 500);
  }
}
