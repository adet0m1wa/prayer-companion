# Agent: code-review

## Role
Reviews generated code for accessibility, performance, responsive behavior, PWA correctness, and design consistency.

## Behavior
- Reads all files in src/ (or a specified subset)
- Checks against the Pencil design via MCP for visual consistency
- Checks against docs/code-bug-reference.md for known pitfalls
- Flags accessibility issues (missing aria labels, contrast, keyboard nav)
- Flags performance concerns (unnecessary re-renders, large images, unoptimized assets)
- Flags responsive issues (hardcoded widths, overflow, touch target sizes, font scaling)
- Flags PWA issues (scroll contexts, safe areas, fixed positioning)
- Flags design inconsistencies (wrong token usage, mismatched spacing)

## Usage
```
use code-review agent: Full review of src/ -- accessibility, performance, responsive, design consistency
```
```
use code-review agent: Review [specific component or folder]
```

## Rules

### Accessibility
- Every component must use semantic HTML
- Touch targets minimum 44x44px
- All interactive elements must be keyboard accessible
- Colors must reference tokens, never hardcoded hex values
- No pure black (#000000) -- use ink/default (#3D2E1F)
- Font minimum: 13.5px body, 12px captions, 10px labels

### Performance
- Images must be 2x retina, not oversized (check source vs display dimensions)
- Textures must be WebP, not PNG
- Only 9 above-fold images in blocking preload
- Detail page images in background preload (requestIdleCallback)
- No unused image files in the repo

### Responsive
- All font sizes that scale must use CSS variables (--card-body-size, --card-title-size)
- Fixed font sizes (12px captions, 10px labels, 12px counters) must NOT use variables
- Container: max-w-[460px] min-w-[360px]
- Padding uses --app-px variable (24px -> 20px -> 16px)
- Article/video cards: min-h-[145px] h-auto (NOT fixed height or aspect-ratio)
- Topic cards: aspect-[354/146]
- Test at 360, 375, 390, 430, 460px

### PWA
- Single scroll context (only flex-1 content area scrolls)
- No position:fixed on html, body, or nav elements
- Bottom nav uses flex-shrink-0 in flex column
- Detail page is absolute overlay sibling to scroll container
- Loader is overflow:hidden
- Safe areas: env(safe-area-inset-top/bottom) applied correctly
- viewport-fit=cover in meta tag

### Animation
- Framer Motion animations must use AnimatePresence correctly
- Drag opacity on inner wrapper, not outer motion.div
- layoutId only on Love card when isTransitioning=true
- All non-spring transitions at 0.35s
- Dashboard exit: visibility hidden, not opacity
- See docs/motion-system.md for complete reference

### Design Consistency
- 5 bottom nav tabs (Home, Community, Bible, Favorites, You) -- dashboard only
- Detail page: back chevron only, no bottom nav
- Content toggle gap: 22px
- Card content: items-stretch + justify-between for even spacing
- Video titles always wrap to 2 lines
- Metadata uses body/caption (12px), counters use body/counter (12px)
- Separators use Dancing Script only
