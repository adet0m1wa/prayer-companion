import { useState, useMemo } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
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
    { title: "Love", description: "Explore how God's love transforms relationships, heals brokenness, and calls us to love others as He first loved us.", iconSrc: loveIcon, textureSrc: texture0 },
    { title: "Faith", description: "Discover what it means to trust God through uncertainty, build unshakeable belief, and walk by faith not by sight.", iconSrc: faithIcon, textureSrc: texture1 },
    { title: "Sin", description: "Understand the nature of sin, its consequences, and the redemptive power of repentance and God's grace.", iconSrc: sinIcon, textureSrc: texture2 },
    { title: "Theology", description: "Dive into the foundational truths about God's nature, His word, and the doctrines that shape our faith.", iconSrc: theologyIcon, textureSrc: texture3 },
  ],
  [
    { title: "Grace", description: "Experience the unmerited favor of God that saves, sustains, and empowers us to live for His glory.", iconSrc: graceIcon, textureSrc: texture4 },
    { title: "Prayer", description: "Learn to communicate with God through prayer, building intimacy and trust in your daily walk.", iconSrc: prayerIcon, textureSrc: texture5 },
    { title: "Forgiveness", description: "Discover the freedom that comes from forgiving others and receiving God's forgiveness in your own life.", iconSrc: forgivenessIcon, textureSrc: texture6 },
    { title: "Hope", description: "Find strength in the promises of God that anchor your soul through every season of life.", iconSrc: hopeIcon, textureSrc: texture7 },
  ],
  [
    { title: "Mercy", description: "Understand God's compassion that withholds the punishment we deserve and offers grace instead.", iconSrc: mercyIcon, textureSrc: texture0 },
    { title: "Wisdom", description: "Seek the wisdom that comes from above — pure, peaceable, and full of good fruits.", iconSrc: wisdomIcon, textureSrc: texture1 },
    { title: "Redemption", description: "Discover how God redeems broken stories and makes all things new through Christ.", iconSrc: redemptionIcon, textureSrc: texture2 },
    { title: "Worship", description: "Explore what it means to worship God in spirit and in truth with every area of your life.", iconSrc: worshipIcon, textureSrc: texture3 },
  ],
];

interface TopicCardStackProps {
  onCardClick?: () => void;
}

const ALL_TOPICS = PAGES.flat();
const CARDS_PER_PAGE = 4;

export function TopicCardStack({ onCardClick }: TopicCardStackProps) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_TOPICS;
    const q = query.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => t.title.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const cards = filtered.slice(safePage * CARDS_PER_PAGE, (safePage + 1) * CARDS_PER_PAGE);
  const isSearching = query.trim().length > 0;
  const noResults = isSearching && filtered.length === 0;
  const singlePage = totalPages <= 1;

  // Reset to page 0 when query changes
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(0);
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
            onClick={() => setPage((p) => Math.max(0, p - 1))}
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
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
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
        /* Card stack — top card fully visible, others peeking behind */
        <div className="relative w-full h-[176px]">
          {/* Background cards (stacked behind, bottom to top) */}
          {cards.slice(1).reverse().map((card, reverseIdx) => {
            const stackIdx = cards.length - 1 - reverseIdx;
            const yOffset = stackIdx * 12;
            return (
              <div
                key={card.title}
                className="absolute left-0 right-0 h-[146px]"
                style={{
                  top: `${yOffset}px`,
                  backgroundImage: `url(${card.textureSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            );
          })}

          {/* Top card — fully visible, clickable */}
          <div className="absolute left-0 right-0 top-0 cursor-pointer" onClick={onCardClick}>
            <TopicCard {...cards[0]} />
          </div>
        </div>
      )}
    </div>
  );
}
