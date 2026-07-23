"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Search, Package } from "lucide-react";
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
      toast.error(t.admin.failedToFetch);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm(t.admin.confirmDelete)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success(t.admin.deleted);
      } else {
        toast.error(t.admin.failedToDelete);
      }
    } catch {
      toast.error(t.admin.somethingWentWrong);
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
    <div className="relative min-h-screen bg-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-blob h-[500px] w-[500px] -right-32 -top-32 bg-primary" />
        <div className="ambient-blob h-[400px] w-[400px] -left-20 bottom-20 bg-primary-light" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Products</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-semibold text-text">{t.admin.manageProducts}</h1>
          </div>
        </div>

        <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-5 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.admin.searchProducts}
            className="flex-1 bg-transparent outline-none text-sm text-text placeholder:text-text-muted/60"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="animate-fade-in-up text-center py-32">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-text-muted" />
            </div>
            <p className="text-xl font-[family-name:var(--font-playfair)] text-text">{t.admin.noProductsFound}</p>
          </div>
        ) : (
          <div className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary-50 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.productName}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.category}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.price}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.stock}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider text-right">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((product) => (
                    <tr key={product._id} data-scroll-child className="hover:bg-primary-50/50 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || product.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=50"}
                            alt={product.name}
                            className="w-10 h-10 rounded-xl object-cover border border-border"
                          />
                          <span className="font-medium text-text">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{product.admin.category}</td>
                      <td className="px-6 py-4 font-semibold text-text">₹{product.admin.price}</td>
                      <td className="px-6 py-4 text-text-muted">{product.admin.stock ?? "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          disabled={deletingId === product._id}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 disabled:opacity-50 flex items-center justify-center transition-all duration-300"
                        >
                          {deletingId === product._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
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
