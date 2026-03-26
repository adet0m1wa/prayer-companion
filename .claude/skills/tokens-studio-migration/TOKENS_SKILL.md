# Design Token Generation Rules — Prayer Companion

## Purpose
Generate W3C DTCG-formatted JSON token files for import into Tokens Studio (Figma plugin). These files become the single source of truth for both Figma and code.

## Architecture — Two Tiers

### Tier 1: Primitives (primitives.json)
Raw values only. No semantic meaning. Just the pure scales.
- Every color as a hex string
- Every spacing value as a string with px unit
- Every font family as an array of strings
- Every font weight as a number
- Every radius as a string with px unit
- Every icon size as a string with px unit

### Tier 2: Semantic (semantic.json)
Functional names that reference primitives using {path.to.token} syntax.
- Names describe PURPOSE, not appearance
- surface/default ✓ — surface/light ✗
- text/primary ✓ — text/dark ✗
- interactive/default ✓ — button/red ✗

### Tier 3: Typography (typography.json)
Composite typography tokens combining fontFamily + fontSize + fontWeight + lineHeight + letterSpacing + fontStyle into single objects.

## Format Rules
- Use W3C DTCG format: $value, $type, $description
- Colors as hex strings (e.g., "#3D2E1F")
- Opacity variants as 8-character hex (e.g., "#3D2E1FB3" for 70%)
- Dimensions as strings with px units (e.g., "16px")
- Font families as arrays (e.g., ["Playfair Display", "serif"])
- Font weights as numbers (e.g., 700)
- Line heights as numbers (e.g., 1.5) or strings ("auto")
- Letter spacing as strings (e.g., "0.5px") or "0px" for auto/normal
- References use curly brace dot notation: {color.ink.default}

## Prayer Companion Brand Values

### Colors (5 base hex values, 9 tokens)
| Token | Hex | Notes |
|-------|-----|-------|
| ink/default | #3D2E1F | 100% opacity — text, icons, strokes |
| ink/muted | #3D2E1FB3 | 70% opacity — secondary text |
| ink/faded | #3D2E1F80 | 50% opacity — disabled text, inactive icons |
| accent/default | #E63434 | 100% — active states, CTAs |
| accent/subtle | #E6343433 | 20% opacity — search bar border |
| surface/canvas | #E4DED5 | Page background |
| surface/card | #F3EDE3 | Card backgrounds |
| surface/muted | #EDE6D8 | Chevron circles, disabled fills |
| surface/overlay | #F3EDE3CC | 80% opacity — verse card image overlay |

### Font Families (4)
| Token | Value | Fallback |
|-------|-------|----------|
| display | Playfair Display | serif |
| body | DM Sans | sans-serif |
| accent | Dancing Script | cursive |
| ui | Inter | system-ui, sans-serif |

### Typography Styles (11)
| Token | Font | Weight | Size | Style | LH | LS |
|-------|------|--------|------|-------|-----|-----|
| heading/display | Playfair Display | 700 | 22px | normal | auto | auto |
| heading/section | Playfair Display | 600 | 18px | normal | auto | auto |
| heading/card | Playfair Display | 600 | 16px | italic | auto | auto |
| heading/toggle-active | Playfair Display | 600 | 16px | normal | auto | auto |
| heading/toggle-inactive | DM Sans | 400 | 16px | normal | auto | auto |
| system/status | Inter | 700 | 15px | normal | auto | auto |
| body/default | DM Sans | 400 | 14px | normal | 1.5 | auto |
| body/counter | DM Sans | 600 | 12px | normal | auto | auto |
| body/caption | DM Sans | 400 | 12px | normal | auto | auto |
| body/separator | Dancing Script | 400 | 12px | normal | auto | auto |
| body/label | DM Sans | 600 | 10px | normal | auto | 0.5px |

### Spacing Scale (10 values, base unit 2px)
0px, 2px, 4px, 6px, 8px, 10px, 16px, 20px, 24px, 36px

### Icon Sizes (5)
60px (loader), 30px (cards/headers), 22px (UI actions), 18px (chevrons), 16px (status/metadata)

### Corner Radius (5)
22px (chevron circles), 16px (verse/testimony cards), 12px (search bar), 3px (battery), 1px (battery level/underlines)

## Responsive Scaling (for future responsive token set)
- Desktop (≥400px): body 14px, card title 16px, heading 22px
- Mobile (<400px): body 13.5px, card title 15px, heading 22px (20px at <360px)
- Captions: 12px always (no scaling)
- Labels: 10px always (no scaling)

## Critical Constraints
- Do NOT invent values — use only the exact values listed above
- Do NOT auto-correct contrast or suggest color changes
- Do NOT add tokens that don't exist in the tables above
- If a reference path doesn't resolve, stop and ask — don't guess
- "auto" for lineHeight and letterSpacing means omit from the composite token or use platform defaults
- Font style "italic" is a separate property from fontWeight
- All 40 tokens must be accounted for: 9 colors + 11 typography + 10 spacing + 5 icons + 5 radii

## Output Format
- Three separate JSON files, each a valid standalone JSON object
- Compatible with Tokens Studio import (W3C DTCG with $value and $type)
- Group tokens under logical parent objects (e.g., color.ink, color.accent, color.surface)
- Include $description on every semantic token explaining its purpose
