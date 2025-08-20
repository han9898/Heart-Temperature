import Link from "next/link";
import Calender from "./_components/calender";
import Diary from "./_components/diary";
import OpenAi from "./_components/open-ai";

export default function MyCalenderPage() {
  return (
    <div className="flex flex-col max-w-md gap-8 p-3 mx-auto text-center">
      <Link
        className="max-w-md p-5 text-base font-bold bg-fuchsia-200 text-fuchsia-800 rounded-3xl hover:bg-fuchsia-300 duration-200 hover:scale-[1.02] active:scale-[0.9] disabled:scale-100 disabled:cursor-not-allowed"
        href="/"
      >
        메인화면으로 가기
      </Link>

      <Calender />
      <Diary />
      <OpenAi />
    </div>
  );
}
