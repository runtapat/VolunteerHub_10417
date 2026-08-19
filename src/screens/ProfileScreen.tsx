import React from 'react';
import { 
  User, 
  School, 
  Mail, 
  Phone, 
  Award, 
  Calendar, 
  FileText, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Users
} from 'lucide-react';
import { Activity, Registration, UserProfile } from '../types';
import { BADGE_TIERS, MOCK_USERS } from '../data/mockData';

interface ProfileScreenProps {
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  registrations: Registration[];
  activitiesMap: Record<string, Activity>;
  onOpenTranscriptModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  onSelectUser,
  registrations,
  activitiesMap,
  onOpenTranscriptModal
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;
  const userCompletedRegs = registrations.filter((r) => r.userId === currentUser.id && r.status === 'completed');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner: Profile Switching Simulation Hub */}
      <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-700 shrink-0" />
          <div>
            <span className="font-bold text-teal-900">ทดสอบเปลี่ยนโปรไฟล์ผู้ใช้งาน (5 Persona Profiles):</span>
            <p className="text-teal-700 text-[11px]">คลิกเลือกโปรไฟล์จำลองเพื่อดูมุมมองนักเรียน ม.ปลาย, นิสิตมหาวิทยาลัย, หรือคนทำงาน</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {MOCK_USERS.map((u) => (
            <button
              key={u.id}
              onClick={() => onSelectUser(u)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                u.id === currentUser.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-teal-100/50 border border-slate-200'
              }`}
            >
              {u.nickname} ({u.totalHours}ชม.)
            </button>
          ))}
        </div>
      </div>

      {/* Main Profile Header Card (Vibrant Palette Design) */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-teal-50 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-teal-500 shadow-md shadow-teal-200"
            />
            <span className="absolute -bottom-2 -right-2 text-2xl p-1 bg-white rounded-xl shadow-xs border border-teal-100">
              {currentTier.icon}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">{currentUser.fullName}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                ชื่อเล่น: {currentUser.nickname}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1.5">
              <School className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{currentUser.institution}</span>
            </p>

            {currentUser.facultyOrSchool && (
              <p className="text-xs text-slate-500">{currentUser.facultyOrSchool}</p>
            )}

            {currentUser.studentId && (
              <p className="text-[11px] text-slate-400 font-mono">รหัสนักศึกษา: {currentUser.studentId}</p>
            )}
          </div>
        </div>

        {/* Right Stats & Transcript CTA */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-stretch gap-3">
          <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 text-center">
            <p className="text-xs text-teal-800 font-medium">ระดับปัจจุบัน: {currentTier.thaiName}</p>
            <p className="text-2xl font-extrabold text-teal-800">{currentUser.totalHours} ชั่วโมง</p>
          </div>

          <button
            onClick={onOpenTranscriptModal}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-lg shadow-teal-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-teal-100" />
            <span>ใบประวัติจิตอาสา (Transcript)</span>
          </button>
        </div>
      </div>

      {/* Bio, Skills & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bio & Skills */}
        <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-600" /> เกี่ยวกับฉัน (About Me)
          </h3>
          <p className="text-slate-600 leading-relaxed bg-teal-50/30 p-3.5 rounded-2xl border border-teal-100/60">
            "{currentUser.bio}"
          </p>

          <div>
            <h4 className="font-bold text-slate-800 mb-2">ทักษะความสามารถ (Skills):</h4>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 font-semibold border border-teal-100">
                  ✨ {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-2">ความสนใจด้านจิตอาสา:</h4>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.interests.map((interest, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                  🌱 {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info & Emergency Contact */}
        <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-teal-600" /> ข้อมูลติดต่อ & การยืนยันตัวตน
          </h3>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-400 font-semibold text-[10px]">อีเมลติดต่อ</p>
              <p className="font-bold text-slate-800 text-xs mt-0.5">{currentUser.email}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-400 font-semibold text-[10px]">เบอร์โทรศัพท์</p>
              <p className="font-bold text-slate-800 text-xs mt-0.5">{currentUser.phone}</p>
            </div>

            <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200">
              <div className="flex items-center gap-1.5 text-teal-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>สถานะการยืนยันตัวตนทางการ</span>
              </div>
              <p className="text-[11px] text-teal-800">
                บัญชีผ่านการตรวจสอบสิทธิ์นักศึกษาและเชื่อมโยงระบบชั่วโมงจิตอาสาสำเร็จ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer History Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-50 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            ประวัติการทำกิจกรรมจิตอาสา (Activity Timeline)
          </h3>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {userCompletedRegs.length} โครงการสำเร็จ
          </span>
        </div>

        <div className="divide-y divide-teal-50">
          {userCompletedRegs.map((reg) => {
            const act = activitiesMap[reg.activityId];
            return (
              <div key={reg.id} className="py-3.5 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold text-[10px]">
                      {act ? act.category : 'จิตอาสา'}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{reg.registeredAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{act ? act.title : reg.activityId}</h4>
                  <p className="text-slate-500">{act ? act.organizer.name : '-'}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-teal-700">+{reg.hoursAwarded || 6} ชม.</span>
                  <p className="text-[10px] text-teal-600 font-bold mt-0.5">ผ่านการรับรอง ✓</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
