"use client";

import { useState, useEffect, useRef } from "react";
import sendMessage from "../../api/openai/send-message";

export default function OpenAi() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      if (messages.length > 0) return;
      const initialMsg = { role: "user", content: "안녕!" };
      const result = await sendMessage([initialMsg]);
      setMessages([
        { role: "user", content: "안녕!" },
        { role: "assistant", content: result },
      ]);
    };
    init();
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const newMsg = { role: "user", content };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const result = await sendMessage(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: result }]);

      setIsLoading(false);
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    } catch {
      // eslint-disable-next-line no-console
      console.error("OpenAi API Error");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "에러 발생" },
      ]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md p-4 mx-auto">
      <div
        ref={chatRef}
        className="flex flex-col h-64 gap-4 mb-4 overflow-y-auto"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words text-start ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 text-gray-800 break-words bg-gray-200 rounded-lg animate-pulse">
              OpenAI가 응답 중...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={() => handleSend(input)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
        >
          전송
        </button>
      </div>
    </div>
  );
}
