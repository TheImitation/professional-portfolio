"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/components/SpriteQuest.css";

/* ==========================================================================
   SpriteQuest — the portfolio easter egg.

   1. Hovering the circular headshot cuts a "flashlight" hole under the
      cursor (CSS mask driven by --mx/--my), revealing a pixel sprite
      hiding behind the photograph.
   2. Pressing an arrow key frees the sprite: it pops out of the photo and
      roams the viewport under arrow-key control (velocity + friction).
   3. While roaming, it collides with any element marked
      [data-sprite-target], giving it a springy "bump" (see globals.css).
   4. Escape tucks the sprite back behind the photo.
   ========================================================================== */

const PIXEL = 5;
const SPEED = 0.55;
const FRICTION = 0.93;

/* Two animation frames of an 11x8 pixel pal, drawn with box-shadows. */
const FRAME_A = [
  "..X.....X..",
  "...X...X...",
  "..XXXXXXX..",
  ".XX.XXX.XX.",
  "XXXXXXXXXXX",
  "X.XXXXXXX.X",
  "X.X.....X.X",
  "...XX.XX...",
];

const FRAME_B = [
  "..X.....X..",
  "X..X...X..X",
  "X.XXXXXXX.X",
  "XXX.XXX.XXX",
  "XXXXXXXXXXX",
  ".XXXXXXXXX.",
  "..X.....X..",
  ".X.......X.",
];

const SPRITE_W = FRAME_A[0].length * PIXEL;
const SPRITE_H = FRAME_A.length * PIXEL;

function frameToShadows(frame: string[]): string
{
  const shadows: string[] = [];
  frame.forEach((row, y) =>
  {
    row.split("").forEach((cell, x) =>
    {
      if (cell === "X") shadows.push(`${x * PIXEL}px ${y * PIXEL}px 0 0 currentColor`);
    });
  });
  return shadows.join(",");
}

const SHADOWS_A = frameToShadows(FRAME_A);
const SHADOWS_B = frameToShadows(FRAME_B);

export const PixelPal: React.FC = () => (
  <span className="pixel-pal" style={{ width: SPRITE_W, height: SPRITE_H }}>
    <i className="pal-frame frame-a" style={{ width: PIXEL, height: PIXEL, boxShadow: SHADOWS_A }} />
    <i className="pal-frame frame-b" style={{ width: PIXEL, height: PIXEL, boxShadow: SHADOWS_B }} />
  </span>
);

const ARROWS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const SpriteQuest: React.FC = () =>
{
  const [roaming, setRoaming] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  const picRef = useRef<HTMLElement>(null);
  const palRef = useRef<HTMLDivElement>(null);
  const keysHeld = useRef<Set<string>>(new Set());
  const physics = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const overlapping = useRef(new WeakSet<Element>());
  const roamingRef = useRef(false);

  useEffect(() =>
  {
    setMounted(true);
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const releaseSprite = () =>
  {
    if (roamingRef.current) return;
    const pic = picRef.current?.getBoundingClientRect();
    physics.current = {
      x: pic ? pic.left + pic.width / 2 - SPRITE_W / 2 : window.innerWidth / 2,
      y: pic ? pic.top + pic.height / 2 - SPRITE_H / 2 : window.innerHeight / 2,
      vx: 0,
      vy: 0,
    };
    roamingRef.current = true;
    setRoaming(true);
  };

  const tuckSprite = () =>
  {
    roamingRef.current = false;
    keysHeld.current.clear();
    setRoaming(false);
  };

  /* Flashlight reveal: track the cursor (or finger) inside the headshot. */
  const moveSpotlight = (element: HTMLElement, clientX: number, clientY: number) =>
  {
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${clientX - bounds.left}px`);
    element.style.setProperty("--my", `${clientY - bounds.top}px`);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) =>
  {
    moveSpotlight(event.currentTarget, event.clientX, event.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) =>
  {
    const touch = event.touches[0];
    if (touch) moveSpotlight(event.currentTarget, touch.clientX, touch.clientY);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) =>
  {
    event.currentTarget.style.setProperty("--mx", "-200px");
    event.currentTarget.style.setProperty("--my", "-200px");
  };

  /* Touch devices have no arrow keys: tapping the photo frees the sprite. */
  const handlePicClick = () =>
  {
    if (isCoarse) releaseSprite();
  };

  /* Keyboard control: first arrow press frees the sprite, Escape rests it. */
  useEffect(() =>
  {
    const handleKeyDown = (event: KeyboardEvent) =>
    {
      if (event.key === "Escape" && roamingRef.current)
      {
        tuckSprite();
        return;
      }
      if (!ARROWS.includes(event.key)) return;
      event.preventDefault();
      keysHeld.current.add(event.key);
      releaseSprite();
    };

    const handleKeyUp = (event: KeyboardEvent) =>
    {
      keysHeld.current.delete(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () =>
    {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  /* D-pad steering: pressed buttons emulate held arrow keys. */
  const dpadPress = (key: string) => (event: React.PointerEvent<HTMLButtonElement>) =>
  {
    event.preventDefault();
    keysHeld.current.add(key);
  };

  const dpadLift = (key: string) => () =>
  {
    keysHeld.current.delete(key);
  };

  /* Physics loop: velocity + friction movement, soft wall bounces,
     and bump collisions against [data-sprite-target] elements. */
  useEffect(() =>
  {
    if (!roaming) return;

    let rafId: number;
    const targets = Array.from(document.querySelectorAll("[data-sprite-target]"));

    const tick = () =>
    {
      const p = physics.current;
      const keys = keysHeld.current;

      if (keys.has("ArrowLeft")) p.vx -= SPEED;
      if (keys.has("ArrowRight")) p.vx += SPEED;
      if (keys.has("ArrowUp")) p.vy -= SPEED;
      if (keys.has("ArrowDown")) p.vy += SPEED;

      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.x += p.vx;
      p.y += p.vy;

      const maxX = window.innerWidth - SPRITE_W - 4;
      const maxY = window.innerHeight - SPRITE_H - 4;
      if (p.x < 4) { p.x = 4; p.vx *= -0.55; }
      if (p.x > maxX) { p.x = maxX; p.vx *= -0.55; }
      if (p.y < 4) { p.y = 4; p.vy *= -0.55; }
      if (p.y > maxY) { p.y = maxY; p.vy *= -0.55; }

      const pal = palRef.current;
      if (pal)
      {
        const tilt = Math.max(-14, Math.min(14, p.vx * 1.4));
        pal.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${tilt}deg)`;
      }

      targets.forEach((target) =>
      {
        const r = target.getBoundingClientRect();
        const hit =
          p.x < r.right && p.x + SPRITE_W > r.left &&
          p.y < r.bottom && p.y + SPRITE_H > r.top;

        if (hit && !overlapping.current.has(target))
        {
          overlapping.current.add(target);
          target.classList.add("bumped");
          window.setTimeout(() => target.classList.remove("bumped"), 800);
        }
        else if (!hit && overlapping.current.has(target))
        {
          overlapping.current.delete(target);
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [roaming]);

  return (
    <div className="profile-orbit">
      <figure
        ref={picRef}
        className={`profile-picture${roaming ? " sprite-away" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onClick={handlePicClick}
      >
        <img
          src="/headshot.jpg"
          alt="Headshot of Nic Defaux — Senior Software Engineer and Technical Strategist — backlit by a golden sunset that lends this site its warm accent colour"
        />
        <div className="reveal-layer" aria-hidden="true">
          <PixelPal />
        </div>
        <span className="orbit-ring" aria-hidden="true" />
      </figure>

      <p className="sprite-hint faux-mono" aria-live="polite">
        {roaming ? (
          isCoarse
            ? <>he&apos;s loose! steer with the d-pad — <kbd>✕</kbd> tucks him back in</>
            : <>he&apos;s loose! <kbd>esc</kbd> tucks him back in</>
        ) : isCoarse ? (
          <>psst… something hides behind this photo.
            <br />tap it to set him loose</>
        ) : (
          <>psst… something hides behind this photo.
            <br />use the <kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> arrow keys</>
        )}
      </p>

      {mounted && roaming &&
        createPortal(
          <>
            <div ref={palRef} className="roaming-pal" aria-hidden="true">
              <PixelPal />
            </div>
            {isCoarse && (
              <div className="dpad" role="group" aria-label="Sprite controls">
                {[
                  { key: "ArrowUp", className: "dpad-up", glyph: "▲" },
                  { key: "ArrowLeft", className: "dpad-left", glyph: "◀" },
                  { key: "ArrowRight", className: "dpad-right", glyph: "▶" },
                  { key: "ArrowDown", className: "dpad-down", glyph: "▼" },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    type="button"
                    className={`dpad-btn ${btn.className}`}
                    aria-label={btn.key}
                    onPointerDown={dpadPress(btn.key)}
                    onPointerUp={dpadLift(btn.key)}
                    onPointerLeave={dpadLift(btn.key)}
                    onPointerCancel={dpadLift(btn.key)}
                    onContextMenu={(event) => event.preventDefault()}
                  >
                    {btn.glyph}
                  </button>
                ))}
                <button
                  type="button"
                  className="dpad-btn dpad-dismiss"
                  aria-label="Tuck the sprite away"
                  onClick={tuckSprite}
                >
                  ✕
                </button>
              </div>
            )}
          </>,
          document.body
        )}
    </div>
  );
};

export default SpriteQuest;
