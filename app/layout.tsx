import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="Ko">
      <body>{children}</body>
    </html>
  );
}
