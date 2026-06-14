"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaProjectDiagram,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";

type SubmissionState = "idle" | "success" | "error";

const CONTACT_EMAIL = "abeljackson33@gmail.com";

const serviceOptions = [
  { value: "general", label: "General enquiry" },
  { value: "free", label: "Free app demo" },
  { value: "flexible", label: "Flexible build" },
  { value: "custom", label: "Custom system" },
];

const budgetOptions = [
  "Still exploring",
  "Under R10,000",
  "R10,000 - R30,000",
  "R30,000 - R75,000",
  "R75,000+",
];

const MainContact: React.FC = () => {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") ?? "general";
  const defaultService = useMemo(
    () =>
      serviceOptions.some(({ value }) => value === requestedService)
        ? requestedService
        : "general",
    [requestedService],
  );
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const company = String(form.get("company") || "").trim();
    const service = String(form.get("service") || "general");
    const budget = String(form.get("budget") || "Still exploring");
    const message = String(form.get("message") || "").trim();
    const serviceLabel =
      serviceOptions.find(({ value }) => value === service)?.label ||
      "General enquiry";

    try {
      const subject = `[AJ4200] ${serviceLabel} enquiry from ${name}`;
      const body = [
        "Hello Abel,",
        "",
        "I would like to discuss a project.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / project: ${company || "Not provided"}`,
        `Service: ${serviceLabel}`,
        `Budget: ${budget}`,
        "",
        "Project brief:",
        message,
        "",
        "Sent from the AJ4200 contact page.",
      ].join("\n");

      const gmailUrl = new URL("https://mail.google.com/mail/");
      gmailUrl.searchParams.set("view", "cm");
      gmailUrl.searchParams.set("fs", "1");
      gmailUrl.searchParams.set("to", CONTACT_EMAIL);
      gmailUrl.searchParams.set("su", subject);
      gmailUrl.searchParams.set("body", body);

      const gmailWindow = window.open(gmailUrl.toString(), "_blank");

      if (gmailWindow) {
        gmailWindow.opener = null;
      } else {
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
      }

      setSubmissionState("success");
      setFeedback(
        "Your email draft is ready. Review it and press Send to deliver the enquiry.",
      );
    } catch (error) {
      setSubmissionState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The email draft could not be opened. Please email me directly.",
      );
    }
  };

  return (
    <main className="relative z-10 mx-auto max-w-[100rem] px-4 pb-16 sm:px-6 lg:px-10">
      <section className="contact-hero grid min-h-[calc(100dvh-5rem)] items-center gap-10 border-b border-blue-300/20 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.75 }}
        >
          <span className="contact-signal">
            <span />
            Enquiry channel open
          </span>
          <p className="mt-8 text-[0.65rem] uppercase tracking-[0.34em] text-blue-300/70">
            Contact file / AJ4200
          </p>
          <h1 className="contact-title mt-4 text-6xl font-black uppercase leading-[0.8] tracking-[-0.065em] text-white sm:text-8xl lg:text-[8.2rem]">
            Let&apos;s make
            <span className="block text-blue-400">it real.</span>
          </h1>
          <p className="mt-8 max-w-3xl border-l-2 border-blue-400 pl-5 text-base leading-8 text-white/60 sm:text-lg">
            Bring the rough idea, the impossible feature, or the product that
            has been living in your notes. We can figure out the useful version
            together.
          </p>

          <div className="contact-response-grid">
            <div>
              <FaClock />
              <span>Typical reply</span>
              <strong>Within 1-2 working days</strong>
            </div>
            <div>
              <FaShieldAlt />
              <span>Your details</span>
              <strong>Nothing stored by this site</strong>
            </div>
          </div>

          <div className="contact-socials">
            <a
              href="mailto:abeljackson33@gmail.com"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
              Email directly
            </a>
            <a
              href="https://github.com/aj4200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithub />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abel-majadibodu-5a0583193"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="contact-console"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          <div className="contact-console-bar">
            <span>
              <FaProjectDiagram />
              New project brief
            </span>
            <span>Opens a Gmail draft</span>
          </div>

          <form onSubmit={submitContact}>
            <div className="contact-field-grid">
              <label>
                <span>Your name *</span>
                <input
                  autoComplete="name"
                  maxLength={80}
                  minLength={2}
                  name="name"
                  placeholder="Who am I speaking with?"
                  required
                  type="text"
                />
              </label>
              <label>
                <span>Email address *</span>
                <input
                  autoComplete="email"
                  maxLength={180}
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </label>
            </div>

            <div className="contact-field-grid">
              <label>
                <span>Company / project</span>
                <input
                  autoComplete="organization"
                  maxLength={100}
                  name="company"
                  placeholder="Optional"
                  type="text"
                />
              </label>
              <label>
                <span>What do you need? *</span>
                <select defaultValue={defaultService} name="service" required>
                  {serviceOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span>Working budget</span>
              <select defaultValue="Still exploring" name="budget">
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Tell me about the idea *</span>
              <textarea
                maxLength={5000}
                minLength={20}
                name="message"
                placeholder="What are you building, who is it for, and what should it help them do?"
                required
                rows={7}
              />
            </label>

            <div className="contact-submit-row">
              <p>
                The form compiles your answers into an email draft. Review it,
                then press Send in Gmail or your email app.
              </p>
              <button type="submit">
                Open email draft
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <section className="contact-next-step">
        <div>
          <span>Not ready for a full build?</span>
          <h2>
            Start with the
            <strong>free app demo.</strong>
          </h2>
          <p>
            We can begin with a consultation, mock direction, and focused
            working demo of the core application flow.
          </p>
        </div>
        <Link href="/services#service-plans">
          Explore services
          <FaArrowRight />
        </Link>
      </section>

      <footer className="contact-footer">
        <span>AJ4200 / Contact channel</span>
        <span>Johannesburg / Available remotely</span>
      </footer>

      {submissionState !== "idle" && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          aria-live="polite"
          className={`contact-toast ${
            submissionState === "success" ? "is-success" : "is-error"
          }`}
          initial={{ opacity: 0, y: 20 }}
          role={submissionState === "error" ? "alert" : "status"}
        >
          <span>
            {submissionState === "success" ? <FaCheck /> : <FaTimes />}
          </span>
          <div>
            <strong>
              {submissionState === "success"
                ? "Draft opened"
                : "Draft not opened"}
            </strong>
            <p>{feedback}</p>
          </div>
          <button
            aria-label="Dismiss notification"
            onClick={() => setSubmissionState("idle")}
            type="button"
          >
            <FaTimes />
          </button>
        </motion.div>
      )}
    </main>
  );
};

export default MainContact;
