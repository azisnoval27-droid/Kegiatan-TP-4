import React from 'react';
import { Play, Sparkles, HeartHandshake, BookOpen, Layers, CheckCircle2, ArrowRight, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface IntroScreenProps {
  onStartGame: () => void;
  onOpenGlossary: () => void;
  onOpenQuiz: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onStartGame,
  onOpenGlossary,
  onOpenQuiz
}) => {
  return (
    <div id="intro-screen" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Bento Top Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Bento Card (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-10 shadow-xs border border-emerald-100/90 relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Media Pembelajaran Interaktif IPS SMP Kelas 7
              </span>
              <span className="text-xs font-bold text-slate-400">Kurikulum Merdeka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              EcoSocial Sim: <br />
              <span className="text-emerald-700">Strategi Bisnis & Interaksi Desa</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Selamat datang, <strong>Wirausahawan Muda Desa Sukamaju</strong>! Kelola potensi komoditas desa melalui 3 tahapan ekonomi utama (<strong>Produksi, Distribusi, Konsumsi</strong>). Buktikan bahwa kesuksesan finansial harus berjalan seiring dengan <strong>interaksi sosial yang harmonis dan asosiatif</strong>!
            </p>
          </div>

          {/* Quick Bento Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">Modal Awal Kas</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">Rp 1.500.000</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">Poin Sosial Awal</div>
              <div className="text-xl font-black text-emerald-700 mt-0.5">60 / 100</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">Target Belajar</div>
              <div className="text-xl font-black text-teal-700 mt-0.5">3 Siklus Usaha</div>
            </div>
          </div>

          {/* CTA Button Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="btn-start-simulation"
              onClick={() => {
                sound.playClick();
                sound.playSuccess();
                onStartGame();
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-lg shadow-emerald-200/80 hover:shadow-emerald-300 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              Mulai Simulasi Usaha
            </button>

            <button
              id="btn-intro-glossary"
              onClick={() => {
                sound.playClick();
                onOpenGlossary();
              }}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm border border-slate-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              Materi IPS & Glosarium
            </button>

            <button
              id="btn-intro-quiz"
              onClick={() => {
                sound.playClick();
                onOpenQuiz();
              }}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-black text-sm border border-teal-200 transition-colors cursor-pointer"
            >
              Kuis Pemahaman
            </button>
          </div>
        </div>

        {/* Side Bento Card (Col 4): Core IPS Learning Pillar */}
        <div className="lg:col-span-4 bg-slate-900 rounded-[32px] p-6 sm:p-8 text-white shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-4 bg-emerald-400 rounded-full"></span>
                Tujuan Pembelajaran
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <h3 className="text-xl font-black text-white leading-snug">
              Keseimbangan Profit & Modal Sosial Desa
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kamu akan menguji hipotesis sosial: <em>Apakah persaingan curang (disosiatif) lebih menguntungkan, atau kerja sama gotong royong (asosiatif) yang menjamin kelangsungan jangka panjang?</em>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-2">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Kriteria Kelulusan:</div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Pertahankan saldo kas di atas modal awal</li>
              <li>Pelihara Poin Sosial desa tetap stabil &ge; 70</li>
              <li>Selesaikan evaluasi refleksi di akhir siklus</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3 Steps Bento Layout Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            Alur 3 Tahapan Kegiatan Ekonomi
          </h2>
          <span className="text-xs font-bold text-slate-400">Siklus Simulasi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Produksi */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-base">
                1
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Tahap 1: Produksi
              </span>
              <h3 className="font-black text-slate-900 text-base">
                Pembuatan Komoditas Desa
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih komoditas unggulan desa (Anyaman Bambu, Jamu Herbal, Keripik Singkong, Batik Cap), kalkulasi modal bahan, dan rekrut tenaga kerja lokal.
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
              💡 Belajar: Faktor Produksi & HPP
            </div>
          </div>

          {/* Bento Card 2: Distribusi & Interaksi Sosial */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-black text-base">
                2
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Tahap 2: Distribusi
              </span>
              <h3 className="font-black text-slate-900 text-base">
                Dilema Interaksi Sosial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hadapi pilihan dilematis pengiriman: bermitra dengan <strong>Koperasi Desa (Asosiatif)</strong> atau mengambil jalur <strong>Perang Curang (Disosiatif)</strong>.
              </p>
            </div>
            <div className="text-[11px] font-bold text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
              💡 Belajar: Asosiatif vs Disosiatif
            </div>
          </div>

          {/* Bento Card 3: Konsumsi */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-base">
                3
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Tahap 3: Konsumsi
              </span>
              <h3 className="font-black text-slate-900 text-base">
                Penjualan & Respon Konsumen
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tentukan strategi harga jual per unit di pasar. Reputasi hubungan tokomu menentukan apakah tokomu didukung atau diboikot oleh pembeli desa.
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              💡 Belajar: Kepuasan Konsumen & Laba Rugi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
