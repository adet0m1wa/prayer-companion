# CLAUDE.md — Prayer Companion App

> Project memory. Updated after each completed step.

## Project

**Name:** Prayer Companion App
**Type:** Bible-focused topic exploration app (React + Vite + Tailwind)
**Screens:** 2 — Daily View (home), Topic Detail View (expanded card)
**Aesthetic:** Calm, intentional, God-first. Light parchment theme with biblical manuscript vibe, hand-drawn icons, serif headings.

## Owner

olomi (Tomiwa) — UI/UX designer. Design is his domain. Code is CD's domain.
AI generates initial designs in Pencil → olomi hand-tweaks each screen before moving on.

## Current Status

**Step 0 — Setup & Init: COMPLETE**
- Project folder scaffolded
- Reference images organized with notes.md per screen
- PRD.md (v1) and TECHNICAL.md (v1) written
- CLAUDE.md created
- design.pen placeholder created
- Agent and skill markdown files created

**Step 1 — References & Planning: COMPLETE**
- References organized, PRD and TECHNICAL written

**Step 2 — Screen 1 Design: COMPLETE (v4 — final)**
- Iterations: v1 (dark mode), v2 (dark mode refined), v3 (light parchment), v4 (refined content & colors — FINAL)
- Final frame: `screen-1-daily-view-v4` in design.pen
- Aesthetic: warm parchment background (#E4DED5), all text/icons use #3D2E1F (no pure black)
- Playfair Display italic headings, DM Sans body, hand-drawn icons
- Cards use torn-edge parchment textures (texture 1.0.png) — not solid color fills
- Verse card: subtle waterfall illustration at low opacity, scripture text, action icons (like/share/comment)
- "Understanding Aspects" section with search bar
- 12 aspect cards across 3 paginated pages (4 per page):
  - Page 1: Love, Faith, Sin, Theology (hand-drawn icons from src/images/)
  - Page 2: Grace, Prayer, Forgiveness, Hope (placeholder gray icons)
  - Page 3: Mercy, Wisdom, Redemption, Worship (placeholder gray icons)
  - Each card has a 2-3 line context description
- Testimonies section with 3 paginated full-text testimonies:
  - Page 1: Sarah M. — Page 2: David K. — Page 3: Grace O.
- Pagination: chevron + "1 / 3" counter for both Aspects and Testimonies
  - Left chevron muted (opacity 0.4) on page 1
- Bottom nav: 4 tabs (Home, Bible, Community, Alerts), active = red #E63434 filled Phosphor icon
- All layers semantically named

**Next: Step 2 continued — Screen 2 (Topic Detail View) design**

## Screen Inventory

### Screen 1 — Daily View (DESIGNED — v4 final)
- Greeting: "Good Morning, Jamie" in Playfair Display bold + fire streak icon with streak count
- Verse of the day card: subtle waterfall bg, scripture (Jeremiah 29:11), action icons (like/share/comment), reference
- "Understanding Aspects" section: heading + search bar ("Search for an aspect")
- 12 topic cards across 3 paginated pages (4 per page), overlapping parchment-textured stack with torn paper edges
  - Page 1: Love, Faith, Sin, Theology — hand-drawn icons
  - Page 2: Grace, Prayer, Forgiveness, Hope — placeholder icons
  - Page 3: Mercy, Wisdom, Redemption, Worship — placeholder icons
  - Each card has context description text
- Testimonies section: 3 full-text testimony cards (Sarah M., David K., Grace O.) with avatars, paginated
- Pagination: chevron left/right + "1 / 3" counter (both Aspects and Testimonies)
- Bottom nav: Home (filled, red), Bible, Community, Alerts — Phosphor icons
- All colors use #3D2E1F (warm brown) instead of #000000

### Screen 2 — Topic Detail View
- Expanded from tapped card with smooth ease transition
- Color shifts: full accent → 80% white + 10% accent
- Header: title left-aligned + Rive icon to the left + vertical line separator
- Content toggle: Articles | Videos (right-aligned)
- Article cards: thumbnail + title + description + metadata (views, likes, read time)
- Video cards: thumbnail + large play icon + title only + metadata (views, likes, duration)
- Bottom nav persists. Home = back to Screen 1.

## Design References

| Reference | Source | Used For |
|---|---|---|
| ref-moonly-cards.png | Moonly app | Screen 1 — card stack layout, font sizing |
| ref-costar-header.png | Co-Star app | Screen 2 — vertical line header treatment, left-aligned layout |
| ref-bloom-content-cards.png | Bloom app | Screen 2 — content card arrangement, article vs video distinction |

## Build Order (Strict)

1. ~~Setup & Init~~ ✓
2. Screen Design in Pencil (olomi leads, AI generates initial, olomi refines)
3. Design System Extraction (tokens from completed designs)
4. Component Generation (atoms → molecules → pages)
5. Framer Motion animations
6. Rive animations
7. Visual QA
8. Code Review

## Design Assets (src/images/)

| File | Description | Used In |
|---|---|---|
| verse of the day.png | Hand-drawn waterfall landscape | Verse card background (low opacity) |
| love.png | Hand-drawn heart | Love topic card icon |
| faith.png | Hand-drawn cross with rays | Faith topic card icon |
| sin.png | Hand-drawn apple with serpent | Sin topic card icon |
| theology.png | Hand-drawn scroll with cross | Theology topic card icon |
| texture 1.0.png | Parchment texture (torn edges) | All topic card backgrounds |
| normal 1.png | Parchment texture (torn edges) | Legacy — replaced by texture 1.0.png in v4 |
| normal 2.png | Parchment texture (torn edges) | Legacy — replaced by texture 1.0.png in v4 |
| image.png | Night sky with moon (dark mode) | Not used in v4 (was used in v2) |

## Gotchas & Decisions

- No Screen 3 — app is 2 screens only
- No back button on Screen 2 — Home nav tab IS the back action
- Rive icons use placeholders until Step 6
- Content toggle right-aligned for right-thumb accessibility
- Video cards have title only (no description) to differentiate from article cards
- Article cards have no play icon
- Verse card no longer uses illustration as prominent background — subtle low-opacity only
- All text/icon colors use #3D2E1F (warm brown) — no pure #000000 anywhere
- Icon family: Phosphor (not lucide or Material Symbols) for all UI icons
- Font stack: Playfair Display (italic, headings), DM Sans (body), Inter (status bar)
- Active nav color: red #E63434 (not coral/sienna from earlier iterations)
