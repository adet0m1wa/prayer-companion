import { motion } from "framer-motion";

interface SharedTopicIconProps {
  src: string;
  size: number;
  topicId: string;
}

export function SharedTopicIcon({ src, size, topicId }: SharedTopicIconProps) {
  return (
    <motion.div
      layoutId={`topic-icon-${topicId}`}
      layout="position"
      style={{ width: size, height: size, flexShrink: 0 }}
      transition={{
        layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ display: "block", width: size, height: size, objectFit: "contain" }}
      />
    </motion.div>
  );
}
