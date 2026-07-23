export interface IFarmer {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile_no: string;
  address?: string;
  role: "farmer" | "admin";
  registration_Date: Date;
  password?: string;
}

export interface IProduct {
  _id: string;
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

export interface ICart {
  _id: string;
  quantity: number;
  added_date: Date;
  product_id: IProduct;
  user_id: string;
  status: "active" | "purchased";
}

export interface IOrder {
  _id: string;
  order_date: Date;
  quantity: number;
  total_price: number;
  farmer_id: string;
  product_id: IProduct;
  addressId: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

export interface IImage {
  _id: string;
  image_url: string;
  image_type: string;
  is_primary: boolean;
  product_id: string;
}

export interface IAddress {
  _id: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  userId: string;
}

export interface IWishlist {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  productId: string;
}

export interface JWTPayload {
  id: string;
  mobile_no: string;
}
