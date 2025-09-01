"use client";

export type Todo = {
  id: number;
  created_at: string;
  emotion: number;
  content: string;
};

type DiaryProps = {
  todos: Todo;
  createdAt: string;
};

export default function Diary({ todos, createdAt }: DiaryProps) {
  const emotion = () => {
    if (todos.emotion === 1) return "🥰";
    if (todos.emotion === 2) return "😶‍🌫️";
    if (todos.emotion === 3) return "😴";
    if (todos.emotion === 4) return "😡";
    if (todos.emotion === 5) return "😭";
  };
  return (
    <div className="my-4">
      <div className="mb-3 text-base font-bold text-left text-gray-400">
        {createdAt}
      </div>
      <div className="relative flex items-center gap-2 px-4 py-6 bg-white border rounded-r-2xl rounded-bl-2xl">
        <div className="absolute top-0 left-0 w-16 h-full bg-slate-100 rounded-bl-2xl" />
        <div className="flex-[1] flex items-center justify-center z-10">
          <div className="text-2xl">{emotion()}</div>
        </div>
        <div className="flex-[9] z-10 px-5 text-start whitespace-pre-wrap break-words">
          {todos.content}
        </div>
      </div>
    </div>
  );
}
