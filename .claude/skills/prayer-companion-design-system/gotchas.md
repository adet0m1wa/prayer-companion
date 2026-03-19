# Gotchas — Rules That Must Never Be Violated

## Colors
- NEVER use pure black (#000000). Always use ink/default (#3D2E1F) at opacity levels.
- Text hierarchy uses opacity (100%, 70%, 50%), not different hex values.
- Only 2 colors use 8-char hex: accent/subtle (#E6343433) and surface/overlay (#F3EDE3CC). All others are 6-char + separate opacity.

## Typography
- Playfair Display is ONLY for headings — never body text.
- DM Sans is for body text, labels, metadata, captions.
- Dancing Script is ONLY for decorative separators between metadata items.
- Inter is ONLY for system/status bar time.
- Card titles (heading/card) are always italic. Toggle labels (heading/toggle-active) are not.

## Icons
- UI icons use Phosphor family (filled for active, stroked for inactive).
- Status bar icons use Lucide family.
- Aspect topic icons are hand-drawn sketch style images, not icon fonts.

## Spacing
- No odd numbers. Every spacing value is even (base unit: 2px).
- Card padding is always space/20 for topic cards, space/16 for verse and testimony cards.

## Visual
- Card backgrounds use parchment texture images, not flat colors.
- Active states use accent/default (#E63434) only.
- Bottom nav: active tab = filled icon + accent/default. Inactive = stroked icon + ink/faded.
- Screen 2 has NO bottom nav. Back chevron serves as navigation.

## Structure
- Article thumbnails: 100 × 100.
- Video thumbnails: 120 × 100.
- All screen frames: 402 × 874 (except dashboard which is 402 × variable based on content).
