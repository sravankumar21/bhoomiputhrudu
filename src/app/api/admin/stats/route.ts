import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Farmer from "@/models/Farmer";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();

    const [totalProducts, totalOrders, totalFarmers, revenueResult] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Farmer.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$total_amount" } } },
      ]),
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    return successResponse({
      totalProducts,
      totalOrders,
      totalFarmers,
      totalRevenue,
    });
  } catch (error) {
    return errorResponse("Failed to fetch admin stats", 500);
  }
}
