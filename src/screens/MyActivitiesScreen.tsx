import React, { useState } from 'react';
import { 
  CalendarCheck, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  Sparkles, 
  RotateCcw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Activity, Certificate, Registration, UserProfile } from '../types';
import { EmptyState } from '../components/Common/EmptyState';

interface MyActivitiesScreenProps {
  currentUser: UserProfile;
  registrations: Registration[];
  activitiesMap: Record<string, Activity>;
  certificates: Certificate[];
  onSelectActivity: (act: Activity) => void;
  onOpenCancelModal: (act: Activity) => void;
  onSimulateCompleteActivity: (registrationId: string) => void;
  onOpenCertificateModal: (cert: Certificate) => void;
  onNavigateToDiscover: () => void;
}

export const MyActivitiesScreen: React.FC<MyActivitiesScreenProps> = ({
  currentUser,
  registrations,
  activitiesMap,
  certificates,
  onSelectActivity,
  onOpenCancelModal,
  onSimulateCompleteActivity,
  onOpenCertificateModal,
  onNavigateToDiscover
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const userRegistrations = registrations.filter((r) => r.userId === currentUser.id);

  const upcomingList = userRegistrations.filter((r) => r.status === 'registered' || r.status === 'checked_in');
  const completedList = userRegistrations.filter((r) => r.status === 'completed');
  const cancelledList = userRegistrations.filter((r) => r.status === 'cancelled');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">กิจกรรมของฉัน (My Activities)</h2>
        <p className="text-xs text-slate-500 mt-1">
          ติดตามสถานะกิจกรรมที่คุณสมัครไว้ เช็กอินสะสมชั่วโมง และดูเกียรติบัตรที่ได้รับ
        </p>
      </div>

      {/* Tabs Row (Vibrant Palette style) */}
      <div className="flex border-b border-teal-100 gap-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'upcoming'
              ? 'border-teal-500 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>กำลังจะถึง (Upcoming)</span>
          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
            {upcomingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'completed'
              ? 'border-teal-500 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>เสร็จสิ้นแล้ว (Completed)</span>
          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
            {completedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'cancelled'
              ? 'border-teal-500 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <XCircle className="w-4 h-4 text-rose-500" />
          <span>ยกเลิกแล้ว (Cancelled)</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
            {cancelledList.length}
          </span>
        </button>
      </div>

      {/* UPCOMING TAB */}
      {activeTab === 'upcoming' && (
        <div>
          {upcomingList.length === 0 ? (
            <EmptyState
              title="ไม่มีกิจกรรมที่กำลังจะถึงในขณะนี้"
              description="คุณยังไม่ได้ลงทะเบียนกิจกรรมจิตอาสาที่กำลังจะจัดขึ้น ลองค้นหากิจกรรมที่น่าสนใจและสมัครเข้าร่วมได้เลย"
              actionText="ค้นหากิจกรรมใหม่"
              onAction={onNavigateToDiscover}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingList.map((reg) => {
                const act = activitiesMap[reg.activityId];
                if (!act) return null;

                const dateParts = act.date.split('-');
                const monthName = dateParts[1] === '08' ? 'ส.ค.' : dateParts[1] === '09' ? 'ก.ย.' : 'ต.ค.';
                const dayNum = dateParts[2] || '15';

                return (
                  <div
                    key={reg.id}
                    className="bg-white rounded-[2rem] p-5 border border-teal-50 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date Stamp Box (Matches design HTML) */}
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl border border-teal-100 flex flex-col items-center justify-center shrink-0 shadow-xs">
                        <span className="text-[10px] font-bold text-teal-600 leading-none">{monthName}</span>
                        <span className="text-xl font-black text-slate-800 leading-none mt-0.5">{dayNum}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-teal-500 text-white text-[10px] font-bold uppercase">
                            {act.category}
                          </span>
                          <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            +{act.hours} ชั่วโมง
                          </span>
                        </div>

                        <h3 
                          onClick={() => onSelectActivity(act)}
                          className="font-bold text-slate-800 text-base leading-snug mt-1 cursor-pointer hover:text-teal-700 transition-colors line-clamp-2"
                        >
                          {act.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{act.locationName} • {act.time}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-teal-50/40 rounded-2xl border border-teal-100 text-xs text-slate-600 flex items-center justify-between">
                      <span className="text-teal-800 font-medium text-[11px] truncate">
                        ผู้จัด: {act.organizer.name}
                      </span>
                      <span className="text-teal-600 font-semibold text-[10px] shrink-0">
                        สมัครเมื่อ: {reg.registeredAt.split(' ')[0]}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-teal-50">
                      <button
                        onClick={() => onOpenCancelModal(act)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
                      >
                        ขอยกเลิกการสมัคร
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectActivity(act)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          รายละเอียด
                        </button>
                        
                        {/* Simulation trigger: Complete Activity */}
                        <button
                          onClick={() => onSimulateCompleteActivity(reg.id)}
                          className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-200 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                          title="จำลองการไปทำกิจกรรมจริง และได้รับชั่วโมงพร้อมเกียรติบัตร"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>จำลองทำกิจกรรมสำเร็จ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* COMPLETED TAB */}
      {activeTab === 'completed' && (
        <div>
          {completedList.length === 0 ? (
            <EmptyState
              title="ยังไม่มีประวัติกิจกรรมที่เสร็จสิ้น"
              description="เมื่อคุณเข้าร่วมกิจกรรมและผู้จัดยืนยันชั่วโมงให้ คุณจะได้รับชั่วโมงสะสมและเกียรติบัตรแสดงที่นี่"
              actionText="ค้นหากิจกรรม"
              onAction={onNavigateToDiscover}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {completedList.map((reg) => {
                const act = activitiesMap[reg.activityId];
                const cert = certificates.find((c) => c.activityId === reg.activityId && c.userId === currentUser.id);

                return (
                  <div
                    key={reg.id}
                    className="bg-white rounded-[2rem] p-5 border border-teal-50 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={act ? act.imageUrl : 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=200'}
                        alt={act ? act.title : 'Activity'}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-600" /> สำเร็จแล้ว
                          </span>
                          <span className="text-[11px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            +{reg.hoursAwarded || (act ? act.hours : 6)} ชม. สะสม
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug mt-1.5 line-clamp-2">
                          {act ? act.title : 'กิจกรรมจิตอาสา'}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          ผู้จัด: {act ? act.organizer.name : 'องค์กรสาธารณประโยชน์'}
                        </p>
                      </div>
                    </div>

                    {/* Certificate CTA Bar */}
                    <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-teal-900">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="font-bold">ได้รับเกียรติบัตรอิเล็กทรอนิกส์</span>
                      </div>

                      {cert ? (
                        <button
                          onClick={() => onOpenCertificateModal(cert)}
                          className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm shadow-teal-200"
                        >
                          <span>เปิดดูเกียรติบัตร</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">กำลังประมวลผล</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CANCELLED TAB */}
      {activeTab === 'cancelled' && (
        <div>
          {cancelledList.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-teal-50 p-6 text-slate-500 text-xs">
              ไม่มีประวัติการยกเลิกกิจกรรม ยอดเยี่ยมมาก!
            </div>
          ) : (
            <div className="space-y-3">
              {cancelledList.map((reg) => {
                const act = activitiesMap[reg.activityId];
                return (
                  <div key={reg.id} className="p-4 rounded-2xl bg-white border border-teal-50 shadow-xs flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[10px]">
                        ยกเลิกแล้ว
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">{act ? act.title : reg.activityId}</h4>
                      <p className="text-slate-500 mt-0.5">วันที่จัดงานเดิม: {act ? act.date : '-'}</p>
                    </div>
                    <button
                      onClick={() => act && onSelectActivity(act)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 font-semibold cursor-pointer shrink-0"
                    >
                      ดูโครงการอีกครั้ง
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
