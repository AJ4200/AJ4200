import React from'react';
import MainContact from '../components/Contact/MainContact';
import PageWithIndicator from '../components/Utils/PageWithIndicator';
import Bubbles from '../components/Utils/Bubbles';
import Navbar from '@/components/Navbar/Navbar';
 
const Conctact: React.FC = () => 
{

    
return (
  <>
    {" "}
    <Navbar />
    <PageWithIndicator route="/contact" bgcolor="bg-blue-500">
      <>
        <h1 className="text-shadow my-8 text-center text-5xl">Contact Us.</h1>
        <Bubbles />
        <MainContact />
      </>
    </PageWithIndicator>
  </>
);
}
export default Conctact;