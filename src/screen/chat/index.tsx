import React from "react";
import { ChatForm } from "@/conponents/ChatForm";

type Chat = { id: "string"; sender: "ai" | "user"; message: "string" };
type ChatList = Chat[];

export const ChatScreen = async () => {
  const response = await fetch("http://localhost:3333/posts", {});
  const data: ChatList = await response.json();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl">AI 栄養士</h1>
      </header>
      <div className="flex-grow p-4 overflow-auto">
        <div className="flex flex-col space-y-4">
          {data.map((chat, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg shadow-md max-w-md ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-gray-800 self-start"
              }`}
            >
              {chat.message}
            </div>
          ))}
        </div>
      </div>
      <ChatForm />
    </div>
  );
};
