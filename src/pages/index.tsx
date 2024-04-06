import React, { useEffect } from "react";
import PageWithIndicator from "../components/Utils/PageWithIndicator";
import Menu from "@/components/Menu/Menu";
import { getStyles, getNeonColor } from "@/lib/navbarUtils";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import Lights from "@/components/Utils/Lights";

export default function Home() {
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      const styles = getStyles(asPath);
      body.style.backgroundImage = styles.backgroundImage;
      body.style.fontFamily = styles.fontFamily;
    }
    document.documentElement.style.setProperty("--neon", getNeonColor(asPath));
  }, [asPath]);
  return (
    <>
      <Navbar />
      <PageWithIndicator route={"/"} bgcolor={"bg-white"}>
        <>
          <Lights/>
          <Menu />
        </>
      </PageWithIndicator>
    </>
  );
}
