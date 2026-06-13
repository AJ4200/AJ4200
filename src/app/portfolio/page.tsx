"use client";

import { useState } from "react";
import Certifications from "@/components/Portfolio/Certifications";
import Experience from "@/components/Portfolio/Experience";
import Projects from "@/components/Portfolio/Projects";
import Navbar from "@/components/Navbar/Navbar";
import Leaves from "@/components/Utils/Leaves";
import PageWithIndicator from "@/components/Utils/PageWithIndicator";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <Navbar />
      <PageWithIndicator route="/portfolio" bgcolor="bg-green-500">
        <>
          <Leaves />
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="flex w-full justify-between md:max-w-xl">
              {["experience", "projects", "certifications"].map((tab) => (
                <button
                  key={tab}
                  className={`text-darkshadow w-1/3 py-2 font-semibold text-lime-500 backdrop-blur-md ${
                    activeTab === tab
                      ? "border-b-8 border-green-500/40 text-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "projects" && <Projects />}
            {activeTab === "experience" && <Experience />}
            {activeTab === "certifications" && <Certifications />}
          </div>
        </>
      </PageWithIndicator>
    </>
  );
}
