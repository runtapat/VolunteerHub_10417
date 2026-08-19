import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Activity } from '../../types';
import { CATEGORY_BADGE_COLORS } from '../../data/mockData';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
  isRegistered?: boolean;
  onQuickSignUp?: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
  isRegistered = false,
  onQuickSignUp
}) => {
  const percentFilled = Math.min(100, Math.round((activity.currentParticipants / activity.maxParticipants) * 100));
  const isFull = activity.currentParticipants >= activity.maxParticipants;
  const isAlmostFull = !isFull && percentFilled >= 80;


  return (
    <div 
      onClick={() => onSelect(activity)}
      className="bg-white rounded-[2rem] p-5 shadow-sm border border-teal-50 hover:shadow-xl hover:shadow-teal-900/5 transition-all group flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Cover Image & Category Badge (Vibrant Palette Design) */}
        <div className="relative h-36 bg-teal-100 rounded-2xl mb-4 overflow-hidden">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end justify-between p-3">
            <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase shadow-xs ${CATEGORY_BADGE_COLORS[activity.category] || 'bg-teal-500 text-white'}`}>
              {activity.category}
            </span>

            <span className="bg-teal-950/80 backdrop-blur-xs text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border border-teal-400/30">
              +{activity.hours} ชม.
            </span>
          </div>

          {/* Featured & Registered Badges */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
            {activity.isFeatured && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> แนะนำ
              </span>
            )}
            {isRegistered && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3" /> สมัครแล้ว
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-1 leading-snug text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-2">
          {activity.title}
        </h3>

        {/* Location & Time Subtitle */}
        <p className="text-slate-500 text-xs mb-3 flex items-center gap-1.5 truncate">
          <span>📍 {activity.province} • {activity.locationName}</span>
          <span>•</span>
          <span>🕒 {activity.hours} ชั่วโมง</span>
        </p>

        {/* Organizer */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-600">
          <img 
            src={activity.organizer.avatar} 
            alt={activity.organizer.name}
            className="w-4 h-4 rounded-full object-cover shrink-0" 
          />
          <span className="truncate max-w-[180px] font-medium text-[11px]">{activity.organizer.name}</span>
          {activity.organizer.verified && (
            <ShieldCheck className="w-3 h-3 text-teal-600 shrink-0" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 font-medium">
              ผู้เข้าร่วม {activity.currentParticipants}/{activity.maxParticipants} คน
            </span>
            <span className={`font-bold ${
              isFull ? 'text-rose-600' : isAlmostFull ? 'text-amber-600' : 'text-teal-600'
            }`}>
              {isFull ? 'เต็มแล้ว' : isAlmostFull ? `เหลือ ${activity.maxParticipants - activity.currentParticipants} ที่` : 'เปิดรับสมัคร'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-rose-500' : isAlmostFull ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer: Participant Avatars Stack + Vibrant Action Button */}
      <div className="flex justify-between items-center pt-2 border-t border-teal-50">
        {/* Avatars Stack */}
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" alt="v1" className="w-full h-full object-cover" />
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60" alt="v2" className="w-full h-full object-cover" />
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-teal-200 flex items-center justify-center text-[10px] font-bold text-teal-800">
            +{activity.currentParticipants}
          </div>
        </div>

        {/* Action Button */}
        {isFull ? (
          <button 
            type="button"
            className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-xs font-bold cursor-default"
          >
            เต็มแล้ว
          </button>
        ) : isRegistered ? (
          <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
            ดูรายละเอียด <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickSignUp) onQuickSignUp(activity);
              else onSelect(activity);
            }}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-teal-200 active:scale-95 transition-transform cursor-pointer"
          >
            เข้าร่วม
          </button>
        )}
      </div>
    </div>
  );
};
