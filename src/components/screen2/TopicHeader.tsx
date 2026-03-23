import { motion } from "framer-motion";
import { CaretLeft } from "@phosphor-icons/react";
import loveIcon from "../../images/images for understanding aspect/love.png";

interface TopicHeaderProps {
  topicId?: string;
  title?: string;
  iconSrc?: string;
  onBack?: () => void;
  contentVisible?: boolean;
}

export function TopicHeader({
  title = "Love",
  iconSrc = loveIcon,
  onBack,
  contentVisible = false,
}: TopicHeaderProps) {
  return (
    <div className="flex items-center gap-[10px] w-full">
      {/* Back chevron — hidden until content reveals */}
      <motion.button
        onClick={onBack}
        className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" as const }}
      >
        <CaretLeft size={18} weight="bold" className="text-accent-default" />
      </motion.button>

      {/* Topic icon + title */}
      <div className="flex items-center gap-[2px]">
        <motion.img
          src={iconSrc}
          alt=""
          className="w-[30px] h-[30px] object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
        />
        <motion.span
          className="font-heading text-[22px] font-bold text-ink-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
        >
          {title}
        </motion.span>
      </div>
    </div>
  );
}
