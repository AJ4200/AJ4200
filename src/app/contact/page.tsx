import { Suspense } from "react";
import MainContact from "@/components/Contact/MainContact";
import Navbar from "@/components/Navbar/Navbar";
import Bubbles from "@/components/Utils/Bubbles";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="contact-page relative isolate h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
        <div className="contact-bubbles pointer-events-none fixed inset-0 z-20 overflow-hidden">
          <Bubbles />
        </div>
        <div className="contact-backdrop pointer-events-none fixed inset-0 -z-10" />
        <Suspense fallback={<div className="min-h-[calc(100dvh-5rem)]" />}>
          <MainContact />
        </Suspense>
      </div>
    </>
  );
}
