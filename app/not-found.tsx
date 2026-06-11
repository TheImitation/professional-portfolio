import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PixelPal } from "@/components/SpriteQuest";
import "../styles/components/NotFound.css";

export const metadata: Metadata = {
  title: "404 — route not found",
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
        <h1 className="nf-code faux-shimmer faux-mono">404</h1>
        <p className="nf-title">This route is an imitation.</p>
        <p className="nf-copy faux-mono">
          {"// a convincing one, but false — nothing renders here."}
          <br />
          {"// even the sprite came up empty."}
        </p>
        <Link className="faux-btn faux-solid" href="/">
          cd ~/home
        </Link>
      </section>
    </main>
  );
}
