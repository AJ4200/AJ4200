import React, { useState } from "react";
import PageIndicator from "../Utils/PageIndicator";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  text_color: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, text_color }) => {
  const [showRoute, setShowRoute] = useState(false);

  return (
    <>
      {" "}
      <a
        href={to}
        className={`mx-4 ${text_color}`}
        onMouseEnter={() => setShowRoute(true)}
        onMouseLeave={() => setShowRoute(false)}
      >
        {children}
      </a>
      {showRoute && <PageIndicator route={to} TextColor={text_color} />}
    </>
  );
};

export default NavLink;
