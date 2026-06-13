"use client";

import Lights from "@/components/Utils/Lights";
import Menu from "@/components/Menu/Menu";
import Navbar from "@/components/Navbar/Navbar";
import PageWithIndicator from "@/components/Utils/PageWithIndicator";

export default function Page() {
  return (
    <>
      <Navbar />
      <PageWithIndicator route="/" bgcolor="bg-white">
        <>
          <Lights />
          <Menu />
        </>
      </PageWithIndicator>
    </>
  );
}
