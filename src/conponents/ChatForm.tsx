"use client";

import { State, actionMessage } from "@/screen/chat/actions";
import { useFormState } from "react-dom";

export const initialState: State = {
  result: null,
  message: "",
};

export const ChatForm = () => {
  const [state, dispatch] = useFormState(actionMessage, initialState);

  return (
    <form
      action={dispatch}
      className="bg-white p-4 flex flex-col justify-between items-center border-t"
    >
      {state.result === "error" && (
        <div className="w-full mb-4 text-red-600 border border-red-600 p-2 rounded-md">
          {state.message}
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <input
          id="message"
          name="message"
          type="text"
          className="flex-grow p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          送信
        </button>
      </div>
    </form>
  );
};
