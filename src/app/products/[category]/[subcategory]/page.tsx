"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Package, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function SubcategoryPage() {
  const { t } = useLanguage();
  const { token } = useAuthStore();
  const params = useParams();
  const category = params.category as string;
  const subcategory = decodeURIComponent(params.subcategory as string);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = data?.data || data?.products || data;
        setProducts(Array.isArray(items) ? items : []);
      })
      .catch(() => toast.error(t.failedToFetch))
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  const addToCart = async (productId: string) => {
    if (!token) {
      toast.error(t.loginToAddToCart);
      return;
    }
    setAddingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (res.ok) {
        toast.success(t.addedToCart);
      } else {
        const data = await res.json();
        toast.error(data?.message || t.failedToAdd);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-blob h-[500px] w-[500px] -right-32 -top-32 bg-primary" />
        <div className="ambient-blob h-[400px] w-[400px] -left-20 bottom-20 bg-primary-light" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav className="scroll-hidden animate-fade-in flex items-center gap-2 mb-6 text-sm text-text-muted">
          <Link href="/products" className="hover:text-primary transition-colors duration-300">
            {t.allProducts}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/products/${category}`} className="hover:text-primary transition-colors duration-300">
            {t[category] || category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text font-medium">{subcategory}</span>
        </nav>

        <div ref={heroRef} className="scroll-hidden flex items-center gap-4 mb-10">
          <Link
            href={`/products/${category}`}
            className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t[category] || category}</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-text">
              {subcategory}
            </h1>
          </div>
        </div>

        <div className="gradient-divider mb-10" />

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="scroll-hidden animate-fade-in-up text-center py-32">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-text-muted" />
            </div>
            <p className="text-xl font-[family-name:var(--font-playfair)] text-text mb-2">{t.noProductsFound}</p>
            <p className="text-text-muted">Try a different subcategory</p>
          </div>
        ) : (
          <div ref={gridRef} className="scroll-hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {products.map((product: any) => (
              <div
                key={product._id}
                data-scroll-child
                className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || product.images?.[0] || "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?w=300"}
                    alt={product.name}
                    className="w-full h-44 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-text text-sm line-clamp-2 mb-2 font-[family-name:var(--font-playfair)]">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs text-text-muted line-clamp-2 mb-3">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-primary font-bold text-lg">₹{product.price}</p>
                    <button
                      onClick={() => addToCart(product._id)}
                      disabled={addingId === product._id}
                      className="bg-gradient-to-r from-primary to-primary-light text-white p-2.5 rounded-full shadow-md hover:shadow-lg disabled:opacity-50 transition-all duration-300 active:scale-[0.98]"
                    >
                      {addingId === product._id ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
