"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/language";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuthStore();
  const router = useRouter();
  const [mobile_no, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile_no || !password) {
      toast.error(t.fillAllFields);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, password }),
      });
      const data = await res.json();
      if (res.ok && data?.data) {
        login(data.data.token, data.data.farmer);
        toast.success(t.loginSuccess);
        router.push("/");
      } else {
        toast.error(data?.message || t.loginFailed);
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
          <h1 className="text-2xl font-bold text-gray-800 mt-6">{t.login}</h1>
          <p className="text-gray-600 mt-2">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.mobileNumber}</label>
            <input
              type="tel"
              value={mobile_no}
              onChange={(e) => setMobile(e.target.value)}
              placeholder={t.enterMobile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.loggingIn : t.login}
          </button>

          <p className="text-center text-sm text-gray-600">
            {t.noAccount}{" "}
            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
              {t.signup}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
