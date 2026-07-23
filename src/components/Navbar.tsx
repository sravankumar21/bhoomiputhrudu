"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ShoppingCart, User, ChevronDown, Sprout,
  LogIn, UserPlus, Shield, LogOut, Home, Grid3X3, UserCircle,
} from "lucide-react";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout, initialize } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg"
            : "bg-white/70 backdrop-blur-xl border-b border-border"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ambient-blob top-0 left-1/4 h-32 w-64 bg-primary/5" />
          <div className="ambient-blob top-0 right-1/4 h-32 w-64 bg-accent/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group relative z-10">
              <div className="relative">
                <Sprout
                  className="text-primary transition-all duration-500 group-hover:text-primary-light"
                  size={28}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xl font-[family-name:var(--font-playfair)] font-bold gradient-text">
                {t.site.name}
              </span>
            </Link>

            {/* Desktop Nav — Center */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-body/70 hover:text-primary transition-colors duration-300 group">
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2 rounded-full" />
                    </button>
                    {dropdownOpen === link.label && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 glass-strong rounded-2xl shadow-xl p-2 animate-fade-in-down">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-text-body/70 hover:text-primary hover:bg-primary-50 rounded-xl transition-all duration-200"
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
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-text-body/70 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 rounded-full -translate-x-1/2 ${
                        pathname === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </Link>
                )
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 relative z-10">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:border-primary hover:text-primary transition-all duration-300"
              >
                {language === "en" ? "తెలుగు" : "EN"}
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-xl text-text-body/70 hover:text-primary hover:bg-primary-50 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-cart-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-text-body hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.firstName}</span>
                  </button>
                  {dropdownOpen === "user" && (
                    <div className="absolute top-full right-0 mt-2 w-48 glass-strong rounded-2xl shadow-xl p-2 animate-fade-in-down">
                      {user.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-body/70 hover:text-primary hover:bg-primary-50 rounded-xl transition-all duration-200">
                          <Shield className="h-4 w-4" /> {t.nav.admin}
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setDropdownOpen(null); }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-body/70 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" /> {t.nav.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-text-body/70 hover:text-primary transition-all duration-300"
                  >
                    <LogIn className="h-4 w-4" /> {t.nav.login}
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4" /> {t.nav.signup}
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-text-body/70 hover:text-primary hover:bg-primary-50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] glass-strong shadow-2xl animate-fade-in-right">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-[family-name:var(--font-playfair)] text-lg font-bold gradient-text">
                {t.site.name}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-text-body rounded-xl hover:bg-primary-50 transition-all duration-200"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen === link.label && (
                      <div className="ml-4 space-y-1 animate-fade-in-down">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-primary-50 rounded-xl transition-all duration-200"
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
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      pathname === link.href
                        ? "text-primary bg-primary-50"
                        : "text-text-body hover:bg-primary-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="p-5 border-t border-border space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text-muted hover:border-primary hover:text-primary transition-all duration-300"
              >
                {language === "en" ? "తెలుగు" : "EN"}
              </button>
              {user ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" /> {t.nav.logout}
                </button>
              ) : (
                <>
                  <Link href="/login" className="block text-center rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text-body hover:border-primary hover:text-primary transition-all duration-300">
                    {t.nav.login}
                  </Link>
                  <Link href="/signup" className="block text-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-dark transition-all duration-300">
                    {t.nav.signup}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-strong border-t border-border">
        <div className="flex items-center justify-around h-16 px-2">
          <Link href="/" className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors duration-200 ${pathname === "/" ? "text-primary" : "text-text-muted"}`}>
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium">{t.nav.home}</span>
          </Link>
          <Link href="/products" className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors duration-200 ${pathname.startsWith("/products") ? "text-primary" : "text-text-muted"}`}>
            <Grid3X3 className="h-5 w-5" />
            <span className="text-[10px] font-medium">{t.nav.categories}</span>
          </Link>
          <Link href="/cart" className={`relative flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors duration-200 ${pathname === "/cart" ? "text-primary" : "text-text-muted"}`}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] font-medium">{t.nav.cart}</span>
          </Link>
          <Link href={user ? "/placeorder" : "/login"} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors duration-200 ${pathname === "/login" || pathname === "/signup" ? "text-primary" : "text-text-muted"}`}>
            <UserCircle className="h-5 w-5" />
            <span className="text-[10px] font-medium">{user ? t.nav.profile : t.nav.login}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
