# Component Patterns

Reusable component structures found across the 4 screens of Prayer Companion.

---

## status-bar
- **Screens:** All 4
- **Dimensions:** fill × 52
- **Layout:** horizontal, align center, justify space-between
- **Padding:** space/24 (horizontal)
- **Children:**
  - status-left (horizontal, gap space/6): status-time
  - status-right (horizontal, gap space/6): status-signal, status-wifi, status-battery
- **Tokens:** system/status for time text, ink/default for all elements, radius/3 on battery frame, radius/1 on battery-level

---

## greeting-header
- **Screens:** Dashboard
- **Dimensions:** fill × hug
- **Layout:** horizontal, justify space-between, align center
- **Children:**
  - greeting-text: heading/display, ink/default
  - greeting-right (horizontal, gap space/16):
    - greeting-actions (horizontal, gap space/2): streak-icon (icon/22, accent/default) + streak-count (body/label)
    - nav-alerts (vertical, gap space/0, center): nav-alerts-icon (icon/22, ink/faded)

---

## verse-card
- **Screens:** Dashboard
- **Dimensions:** fill × hug
- **Layout:** vertical, gap space/16
- **Padding:** space/16 (all)
- **Radius:** radius/16
- **Fill:** array [image: verse of the day.png at 75% opacity, surface/overlay]
- **Children:**
  - verse-label: body/caption, ink/muted
  - verse-text: body/default, ink/default
  - verse-footer (horizontal, gap space/8, justify space-between):
    - verse-actions (horizontal, gap space/10): action-like, action-share, action-comment — each contains icon/22 (accent/default) + body/counter (ink/default)
    - verse-reference: body/default, ink/default, text-align right

---

## search-bar
- **Screens:** Dashboard
- **Dimensions:** fill × 46
- **Layout:** horizontal, gap space/10, align center
- **Padding:** space/16 (horizontal)
- **Radius:** radius/12
- **Fill:** surface/muted (disabled — not rendered)
- **Stroke:** accent/subtle, 1px
- **Children:**
  - search-placeholder: body/default, ink/muted

---

## aspects-pagination / testimonies-pagination
- **Screens:** Dashboard
- **Dimensions:** fill × hug
- **Layout:** horizontal, gap space/16, align center
- **Children:**
  - chevron-left (28 × 28, radius/22, surface/muted, opacity 0.4 when disabled): chevron-left-icon (icon/18, accent/default)
  - page-counter: body/counter, ink/default
  - chevron-right (28 × 28, radius/22, surface/muted): chevron-right-icon (icon/18, accent/default)

---

## topic-card
- **Screens:** Dashboard (×12, stacked in groups of 4)
- **Dimensions:** fill(354) × 146
- **Layout:** vertical, gap space/10
- **Padding:** space/20 (all)
- **Fill:** image (parchment texture from textures/ folder)
- **Children:**
  - *-content (horizontal, gap space/2, align center):
    - *-icon: icon/30 (image fill from images for understanding aspect/)
    - *-title: heading/card, ink/default
  - *-preview: body/default, ink/default

---

## testimony-card
- **Screens:** Dashboard (×3, paginated)
- **Dimensions:** 354 × hug
- **Layout:** vertical, gap space/16
- **Padding:** space/16 (all)
- **Radius:** radius/16
- **Fill:** surface/card
- **Children:**
  - testimony-header (horizontal, gap space/10, align center):
    - testimony-avatar: 40 × 40 ellipse (image fill)
    - testimony-name-col (vertical, gap space/2):
      - testimony-name: heading/card, ink/default
      - testimony-username: body/caption, ink/muted
  - testimony-text: body/default, ink/default

---

## bottom-nav
- **Screens:** Dashboard only
- **Dimensions:** fill × 70
- **Layout:** horizontal, justify space-between, align center
- **Padding:** space/24 (horizontal)
- **Fill:** surface/card
- **Children (×5 tabs, each vertical, gap space/2, center):**
  - nav-*-icon: icon/22
    - Active: accent/default (filled variant)
    - Inactive: ink/faded (stroked variant)
  - nav-*-label: body/label
    - Active: accent/default
    - Inactive: ink/default

---

## header-area (Screen 2)
- **Screens:** Article, Video
- **Dimensions:** fill × hug
- **Layout:** horizontal, gap space/10, align center
- **Children:**
  - back-chevron (28 × 28, radius/22, surface/muted): chevron-left-icon (icon/18, accent/default)
  - topic-group (horizontal, gap space/2, align center):
    - topic-icon: icon/30 (image fill)
    - topic-title: heading/display, ink/default

---

## toggle-group
- **Screens:** Article, Video
- **Dimensions:** hug × hug
- **Layout:** horizontal, gap space/10
- **Children:**
  - Active tab (vertical, gap space/4, align center):
    - label: heading/toggle-active, ink/default
    - underline: fill width × 2, radius/1, accent/default
  - Inactive tab:
    - label: heading/toggle-inactive, ink/muted

---

## article-card
- **Screens:** Article (×4)
- **Dimensions:** fill × 145
- **Layout:** horizontal, gap space/20, align center
- **Padding:** space/20 (all)
- **Fill:** image (no-shadow parchment texture)
- **Children:**
  - article-thumbnail: 100 × 100 (rectangle, image fill)
  - article-content (vertical, justify space-between):
    - article-title: heading/card, ink/default
    - article-meta (horizontal, gap space/8): meta-read-time (body/caption) | meta-views (body/caption)
    - article-meta-row2 (horizontal, gap space/8): meta-likes (body/caption) | meta-days (body/caption)
  - Metadata icons: icon/16 (ink/default)
  - Separators: body/separator ("|")
  - Icon+text pairs: gap space/4

---

## video-card
- **Screens:** Video (×4)
- **Dimensions:** fill × 145
- **Layout:** horizontal, gap space/20, align center
- **Padding:** space/20 (all)
- **Fill:** image (no-shadow parchment texture)
- **Children:**
  - video-thumbnail: 120 × 100 (frame, image fill)
  - video-content (vertical, justify space-between):
    - video-title: heading/card, ink/default
    - video-meta-row1 (horizontal, gap space/4): meta-eye-icon + meta-views (body/caption)
    - video-meta-row2 (horizontal, gap space/8): meta-likes (body/caption) | meta-days (body/caption)
  - Metadata icons: icon/16 (ink/default)
  - Separators: body/separator ("|")
  - Icon+text pairs: gap space/4

---

## loader content-center
- **Screens:** Loader
- **Dimensions:** fill × fill (centered both axes)
- **Layout:** justify center, align center
- **Padding:** space/24 (horizontal)
- **Children:**
  - loader-content (vertical, gap space/10, align center):
    - topic-icon: 60 × 60 (image fill)
    - verse-group (vertical, gap space/10, align center):
      - verse-text: heading/card, ink/default, text-align center, width 280
      - reference-text: body/caption, ink/muted, text-align center
