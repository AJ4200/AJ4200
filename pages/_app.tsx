import Navbar from "../components/Navbar/Navbar";
import MouseMoveEffect from "../components/Utils/Cursor";
import "@splidejs/splide/css/core";
import "../styles/globals.css";
import "../styles/mousefollow.css";
import "../styles/custome-loaders.css";
import "../styles/robot.scss";
import "../styles/bubbles.css";
import "../styles/leaves.css";

import type { AppProps } from "next/app";
import Chatbot from "../components/Chatbot/Chatbot";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <MouseMoveEffect />
      
      <Chatbot prop={""} />
    </>
  );
}
export default MyApp;
