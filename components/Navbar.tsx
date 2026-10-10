"use client";

import React, { useState, useEffect } from "react";
import { PERSON } from "@/datasets/Site";
import { LOGO_ARIA, MENU, NAV } from "@/datasets/Copy";
import "../styles/components/Navbar.css";


const Navbar = () =>
{
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() =>
  {
    const sections = NAV
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((sectionEl) => observer.observe(sectionEl));
    return () => observer.disconnect();
  }, []);

  /* Escape closes the mobile menu (the sprite handles its own Escape). */
  useEffect(() =>
  {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) =>
    {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <nav className={`navbar${menuOpen ? " menu-open" : ""}`}>
      <div className="nav-wrapper">
        <a className="logo faux-mono" href="#home" aria-label={LOGO_ARIA} onClick={() => setMenuOpen(false)}>
          <span className="logo-bracket">{"{"}</span>
          {/* Hovering the handle declassifies the surname it translates. */}
          <span className="logo-word" aria-hidden="true">
            <span className="word-handle">{PERSON.brand}</span>
            <span className="word-name">{PERSON.surname}</span>
          </span>
          <span className="logo-caret">_</span>
          <span className="logo-bracket">{"}"}</span>
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? MENU.close : MENU.open}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <ul className="nav-list" id="site-nav">
          {NAV.map((item) => (
            <li key={item.anchor}
              className={`nav-item${activeSection === item.anchor ? " selected" : ""}`}
            >
              <a href={`#${item.anchor}`} onClick={() => setMenuOpen(false)}>
                <span className="nav-index">/</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
