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
    <div className="hidden md:block">
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden transition-all duration-300 bg-slate-50 rounded-2xl">
          <div
            className="flex justify-between px-8 py-4 text-lg font-bold cursor-pointer"
            onClick={() => setIsOpenAIVisible((prev) => !prev)}
          >
            <div>Open AI</div>
            <div>{isOpenAIVisible ? "▲" : "▼"}</div>
          </div>
          <div
            className={`px-4 transition-all duration-300 ${
              isOpenAIVisible ? "max-h-[500px]" : "max-h-0"
            } overflow-hidden`}
          >
            <OpenAi messages={messages} setMessages={setMessages} />
          </div>
        </div>
        <div className="overflow-hidden transition-all duration-300 bg-slate-50 rounded-2xl">
          <div
            className="flex justify-between px-8 py-4 text-lg font-bold cursor-pointer"
            onClick={() => setIsEmotionVisible((prev) => !prev)}
          >
            <div>오늘의 감정은 어떤가요?</div>
            <div>{isEmotionVisible ? "▲" : "▼"}</div>
          </div>
          <div
            className={`px-4 transition-all duration-300 ${
              isEmotionVisible ? "max-h-[500px]" : "max-h-0"
            } overflow-hidden`}
          >
            <EmotionRecorder setTodos={setNewTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}
