import "./globals.css";
import NavigationBar from "./my-calender/_components/navigation-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="Ko">
      <body className="select-none font-pretendard dark:bg-slate-900 dark:text-slate-100">
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
