import { forwardRef } from "react";

interface FloatingBotProps {
  onClick: () => void;
  expanded?: boolean;
  compact?: boolean;
}

const FloatingBot = forwardRef<HTMLButtonElement, FloatingBotProps>(
  ({ onClick, expanded = false, compact = false }, ref) => (
    <button
      aria-expanded={expanded}
      aria-haspopup="dialog"
      aria-label={expanded ? "Close NootBot assistant" : "Open NootBot assistant"}
      className={`chatbot-launcher ${compact ? "is-compact" : ""}`}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <span aria-hidden="true" className="cute-robot-v1">
        <span className="circle-bg">
          <span className="robot-ear left" />
          <span className="robot-head">
            <span className="robot-face">
              <span className="eyes left" />
              <span className="eyes right" />
              <span className="mouth" />
            </span>
          </span>
          <span className="robot-ear right" />
          <span className="robot-body" />
        </span>
      </span>
      {!compact && (
        <span className="chatbot-launcher-copy">
          <strong>Ask NootBot</strong>
          <small>Site guide / Alpha</small>
        </span>
      )}
      {!compact && <span className="chatbot-launcher-status" />}
    </button>
  ),
);

FloatingBot.displayName = "FloatingBot";

export default FloatingBot;
