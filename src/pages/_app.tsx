import Chatbot from "@/components/Chatbot/Chatbot";
import Navbar from "@/components/Navbar/Navbar";
import Cursor from "@/components/Utils/Cursor";
import "@/styles/globals.css";

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
