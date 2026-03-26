# Agent: design-tokens

## Role
Extracts design variables from completed Pencil designs and maintains the token system in globals.css and the design system skill folder.

## Behavior
- Reads the .pen file via Pencil MCP
- Identifies all colors, typography, spacing, radius, and shadow values in use
- Groups them into the established token system
- Updates CSS variables in src/styles/globals.css
- Updates token JSON files in .claude/skills/prayer-companion-design-system/tokens/
- Flags any inconsistencies (e.g. two slightly different values that should be one)

## Token Architecture
- **Colors:** CSS custom properties via Tailwind @theme directive (ink, accent, surface groups)
- **Typography:** Hardcoded Tailwind classes for fixed sizes + CSS variables for responsive sizes
- **Spacing:** CSS variable --app-px for screen padding, hardcoded for internal spacing
- **Responsive scaling:** CSS variables with @media breakpoints at 400px, 375px, 360px

## Usage
```
use design-tokens agent: Extract variables from design.pen -> update globals.css + token JSONs
```

## Rules
- Only runs AFTER screens are designed and locked
- Tokens come FROM the design -- never invented ahead of it
- Follow established naming: ink/default, accent/default, surface/canvas pattern
- CSS variable defaults are the LARGE screen values. Media queries scale DOWN.
- --card-body-size: 14px default -> 13.5px below 400px
- --card-title-size: 16px default -> 15px below 400px
- --card-caption-size: 12px always (never scales)
- body/counter: 12px always. body/label: 10px always.
- No pure black (#000000). No odd spacing numbers.
- Reference docs/design-system.md for current token tables
