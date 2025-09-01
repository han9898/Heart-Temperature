"use client";

import { ReactNode, Dispatch, SetStateAction } from "react";
import { Button } from "../button";

type DrawerProps = {
  label: string;
  children: ReactNode;
  content: string;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Drawer({
  label,
  children,
  content,
  drawerOpen,
  setDrawerOpen,
}: DrawerProps) {
  return (
    <div className="flex justify-center">
      <Button onClick={() => setDrawerOpen(true)} label={label} />

      {drawerOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 "
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className={`fixed bottom-0 left-0 right-0 h-3/5 rounded-t-3xl bg-white shadow-lg transform transition-transform duration-300 z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">{content}</h2>
              <button onClick={() => setDrawerOpen(false)}>X</button>
            </div>
            <div className="px-6">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
