import { useState } from "react";

type Screen = "dashboard" | "loader" | "article" | "video";

export function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  return (
    <div className="mx-auto max-w-[402px] min-h-screen bg-surface-canvas">
      {screen === "dashboard" && (
        <DashboardPlaceholder onNavigate={setScreen} />
      )}
      {screen === "loader" && (
        <LoaderPlaceholder onNavigate={setScreen} />
      )}
      {screen === "article" && (
        <ArticlePlaceholder onNavigate={setScreen} />
      )}
      {screen === "video" && (
        <VideoPlaceholder onNavigate={setScreen} />
      )}
    </div>
  );
}

function DashboardPlaceholder({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-6">
      <h1 className="font-heading text-[22px] font-bold text-ink-default">
        Screen 1 — Dashboard
      </h1>
      <p className="font-body text-sm text-ink-default/70 text-center leading-relaxed">
        Daily View with greeting, verse, aspects, testimonies, and bottom nav.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => onNavigate("loader")}
          className="px-4 py-2 rounded-[12px] bg-surface-card text-ink-default font-body text-sm"
        >
          Loader
        </button>
        <button
          onClick={() => onNavigate("article")}
          className="px-4 py-2 rounded-[12px] bg-surface-card text-ink-default font-body text-sm"
        >
          Articles
        </button>
        <button
          onClick={() => onNavigate("video")}
          className="px-4 py-2 rounded-[12px] bg-surface-card text-ink-default font-body text-sm"
        >
          Videos
        </button>
      </div>
    </div>
  );
}

function LoaderPlaceholder({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen gap-6 px-6 cursor-pointer"
      onClick={() => onNavigate("article")}
    >
      <h1 className="font-heading text-[16px] font-semibold italic text-ink-default">
        Screen 2 — Transition Loader
      </h1>
      <p className="font-body text-sm text-ink-default/70 text-center">
        Tap to continue to articles
      </p>
    </div>
  );
}

function ArticlePlaceholder({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-6">
      <h1 className="font-heading text-[22px] font-bold text-ink-default">
        Screen 3 — Articles
      </h1>
      <p className="font-body text-sm text-ink-default/70 text-center">
        Topic detail view with article cards.
      </p>
      <button
        onClick={() => onNavigate("dashboard")}
        className="px-4 py-2 rounded-[12px] bg-surface-card text-ink-default font-body text-sm"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

function VideoPlaceholder({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-6">
      <h1 className="font-heading text-[22px] font-bold text-ink-default">
        Screen 4 — Videos
      </h1>
      <p className="font-body text-sm text-ink-default/70 text-center">
        Topic detail view with video cards.
      </p>
      <button
        onClick={() => onNavigate("dashboard")}
        className="px-4 py-2 rounded-[12px] bg-surface-card text-ink-default font-body text-sm"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
