# Prayer Companion App — Product Requirements Document (v1)

## Overview

A Bible-focused app that helps Christians grow in their faith by exploring different spiritual topics — Love, Faith, Sin, Theology, and more. Content is delivered through articles and videos, organized by topic. The app has a calm, intentional aesthetic rooted in a God-first philosophy.

## Target Audience

Christians (and seekers) who want to deepen their understanding of scripture and faith topics. Primarily mobile users. Range from new believers exploring foundational concepts to mature Christians studying theology.

## Screens

### Screen 1 — Daily View (Home)

The entry point. Greets the user, encourages exploration, and presents topic cards.

**Components:**
1. **Time-based greeting** — "Good Morning" / "Good Afternoon" / "Good Evening" based on local time
2. **Streak counter** — Tracks consecutive days of app engagement. Displayed beside a bell (notification) icon
3. **Encouragement text** — A short line nudging users to explore topics (e.g. "Discover what God's Word says about...")
4. **Topic cards** — Stacked vertically, each card contains:
   - Bold topic heading (Love, Faith, Sin, Theology, etc.)
   - Rive animated icon representing the topic (heart for Love, cross for Faith, etc.)
   - Distinct accent color per card
   - Tappable — expands to Screen 2
5. **Floating chevron arrows** — Left and right arrows for horizontal navigation through topic cards
6. **Bottom navigation** — 3 tabs: Home, Bible, Community

### Screen 2 — Topic Detail View (Expanded Card)

When a topic card is tapped, it expands to fill the screen.

**Transition behavior:**
- Card expands from its position with a smooth ease animation
- Card's accent color shifts: from 100% accent → approximately 80% white + 10% accent
- Bottom nav persists throughout
- Rive animation triggers on the icon when the card opens

**Components:**
1. **Header area:**
   - Topic title (e.g. "Love") — left-aligned
   - Rive animated icon to the LEFT of the title
   - Vertical line separator between header and body content (editorial style, ref: Co-Star)
2. **Content type toggle:**
   - Articles | Videos switch
   - Aligned to the RIGHT side of the screen (right-thumb accessibility)
3. **Content cards — Articles:**
   - Thumbnail image (left)
   - Title + description (right)
   - No play icon
   - Metadata row: views count, likes count, read time (minutes)
4. **Content cards — Videos:**
   - Thumbnail image with LARGE play icon overlay
   - Title only (no description)
   - Metadata row: views count, likes count, duration
5. **Bottom navigation** — Same 3 tabs, persistent
   - Home tab returns to Screen 1 (default card stack view)
   - Bible tab navigates to scriptures section
   - Community tab navigates to community section

**Navigation back:**
- Tapping Home in the bottom nav returns to Screen 1
- No separate back button — Home IS the back action

## Topics (Initial Set)

- Love
- Faith
- Sin
- Theology
- Grace
- Prayer
- Forgiveness
- Hope

Each topic has its own distinct accent color.

## Technical Constraints

- React + Tailwind CSS
- Rive for custom animated icons (placeholder icons during build phase)
- Framer Motion for UI transitions (card expand, content reveals)
- Mobile-first responsive design
- Animations and Rive are the LAST steps — all screens and design system built first

## Out of Scope (v1)

- User accounts / authentication
- Bible reader (Bible tab is placeholder)
- Community features (Community tab is placeholder)
- Backend / CMS for content
- Search functionality
- Bookmarking
