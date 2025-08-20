import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col max-w-md gap-8 p-5 mx-auto text-center">
      <div className="text-3xl font-bold">마음 온도</div>

      <Link
        className="max-w-md p-5 text-base font-bold bg-fuchsia-200 text-fuchsia-800 rounded-3xl hover:bg-fuchsia-300 duration-200 hover:scale-[1.02] active:scale-[0.9] disabled:scale-100 disabled:cursor-not-allowed"
        href="/my-calender"
      >
        바로 가기
      </Link>
    </div>
  );
}
