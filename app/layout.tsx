import Page from "./page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="Ko">
      <body>
        <Page />
        {children}
      </body>
    </html>
  );
}
