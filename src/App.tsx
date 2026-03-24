import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { LayoutGroup, AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Agentation = import.meta.env.DEV
  ? lazy(() => import("agentation").then((m) => ({ default: m.Agentation })))
  : () => null;
import { GreetingHeader } from "./components/dashboard/GreetingHeader";
import { VerseCard } from "./components/dashboard/VerseCard";
import { TopicCardStack } from "./components/dashboard/TopicCardStack";
import { TestimoniesSection } from "./components/dashboard/TestimoniesSection";
import { BottomNav } from "./components/shared/BottomNav";
import { TransitionLoader } from "./components/screens/TransitionLoader";
import { TopicDetailPage } from "./components/screens/TopicDetailPage";

import loveIcon from "./images/images for understanding aspect/love.png";
import faithIcon from "./images/images for understanding aspect/faith.png";
import sinIcon from "./images/images for understanding aspect/sin.png";
import theologyIcon from "./images/images for understanding aspect/theology.png";
import graceIcon from "./images/images for understanding aspect/grace.png";
import prayerIcon from "./images/images for understanding aspect/prayer.png";
import forgivenessIcon from "./images/images for understanding aspect/forgiveness.png";
import hopeIcon from "./images/images for understanding aspect/hope.png";
import mercyIcon from "./images/images for understanding aspect/mercy.png";
import wisdomIcon from "./images/images for understanding aspect/wisdom.png";
import redemptionIcon from "./images/images for understanding aspect/redemption.png";
import worshipIcon from "./images/images for understanding aspect/worship.png";

const TOPIC_ICONS: Record<string, string> = {
  love: loveIcon,
  faith: faithIcon,
  sin: sinIcon,
  theology: theologyIcon,
  grace: graceIcon,
  prayer: prayerIcon,
  forgiveness: forgivenessIcon,
  hope: hopeIcon,
  mercy: mercyIcon,
  wisdom: wisdomIcon,
  redemption: redemptionIcon,
  worship: worshipIcon,
};

type Screen = "dashboard" | "loader" | "detail";

export function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [selectedTopic, setSelectedTopic] = useState("love");
  const [dashboardHidden, setDashboardHidden] = useState(false);
  const [sentinelVisible, setSentinelVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

  // Step 1: Card tap — hide dashboard, go to loader
  const handleCardClick = useCallback(
    (topicId: string) => {
      setSelectedTopic(topicId);
      if (prefersReducedMotion) {
        setScreen("detail");
      } else {
        setDashboardHidden(true);
        setScreen("loader");
      }
    },
    [prefersReducedMotion],
  );

  // Step 7: Loader complete — go to detail
  const handleLoaderComplete = useCallback(() => {
    setScreen("detail");
  }, []);

  // Step 9: Back — fade detail out, restore dashboard
  const handleBack = useCallback(() => {
    setScreen("dashboard");
    setDashboardHidden(false);
  }, []);

  const selectedIconSrc = TOPIC_ICONS[selectedTopic] ?? TOPIC_ICONS.love;

  return (
    <LayoutGroup>
      <div
        className={`mx-auto max-w-[402px] bg-surface-canvas flex flex-col relative ${
          screen === "dashboard" ? "min-h-screen" : "h-screen overflow-hidden"
        }`}
      >
        {/* Dashboard — always mounted, visibility toggled */}
        <div
          className="flex flex-col flex-1"
          style={{ visibility: dashboardHidden || screen !== "dashboard" ? "hidden" : "visible" }}
        >
          <div className="px-[24px] pt-[30px] pb-[30px] flex flex-col gap-[36px]">
            <GreetingHeader />
            <VerseCard />
            <TopicCardStack onCardClick={handleCardClick} />
            <TestimoniesSection />
          </div>
          <div ref={sentinelRef} className="h-px w-full shrink-0" />
          <BottomNav showShadow={showShadow} />
        </div>

        {/* Overlay screens — loader and detail page */}
        <AnimatePresence>
          {screen === "loader" && (
            <TransitionLoader
              key="loader"
              topicId={selectedTopic}
              iconSrc={selectedIconSrc}
              onComplete={handleLoaderComplete}
            />
          )}
          {screen === "detail" && (
            <motion.div
              key="detail"
              className="absolute inset-0 bg-surface-canvas"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeIn" as const }}
            >
              <TopicDetailPage
                topicId={selectedTopic}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Suspense fallback={null}><Agentation /></Suspense>
      </div>
    </LayoutGroup>
  );
}
