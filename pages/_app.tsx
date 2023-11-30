import Navbar from "../components/Navbar/Navbar";
import MouseMoveEffect from "../components/Utils/Cursor";
import "../styles/globals.css";
import "../styles/mousefollow.css"
import "../styles/custome-loaders.css"
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import "../styles/robot.scss"


import type { AppProps } from "next/app";
import Chatbot from "../components/Chatbot/Chatbot";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <MouseMoveEffect />
      <Chatbot prop={""}/>
    </>
  );
}
export default MyApp;
