import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PageWithIndicator: React.FC<{ route: string; bgcolor: string,children:React.ReactElement }> = ({
  route,
  bgcolor,
  children,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {showContent ? (
        children
      ) : (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed flex w-full justify-center h-full z-[99]"
        >
          <span className={`${bgcolor} text-center text-5xl w-full pt-[25%]`}>
            {route}
          </span>
        </motion.div>
      )}
    </>
  );
};

export default PageWithIndicator;
