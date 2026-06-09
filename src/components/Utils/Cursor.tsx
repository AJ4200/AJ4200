import React, { useState, useEffect } from "react";
import gsap from "gsap";

const Cursor: React.FC = () => {
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      setIsMoving(true);

      gsap.to(".cursor", {
        left: e.pageX,
        top: e.pageY,
        duration: 0,
        ease: "power4.easeOut",
      });

      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsMoving(false);
      }, 700);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timer); // Clear the timer on component unmount
    };
  }, []);

  return <div className={`z-[9999999] cursor ${isMoving ? "is-moving" : ""}`}></div>;
};

export default Cursor;
