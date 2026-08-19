import React from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Flame,
  FileText
} from 'lucide-react';
import { Activity, CategoryType, Registration, UserProfile, ActiveTab } from '../types';
import { BADGE_TIERS, CATEGORIES_LIST, MONTHLY_GOAL_DEFAULT } from '../data/mockData';
import { ActivityCard } from '../components/Activities/ActivityCard';

interface HomeScreenProps {
  currentUser: UserProfile;
  activities: Activity[];
  registrations: Registration[];
  onSelectActivity: (act: Activity) => void;
  onNavigateTab: (tab: ActiveTab, category?: CategoryType) => void;
  onQuickSignUp: (act: Activity) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  activities,
  registrations,
  onSelectActivity,
  onNavigateTab,
  onQuickSignUp
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;
  const targetMonthlyGoal = MONTHLY_GOAL_DEFAULT.targetHours;
  const currentMonthlyHours = MONTHLY_GOAL_DEFAULT.defaultCurrentHours;
  const monthlyPercent = Math.min(100, Math.round((currentMonthlyHours / targetMonthlyGoal) * 100));


  const featuredActivities = activities.filter((a) => a.isFeatured).slice(0, 4);
  
  // Find upcoming user registrations
  const userUpcomingRegs = registrations.filter((r) => r.userId === currentUser.id && r.status === 'registered');
  const userUpcomingActivities = userUpcomingRegs
    .map((r) => activities.find((a) => a.id === r.activityId))
    .filter((a): a is Activity => !!a);

  return (
    <div className="space-y-8 pb-12">
      {/* 2-Column Responsive Layout (Matches Vibrant Palette Design Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Main Feed (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 rounded-[2rem] p-6 sm:p-8 text-white shadow-xl shadow-teal-200/50 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 max-w-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                <span>✨ ยินดีต้อนรับกลับมา, คุณ{currentUser.nickname}!</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ส่งต่อพลังจิตอาสา สะสมชั่วโมงสร้างอนาคต
              </h1>
              <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed">
                ค้นหากิจกรรมที่ใช่ ช่วยเหลือสังคม สะสมชั่วโมงขอทุน กยศ. และดาวน์โหลดเกียรติบัตรอิเล็กทรอนิกส์ได้ง่ายๆ ในที่เดียว
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateTab('discover')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-teal-700 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>ค้นหากิจกรรมทั้งหมด</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="absolute right-2 top-2 bottom-2 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-center">
              <HeartHandshake className="w-64 h-64 text-white" />
            </div>
          </div>

          {/* Featured Activities Section Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">กิจกรรมแนะนำสำหรับคุณ</h2>
                <p className="text-xs text-slate-500 mt-0.5">คัดสรรโครงการยอดนิยมที่ตรงกับความสนใจของคุณ</p>
              </div>
              <button
                onClick={() => onNavigateTab('discover')}
                className="text-teal-600 text-xs sm:text-sm font-bold hover:underline cursor-pointer"
              >
                ดูทั้งหมด ({activities.length}) →
              </button>
            </div>

            {/* Activities 2-Col Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredActivities.map((act) => {
                const isReg = registrations.some(
                  (r) => r.activityId === act.id && r.userId === currentUser.id && r.status === 'registered'
                );
                return (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    onSelect={onSelectActivity}
                    isRegistered={isReg}
                    onQuickSignUp={onQuickSignUp}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Category Exploration Chips */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-50 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">สำรวจหมวดหมู่กิจกรรมจิตอาสา</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => onNavigateTab('discover', cat.name as CategoryType)}
                  className="p-3 rounded-2xl bg-teal-50/40 hover:bg-teal-100/60 border border-teal-100/60 hover:border-teal-300 transition-all flex flex-col items-center text-center group cursor-pointer"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-bold text-xs text-slate-800 group-hover:text-teal-700">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Activities Block (Vibrant Palette Design) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">กิจกรรมของฉัน (เร็วๆ นี้)</h3>
              {userUpcomingActivities.length > 0 && (
                <button
                  onClick={() => onNavigateTab('my_activities')}
                  className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  จัดการ ({userUpcomingActivities.length})
                </button>
              )}
            </div>

            {userUpcomingActivities.length === 0 ? (
              <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 text-center text-xs text-slate-500">
                ยังไม่มีกิจกรรมที่ลงทะเบียนไว้ เร็วๆ นี้ ลองค้นหากิจกรรมจิตอาสาและเข้าร่วมเลย!
              </div>
            ) : (
              <div className="space-y-3">
                {userUpcomingActivities.slice(0, 2).map((act) => {
                  const dateParts = act.date.split('-');
                  const monthName = dateParts[1] === '08' ? 'ส.ค.' : dateParts[1] === '09' ? 'ก.ย.' : 'ต.ค.';
                  const dayNum = dateParts[2] || '15';

                  return (
                    <div
                      key={act.id}
                      onClick={() => onSelectActivity(act)}
                      className="flex items-center gap-4 p-4 bg-teal-50/50 rounded-2xl border-l-4 border-teal-500 cursor-pointer hover:bg-teal-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center shrink-0 border border-teal-100">
                        <span className="text-[10px] font-bold text-teal-600 leading-none">{monthName}</span>
                        <span className="text-lg font-black text-slate-700 leading-none mt-0.5">{dayNum}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-800 truncate">{act.title}</h4>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                          {act.locationName} • {act.time} ({act.hours} ชม.)
                        </p>
                      </div>

                      <div className="bg-teal-500/10 text-teal-700 text-[10px] px-3 py-1.5 rounded-lg font-bold shrink-0">
                        ยืนยันแล้ว
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Column (Col 4 - Vibrant Palette Style) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Achievements / 4 Tiers Showcase (Vibrant Palette Design) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">ความสำเร็จ</h3>
              <button
                onClick={() => onNavigateTab('leaderboard')}
                className="text-teal-600 text-[11px] font-bold hover:underline cursor-pointer"
              >
                ดูทั้งหมด
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Tier 1 */}
              <div className="flex flex-col items-center p-3 bg-teal-50 rounded-2xl border border-teal-100">
                <div className="text-3xl mb-1">🌱</div>
                <p className="text-[11px] font-bold text-center text-slate-800">หน้าใหม่</p>
                <p className="text-[9px] text-teal-600 font-bold">สำเร็จแล้ว ✓</p>
              </div>

              {/* Tier 2 */}
              <div className={`flex flex-col items-center p-3 rounded-2xl border ${
                currentUser.totalHours >= 20 ? 'bg-teal-50 border-teal-100' : 'bg-white border-slate-100'
              }`}>
                <div className="text-3xl mb-1">⭐</div>
                <p className="text-[11px] font-bold text-center text-slate-800">ขาประจำ</p>
                <p className="text-[9px] text-teal-600 font-semibold">
                  {currentUser.totalHours >= 20 ? 'สำเร็จแล้ว ✓' : `${currentUser.totalHours}/20 ชม.`}
                </p>
              </div>

              {/* Tier 3 */}
              <div className={`flex flex-col items-center p-3 rounded-2xl border ${
                currentUser.totalHours >= 50 ? 'bg-teal-50 border-teal-100' : 'bg-white border-slate-100 opacity-60 grayscale'
              }`}>
                <div className="text-3xl mb-1">🏆</div>
                <p className="text-[11px] font-bold text-center text-slate-800">ดาวรุ่ง</p>
                <p className="text-[9px] text-slate-400">
                  {currentUser.totalHours >= 50 ? 'สำเร็จแล้ว' : 'ยังไม่ปลดล็อค'}
                </p>
              </div>

              {/* Tier 4 */}
              <div className={`flex flex-col items-center p-3 rounded-2xl border ${
                currentUser.totalHours >= 100 ? 'bg-teal-50 border-teal-100' : 'bg-white border-slate-100 opacity-60 grayscale'
              }`}>
                <div className="text-3xl mb-1">👑</div>
                <p className="text-[11px] font-bold text-center text-slate-800">ฮีโร่</p>
                <p className="text-[9px] text-slate-400">
                  {currentUser.totalHours >= 100 ? 'สำเร็จแล้ว' : 'ยังไม่ปลดล็อค'}
                </p>
              </div>
            </div>
          </div>

          {/* Download Certificate Vibrant CTA Card */}
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-300" />
              <h3 className="font-bold text-lg">ดาวน์โหลดเกียรติบัตร</h3>
            </div>
            <p className="text-xs opacity-90 mb-5 leading-relaxed">
              คุณสะสมชั่วโมงจิตอาสาแล้ว {currentUser.totalHours} ชั่วโมง รับเกียรติบัตรดิจิทัลพร้อม QR Code ตรวจสอบได้ทันที
            </p>
            <button
              onClick={() => onNavigateTab('hours_certificates')}
              className="w-full bg-white hover:bg-emerald-50 text-teal-600 py-3 rounded-2xl text-xs font-black shadow-md uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              DOWNLOAD PDF / ดูเกียรติบัตร
            </button>
          </div>

          {/* Quick Transcript Box */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-teal-50 space-y-3">
            <div className="flex items-center gap-2 text-teal-800">
              <FileText className="w-4 h-4 text-teal-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider">ใบรับรองชั่วโมง กยศ. / มหาวิทยาลัย</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              ส่งออกเอกสารบันทึกประวัติชั่วโมงจิตอาสาทางการ สำหรับยื่นกองกิจการนิสิตหรือพอร์ตโฟลิโอ TCAS
            </p>
            <button
              onClick={() => onNavigateTab('hours_certificates')}
              className="w-full py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors cursor-pointer"
            >
              เปิดคลังชั่วโมง & ส่งออก Transcript →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
