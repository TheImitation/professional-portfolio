"use client";

import React, { useEffect } from "react";
import { CAREER, CAREER_FROM, CAREER_TO, eraSpan } from "@/datasets/Content";

/* ==========================================================================
   FluidTimeline — one rail, two readings.

     fill   : how far through the page you are (the flow)
     lit    : which years the content in front of you belongs to (the career)

   The active era is found by reading the computed opacity of the plates and
   taking the brightest one, rather than by re-deriving the plate windows in
   JS. The CSS stays the single source of truth for when a plate is on, so
   the two can never drift apart.
   ========================================================================== */

const span = CAREER_TO - CAREER_FROM;
const at = (year: number) => ((year - CAREER_FROM) / span) * 100;

export default function FluidTimeline()
{
  useEffect(() =>
  {
    const root = document.documentElement;
    const rail = document.querySelector<HTMLElement>(".fluid-timeline");
    if (!rail) return;

    const segments = Array.from(rail.querySelectorAll<HTMLElement>("[data-era]"));
    const plates = Array.from(document.querySelectorAll<HTMLElement>(".fluid-plate[data-era]"));
    let queued = false;

    const paint = () =>
    {
      queued = false;

      const travel = root.scrollHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      rail.style.setProperty("--tl-progress", progress.toFixed(4));

      /* brightest plate wins; below .3 nothing is really on screen */
      let best: HTMLElement | null = null;
      let brightest = 0.3;
      for (const plate of plates)
      {
        const opacity = Number.parseFloat(getComputedStyle(plate).opacity) || 0;
        if (opacity > brightest) { brightest = opacity; best = plate; }
      }

      const live = new Set((best?.dataset.era ?? "").split(/\s+/).filter(Boolean));
      rail.classList.toggle("has-era", live.size > 0);
      for (const segment of segments)
      {
        segment.classList.toggle("is-now", live.has(segment.dataset.era ?? ""));
      }
    };

    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(paint); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();

    return () =>
    {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="fluid-timeline" aria-hidden="true">
      <span className="tl-year tl-year-top">{CAREER_FROM}</span>

      <div className="tl-rail">
        <i className="tl-fill" />
        {Array.from({ length: span + 1 }, (_, i) => (
          <i className="tl-notch" key={i} style={{ ["--y" as string]: `${at(CAREER_FROM + i)}%` } as React.CSSProperties} />
        ))}
      </div>

      <div className="tl-eras">
        {CAREER.map((era) => (
          <span
            key={era.id}
            className={`tl-era is-${era.kind}`}
            data-era={era.id}
            style={{
              ["--from" as string]: `${at(era.from)}%`,
              ["--to" as string]: `${at(era.to ?? CAREER_TO)}%`,
            } as React.CSSProperties}
          >
            <b>{era.label}</b>
            <em>{eraSpan(era)}</em>
          </span>
        ))}
      </div>

      <span className="tl-year tl-year-end">{CAREER_TO}</span>
    </aside>
  );
}
