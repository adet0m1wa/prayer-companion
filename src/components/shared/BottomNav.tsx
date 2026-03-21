import {
  House,
  Users,
  BookOpen,
  Heart,
  User,
  type Icon,
} from "@phosphor-icons/react";

interface NavTab {
  label: string;
  icon: Icon;
  filledIcon?: Icon;
  active?: boolean;
}

const TABS: NavTab[] = [
  { label: "HOME", icon: House, active: true },
  { label: "COMMUNITY", icon: Users },
  { label: "BIBLE", icon: BookOpen },
  { label: "FAVORITES", icon: Heart },
  { label: "YOU", icon: User },
];

export function BottomNav() {
  return (
    <nav
      className="sticky bottom-0 w-full h-[70px] bg-surface-card flex items-center justify-between px-[24px]"
      style={{ boxShadow: "0 -2px 4px #0000000d" }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.label}
          className="flex flex-col items-center justify-center gap-[2px]"
          style={{ opacity: tab.active ? 1 : 0.5 }}
        >
          <tab.icon
            size={22}
            weight={tab.active ? "fill" : "regular"}
            className={tab.active ? "text-accent-default" : "text-ink-default"}
          />
          <span
            className={`font-body text-[10px] font-semibold tracking-[0.5px] ${
              tab.active ? "text-accent-default" : "text-ink-default"
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
