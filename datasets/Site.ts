/**
 * Single source of truth for identity, SEO, and contact proxies.
 *
 * Everything else in datasets/ builds on these values, so a name, a link
 * or a headline fact is only ever written once. This file imports nothing.
 *
 * Contact values are base64-encoded so scrapers crawling the HTML never
 * see a raw address — they are only decoded in the browser at click time.
 * Encode replacements with:  node -e "console.log(btoa('value'))"
 */

export const SITE_URL = "https://theimitation.dev";

/* "seven", not "7", wherever a count is read as prose. */
const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const spell = (n: number) => NUMBER_WORDS[n] ?? String(n);
export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/* The hero's vertical role ticker; the first two make the job title. */
export const JOB_ROLES = [
  "Senior Software Engineer",
  "Technical Strategist",
  "AI Platform Architect",
  "GenAI & Agentic Systems",
];

export const EMPLOYER = { name: "IBM", years: 5 };

/* The one claim the site leads with: the stat, the tagline and the share
   card all quote it from here. */
export const HEADLINE = "successful AI platform for public sector clients";

const NAME = "Nic Defaux";
const BRAND = "TheImitation";

export const PERSON = {
  name: NAME,
  firstName: NAME.split(" ")[0],
  surname: NAME.split(" ").slice(-1)[0],
  brand: BRAND,
  /* the handle as a code token, as the logo and share card draw it */
  logo: `{${BRAND}_}`,
  title: `${JOB_ROLES[0]} & ${JOB_ROLES[1]}`,
  tagline: `${capitalise(spell(EMPLOYER.years))} years at ${EMPLOYER.name} building generative AI platforms for the public sector, including the first ${HEADLINE}.`,
  availability: "Open to contract work",
  services: "AI platform builds, short GenAI strategy pieces, or fixing a system that has got into trouble",
};

/* `${name} — ${title}`, the line every share card and tab title opens with. */
export const SITE_TITLE = `${PERSON.name} — ${PERSON.title}`;
export const SITE_NAME = `${PERSON.brand} Portfolio`;

/* Search terms beyond the name, brand and job roles, which are added
   automatically by the layout. */
export const SEO_KEYWORDS = ["AI Platform", "Generative AI", "Solution Architect", "Public Sector", "TypeScript", "Next.js", "AWS"];

/* The one photo, shared by both views and the structured data. */
const HEADSHOT_LIGHT = "backlit";
export const HEADSHOT = {
  src: "/headshot.jpg",
  width: 760,
  height: 950,
  light: HEADSHOT_LIGHT,
  alt: `${PERSON.name}, ${HEADSHOT_LIGHT} by a sunset`,
};

/* Drop your CV at public/Nic-Defaux-CV.pdf and the download button appears. */
export const CV_PATH = "/Nic-Defaux-CV.pdf";

export const SOCIAL = {
  linkedin: { url: "https://www.linkedin.com/in/nicolaas-defaux/", icon: "/linkedin.png", label: "LinkedIn" },
  credly: { url: "https://www.credly.com/users/nicolaas-defaux", icon: "/credly.png", label: "Credly" },
  github: { url: `https://github.com/${BRAND}/`, icon: "/github.png", label: "GitHub" },
};
export const SOCIALS = Object.values(SOCIAL);

// base64("n.g.j.defaux@gmail.com")
export const EMAIL_B64 = "bi5nLmouZGVmYXV4QGdtYWlsLmNvbQ==";
// base64("447941935946") — wa.me wants intl format with no "+"
export const WHATSAPP_B64 = "NDQ3OTQxOTM1OTQ2";

/* Both views open the same two channels. Decoding happens here, at click
   time, so the raw values never reach the rendered HTML. */
export function openEmail(subject = "", body = "")
{
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  window.location.href = `mailto:${atob(EMAIL_B64)}${query ? `?${query}` : ""}`;
}

export function openWhatsApp(text = "")
{
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  window.open(`https://wa.me/${atob(WHATSAPP_B64)}${query}`, "_blank", "noopener,noreferrer");
}
