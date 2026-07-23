import mongoose, { Schema, Document } from "mongoose";

export interface IFarmerDoc extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile_no: string;
  address?: string;
  role: "farmer" | "admin";
  registration_Date: Date;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const FarmerSchema = new Schema<IFarmerDoc>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true },
  mobile_no: { type: String, unique: true, required: true },
  address: { type: String },
  role: { type: String, enum: ["farmer", "admin"], default: "farmer" },
  registration_Date: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

FarmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = await import("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

FarmerSchema.methods.comparePassword = async function (candidatePassword: string) {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Farmer || mongoose.model<IFarmerDoc>("Farmer", FarmerSchema);
