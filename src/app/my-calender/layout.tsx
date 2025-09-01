"use client";

import { useState } from "react";
import NavigationBar from "./_components/navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyCalenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="font-pretendard">
      <QueryClientProvider client={queryClient}>
        <NavigationBar />
        {children}
      </QueryClientProvider>
    </div>
  );
}
