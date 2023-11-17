import React, { useState } from "react";
import TitleCard from "./TitleCard";
import GitHubHeatmap from "./GitHeat";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("main");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="w-full flex mx-auto mt-10 items-center flex-col">
      <div className="flex max-w-md justify-between border-b-2 w-full">
        <button
          className={`py-2 ${
            activeTab === "main" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleTabClick("main")}
        >
          Main
        </button>
        <button
          className={`py-2 ${
            activeTab === "githeat" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleTabClick("githeat")}
        >
          Git Heat
        </button>
        <button
          className={`py-2 ${
            activeTab === "latest" ? "border-b-2 border-blue-500" : ""
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
