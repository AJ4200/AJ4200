import React from'react';
 
interface ChatProps{
prop: string
}
 
const Chat: React.FC<ChatProps> = ({prop}) => 
{
return (<div>Chat</div>);
}
export default Chat;