import React from 'react';
import { Award, ArrowRight, TrendingUp, HeartHandshake, CheckCircle2, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { CycleRecord } from '../types/game';
import { sound } from '../utils/audio';

interface CycleSummaryModalProps {
  record: CycleRecord;
  currentCycle: number;
  totalCycles: number;
  onNextCycle: () => void;
  onGoToFinalReflection: () => void;
}

export const CycleSummaryModal: React.FC<CycleSummaryModalProps> = ({
  record,
  currentCycle,
  totalCycles,
  onNextCycle,
  onGoToFinalReflection
}) => {
  const isFinalCycle = currentCycle >= totalCycles;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-100/90 space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-800 mb-1">
            <Award className="w-8 h-8" />
          </div>
          <div className="flex justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Evaluasi Kegiatan Ekonomi
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Hasil Laporan Siklus {record.cycleNumber}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Rekap menyeluruh tahapan Produksi, Distribusi, dan Konsumsi beserta modal sosial tokomu di desa.
          </p>
        </div>

        {/* 2 Bento Comparison Boxes: Finansial & Sosial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Finansial Result Bento */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Kinerja Finansial
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-slate-900">
              {formatRupiah(record.endingMoney)}
            </div>
            <div className="text-xs space-y-1 pt-2 border-t border-slate-200/80 text-slate-600">
              <div className="flex justify-between">
                <span>Laba Siklus:</span>
                <span className={`font-black ${record.consumption.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {record.consumption.netProfit >= 0 ? `+${formatRupiah(record.consumption.netProfit)}` : formatRupiah(record.consumption.netProfit)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Terjual:</span>
                <span className="font-bold text-slate-700">{record.consumption.unitsSold} / {record.production.quantity} unit</span>
              </div>
            </div>
          </div>

          {/* Social Score Bento */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Modal Sosial Desa
              </span>
              <HeartHandshake className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-xl font-black text-slate-900">
              {record.endingSocialScore} <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="text-xs space-y-1 pt-2 border-t border-slate-200/80 text-slate-600">
              <div className="flex justify-between">
                <span>Interaksi:</span>
                <span className={`font-black ${record.distribution.choiceType === 'associative' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {record.distribution.choiceType === 'associative' ? 'Asosiatif (+)' : 'Disosiatif (-)'}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Kelancaran:</span>
                <span className="font-bold text-slate-700">{Math.round(record.distribution.successRate * 100)}% Sukses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection Note for Student */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
          record.distribution.choiceType === 'associative'
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-rose-50/80 border-rose-200 text-rose-950'
        }`}>
          <div className="font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Refleksi Pembelajaran IPS:
          </div>
          {record.distribution.choiceType === 'associative' ? (
            <span>
              Pilihan asosiatif (kerja sama koperasi & gotong royong) terbukti mempermudah sampainya barang ke pasar, meningkatkan loyalitas konsumen, dan mengamankan keuntungan jangka panjang.
            </span>
          ) : (
            <span>
              Pilihan disosiatif (persaingan curang & boikot) memicu konflik sosial, merusak kepercayaan pasar, dan menurunkan laba bersih tokomu.
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isFinalCycle ? (
            <button
              id="btn-goto-final-reflection"
              onClick={() => {
                sound.playClick();
                sound.playSuccess();
                onGoToFinalReflection();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-200/80 transition-all cursor-pointer"
            >
              <span>Buka Layar Refleksi Akhir & Evaluasi IPS</span>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </button>
          ) : (
            <button
              id="btn-goto-next-cycle"
              onClick={() => {
                sound.playClick();
                onNextCycle();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-200/80 transition-all cursor-pointer"
            >
              <span>Lanjut ke Siklus Usaha {currentCycle + 1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
