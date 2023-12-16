import React from'react';
import FloatingBot from './FloatingBot';
 
interface ChatbotProps{
prop: string
}
 
const Chatbot: React.FC<ChatbotProps> = ({prop}) => 
{
return (<FloatingBot/>);
}
export default Chatbot;