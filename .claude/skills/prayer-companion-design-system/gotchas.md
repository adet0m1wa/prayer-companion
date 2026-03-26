# Gotchas — Rules That Must Never Be Violated

## Colors
- NEVER use pure black (#000000). Always use ink/default (#3D2E1F) at opacity levels.
- Text hierarchy uses opacity (100%, 70%, 50%), not different hex values.
- Only 2 colors use 8-char hex: accent/subtle (#E6343433) and surface/overlay (#F3EDE3CC). All others are 6-char + separate opacity.

## Typography
- Playfair Display is ONLY for headings -- never body text.
- DM Sans is for body text, labels, metadata, captions.
- Dancing Script is ONLY for decorative separators between metadata items.
- Inter is ONLY for system/status bar time.
- Card titles (heading/card) are always italic. Toggle labels (heading/toggle-active) are not.
- Font sizes that scale use CSS variables (--card-body-size, --card-title-size). Fixed sizes (12px, 10px) are hardcoded.
- 13.5px is the minimum for body text. 12px is the floor for any readable text.

## Icons
- UI icons use Phosphor family (filled for active, stroked for inactive).
- Status bar icons use Lucide family.
- Aspect topic icons are hand-drawn sketch style images, not icon fonts.

## Spacing
- No odd numbers. Every spacing value is even (base unit: 2px).
- Card padding is always space/20 for topic cards, space/16 for verse and testimony cards.
- Screen horizontal padding uses --app-px variable (24px -> 20px -> 16px responsive).
- Section gap: 36px between major sections. Card gap: 16px between cards in a list.

## Visual
- Card backgrounds use parchment texture images (WebP format), not flat colors.
- Active states use accent/default (#E63434) only.
- Bottom nav: 5 tabs (Home, Community, Bible, Favorites, You). Active tab = filled icon + accent/default. Inactive = stroked icon + ink/faded.
- Bottom nav appears on dashboard ONLY. NOT on detail page.
- Detail page navigation: back chevron only.
- Content toggle gap: 22px between Articles and Videos tabs.

## Structure
- Article thumbnails: 100 x 100 (source: 200x200 for 2x retina).
- Video thumbnails: 120 x 100 (source: 240x200 for 2x retina).
- Article/video cards: min-h-[145px] h-auto -- NOT fixed height or aspect-ratio. Content drives height.
- Topic cards: aspect-[354/146] -- proportional scaling.
- App container: max-w-[460px] min-w-[360px] (NOT 402px).
- Article/video card content uses items-stretch on outer div + justify-between on content column (no h-full).
- Video titles must always wrap to 2 lines.

## PWA
- Single scroll context. Only the flex-1 content area scrolls.
- NEVER use position:fixed on html, body, or nav elements.
- Bottom nav uses flex-shrink-0 in flexbox column.
- Detail page is an absolute overlay SIBLING to scroll container, not a child.
- Loader screen is overflow:hidden, never scrollable.
- Safe areas: env(safe-area-inset-top) on content, env(safe-area-inset-bottom) on nav.
- viewport-fit=cover is REQUIRED in meta tag or env() values return 0px.
- Zoom disabled globally (maximum-scale=1) for iOS input zoom prevention.
- Scrollbar hidden via .hide-scrollbar utility class.

## Images
- All source images at 2x retina (double the display size).
- Textures: WebP format (quality 85). NOT PNG.
- Two-phase preloading: 9 blocking (above-fold) + 16 background (requestIdleCallback).
- NEVER preload all images before dashboard renders.
