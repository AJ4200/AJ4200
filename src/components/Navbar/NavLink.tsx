"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { type CSSProperties, useState, type ReactNode } from "react";
import { getNeonColor } from "@/lib/navbarUtils";
import PageIndicator from "../Utils/PageIndicator";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  label: string;
  textColor: string;
  number: string;
  description: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  label,
  textColor,
  number,
  description,
  active,
}) => {
  const [showRoute, setShowRoute] = useState(false);

  return (
    <>
      <Link
        aria-current={active ? "page" : undefined}
        className={`site-nav-link ${active ? "is-active" : ""}`}
        href={to}
        onBlur={() => setShowRoute(false)}
        onFocus={() => setShowRoute(true)}
        onMouseEnter={() => setShowRoute(true)}
        onMouseLeave={() => setShowRoute(false)}
        style={
          {
            "--nav-link-accent": getNeonColor(to) || "#ffffff",
          } as CSSProperties
        }
      >
        <span className="site-nav-number">{number}</span>
        <span className={`site-nav-label ${textColor}`}>{children}</span>
        <span className="site-nav-description">{description}</span>
      </Link>

      <AnimatePresence>
        {showRoute && (
          <PageIndicator
            description={description}
            label={label}
            number={number}
            route={to}
            textColor={textColor}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavLink;
