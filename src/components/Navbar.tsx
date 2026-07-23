"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ShoppingCart, User, ChevronDown, Sprout,
  LogIn, UserPlus, Shield, LogOut,
} from "lucide-react";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout, initialize } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    {
      label: t.nav.products,
      children: [
        { href: "/products/seeds", label: t.nav.seeds },
        { href: "/products/fertilizers", label: t.nav.fertilizers },
        { href: "/products/pesticides", label: t.nav.pesticides },
        { href: "/products/tools", label: t.nav.tools },
        { href: "/products/irrigation", label: t.nav.irrigation },
      ],
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="text-green-600" size={28} />
            <span className="text-xl font-bold text-green-800">{t.site.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium">
                    {link.label}
                    <ChevronDown size={16} />
                  </button>
                  {dropdownOpen === link.label && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] border">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium ${
                    pathname === link.href ? "text-green-600" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs font-bold border border-green-600 rounded text-green-600 hover:bg-green-50"
            >
              {language === "en" ? "తెలుగు" : "EN"}
            </button>

            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
              <ShoppingCart size={22} />
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                  className="flex items-center gap-1 text-gray-700 hover:text-green-600"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{user.firstname}</span>
                </button>
                {dropdownOpen === "user" && (
                  <div className="absolute right-0 top-full bg-white shadow-lg rounded-lg py-2 min-w-[180px] border">
                    {user.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50">
                        <Shield size={16} /> {t.nav.admin}
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 w-full"
                    >
                      <LogOut size={16} /> {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="flex items-center gap-1 text-gray-700 hover:text-green-600 text-sm font-medium">
                  <LogIn size={16} /> {t.nav.login}
                </Link>
                <Link href="/signup" className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700">
                  <UserPlus size={16} /> {t.nav.signup}
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-1">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-gray-700 hover:text-green-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="block py-2 text-gray-700 hover:text-green-600 font-medium">
                  {link.label}
                </Link>
              )
            )}
            <hr />
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="block py-2 text-gray-700">{t.nav.admin}</Link>
                )}
                <button onClick={logout} className="block py-2 text-gray-700">{t.nav.logout}</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-700">{t.nav.login}</Link>
                <Link href="/signup" className="block py-2 text-green-600 font-medium">{t.nav.signup}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
