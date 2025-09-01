"use client";

import { ReactNode, useState } from "react";
import { Button } from "../button";

type DrawerProps = {
  label: string;
  children: ReactNode;
  content: string;
};

export default function Drawer({ label, children, content }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Button onClick={() => setIsOpen(true)} label={label} />

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed bottom-0 left-0 right-0 h-3/5 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">{content}</h2>
              <button onClick={() => setIsOpen(false)}>X</button>
            </div>
            <div className="py-4">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
