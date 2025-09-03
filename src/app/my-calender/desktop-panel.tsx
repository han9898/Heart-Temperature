"use client";

import { useState } from "react";
import OpenAi from "./_components/open-ai";
import EmotionRecorder from "./_components/add-emotion";

export default function DesktopPanel({
  messages,
  setMessages,
  setNewTodos,
  weekData,
  setDrawerOpen,
}: {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  setNewTodos: React.Dispatch<unknown>;
  weekData: {
    scores: {
      positive: number;
      neutral: number;
      negative: number;
    };
    diaries: string[];
  };
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpenAIVisible, setIsOpenAIVisible] = useState(false);
  const [isEmotionVisible, setIsEmotionVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden transition-all duration-500 bg-slate-50 rounded-2xl">
        <div
          className={`flex group justify-between px-8 py-4 text-lg font-bold cursor-pointer transition-all duration-500 ${isOpenAIVisible ? "text-gray-400" : ""}`}
          onClick={() => {
            setIsOpenAIVisible((prev) => !prev);
            setIsEmotionVisible(false);
          }}
        >
          <div>Open AI</div>
          <div
            className={`transition-transform duration-300 ${isOpenAIVisible ? "rotate-180 text-gray-400" : "rotate-0 group-hover:rotate-180"}`}
          >
            ▼
          </div>
        </div>
        <div
          className={`px-4 transition-all duration-1000 ${
            isOpenAIVisible ? "max-h-[600px]" : "max-h-0"
          } overflow-hidden`}
        >
          <OpenAi
            messages={messages}
            setMessages={setMessages}
            weekData={weekData}
          />
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-500 bg-slate-50 rounded-2xl">
        <div
          className={`flex group justify-between px-8 py-4 text-lg font-bold cursor-pointer transition-all duration-500 ${isEmotionVisible ? "text-gray-400" : ""}`}
          onClick={() => {
            setIsEmotionVisible((prev) => !prev);
            setIsOpenAIVisible(false);
          }}
        >
          <div>오늘의 감정은 어떤가요?</div>
          <div
            className={`transition-transform duration-300 ${isEmotionVisible ? "rotate-180 text-gray-400" : "rotate-0 group-hover:rotate-180"}`}
          >
            ▼
          </div>
        </div>
        <div
          className={`px-4 transition-all duration-1000 ${
            isEmotionVisible ? "max-h-[500px]" : "max-h-0"
          } overflow-hidden`}
        >
          <EmotionRecorder
            setTodos={setNewTodos}
            setDrawerOpen={setDrawerOpen}
          />
        </div>
      </div>
    </div>
  );
}
