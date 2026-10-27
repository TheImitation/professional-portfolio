"use client";

import React, { useEffect, useRef, useState } from "react";
import { TOUR } from "@/datasets/Copy";

/* ==========================================================================
   FluidTour — the gallery walks you through itself.

   Start it by scrolling once or pressing Enter, then take your hand off:
   the page advances at a reading pace on its own. Touch the wheel again and
   you take over; go quiet and it picks the tour back up.

   The bar at the foot of the page always says which of those is happening,
   because an auto-scrolling page that does not explain itself just feels
   broken.

   The bar is also its pause/play button. Pausing holds the tour for good:
   no wheel, key or quiet spell restarts it until the reader presses play.
   ========================================================================== */

type Mode = "idle" | "touring" | "paused" | "held" | "done";

const SPEED = 275;         /* px per second — ~1 min end to end, ~2.4s a plate */
const RESUME_AFTER = 2200; /* ms of quiet before the tour resumes */

/* ── cadence ──────────────────────────────────────────────────────────────
   The tour moves by the SAME distance every frame. Whole CSS pixels at
   275px/s on a 120Hz screen step 2, 2, 2, 3: a 50% lurch every fourth
   frame. Scroll-linked motion magnifies it — the starfield zooms at up to
   4.5x behind still text, so it read as a judder right where the page is
   otherwise at rest.

   So the frame interval is measured, and SPEED is rounded to a whole
   number of device pixels per frame (browsers snap scroll offsets to device
   pixels; 0.5px on a 2x screen). The real speed lands within ~10% of SPEED.
   A dropped frame is made up in whole steps, so the pace still keeps time. */
const SAMPLE_FRAMES = 8;   /* deltas measured before the step is locked */

export default function FluidTour()
{
  const [mode, setMode] = useState<Mode>("idle");
  const modeRef = useRef<Mode>("idle");
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const posRef = useRef(0);       /* exact target offset; scrollY is snapped */
  const writtenRef = useRef(0);   /* scrollY as the tour last left it */
  const samplesRef = useRef<number[]>([]);
  const frameRef = useRef(0);     /* measured frame interval, ms (0 = unknown) */
  const stepRef = useRef(0);      /* px per frame, a whole number of device px */
  const quietRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<() => void>(() => {});
  const holdRef = useRef<() => void>(() => {});

  useEffect(() =>
  {
    const root = document.documentElement;
    const previousBehaviour = root.style.scrollBehavior;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const set = (next: Mode) => { modeRef.current = next; setMode(next); };
    const atBottom = () => window.scrollY >= root.scrollHeight - window.innerHeight - 2;

    const halt = (next: Mode) =>
    {
      set(next);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
      root.style.scrollBehavior = previousBehaviour;
    };

    /* scroll offsets are held to device pixels; where a browser will not
       hold a fractional offset at all, fall back to whole CSS pixels */
    let quantum = 1 / (window.devicePixelRatio || 1);

    const lock = (interval: number) =>
    {
      frameRef.current = interval;
      stepRef.current = Math.max(1, Math.round((SPEED * interval) / 1000 / quantum)) * quantum;
    };

    const step = (now: number) =>
    {
      if (modeRef.current !== "touring") { rafRef.current = 0; return; }
      const delta = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;

      /* a project overview is open over the page: hold still until it closes */
      if (document.querySelector("dialog[open]"))
      {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      /* something else moved the page (an anchor, a key) — carry on from there */
      if (Math.abs(window.scrollY - writtenRef.current) > 1) posRef.current = window.scrollY;

      if (!frameRef.current)
      {
        /* still measuring the display: travel at the nominal speed meanwhile */
        if (delta > 0 && delta < 50) samplesRef.current.push(delta);
        if (samplesRef.current.length >= SAMPLE_FRAMES)
        {
          const sorted = [...samplesRef.current].sort((a, b) => a - b);
          lock(sorted[Math.floor(sorted.length / 2)]);
          posRef.current = window.scrollY;   /* re-align to the device grid */
        }
        else posRef.current += (SPEED * (delta || 16)) / 1000;
      }
      else
      {
        /* whole steps only — capped so a backgrounded tab does not lurch on return */
        const frames = delta ? Math.min(3, Math.max(1, Math.round(delta / frameRef.current))) : 1;
        posRef.current += frames * stepRef.current;
      }

      window.scrollTo(0, posRef.current);
      writtenRef.current = window.scrollY;
      if (atBottom()) { halt("done"); return; }

      if (frameRef.current && quantum < 1 && Math.abs(writtenRef.current - posRef.current) >= quantum / 2)
      {
        quantum = 1;
        lock(frameRef.current);
        posRef.current = writtenRef.current;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const play = () =>
    {
      if (modeRef.current === "touring") return;
      if (atBottom()) { if (modeRef.current === "held") set("done"); return; }
      /* smooth scrolling would fight a per-frame scrollTo */
      root.style.scrollBehavior = "auto";
      set("touring");
      lastRef.current = 0;
      posRef.current = writtenRef.current = window.scrollY;
      /* re-measured on every start: the window may be on another display now */
      frameRef.current = 0;
      samplesRef.current = [];
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    startRef.current = play;
    holdRef.current = () =>
    {
      if (quietRef.current) { clearTimeout(quietRef.current); quietRef.current = null; }
      halt("held");
    };

    /* the reader took the wheel — yield, then offer it back */
    const yieldControl = () =>
    {
      if (modeRef.current === "idle" || modeRef.current === "held" || modeRef.current === "done") return;
      set("paused");
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
      if (quietRef.current) clearTimeout(quietRef.current);
      quietRef.current = setTimeout(() =>
      {
        if (modeRef.current === "paused") play();
      }, RESUME_AFTER);
    };

    const onWheel = () =>
    {
      if (modeRef.current === "held") return;
      if (modeRef.current === "idle") { if (!reduced) play(); return; }
      yieldControl();
    };

    const onKey = (event: KeyboardEvent) =>
    {
      /* keys belong to an open overview (Esc closes it, not the tour) */
      if (document.querySelector("dialog[open]")) return;
      /* held means held: only a click on the bar lets it go */
      if (modeRef.current === "held") return;
      if (event.key === "Escape") { holdRef.current(); return; }
      if (event.key === "Enter" && (modeRef.current === "idle" || modeRef.current === "done"))
      {
        const target = event.target as HTMLElement | null;
        /* never steal Enter from a link, button or field */
        if (target && /^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
        if (modeRef.current === "done") window.scrollTo({ top: 0, behavior: "auto" });
        play();
        return;
      }
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key))
      {
        yieldControl();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);

    return () =>
    {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onWheel);
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (quietRef.current) clearTimeout(quietRef.current);
      root.style.scrollBehavior = previousBehaviour;
    };
  }, []);

  const copy: Record<Mode, { label: string; action: string }> = TOUR;
  /* the glyph shows what a click will do: pause while it runs, play otherwise */
  const running = mode === "touring" || mode === "paused";

  return (
    <div className={`fluid-tour is-${mode}`}>
      {mode === "idle" && <i className="fluid-tour-cue" aria-hidden="true" />}
      <button
        type="button"
        className="fluid-tour-btn"
        aria-label={copy[mode].action}
        onClick={() =>
        {
          if (mode === "touring" || mode === "paused") holdRef.current();
          else
          {
            if (mode === "done") window.scrollTo({ top: 0, behavior: "auto" });
            startRef.current();
          }
        }}
      >
        <span className="fluid-tour-dot" aria-hidden="true" />
        <span className="fluid-tour-label" aria-live="polite">{copy[mode].label}</span>
        <svg className="fluid-tour-glyph" viewBox="0 0 10 10" aria-hidden="true">
          {running
            ? <path d="M2.5 1.5h1.8v7H2.5ZM5.7 1.5h1.8v7H5.7Z" />
            : <path d="M2.5 1.5 8.5 5 2.5 8.5Z" />}
        </svg>
      </button>
    </div>
  );
}
