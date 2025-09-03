"use client";

import { useState } from "react";
import { addTemperature } from "../../api/post-temperatures";
import { TemperatureRecord } from "../../api/get-temperatures";

type EmotionKey = 1 | 2 | 3 | 4 | 5;

const emotionMap: Record<EmotionKey, string> = {
  1: "🥰",
  2: "😶‍🌫️",
  3: "😴",
  4: "😡",
  5: "😭",
} as const;

const EMOTION_KEYS: readonly EmotionKey[] = [1, 2, 3, 4, 5];

type EmotionRecorderProps = {
  setTodos: React.Dispatch<React.SetStateAction<TemperatureRecord[]>>;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmotionRecorder({
  setTodos,
  setDrawerOpen,
}: EmotionRecorderProps) {
  const [emotion, setEmotion] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!emotion || !content.trim()) {
      alert("감정과 일기를 작성했나요?");
      return;
    }

    try {
      const newEntry = await addTemperature({ emotion, content });
      setTodos((prev) => [newEntry, ...prev]);
      setEmotion(null);
      setContent("");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-5 p-4">
        <div className="flex gap-2">
          {EMOTION_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setEmotion(key)}
              className={`px-4 py-2 rounded hover:bg-gray-300 ${
                emotion === key ? "bg-green-300 text-white" : "bg-gray-200"
              }`}
            >
              {emotionMap[key]}
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘의 감정을 적어주세요"
          rows={1}
          className="w-full p-4 overflow-hidden border rounded-lg resize-none focus:outline-none focus:ring-0"
          onInput={(e) => {
            const t = e.target as HTMLTextAreaElement;
            t.style.height = "auto";
            t.style.height = `${t.scrollHeight}px`;
          }}
        />

        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              handleSubmit();
              setDrawerOpen?.(false);
            }}
            className={`rounded-lg px-4 py-2 text-white bg-green-500 hover:bg-green-600 ${emotion || content ? "" : "cursor-not-allowed"}`}
          >
            저장하기
          </button>
          <button
            onClick={() => {
              setEmotion(null);
              setContent("");
            }}
            className={`rounded-lg px-4 py-2 text-white ${emotion || content ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"}`}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
