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
  ChevronRight,
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
    { label: t.admin.totalProducts, value: stats.totalProducts, icon: Package, gradient: "from-blue-500 to-blue-600" },
    { label: t.admin.totalOrders, value: stats.totalOrders, icon: ShoppingCart, gradient: "from-orange-400 to-orange-500" },
    { label: t.admin.totalFarmers, value: stats.totalFarmers, icon: Users, gradient: "from-purple-500 to-purple-600" },
    { label: t.admin.totalRevenue, value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, gradient: "from-primary to-primary-light" },
  ];

  const links = [
    { href: "/admin/add-product", label: t.admin.addProduct, icon: Plus, gradient: "from-primary to-primary-light" },
    { href: "/admin/manage-products", label: t.admin.manageProducts, icon: Edit, gradient: "from-blue-500 to-blue-600" },
    { href: "/admin/manage-orders", label: t.admin.manageOrders, icon: ClipboardList, gradient: "from-orange-400 to-orange-500" },
    { href: "/admin/manage-farmers", label: t.admin.manageFarmers, icon: UserCog, gradient: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-blob h-[500px] w-[500px] -right-32 -top-32 bg-primary" />
        <div className="ambient-blob h-[400px] w-[400px] -left-20 bottom-20 bg-primary-light" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">Administration</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-text">
            {t.admin.dashboard}
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                data-scroll-child
                className="bg-bg-card rounded-2xl border border-border shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} text-white rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-text font-[family-name:var(--font-playfair)]">{card.value}</p>
                <p className="text-sm text-text-muted mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="gradient-divider mb-12" />

        <div className="delay-500">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-6">Quick Actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-scroll-child
                  className="bg-bg-card rounded-2xl border border-border shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${link.gradient} text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-text group-hover:text-primary transition-colors duration-300">{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
