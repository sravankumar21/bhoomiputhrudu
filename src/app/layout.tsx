import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/store/language";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhoomiputhrudu | భూమిపుత్రుడు - Son of the Soil",
  description: "Your trusted partner in agriculture. Quality agricultural products for the farmers of Andhra Pradesh & Telangana.",
  keywords: ["agriculture", "farming", "seeds", "fertilizers", "irrigation", "Andhra Pradesh", "Telangana", "Telugu"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <LanguageProvider>
          <Header />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "16px",
                background: "#fff",
                color: "#2c2c2c",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
