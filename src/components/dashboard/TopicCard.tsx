import { SharedTopicIcon } from "../shared/SharedTopicIcon";

interface TopicCardProps {
  id?: string;
  title: string;
  description: string;
  iconSrc: string;
  textureSrc: string;
  isTransitioning?: boolean;
}

export function TopicCard({
  id,
  title,
  description,
  iconSrc,
  textureSrc,
  isTransitioning = false,
}: TopicCardProps) {
  return (
    <div
      className="flex flex-col justify-center gap-[10px] w-full overflow-hidden aspect-[354/146]"
      style={{
        padding: "var(--card-px)",
        backgroundImage: `url(${textureSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Icon + title row */}
      <div className="flex items-center gap-[2px]">
        {id === "love" && isTransitioning ? (
          <SharedTopicIcon src={iconSrc} size={30} topicId={id} />
        ) : (
          <img src={iconSrc} alt="" className="w-[30px] h-[30px] object-contain" />
        )}
        <span
          className="font-heading font-semibold italic text-ink-default line-clamp-2"
          style={{ fontSize: "var(--card-title-size)" }}
        >
          {title}
        </span>
      </div>

      {/* Description */}
      <p
        className="font-body font-normal text-ink-default leading-[1.5] line-clamp-3"
        style={{ fontSize: "var(--card-body-size)" }}
      >
        {description}
      </p>
    </div>
  );
}
