"use client";

import React, { useEffect } from "react";

/* ==========================================================================
   FluidChrome — enhancement only.

   The prototype is choreographed entirely in CSS. This handles the two
   things CSS still cannot do for itself:
     1. name the room you are standing in
     2. carry the atmosphere in browsers without scroll timelines
   ========================================================================== */

export interface RoomRef
{
  id: string;
  numeral: string;
  name: string;
}

/* the same stop table as @keyframes fluid-atmosphere, for the fallback */
const STOPS: [number, number, number, number][] = [
  [0.00, 232, 0.030, 5],
  [0.13, 244, 0.055, 10],
  [0.27, 276, 0.065, 16],
  [0.41, 312, 0.070, 13],
  [0.54, 348, 0.065, 18],
  [0.66, 386, 0.075, 22],
  [0.78, 414, 0.080, 26],
  [0.89, 330, 0.055, 14],
  [1.00, 232, 0.028, 5],
];

export default function FluidChrome({ rooms }: { rooms: RoomRef[] })
{
  useEffect(() =>
  {
    const root = document.documentElement;
    const sdt = CSS.supports("animation-timeline", "scroll()");
    root.classList.toggle("no-sdt", !sdt);

    const nodes = rooms
      .map((room) => document.getElementById(room.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const numeral = document.querySelector("[data-room-numeral]");
    const label = document.querySelector("[data-room-label]");
    const ticks = new Map(
      Array.from(document.querySelectorAll<HTMLElement>(".fluid-ticks a"))
        .map((tick) => [tick.dataset.tick ?? "", tick]),
    );

    /* whichever room holds the middle band of the viewport is the room
       you are standing in */
    const inBand = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) =>
      {
        for (const entry of entries)
        {
          const node = entry.target as HTMLElement;
          entry.isIntersecting ? inBand.add(node) : inBand.delete(node);
        }
        const here = nodes.filter((node) => inBand.has(node)).pop();
        if (!here) return;
        const room = rooms.find((candidate) => candidate.id === here.id);
        if (!room) return;
        if (numeral) numeral.textContent = room.numeral;
        if (label) label.textContent = room.name;
        ticks.forEach((tick, id) => tick.classList.toggle("here", id === room.id));
      },
      { rootMargin: "-49% 0px -49% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    /* Without scroll timelines the atmosphere keyframes never advance and
       the whole prototype would sit in one static blue. Same stop table,
       interpolated by hand, keeps the hue travelling. */
    let queued = false;
    const weather = document.querySelector<HTMLElement>(".fluid-weather");
    const tail = document.querySelector<HTMLElement>(".tail");

    const measure = () =>
    {
      queued = false;
      const span = root.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      root.style.setProperty("--page", progress.toFixed(4));

      if (weather)
      {
        let i = 1;
        while (i < STOPS.length - 1 && STOPS[i][0] < progress) i++;
        const a = STOPS[i - 1];
        const b = STOPS[i];
        const t = (progress - a[0]) / (b[0] - a[0]) || 0;
        const mix = (n: 1 | 2 | 3) => a[n] + (b[n] - a[n]) * t;
        weather.style.setProperty("--fh", mix(1).toFixed(2));
        weather.style.setProperty("--fc", mix(2).toFixed(4));
        weather.style.setProperty("--fl", `${mix(3).toFixed(2)}%`);
      }

      /* how far the starfield's wrapper (testimonials onward) has come in
         over its one-viewport join, so the fallback starfield stays out of
         the work room too */
      if (tail)
      {
        const arrived = (window.innerHeight - tail.getBoundingClientRect().top) / window.innerHeight;
        root.style.setProperty("--tail-in", Math.min(1, Math.max(0, arrived)).toFixed(4));
      }

      for (const node of nodes)
      {
        const rect = node.getBoundingClientRect();
        const travel = rect.height + window.innerHeight;
        const p = travel > 0 ? (window.innerHeight - rect.top) / travel : 0;
        node.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };

    const onScroll = () =>
    {
      if (!queued) { queued = true; requestAnimationFrame(measure); }
    };

    if (!sdt)
    {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      measure();
    }

    return () =>
    {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rooms]);

  return (
    <>
      <header className="fluid-chrome">
        {/* hovering the handle declassifies the surname it translates */}
        <a
          className="fluid-logo"
          href="#approach"
          aria-label="TheImitation — Nic Defaux — back to top"
        >
          <span className="fluid-logo-row">
            <span className="lb">{"{"}</span>
            <span className="lw" aria-hidden="true">
              <span className="wh">TheImitation</span>
              <span className="wn">Defaux</span>
            </span>
            <span className="lc">_</span>
            <span className="lb">{"}"}</span>
          </span>
          <span className="fluid-logo-sub">the gallery</span>
        </a>
        <div className="fluid-chrome-end">
          {/* a plain link, not next/link: a full load leaves the gallery's
              scroll timelines and tour behind cleanly */}
          <a className="fluid-classic" href="/classic">
            <span className="fluid-classic-hint">Prefer one page?</span>
            Classic view
            <span className="fluid-classic-arrow" aria-hidden="true">→</span>
          </a>
          <p className="fluid-where">
            <b data-room-numeral>i</b>
            <span data-room-label>approach</span>
          </p>
        </div>
      </header>

      <nav className="fluid-ticks" aria-label="Rooms">
        {rooms.map((room) => (
          <a key={room.id} href={`#${room.id}`} data-tick={room.id}>
            <em>{room.name}</em>
          </a>
        ))}
      </nav>

      <div className="fluid-rule" aria-hidden="true"><i /></div>
    </>
  );
}
