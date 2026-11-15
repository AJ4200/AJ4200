"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import Script from "next/script";
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
const GOOGLE_GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.compose";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();

type ContactDetails = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const createStyledEmailHtml = ({
  name,
  email,
  company,
  service,
  budget,
  message,
}: ContactDetails) => {
  const detailRow = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #172b4d;color:#93c5fd;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;vertical-align:top;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #172b4d;color:#f8fafc;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:28px 12px;background-color:#020b1d;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;border:1px solid #2563eb;border-collapse:collapse;background-color:#07152f;">
            <tr>
              <td style="padding:30px 32px 22px;border-bottom:1px solid #1e3a65;">
                <p style="margin:0 0 12px;color:#93c5fd;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">AJ4200 / Contact file</p>
                <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.05;letter-spacing:-1px;text-transform:uppercase;">Let&apos;s make it real.</h1>
                <p style="margin:12px 0 0;color:#60a5fa;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">New project brief</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                Hello Abel,<br />I would like to discuss a project.
              </td>
            </tr>
            <tr>
              <td style="padding:20px 20px 8px;">
                <h2 style="margin:0 0 10px;padding-left:10px;border-left:3px solid #3b82f6;color:#93c5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Contact details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                  ${detailRow("Name", name)}
                  ${detailRow("Email", email)}
                  ${detailRow("Company / project", company || "Not provided")}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 20px 8px;">
                <h2 style="margin:0 0 10px;padding-left:10px;border-left:3px solid #3b82f6;color:#93c5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Project details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                  ${detailRow("Service", service)}
                  ${detailRow("Working budget", budget)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 20px 28px;">
                <h2 style="margin:0 0 10px;padding-left:10px;border-left:3px solid #3b82f6;color:#93c5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Project brief</h2>
                <div style="padding:16px;border:1px solid #1e3a65;background-color:#020b1d;color:#e2e8f0;font-size:14px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:1px solid #1e3a65;color:#64748b;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Sent from the AJ4200 contact channel.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
};

const encodeMimeBody = (value: string) =>
  encodeBase64(value)
    .match(/.{1,76}/g)
    ?.join("\r\n") ?? "";

const createGmailDraft = async (
  accessToken: string,
  subject: string,
  plainText: string,
  html: string,
) => {
  const boundary = `AJ4200_${crypto.randomUUID()}`;
  const mimeMessage = [
    `To: ${CONTACT_EMAIL}`,
    `Subject: =?UTF-8?B?${encodeBase64(subject)}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    encodeMimeBody(plainText),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    encodeMimeBody(html),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  const raw = encodeBase64(mimeMessage)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/drafts",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: { raw } }),
    },
  );

  if (!response.ok) {
    throw new Error(
      response.status === 401 || response.status === 403
        ? "Gmail did not authorize draft creation. Check the Google account and Gmail compose permission, then try again."
        : `Gmail could not create the draft (HTTP ${response.status}). Please try again.`,
    );
  }
};

const requestGmailAccessToken = () =>
  new Promise<string>((resolve, reject) => {
    const oauth = window.google?.accounts?.oauth2;

    if (!oauth || !GOOGLE_CLIENT_ID) {
      reject(
        new Error(
          "Google sign-in is unavailable. Check the Gmail setup instructions and try again.",
        ),
      );
      return;
    }

    const tokenClient = oauth.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: GOOGLE_GMAIL_SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(
            new Error(
              response.error_description ||
                response.error ||
                "Google did not provide Gmail access.",
            ),
          );
          return;
        }

        resolve(response.access_token);
      },
      error_callback: (error) => {
        reject(
          new Error(error.message || "Google sign-in could not be opened."),
        );
      },
    });

    tokenClient.requestAccessToken();
  });

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gmailDraftCreated, setGmailDraftCreated] = useState(false);
  const [googleScriptError, setGoogleScriptError] = useState(false);

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setGmailDraftCreated(false);

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
        "AJ4200 / CONTACT FILE",
        "NEW PROJECT BRIEF",
        "========================================",
        "",
        "Hello Abel,",
        "I would like to discuss a project.",
        "",
        "CONTACT DETAILS",
        "----------------------------------------",
        `NAME              ${name}`,
        `EMAIL             ${email}`,
        `COMPANY / PROJECT ${company || "Not provided"}`,
        "",
        "PROJECT DETAILS",
        "----------------------------------------",
        `SERVICE           ${serviceLabel}`,
        `WORKING BUDGET    ${budget}`,
        "",
        "PROJECT BRIEF",
        "----------------------------------------",
        message,
        "",
        "----------------------------------------",
        "Sent from the AJ4200 contact channel.",
      ].join("\n");

      setIsSubmitting(true);

      if (GOOGLE_CLIENT_ID) {
        const accessToken = await requestGmailAccessToken();
        await createGmailDraft(
          accessToken,
          subject,
          body,
          createStyledEmailHtml({
            name,
            email,
            company,
            service: serviceLabel,
            budget,
            message,
          }),
        );
        setGmailDraftCreated(true);
        setSubmissionState("success");
        setFeedback(
          "Your styled draft is in Gmail Drafts. Review it and press Send when you are ready.",
        );
      } else {
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
          "Gmail API setup is missing, so a plain-text draft was opened. Follow the Gmail setup instructions in the README to create styled drafts.",
        );
      }
    } catch (error) {
      setSubmissionState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The email draft could not be opened. Please email me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 mx-auto max-w-[100rem] px-4 pb-16 sm:px-6 lg:px-10">
      {GOOGLE_CLIENT_ID && (
        <Script
          onError={() => setGoogleScriptError(true)}
          onReady={() => setGoogleScriptError(false)}
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      )}
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
            <a href="mailto:abeljackson33@gmail.com" rel="noopener noreferrer">
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
            <span>
              {GOOGLE_CLIENT_ID
                ? "Creates a styled Gmail draft"
                : "Gmail API setup required for styled drafts"}
            </span>
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
                {GOOGLE_CLIENT_ID
                  ? "Creates a styled HTML draft in Gmail. Review it in Drafts, then press Send."
                  : "Without Gmail API setup, this opens a plain-text draft. Follow the setup instructions to enable styled Gmail drafts."}
              </p>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting
                  ? "Creating draft..."
                  : GOOGLE_CLIENT_ID
                    ? "Create styled Gmail draft"
                    : "Open email draft"}
                {!isSubmitting && <FaPaperPlane />}
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
              {gmailDraftCreated
                ? "Styled draft created"
                : submissionState === "success"
                  ? "Draft opened"
                  : "Draft not created"}
            </strong>
            <p>{feedback}</p>
            {googleScriptError && (
              <p>
                Google sign-in could not load. Check your connection and refresh
                the page.
              </p>
            )}
            {gmailDraftCreated && (
              <a
                className="contact-toast-link"
                href="https://mail.google.com/mail/u/0/#drafts"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open Gmail drafts
                <FaArrowRight />
              </a>
            )}
          </div>
          <button
            aria-label="Dismiss notification"
            onClick={() => {
              setSubmissionState("idle");
              setGmailDraftCreated(false);
            }}
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
