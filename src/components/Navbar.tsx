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
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-sand/40 shadow-sm">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-blob top-0 left-1/4 h-32 w-64 bg-green-primary/4" />
        <div className="ambient-blob top-0 right-1/4 h-32 w-64 bg-gold/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Sprout
                className="text-green-primary transition-all duration-500 group-hover:text-green-light"
                size={28}
                strokeWidth={1.5}
              />
            </div>
            <span className="text-xl font-[family-name:var(--font-playfair)] font-bold gradient-text">
              {t.site.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal/70 hover:text-green-primary transition-colors duration-500 rounded-lg hover:bg-green-pale/30">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-500 ${dropdownOpen === link.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen === link.label && (
                    <div className="absolute top-full left-0 mt-1 glass-strong rounded-xl shadow-lg border border-sand/30 py-2 min-w-[220px] animate-scale-in origin-top-left">
                      {link.children.map((child, idx) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-2.5 text-sm text-charcoal/70 hover:text-green-primary hover:bg-green-pale/40 transition-all duration-500 ${
                            idx === 0 ? "animate-fade-in-up" : ""
                          } ${idx === 1 ? "animate-fade-in-up delay-100" : ""} ${idx === 2 ? "animate-fade-in-up delay-200" : ""} ${idx === 3 ? "animate-fade-in-up delay-300" : ""} ${idx === 4 ? "animate-fade-in-up delay-400" : ""}`}
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
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-500 rounded-lg ${
                    pathname === link.href
                      ? "text-green-primary bg-green-pale/30"
                      : "text-charcoal/70 hover:text-green-primary hover:bg-green-pale/30"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-gradient-to-r from-green-primary to-green-light rounded-full" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-green-primary/20 text-green-primary hover:bg-green-primary hover:text-white transition-all duration-500 tracking-wider"
            >
              {language === "en" ? "తెలుగు" : "EN"}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 text-charcoal/60 hover:text-green-primary rounded-xl hover:bg-green-pale/30 transition-all duration-500"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-green-primary to-green-light text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse-glow shadow-sm">
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* Auth: Logged In */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-charcoal/70 hover:text-green-primary rounded-xl hover:bg-green-pale/30 transition-all duration-500"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-primary to-green-light flex items-center justify-center">
                    <User size={14} className="text-white" strokeWidth={1.5} />
                  </div>
                  <span>{user.firstname}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-500 ${dropdownOpen === "user" ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen === "user" && (
                  <div className="absolute right-0 top-full mt-1 glass-strong rounded-xl shadow-lg border border-sand/30 py-2 min-w-[200px] animate-scale-in origin-top-right">
                    <div className="px-5 py-2 border-b border-sand/30">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal-muted">
                        Account
                      </p>
                    </div>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-charcoal/70 hover:text-green-primary hover:bg-green-pale/40 transition-all duration-500"
                      >
                        <Shield size={15} strokeWidth={1.5} /> {t.nav.admin}
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-charcoal/70 hover:text-red-500 hover:bg-red-50/40 w-full transition-all duration-500"
                    >
                      <LogOut size={15} strokeWidth={1.5} /> {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Auth: Logged Out */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-charcoal/70 hover:text-green-primary transition-colors duration-500 rounded-lg hover:bg-green-pale/30"
                >
                  <LogIn size={15} strokeWidth={1.5} /> {t.nav.login}
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-green-primary to-green-light text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-500"
                >
                  <UserPlus size={15} strokeWidth={1.5} /> {t.nav.signup}
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 text-charcoal/70 hover:text-green-primary rounded-xl hover:bg-green-pale/30 transition-all duration-500"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4">
                <span
                  className={`absolute left-0 h-0.5 w-full bg-current rounded-full transition-all duration-500 ${
                    mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-current rounded-full transition-all duration-500 ${
                    mobileOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full bg-current rounded-full transition-all duration-500 ${
                    mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong border-t border-sand/30 px-4 py-4 space-y-1">
          {navLinks.map((link, linkIdx) =>
            link.children ? (
              <div key={link.label} className={`animate-fade-in-up ${linkIdx === 1 ? "delay-100" : ""} ${linkIdx === 2 ? "delay-200" : ""}`}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal-muted px-3 pt-3 pb-1">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-2.5 pl-6 text-sm text-charcoal/70 hover:text-green-primary hover:translate-x-1 transition-all duration-500"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-500 animate-fade-in-up ${
                  pathname === link.href
                    ? "text-green-primary bg-green-pale/30"
                    : "text-charcoal/70 hover:text-green-primary hover:bg-green-pale/30"
                } ${linkIdx === 0 ? "delay-0" : ""} ${linkIdx === 1 ? "delay-100" : ""} ${linkIdx === 2 ? "delay-200" : ""}`}
              >
                {link.label}
              </Link>
            )
          )}

          <div className="gradient-divider my-3" />

          {user ? (
            <div className="space-y-1 animate-fade-in-up delay-300">
              {user.role === "admin" && (
                <Link href="/admin" className="block py-2.5 px-3 text-sm text-charcoal/70 hover:text-green-primary hover:bg-green-pale/30 rounded-lg transition-all duration-500">
                  {t.nav.admin}
                </Link>
              )}
              <button
                onClick={logout}
                className="block py-2.5 px-3 text-sm text-red-500/80 hover:text-red-500 hover:bg-red-50/30 rounded-lg w-full text-left transition-all duration-500"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <div className="space-y-1 animate-fade-in-up delay-300">
              <Link href="/login" className="block py-2.5 px-3 text-sm text-charcoal/70 hover:text-green-primary hover:bg-green-pale/30 rounded-lg transition-all duration-500">
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="block py-2.5 px-3 text-sm font-medium text-white bg-gradient-to-r from-green-primary to-green-light rounded-xl text-center shadow-sm transition-all duration-500"
              >
                {t.nav.signup}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
