"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import PageIndicator from "../Utils/PageIndicator";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  textColor: string;
  number: string;
  description: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
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
      >
        <span className="site-nav-number">{number}</span>
        <span className={`site-nav-label ${textColor}`}>{children}</span>
        <span className="site-nav-description">{description}</span>
      </Link>

      <AnimatePresence>
        {showRoute && (
          <PageIndicator route={to} textColor={textColor} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavLink;
