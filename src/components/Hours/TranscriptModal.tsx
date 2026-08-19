import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Award, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  School
} from 'lucide-react';
import { Activity, Registration, UserProfile } from '../../types';
import { BADGE_TIERS } from '../../data/mockData';

interface TranscriptModalProps {
  currentUser: UserProfile;
  completedRegistrations: Registration[];
  activitiesMap: Record<string, Activity>;
  onClose: () => void;
  onDownload: () => void;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  currentUser,
  completedRegistrations,
  activitiesMap,
  onClose,
  onDownload
}) => {
  const currentTier = BADGE_TIERS[currentUser.currentTier] || BADGE_TIERS.tier_1;
  const totalVerifiedHours = completedRegistrations.reduce((acc, r) => acc + (r.hoursAwarded || 0), 0);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 bg-teal-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm">ใบบันทึกประวัติชั่วโมงจิตอาสาทางการ (Volunteer Transcript)</h3>
              <p className="text-[11px] text-teal-200">สำหรับยื่นทุน กยศ. / กองกิจการนิสิต / TCAS Portfolio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ส่งออกเอกสาร</span>
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-teal-300 hover:text-white hover:bg-teal-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
          {/* Header Banner */}
          <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
                  VH
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">VOLUNTEERHUB THAILAND</h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">แพลตฟอร์มรับรองชั่วโมงจิตอาสาแห่งประเทศไทย</p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-bold text-slate-900 text-xs">เอกสารรับรองชั่วโมงการทำประโยชน์เพื่อสังคม</p>
              <p className="text-[10px] text-slate-500">เอกสารเลขที่: VH-TR-2026-{currentUser.studentId || '88392'}</p>
              <p className="text-[10px] text-slate-500">พิมพ์เมื่อ: 18 สิงหาคม 2026</p>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p><strong className="text-slate-900">ชื่อ-นามสกุล:</strong> {currentUser.fullName}</p>
              <p><strong className="text-slate-900">สถานศึกษา:</strong> {currentUser.institution}</p>
              {currentUser.facultyOrSchool && (
                <p><strong className="text-slate-900">คณะ/สาขา:</strong> {currentUser.facultyOrSchool}</p>
              )}
              {currentUser.studentId && (
                <p><strong className="text-slate-900">รหัสประจำตัว:</strong> {currentUser.studentId}</p>
              )}
            </div>

            <div>
              <p><strong className="text-slate-900">อีเมล:</strong> {currentUser.email}</p>
              <p><strong className="text-slate-900">เบอร์โทรศัพท์:</strong> {currentUser.phone}</p>
              <p><strong className="text-slate-900">ระดับจิตอาสา:</strong> {currentTier.thaiName}</p>
              <p><strong className="text-teal-700">ชั่วโมงรับรองสะสมรวม:</strong> <span className="text-base font-extrabold text-teal-800">{totalVerifiedHours || currentUser.totalHours} ชั่วโมง</span></p>
            </div>
          </div>

          {/* Table of Completed Volunteer Work */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              รายการกิจกรรมจิตอาสาที่ผ่านการรับรอง (Verified Activities)
            </h4>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[11px] font-bold text-slate-700 border-b border-slate-200">
                    <th className="p-2.5">ลำดับ</th>
                    <th className="p-2.5">ชื่อโครงการ / กิจกรรม</th>
                    <th className="p-2.5">หมวดหมู่</th>
                    <th className="p-2.5">องค์กรผู้จัด</th>
                    <th className="p-2.5">วันที่จัด</th>
                    <th className="p-2.5 text-center">ชั่วโมง</th>
                    <th className="p-2.5 text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {completedRegistrations.map((reg, idx) => {
                    const act = activitiesMap[reg.activityId];
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-2.5 font-semibold text-slate-800">{act ? act.title : reg.activityId}</td>
                        <td className="p-2.5">{act ? act.category : 'จิตอาสา'}</td>
                        <td className="p-2.5 text-slate-600">{act ? act.organizer.name : '-'}</td>
                        <td className="p-2.5 text-slate-500 whitespace-nowrap">{act ? act.date : reg.registeredAt}</td>
                        <td className="p-2.5 text-center font-extrabold text-teal-700">+{reg.hoursAwarded || (act ? act.hours : 0)}</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ผ่านการรับรอง
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-teal-50/70 font-bold text-slate-900 border-t border-teal-200">
                    <td colSpan={5} className="p-3 text-right">รวมชั่วโมงจิตอาสาทั้งหมด:</td>
                    <td className="p-3 text-center text-teal-800 font-extrabold text-sm">
                      {totalVerifiedHours || currentUser.totalHours} ชม.
                    </td>
                    <td className="p-3 text-center text-teal-700 text-[10px]">สมบูรณ์ 100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Official Verification Seal & Signatures */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-1">
              <p className="text-slate-400">ลงชื่อผู้ขอรับการรับรอง</p>
              <div className="pt-6 font-serif font-bold text-slate-800">({currentUser.fullName})</div>
              <p className="text-[10px] text-slate-500">จิตอาสาผู้ปฏิบัติงาน</p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400">ผู้มีอำนาจรับรองระบบส่วนกลาง</p>
              <div className="pt-6 font-serif font-bold text-teal-900">(นายแพทย์ณรงค์ วัฒนาการกุล)</div>
              <p className="text-[10px] text-slate-500">ประธานคณะกรรมการตรวจรับรองชั่วโมงจิตอาสา VolunteerHub</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            เอกสารฉบับนี้ใช้ยื่นสถานศึกษาและกองทุน กยศ. ได้ถูกต้องตามระเบียบ
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
