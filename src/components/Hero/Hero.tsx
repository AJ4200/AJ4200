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
            activeTab === "githeat"
              ? "text-indigo-500 border-b-8 border-indigo-500/40"
              : ""
          }`}
          onClick={() => handleTabClick("githeat")}
        >
          Git Heat
        </button>
        <button
          className={`text-slate-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
            activeTab === "main"
              ? "text-indigo-500 border-b-8 border-indigo-500/40"
              : ""
          }`}
          onClick={() => handleTabClick("main")}
        >
          Main
        </button>
        <button
          className={`text-slate-500 font-semibold backdrop-blur-md w-[33.33%] py-2 ${
            activeTab === "latest"
              ? "text-indigo-500 border-b-8 border-indigo-500/40"
              : ""
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
          <span className="font-bold text-indigo-600 text-shadow text-2xl">Latest Project</span>
          <img
            src="/imgs/Screenshot.png"
            className="mt-2 text-center rounded-md md:w-[60%] max-w-[80%] z-[99]"
          />
          <span className="text-indigo-500 -scroll-mt-72">
            Check it Out{" "}
            <a
              href="https://diealouge.vercel.app/"
              className="text-indigo-300 underline font-semibold"
            >
              Here!
            </a>  
          </span>
        </>
      )}
    </div>
  );
};

export default Hero;
