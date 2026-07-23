# Bhoomiputhrudu Design System & UI Patterns

## Project Overview
Bhoomiputhrudu (భూమిపుత్రుడు) — "Son of the Soil". A premium agricultural e-commerce platform for farmers of Andhra Pradesh & Telangana. Premium feel matching Atelier Shubhangi quality.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Icons:** Lucide React
- **State:** Zustand (auth, cart) + React Context (language)
- **Notifications:** react-hot-toast
- **Animations:** CSS `@utility` directives + `@keyframes` (NO Tailwind config file — Tailwind v4 uses CSS-based config)
- **Fonts:** Google Fonts via `next/font/google`
  - Headings: `Playfair Display` (serif) — `--font-playfair`
  - Body: `Inter` (sans-serif) — `--font-inter`

---

## Color Palette

### CSS Custom Properties (defined in `globals.css` @theme inline)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-ivory` | `#fefdfb` | Page background |
| `--color-cream` | `#f5f0e8` | Section alternating bg, cards |
| `--color-sand` | `#ede4d4` | Borders, subtle dividers |
| `--color-sand-dark` | `#d4c5ab` | Gradient divider center |
| `--color-green-primary` | `#2d6a4f` | Primary CTA, accents, links |
| `--color-green-light` | `#40916c` | Gradient endpoint, hover states |
| `--color-green-dark` | `#1b4332` | Dark sections, footer, hero bg |
| `--color-green-muted` | `#74c69d` | Light accents, badges |
| `--color-green-pale` | `#d8f3dc` | Pale backgrounds, hover tints |
| `--color-gold` | `#b8860b` | Section labels, sale badges |
| `--color-gold-light` | `#daa520` | Gold accents |
| `--color-gold-dark` | `#8b6914` | Dark gold |
| `--color-earth` | `#5c4033` | Earth tones |
| `--color-earth-light` | `#8b7355` | Light earth |
| `--color-charcoal` | `#2c2c2c` | Primary text |
| `--color-charcoal-muted` | `#6b6b6b` | Secondary text |

### Tailwind Usage Map
```
bg-ivory          → page bg
bg-cream          → alternating sections
bg-sand           → borders
bg-green-primary  → CTAs, icons
bg-green-light    → gradients
bg-green-dark     → dark sections
bg-green-muted    → accent text
bg-green-pale     → hover tints
bg-gold           → labels, badges
text-charcoal     → headings
text-charcoal-muted → body secondary
```

---

## Typography

### Font Families
```css
/* Applied via CSS variables */
--font-sans: var(--font-inter);        /* body text */
--font-heading: var(--font-playfair);  /* headings */

/* Tailwind usage */
font-[family-name:var(--font-playfair)]  /* headings */
font-[family-name:var(--font-inter)]     /* body (default) */
```

### Type Scale
| Element | Classes | Example |
|---------|---------|---------|
| Hero Title | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight` | Large serif hero |
| Section Title | `text-3xl md:text-4xl lg:text-5xl font-bold` | Section headings |
| Card Title | `text-xl font-bold` | Card titles |
| Body | `text-sm leading-relaxed` | Paragraphs |
| Small/Label | `text-xs font-medium uppercase tracking-[0.2em]` | Section badges |
| Nav Link | `text-sm font-medium` | Navigation |

### Gradient Text Utility
```css
@utility gradient-text {
  background: linear-gradient(135deg, var(--color-green-primary), var(--color-green-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
Usage: `<span className="gradient-text">Accent Word</span>`

---

## Layout System

### Container
```html
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### Section Pattern (every section follows this)
```html
<section className="relative overflow-hidden bg-[color] py-20 md:py-28">
  <!-- Ambient blobs (background decoration) -->
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
    <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
  </div>
  
  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- Section Badge -->
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">Section Label</p>
    <!-- Section Heading -->
    <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-charcoal md:text-4xl">
      Heading <span className="gradient-text">Accent</span>
    </h2>
    <!-- Content Grid -->
    ...
  </div>
</section>
```

### Alternating Section Backgrounds
```
Hero:      bg-gradient-to-br from-green-dark via-green-primary to-green-dark
Section 1: bg-cream
Divider:   gradient-divider
Section 2: bg-ivory
Divider:   gradient-divider
Section 3: bg-gradient-to-br from-green-dark via-green-dark to-green-primary (dark)
Divider:   gradient-divider
Section 4: bg-cream
```

---

## Animation System

### Keyframes (defined in globals.css)
| Animation | Duration | Usage |
|-----------|----------|-------|
| `fade-in-up` | 0.8s | Entrance animation, staggered |
| `fade-in` | 0.6s | Simple fade entrance |
| `scale-in` | 0.5s | Scale entrance |
| `slide-in-left` | 0.7s | Left slide entrance |
| `slide-in-right` | 0.7s | Right slide entrance |
| `float` | 6s infinite | Decorative floating elements |
| `float-slow` | 8s infinite | Slow decorative floating |
| `pulse-glow` | 4s infinite | Ambient blob pulsing |
| `shimmer` | 3s infinite | Loading shimmer effect |
| `rotate-slow` | 20s infinite | Rotating decorative circles |
| `border-glow` | 3s infinite | Border glow effect |
| `whatsapp-pulse` | 2s infinite | WhatsApp button pulse |

### Utility Classes
```css
@utility animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
@utility animate-fade-in { animation: fade-in 0.6s ease-out both; }
@utility animate-scale-in { animation: scale-in 0.5s ease-out both; }
@utility animate-slide-in-left { animation: slide-in-left 0.7s ease-out both; }
@utility animate-slide-in-right { animation: slide-in-right 0.7s ease-out both; }
@utility animate-float { animation: float 6s ease-in-out infinite; }
@utility animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
@utility animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
@utility animate-shimmer { animation: shimmer 3s ease-in-out infinite; background-size: 200% 100%; }
@utility animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
@utility animate-border-glow { animation: border-glow 3s ease-in-out infinite; }
@utility animate-whatsapp-pulse { animation: whatsapp-pulse 2s ease-in-out infinite; }
```

### Staggered Delays
```css
@utility delay-100 { animation-delay: 100ms; }
@utility delay-200 { animation-delay: 200ms; }
@utility delay-300 { animation-delay: 300ms; }
@utility delay-400 { animation-delay: 400ms; }
@utility delay-500 { animation-delay: 500ms; }
@utility delay-600 { animation-delay: 600ms; }
@utility delay-700 { animation-delay: 700ms; }
@utility delay-800 { animation-delay: 800ms; }
```

### Usage Pattern
```html
<!-- Staggered entrance for grid items -->
<div className="animate-fade-in-up delay-100">Item 1</div>
<div className="animate-fade-in-up delay-200">Item 2</div>
<div className="animate-fade-in-up delay-300">Item 3</div>

<!-- Floating decorative elements -->
<div className="animate-float">Floating element</div>
<div className="animate-float-slow">Slow floating element</div>

<!-- Ambient blobs -->
<div className="animate-pulse-glow">Pulsing blob</div>
<div className="animate-rotate-slow">Rotating circle</div>
```

---

## Special Utilities

### Glass Effects
```css
@utility glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
}
@utility glass-strong {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
}
```

### Gradient Divider
```css
@utility gradient-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-sand-dark), transparent);
}
```

### Ambient Blob
```css
@utility ambient-blob {
  pointer-events: none;
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
}
```

### Custom Scrollbar
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-cream); }
::-webkit-scrollbar-thumb { background: var(--color-green-primary); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-green-dark); }
```

### Selection Color
```css
::selection { background: var(--color-green-muted); color: white; }
```

---

## Component Patterns

### 1. Navbar (Sticky Glass Nav)
```html
<nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-sand/40 shadow-sm">
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="ambient-blob top-0 left-1/4 h-32 w-64 bg-green-primary/4" />
  </div>
  <div className="relative max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <!-- Logo: Sprout icon + gradient-text name -->
      <!-- Desktop nav links -->
      <!-- Cart badge: green circle with count -->
      <!-- Language toggle: "తెలుగు" / "EN" -->
      <!-- Auth buttons -->
    </div>
  </div>
</nav>
```

### 2. Header (Top Bar)
```html
<div className="bg-green-dark/95 backdrop-blur-sm text-white/80 text-xs">
  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9">
    <!-- Contact info: phone, email, address -->
    <!-- Social links -->
  </div>
</div>
```

### 3. Hero Section
```html
<section className="relative overflow-hidden bg-gradient-to-br from-green-dark via-green-primary to-green-dark text-white">
  <!-- Background image with overlay -->
  <div className="absolute inset-0">
    <img src="..." class="h-full w-full object-cover opacity-20" />
    <div class="absolute inset-0 bg-gradient-to-br from-green-dark/90 via-green-primary/80 to-green-dark/90" />
  </div>
  
  <!-- Ambient blobs + floating dots + rotating circles -->
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-green-muted/10 blur-[120px] animate-pulse-glow" />
    <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-green-pale/10 blur-[100px] animate-float-slow" />
    <!-- Floating decorative dots -->
    <div className="absolute right-[15%] top-[20%] h-3 w-3 rounded-full bg-green-muted/20 animate-float delay-300" />
  </div>
  
  <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-36 lg:py-44">
    <!-- Badge with icon -->
    <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
      <Sprout className="h-4 w-4 text-green-muted" />
      <span className="text-sm font-medium tracking-wide text-green-pale">Tagline</span>
    </div>
    
    <!-- Title with SVG underline accent -->
    <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
      Regular <span class="relative inline-block">
        <span class="bg-gradient-to-r from-green-muted via-green-pale to-green-muted bg-clip-text text-transparent">Accent</span>
        <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12">
          <path d="M2 8C40 2 80 2 100 5C120 8 160 8 198 3" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </h1>
    
    <!-- Subtitle -->
    <p className="animate-fade-in-up delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/80">Subtitle</p>
    
    <!-- CTA Buttons -->
    <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center gap-4">
      <Link className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-green-muted to-green-light px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-green-primary/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        Shop Now <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/40 hover:bg-white/10">
        Our Story
      </Link>
    </div>
  </div>
  
  <!-- Floating decorative element (rotating circles) -->
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
</section>
```

### 4. Section Header Pattern
```html
<div className="mb-16 text-center">
  <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
    Section Label
  </p>
  <h2 className="animate-fade-in-up delay-100 font-[family-name:var(--font-playfair)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
    Heading <span className="gradient-text">Accent Word</span>
  </h2>
  <p className="animate-fade-in-up delay-200 mx-auto mt-4 max-w-lg text-charcoal-muted leading-relaxed">
    Optional subtitle
  </p>
</div>
```

### 5. Category Card
```html
<Link className="group relative overflow-hidden rounded-2xl border border-sand/40 bg-white shadow-sm transition-all duration-500 hover:border-green-primary/30 hover:shadow-lg hover:-translate-y-1">
  <!-- Image with hover scale -->
  <div className="relative h-48 overflow-hidden">
    <img src="..." className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
  </div>
  <!-- Content -->
  <div className="p-5">
    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-charcoal group-hover:text-green-primary transition-colors duration-300">
      Category Name
    </h3>
    <p className="text-sm text-charcoal-muted mt-1">Description</p>
  </div>
</Link>
```

### 6. Product Card
```html
<div className="group relative overflow-hidden rounded-2xl border border-sand/40 bg-white shadow-sm transition-all duration-500 hover:border-green-primary/30 hover:shadow-lg hover:-translate-y-1">
  <!-- Image -->
  <div className="relative h-56 overflow-hidden">
    <img src="..." className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <!-- Badge (optional) -->
    <span className="absolute top-3 left-3 rounded-full bg-green-primary px-3 py-1 text-xs font-medium text-white">Organic</span>
    <!-- Hover overlay -->
    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
      <span className="rounded-full bg-white px-6 py-2 text-sm font-medium text-green-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0 shadow-lg">
        View Details
      </span>
    </div>
  </div>
  <!-- Content -->
  <div className="p-5">
    <h3 className="font-semibold text-charcoal text-sm line-clamp-2">Product Name</h3>
    <p className="text-xs text-charcoal-muted mt-1">Farm / Location</p>
    <div className="mt-3 flex items-center justify-between">
      <div>
        <span className="text-lg font-bold text-green-primary">₹299</span>
        <span className="ml-2 text-sm text-charcoal-muted line-through">₹399</span>
      </div>
      <button className="rounded-full bg-green-primary px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-green-dark shadow-sm hover:shadow-md">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

### 7. Feature Card (Why Choose Us - Dark Section)
```html
<div className="group glass rounded-2xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-primary/10">
  <div className="mb-6 inline-flex">
    <div className="rounded-2xl bg-gradient-to-br from-green-muted to-green-light p-4 shadow-lg transition-transform duration-500 group-hover:scale-110">
      <Icon className="h-7 w-7 text-white" />
    </div>
  </div>
  <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-white">Title</h3>
  <p className="text-sm leading-relaxed text-white/70">Description</p>
</div>
```

### 8. Testimonial Card
```html
<div className="group relative overflow-hidden rounded-2xl border border-sand/40 bg-white p-8 shadow-sm transition-all duration-500 hover:border-green-primary/20 hover:shadow-lg hover:-translate-y-1">
  <!-- Quote icon -->
  <Quote className="h-10 w-10 text-gold/30" />
  <!-- Stars -->
  <div className="mb-4 flex gap-1">
    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
  </div>
  <!-- Quote text -->
  <p className="mb-6 text-sm leading-relaxed text-charcoal-muted italic">"Quote text"</p>
  <!-- Author -->
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-primary to-green-light text-sm font-bold text-white">
      RK
    </div>
    <div>
      <p className="text-sm font-semibold text-charcoal">Name</p>
      <p className="text-xs text-charcoal-muted">Location</p>
    </div>
  </div>
</div>
```

### 9. Footer
```html
<footer className="border-t border-sand/40 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
      <!-- Brand column: logo + description -->
      <!-- Links columns with gold uppercase labels -->
    </div>
  </div>
  <!-- Gradient divider -->
  <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent" />
  <!-- Copyright bar -->
  <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
    <p className="text-xs text-charcoal-muted uppercase tracking-widest">© 2024 Bhoomiputhrudu</p>
  </div>
</footer>
```

### 10. WhatsApp Button
```html
<div className="fixed bottom-6 right-6 z-50">
  <div className="absolute inset-0 rounded-full bg-green-500 animate-whatsapp-pulse" />
  <a href="https://wa.me/919381935889?text=..." className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
    <MessageCircle className="h-6 w-6" />
  </a>
</div>
```

---

## Button Patterns

### Primary (Green Gradient)
```html
<button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-primary to-green-light px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-green-light hover:to-green-primary hover:shadow-lg hover:-translate-y-0.5">
  Button Text
</button>
```

### Secondary (Outline)
```html
<button className="inline-flex items-center justify-center rounded-full border border-green-primary px-6 py-3 text-sm font-medium text-green-primary transition-all duration-300 hover:bg-green-primary hover:text-white">
  Button Text
</button>
```

### Ghost (Transparent)
```html
<button className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 transition-colors duration-300 hover:text-green-primary hover:bg-green-pale/30">
  Button Text
</button>
```

---

## Card Patterns

### Glass Card
```html
<div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-green-primary/30">
  Content
</div>
```

### White Card
```html
<div className="rounded-2xl border border-sand/40 bg-white p-6 shadow-sm transition-all duration-500 hover:border-green-primary/20 hover:shadow-lg hover:-translate-y-1">
  Content
</div>
```

---

## Mobile Patterns
- Single column stacking
- Sticky glass navbar with hamburger menu
- Full-width product cards
- Mobile menu: glass-strong backdrop with animated hamburger-to-X

---

## Language Toggle
- Button in navbar: shows "తెలుగు" when English active, "EN" when Telugu active
- Translations stored in `src/locales/en.json` and `src/locales/te.json`
- Accessed via `const { t, language, toggleLanguage } = useLanguage()`
- Flat keys for simple pages: `t.login`, `t.password`, `t.total`
- Nested keys for structured data: `t.nav.home`, `t.cart.title`, `t.auth.login.submit`

---

## Vibe
Fresh, organic, trustworthy, earthy — like walking through a farmer's market online. Clean and uncluttered with natural greens and warm earth tones. Feels healthy, local, and sustainable. Every section breathes freshness. Premium feel matching Atelier Shubhangi quality level.
