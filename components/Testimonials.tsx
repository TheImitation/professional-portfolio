"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import CarouselDots, { useCarouselIndex } from "./CarouselDots";
import { REVIEWS as reviews } from "@/datasets/Content";
import "../styles/components/Testimonials.css";

const Testimonials: React.FC = () =>
{
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { containerRef, activeIndex, scrollToIndex } = useCarouselIndex(reviews.length);

  return (
    <section id="reviews" ref={ref} className={`reviews${inView ? " in-view" : ""}`}>
      <p className="faux-kicker">04 / peer review</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>Colleagues, <span className="faux-shimmer">on the record</span>
      </h2>
      <p className="reviews-note">
        Pulled straight from recommendations — merged without edits, zero conflicts.
      </p>

      <div className="reviews-grid" ref={containerRef}>
        {reviews.map((review, index) => (
          <figure
            className="review-card faux-pane"
            style={{ transitionDelay: `${0.15 + index * 0.12}s` }}
            key={review.name}
          >
            <div className="review-head">
              <span className="review-avatar faux-mono" aria-hidden="true">{review.initials}</span>
              <figcaption>
                {review.linkedin ? (
                  <a
                    className="review-name review-name-link"
                    href={review.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-sprite-target
                  >
                    {review.name} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="review-name" data-sprite-target>{review.name}</span>
                )}
                <span className="review-role">{review.role}</span>
              </figcaption>
              <span className="review-approved faux-mono">✓ approved</span>
            </div>
            <blockquote>{review.quote}</blockquote>
          </figure>
        ))}
      </div>

      <CarouselDots count={reviews.length} activeIndex={activeIndex} onSelect={scrollToIndex} label="Review slides" />
    </section>
  );
};

export default Testimonials;
