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

// Card textures (TopicCardStack)
import texture0 from "./images/textures/texture 1.0.png";
import texture1 from "./images/textures/texture 1.1.png";
import texture2 from "./images/textures/texture 1.2.png";
import texture3 from "./images/textures/texture 1.3.png";
import texture4 from "./images/textures/texture 1.4.png";
import texture5 from "./images/textures/texture 1.5.png";
import texture6 from "./images/textures/texture 1.6.png";
import texture7 from "./images/textures/texture 1.7.png";

// Testimony avatars
import sarahAvatar from "./images/dp for testimonies/sarah.png";
import davidAvatar from "./images/dp for testimonies/david.png";
import graceAvatar from "./images/dp for testimonies/grace dp.png";

// Article/video thumbnails
import articleThumb1 from "./images/article thumbnails/article image 1.1.png";
import articleThumb2 from "./images/article thumbnails/article image 2.1.png";
import articleThumb3 from "./images/article thumbnails/article image 3.1.png";
import articleThumb4 from "./images/article thumbnails/article image 4.1.png";
import videoThumb1 from "./images/video thumbnails/video image 1.5.png";
import videoThumb2 from "./images/video thumbnails/video image 2.5.png";
import videoThumb3 from "./images/video thumbnails/video image 3.5.png";
import videoThumb4 from "./images/video thumbnails/video image 4.5.png";

// No-shadow textures (detail page cards)
import nsTexture0 from "./images/no shadow texture/ns texture 1.0.png";
import nsTexture1 from "./images/no shadow texture/ns texture 1.1.png";
import nsTexture2 from "./images/no shadow texture/ns texture 1.2.png";
import nsTexture3 from "./images/no shadow texture/ns texture 1.3.png";
import nsTexture4 from "./images/no shadow texture/ns texture 1.4.png";
import nsTexture5 from "./images/no shadow texture/ns texture 1.5.png";
import nsTexture6 from "./images/no shadow texture/ns texture 1.6.png";
import nsTexture7 from "./images/no shadow texture/ns texture 1.7.png";

const CRITICAL_IMAGES = [
  // Verse bg
  verseBackground,
  // Card textures
  texture0, texture1, texture2, texture3, texture4, texture5, texture6, texture7,
  // Topic icons
  loveIcon, faithIcon, sinIcon, theologyIcon, graceIcon, prayerIcon,
  forgivenessIcon, hopeIcon, mercyIcon, wisdomIcon, redemptionIcon, worshipIcon,
  // Avatars
  sarahAvatar, davidAvatar, graceAvatar,
  // Article thumbs
  articleThumb1, articleThumb2, articleThumb3, articleThumb4,
  // Video thumbs
  videoThumb1, videoThumb2, videoThumb3, videoThumb4,
  // NS textures
  nsTexture0, nsTexture1, nsTexture2, nsTexture3, nsTexture4, nsTexture5, nsTexture6, nsTexture7,
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
          {allImagesLoaded ? (
            <>
              <div className="px-[24px] pt-[30px] pb-[30px] flex flex-col gap-[36px]">
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
