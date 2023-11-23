import React from'react';
import Pricing from '../components/Services/Pricing';
 
interface ServicesProps{
prop: string
}
 
const Services: React.FC<ServicesProps> = ({prop}) => 
{
return (<Pricing/>);
}
export default Services;