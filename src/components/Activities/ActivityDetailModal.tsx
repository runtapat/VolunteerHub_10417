import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Sparkles
} from 'lucide-react';
import { Activity, UserProfile } from '../../types';

interface ActivityDetailModalProps {
  activity: Activity | null;
  currentUser: UserProfile;
  isRegistered: boolean;
  onClose: () => void;
  onOpenSignUp: (activity: Activity) => void;
  onOpenCancel: (activity: Activity) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  currentUser,
  isRegistered,
  onClose,
  onOpenSignUp,
  onOpenCancel
}) => {
  if (!activity) return null;

  const percentFilled = Math.min(100, Math.round((activity.currentParticipants / activity.maxParticipants) * 100));
  const isFull = activity.currentParticipants >= activity.maxParticipants;
  const isAlmostFull = !isFull && percentFilled >= 80;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 my-auto border border-teal-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 bg-slate-900">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Hours Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-teal-500 text-white shadow-md shadow-teal-900/20">
              {activity.category}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-teal-800/90 backdrop-blur-xs text-white shadow-md flex items-center gap-1 border border-teal-400/30">
              <Award className="w-3.5 h-3.5 text-amber-300" /> +{activity.hours} ชั่วโมงจิตอาสา
            </span>
          </div>

          {/* Title on Hero bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
              {activity.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Quick Date, Location, Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-teal-50/40 border border-teal-100">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500 text-white shrink-0 shadow-xs shadow-teal-200">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">วันที่จัดกิจกรรม</p>
                <p className="font-bold text-slate-800">{activity.date}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500 text-white shrink-0 shadow-xs shadow-teal-200">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">สถานที่จัดงาน</p>
                <p className="font-bold text-slate-800">{activity.province}</p>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">{activity.locationName}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500 text-white shrink-0 shadow-xs shadow-teal-200">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">จำนวนที่เปิดรับ</p>
                <p className="font-bold text-slate-800">{activity.currentParticipants} / {activity.maxParticipants} คน</p>
                <p className={`text-[11px] font-semibold ${isFull ? 'text-rose-600' : isAlmostFull ? 'text-amber-600' : 'text-teal-600'}`}>
                  {isFull ? 'เต็มแล้ว' : isAlmostFull ? 'ใกล้เต็ม' : 'เปิดรับสมัคร'}
                </p>
              </div>
            </div>
          </div>

          {/* Registration Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-600">ความจุผู้เข้าร่วมโครงการ</span>
              <span className="text-teal-600 font-bold">{percentFilled}% ({activity.maxParticipants - activity.currentParticipants} ที่นั่งว่าง)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : isAlmostFull ? 'bg-amber-500' : 'bg-teal-500'}`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          {/* Organizer Card */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={activity.organizer.avatar}
                alt={activity.organizer.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-800">{activity.organizer.name}</h4>
                  {activity.organizer.verified && (
                    <ShieldCheck className="w-4 h-4 text-teal-600" title="หน่วยงานยืนยันตัวตนแล้ว" />
                  )}
                </div>
                <p className="text-xs text-teal-800 font-medium">{activity.organizer.organizationType}</p>
                {activity.organizer.contactEmail && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{activity.organizer.contactEmail}</p>
                )}
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-teal-500 text-white font-bold text-[11px] shadow-xs">
                ผู้จัดทางการ
              </span>
            </div>
          </div>

          {/* Activity Description */}
          <div>
            <h4 className="font-bold text-base text-slate-800 mb-2">เกี่ยวกับกิจกรรม</h4>
            <p className="text-slate-600 leading-relaxed">{activity.description}</p>
          </div>

          {/* Duties (ภารกิจจิตอาสา) */}
          <div>
            <h4 className="font-bold text-base text-slate-800 mb-2">ภารกิจและหน้าที่ที่ต้องปฏิบัติ</h4>
            <ul className="space-y-2">
              {activity.duties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700">{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50/30 border border-teal-100">
              <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> คุณสมบัติผู้สมัคร
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activity.qualifications.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
              <h5 className="font-bold text-teal-950 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" /> สิ่งที่อาสาจะได้รับ
              </h5>
              <ul className="space-y-1.5 text-xs text-teal-900">
                {activity.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location & Dress Code */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-teal-50 space-y-2 text-xs">
            <p><strong className="text-slate-800">ที่อยู่สถานที่:</strong> {activity.address}</p>
            {activity.dressCode && (
              <p><strong className="text-slate-800">การแต่งกาย:</strong> {activity.dressCode}</p>
            )}
            <p><strong className="text-slate-800">ผู้ประสานงาน:</strong> {activity.contactPerson}</p>
            <p className="text-rose-600 font-semibold">ปิดรับสมัคร: {activity.registrationDeadline}</p>
          </div>
        </div>

        {/* Modal Sticky Bottom CTA */}
        <div className="p-4 sm:p-5 border-t border-teal-50 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <p className="text-xs text-slate-400">ชั่วโมงจิตอาสาที่ได้รับ</p>
            <p className="text-base font-extrabold text-teal-700">+{activity.hours} ชั่วโมง (รับรองทางการ)</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>

            {isRegistered ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-xl bg-teal-100 text-teal-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  คุณได้สมัครกิจกรรมนี้แล้ว
                </span>
                <button
                  onClick={() => onOpenCancel(activity)}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  ขอยกเลิก
                </button>
              </div>
            ) : isFull ? (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed"
              >
                ขออภัย ที่นั่งเต็มแล้ว
              </button>
            ) : (
              <button
                onClick={() => onOpenSignUp(activity)}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-200 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                สมัครเข้าร่วมกิจกรรมนี้
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
