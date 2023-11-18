import React, { useState } from "react";
import TitleCard from "./TitleCard";
import GitHubHeatmap from "./GitHeat";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("main");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="w-full flex mx-auto items-center flex-col">
      <div className="flex md:max-w-xl justify-between w-full">
        <button
          className={`text-slate-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
            activeTab === "githeat" ? "text-indigo-500 border-b-8 border-indigo-500/40" : ""
          }`}
          onClick={() => handleTabClick("githeat")}
        >
          Git Heat
        </button>
        <button
          className={`text-slate-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
            activeTab === "main" ? "text-indigo-500 border-b-8 border-indigo-500/40" : ""
          }`}
          onClick={() => handleTabClick("main")}
        >
          Main
        </button>
        <button
          className={`text-slate-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
            activeTab === "latest" ? "text-indigo-500 border-b-8 border-indigo-500/40" : ""
          }`}
          onClick={() => handleTabClick("latest")}
        >
          latest
        </button>
      </div>

      {activeTab === "main" && <TitleCard />}
      {activeTab === "githeat" && <GitHubHeatmap />}
      {activeTab === "latest" && (
        <>
          <span>Latest Project</span>
          <iframe
            src="https://diealouge.vercel.app"
            className="mt-6 p-4 text-center rounded-md"
          />
        </>
      )}
    </div>
  );
};

export default Hero;
