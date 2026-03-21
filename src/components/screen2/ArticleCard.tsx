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
      className="flex items-center gap-[20px] w-full h-[145px] p-[20px]"
      style={{
        backgroundImage: `url(${textureSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailSrc}
        alt=""
        className="w-[100px] h-[100px] object-cover shrink-0"
      />

      {/* Content */}
      <div className="flex flex-col justify-between h-full flex-1 min-w-0">
        {/* Title */}
        <p className="font-heading text-[16px] font-semibold italic text-ink-default">
          {title}
        </p>

        {/* Meta row 1: read time | views */}
        <div className="flex items-center gap-[8px]">
          <span className="font-body text-[12px] font-normal text-ink-default">
            {readTime}
          </span>
          <span className="font-separator text-[12px] font-normal text-ink-default">|</span>
          <div className="flex items-center gap-[4px]">
            <Eye size={16} className="text-ink-default" />
            <span className="font-body text-[12px] font-normal text-ink-default">
              {views}
            </span>
          </div>
        </div>

        {/* Meta row 2: likes | date */}
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <Heart size={16} className="text-ink-default" />
            <span className="font-body text-[12px] font-normal text-ink-default">
              {likes}
            </span>
          </div>
          <span className="font-separator text-[12px] font-normal text-ink-default">|</span>
          <div className="flex items-center gap-[4px]">
            <CalendarBlank size={16} className="text-ink-default" />
            <span className="font-body text-[12px] font-normal text-ink-default">
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
