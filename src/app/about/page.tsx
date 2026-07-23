"use client";

import { Award, Heart, Clock, Users, Target, Eye, Sprout } from "lucide-react";
import { useLanguage } from "@/store/language";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: Award, title: t.about.quality, desc: t.about.qualityDesc },
    { icon: Heart, title: t.about.trust, desc: t.about.trustDesc },
    { icon: Users, title: t.about.support, desc: t.about.supportDesc },
    { icon: Clock, title: t.about.delivery, desc: t.about.deliveryDesc },
  ];

  const journey = [
    { num: "2018", title: "Founded", desc: "Started with a vision to serve farmers" },
    { num: "2020", title: "1000+ Farmers", desc: "Reached milestone of serving 1000 farmers" },
    { num: "2022", title: "Expanded", desc: "Expanded to all districts in AP & TS" },
    { num: "2024", title: "10,000+ Orders", desc: "Served over 10,000 successful orders" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-24 md:py-32 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-[100px] animate-pulse-soft" />
          <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-primary-50/10 blur-[80px] animate-float" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 mb-6">
            <Sprout className="h-4 w-4 text-primary-light" />
            <span className="text-sm font-medium text-white/90">Our Story</span>
          </div>
          <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.about.title}</h1>
          <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto text-lg text-white/70">{t.site.description}</p>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Mission & Vision */}
      <section className="relative py-20 md:py-28 bg-bg overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-soft" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="animate-fade-in-left rounded-2xl border border-border bg-bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4 inline-flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50"><Target className="h-6 w-6 text-primary" strokeWidth={1.5} /></div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Purpose</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-text mb-3">{t.about.mission}</h2>
              <p className="text-sm leading-relaxed text-text-muted">{t.about.missionText}</p>
            </div>
            <div className="animate-fade-in-right rounded-2xl border border-border bg-bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4 inline-flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50"><Eye className="h-6 w-6 text-primary" strokeWidth={1.5} /></div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Aspiration</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-text mb-3">{t.about.vision}</h2>
              <p className="text-sm leading-relaxed text-text-muted">{t.about.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Values */}
      <section className="relative py-20 md:py-28 bg-bg-warm overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[80px] animate-pulse-soft" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Principles</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-text">{t.about.values}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, i) => (
              <div key={i} className="animate-fade-in-up group rounded-2xl border border-border bg-bg-card p-6 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="mx-auto mb-4 inline-flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-text mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Founder */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-dark via-primary-dark to-primary overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/8 blur-[100px] animate-pulse-soft" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-left grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-light/20 to-primary-50/20 flex items-center justify-center border border-white/10">
              <div className="text-center">
                <span className="text-6xl font-[family-name:var(--font-playfair)] font-bold text-white/80">B</span>
                <p className="mt-2 text-sm text-white/50">Founder</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">Leadership</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-white mb-6">{t.about.founder}</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                With over two decades of experience in agricultural science, our founder envisioned a platform that bridges the gap between quality agricultural inputs and the hardworking farmers of Andhra Pradesh & Telangana.
              </p>
              <div className="flex gap-8">
                {[{ value: "20+", label: "Years Exp." }, { value: "10K+", label: "Farmers" }, { value: "50+", label: "Districts" }].map((stat, i) => (
                  <div key={i}>
                    <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary-light">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Journey */}
      <section className="relative py-20 md:py-28 bg-bg overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-soft" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Timeline</p>
            <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-text">{t.about.journey}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, i) => (
              <div key={i} className="animate-fade-in-up rounded-2xl border border-border bg-bg-card p-6 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <span className="text-lg font-bold font-[family-name:var(--font-playfair)] text-primary">{item.num}</span>
                <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-text mt-2 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
