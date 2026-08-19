import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  School, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { Activity, Registration, UserProfile } from '../../types';
import { EMERGENCY_RELATION_OPTIONS } from '../../data/mockData';

interface SignUpModalProps {
  activity: Activity | null;
  currentUser: UserProfile;
  onClose: () => void;
  onSubmit: (regData: Partial<Registration>) => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
  activity,
  currentUser,
  onClose,
  onSubmit
}) => {
  if (!activity) return null;

  const [formData, setFormData] = useState({
    fullName: currentUser.fullName,
    phone: currentUser.phone,
    email: currentUser.email,
    institution: currentUser.institution,
    studentId: currentUser.studentId || '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: EMERGENCY_RELATION_OPTIONS[0].value,
    specialNeeds: '',
    agreedTerms: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'กรุณาระบุชื่อ-นามสกุล';
    }

    const phoneRegex = /^0[0-9]{9}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'กรุณาระบุเบอร์โทรศัพท์';
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      errs.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ต้องขึ้นต้นด้วย 0 และมี 10 หลัก)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'กรุณาระบุอีเมล';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!formData.emergencyName.trim()) {
      errs.emergencyName = 'กรุณาระบุชื่อผู้ติดต่อฉุกเฉิน';
    }

    if (!formData.emergencyPhone.trim()) {
      errs.emergencyPhone = 'กรุณาระบุเบอร์โทรผู้ติดต่อฉุกเฉิน';
    } else if (!phoneRegex.test(formData.emergencyPhone.replace(/[-\s]/g, ''))) {
      errs.emergencyPhone = 'เบอร์ติดต่อฉุกเฉินต้องเป็นตัวเลข 10 หลัก';
    }

    if (!formData.agreedTerms) {
      errs.agreedTerms = 'กรุณายอมรับเงื่อนไขการเข้าร่วมกิจกรรม';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        activityId: activity.id,
        userId: currentUser.id,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        institution: formData.institution,
        studentId: formData.studentId,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation
        },
        specialNeeds: formData.specialNeeds,
        status: 'registered'
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2rem] max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto border border-teal-100 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-teal-100 flex items-center justify-between bg-teal-800 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs shadow-teal-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">ใบสมัครเข้าร่วมกิจกรรมจิตอาสา</h3>
              <p className="text-xs text-teal-200 truncate max-w-[280px] sm:max-w-md">{activity.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Activity Mini Banner */}
        <div className="px-5 py-3 bg-teal-50 border-b border-teal-100 flex items-center justify-between text-xs text-teal-900 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold">วันที่: {activity.date}</span>
            <span>•</span>
            <span>{activity.time}</span>
          </div>
          <span className="font-extrabold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-200">
            +{activity.hours} ชม. จิตอาสา
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Personal Info Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 pb-1 border-b border-teal-50">
              <User className="w-4 h-4 text-teal-600" /> ข้อมูลผู้สมัคร (ดึงจากโปรไฟล์)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ชื่อ-นามสกุล <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  เบอร์โทรศัพท์ (10 หลัก) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0891234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  อีเมลติดต่อ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  สถาบันการศึกษา / ที่ทำงาน
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 pb-1 border-b border-teal-50">
              <Phone className="w-4 h-4 text-teal-600" /> ข้อมูลติดต่อกรณีฉุกเฉิน (Emergency Contact)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ชื่อผู้ติดต่อฉุกเฉิน <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น คุณแม่สมศรี"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${errors.emergencyName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500`}
                />
                {errors.emergencyName && <p className="text-[11px] text-rose-500 mt-1">{errors.emergencyName}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ความสัมพันธ์ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.emergencyRelation}
                  onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-teal-500"
                >
                  {EMERGENCY_RELATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  เบอร์โทรฉุกเฉิน <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0811112222"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${errors.emergencyPhone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500`}
                />
                {errors.emergencyPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </div>

          {/* Special Needs */}
          <div className="pt-2">
            <label className="font-semibold text-slate-700 block mb-1">
              ข้อจำกัดด้านสุขภาพ / อาหารที่แพ้ / ความต้องการพิเศษ (ถ้ามี)
            </label>
            <input
              type="text"
              placeholder="เช่น ทานมังสวิรัติ, แพ้อาหารทะเล, มีโรคหอบหืด..."
              value={formData.specialNeeds}
              onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedTerms}
                onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-slate-600 text-[11px] leading-relaxed">
                ข้าพเจ้ายินยอมปฏิบัติตามกฎระเบียบของโครงการจิตอาสา แต่งกายสุภาพตรงต่อเวลา และยินยอมให้บันทึกข้อมูลเพื่อออกใบรับรองชั่วโมงจิตอาสา
              </span>
            </label>
            {errors.agreedTerms && <p className="text-[11px] text-rose-500">{errors.agreedTerms}</p>}
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-teal-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg shadow-teal-200 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>กำลังบันทึก...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>ยืนยันการสมัคร (Confirm)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
