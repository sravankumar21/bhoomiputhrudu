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
      toast.error(t.fillRequiredFields);
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
        toast.success(t.productAdded);
        router.push("/admin/manage-products");
      } else {
        toast.error(data?.message || t.failedToAdd);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-green-600 hover:text-green-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{t.addNewProduct}</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.productName} *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.price} *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.stock}</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.category} *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              >
                <option value="">{t.selectCategory}</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.subcategory}</label>
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white"
                disabled={!form.category}
              >
                <option value="">{t.selectSubcategory}</option>
                {(subcategoryMap[form.category] || []).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.unit}</label>
            <input
              type="text"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="e.g. kg, piece, litre"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.imageUrl}</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {loading ? t.adding : t.addProduct}
          </button>
        </form>
      </div>
    </div>
  );
}
