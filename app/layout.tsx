import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SidePanel from "@/components/SidePanel";
import ConsoleEgg from "@/components/ConsoleEgg";
import { EMPLOYER, HEADSHOT, JOB_ROLES, PERSON, SEO_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL, SOCIALS } from "@/datasets/Site";
import { SKILL_DOMAINS } from "@/datasets/Content";

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
  keywords: [PERSON.name, PERSON.brand, ...JOB_ROLES, EMPLOYER.name, ...SEO_KEYWORDS],
  authors: [{ name: PERSON.name, url: SOCIAL.linkedin.url }],
  creator: PERSON.brand,
  publisher: PERSON.brand,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  // og:image / twitter:image come from app/opengraph-image.tsx (file convention)
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: SITE_TITLE,
    description: PERSON.tagline,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
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
  image: `${SITE_URL}${HEADSHOT.src}`,
  worksFor: { "@type": "Organization", name: EMPLOYER.name },
  knowsAbout: SKILL_DOMAINS.map((domain) => domain.title),
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
