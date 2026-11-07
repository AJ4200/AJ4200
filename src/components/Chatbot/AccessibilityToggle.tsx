import { useEffect, useRef } from "react";
import {
  FaAdjust,
  FaCog,
  FaFont,
  FaLowVision,
  FaUniversalAccess,
  FaWrench,
} from "react-icons/fa";

export interface ChatAccessibilitySettings {
  readableFont: boolean;
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface AccessibilityToggleProps {
  settings: ChatAccessibilitySettings;
  onChange: (settings: ChatAccessibilitySettings) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const controls = [
  {
    key: "readableFont",
    label: "Readable font",
    description: "Use a simple font across the site",
    icon: FaFont,
  },
  {
    key: "largeText",
    label: "Larger text",
    description: "Increase site text and interface sizes",
    icon: FaLowVision,
  },
  {
    key: "highContrast",
    label: "High contrast",
    description: "Improve text and control contrast",
    icon: FaAdjust,
  },
  {
    key: "reduceMotion",
    label: "Reduce motion",
    description: "Reduce motion across the site",
    icon: FaUniversalAccess,
  },
] as const;

const dockOutline =
  "M42 22 C52 22 55 32 65 34 C76 36 78 4 112 4 C134 4 152 22 152 44 C152 66 134 84 112 84 C78 84 76 52 65 54 C55 56 52 66 42 66 C30 66 20 56 20 44 C20 32 30 22 42 22Z";

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({
  settings,
  onChange,
  open,
  onOpenChange,
  chatOpen,
  triggerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-readable-font", settings.readableFont);
    root.toggleAttribute("data-large-text", settings.largeText);
    root.toggleAttribute("data-high-contrast", settings.highContrast);
    root.toggleAttribute("data-reduce-motion", settings.reduceMotion);
    return () => {
      root.removeAttribute("data-readable-font");
      root.removeAttribute("data-large-text");
      root.removeAttribute("data-high-contrast");
      root.removeAttribute("data-reduce-motion");
    };
  }, [settings]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onOpenChange]);

  return (
    <div
      className={[
        "chat-accessibility",
        chatOpen && "is-chat-open",
        settings.readableFont && "is-readable",
        settings.largeText && "is-large-text",
        settings.highContrast && "is-high-contrast",
        settings.reduceMotion && "is-reduced-motion",
      ].filter(Boolean).join(" ")}
      ref={containerRef}
    >
      {!chatOpen && (
        <svg
          aria-hidden="true"
          className="accessibility-dock-outline"
          preserveAspectRatio="none"
          viewBox="0 0 156 88"
        >
          <path className="accessibility-dock-track" d={dockOutline} />
          <path
            className="accessibility-dock-signal"
            d={dockOutline}
            pathLength={100}
          />
        </svg>
      )}
      <button
        aria-controls="chat-accessibility-controls"
        aria-expanded={open}
        className="chat-accessibility-trigger"
        onClick={() => onOpenChange(!open)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className="accessibility-trigger-icon">
          <FaCog className="accessibility-trigger-gear" />
          <FaWrench className="accessibility-trigger-wrench" />
        </span>
        <span className="sr-only">Site accessibility options</span>
      </button>

      {open && (
        <div
          aria-label="Site accessibility options"
          className="chat-accessibility-panel"
          id="chat-accessibility-controls"
          role="group"
        >
          <div>
            <strong>Accessibility</strong>
            <span>Adjust the site for you. Embedded sites have their own settings.</span>
          </div>
          {controls.map(({ key, label, description, icon: Icon }) => (
            <button
              aria-pressed={settings[key]}
              className={settings[key] ? "is-active" : ""}
              key={key}
              onClick={() =>
                onChange({ ...settings, [key]: !settings[key] })
              }
              type="button"
            >
              <Icon />
              <span>
                <strong>{label}</strong>
                <small>{description}</small>
              </span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessibilityToggle;
