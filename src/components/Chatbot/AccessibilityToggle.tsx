import { useEffect, useRef } from "react";
import {
  FaAdjust,
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
    description: "Use a simple sans-serif font",
    icon: FaFont,
  },
  {
    key: "largeText",
    label: "Larger text",
    description: "Increase chat message size",
    icon: FaLowVision,
  },
  {
    key: "highContrast",
    label: "High contrast",
    description: "Strengthen borders and colors",
    icon: FaAdjust,
  },
  {
    key: "reduceMotion",
    label: "Reduce motion",
    description: "Disable chat animations",
    icon: FaUniversalAccess,
  },
] as const;

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
      <button
        aria-controls="chat-accessibility-controls"
        aria-expanded={open}
        className="chat-accessibility-trigger"
        onClick={() => onOpenChange(!open)}
        ref={triggerRef}
        type="button"
      >
        <FaWrench aria-hidden="true" />
        <span className="sr-only">NootBot accessibility options</span>
      </button>

      {open && (
        <div
          aria-label="Chat accessibility options"
          className="chat-accessibility-panel"
          id="chat-accessibility-controls"
          role="group"
        >
          <div>
            <strong>Accessibility</strong>
            <span>Adjust NootBot for you</span>
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
