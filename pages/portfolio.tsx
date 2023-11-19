import React from'react';
 
interface PortfolioProps{
prop: string
}
 
const Portfolio: React.FC<PortfolioProps> = ({prop}) => 
{
return (<div>Portfolio</div>);
}
export default Portfolio;