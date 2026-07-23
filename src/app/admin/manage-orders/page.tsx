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
    delivered: "bg-primary-50 text-primary-dark border border-primary/20",
    cancelled: "bg-red-50 text-red-700 border border-red-200",
  };

  const filtered = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.status?.toLowerCase().includes(search.toLowerCase()) ||
      o.address?.toLowerCase().includes(search.toLowerCase())
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
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Orders</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-semibold text-text">{t.admin.manageOrders}</h1>
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
            placeholder={t.admin.searchOrders}
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
            <p className="text-xl font-[family-name:var(--font-playfair)] text-text">{t.admin.noOrdersFound}</p>
          </div>
        ) : (
          <div className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary-50 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.orderId}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.items}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.total}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.paymentMethod}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider">{t.admin.status}</th>
                    <th className="px-6 py-4 font-semibold text-text-muted text-xs uppercase tracking-wider text-right">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((order) => (
                    <tr key={order._id} data-scroll-child className="hover:bg-primary-50/50 transition-colors duration-300">
                      <td className="px-6 py-4 font-mono text-xs text-text-muted">#{order._id?.slice(-8)}</td>
                      <td className="px-6 py-4 text-text-muted">{order.products?.length || 0}</td>
                      <td className="px-6 py-4 font-semibold text-text">₹{order.total_amount}</td>
                      <td className="px-6 py-4 text-text-muted">{order.payment_method}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-primary-50 text-text-muted"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          disabled={updatingId === order._id}
                          className="text-xs bg-bg-card border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 text-text"
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
