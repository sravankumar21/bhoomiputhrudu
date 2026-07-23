"use client";

import Link from "next/link";
import { Sprout, MapPin, Phone, Mail, Globe, MessageCircle, Share2 } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/products", label: t.nav.products },
    { href: "/products/seeds", label: t.nav.seeds },
    { href: "/products/fertilizers", label: t.nav.fertilizers },
  ];

  const serviceLinks = [
    { href: "/comingsoon", label: t.footer.faq },
    { href: "/comingsoon", label: t.footer.shippingPolicy },
    { href: "/comingsoon", label: t.footer.returnPolicy },
    { href: "/comingsoon", label: t.footer.privacyPolicy },
    { href: "/comingsoon", label: t.footer.terms },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Sprout className="text-primary-light" size={28} strokeWidth={1.5} />
              <span className="text-xl font-[family-name:var(--font-playfair)] font-bold text-white">
                {t.site.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              {t.site.description}
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all duration-300 hover:border-primary-light hover:text-primary-light hover:bg-white/5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-5">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-5">
              {t.footer.helpfulLinks}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-5">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary-light" />
                {t.footer.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-primary-light" />
                {t.footer.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-primary-light" />
                {t.footer.email}
              </li>
            </ul>
            {/* Newsletter */}
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-full border border-white/20 border-r-0 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-light transition-colors duration-300"
              />
              <button className="rounded-r-full bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-light transition-colors duration-300">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40 uppercase tracking-widest">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">🌾 Farm Certified</span>
            <span className="text-xs text-white/30">✓ Organic Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
