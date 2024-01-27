import React, { useState } from "react";
import FloatingBot from "./FloatingBot";
import { getTextColor } from "@/lib/navbarUtils";
import { useRouter } from "next/router";
import { FiSend, FiX } from "react-icons/fi";
import AccessibilityToggle from "./AccessibilityToggle";
import  Draggable  from "react-draggable";

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
        <Draggable
        >
    <div className="fixed bottom-4 right-4 rounded border-[2px] border-[var(--neon)] p-4 shadow backdrop-blur-md">
      <FiX
        className="absolute right-2 top-2 border border-[var(--neon)] p-1 text-2xl text-[var(--neon)]"
        onClick={onClose}
      />
      <div className="my-2 flex justify-center space-x-2 ">
        <FloatingBot onClick={onClose} />
        <h1
          className={
            "text-shadow-theme text-4xl font-bold" + ` ${getTextColor(asPath)}`
          }
        >
          NootBot<span className="text-sm font-thin">alpha</span>
        </h1>
      </div>

      {messages.length > 0 ? (
        <div className="mb-4 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="max-w-80">
              {message.type === "user" ? (
                <p className="text-darkshadow whitespace-normal break-words text-right text-white">
                  {message.content}
                </p>
              ) : (
                <p
                  className={`${getTextColor(
                    asPath,
                  )} whitespace-normal break-words shadow-2xl backdrop-blur-3xl`}
                >
                  {message.content}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-shadow-theme my-2">
          <h2 className="u font-semibold ">
            how may i assist you?
          </h2>
          <span className="flex items-center justify-center space-x-2 border border-[var(--neon)]  ">
            <AccessibilityToggle route={asPath} />
            Font Accessibility
          </span>
        </div>
      )}

      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="text-outline flex-grow rounded-l bg-[var(--neon)] p-2 placeholder:text-black focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="rounded-r border border-[var(--neon)] p-2 text-xl text-[var(--neon)] backdrop-blur-lg hover:bg-[var(--neon)] focus:outline-none"
        >
          <FiSend />
        </button>
      </div>
    </div>
        </Draggable>

  );
};

export default Chat;
