/**
 * Single source of truth for identity, SEO, and contact proxies.
 *
 * Contact values are base64-encoded so scrapers crawling the HTML never
 * see a raw address — they are only decoded in the browser at click time.
 * Encode replacements with:  node -e "console.log(btoa('value'))"
 */

export const SITE_URL = "https://theimitation.dev";

export const PERSON = {
  name: "Nic Defaux",
  brand: "TheImitation",
  title: "Senior Software Engineer & Technical Strategist",
  tagline:
    "Self-taught engineer, consultant and architect. Five years at IBM. Builder of the first successful AI platform for public sector clients.",
  availability: "Open to contract work",
  services:
    "taking contracts for AI platform builds, GenAI strategy sprints, and rescue-and-rebuild missions on systems that matter",
};

/* Drop your CV at public/Nic-Defaux-CV.pdf and the download button appears. */
export const CV_PATH = "/Nic-Defaux-CV.pdf";

export const SOCIALS = [
  { url: "https://www.linkedin.com/in/nicolaas-defaux/", icon: "/linkedin.png", label: "LinkedIn" },
  { url: "https://www.credly.com/users/nicolaas-defaux", icon: "/credly.png", label: "Credly" },
  { url: "https://github.com/TheImitation/", icon: "/github.png", label: "GitHub" },
];

// base64("n.g.j.defaux@gmail.com")
export const EMAIL_B64 = "bi5nLmouZGVmYXV4QGdtYWlsLmNvbQ==";
// base64("447941935946") — wa.me wants intl format with no "+"
export const WHATSAPP_B64 = "NDQ3OTQxOTM1OTQ2";
