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
import { useImagePreloader } from "./hooks/useImagePreloader";

// Topic icons
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

// Verse background
import verseBackground from "./images/verse of the day background/verse of the day.png";

// Above-fold textures (preloaded before render)
import texture0 from "./images/textures/texture 1.0.webp";
import texture1 from "./images/textures/texture 1.1.webp";
import texture2 from "./images/textures/texture 1.2.webp";
import texture3 from "./images/textures/texture 1.3.webp";

// Detail page images (background preloaded after dashboard renders)
import articleThumb1 from "./images/article thumbnails/article image 1.1.png";
import articleThumb2 from "./images/article thumbnails/article image 2.1.png";
import articleThumb3 from "./images/article thumbnails/article image 3.1.png";
import articleThumb4 from "./images/article thumbnails/article image 4.1.png";
import videoThumb1 from "./images/video thumbnails/video image 1.5.png";
import videoThumb2 from "./images/video thumbnails/video image 2.5.png";
import videoThumb3 from "./images/video thumbnails/video image 3.5.png";
import videoThumb4 from "./images/video thumbnails/video image 4.5.png";
import nsTexture0 from "./images/no shadow texture/ns texture 1.0.webp";
import nsTexture1 from "./images/no shadow texture/ns texture 1.1.webp";
import nsTexture2 from "./images/no shadow texture/ns texture 1.2.webp";
import nsTexture3 from "./images/no shadow texture/ns texture 1.3.webp";
import nsTexture4 from "./images/no shadow texture/ns texture 1.4.webp";
import nsTexture5 from "./images/no shadow texture/ns texture 1.5.webp";
import nsTexture6 from "./images/no shadow texture/ns texture 1.6.webp";
import nsTexture7 from "./images/no shadow texture/ns texture 1.7.webp";

// Above-fold images only — verse card bg + first page topic card textures/icons
const CRITICAL_IMAGES = [
  verseBackground,
  texture0, texture1, texture2, texture3,
  loveIcon, faithIcon, sinIcon, theologyIcon,
];

// Detail page images — preloaded in background after dashboard renders
const DETAIL_IMAGES = [
  articleThumb1, articleThumb2, articleThumb3, articleThumb4,
  videoThumb1, videoThumb2, videoThumb3, videoThumb4,
  nsTexture0, nsTexture1, nsTexture2, nsTexture3,
  nsTexture4, nsTexture5, nsTexture6, nsTexture7,
];

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
  const allImagesLoaded = useImagePreloader(CRITICAL_IMAGES);

  // Background preload detail page images after dashboard is visible
  useEffect(() => {
    if (!allImagesLoaded) return;
    const preload = () => {
      DETAIL_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(preload);
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(preload, 1000);
      return () => clearTimeout(id);
    }
  }, [allImagesLoaded]);

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
        className={`mx-auto w-full min-w-[360px] max-w-[460px] bg-surface-canvas flex flex-col relative ${
          screen === "dashboard" ? "min-h-screen" : "h-screen overflow-hidden"
        }`}
      >
        {/* Dashboard — always mounted, visibility toggled */}
        <div
          className="flex flex-col flex-1"
          style={{ visibility: dashboardHidden || screen !== "dashboard" ? "hidden" : "visible" }}
        >
          {allImagesLoaded ? (
            <>
              <div className="flex flex-col gap-[36px]" style={{ paddingLeft: "var(--app-px)", paddingRight: "var(--app-px)", paddingTop: "calc(30px + var(--safe-top))", paddingBottom: "calc(30px + var(--nav-height))" }}>
                <GreetingHeader />
                <VerseCard />
                <TopicCardStack onCardClick={handleCardClick} />
                <TestimoniesSection />
              </div>
              <div ref={sentinelRef} className="h-px w-full shrink-0" />
              <BottomNav showShadow={showShadow} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-ink-default/20 border-t-accent-default rounded-full animate-spin" />
            </div>
          )}
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
