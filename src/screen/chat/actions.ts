"use server";

export const actionMessage = async (formData: FormData) => {
  const apiKey = process.env.DIFY_API_KEY || "";
  console.log("サーバー処理", process.env.DIFY_API_KEY);

  const body = {
    inputs: {},
    query: "糖質制限について教えて",
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
    const response = await fetch("http://localhost/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      next: { revalidate: 60 },
    });
    const data = await response.json();
    console.log("レスポンス", data);
  } catch (error) {
    console.log(error);
  }
};
