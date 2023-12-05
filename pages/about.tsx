import React from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Bio from "../components/Portfolio/About/Bio";
import bioData from "../data/bio";

interface AboutProps {
  prop: string;
}

const About: React.FC<AboutProps> = ({ prop }) => {
  return (
    <>
      <PageWithIndicator route="/about" bgcolor="bg-red-500">
        <Bio {...bioData} />
      </PageWithIndicator>
    </>
  );
};

export default About;
