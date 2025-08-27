"use client";

import { useState } from "react";
import Drawer from "../../../components/drawer";

export default function OpenAi() {
  const [messages, setMessages] = useState([
    { role: "user", content: "안녕!" },
  ]);
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `API 요청 실패: ${res.status} ${res.statusText}\n${JSON.stringify(
            errorData,
          )}`,
        );
      }

      const data = await res.json();
      setResponse(data.content ?? "(빈 응답)");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("OpenAI API Error:", err);
      setResponse("에러 발생");
    }
  };

  return (
    <div>
      <Drawer label="AI 감정 분석">
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="mt-4">{response}</p>

          <button
            onClick={sendMessage}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            Send
          </button>
        </div>
      </Drawer>
    </div>
  );
}
