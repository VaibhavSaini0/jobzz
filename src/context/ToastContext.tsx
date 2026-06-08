'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((t) => {
            let bgColor = 'bg-white/95 dark:bg-gray-900/95';
            let borderColor = 'border-gray-200 dark:border-gray-800';
            let textColor = 'text-foreground';
            let icon = <Info className="w-5 h-5 text-indigo-500 shrink-0" />;

            if (t.type === 'success') {
              bgColor = 'bg-green-50/95 dark:bg-green-950/95';
              borderColor = 'border-green-200 dark:border-green-900';
              textColor = 'text-green-800 dark:text-green-200';
              icon = <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />;
            } else if (t.type === 'error') {
              bgColor = 'bg-red-50/95 dark:bg-red-950/95';
              borderColor = 'border-red-200 dark:border-red-900';
              textColor = 'text-red-800 dark:text-red-200';
              icon = <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />;
            }

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                layout
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${bgColor} ${borderColor} ${textColor} shadow-lg backdrop-blur-sm`}
              >
                {icon}
                <div className="flex-1 text-sm font-medium leading-relaxed break-words pr-2">
                  {t.message}
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition shrink-0 self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
