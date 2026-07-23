"use client";

import Link from "next/link";
import { Sprout, Pill, Bug, ChevronRight } from "lucide-react";
import { useLanguage } from "@/store/language";

const productCategories = [
  {
    key: "Seeds",
    icon: Sprout,
    image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=400",
    subcategories: [
      { key: "Vegetable Seeds", label: "vegetableSeeds" },
      { key: "Fruit Seeds", label: "fruitSeeds" },
      { key: "Flower Seeds", label: "flowerSeeds" },
      { key: "Grain Seeds", label: "grainSeeds" },
      { key: "Herb Seeds", label: "herbSeeds" },
    ],
  },
  {
    key: "Fertilizers",
    icon: Pill,
    image: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=400",
    subcategories: [
      { key: "Organic Fertilizers", label: "organicFertilizers" },
      { key: "Chemical Fertilizers", label: "chemicalFertilizers" },
      { key: "Bio Fertilizers", label: "bioFertilizers" },
      { key: "Micronutrients", label: "micronutrients" },
      { key: "Soil Conditioners", label: "soilConditioners" },
    ],
  },
  {
    key: "Pesticides",
    icon: Bug,
    image: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=400",
    subcategories: [
      { key: "Insecticides", label: "insecticides" },
      { key: "Fungicides", label: "fungicides" },
      { key: "Herbicides", label: "herbicides" },
      { key: "Rodenticides", label: "rodenticides" },
      { key: "Bio Pesticides", label: "bioPesticides" },
    ],
  },
];

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4">Our Collection</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-charcoal mb-4">
            {t.allProducts}
          </h1>
          <p className="text-charcoal-muted text-lg max-w-2xl mx-auto">
            {t.browseCategories}
          </p>
        </div>

        <div className="space-y-10">
          {productCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden animate-fade-in-up delay-${(idx + 1) * 200}`}
              >
                <div className="relative h-52 md:h-72">
                  <img
                    src={cat.image}
                    alt={t[cat.key] || cat.key}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)]">
                          {t[cat.key] || cat.key}
                        </h2>
                        <p className="text-sm opacity-80 mt-1">
                          {cat.subcategories.length} {t.subcategories}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.subcategories.map((sub, sIdx) => (
                      <Link
                        key={sub.key}
                        href={`/products/${cat.key}/${encodeURIComponent(sub.key)}`}
                        className={`flex items-center justify-between p-4 rounded-2xl border border-sand/50 hover:border-green-primary/30 hover:bg-green-pale/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md group animate-fade-in delay-${(sIdx + 1) * 100}`}
                      >
                        <span className="text-sm font-medium text-charcoal group-hover:text-green-primary transition-colors duration-300">
                          {t[sub.label] || sub.key}
                        </span>
                        <ChevronRight className="w-4 h-4 text-charcoal-muted group-hover:text-green-primary group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/products/${cat.key}`}
                    className="inline-flex items-center gap-2 mt-6 text-green-primary font-semibold text-sm hover:gap-3 transition-all duration-500"
                  >
                    {t.viewAll} {t[cat.key] || cat.key}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
