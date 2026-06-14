"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithubAlt } from "react-icons/fa";
import { getTextColor } from "@/lib/navbarUtils";
import MobileNavbar from "./MobileNavbar";
import NavLink from "./NavLink";

const navigation = [
  {
    href: "/landing",
    label: "Landing",
    number: "01",
    description: "Profile and current work",
  },
  {
    href: "/about",
    label: "About",
    number: "02",
    description: "Story, code, sound, and play",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    number: "03",
    description: "Projects and experience",
  },
  {
    href: "/services",
    label: "Services",
    number: "04",
    description: "Ways to build together",
  },
  {
    href: "/contact",
    label: "Contact",
    number: "05",
    description: "Open a project channel",
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <nav aria-label="Primary navigation" className="site-nav">
          <div className="site-brand">
            <a
              aria-label="AJ4200 on GitHub"
              className="git-header site-github"
              href="https://github.com/aj4200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithubAlt />
            </a>

            <Link aria-label="AJ4200 home" className="logo site-logo" href="/">
              <b>
                #a<span>j</span>4<span>2</span>00
              </b>
            </Link>

            <span className="site-route-chip" aria-label={`Current route ${pathname}`}>
              {pathname}
            </span>
          </div>

          <div className="site-nav-links">
            {navigation.map((item) => (
              <NavLink
                active={pathname === item.href}
                description={item.description}
                key={item.href}
                number={item.number}
                textColor={getTextColor(item.href)}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={`site-menu-toggle ${open ? "is-open" : ""}`}
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
