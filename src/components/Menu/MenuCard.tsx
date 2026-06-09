import { getNeonColor } from "@/lib/navbarUtils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaHandPointer, FaInfo } from "react-icons/fa";

interface MenuCardProps {
  label: string;
  className: string;
  imgUrl: string;
  route: string;
  info: string[];
}

const MenuCard: React.FC<MenuCardProps> = ({
  className,
  imgUrl,
  label,
  route,
  info,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

const cardStyle = {
  backgroundImage: isHovered ? "none" : imgUrl,
  backgroundColor: isHovered ? getNeonColor(route) : "transparent",
  Position: isHovered ? "fixed" : "relative", // Corrected 'Position' to 'position'
  zIndex: isHovered ? "999" : "1", // Ensure the hovered card is above other content
};


  return (
    <div
      className={
        `active:scale-60 z-999 transform border p-2 transition-transform delay-150 hover:scale-110 ${label == "Contact" ? "hover:scale-105" : "hover:scale-110"}` +
        " " +
        className
      }
      style={cardStyle}
      onClick={() => {
        router.push(route);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <>
          <span className="text-darkoutline text-4xl">{label}</span>
          <p className="text-darkshadow">On this page...</p>
          <ul className="my-2 bg-white/40 p-2">
            {info.map((item, index) => (
              <li
                className="text-shadow flex items-center space-x-2 py-1 text-sm text-black"
                key={index}
              >
                <FaInfo className="size-7 rounded-full border border-black p-1" />
                {item}
              </li>
            ))}
          </ul>
          <span className="text-darkoutline relative bottom-2 right-2 mt-4 flex items-center p-2 text-lg">
            Click to Visit!
            <FaHandPointer className="ml-2 flex size-8 rounded-full bg-black/40 p-[2px] shadow-lg" />
          </span>
        </>
      ) : (
        <span className="text-darkshadow text-4xl">{label}</span>
      )}
    </div>
  );
};

export default MenuCard;
