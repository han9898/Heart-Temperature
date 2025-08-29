"use client";

import { useState, useEffect } from "react";
import Drawer from "../../../components/drawer";
import sendMessage from "../../api/openai/send-message";

export default function OpenAi() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
      const initialMsg = { role: "user", content: "안녕!" };
      setMessages([initialMsg]);
      const result = await sendMessage([initialMsg]);
      setResponse(result);
    };
    init();
  }, []);

  const handleSend = async (content: string) => {
    const newMsg = { role: "user", content };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    try {
      const result = await sendMessage(updatedMessages);
      setResponse(result);
    } catch {
      // eslint-disable-next-line no-console
      console.error("OpenAi API Error");
      setResponse("에러 발생");
    }
  };

  const options = ["오늘 기분은 좋아", "오늘 피곤해", "오늘 기대돼"];

  return (
    <div>
      <Drawer label="AI 감정 분석">
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="mt-4">{response}</p>

          <div className="flex gap-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(opt)}
                className="px-3 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-700"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
