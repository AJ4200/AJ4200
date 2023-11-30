import React from'react';
 
interface ChatbotProps{
prop: string
}
 
const Chatbot: React.FC<ChatbotProps> = ({prop}) => 
{
return (<div>Chatbot</div>);
}
export default Chatbot;