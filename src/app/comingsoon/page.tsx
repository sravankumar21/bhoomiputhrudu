"use client";

import Link from "next/link";
import { Sprout, Clock } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function ComingSoonPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sprout className="w-12 h-12 text-green-600" />
        </div>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.comingSoon}</h1>
        <p className="text-gray-600 mb-8">{t.comingSoonDesc}</p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
