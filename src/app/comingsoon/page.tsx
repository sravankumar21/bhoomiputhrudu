"use client";

import Link from "next/link";
import { Sprout, Clock } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function ComingSoonPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-ivory flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[120px] animate-float" />
      </div>

      <div className="relative text-center max-w-lg mx-auto px-4 animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-12 md:p-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center mx-auto mb-8">
            <Clock className="w-10 h-10 text-green-primary animate-float" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Sprout className="w-6 h-6 text-green-primary" />
            <span className="uppercase tracking-[0.2em] text-gold text-sm font-semibold">Bhoomi Puthrudu</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-4">
            <span className="bg-gradient-to-r from-green-dark via-green-primary to-green-light bg-clip-text text-transparent">
              {t.comingSoon}
            </span>
          </h1>

          <p className="text-charcoal-muted mb-10 text-lg leading-relaxed">
            {t.comingSoonDesc}
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent mb-10" />

          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-green-primary to-green-light text-white rounded-full px-10 py-3.5 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
