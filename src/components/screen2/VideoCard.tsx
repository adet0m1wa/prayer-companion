import { Eye, Heart, CalendarBlank } from "@phosphor-icons/react";

interface VideoCardProps {
  thumbnailSrc: string;
  textureSrc: string;
  title: string;
  views: string;
  likes: string;
  date: string;
}

export function VideoCard({
  thumbnailSrc,
  textureSrc,
  title,
  views,
  likes,
  date,
}: VideoCardProps) {
  return (
    <div
      className="flex items-center gap-[20px] w-full aspect-[354/145] p-[20px]"
      style={{
        backgroundImage: `url(${textureSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Thumbnail — 120×100 for videos */}
      <img
        src={thumbnailSrc}
        alt=""
        className="w-[120px] h-[100px] object-cover shrink-0"
      />

      {/* Content */}
      <div className="flex flex-col justify-between h-full flex-1 min-w-0">
        {/* Title */}
        <p className="font-heading text-[16px] font-semibold italic text-ink-default line-clamp-2">
          {title}
        </p>

        {/* Meta row 1: views only */}
        <div className="flex items-center gap-[4px]">
          <Eye size={16} className="text-ink-default" />
          <span className="font-body text-[12px] font-normal text-ink-default">
            {views}
          </span>
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
