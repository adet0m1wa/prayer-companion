import { Fire, Bell } from "@phosphor-icons/react";

interface GreetingHeaderProps {
  name?: string;
  streak?: number;
}

export function GreetingHeader({
  name = "Jamie",
  streak = 7,
}: GreetingHeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex items-center justify-between w-full">
      {/* Greeting text — fixed width so it wraps to two lines like the design */}
      <span className="font-heading text-[22px] font-bold text-ink-default leading-tight w-[170px]">
        {greeting}, {name}
      </span>

      {/* Right — streak + alerts */}
      <div className="flex items-center gap-[16px] h-[22px]">
        {/* Streak: fire icon + count */}
        <div className="flex items-center gap-[2px]">
          <Fire size={22} weight="fill" className="text-accent-default" />
          <span className="font-body text-[10px] font-semibold tracking-[0.5px] text-ink-default">
            {streak}
          </span>
        </div>

        {/* Alerts bell */}
        <div className="flex items-center justify-center opacity-50">
          <Bell size={22} className="text-ink-default" />
        </div>
      </div>
    </div>
  );
}
