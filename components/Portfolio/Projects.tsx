import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import projects from "../../data/projects";

const Projects: React.FC = () => {
  useEffect(() => {
    const secondarySlider = new Splide("#secondary-slider", {
      fixedWidth: 100,
      fixedHeight: 60,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      breakpoints: {
        "600": {
          fixedWidth: 66,
          fixedHeight: 44,
        },
      },
    }).mount();

    const primarySlider = new Splide("#primary-slider", {
      type: "fade",
      heightRatio: 0.5,
      pagination: false,
      arrows: false,
      cover: true,
    });

    primarySlider.sync(secondarySlider).mount();
  }, []);

  return (
    <div>
      <div id="primary-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {projects.map((project, index) => (
              <li key={index} className="splide__slide">
                <img src={project.image} alt={project.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="secondary-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {projects.map((project, index) => (
              <li key={index} className="splide__slide">
                <img src={project.image} alt={project.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
