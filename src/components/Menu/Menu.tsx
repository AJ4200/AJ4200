import {
  FaAddressCard,
  FaArrowDown,
  FaBriefcase,
  FaCompass,
  FaEnvelope,
  FaLayerGroup,
} from "react-icons/fa";
import MenuCard from "./MenuCard";

const destinations = [
  {
    number: "01",
    label: "Landing",
    eyebrow: "Start here",
    description:
      "A quick introduction, current work, and a snapshot of what I build.",
    imageUrl: "/imgs/bbw.jpg",
    route: "/landing",
    accent: "#6366f1",
    icon: FaCompass,
    info: ["Profile", "GitHub activity", "Latest project"],
    className: "md:col-span-7 md:row-span-2 md:min-h-[30rem]",
    featured: true,
  },
  {
    number: "02",
    label: "About",
    eyebrow: "The person",
    description: "Biography, interests, creative work, and the tools I enjoy.",
    imageUrl: "/imgs/apg.jpg",
    route: "/about",
    accent: "#ef4444",
    icon: FaAddressCard,
    info: ["Biography", "Hobbies", "Creative work"],
    className: "md:col-span-5",
  },
  {
    number: "03",
    label: "Portfolio",
    eyebrow: "Selected work",
    description: "Projects, experience, and certifications collected in one place.",
    imageUrl: "/imgs/pbg.jpg",
    route: "/portfolio",
    accent: "#22c55e",
    icon: FaBriefcase,
    info: ["Projects", "Experience", "Certifications"],
    className: "md:col-span-5",
  },
  {
    number: "04",
    label: "Services",
    eyebrow: "Work together",
    description: "Explore the development services and project scopes I offer.",
    imageUrl: "/imgs/8753.jpg",
    route: "/services",
    accent: "#a855f7",
    icon: FaLayerGroup,
    info: ["Development", "Project scope", "Pricing"],
    className: "md:col-span-6",
  },
  {
    number: "05",
    label: "Contact",
    eyebrow: "Open a channel",
    description: "Have a project or an idea? Send an enquiry and start a conversation.",
    imageUrl: "/imgs/water.jpg",
    route: "/contact",
    accent: "#3b82f6",
    icon: FaEnvelope,
    info: ["Enquiries", "Direct email", "Availability"],
    className: "md:col-span-6",
  },
];

const Menu: React.FC = () => {
  return (
    <main className="relative z-10 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain px-4 pb-24 pt-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(255,255,255,0.13),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.72))]" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-8 grid gap-6 border-b border-white/20 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-white/60">
              <span className="h-px w-10 bg-white/50" />
              AJ4200 / Select destination
            </div>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Welcome.
              <span className="welcome-spectrum block">Pick a world.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              This is the front door to my work, experiments, and creative
              output. Choose a destination below and explore.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
            </span>
            Online / 5 destinations
            <FaArrowDown className="animate-bounce" />
          </div>
        </header>

        <section
          aria-label="Site destinations"
          className="grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 md:grid-cols-12"
        >
          {destinations.map((destination) => (
            <MenuCard key={destination.route} {...destination} />
          ))}
        </section>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 py-5 text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
          <span>
            Designed and built by{" "}
            <a
              className="text-white/70 transition hover:text-white"
              href="https://github.com/aj4200"
              rel="noopener noreferrer"
              target="_blank"
            >
              aj4200
            </a>
          </span>
          <span>Johannesburg / South Africa</span>
        </footer>
      </div>
    </main>
  );
};

export default Menu;
