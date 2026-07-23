"use client";

import Link from "next/link";
import { Sprout, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sprout className="text-green-400" size={28} />
              <span className="text-xl font-bold">{t.site.name}</span>
            </Link>
            <p className="text-green-200 text-sm">{t.site.description}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.company}</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><Link href="/about" className="hover:text-white">{t.nav.about}</Link></li>
              <li><Link href="/products" className="hover:text-white">{t.nav.products}</Link></li>
              <li><Link href="/products/seeds" className="hover:text-white">{t.nav.seeds}</Link></li>
              <li><Link href="/products/fertilizers" className="hover:text-white">{t.nav.fertilizers}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.helpfulLinks}</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.faq}</Link></li>
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.shippingPolicy}</Link></li>
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.returnPolicy}</Link></li>
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.privacyPolicy}</Link></li>
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.terms}</Link></li>
              <li><Link href="/comingsoon" className="hover:text-white">{t.footer.refundPolicy}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3 text-green-200 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href="tel:+919381935889" className="hover:text-white">{t.footer.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <a href="mailto:support@bhoomiputhrudu.com" className="hover:text-white">{t.footer.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300 text-sm">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
