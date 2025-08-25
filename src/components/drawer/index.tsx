"use client";

import { useState } from "react";
import { Button } from "../button";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Button onClick={() => setIsOpen(true)} label="AI 감정 분석" />

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
              <h2 className="text-lg font-bold">Drawer</h2>
              <button onClick={() => setIsOpen(false)}>X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
