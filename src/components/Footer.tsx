"use client";

import Link from "next/link";
import { Sprout, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-green-dark to-charcoal text-white overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-blob -top-20 -left-20 h-80 w-80 bg-green-muted/5" />
        <div className="ambient-blob top-1/3 right-0 h-60 w-60 bg-gold/4" />
        <div className="ambient-blob -bottom-20 left-1/3 h-60 w-60 bg-green-primary/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <Sprout
                className="text-green-muted transition-colors duration-500 group-hover:text-gold"
                size={28}
                strokeWidth={1.5}
              />
              <span className="text-xl font-[family-name:var(--font-playfair)] font-bold">
                {t.site.name}{" "}
                <span className="text-gold">.</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-[260px]">
              {t.site.description}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: t.nav.about },
                { href: "/products", label: t.nav.products },
                { href: "/products/seeds", label: t.nav.seeds },
                { href: "/products/fertilizers", label: t.nav.fertilizers },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-white/50 hover:text-green-muted transition-all duration-500"
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              {t.footer.helpfulLinks}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/comingsoon", label: t.footer.faq },
                { href: "/comingsoon", label: t.footer.shippingPolicy },
                { href: "/comingsoon", label: t.footer.returnPolicy },
                { href: "/comingsoon", label: t.footer.privacyPolicy },
                { href: "/comingsoon", label: t.footer.terms },
                { href: "/comingsoon", label: t.footer.refundPolicy },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-white/50 hover:text-green-muted transition-all duration-500"
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50 group">
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-green-muted/60 group-hover:text-green-muted transition-colors duration-500"
                />
                <span className="group-hover:text-white/70 transition-colors duration-500">
                  {t.footer.address}
                </span>
              </li>
              <li className="group">
                <a
                  href="tel:+919381935889"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-green-muted transition-all duration-500"
                >
                  <Phone
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-green-muted/60 group-hover:text-green-muted transition-colors duration-500"
                  />
                  <span>{t.footer.phone}</span>
                </a>
              </li>
              <li className="group">
                <a
                  href="mailto:support@bhoomiputhrudu.com"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-green-muted transition-all duration-500"
                >
                  <Mail
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-green-muted/60 group-hover:text-green-muted transition-colors duration-500"
                  />
                  <span>{t.footer.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-white/30 tracking-wider">
            &copy; {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-r from-green-muted to-gold bg-clip-text text-transparent font-medium">
              {t.site.name}
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
