"use client";

import { Sprout, Target, Eye, Heart, Truck, Headphones, Shield } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sprout className="w-12 h-12 mx-auto mb-4 text-green-300" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.about.title}</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">{t.about.mission}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{t.about.missionText}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-8">
            <img
              src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600"
              alt="Mission"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600"
                alt="Vision"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">{t.about.vision}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{t.about.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.about.values}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-700 mb-2">{t.about.quality}</h3>
            <p className="text-sm text-gray-600">{t.about.qualityDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-700 mb-2">{t.about.trust}</h3>
            <p className="text-sm text-gray-600">{t.about.trustDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Headphones className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-700 mb-2">{t.about.support}</h3>
            <p className="text-sm text-gray-600">{t.about.supportDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-700 mb-2">{t.about.delivery}</h3>
            <p className="text-sm text-gray-600">{t.about.deliveryDesc}</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.about.founder}</h2>
          <div>
            <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold">B</span>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800">{t.about.journey}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-700 font-bold">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{t.hero.slide2.title}</h3>
            <p className="text-sm text-gray-600">{t.hero.slide2.description}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-700 font-bold">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{t.hero.slide1.title}</h3>
            <p className="text-sm text-gray-600">{t.hero.slide1.description}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-700 font-bold">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{t.hero.slide3.title}</h3>
            <p className="text-sm text-gray-600">{t.hero.slide3.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
