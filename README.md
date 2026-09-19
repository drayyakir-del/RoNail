# Ronail — Interactive Nail Studio Website

A single-page marketing site for a nail studio, built around one idea: **let the visitor try a polish shade before she books.** Pick a color, and the polish physically fills the nails on an illustrated hand — finger by finger, bottom to top.

Built with **vanilla HTML, CSS and JavaScript. Zero dependencies, zero build step.** Every animation, the SVG hand, and a full accessibility engine are hand-written.

**[Live Demo](#)** · **[Technical Deep-Dive (Hebrew)](TECHNICAL.md)**

<!-- TODO: add a GIF of the try-on in action here — it is the single most convincing asset in this repo.
     ![Try-on demo](images/demo.gif) -->

---

## Why this project is worth 60 seconds

| | |
|---|---|
| **The polish fill effect** | Not a color swap. An SVG `clipPath` masks a paint layer that sits 58px below the nail and slides up — reading as liquid filling the nail. No canvas, no libraries. |
| **Motion that feels physical** | Per-finger stagger (`--d`) rolls the color outward from the middle finger in a 120ms wave. The hand's float and its ground shadow run on the same 6.5s cycle — desync it and the eye immediately calls it fake. |
| **Performance as a constraint, not a cleanup** | Rule set upfront: animate `transform` and `opacity` only. Every effect — parallax, float, reveal — was designed inside that limit, so nothing triggers layout. |
| **Accessibility built into the foundation** | A 7-control a11y engine written from scratch, with preferences applied *before first paint* to prevent FOUC. |
| **Full RTL** | `inset-inline-*` logical properties throughout — no mirrored duplicate rulesets. |

---

## Tech Stack

`HTML5` · `CSS3` (Custom Properties, Grid, Flexbox, `clip-path`, keyframes) · `Vanilla JavaScript (ES6+)` · `SVG` (hand-authored paths, gradients, clip paths) · `IntersectionObserver` · `localStorage` · `requestAnimationFrame`

No framework. No bundler. No `node_modules`. Clone and open `index.html`.

---

## Engineering Highlights

### 1. Liquid paint fill via `clipPath`

Each nail has two layers: the natural nail, and a paint layer clipped to the exact nail shape. The paint layer is parked outside the clip region and transitions into it.

```css
.nail-paint{
  transform: translateY(58px);                          /* parked below the cuticle */
  transition: transform .5s var(--ease-out) var(--d,0s); /* per-finger delay */
}
.tryon-hand.painted .nail-paint{ transform: translateY(0); }
```

The clip does the visual work. One class toggle drives all 8 fingers.

### 2. Forcing an animation to replay

Toggling a class off and on in the same frame is batched by the browser — nothing animates. A forced reflow between the two states makes the replay reliable:

```js
hand.classList.remove('painted');
void hand.getBoundingClientRect();   // flush pending style changes
fills.forEach(p => p.style.fill = color);
hand.classList.add('painted');
```

### 3. CSS variables as the JS↔CSS boundary

Instead of writing `style.transitionDelay` for every finger from JS, each finger carries its own `--d` and CSS reads it. Timing logic stays in CSS; JS toggles one class. Easier to tune, easier to maintain.

### 4. Scroll reveal with a failure path

`IntersectionObserver` handles reveals — but a missed callback (mid-page reload, resize) would leave content stuck at `opacity: 0`. A `revealNear()` fallback runs on scroll/resize/load and reveals anything already in view. **Content never disappears because an API misfired.**

### 5. Accessibility engine

Seven controls (link emphasis, high contrast, 4 text sizes, line spacing, readable font, heading emphasis, motion off), persisted to `localStorage`.

The part worth noting: an inline script in `<head>`, before any stylesheet, reads the saved preferences and applies classes to `<html>`. Without it, a user with high-contrast enabled sees a flash of the default theme on every page load. Also: system-level `prefers-reduced-motion` is respected by *not constructing* animated elements at all, `Alt+A` shortcut, `aria-pressed` on every toggle, `aria-live` announcements on shade selection, and 44×44px minimum touch targets.

---

## Features

- **Interactive try-on** — 14 shades including multi-stop gradients (ombré, holographic, rose-gold, split), French tips and glitter as independent layers
- Ambient falling petals with randomized, non-synchronized loops
- Scroll-triggered reveals, `rAF`-throttled hero parallax, self-drawing SVG brushstroke
- Responsive nav with scroll-shrink, mobile menu with scroll-lock and `Esc` handling
- Services, gallery, about and contact sections
- Formal accessibility statement page
- Instagram story template (1080×1920) as a standalone page

---

## Running Locally

```bash
git clone <repo-url>
cd RoNail
python -m http.server 8000    # or just open index.html
```

---

## Project Structure

```
├── index.html          # main page — all sections
├── styles.css          # design system, motion tokens, all animations
├── script.js           # a11y engine, nav, scroll reveal, try-on logic
├── accessibility.html  # formal accessibility statement
├── story.html          # 1080×1920 Instagram story template
└── images/             # gallery work samples
```

---

## Known Limitations & Next Steps

Being honest about scope is part of the work:

- **No booking backend.** Contact goes to WhatsApp and phone. A real booking flow needs a calendar API and availability logic.
- **The hand is a single illustrated pose.** Different nail shapes (almond, coffin, square) would require separate path sets — a meaningful extension.
- **No automated tests.** For a static marketing site the cost/benefit didn't justify it; a build step would change that calculation.
- **Gallery images are static.** A CMS or a simple JSON manifest would let the studio owner update work samples without touching code.

---

## What I Took From This

Building without a framework forced decisions that a framework usually hides: how the browser batches style changes, why `transform` and `opacity` are the only cheap properties to animate, and how much of "polish" is actually just two animations sharing a duration.

The accessibility work reframed the most: preferences have to load before first paint, animations have to know not to exist, and every visual interaction needs a verbal equivalent. That changes code structure, not just markup.

Full technical breakdown, in Hebrew: **[TECHNICAL.md](TECHNICAL.md)**

---

## License

Free to use for learning purposes. Images and copy belong to Ronail studio.
