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
    if (todos.emotion === 1) return "😄";
    if (todos.emotion === 2) return "😆";
    if (todos.emotion === 3) return "🥰";
    if (todos.emotion === 4) return "🥲";
    if (todos.emotion === 5) return "😭";
  };
  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex justify-center gap-5 text-lg font-bold">
          <div>{createdAt}</div>
        </div>
        <div className="text-2xl">{emotion()}</div>
      </div>
      <div className="px-4 py-6 bg-gray-100 rounded-2xl">
        <div>{todos.content}</div>
      </div>
    </div>
  );
}
