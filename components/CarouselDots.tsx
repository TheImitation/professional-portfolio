"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/components/CarouselDots.css";

const AUTO_ROTATE_MS = 12000;

/* Tracks which snap-scrolled child sits closest to the container's centre —
   used to drive both the mobile carousels' active dot and click-to-jump. */
export function useCarouselIndex(itemCount: number)
{
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() =>
  {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveIndex = () =>
    {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(container.children).forEach((child, index) =>
      {
        const el = child as HTMLElement;
        const childCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < closestDistance)
        {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    updateActiveIndex();
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);
    return () =>
    {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [itemCount]);

  const scrollToIndex = useCallback((index: number) =>
  {
    const container = containerRef.current;
    const child = container?.children[index] as HTMLElement | undefined;
    if (!container || !child) return;
    const targetLeft = child.offsetLeft + child.offsetWidth / 2 - container.clientWidth / 2;
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, []);

  /* Advances one slide 12s after whichever index is currently active — that
     dependency is what makes this double as a pause: any scroll/dot-click
     already updates activeIndex, which reschedules this effect and restarts
     the countdown, so auto-rotate never fights an in-progress interaction. */
  useEffect(() =>
  {
    if (itemCount <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() =>
    {
      const container = containerRef.current;
      if (!container || document.hidden) return;
      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;
      scrollToIndex((activeIndex + 1) % itemCount);
    }, AUTO_ROTATE_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, itemCount, scrollToIndex]);

  return { containerRef, activeIndex, scrollToIndex };
}

interface CarouselDotsProps
{
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  label: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({ count, activeIndex, onSelect, label }) => (
  <div className="carousel-dots" role="group" aria-label={label}>
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        type="button"
        className={`carousel-dot${index === activeIndex ? " active" : ""}`}
        aria-label={`Go to slide ${index + 1} of ${count}`}
        aria-current={index === activeIndex}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

export default CarouselDots;
