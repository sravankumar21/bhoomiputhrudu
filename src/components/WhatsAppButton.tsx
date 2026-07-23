"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/store/language";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919381935889";

export default function WhatsAppButton() {
  const { language } = useLanguage();

  const message =
    language === "te"
      ? "నమస్కారం! భూమిపుత్రుడు నుండి సహాయం కావాలి."
      : "Hello! I need help from Bhoomiputhrudu.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group animate-fade-in-up"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-whatsapp-pulse" />

      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-500">
        <MessageCircle size={26} strokeWidth={1.8} />
      </span>
    </a>
  );
}
