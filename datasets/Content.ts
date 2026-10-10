/**
 * Shared editorial content: the career itself.
 *
 * Both the gallery and the classic view render these words, so each fact
 * is written once and anything that summarises it (the stats, the
 * terminal log, the timeline) is derived from it rather than retyped.
 * Illustration stays with its component (Skills keeps its own SVG strokes,
 * keyed by id); interface wording lives in datasets/Copy.ts.
 */

import { EMPLOYER, HEADLINE, PERSON, SOCIAL } from "./Site";

/* ──────────────────────────────────────────────────────────────────────
   Skills
   ────────────────────────────────────────────────────────────────────── */

export interface SkillDomain
{
  id: string;
  title: string;
  caption: string;
  skills: string[];
}

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "design",
    title: "User Design",
    caption: "Front ends, design systems and motion",
    skills: [
      "UI / UX engineering",
      "Design systems & component libraries",
      "Heavy-duty CSS & motion design",
      "Accessibility (WCAG)",
      "Rapid prototyping",
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Technology",
    caption: "Cloud systems, mostly on AWS",
    skills: [
      "Cloud architecture (AWS)",
      "TypeScript / Next.js / Python",
      "Distributed systems & APIs",
      "Technical strategy & consulting",
      "DevOps & infrastructure as code",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    caption: "GenAI platforms, RAG and agents",
    skills: [
      "Generative AI platform engineering",
      "LLM integration, RAG & agents",
      "AI strategy for the public sector",
      "MLOps & evaluation pipelines",
      "Responsible & explainable AI",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────
   The career, on a time axis. Dates are taken from the CV.
   ────────────────────────────────────────────────────────────────────── */

export type EraKind = "study" | "role" | "build";

export interface Era
{
  id: string;
  kind: EraKind;
  label: string;
  from: number;
  /** null = still running */
  to: number | null;
}

/* "2022", "2022 – 2023" or "2024 – now" */
export const eraSpan = ({ from, to }: Pick<Era, "from" | "to">) =>
  to === from ? `${from}` : `${from} – ${to ?? "now"}`;

/* ──────────────────────────────────────────────────────────────────────
   Projects
   ────────────────────────────────────────────────────────────────────── */

export interface Project
{
  id: string;
  /* the employer the work was done at, if any */
  at?: string;
  /* what kind of work it was: "Public Sector", "Freelance client"… */
  context: string;
  title: string;
  role: string;
  description: string;
  outcomes?: string[];
  stack: string[];
  href?: string;
  locked?: boolean;
  /* Site is temporarily down — show a badge instead of a dead `href`. */
  pending?: boolean;
  /* A still of the live landing page, framed as a browser window. Lives in
     public/projects/ — recapture when the site changes. */
  snapshot?: { src: string; width: number; height: number; alt: string };
  /* The fuller story behind a snapshot, opened in place over the page when
     the snapshot is clicked. Without one, the snapshot links to `href`. */
  overview?: {
    lede: string;
    built: string[];
    links?: { label: string; href: string }[];
  };
  /* Its span on the career timeline; the label defaults to the title up to
     its colon. Undated work is left off rather than guessed at, so its
     plate simply leaves the timeline unhighlighted. */
  era?: Omit<Era, "id" | "label"> & { label?: string };
}

/* "IBM · Public Sector", "2026 · Freelance client", "Ongoing · Side project" */
export const projectPeriod = ({ at, era, context }: Project) =>
  `${at ?? (era?.to === null ? "Ongoing" : era?.from ?? "")} · ${context}`;

export const PROJECTS: Project[] = [
  {
    id: "lighthouse",
    at: EMPLOYER.name,
    context: "Public Sector",
    title: "Generative AI Lighthouse: Centre of Excellence",
    role: "Senior Technical Consultant",
    description:
      "Proofs of concept showing public sector clients what generative AI could do for them. I designed the AWS architectures, built the shared foundations underneath, and put together GPT-4 demos aimed at their technical and customer-support teams.",
    outcomes: ["8 PoCs delivered", "2 MVPs shipped", "AI ethics framework", "Strategic AI pipeline"],
    stack: ["AI Platform", "Cloud Architecture", "Technical Strategy", "Business Analysis"],
    locked: true,
  },
  {
    id: "ai-platform",
    at: EMPLOYER.name,
    context: "Public Sector",
    title: "The First Successful Public-Sector AI Platform",
    role: "Engineer → Consultant → Architect",
    description:
      "I joined as an engineer and left as its architect. We rebuilt the architecture from scratch more than once before it shipped. Most of what I know about platforms, I learned on this one.",
    outcomes: ["£4m programme", "+77% process throughput", "10/10 NPS"],
    stack: ["AWS", "Meta", "TypeScript", "Kubernetes", "Terraform"],
    locked: true,
    era: { kind: "role", label: "GAIL, GenAI platform", from: 2024, to: 2026 },
  },
  {
    id: "wc-sweeps",
    context: "Personal challenge",
    title: "World Cup 2026 Sweepstakes Tracker",
    role: "Solo build",
    description:
      "A sweepstakes site for the 2026 World Cup, with live brackets, draw management and leaderboards that updated after every match. Real people used it all summer.",
    stack: ["Next.js", "TypeScript", "Render", "Neon", "Cloudflare R2", "Vibes"],
    /* href: "https://sportssweepstakes.co.uk/" — offline for now. */
    pending: true,
    era: { kind: "build", label: "World Cup sweepstakes", from: 2026, to: 2026 },
  },
  {
    id: "mak99-interiors",
    context: "Freelance client",
    title: "MAK99 Interiors: studio site rebuild",
    role: "Design and build",
    description:
      "A Next.js rebuild of the marketing site for an interior design studio working in Washington, D.C. and London.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    href: "https://www.mak99interiors.co.uk/",
    era: { kind: "build", from: 2026, to: 2026 },
    snapshot: {
      src: "/projects/mak99-interiors.jpg",
      width: 1200,
      height: 750,
      alt: "MAK99 Interiors landing page: \"Beautifully tailored interiors.\" set in italic serif over a sunlit living room",
    },
    overview: {
      lede:
        "I took the studio's site from redesign to launch on Next.js 14. The projects come first, and each one gets its own page, gallery and colour theme.",
      built: [
        "Project pages with per-project colour themes, filterable galleries, blur-up placeholders and a lightbox carousel",
        "A featured video tour and a 27-image professional photoset for the Observatory Circle project",
        "Search groundwork: JSON-LD structured data, canonical URLs, OG share cards, sitemap and robots, and service pages written for local search",
        "An Instagram feed, client testimonials, and Vercel Analytics with Speed Insights",
        "30 test files on Vitest and Testing Library behind 80% coverage thresholds, with Husky hooks gating every commit and push",
      ],
    },
  },
  {
    id: "seqflow",
    context: "Side project",
    title: "seqflow: one source of truth for system design",
    role: "Solo build",
    description:
      "A text format (DSL) for sequence diagrams, architecture, interface definitions and schemas. It lives in the repo next to the code, so it keeps up with the code instead of going stale in a wiki, and it exports to OpenAPI and AsyncAPI.",
    stack: ["TypeScript", "DSL design", "OpenAPI", "AsyncAPI"],
    href: `https://${PERSON.brand.toLowerCase()}.github.io/seqflow/`,
    era: { kind: "build", from: 2026, to: null },
    snapshot: {
      src: "/projects/seqflow.jpg",
      width: 1200,
      height: 750,
      alt: "seqflow editor: the DSL source, the sequence diagram and the inferred AWS architecture side by side",
    },
    overview: {
      lede:
        "You write one text document, and seqflow draws the rest from it: a sequence diagram you can edit by hand, a live architecture diagram, and the contract on every arrow. It runs free in the browser, with no install and no account.",
      built: [
        "A DSL that is a superset of Mermaid's sequenceDiagram, so existing Mermaid files import unchanged",
        "Three panes over one document: the text, a custom SVG sequence editor where steps are drawn, reordered and retargeted by dragging, and an architecture view inferred on every change",
        "49 participant kinds, with AWS managed services as real participants in the flow rather than decoration",
        "Reusable request/response contracts attached by name, with unhappy paths generated as real alt/opt blocks and flagged across both diagrams",
        "Everything you can type, you can build by clicking and dragging; projects live in the browser with autosave and JSON import/export",
      ],
      links: [{ label: `Source on ${SOCIAL.github.label}`, href: `${SOCIAL.github.url}seqflow` }],
    },
  },
];

/* ──────────────────────────────────────────────────────────────────────
   Reviews
   ────────────────────────────────────────────────────────────────────── */

export interface Review
{
  quote: string;
  name: string;
  role: string;
  linkedin?: string;
}

/* "Mark Hughes-D'Aeth" → "MH" */
export const initialsOf = (name: string) =>
  name.split(/\s+/).map((part) => part[0]).join("").toUpperCase();

export const REVIEWS: Review[] = [
  {
    quote:
      "His technical expertise, energy, and leadership have been central to the success… He has driven discussions about future opportunities and has been crucial to helping us design a realistic, yet comprehensive solution.",
    name: "Mark Hughes-D'Aeth",
    role: "Managing Consultant",
    linkedin: "https://uk.linkedin.com/in/mark-hughes-d-aeth-2015b268",
  },
  {
    quote:
      "The pace at which you delivered features in the run-up to production was truly impressive — your contribution was critical to our success. Nic deep-dives into complex technical issues, not only resolving them but taking the time to coach and mentor.",
    name: "Kaspars Strods",
    role: "Managing Technical Consultant",
    linkedin: "https://uk.linkedin.com/in/kaspars-s",
  },
  {
    quote:
      "His leadership as a dev is his standout quality… has not only developed the frontend but also mentored another dev along the way, allowing her to flourish and contribute strongly to the team.",
    name: "James Skinner",
    role: "Data Scientist",
    linkedin: "https://uk.linkedin.com/in/james-skinner-26004a1a4",
  },
  {
    quote:
      "You have solid technical skills, and you take a lot of responsibility… the team clearly trusts and relies on you… you bring a bit of fun and energy to the day-to-day. It's a great mix that really adds to the team.",
    name: "Nick Wright",
    role: "Senior Managing Consultant",
    linkedin: "https://uk.linkedin.com/in/nickwrightnz",
  },
];

/* ──────────────────────────────────────────────────────────────────────
   Education
   ────────────────────────────────────────────────────────────────────── */

export interface Credential
{
  id: string;
  qualification: string;
  /* the timeline's label, where the full name will not fit */
  short: string;
  institution?: string;
  grade: string;
  from: number;
  to: number;
}

/* newest first, as the about room lists them */
export const EDUCATION: Credential[] = [
  {
    id: "msc",
    qualification: "MSc Digital Technology Solutions Specialist",
    short: "MSc Digital Technology",
    institution: "Northeastern University",
    grade: "First",
    from: 2024,
    to: 2026,
  },
  {
    id: "apprentice",
    qualification: "Software Engineering Apprenticeship, Level 5",
    short: "SWE Apprenticeship, L5",
    grade: "Distinction",
    from: 2021,
    to: 2023,
  },
  {
    id: "bsc",
    qualification: "BSc Biology",
    short: "BSc Biology, York",
    institution: "University of York",
    grade: "2:1",
    from: 2016,
    to: 2019,
  },
];

export const credentialLine = (c: Credential) =>
  [c.institution, c.grade, eraSpan(c)].filter(Boolean).join("  ·  ");

/* Contracting particulars — the things a prospective client checks first. */
export const CONTRACTING = {
  clearance: "SC Cleared",
  dayRate: "from £650 / day",
  notice: "1 month notice",
  working: "London · Remote · Hybrid",
};

/* ──────────────────────────────────────────────────────────────────────
   The timeline. Study comes from EDUCATION and dated work from PROJECTS,
   so each era shares its id with the plate that lights it. Only roles
   with no plate of their own are listed here.
   ────────────────────────────────────────────────────────────────────── */

const ROLES: Era[] = [
  { id: "cih",  kind: "role", label: "Citizen Interaction R&D", from: 2022, to: 2022 },
  { id: "nino", kind: "role", label: "NINO citizen service",    from: 2022, to: 2023 },
  { id: "lead", kind: "role", label: "Lead Engineer, agentic",  from: 2024, to: null },
];

export const CAREER: Era[] = [
  ...EDUCATION.map(({ id, short, from, to }): Era => ({ id, kind: "study", label: short, from, to })),
  ...ROLES,
  ...PROJECTS.flatMap(({ id, title, era }) =>
    (era ? [{ id, ...era, label: era.label ?? title.split(":")[0] }] : [])),
].sort((a, b) => a.from - b.from);

export const CAREER_FROM = Math.min(...CAREER.map((era) => era.from));
export const CAREER_TO = Math.max(...CAREER.map((era) => era.to ?? era.from));

/* ──────────────────────────────────────────────────────────────────────
   Summaries: the about room's numbers and terminal log, built from the
   facts above so they can never disagree with them.
   ────────────────────────────────────────────────────────────────────── */

export interface Stat
{
  value: string;
  unit: string;
  label: string;
}

const [latest] = EDUCATION;
const [degree, ...subject] = latest.qualification.split(" ");

export const STATS: Stat[] = [
  { value: String(EMPLOYER.years), unit: "years", label: `engineering at ${EMPLOYER.name}` },
  { value: "1st", unit: "of its kind", label: HEADLINE },
  { value: degree, unit: `${latest.grade.toLowerCase()} class`, label: `${subject.join(" ")}, ${latest.institution}` },
];

export interface LogLine
{
  prompt: string;
  output: string;
}

export const LOG_LINES: LogLine[] = [
  { prompt: "whoami", output: `${PERSON.name}. ${PERSON.title}.` },
  {
    prompt: "cat origin_story.txt",
    output: `${[...EDUCATION].reverse().map((c) => `${c.qualification} (${c.grade})`).join(", then ")}. The long way round.`,
  },
  {
    prompt: `history | grep ${EMPLOYER.name}`,
    /* latest first: still-running roles, then by when each ended */
    output: CAREER.filter((era) => era.kind === "role")
      .sort((a, b) => (b.to ?? Infinity) - (a.to ?? Infinity) || b.from - a.from)
      .map((era) => `${eraSpan(era)} ${era.label}`)
      .join("  ·  "),
  },
  { prompt: "echo $PERSONALITY", output: "Laid-back, nerdy, heart on sleeve. Ask me about system design and I will talk for longer than you planned." },
];
