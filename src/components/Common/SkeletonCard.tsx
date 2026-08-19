import React from 'react';

export const ActivitySkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs animate-pulse flex flex-col">
      <div className="h-44 bg-slate-200 w-full relative">
        <div className="absolute top-3 left-3 w-20 h-6 bg-slate-300 rounded-full" />
        <div className="absolute top-3 right-3 w-16 h-6 bg-slate-300 rounded-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded w-4/5" />
          <div className="h-4 bg-slate-200 rounded w-3/5" />
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <div className="w-7 h-7 rounded-full bg-slate-200" />
          <div className="h-3.5 bg-slate-200 rounded w-28" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded w-24" />
          <div className="h-8 bg-slate-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};
