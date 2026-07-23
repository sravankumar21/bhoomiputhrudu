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
      toast.error(t.failedToFetch);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/farmers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setFarmers((prev) => prev.filter((f) => f._id !== id));
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

  const filtered = farmers.filter(
    (f) =>
      f.firstname?.toLowerCase().includes(search.toLowerCase()) ||
      f.lastname?.toLowerCase().includes(search.toLowerCase()) ||
      f.mobile_no?.includes(search) ||
      f.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-green-600 hover:text-green-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{t.manageFarmers}</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchFarmers}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">{t.loading}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            {t.noFarmersFound}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.name}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.mobileNumber}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.email}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{t.registeredOn}</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((farmer) => (
                    <tr key={farmer._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                            {farmer.firstname?.[0]}{farmer.lastname?.[0]}
                          </div>
                          <span className="font-medium">
                            {farmer.firstname} {farmer.lastname}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{farmer.mobile_no}</td>
                      <td className="px-4 py-3 text-gray-600">{farmer.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {farmer.registration_Date
                          ? new Date(farmer.registration_Date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteFarmer(farmer._id)}
                          disabled={deletingId === farmer._id}
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
