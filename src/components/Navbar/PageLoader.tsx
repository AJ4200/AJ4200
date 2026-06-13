import React, { useEffect, useState } from "react";

const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-1 bg-[var(--neon)] ${
          loading ? "w-0" : "w-[100vw]"
        } transition-all duration-[5s] ease-in-out`}
      />
      <div
        className={`z-999999 fixed bottom-0 left-0 h-1 bg-[var(--neon)] ${
          loading ? "w-0" : "w-[100vw]"
        } transition-all duration-[5s] ease-in-out`}
      />
    </>
  );
};

export default PageLoader;
