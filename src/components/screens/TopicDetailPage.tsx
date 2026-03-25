import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TopicHeader } from "../screen2/TopicHeader";
import { ContentToggle } from "../screen2/ContentToggle";
import { ArticleCard } from "../screen2/ArticleCard";
import { VideoCard } from "../screen2/VideoCard";

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

import articleThumb1 from "../../images/article thumbnails/article image 1.1.png";
import articleThumb2 from "../../images/article thumbnails/article image 2.1.png";
import articleThumb3 from "../../images/article thumbnails/article image 3.1.png";
import articleThumb4 from "../../images/article thumbnails/article image 4.1.png";

import videoThumb1 from "../../images/video thumbnails/video image 1.5.png";
import videoThumb2 from "../../images/video thumbnails/video image 2.5.png";
import videoThumb3 from "../../images/video thumbnails/video image 3.5.png";
import videoThumb4 from "../../images/video thumbnails/video image 4.5.png";

import nsTexture1 from "../../images/no shadow texture/ns texture 1.1.webp";
import nsTexture2 from "../../images/no shadow texture/ns texture 1.2.webp";
import nsTexture3 from "../../images/no shadow texture/ns texture 1.3.webp";

import nsTexture6 from "../../images/no shadow texture/ns texture 1.6.webp";
import nsTexture7 from "../../images/no shadow texture/ns texture 1.7.webp";


const ARTICLES = [
  { thumbnailSrc: articleThumb1, textureSrc: nsTexture1, title: "What the Bible Says About Loving Your Enemies", readTime: "8 min read", views: "2.4k", likes: "180", date: "3 days ago" },
  { thumbnailSrc: articleThumb2, textureSrc: nsTexture2, title: "God's Love Language: Understanding Agape", readTime: "6 min read", views: "1.8k", likes: "142", date: "1 week ago" },
  { thumbnailSrc: articleThumb3, textureSrc: nsTexture3, title: "Love in Marriage: Biblical Foundations", readTime: "10 min read", views: "3.1k", likes: "267", date: "2 days ago" },
  { thumbnailSrc: articleThumb4, textureSrc: nsTexture2, title: "The Greatest Commandment Explained", readTime: "7 min read", views: "2.7k", likes: "198", date: "5 days ago" },
];

const VIDEOS = [
  { thumbnailSrc: videoThumb1, textureSrc: nsTexture1, title: "Understanding God's Unconditional Love for Humanity", views: "5.2k", likes: "340", date: "1 day ago" },
  { thumbnailSrc: videoThumb2, textureSrc: nsTexture6, title: "Agape vs Phileo: Types of Love in Greek", views: "3.8k", likes: "210", date: "4 days ago" },
  { thumbnailSrc: videoThumb3, textureSrc: nsTexture7, title: "How to Love When It's Hard: A Biblical Perspective", views: "4.1k", likes: "289", date: "2 weeks ago" },
  { thumbnailSrc: videoThumb4, textureSrc: nsTexture2, title: "The Parable of the Prodigal Son: A Father's Love", views: "6.3k", likes: "412", date: "6 days ago" },
];

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
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

export function TopicDetailPage({ topicId = "love", onBack }: TopicDetailPageProps) {
  const [tab, setTab] = useState<"articles" | "videos">("articles");
  const [contentVisible, setContentVisible] = useState(false);
  const meta = TOPIC_META[topicId] ?? TOPIC_META.love;

  // Start content stagger immediately on mount
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 50);
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
          <motion.div variants={contentItemVariants}>
            <TopicHeader
              topicId={topicId}
              title={meta.title}
              iconSrc={meta.iconSrc}
              onBack={onBack}
              contentVisible={contentVisible}
            />
          </motion.div>

          {/* Section 2: Toggle */}
          <motion.div variants={contentItemVariants}>
            <ContentToggle active={tab} onToggle={setTab} />
          </motion.div>

          {/* Section 3: Cards — 16px gap */}
          <div className="flex flex-col gap-[16px]">
            {tab === "articles"
              ? ARTICLES.map((a) => (
                  <motion.div key={a.title} variants={contentItemVariants}>
                    <ArticleCard {...a} />
                  </motion.div>
                ))
              : VIDEOS.map((v) => (
                  <motion.div key={v.title} variants={contentItemVariants}>
                    <VideoCard {...v} />
                  </motion.div>
                ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
