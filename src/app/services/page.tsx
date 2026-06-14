import Navbar from "@/components/Navbar/Navbar";
import Pricing from "@/components/Services/Pricing";
import Stars from "@/components/Utils/Stars";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="services-page relative isolate h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
        <div className="services-stars pointer-events-none fixed inset-0 z-30 overflow-hidden">
          <Stars />
        </div>
        <div className="services-backdrop pointer-events-none fixed inset-0 -z-10" />
        <Pricing />
      </div>
    </>
  );
}
