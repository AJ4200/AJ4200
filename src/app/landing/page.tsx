"use client";

import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Matrix from "@/components/Utils/Matrix";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <Matrix />
        <Hero />
      </div>
    </>
  );
}
