import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Award, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Info
} from 'lucide-react';
import { NotificationItem, UserProfile } from '../types';

interface NotificationsScreenProps {
  currentUser: UserProfile;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  currentUser,
  notifications,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const [filterType, setFilterType] = useState<'all' | 'activity' | 'certificate' | 'badge' | 'reminder'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'certificate':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'badge':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-sky-500" />;
      case 'activity':
        return <Calendar className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">การแจ้งเตือน (Notifications)</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                {unreadCount} ข้อความใหม่
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            อัปเดตกิจกรรมจิตอาสา เกียรติบัตรที่ออกใหม่ และเหรียญรางวัลของคุณ
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <CheckCheck className="w-4 h-4 text-teal-600" />
            <span>ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'ทั้งหมด (All)' },
          { id: 'certificate', label: '📜 เกียรติบัตร' },
          { id: 'badge', label: '⭐ ตราสัญลักษณ์' },
          { id: 'activity', label: '🌱 กิจกรรม' },
          { id: 'reminder', label: '⏰ การแจ้งเตือน' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === f.id
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                : 'bg-white text-slate-600 hover:bg-teal-50/50 border border-teal-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-teal-50 p-6 space-y-2">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-bold text-slate-700 text-sm">ไม่มีรายการแจ้งเตือนในหมวดหมู่นี้</p>
          <p className="text-xs text-slate-400">คุณไม่พลาดทุกการเคลื่อนไหวสำคัญของระบบ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`p-4 sm:p-5 rounded-[2rem] border transition-all cursor-pointer flex items-start gap-3.5 ${
                notif.read
                  ? 'bg-white border-teal-50 hover:shadow-md hover:shadow-teal-900/5'
                  : 'bg-teal-50/60 border-teal-200/80 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-teal-100 shrink-0 mt-0.5">
                {getNotifIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-800 text-sm">{notif.title}</h4>
                  <span className="text-[11px] text-slate-400 shrink-0">{notif.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0 mt-2 ring-2 ring-white" title="ยังไม่ได้อ่าน" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
