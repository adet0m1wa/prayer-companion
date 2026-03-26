# Prayer Companion — Responsive System

> Breakpoints, font scaling, PWA layout architecture, and image optimization.
> Referenced from CLAUDE.md. Source of truth for all responsive behavior.

---

## Viewport Range

- **Minimum:** 360px (Samsung Galaxy S series)
- **Sweet spot:** 390px (iPhone 14/15 -- most common phone width)
- **Design width:** 402px (original Pencil frame)
- **Maximum:** 460px (largest supported)
- **Container:** `max-w-[460px] min-w-[360px] w-full mx-auto`

---

## Breakpoints

| Breakpoint | Trigger | What Changes |
|---|---|---|
| Default (>=400px) | -- | Full design values |
| Small (<400px) | `@media (max-width: 399px)` | Padding, font sizes, card padding, thumbnail sizes |
| Tiny (<375px) | `@media (max-width: 374px)` | Screen horizontal padding only |
| Extra tiny (<360px) | `@media (max-width: 359px)` | Heading display size |

---

## CSS Variables by Breakpoint

| Variable | Default (>=400px) | Small (<400px) | Tiny (<375px) | Extra tiny (<360px) |
|---|---|---|---|---|
| --app-px | 24px | 20px | 16px | 16px |
| --card-px | 20px | 16px | -- | -- |
| --card-title-size | 16px | 15px | -- | -- |
| --card-body-size | 14px | 13.5px | -- | -- |
| --card-caption-size | 12px | 12px | -- | -- |
| --article-thumb | 100px | 80px | -- | -- |
| --video-thumb-w | 120px | 100px | -- | -- |
| --video-thumb-h | 100px | 80px | -- | -- |
| --heading-display-size | 22px | -- | -- | 20px |

---

## Font Scaling Rules

| Text Role | Default Size | Scales To | CSS Variable | Never Changes? |
|---|---|---|---|---|
| heading/display | 22px | 20px (<360px) | --heading-display-size | |
| heading/section | 18px | -- | hardcoded | Yes |
| Card titles | 16px | 15px (<400px) | --card-title-size | |
| Body text | 14px | 13.5px (<400px) | --card-body-size | |
| Captions/metadata | 12px | -- | --card-caption-size | Yes |
| Counters | 12px | -- | hardcoded | Yes |
| Nav labels | 10px | -- | hardcoded | Yes |
| Search input | 16px | -- | hardcoded | Yes (iOS zoom) |

**Rule:** 13.5px is the absolute minimum for body text. 12px is the floor for any readable text. Below 12px is inaccessible.

---

## PWA Layout Architecture

### Meta Tags (index.html)
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

### Shell Structure
```
html          -> height: 100dvh, overflow: hidden, overscroll-behavior: none
  body        -> height: 100%, overflow: hidden
    #root     -> height: 100%
      .app    -> h-[100dvh] flex flex-col relative, max-w-[460px]
        main  -> flex-1 overflow-y-auto min-h-0 overscroll-behavior-y: contain
        nav   -> flex-shrink-0 (dashboard only)
        overlay -> absolute inset-0 z-50 (detail page, loader)
```

### Key Rules
- **ONE scroll context.** Only the `main` content area scrolls. html/body are locked.
- **No position:fixed on html/body.** iOS 16.6+ bugs crop the viewport.
- **No position:fixed for nav.** Use flex-shrink-0 in the flex column instead. Avoids iOS 17 backgrounding bug.
- **Detail page is a sibling overlay**, not a child of the scroll container. Prevents clipping.
- **Loader is overflow:hidden.** No scrolling on the transition screen.
- **100dvh with 100vh fallback.** In standalone mode they resolve to the same value.
- **@media (display-mode: standalone)** for PWA-specific overrides (disable pull-to-refresh).

### Safe Areas
```css
:root {
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --nav-height: calc(70px + var(--safe-bottom));
}
```
- **Top:** Content padding includes `env(safe-area-inset-top)` for status bar clearance
- **Bottom:** Nav padding includes `env(safe-area-inset-bottom)` for home indicator (~34px on Face ID iPhones)
- **viewport-fit=cover is REQUIRED** or all env() values return 0px

### Scrollbar Hiding
```css
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar { display: none; }
```

---

## Image Optimization

### Source Image Sizes (2x Retina)
All images resized to 2x display dimensions for crisp rendering on high-DPI screens.

| Image | Display Size | Source Size | Format |
|---|---|---|---|
| Verse background | ~354px wide | 708px wide | PNG |
| Article thumbnails | 100x100 | 200x200 | PNG |
| Video thumbnails | 120x100 | 240x200 | PNG |
| Aspect icons (x12) | 30x30 / 60x60 | 120x120 | PNG |
| Avatars (x3) | 40x40 | 80x80 | PNG |
| Textures with shadow (x8) | ~354x146 | ~736x300 | WebP (quality 85) |
| Textures no shadow (x8) | ~354x145 | ~736x300 | WebP (quality 85) |

### Optimization Results
| Step | Before | After | Saved |
|---|---|---|---|
| Delete 16 unused variants | 20.4 MB | 0 | -20.4 MB |
| Resize oversized images | 15.5 MB | 297 KB | -15.2 MB |
| Convert textures PNG->WebP | 4.4 MB | 454 KB | -3.9 MB |
| **Total** | **40.2 MB** | **~751 KB** | **-39.5 MB (98%)** |

### Preloading Strategy
- **Phase 1 (blocking):** 9 above-fold images gate dashboard render. Includes verse background, page 1 textures (x4), page 1 aspect icons (x4).
- **Phase 2 (non-blocking):** After dashboard renders, `requestIdleCallback` silently preloads 16 detail page images (article thumbs x4, video thumbs x4, no-shadow textures x8). Falls back to `setTimeout(1000)`.
- **PWA precache:** Workbox `globPatterns` includes `webp` so all textures are in the service worker cache. Total precache: 2.8MB.

### Build Tools
- `vite-plugin-image-optimizer` + Sharp for build-time compression
- PNG quality 80, WebP quality 85
- `includePublic: true` for PWA icons

---

## Accessibility Notes

- **Pinch-to-zoom disabled globally** (`maximum-scale=1`) to prevent iOS input auto-zoom in PWA standalone mode. This is a known accessibility tradeoff -- elderly users cannot zoom. Logged as design debt.
- **Touch targets:** All interactive elements >=44x44px
- **Contrast:** ink/default (#3D2E1F) on surface/canvas (#E4DED5) passes WCAG AA
- **Font minimum:** 13.5px body text, 12px captions, 10px labels (smallest)
