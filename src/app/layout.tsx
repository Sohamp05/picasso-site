import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Inter for body, Outfit for headings
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { getSiteSettings } from "@/sanity/lib/queries";
import { SiteSettings } from "@/types/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Picasso | Corporate Branding Solutions",
  description: "Premium corporate branding, promotional products, and customized apparel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings once in layout for the WhatsApp button
  const settings: SiteSettings | null = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton 
          contacts={[
            { name: "Vinay Jain", phoneNumber: "+919731315677" },
            { name: "Abhishek", phoneNumber: "+919071161269" },
          ]}
          message={settings?.whatsappMessage ?? "Hi! I'm interested in your corporate branding solutions."}
        />
      </body>
    </html>
  );
}
