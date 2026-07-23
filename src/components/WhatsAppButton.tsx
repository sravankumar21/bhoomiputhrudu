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
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
