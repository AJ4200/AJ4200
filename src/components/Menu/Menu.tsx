import React from "react";
import MenuCard from "./MenuCard";
import { getNeonColor, getTextColor } from "@/lib/navbarUtils";

const Menu: React.FC = () => {
  return (
    <>
      <h1 className="mb-6 text-4xl text-center text-shadow">Welcome</h1>
      <div className="mx-8 my-2 flex h-[70vh] flex-col place-self-center ">
        <div className="grid h-full w-full grid-cols-2 gap-4">
          <div className="col-span-1 ">
            <MenuCard
                          label={"Home"}
                          className={ `${getTextColor("/home")} ` + "h-full border-indigo-600"}
                          imgUrl={"url(imgs/bbw.jpg)"} route={"/home"}            />
          </div>
          <div className="col-span-1 grid grid-rows-3 gap-4">
            <MenuCard
                          label={"About"}
                          className={getTextColor("/about") + " " + "border-red-600"}
                          imgUrl={"url(imgs/apg.jpg)"} route={"/about"}            />
            <MenuCard
                          label={"Portfolio"}
                          className={getTextColor("/portfolio") + " " + "border-green-600"}
                          imgUrl={"url(imgs/pbg.jpg)"} route={"/portfolio"}            />
            <MenuCard
                          label={"Services"}
                          className={getTextColor("/services") + " " + "border-purple-600"}
                          imgUrl={"url(imgs/8753.jpg)"} route={"/services"}            />
          </div>
          <div className="col-span-2">
            <MenuCard
                          label={"Contact"}
                          className={getTextColor("/contact") + " " + "border-blue-600 h-full"}
                          imgUrl={"url(imgs/water.jpg)"} route={"/contact"}            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
