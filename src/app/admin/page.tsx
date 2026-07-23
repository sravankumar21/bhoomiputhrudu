"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Plus,
  Edit,
  ClipboardList,
  UserCog,
} from "lucide-react";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalFarmers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data?.data) {
        setStats(data.data);
      }
    } catch {}
  };

  const statCards = [
    { label: t.totalProducts, value: stats.totalProducts, icon: Package, color: "bg-blue-500" },
    { label: t.totalOrders, value: stats.totalOrders, icon: ShoppingCart, color: "bg-orange-500" },
    { label: t.totalFarmers, value: stats.totalFarmers, icon: Users, color: "bg-purple-500" },
    { label: t.totalRevenue, value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-500" },
  ];

  const links = [
    { href: "/admin/add-product", label: t.addProduct, icon: Plus, color: "bg-green-600" },
    { href: "/admin/manage-products", label: t.manageProducts, icon: Edit, color: "bg-blue-600" },
    { href: "/admin/manage-orders", label: t.manageOrders, icon: ClipboardList, color: "bg-orange-600" },
    { href: "/admin/manage-farmers", label: t.manageFarmers, icon: UserCog, color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{t.adminDashboard}</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${card.color} text-white rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t.quickLinks}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4 group"
              >
                <div className={`w-12 h-12 ${link.color} text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
