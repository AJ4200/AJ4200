import React from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
};

export default NavLink;
