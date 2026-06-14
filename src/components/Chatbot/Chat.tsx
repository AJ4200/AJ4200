"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaArrowRight,
  FaRobot,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import AccessibilityToggle, {
  type ChatAccessibilitySettings,
} from "./AccessibilityToggle";
import FloatingBot from "./FloatingBot";

interface ChatProps {
  onClose: () => void;
}

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  action?: {
    href: string;
    label: string;
  };
}

const quickPrompts = [
  "What can Abel build?",
  "Tell me about the free app demo",
  "Show me selected projects",
  "How do I contact Abel?",
];

const defaultSettings: ChatAccessibilitySettings = {
  readableFont: false,
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

const getBotResponse = (input: string, pathname: string): Omit<Message, "id"> => {
  const prompt = input.toLowerCase();

  if (prompt.includes("free") || prompt.includes("demo")) {
    return {
      type: "bot",
      content:
        "The free discovery option includes a consultation, scope outline, mock direction, and a focused working demo of the app's core flow.",
      action: { href: "/services#service-plans", label: "See the free option" },
    };
  }

  if (
    prompt.includes("build") ||
    prompt.includes("service") ||
    prompt.includes("developer")
  ) {
    return {
      type: "bot",
      content:
        "Abel builds expressive web applications, full-stack systems, product prototypes, integrations, and useful AI features.",
      action: { href: "/services", label: "Explore services" },
    };
  }

  if (
    prompt.includes("project") ||
    prompt.includes("portfolio") ||
    prompt.includes("work")
  ) {
    return {
      type: "bot",
      content:
        "The portfolio includes a project carousel, career timeline, and credential archive. It is the best place to inspect the work.",
      action: { href: "/portfolio", label: "Open portfolio" },
    };
  }

  if (
    prompt.includes("contact") ||
    prompt.includes("email") ||
    prompt.includes("hire")
  ) {
    return {
      type: "bot",
      content:
        "Use the project brief on the Contact page. It compiles your answers into a Gmail draft addressed directly to Abel.",
      action: { href: "/contact", label: "Start a project brief" },
    };
  }

  if (
    prompt.includes("about") ||
    prompt.includes("who") ||
    prompt.includes("music") ||
    prompt.includes("gaming")
  ) {
    return {
      type: "bot",
      content:
        "Abel is a software engineer, producer, and game builder based in Johannesburg. The About page brings those disciplines together.",
      action: { href: "/about", label: "Meet Abel" },
    };
  }

  if (prompt.includes("access") || prompt.includes("read") || prompt.includes("help")) {
    return {
      type: "bot",
      content:
        "Use the accessibility button in this chat header to enable a readable font, larger text, stronger contrast, or reduced motion.",
    };
  }

  return {
    type: "bot",
    content: `I am a local guide for AJ4200. You are currently on ${pathname}. Ask me about Abel's services, projects, free app demo, background, or contact options.`,
  };
};

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const pathname = usePathname() ?? "/";
  const titleId = useId();
  const descriptionId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(2);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hey, I am NootBot. I can guide you through Abel's work, services, free app demo, and contact options.",
    },
  ]);
  const [settings, setSettings] =
    useState<ChatAccessibilitySettings>(defaultSettings);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({
      behavior: settings.reduceMotion ? "auto" : "smooth",
      top: logRef.current.scrollHeight,
    });
  }, [messages, settings.reduceMotion]);

  useEffect(() => {
    const saved = window.localStorage.getItem("nootbot-accessibility");
    if (!saved) {
      return;
    }

    try {
      setSettings({
        ...defaultSettings,
        ...(JSON.parse(saved) as Partial<ChatAccessibilitySettings>),
      });
    } catch {
      window.localStorage.removeItem("nootbot-accessibility");
    }
  }, []);

  const updateSettings = (next: ChatAccessibilitySettings) => {
    setSettings(next);

    try {
      window.localStorage.setItem(
        "nootbot-accessibility",
        JSON.stringify(next),
      );
    } catch {
      // The controls still work for this session when storage is unavailable.
    }
  };

  const panelClasses = useMemo(
    () =>
      [
        "chat-panel",
        settings.readableFont && "is-readable",
        settings.largeText && "is-large-text",
        settings.highContrast && "is-high-contrast",
        settings.reduceMotion && "is-reduced-motion",
      ]
        .filter(Boolean)
        .join(" "),
    [settings],
  );

  const sendMessage = async (content: string) => {
    const cleanInput = content.trim();
    if (!cleanInput || isThinking) {
      return;
    }

    const userMessage: Message = {
      id: messageId.current++,
      type: "user",
      content: cleanInput,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);
    inputRef.current?.focus();

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          messages: nextMessages.map(({ type, content: messageContent }) => ({
            role: type === "bot" ? "assistant" : "user",
            content: messageContent,
          })),
          pathname,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as {
        message?: string;
        fallback?: boolean;
      };

      const fallback = getBotResponse(cleanInput, pathname);
      const botMessage: Message = result.fallback || !response.ok
        ? { id: messageId.current++, ...fallback }
        : {
            id: messageId.current++,
            type: "bot",
            content: result.message || fallback.content,
          };

      setMessages((current) => [...current, botMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: messageId.current++,
          ...getBotResponse(cleanInput, pathname),
        },
      ]);
    } finally {
      setIsThinking(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <section
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={panelClasses}
      role="dialog"
    >
      <header className="chat-header">
        <div className="chat-identity">
          <FloatingBot compact expanded onClick={onClose} />
          <div>
            <span>AJ4200 site guide</span>
            <h2 id={titleId}>
              NootBot <small>Alpha</small>
            </h2>
          </div>
        </div>
        <div className="chat-header-actions">
          <AccessibilityToggle
            onChange={updateSettings}
            settings={settings}
          />
          <button
            aria-label="Close NootBot"
            className="chat-icon-button"
            onClick={onClose}
            type="button"
          >
            <FaTimes />
          </button>
        </div>
      </header>

      <p className="sr-only" id={descriptionId}>
        A site guide for learning about Abel, his work, services, and contact
        options.
      </p>

      <div
        aria-live="polite"
        aria-relevant="additions"
        className="chat-log"
        ref={logRef}
        role="log"
      >
        {messages.map((message) => (
          <article
            className={`chat-message is-${message.type}`}
            key={message.id}
          >
            <span className="chat-message-avatar" aria-hidden="true">
              {message.type === "bot" ? <FaRobot /> : <FaUser />}
            </span>
            <div>
              <span className="chat-message-author">
                {message.type === "bot" ? "NootBot" : "You"}
              </span>
              <p>{message.content}</p>
              {message.action && (
                <Link href={message.action.href} onClick={onClose}>
                  {message.action.label}
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </article>
        ))}
        {isThinking && (
          <div
            aria-label="NootBot is thinking"
            className="chat-thinking"
            role="status"
          >
            <FaRobot />
            <span>NootBot is thinking</span>
            <i />
            <i />
            <i />
          </div>
        )}
      </div>

      <div className="chat-quick-prompts" aria-label="Suggested questions">
        {quickPrompts.map((prompt) => (
          <button
            disabled={isThinking}
            key={prompt}
            onClick={() => sendMessage(prompt)}
            type="button"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form className="chat-composer" onSubmit={handleSubmit}>
        <label htmlFor="nootbot-message">Message NootBot</label>
        <div>
          <textarea
            aria-describedby="nootbot-input-help"
            id="nootbot-message"
            maxLength={500}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask about services, projects, or Abel..."
            ref={inputRef}
            rows={2}
            value={input}
          />
          <button
            aria-label="Send message"
            disabled={!input.trim() || isThinking}
            type="submit"
          >
            <FiSend />
          </button>
        </div>
        <span id="nootbot-input-help">
          Enter sends. Shift + Enter adds a line. Groq processes AI messages
          when configured.
          <strong>{input.length}/500</strong>
        </span>
      </form>
    </section>
  );
};

export default Chat;
