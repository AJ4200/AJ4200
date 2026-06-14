import { motion, useReducedMotion } from "framer-motion";

interface PageIndicatorProps {
  route: string;
  textColor: string;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  route,
  textColor,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      aria-hidden="true"
      className="route-preview"
      exit={{ opacity: 0, y: 24 }}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
    >
      <span className="route-preview-kicker">Navigate to</span>
      <strong className={textColor}>{route}</strong>
    </motion.div>
  );
};

export default PageIndicator;
