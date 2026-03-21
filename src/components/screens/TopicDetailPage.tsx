import { useState } from "react";
import { TopicHeader } from "../screen2/TopicHeader";
import { ContentToggle } from "../screen2/ContentToggle";
import { ArticleCard } from "../screen2/ArticleCard";
import { VideoCard } from "../screen2/VideoCard";
import { BottomNav } from "../shared/BottomNav";

import articleThumb1 from "../../images/article thumbnails/article image 1.1.png";
import articleThumb2 from "../../images/article thumbnails/article image 2.1.png";
import articleThumb3 from "../../images/article thumbnails/article image 3.1.png";
import articleThumb4 from "../../images/article thumbnails/article image 4.1.png";

import videoThumb1 from "../../images/video thumbnails/video image 1.5.png";
import videoThumb2 from "../../images/video thumbnails/video image 2.5.png";
import videoThumb3 from "../../images/video thumbnails/video image 3.5.png";
import videoThumb4 from "../../images/video thumbnails/video image 4.5.png";

import nsTexture1 from "../../images/no shadow texture/ns texture 1.1.png";
import nsTexture2 from "../../images/no shadow texture/ns texture 1.2.png";
import nsTexture3 from "../../images/no shadow texture/ns texture 1.3.png";
import nsTexture4 from "../../images/no shadow texture/ns texture 1.4.png";
import nsTexture5 from "../../images/no shadow texture/ns texture 1.5.png";
import nsTexture6 from "../../images/no shadow texture/ns texture 1.6.png";
import nsTexture7 from "../../images/no shadow texture/ns texture 1.7.png";
import nsTexture0 from "../../images/no shadow texture/ns texture 1.0.png";

const ARTICLES = [
  { thumbnailSrc: articleThumb1, textureSrc: nsTexture1, title: "What the Bible Says About Loving Your Enemies", readTime: "8 min read", views: "2.4k", likes: "180", date: "3 days ago" },
  { thumbnailSrc: articleThumb2, textureSrc: nsTexture2, title: "God's Love Language: Understanding Agape", readTime: "6 min read", views: "1.8k", likes: "142", date: "1 week ago" },
  { thumbnailSrc: articleThumb3, textureSrc: nsTexture3, title: "Love in Marriage: Biblical Foundations", readTime: "10 min read", views: "3.1k", likes: "267", date: "2 days ago" },
  { thumbnailSrc: articleThumb4, textureSrc: nsTexture4, title: "The Greatest Commandment Explained", readTime: "7 min read", views: "2.7k", likes: "198", date: "5 days ago" },
];

const VIDEOS = [
  { thumbnailSrc: videoThumb1, textureSrc: nsTexture5, title: "Understanding God's Love", views: "5.2k", likes: "340", date: "1 day ago" },
  { thumbnailSrc: videoThumb2, textureSrc: nsTexture6, title: "Agape vs Phileo: Types of Love in Greek", views: "3.8k", likes: "210", date: "4 days ago" },
  { thumbnailSrc: videoThumb3, textureSrc: nsTexture7, title: "How to Love When It's Hard", views: "4.1k", likes: "289", date: "2 weeks ago" },
  { thumbnailSrc: videoThumb4, textureSrc: nsTexture0, title: "The Parable of the Prodigal Son", views: "6.3k", likes: "412", date: "6 days ago" },
];

interface TopicDetailPageProps {
  onBack: () => void;
}

export function TopicDetailPage({ onBack }: TopicDetailPageProps) {
  const [tab, setTab] = useState<"articles" | "videos">("articles");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Scrollable content */}
      <div className="flex-1 flex flex-col gap-[36px] p-[24px]">
        <TopicHeader onBack={onBack} />
        <ContentToggle active={tab} onToggle={setTab} />

        {/* Card list */}
        <div className="flex flex-col gap-[16px]">
          {tab === "articles"
            ? ARTICLES.map((a) => <ArticleCard key={a.title} {...a} />)
            : VIDEOS.map((v) => <VideoCard key={v.title} {...v} />)}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
