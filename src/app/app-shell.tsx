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

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
      <PageLoader key={currentPath} pathname={currentPath} />
      {children}
      <Cursor />
      <Chatbot />
    </MotionConfig>
  );
}
