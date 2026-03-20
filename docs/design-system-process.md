# Design System Extraction Process

Step-by-step record of how the Prayer Companion design system was built from design.pen audit to tokenized skill folder. This document is intended to be generalized into a reusable skill for future projects.

---

## 1. Prerequisites

Before starting the extraction:
- All screens must be designed and finalized in Pencil (.pen file)
- All layers must be semantically named (run a naming audit first)
- The designer must identify which frames are "final" and which are drafts to ignore
- CLAUDE.md must exist with project context

For Prayer Companion, the 4 final frames were:
- screen-1-dashboard
- screen-transition-loader
- screen-2-article
- screen-2-video

All draft frames (screen 1 draft 1.1, 1.2, 1.3, screen 2 draft 1.1, etc.) were explicitly excluded from every audit.

---

## 2. Audit Order

The audits were performed in this exact sequence. Each phase builds on the previous — colors inform typography (which tokens to reference), typography informs spacing (what elements exist), etc.

| Phase | Category | What's Extracted |
|-------|----------|-----------------|
| 1 | Colors | Every unique hex + opacity combination |
| 2 | Typography | Every unique font family + weight + size + style + line height + letter spacing combination |
| 3 | Spacing | Every unique gap and padding value |
| 4 | Icon sizes | Every unique icon dimension |
| 5 | Images/thumbnails | Every image element with dimensions |
| 6 | Strokes/borders | Every element with a stroke |
| 7 | Corner radius | Every element with border-radius > 0 |
| 8 | Component dimensions | Width, height, and sizing behavior of key containers |

Phases 4-8 were combined into a single "visual properties" audit pass to reduce redundant fetches.

---

## 3. Audit Prompt Template

Each audit followed this structure. The specifics changed per category but the skeleton remained constant.

### Initial scan prompt:
```
Re-read design.pen fresh. Do NOT use cached data.

Audit [CATEGORY] across all 4 frames: "screen-1-dashboard", "screen-transition-loader",
"screen-2-article", "screen-2-video". Ignore all draft frames.

Do NOT make any changes. Report only.
```

### Grouping format:
```
For each unique [value], create a numbered group using roman numerals (I, II, III, etc.).
Sort by [size/value] HIGHEST to LOWEST.

GROUP [roman numeral] — [identifier]

| Screen | Parent Section | Layer Name | [category-specific columns] |

Go screen by screen: screen-1-dashboard -> screen-transition-loader ->
screen-2-article -> screen-2-video.

Subtotals per section. Totals per group.
```

### Parent sections (consistent across all audits):
```
screen-1-dashboard: status-bar, content-wrapper (greeting-verse-section, aspects-section,
  testimonies-section), bottom-nav
screen-transition-loader: status-bar, content-center
screen-2-article: status-bar, content-wrapper (header-area, content-toggle, article-cards-view)
screen-2-video: status-bar, content-wrapper (header-area, content-toggle, video-cards-view)
```

---

## 4. Category-Specific Format Rules

### Colors
- Group by hex code, not by role
- Within each group, separate by usage type (fill, icon color, stroke, text color) in alphabetical order
- Show color token name instead of raw hex in the final pass
- Flag any 8-char hex codes that should be 6-char + separate opacity

### Typography
- Weight format: always name/number — Bold/700, SemiBold/600, Medium/500, Regular/400
- Omit "normal" style from group headers. Show "italic" only when present
- Sort by font size descending (visual hierarchy), NOT by font family
- Line height and letter spacing shown as "auto" when not set
- Color column uses token names (ink/default, ink/muted, etc.)

### Spacing
- Separate into two sections: SECTION A (padding) and SECTION B (gap)
- Direction column for padding: all, horizontal, vertical, top, right, bottom, left
- Flag any odd numbers immediately
- No mixing of padding and gap in the same table

### Icon Sizes
- Icon type column: UI icon, aspect icon, status icon, metadata icon
- Include icon font family (phosphor, lucide) when known
- Image-fill icons listed separately from icon_font nodes

### Corner Radius
- Flag elements that differ from their siblings (e.g. article cards with no radius while video cards have 12)
- Include what the element is, not just its layer name

---

## 5. The Fix-Verify-Name-Save Workflow

Every audit followed this cycle:

### Step 1 — Scan
Run `search_all_unique_properties` on all target frames to get the ground truth of what values exist. This is fast and gives the complete picture before diving into node-level detail.

### Step 2 — Report
Fetch node-level data using `batch_get` with subagents for large frames. Extract with python scripts. Compile into the agreed table format.

### Step 3 — Identify inconsistencies
Flag any value that appears only once (might be an error), any siblings that don't match, any odd numbers in spacing, any 8-char hex that should be 6-char.

### Step 4 — Fix
Apply fixes using `batch_design` for individual nodes or `replace_all_matching_properties` for bulk changes across the tree. Maximum 25 operations per batch_design call.

### Step 5 — Verify
Run `search_all_unique_properties` again immediately after fixes. Confirm old values are gone and no new unexpected values appeared. This is non-negotiable — never skip it.

### Step 6 — Re-audit
If the designer made manual changes between steps, re-fetch everything fresh before the next report. Never use cached data.

### Step 7 — Merge groups
After fixes, some groups collapse into each other. Show updated group headers only (no full re-audit) so the designer can confirm the merges worked.

### Step 8 — Name tokens
Present a flat summary table sorted by usage count:

| # | Hex | Opacity | Used As | Screens Present | Total Count | Suggested Name (blank) |

The designer fills in the token names. The agent never assigns names unilaterally.

### Step 9 — Save to CLAUDE.md
Write the finalized token table to CLAUDE.md under the appropriate section header. The designer confirms. The table is then locked — no modifications without explicit approval.

### Step 10 — Retrospective
After each phase, write a brief retrospective: mistakes, wins, rules to remember. These accumulate into the Audit Rules section of CLAUDE.md.

---

## 6. Tools Used

| Tool | Purpose | When Used |
|------|---------|-----------|
| `search_all_unique_properties` | Get ground truth of all unique values | First step of every audit, verification after every fix |
| `batch_get` with parentId + patterns | Fetch node-level detail | After unique values are known, to map values to specific layers |
| `batch_design` with U() operations | Apply targeted fixes | When specific nodes need property changes (max 25 ops per call) |
| `replace_all_matching_properties` | Bulk value replacement | When a value needs to change across all nodes in a tree (e.g. color standardization) |
| Subagent (sonnet) | Parallel data extraction | When fetching from all 4 frames simultaneously — faster than sequential calls |
| Python scripts via Bash | Filter and extract from large result files | When batch_get results exceed token limits and are saved to disk |

---

## 7. Token Naming Conventions

Tokens use a group/name pattern with direct values — no abstract names like "sm", "md", "lg".

### Colors: group/variant
```
ink/default     ink/muted     ink/faded
accent/default  accent/subtle
surface/canvas  surface/card  surface/muted  surface/overlay
```
- Groups: ink (text/icon foreground), accent (interactive/CTA), surface (backgrounds)
- Variants describe visual weight: default > muted > faded > subtle

### Typography: role/variant
```
heading/display  heading/section  heading/card  heading/toggle-active  heading/toggle-inactive
body/default     body/counter     body/caption  body/separator         body/label
system/status
```
- Groups: heading (Playfair Display), body (DM Sans), system (Inter)
- Variants describe the UI context where the style is used

### Spacing: space/value
```
space/0  space/2  space/4  space/6  space/8  space/10  space/16  space/20  space/24  space/36
```
- Direct pixel value in the name — no abstraction
- Applied to both padding and gap; the token defines the number, usage context determines the CSS property

### Icons: icon/size
```
icon/60  icon/30  icon/22  icon/18  icon/16
```
- Direct pixel dimension in the name
- Square icons only (width = height)

### Corner radius: radius/value
```
radius/22  radius/16  radius/12  radius/3  radius/1
```
- Direct pixel value in the name

---

## 8. Mistakes Made and Rules Derived

These mistakes were made during the Prayer Companion extraction and produced the rules now codified in CLAUDE.md.

### Color phase mistakes
- Used cached/stale data for reports after making changes (3+ times)
- Applied opacity to nodes without designer approval (separators, video metadata)
- Reported verification using pre-change data
- Consolidated colors without listing all affected layers first
- Silently converted between 8-char hex and 6-char hex + opacity

### Typography phase mistakes
- Used bare numbers for font weights instead of name/number format
- Sorted groups by font family instead of size descending
- Showed "normal" style explicitly instead of omitting it
- Took 3 format correction rounds before the output was right
- Missed prayer-preview at 13px through multiple fix rounds

### Spacing phase mistakes
- Mixed padding and gap in the same tables
- Let nav-alerts gap: 3 (odd number) survive across 3 phases
- prayer-content gap: 6 flagged but not fixed until designer caught it

### Visual properties phase mistakes
- Used stale result file for video frame data
- Calendar icons named meta-heart-icon survived through 3+ prior audits
- Article vs video card structural mismatch (different node types, corner radius, thumbnail structure) not caught until late

### Rules derived (full list in CLAUDE.md ## Audit Rules)
- Always re-fetch fresh before every report
- Run search_all_unique_properties before and after every change
- Propose fixes on first detection, don't just flag
- Ask for format sample before large reports
- Use replace_all for bulk changes, batch_design for targeted
- Separate padding and gap in spacing audits
- Audit naming BEFORE visual properties
- Compare sibling components across screens
- Check node TYPE consistency, not just property values

---

## 9. Final Output Structure

The extraction produced this skill folder:

```
.claude/skills/prayer-companion-design-system/
  SKILL.md              — skill metadata + file index
  tokens/
    colors.json         — 9 tokens, 3 groups (ink, accent, surface)
    typography.json     — 11 tokens, 3 groups (heading, body, system)
    spacing.json        — 10 tokens, base unit 2px
    icons.json          — 5 tokens
    radius.json         — 5 tokens
  components/
    patterns.md         — 13 component patterns with token references
  gotchas.md            — rules that must never be violated
```

Plus the source-of-truth tables in CLAUDE.md:
- Color Tokens
- Typography Tokens
- Spacing Tokens
- Icon Size Tokens
- Corner Radius Tokens
- Image/Thumbnail Sizes
- Strokes/Borders
- Component Dimensions
- Audit Rules (mistakes, rules, designer patterns)

---

## 10. How to Reuse This Process

To extract a design system from any Pencil project:

1. Identify final frames, exclude drafts
2. Run naming audit first (semantic layer names)
3. Follow the audit order: colors → typography → spacing → icons → visual properties
4. Use the prompt template with the project's specific parent sections
5. Fix → verify → merge → name → save cycle for each category
6. Write retrospective after each phase
7. Generate token JSON files + component patterns + gotchas
8. Package as a Claude Code skill

The process takes one extended session. Budget for format corrections and designer review between phases.
