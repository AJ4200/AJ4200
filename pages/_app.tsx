import Navbar from "../components/Navbar/Navbar";
import MouseMoveEffect from "../components/Utils/Cursor";
import "../styles/globals.css";
import "../styles/mousefollow.css"

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <MouseMoveEffect/>
    </>
  );
}
export default MyApp;
