import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Farmer from "@/models/Farmer";
import { signToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { mobile_no, password } = await request.json();

    if (!mobile_no || !password) {
      return errorResponse("Mobile number and password are required");
    }

    const farmer = await Farmer.findOne({ mobile_no });
    if (!farmer) {
      return errorResponse("Invalid mobile number or password", 401);
    }

    const isMatch = await farmer.comparePassword(password);
    if (!isMatch) {
      return errorResponse("Invalid mobile number or password", 401);
    }

    const token = signToken({ id: farmer._id.toString(), mobile_no: farmer.mobile_no });

    const farmerObj = farmer.toObject();
    delete farmerObj.password;

    return successResponse({ token, farmer: farmerObj });
  } catch (error) {
    return errorResponse("Login failed", 500);
  }
}
