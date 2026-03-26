# Component Patterns

Reusable component structures found across Prayer Companion screens.
Updated after Session 5 (responsive + PWA fixes).

---

## App Shell (PWA Layout)
- **Structure:** flex column, h-[100dvh] (100vh fallback)
- **Container:** max-w-[460px] min-w-[360px] w-full mx-auto, relative
- **Content area:** flex-1, overflow-y-auto, min-h-0, overscroll-behavior-y: contain, .hide-scrollbar
- **Bottom nav:** flex-shrink-0 (dashboard only)
- **Overlays (detail, loader):** absolute inset-0, z-50, sibling to content area
- **Safe areas:** padding-top: env(safe-area-inset-top), nav padding-bottom: env(safe-area-inset-bottom)

---

## greeting-header
- **Screens:** Dashboard
- **Dimensions:** fill x hug
- **Layout:** horizontal, justify space-between, align center
- **Children:**
  - greeting-text: heading/display, ink/default, w-[170px] (forces 2-line wrap)
  - greeting-right (horizontal, gap space/16):
    - greeting-actions (horizontal, gap space/2): streak-icon (icon/22, accent/default) + streak-count (body/label)
    - nav-alerts (vertical, center): nav-alerts-icon (icon/22, ink/faded)

---

## verse-card
- **Screens:** Dashboard
- **Dimensions:** fill x hug
- **Layout:** vertical, gap space/16
- **Padding:** space/16 (all)
- **Radius:** radius/16
- **Fill:** array [image: verse of the day.png at 75% opacity, surface/overlay at 80%]
- **Shimmer:** overlay opacity [0.8, 0.3, 0.3, 0.8] over 0.8s on like tap
- **Children:**
  - verse-label: body/caption (12px), ink/muted
  - verse-text: var(--card-body-size), ink/default, leading-[1.5]
  - verse-footer (horizontal, gap space/8, justify space-between):
    - verse-actions (horizontal, gap space/10): action-like (icon/22, accent/default, web-haptics) + action-share + action-comment -- each with body/counter (12px) below
    - verse-reference: var(--card-body-size), ink/default, text-right

---

## search-bar
- **Screens:** Dashboard
- **Dimensions:** fill x 46
- **Layout:** horizontal, gap space/10, align center
- **Padding:** space/16 (horizontal)
- **Radius:** radius/12
- **Border:** accent/subtle (1px) default, accent/default when searching
- **Font:** max(16px, var(--card-body-size)) for iOS zoom prevention
- **Children:**
  - search-input: var(--card-body-size), ink/default, placeholder ink/muted
  - clear-button (X icon): only visible when searching, icon/16, ink/faded

---

## aspects-pagination / testimonies-pagination
- **Screens:** Dashboard
- **Dimensions:** fill x hug
- **Layout:** horizontal, gap space/16, align center
- **Aspects:** justify-end (right-aligned). Testimonies: justify space-between (title left, pagination right)
- **Children:**
  - chevron-left (28 x 28, radius/22, surface/muted, opacity 0.4 when disabled): chevron-left-icon (icon/18, accent/default)
  - page-counter: body/counter (12px), ink/default, min-w-[32px] text-center (prevents layout shift)
  - chevron-right (28 x 28, radius/22, surface/muted): chevron-right-icon (icon/18, accent/default)

---

## topic-card
- **Screens:** Dashboard (x12, stacked in groups of 4)
- **Dimensions:** fill x aspect-[354/146] (proportional scaling)
- **Layout:** vertical, gap space/10
- **Padding:** var(--card-px) (20px default, 16px below 400px)
- **Fill:** image (parchment texture WebP from textures/ folder)
- **Stack:** Y offset 12px per card, scale step 0.03, pointerEvents: "none" on behind cards
- **Children:**
  - content (horizontal, gap space/2, align center):
    - icon: icon/30 (image fill from images for understanding aspect/). Conditional SharedTopicIcon with layoutId on Love card only when isTransitioning=true
    - title: var(--card-title-size), font-heading, font-semibold italic, ink/default, line-clamp-2
  - preview: var(--card-body-size), ink/default, leading-[1.5], line-clamp-3

---

## testimony-card
- **Screens:** Dashboard (x3, paginated via horizontal slide)
- **Dimensions:** fill x hug
- **Layout:** vertical, gap space/16
- **Padding:** space/16 (all)
- **Radius:** radius/12
- **Fill:** surface/card
- **Children:**
  - testimony-header (horizontal, gap space/10, align center):
    - testimony-avatar: 40 x 40 ellipse (image fill)
    - testimony-name-col (vertical, gap space/2):
      - testimony-name: var(--card-title-size), font-heading, font-semibold italic, ink/default
      - testimony-username: 12px (body/caption), ink/muted
  - testimony-text: var(--card-body-size), ink/default, leading-[1.5]

---

## bottom-nav
- **Screens:** Dashboard ONLY (not on detail page)
- **Dimensions:** fill x auto (70px content + env(safe-area-inset-bottom))
- **Layout:** horizontal, justify space-between, align center
- **Padding:** space/24 (horizontal), env(safe-area-inset-bottom) (bottom)
- **Position:** flex-shrink-0 in flex column (NOT position:fixed)
- **Fill:** surface/card
- **Shadow:** box-shadow 0 -2px 4px rgba(0,0,0,0.05), animated opacity based on IntersectionObserver sentinel
- **Children (x5 tabs, each vertical, gap space/2, center):**
  - nav-icon: icon/22
    - Active (Home): accent/default (filled variant)
    - Inactive: ink/faded (stroked variant, 50% opacity)
  - nav-label: body/label (10px)
    - Active: accent/default
    - Inactive: ink/default

---

## header-area (Screen 2)
- **Screens:** Article, Video
- **Dimensions:** fill x hug
- **Layout:** horizontal, gap space/10, align center
- **Children:**
  - back-chevron (28 x 28, radius/22, surface/muted): chevron-left-icon (icon/18, accent/default)
  - topic-group (horizontal, gap space/2, align center):
    - topic-icon: icon/30 (image fill)
    - topic-title: heading/display (22px bold), ink/default

---

## toggle-group
- **Screens:** Article, Video
- **Dimensions:** hug x hug
- **Layout:** horizontal, gap 22px (was 10px, increased in Session 5)
- **Children:**
  - Active tab (vertical, gap space/4, align center):
    - label: heading/toggle-active (16px semibold), ink/default
    - underline: fill width x 2, radius/1, accent/default
  - Inactive tab:
    - label: heading/toggle-inactive (16px regular), ink/muted (70%)

---

## article-card
- **Screens:** Article (x4)
- **Dimensions:** fill x min-h-[145px] h-auto (NOT fixed height)
- **Layout:** horizontal, gap space/20, items-stretch
- **Padding:** var(--card-px)
- **Fill:** image (no-shadow parchment texture WebP)
- **Children:**
  - article-thumbnail: var(--article-thumb) x var(--article-thumb) (100x100 default, 80x80 below 400px), object-cover, shrink-0, self-center
  - article-content (vertical, justify-between, flex-1, min-w-0 -- NO h-full):
    - article-title: var(--card-title-size), font-heading, font-semibold italic, ink/default, line-clamp-2
    - article-meta-row1 (horizontal, gap space/8): readTime (caption) | eye-icon + views (caption)
    - article-meta-row2 (horizontal, gap space/8): heart-icon + likes (caption) | calendar-icon + date (caption)
  - Metadata: var(--card-caption-size) (12px always)
  - Separators: body/separator (Dancing Script "|")
  - Icon+text pairs: gap space/4

---

## video-card
- **Screens:** Video (x4)
- **Dimensions:** fill x min-h-[145px] h-auto (NOT fixed height)
- **Layout:** horizontal, gap space/20, items-stretch
- **Padding:** var(--card-px)
- **Fill:** image (no-shadow parchment texture WebP)
- **Children:**
  - video-thumbnail: var(--video-thumb-w) x var(--video-thumb-h) (120x100 default, 100x80 below 400px), object-cover, shrink-0, self-center
  - video-content (vertical, justify-between, flex-1, min-w-0 -- NO h-full):
    - video-title: var(--card-title-size), font-heading, font-semibold italic, ink/default, line-clamp-2 (titles lengthened to always wrap to 2 lines)
    - video-meta-row1 (horizontal, gap space/4): eye-icon + views (caption)
    - video-meta-row2 (horizontal, gap space/8): heart-icon + likes (caption) | calendar-icon + date (caption)
  - Metadata: var(--card-caption-size) (12px always)
  - Separators: body/separator (Dancing Script "|")
  - Icon+text pairs: gap space/4

---

## loader content-center
- **Screens:** Loader
- **Dimensions:** absolute inset-0, overflow:hidden, h-[100dvh] (never scrollable)
- **Fill:** surface/canvas
- **Children:**
  - loader-icon (absolutely centered): SharedTopicIcon at 60x60 with layoutId
  - verse-group (positioned below center at top: calc(50% + 45px)):
    - verse-text: heading/card (16px italic), ink/default, text-center, w-[280px]
    - reference-text: body/caption (12px), ink/muted, text-center
  - Animation: useAnimate sequence -- wait 450ms -> text stagger in -> hold 1s -> exit cascade upward
