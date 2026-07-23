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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-800">{t.allProducts}</h1>
          <p className="text-gray-600 mt-2">{t.browseCategories}</p>
        </div>

        <div className="space-y-8">
          {productCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img
                    src={cat.image}
                    alt={t[cat.key] || cat.key}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">{t[cat.key] || cat.key}</h2>
                        <p className="text-sm opacity-80">
                          {cat.subcategories.length} {t.subcategories}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.key}
                        href={`/products/${cat.key}/${encodeURIComponent(sub.key)}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                          {t[sub.label] || sub.key}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/products/${cat.key}`}
                    className="inline-block mt-4 text-green-600 font-semibold text-sm hover:underline"
                  >
                    {t.viewAll} {t[cat.key] || cat.key} →
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
