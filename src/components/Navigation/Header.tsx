import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../../types';
import { BADGE_TIERS, MOCK_USERS, TAB_METADATA } from '../../data/mockData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  unreadCount: number;
  onOpenMobileDrawer: () => void;
  /** คำค้นหาชุดเดียวกับที่ใช้ในหน้าค้นหากิจกรรม */
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onSelectUser,
  unreadCount,
  onOpenMobileDrawer,
  searchQuery,
  onSearchChange
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;

  const currentInfo = TAB_METADATA[activeTab] || TAB_METADATA.home;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-teal-50 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileDrawer}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-teal-700" />
        </button>

        <div>
          <h1 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
            {currentInfo.title}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Center Search Pill (When on Discover / Searchable tabs) */}
      <div className="hidden md:block relative w-72 lg:w-96 mx-4">
        <input
          type="text"
          placeholder="ค้นหากิจกรรมอาสา..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            // พิมพ์จากหน้าไหนก็ได้ ระบบจะพาไปหน้าค้นหากิจกรรมให้อัตโนมัติ
            if (activeTab !== 'discover') setActiveTab('discover');
          }}
          onClick={() => {
            if (activeTab !== 'discover') setActiveTab('discover');
          }}
          className="w-full bg-slate-100 border-none rounded-full py-2 px-5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
        />
        <span className="absolute right-4 top-2 opacity-40 text-xs">🔍</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Icon Button */}
        <button
          onClick={() => setActiveTab('notifications')}
          className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'notifications' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-100'
          }`}
          title="การแจ้งเตือน"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* User Profile & Switcher Bar */}
        <div className="relative">
          <div
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-3 pl-2 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-teal-700 transition-colors">
                {currentUser.fullName}
              </p>
              <p className="text-[10px] text-teal-600 font-medium tracking-wider">
                {currentTier.thaiName} {currentTier.icon}
              </p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-full border-2 border-teal-500 flex items-center justify-center overflow-hidden shadow-xs">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* User Switcher Dropdown Menu */}
          {showUserDropdown && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-teal-100 p-2 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <div className="px-3 py-2 border-b border-teal-50">
                <p className="text-xs font-bold text-slate-800">สลับโปรไฟล์ผู้ใช้ทดสอบ</p>
                <p className="text-[10px] text-slate-400">จำลองมุมมองผู้ใช้แต่ละระดับชั่วโมงจิตอาสา</p>
              </div>

              <div className="py-1 space-y-1 max-h-60 overflow-y-auto">
                {MOCK_USERS.map((user) => {
                  const tier = BADGE_TIERS[user.currentTier] || BADGE_TIERS.tier_1;
                  const isSelected = user.id === currentUser.id;
                  return (
                    <button
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected ? 'bg-teal-50 border border-teal-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={user.avatar} alt={user.fullName} className="w-8 h-8 rounded-full object-cover shrink-0 border border-teal-200" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{user.fullName}</p>
                          <p className="text-[10px] text-slate-500 truncate">{user.institution}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-teal-700 flex items-center gap-0.5 justify-end">
                          <span>{tier.icon}</span> {user.totalHours}ชม.
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-teal-50 px-2 flex justify-between items-center text-[11px]">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setShowUserDropdown(false);
                  }}
                  className="text-teal-600 hover:text-teal-700 font-bold"
                >
                  แก้ไขข้อมูลโปรไฟล์ →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
