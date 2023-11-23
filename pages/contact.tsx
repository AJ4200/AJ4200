import React, { useEffect, useState } from'react';
import MainContact from '../components/Contact/MainContact';
import PageIndicator from '../components/Utils/PageIndicator';
import PageWithIndicator from '../components/Utils/PageWithIndicator';
 
const Conctact: React.FC = () => 
{

    
return (
  <>
        <PageWithIndicator route='/contact' bgcolor='bg-blue-500'>     
      <MainContact/>   
</PageWithIndicator>
  </>
);
}
export default Conctact;