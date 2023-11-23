import React from'react';
import PageWithIndicator from '../components/Utils/PageWithIndicator';
 
interface PortfolioProps{
prop: string
}
 
const Portfolio: React.FC<PortfolioProps> = ({prop}) => 
{
    return (<><PageWithIndicator route={'/portfolio'} bgcolor={'bg-green-500'}>
    <p>portfolio</p>
    </PageWithIndicator></>);
}
export default Portfolio;