"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="fixed left-0 right-0 z-20 flex justify-center p-6 bg-white">
      <Link
        className={`relative inline-block cursor-pointer group w-[60px] text-center ${isHome ? "" : "group"}`}
        href="/"
      >
        <span
          className={`block text-purple-600 transition-all duration-300 ${
            isHome ? "" : "group-hover:-translate-x-full group-hover:opacity-0"
          }`}
        >
          마음온도
        </span>
        {!isHome && (
          <span className="absolute top-0 block text-pink-500 transition-all duration-300 translate-x-full opacity-0 left-1 group-hover:translate-x-0 group-hover:opacity-100">
            홈으로
          </span>
        )}
      </Link>
    </div>
  );
}
