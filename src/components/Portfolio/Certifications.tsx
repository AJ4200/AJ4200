import React from "react";
import { certificationsData } from "../../data/certifications";
import CertificationCard from "./Certifications/CertificationCard";

const Certifications: React.FC = () => {
  return (
    <div className="backdrop-blur-md grid gap-4 md:gap-4 h-[70vh] overflow-x-scroll mx-8 grid-flow-col max-w-[90%] snap-x snap-mandatory snap-start">
      {certificationsData.map((certification, index) => (
        <CertificationCard key={index} certification={certification} />
      ))}
    </div>
  );
};
export default Certifications;
