import Chatbot from "@/components/Chatbot/Chatbot";
import Navbar from "@/components/Navbar/Navbar";
import Cursor from "@/components/Utils/Cursor";
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

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Cursor />
      <Chatbot prop={""} />
    </>
  );
}
