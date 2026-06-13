"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Chatbot from "@/components/Chatbot/Chatbot";
import PageLoader from "@/components/Navbar/PageLoader";
import Cursor from "@/components/Utils/Cursor";
import { getNeonColor, getStyles } from "@/lib/navbarUtils";

export default function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  useEffect(() => {
    const styles = getStyles(currentPath);
    document.body.style.backgroundImage = styles.backgroundImage;
    document.body.style.fontFamily = styles.fontFamily;
    document.documentElement.style.setProperty("--neon", getNeonColor(currentPath));
  }, [currentPath]);

  return (
    <>
      <PageLoader key={currentPath} />
      {children}
      <Cursor />
      <Chatbot />
    </>
  );
}
