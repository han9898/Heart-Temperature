"use client";

import { useQuery } from "@tanstack/react-query";
import Calender from "./_components/calender";
import Diary from "./_components/diary";
import OpenAi from "./_components/open-ai";
import EmotionRecorder from "./_components/add-emotion";
import { getTemperatures, TemperatureRecord } from "../api/get-temperatures";
import { formatKoreanDate } from "../../utils/format-date";
import Drawer from "../../components/drawer";

export default function MyCalenderWrapper() {
  const { data: todos = [] } = useQuery<TemperatureRecord[]>({
    queryKey: ["temperatures"],
    queryFn: getTemperatures,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex justify-center gap-4 m-auto">
      <div className="flex flex-col w-full max-w-md gap-8 px-3 text-center">
        <Calender />

        <div className="block md:hidden">
          <Drawer label="AI 감정 분석" content="Open AI">
            <OpenAi />
          </Drawer>
          <Drawer label="오늘의 감정 추가하기" content="오늘의 감정">
            <EmotionRecorder />
          </Drawer>
        </div>

        {todos.map((t, i) => {
          const formattedDate = formatKoreanDate(t.created_at);
          return <Diary todos={t} key={i} createdAt={formattedDate} />;
        })}
      </div>
      <div className="hidden md:block">
        <div className="flex flex-col max-w-md gap-8">
          <div className="py-4 bg-slate-50 rounded-2xl">
            <div className="px-4 text-lg font-bold">Open AI</div>
            <OpenAi />
          </div>
          <div className="py-4 bg-slate-50 rounded-2xl">
            <div className="px-4 text-lg font-bold">
              오늘의 감정은 어떤가요?
            </div>
            <EmotionRecorder />
          </div>
        </div>
      </div>
    </div>
  );
}
