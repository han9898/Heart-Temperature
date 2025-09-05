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
import { motion, AnimatePresence } from "framer-motion";

export default function MyCalenderWrapper() {
  const { data: todos = [] } = useQuery<TemperatureRecord[]>({
    queryKey: ["temperatures"],
    queryFn: getTemperatures,
    staleTime: 1000 * 60 * 5,
    select: (data) => data ?? [],
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
    if (todos.length > 0 && todos !== newTodos) {
      setNewTodos(todos);
    }
  }, [todos]);

  const filteredTodos = newTodos.filter((t) => {
    const todoDate = new Date(t.created_at);
    return (
      todoDate.getFullYear() === selectedDate.getFullYear() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getDate() === selectedDate.getDate()
    );
  });

  const getLastWeekData = (data: TemperatureRecord[]) => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekData = data.filter((record) => {
      const recordDate = new Date(record.created_at);
      return recordDate >= lastWeek && recordDate <= new Date();
    });
    return {
      scores: {
        positive: lastWeekData.filter((d) => d.emotion <= 1).length,
        neutral: lastWeekData.filter((d) => d.emotion === 2 || d.emotion === 3)
          .length,
        negative: lastWeekData.filter((d) => d.emotion >= 4).length,
      },
      diaries: lastWeekData.map((d) => d.content),
    };
  };

  return (
    <div className="flex justify-center gap-2 m-auto">
      <div className="flex flex-col max-w-md gap-8 px-5 text-center">
        <Calender
          todos={newTodos}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex justify-center gap-4 md:hidden">
          <div className="w-40">
            <Drawer
              label="AI 감정 분석"
              content="Open AI"
              drawerOpen={isOpenAI}
              setDrawerOpen={setIsOpenAI}
            >
              <OpenAi
                messages={messages}
                setMessages={setMessages}
                weekData={getLastWeekData(newTodos)}
              />
            </Drawer>
          </div>
          <div className="w-40">
            <Drawer
              label="오늘의 감정 추가하기"
              content="오늘의 감정"
              drawerOpen={isOpenEmotion}
              setDrawerOpen={setIsOpenEmotion}
            >
              <EmotionRecorder
                setTodos={setNewTodos}
                setDrawerOpen={setIsOpenEmotion}
              />
            </Drawer>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {filteredTodos && filteredTodos.length > 0 ? (
            <AnimatePresence>
              {filteredTodos.map((t) => {
                const formattedDate = formatKoreanDate(t.created_at);
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Diary todos={t} createdAt={formattedDate} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <>
              {today.getDate() === selectedDate.getDate() ? (
                <div>오늘의 감정을 기록해보세요. 😄</div>
              ) : today.getDate() < selectedDate.getDate() ? null : (
                <div>이미 지나간 날입니다. 🥲</div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="sticky self-start hidden px-5 top-24 md:block">
        <DesktopPanel
          messages={messages}
          setMessages={setMessages}
          setNewTodos={setNewTodos}
          setDrawerOpen={setIsOpenEmotion}
          weekData={getLastWeekData(newTodos)}
        />
      </div>
    </div>
  );
}
