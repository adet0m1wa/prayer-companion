import {
  House,
  Users,
  BookOpen,
  Heart,
  User,
  type Icon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

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

interface BottomNavProps {
  showShadow?: boolean;
}

export function BottomNav({ showShadow = false }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 w-full bg-surface-card relative" style={{ paddingBottom: "env(safe-area-inset-bottom, 10px)" }}>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.05)" }}
        animate={{ opacity: showShadow ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <div className="w-full h-[70px] flex items-center justify-between" style={{ paddingLeft: "var(--app-px)", paddingRight: "var(--app-px)" }}>
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
      </div>
    </nav>
  );
}
