"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  Leaf,
  Star,
  Quote,
  Sparkles,
  Wheat,
  Droplets,
  Wrench,
  Bug,
  TreeDeciduous,
  Heart,
  Award,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/store/language";

const categoryImages: Record<string, string> = {
  seeds: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600",
  fertilizers: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=600",
  pesticides: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=600",
  tools: "https://images.pexels.com/photos/5591871/pexels-photo-5591871.jpeg?w=600",
  irrigation: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=600",
  organic: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600",
};

const categoryIcons: Record<string, typeof Sprout> = {
  seeds: Wheat,
  fertilizers: Droplets,
  pesticides: Bug,
  tools: Wrench,
  irrigation: Droplets,
  organic: TreeDeciduous,
};

const testimonialData = [
  {
    name: "Ravi Kumar",
    location: "Warangal",
    rating: 5,
    text: "Best quality seeds I've ever used. My crop yield increased by 30%! The delivery was prompt and packaging excellent.",
    avatar: "RK",
  },
  {
    name: "Lakshmi Devi",
    location: "Karimnagar",
    rating: 5,
    text: "Affordable fertilizers with doorstep delivery. Highly recommended for every farmer who values quality and trust.",
    avatar: "LD",
  },
  {
    name: "Suresh Reddy",
    location: "Nizamabad",
    rating: 4,
    text: "Great customer support and genuine products. This is the most trusted platform for farmers in our region.",
    avatar: "SR",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = data?.data || data?.products || data;
        if (Array.isArray(items)) setProducts(items.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  const categoryKeys = [
    "seeds",
    "fertilizers",
    "pesticides",
    "tools",
    "irrigation",
    "organic",
  ] as const;

  return (
    <div className="min-h-screen bg-ivory">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-dark via-green-primary to-green-dark text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=1600"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-dark/90 via-green-primary/80 to-green-dark/90" />
        </div>

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-green-muted/10 blur-[120px] animate-pulse-glow" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-green-pale/10 blur-[100px] animate-float-slow" />
          <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gold/5 blur-[80px] animate-pulse-glow delay-400" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
              <Sprout className="h-4 w-4 text-green-muted" />
              <span className="text-sm font-medium tracking-wide text-green-pale">
                {t.site.tagline}
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-green-muted via-green-pale to-green-muted bg-clip-text text-transparent">
                  {t.hero.title.split(" ").slice(2).join(" ")}
                </span>
                {/* Decorative underline SVG */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C40 2 80 2 100 5C120 8 160 8 198 3"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="underline-grad"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#74c69d" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#74c69d" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#74c69d"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products/seeds"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-green-muted to-green-light px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-green-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-primary/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t.hero.cta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-light to-green-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                {t.site.tagline}
              </Link>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 xl:block">
            <div className="relative h-72 w-72">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-rotate-slow" />
              <div className="absolute inset-4 rounded-full border border-white/5 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/10 p-8 backdrop-blur-sm">
                  <Sprout className="h-16 w-16 text-green-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
          <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-gold/[0.03] blur-[60px] animate-float" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
              {t.categories.title}
            </p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
              Browse Our{" "}
              <span className="gradient-text">Categories</span>
            </h2>
            <p className="animate-fade-in-up delay-200 mx-auto mt-4 max-w-lg text-charcoal-muted leading-relaxed">
              Everything your farm needs, from premium seeds to modern irrigation
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categoryKeys.map((key, i) => {
              const Icon = categoryIcons[key] || Sprout;
              const delayClass = `delay-${(i + 1) * 100}` as string;
              return (
                <Link
                  key={key}
                  href={`/products/${key}`}
                  className={`group animate-fade-in-up ${delayClass}`}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-sand/40 bg-white shadow-sm transition-all duration-500 hover:border-green-primary/30 hover:shadow-lg hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-36 overflow-hidden sm:h-44">
                      <img
                        src={categoryImages[key]}
                        alt={
                          t.categories[key as keyof typeof t.categories]
                            ?.name || key
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {/* Category icon */}
                      <div className="absolute right-3 top-3 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      {/* Category name */}
                      <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white sm:text-base">
                        {t.categories[key as keyof typeof t.categories]
                          ?.name || key}
                      </p>
                    </div>
                    {/* Subtle bottom accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-primary/0 to-transparent transition-all duration-500 group-hover:via-green-primary/40" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== PRODUCTS SECTION ===== */}
      {products.length > 0 && (
        <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
          {/* Ambient blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-green-primary/[0.03] blur-[80px] animate-pulse-glow" />
            <div className="absolute -right-20 top-10 h-[350px] w-[350px] rounded-full bg-green-pale/30 blur-[70px] animate-float-slow" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                  Curated for You
                </p>
                <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl font-bold text-charcoal md:text-4xl">
                  Featured{" "}
                  <span className="gradient-text">Products</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="animate-fade-in-up delay-200 group inline-flex items-center gap-2 rounded-full border border-green-primary/20 px-5 py-2.5 text-sm font-medium text-green-primary transition-all duration-300 hover:border-green-primary/40 hover:bg-green-primary hover:text-white hover:-translate-y-0.5"
              >
                {t.products.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product: any, i) => {
                const delayClass = `delay-${Math.min((i + 1) * 100, 800)}` as string;
                return (
                  <Link
                    key={product._id}
                    href={`/products/${product.category}`}
                    className={`group animate-fade-in-up ${delayClass}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-sand/40 bg-gradient-to-b from-white to-cream/20 shadow-sm transition-all duration-500 hover:border-green-primary/30 hover:shadow-lg hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={
                            product.image_url ||
                            "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=400"
                          }
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-dark/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-green-primary shadow-lg">
                            View Details
                          </span>
                        </div>
                        {/* Discount badge */}
                        {product.discountPrice && product.discountPrice < product.price && (
                          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-primary">
                          {product.category}
                        </p>
                        <h3 className="mb-3 text-sm font-semibold text-charcoal line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <p className="text-lg font-bold text-green-primary">
                            ₹{product.discountPrice || product.price}
                          </p>
                          {product.discountPrice &&
                            product.discountPrice < product.price && (
                              <p className="text-sm text-charcoal-muted line-through">
                                ₹{product.price}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="gradient-divider" />

      {/* ===== WHY CHOOSE US SECTION (Dark) ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-dark via-green-dark to-green-primary py-20 md:py-28">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-muted/10 blur-[100px] animate-pulse-glow" />
          <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-green-pale/[0.06] blur-[80px] animate-float-slow" />
          <div className="absolute right-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-gold/[0.04] blur-[60px] animate-float" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-green-muted mb-4">
              {t.testimonials.whyUs}
            </p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Why Farmers{" "}
              <span className="bg-gradient-to-r from-green-muted to-green-pale bg-clip-text text-transparent">
                Trust Us
              </span>
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: t.testimonials.qualityProducts,
                desc: t.testimonials.qualityProductsDesc,
                gradient: "from-green-muted to-green-light",
              },
              {
                icon: Truck,
                title: t.testimonials.fastDelivery,
                desc: t.testimonials.fastDeliveryDesc,
                gradient: "from-green-light to-green-muted",
              },
              {
                icon: Headphones,
                title: t.testimonials.expertSupport,
                desc: t.testimonials.expertSupportDesc,
                gradient: "from-green-muted to-green-pale",
              },
              {
                icon: Leaf,
                title: t.about.quality,
                desc: t.about.qualityDesc,
                gradient: "from-green-pale to-green-muted",
              },
            ].map((f, i) => {
              const delayClass = `delay-${(i + 1) * 100}` as string;
              return (
                <div
                  key={i}
                  className={`group animate-fade-in-up ${delayClass} glass rounded-2xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-primary/10`}
                >
                  {/* Icon circle */}
                  <div className="mb-6 inline-flex">
                    <div
                      className={`rounded-2xl bg-gradient-to-br ${f.gradient} p-4 shadow-lg transition-transform duration-500 group-hover:scale-110`}
                    >
                      <f.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-gold/[0.04] blur-[80px] animate-pulse-glow" />
          <div className="absolute -left-16 bottom-10 h-[350px] w-[350px] rounded-full bg-green-muted/15 blur-[70px] animate-float-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
              Testimonials
            </p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
              What{" "}
              <span className="gradient-text">Farmers Say</span>
            </h2>
            <p className="animate-fade-in-up delay-200 mx-auto mt-4 max-w-lg text-charcoal-muted leading-relaxed">
              Real stories from the farmers who trust us with their harvest
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialData.map((item, i) => {
              const delayClass = `delay-${(i + 1) * 100}` as string;
              return (
                <div
                  key={i}
                  className={`group animate-fade-in-up ${delayClass} relative overflow-hidden rounded-2xl border border-sand/40 bg-white p-8 shadow-sm transition-all duration-500 hover:border-green-primary/20 hover:shadow-lg hover:-translate-y-1`}
                >
                  {/* Quote icon */}
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-gold/30" />
                  </div>

                  {/* Text */}
                  <p className="mb-6 text-sm leading-relaxed text-charcoal-muted">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < item.rating
                            ? "fill-gold text-gold"
                            : "fill-sand text-sand"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-primary to-green-light text-xs font-bold text-white shadow-md">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        {item.name}
                      </p>
                      <p className="text-xs text-charcoal-muted">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-pale/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-pale/30" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TRUST BANNER SECTION ===== */}
      <section className="relative overflow-hidden bg-ivory py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-primary/[0.03] blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                icon: Award,
                value: "5000+",
                label: "Happy Farmers",
              },
              {
                icon: Wheat,
                value: "200+",
                label: "Products",
              },
              {
                icon: Clock,
                value: "24/7",
                label: "Support",
              },
              {
                icon: Heart,
                value: "100%",
                label: "Genuine Products",
              },
            ].map((stat, i) => {
              const delayClass = `delay-${(i + 1) * 100}` as string;
              return (
                <div
                  key={i}
                  className={`animate-fade-in-up ${delayClass} group text-center`}
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 transition-all duration-500 group-hover:from-green-primary group-hover:to-green-light group-hover:shadow-lg group-hover:shadow-green-primary/20">
                    <stat.icon className="h-6 w-6 text-green-primary transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-charcoal-muted">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
