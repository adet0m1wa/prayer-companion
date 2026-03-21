import { useState, useRef, useEffect } from "react";
import { Agentation } from "agentation";
import { GreetingHeader } from "./components/dashboard/GreetingHeader";
import { VerseCard } from "./components/dashboard/VerseCard";
import { TopicCardStack } from "./components/dashboard/TopicCardStack";
import { TestimoniesSection } from "./components/dashboard/TestimoniesSection";
import { BottomNav } from "./components/shared/BottomNav";
import { TransitionLoader } from "./components/screens/TransitionLoader";
import { TopicDetailPage } from "./components/screens/TopicDetailPage";

type Screen = "dashboard" | "loader" | "detail";

export function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [sentinelVisible, setSentinelVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSentinelVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [screen]);

  const showShadow = !sentinelVisible;

  return (
    <div className="mx-auto max-w-[402px] min-h-screen bg-surface-canvas flex flex-col">
      {screen === "loader" ? (
        <TransitionLoader />
      ) : screen === "detail" ? (
        <TopicDetailPage onBack={() => setScreen("dashboard")} />
      ) : (
        <>
          <div className="p-[24px] flex flex-col gap-[36px] flex-1">
            <GreetingHeader />
            <VerseCard />
            <TopicCardStack onCardClick={() => setScreen("detail")} />
            <TestimoniesSection />
            <div ref={sentinelRef} className="h-px w-full shrink-0" />
          </div>
          <BottomNav showShadow={showShadow} />
        </>
      )}
      <Agentation />
    </div>
  );
}
