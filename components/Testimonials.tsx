"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import CarouselDots, { useCarouselIndex } from "./CarouselDots";
import "../styles/components/Testimonials.css";

interface Review
{
  quote: string;
  name: string;
  role: string;
  initials: string;
  linkedin?: string;
}

const reviews: Review[] = [
  {
    quote:
      "His technical expertise, energy, and leadership have been central to the success… He has driven discussions about future opportunities and has been crucial to helping us design a realistic, yet comprehensive solution.",
    name: "Mark Hughes-D'Aeth",
    role: "Managing Consultant",
    initials: "MH",
    linkedin: "https://uk.linkedin.com/in/mark-hughes-d-aeth-2015b268",
  },
  {
    quote:
      "The pace at which you delivered features in the run-up to production was truly impressive — your contribution was critical to our success. Nic deep-dives into complex technical issues, not only resolving them but taking the time to coach and mentor.",
    name: "Kaspars Strods",
    role: "Managing Technical Consultant",
    initials: "KS",
    linkedin: "https://uk.linkedin.com/in/kaspars-s",
  },
  {
    quote:
      "His leadership as a dev is his standout quality… has not only developed the frontend but also mentored another dev along the way, allowing her to flourish and contribute strongly to the team.",
    name: "James Skinner",
    role: "Data Scientist",
    initials: "JS",
    linkedin: "https://uk.linkedin.com/in/james-skinner-26004a1a4",
  },
  {
    quote:
      "You have solid technical skills, and you take a lot of responsibility… the team clearly trusts and relies on you… you bring a bit of fun and energy to the day-to-day. It's a great mix that really adds to the team.",
    name: "Nick Wright",
    role: "Senior Managing Consultant",
    initials: "NW",
    linkedin: "https://uk.linkedin.com/in/nickwrightnz",
  },
];

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
