import loveIcon from "../../images/images for understanding aspect/love.png";

interface TransitionLoaderProps {
  iconSrc?: string;
  verse?: string;
  reference?: string;
}

export function TransitionLoader({
  iconSrc = loveIcon,
  verse = "And now these three remain: faith, hope and love. But the greatest of these is love.",
  reference = "1 Corinthians 13:13",
}: TransitionLoaderProps) {
  return (
    <div className="w-full min-h-screen bg-surface-canvas flex flex-col">
      {/* Content centered vertically and horizontally */}
      <div className="flex-1 flex items-center justify-center px-[24px]">
        <div className="flex flex-col items-center gap-[10px] w-full">
          {/* Topic icon */}
          <img
            src={iconSrc}
            alt=""
            className="w-[60px] h-[60px] object-contain"
          />

          {/* Verse group */}
          <div className="flex flex-col items-center gap-[10px] w-full">
            <p className="font-heading text-[16px] font-semibold italic text-ink-default text-center w-full">
              {verse}
            </p>
            <span className="font-body text-[12px] font-normal text-ink-default opacity-70 text-center">
              {reference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
