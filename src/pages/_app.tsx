import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Chatbot from "@/components/Chatbot/Chatbot";
import Cursor from "@/components/Utils/Cursor";
import "@splidejs/splide/css/core";
import "@/styles/globals.css";
import "@/styles/bubbles.css";
import "@/styles/custome-loaders.css";
import "@/styles/leaves.css";
import "@/styles/mousefollow.css";
import "@/styles/particles.css";
import "@/styles/stars.css";
import "@/styles/robot.scss";
import "@/styles/particles.css";
import "@/styles/matrix.css";
import "@/styles/musicplayer.css";
import "@/styles/lights.css"
import "@splidejs/splide/dist/css/splide.min.css";
import "animate.css";

import type { AppProps } from "next/app";
import PageLoader from "@/components/Navbar/PageLoader";
import { getNeonColor, getStyles } from "@/lib/navbarUtils";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const { asPath } = router;

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };
    const body = document.querySelector("body");
    if (body) {
      const styles = getStyles(asPath);
      body.style.backgroundImage = styles.backgroundImage;
      body.style.fontFamily = styles.fontFamily;
    }
    document.documentElement.style.setProperty("--neon", getNeonColor(asPath));
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [asPath]);

  return (
    <>
      <PageLoader loading={loading} /> 
      <Component {...pageProps} />
      <Cursor />
      <Chatbot />
    </>
  );
};

export default App;
