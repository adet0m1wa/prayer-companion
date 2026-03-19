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

## Color Tokens

5 base hex values, 9 unique combinations. Locked order: ink → accent → surface.

| # | Token Name | Hex | Opacity | Used As | Base Hex |
|---|---|---|---|---|---|
| 1 | ink/default | #3D2E1F | 100% | text, icon, fill, stroke | #3D2E1F |
| 2 | ink/muted | #3D2E1F | 70% | text | #3D2E1F |
| 3 | ink/faded | #3D2E1F | 50% | icon, text | #3D2E1F |
| 4 | accent/default | #E63434 | 100% | icon, fill, text | #E63434 |
| 5 | accent/subtle | #E6343433 | 20% (via hex) | stroke | #E63434 |
| 6 | surface/canvas | #E4DED5 | 100% | fill | #E4DED5 |
| 7 | surface/card | #F3EDE3 | 100% | fill | #F3EDE3 |
| 8 | surface/muted | #EDE6D8 | 100% (also used at 40% node opacity for disabled states) | fill | #EDE6D8 |
| 9 | surface/overlay | #F3EDE3CC | 80% (via hex) | fill (array layer) | #F3EDE3 |

Note: Rows 5 and 9 use 8-char hex codes due to Pencil limitations — flagged for conversion when moving to Figma.

## Typography Tokens

| Token Name | Font Family | Weight | Size | Style | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| heading/display | Playfair Display | Bold/700 | 22px | normal | auto | auto |
| heading/section | Playfair Display | SemiBold/600 | 18px | normal | auto | auto |
| heading/card | Playfair Display | SemiBold/600 | 16px | italic | auto | auto |
| heading/toggle-active | Playfair Display | SemiBold/600 | 16px | normal | auto | auto |
| heading/toggle-inactive | DM Sans | Regular/400 | 16px | normal | auto | auto |
| system/status | Inter | Bold/700 | 15px | normal | auto | auto |
| body/default | DM Sans | Regular/400 | 14px | normal | 1.5 | auto |
| body/counter | DM Sans | SemiBold/600 | 12px | normal | auto | auto |
| body/caption | DM Sans | Regular/400 | 12px | normal | auto | auto |
| body/separator | Dancing Script | Regular/400 | 12px | normal | auto | auto |
| body/label | DM Sans | SemiBold/600 | 10px | normal | auto | 0.5 |

11 unique text styles. 3 font families: Playfair Display (headings), DM Sans (body), Dancing Script (decorative separators), Inter (system only).

## Spacing Tokens

| Token Name | Value |
|---|---|
| space/0 | 0px |
| space/2 | 2px |
| space/4 | 4px |
| space/6 | 6px |
| space/8 | 8px |
| space/10 | 10px |
| space/16 | 16px |
| space/20 | 20px |
| space/24 | 24px |
| space/36 | 36px |

10 unique spacing values. Base unit: 2px. All even numbers. Applied to both padding and gap — the token defines the value, the usage context determines the CSS property.

## Icon Size Tokens

| Token Name | Size | Icon Type | Total Count |
|---|---|---|---|
| icon/60 | 60 × 60 | Aspect icon (loader) | 1 |
| icon/30 | 30 × 30 | Aspect icon (cards, headers) | 14 |
| icon/22 | 22 × 22 | UI action icons (phosphor) | 10 |
| icon/18 | 18 × 18 | Chevron navigation (phosphor) | 5 |
| icon/16 | 16 × 16 | Status + metadata icons (lucide, phosphor) | 32 |

5 unique icon sizes. 62 icon instances total.

## Corner Radius Tokens

| Token Name | Value | Where Used | Total Count |
|---|---|---|---|
| radius/22 | 22px | chevron-left (×3), chevron-right (×2), back-chevron (×2) | 7 |
| radius/16 | 16px | verse-card | 1 |
| radius/12 | 12px | search-bar, testimony-card (×3) | 4 |
| radius/3 | 3px | status-battery (×4) | 4 |
| radius/1 | 1px | battery-level (×4), toggle-articles-underline, toggle-videos-underline | 6 |

5 unique radius values. 22 elements total.

## Image/Thumbnail Sizes

| # | Size (w × h) | Image Type | Where Used | Screens Present | Total Count |
|---|---|---|---|---|---|
| 1 | 120 × 100 | Video thumbnail | video-thumbnail-1, video-thumbnail-2, video-thumbnail-3, video-thumbnail-4 | Video | 4 |
| 2 | 100 × 100 | Article thumbnail | article-thumbnail-1, article-thumbnail-2, article-thumbnail-3, article-thumbnail-4 | Article | 4 |
| 3 | 40 × 40 | Testimony avatar (ellipse) | testimony-avatar (Sarah), testimony-avatar (David), testimony-avatar (Grace) | Dashboard | 3 |

3 unique image sizes. 11 image elements total.

## Strokes/Borders

| # | Color Token | Width | Where Used | Screens Present | Total Count |
|---|---|---|---|---|---|
| 1 | ink/default | 1px | status-battery | All 4 | 4 |
| 2 | accent/subtle | 1px | search-bar | Dashboard | 1 |

2 unique stroke styles. 5 stroked elements total.

## Component Dimensions

| Component | Width × Height | Sizing | Screen |
|---|---|---|---|
| screen-1-dashboard | 402 × 874 | fixed | Dashboard |
| screen-transition-loader | 402 × 874 | fixed | Loader |
| screen-2-article | 402 × 874 | fixed | Article |
| screen-2-video | 402 × 874 | fixed | Video |
| status-bar | fill × 52 | fill width, fixed height | All 4 |
| content-wrapper | fill × fill | fills remaining | Dashboard, Article, Video |
| content-center | fill × fill | fills remaining, centered | Loader |
| bottom-nav | fill × 70 | fill width, fixed height | Dashboard |
| verse-card | fill × hug | fill width, hug height | Dashboard |
| topic-card-* (×12) | fill(354) × 146 | fill width (fallback 354), fixed height | Dashboard |
| testimony-card (×3) | 354 × hug | fixed width, hug height | Dashboard |
| search-bar | fill × 46 | fill width, fixed height | Dashboard |
| header-area | fill × hug | fill width, hug height | Article, Video |
| toggle-group | hug × hug | hug both | Article, Video |
| article-cards-view | fill × hug | fill width, hug height | Article |
| video-cards-view | fill × hug | fill width, hug height | Video |
| article-card-* (×4) | fill × 145 | fill width, fixed height | Article |
| video-card-* (×4) | fill × 145 | fill width, fixed height | Video |

## Audit Rules

### Mistakes to Avoid
- NEVER use cached/stale data. Re-fetch design.pen fresh before every report or verification.
- NEVER assume opacity intent. If the design rule doesn't specify opacity, ASK before applying.
- NEVER consolidate colors/values without listing ALL affected layers first. Let the designer decide.
- NEVER produce large reports without confirming format first. Show 2-3 sample rows, get approval, then generate.
- NEVER report verification from pre-change data. Every "after" report requires a fresh fetch.
- NEVER silently convert between 8-char hex and 6-char hex + opacity. Flag notation, let designer decide.
- NEVER just flag inconsistencies — propose the fix immediately on first detection. Don't wait for the designer to notice it again 3 phases later.
- NEVER assume agent-made changes persisted. The designer may have reverted or adjusted. Always re-read fresh.
- NEVER use bare numbers for font weights. Always name/number format: Bold/700, SemiBold/600, Medium/500, Regular/400.
- NEVER sort typography by font family. Sort by size descending (visual hierarchy).
- NEVER show default values in group headers. Omit "normal" style. Show "italic" only when present.
- NEVER let naming inconsistencies survive past the layer naming phase. Flag mismatched names during naming audits, not during property audits 3 phases later.
- NEVER audit sibling components in isolation. Diff article-card vs video-card full property sets when they serve the same role.

### Rules to Follow
- Run search_all_unique_properties FIRST on all target frames before any work. Non-negotiable.
- After every batch of changes, verify with search_all_unique_properties.
- Use replace_all_matching_properties for bulk changes — zero misses vs one-by-one.
- Use before → after tables + affected groups only for change reports.
- When fixing N items in a group, verify ALL N+1 (including the one already correct) match afterward.
- Separate padding and gap in spacing audits. Different sections, not interleaved.
- Track cross-phase inconsistencies in a running list. Carry open items forward between phases.
- Verify node creation results. After inserting new elements, fetch properties to confirm all values applied.
- Ask for a sample row before producing large formatted reports.
- Token naming is collaborative: agent extracts flat list → designer names → agent writes to CLAUDE.md.
- The designer owns Pencil. The agent owns extraction.
- Audit layer naming BEFORE visual properties. Naming is cheaper to fix early.
- Compare sibling components across screens. Same role = same structure, same properties.
- Combine related visual property audits into one pass. Corner radius, strokes, image sizes share node data — fetch once, report multiple categories.
- Check node TYPE consistency, not just values. Same visual role should use same node type (rectangle vs frame) for clean code generation.

### Designer Patterns to Watch
- Partial manual edits: when fixing multiple siblings, one may be missed (e.g. prayer-preview stayed at 13px while 10 others were fixed)
- Redundant wrapper frames: flag unnecessary nesting during layer audits (e.g. content-toggle wrapping toggle-group)
- Weight inconsistencies across identical components: check all cards/testimonies match, not just the first one

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
