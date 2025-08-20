import NavigationBar from "./_components/navigation-bar";

export default function MyCalenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-pretendard">
      <NavigationBar />
      {children}
    </div>
  );
}
