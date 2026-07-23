"use client";

import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/store/language";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ComingSoonPage() {
  const { t } = useLanguage();
  const ref = useScrollReveal({ animation: "animate-scale-in" });

  return (
    <div className="relative min-h-screen bg-bg flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-blob -right-32 -top-32 h-[500px] w-[500px] bg-primary/5 animate-pulse-soft" />
        <div className="ambient-blob -left-20 bottom-20 h-[400px] w-[400px] bg-primary-light/10 animate-float" />
        <div className="ambient-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-lg px-4 text-center">
        <div className="scroll-hidden rounded-3xl border border-border bg-bg-card shadow-xl p-12 md:p-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 animate-float">
            <Clock className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <span className="uppercase tracking-[0.2em] text-primary text-sm font-semibold mb-4 block">{t.site.name}</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-text mb-4">
            {t.comingSoon}
          </h1>
          <p className="text-text-muted leading-relaxed mb-8">{t.comingSoonDesc}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-primary-dark hover:to-primary hover:shadow-lg active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" /> {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
