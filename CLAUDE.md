# CLAUDE.md — Prayer Companion App

> Project memory. Updated after each session. Slim version — detailed docs referenced below.

## Project

**Name:** Prayer Companion App
**Type:** Bible-focused topic exploration app (React 18 + Vite 8 + TypeScript + Tailwind v4 + Framer Motion)
**Live URL:** prayer-companion-neon.vercel.app
**Repo:** github.com/adet0m1wa/prayer-companion (auto-deploys on push to main)
**Aesthetic:** Calm, intentional, God-first. Light parchment theme, biblical manuscript vibe, hand-drawn sketch-style icons, serif headings.

## Owner

olomi (Tomiwa) — UI/UX designer. Design is his domain. Code is Claude Code's domain.

## Current Status

**All screens built, animated, optimized, and deployed.**

| Step | Status |
|---|---|
| Setup & Init | Complete |
| Screen Design (Pencil) | Complete (4 frames) |
| Design System Extraction | Complete (40 tokens) |
| Component Generation | Complete (all 4 screens) |
| Framer Motion Animations | Complete |
| Rive Animations | Not started (placeholders) |
| Image Optimization | Complete (40MB -> 751KB) |
| Responsive Layout (360-460px) | Complete |
| PWA Config & Deployment | Complete |
| Visual QA | Ongoing |
| Documentation | Complete |

**Only the Love aspect is built.** Other aspects use the same design system when expanded.

## Screens

| # | Screen | Status |
|---|---|---|
| 1 | Dashboard | Built + animated + responsive |
| 2 | Transition Loader | Built + animated |
| 3 | Topic Detail — Articles | Built + animated + responsive |
| 4 | Topic Detail — Videos | Built + animated + responsive |

## Key Architecture

- **Container:** max-w-[460px] min-w-[360px], sweet spot 390px
- **PWA shell:** 100dvh flex column, single scroll context, no position:fixed
- **Bottom nav:** Dashboard only (flex-shrink-0), NOT on detail page
- **Detail page:** Back chevron navigation only, absolute overlay sibling to scroll container
- **Images:** 2x retina, Phase 1 blocking preload (9 images) + Phase 2 background preload (16 images)
- **Textures:** WebP format, ~38KB each

## Documentation References

| Doc | What's In It |
|---|---|
| `docs/design-system.md` | All tokens: colors, typography, spacing, icons, radius, dimensions |
| `docs/motion-system.md` | All animation timing, transition flows, swipe system, FLIP patterns |
| `docs/responsive-system.md` | Breakpoints, font scaling, PWA layout, image optimization, safe areas |
| `docs/code-bug-reference.md` | 15 documented code bugs with root causes and fixes — **READ BEFORE BUILDING NEW ASPECTS** |
| `docs/design-system-process.md` | How the design system was extracted (reusable process) |
| `docs/PRD.md` | Product requirements |
| `docs/TECHNICAL.md` | Technical specification |

## Before Building Anything New

1. Read `docs/code-bug-reference.md` — 15 bugs to avoid
2. Read `docs/design-system.md` — all token values
3. Read `docs/motion-system.md` — all animation timing
4. Read `docs/responsive-system.md` — breakpoints and scaling rules
5. Check `.claude/skills/prayer-companion-design-system/` — component patterns and gotchas

## Known Issues

| Issue | Severity | Notes |
|---|---|---|
| One-frame flash after card swipe | Low | Shared MotionValue timing gap. Two fix attempts failed. Deferred. See code-bug-reference.md #3. |
| Love icon moves on swipe after returning from detail | Low | isTransitioning never resets. Fix identified, not applied. See code-bug-reference.md #9. |
| Pinch-to-zoom disabled globally | Medium | maximum-scale=1 for iOS input zoom. Accessibility concern for elderly users. Design debt. |
| Web haptics untested | Low | Needs real phone with vibration motor |

## Key Rules

### Git
- ALWAYS commit before experimenting. Never `git stash drop` without a safety commit.
- Use branches for risky changes. Delete broken branches, don't merge them.
- Regular `git push` is safe from Claude Code. Destructive commands (`reset --hard`, `stash drop`, `push --force`) run in terminal only.

### Code Changes
- One change at a time. Test between each.
- Specify exactly which elements when changing font sizes — never say "change all."
- Read the component code before writing fix prompts.
- Check both default and media query blocks when setting CSS variables.

### Design
- No pure black (#000000) — all text uses ink/default (#3D2E1F)
- Playfair Display for headings only. DM Sans for body. Dancing Script for separators. Inter for status bar.
- Active state: accent/default (#E63434). Inactive: ink/faded (50% opacity).
- Card backgrounds use parchment texture images, not flat colors.
- Start at smallest screen (360px) and scale up.

### Pencil
- Save (Cmd+S) and close Pencil tab before Claude Code edits design.pen.
- If canvas goes blank, close and reopen VS Code — it's a render state, not corruption.

### Naming
- Never use abbreviations "CD" or "CC" — always "Claude AI" and "Claude Code."
- Audit layer naming BEFORE visual properties.

## Audit Rules

### Mistakes to Avoid
- NEVER use cached/stale data. Re-fetch design.pen fresh before every report.
- NEVER assume opacity intent. Ask before applying.
- NEVER consolidate values without listing ALL affected layers first.
- NEVER report verification from pre-change data.
- NEVER silently convert between 8-char hex and 6-char hex + opacity.
- NEVER just flag inconsistencies — propose the fix immediately.
- NEVER use bare numbers for font weights. Always name/number: Bold/700, SemiBold/600.
- NEVER sort typography by font family. Sort by size descending.
- NEVER audit sibling components in isolation. Diff them when they serve the same role.

### Rules to Follow
- Run search_all_unique_properties FIRST before any work. Non-negotiable.
- After every batch of changes, verify with search_all_unique_properties.
- Use replace_all_matching_properties for bulk changes.
- Separate padding and gap in spacing audits.
- Compare sibling components across screens.
- Check node TYPE consistency, not just values.

### Designer Patterns to Watch
- Partial manual edits: when fixing siblings, one may be missed.
- Redundant wrapper frames: flag unnecessary nesting.
- Weight inconsistencies across identical components.

## File Structure

```
prayer-companion/
├── .claude/skills/prayer-companion-design-system/   <- design system skill (tokens, patterns, gotchas)
├── .claude/agents/                                   <- agent configs
├── docs/
│   ├── PRD.md
│   ├── TECHNICAL.md
│   ├── design-system.md                              <- all token tables
│   ├── motion-system.md                              <- all animation decisions
│   ├── responsive-system.md                          <- breakpoints, PWA, images
│   ├── code-bug-reference.md                         <- 15 bugs to avoid
│   └── design-system-process.md                      <- extraction process (reusable)
├── public/icons/                                     <- PWA icons
├── src/
│   ├── assets/fonts/                                 <- 5 TTFs
│   ├── assets/images/                                <- all textures, icons, thumbnails, avatars
│   ├── components/ (dashboard/, shared/, screen2/, screens/)
│   ├── hooks/useImagePreloader.ts
│   ├── styles/globals.css                            <- tokens + responsive variables + PWA shell
│   ├── App.tsx                                       <- routing, preloader, flex shell
│   └── main.tsx
├── CLAUDE.md                                         <- this file
├── design.pen                                        <- Pencil source of truth
├── package.json
├── vite.config.ts                                    <- image optimizer + PWA config
└── vercel.json                                       <- caching + SPA rewrite
```
