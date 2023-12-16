import React from "react";
import { certificationsData } from "../../data/certifications";
import CertificationCard from "./Certifications/CertificationCard";

const Certifications: React.FC = () => {
  return (
    <div className="app">
      {certificationsData.map((certification, index) => (
        <CertificationCard key={index} certification={certification} />
      ))}
    </div>
  );
};
export default Certifications;
