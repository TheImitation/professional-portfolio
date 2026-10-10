import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { CTA } from "@/datasets/Copy";
import { cvAvailable as hasCv } from "@/lib/cv";

/* The original one-page site, kept as the classic view. The gallery at /
   is the home page and links here from its chrome. */
export const metadata: Metadata = {
  title: CTA.classic,
  alternates: { canonical: "/classic" },
};

export default function Classic() {
  const cvAvailable = hasCv();

  return (
    <main>
      <Hero cvAvailable={cvAvailable} />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  );
}
