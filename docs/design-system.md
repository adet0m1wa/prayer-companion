# Prayer Companion — Design System

> Complete token reference extracted from design.pen audits (Sessions 1-2).
> Referenced from CLAUDE.md. Source of truth for all design values.

---

## Color Tokens

5 base hex values, 9 unique combinations. Locked order: ink -> accent -> surface.

| # | Token | Hex | Opacity | Used As |
|---|---|---|---|---|
| 1 | ink/default | #3D2E1F | 100% | text, icon, fill, stroke |
| 2 | ink/muted | #3D2E1F | 70% | text |
| 3 | ink/faded | #3D2E1F | 50% | icon, text |
| 4 | accent/default | #E63434 | 100% | icon, fill, text |
| 5 | accent/subtle | #E6343433 | 20% (8-char hex) | stroke |
| 6 | surface/canvas | #E4DED5 | 100% | fill (page background) |
| 7 | surface/card | #F3EDE3 | 100% | fill (card backgrounds) |
| 8 | surface/muted | #EDE6D8 | 100% (40% opacity for disabled) | fill |
| 9 | surface/overlay | #F3EDE3CC | 80% (8-char hex) | fill (verse card image overlay) |

**Rules:**
- No pure black (#000000) anywhere -- all text uses ink/default (#3D2E1F)
- Rows 5 and 9 use 8-char hex due to Pencil limitations -- flag for conversion when moving to Figma
- Text hierarchy uses opacity (100%, 70%, 50%), not different hex values

---

## Typography Tokens

11 unique styles. Sorted by size descending.

| Token | Font | Weight | Size | Style | LH | LS |
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

**Rules:**
- Playfair Display is ONLY for headings -- never body text
- DM Sans is for body text, labels, metadata, captions
- Dancing Script is ONLY for decorative separators ("|" between metadata)
- Inter is ONLY for system/status bar time
- Card titles (heading/card) are always italic. Toggle labels are not.
- Weight format: always name/number (Bold/700, SemiBold/600, Regular/400)

---

## Spacing Tokens

10 values. Base unit: 2px. All even numbers.

| Token | Value |
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

**Usage:**
- 36px gap between major dashboard sections
- 16px gap between cards in a list
- 20px internal padding on topic cards
- 16px internal padding on verse and testimony cards
- 24px horizontal screen padding (scales down responsively -- see docs/responsive-system.md)

---

## Icon Size Tokens

| Token | Size | Type |
|---|---|---|
| icon/60 | 60x60 | Aspect icon (loader screen) |
| icon/30 | 30x30 | Aspect icon (cards, headers) |
| icon/22 | 22x22 | UI action icons (Phosphor) |
| icon/18 | 18x18 | Chevron navigation (Phosphor) |
| icon/16 | 16x16 | Status + metadata icons |

**Rules:**
- UI icons: Phosphor family (filled for active, stroked for inactive)
- Aspect topic icons: hand-drawn sketch style images, not icon fonts
- All icons are square (width = height)

---

## Corner Radius Tokens

| Token | Value | Where Used |
|---|---|---|
| radius/22 | 22px | Chevron circles, back button |
| radius/16 | 16px | Verse card |
| radius/12 | 12px | Search bar, testimony cards |
| radius/3 | 3px | Status battery |
| radius/1 | 1px | Battery level, toggle underlines |

---

## Image/Thumbnail Sizes

| Size | Type | Where |
|---|---|---|
| 120x100 | Video thumbnail | Detail page (4 cards) |
| 100x100 | Article thumbnail | Detail page (4 cards) |
| 40x40 | Testimony avatar (ellipse) | Dashboard (3 testimonies) |

**2x Retina source sizes (after optimization):**
- Verse background: 708px wide
- Article thumbnails: 200x200
- Video thumbnails: 240x200
- Aspect icons: 120x120
- Avatars: 80x80

---

## Strokes/Borders

| Color Token | Width | Where |
|---|---|---|
| ink/default | 1px | Status battery |
| accent/subtle | 1px | Search bar |

---

## Component Dimensions

| Component | Width x Height | Sizing |
|---|---|---|
| App container | max 460, min 360 | responsive |
| Bottom nav | fill x 70 + safe-area-bottom | dashboard only |
| Verse card | fill x hug | fill width, content height |
| Topic cards | fill x aspect-[354/146] | proportional scaling |
| Testimony cards | fill x hug | fill width, content height |
| Search bar | fill x 46 | fill width, fixed height |
| Article cards | fill x min-h-[145px] h-auto | fill width, content-driven height |
| Video cards | fill x min-h-[145px] h-auto | fill width, content-driven height |
| Stack Y offset | 12px per card | 4 cards visible in stack |
| Stack scale step | 0.03 per card | Subtle depth effect |
