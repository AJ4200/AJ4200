import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import projects from "../../data/projects";
import ProjectContent from "./Projects/ProjectContent";
import Image from "next/image";

const Projects: React.FC = () => {
  useEffect(() => {
const secondarySlider = new Splide("#secondary-slider", {
  width: "90%",
  fixedWidth: 100,
  fixedHeight: 60,
  arrows: false,
  gap: 2,
  rewind: true,
  autoplay: true,
  pagination: true,
  perPage: 10,
  isNavigation: true,
  breakpoints: {
    // Change options when window width is <= 600px
    "600": {
      fixedWidth: 66,
      fixedHeight: 44,
      perPage: 5, // Show 5 slides per page
      gap: 10, // Increase the gap between slides
      padding: 20, // Add some padding around the slider
    },
    // Change options when window width is <= 400px
    "400": {
      fixedWidth: 50,
      fixedHeight: 30,
      perPage: 3, // Show 3 slides per page
      gap: 5, // Decrease the gap between slides
      padding: 10, // Reduce the padding around the slider
    },
  },
}).mount();


const primarySlider = new Splide("#primary-slider", {
  type: "fade",
  width: "78vw",
  height: "50vh",
  autoplay: true,
  pagination: false,
  arrows: false,
  cover: false,
  breakpoints: {
    // Change options when window width is <= 800px
    "800": {
      type: "slide", // Change the type to slide
      fade: false, // Disable the fade effect
      cover: true, // Enable the cover option
      height: "50vh", // Reduce the height to 50% of the viewport height
    },
    // Change options when window width is <= 600px
    "600": {
      height: "30vh", // Reduce the height to 30% of the viewport height
    },
  },
});


    primarySlider.sync(secondarySlider).mount();
  }, []);

  return (
    <div>
      <div id="primary-slider" className="splide">
        <div className="splide__track ml-20 my-4">
          <ul className="splide__list">
            {projects.map((project, index) => (
              <>
                <li key={index} className="splide__slide flex space-x-2">
                  <Image style={{position:"relative"}}  width={550} height={600*0.4} src={project.image} alt={project.title} />
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
        <div className="splide__track ml-20 border-[var(--neon)] border backdrop-blur-sm">
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
