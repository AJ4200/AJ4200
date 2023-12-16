import React from "react";
import Hero from "../components/Hero/Hero";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Matrix from "@/components/Utils/Matrix";

export default function Home() {
  return (
    <>
      <PageWithIndicator route={"/"} bgcolor={"bg-indigo-500"}>
        <>
        <Matrix/>
          <Hero />
        </>
      
      </PageWithIndicator>
    </>
  );
}
