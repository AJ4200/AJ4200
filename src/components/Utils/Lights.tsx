import React from "react";

interface LightsProps {}

const Lights: React.FC<LightsProps> = ({ ...props }) => {
  return (
    <div {...props}>
      {" "}
      <div className="light y1"></div>
      <div className="light y2"></div>
      <div className="light y3"></div>
      <div className="light y4"></div>
      <div className="light y5"></div>
      <div className="light y6"></div>
      <div className="light y7"></div>
      <div className="light y8"></div>
      <div className="light y9"></div>
    </div>
  );
};
export default Lights;
