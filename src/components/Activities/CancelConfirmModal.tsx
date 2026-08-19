import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Activity } from '../../types';

interface CancelConfirmModalProps {
  activity: Activity | null;
  onClose: () => void;
  onConfirmCancel: (activityId: string, reason: string) => void;
}

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  activity,
  onClose,
  onConfirmCancel
}) => {
  if (!activity) return null;
  const [reason, setReason] = useState('ติดภารกิจด่วน / ติดสอบ');

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-900">ยืนยันการยกเลิกการสมัคร?</h3>
          <p className="text-xs text-slate-500">
            คุณต้องการยกเลิกการเข้าร่วมกิจกรรม <strong>"{activity.title}"</strong> ใช่หรือไม่?
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-semibold">⚠️ หมายเหตุ:</p>
          <p>เมื่อกดยกเลิก ที่นั่งของคุณจะถูกส่งต่อให้แก่จิตอาสาท่านอื่นในระบบทันที และประวัติจะถูกบันทึกในแท็บกิจกรรมที่ยกเลิก</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            ระบุเหตุผลในการยกเลิก (ทางเลือก):
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-hidden focus:border-rose-500"
          >
            <option value="ติดภารกิจด่วน / ติดสอบ">ติดภารกิจด่วน / ติดสอบ</option>
            <option value="ปัญหาสุขภาพ / ไม่สบาย">ปัญหาสุขภาพ / ไม่สบาย</option>
            <option value="การเดินทางไม่สะดวก">การเดินทางไม่สะดวก</option>
            <option value="สมัครซ้ำซ้อน">สมัครซ้ำซ้อน</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
          >
            ไม่ยกเลิก (ย้อนกลับ)
          </button>
          <button
            onClick={() => {
              onConfirmCancel(activity.id, reason);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 cursor-pointer transition-all active:scale-95"
          >
            ยืนยันยกเลิกกิจกรรม
          </button>
        </div>
      </div>
    </div>
  );
};
