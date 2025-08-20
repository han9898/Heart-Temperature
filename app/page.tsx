import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="text-3xl font-bold underline">Hello, Next.js!</div>
      <Link href="/my-calender">Go to calender</Link>
    </div>
  );
}
