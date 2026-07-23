import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <LanguageProvider>
          <Header />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
