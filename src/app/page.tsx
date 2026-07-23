"use client";

import Link from "next/link";
import {
  Sprout, ArrowRight, Truck, Shield, Headphones, Leaf,
  Star, Quote, Wheat, Droplets, Wrench, Bug, TreeDeciduous,
  Award, Clock, ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/store/language";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categoryData = [
  { key: "seeds", icon: Wheat, count: "120+ products", image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600" },
  { key: "fertilizers", icon: Droplets, count: "85+ products", image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=600" },
  { key: "pesticides", icon: Bug, count: "60+ products", image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=600" },
  { key: "tools", icon: Wrench, count: "45+ products", image: "https://images.pexels.com/photos/5591871/pexels-photo-5591871.jpeg?w=600" },
  { key: "irrigation", icon: Droplets, count: "35+ products", image: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=600" },
  { key: "organic", icon: TreeDeciduous, count: "50+ products", image: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600" },
];

const featuredProducts = [
  { name: "Premium Basmati Rice Seeds", price: 299, originalPrice: 399, image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=400", badge: "Organic", location: "Guntur, AP" },
  { name: "Organic Neem Fertilizer 5kg", price: 450, originalPrice: null, image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=400", badge: "Best Seller", location: "Warangal, TS" },
  { name: "Chilli Seeds Hybrid Variety", price: 180, originalPrice: 250, image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=400", badge: "Sale", location: "Kurnool, AP" },
  { name: "Drip Irrigation Kit Complete", price: 2499, originalPrice: 3200, image: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=400", badge: "New", location: "Hyderabad, TS" },
];

const testimonialData = [
  { name: "Ravi Kumar", location: "Warangal", rating: 5, text: "Best quality seeds I've ever used. My crop yield increased by 30%! The delivery was prompt and packaging excellent.", avatar: "RK" },
  { name: "Lakshmi Devi", location: "Karimnagar", rating: 5, text: "Affordable fertilizers with doorstep delivery. Highly recommended for every farmer who values quality and trust.", avatar: "LD" },
  { name: "Suresh Reddy", location: "Guntur", rating: 5, text: "The drip irrigation kit transformed my farming. Water usage dropped 40% and yields doubled. Amazing product!", avatar: "SR" },
];

export default function HomePage() {
  const { t } = useLanguage();

  const heroRef = useScrollReveal({ animation: "animate-fade-in-up", stagger: true });
  const catRef = useScrollReveal({ animation: "animate-fade-in-up" });
  const prodRef = useScrollReveal({ animation: "animate-fade-in-up" });
  const whyRef = useScrollReveal({ animation: "animate-fade-in-up" });
  const testRef = useScrollReveal({ animation: "animate-fade-in-up" });

  return (
    <div className="min-h-screen bg-bg">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=1600" alt="" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/70 to-primary-dark/90" />
        </div>

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-40 -top-40 h-[600px] w-[600px] bg-primary-light/10 animate-pulse-soft" />
          <div className="ambient-blob -bottom-32 -left-32 h-[500px] w-[500px] bg-primary-50/10 animate-float" />
          <div className="ambient-blob left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 bg-accent/5 animate-pulse-soft" style={{ animationDelay: "2s" }} />
        </div>

        {/* Floating leaf SVGs */}
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute right-[12%] top-[15%] h-8 w-8 text-primary-light/20 animate-leaf-float" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
          <svg className="absolute left-[8%] top-[40%] h-6 w-6 text-primary-light/15 animate-leaf-float" style={{ animationDelay: "3s" }} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
          <svg className="absolute bottom-[25%] right-[30%] h-5 w-5 text-accent/15 animate-leaf-float" style={{ animationDelay: "5s" }} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
        </div>

        <div ref={heroRef as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="scroll-hidden inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 mb-8">
              <Leaf className="h-4 w-4 text-primary-light" />
              <span className="text-sm font-medium text-white/90">{t.site.tagline}</span>
            </div>

            {/* Title */}
            <h1 className="scroll-hidden delay-100 font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              {t.hero.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="relative inline-block">
                <span className="gradient-text">{t.hero.title.split(" ").slice(2).join(" ")}</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 5C120 8 160 8 198 3" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" />
                  <defs><linearGradient id="ug" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#52b788" stopOpacity="0.3" /><stop offset="50%" stopColor="#52b788" stopOpacity="0.8" /><stop offset="100%" stopColor="#52b788" stopOpacity="0.3" /></linearGradient></defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="scroll-hidden delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="scroll-hidden delay-300 mt-10 flex flex-wrap items-center gap-4">
              <Link href="/products/seeds" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:from-primary-dark hover:to-primary hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
                {t.hero.cta}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-4 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white hover:bg-white/10">
                {t.site.tagline}
              </Link>
            </div>
          </div>

          {/* Floating decorative circle */}
          <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 xl:block">
            <div className="relative h-72 w-72">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-rotate-slow" />
              <div className="absolute inset-4 rounded-full border border-white/5 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/10 p-8 backdrop-blur-sm">
                  <Sprout className="h-16 w-16 text-primary-light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== CATEGORIES ===== */}
      <section className="relative overflow-hidden bg-bg-warm py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-32 -top-32 h-[500px] w-[500px] bg-primary/5 animate-pulse-soft" />
          <div className="ambient-blob -left-20 bottom-20 h-[400px] w-[400px] bg-primary-light/10 animate-float" />
        </div>
        <div ref={catRef as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-hidden mb-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">From Our Fields</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              Shop by <span className="gradient-text">Category</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categoryData.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.key}
                  href={`/products/${cat.key}`}
                  className={`scroll-hidden delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 text-center shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-primary-50">
                    <img src={cat.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-light" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-text">{t.categories[cat.key as keyof typeof t.categories]?.name || cat.key}</h3>
                  <p className="mt-1 text-xs text-text-muted">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="relative overflow-hidden bg-bg py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-32 top-1/3 h-[400px] w-[400px] bg-primary/5 animate-pulse-soft" />
          <div className="ambient-blob -left-20 bottom-10 h-[350px] w-[350px] bg-primary-light/8 animate-float" />
        </div>
        <div ref={prodRef as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-hidden mb-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">Farm Fresh</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-muted leading-relaxed">
              Handpicked quality agricultural inputs for the best harvests
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <div
                key={i}
                className={`scroll-hidden delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1`}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-white">{product.badge}</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10">
                    <span className="rounded-full bg-white px-5 py-2 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0 shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text line-clamp-2">{product.name}</h3>
                  <p className="mt-1 text-xs text-text-muted">{product.location}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-text-muted line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:from-primary-dark hover:to-primary hover:shadow-md active:scale-[0.98]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white">
              {t.products.viewAll} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== WHY CHOOSE US (Dark) ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark to-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-40 -top-40 h-[500px] w-[500px] bg-primary-light/10 animate-pulse-soft" />
          <div className="ambient-blob -left-20 bottom-0 h-[400px] w-[400px] bg-primary-50/5 animate-float" />
        </div>
        <div ref={whyRef as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-hidden mb-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-4">{t.testimonials.whyUs}</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Why Farmers <span className="text-primary-light">Trust Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: t.testimonials.qualityProducts, desc: t.testimonials.qualityProductsDesc },
              { icon: Truck, title: t.testimonials.fastDelivery, desc: t.testimonials.fastDeliveryDesc },
              { icon: Headphones, title: t.testimonials.expertSupport, desc: t.testimonials.expertSupportDesc },
              { icon: Award, title: t.about.quality, desc: t.about.qualityDesc },
            ].map((f, i) => (
              <div
                key={i}
                className={`scroll-hidden delay-${(i + 1) * 100} group glass rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1`}
              >
                <div className="mb-6 inline-flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <f.icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative overflow-hidden bg-bg-warm py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="ambient-blob -right-24 -top-24 h-[400px] w-[400px] bg-accent/5 animate-pulse-soft" />
          <div className="ambient-blob -left-16 bottom-10 h-[350px] w-[350px] bg-primary-light/8 animate-float" />
        </div>
        <div ref={testRef as React.RefObject<HTMLDivElement>} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-hidden mb-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">Testimonials</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              What <span className="gradient-text">Farmers Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialData.map((item, i) => (
              <div
                key={i}
                className={`scroll-hidden delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1`}
              >
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= item.rating ? "fill-accent text-accent" : "text-text-light"}`} />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-text-body italic">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{item.name}</p>
                    <p className="text-xs text-text-muted">{item.location}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-primary">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  Verified Buyer
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
