# Prayer Companion — Code Bug Reference

> Paste this into Claude Code context when one-shotting new aspects or screens.
> Every bug here was hit during the Love aspect build. Don't repeat them.

---

## 1. Heart Icon FLIP Animates Downward Instead of to Center

**Bug:** When using Framer Motion `layoutId` for the FLIP transition from dashboard card to loader screen, the heart icon animated downward to its new position instead of to screen center.

**Fix:** Don't use FLIP for loader->detail. Use a fade cascade instead: heart fades out first -> verse -> reference (staggered upward). FLIP is only for dashboard->loader (card icon to centered icon). The loader exit is `useAnimate` with sequential opacity/y animations, not layout-based.

**Files:** `TransitionLoader.tsx`, `SharedTopicIcon.tsx`

---

## 2. CSS Opacity Inheritance — Parent Exit Fades Children

**Bug:** Adding `exit={{ opacity: 0 }}` to a parent `motion.div` causes ALL children to fade, including elements with their own opacity control (like the SharedTopicIcon). Children cannot override parent opacity — CSS compositing rule.

**Fix:** Dashboard exit uses `visibility: hidden`, not opacity animation. Never use `exit={{ opacity: 0 }}` on containers that wrap elements with independent animation needs. If you need an exit animation, apply it to a separate overlay div, not the content wrapper.

**Files:** `App.tsx` (dashboard visibility toggle)

---

## 3. Shared MotionValue Flash on Card Swipe

**Bug:** All top cards share a single `dragX` MotionValue. When `dragX.jump(0)` fires in `onComplete`, there's a one-frame gap before React re-renders with the new card order. The departing card snaps to x=0 visibly.

**Status:** Intermittent. Known root cause, canonical fix identified but not yet applied.

**Canonical fix:** Refactor to per-card MotionValues via AnimatePresence. Each top card owns its own `dragX`. Exiting card animates out with its own x value. Entering card starts fresh at x=0. No shared state.

**Warning:** Two attempts at fixing this (AnimatePresence refactor, opacity mask) both broke the existing swipe system. Any future attempt MUST be on a separate branch and tested thoroughly before merging.

**Files:** `TopicCardStack.tsx`

---

## 4. `h-full` Does Nothing on `h-auto` Parent

**Bug:** Setting `h-full` (height: 100%) on a flex child whose parent has `h-auto` resolves to nothing. `100%` of `auto` = nothing. The child collapses to content height and `justify-between` has no space to distribute.

**Fix:** Use `items-stretch` on the parent flex container instead. This stretches children to fill the parent height without needing an explicit height. Remove `h-full` from the child — it conflicts with stretch behavior.

**Files:** `ArticleCard.tsx`, `VideoCard.tsx`

---

## 5. `items-center` Blocks `justify-between`

**Bug:** A flex container with `items-center` shrink-wraps children vertically to their content height. Even if a child has `justify-between`, there's no extra space to distribute because the child is only as tall as its content.

**Fix:** Use `items-stretch` on the parent when children need to fill the full height. `items-center` is only for when you want children vertically centered at their natural height.

**Files:** `ArticleCard.tsx`, `VideoCard.tsx`

---

## 6. iOS PWA Double Scroll

**Bug:** In PWA standalone mode, both the document (`html`/`body`) and the inner content area scroll independently. The user sees two scroll layers — content scrolls, then the entire viewport rubber-bands.

**Fix:** Flexbox shell pattern:
```css
html { height: 100dvh; overflow: hidden; overscroll-behavior: none; }
body { height: 100%; overflow: hidden; }
```
App structure: flex column at 100dvh -> content area (flex-1, overflow-y: auto, overscroll-behavior-y: contain) -> bottom nav (flex-shrink-0). Only ONE element scrolls.

**Files:** `globals.css`, `App.tsx`, `TopicDetailPage.tsx`

---

## 7. `position: fixed` Nav Breaks on iOS Standalone

**Bug:** A `position: fixed; bottom: 0` nav bar in iOS PWA standalone mode either scrolls with content, overlaps the home indicator, or shifts up after the app has been backgrounded (iOS 17 bug).

**Fix:** Don't use `position: fixed` for the nav. Use the flexbox shell pattern where the nav sits naturally at the bottom of the flex column with `flex-shrink-0`. Add `padding-bottom: env(safe-area-inset-bottom)` for the home indicator. This avoids all iOS fixed-positioning bugs.

**Files:** `BottomNav.tsx`, `App.tsx`

---

## 8. Preloading All Images Blocks Initial Render

**Bug:** Original implementation gated dashboard render on ALL 47 images loading. Dashboard wouldn't appear until every texture, thumbnail, and icon was downloaded.

**Fix:** Two-phase preloading:
- **Phase 1 (blocking):** Only 9 above-fold images (verse background + first page textures + first page icons). Dashboard renders after these load.
- **Phase 2 (non-blocking):** After dashboard renders, `requestIdleCallback` silently preloads all detail page images (article thumbs, video thumbs, no-shadow textures) in the background.

**Files:** `App.tsx`, `useImagePreloader.ts`

---

## 9. `isTransitioning` Never Resets to False

**Bug:** When tapping Love card, `isTransitioning` is set to `true` to enable the `layoutId` on SharedTopicIcon. But after navigating to detail and back, it's never set back to `false`. The Love card permanently renders SharedTopicIcon with active `layoutId`, causing the icon to move during swipes.

**Fix:** Accept an `isActive` prop on TopicCardStack. Use a `useEffect` that resets `isTransitioning` to `false` whenever `isActive` becomes true (dashboard becomes visible again). Pass `isActive={screen === "dashboard" && !dashboardHidden}` from App.tsx.

**Status:** Fix identified but not yet applied (was part of the failed swipe bug branch).

**Files:** `TopicCardStack.tsx`, `App.tsx`

---

## 10. Drag Opacity on Outer Div Breaks Z-Index

**Bug:** Applying opacity < 1 via MotionValue on the outer `motion.div` (the one with position/scale/drag) creates a CSS stacking context. This breaks `z-index` ordering — behind cards appear on top of the dragged card.

**Fix:** Separate concerns: outer div handles position, scale, drag, and z-index. Inner div handles opacity only. The drag opacity transform goes on a `<motion.div>` wrapper INSIDE the draggable div.

```tsx
{/* Outer — position, scale, drag */}
<motion.div style={{ x: dragX, scale, zIndex }}>
  {/* Inner — opacity only */}
  <motion.div style={{ opacity: dragOpacity }}>
    <TopicCard />
  </motion.div>
</motion.div>
```

**Files:** `TopicCardStack.tsx`

---

## 11. `layoutId` Active During Swipes

**Bug:** If SharedTopicIcon always has a `layoutId`, Framer Motion animates the icon position during card swipes (not just on tap). The icon flies around as cards move.

**Fix:** Conditional `layoutId` — only enable it on the Love card AND only when the user has tapped to transition. Use an `isTransitioning` state flag. When false, render a plain `<img>` without layoutId. When true, render `SharedTopicIcon` with layoutId.

```tsx
{id === "love" && isTransitioning ? (
  <SharedTopicIcon src={iconSrc} size={30} topicId={id} />
) : (
  <img src={iconSrc} className="w-[30px] h-[30px] object-contain" />
)}
```

**Files:** `TopicCard.tsx`, `SharedTopicIcon.tsx`

---

## 12. iOS Input Below 16px Causes Zoom-Lock

**Bug:** iOS Safari auto-zooms on any input field with font-size below 16px. In PWA standalone mode, there's no pinch-to-zoom gesture available, so the user gets stuck zoomed in.

**Fix (chosen):** Disabled zoom globally via `maximum-scale=1` on viewport meta tag. This sacrifices pinch-to-zoom for all users.

**Better fix for future:** Keep inputs at 16px minimum (`font-size: max(16px, var(--body-size))`). Don't disable zoom globally — accessibility concern for elderly users.

**Files:** `index.html`, `TopicCardStack.tsx`

---

## 13. Image Oversizing — Source vs Display Mismatch

**Bug:** Source images were 10-30x larger than their display size. A 3669x2379 verse background displayed at ~354px wide. 900x900 aspect icons displayed at 30x30.

**Fix:** Resize all images to 2x retina dimensions (double the display size for crisp rendering on high-DPI screens):
- Verse background -> 708px wide
- Article thumbnails -> 200x200 (displays at 100x100)
- Video thumbnails -> 240x200 (displays at 120x100)
- Aspect icons -> 120x120 (displays at 30x30 and 60x60)
- Avatars -> 80x80 (displays at 40x40)

Convert textures to WebP for better compression. Result: 40.2 MB -> 751 KB.

**Files:** All image assets in `src/assets/images/`

---

## 14. CSS Variable Not Scaling — Default Value Wrong

**Bug:** `--card-body-size` was set to `13px` in the default `:root` block AND the `@media (max-width: 399px)` block. Body text was stuck at 13px at all screen sizes instead of being 14px above 400px and 13.5px below.

**Fix:** Default `:root` must have the LARGE screen value. Media queries override for smaller screens:
```css
:root { --card-body-size: 14px; }
@media (max-width: 399px) { :root { --card-body-size: 13.5px; } }
```

**Rule:** The default CSS variable value is always the desktop/large value. Media queries scale DOWN.

**Files:** `globals.css`

---

## 15. Overlay Page Inside Scroll Container Gets Clipped

**Bug:** If TopicDetailPage (position: absolute, inset: 0) renders INSIDE the flex-1 overflow-y-auto scroll container, it gets clipped by the container's overflow. The header can end up above the visible scroll region and becomes permanently unreachable.

**Fix:** The overlay must be a SIBLING to the scroll container, not a child. It should be a direct child of the 100dvh shell with its own flex column layout (scroll area + nav).

```tsx
<div className="h-[100dvh] flex flex-col relative">
  <main className="flex-1 overflow-y-auto min-h-0">
    <Dashboard />
  </main>
  <BottomNav />

  {/* Overlay: sibling, not child of scroll container */}
  {showDetail && (
    <div className="absolute inset-0 z-50 flex flex-col">
      <DetailPage />
    </div>
  )}
</div>
```

**Files:** `App.tsx`, `TopicDetailPage.tsx`

---

## Quick Reference — Font Size Rules

| Token | Default (>=400px) | Small (<400px) | Tiny (<360px) | Never Changes |
|---|---|---|---|---|
| heading/display | 22px | 22px | 20px | |
| heading/section | 18px | 18px | 18px | |
| card titles | 16px | 15px | 15px | |
| body/default | 14px | 13.5px | 13.5px | |
| body/caption | 12px | | | Yes |
| body/counter | 12px | | | Yes |
| body/label | 10px | | | Yes |
| search input | 16px | | | Yes (iOS zoom) |

---

## Quick Reference — Spacing Rules

| Context | Value | Note |
|---|---|---|
| Screen horizontal padding | 24px (>=400), 20px (<400), 16px (<375) | CSS variable `--app-px` |
| Section gap | 36px | Between major sections |
| Card gap | 16px | Between cards in a list |
| Card internal padding | 20px (topic), 16px (verse, testimony) | |
| Stack card Y offset | 12px per card | |
| Bottom nav height | 70px + safe-area-inset-bottom | |
