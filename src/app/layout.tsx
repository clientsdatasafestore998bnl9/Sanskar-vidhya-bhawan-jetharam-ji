import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanskar Vidya Bhavan | Shaping Tomorrow's Leaders Today",
  description: "Bhinmal's Premier RBSE School providing holistic education in both English and Hindi mediums.",
  manifest: "/manifest.json",
  themeColor: "#020617",
};

import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body text-primary bg-white selection:bg-accent selection:text-white">
        <SplashScreen />
        {children}
        <PwaInstallPrompt />
        <WhatsAppButton />
        {/* Mobile invisible scroll spacer to clear the floating navbar globally */}
        <div className="h-[80px] lg:hidden bg-transparent w-full" />
      </body>
    </html>
  );
}

