"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

const categoryOptions = ["Seeds", "Fertilizers", "Pesticides", "Tools", "Irrigation", "Organic"];

const subcategoryMap: Record<string, string[]> = {
  Seeds: ["Vegetable Seeds", "Fruit Seeds", "Flower Seeds", "Grain Seeds", "Herb Seeds"],
  Fertilizers: ["Organic Fertilizers", "Chemical Fertilizers", "Bio Fertilizers", "Micronutrients", "Soil Conditioners"],
  Pesticides: ["Insecticides", "Fungicides", "Herbicides", "Rodenticides", "Bio Pesticides"],
  Tools: ["Hand Tools", "Power Tools", "Sprayers", "Harvesting Tools"],
  Irrigation: ["Drip Irrigation", "Sprinkler Systems", "Hoses & Pipes", "Water Tanks"],
  Organic: ["Compost", "Vermicompost", "Neem Products", "Bio Stimulants"],
};

export default function AddProductPage() {
  const { t } = useLanguage();
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    image: "",
    unit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "category") {
        updated.subcategory = "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error(t.admin.fillRequiredFields);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          subcategory: form.subcategory,
          stock: form.stock ? parseInt(form.stock) : 0,
          image: form.image,
          unit: form.unit,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(t.admin.productAdded);
        router.push("/admin/manage-products");
      } else {
        toast.error(data?.message || t.admin.failedToAdd);
      }
    } catch {
      toast.error(t.admin.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sand/60 rounded-2xl text-sm text-charcoal outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary/50 transition-all duration-500 placeholder:text-charcoal-muted/60";

  const labelClass = "block text-sm font-semibold text-charcoal mb-2";

  return (
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl border border-sand/40 flex items-center justify-center text-charcoal hover:text-green-primary hover:border-green-primary/30 transition-all duration-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="uppercase tracking-[0.2em] text-gold text-xs font-semibold">Products</p>
            <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-charcoal">{t.admin.addNewProduct}</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 md:p-10 space-y-6 animate-fade-in-up delay-200"
        >
          <div>
            <label className={labelClass}>{t.admin.productName} *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>{t.admin.description}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t.admin.price} *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>{t.admin.stock}</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t.admin.category} *</label>
              <select name="category" value={form.category} onChange={handleChange} className={`${inputClass} bg-white`} required>
                <option value="">{t.admin.selectCategory}</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t.admin.subcategory}</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange} className={`${inputClass} bg-white`} disabled={!form.category}>
                <option value="">{t.admin.selectSubcategory}</option>
                {(subcategoryMap[form.category] || []).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>{t.admin.unit}</label>
            <input type="text" name="unit" value={form.unit} onChange={handleChange} placeholder="e.g. kg, piece, litre" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t.admin.imageUrl}</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://..." className={inputClass} />
            {form.image && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-sand/40">
                <img src={form.image} alt="Preview" className="w-32 h-32 object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-primary to-green-light text-white rounded-full py-3.5 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-500 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            {loading ? t.admin.adding : t.admin.addProduct}
          </button>
        </form>
      </div>
    </div>
  );
}
