import { useState } from "react";

interface MobileNavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`logo block fixed top-0 left-0 h-screen w-screen transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md h-20">
        {" "}
        {/*logo container*/}
        <a className="text-xl font-semibold" href="/">
          <b>
            a<span>j</span>4<span>2</span>00
          </b>
        </a>
      </div>
      <div className="flex flex-col text-center bg-inherit">
        <a
          className="text-xl font-medium my-4"
          href="/"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Home
        </a>
        <a
          className="text- text-xl font-normal my-4"
          href="/about"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          About
        </a>
        <a
          className="text- text-xl font-normal my-4"
          href="/portfolio"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Portfolio
        </a>
        <a
          className="text- text-xl font-normal my-4"
          href="/services"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Services
        </a>
        <a
          className="text- text-xl font-normal my-4"
          href="/contacts"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Contacts
        </a>
      </div>
    </div>
  );
};

export default MobileNavbar;
