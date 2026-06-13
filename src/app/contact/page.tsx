"use client";

import MainContact from "@/components/Contact/MainContact";
import Navbar from "@/components/Navbar/Navbar";
import Bubbles from "@/components/Utils/Bubbles";
import PageWithIndicator from "@/components/Utils/PageWithIndicator";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageWithIndicator route="/contact" bgcolor="bg-blue-500">
        <>
          <h1 className="text-shadow my-8 text-center text-5xl">Contact Us.</h1>
          <Bubbles />
          <MainContact />
        </>
      </PageWithIndicator>
    </>
  );
}
