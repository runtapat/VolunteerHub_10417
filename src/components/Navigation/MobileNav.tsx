import React from 'react';
import { 
  Home, 
  Compass, 
  CalendarCheck, 
  Award, 
  User, 
  Bell, 
  Trophy, 
  X, 
  HeartHandshake 
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../../types';
import { BADGE_TIERS } from '../../data/mockData';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  unreadCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  unreadCount,
  isDrawerOpen,
  setIsDrawerOpen
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;

  const bottomNavItems = [
    { id: 'home' as ActiveTab, label: 'หน้าหลัก', icon: Home },
    { id: 'discover' as ActiveTab, label: 'ค้นหา', icon: Compass },
    { id: 'my_activities' as ActiveTab, label: 'กิจกรรม', icon: CalendarCheck },
    { id: 'hours_certificates' as ActiveTab, label: 'เกียรติบัตร', icon: Award },
    { id: 'profile' as ActiveTab, label: 'โปรไฟล์', icon: User }
  ];

  const drawerItems = [
    { id: 'home' as ActiveTab, label: 'หน้าหลัก', icon: Home },
    { id: 'discover' as ActiveTab, label: 'ค้นหากิจกรรมอาสา', icon: Compass },
    { id: 'my_activities' as ActiveTab, label: 'กิจกรรมของฉัน', icon: CalendarCheck },
    { id: 'hours_certificates' as ActiveTab, label: 'ชั่วโมง & เกียรติบัตร', icon: Award },
    { id: 'notifications' as ActiveTab, label: 'การแจ้งเตือน', icon: Bell, badge: unreadCount },
    { id: 'leaderboard' as ActiveTab, label: 'ความสำเร็จ & ผู้นำ', icon: Trophy },
    { id: 'profile' as ActiveTab, label: 'โปรไฟล์ & พอร์ตโฟลิโอ', icon: User }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-teal-100 shadow-lg shadow-teal-900/5 px-2 py-1.5 flex items-center justify-around">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-teal-600 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-teal-50 text-teal-600' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer (Hamburger Menu) */}
      {isDrawerOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div 
            className="w-4/5 max-w-xs bg-white h-full flex flex-col shadow-2xl p-5 border-r border-teal-100 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-teal-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-200">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-base text-teal-800">VolunteerHub</span>
                  <p className="text-[10px] text-slate-400">เพื่อคนรุ่นใหม่ & จิตอาสา</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer User Card */}
            <div className="my-4 p-3 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-3">
              <img src={currentUser.avatar} alt={currentUser.fullName} className="w-10 h-10 rounded-full object-cover border-2 border-teal-500" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">{currentUser.fullName}</p>
                <p className="text-[10px] text-teal-700 font-semibold">{currentTier.thaiName} • {currentUser.totalHours} ชม.</p>
              </div>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 space-y-1.5 overflow-y-auto">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="pt-3 border-t border-teal-50 text-[11px] text-slate-400 text-center">
              VolunteerHub Thailand © 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};
