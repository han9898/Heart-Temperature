import Link from "next/link";
import MyCalenderWarper from "./my-calender-warper";

export default async function MyCalenderPage() {
  return (
    <div className="pt-24">
      <Link
        className="max-w-md p-5 text-base font-bold bg-fuchsia-200 text-fuchsia-800 rounded-3xl hover:bg-fuchsia-300 duration-200 hover:scale-[1.02] active:scale-[0.9] disabled:scale-100 disabled:cursor-not-allowed"
        href="/"
      >
        메인화면으로 가기
      </Link>
      <MyCalenderWarper />
    </div>
  );
}
