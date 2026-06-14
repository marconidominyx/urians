# Urian Society — Community Website

A premium, hand-crafted website for the **Urian Society** — a community of gamers,
creators, and innovators rooted at Father Saturnino Urios University.

**"Aurora" edition** — a dark, glassmorphic design system with living aurora
gradients, scroll-reveal motion, cursor-tracked spotlights, and fully responsive
layouts. Zero frameworks, zero build step.

## Pages

| Page    | URL         | Source file          | Highlights                                                 |
| ------- | ----------- | -------------------- | ---------------------------------------------------------- |
| Home    | `/`         | `index.html`         | Orbital hero, marquee, value bento, experience tracks, FAQ |
| About   | `/about/`   | `about/index.html`   | Story, mission, community guidelines, university showcase  |
| Events  | `/events/`  | `events/index.html`  | "Events brewing" feature + what's-coming timeline          |
| Contact | `/contact/` | `contact/index.html` | Discord hero + social channel grid                         |

> URLs are **extensionless** — each page lives in its own folder as `index.html`,
> so `/about/` is served with no `.html` in sight. This works identically on
> GitHub Pages and any local static server (no special config needed).

## Tech

- Vanilla **HTML5 + CSS3 + ES6** — no dependencies, no build tools
- A single design-token system in [`css/styles.css`](css/styles.css)
- One consolidated script, [`js/main.js`](js/main.js):
  scroll-reveal, count-up stats, FAQ accordion, mobile nav, card spotlights,
  ambient cursor glow, hide-on-scroll header
- [Font Awesome 6](https://fontawesome.com/) icons · Google Fonts
  (Space Grotesk + Inter)
- Accessibility: focus-visible states, ARIA on nav/accordion,
  `prefers-reduced-motion` support

## Develop locally

Any static server works — the folder-based clean URLs need no special config:

```bash
python -m http.server 8000
# or: npx serve
```

Then visit <http://localhost:8000/> and navigate to `/about/`, `/events/`,
`/contact/`.

## Deploy

Hosted on **GitHub Pages** from the repository root (`.nojekyll` disables Jekyll).
Push to `main` and the site updates automatically.

## Customize

All colors, gradients, radii, and motion live as CSS custom properties at the top
of [`css/styles.css`](css/styles.css) under `:root` — change them in one place to
re-skin the entire site.

---

Crafted with care for the Urian community.
