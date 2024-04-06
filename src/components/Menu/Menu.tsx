import React from "react";
import MenuCard from "./MenuCard";
import { getTextColor } from "@/lib/navbarUtils";

const Menu: React.FC = () => {
  return (
    <>
      <h1 className="text-shadow mb-6 text-center text-4xl">Welcome</h1>
      <div className="mx-8 my-2 flex h-[70vh] min-h-[70vh] flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <MenuCard
              label={"Home"}
              className={`${getTextColor("/home")} h-full border-indigo-600`}
              imgUrl={"url(imgs/bbw.jpg)"}
              route={"/home"}
              info={[
                "Landing Summary Page.",
                "Git Heat: Statistics.",
                "Current Active Project Developed.",
              ]}
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <MenuCard
                label={"About"}
                className={getTextColor("/about") + " border-red-600"}
                imgUrl={"url(imgs/apg.jpg)"}
                route={"/about"}
                info={["Biography.", "Hobbies.", "None Programming Creations."]}
              />
              <MenuCard
                label={"Portfolio"}
                className={getTextColor("/portfolio") + " border-green-600"}
                imgUrl={"url(imgs/pbg.jpg)"}
                route={"/portfolio"}
                info={[
                  "Education&Certifications.",
                  "Work Experience.",
                  "Projects Completed.",
                ]}
              />
              <MenuCard
                label={"Services"}
                className={getTextColor("/services") + " border-purple-600"}
                imgUrl={"url(imgs/8753.jpg)"}
                route={"/services"}
                info={["Services Offered.", "Project Scope Calculator."]}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full md:h-[30%]">
          <MenuCard
            label={"Contact"}
            className={getTextColor("/contact") + " h-full border-blue-600"}
            imgUrl={"url(imgs/water.jpg)"}
            route={"/contact"}
            info={["Enquiry form.", "WhatsApp Mode.", "Direct Email Form."]}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
