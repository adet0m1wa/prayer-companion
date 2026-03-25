import { Eye, Heart, CalendarBlank } from "@phosphor-icons/react";

interface ArticleCardProps {
  thumbnailSrc: string;
  textureSrc: string;
  title: string;
  readTime: string;
  views: string;
  likes: string;
  date: string;
}

export function ArticleCard({
  thumbnailSrc,
  textureSrc,
  title,
  readTime,
  views,
  likes,
  date,
}: ArticleCardProps) {
  return (
    <div
      className="flex items-stretch gap-[20px] w-full min-h-[145px] h-auto"
      style={{
        padding: "var(--card-px)",
        backgroundImage: `url(${textureSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailSrc}
        alt=""
        className="object-cover shrink-0 self-center"
        style={{ width: "var(--article-thumb)", height: "var(--article-thumb)" }}
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* Title */}
        <p
          className="font-heading font-semibold italic text-ink-default line-clamp-2"
          style={{ fontSize: "var(--card-title-size)" }}
        >
          {title}
        </p>

        {/* Meta row 1: read time | views */}
        <div className="flex items-center gap-[8px]">
          <span
            className="font-body font-normal text-ink-default"
            style={{ fontSize: "var(--card-caption-size)" }}
          >
            {readTime}
          </span>
          <span
            className="font-separator font-normal text-ink-default"
            style={{ fontSize: "var(--card-caption-size)" }}
          >|</span>
          <div className="flex items-center gap-[4px]">
            <Eye size={16} className="text-ink-default shrink-0" />
            <span
              className="font-body font-normal text-ink-default"
              style={{ fontSize: "var(--card-caption-size)" }}
            >
              {views}
            </span>
          </div>
        </div>

        {/* Meta row 2: likes | date */}
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <Heart size={16} className="text-ink-default shrink-0" />
            <span
              className="font-body font-normal text-ink-default"
              style={{ fontSize: "var(--card-caption-size)" }}
            >
              {likes}
            </span>
          </div>
          <span
            className="font-separator font-normal text-ink-default"
            style={{ fontSize: "var(--card-caption-size)" }}
          >|</span>
          <div className="flex items-center gap-[4px]">
            <CalendarBlank size={16} className="text-ink-default shrink-0" />
            <span
              className="font-body font-normal text-ink-default"
              style={{ fontSize: "var(--card-caption-size)" }}
            >
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
