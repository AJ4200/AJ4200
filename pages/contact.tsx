import React from'react';
 
interface ConctactProps{
prop: string
}
 
const Conctact: React.FC<ConctactProps> = ({prop}) => 
{
return (<div>Conctact</div>);
}
export default Conctact;