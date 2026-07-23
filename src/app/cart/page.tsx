"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

interface CartItem {
  _id: string;
  product_id: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
    category?: string;
  };
  quantity: number;
}

export default function CartPage() {
  const { t } = useLanguage();
  const { token } = useAuthStore();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCart = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setItems(data?.data || data || []);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const updateQuantity = async (cartId: string, newQty: number) => {
    if (newQty < 1) return removeItem(cartId);
    setUpdatingId(cartId);
    try {
      const res = await fetch(`/api/cart/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity: newQty }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item._id === cartId ? { ...item, quantity: newQty } : item))
        );
      }
    } catch {
      toast.error(t.failedToUpdate);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (cartId: string) => {
    try {
      const res = await fetch(`/api/cart/${cartId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== cartId));
        toast.success(t.itemRemoved);
      }
    } catch {
      toast.error(t.failedToRemove);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product_id?.price || 0) * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 49;
  const total = subtotal + delivery;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.loginToViewCart}</h2>
          <Link href="/login" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
            {t.login}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{t.shoppingCart}</h1>
          <Link href="/products/Seeds" className="text-green-600 hover:underline flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> {t.continueShopping}
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">{t.loading}</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.cartEmpty}</h2>
            <Link href="/products/Seeds" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              {t.shopNow}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                  <img
                    src={item.product_id?.image || item.product_id?.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=150"}
                    alt={item.product_id?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.product_id?.name}</h3>
                    <p className="text-green-700 font-bold mt-1">₹{item.product_id?.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={updatingId === item._id}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        disabled={updatingId === item._id}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-gray-800 whitespace-nowrap">
                    ₹{(item.product_id?.price || 0) * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{t.orderSummary}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.subtotal}</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.delivery}</span>
                  <span className="font-medium">{delivery === 0 ? t.free : `₹${delivery}`}</span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-green-600">{t.freeDeliveryAbove}</p>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.total}</span>
                  <span className="text-green-700">₹{total}</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/placeorder")}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-green-700 transition-colors"
              >
                {t.proceedToCheckout}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
