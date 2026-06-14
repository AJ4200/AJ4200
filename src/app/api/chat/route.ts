import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 500;

type RateEntry = {
  count: number;
  expiresAt: number;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const globalForChat = globalThis as typeof globalThis & {
  nootBotRateLimit?: Map<string, RateEntry>;
};

const rateLimit =
  globalForChat.nootBotRateLimit ?? new Map<string, RateEntry>();

globalForChat.nootBotRateLimit = rateLimit;

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (key: string) => {
  const now = Date.now();
  const current = rateLimit.get(key);

  if (!current || current.expiresAt <= now) {
    rateLimit.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
};

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ChatMessage>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0 &&
    candidate.content.length <= MAX_MESSAGE_LENGTH
  );
};

const SYSTEM_PROMPT = `
You are NootBot, the concise and friendly AI site guide for Abel Majadibodu's AJ4200 portfolio.

Known facts:
- Abel is a software engineer, music producer, and game builder based in Johannesburg, South Africa.
- Main routes: /landing, /about, /portfolio, /services, and /contact.
- Services include web applications, full-stack systems, AI features, and product prototypes.
- The free discovery service includes an initial consultation, scope outline, mock interface direction, and a focused working application demo. It is not a complete production application.
- The portfolio contains projects, experience, and certifications.
- The About page contains Code, Production, and Gaming sections. Gaming embeds Baturo Arena, Abel's online arcade platform.
- Contact enquiries use a form that compiles the visitor's answers into a Gmail draft addressed to Abel.
- Abel's public email is abeljackson33@gmail.com.
- GitHub: https://github.com/aj4200
- LinkedIn: https://www.linkedin.com/in/abel-majadibodu-5a0583193

Rules:
- Answer in no more than 90 words unless the user clearly asks for more.
- Be useful and conversational, but do not pretend to be Abel.
- Do not invent prices, availability, project facts, credentials, or guarantees.
- When information is unknown, say so and direct the user to /contact.
- Prefer directing users to the most relevant route.
- Do not claim to browse the web or access private information.
`.trim();

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { message: "Invalid request format." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return NextResponse.json(
      { message: "The conversation is too large." },
      { status: 413 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { message: "NootBot is receiving too many messages. Try again shortly." },
      { status: 429 },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "AI is not configured.", fallback: true },
      { status: 503 },
    );
  }

  let body: { messages?: unknown; pathname?: unknown };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { message: "The conversation could not be read." },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.messages)) {
    return NextResponse.json(
      { message: "No conversation was provided." },
      { status: 400 },
    );
  }

  const messages = body.messages.slice(-MAX_MESSAGES);
  if (!messages.length || !messages.every(isChatMessage)) {
    return NextResponse.json(
      { message: "The conversation contains an invalid message." },
      { status: 400 },
    );
  }

  const pathname =
    typeof body.pathname === "string" && body.pathname.startsWith("/")
      ? body.pathname.slice(0, 100)
      : "/";

  let response: Response;

  try {
    response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        body: JSON.stringify({
          max_completion_tokens: 180,
          messages: [
            {
              role: "system",
              content: `${SYSTEM_PROMPT}\nThe visitor is currently viewing ${pathname}.`,
            },
            ...messages,
          ],
          model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
          temperature: 0.45,
        }),
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );
  } catch (error) {
    console.error("Groq chat request failed:", error);
    return NextResponse.json(
      { message: "NootBot could not reach the AI service.", fallback: true },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const providerError = await response.text();
    console.error("Groq chat completion failed:", providerError);
    return NextResponse.json(
      { message: "NootBot could not complete that request.", fallback: true },
      { status: 502 },
    );
  }

  const result = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };
  const content = result.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return NextResponse.json(
      { message: "NootBot returned an empty response.", fallback: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: content });
}
