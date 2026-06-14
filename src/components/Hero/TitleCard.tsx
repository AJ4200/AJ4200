import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCode,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";
import DynamicTitle from "../Utils/DynamicTitle";

const TitleCard = () => {
  return (
    <section className="grid min-h-[calc(100dvh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-8 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
          <span className="inline-flex items-center gap-2 border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-indigo-200">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            Available for projects
          </span>
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-400" />
            Johannesburg, South Africa
          </span>
        </div>

        <p className="mb-3 text-xs uppercase tracking-[0.34em] text-indigo-300/70">
          Hello, I am
        </p>
        <h1 className="landing-name text-5xl font-black uppercase leading-[0.84] tracking-[-0.06em] text-white sm:text-7xl lg:text-[7.25rem]">
          Abel
          <span className="block text-white/35">Majadibodu</span>
        </h1>

        <div className="mt-7 max-w-2xl border-l-2 border-indigo-500 bg-black/25 px-4 py-3 backdrop-blur-sm">
          <span className="mb-1 block text-[0.62rem] uppercase tracking-[0.28em] text-white/40">
            I can work as
          </span>
          <span className="block text-xl font-bold uppercase tracking-wide sm:text-2xl">
            <DynamicTitle />
          </span>
        </div>

        <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          I design and build expressive software across the full stack, from
          polished interfaces and robust APIs to AI-powered tools and playful
          game experiences. I care about systems that work hard and still feel
          unmistakably human.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="group inline-flex min-h-12 items-center gap-3 bg-indigo-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
            href="/portfolio"
          >
            Explore my work
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            className="inline-flex min-h-12 items-center gap-3 border border-white/25 bg-black/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-indigo-400 hover:text-indigo-300"
            href="/contact"
          >
            Start a project
          </Link>
          <a
            aria-label="View AJ4200 on GitHub"
            className="inline-flex size-12 items-center justify-center border border-white/20 bg-black/20 text-xl text-white/70 transition hover:border-indigo-400 hover:text-indigo-300"
            href="https://github.com/aj4200"
          >
            <FaGithub />
          </a>
        </div>

        <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/15">
          {[
            ["Full stack", "Web systems"],
            ["AI", "Integrations"],
            ["Creative", "Games + media"],
          ].map(([value, label]) => (
            <div
              className="border-r border-white/15 px-3 py-4 last:border-r-0 sm:px-5"
              key={value}
            >
              <span className="block text-sm font-bold uppercase text-indigo-300 sm:text-base">
                {value}
              </span>
              <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative mx-auto w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        <div className="absolute -inset-8 -z-10 bg-indigo-500/10 blur-3xl" />
        <div className="mb-3 flex items-center justify-between border-b border-white/15 pb-3 text-[0.62rem] uppercase tracking-[0.22em] text-white/40">
          <span className="inline-flex items-center gap-2">
            <FaCode className="text-indigo-400" />
            Project signal
          </span>
          <span>Live archive / Shuffle 03s</span>
        </div>
        <ShuffleGrid />
        <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3 text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
          <span>Built across web, tools, games and experiments</span>
          <span className="text-indigo-300">AJ4200</span>
        </div>
      </motion.div>
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "/imgs/Appoflex.png" },
  { id: 2, src: "/imgs/csb.png" },
  { id: 3, src: "/imgs/CommonFunLib.png" },
  { id: 4, src: "/imgs/die.png" },
  { id: 5, src: "/imgs/gsw.png" },
  { id: 6, src: "/imgs/hdfplayer.png" },
  { id: 7, src: "/imgs/Portyfolio.png" },
  { id: 8, src: "/imgs/TeslaResume.png" },
  { id: 9, src: "/imgs/TimeWhere.png" },
  { id: 10, src: "/imgs/ttp.png" },
  { id: 11, src: "/imgs/TTT.png" },
  { id: 12, src: "/imgs/CodeShifter.png" },
  { id: 13, src: "/imgs/Mi-Projects.png" },
  { id: 14, src: "/imgs/Intraview.png" },
  { id: 15, src: "/imgs/taskme.png" },
  { id: 16, src: "/imgs/Screenshot.png" },
];

const generateSquares = () =>
  shuffle([...squareData]).map((square) => (
    <motion.div
      className="group relative min-h-20 overflow-hidden border border-indigo-300/15 bg-black/40 sm:min-h-24 lg:min-h-28"
      key={square.id}
      layout
      transition={{ duration: 1.2, type: "spring" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55 grayscale transition duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        style={{ backgroundImage: `url("${square.src}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
    </motion.div>
  ));

const ShuffleGrid = () => {
  const [squares, setSquares] = useState(generateSquares);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSquares(generateSquares());
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1 border border-indigo-400/20 bg-black/25 p-1 shadow-[0_0_50px_rgba(99,102,241,0.14)] backdrop-blur-md">
      {squares}
    </div>
  );
};

export default TitleCard;
