'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toasts() {
  const { toasts, removeToast } = useStore();

  return (
    <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let borderClass = 'border-zinc-800 bg-zinc-950/95';
          let iconColor = 'text-zinc-400';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            borderClass = 'border-emerald-500/30 bg-zinc-950/95';
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            borderClass = 'border-brand-red/30 bg-zinc-950/95';
            iconColor = 'text-brand-red';
          }

          return (
            <motion.div
              key={toast.id}
              id={`toast-${toast.id}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderClass} shadow-2xl backdrop-blur-xl glow-crimson/5 overflow-hidden relative`}
            >
              {/* Colored active accent bar */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-brand-red' : 'bg-zinc-500'
                }`}
              />

              <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
              
              <div className="flex-1 text-sm text-zinc-200 pr-4">
                {toast.message}
              </div>

              <button
                id={`close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
