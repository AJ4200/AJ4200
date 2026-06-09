import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import { certificationsData } from "../../data/certifications";
import CertificationCard from "./Certifications/CertificationCard";

const Certifications: React.FC = () => {
  useEffect(() => {
    new Splide("#certifications-slider", {
      type: "slide",
      perPage: 3,
      perMove: 1,
      gap: "1rem",
      pagination: false,
      width: "80%",
      rewind: true,
      focus: 1,
start:1,
      autoplay:true
    }).mount();
  }, []);

  return (
        <><h2 className="my-4 text-2xl font-bold text-center text-shadow-theme">Certifications Obtained</h2><div id="certifications-slider" className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          {certificationsData.map((certification, index) => (
            <li className="splide__slide" key={index}>
              <CertificationCard certification={certification} />
            </li>
          ))}
        </ul>
      </div>
    </div></>
  );
};

export default Certifications;
