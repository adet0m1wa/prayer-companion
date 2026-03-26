# Prayer Companion App — Product Requirements Document (v2)

> Updated after Session 5. Reflects what's actually built.

## Overview

A Bible-focused app that helps Christians grow in their faith by exploring spiritual topics ("Aspects") through articles and videos. Calm, intentional aesthetic rooted in a God-first philosophy. Built as a portfolio piece showcasing the Pencil -> Claude Code -> Framer Motion -> PWA -> Vercel pipeline.

## Target Audience

Christians (and seekers) who want to deepen their understanding of scripture and faith topics. Primarily mobile users. Range from new believers to mature Christians studying theology.

## Screens

### Screen 1 — Dashboard (Home)

The entry point. Greets the user, encourages exploration, and presents topic cards.

**Components:**
1. **Time-based greeting** — "Good Morning/Afternoon/Evening, Jamie" (Playfair Display Bold)
2. **Streak counter** — Fire icon + count (accent/default) + bell icon (ink/faded)
3. **Verse of the day card** — Waterfall illustration at 80% opacity, scripture text (Jeremiah 29:11), like/share/comment actions with counts, reference right-aligned
4. **Understanding Aspects section** — heading + search bar + 12 topic cards across 3 paginated stacks (4 per page) with chevron navigation + "1/3" counter
5. **Testimonies section** — 3 paginated full-text testimony cards (Sarah M., David K., Grace O.) with avatars
6. **Bottom navigation** — 5 tabs: Home (active), Community, Bible, Favorites, You

### Screen 2 — Topic Detail View

When a topic card is tapped, a transition loader plays, then the detail page appears.

**Transition:** Heart icon FLIP animates to center -> verse text staggers in -> hold -> cascade exit -> detail page reveals bottom-up.

**Components:**
1. **Header:** Back chevron (28x28, radius/22) + topic icon + title (Playfair Display Bold 22px)
2. **Content toggle:** Articles | Videos (gap 22px, left-aligned, active underline in accent/default)
3. **Article cards:** Thumbnail (100x100) + title (italic, 2 lines max) + read time + views + likes + date
4. **Video cards:** Thumbnail (120x100) + title (italic, always 2 lines) + views + likes + date
5. **No bottom navigation** — back chevron is the only navigation

**Navigation back:** Back chevron returns to dashboard.

## Topics (12 Total)

Love, Faith, Sin, Theology, Grace, Prayer, Forgiveness, Hope, Mercy, Wisdom, Redemption, Worship.

Only Love is currently built. Others use the same design system.

## Technical Constraints

- React 18 + Vite 8 + TypeScript + Tailwind CSS v4
- Framer Motion for all transitions and animations
- Rive planned for topic icons (placeholders currently)
- PWA with Workbox (installable, offline-capable)
- Mobile-first: 360-460px responsive range
- Deployed to Vercel (auto-deploy on push to main)

## Out of Scope (v1)

- User accounts / authentication
- Bible reader (Bible tab is placeholder)
- Community features (Community tab is placeholder)
- Backend / CMS for content
- Bookmarking
- Dark mode (rejected in Session 1)
- Sort By feature (killed -- adds complexity for zero payoff)
