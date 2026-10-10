/**
 * Interface copy: headings, calls to action, hints and labels for both the
 * gallery and the classic view. Components carry markup only; every word a
 * visitor (or a screen reader) meets is written here once, and reused
 * wherever the two views say the same thing.
 *
 * Light markup, rendered by components/Rich.tsx:
 *   *word*  → <em>      **words** → <strong>
 *   `key`   → <kbd>     newline   → <br />
 */

import { HEADSHOT, PERSON, SITE_TITLE, SOCIAL, capitalise, spell } from "./Site";

const handle = PERSON.firstName.toLowerCase();

/* The two lines both views open with. */
export const NAME_PUN = `*${PERSON.surname}* is French. And what is *faux*, if not an imitation? The code is real, though.`;
export const AVAILABILITY_LINE = `Currently **${PERSON.availability.toLowerCase()}**: ${PERSON.services}.`;

/* Calls to action, shared wherever both views offer the same move. */
export const CTA = {
  contact: "Open a channel",
  stack: "Inspect the stack",
  cv: "Grab the CV",
  visit: "Visit the live site",
  live: "live",
  github: "Browse the escapees",
  gallery: "Back to the gallery",
  classic: "Classic view",
  classicHint: "Prefer one page?",
  home: "cd ~/home",
};

/* ──────────────────────────────────────────────────────────────────────
   Sections of the classic view, in page order. The kicker number comes
   from the order; the nav name defaults to the heading.
   ────────────────────────────────────────────────────────────────────── */

type SectionId = "about" | "skills" | "projects" | "reviews" | "contact";

interface SectionCopy
{
  id: SectionId;
  topic: string;
  heading: string;
  accent: string;
  note?: string;
  nav?: string;
}

const SECTION_LIST: SectionCopy[] = [
  { id: "about", topic: "the human behind the handle", heading: "About", accent: PERSON.brand },
  {
    id: "skills",
    topic: "what i bring to the table",
    heading: "Skills",
    accent: "drawn from memory",
    note: "Each illustration draws itself in one continuous line.",
  },
  {
    id: "projects",
    topic: "selected works",
    heading: "Projects",
    accent: "battle-tested",
    note: "Public sector programmes worth millions, plus some freelance and side projects.",
  },
  {
    id: "reviews",
    topic: "peer review",
    heading: "Colleagues",
    accent: "on the record",
    note: "Copied from LinkedIn recommendations, unedited.",
    nav: "Reviews",
  },
  { id: "contact", topic: "open a channel", heading: "Contact", accent: `/dev/${handle}` },
];

export const SECTIONS = Object.fromEntries(
  SECTION_LIST.map((section, index) => [
    section.id,
    { ...section, kicker: `${String(index + 1).padStart(2, "0")} / ${section.topic}` },
  ]),
) as Record<SectionId, SectionCopy & { kicker: string }>;

export const NAV = [
  { name: "Home", anchor: "home" },
  ...SECTION_LIST.map((section) => ({ name: section.nav ?? section.heading, anchor: section.id })),
];

export const MENU = { open: "Open menu", close: "Close menu" };

/* both views' logo links back to the top of the page */
export const LOGO_ARIA = `${PERSON.brand}, ${PERSON.name}, back to top`;

export const SKILLS_UI = { art: (title: string) => `Hand-drawn ${title} illustration` };

export const CLASSIC_HERO = {
  greeting: "// hello, world. transmission from",
  gloss: `// the handle is just my surname, translated: ${PERSON.surname}, 'of false'`,
  blurb: "I build AI platforms and the cloud systems they run on. I also hid a pixel creature behind my photo.",
  scroll: "scroll",
  scrollAria: `Scroll to the ${SECTIONS.about.heading.toLowerCase()} section`,
};

export const ABOUT = {
  terminal: `${handle}@${PERSON.brand.toLowerCase()}: ~/about`,
  terminalAria: `Terminal-styled biography of ${PERSON.name}`,
};

export const SPRITE = {
  idle: "psst… something hides behind this photo.",
  idleTouch: "tap it to set him loose",
  idleKeys: "use the `←``↑``↓``→` arrow keys",
  looseTouch: "he's loose! steer with the d-pad. `✕` tucks him back in",
  looseKeys: "he's loose! `esc` tucks him back in",
  controls: "Sprite controls",
  dismiss: "Tuck the sprite away",
  pad: { ArrowUp: "Move up", ArrowLeft: "Move left", ArrowRight: "Move right", ArrowDown: "Move down" } as Record<string, string>,
};

export const PROJECT_UI = {
  locked: "NDA · ask me about it",
  lockedAria: (title: string) => `${title} is under NDA. Contact me to hear about it`,
  pending: "Coming back soon",
  liveAria: (title: string) => `Visit ${title} (opens in a new tab)`,
  outcomes: "Measured outcomes",
  stack: "Technologies used",
  slides: "Project slides",
  /* the snapshot and the overview sheet it opens */
  openSite: (title: string) => `${title}: open the live site (new tab)`,
  openOverview: (title: string) => `${title}: open the overview`,
  closeOverview: "Close the overview",
  built: "What I built",
  /* the classic view's note on why most of the work cannot be linked */
  vault: {
    aria: "Where the rest of the work lives",
    title: "99% of my commits are",
    redacted: "redacted",
    body: `The work above is real and I'll happily talk through any of it, but the commits live in enterprise GitLab behind client walls, so I can't link you to the proof. A couple of hobby builds escaped to ${SOCIAL.github.label}.`,
  },
};

export const REVIEW_UI = { approved: "✓ approved", slides: "Review slides" };

export const CAROUSEL = { slide: (index: number, count: number) => `Go to slide ${index} of ${count}` };

export const CONTACT = {
  prompt: "Let's build something",
  privacy: "Both buttons decode my details in your browser, so scrapers never see them. Get in touch about work, or just to say hi.",
  subject: "subject:",
  message: "payload:",
  messagePlaceholder: "Write your message here. It opens in your own email or WhatsApp, so nothing is sent until you hit send there.",
  hint: "message routes through the proxy of your choosing →",
  footnote: "// inbox always open",
  footer: (year: number) => `© ${year} ${PERSON.brand}. Designed and built by ${PERSON.name}.`,
};

const channel = (name: string, note: string) => ({ name, proxy: `${name.toUpperCase()}_PROXY`, note });
export const CHANNELS = {
  email: channel("Email", "mailto decodes on click · base64 at rest"),
  whatsapp: channel("WhatsApp", "wa.me relay · number stays encoded"),
};

export const NOT_FOUND = {
  title: "Route not found",
  code: "404",
  heading: "This route is an imitation.",
  lines: ["// a convincing one, but false. nothing renders here.", "// even the sprite came up empty."],
};

export const CONSOLE = [
  PERSON.logo,
  `Well hello, fellow dev. Since you're poking around: the headshot in the ${CTA.classic.toLowerCase()} is hiding something. Try the arrow keys.\nSource lives at ${SOCIAL.github.url}`,
];

/* ──────────────────────────────────────────────────────────────────────
   The gallery
   ────────────────────────────────────────────────────────────────────── */

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

/* How many planes each 3D room builds. The rooms render this many, and
   their wall labels count them from here. */
export const PLANES = { arches: 12, panes: 7, stars: 8 };

export interface Room
{
  id: string;
  numeral: string;
  /* the room's name on the rail of ticks */
  name: string;
  /* its wall label: what is in it, and how it was made */
  label?: { title: string; note: string };
}

const ROOM_LIST: Omit<Room, "numeral">[] = [
  {
    id: "approach",
    name: "approach",
    label: { title: `${PERSON.name}, ${HEADSHOT.light}`, note: "the site’s accent colour comes from this sunset" },
  },
  {
    id: "ganzfeld",
    name: SECTIONS.about.heading.toLowerCase(),
    label: { title: capitalise(SECTIONS.about.topic), note: "radial-gradient, oklch(), scroll-linked hue" },
  },
  {
    id: "colonnade",
    name: "stack",
    label: { title: "Travelling through the stack", note: `perspective, preserve-3d, ${spell(PLANES.arches)} planes` },
  },
  { id: "horizon", name: "horizon" },
  {
    id: "volume",
    name: "work",
    label: {
      title: `Volume (${capitalise(spell(PLANES.panes))} Panes)`,
      note: `rotateY, ${spell(PLANES.panes)} translucent planes`,
    },
  },
  {
    id: "field",
    name: "words",
    label: {
      title: `${SECTIONS.reviews.heading}, ${SECTIONS.reviews.accent}`,
      note: `${spell(PLANES.stars)} point-planes in depth, zooming to the end of the page`,
    },
  },
  { id: "egress", name: SECTIONS.contact.heading.toLowerCase() },
];

export const ROOMS: Room[] = ROOM_LIST.map((room, index) => ({ ...room, numeral: ROMAN[index] }));
export const room = (id: string) => ROOMS.find((r) => r.id === id)!;

const roomCount = spell(ROOMS.length);

export const GALLERY = {
  name: "the gallery",
  summary: `${SITE_TITLE}. A scroll-driven gallery in ${roomCount} rooms.`,
  roomsAria: "Rooms",
  roomWord: "Room",
  portraitCaption: `${HEADSHOT.src.slice(1)}, ${HEADSHOT.light}`,
  route: "the route here",
  horizon: { over: `${room("horizon").numeral} / the work`, line: "Built, torn down, rebuilt." },
  egress: {
    over: `${room("egress").numeral} / ${SECTIONS.contact.topic}`,
    available: "Available for",
    elsewhere: "Elsewhere",
    thisPage: "This page",
    techniques: [
      "animation-timeline: scroll() / view()",
      "view-timeline & animation-range",
      "@property interpolation",
      "oklch() colour",
      "No canvas, no WebGL",
    ],
    foot: "The colour shifts from cool to warm and back as you scroll.",
    route: `${capitalise(roomCount)} rooms, in any order.`,
  },
};

export const TOUR = {
  idle:    { label: "scroll once, or press ⏎, then let go", action: "Begin the tour" },
  touring: { label: "touring. scroll to take over, esc to stop", action: "Stop the tour" },
  paused:  { label: "you have the wheel. resuming in a moment", action: "Stop the tour" },
  done:    { label: "that was the tour. press ⏎ to walk it again", action: "Walk it again" },
};
