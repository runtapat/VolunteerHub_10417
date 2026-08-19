import React from 'react';
import { 
  Award, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Printer,
  CalendarCheck,
  Layers
} from 'lucide-react';
import { Certificate, Registration, UserProfile } from '../types';
import { BADGE_TIERS, CATEGORIES_LIST, CATEGORY_BAR_COLORS } from '../data/mockData';

interface VolunteerHoursScreenProps {
  currentUser: UserProfile;
  certificates: Certificate[];
  registrations: Registration[];
  onOpenCertificateModal: (cert: Certificate) => void;
  onOpenTranscriptModal: () => void;
  onDownloadMockPDF: (cert: Certificate) => void;
}

export const VolunteerHoursScreen: React.FC<VolunteerHoursScreenProps> = ({
  currentUser,
  certificates,
  registrations,
  onOpenCertificateModal,
  onOpenTranscriptModal,
  onDownloadMockPDF
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;
  const userCertificates = certificates.filter((c) => c.userId === currentUser.id);

  // ชั่วโมงและสีรายหมวดหมู่มาจาก mockData ทั้งหมด (ไม่มีตัวเลข/สีฮาร์ดโค้ดในหน้าจอ)
  const categoryHours = CATEGORIES_LIST.map((cat) => ({
    name: cat.name,
    hours: currentUser.categoryHours[cat.name] || 0,
    color: CATEGORY_BAR_COLORS[cat.name],
    icon: cat.icon
  })).filter((cat) => cat.hours > 0);


  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">ชั่วโมงจิตอาสา & เกียรติบัตร (Hours & Certificates)</h2>
          <p className="text-xs text-slate-500 mt-1">
            สรุปชั่วโมงสะสมเพื่อการศึกษา ทุน กยศ. และคลังเกียรติบัตรอิเล็กทรอนิกส์ทั้งหมด
          </p>
        </div>

        {/* Transcript Export CTA (Vibrant Palette Button) */}
        <button
          onClick={onOpenTranscriptModal}
          className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-200 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <FileText className="w-4 h-4 text-teal-100" />
          <span>ส่งออกใบรับรองชั่วโมงรวม (Transcript)</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards (Vibrant Palette Design) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-teal-50 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">ชั่วโมงสะสมรวม</span>
            <Clock className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-teal-800">{currentUser.totalHours}</p>
          <p className="text-[11px] text-teal-600 font-medium">บันทึกในระบบทางการ</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-teal-50 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">เกียรติบัตรที่ได้</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">{userCertificates.length}</p>
          <p className="text-[11px] text-slate-500">มีรหัส QR ตรวจสอบได้</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-teal-50 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">กิจกรรมที่สำเร็จ</span>
            <CalendarCheck className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            {registrations.filter((r) => r.userId === currentUser.id && r.status === 'completed').length}
          </p>
          <p className="text-[11px] text-teal-600 font-medium">ผ่านการประเมิน 100%</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-teal-50 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">ระดับจิตอาสา</span>
            <span className="text-base">{currentTier.icon}</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-800 truncate">{currentTier.thaiName.split(' ')[1]}</p>
          <p className="text-[11px] text-teal-600 font-semibold">{currentTier.name}</p>
        </div>
      </div>

      {/* Visual Hours by Category Bar Chart */}
      <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base">สัดส่วนชั่วโมงจำแนกตามหมวดหมู่</h3>
            <p className="text-xs text-slate-400">การมีส่วนร่วมในแต่ละมิติเพื่อสังคม</p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            รวม {currentUser.totalHours} ชั่วโมง
          </span>
        </div>

        {/* Stacked Bar */}
        <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          {categoryHours.map((cat, idx) => {
            const percent = (cat.hours / currentUser.totalHours) * 100;
            return (
              <div
                key={idx}
                className={`${cat.color} transition-all duration-500`}
                style={{ width: `${percent}%` }}
                title={`${cat.name}: ${cat.hours} ชม. (${Math.round(percent)}%)`}
              />
            );
          })}
        </div>

        {/* Category Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {categoryHours.map((cat, idx) => (
            <div key={idx} className="p-3 bg-teal-50/40 rounded-2xl border border-teal-100/60 text-xs flex items-center gap-2">
              <span className="text-lg">{cat.icon}</span>
              <div>
                <p className="font-bold text-slate-800">{cat.name}</p>
                <p className="text-[11px] text-teal-600 font-bold">{cat.hours} ชม.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">คลังเกียรติบัตรอิเล็กทรอนิกส์ (Digital Certificate Vault)</h3>
              <p className="text-xs text-slate-500">คลิกที่เกียรติบัตรเพื่อเปิดดูขนาดเต็ม บันทึกเป็นภาพความละเอียดสูง หรือพิมพ์</p>
            </div>
          </div>
        </div>

        {userCertificates.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-teal-50 text-xs text-slate-500">
            ยังไม่มีเกียรติบัตรในระบบ เมื่อทำกิจกรรมเสร็จสิ้นจะปรากฏที่นี่
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificateModal(cert)}
                className="group bg-white rounded-[2rem] border border-teal-50 overflow-hidden shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                {/* Certificate Thumbnail Preview Frame */}
                <div className="p-4 bg-teal-50/50 border-b border-teal-50">
                  <div className="bg-white border-4 border-double border-teal-700 p-4 rounded-2xl shadow-xs text-center relative overflow-hidden group-hover:scale-102 transition-transform">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center mx-auto mb-1 shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-[9px] uppercase font-bold text-teal-800 tracking-wider">เกียรติบัตรเชิดชูเกียรติ</p>
                    <p className="text-[11px] font-bold text-slate-800 truncate mt-0.5">{cert.activityTitle}</p>
                    <p className="text-[10px] text-teal-600 font-extrabold mt-1">รับรอง {cert.hours} ชั่วโมงจิตอาสา</p>
                    <p className="text-[9px] text-slate-400 mt-1 font-mono">{cert.certificateNumber}</p>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-lg bg-teal-500 text-white text-[10px] font-bold uppercase">
                      {cert.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2 line-clamp-2">
                      {cert.activityTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {cert.organizerName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ออกให้เมื่อ: {cert.issueDate}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-teal-50 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCertificateModal(cert);
                      }}
                      className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>เปิดดูแบบเต็ม</span>
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadMockPDF(cert);
                      }}
                      className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors cursor-pointer"
                      title="ดาวน์โหลดเกียรติบัตร"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
