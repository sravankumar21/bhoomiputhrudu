import mongoose, { Schema, Document } from "mongoose";

export interface IOrderDoc extends Document {
  order_date: Date;
  quantity: number;
  total_price: number;
  farmer_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  addressId: mongoose.Types.ObjectId;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

const OrderSchema = new Schema<IOrderDoc>({
  order_date: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
  farmer_id: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
});

export default mongoose.models.Order || mongoose.model<IOrderDoc>("Order", OrderSchema);
