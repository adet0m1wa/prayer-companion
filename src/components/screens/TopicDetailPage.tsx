import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TopicHeader } from "../screen2/TopicHeader";
import { ContentToggle } from "../screen2/ContentToggle";
import { ArticleCard } from "../screen2/ArticleCard";
import { VideoCard } from "../screen2/VideoCard";
import { getTopicContent } from "../../data/topicContent";

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

interface TopicDetailPageProps {
  topicId?: string;
  onBack: () => void;
}

const TOPIC_META: Record<string, { title: string; iconSrc: string }> = {
  love: { title: "Love", iconSrc: loveIcon },
  faith: { title: "Faith", iconSrc: faithIcon },
  sin: { title: "Sin", iconSrc: sinIcon },
  theology: { title: "Theology", iconSrc: theologyIcon },
  grace: { title: "Grace", iconSrc: graceIcon },
  prayer: { title: "Prayer", iconSrc: prayerIcon },
  forgiveness: { title: "Forgiveness", iconSrc: forgivenessIcon },
  hope: { title: "Hope", iconSrc: hopeIcon },
  mercy: { title: "Mercy", iconSrc: mercyIcon },
  wisdom: { title: "Wisdom", iconSrc: wisdomIcon },
  redemption: { title: "Redemption", iconSrc: redemptionIcon },
  worship: { title: "Worship", iconSrc: worshipIcon },
};

// Bottom-up stagger: last card appears first, header appears last
const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1, // Bottom-up
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.3, ease: "easeOut" as const },
  },
};

export function TopicDetailPage({ topicId = "love", onBack }: TopicDetailPageProps) {
  const [tab, setTab] = useState<"articles" | "videos">("articles");
  const [contentVisible, setContentVisible] = useState(false);
  const meta = TOPIC_META[topicId] ?? TOPIC_META.love;
  const { articles, videos } = getTopicContent(topicId);

  // Start content stagger immediately on mount
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="flex flex-col h-full bg-surface-canvas">
      <div
        className="flex-1 min-h-0 overflow-y-auto hide-scrollbar"
        style={{ paddingLeft: "var(--app-px)", paddingRight: "var(--app-px)", paddingTop: "calc(30px + var(--safe-top))", paddingBottom: 30, overscrollBehaviorY: "contain" }}
      >
        <motion.div
          className="flex flex-col gap-[36px]"
          variants={contentContainerVariants}
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
        >
          {/* Section 1: Header */}
          <motion.div variants={contentItemVariants} style={{ willChange: "auto" }}>
            <TopicHeader
              topicId={topicId}
              title={meta.title}
              iconSrc={meta.iconSrc}
              onBack={onBack}
              contentVisible={contentVisible}
            />
          </motion.div>

          {/* Section 2: Toggle */}
          <motion.div variants={contentItemVariants} style={{ willChange: "auto" }}>
            <ContentToggle active={tab} onToggle={setTab} />
          </motion.div>

          {/* Section 3: Cards — 16px gap */}
          <div className="flex flex-col gap-[16px]">
            {tab === "articles"
              ? articles.map((a) => (
                  <motion.div key={a.title} variants={contentItemVariants} style={{ willChange: "auto" }}>
                    <ArticleCard {...a} />
                  </motion.div>
                ))
              : videos.map((v) => (
                  <motion.div key={v.title} variants={contentItemVariants} style={{ willChange: "auto" }}>
                    <VideoCard {...v} />
                  </motion.div>
                ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
