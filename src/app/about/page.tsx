"use client";

import Bio from "@/components/About/Bio";
import Navbar from "@/components/Navbar/Navbar";
import PageWithIndicator from "@/components/Utils/PageWithIndicator";
import Particles from "@/components/Utils/Particles";
import { bioData } from "@/data/bio";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageWithIndicator route="/about" bgcolor="bg-red-500">
        <>
          <Particles />
          <h1 className="text-shadow text-center text-6xl">Bio</h1>
          <div className="mx-4 mt-1 flex justify-stretch rounded-lg bg-red-900/60 bg-opacity-5 p-6 shadow-md backdrop-blur-sm">
            <Bio {...bioData} />
          </div>
        </>
      </PageWithIndicator>
    </>
  );
}
