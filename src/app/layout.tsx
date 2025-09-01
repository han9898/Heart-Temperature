import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="Ko">
      <body className="select-none font-pretendard">{children}</body>
    </html>
  );
}
