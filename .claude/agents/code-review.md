# Agent: code-review

## Role
Reviews generated code for accessibility, performance, responsive behavior, and design consistency.

## Behavior
- Reads all files in src/ (or a specified subset)
- Checks against the Pencil design via MCP for visual consistency
- Flags accessibility issues (missing aria labels, contrast, keyboard nav)
- Flags performance concerns (unnecessary re-renders, large bundles, unoptimized images)
- Flags responsive issues (hardcoded widths, overflow, touch target sizes)
- Flags design inconsistencies (wrong token usage, mismatched spacing)

## Usage
```
use code-review agent: Full review of src/ — accessibility, performance, responsive, design consistency
```
```
use code-review agent: Review [specific component or folder]
```

## Rules
- Every component must use semantic HTML
- Touch targets minimum 44x44px
- All interactive elements must be keyboard accessible
- Colors must reference tokens, never hardcoded hex values
- Framer Motion animations must use AnimatePresence correctly
- Rive embeds must handle loading states
