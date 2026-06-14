"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowDown,
  FaArrowRight,
  FaBrain,
  FaCheck,
  FaCode,
  FaCogs,
  FaComments,
  FaDesktop,
  FaLayerGroup,
  FaMagic,
  FaMobileAlt,
  FaRocket,
  FaServer,
  FaShapes,
} from "react-icons/fa";

const capabilities = [
  {
    icon: FaDesktop,
    number: "01",
    title: "Web applications",
    copy: "Responsive products built around clear user journeys, useful interactions, and maintainable foundations.",
    tools: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: FaServer,
    number: "02",
    title: "Full-stack systems",
    copy: "Interfaces connected to APIs, authentication, databases, integrations, and the workflows behind them.",
    tools: ["Node.js", "APIs", "PostgreSQL"],
  },
  {
    icon: FaBrain,
    number: "03",
    title: "AI features",
    copy: "Focused AI capabilities that improve a real workflow instead of existing as a decorative chatbot.",
    tools: ["OpenAI", "Automation", "Tooling"],
  },
  {
    icon: FaShapes,
    number: "04",
    title: "Product prototypes",
    copy: "Clickable ideas and working application demos that make the direction tangible before the full build.",
    tools: ["UX direction", "Motion", "Demo builds"],
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    copy: "We clarify the problem, audience, must-have workflow, and what success should look like.",
  },
  {
    number: "02",
    title: "Demonstrate",
    copy: "I turn the direction into a mock design and focused application demo you can actually experience.",
  },
  {
    number: "03",
    title: "Build",
    copy: "Once the direction is right, the approved scope becomes a production-ready implementation.",
  },
  {
    number: "04",
    title: "Launch",
    copy: "The product is polished, deployed, documented, and prepared for its next stage of growth.",
  },
];

const plans = [
  {
    id: "free",
    eyebrow: "Start without risk",
    title: "Free discovery",
    price: "R0",
    note: "Before committing to the full build",
    description:
      "Enough real work to understand the idea, see the direction, and decide whether the collaboration feels right.",
    features: [
      "Initial project consultation",
      "Feature and scope outline",
      "Mock interface direction",
      "Working application demo",
    ],
    button: "Request a free demo",
    featured: true,
  },
  {
    id: "flexible",
    eyebrow: "Focused delivery",
    title: "Flexible build",
    price: "Scoped",
    note: "Quoted around the project",
    description:
      "A focused engagement for landing pages, product interfaces, integrations, upgrades, and defined application features.",
    features: [
      "Next.js and TypeScript development",
      "Responsive UI implementation",
      "API and data integration",
      "Deployment-ready delivery",
    ],
    button: "Discuss the scope",
  },
  {
    id: "custom",
    eyebrow: "Complete product",
    title: "Custom system",
    price: "Tailored",
    note: "Designed around your operation",
    description:
      "A deeper product engagement for custom workflows, authentication, dashboards, AI, scaling, and long-term foundations.",
    features: [
      "Product and technical architecture",
      "Custom backend and integrations",
      "Authentication and permissions",
      "Hosting, SEO, and scaling strategy",
    ],
    button: "Plan a custom build",
  },
];

const Pricing: React.FC = () => {
  return (
    <main className="relative z-10 mx-auto max-w-[100rem] px-4 pb-16 sm:px-6 lg:px-10">
      <section className="services-hero relative grid min-h-[calc(100dvh-5rem)] items-center gap-10 border-b border-fuchsia-300/20 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.75 }}
        >
          <span className="services-signal">
            <span />
            Available for selected builds
          </span>
          <p className="mt-8 text-[0.65rem] uppercase tracking-[0.34em] text-fuchsia-300/70">
            Services file / AJ4200
          </p>
          <h1 className="services-title mt-4 text-6xl font-black uppercase leading-[0.8] tracking-[-0.065em] text-white sm:text-8xl lg:text-[8.5rem]">
            Ideas into
            <span className="block text-fuchsia-400">working systems.</span>
          </h1>
          <p className="mt-8 max-w-3xl border-l-2 border-fuchsia-400 pl-5 text-base leading-8 text-white/60 sm:text-lg">
            I design and build expressive web products from the first
            conversation through to deployment, with enough technical depth to
            make the result last.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="services-primary-action" href="#service-plans">
              Explore ways to work
              <FaArrowDown />
            </a>
            <Link className="services-secondary-action" href="/contact">
              Start a conversation
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="services-orbit"
          initial={{ opacity: 0, scale: 0.92 }}
          transition={{ delay: 0.15, duration: 0.75 }}
        >
          <div className="services-orbit-ring services-orbit-ring-outer" />
          <div className="services-orbit-ring services-orbit-ring-inner" />
          <div className="services-orbit-core">
            <FaCode />
            <span>Design</span>
            <strong>+</strong>
            <span>Engineering</span>
          </div>
          <span className="services-orbit-node services-orbit-node-one">
            <FaMagic />
          </span>
          <span className="services-orbit-node services-orbit-node-two">
            <FaServer />
          </span>
          <span className="services-orbit-node services-orbit-node-three">
            <FaMobileAlt />
          </span>
          <span className="services-orbit-node services-orbit-node-four">
            <FaBrain />
          </span>
        </motion.div>
      </section>

      <section className="border-b border-white/10 py-16 lg:py-24">
        <div className="services-section-heading">
          <div>
            <span>Capability matrix</span>
            <h2>
              What I bring
              <strong>to the build.</strong>
            </h2>
          </div>
          <p>
            The work can begin with a single interface or extend across the
            full product. The important part is choosing only what helps the
            idea become useful.
          </p>
        </div>

        <div className="services-capability-grid">
          {capabilities.map(({ icon: Icon, number, title, copy, tools }, index) => (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              key={title}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="services-capability-topline">
                <Icon />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div>
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 py-16 lg:py-24">
        <div className="services-section-heading">
          <div>
            <span>From conversation to launch</span>
            <h2>
              A process with
              <strong>visible progress.</strong>
            </h2>
          </div>
          <p>
            No disappearing into a technical cave. Each phase creates something
            concrete you can review, question, and improve before the next one.
          </p>
        </div>

        <div className="services-process">
          {process.map(({ number, title, copy }, index) => (
            <motion.article
              initial={{ opacity: 0, x: -18 }}
              key={title}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <i />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24" id="service-plans">
        <div className="services-section-heading">
          <div>
            <span>Ways to work together</span>
            <h2>
              Begin with
              <strong>the right scope.</strong>
            </h2>
          </div>
          <p>
            Every project is different, so these are engagement shapes rather
            than rigid packages. The first option is genuinely free.
          </p>
        </div>

        <div className="services-plans">
          {plans.map((plan, index) => (
            <motion.article
              className={plan.featured ? "is-featured" : ""}
              initial={{ opacity: 0, y: 28 }}
              key={plan.id}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {plan.featured && (
                <div className="services-free-flag">
                  <FaRocket />
                  Includes an app demo
                </div>
              )}
              <span className="services-plan-eyebrow">{plan.eyebrow}</span>
              <h3>{plan.title}</h3>
              <div className="services-plan-price">
                <strong>{plan.price}</strong>
                <span>{plan.note}</span>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <FaCheck />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                className="services-plan-action"
                href={`/contact?service=${plan.id}`}
              >
                {plan.button}
                <FaArrowRight />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="services-demo-note">
          <div className="services-demo-icon">
            <FaLayerGroup />
          </div>
          <div>
            <span>What "working application demo" means</span>
            <h3>A focused proof of the core experience.</h3>
            <p>
              I will create a small interactive version of the proposed app
              direction so you can experience its key flow before choosing to
              fund the full product. It is a validation demo, not the complete
              production application.
            </p>
          </div>
          <Link href="/contact?service=free">
            Request yours
            <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="services-closing">
        <div>
          <span>Have an unusual idea?</span>
          <h2>
            Good. Those are usually
            <strong>the interesting ones.</strong>
          </h2>
        </div>
        <Link href="/contact">
          Tell me about it
          <FaComments />
        </Link>
      </section>

      <footer className="services-footer">
        <span>AJ4200 / Services</span>
        <span>
          <FaCogs />
          Design / Development / Delivery
        </span>
      </footer>
    </main>
  );
};

export default Pricing;
