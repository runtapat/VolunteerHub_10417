import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { ActiveTab, UserProfile } from '../../types';
import { BADGE_TIERS, MONTHLY_GOAL_DEFAULT, NAV_ITEMS } from '../../data/mockData';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  unreadCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  unreadCount
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;
  const targetMonthlyGoal = MONTHLY_GOAL_DEFAULT.targetHours;
  const currentMonthlyHours = currentUser.monthlyHours;
  const monthlyPercent = Math.min(100, Math.round((currentMonthlyHours / targetMonthlyGoal) * 100));


  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-teal-100 shrink-0 h-screen sticky top-0 z-30 shadow-xs">
      {/* Brand Header */}
      <div className="p-6 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-teal-800 tracking-tight">Volunteer<span className="text-teal-500">Hub</span></span>
            <span className="text-[10px] uppercase font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">TH</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">เพื่อคนรุ่นใหม่ & จิตอาสา</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto">
        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          เมนูหลัก
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-50 text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-teal-500 text-white shadow-xs shadow-teal-200' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block leading-tight">{item.label}</span>
                </div>
              </div>

              {item.showsUnreadBadge && unreadCount > 0 ? (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Monthly Goal Progress Widget (Vibrant Palette Theme) */}
      <div className="p-4 border-t border-teal-50">
        <div className="bg-teal-600 p-4 rounded-2xl text-white shadow-md shadow-teal-600/20">
          <p className="text-xs opacity-90 mb-1 font-medium">เป้าหมายรายเดือน (Monthly Goal)</p>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xl font-bold">{monthlyPercent}%</span>
            <span className="text-[10px] opacity-80">{currentMonthlyHours}/{targetMonthlyGoal} ชม.</span>
          </div>
          <div className="w-full bg-teal-700/50 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500" 
              style={{ width: `${monthlyPercent}%` }}
            />
          </div>
        </div>

        {/* User Quick Switcher Link */}
        <div 
          onClick={() => setActiveTab('profile')} 
          className="mt-3 flex items-center gap-2.5 p-2 rounded-xl hover:bg-teal-50/60 transition-colors cursor-pointer"
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
            />
            <span className="absolute -bottom-1 -right-1 text-[10px]">{currentTier.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 truncate">{currentUser.fullName}</p>
            <p className="text-[10px] text-teal-600 font-medium">{currentTier.thaiName}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
