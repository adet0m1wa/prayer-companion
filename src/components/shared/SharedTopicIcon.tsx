import { motion } from "framer-motion";

interface SharedTopicIconProps {
  src: string;
  size: number;
  topicId: string;
}

export function SharedTopicIcon({ src, size, topicId }: SharedTopicIconProps) {
  return (
    <motion.img
      layoutId={`topic-icon-${topicId}`}
      layout="position"
      src={src}
      alt=""
      animate={{ opacity: 1 }}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: 0,
      }}
      transition={{
        layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0 },
      }}
    />
  );
}
