import { workExperienceData } from "@/data/experience";
import React from "react";
import ExperienceCard from "./Experience/ExperienceCard";


const Experience: React.FC = () => {
  return (
    <div>
      <h2 className="my-4 text-2xl font-bold text-center text-shadow-theme">Work Experience</h2>
      {workExperienceData.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  );
};

export default Experience;
