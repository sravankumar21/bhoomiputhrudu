import mongoose, { Schema, Document } from "mongoose";

export interface IProductDoc extends Document {
  name: string;
  name_telugu?: string;
  price: number;
  discount_price?: number;
  category: string;
  subcategory?: string;
  specifications?: Record<string, string>;
  stock_quantity: number;
  description?: string;
  description_telugu?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProductDoc>({
  name: { type: String, required: true },
  name_telugu: { type: String },
  price: { type: Number, required: true },
  discount_price: { type: Number },
  category: { type: String, required: true },
  subcategory: { type: String },
  specifications: { type: Schema.Types.Mixed },
  stock_quantity: { type: Number, required: true },
  description: { type: String },
  description_telugu: { type: String },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

ProductSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model<IProductDoc>("Product", ProductSchema);
