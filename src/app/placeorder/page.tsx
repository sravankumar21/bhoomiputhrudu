"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, CreditCard, CheckCircle, ShoppingBag, ArrowLeft, Plus } from "lucide-react";
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

export default function PlaceOrderPage() {
  const { t } = useLanguage();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: "", apartment: "", city: "", state: "", pincode: "", phone: "",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">{t.checkout.title}</h1>

        <div className="flex items-center justify-center gap-2 mb-8">
          {[t.checkout.step1, t.checkout.step2, t.checkout.step3, t.checkout.step4].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className="hidden sm:inline text-sm">{s}</span>
              {i < 3 && <div className={`w-8 h-0.5 ${i < step ? "bg-green-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="text-center bg-white rounded-xl shadow-sm p-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.auth.login.title}</h2>
            <Link href="/login" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 mt-4">
              {t.auth.login.submit}
            </Link>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" /> {t.checkout.address.title}
              </h2>
              <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-green-600 font-medium text-sm flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> {t.checkout.address.addNew}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={addAddress} className="mb-6 p-4 bg-green-50 rounded-lg space-y-3">
                <input type="text" placeholder={t.checkout.address.fullName} value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" placeholder={t.checkout.address.apartment} value={addressForm.apartment} onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder={t.checkout.address.city} value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" required />
                  <input type="text" placeholder={t.checkout.address.state} value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder={t.checkout.address.pincode} value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" required />
                  <input type="text" placeholder={t.checkout.address.phone} value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">{t.common.save}</button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">{t.common.cancel}</button>
                </div>
              </form>
            )}

            {addresses.length === 0 && !showAddressForm ? (
              <p className="text-gray-500 text-center py-4">{t.common.noResults}</p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label key={addr._id} className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedAddress?._id === addr._id ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="address" checked={selectedAddress?._id === addr._id} onChange={() => setSelectedAddress(addr)} className="accent-green-600 mr-2" />
                    <span className="text-sm text-gray-700">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</span>
                  </label>
                ))}
              </div>
            )}
            <button onClick={() => setStep(2)} disabled={!selectedAddress} className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <ShoppingBag className="w-5 h-5 text-green-600" /> {t.checkout.summary.title}
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product_id?.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm">₹{(item.product_id?.price || 0) * item.quantity}</p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="text-sm space-y-2">
              <div className="flex justify-between"><span className="text-gray-600">{t.cart.subtotal}</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">{t.cart.deliveryCharge}</span><span>₹{delivery}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>{t.cart.total}</span><span className="text-green-700">₹{total}</span></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-green-600" /> {t.checkout.payment.title}
            </h2>
            <div className="space-y-4">
              <label className="block p-4 rounded-lg border-2 border-green-600 bg-green-50 cursor-pointer">
                <input type="radio" name="payment" checked readOnly className="accent-green-600 mr-2" />
                <span className="font-medium">{t.checkout.payment.cod}</span>
              </label>
              <label className="block p-4 rounded-lg border-2 border-gray-200 cursor-not-allowed opacity-60">
                <input type="radio" name="payment" disabled className="mr-2" />
                <span className="font-medium">{t.checkout.payment.online} ({t.checkout.payment.comingSoon})</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={placeOrder} disabled={placing} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50">
                {placing ? t.common.loading : t.checkout.placeOrder}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
