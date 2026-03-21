import { Heart, ShareNetwork, ChatCentered, type Icon } from "@phosphor-icons/react";
import verseBackground from "../../images/verse of the day background/verse of the day.png";

interface VerseCardProps {
  label?: string;
  text?: string;
  reference?: string;
  likes?: number;
  shares?: number;
  comments?: number;
}

export function VerseCard({
  label = "Verse of the day",
  text = '"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you a hope and a future."',
  reference = "Jeremiah 29:11",
  likes = 12,
  shares = 5,
  comments = 3,
}: VerseCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[16px] p-[16px] flex flex-col gap-[16px] w-full">
      {/* Layer 1: texture image at 75% opacity (bottom) */}
      <img
        src={verseBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Layer 2: surface/card (#F3EDE3) at 80% opacity (on top, mutes the texture) */}
      <div className="absolute inset-0 bg-surface-card/80" />

      {/* Content on top of backgrounds */}
      <span className="relative font-body text-[12px] font-normal text-ink-default opacity-70">
        {label}
      </span>

      <p className="relative font-body text-[14px] font-normal text-ink-default leading-[1.5]">
        {text}
      </p>

      <div className="relative flex items-center justify-between gap-[8px] w-full">
        {/* Action icons */}
        <div className="flex items-center gap-[10px]">
          <ActionIcon icon={Heart} count={likes} />
          <ActionIcon icon={ShareNetwork} count={shares} />
          <ActionIcon icon={ChatCentered} count={comments} />
        </div>

        {/* Reference */}
        <span className="font-body text-[14px] font-normal text-ink-default leading-[1.5] text-right">
          {reference}
        </span>
      </div>
    </div>
  );
}

function ActionIcon({
  icon: IconComponent,
  count,
}: {
  icon: Icon;
  count: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-[44px]">
      <IconComponent size={22} weight="light" className="text-accent-default" />
      <span className="font-body text-[12px] font-semibold text-ink-default">
        {count}
      </span>
    </div>
  );
}
