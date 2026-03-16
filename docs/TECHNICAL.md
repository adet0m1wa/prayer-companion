# Prayer Companion App — Technical Specification (v1)

## Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS + CSS custom properties for design tokens |
| UI Motion | Framer Motion (card transitions, content reveals, stagger animations) |
| Custom Animation | Rive (topic icons, triggered animations) |
| Build Tool | Vite |
| Package Manager | npm |

## Project Structure

```
prayer-companion/
├── .claude/
│   ├── agents/
│   │   ├── design-engineer.md
│   │   ├── design-tokens.md
│   │   └── code-review.md
│   └── skills/
│       └── rive-animation/
│           └── SKILL.md
├── references/
│   ├── screen-1-daily/
│   │   ├── ref-moonly-cards.png
│   │   ├── ref-moonly-cards-2.png
│   │   └── notes.md
│   └── screen-2-topic-detail/
│       ├── ref-costar-header.png
│       ├── ref-bloom-content-cards.png
│       └── notes.md
├── public/
│   └── animations/          ← .riv files go here
├── src/
│   ├── components/          ← atoms, molecules
│   ├── pages/               ← Screen 1, Screen 2
│   └── styles/              ← tokens.css, global styles
├── docs/
│   ├── PRD.md
│   └── TECHNICAL.md
├── design.pen               ← Pencil source of truth
├── CLAUDE.md                ← project memory
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## Design Token Strategy

Tokens are extracted AFTER screens are designed and locked (Step 3 in workflow).

Expected token categories:
- **Colors:** per-topic accent colors (Love=red variant, Faith=blue variant, etc.), background, surface, text primary/secondary, border
- **Typography:** heading sizes (h1–h3), body, caption, metadata. Font family TBD by olomi during design phase
- **Spacing:** consistent scale (4px base or 8px base TBD)
- **Radius:** card corners, button corners, icon containers
- **Shadows:** card elevation, subtle depth

Tokens live in `src/styles/tokens.css` as CSS custom properties and are mirrored in `tailwind.config.js` via the `extend` key.

## Component Architecture (Bottom-Up)

### Atoms
- `StreakCounter` — flame/number display
- `NotificationBell` — bell icon with badge
- `TopicIcon` — Rive animation container (placeholder SVG icon during build)
- `ChevronNav` — floating left/right arrow buttons
- `ContentToggle` — Articles | Videos switch
- `MetadataRow` — views, likes, duration/read time
- `PlayOverlay` — large play icon for video thumbnails
- `NavItem` — single bottom nav tab (icon + label)

### Molecules
- `GreetingHeader` — time-based greeting + streak counter + bell
- `TopicCard` — accent color + heading + topic icon + tap target
- `ArticleCard` — thumbnail + title + description + metadata
- `VideoCard` — thumbnail with play overlay + title + metadata
- `BottomNav` — 3 NavItems (Home, Bible, Community)

### Pages
- `DailyView` (Screen 1) — greeting header + encouragement text + topic card stack with chevrons + bottom nav
- `TopicDetailView` (Screen 2) — header with line separator + content toggle + content card list + bottom nav

## Animation Plan (Steps 5 & 6 — AFTER all screens and design system)

### Framer Motion (Step 5)
- Card expand: topic card → full screen with color shift animation
- Content card stagger: cards animate in sequence on Screen 2 load
- Content toggle: crossfade between article and video views
- Page transitions: smooth ease between Screen 1 and Screen 2

### Rive (Step 6)
- Per-topic animated icons (heart pulses for Love, cross glows for Faith, etc.)
- Triggered on card tap in Screen 1
- Persistent subtle loop in Screen 2 header
- `.riv` files stored in `public/animations/`
- Embedded via `@rive-app/react-canvas` using rive-animation skill patterns

## Color Shift Logic (Screen 2)

When a topic card expands:
- Screen 1 card: `background: var(--topic-accent)` at full saturation
- Screen 2 expanded: `background: color-mix(in srgb, var(--topic-accent) 10%, white 80%)`
- Remaining 10% is neutral/surface tone
- This ensures readability and bottom nav compatibility

## Responsive Strategy

- Mobile-first (375px base width)
- Max container width for tablet: 428px (centered)
- No desktop breakpoint for v1 — this is a mobile app prototype

## Build Order (Strict)

1. All screens designed and locked in Pencil
2. Design system extracted from completed designs
3. Design tokens generated (tailwind.config.js + tokens.css)
4. Components built bottom-up (atoms → molecules → pages)
5. Framer Motion animations added
6. Rive animations integrated
7. Visual QA against Pencil designs
8. Code review
