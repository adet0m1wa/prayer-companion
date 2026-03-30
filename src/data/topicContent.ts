// Love thumbnails
import loveArticle1 from "../images/article thumbnails/article image 1.1.png";
import loveArticle2 from "../images/article thumbnails/article image 2.1.png";
import loveArticle3 from "../images/article thumbnails/article image 3.1.png";
import loveArticle4 from "../images/article thumbnails/article image 4.1.png";
import loveVideo1 from "../images/video thumbnails/video image 1.5.png";
import loveVideo2 from "../images/video thumbnails/video image 2.5.png";
import loveVideo3 from "../images/video thumbnails/video image 3.5.png";
import loveVideo4 from "../images/video thumbnails/video image 4.5.png";

// Faith thumbnails
import faithArticle1 from "../images/faith/articles/faith-article-1.png";
import faithArticle2 from "../images/faith/articles/faith-article-2.png";
import faithArticle3 from "../images/faith/articles/faith-article-3.png";
import faithArticle4 from "../images/faith/articles/faith-article-4.png";
import faithVideo1 from "../images/faith/videos/faith-video-1.png";
import faithVideo2 from "../images/faith/videos/faith-video-2.png";
import faithVideo3 from "../images/faith/videos/faith-video-3.png";
import faithVideo4 from "../images/faith/videos/faith-video-4.png";

// Shared no-shadow textures
import nsTexture1 from "../images/no shadow texture/ns texture 1.1.webp";
import nsTexture2 from "../images/no shadow texture/ns texture 1.2.webp";
import nsTexture3 from "../images/no shadow texture/ns texture 1.3.webp";
import nsTexture6 from "../images/no shadow texture/ns texture 1.6.webp";
import nsTexture7 from "../images/no shadow texture/ns texture 1.7.webp";

export interface ArticleData {
  thumbnailSrc: string;
  textureSrc: string;
  title: string;
  readTime: string;
  views: string;
  likes: string;
  date: string;
}

export interface VideoData {
  thumbnailSrc: string;
  textureSrc: string;
  title: string;
  views: string;
  likes: string;
  date: string;
}

export interface TopicVerse {
  verse: string;
  reference: string;
}

export interface TopicContent {
  articles: ArticleData[];
  videos: VideoData[];
}

const DEFAULT_VERSE: TopicVerse = {
  verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
  reference: "Proverbs 3:5",
};

const TOPIC_VERSES: Record<string, TopicVerse> = {
  love: {
    verse: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13",
  },
  faith: {
    verse: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    reference: "Hebrews 11:1",
  },
};

const TOPIC_CONTENT: Record<string, TopicContent> = {
  love: {
    articles: [
      { thumbnailSrc: loveArticle1, textureSrc: nsTexture1, title: "What the Bible Says About Loving Your Enemies", readTime: "8 min read", views: "2.4k", likes: "180", date: "3 days ago" },
      { thumbnailSrc: loveArticle2, textureSrc: nsTexture2, title: "God's Love Language: Understanding Agape", readTime: "6 min read", views: "1.8k", likes: "142", date: "1 week ago" },
      { thumbnailSrc: loveArticle3, textureSrc: nsTexture3, title: "Love in Marriage: Biblical Foundations", readTime: "10 min read", views: "3.1k", likes: "267", date: "2 days ago" },
      { thumbnailSrc: loveArticle4, textureSrc: nsTexture2, title: "The Greatest Commandment Explained", readTime: "7 min read", views: "2.7k", likes: "198", date: "5 days ago" },
    ],
    videos: [
      { thumbnailSrc: loveVideo1, textureSrc: nsTexture1, title: "Understanding God's Unconditional Love for Humanity", views: "5.2k", likes: "340", date: "1 day ago" },
      { thumbnailSrc: loveVideo2, textureSrc: nsTexture6, title: "Agape vs Phileo: Types of Love in Greek", views: "3.8k", likes: "210", date: "4 days ago" },
      { thumbnailSrc: loveVideo3, textureSrc: nsTexture7, title: "How to Love When It's Hard: A Biblical Perspective", views: "4.1k", likes: "289", date: "2 weeks ago" },
      { thumbnailSrc: loveVideo4, textureSrc: nsTexture2, title: "The Parable of the Prodigal Son: A Father's Love", views: "6.3k", likes: "412", date: "6 days ago" },
    ],
  },
  faith: {
    articles: [
      { thumbnailSrc: faithArticle1, textureSrc: nsTexture1, title: "Walking by Faith When the Path Is Unclear", readTime: "7 min read", views: "2.1k", likes: "156", date: "2 days ago" },
      { thumbnailSrc: faithArticle2, textureSrc: nsTexture2, title: "Abraham's Faith: Trusting God's Impossible Promises", readTime: "9 min read", views: "3.4k", likes: "245", date: "5 days ago" },
      { thumbnailSrc: faithArticle3, textureSrc: nsTexture3, title: "Faith vs Fear: What the Bible Really Says", readTime: "6 min read", views: "1.9k", likes: "134", date: "1 week ago" },
      { thumbnailSrc: faithArticle4, textureSrc: nsTexture2, title: "The Mustard Seed Principle: Small Faith, Big God", readTime: "8 min read", views: "2.8k", likes: "201", date: "3 days ago" },
    ],
    videos: [
      { thumbnailSrc: faithVideo1, textureSrc: nsTexture1, title: "How Faith Grows Through Trials and Testing", views: "4.7k", likes: "312", date: "2 days ago" },
      { thumbnailSrc: faithVideo2, textureSrc: nsTexture6, title: "Hebrews 11: The Hall of Faith Explained", views: "5.1k", likes: "378", date: "1 week ago" },
      { thumbnailSrc: faithVideo3, textureSrc: nsTexture7, title: "Living by Faith in a World That Demands Proof", views: "3.5k", likes: "198", date: "4 days ago" },
      { thumbnailSrc: faithVideo4, textureSrc: nsTexture2, title: "The Difference Between Faith and Belief", views: "6.0k", likes: "425", date: "3 days ago" },
    ],
  },
};

/** Returns topic content for the given ID, falling back to Love */
export function getTopicContent(topicId: string): TopicContent {
  return TOPIC_CONTENT[topicId] ?? TOPIC_CONTENT.love;
}

/** Returns the verse for the given topic, falling back to default */
export function getTopicVerse(topicId: string): TopicVerse {
  return TOPIC_VERSES[topicId] ?? DEFAULT_VERSE;
}
