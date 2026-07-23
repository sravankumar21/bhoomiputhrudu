"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "919381935889";
  const message = encodeURIComponent(
    "నమస్కారం! భూమిపుత్రుడు నుండి సహాయం కావాలి / Hello! I need help from Bhoomiputhrudu."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-whatsapp-pulse" />
        <MessageCircle className="relative h-6 w-6 lg:h-7 lg:w-7" />
      </a>
    </div>
  );
}
