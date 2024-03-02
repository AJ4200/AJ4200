import React from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Particles from "../components/Utils/Particles";
import Bio from "../components/About/Bio";
import { bioData } from "../data/bio";
import Navbar from "@/components/Navbar/Navbar";


const About: React.FC = () => {
  return (
    <>
    
      <Navbar />
      <PageWithIndicator route="/about" bgcolor="bg-red-500">
        <>
          <Particles />
          <h1 className="text-shadow text-center text-6xl">Biography</h1>
          <div className="mx-4 mt-1 flex justify-stretch rounded-lg bg-red-900/60 bg-opacity-5 p-6 shadow-md backdrop-blur-sm">
            <Bio {...bioData} />
          </div>
        </>
      </PageWithIndicator>
    </>
  );
};

export default About;
