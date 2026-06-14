"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { getTextColor } from "@/lib/navbarUtils";

interface MobileNavbarProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home", detail: "Welcome screen" },
  { href: "/landing", label: "Landing", detail: "Profile and current work" },
  { href: "/about", label: "About", detail: "The person behind the work" },
  { href: "/portfolio", label: "Portfolio", detail: "Selected evidence" },
  { href: "/services", label: "Services", detail: "Ways to work together" },
  { href: "/contact", label: "Contact", detail: "Open a project channel" },
];

const MobileNavbar: React.FC<MobileNavbarProps> = ({ open, onClose }) => {
  const pathname = usePathname() ?? "/";
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const desktopMedia = window.matchMedia("(min-width: 768px)");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    desktopMedia.addEventListener("change", handleDesktopChange);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktopMedia.removeEventListener("change", handleDesktopChange);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-label="Mobile navigation"
      aria-modal="true"
      className="mobile-nav-dialog"
      id="mobile-navigation"
      ref={dialogRef}
      role="dialog"
    >
      <div className="mobile-nav-header">
        <Link
          aria-label="AJ4200 home"
          className="logo mobile-nav-logo"
          href="/"
          onClick={onClose}
        >
          <b>
            #a<span>j</span>4<span>2</span>00
          </b>
        </Link>
        <button
          aria-label="Close navigation menu"
          className="mobile-nav-close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <FaTimes />
        </button>
      </div>

      <div className="mobile-nav-intro">
        <span>Site navigation</span>
        <strong>Choose a world.</strong>
      </div>

      <nav aria-label="Mobile primary navigation" className="mobile-nav-links">
        {links.map(({ href, label, detail }, index) => {
          const active = pathname === href;
          const linkColor = href === "/" ? "text-white" : getTextColor(href);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`mobile-nav-link ${active ? "is-active" : ""}`}
              href={href}
              key={href}
              onClick={onClose}
            >
              <span className="mobile-nav-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className={linkColor}>{label}</strong>
                <small>{detail}</small>
              </span>
              <FaArrowRight />
            </Link>
          );
        })}
      </nav>

      <div className="mobile-nav-footer">
        <span>Escape closes this menu</span>
        <span>AJ4200 / 2026</span>
      </div>
    </div>,
    document.body,
  );
};

export default MobileNavbar;
