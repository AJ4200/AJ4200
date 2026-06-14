"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { type KeyboardEvent, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCode,
  FaEnvelope,
  FaGamepad,
  FaGithub,
  FaHeadphones,
  FaLinkedin,
  FaMapMarkerAlt,
  FaProjectDiagram,
} from "react-icons/fa";
import { skillsets } from "@/data/bio";
import { calculateAge } from "@/lib/utils";
import Game from "./Game";
import Producing from "./Production";
import SkillsetSection from "./SkillSet";

interface BioProps {
  name: string;
  occupation: string;
  description: string;
  imageUrl: string;
  hobbies: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
  email: string;
}

const disciplines = [
  {
    id: "code",
    index: "01",
    title: "Code",
    subtitle: "Systems with a point of view",
    icon: FaCode,
    color: "text-red-400",
    active: "bg-red-400/[0.07]",
    line: "bg-red-400",
  },
  {
    id: "production",
    index: "02",
    title: "Production",
    subtitle: "Ideas you can hear",
    icon: FaHeadphones,
    color: "text-amber-300",
    active: "bg-amber-300/[0.07]",
    line: "bg-amber-300",
  },
  {
    id: "gaming",
    index: "03",
    title: "Gaming",
    subtitle: "Worlds you can enter",
    icon: FaGamepad,
    color: "text-emerald-300",
    active: "bg-emerald-300/[0.07]",
    line: "bg-emerald-300",
  },
] as const;

type DisciplineId = (typeof disciplines)[number]["id"];

const Bio: React.FC<BioProps> = ({
  name,
  occupation,
  description,
  imageUrl,
  hobbies,
  socialLinks,
  email,
}) => {
  const [activeDiscipline, setActiveDiscipline] =
    useState<DisciplineId>("code");

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + disciplines.length) % disciplines.length;
    const nextId = disciplines[nextIndex].id;

    setActiveDiscipline(nextId);
    document.getElementById(`${nextId}-tab`)?.focus();
  };

  return (
    <>
      <section className="about-hero grid min-h-[calc(100dvh-5rem)] items-center gap-10 border-b border-red-400/20 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.28em] text-white/40">
            <span className="inline-flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-3 py-2 text-red-200">
              <span className="size-2 animate-pulse rounded-full bg-red-400 shadow-[0_0_12px_#f87171]" />
              Human signal online
            </span>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              Johannesburg / South Africa
            </span>
          </div>

          <span className="text-[0.65rem] uppercase tracking-[0.34em] text-red-300/65">
            About file / AJ4200
          </span>
          <h1 className="about-name mt-4 text-6xl font-black uppercase leading-[0.78] tracking-[-0.07em] text-white sm:text-8xl lg:text-[8.5rem]">
            Abel
            <span className="block text-red-500">Majadibodu</span>
          </h1>

          <div className="mt-8 grid max-w-3xl gap-5 border-l-2 border-red-500 pl-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="text-base leading-8 text-white/65 sm:text-lg">
              I build software, make music, shape game systems, and chase the
              kind of ideas that refuse to stay in one discipline.
            </p>
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] text-red-300">
              {occupation}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="group inline-flex min-h-12 items-center gap-3 bg-red-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-400"
              href="/contact"
            >
              Work with me
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-3 border border-white/20 bg-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white/75 transition hover:border-red-400 hover:text-red-300"
              href="/portfolio"
            >
              See the work
              <FaProjectDiagram />
            </Link>
            {socialLinks.github && (
              <a
                aria-label="GitHub"
                className="flex size-12 items-center justify-center border border-white/20 bg-black/20 text-xl text-white/60 transition hover:border-red-400 hover:text-red-300"
                href={socialLinks.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                aria-label="LinkedIn"
                className="flex size-12 items-center justify-center border border-white/20 bg-black/20 text-xl text-white/60 transition hover:border-red-400 hover:text-red-300"
                href={socialLinks.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.94 }}
          transition={{ delay: 0.15, duration: 0.75 }}
        >
          <div className="about-portrait-glow" />
          <div className="about-portrait relative aspect-[4/5] overflow-hidden border border-red-300/25 bg-black/35">
            <img
              alt={`Portrait of ${name}`}
              className="h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              src={imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/20" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-[0.58rem] uppercase tracking-[0.25em] text-red-300">
                Maker profile
              </span>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <span className="block text-3xl font-black uppercase text-white">
                    {calculateAge(1999)}
                  </span>
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
                    Years becoming
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold uppercase text-red-300">
                    Builder / Artist
                  </span>
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
                    One mind, many outputs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <a
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.55rem] uppercase tracking-[0.24em] text-white/30 lg:flex"
          href="#story"
        >
          Enter the story
          <FaArrowDown className="animate-bounce text-red-400" />
        </a>
      </section>

      <section
        className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-24"
        id="story"
      >
        <div>
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-red-300">
            The through-line
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl">
            Curiosity
            <span className="block text-white/25">without lanes.</span>
          </h2>
        </div>

        <div className="grid gap-8 text-white/60 sm:grid-cols-2">
          <p className="text-base leading-8">
            {description} What started as curiosity about how software works
            grew into a habit of building complete systems, studying how people
            move through them, and giving each one a visual identity.
          </p>
          <p className="text-base leading-8">
            The same instinct follows me away from the editor. I produce music,
            develop games and mods, experiment with narrative AI, and treat
            every medium as another language for making an idea tangible.
          </p>
          <blockquote className="border-l-2 border-red-500 pl-5 text-2xl font-bold leading-tight text-white sm:col-span-2 sm:text-4xl">
            "I do not separate engineering from creativity. The best work needs
            both."
          </blockquote>
        </div>
      </section>

      <nav
        aria-label="Creative disciplines"
        className="grid border-b border-white/10 md:grid-cols-3"
        id="disciplines"
        role="tablist"
      >
        {disciplines.map(
          (
            { id, index, title, subtitle, icon: Icon, color, active, line },
            disciplineIndex,
          ) => (
            <button
              aria-controls={`${id}-panel`}
              aria-selected={activeDiscipline === id}
              className={`group relative flex min-h-36 items-center justify-between overflow-hidden border-b border-white/10 px-5 py-6 text-left transition hover:bg-white/[0.035] md:border-b-0 md:border-r md:last:border-r-0 ${
                activeDiscipline === id ? active : ""
              }`}
              id={`${id}-tab`}
              key={id}
              onClick={() => setActiveDiscipline(id)}
              onKeyDown={(event) =>
                handleTabKeyDown(event, disciplineIndex)
              }
              role="tab"
              tabIndex={activeDiscipline === id ? 0 : -1}
              type="button"
            >
              <div>
                <span className={`text-xs font-bold ${color}`}>{index}</span>
                <h3
                  className={`mt-2 text-3xl font-black uppercase transition-colors ${
                    activeDiscipline === id ? color : "text-white"
                  }`}
                >
                  {title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/30">
                  {subtitle}
                </p>
              </div>
              <Icon
                className={`text-3xl transition group-hover:scale-110 group-hover:opacity-100 ${color} ${
                  activeDiscipline === id
                    ? "scale-110 opacity-100"
                    : "opacity-45"
                }`}
              />
              {activeDiscipline === id && (
                <motion.span
                  className={`absolute inset-x-0 bottom-0 h-1 ${line}`}
                  layoutId="discipline-indicator"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          ),
        )}
      </nav>

      <section className="border-b border-white/10">
        <AnimatePresence mode="wait">
          {activeDiscipline === "code" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              aria-labelledby="code-tab"
              className="py-16 lg:py-24"
              exit={{ opacity: 0, x: -24 }}
              id="code-panel"
              initial={{ opacity: 0, x: 24 }}
              key="code"
              role="tabpanel"
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
                <div>
                  <span className="text-[0.62rem] uppercase tracking-[0.28em] text-red-300">
                    01 / Engineering
                  </span>
                  <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl">
                    Code is
                    <span className="block text-red-500">
                      a creative medium.
                    </span>
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-white/50 lg:justify-self-end">
                  I work across the stack, but the real skill is translation:
                  turning product intent into architecture, architecture into
                  interaction, and interaction into something people actually
                  enjoy using.
                </p>
              </div>
              <SkillsetSection skillsets={skillsets} />
            </motion.div>
          )}

          {activeDiscipline === "production" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              aria-labelledby="production-tab"
              className="py-16 lg:py-24"
              exit={{ opacity: 0, x: -24 }}
              id="production-panel"
              initial={{ opacity: 0, x: 24 }}
              key="production"
              role="tabpanel"
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <Producing />
            </motion.div>
          )}

          {activeDiscipline === "gaming" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              aria-labelledby="gaming-tab"
              className="py-16 lg:py-24"
              exit={{ opacity: 0, x: -24 }}
              id="gaming-panel"
              initial={{ opacity: 0, x: 24 }}
              key="gaming"
              role="tabpanel"
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <Game />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="about-closing mb-8 overflow-hidden border border-red-400/25 bg-red-500/10 p-7 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-red-300">
              End of file / Beginning of conversation
            </span>
            <h2 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.86] text-white sm:text-7xl">
              Bring me the idea
              <span className="block text-red-500">that feels too ambitious.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              className="group inline-flex min-h-14 items-center justify-between gap-8 bg-red-500 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-red-400"
              href="/contact"
            >
              Start something
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-between gap-8 border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.14em] text-white/55 transition hover:border-red-400 hover:text-red-300"
              href={`mailto:${email}`}
            >
              {email}
              <FaEnvelope />
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-[0.58rem] uppercase tracking-[0.23em] text-white/25">
        <span>About Abel Majadibodu</span>
        <span>{hobbies.join(" / ")}</span>
      </footer>
    </>
  );
};

export default Bio;
