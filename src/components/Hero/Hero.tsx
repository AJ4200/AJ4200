import React, { useState } from "react";
import TitleCard from "./TitleCard";
import GitHubHeatmap from "./GitHeat";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("main");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="flex w-full justify-between md:max-w-xl ">
        <button
          className={`w-[33.33%] py-2 font-semibold text-slate-500 backdrop-blur-md  hover:text-slate-100  ${
            activeTab === "githeat"
              ? "border-b-8 border-indigo-500/40 text-indigo-500"
              : ""
          }`}
          onClick={() => handleTabClick("githeat")}
        >
          Git Heat
        </button>
        <button
          className={`w-[33.33%] py-2 font-semibold text-slate-500 backdrop-blur-md  hover:text-slate-100  ${
            activeTab === "main"
              ? "border-b-8 border-indigo-500/40 text-indigo-500"
              : ""
          }`}
          onClick={() => handleTabClick("main")}
        >
          Main
        </button>
        <button
          className={`w-[33.33%] py-2 font-semibold text-slate-500 backdrop-blur-md  hover:text-slate-100  ${
            activeTab === "latest"
              ? "border-b-8 border-indigo-500/40 text-indigo-500"
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
          <span className="text-shadow text-2xl font-bold text-indigo-600">
            Latest Project
          </span>
          <img
            src="/imgs/Screenshot.png"
            className="z-[99] mt-2 max-w-[80%] rounded-md text-center md:w-[60%]"
          />
          <span className="-scroll-mt-72 text-indigo-500">
            Check it Out{" "}
            <a
              href="https://diealouge.vercel.app/"
              className="font-semibold text-indigo-300 underline"
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
