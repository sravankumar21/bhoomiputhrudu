import mongoose, { Schema, Document } from "mongoose";

export interface ICartDoc extends Document {
  quantity: number;
  added_date: Date;
  product_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  status: "active" | "purchased";
}

const CartSchema = new Schema<ICartDoc>({
  quantity: { type: Number, required: true },
  added_date: { type: Date, default: Date.now },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  status: { type: String, enum: ["active", "purchased"], default: "active" },
});

export default mongoose.models.Cart || mongoose.model<ICartDoc>("Cart", CartSchema);
