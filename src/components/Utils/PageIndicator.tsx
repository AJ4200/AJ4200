import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { getFont, getNeonColor } from "@/lib/navbarUtils";

interface PageIndicatorProps {
  route: string;
  label: string;
  number: string;
  description: string;
  textColor: string;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  route,
  label,
  number,
  description,
  textColor,
}) => {
  const reduceMotion = useReducedMotion();
  const accent = getNeonColor(route) || "#ffffff";
  const fontFamily = getFont(route) || "inherit";

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="route-preview"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      style={
        {
          "--route-accent": accent,
          "--route-font": fontFamily,
        } as CSSProperties
      }
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <motion.div
        animate={{ scaleY: 1 }}
        className="route-preview-curtain"
        exit={{ scaleY: 0 }}
        initial={{ scaleY: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.42,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      <div className="route-preview-grid" />
      <div className="route-preview-orbit" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="route-preview-inner"
        exit={{ opacity: 0, y: 24 }}
        initial={{ opacity: 0, y: 34 }}
        transition={{
          delay: reduceMotion ? 0 : 0.08,
          duration: reduceMotion ? 0 : 0.36,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="route-preview-meta">
          <span className="route-preview-index">{number}</span>
          <span className="route-preview-kicker">Route preview</span>
          <span className="route-preview-status">
            <i />
            Available
          </span>
        </div>

        <div className="route-preview-title">
          <span className="route-preview-slash">/</span>
          <strong className={textColor}>{label}</strong>
          <span className="route-preview-outline">{label}</span>
        </div>

        <div className="route-preview-bottom">
          <p>{description}</p>
          <div className="route-preview-path">
            <span>Open destination</span>
            <strong>{route}</strong>
            <i />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default PageIndicator;
