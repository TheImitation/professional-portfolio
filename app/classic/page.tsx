import React from "react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { CV_PATH } from "@/datasets/Site";

/* The original one-page site, kept as the classic view. The gallery at /
   is the home page and links here from its chrome. */
export const metadata: Metadata = {
  title: "Classic view",
  alternates: { canonical: "/classic" },
};

export default function Classic() {
  // The CV button only renders once the PDF actually exists in public/.
  const cvAvailable = fs.existsSync(path.join(process.cwd(), "public", CV_PATH));

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
