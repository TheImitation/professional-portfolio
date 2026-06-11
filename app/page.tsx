import React from "react";
import fs from "fs";
import path from "path";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { CV_PATH } from "@/datasets/Site";

export default function Home() {
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
