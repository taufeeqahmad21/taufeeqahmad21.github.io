# Taufeeq Ahmad — Portfolio

Personal portfolio for **Taufeeq Ahmad, Android Developer & Software Engineer**.
A static, dark, editorial-style single-page site built with Next.js (App Router), exported as plain
HTML/CSS/JS and deployed to GitHub Pages.

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`), React 19, TypeScript |
| Styling | Tailwind CSS v4 with a token-based design system in `src/app/globals.css` |
| Motion | `motion` (Framer Motion), with reduced-motion respected globally |
| Icons | `lucide-react`, plus hand-drawn GitHub/LinkedIn marks |
| Package manager | pnpm |

---

## Local development

Requirements: Node.js 20.9+ (CI uses Node 24) and pnpm (the version is pinned in `package.json`; `corepack enable` will pick it up).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Static export to `./out` |
| `pnpm preview` | Serves `./out` locally to check the production build |
| `pnpm lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | Generates route types, then `tsc --noEmit` |
| `pnpm check` | lint + typecheck + build |

---

## Content checklist — fill these in before going live

Nothing personal has been invented. Anything not provided in the brief is either `null` (the site
shows an honest "pending" state instead of a broken link) or explicitly flagged as a placeholder.

| What | Where | Current state |
|---|---|---|
| Availability status | `src/data/profile.ts` → `availability` | ✅ Set |
| Email | `src/data/profile.ts` → `const email` | ✅ Set |
| GitHub profile URL | `src/data/profile.ts` → `socials.github.href` | ✅ Set |
| LinkedIn URL | `src/data/profile.ts` → `socials.linkedin.href` | ✅ Set |
| Résumé PDF | add `public/resume.pdf`, then set `resumeUrl: "/resume.pdf"` | `null`: Résumé button is disabled |
| Project live/source links | `src/data/projects.ts` → `links` | ✅ WA Toolbox (Google Play) and Kalyvor (kalyvor.com) set; InvoiceFlow pending (in development); no public source repos |
| Project screenshots | `src/data/projects.ts` → `preview` | ✅ Real screenshots for WA Toolbox and Kalyvor; InvoiceFlow uses a labelled mockup |
| Product journey | `src/data/journey.ts` | ✅ Independent product work (WA Toolbox, Kalyvor, InvoiceFlow), labelled as not employment; no dates or employers |

Search the codebase for `PLACEHOLDER`, `null` links and `isPlaceholder: true` to find what is still pending.

### Adding a project

Add an object to `src/data/projects.ts`:

```ts
import myAppShot from "@/assets/projects/my-app.webp"; // optional screenshot
import myAppIcon from "@/assets/projects/my-app-icon.png"; // optional icon

{
  slug: "my-app",
  name: "My App",
  category: "Android Application",
  platform: "android",
  status: "published", // "published" | "live" | "in-development"
  description: "One or two sentences on what it does and who it's for.",
  details: [{ label: "Platform", text: "Native Android app, published on Google Play." }], // optional, verified facts only
  features: ["Feature as the product names it"], // optional
  tint: "violet", // showcase atmosphere: "emerald" | "blue" | "violet"
  technologies: ["Kotlin", "Jetpack Compose", "Room"],
  icon: myAppIcon,
  links: { live: "https://play.google.com/store/apps/details?id=…", source: null },
  preview: {
    kind: "screenshots",
    caption: "Screenshots · Google Play",
    images: [{ src: myAppShot, alt: "My App home screen" }],
  },
  // website: preview: { kind: "image", src, alt, caption: "Screenshot · example.com" }
  // no screenshots yet: preview: { kind: "mockup", variant: "android-generic" }
  featured: true, // true = large showcase; false = the quieter "in development" panel
}
```

The button follows `status`: an Android app that is `published` gets **Google Play**, a `live`
website gets **Visit Website**, and `in-development` shows a disabled **In Development** state.
**Source Code** only appears when `links.source` is set.

Import screenshots statically (as above) rather than as string paths. Static imports get the
GitHub Pages base path added automatically.

---

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, metadata (SEO / Open Graph / Twitter), skip link
    page.tsx              Assembles the sections; JSON-LD Person schema
    globals.css           Design system tokens + base styles
    not-found.tsx         404 page (exported as 404.html for GitHub Pages)
    icon.svg              Favicon
    og-image.png/route.tsx  Open Graph image, rendered to a PNG at build time
    sitemap.ts, robots.ts   Generated sitemap.xml and robots.txt
  assets/projects/        Real screenshots and icons (imported statically)
  components/
    layout/               Header (floating nav + mobile menu), Footer, Logo, MotionProvider, CurrentYear
    sections/             Hero, Work, About, Technology, Journey, Contact (in page order)
    projects/             ProjectShowcase (released), ProjectInDevelopment, ProjectMedia
                          (screenshot gallery, browser frame, labelled mockups), ProjectLinks, ProjectStatus
    hero/                 AnimatedHeadline (word-by-word entrance), HeroVisual (product console)
    ui/                   Button (+ ButtonArrow), Badge, SectionHeading, Reveal, SocialLinks, Icons
  data/                   All copy and links: profile, site (nav, section copy, About),
                          skills, projects, journey
  lib/                    utils (cn, withBasePath, initials), site (URL + SEO), motion tokens
  types/content.ts        Types for all content
```

Most components are server components. The client components are `Header` (scroll state,
active-section tracking, mobile menu), `AnimatedHeadline`, `Reveal` (scroll-in animation),
`MotionProvider` and `CurrentYear`.

## Design system

Direction: premium editorial with a subtle futuristic edge. Near-black and midnight navy
surfaces, large sans headlines with serif-italic accent words, hairline borders, low-opacity
atmospheric gradients and an electric blue / violet accent pair.

All tokens are defined in `@theme` in `src/app/globals.css`, so Tailwind generates matching
utilities:

- **Surfaces:** `bg` → `surface-1…4`; utilities `surface-card`, `surface-stage` (project
  showcases), `surface-glass` (floating navigation)
- **Text:** `fg`, `fg-muted`, `fg-subtle` (all meet WCAG AA on the background)
- **Accent:** electric blue `accent` / `accent-strong`, `violet`, and `success` for live status;
  per-project atmosphere tints `tint-emerald`, `tint-blue`, `tint-violet`
- **Lines:** `line`, `line-strong`, `line-accent`, plus the `rule-fade` hairline
- **Type:** Geist (sans), Geist Mono (labels), Instrument Serif italic (`text-accent-serif`);
  fluid sizes `text-mega`, `text-display`, `text-title`, `text-showcase`, `text-statement`,
  `text-heading`, `text-lead`, `text-eyebrow`
- **Radii:** `rounded-control`, `rounded-card`, `rounded-panel`, `rounded-stage`
- **Shadows:** `shadow-card`, `shadow-raised`, `shadow-stage`, `shadow-glow`
- **Motion:** `--ease-out-expo`, `--duration-fast|base|slow|image` (mirrored in `src/lib/motion.ts`,
  with stagger steps)
- **Layout:** `container-page` (80rem), `section-y`, `bg-grid`, `scroll-strip`
- **Components:** `Button` (primary / secondary / ghost × sm / md / lg, pending state, press
  and hover micro-interactions), `Badge` (default / accent / violet / outline / success / pending),
  `SectionHeading` (index + eyebrow on a hairline, serif-accent title)

### Motion

Entrance: the hero headline rises word by word; everything else fades and lifts once as it
scrolls into view (`Reveal`). Hover: project screenshots lift, website previews ease in by
1.5%, buttons get a light sheen and arrow nudge, rows in About and Technology highlight. No
parallax. `prefers-reduced-motion` is honoured in CSS and by `MotionConfig reducedMotion="user"`.

## Accessibility

Semantic landmarks, a skip link, labelled sections, visible focus rings, keyboard-operable mobile
menu (Escape closes it and focus returns to the toggle), `aria-current` on the active nav item,
decorative visuals hidden from screen readers, and `prefers-reduced-motion` honoured in both CSS
and Framer Motion.

## Contact form

There is no contact form on purpose. GitHub Pages can't run server code, and a form that doesn't
send anything is worse than none. Contact goes through a `mailto:` link once `email` is set. If you
want a form later, use a hosted endpoint such as Formspree or Web3Forms: a plain
`<form action="https://formspree.io/f/<id>" method="POST">` works on static hosting.

---

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` lints, type-checks, builds and deploys on every push to
`main` (it can also be run manually). It reads the correct base path and URL from
`actions/configure-pages`, so the same code works for:

- a **project site**: `https://<username>.github.io/<repo>/` (base path `/<repo>`)
- a **user site**: repo named `<username>.github.io` → `https://<username>.github.io/` (no base path)
- a **custom domain** (no base path)

### 1. Create the repository

On GitHub, create a new repository (for example `portfolio`, or `<username>.github.io` if you want
the root URL). Don't add a README, .gitignore or license, because this project already has them.

### 2. Push this project

```bash
git add -A
git commit -m "Initial portfolio"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 3. Turn on GitHub Pages

Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The push in step 2 triggers the workflow. If it ran before Pages was enabled, re-run it from the
**Actions** tab ("Deploy to GitHub Pages" → *Run workflow*). The deployed URL appears on the
workflow run and in Settings → Pages.

### Custom domain (optional)

Add the domain in Settings → Pages and create a `public/CNAME` file containing just the domain
(e.g. `example.com`). `configure-pages` then reports the custom domain as the base URL, so
canonical, Open Graph, sitemap and robots URLs follow automatically.

### Testing a sub-path build locally

```bash
PAGES_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://<username>.github.io/portfolio pnpm build
```

Then check that asset URLs in `out/index.html` start with `/portfolio/`.

## Technical notes

- `cacheComponents` / `partialPrefetching` from the Next.js 16 starter were removed. They are
  server features with no benefit for a fully static export.
- `images.unoptimized` is on because the default image optimizer needs a server.
- `trailingSlash: true` emits `folder/index.html`, which GitHub Pages serves without rewrites.
- `public/.nojekyll` stops Jekyll from ignoring the `_next/` folder if the site is ever published
  from a branch instead of Actions.
