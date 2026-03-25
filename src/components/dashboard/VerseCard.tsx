import { useState } from "react";
import { Heart, ShareNetwork, ChatCentered, type Icon } from "@phosphor-icons/react";
import { motion, useAnimationControls } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
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
  const [liked, setLiked] = useState(false);
  const heartControls = useAnimationControls();
  const shimmerControls = useAnimationControls();
  const { trigger } = useWebHaptics();

  const handleLikeTap = () => {
    const willLike = !liked;
    setLiked(willLike);
    trigger();
    heartControls.start({
      scale: [1, 1.3, 1],
      transition: { type: "spring", stiffness: 400, damping: 10 },
    });
    if (willLike) {
      shimmerControls.start({
        opacity: [0.8, 0.3, 0.3, 0.8],
        transition: { duration: 0.8, times: [0, 0.136, 0.35, 0.7], ease: ["easeIn", "linear", "easeOut"] },
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[16px] p-[16px] flex flex-col gap-[16px] w-full">
      {/* Layer 1: texture image at 75% opacity (bottom) */}
      <img
        src={verseBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Layer 2: surface/card (#F3EDE3) at 80% opacity (on top, mutes the texture) */}
      <motion.div
        className="absolute inset-0 bg-surface-card"
        initial={{ opacity: 0.8 }}
        animate={shimmerControls}
      />

      {/* Content on top of backgrounds */}
      <span className="relative font-body text-[13px] font-normal text-ink-default opacity-70">
        {label}
      </span>

      <p className="relative font-body text-[13px] font-normal text-ink-default leading-[1.5]">
        {text}
      </p>

      <div className="relative flex items-center justify-between gap-[8px] w-full">
        {/* Action icons */}
        <div className="flex items-center gap-[10px]">
          <div className="flex flex-col items-center justify-center w-[44px]">
            <motion.div
              className="cursor-pointer"
              animate={heartControls}
              onTap={handleLikeTap}
            >
              <Heart
                size={22}
                weight={liked ? "fill" : "light"}
                className="text-accent-default"
              />
            </motion.div>
            <span className="font-body text-[12px] font-semibold text-ink-default">
              {liked ? likes + 1 : likes}
            </span>
          </div>
          <ActionIcon icon={ShareNetwork} count={shares} />
          <ActionIcon icon={ChatCentered} count={comments} />
        </div>

        {/* Reference */}
        <span className="font-body text-[13px] font-normal text-ink-default leading-[1.5] text-right">
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
