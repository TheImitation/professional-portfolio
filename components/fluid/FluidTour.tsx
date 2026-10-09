"use client";

import React, { useEffect, useRef, useState } from "react";

/* ==========================================================================
   FluidTour — the gallery walks you through itself.

   Start it by scrolling once or pressing Enter, then take your hand off:
   the page advances at a reading pace on its own. Touch the wheel again and
   you take over; go quiet and it picks the tour back up.

   The bar at the foot of the page always says which of those is happening,
   because an auto-scrolling page that does not explain itself just feels
   broken.
   ========================================================================== */

type Mode = "idle" | "touring" | "paused" | "done";

const SPEED = 110;         /* px per second — ~2.6 min end to end, ~6s a plate */
const RESUME_AFTER = 2200; /* ms of quiet before the tour resumes */

export default function FluidTour()
{
  const [mode, setMode] = useState<Mode>("idle");
  const modeRef = useRef<Mode>("idle");
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const carryRef = useRef(0);
  const quietRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<() => void>(() => {});
  const stopRef = useRef<() => void>(() => {});

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

    const step = (now: number) =>
    {
      if (modeRef.current !== "touring") { rafRef.current = 0; return; }
      /* clamped delta so a backgrounded tab does not lurch on return */
      const delta = lastRef.current ? Math.min(now - lastRef.current, 50) : 16;
      lastRef.current = now;
      carryRef.current += (SPEED * delta) / 1000;
      const whole = Math.floor(carryRef.current);
      if (whole > 0) { carryRef.current -= whole; window.scrollBy(0, whole); }
      if (atBottom()) { halt("done"); return; }
      rafRef.current = requestAnimationFrame(step);
    };

    const play = () =>
    {
      if (modeRef.current === "touring" || atBottom()) return;
      /* smooth scrolling would fight a per-frame scrollBy */
      root.style.scrollBehavior = "auto";
      set("touring");
      lastRef.current = 0;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    startRef.current = play;
    stopRef.current = () => halt("idle");

    /* the reader took the wheel — yield, then offer it back */
    const yieldControl = () =>
    {
      if (modeRef.current === "idle" || modeRef.current === "done") return;
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
      if (modeRef.current === "idle") { if (!reduced) play(); return; }
      yieldControl();
    };

    const onKey = (event: KeyboardEvent) =>
    {
      if (event.key === "Escape") { halt("idle"); return; }
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

  const copy: Record<Mode, { label: string; action: string }> = {
    idle:    { label: "scroll once, or press ⏎ — then let go", action: "Begin the tour" },
    touring: { label: "touring — hands off. scroll to take over, esc to stop", action: "Stop the tour" },
    paused:  { label: "you have the wheel — resuming in a moment", action: "Stop the tour" },
    done:    { label: "that was the tour — press ⏎ to walk it again", action: "Walk it again" },
  };

  return (
    <div className={`fluid-tour is-${mode}`}>
      {mode === "idle" && <i className="fluid-tour-cue" aria-hidden="true" />}
      <button
        type="button"
        className="fluid-tour-btn"
        aria-label={copy[mode].action}
        onClick={() =>
        {
          if (mode === "touring" || mode === "paused") stopRef.current();
          else
          {
            if (mode === "done") window.scrollTo({ top: 0, behavior: "auto" });
            startRef.current();
          }
        }}
      >
        <span className="fluid-tour-dot" aria-hidden="true" />
        <span className="fluid-tour-label" aria-live="polite">{copy[mode].label}</span>
      </button>
    </div>
  );
}
