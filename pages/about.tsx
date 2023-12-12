import React from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import bioData from "../data/bio";
import Particles from "../components/Utils/Particles";
import Bio from "../components/About/Bio";

interface AboutProps {
  prop: string;
}

const About: React.FC<AboutProps> = ({ prop }) => {
  return (
    <>
      <PageWithIndicator route="/about" bgcolor="bg-red-500">
        <>        <Particles />
        <Bio {...bioData} />
        </>
      </PageWithIndicator>
    </>
  );
};

export default About;
