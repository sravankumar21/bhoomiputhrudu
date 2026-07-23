"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Header() {
  const { t } = useLanguage();

  return (
    <div className="bg-green-800 text-white text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <a href="tel:+919381935889" className="flex items-center gap-1 hover:text-green-200">
            <Phone size={14} />
            <span>{t.footer.phone}</span>
          </a>
          <a href="mailto:support@bhoomiputhrudu.com" className="flex items-center gap-1 hover:text-green-200">
            <Mail size={14} />
            <span className="hidden sm:inline">{t.footer.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span className="text-xs">{t.footer.address}</span>
        </div>
      </div>
    </div>
  );
}
