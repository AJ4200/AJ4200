"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCompress,
  FaExpand,
  FaExternalLinkAlt,
  FaGamepad,
} from "react-icons/fa";

const ARCADE_URL = "https://baturo-arena.vercel.app/";

const Game: React.FC = () => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await shellRef.current?.requestFullscreen();
  };

  return (
    <div>
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.25em] text-emerald-300">
            <FaGamepad />
            03 / In-house arcade platform
          </span>
          <h3 className="mt-3 text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl">
            Enter
            <span className="block text-emerald-300">Baturo Arena.</span>
          </h3>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-sm leading-7 text-white/50">
            An online arcade I built around original games and custom engines.
            It is part platform, part engine lab, and part playground. Play
            directly here, take over the screen, or launch it in its own window.
          </p>
          <span className="mt-4 inline-flex w-fit border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-emerald-200">
            Live platform / Original games / Custom engines
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
                  Baturo Arena
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
                className="arcade-control"
                href={ARCADE_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaExternalLinkAlt />
                <span className="hidden sm:inline">New window</span>
              </a>
            </div>
          </header>

          <div className="arcade-viewport">
            {!isLoaded && (
              <div className="arcade-loading" role="status">
                <FaGamepad />
                <span>Booting Baturo Arena...</span>
              </div>
            )}
            <iframe
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              allowFullScreen
              className="arcade-frame"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              referrerPolicy="strict-origin-when-cross-origin"
              src={ARCADE_URL}
              title="Baturo Arena online arcade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
