import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SidePanel from "@/components/SidePanel";
import ConsoleEgg from "@/components/ConsoleEgg";
import { PERSON, SITE_URL, SOCIALS } from "@/datasets/Site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} — ${PERSON.brand} | ${PERSON.title}`,
    template: `%s | ${PERSON.brand}`,
  },
  description: `${PERSON.name} (${PERSON.brand}) — ${PERSON.title}. ${PERSON.tagline} ${PERSON.availability}.`,
  keywords: [
    "Nic Defaux",
    "TheImitation",
    "Senior Software Engineer",
    "Technical Strategist",
    "AI Platform",
    "Generative AI",
    "Solution Architect",
    "IBM",
    "Public Sector",
    "TypeScript",
    "Next.js",
    "AWS",
  ],
  authors: [{ name: PERSON.name, url: SOCIALS[0].url }],
  creator: PERSON.brand,
  publisher: PERSON.brand,
  applicationName: `${PERSON.brand} Portfolio`,
  alternates: { canonical: "/" },
  // og:image / twitter:image come from app/opengraph-image.tsx (file convention)
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: `${PERSON.name} — ${PERSON.title}`,
    description: PERSON.tagline,
    siteName: `${PERSON.brand} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON.name} — ${PERSON.title}`,
    description: PERSON.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  viewport: { width: "device-width", initialScale: 1.0 },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  alternateName: PERSON.brand,
  jobTitle: PERSON.title,
  description: PERSON.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/headshot.jpg`,
  worksFor: { "@type": "Organization", name: "IBM" },
  knowsAbout: [
    "Artificial Intelligence",
    "Software Architecture",
    "Cloud Computing",
    "User Experience Design",
    "Technical Strategy",
  ],
  sameAs: SOCIALS.map((s) => s.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <div className="faux-veil" aria-hidden="true">
          <div className="faux-grid" />
        </div>
        <SidePanel />
        <Navbar />
        <ConsoleEgg />
        {children}
      </body>
    </html>
  );
}
