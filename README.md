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
| Project live/source links | `src/data/projects.ts` → `links` | `null` for Kalyvor and InvoiceFlow ("Not yet public") |
| Project screenshots | `src/data/projects.ts` → `preview` | Code-drawn illustrations labelled "Illustrative preview" |
| Experience | `src/data/experience.ts` | One entry for your own products and one placeholder role marked "To be added" |
| Repositories | `src/data/github.ts` | Repo names are guesses (`kalyvor`, `invoiceflow`), with no links or languages |

Search the codebase for `PLACEHOLDER`, `null` links and `isPlaceholder: true` to find what is still pending.

### Adding a project

Add an object to `src/data/projects.ts`:

```ts
import myAppShot from "@/assets/projects/my-app.png"; // optional screenshot

{
  slug: "my-app",
  name: "My App",
  category: "Android Application",
  platform: "android",
  description: "One or two sentences on what it does and who it's for.",
  technologies: ["Kotlin", "Jetpack Compose", "Room"],
  links: { live: "https://play.google.com/store/apps/details?id=…", source: null },
  preview: { kind: "image", src: myAppShot, alt: "My App home screen" },
  // or, without a screenshot: preview: { kind: "mockup", variant: "android-generic" },
  featured: false, // true = large showcase row, false = card in the grid
}
```

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
  components/
    layout/               Header (+ mobile menu), Footer, Logo, MotionProvider, CurrentYear
    sections/             Hero, About, Skills, Projects, Experience, GitHub, Contact
    projects/             FeaturedProject, ProjectCard, ProjectPreview (mockups), ProjectLinks
    hero/                 HeroVisual (code window + device) and a tiny build-time Kotlin highlighter
    ui/                   Button, Badge, Card, SectionHeading, Reveal, SocialLinks, Icons
  data/                   All copy and links: profile, site (nav + section copy), skills,
                          projects, experience, github
  lib/                    utils (cn, withBasePath), site (URL + SEO), motion tokens
  types/content.ts        Types for all content
```

Most components are server components. The client components are `Header` (scroll state,
active-section tracking, mobile menu), `Reveal` (scroll-in animation), `MotionProvider` and
`CurrentYear`.

## Design system

All tokens are defined in `@theme` in `src/app/globals.css`, so Tailwind generates matching
utilities:

- **Surfaces:** `bg` → `surface-1…4` (midnight navy to near-black, layered)
- **Text:** `fg`, `fg-muted`, `fg-subtle` (all meet WCAG AA on the background)
- **Accent:** electric blue `accent` / `accent-strong`, with a secondary `violet` for Android
- **Lines:** `line`, `line-strong`, `line-accent`
- **Type:** Geist (sans), Geist Mono (labels and code), Instrument Serif italic (accent words);
  fluid sizes `text-display`, `text-title`, `text-heading`, `text-lead`, `text-eyebrow`
- **Radii:** `rounded-control`, `rounded-card`, `rounded-panel`
- **Shadows:** `shadow-card`, `shadow-raised`, `shadow-glow`
- **Motion:** `--ease-out-expo`, `--duration-fast|base|slow` (mirrored in `src/lib/motion.ts`)
- **Utilities:** `container-page`, `section-y`, `surface-card`, `bg-grid`, `text-gradient`
- **Variants:** `Button` (primary / secondary / ghost × sm / md / lg, plus a pending state),
  `Card` (default / interactive / raised / placeholder), `Badge` (default / accent / violet /
  outline / pending)

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
