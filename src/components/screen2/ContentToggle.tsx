interface ContentToggleProps {
  active: "articles" | "videos";
  onToggle: (tab: "articles" | "videos") => void;
}

export function ContentToggle({ active, onToggle }: ContentToggleProps) {
  return (
    <div className="flex items-start gap-[20px] w-full">
      <TabItem
        label="Articles"
        isActive={active === "articles"}
        onClick={() => onToggle("articles")}
      />
      <TabItem
        label="Videos"
        isActive={active === "videos"}
        onClick={() => onToggle("videos")}
      />
    </div>
  );
}

function TabItem({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-[4px]"
    >
      <span
        className={
          isActive
            ? "font-heading text-[16px] font-semibold text-ink-default"
            : "font-body text-[16px] font-normal text-ink-default opacity-70"
        }
      >
        {label}
      </span>
      {isActive && (
        <div className="w-full h-[2px] rounded-[1px] bg-accent-default" />
      )}
    </button>
  );
}
