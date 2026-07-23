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
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl border border-sand/40 flex items-center justify-center text-charcoal hover:text-green-primary hover:border-green-primary/30 transition-all duration-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="uppercase tracking-[0.2em] text-gold text-xs font-semibold">Products</p>
            <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.manageProducts}</h1>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-5 mb-8 flex items-center gap-4 animate-fade-in-up delay-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-green-primary" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchProducts}
            className="flex-1 bg-transparent outline-none text-sm text-charcoal placeholder:text-charcoal-muted/60"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-green-primary/20 border-t-green-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-sand/30 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-charcoal-muted" />
            </div>
            <p className="text-xl font-[family-name:var(--font-playfair)] text-charcoal">{t.noProductsFound}</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden animate-fade-in-up delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sand/20 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.productName}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.category}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.price}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.stock}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider text-right">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/30">
                  {filtered.map((product, idx) => (
                    <tr key={product._id} className={`hover:bg-green-pale/10 transition-colors duration-300 animate-fade-in delay-${Math.min((idx + 1) * 50, 300)}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || product.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=50"}
                            alt={product.name}
                            className="w-10 h-10 rounded-xl object-cover border border-sand/40"
                          />
                          <span className="font-medium text-charcoal">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-charcoal-muted">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-charcoal">₹{product.price}</td>
                      <td className="px-6 py-4 text-charcoal-muted">{product.stock ?? "—"}</td>
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
