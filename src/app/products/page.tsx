"use client";

import Link from "next/link";
import { Wheat, Droplets, Bug, Wrench, TreeDeciduous, ChevronRight } from "lucide-react";
import { useLanguage } from "@/store/language";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categoryData = [
  { key: "seeds", icon: Wheat, image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600", desc: "Premium quality seeds for all seasons" },
  { key: "fertilizers", icon: Droplets, image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=600", desc: "Organic & chemical fertilizers" },
  { key: "pesticides", icon: Bug, image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=600", desc: "Crop protection solutions" },
  { key: "tools", icon: Wrench, image: "https://images.pexels.com/photos/5591871/pexels-photo-5591871.jpeg?w=600", desc: "Modern farming equipment" },
  { key: "irrigation", icon: Droplets, image: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=600", desc: "Drip, sprinkler & micro irrigation" },
  { key: "organic", icon: TreeDeciduous, image: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600", desc: "100% organic farming inputs" },
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const ref = useScrollReveal({ animation: "animate-fade-in-up" });

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-20 md:py-28 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-32 -top-32 h-[500px] w-[500px] bg-primary-light/10 animate-pulse-soft" />
          <div className="ambient-blob -left-20 bottom-20 h-[400px] w-[400px] bg-primary-50/10 animate-float" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-4">Our Collection</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">{t.nav.products}</h1>
          <p className="max-w-xl mx-auto text-white/70">{t.browseCategories}</p>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Categories Grid */}
      <section className="relative overflow-hidden bg-bg py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-32 -top-32 h-[500px] w-[500px] bg-primary/5 animate-pulse-soft" />
          <div className="ambient-blob -left-20 bottom-20 h-[400px] w-[400px] bg-primary-light/8 animate-float" />
        </div>
        <div ref={ref as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryData.map((cat, i) => {
              const Icon = cat.icon;
              const catName = t.categories[cat.key as keyof typeof t.categories];
              return (
                <Link
                  key={cat.key}
                  href={`/products/${cat.key}`}
                  className={`scroll-hidden delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={cat.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 transition-all duration-300 group-hover:bg-primary">
                        <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                      </div>
                      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">
                        {catName?.name || cat.key}
                      </h2>
                    </div>
                    <p className="text-sm text-text-muted">{catName?.description || cat.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      {t.products.viewAll} <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
