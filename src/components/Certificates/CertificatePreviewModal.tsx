import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Award, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Certificate } from '../../types';

interface CertificatePreviewModalProps {
  certificate: Certificate | null;
  onClose: () => void;
  onDownloadMockPDF: (cert: Certificate) => void;
}

export const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  certificate,
  onClose,
  onDownloadMockPDF
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm">เกียรติบัตรอิเล็กทรอนิกส์ (Digital Certificate)</h3>
              <p className="text-[11px] text-slate-400">รหัสอ้างอิง: {certificate.certificateNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownloadMockPDF(certificate)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Render Frame */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-slate-100/70 flex items-center justify-center flex-1">
          <div 
            id="certificate-print-area"
            className="w-full max-w-2xl bg-white border-12 border-double border-teal-800 p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden text-center text-slate-800 space-y-5"
            style={{
              backgroundImage: 'radial-gradient(#0D9488 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-600" />

            {/* Top Seal / Badge */}
            <div className="flex justify-center items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-amber-200">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>

            {/* Institution / Header Title */}
            <div>
              <p className="text-xs tracking-widest text-teal-800 font-bold uppercase">
                {certificate.organizerName} ร่วมกับ VOLUNTEERHUB THAILAND
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1 font-serif">
                เกียรติบัตรเชิดชูเกียรติ
              </h2>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                CERTIFICATE OF SOCIAL CONTRIBUTION & VOLUNTEERING
              </p>
            </div>

            {/* Cert Body Text */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-slate-600">เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า</p>
              <h3 className="text-xl sm:text-2xl font-bold text-teal-900 border-b-2 border-amber-500/40 inline-block px-6 pb-1">
                {certificate.userName}
              </h3>
              {certificate.userInstitution && (
                <p className="text-xs text-slate-500">{certificate.userInstitution}</p>
              )}
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-1">
              <p>ได้เข้าร่วมและปฏิบัติงานจิตอาสาในโครงการ</p>
              <p className="font-bold text-slate-900 text-sm sm:text-base text-teal-800">
                "{certificate.activityTitle}"
              </p>
              <p className="pt-1">
                สะสมเวลาปฏิบัติหน้าที่เพื่อสาธารณประโยชน์ รวมทั้งสิ้น{' '}
                <strong className="text-teal-900 font-extrabold text-base bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {certificate.hours} ชั่วโมง
                </strong>
              </p>
              <p className="text-xs text-slate-500 pt-1">
                ขออำนวยอวยพรให้มีความสุข ความเจริญ และเป็นกำลังสำคัญในการพัฒนาสังคมสืบไป
              </p>
            </div>

            {/* Signatures & QR Section */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              {/* Left QR verification */}
              <div className="flex items-center gap-2 text-left bg-slate-50 p-2 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-600" /> สแกนตรวจสอบเอกสาร
                  </p>
                  <p className="text-[9px] text-slate-500 font-mono">{certificate.certificateNumber}</p>
                  <p className="text-[9px] text-teal-700 font-medium">ออกให้ ณ วันที่ {certificate.issueDate}</p>
                </div>
              </div>

              {/* Right Signature */}
              <div className="text-center sm:text-right">
                <div className="font-serif italic text-base text-teal-900 font-bold tracking-wider mb-0.5">
                  {certificate.organizerSignatory}
                </div>
                <div className="w-36 h-0.5 bg-slate-300 mx-auto sm:ml-auto mb-1" />
                <p className="font-bold text-slate-800 text-[11px]">({certificate.organizerSignatory})</p>
                <p className="text-[10px] text-slate-500">{certificate.organizerPosition}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 text-teal-700">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>ใบรับรองดิจิทัลผ่านการรับรองระบบชั่วโมง กยศ. และสถานศึกษา</span>
          </div>
          <button
            onClick={() => onDownloadMockPDF(certificate)}
            className="text-teal-600 font-bold hover:underline cursor-pointer"
          >
            บันทึกไฟล์เกียรติบัตร (HD PNG / PDF) →
          </button>
        </div>
      </div>
    </div>
  );
};
