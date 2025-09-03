"use client";

import { useState } from "react";

type CalendarProps = {
  todos: { created_at: string }[];
  selectedDate: Date | null;
  setSelectedDate: (_date: Date) => void;
};

export default function Calendar({
  todos,
  selectedDate,
  setSelectedDate,
}: CalendarProps) {
  const [current, setCurrent] = useState(new Date());

  const renderCalendar = () => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days: { day: number; type: "prev" | "current" | "next" }[] = [];

    const prevLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--)
      days.push({ day: prevLastDate - i, type: "prev" });

    for (let i = 1; i <= lastDate; i++) days.push({ day: i, type: "current" });

    const totalCells = days.length <= 35 ? 35 : 42;
    const nextDays = totalCells - days.length;
    for (let i = 1; i <= nextDays; i++) days.push({ day: i, type: "next" });

    return days.map((day, i) => {
      const today = new Date();
      const isToday =
        day.day === today.getDate() &&
        day.type === "current" &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelected =
        selectedDate &&
        day.type === "current" &&
        selectedDate.getDate() === day.day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const weekday = i % 7;

      const hasTodo =
        day.type === "current" &&
        todos.some((t) => {
          const todoDate = new Date(t.created_at);
          return (
            todoDate.getFullYear() === year &&
            todoDate.getMonth() === month &&
            todoDate.getDate() === day.day
          );
        });

      return (
        <div
          key={i}
          onClick={() =>
            day.type === "current" &&
            setSelectedDate(new Date(year, month, day.day))
          }
          className={`p-4 text-center cursor-pointer rounded-lg
            ${day.type === "current" ? "hover:bg-gray-300" : ""}
            ${day.type !== "current" ? "text-gray-200" : ""}
            ${isSelected ? "bg-green-300 text-white font-bold" : ""}
            ${isToday && !isSelected ? "bg-gray-200 font-bold" : ""}
            ${
              day.type === "current" && !isSelected
                ? hasTodo
                  ? weekday === 0
                    ? "text-red-500 hover:bg-gray-300"
                    : weekday === 6
                      ? "text-blue-500 hover:bg-gray-300"
                      : "text-black hover:bg-gray-300"
                  : "text-gray-400"
                : ""
            }
          `}
        >
          {day.day}
        </div>
      );
    });
  };

  const handlePrev = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const handleNext = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

  return (
    <div className="px-4 py-6 bg-slate-50 rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <button onClick={handlePrev}>◀</button>
        <span className="font-bold">
          {current.getFullYear()}년 {current.getMonth() + 1}월
        </span>
        <button onClick={handleNext}>▶</button>
      </div>

      <div className="grid grid-cols-7 font-semibold">
        <div className="text-red-500">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-500">토</div>
      </div>

      <div className="grid grid-cols-7">{renderCalendar()}</div>
    </div>
  );
}
