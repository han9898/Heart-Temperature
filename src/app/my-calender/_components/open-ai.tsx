"use client";

import { useState, useEffect, useRef } from "react";
import sendMessage from "../../api/openai/send-message";
import { motion, AnimatePresence } from "framer-motion";
import { getAnalysisPrompt } from "../../../prompts/analysis-prompt";

type OpenAiProps = {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  weekData?: {
    scores: {
      positive: number;
      neutral: number;
      negative: number;
    };
    diaries: string[];
  };
};

export default function OpenAi({
  messages,
  setMessages,
  weekData,
}: OpenAiProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      setMessages([]);
      const initialMsg = { role: "user", content: "안녕!" };
      try {
        const result = await sendMessage([initialMsg]);
        setMessages([{ role: "assistant", content: result }]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("OpenAi 초기 호출 실패", error);
      }
    };
    init();
  }, [setMessages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const newMsg = { role: "user", content };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const additionalMessage = getAnalysisPrompt(weekData, content);
      const messagesToSend = [
        ...messages,
        newMsg,
        { role: "user", content: additionalMessage },
      ];
      const result = await sendMessage(messagesToSend);
      setMessages((prev) => [...prev, { role: "assistant", content: result }]);
    } catch {
      // eslint-disable-next-line no-console
      console.error("OpenAi API Error");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "에러 발생" },
      ]);
    } finally {
      setIsLoading(false);
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
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words whitespace-pre-wrap text-start ${
                  msg.role === "user"
                    ? "bg-green-500 text-white rounded-br-none dark:bg-green-700"
                    : "bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-200"
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
                <div className="max-w-xs px-4 py-2 text-gray-800 break-words bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700 dark:text-gray-200">
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
          placeholder={
            messages.length > 2 || !weekData
              ? "감정 분석을 받으셨어요. 😆"
              : "메시지를 입력하세요"
          }
          disabled={isLoading || messages.length > 2 || !weekData}
          rows={1}
          className="w-full p-4 overflow-hidden border rounded-lg resize-none focus:outline-none focus:ring-0 dark:bg-slate-800 dark:border-gray-700"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <button
          onClick={() => handleSend(input)}
          disabled={messages.length > 2 || !weekData}
          className={`w-20 px-4 py-2 text-white rounded-lg ${
            messages.length > 2 || !weekData
              ? "bg-gray-300 cursor-not-allowed"
              : "dark:bg-green-700 dark:hover:bg-green-800 bg-green-500 hover:bg-green-700"
          }`}
        >
          전송
        </button>
      </div>
    </div>
  );
}
