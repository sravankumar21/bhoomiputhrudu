"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function ManageProductsPage() {
  const { t } = useLanguage();
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const items = data?.data || data?.products || data;
      setProducts(Array.isArray(items) ? items : []);
    } catch {
      toast.error(t.failedToFetch);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success(t.deleted);
      } else {
        toast.error(t.failedToDelete);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-green-600 hover:text-green-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{t.manageProducts}</h1>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchProducts}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">{t.loading}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">{t.noProductsFound}</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.productName}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.category}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.price}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.stock}</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || product.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=50"}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{product.category}</td>
                      <td className="px-4 py-3 font-medium">₹{product.price}</td>
                      <td className="px-4 py-3 text-gray-600">{product.stock ?? "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          disabled={deletingId === product._id}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
