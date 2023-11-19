import React from'react';
 
interface AboutProps{
prop: string
}
 
const About: React.FC<AboutProps> = ({prop}) => 
{
    return (<div
    className='w-full h-full'
    >About</div>);
}
export default About;                                                                                   