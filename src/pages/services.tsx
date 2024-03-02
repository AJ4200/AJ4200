import React from "react";
import Pricing from "../components/Services/Pricing";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Stars from "../components/Utils/Stars";
import Navbar from "@/components/Navbar/Navbar";

interface ServicesProps {
  prop: string;
}

const Services: React.FC<ServicesProps> = ({ prop }) => {
  return (
    <>
      <Navbar />
      <PageWithIndicator route={"/services"} bgcolor={"bg-purple-500"}>
        <>
          <Stars />
          <Pricing />
        </>
      </PageWithIndicator>
    </>
  );
};
export default Services;
