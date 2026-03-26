# Prayer Companion — Motion System

> All animation decisions, timing constants, and architecture patterns.
> Referenced from CLAUDE.md. Source of truth for all motion behavior.

---

## Timing Constants

| Animation | Duration | Easing | Used In |
|---|---|---|---|
| Chevron page slide | 0.35s | [0.25, 0.1, 0.25, 1] (fast start, decelerate) | TopicCardStack, TestimoniesSection |
| Card position shift after swipe | 0.35s | easeOut | Behind cards gliding up |
| Recycled card fade-in | 0.35s | easeOut, times: [0, 0.1, 1] | Bottom-of-stack reappearance |
| Swipe exit | 0.3s | easeOut | Top card leaving screen |
| Drag snap-back | spring | stiffness: 300, damping: 20 | Failed swipe returning |
| Heart FLIP (dashboard -> loader) | 0.4s | tween [0.25, 0.1, 0.25, 1] | SharedTopicIcon layoutId |
| Shimmer (like button) | 0.8s | times: [0, 0.136, 0.35, 0.7] | VerseCard overlay opacity |
| Heart bounce | spring | stiffness: 400, damping: 10 | VerseCard like tap |
| Loader text stagger in | 0.35s per element | easeOut, 200ms overlap | TransitionLoader verse + reference |
| Loader exit cascade | 0.2s per element | easeIn, 100ms stagger upward | TransitionLoader heart -> verse -> ref |
| Detail content stagger | 0.09s per child | bottom-up (staggerDirection: -1) | TopicDetailPage sections |
| Detail item reveal | 0.2s | easeOut | Individual cards/sections |
| Back chevron reveal | 0.2s | easeOut | TopicHeader (tied to contentVisible) |
| Bottom nav shadow | 0.2s | easeOut | BottomNav opacity transition |

**Design rule:** All non-spring transitions use 0.35s for visual consistency. Springs are only for snap-back and heart bounce.

---

## Transition Flows

### Dashboard -> Loader -> Detail Page

**Step 1: Card tap**
- `isTransitioning` set to true on TopicCardStack
- Love card renders SharedTopicIcon with `layoutId`
- `onCardClick` fires, App.tsx sets `dashboardHidden = true`, `screen = "loader"`

**Step 2: Dashboard exit**
- Dashboard uses `visibility: hidden` (NOT opacity animation)
- This prevents CSS opacity inheritance from fading children

**Step 3: Loader enter**
- SharedTopicIcon FLIP animates from card position (30x30) to center (60x60)
- Layout transition: 0.4s tween
- Wait 450ms for FLIP to settle

**Step 4: Loader text stagger**
- Verse text: opacity 0->1, y 10->0 (0.35s easeOut)
- 200ms overlap before reference starts
- Reference text: same animation
- Hold for 1000ms

**Step 5: Loader exit**
- Staggered upward cascade: heart -> verse -> reference
- Each: opacity 1->0, y 0->-10 (0.2s easeIn, 100ms stagger)
- On complete: `screen = "detail"`

**Step 6: Detail page enter**
- Absolute overlay appears with bg-surface-canvas
- Content stagger: bottom-up (last card appears first, header last)
- staggerChildren: 0.09s, staggerDirection: -1
- Each item: opacity 0->1, y 10->0 (0.2s easeOut)

**Step 7: Back to dashboard**
- Detail page exit: opacity 0 (0.25s easeIn)
- Dashboard visibility restored
- `dashboardHidden = false`, `screen = "dashboard"`

---

## Card Stack Swipe System

### How it works
- Top card is draggable on x-axis (`drag="x"`)
- Drag opacity: maps dragX [-300, -100, 0, 100, 300] -> [0, 1, 1, 1, 0]
- Swipe threshold: 100px offset OR 500px/s velocity
- Swipe exit: animate to +/-300px (0.3s easeOut)
- On complete: rotate card array (swiped card goes to back)
- Behind cards glide up to new positions (0.35s easeOut)
- Recycled card fades in at back: opacity [0, 0, 1] with times [0, 0.1, 1]

### Architecture decisions
- **Drag opacity on inner wrapper** -- opacity < 1 on outer div creates CSS stacking context, breaking z-index. Outer div: position/scale/drag/zIndex. Inner div: opacity only.
- **Keyframe arrays for recycled cards** -- `animate={{ opacity: [0, 0, 1] }}` overrides current MotionValue state without needing `initial` (ignored on stable-key re-renders).
- **Behind cards: pointerEvents: "none"** -- prevents taps passing through stack.
- **Drag-vs-tap guard** -- `isDraggingRef` with `requestAnimationFrame` timing distinguishes swipe from click. Offset < 5px = clean tap.

### Horizontal page slide
- All pages rendered in DOM simultaneously
- `overflow: hidden` clips off-screen pages
- `mx-[-24px]` breakout pattern for edge-to-edge clipping
- Slide transition: 0.35s with [0.25, 0.1, 0.25, 1] easing
- Same pattern used for TestimoniesSection

---

## SharedTopicIcon (FLIP Animation)

### Conditional layoutId
- Only Love card gets SharedTopicIcon with `layoutId` when `isTransitioning = true`
- All other cards: plain `<img>` without layoutId
- Prevents icon movement during swipes

### SharedTopicIcon config
```tsx
<motion.img
  layoutId={`topic-icon-${topicId}`}
  layout="position"
  animate={{ opacity: 1 }}
  transition={{
    layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    opacity: { duration: 0 },
  }}
/>
```

---

## VerseCard Animations

### Like button
- Heart bounce: spring (stiffness: 400, damping: 10), scale [1, 1.3, 1]
- Web haptics: `trigger("success")` on tap
- Shimmer: overlay opacity [0.8, 0.3, 0.3, 0.8] over 0.8s

### Shimmer timing
- times: [0, 0.136, 0.35, 0.7]
- ease: ["easeIn", "linear", "easeOut"]
- Only fires on like (not unlike)

---

## Bottom Nav Shadow

- IntersectionObserver sentinel placed after last content section
- Shadow: `box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05)`
- Animate opacity 0->1 when sentinel exits viewport (0.2s easeOut)
- Dashboard only (BottomNav removed from detail page)

---

## Planned (Not Yet Built)

- Rive animations: like button, fire streak, per-topic icon loops
- Paper-turn sound on card swipe (freesound.org, Web Audio API)
- WebHaptics on card swipe (installed, only wired on heart tap)
- DialKit for animation parameter tuning

---

## Known Animation Bugs

| Bug | Status | Root Cause |
|---|---|---|
| One-frame flash after swipe | Intermittent, deferred | Shared dragX MotionValue timing gap between jump(0) and re-render |
| Love icon moves on swipe after returning | Intermittent, deferred | isTransitioning never resets to false |

Both bugs have documented fixes in `docs/code-bug-reference.md` but attempts to implement them broke the swipe system. Future fix must be on a separate branch with thorough testing.
