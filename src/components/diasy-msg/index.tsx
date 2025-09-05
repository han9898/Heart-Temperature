"use client";

import { useEffect, useState } from "react";

export default function DiaryMsg({ selectedDate }: { selectedDate: Date }) {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  if (!today) return null;

  return (
    <>
      {today.getDate() === selectedDate.getDate() ? (
        <div>오늘의 감정을 기록해보세요. 😄</div>
      ) : today.getDate() < selectedDate.getDate() ? null : (
        <div>이미 지나간 날입니다. 🥲</div>
      )}
    </>
  );
}
