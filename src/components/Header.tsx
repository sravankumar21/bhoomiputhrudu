"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Header() {
  const { t } = useLanguage();

  return (
    <div className="bg-green-dark/95 backdrop-blur-sm text-white text-sm animate-fade-in">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-blob -top-10 -left-20 h-40 w-40 bg-green-muted/6" />
        <div className="ambient-blob -bottom-10 -right-20 h-40 w-40 bg-gold/5" />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 py-2 px-4">
        <div className="flex items-center gap-5">
          <a
            href="tel:+919381935889"
            className="flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors duration-500"
          >
            <Phone size={13} strokeWidth={1.5} />
            <span className="tracking-wide">{t.footer.phone}</span>
          </a>
          <a
            href="mailto:support@bhoomiputhrudu.com"
            className="flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors duration-500"
          >
            <Mail size={13} strokeWidth={1.5} />
            <span className="hidden sm:inline tracking-wide">{t.footer.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-white/60">
          <MapPin size={13} strokeWidth={1.5} />
          <span className="text-xs tracking-wide">{t.footer.address}</span>
        </div>
      </div>
    </div>
  );
}
