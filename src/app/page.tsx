import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col max-w-md gap-8 pt-24 mx-auto text-center">
      <div className="text-2xl font-bold">Heart-Temperature</div>

      <Link
        className="relative inline-block cursor-pointer group"
        href="/my-calender"
      >
        <span className="absolute inset-0 flex items-center justify-center text-purple-600 transition-all duration-300 -translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          일기 작성하러
        </span>
        <span className="flex items-center justify-center transition-all duration-300 group-hover:text-purple-600 group-hover:translate-y-6">
          바로 가기
        </span>
      </Link>
    </div>
  );
}
