import React, { useEffect } from "react";
import Splide from "@splidejs/splide";

const Projects:React.FC = () => {
  useEffect(() => {
    const secondarySlider = new Splide("#secondary-slider", {
      fixedWidth: 100,
      height: 60,
      gap: 10,
      cover: true,
      isNavigation: true,
      focus: "center",
      breakpoints: {
        "600": {
          fixedWidth: 66,
          height: 40,
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
          <ul className="splide__list">{/* Add your slide items here */}</ul>
        </div>
      </div>

      <div id="secondary-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {/* Add your thumbnail items here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
