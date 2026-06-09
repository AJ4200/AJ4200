import React, { useEffect } from "react";

interface BarsProps {
  isplaying: boolean;
}

const Bars: React.FC<BarsProps> = ({ isplaying }) => {

  return (
    <div className="flex h-12 w-12 items-center justify-center space-x-1 rounded-full border border-[var(--neon)] shadow-inner backdrop-blur-lg">
      <div className={`bar ${isplaying && "playing"}`} />
      <div className={`bar ${isplaying && "playing"}`} />
      <div className={`bar ${isplaying && "playing"}`} />
      <div className={`bar ${isplaying && "playing"}`} />
      <div className={`bar ${isplaying && "playing"}`} />
    </div>
  );
};
export default Bars;
