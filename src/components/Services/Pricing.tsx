import React from'react';
 
const Pricing: React.FC = () => 
{
return (
  <section className="p-4 md:p-8 ">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-200  mb-4 text-darkshadow">
      Our Pricing
    </h2>
    <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3">
      <div className="border border-purple-500 backdrop-blur-sm bg-purple-950/30 rounded p-4 space-y-2 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold text-center text-purple-200 text-shadow mb-4">
            Free
          </h3>
          <p className="text-lg text-gray-300">
            Price varies based on project scope
          </p>
          <ul className="space-y-2 text-gray-300 list-disc pl-2 my-4">
            <li>Initial Consultation</li>
            <li>Mock Design</li>
          </ul>
        </div>
        <button className="text-white border-purple-500 border-b-2 w-full mt-4">
          Get Started
        </button>
      </div>
      <div className="border border-purple-500 backdrop-blur-sm bg-purple-950/30 rounded p-4 space-y-2  flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-center text-purple-200 text-shadow mb-4">
            Flexible
          </h3>
          <p className="text-lg text-gray-300">
            Price varies based on project scope
          </p>
          <ul className="space-y-2 text-gray-300 list-disc pl-2 my-4">
            <li>Next.js Development</li>
            <li>TypeScript Integration</li>
            <li>Tailwind CSS Styling</li>
          </ul>
        </div>
        <button className="text-white border-purple-500 border-b-2 w-full mt-4">
          Contact Us
        </button>
      </div>
      <div className="border border-purple-500 backdrop-blur-sm bg-purple-950/30 rounded p-4 space-y-2  flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-center text-purple-200 text-shadow mb-4">
            Customizable
          </h3>
          <p className="text-lg text-gray-300">
            Price adjusts based on selected features
          </p>
          <ul className="space-y-2 text-gray-300 list-disc pl-2 my-4">
            <li>Hosting Options</li>
            <li>SEO Optimization</li>
            <li>Scaling Features</li>
          </ul>
        </div>
        <button className="text-white border-purple-500 border-b-2 w-full mt-4">
          Customize
        </button>
      </div>
    </div>
  </section>
);
}
export default Pricing;