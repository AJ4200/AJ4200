import React, { useState } from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Projects from "../components/Portfolio/Projects";
import Experience from "../components/Portfolio/Experience";
import Certifications from "../components/Portfolio/Certifications";
import Leaves from "../components/Utils/Leaves";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <PageWithIndicator route={"/portfolio"} bgcolor={"bg-green-500"}>
        <>
          <Leaves />
          <div className="w-full flex mx-auto items-center flex-col">
            <div className="flex md:max-w-xl justify-between w-full">
              <button
                className={`text-darkshadow text-lime-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
                  activeTab === "experience"
                    ? "text-green-500 border-b-8 border-green-500/40"
                    : ""
                }`}
                onClick={() => handleTabClick("experience")}
              >
                Experience
              </button>
              <button
                className={`text-darkshadow text-lime-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
                  activeTab === "projects"
                    ? "text-green-500 border-b-8 border-green-500/40"
                    : ""
                }`}
                onClick={() => handleTabClick("projects")}
              >
                Projects
              </button>
              <button
                className={`text-darkshadow text-lime-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
                  activeTab === "certifications"
                    ? "text-green-500 border-b-8 border-green-500/40"
                    : ""
                }`}
                onClick={() => handleTabClick("certifications")}
              >
                Certifications
              </button>
            </div>

            {activeTab === "projects" && <Projects />}
            {activeTab === "experience" && <Experience />}
            {activeTab === "certifications" && <Certifications />}
          </div>
        </>
      </PageWithIndicator>
    </>
  );
};
export default Portfolio;
