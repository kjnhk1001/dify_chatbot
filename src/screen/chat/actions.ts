"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export type State = {
  result: string | null;
  message: string | null;
};

export const actionMessage = async (
  _: State,
  formData: FormData
): Promise<State> => {
  const apiKey = process.env.DIFY_API_KEY || "";
  const message = formData.get("message");

  const body = {
    inputs: {},
    query: message,
    response_mode: "blocking",
    conversation_id: "",
    user: "abc-123",
    files: [
      {
        type: "image",
        transfer_method: "remote_url",
        url: "https://cloud.dify.ai/logo/logo-site.png",
      },
    ],
  };

  try {
    // DBにユーザーメッセージ追加
    await fetch("http://localhost:3333/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: randomUUID(),
        sender: "user",
        message: message,
      }),
    });

    // DifyのAPIを実行
    const response = await fetch("http://localhost/v1/chat-messages", {
      cache: "force-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      next: { revalidate: 60 },
    });
    const data = await response.json();

    // DBにAIメッセージを追加
    await fetch("http://localhost:3333/posts", {
      cache: "force-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: randomUUID(),
        sender: "ai",
        message: data.answer,
      }),
    });

    revalidatePath("/chat");
    return { result: "ok", message: "メッセージの送信に成功しました" };
  } catch (error) {
    console.log(error);

    return { result: "error", message: "エラーが発生しました" };
  }
};
