"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import Chatbot from "@/components/Chatbot/Chatbot";
import PageLoader from "@/components/Navbar/PageLoader";
import Cursor from "@/components/Utils/Cursor";
import { getNeonColor, getStyles } from "@/lib/navbarUtils";

export default function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncMotion = () => setReduceMotion(root.hasAttribute("data-reduce-motion"));
    const observer = new MutationObserver(syncMotion);
    observer.observe(root, { attributes: true, attributeFilter: ["data-reduce-motion"] });
    syncMotion();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const styles = getStyles(currentPath);
    document.body.style.backgroundImage = styles.backgroundImage;
    document.body.style.fontFamily = styles.fontFamily;
    document.documentElement.style.setProperty("--neon", getNeonColor(currentPath));
  }, [currentPath]);

  useEffect(() => {
    let active = true;
    const color =
      currentPath === "/" ? "#ffffff" : getNeonColor(currentPath) || "#ffffff";
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (!favicon) {
      return;
    }

    fetch("/github-favicon.svg")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load favicon: ${response.status}`);
        }
        return response.text();
      })
      .then((svg) => {
        if (!active) {
          return;
        }

        const themedSvg = svg.replace(/#f0abfc/g, color);
        favicon.href = `data:image/svg+xml,${encodeURIComponent(themedSvg)}`;
      })
      .catch((error: unknown) => {
        console.error("Unable to update the favicon for the active page.", error);
      });

    return () => {
      active = false;
    };
  }, [currentPath]);

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
      <PageLoader key={currentPath} pathname={currentPath} />
      {children}
      <Cursor />
      <Chatbot />
    </MotionConfig>
  );
}
