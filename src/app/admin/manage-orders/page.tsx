"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Package } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function ManageOrdersPage() {
  const { t } = useLanguage();
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const items = data?.data || data?.orders || data;
      setOrders(Array.isArray(items) ? items : []);
    } catch {
      toast.error(t.admin.failedToFetch);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
        toast.success(t.admin.statusUpdated);
      } else {
        toast.error(t.admin.failedToUpdate);
      }
    } catch {
      toast.error(t.admin.somethingWentWrong);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    processing: "bg-blue-50 text-blue-700 border border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border border-purple-200",
    delivered: "bg-green-pale text-green-dark border border-green-muted/40",
    cancelled: "bg-red-50 text-red-700 border border-red-200",
  };

  const filtered = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.status?.toLowerCase().includes(search.toLowerCase()) ||
      o.address?.toLowerCase().includes(search.toLowerCase())
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
            <p className="uppercase tracking-[0.2em] text-gold text-xs font-semibold">Orders</p>
            <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.admin.manageOrders}</h1>
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
            placeholder={t.admin.searchOrders}
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
            <p className="text-xl font-[family-name:var(--font-playfair)] text-charcoal">{t.admin.noOrdersFound}</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden animate-fade-in-up delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sand/20 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.orderId}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.items}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.total}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.paymentMethod}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.status}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider text-right">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/30">
                  {filtered.map((order, idx) => (
                    <tr key={order._id} className={`hover:bg-green-pale/10 transition-colors duration-300 animate-fade-in delay-${Math.min((idx + 1) * 50, 300)}`}>
                      <td className="px-6 py-4 font-mono text-xs text-charcoal-muted">#{order._id?.slice(-8)}</td>
                      <td className="px-6 py-4 text-charcoal-muted">{order.products?.length || 0}</td>
                      <td className="px-6 py-4 font-semibold text-charcoal">₹{order.total_amount}</td>
                      <td className="px-6 py-4 text-charcoal-muted">{order.payment_method}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-sand/30 text-charcoal-muted"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          disabled={updatingId === order._id}
                          className="text-xs bg-white/60 backdrop-blur-sm border border-sand/60 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-primary/30 transition-all duration-500 text-charcoal"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
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
