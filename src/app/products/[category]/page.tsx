"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function CategoryPage() {
  const { t } = useLanguage();
  const { token } = useAuthStore();
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        const items = data?.data || data?.products || data;
        setProducts(Array.isArray(items) ? items : []);
      })
      .catch(() => toast.error(t.failedToFetch))
      .finally(() => setLoading(false));
  }, [category]);

  const addToCart = async (productId: string) => {
    if (!token) {
      toast.error(t.loginToAddToCart);
      return;
    }
    setAddingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (res.ok) {
        toast.success(t.addedToCart);
      } else {
        const data = await res.json();
        toast.error(data?.message || t.failedToAdd);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products" className="text-green-600 hover:text-green-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t[category] || category}
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">{t.loading}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">{t.noProductsFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <img
                  src={product.image || product.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=300"}
                  alt={product.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  {product.subcategory && (
                    <p className="text-xs text-green-600 font-medium mb-1">{product.subcategory}</p>
                  )}
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-green-700 font-bold text-lg">₹{product.price}</p>
                    <button
                      onClick={() => addToCart(product._id)}
                      disabled={addingId === product._id}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
