"use client";

import { useState } from "react";
import OpenAi from "./_components/open-ai";
import EmotionRecorder from "./_components/add-emotion";

export default function DesktopPanel({
  messages,
  setMessages,
  setNewTodos,
}: {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  setNewTodos: React.Dispatch<unknown>;
}) {
  const [isOpenAIVisible, setIsOpenAIVisible] = useState(false);
  const [isEmotionVisible, setIsEmotionVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden transition-all duration-500 bg-slate-50 rounded-2xl">
        <div
          className={`flex justify-between px-8 py-4 text-lg font-bold cursor-pointer transition-all duration-500 ${isOpenAIVisible ? "text-gray-400" : ""}`}
          onClick={() => {
            setIsOpenAIVisible((prev) => !prev);
            setIsEmotionVisible(false);
          }}
        >
          <div>Open AI</div>
          <div
            className={`transition-transform duration-700 ${isOpenAIVisible ? "rotate-180 text-gray-400" : "rotate-0"}`}
          >
            ▼
          </div>
        </div>
        <div
          className={`px-4 transition-all duration-1000 ${
            isOpenAIVisible ? "max-h-[600px]" : "max-h-0"
          } overflow-hidden`}
        >
          <OpenAi messages={messages} setMessages={setMessages} />
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-500 bg-slate-50 rounded-2xl">
        <div
          className={`flex justify-between px-8 py-4 text-lg font-bold cursor-pointer transition-all duration-500 ${isEmotionVisible ? "text-gray-400" : ""}`}
          onClick={() => {
            setIsEmotionVisible((prev) => !prev);
            setIsOpenAIVisible(false);
          }}
        >
          <div>오늘의 감정은 어떤가요?</div>
          <div
            className={`transition-transform duration-700 ${isEmotionVisible ? "rotate-180 text-gray-400" : "rotate-0"}`}
          >
            ▼
          </div>
        </div>
        <div
          className={`px-4 transition-all duration-1000 ${
            isEmotionVisible ? "max-h-[500px]" : "max-h-0"
          } overflow-hidden`}
        >
          <EmotionRecorder setTodos={setNewTodos} />
        </div>
      </div>
    </div>
  );
}
