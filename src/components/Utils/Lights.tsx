import React from "react";

interface LightsProps {}

const Lights: React.FC<LightsProps> = ({ ...props }) => {
  return (
    <div {...props}>
      {" "}
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>
  );
};
export default Lights;
