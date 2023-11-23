import React from "react";
import Pricing from "../components/Services/Pricing";
import PageWithIndicator from "../components/Utils/PageWithIndicator";

interface ServicesProps {
  prop: string;
}

const Services: React.FC<ServicesProps> = ({ prop }) => {
  return (
    <PageWithIndicator route={"/services"} bgcolor={"bg-purple-500"}>
      <Pricing/>
    </PageWithIndicator>
  );
};
export default Services;
