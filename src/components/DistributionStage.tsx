import React, { useState } from 'react';
import { Truck, Users, ShieldAlert, CheckCircle2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { DistributionDilemma, ProductionChoice } from '../types/game';
import { sound } from '../utils/audio';

interface DistributionStageProps {
  currentMoney: number;
  socialScore: number;
  dilemma: DistributionDilemma;
  productionData: {
    choice: ProductionChoice;
    totalCost: number;
  };
  onCompleteDistribution: (
    choiceType: 'associative' | 'dissociative',
    distributionCost: number,
    socialChange: number,
    successRate: number,
    deliveredUnits: number,
    dilemmaTitle: string
  ) => void;
}

export const DistributionStage: React.FC<DistributionStageProps> = ({
  currentMoney,
  socialScore,
  dilemma,
  productionData,
  onCompleteDistribution
}) => {
  const [selectedChoice, setSelectedChoice] = useState<'associative' | 'dissociative' | null>(null);

  const baseDeliveryCostPerUnit = 2500;
  const quantity = productionData.choice.quantity;

  // Associative calculations
  const associativeCost = Math.round(quantity * baseDeliveryCostPerUnit * dilemma.associativeOption.costMultiplier);
  const associativeDelivered = Math.round(quantity * dilemma.associativeOption.distributionSuccessRate);

  // Dissociative calculations
  const dissociativeCost = Math.round(quantity * baseDeliveryCostPerUnit * dilemma.dissociativeOption.costMultiplier);
  const dissociativeDelivered = Math.round(quantity * dilemma.dissociativeOption.distributionSuccessRate);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleConfirm = (choiceOverride?: 'associative' | 'dissociative') => {
    const choice = choiceOverride || selectedChoice;
    if (!choice) {
      return;
    }

    if (choice === 'associative') {
      sound.playClick();
      sound.playSocialBoost();
      onCompleteDistribution(
        'associative',
        associativeCost,
        dilemma.associativeOption.socialImpact,
        dilemma.associativeOption.distributionSuccessRate,
        associativeDelivered,
        dilemma.associativeOption.title
      );
    } else {
      sound.playClick();
      sound.playSocialDrop();
      onCompleteDistribution(
        'dissociative',
        dissociativeCost,
        dilemma.dissociativeOption.socialImpact,
        dilemma.dissociativeOption.distributionSuccessRate,
        dissociativeDelivered,
        dilemma.dissociativeOption.title
      );
    }
  };

  return (
    <div id="distribution-stage-container" className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      {/* 12-Column Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Left Bento Feature Card (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-sm border border-emerald-100/90 relative overflow-hidden space-y-6">
          {/* Top Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Sistem Dilema Rute Desa
              </span>
            </div>
            <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Tahap 2: Distribusi
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
              {dilemma.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Hasil produksi <strong>{quantity} unit {productionData.choice.product.name}</strong> sudah siap dikirim. 
              {dilemma.scenarioDescription}
            </p>
          </div>

          {/* Quick summary strip inside hero card */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-700">
            <span className="font-bold text-emerald-950">📦 Muatan:</span>
            <span className="font-black text-emerald-800">{quantity} unit {productionData.choice.product.name}</span>
            <span className="text-slate-300">|</span>
            <span>Kas Tersedia: <strong>{formatRupiah(currentMoney)}</strong></span>
          </div>

          {/* Decision Cards in 2-Column Bento Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* OPTION A: ASOSIATIF */}
            <div
              id="option-associative-card"
              onClick={() => {
                sound.playClick();
                setSelectedChoice('associative');
              }}
              className={`group border-2 p-6 rounded-3xl transition-all cursor-pointer bg-white flex flex-col justify-between space-y-4 ${
                selectedChoice === 'associative'
                  ? 'border-emerald-500 bg-emerald-50/60 ring-4 ring-emerald-500/20 shadow-md'
                  : 'border-slate-100 hover:border-emerald-400 hover:bg-emerald-50/30 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 font-black text-xl shadow-xs">
                    A
                  </div>
                  {selectedChoice === 'associative' && (
                    <span className="bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Dipilih
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {dilemma.associativeOption.title}
                </h3>
                
                <p className="text-xs font-semibold text-emerald-700 italic">
                  "{dilemma.associativeOption.description}"
                </p>

                <ul className="text-xs text-slate-600 space-y-2 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>Interaksi: <strong className="text-emerald-800">Asosiatif ({dilemma.associativeOption.type})</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>Dampak Sosial: <strong className="text-emerald-800">+{dilemma.associativeOption.socialImpact} Poin</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>Kelancaran: <strong className="text-emerald-800">{Math.round(dilemma.associativeOption.distributionSuccessRate * 100)}% Aman ({associativeDelivered}/{quantity} unit)</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>Biaya: <strong>{formatRupiah(associativeCost)}</strong></span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChoice('associative');
                  handleConfirm('associative');
                }}
                className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Pilih Jalur Kerja Sama</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* OPTION D: DISOSIATIF */}
            <div
              id="option-dissociative-card"
              onClick={() => {
                sound.playClick();
                setSelectedChoice('dissociative');
              }}
              className={`group border-2 p-6 rounded-3xl transition-all cursor-pointer bg-white flex flex-col justify-between space-y-4 ${
                selectedChoice === 'dissociative'
                  ? 'border-rose-500 bg-rose-50/60 ring-4 ring-rose-500/20 shadow-md'
                  : 'border-slate-100 hover:border-rose-400 hover:bg-rose-50/30 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-700 font-black text-xl shadow-xs">
                    D
                  </div>
                  {selectedChoice === 'dissociative' && (
                    <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Dipilih
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-900 transition-colors">
                  {dilemma.dissociativeOption.title}
                </h3>

                <p className="text-xs font-semibold text-rose-700 italic">
                  "{dilemma.dissociativeOption.description}"
                </p>

                <ul className="text-xs text-slate-600 space-y-2 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0"></span>
                    <span>Interaksi: <strong className="text-rose-800">Disosiatif ({dilemma.dissociativeOption.type})</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0"></span>
                    <span>Dampak Sosial: <strong className="text-rose-800">{dilemma.dissociativeOption.socialImpact} Poin</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0"></span>
                    <span>Risiko: <strong className="text-rose-800">Hanya {Math.round(dilemma.dissociativeOption.distributionSuccessRate * 100)}% Sampai ({dissociativeDelivered}/{quantity} unit)</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0"></span>
                    <span>Biaya Calo: <strong>{formatRupiah(dissociativeCost)}</strong></span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChoice('dissociative');
                  handleConfirm('dissociative');
                }}
                className="mt-4 w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-rose-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Pilih Jalur Persaingan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Bento Column (Col 4): Kamus Mini & Catatan Guru */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bento Card 1: Kamus Ekonomi IPS (Dark Bento Card) */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-sm space-y-4">
            <h3 className="text-base font-black tracking-wide flex items-center gap-2 text-white">
              <span className="w-2 h-5 bg-emerald-400 rounded-full"></span>
              Kamus Ekonomi IPS SMP
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <p className="text-emerald-300 font-extrabold uppercase tracking-wider text-[11px]">
                  Distribusi
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Kegiatan menyalurkan barang dan jasa dari produsen ke konsumen agar bermanfaat tepat waktu.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <p className="text-emerald-300 font-extrabold uppercase tracking-wider text-[11px]">
                  Interaksi Asosiatif
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Interaksi yang mengarah pada persatuan dan kerja sama (kooperasi, akomodasi, asimilasi).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <p className="text-rose-300 font-extrabold uppercase tracking-wider text-[11px]">
                  Interaksi Disosiatif
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Interaksi yang mengarah pada perpecahan dan konflik (kompetisi tidak sehat, kontravensi, pertikaian).
                </p>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Catatan Guru & Refleksi IPS (Emerald Bento Card) */}
          <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-md shadow-emerald-200/50 relative overflow-hidden space-y-3">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 bg-amber-300 rounded-full"></span>
                <h3 className="text-sm font-black uppercase tracking-wider text-emerald-100">
                  Catatan Guru IPS
                </h3>
              </div>
              <p className="text-white text-xs sm:text-sm italic leading-relaxed font-medium">
                "Ingat anak-anak! Dalam ilmu ekonomi dan sosiologi, interaksi sosial asosiatif seperti gotong royong dan kemitraan KUD 
                sangat penting untuk menjamin kelancaran jalur distribusi serta membangun modal sosial yang kokoh."
              </p>
            </div>

            {/* Subtle watermark background icon */}
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <Truck className="w-32 h-32 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
