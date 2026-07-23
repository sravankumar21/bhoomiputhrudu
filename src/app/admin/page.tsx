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
    { label: t.admin.totalRevenue, value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, gradient: "from-green-primary to-green-light" },
  ];

  const links = [
    { href: "/admin/add-product", label: t.admin.addProduct, icon: Plus, gradient: "from-green-primary to-green-light" },
    { href: "/admin/manage-products", label: t.admin.manageProducts, icon: Edit, gradient: "from-blue-500 to-blue-600" },
    { href: "/admin/manage-orders", label: t.admin.manageOrders, icon: ClipboardList, gradient: "from-orange-400 to-orange-500" },
    { href: "/admin/manage-farmers", label: t.admin.manageFarmers, icon: UserCog, gradient: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-3">Administration</p>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-charcoal">
            {t.admin.dashboard}
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-green-primary/30 transition-all duration-500 animate-fade-in-up delay-${(idx + 1) * 100}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-charcoal font-[family-name:var(--font-playfair)]">{card.value}</p>
                <p className="text-sm text-charcoal-muted mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent mb-12" />

        <div className="animate-fade-in-up delay-500">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-6">Quick Actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-green-primary/30 flex items-center gap-4 group transition-all duration-500 animate-fade-in-up delay-${(idx + 1) * 100}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${link.gradient} text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-charcoal group-hover:text-green-primary transition-colors duration-300">{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-charcoal-muted group-hover:text-green-primary group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
