import { CaretLeft } from "@phosphor-icons/react";
import loveIcon from "../../images/images for understanding aspect/love.png";

interface TopicHeaderProps {
  title?: string;
  iconSrc?: string;
  onBack?: () => void;
}

export function TopicHeader({
  title = "Love",
  iconSrc = loveIcon,
  onBack,
}: TopicHeaderProps) {
  return (
    <div className="flex items-center gap-[10px] w-full">
      {/* Back chevron */}
      <button
        onClick={onBack}
        className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted shrink-0"
      >
        <CaretLeft size={18} weight="bold" className="text-accent-default" />
      </button>

      {/* Topic icon + title */}
      <div className="flex items-center gap-[2px]">
        <img src={iconSrc} alt="" className="w-[30px] h-[30px] object-contain" />
        <span className="font-heading text-[22px] font-bold text-ink-default">
          {title}
        </span>
      </div>
    </div>
  );
}
