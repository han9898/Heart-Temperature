"use client";

import { useQuery } from "@tanstack/react-query";
import Calender from "./_components/calender";
import Diary from "./_components/diary";
import OpenAi from "./_components/open-ai";
import EmotionRecorder from "./_components/add-emotion";
import { getTemperatures, TemperatureRecord } from "../api/get-temperatures";
import { formatKoreanDate } from "../../utils/format-date";
import Drawer from "../../components/drawer";
import { useEffect, useState } from "react";
import DesktopPanel from "./desktop-panel";

export default function MyCalenderWrapper() {
  const { data: todos = [] } = useQuery<TemperatureRecord[]>({
    queryKey: ["temperatures"],
    queryFn: getTemperatures,
    staleTime: 1000 * 60 * 5,
  });
  const today = new Date();
  const [newTodos, setNewTodos] = useState<TemperatureRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [isOpenAI, setIsOpenAI] = useState(false);
  const [isOpenEmotion, setIsOpenEmotion] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  useEffect(() => {
    setNewTodos(todos);
  }, [todos]);

  const filteredTodos = newTodos.filter((t) => {
    const todoDate = new Date(t.created_at);
    return (
      todoDate.getFullYear() === selectedDate.getFullYear() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="flex justify-center gap-4 m-auto">
      <div className="flex flex-col w-full max-w-md gap-8 px-3 text-center">
        <Calender
          todos={newTodos}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="block md:hidden">
          <Drawer
            label="AI 감정 분석"
            content="Open AI"
            drawerOpen={isOpenAI}
            setDrawerOpen={setIsOpenAI}
          >
            <OpenAi messages={messages} setMessages={setMessages} />
          </Drawer>
          <Drawer
            label="오늘의 감정 추가하기"
            content="오늘의 감정"
            drawerOpen={isOpenEmotion}
            setDrawerOpen={setIsOpenEmotion}
          >
            <EmotionRecorder setTodos={setNewTodos} />
          </Drawer>
        </div>

        <div className="flex flex-col gap-2">
          {filteredTodos.map((t, i) => {
            const formattedDate = formatKoreanDate(t.created_at);
            return <Diary todos={t} key={i} createdAt={formattedDate} />;
          })}
        </div>
      </div>
      <DesktopPanel
        messages={messages}
        setMessages={setMessages}
        setNewTodos={setNewTodos}
      />
    </div>
  );
}
