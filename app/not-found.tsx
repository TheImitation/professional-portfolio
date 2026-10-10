import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PixelPal } from "@/components/SpriteQuest";
import { CTA, NOT_FOUND } from "@/datasets/Copy";
import Rich from "@/components/Rich";
import "../styles/components/NotFound.css";

export const metadata: Metadata = {
  title: `${NOT_FOUND.code} · ${NOT_FOUND.title}`,
  robots: { index: false },
};

export default function NotFound()
{
  return (
    <main>
      <section className="not-found">
        <div className="nf-pal" aria-hidden="true">
          <PixelPal />
        </div>
        <h1 className="nf-code faux-shimmer faux-mono">{NOT_FOUND.code}</h1>
        <p className="nf-title">{NOT_FOUND.heading}</p>
        <p className="nf-copy faux-mono"><Rich text={NOT_FOUND.lines.join("\n")} /></p>
        <Link className="faux-btn faux-solid" href="/">
          {CTA.home}
        </Link>
      </section>
    </main>
  );
}
