import { useState } from "react";
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
          </div>
          <BottomNav />
        </>
      )}
      <Agentation />
    </div>
  );
}
