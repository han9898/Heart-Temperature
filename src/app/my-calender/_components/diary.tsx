"use client";

export type Todo = {
  id: number;
  created_at: string;
  emotion: number;
  content: string;
};

export default function Diary({ todos }: { todos: Todo }) {
  // console.log("todos : ", todos);

  return (
    <div>
      <div className="flex justify-center gap-5 text-lg font-bold">
        <div>{todos.created_at}</div>
        {/* <div>2025/8/20</div>
        <div>15:06</div> */}
      </div>
      <div>🥲</div>
      <div>{todos.emotion}</div>
      <div className="px-4 py-6 bg-gray-100 rounded-2xl">
        <div>{todos.content}</div>
      </div>
    </div>
  );
}
