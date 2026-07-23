"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sprout, ArrowRight, Truck, Shield, Headphones, Leaf, Star, Quote,
} from "lucide-react";
import { useLanguage } from "@/store/language";

const categoryImages: Record<string, string> = {
  seeds: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=400",
  fertilizers: "https://images.pexels.com/photos/5591879/pexels-photo-5591879.jpeg?w=400",
  pesticides: "https://images.pexels.com/photos/5591883/pexels-photo-5591883.jpeg?w=400",
  tools: "https://images.pexels.com/photos/5591871/pexels-photo-5591871.jpeg?w=400",
  irrigation: "https://images.pexels.com/photos/2589458/pexels-photo-2589458.jpeg?w=400",
  organic: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=400",
};

const testimonialData = [
  { name: "Ravi Kumar", location: "Warangal", rating: 5, text: "Best quality seeds I've ever used. My crop yield increased by 30%!" },
  { name: "Lakshmi Devi", location: "Karimnagar", rating: 5, text: "Affordable fertilizers with doorstep delivery. Highly recommended!" },
  { name: "Suresh Reddy", location: "Nizamabad", rating: 4, text: "Great customer support and genuine products. Trusted platform for farmers." },
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

  const categoryKeys = ["seeds", "fertilizers", "pesticides", "tools", "irrigation", "organic"] as const;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-8 h-8" />
              <span className="text-sm font-semibold tracking-wider uppercase opacity-90">{t.site.name}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{t.hero.title}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">{t.hero.subtitle}</p>
            <Link href="/products/seeds" className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-lg">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-green-800">{t.categories.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categoryKeys.map((key) => (
            <Link key={key} href={`/products/${key}`} className="group">
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={categoryImages[key]}
                  alt={t.categories[key as keyof typeof t.categories]?.name || key}
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm md:text-base">
                  {t.categories[key as keyof typeof t.categories]?.name || key}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="bg-green-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-green-800">{t.products.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product: any) => (
                <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <img
                    src={product.image_url || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=300"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-green-600 font-medium uppercase mb-1">{product.category}</p>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2">{product.name}</h3>
                    <p className="text-green-700 font-bold">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-green-800">{t.testimonials.whyUs}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: t.testimonials.qualityProducts, desc: t.testimonials.qualityProductsDesc },
            { icon: Truck, title: t.testimonials.fastDelivery, desc: t.testimonials.fastDeliveryDesc },
            { icon: Headphones, title: t.testimonials.expertSupport, desc: t.testimonials.expertSupportDesc },
            { icon: Leaf, title: t.about.quality, desc: t.about.qualityDesc },
          ].map((f, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialData.map((item, i) => (
              <div key={i} className="bg-green-700/50 backdrop-blur rounded-xl p-6">
                <Quote className="w-8 h-8 text-green-300 mb-4" />
                <p className="text-sm opacity-90 mb-4">{item.text}</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs opacity-70">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
