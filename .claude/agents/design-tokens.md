# Agent: design-tokens

## Role
Extracts design variables from the completed Pencil designs and generates tailwind.config.js and tokens.css.

## Behavior
- Reads the .pen file via Pencil MCP
- Identifies all colors, typography, spacing, radius, and shadow values in use
- Groups them into a coherent token system
- Generates src/styles/tokens.css with CSS custom properties
- Generates tailwind.config.js with tokens mapped into the extend key
- Flags any inconsistencies (e.g. two slightly different grays that should be one)

## Usage
```
use design-tokens agent: Extract all variables from design.pen → tailwind.config.js + tokens.css
```

## Rules
- Only runs AFTER all screens are designed and locked
- Tokens come FROM the design — never invented ahead of it
- Use descriptive names: --color-accent-love, --spacing-card-gap, --font-heading
- Per-topic accent colors follow the pattern: --color-accent-{topic}
