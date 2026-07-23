"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Header() {
  const { t } = useLanguage();

  return (
    <div className="bg-primary-dark text-white/70 text-xs hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9">
        <div className="flex items-center gap-5">
          <a href={`tel:${t.footer.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-primary-light transition-colors duration-300">
            <Phone className="h-3 w-3" />
            {t.footer.phone}
          </a>
          <a href={`mailto:${t.footer.email}`} className="flex items-center gap-1.5 hover:text-primary-light transition-colors duration-300">
            <Mail className="h-3 w-3" />
            {t.footer.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          <span>{t.footer.address}</span>
        </div>
      </div>
    </div>
  );
}
