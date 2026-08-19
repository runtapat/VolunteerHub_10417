import React from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-500'
              : toast.type === 'error'
              ? 'bg-rose-900/90 text-white border-rose-500'
              : toast.type === 'warning'
              ? 'bg-amber-900/90 text-white border-amber-500'
              : 'bg-slate-900/90 text-white border-slate-700'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-300" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-300" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-300" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-300" />}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
            <p className="text-xs text-white/80 mt-1">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
