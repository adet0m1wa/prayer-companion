import { useState, useMemo, useCallback, useRef } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { motion, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import { TopicCard } from "./TopicCard";

import loveIcon from "../../images/images for understanding aspect/love.png";
import faithIcon from "../../images/images for understanding aspect/faith.png";
import sinIcon from "../../images/images for understanding aspect/sin.png";
import theologyIcon from "../../images/images for understanding aspect/theology.png";
import graceIcon from "../../images/images for understanding aspect/grace.png";
import prayerIcon from "../../images/images for understanding aspect/prayer.png";
import forgivenessIcon from "../../images/images for understanding aspect/forgiveness.png";
import hopeIcon from "../../images/images for understanding aspect/hope.png";
import mercyIcon from "../../images/images for understanding aspect/mercy.png";
import wisdomIcon from "../../images/images for understanding aspect/wisdom.png";
import redemptionIcon from "../../images/images for understanding aspect/redemption.png";
import worshipIcon from "../../images/images for understanding aspect/worship.png";

import texture0 from "../../images/textures/texture 1.0.png";
import texture1 from "../../images/textures/texture 1.1.png";
import texture2 from "../../images/textures/texture 1.2.png";
import texture3 from "../../images/textures/texture 1.3.png";
import texture4 from "../../images/textures/texture 1.4.png";
import texture5 from "../../images/textures/texture 1.5.png";
import texture6 from "../../images/textures/texture 1.6.png";
import texture7 from "../../images/textures/texture 1.7.png";

const PAGES = [
  [
    { id: "love", title: "Love", description: "Explore how God's love transforms relationships, heals brokenness, and calls us to love others as He first loved us.", iconSrc: loveIcon, textureSrc: texture0 },
    { id: "faith", title: "Faith", description: "Discover what it means to trust God through uncertainty, build unshakeable belief, and walk by faith not by sight.", iconSrc: faithIcon, textureSrc: texture1 },
    { id: "sin", title: "Sin", description: "Understand the nature of sin, its consequences, and the redemptive power of repentance and God's grace.", iconSrc: sinIcon, textureSrc: texture2 },
    { id: "theology", title: "Theology", description: "Dive into the foundational truths about God's nature, His word, and the doctrines that shape our faith.", iconSrc: theologyIcon, textureSrc: texture3 },
  ],
  [
    { id: "grace", title: "Grace", description: "Experience the unmerited favor of God that saves, sustains, and empowers us to live for His glory.", iconSrc: graceIcon, textureSrc: texture4 },
    { id: "prayer", title: "Prayer", description: "Learn to communicate with God through prayer, building intimacy and trust in your daily walk.", iconSrc: prayerIcon, textureSrc: texture5 },
    { id: "forgiveness", title: "Forgiveness", description: "Discover the freedom that comes from forgiving others and receiving God's forgiveness in your own life.", iconSrc: forgivenessIcon, textureSrc: texture6 },
    { id: "hope", title: "Hope", description: "Find strength in the promises of God that anchor your soul through every season of life.", iconSrc: hopeIcon, textureSrc: texture7 },
  ],
  [
    { id: "mercy", title: "Mercy", description: "Understand God's compassion that withholds the punishment we deserve and offers grace instead.", iconSrc: mercyIcon, textureSrc: texture0 },
    { id: "wisdom", title: "Wisdom", description: "Seek the wisdom that comes from above — pure, peaceable, and full of good fruits.", iconSrc: wisdomIcon, textureSrc: texture1 },
    { id: "redemption", title: "Redemption", description: "Discover how God redeems broken stories and makes all things new through Christ.", iconSrc: redemptionIcon, textureSrc: texture2 },
    { id: "worship", title: "Worship", description: "Explore what it means to worship God in spirit and in truth with every area of your life.", iconSrc: worshipIcon, textureSrc: texture3 },
  ],
];

interface TopicCardStackProps {
  onCardClick?: () => void;
}

const ALL_TOPICS = PAGES.flat();
const CARDS_PER_PAGE = 4;
const SWIPE_THRESHOLD = 100;
const CARD_Y_OFFSET = 12;
const CARD_SCALE_STEP = 0.03;
const STACK_HEIGHT = 146 + (CARDS_PER_PAGE - 1) * CARD_Y_OFFSET;

const springTransition = { type: "spring" as const, stiffness: 300, damping: 20 };
const glideTransition = { duration: 0.35, ease: "easeOut" as const };
const slideTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

export function TopicCardStack({ onCardClick }: TopicCardStackProps) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [pageCardIndices, setPageCardIndices] = useState<Record<number, number>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [recycledCardId, setRecycledCardId] = useState<string | null>(null);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const isDraggingRef = useRef(false);
  const swipingRef = useRef(false);
  const pageRef = useRef(page);
  pageRef.current = page;

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_TOPICS;
    const q = query.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => t.title.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const isSearching = query.trim().length > 0;
  const noResults = isSearching && filtered.length === 0;
  const singlePage = totalPages <= 1;

  // Build all pages with their ordered cards
  const allPageCards = useMemo(() => {
    const pages = [];
    for (let p = 0; p < totalPages; p++) {
      const cards = filtered.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
      const idx = pageCardIndices[p] ?? 0;
      const ordered = [];
      for (let i = 0; i < cards.length; i++) {
        ordered.push(cards[(idx + i) % cards.length]);
      }
      pages.push(ordered);
    }
    return pages;
  }, [filtered, totalPages, pageCardIndices]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(0);
    setPageCardIndices({});
    dragX.jump(0);
  };

  const swipeCard = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating) return;
      const currentCards = allPageCards[pageRef.current];
      if (!currentCards || currentCards.length === 0) return;
      setIsAnimating(true);
      swipingRef.current = true;

      const exitX = direction === "left" ? -300 : 300;

      animate(dragX, exitX, {
        duration: 0.3,
        ease: "easeOut",
        onComplete: () => {
          const currentPage = pageRef.current;
          const currentCards = allPageCards[currentPage];
          const pageLen = currentCards?.length ?? CARDS_PER_PAGE;
          const swipedCardId = currentCards?.[0]?.id ?? null;
          setRecycledCardId(swipedCardId);
          setPageCardIndices((prev) => {
            const current = prev[currentPage] ?? 0;
            return { ...prev, [currentPage]: (current + 1) % pageLen };
          });
          dragX.jump(0);
          swipingRef.current = false;
          isDraggingRef.current = false;
          setIsAnimating(false);
          setTimeout(() => setRecycledCardId(null), 500);
        },
      });
    },
    [isAnimating, allPageCards, dragX],
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (swipingRef.current) return;
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 500) {
      swipeCard(offset.x < 0 ? "left" : "right");
    } else {
      animate(dragX, 0, springTransition);
      requestAnimationFrame(() => {
        isDraggingRef.current = false;
      });
    }
  };

  const handleCardClick = () => {
    if (isDraggingRef.current || isAnimating) return;
    onCardClick?.();
  };

  const handleChevronLeft = () => {
    if (safePage === 0 || singlePage) return;
    dragX.jump(0);
    setPage((p) => p - 1);
  };

  const handleChevronRight = () => {
    if (safePage === totalPages - 1 || singlePage) return;
    dragX.jump(0);
    setPage((p) => p + 1);
  };

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Section heading */}
      <div className="w-full">
        <h2 className="font-heading text-[18px] font-semibold text-ink-default">
          Understanding Aspects
        </h2>
      </div>

      {/* Search bar */}
      <div
        className="flex items-center h-[46px] w-full rounded-[12px] px-[16px] transition-colors"
        style={{
          border: isSearching ? "1px solid var(--color-accent-default)" : "1px solid #e6343433",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search for an aspect"
          className="flex-1 bg-transparent font-body text-[14px] font-normal text-ink-default leading-[1.5] outline-none placeholder:text-ink-default placeholder:opacity-70"
        />
        {isSearching && (
          <button
            onClick={() => handleQueryChange("")}
            className="ml-[8px] flex items-center justify-center"
          >
            <X size={16} className="text-ink-faded" />
          </button>
        )}
      </div>

      {/* Pagination — right-aligned (hidden when no results) */}
      {!noResults && (
        <div className="flex items-center justify-end gap-[16px]">
          <button
            onClick={handleChevronLeft}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted"
            style={{ opacity: safePage === 0 || singlePage ? 0.4 : 1 }}
            disabled={safePage === 0 || singlePage}
          >
            <CaretLeft size={18} weight="bold" className="text-accent-default" />
          </button>

          <span className="font-body text-[12px] font-semibold text-ink-default min-w-[32px] text-center">
            {safePage + 1} / {totalPages}
          </span>

          <button
            onClick={handleChevronRight}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted"
            style={{ opacity: safePage === totalPages - 1 || singlePage ? 0.4 : 1 }}
            disabled={safePage === totalPages - 1 || singlePage}
          >
            <CaretRight size={18} weight="bold" className="text-accent-default" />
          </button>
        </div>
      )}

      {/* No results message */}
      {noResults ? (
        <div className="flex items-center justify-center h-[176px] w-full">
          <p className="font-heading text-[16px] font-semibold italic text-ink-default">
            No aspect like that at the moment
          </p>
        </div>
      ) : (
        /* Outer clip container — hides off-screen pages */
        <div className="mx-[-24px]" style={{ overflow: "hidden", height: STACK_HEIGHT }}>
          {/* Horizontal track — slides by page */}
          <motion.div
            className="flex"
            style={{ width: `${totalPages * 100}%` }}
            animate={{ x: `${-safePage * (100 / totalPages)}%` }}
            transition={slideTransition}
          >
            {allPageCards.map((cards, pageIdx) => (
              /* Each page section — full width, no padding */
              <div
                key={pageIdx}
                style={{
                  width: `${100 / totalPages}%`,
                  height: STACK_HEIGHT,
                }}
              >
                {/* Child wrapper — insets cards by 24px, holds the stack */}
                <div
                  className="w-full px-[24px] relative"
                  style={{
                    height: STACK_HEIGHT,
                    overflow: "visible",
                    isolation: "isolate",
                  }}
                >
                  {[...cards].reverse().map((card, reverseIdx) => {
                    const stackIdx = cards.length - 1 - reverseIdx;
                    const isTop = stackIdx === 0;
                    const isActivePage = pageIdx === safePage;
                    const yOffset = stackIdx * CARD_Y_OFFSET;
                    const scale = 1 - stackIdx * CARD_SCALE_STEP;
                    const zIndex = 40 - stackIdx * 10;

                    if (isTop) {
                      return (
                        <motion.div
                          key={card.id}
                          className="absolute left-[24px] right-[24px] top-0 cursor-grab active:cursor-grabbing"
                          initial={false}
                          animate={{ y: 0, scale: 1, zIndex }}
                          transition={glideTransition}
                          style={{
                            x: isActivePage ? dragX : 0,
                            transformOrigin: "top center",
                          }}
                          drag={isActivePage ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.7}
                          dragMomentum={false}
                          onDragStart={isActivePage ? handleDragStart : undefined}
                          onDragEnd={isActivePage ? handleDragEnd : undefined}
                          onClick={isActivePage ? handleCardClick : undefined}
                        >
                          <motion.div style={{ opacity: isActivePage ? dragOpacity : 1 }}>
                            <TopicCard {...card} />
                          </motion.div>
                        </motion.div>
                      );
                    }

                    const isRecycled = card.id === recycledCardId;

                    return (
                      <motion.div
                        key={card.id}
                        className="absolute left-[24px] right-[24px]"
                        initial={false}
                        animate={isRecycled
                          ? {
                              opacity: [0, 0, 1],
                              scale: [scale - 0.05, scale - 0.05, scale],
                              y: yOffset,
                              zIndex,
                            }
                          : { y: yOffset, scale, zIndex }
                        }
                        transition={isRecycled
                          ? { duration: 0.35, ease: "easeOut", times: [0, 0.1, 1] }
                          : glideTransition
                        }
                        style={{ transformOrigin: "top center" }}
                      >
                        <TopicCard {...card} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
