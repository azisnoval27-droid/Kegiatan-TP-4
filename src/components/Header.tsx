import React from 'react';
import { Volume2, VolumeX, BookOpen, HelpCircle, RotateCcw, Award, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGlossary: () => void;
  onOpenHelp: () => void;
  onRestartGame: () => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenGlossary,
  onOpenHelp,
  onRestartGame,
  onOpenQuiz
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-emerald-50/90 backdrop-blur-md border-b border-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Subtitle in Bento Title Card */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-200 font-black">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                EcoSocial Sim
              </h1>
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                IPS SMP Kelas 7
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-700 hidden sm:block">
              Strategi Bisnis & Interaksi Desa Sukamaju
            </p>
          </div>
        </div>

        {/* Action Buttons as Bento Pills */}
        <div className="flex items-center gap-2">
          <button
            id="btn-open-materi"
            onClick={() => {
              sound.playClick();
              onOpenGlossary();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-xs sm:text-sm font-bold text-slate-700 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all cursor-pointer"
            title="Buka Materi & Glosarium IPS"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Materi IPS</span>
          </button>

          <button
            id="btn-open-quiz-nav"
            onClick={() => {
              sound.playClick();
              onOpenQuiz();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-xs sm:text-sm font-black text-slate-900 shadow-xs transition-all cursor-pointer"
            title="Kuis Uji Pemahaman IPS"
          >
            <Award className="w-4 h-4 text-slate-900 fill-slate-900" />
            <span className="hidden md:inline">Kuis IPS</span>
          </button>

          <button
            id="btn-open-panduan"
            onClick={() => {
              sound.playClick();
              onOpenHelp();
            }}
            className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-100 shadow-xs transition-all cursor-pointer"
            title="Panduan Bermain"
          >
            <HelpCircle className="w-4 h-4 text-slate-600" />
          </button>

          <button
            id="btn-toggle-sound"
            onClick={() => {
              onToggleSound();
            }}
            className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-100 shadow-xs transition-all cursor-pointer"
            title={soundEnabled ? 'Matikan Suara FX' : 'Nyalakan Suara FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            id="btn-restart-game"
            onClick={() => {
              sound.playClick();
              onRestartGame();
            }}
            className="p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all cursor-pointer"
            title="Mulai Ulang Simulasi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
