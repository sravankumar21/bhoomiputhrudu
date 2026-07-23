"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function SignupPage() {
  const { t } = useLanguage();
  const { login } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobile_no: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.mobile_no || !form.password) {
      toast.error(t.fillAllFields);
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error(t.passwordsDoNotMatch);
      return;
    }
    if (form.password.length < 6) {
      toast.error(t.passwordMinLength);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          mobile_no: form.mobile_no,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.data) {
        login(data.data.token, data.data.farmer);
        toast.success(t.signupSuccess);
        router.push("/");
      } else {
        toast.error(data?.message || t.signupFailed);
      }
    } catch {
      toast.error(t.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sprout className="w-10 h-10 text-green-600" />
            <span className="text-2xl font-bold text-green-800">Bhoomiputhrudu</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-6">{t.createAccount}</h1>
          <p className="text-gray-600 mt-2">{t.signupSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder={t.firstName}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName}</label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder={t.lastName}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.mobileNumber}</label>
            <input
              type="tel"
              name="mobile_no"
              value={form.mobile_no}
              onChange={handleChange}
              placeholder={t.enterMobile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} ({t.optional})</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t.enterEmail}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={t.enterPassword}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.confirmPassword}</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder={t.confirmPassword}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.creatingAccount : t.signup}
          </button>

          <p className="text-center text-sm text-gray-600">
            {t.alreadyHaveAccount}{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              {t.login}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
