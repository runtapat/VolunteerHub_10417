import React from 'react';
import { SearchX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-3xl border border-dashed border-slate-200 my-4 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
        {icon || <SearchX className="w-8 h-8 text-emerald-600" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all shadow-sm shadow-emerald-600/20 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
};
