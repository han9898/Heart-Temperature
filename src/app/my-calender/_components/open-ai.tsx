"use client";

import { useState, useEffect, useRef } from "react";
import sendMessage from "../../api/openai/send-message";
import { motion, AnimatePresence } from "framer-motion";

type OpenAiProps = {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
};

export default function OpenAi({ messages, setMessages }: OpenAiProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const initialMsg = { role: "user", content: "안녕!" };
      try {
        const result = await sendMessage([initialMsg]);
        setMessages([{ role: "assistant", content: result }]);

        setTimeout(() => {
          chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 50);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("OpenAi 초기 호출 실패", error);
      }
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
        className="flex-1 h-auto max-h-[460px] mb-4 overflow-y-auto flex flex-col gap-4"
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 text-gray-800 break-words bg-gray-200 rounded-lg animate-pulse">
                  OpenAI가 응답 중...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          disabled={isLoading}
          rows={1}
          className="w-full p-4 overflow-hidden border rounded-lg resize-none focus:outline-none focus:ring-0"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <button
          onClick={() => handleSend(input)}
          className="w-20 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
        >
          전송
        </button>
      </div>
    </div>
  );
}
