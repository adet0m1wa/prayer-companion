import { useEffect } from "react";
import { motion, useAnimate, usePresence, useReducedMotion } from "framer-motion";
import { SharedTopicIcon } from "../shared/SharedTopicIcon";

interface TransitionLoaderProps {
  topicId: string;
  iconSrc: string;
  verse?: string;
  reference?: string;
  onComplete: () => void;
}

export function TransitionLoader({
  topicId,
  iconSrc,
  verse = "And now these three remain: faith, hope and love. But the greatest of these is love.",
  reference = "1 Corinthians 13:13",
  onComplete,
}: TransitionLoaderProps) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    let cancelled = false;

    const sequence = async () => {
      // Wait for layoutId heart to settle into center (~500ms tween)
      await new Promise<void>((resolve) => setTimeout(resolve, 450));
      if (cancelled) return;

      // Text staggers in with overlap
      const versePromise = animate(
        "[data-loader-verse]",
        { opacity: 1, y: 0 },
        { duration: 0.35, ease: "easeOut" as const },
      );

      await new Promise<void>((resolve) => setTimeout(resolve, 200));
      if (cancelled) return;

      const refPromise = animate(
        "[data-loader-reference]",
        { opacity: 1, y: 0 },
        { duration: 0.35, ease: "easeOut" as const },
      );

      await Promise.all([versePromise, refPromise]);
      if (cancelled) return;

      // Hold for 1 second
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      if (cancelled) return;

      // Exit — staggered upward cascade: heart → verse → reference
      animate(
        "[data-loader-icon]",
        { opacity: 0, y: -10 },
        { duration: 0.2, ease: "easeIn" as const },
      );

      await new Promise<void>((resolve) => setTimeout(resolve, 100));
      if (cancelled) return;

      animate(
        "[data-loader-verse]",
        { opacity: 0, y: -10 },
        { duration: 0.2, ease: "easeIn" as const },
      );

      await new Promise<void>((resolve) => setTimeout(resolve, 100));
      if (cancelled) return;

      await animate(
        "[data-loader-reference]",
        { opacity: 0, y: -10 },
        { duration: 0.2, ease: "easeIn" as const },
      );
      if (cancelled) return;

      onComplete();
    };

    sequence();

    return () => {
      cancelled = true;
    };
  }, [animate, onComplete, prefersReducedMotion]);

  useEffect(() => {
    if (!isPresent) {
      safeToRemove();
    }
  }, [isPresent, safeToRemove]);

  return (
    <div ref={scope} className="absolute inset-0 bg-surface-canvas overflow-hidden">
      {/* Heart icon — absolutely centered, wrapped for exit animation */}
      <motion.div
        data-loader-icon
        className="absolute inset-0 flex items-center justify-center"
      >
        <SharedTopicIcon src={iconSrc} size={60} topicId={topicId} />
      </motion.div>

      {/* Text group — positioned below center point */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center gap-[10px]"
        style={{ paddingLeft: "var(--app-px)", paddingRight: "var(--app-px)", top: "calc(50% + 45px)" }}
      >
        <motion.p
          data-loader-verse
          className="font-heading text-[16px] font-semibold italic text-ink-default text-center w-full"
          initial={{ opacity: 0, y: 10 }}
        >
          {verse}
        </motion.p>
        <motion.span
          data-loader-reference
          className="font-body text-[12px] font-normal text-ink-default opacity-70 text-center"
          initial={{ opacity: 0, y: 10 }}
        >
          {reference}
        </motion.span>
      </div>
    </div>
  );
}
