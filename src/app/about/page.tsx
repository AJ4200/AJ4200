"use client";

import Bio from "@/components/About/Bio";
import Navbar from "@/components/Navbar/Navbar";
import Particles from "@/components/Utils/Particles";
import { bioData } from "@/data/bio";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="about-page relative isolate h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
        <Particles />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(239,68,68,0.2),transparent_30%),linear-gradient(to_bottom,rgba(7,3,5,0.28),rgba(12,3,5,0.94)_75%)]" />

        <main className="relative z-10 mx-auto max-w-[100rem] px-4 pb-16 sm:px-6 lg:px-10">
          <Bio {...bioData} />
        </main>
      </div>
    </>
  );
}
