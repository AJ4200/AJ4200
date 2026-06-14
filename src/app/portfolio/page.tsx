"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useState } from "react";
import {
  FaArrowDown,
  FaBriefcase,
  FaCertificate,
  FaCodeBranch,
  FaLayerGroup,
} from "react-icons/fa";
import Certifications from "@/components/Portfolio/Certifications";
import Experience from "@/components/Portfolio/Experience";
import Projects from "@/components/Portfolio/Projects";
import Navbar from "@/components/Navbar/Navbar";
import Leaves from "@/components/Utils/Leaves";
import { certificationsData } from "@/data/certifications";
import { workExperienceData } from "@/data/experience";
import projects from "@/data/projects";

const uniqueCertificationCount = new Set(
  certificationsData.map(
    ({ name, issuingAuthority, dateEarned }) =>
      `${name}-${issuingAuthority}-${dateEarned}`,
  ),
).size;

const sections = [
  {
    id: "projects",
    label: "Projects",
    eyebrow: "Selected builds",
    count: projects.length,
    icon: FaLayerGroup,
  },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "Career timeline",
    count: workExperienceData.length,
    icon: FaBriefcase,
  },
  {
    id: "certifications",
    label: "Certifications",
    eyebrow: "Proof of study",
    count: uniqueCertificationCount,
    icon: FaCertificate,
  },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("projects");

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + sections.length) % sections.length;
    const nextSection = sections[nextIndex].id;

    setActiveSection(nextSection);
    document.getElementById(`portfolio-${nextSection}-tab`)?.focus();
  };

  return (
    <>
      <Navbar />
      <div className="portfolio-page relative isolate h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
        <div className="portfolio-leaves pointer-events-none fixed inset-0 z-30 overflow-hidden">
          <Leaves />
        </div>
        <div className="portfolio-backdrop pointer-events-none fixed inset-0 -z-10" />

        <main className="relative z-10 mx-auto max-w-[100rem] px-4 pb-16 sm:px-6 lg:px-10">
          <section className="portfolio-hero relative grid min-h-[calc(100dvh-5rem)] items-center gap-10 border-b border-lime-300/20 py-12 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-lime-200">
                <span className="size-2 animate-pulse rounded-full bg-lime-300 shadow-[0_0_12px_#bef264]" />
                Portfolio archive online
              </span>

              <p className="mt-8 text-[0.65rem] uppercase tracking-[0.34em] text-lime-300/65">
                Work file / AJ4200
              </p>
              <h1 className="portfolio-title mt-4 text-6xl font-black uppercase leading-[0.78] tracking-[-0.07em] text-white sm:text-8xl lg:text-[9rem]">
                Built
                <span className="block text-lime-400">Evidence.</span>
              </h1>
              <p className="mt-8 max-w-3xl border-l-2 border-lime-400 pl-5 text-base leading-8 text-white/60 sm:text-lg">
                A living record of products shipped, problems solved, roles
                held, and skills earned. Each section tells that story in the
                format that fits it best.
              </p>

              <a
                className="mt-8 inline-flex min-h-12 items-center gap-3 bg-lime-400 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-lime-300"
                href="#portfolio-index"
              >
                Explore the archive
                <FaArrowDown />
              </a>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="portfolio-ledger"
              initial={{ opacity: 0, scale: 0.94 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <div className="portfolio-ledger-grid">
                <div className="portfolio-ledger-main">
                  <div className="portfolio-ledger-heading">
                    <FaCodeBranch />
                    <span>Creative engineering</span>
                  </div>
                  <strong>Code with a point of view.</strong>
                  <p>
                    Product thinking, expressive interfaces, and systems built
                    to hold up beyond the first impression.
                  </p>
                </div>
                {sections.map(({ id, label, count, icon: Icon }) => (
                  <button
                    className="portfolio-stat group"
                    key={id}
                    onClick={() => {
                      setActiveSection(id);
                      document
                        .getElementById("portfolio-index")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    type="button"
                  >
                    <Icon />
                    <strong>{String(count).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="portfolio-index">
            <nav
              aria-label="Portfolio sections"
              className="portfolio-tabs grid border-b border-white/10 md:grid-cols-3"
              role="tablist"
            >
              {sections.map(
                ({ id, label, eyebrow, count, icon: Icon }, index) => (
                  <button
                    aria-controls={`portfolio-${id}-panel`}
                    aria-selected={activeSection === id}
                    className={`portfolio-tab group ${
                      activeSection === id ? "is-active" : ""
                    }`}
                    id={`portfolio-${id}-tab`}
                    key={id}
                    onClick={() => setActiveSection(id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    role="tab"
                    tabIndex={activeSection === id ? 0 : -1}
                    type="button"
                  >
                    <div>
                      <span>{eyebrow}</span>
                      <strong>{label}</strong>
                    </div>
                    <div className="portfolio-tab-mark">
                      <Icon />
                      <small>{String(count).padStart(2, "0")}</small>
                    </div>
                    {activeSection === id && (
                      <motion.i
                        layoutId="portfolio-tab-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                  </button>
                ),
              )}
            </nav>

            <div className="portfolio-section-stage">
              <AnimatePresence mode="wait">
                {activeSection === "projects" && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    aria-labelledby="portfolio-projects-tab"
                    exit={{ opacity: 0, y: 18 }}
                    id="portfolio-projects-panel"
                    initial={{ opacity: 0, y: 18 }}
                    key="projects"
                    role="tabpanel"
                    transition={{ duration: 0.35 }}
                  >
                    <Projects />
                  </motion.div>
                )}

                {activeSection === "experience" && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    aria-labelledby="portfolio-experience-tab"
                    exit={{ opacity: 0, y: 18 }}
                    id="portfolio-experience-panel"
                    initial={{ opacity: 0, y: 18 }}
                    key="experience"
                    role="tabpanel"
                    transition={{ duration: 0.35 }}
                  >
                    <Experience />
                  </motion.div>
                )}

                {activeSection === "certifications" && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    aria-labelledby="portfolio-certifications-tab"
                    exit={{ opacity: 0, y: 18 }}
                    id="portfolio-certifications-panel"
                    initial={{ opacity: 0, y: 18 }}
                    key="certifications"
                    role="tabpanel"
                    transition={{ duration: 0.35 }}
                  >
                    <Certifications />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-[0.58rem] uppercase tracking-[0.23em] text-white/25">
            <span>AJ4200 / Portfolio archive</span>
            <span>Build / Learn / Repeat</span>
          </footer>
        </main>
      </div>
    </>
  );
}
