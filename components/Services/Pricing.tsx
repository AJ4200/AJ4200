import React from'react';
 
const Pricing: React.FC = () => 
{
return (
  <section className="p-4 md:p-8 ">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-200  mb-4 text-darkshadow">
      Our Pricing
    </h2>
    <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3">
      <div className="border border-gray-200 rounded p-4 space-y-2 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
            Free
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Initial Consultation</li>
            <li>Mock Design</li>
          </ul>
        </div>
        <button className="w-full mt-4">Get Started</button>
      </div>
      <div className="border border-gray-200 rounded p-4 space-y-2  flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
            Flexible
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Price varies based on project scope
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Next.js Development</li>
            <li>TypeScript Integration</li>
            <li>Tailwind CSS Styling</li>
          </ul>
        </div>
        <button className="w-full mt-4">Contact Us</button>
      </div>
      <div className="border border-gray-200 rounded p-4 space-y-2  flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
            Customizable
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Price adjusts based on selected features
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Hosting Options</li>
            <li>SEO Optimization</li>
            <li>Scaling Features</li>
          </ul>
        </div>
        <button className="w-full mt-4">Customize</button>
      </div>
    </div>
  </section>
);
}
export default Pricing;