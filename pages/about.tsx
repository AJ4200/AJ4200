import React from'react';
import PageWithIndicator from '../components/Utils/PageWithIndicator';
 
interface AboutProps{
prop: string
}
 
const About: React.FC<AboutProps> = ({prop}) => 
{
    return (<>
        <PageWithIndicator route='/about' bgcolor='bg-red-500'>
        <span>About</span>
        </PageWithIndicator></>);
}
export default About;                                                                                   