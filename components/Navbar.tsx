"use client";

import React, { useState, useEffect } from "react";
import "../styles/components/Navbar.css";

type MenuItem = {
  name: string;
  anchor: string;
};

const navOptions: MenuItem[] = [
  { name: "Home", anchor: "home" },
  { name: "About", anchor: "about" },
  { name: "Skills", anchor: "skills" },
  { name: "Projects", anchor: "projects" },
  { name: "Contact", anchor: "contact" },
];

const Navbar = () =>
{
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() =>
  {
    const sections = navOptions
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

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <a className="logo mono" href="#home" aria-label="TheImitation — back to top">
          <span className="logo-bracket">{"{"}</span>
          TheImitation
          <span className="logo-caret">_</span>
          <span className="logo-bracket">{"}"}</span>
        </a>
        <ul className="nav-list">
          {navOptions.map((item) => (
            <li key={item.anchor}
              className={`nav-item${activeSection === item.anchor ? " selected" : ""}`}
            >
              <a href={`#${item.anchor}`}>
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
