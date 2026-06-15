import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@splidejs/splide/css/core";
import "@splidejs/splide/dist/css/splide.min.css";
import "animate.css";
import "@/styles/globals.css";
import "@/styles/bubbles.css";
import "@/styles/custome-loaders.css";
import "@/styles/leaves.css";
import "@/styles/mousefollow.css";
import "@/styles/particles.css";
import "@/styles/stars.css";
import "@/styles/robot.scss";
import "@/styles/matrix.css";
import "@/styles/musicplayer.css";
import "@/styles/lights.css";
import "@/styles/about.css";
import "@/styles/portfolio.css";
import "@/styles/services.css";
import "@/styles/contact.css";
import "@/styles/navigation.css";
import "@/styles/chatbot.css";
import "@/styles/page-loader.css";
import AppShell from "./app-shell";

export const metadata: Metadata = {
  title: {
    default: "AJ4200",
    template: "%s | AJ4200",
  },
  description: "AJ4200 developer portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
