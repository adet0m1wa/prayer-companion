interface TestimonyCardProps {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

export function TestimonyCard({
  avatarSrc,
  name,
  handle,
  text,
}: TestimonyCardProps) {
  return (
    <div className="flex flex-col gap-[16px] rounded-[12px] bg-surface-card p-[16px] w-full">
      {/* Header: avatar + name column */}
      <div className="flex items-center gap-[10px] w-full">
        <img
          src={avatarSrc}
          alt={name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[2px]">
          <span className="font-heading text-[16px] font-semibold italic text-ink-default">
            {name}
          </span>
          <span className="font-body text-[13px] font-normal text-ink-default opacity-70">
            {handle}
          </span>
        </div>
      </div>

      {/* Body text */}
      <p className="font-body text-[13px] font-normal text-ink-default leading-[1.5]">
        {text}
      </p>
    </div>
  );
}
