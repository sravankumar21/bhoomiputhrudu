"use client";

import Link from "next/link";
import {
  Sprout, ArrowRight, Truck, Shield, Headphones, Leaf,
  Star, Quote, Wheat, Droplets, Wrench, Bug, TreeDeciduous,
  Award, ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/store/language";

const categoryData = [
  { key: "seeds", icon: Wheat, count: "120+", image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600" },
  { key: "fertilizers", icon: Droplets, count: "85+", image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=600" },
  { key: "pesticides", icon: Bug, count: "60+", image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=600" },
  { key: "tools", icon: Wrench, count: "45+", image: "https://images.pexels.com/photos/5591871/pexels-photo-5591871.jpeg?w=600" },
  { key: "irrigation", icon: Droplets, count: "35+", image: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=600" },
  { key: "organic", icon: TreeDeciduous, count: "50+", image: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600" },
];

const featuredProducts = [
  { name: "Premium Basmati Rice Seeds", price: 299, originalPrice: 399, image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=400", badge: "Organic", location: "Guntur, AP" },
  { name: "Organic Neem Fertilizer 5kg", price: 450, originalPrice: null, image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=400", badge: "Best Seller", location: "Warangal, TS" },
  { name: "Chilli Seeds Hybrid Variety", price: 180, originalPrice: 250, image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=400", badge: "Sale", location: "Kurnool, AP" },
  { name: "Drip Irrigation Kit Complete", price: 2499, originalPrice: 3200, image: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=400", badge: "New", location: "Hyderabad, TS" },
];

const testimonialData = [
  { name: "Ravi Kumar", location: "Warangal", rating: 5, text: "Best quality seeds I have ever used. My crop yield increased by 30%!", avatar: "RK" },
  { name: "Lakshmi Devi", location: "Karimnagar", rating: 5, text: "Affordable fertilizers with doorstep delivery. Highly recommended!", avatar: "LD" },
  { name: "Suresh Reddy", location: "Guntur", rating: 5, text: "The drip irrigation kit transformed my farming. Water usage dropped 40%!", avatar: "SR" },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bg">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
          <img src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=1600" alt="" className="h-full w-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/80 to-primary-dark/95" />
        </div>

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary-light/10 blur-[120px] animate-pulse-soft" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-50/10 blur-[100px] animate-float" />
        </div>

        {/* Floating leaves */}
        <svg className="absolute right-[10%] top-[18%] h-10 w-10 text-white/10 animate-leaf-float" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
        <svg className="absolute left-[8%] top-[35%] h-7 w-7 text-white/8 animate-leaf-float" style={{ animationDelay: "3s" }} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 mb-8">
              <Leaf className="h-4 w-4 text-primary-light" />
              <span className="text-sm font-medium text-white/90">{t.site.tagline}</span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              {t.hero.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-[#95d5b2] to-primary-light bg-clip-text text-transparent">
                  {t.hero.title.split(" ").slice(2).join(" ")}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none"><path d="M2 8C40 2 80 2 100 5C120 8 160 8 198 3" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" /><defs><linearGradient id="ug" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#52b788" stopOpacity="0.4" /><stop offset="50%" stopColor="#95d5b2" stopOpacity="0.9" /><stop offset="100%" stopColor="#52b788" stopOpacity="0.4" /></linearGradient></defs></svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl mb-10">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-4">
              <Link href="/products/seeds" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary-light to-[#74c69d] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]">
                {t.hero.cta}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                {t.site.tagline}
              </Link>
            </div>
          </div>

          {/* Decorative rotating circle */}
          <div className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="relative h-64 w-64">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-rotate-slow" />
              <div className="absolute inset-6 rounded-full border border-white/5 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/10 backdrop-blur-sm p-8 border border-white/10">
                  <Sprout className="h-14 w-14 text-primary-light" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="relative py-20 md:py-28 bg-bg-warm overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-soft" />
          <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-primary-light/8 blur-[80px] animate-float" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">From Our Fields</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              Shop by <span className="gradient-text">Category</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {categoryData.map((cat, i) => {
              const Icon = cat.icon;
              const catName = t.categories[cat.key as keyof typeof t.categories];
              return (
                <Link
                  key={cat.key}
                  href={`/products/${cat.key}`}
                  className={`animate-fade-in-up group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40`}
                  style={{ animationDelay: `${(i + 1) * 80}ms` }}
                >
                  <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-xl bg-primary-50">
                    <img src={cat.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <Icon className="mx-auto mb-1.5 h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-light" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-text">{catName?.name || cat.key}</h3>
                  <p className="mt-0.5 text-xs text-text-muted">{cat.count} items</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="relative py-20 md:py-28 bg-bg overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[100px] animate-pulse-soft" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Farm Fresh</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              Featured <span className="gradient-text">Products</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <div
                key={i}
                className="animate-fade-in-up group overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white shadow-md">{product.badge}</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/15">
                    <span className="translate-y-4 rounded-full bg-white px-5 py-2 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-xs text-text-muted mb-3">{product.location}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice && <span className="text-sm text-text-light line-through">₹{product.originalPrice}</span>}
                  </div>
                  <button className="w-full rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.97]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white">
              {t.products.viewAll} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-dark via-primary-dark to-primary overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/8 blur-[100px] animate-pulse-soft" />
          <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-50/5 blur-[80px] animate-float" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-3">{t.testimonials.whyUs}</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Why Farmers <span className="text-primary-light">Trust Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: t.testimonials.qualityProducts, desc: t.testimonials.qualityProductsDesc },
              { icon: Truck, title: t.testimonials.fastDelivery, desc: t.testimonials.fastDeliveryDesc },
              { icon: Headphones, title: t.testimonials.expertSupport, desc: t.testimonials.expertSupportDesc },
              { icon: Award, title: t.about.quality, desc: t.about.qualityDesc },
            ].map((f, i) => (
              <div
                key={i}
                className="animate-fade-in-up glass rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="mb-5 inline-flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 transition-all duration-300 group-hover:bg-primary-light">
                    <f.icon className="h-6 w-6 text-primary-light" strokeWidth={1.5} />
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
      <section className="relative py-20 md:py-28 bg-bg-warm overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[80px] animate-pulse-soft" />
          <div className="absolute -left-16 bottom-10 h-[350px] w-[350px] rounded-full bg-primary-light/8 blur-[70px] animate-float" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Testimonials</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text">
              What <span className="gradient-text">Farmers Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialData.map((item, i) => (
              <div
                key={i}
                className="animate-fade-in-up overflow-hidden rounded-2xl border border-border bg-bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <Quote className="h-8 w-8 text-accent/30 mb-3" />
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= item.rating ? "fill-accent text-accent" : "text-text-light"}`} />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-text-body italic">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{item.name}</p>
                    <p className="text-xs text-text-muted">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
