import type React from "react";

/* ── the pacing grid ────────────────────────────────────────────────────
   One clock, two rules.

   1. Every TRANSITION is the same length everywhere. Plates crossfade over
      XFADE; rooms join over the one-viewport `entry`/`exit` ranges (CSS).
   2. Every HOLD is earned by the words on the plate. A seven-word line and
      a ninety-word log used to get the identical 55svh, so the hero
      outstayed its welcome while projects and testimonials flashed past.
      Holds are now counted from the content itself — edit a description
      and its plate re-paces at the next build.

   All lengths are svh of scroll, measured from the room's `cover 0%`. */

export const ENTRY = 100;      /* one viewport: a room's own entry range */
export const XFADE = 30;       /* every plate fade, in and out */

const LEAD = 45;               /* first plate starts arriving mid-join, once the
                                  outgoing room's last plate (gone by entry 15)
                                  has left a clear XFADE of empty air */
const BASE = 20;               /* svh any plate holds before reading starts */
const PER_WORD = 2.5;          /* svh per word read */
const FLOOR = 50;              /* nothing holds for less... */
const CEIL = 260;              /* ...or more, whatever it says */
export const OPENING = 40;     /* the hero is read at rest, before the tour
                                  starts, so it only needs to survive the
                                  first nudge of the wheel */

const step5 = (n: number) => Math.round(n / 5) * 5;

/* Words a reader actually reads. Chips (stacks, outcomes) are scanned,
   not read, so they count at half weight. */
export function words(prose: (string | undefined)[], chips: string[] = []): number
{
  const count = (parts: (string | undefined)[]) =>
    parts.filter(Boolean).join(" ").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return count(prose) + count(chips) / 2;
}

export const holdFor = (wordCount: number) =>
  step5(Math.min(CEIL, Math.max(FLOOR, BASE + PER_WORD * wordCount)));

export interface Paced
{
  span: number;                /* the room's height, svh */
  holds: number[];
  starts: number[];            /* cover offset at which each plate is fully in */
  plates: React.CSSProperties[];
  room: React.CSSProperties;
}

/* Keyframes depend only on a plate's window length and whether it opens
   the page, so rooms share them. Collected here, emitted once by the page. */
const keyframes = new Map<string, string>();

function keyframe(window: number, opening: boolean): string
{
  const name = `fluid-plate-${opening ? "open-" : ""}${window}`;
  if (!keyframes.has(name))
  {
    const f = +((XFADE / window) * 100).toFixed(3);
    const arrive = opening
      ? `0%, ${100 - f}% { opacity: 1; translate: 0 0; visibility: visible; }`
      : `0% { opacity: 0; translate: 0 2.2rem; visibility: hidden; }
  ${f}%, ${100 - f}% { opacity: 1; translate: 0 0; visibility: visible; }`;
    keyframes.set(name, `@keyframes ${name} {
  ${arrive}
  100% { opacity: 0; translate: 0 -1.6rem; visibility: hidden; }
}`);
  }
  return name;
}

export const plateKeyframes = () => Array.from(keyframes.values()).join("\n");

/* A room of plates, laid end to end:

     fade in · hold₀ · crossfade · hold₁ · … · hold ₙ · fade out
     ↑ LEAD                                              ↑ ends at exit + XFADE/2

   `opening` is the first room of the page, already in view at scroll 0:
   its plate starts fully present and only ever leaves. */
export function pace(holds: number[], opening = false): Paced
{
  const starts: number[] = [];
  let t = opening ? ENTRY : LEAD + XFADE;
  for (const hold of holds) { starts.push(t); t += hold + XFADE; }
  const span = t - XFADE + XFADE / 2;   /* last fade-out straddles the exit edge */

  const plates = holds.map((hold, k) =>
  {
    const from = opening && k === 0 ? 0 : starts[k] - XFADE;
    const to = starts[k] + hold + XFADE;
    return {
      ["--plate-kf" as string]: keyframe(to - from, opening && k === 0),
      animationRange: `cover ${from}svh cover ${to}svh`,
    } as React.CSSProperties;
  });

  return { span, holds, starts, plates, room: { ["--span" as string]: span } as React.CSSProperties };
}

/* Lines that arrive in turn inside one plate's hold, each given time in
   proportion to its own words before the next one lands. */
export function arrivals(room: Paced, k: number, lineWords: number[]): React.CSSProperties[]
{
  const total = lineWords.reduce((a, b) => a + b, 0) || 1;
  let before = 0;
  return lineWords.map((w) =>
  {
    const at = +(room.starts[k] + room.holds[k] * (before / total)).toFixed(1);
    before += w;
    return { animationRange: `cover ${at - XFADE}svh cover ${at}svh` } as React.CSSProperties;
  });
}
