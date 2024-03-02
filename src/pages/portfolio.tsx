import React, { useState } from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Projects from "../components/Portfolio/Projects";
import Experience from "../components/Portfolio/Experience";
import Certifications from "../components/Portfolio/Certifications";
import Leaves from "../components/Utils/Leaves";
import Navbar from "@/components/Navbar/Navbar";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <Navbar />
      <PageWithIndicator route={"/portfolio"} bgcolor={"bg-green-500"}>
        <>
          <Leaves />
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="flex w-full justify-between md:max-w-xl">
              <button
                className={`text-darkshadow w-[33.33%] py-2 font-semibold text-lime-500 backdrop-blur-md ${
                  activeTab === "experience"
                    ? "border-b-8 border-green-500/40 text-green-500"
                    : ""
                }`}
                onClick={() => handleTabClick("experience")}
              >
                Experience
              </button>
              <button
                className={`text-darkshadow w-[33.33%] py-2 font-semibold text-lime-500 backdrop-blur-md ${
                  activeTab === "projects"
                    ? "border-b-8 border-green-500/40 text-green-500"
                    : ""
                }`}
                onClick={() => handleTabClick("projects")}
              >
                Projects
              </button>
              <button
                className={`text-darkshadow w-[33.33%] py-2 font-semibold text-lime-500 backdrop-blur-md ${
                  activeTab === "certifications"
                    ? "border-b-8 border-green-500/40 text-green-500"
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
