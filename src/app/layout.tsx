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
  metadataBase: new URL('https://www.svbbhinmal.com'),
  title: {
    default: "Best School in Bhinmal | Sanskar Vidya Bhawan",
    template: "%s | Sanskar Vidya Bhawan Bhinmal"
  },
  description: "Looking for the best school near you in Bhinmal? Sanskar Vidya Bhawan offers premier English & Hindi medium education, modern facilities, and a safe environment for your child's future.",
  keywords: ["best school near me", "best school in Bhinmal", "top 5 schools in Bhinmal", "top 10 schools in Bhinmal", "top 3 schools in Bhinmal", "best English medium school near me", "best Hindi medium school near me", "best English medium school in Bhinmal", "best Hindi medium school in Bhinmal", "Sanskar Vidya Bhawan Bhinmal", "top schools in Jalore district", "good schools in Bhinmal area", "best RBSE school in Bhinmal"],
  authors: [{ name: "Sanskar Vidya Bhawan" }],
  creator: "Technodhaam",
  publisher: "Sanskar Vidya Bhawan",
  manifest: "/manifest.json",
  themeColor: "#020617",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Best School in Bhinmal | Sanskar Vidya Bhawan",
    description: "Discover why parents trust Sanskar Vidya Bhawan as one of the top schools in Bhinmal. Quality education, excellent results, and holistic development.",
    url: "https://www.svbbhinmal.com",
    siteName: "Sanskar Vidya Bhawan",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Sanskar Vidya Bhawan Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top School in Bhinmal | Sanskar Vidya Bhawan",
    description: "Looking for the best school near you? Join Sanskar Vidya Bhawan for premier education in Bhinmal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sanskar Vidya Bhawan",
    "alternateName": "Sanskar Vidya Bhavan Bhinmal",
    "description": "Looking for the best school near you in Bhinmal? Sanskar Vidya Bhawan offers premier English & Hindi medium education, modern facilities, and a safe environment for your child's future.",
    "url": "https://www.svbbhinmal.com",
    "logo": "https://www.svbbhinmal.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/sanskarvidyabhawan",
      "https://www.instagram.com/sanskarvidyabhawan"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhinmal",
      "addressLocality": "Bhinmal",
      "addressRegion": "Rajasthan",
      "postalCode": "343029",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.0025",
      "longitude": "72.2612"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.0025",
        "longitude": "72.2612"
      },
      "geoRadius": "50000"
    },
    "telephone": "+91-9928509831",
    "email": "info@svbbhinmal.com"
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
