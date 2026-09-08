import React from 'react';
import { CheckCircle2, AlertCircle, Info, Heart, X } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isFavorite = toast.type === 'favorite';

        let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
        let borderColor = 'border-blue-500/20';
        let bgGradient = 'from-blue-50/90 to-white/90 dark:from-blue-950/40 dark:to-slate-900/90';

        if (isSuccess) {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          borderColor = 'border-emerald-500/30';
          bgGradient = 'from-emerald-50/90 to-white/90 dark:from-emerald-950/40 dark:to-slate-900/90';
        } else if (isError) {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderColor = 'border-rose-500/30';
          bgGradient = 'from-rose-50/90 to-white/90 dark:from-rose-950/40 dark:to-slate-900/90';
        } else if (isFavorite) {
          icon = <Heart className="w-5 h-5 text-brand-500 fill-brand-500 shrink-0" />;
          borderColor = 'border-brand-500/30';
          bgGradient = 'from-orange-50/90 to-white/90 dark:from-orange-950/40 dark:to-slate-900/90';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl backdrop-blur-xl border ${borderColor} bg-gradient-to-r ${bgGradient} text-slate-800 dark:text-slate-100 transition-all duration-300 animate-slide-up`}
          >
            <div className="flex items-center gap-3 pr-2">
              {icon}
              <p className="text-sm font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
