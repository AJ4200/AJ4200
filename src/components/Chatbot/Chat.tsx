import React, { useState } from "react";
import FloatingBot from "./FloatingBot";
import { getTextColor } from "@/lib/navbarUtils";
import { useRouter } from "next/router";
import { FiSend, FiX } from "react-icons/fi";

interface ChatProps {
  onClose: () => void;
}

interface Message {
  type: "user" | "bot";
  content: string;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const router = useRouter();
  const { asPath } = router;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    const response = simulateChatAPI(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: input },
      { type: "bot", content: response },
    ]);
    setInput("");
  };

  const simulateChatAPI = (userMessage: string): string => {
    const responses = [
      "Hello!",
      "How can I assist you?",
      "I'm still a prototype☹️",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="fixed bottom-4 right-4 rounded border-[2px] border-[var(--neon)] p-4 shadow backdrop-blur-md">
      <FiX
        className="absolute right-2 top-2 border border-[var(--neon)] p-1 text-2xl text-[var(--neon)]"
        onClick={onClose}
      />
      <div className="my-2 flex justify-center space-x-2">
        <FloatingBot onClick={onClose} />
        <h1 className={"text-4xl" + ` ${getTextColor(asPath)}`}>
          NootBot<span className="text-sm">alpha</span>
        </h1>
      </div>

      <div className="mb-4 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="message-container">
            {message.type === "user" ? (
              <p className={`text-darkshadow text-right text-white`}>
                {message.content}
              </p>
            ) : (
              <p className={`${getTextColor(asPath)}`}>{message.content}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-l border bg-[var(--neon)] p-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="rounded-r border border-[var(--neon)] p-2 text-xl text-[var(--neon)] backdrop-blur-lg hover:bg-[var(--neon)] focus:outline-none"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
