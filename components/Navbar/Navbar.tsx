import React, { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavLink from "./NavLink";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="logo md:sticky text-shadow flex filter drop-shadow-md bg-transparent backdrop-blur-md px-4 py-4 h-20 items-center">
      <MobileNavbar open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        {open ? (
          ""
        ) : (
          <a className="text-2xl font-semibold" href="/">
            <b>
              #a<span>j</span>4<span>2</span>00
            </b>
          </a>
        )}
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className=" flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? "bg-transparent" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/portfolio">PORTFOLIO</NavLink>
          <NavLink to="/services">SERVICES</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
