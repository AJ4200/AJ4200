import React from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  text_color: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children,text_color }) => {
  return (
    <a href={to} className={`mx-4 ${text_color}`}>
      {children}
    </a>
  );
};

export default NavLink;
