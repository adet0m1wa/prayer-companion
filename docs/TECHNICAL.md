# Prayer Companion App — Technical Specification (v2)

> Updated after Session 5. Reflects current architecture.

## Stack

| Layer | Technology |
|---|---|
| Framework | Vite 8 + React 18 + TypeScript |
| Styling | Tailwind CSS v4 (@theme directive, CSS variables for responsive scaling) |
| Animation | Framer Motion (all transitions, stagger, FLIP, drag) |
| Icons | @phosphor-icons/react (UI), lucide-react (status bar) |
| Fonts | Playfair Display, DM Sans, Dancing Script, Inter -- all local TTFs |
| Haptics | web-haptics (heart tap only) |
| PWA | vite-plugin-pwa v1.2.0, Workbox, autoUpdate strategy |
| Images | vite-plugin-image-optimizer + Sharp (WebP textures, 2x retina) |
| Deploy | Vercel (auto-deploy on push, ~20s builds) |

## Project Structure

```
prayer-companion/
├── .claude/
│   ├── agents/ (design-engineer, design-tokens, code-review)
│   └── skills/prayer-companion-design-system/ (8 files, tokens + patterns + gotchas)
├── docs/
│   ├── PRD.md
│   ├── TECHNICAL.md
│   ├── design-system.md
│   ├── motion-system.md
│   ├── responsive-system.md
│   ├── code-bug-reference.md
│   └── design-system-process.md
├── public/icons/ (icon-192.png, icon-512.png, apple-touch-icon.png)
├── src/
│   ├── assets/fonts/ (5 TTFs)
│   ├── assets/images/
│   │   ├── images for understanding aspect/ (12 aspect icons, PNG)
│   │   ├── article thumbnails/ (4 images, PNG)
│   │   ├── video thumbnails/ (4 images, PNG)
│   │   ├── textures/ (8 with shadow, WebP)
│   │   ├── no shadow texture/ (8 without shadow, WebP)
│   │   ├── dp for testimonies/ (3 avatars, PNG)
│   │   └── verse of the day background/ (1 image, PNG)
│   ├── components/
│   │   ├── dashboard/ (GreetingHeader, VerseCard, TopicCardStack, TopicCard, TestimoniesSection, TestimonyCard)
│   │   ├── shared/ (BottomNav, SharedTopicIcon)
│   │   ├── screen2/ (TopicHeader, ContentToggle, ArticleCard, VideoCard)
│   │   └── screens/ (TransitionLoader, TopicDetailPage)
│   ├── hooks/useImagePreloader.ts
│   ├── styles/globals.css (tokens + responsive variables + PWA shell CSS)
│   ├── App.tsx (routing, preloader, flex shell, AnimatePresence)
│   └── main.tsx
├── CLAUDE.md
├── design.pen (Pencil source of truth)
├── package.json
├── vite.config.ts (image optimizer + PWA config)
└── vercel.json (caching + SPA rewrite)
```

## Responsive Strategy

- **Range:** 360px minimum -> 460px maximum
- **Sweet spot:** 390px (most common phone width)
- **Container:** `max-w-[460px] min-w-[360px] w-full mx-auto`
- **Breakpoints:** 4 levels via CSS variables (see docs/responsive-system.md)
- **Font scaling:** CSS variables with media queries (14px -> 13.5px body, 16px -> 15px titles)
- **Padding scaling:** 24px -> 20px -> 16px via --app-px variable

## PWA Architecture

- **Layout:** Flexbox shell (100dvh, single scroll context)
- **Nav:** flex-shrink-0 in flex column (NOT position:fixed)
- **Safe areas:** env(safe-area-inset-top/bottom) via viewport-fit=cover
- **Precache:** 2.8MB via Workbox (all assets including WebP textures)
- **Zoom:** Disabled globally (maximum-scale=1) for iOS input zoom prevention

## Image Strategy

- All source images at 2x retina display dimensions
- Textures: WebP format (quality 85)
- Two-phase preloading: 9 blocking + 16 background via requestIdleCallback
- Build-time optimization: vite-plugin-image-optimizer + Sharp
- Total source images: ~751KB (down from 40.2MB)

## Animation Architecture

- All timing constants documented in docs/motion-system.md
- Standard duration: 0.35s for non-spring transitions
- Drag system: shared MotionValue with inner/outer wrapper pattern
- FLIP: conditional layoutId on Love card only
- Stagger: bottom-up on detail page, sequential on loader
- See docs/motion-system.md for complete reference

## Component Architecture

### Dashboard (Screen 1)
- App.tsx -> GreetingHeader + VerseCard + TopicCardStack + TestimoniesSection + BottomNav
- TopicCardStack handles: search, pagination, horizontal slide, swipe, card cycling
- BottomNav: scroll-based shadow via IntersectionObserver sentinel

### Detail Page (Screen 2)
- TopicDetailPage -> TopicHeader + ContentToggle + ArticleCard/VideoCard list
- Absolute overlay (sibling to scroll container)
- No BottomNav -- back chevron only
- Content stagger: bottom-up reveal

### Transition (Screen 1 -> Screen 2)
- Dashboard -> visibility:hidden -> TransitionLoader -> TopicDetailPage
- Heart FLIP -> text stagger -> exit cascade -> detail reveal
- Detail exit -> opacity fade -> dashboard restore

## Build Order Completed

1. Setup & Init
2. Screen Design in Pencil
3. Design System Extraction
4. Component Generation
5. Framer Motion Animations
6. Rive Animations (placeholder icons in use)
7. Visual QA (ongoing)
8. Code Review
