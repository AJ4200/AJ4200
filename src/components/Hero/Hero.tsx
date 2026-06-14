import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBrain,
  FaCode,
  FaGamepad,
  FaLayerGroup,
  FaPalette,
  FaServer,
} from "react-icons/fa";
import GitHubHeatmap from "./GitHeat";
import TitleCard from "./TitleCard";

const capabilities = [
  {
    icon: FaLayerGroup,
    title: "Full Stack Systems",
    text: "Production-minded applications shaped from database and API design through to the final interaction.",
    tools: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    icon: FaPalette,
    title: "Frontend & UI",
    text: "Responsive interfaces with clear hierarchy, purposeful motion, and enough personality to be remembered.",
    tools: ["TypeScript", "Tailwind", "Framer Motion", "Design systems"],
  },
  {
    icon: FaServer,
    title: "Backend Engineering",
    text: "Services, integrations, authentication, and data flows designed to remain understandable as they grow.",
    tools: ["REST APIs", "Express", "Spring", "MongoDB"],
  },
  {
    icon: FaBrain,
    title: "AI Integration",
    text: "Useful AI features woven into real products, including generation, transformation, and assisted workflows.",
    tools: ["OpenAI", "Prompt systems", "Automation", "Tooling"],
  },
  {
    icon: FaGamepad,
    title: "Games & Experiments",
    text: "Interactive prototypes, game mods, narrative systems, and strange ideas developed into playable form.",
    tools: ["Game systems", "Modding", "Narrative AI", "Prototyping"],
  },
  {
    icon: FaCode,
    title: "Developer Tools",
    text: "Utilities that remove repetition and help people move from an idea to working software faster.",
    tools: ["CLI tools", "Code generation", "Libraries", "DX"],
  },
];

const Hero = () => {
  return (
    <main className="relative z-10 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-[linear-gradient(to_bottom,rgba(3,7,18,0.16),rgba(3,7,18,0.93)_72%)] px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TitleCard />

        <section className="border-t border-white/15 py-16 sm:py-20">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-indigo-300">
                Capability matrix
              </span>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl">
                What I can
                <span className="block text-indigo-400">bring to the build.</span>
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/55 lg:justify-self-end">
              I am most useful where product thinking, engineering, and visual
              craft overlap. I can take ownership of a focused feature or help
              shape an entire application from its first sketch.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text, tools }, index) => (
              <article
                className="group relative overflow-hidden border border-white/15 bg-black/35 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-400/70 hover:bg-indigo-950/35"
                key={title}
              >
                <span className="absolute right-4 top-4 text-xs tracking-[0.2em] text-white/20">
                  0{index + 1}
                </span>
                <Icon className="mb-8 text-2xl text-indigo-400 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-bold uppercase text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      className="border border-white/10 px-2 py-1 text-[0.58rem] uppercase tracking-[0.12em] text-white/40"
                      key={tool}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 border-t border-white/15 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="relative min-h-[28rem] overflow-hidden border border-indigo-400/25 bg-black/45">
            <Image
              alt="DiE-ALOUGE project interface"
              className="object-cover opacity-60 transition duration-700 hover:scale-105 hover:opacity-80"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              src="/imgs/Screenshot.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-indigo-300">
                Featured experiment / Narrative AI
              </span>
              <h2 className="mt-3 text-4xl font-black uppercase text-white sm:text-6xl">
                DiE-ALOUGE
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
                A Halloween survival experience where generative narrative,
                player choices, and a deceptive harbinger turn conversation
                into the game mechanic.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[0.58rem] uppercase tracking-[0.15em] text-white/45">
                {["Next.js", "OpenAI", "Prisma", "MongoDB"].map((tool) => (
                  <span className="border border-white/15 px-2 py-1" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-white/15 bg-black/40 p-6 backdrop-blur-md sm:p-8">
            <div>
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-indigo-300">
                Current signal
              </span>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
                Building at the edge of useful and unusual.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55">
                My work moves between practical software and creative
                experiments. The common thread is curiosity: understand the
                system, make it solid, then give it a point of view.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <a
                className="group flex items-center justify-between border border-indigo-400/40 bg-indigo-500/10 px-4 py-4 text-sm font-bold uppercase tracking-[0.13em] text-indigo-200 transition hover:bg-indigo-500 hover:text-white"
                href="https://diealouge.vercel.app/"
              >
                Open featured project
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                className="group flex items-center justify-between border border-white/15 px-4 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white/70 transition hover:border-indigo-400 hover:text-indigo-300"
                href="/portfolio"
              >
                View full portfolio
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/15 py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-indigo-300">
                Open source activity
              </span>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
                Work in public.
              </h2>
            </div>
            <a
              className="text-xs uppercase tracking-[0.18em] text-white/45 transition hover:text-indigo-300"
              href="https://github.com/aj4200"
            >
              github.com/aj4200
            </a>
          </div>
          <div className="border border-white/15 bg-black/40 p-3 backdrop-blur-md sm:p-6">
            <GitHubHeatmap />
          </div>
        </section>

        <section className="mb-10 border border-indigo-400/30 bg-indigo-500/10 p-7 backdrop-blur-md sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-indigo-300">
                Have something in mind?
              </span>
              <h2 className="mt-3 max-w-3xl text-4xl font-black uppercase leading-none text-white sm:text-6xl">
                Let us make the idea real.
              </h2>
            </div>
            <Link
              className="group inline-flex min-h-14 items-center justify-center gap-4 bg-indigo-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-indigo-400"
              href="/contact"
            >
              Start a conversation
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Hero;
