import { useState } from "react";
import {
  FaAdjust,
  FaFont,
  FaLowVision,
  FaUniversalAccess,
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-accessibility">
      <button
        aria-controls="chat-accessibility-controls"
        aria-expanded={open}
        className="chat-icon-button"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <FaUniversalAccess />
        <span className="sr-only">Chat accessibility options</span>
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
