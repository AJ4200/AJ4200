// components/Chatbot.tsx

import React, { useState } from "react";
import FloatingBot from "./FloatingBot";
import Chat from "./Chat";

const Chatbot: React.FC = () => {
  const [chatToggle, setChatToggle] = useState(false);

  const handleChatToggle = () => {
    setChatToggle(!chatToggle);
  };

  return (
    <div>
      {chatToggle ? (
        <Chat onClose={handleChatToggle} />
      ) : (
        <div className="fixed bottom-4 right-4">
          {" "}
          <FloatingBot onClick={handleChatToggle} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
