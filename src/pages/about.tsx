import React from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Particles from "../components/Utils/Particles";
import Bio from "../components/About/Bio";
import { bioData } from "../data/bio";


const About: React.FC = () => {
  return (
    <>
      <PageWithIndicator route="/about" bgcolor="bg-red-500">
        <>
          <Particles />
          <h1 className="text-center text-6xl text-shadow">Biography</h1>
          <div className="bg-red-900/60 bg-opacity-5 mt-1 backdrop-blur-sm p-6 rounded-lg shadow-md mx-4 flex justify-stretch">
            <Bio {...bioData} />
          </div>
        </>
      </PageWithIndicator>
    </>
  );
};

export default About;
