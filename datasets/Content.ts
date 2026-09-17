/**
 * Shared editorial content.
 *
 * Lifted out of the individual section components so that the live site and
 * the /fluid prototype render the same words from one place. Illustration
 * stays with its component (Skills keeps its own SVG strokes, keyed by id) —
 * only the copy lives here.
 */

export interface Stat
{
  value: string;
  unit: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "5", unit: "years", label: "engineering at IBM" },
  { value: "1st", unit: "of its kind", label: "successful AI platform for public sector clients" },
  { value: "MSc", unit: "first class", label: "Digital Technology Solutions Specialist, Northeastern" },
];

export interface LogLine
{
  prompt: string;
  output: string;
}

export const LOG_LINES: LogLine[] = [
  { prompt: "whoami", output: "Nic Defaux — Senior Software Engineer & Technical Strategist" },
  { prompt: "cat origin_story.txt", output: "A biology degree, then a Level 5 software engineering apprenticeship with Distinction, then an MSc in Digital Technology Solutions — First. Not the standard computer science pipeline; every step of it earned." },
  { prompt: "history | grep IBM", output: "Five years building and rebuilding AI platforms; delivered the first successful AI platform for public sector clients, a Generative AI centre of excellence." },
  { prompt: "echo $PERSONALITY", output: "Laid-back, nerdy, heart firmly on sleeve. Will absolutely talk your ear off about elegant architectures." },
];

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
    caption: "Interfaces people actually enjoy",
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
    caption: "Systems sketched on napkins, shipped to clouds",
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
    caption: "Built & rebuilt AI platforms — incl. the public sector's first",
    skills: [
      "Generative AI platform engineering",
      "LLM integration, RAG & agents",
      "AI strategy for the public sector",
      "MLOps & evaluation pipelines",
      "Responsible & explainable AI",
    ],
  },
];

export interface Project
{
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  outcomes?: string[];
  stack: string[];
  href?: string;
  locked?: boolean;
  /* Site is temporarily down — show a badge instead of a dead `href`. */
  pending?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "lighthouse",
    period: "IBM · Public Sector",
    title: "Generative AI Lighthouse — Centre of Excellence",
    role: "Senior Technical Consultant",
    description:
      "Propositions and proof-of-concept solutions showing public sector clients what Generative AI can actually do: bespoke AWS cloud architectures, foundational software, and GPT-4-powered showcases that modernised technical and customer-support capabilities for genuine service excellence.",
    outcomes: ["8 PoCs delivered", "2 MVPs shipped", "AI ethics framework", "Strategic AI pipeline"],
    stack: ["AI Platform", "Cloud Architecture", "Technical Strategy", "Business Analysis"],
    locked: true,
  },
  {
    id: "ai-platform",
    period: "IBM · Public Sector",
    title: "The First Successful Public-Sector AI Platform",
    role: "Engineer → Consultant → Architect",
    description:
      "Built, stress-tested, torn down and rebuilt. The platform survived full architectural reincarnations on its way to becoming the first successful AI platform delivered for public sector clients — and the blueprint I still measure every platform against.",
    outcomes: ["£4m programme", "+77% process throughput", "10/10 NPS"],
    stack: ["AWS", "Meta", "TypeScript", "Kubernetes", "Terraform"],
    locked: true,
  },
  {
    id: "wc-sweeps",
    period: "2026 · Personal challenge",
    title: "World Cup 2026 Sweepstakes Tracker",
    role: "Solo build — design to production",
    description:
      "A production sweepstakes platform for the 2026 World Cup: live brackets, draw management and leaderboards that update as the tournament unfolds. Built end-to-end as a personal challenge and shipped for real players to use all summer.",
    stack: ["Next.js", "TypeScript", "Render", "Neon", "Cloudflare R2", "Vibes"],
    /* href: "https://sportssweepstakes.co.uk/" — offline for now. */
    pending: true,
  },
  {
    id: "mak99-interiors",
    period: "2026 · Freelance client",
    title: "MAK99 Interiors — Studio Site Rebuild",
    role: "Freelance build — redesign to production",
    description:
      "A full Next.js rebuild of a Washington D.C. interior design studio's marketing site: filterable project galleries with lightbox carousels, client testimonials, an Instagram feed and SEO groundwork (JSON-LD, OG cards, sitemap). Delivered end-to-end as billed freelance client work, from redesign to production launch.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    href: "https://www.mak99interiors.co.uk/",
  },
  {
    id: "seqflow",
    period: "Ongoing · Solo build",
    title: "seqflow — one source of truth for system design",
    role: "Solo build — design through implementation",
    description:
      "A DSL-driven single source of truth for sequence diagrams, architecture inference, interface definitions and schema management — built to live alongside the code from the first commit rather than rot in a wiki. Hybrid text and visual canvas, message-contract modelling, and exports straight to OpenAPI and AsyncAPI.",
    stack: ["TypeScript", "DSL design", "OpenAPI", "AsyncAPI"],
  },
];

export interface Review
{
  quote: string;
  name: string;
  role: string;
  initials: string;
  linkedin?: string;
}

export const REVIEWS: Review[] = [
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

export interface Credential
{
  qualification: string;
  institution?: string;
  grade: string;
  years: string;
}

export const EDUCATION: Credential[] = [
  {
    qualification: "MSc Digital Technology Solutions Specialist",
    institution: "Northeastern University",
    grade: "First",
    years: "2024 – 2026",
  },
  {
    qualification: "Software Engineering Apprenticeship, Level 5",
    grade: "Distinction",
    years: "2021 – 2023",
  },
  {
    qualification: "BSc Biology",
    institution: "University of York",
    grade: "2:1",
    years: "2016 – 2019",
  },
];

/* Contracting particulars — the things a prospective client checks first,
   and which the site never actually said out loud. */
export const CONTRACTING = {
  clearance: "SC Cleared",
  dayRate: "from £650 / day",
  notice: "1 month notice",
  working: "London · Remote · Hybrid",
};

/* The hero's vertical role ticker. */
export const JOB_ROLES = [
  "Senior Software Engineer",
  "Technical Strategist",
  "AI Platform Architect",
  "GenAI & Agentic Systems",
];
