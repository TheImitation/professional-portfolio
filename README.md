This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## `/fluid` — scroll-driven prototype (branch: `prototype/fluid-gallery`)

An alternative presentation of the same content, at **`/fluid`**. The live site
at `/` is untouched — both routes build and render independently, so they can
be compared side by side.

Seven rooms, one continuous atmosphere:

| | Room | Content |
|---|---|---|
| i | Approach | hero — name, brand, roles, the *faux* wordplay |
| ii | Ganzfeld | about — the terminal log, then the numbers |
| iii | Colonnade | skills — a 3D corridor you travel through |
| iv | Horizon | threshold — "built, torn down, rebuilt" |
| v | Volume | projects — seven glass panes, one per reincarnation |
| vi | Field | testimonials — quotes in a mote field |
| vii | Egress | contact — as gallery wall text |

### The one idea

A single hue travels from `iris` (the cold blues, graded like the eyes in the
old headshot) out through violet and magenta to `ember` (the warmth sampled
from the sunset in the new one) — and back home to iris. Cold to warm to cold,
across the length of the scroll. Old photo to new photo. Every surface takes
its colour from that one travelling value.

### The joins are exact, not eyeballed

`entry` is a room's top edge crossing the viewport; `exit` is its bottom edge
crossing. Adjacent rooms **share that edge**, so room *n*'s exit and room
*n+1*'s entry are the identical stretch of scroll:

```css
animation-range: entry 0% entry 100%, exit 0% exit 100%;
```

Split across two nested elements (both plain `opacity`, both composited) the
pair sums to exactly `1` the whole way across — at any room height, with no
tuning.

### Pacing is counted, not guessed

`components/fluid/pacing.ts` lays every room out from its content. There are two rules:

- **Transitions are fixed.** Every plate fades in and out over the same
  `XFADE` (30svh), and rooms join over one viewport, whatever their length.
- **Holds are earned by words.** Each plate holds for
  `BASE + PER_WORD × words` (clamped to `FLOOR`…`CEIL`), counted from
  `datasets/Content.ts` at build time. Chips such as stacks and outcomes count
  at half weight. A room's height follows from its holds. Edit a project
  description and its plate re-paces at the next build.

Because holds differ, each window length gets its own generated keyframes, so
a fade stays exactly `XFADE` long. The hero is the exception: it is already
read at rest before the tour starts, so it holds for a fixed `OPENING`. To
make the whole page more or less leisurely, change `PER_WORD`.

### Performance constraints are load-bearing

This CSS is a second draft. The first version derived every colour from the
travelling hue and the screen flashed on every frame. Four rules came out of
fixing it, and they are why the prototype holds ~10 composited layers / ~13 MB
of layer surface instead of 59 / 200 MB:

1. **One property reads the travelling variables** — `.fluid-weather`'s
   background. Everything above is plain black/white alpha.
2. **Those variables are `inherits: false`.** Inherited on `:root`, each
   frame forced a style-recalc walk of the whole tree (~2.2 ms/frame before a
   pixel was painted). Scoped, the same change costs ~0.06 ms.
3. **Rooms animate `visibility`, not just `opacity`.** A layer with an
   animating opacity stays resident on the GPU even at 0; tile eviction is
   what the flashing actually was.
4. **No `backdrop-filter`, no animated blur radii, no keyframe touching a
   layout property** (`letter-spacing` in a keyframe reflows text every frame).

### Known trade-offs

- **Content paces with the scroll.** Rooms with several items (skills,
  projects, testimonials) show one "plate" at a time, fading as you pass. It
  is reversible — scroll back and it returns — but it is slower to skim than
  the live site's dense layout. Worth deciding deliberately before this
  becomes `/`.
- **Requires scroll-driven animation support** for the full effect. Without
  it, `FluidChrome` interpolates the same atmosphere table by hand and each
  room shows its first plate, so the page still reads — just without the
  choreography.
- **`SpriteQuest` is not carried over.** The pixel creature that hides behind
  the headshot is bound to the live hero's layout and its own pointer
  handling. The photograph is here; the creature behind it is not, yet.

### Carried over from the live site

Three details were kept deliberately rather than reinvented:

- **The portrait.** `headshot.jpg` is hung in the first room with a scroll-driven
  3D tilt, the aperture of light on its side of the composition. Its alt text
  already noted the golden sunset backlighting it — and that sunset is where
  FAUX's `ember` was sampled from, which is exactly where the hue journey ends.
  The room's wall label says so.
- **The nav name-swap.** Hovering `{TheImitation_}` declassifies it to
  `{Defaux_}` in ember italic — 12ch to 6ch, which only lands exactly because
  the face is monospaced. Ported from `styles/components/Navbar.css` so the two
  stay recognisably the same thing.
- **The vertical role ticker and the shimmering brand mark**, both lifted from
  the live hero.

### Content is shared, not copied

`datasets/Content.ts` is the single source for stats, the terminal log, skill
domains, projects, reviews and the role ticker. The live section components
and `/fluid` both read from it, so the two presentations cannot drift. Skills
keeps its own SVG strokes in `components/Skills.tsx`, keyed by domain id —
illustration stays with its component, copy does not.

### To promote it to the homepage

Swap the section imports in `app/page.tsx` for the `/fluid` room markup, or
simply make `app/fluid/page.tsx` the default export of `app/page.tsx`. Remove
the `robots: { index: false }` in its metadata, and drop the
`body:has(.fluid)` chrome-suppression rules in favour of deleting `Navbar` /
`SidePanel` from the root layout.
