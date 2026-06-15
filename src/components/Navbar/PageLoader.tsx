"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getNeonColor, getStyles } from "@/lib/navbarUtils";

interface PageLoaderProps {
  pathname: string;
}

type LoaderPhase = "loading" | "leaving" | "done";

const MINIMUM_DISPLAY_MS = 1100;
const READINESS_TIMEOUT_MS = 10000;

const routeDetails: Record<
  string,
  { index: string; label: string; note: string }
> = {
  "/": {
    index: "00",
    label: "Home",
    note: "Choose a direction",
  },
  "/landing": {
    index: "01",
    label: "Landing",
    note: "Creative engineering",
  },
  "/about": {
    index: "02",
    label: "About",
    note: "Code, production, gaming",
  },
  "/portfolio": {
    index: "03",
    label: "Portfolio",
    note: "Selected builds and experience",
  },
  "/services": {
    index: "04",
    label: "Services",
    note: "Ways to build together",
  },
  "/contact": {
    index: "05",
    label: "Contact",
    note: "Open a project channel",
  },
};

const nextFrame = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    window.addEventListener("load", () => resolve(), { once: true });
  });

const waitForFonts = async () => {
  if ("fonts" in document) {
    await document.fonts.ready;
  }
};

const waitForImage = (image: HTMLImageElement) =>
  new Promise<void>((resolve) => {
    if (image.complete) {
      resolve();
      return;
    }

    const finish = () => resolve();
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });

const waitForPageImages = async () => {
  await nextFrame();
  await nextFrame();

  const images = Array.from(document.images).filter((image) => {
    if (image.closest("[data-page-loader]")) {
      return false;
    }

    if (image.loading !== "lazy") {
      return true;
    }

    const bounds = image.getBoundingClientRect();
    return (
      bounds.bottom >= 0 &&
      bounds.top <= window.innerHeight &&
      bounds.right >= 0 &&
      bounds.left <= window.innerWidth
    );
  });

  await Promise.all(images.map(waitForImage));
};

const waitForBackground = (pathname: string) => {
  const match = getStyles(pathname).backgroundImage.match(
    /url\((?:"|')?([^"')]+)(?:"|')?\)/,
  );

  if (!match?.[1]) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = match[1];

    if (image.complete) {
      resolve();
    }
  });
};

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

const PageLoader: React.FC<PageLoaderProps> = ({ pathname }) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [progress, setProgress] = useState(8);
  const details = useMemo(
    () =>
      routeDetails[pathname] ?? {
        index: "--",
        label:
          pathname
            .split("/")
            .filter(Boolean)
            .at(-1)
            ?.replaceAll("-", " ") || "Home",
        note: "Loading destination",
      },
    [pathname],
  );
  const neon = pathname === "/" ? "#f4f4f5" : getNeonColor(pathname) || "#ffffff";

  useEffect(() => {
    let active = true;
    const startedAt = performance.now();

    const updateProgress = (value: number) => {
      if (active) {
        setProgress((current) => Math.max(current, value));
      }
    };

    const preparePage = async () => {
      await nextFrame();
      updateProgress(24);

      const readiness = Promise.all([
        waitForWindowLoad().then(() => updateProgress(42)),
        waitForFonts().then(() => updateProgress(62)),
        waitForBackground(pathname).then(() => updateProgress(78)),
        waitForPageImages().then(() => updateProgress(92)),
      ]);

      await Promise.race([readiness, wait(READINESS_TIMEOUT_MS)]);

      const elapsed = performance.now() - startedAt;
      if (elapsed < MINIMUM_DISPLAY_MS) {
        await wait(MINIMUM_DISPLAY_MS - elapsed);
      }

      if (!active) {
        return;
      }

      setProgress(100);
      await wait(reduceMotion ? 0 : 180);

      if (active) {
        setPhase("leaving");
      }
    };

    preparePage();

    return () => {
      active = false;
    };
  }, [pathname, reduceMotion]);

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.removeAttribute("aria-busy");
      return;
    }

    document.documentElement.setAttribute("aria-busy", "true");

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const holdKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", holdKeyboard);

    return () => {
      document.documentElement.removeAttribute("aria-busy");
      document.removeEventListener("keydown", holdKeyboard);
    };
  }, [phase]);

  if (phase === "done") {
    return null;
  }

  return (
    <motion.div
      animate={
        phase === "leaving"
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      aria-label={`Loading ${details.label} page`}
      aria-live="polite"
      className={`page-loader ${phase === "leaving" ? "is-leaving" : ""}`}
      data-page-loader
      initial={false}
      onAnimationComplete={() => {
        if (phase === "leaving") {
          setPhase("done");
        }
      }}
      role="status"
      style={{ "--loader-accent": neon } as CSSProperties}
      transition={{
        delay: phase === "leaving" && !reduceMotion ? 0.28 : 0,
        duration: reduceMotion ? 0 : 0.44,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div className="page-loader-panel page-loader-panel-left" />
      <div className="page-loader-panel page-loader-panel-right" />

      <div className="page-loader-grid" aria-hidden="true" />
      <div className="page-loader-glow" aria-hidden="true" />

      <div aria-hidden="true" className="page-loader-topline">
        <span>AJ4200 / Route transmission</span>
        <span>{details.index} / 05</span>
      </div>

      <div aria-hidden="true" className="page-loader-content">
        <span className="page-loader-kicker">Now entering</span>
        <div className="page-loader-title-wrap">
          <span className="page-loader-slash" aria-hidden="true">
            /
          </span>
          <h1 className={details.label.length > 8 ? "is-long" : undefined}>
            {details.label}
          </h1>
          <span
            className={`page-loader-ghost ${
              details.label.length > 8 ? "is-long" : ""
            }`}
            aria-hidden="true"
          >
            {details.label}
          </span>
        </div>
        <p>{details.note}</p>
      </div>

      <div aria-hidden="true" className="page-loader-footer">
        <div className="page-loader-status">
          <span className="page-loader-pulse" aria-hidden="true" />
          <span>{progress === 100 ? "Route ready" : "Preparing interface"}</span>
        </div>
        <span className="page-loader-percentage">{progress}%</span>
        <div className="page-loader-progress" aria-hidden="true">
          <motion.span
            animate={{ scaleX: progress / 100 }}
            initial={false}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
