"use client";

import Navbar from "@/components/Navbar/Navbar";
import Pricing from "@/components/Services/Pricing";
import PageWithIndicator from "@/components/Utils/PageWithIndicator";
import Stars from "@/components/Utils/Stars";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <PageWithIndicator route="/services" bgcolor="bg-purple-500">
        <>
          <Stars />
          <Pricing />
        </>
      </PageWithIndicator>
    </>
  );
}
