"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Users, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function ManageFarmersPage() {
  const { t } = useLanguage();
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchFarmers();
  }, [user]);

  const fetchFarmers = async () => {
    try {
      const res = await fetch("/api/farmers", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const items = data?.data || data?.farmers || data;
      setFarmers(Array.isArray(items) ? items : []);
    } catch {
      toast.error(t.admin.failedToFetch);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id: string) => {
    if (!confirm(t.admin.confirmDelete)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/farmers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setFarmers((prev) => prev.filter((f) => f._id !== id));
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

  const filtered = farmers.filter(
    (f) =>
      f.firstname?.toLowerCase().includes(search.toLowerCase()) ||
      f.lastname?.toLowerCase().includes(search.toLowerCase()) ||
      f.mobile_no?.includes(search) ||
      f.email?.toLowerCase().includes(search.toLowerCase())
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
            <p className="uppercase tracking-[0.2em] text-gold text-xs font-semibold">Farmers</p>
            <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.admin.manageFarmers}</h1>
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
            placeholder={t.admin.searchFarmers}
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
              <Users className="w-10 h-10 text-charcoal-muted" />
            </div>
            <p className="text-xl font-[family-name:var(--font-playfair)] text-charcoal">{t.admin.noFarmersFound}</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden animate-fade-in-up delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sand/20 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.name}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.mobileNumber}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.email}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider">{t.admin.registeredOn}</th>
                    <th className="px-6 py-4 font-semibold text-charcoal-muted text-xs uppercase tracking-wider text-right">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/30">
                  {filtered.map((farmer, idx) => (
                    <tr key={farmer._id} className={`hover:bg-green-pale/10 transition-colors duration-300 animate-fade-in delay-${Math.min((idx + 1) * 50, 300)}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-primary to-green-light text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                            {farmer.firstname?.[0]}{farmer.lastname?.[0]}
                          </div>
                          <span className="font-medium text-charcoal">
                            {farmer.firstname} {farmer.lastname}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-charcoal-muted">{farmer.mobile_no}</td>
                      <td className="px-6 py-4 text-charcoal-muted">{farmer.email || "—"}</td>
                      <td className="px-6 py-4 text-charcoal-muted">
                        {farmer.registration_Date
                          ? new Date(farmer.registration_Date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteFarmer(farmer._id)}
                          disabled={deletingId === farmer._id}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 disabled:opacity-50 flex items-center justify-center transition-all duration-300"
                        >
                          {deletingId === farmer._id ? (
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
