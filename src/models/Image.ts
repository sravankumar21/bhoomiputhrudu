import mongoose, { Schema, Document } from "mongoose";

export interface IImageDoc extends Document {
  image_url: string;
  image_type: string;
  is_primary: boolean;
  product_id: mongoose.Types.ObjectId;
}

const ImageSchema = new Schema<IImageDoc>({
  image_url: { type: String, required: true },
  image_type: { type: String, required: true },
  is_primary: { type: Boolean, default: false },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export default mongoose.models.Image || mongoose.model<IImageDoc>("Image", ImageSchema);
