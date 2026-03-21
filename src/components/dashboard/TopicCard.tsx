interface TopicCardProps {
  title: string;
  description: string;
  iconSrc: string;
  textureSrc: string;
}

export function TopicCard({
  title,
  description,
  iconSrc,
  textureSrc,
}: TopicCardProps) {
  return (
    <div
      className="flex flex-col gap-[10px] p-[20px] w-full h-[146px] overflow-hidden"
      style={{
        backgroundImage: `url(${textureSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Icon + title row */}
      <div className="flex items-center gap-[2px]">
        <img src={iconSrc} alt="" className="w-[30px] h-[30px] object-contain" />
        <span className="font-heading text-[16px] font-semibold italic text-ink-default">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="font-body text-[14px] font-normal text-ink-default leading-[1.5] line-clamp-3">
        {description}
      </p>
    </div>
  );
}
