import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import projects from "../../data/projects";
import ProjectContent from "./Projects/ProjectContent";

const Projects: React.FC = () => {
  useEffect(() => {
    const secondarySlider = new Splide("#secondary-slider", {
      fixedWidth: 100,
      fixedHeight: 60,
      gap: 2,
      rewind: true,
      autoplay: true,
      pagination: false,
      perPage: 10,
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
      width: 700,
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
              <>
                <li key={index} className="splide__slide">
                  <img src={project.image} alt={project.title} />{" "}
                  <ProjectContent
                    title={project.title}
                    description={project.description}
                    techStack={project.techStack as []}
                    link={project.link}
                    sourceCode={project.sourceCode}
                  />
                </li>
              </>
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
