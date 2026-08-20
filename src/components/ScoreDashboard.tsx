import React from 'react';
import { Coins, HeartHandshake, Activity, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GameStage, SocialLevel } from '../types/game';

interface ScoreDashboardProps {
  money: number;
  socialScore: number;
  currentCycle: number;
  totalCycles: number;
  currentStage: GameStage;
  moneyChange?: number | null;
  socialChange?: number | null;
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  money,
  socialScore,
  currentCycle,
  totalCycles,
  currentStage,
  moneyChange,
  socialChange
}) => {
  // Determine social status level
  const getSocialStatus = (score: number): { label: string; level: SocialLevel; color: string; badge: string } => {
    if (score >= 75) {
      return {
        label: 'Harmonis',
        level: 'harmonis',
        color: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
      };
    } else if (score >= 50) {
      return {
        label: 'Stabil',
        level: 'stabil',
        color: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-700 border-blue-200'
      };
    } else if (score >= 25) {
      return {
        label: 'Tegang',
        level: 'tegang',
        color: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-800 border-amber-200'
      };
    } else {
      return {
        label: 'Konflik / Boikot',
        level: 'konflik',
        color: 'text-rose-700',
        badge: 'bg-rose-100 text-rose-800 border-rose-200'
      };
    }
  };

  // Determine business smoothness
  const getBusinessStatus = (score: number): { text: string; sub: string; badge: string; chipBg: string } => {
    if (score >= 80) {
      return {
        text: 'Sangat Baik',
        sub: 'Jalur Koperasi lancar & warga mendukung penuh',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        chipBg: 'bg-emerald-100 text-emerald-700'
      };
    } else if (score >= 55) {
      return {
        text: 'Stabil',
        sub: 'Operasional normal, relasi mitra terjaga baik',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        chipBg: 'bg-blue-100 text-blue-700'
      };
    } else if (score >= 30) {
      return {
        text: 'Tersendat',
        sub: 'Ada desas-desus pedagang, pengiriman rawan telat',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        chipBg: 'bg-amber-100 text-amber-700'
      };
    } else {
      return {
        text: 'Terancam Boikot',
        sub: 'Ditolak pedagang desa, risiko penolakan pasokan',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        chipBg: 'bg-rose-100 text-rose-700'
      };
    }
  };

  const socialStatus = getSocialStatus(socialScore);
  const businessStatus = getBusinessStatus(socialScore);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const stagesList = [
    { id: 'production', label: '1. Produksi', short: 'Produksi' },
    { id: 'distribution', label: '2. Distribusi & Interaksi', short: 'Distribusi' },
    { id: 'consumption', label: '3. Konsumsi', short: 'Konsumsi' }
  ];

  return (
    <div id="score-dashboard" className="w-full bg-emerald-50/50 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Bento Bar: Stage Breadcrumbs + Cycle Pill */}
        <div className="bg-white rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs border border-emerald-100/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-700">
                Siklus {currentCycle} dari {totalCycles}
              </span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-emerald-800 hidden sm:inline">
              Misi: Makmurkan Usaha & Jaga Kerukunan Desa
            </span>
          </div>

          {/* Interactive Bento Step Indicator */}
          <div className="flex items-center gap-2 text-xs">
            {stagesList.map((st, idx) => {
              const isActive = currentStage === st.id;
              const isPast =
                (st.id === 'production' && (currentStage === 'distribution' || currentStage === 'consumption' || currentStage === 'cycle_summary')) ||
                (st.id === 'distribution' && (currentStage === 'consumption' || currentStage === 'cycle_summary'));

              return (
                <div
                  key={st.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200 opacity-80'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {idx + 1}
                    </span>
                  )}
                  <span className="hidden md:inline">{st.label}</span>
                  <span className="md:hidden">{st.short}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Main Bento Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Saldo Modal Bento Card */}
          <div id="stat-card-money" className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Saldo Modal Kas
              </p>
              <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {formatRupiah(money)}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Dana operasional usaha
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-700 font-black text-xs sm:text-sm flex flex-col items-center">
              <Coins className="w-5 h-5 mb-0.5" />
              <span>Kas</span>
            </div>
          </div>

          {/* 2. Poin Hubungan Sosial Bento Card */}
          <div id="stat-card-social" className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Poin Hubungan Sosial
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  {socialScore}
                </p>
                <span className="text-xs font-bold text-slate-400">/ 100</span>
              </div>
              <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    socialScore >= 75
                      ? 'bg-emerald-500'
                      : socialScore >= 50
                      ? 'bg-blue-500'
                      : socialScore >= 25
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, socialScore))}%` }}
                />
              </div>
            </div>
            <div className={`px-3 py-2 rounded-2xl text-xs font-black border ${socialStatus.badge} text-center flex flex-col items-center gap-0.5`}>
              <HeartHandshake className="w-4 h-4" />
              <span>{socialStatus.label}</span>
            </div>
          </div>

          {/* 3. Kelancaran Usaha Bento Card */}
          <div id="stat-card-status" className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Kelancaran Usaha
              </p>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 truncate">
                {businessStatus.text}
              </p>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                {businessStatus.sub}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700 font-black text-xs sm:text-sm flex flex-col items-center">
              <Activity className="w-5 h-5 mb-0.5" />
              <span>Rantai Pasok</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
