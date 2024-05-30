import React from "react";
import { actionMessage } from "./actions";

export const ChatScreen = () => {
  const messages = [
    { text: "こんにちは、何かご質問はありますか？", sender: "ai" },
    { text: "はい、次の電車の時間を教えてください。", sender: "user" },
    { text: "次の電車は10:30に出発します。", sender: "ai" },
  ];

  // const actionMessage = async (formData: FormData) => {
  //   "use server";
  //   console.log("サーバー処理");
  // };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl">チャットbot</h1>
      </header>
      <div className="flex-grow p-4 overflow-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg shadow-md max-w-md ${
                message.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-gray-800 self-start"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form
        action={actionMessage}
        className="bg-white p-4 flex justify-between items-center border-t"
      >
        <input
          type="text"
          className="flex-grow p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          送信
        </button>
      </form>
    </div>
  );
};
