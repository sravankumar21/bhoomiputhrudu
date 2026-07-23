"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  CreditCard,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Plus,
  Truck,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

interface Address {
  _id: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface CartItem {
  _id: string;
  product_id: { _id: string; name: string; price: number; image_url?: string };
  quantity: number;
}

const steps = ["Address", "Summary", "Payment"];

export default function PlaceOrderPage() {
  const { t } = useLanguage();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStep(0);
    } else {
      setStep(1);
      fetchAddresses();
      fetchCart();
    }
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const list = data?.data || data || [];
      setAddresses(Array.isArray(list) ? list : []);
      if (list.length > 0) setSelectedAddress(list[0]);
    } catch {}
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const items = data?.data || data || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch {}
  };

  const addAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(addressForm),
      });
      if (res.ok) {
        toast.success("Address added!");
        setShowAddressForm(false);
        setAddressForm({ address: "", apartment: "", city: "", state: "", pincode: "", phone: "" });
        fetchAddresses();
      }
    } catch {
      toast.error(t.common.error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product_id?.price || 0) * item.quantity, 0);
  const delivery = 40;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          addressId: selectedAddress._id,
          items: cartItems.map((item) => ({
            product_id: item.product_id._id,
            quantity: item.quantity,
          })),
        }),
      });
      if (res.ok) {
        toast.success(t.checkout.success);
        router.push("/");
      } else {
        toast.error(t.common.error);
      }
    } catch {
      toast.error(t.common.error);
    } finally {
      setPlacing(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sand/60 rounded-2xl text-sm text-charcoal outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary/50 transition-all duration-500 placeholder:text-charcoal-muted/60";

  return (
    <div className="relative min-h-screen bg-ivory overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-green-muted/20 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-3">Checkout</p>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-charcoal">
            {t.checkout.title}
          </h1>
        </div>

        {step > 0 && (
          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up delay-100">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    i < step - 1
                      ? "bg-gradient-to-r from-green-primary to-green-light text-white shadow-lg"
                      : i === step - 1
                      ? "bg-gradient-to-r from-green-primary to-green-light text-white shadow-lg animate-pulse-glow"
                      : "bg-sand/40 text-charcoal-muted border border-sand"
                  }`}
                >
                  {i < step - 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`hidden sm:inline text-sm font-medium transition-colors duration-300 ${i <= step - 1 ? "text-charcoal" : "text-charcoal-muted"}`}>
                  {s}
                </span>
                {i < 2 && (
                  <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${i < step - 1 ? "bg-gradient-to-r from-green-primary to-green-light" : "bg-sand"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {step === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-12 text-center animate-fade-in-up delay-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-green-primary" />
            </div>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] text-charcoal mb-3">{t.auth.login.title}</h2>
            <p className="text-charcoal-muted mb-8">Sign in to continue with your order</p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-green-primary to-green-light text-white rounded-full px-10 py-3.5 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {t.auth.login.submit}
            </Link>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-[family-name:var(--font-playfair)] text-charcoal flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-primary" />
                </div>
                {t.checkout.address.title}
              </h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-green-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-500"
              >
                <Plus className="w-4 h-4" /> {t.checkout.address.addNew}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={addAddress} className="mb-8 p-6 bg-green-pale/20 rounded-2xl border border-green-primary/10 space-y-4 animate-fade-in-up">
                <input type="text" placeholder={t.checkout.address.fullName} value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} className={inputClass} required />
                <input type="text" placeholder={t.checkout.address.apartment} value={addressForm.apartment} onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t.checkout.address.city} value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className={inputClass} required />
                  <input type="text" placeholder={t.checkout.address.state} value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className={inputClass} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t.checkout.address.pincode} value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} className={inputClass} required />
                  <input type="text" placeholder={t.checkout.address.phone} value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className={inputClass} required />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-gradient-to-r from-green-primary to-green-light text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl transition-all duration-500">
                    {t.common.save}
                  </button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-2.5 rounded-full text-sm font-medium text-charcoal-muted hover:bg-sand/30 transition-all duration-500">
                    {t.common.cancel}
                  </button>
                </div>
              </form>
            )}

            {addresses.length === 0 && !showAddressForm ? (
              <p className="text-charcoal-muted text-center py-8">{t.common.noResults}</p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <label
                    key={addr._id}
                    className={`block p-5 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:-translate-y-0.5 ${
                      selectedAddress?._id === addr._id
                        ? "border-green-primary bg-green-pale/20 shadow-lg"
                        : "border-sand/40 hover:border-green-primary/30 bg-white/50"
                    } animate-fade-in delay-${(idx + 1) * 100}`}
                  >
                    <input type="radio" name="address" checked={selectedAddress?._id === addr._id} onChange={() => setSelectedAddress(addr)} className="accent-green-primary mr-3" />
                    <span className="text-sm text-charcoal">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedAddress}
                className="bg-gradient-to-r from-green-primary to-green-light text-white rounded-full px-10 py-3 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 animate-fade-in-up delay-200">
            <h2 className="text-xl font-[family-name:var(--font-playfair)] text-charcoal flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-primary" />
              </div>
              {t.checkout.summary.title}
            </h2>

            <div className="space-y-4 mb-8">
              {cartItems.map((item, idx) => (
                <div key={item._id} className={`flex gap-4 items-center p-4 rounded-2xl bg-white/50 border border-sand/30 animate-fade-in delay-${(idx + 1) * 100}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{item.product_id?.name}</p>
                    <p className="text-xs text-charcoal-muted mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm text-charcoal">₹{(item.product_id?.price || 0) * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-sand-dark to-transparent mb-6" />

            <div className="text-sm space-y-3 mb-8">
              <div className="flex justify-between"><span className="text-charcoal-muted">{t.cart.subtotal}</span><span className="text-charcoal font-medium">₹{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-charcoal-muted">{t.cart.deliveryCharge}</span><span className="text-charcoal font-medium">₹{delivery}</span></div>
              <div className="flex justify-between pt-3 border-t border-sand/40">
                <span className="font-[family-name:var(--font-playfair)] text-lg text-charcoal">{t.cart.total}</span>
                <span className="text-green-primary font-bold text-xl">₹{total}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-sand/60 font-medium text-charcoal hover:bg-sand/20 flex items-center gap-2 transition-all duration-500"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-green-primary to-green-light text-white rounded-full px-10 py-3 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl transition-all duration-500"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-sand/40 shadow-xl p-8 animate-fade-in-up delay-200">
            <h2 className="text-xl font-[family-name:var(--font-playfair)] text-charcoal flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-primary/10 to-green-muted/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-primary" />
              </div>
              {t.checkout.payment.title}
            </h2>

            <div className="space-y-4 mb-8">
              <label className="block p-5 rounded-2xl border-2 border-green-primary bg-green-pale/20 cursor-pointer shadow-lg animate-fade-in delay-100">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked readOnly className="accent-green-primary" />
                  <div>
                    <span className="font-semibold text-charcoal">{t.checkout.payment.cod}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Lock className="w-3 h-3 text-green-primary" />
                      <span className="text-xs text-charcoal-muted">Pay when you receive your order</span>
                    </div>
                  </div>
                </div>
              </label>
              <label className="block p-5 rounded-2xl border-2 border-sand/40 cursor-not-allowed opacity-60 animate-fade-in delay-200">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" disabled className="mr-1" />
                  <div>
                    <span className="font-semibold text-charcoal">{t.checkout.payment.online}</span>
                    <span className="text-xs text-charcoal-muted ml-2">({t.checkout.payment.comingSoon})</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-sand/60 font-medium text-charcoal hover:bg-sand/20 flex items-center gap-2 transition-all duration-500"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={placeOrder}
                disabled={placing}
                className="bg-gradient-to-r from-green-primary to-green-light text-white rounded-full px-10 py-3 font-semibold hover:from-green-light hover:to-green-primary shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2 transition-all duration-500"
              >
                {placing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Truck className="w-5 h-5" />
                )}
                {placing ? t.common.loading : t.checkout.placeOrder}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
