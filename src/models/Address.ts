import mongoose, { Schema, Document } from "mongoose";

export interface IAddressDoc extends Document {
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  userId: mongoose.Types.ObjectId;
}

const AddressSchema = new Schema<IAddressDoc>({
  address: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
}, { timestamps: true });

export default mongoose.models.Address || mongoose.model<IAddressDoc>("Address", AddressSchema);
