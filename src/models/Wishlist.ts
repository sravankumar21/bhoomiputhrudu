import mongoose, { Schema, Document } from "mongoose";

export interface IWishlistDoc extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  productId: mongoose.Types.ObjectId;
}

const WishlistSchema = new Schema<IWishlistDoc>({
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
}, { timestamps: true });

export default mongoose.models.Wishlist || mongoose.model<IWishlistDoc>("Wishlist", WishlistSchema);
