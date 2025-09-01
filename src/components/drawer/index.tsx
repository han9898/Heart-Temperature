"use client";

import { ReactNode, Dispatch, SetStateAction } from "react";
import { Button } from "../button";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-20 bg-black bg-opacity-50"
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 h-auto bg-white shadow-lg rounded-t-3xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">{content}</h2>
                <button onClick={() => setDrawerOpen(false)}>X</button>
              </div>
              <div className="px-6">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
