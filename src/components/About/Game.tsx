"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  FaCompress,
  FaExpand,
  FaExternalLinkAlt,
  FaGamepad,
} from "react-icons/fa";

const platforms = [
  {
    id: "baturo",
    name: "Baturo Arena",
    url: "https://baturo-arena.vercel.app/",
    eyebrow: "In-house arcade platform",
    description:
      "An online arcade I built around original games and custom engines. It is part platform, part engine lab, and part playground.",
    signal: "Live platform / Original games / Custom engines",
    title: "Baturo Arena online arcade",
  },
  {
    id: "flashback",
    name: "FlashBack Machine",
    url: "https://flashback-machine.vercel.app/",
    eyebrow: "Browser retro arcade",
    description:
      "A browser-based collection of emulators and games. Explore retro platforms, play in your browser, and cache supported games and runtimes for offline play.",
    signal: "Browser emulators / Retro games / Offline play",
    title: "FlashBack Machine browser arcade",
  },
] as const;

type Platform = (typeof platforms)[number];
type PlatformId = Platform["id"];

const Arcade: React.FC<{ platform: Platform }> = ({ platform }) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === shellRef.current) {
        await document.exitFullscreen();
      } else if (shellRef.current) {
        await shellRef.current.requestFullscreen();
      }
      setFullscreenError(false);
    } catch (error) {
      console.error("Unable to change arcade fullscreen mode", error);
      setFullscreenError(true);
    }
  };

  return (
    <>
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.25em] text-emerald-300">
            <FaGamepad />
            03 / {platform.eyebrow}
          </span>
          <h3 className="mt-3 text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl">
            Enter
            <span className="block text-emerald-300">{platform.name}.</span>
          </h3>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-sm leading-7 text-white/50">
            {platform.description} Play directly here, take over the screen, or
            launch it in its own window.
          </p>
          <span className="mt-4 inline-flex w-fit border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-emerald-200">
            {platform.signal}
          </span>
        </div>
      </div>

      <div className="arcade-bleed">
        <div className="arcade-shell" ref={shellRef}>
          <header className="arcade-toolbar">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex size-3 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
              </span>
              <div className="min-w-0">
                <span className="block truncate text-xs font-black uppercase tracking-[0.2em] text-white">
                  {platform.name}
                </span>
                <span className="block truncate text-[0.55rem] uppercase tracking-[0.15em] text-white/35">
                  Arcade session embedded
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="arcade-control"
                onClick={toggleFullscreen}
                type="button"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
                <span className="hidden sm:inline">
                  {isFullscreen ? "Exit" : "Fullscreen"}
                </span>
              </button>
              <a
                aria-label={`Open ${platform.name} in a new window`}
                className="arcade-control"
                href={platform.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaExternalLinkAlt />
                <span className="hidden sm:inline">New window</span>
              </a>
            </div>
          </header>

          {fullscreenError && (
            <p className="px-4 py-2 text-sm text-white" role="alert">
              Fullscreen is unavailable. You can open the arcade in a new window.
            </p>
          )}
          <div className="arcade-viewport">
            {!isLoaded && (
              <div className="arcade-loading" role="status">
                <FaGamepad />
                <span>Booting {platform.name}...</span>
              </div>
            )}
            <iframe
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              allowFullScreen
              className="arcade-frame"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              referrerPolicy="strict-origin-when-cross-origin"
              src={platform.url}
              title={platform.title}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Game: React.FC = () => {
  const [active, setActive] = useState<PlatformId>("baturo");
  const [visited, setVisited] = useState<PlatformId[]>(["baturo"]);

  const selectPlatform = (id: PlatformId) => {
    setActive(id);
    setVisited((current) => current.includes(id) ? current : [...current, id]);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = platforms[(index + direction + platforms.length) % platforms.length];
    selectPlatform(next.id);
    document.getElementById(`arcade-${next.id}-tab`)?.focus();
  };

  return (
    <div>
      <div aria-label="Gaming platforms" className="mb-10 flex flex-wrap gap-3" role="tablist">
        {platforms.map((platform, index) => (
          <button
            aria-controls={`arcade-${platform.id}-panel`}
            aria-selected={active === platform.id}
            className={`border px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] transition ${
              active === platform.id
                ? "border-emerald-300 bg-emerald-400/15 text-emerald-200"
                : "border-white/15 bg-black/30 text-white/55 hover:border-emerald-400/60 hover:text-white"
            }`}
            id={`arcade-${platform.id}-tab`}
            key={platform.id}
            onClick={() => selectPlatform(platform.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            role="tab"
            tabIndex={active === platform.id ? 0 : -1}
            type="button"
          >
            {platform.name}
          </button>
        ))}
      </div>
      {platforms.map((platform) => (
        <div
          aria-labelledby={`arcade-${platform.id}-tab`}
          hidden={active !== platform.id}
          id={`arcade-${platform.id}-panel`}
          key={platform.id}
          role="tabpanel"
        >
          {visited.includes(platform.id) && <Arcade platform={platform} />}
        </div>
      ))}
    </div>
  );
};

export default Game;
