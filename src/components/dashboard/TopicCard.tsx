import { motion } from "framer-motion";

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
        {id && isTransitioning ? (
          <motion.div
            layoutId={`topic-icon-${id}`}
            layout="position"
            style={{ width: 30, height: 30, flexShrink: 0 }}
            transition={{ layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
          >
            <img src={iconSrc} alt="" width={30} height={30} style={{ display: "block", width: 30, height: 30, objectFit: "contain" }} />
          </motion.div>
        ) : (
          <div style={{ width: 30, height: 30, flexShrink: 0 }}>
            <img src={iconSrc} alt="" width={30} height={30} style={{ display: "block", width: 30, height: 30, objectFit: "contain" }} />
          </div>
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
