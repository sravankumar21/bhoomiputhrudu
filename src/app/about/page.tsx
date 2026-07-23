"use client";

import { Sprout, Target, Eye, Heart, Truck, Headphones, Shield, ChevronRight } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-dark via-green-primary to-green-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-[80px] animate-float" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-[60px] animate-float-slow" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/30">
            <Sprout className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-4">{t.about.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Empowering farmers with premium agricultural solutions
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-fade-in-up">
          <div>
            <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4">Purpose</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-primary" />
              </div>
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.about.mission}</h2>
            </div>
            <p className="text-charcoal-muted leading-relaxed text-lg">{t.about.missionText}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
            <img
              src="https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=600"
              alt="Mission"
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent max-w-5xl mx-auto" />

      {/* Vision */}
      <section className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-fade-in-up">
          <div className="order-2 md:order-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              <img
                src="https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=600"
                alt="Vision"
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4">Aspiration</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-primary" />
              </div>
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.about.vision}</h2>
            </div>
            <p className="text-charcoal-muted leading-relaxed text-lg">{t.about.visionText}</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent max-w-5xl mx-auto" />

      {/* Values */}
      <section className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4">Principles</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-primary" />
            </div>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.about.values}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: t.about.quality, desc: t.about.qualityDesc, delay: "100" },
            { icon: Heart, title: t.about.trust, desc: t.about.trustDesc, delay: "200" },
            { icon: Headphones, title: t.about.support, desc: t.about.supportDesc, delay: "300" },
            { icon: Truck, title: t.about.delivery, desc: t.about.deliveryDesc, delay: "400" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 text-center hover:-translate-y-1 hover:shadow-lg hover:border-green-primary/30 transition-all duration-500 animate-fade-in-up delay-${item.delay}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-green-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-charcoal mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent max-w-5xl mx-auto" />

      {/* Founder */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-green-dark via-green-primary to-green-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white/20 blur-[80px] animate-float" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-white/60 text-sm font-semibold mb-4">Leadership</p>
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] mb-8">{t.about.founder}</h2>
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-6 flex items-center justify-center border border-white/30">
            <span className="text-3xl font-[family-name:var(--font-playfair)] font-bold">B</span>
          </div>
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
            Dedicated to transforming the agricultural landscape through innovation and farmer-first principles.
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4">Timeline</p>
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-charcoal">{t.about.journey}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "01", title: t.hero.slide2.title, desc: t.hero.slide2.description, delay: "100" },
            { num: "02", title: t.hero.slide1.title, desc: t.hero.slide1.description, delay: "200" },
            { num: "03", title: t.hero.slide3.title, desc: t.hero.slide3.description, delay: "300" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 text-center hover:-translate-y-1 hover:shadow-lg hover:border-green-primary/30 transition-all duration-500 animate-fade-in-up delay-${item.delay}`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-primary to-green-light text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-lg font-bold font-[family-name:var(--font-playfair)]">{item.num}</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-charcoal mb-3 text-lg">{item.title}</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
