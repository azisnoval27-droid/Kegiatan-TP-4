import React from 'react';
import { Award, Sparkles, TrendingUp, HeartHandshake, BookOpen, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Star, Layers } from 'lucide-react';
import { CycleRecord } from '../types/game';
import { INITIAL_MONEY, INITIAL_SOCIAL_SCORE } from '../data/gameData';
import { sound } from '../utils/audio';

interface FinalReflectionScreenProps {
  finalMoney: number;
  finalSocialScore: number;
  cycleRecords: CycleRecord[];
  onPlayAgain: () => void;
  onOpenQuiz: () => void;
  onOpenGlossary: () => void;
}

export const FinalReflectionScreen: React.FC<FinalReflectionScreenProps> = ({
  finalMoney,
  finalSocialScore,
  cycleRecords,
  onPlayAgain,
  onOpenQuiz,
  onOpenGlossary
}) => {
  const totalProfit = finalMoney - INITIAL_MONEY;
  const profitPercentage = Math.round((totalProfit / INITIAL_MONEY) * 100);

  // Determine entrepreneur title & badge
  const getOutcomeBadge = () => {
    if (finalSocialScore >= 80 && totalProfit > 0) {
      return {
        title: '🌟 Wirausahawan Harmonis & Pahlawan Ekonomi Desa',
        desc: 'Luar biasa! Kamu berhasil mengembangkan bisnis berkeuntungan tinggi sekaligus menjaga keharmonisan desa dengan kerja sama asosiatif yang erat.',
        badgeColor: 'bg-emerald-600 text-white',
        cardBorder: 'border-emerald-500 bg-emerald-50/40'
      };
    } else if (finalSocialScore >= 60 && totalProfit >= 0) {
      return {
        title: '🌱 Pengusaha Desa Kolaboratif & Bertanggung Jawab',
        desc: 'Bagus sekali! Usahamu berkembang stabil dan kamu menjalin relasi sehat dengan Koperasi serta warga sekitar.',
        badgeColor: 'bg-teal-600 text-white',
        cardBorder: 'border-teal-500 bg-teal-50/40'
      };
    } else if (finalSocialScore < 50 && totalProfit > 0) {
      return {
        title: '⚠️ Pedagang Oportunis yang Dihindari Warga',
        desc: 'Meskipun meraup uang, tokomu kehilangan modal sosial akibat persaingan tidak sehat dan konflik. Dalam jangka panjang, tokomu terancam boikot.',
        badgeColor: 'bg-amber-600 text-white',
        cardBorder: 'border-amber-500 bg-amber-50/40'
      };
    } else {
      return {
        title: '📉 Pelaku Usaha Terisolasi & Mengalami Defisit',
        desc: 'Konflik sosial merusak rantai distribusi dan menurunkan minat beli konsumen. Pelajari kembali pentingnya interaksi asosiatif!',
        badgeColor: 'bg-rose-600 text-white',
        cardBorder: 'border-rose-500 bg-rose-50/40'
      };
    }
  };

  const outcome = getOutcomeBadge();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="final-reflection-screen" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Hero Bento Achievement Header */}
      <div className={`rounded-[32px] p-6 sm:p-10 border-2 shadow-xs text-center space-y-4 ${outcome.cardBorder}`}>
        <div className="inline-flex p-4 rounded-3xl bg-white shadow-xs text-amber-500">
          <Award className="w-12 h-12" />
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-700 bg-white/90 border border-slate-200">
            Laporan Refleksi Akhir Simulasi Usaha
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {outcome.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {outcome.desc}
          </p>
        </div>

        {/* 2 Big Core Bento Metrics: Finansial & Sosial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pt-4 text-left">
          {/* Card Finansial */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Hasil Finansial Usaha
              </span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${profitPercentage >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {profitPercentage >= 0 ? `+${profitPercentage}%` : `${profitPercentage}%`}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatRupiah(finalMoney)}
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
              <div className="flex justify-between">
                <span>Modal Awal:</span>
                <span className="font-bold text-slate-800">{formatRupiah(INITIAL_MONEY)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Laba Bersih:</span>
                <span className={`font-black ${totalProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {totalProfit >= 0 ? `+${formatRupiah(totalProfit)}` : formatRupiah(totalProfit)}
                </span>
              </div>
            </div>
          </div>

          {/* Card Sosial */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                Modal Sosial Desa
              </span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${finalSocialScore >= 60 ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'}`}>
                {finalSocialScore >= 75 ? 'Harmonis' : finalSocialScore >= 50 ? 'Stabil' : 'Renggang/Konflik'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {finalSocialScore} <span className="text-sm font-bold text-slate-400">/ 100</span>
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
              <div className="flex justify-between">
                <span>Poin Awal:</span>
                <span className="font-bold text-slate-800">{INITIAL_SOCIAL_SCORE} / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Perubahan Poin:</span>
                <span className={`font-black ${finalSocialScore >= INITIAL_SOCIAL_SCORE ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {finalSocialScore >= INITIAL_SOCIAL_SCORE ? `+${finalSocialScore - INITIAL_SOCIAL_SCORE}` : `${finalSocialScore - INITIAL_SOCIAL_SCORE}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rangkuman Pembelajaran IPS SMP Bento Grid */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            Kesimpulan Pembelajaran IPS SMP Kelas 7:
          </h3>
          <span className="text-xs font-bold text-slate-400">Kurikulum Merdeka</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
            <h4 className="font-black text-emerald-950 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              1. Keterikatan 3 Kegiatan Ekonomi
            </h4>
            <p className="text-slate-700 leading-relaxed">
              <strong>Produksi, Distribusi, dan Konsumsi</strong> adalah satu kesatuan rantai ekonomi. Barang yang diproduksi dengan kualitas baik tidak akan menghasilkan laba jika distribusinya tersendat atau konsumen enggan membelinya.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
            <h4 className="font-black text-teal-950 text-sm flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-teal-700" />
              2. Mengapa Interaksi Asosiatif Kunci Keberhasilan?
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Interaksi sosial <strong>Asosiatif</strong> (kooperasi/kerja sama, musyawarah, gotong royong) menciptakan <strong>modal sosial (social capital)</strong> berupa kepercayaan masyarakat, biaya distribusi murah, dan loyalitas pembeli.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2">
            <h4 className="font-black text-rose-950 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              3. Bahaya Interaksi Disosiatif bagi Bisnis
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Interaksi <strong>Disosiatif</strong> (perang harga curang, blokade jalur, fitnah) mungkin tampak memberi jalan pintas, namun memicu sanksi sosial, rusaknya barang, pemboikotan, dan kerugian fatal.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
            <h4 className="font-black text-amber-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              4. Prinsip Ekonomi Beretika
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Prinsip ekonomi yang sehat bukan mencari untung maksimal secara serakah, melainkan mengoptimalkan hasil dengan cara <strong>etis, adil bagi pekerja, dan ramah sosial</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* History of Cycles Bento Tile */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-black text-slate-900 text-base sm:text-lg">
          Riwayat Keputusan Setiap Siklus Usaha:
        </h3>

        <div className="space-y-3">
          {cycleRecords.map((rec) => (
            <div
              key={rec.cycleNumber}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    Siklus {rec.cycleNumber}
                  </span>
                  <span className="font-black text-slate-900">{rec.production.productName}</span>
                </div>
                <div className="text-slate-500 text-xs">
                  Produksi: <strong>{rec.production.quantity} unit</strong> | Distribusi: 
                  <span className={`font-bold ml-1 ${rec.distribution.choiceType === 'associative' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {rec.distribution.title}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="font-black text-slate-900">
                  Laba: {rec.consumption.netProfit >= 0 ? `+${formatRupiah(rec.consumption.netProfit)}` : formatRupiah(rec.consumption.netProfit)}
                </div>
                <div className="text-[11px] text-slate-400">
                  Terjual: {rec.consumption.unitsSold} unit | Kas: {formatRupiah(rec.endingMoney)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Action Deck */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          id="btn-final-quiz-cta"
          onClick={() => {
            sound.playClick();
            onOpenQuiz();
          }}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm sm:text-base shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer"
        >
          <Award className="w-5 h-5 fill-slate-900" />
          <span>Uji Pemahaman: Kuis IPS (5 Soal)</span>
        </button>

        <button
          id="btn-final-glossary-cta"
          onClick={() => {
            sound.playClick();
            onOpenGlossary();
          }}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-sm transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-emerald-200" />
          <span>Buka Rangkuman Materi Lengkap</span>
        </button>

        <button
          id="btn-final-replay-cta"
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm border border-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mainkan Ulang Simulasi</span>
        </button>
      </div>
    </div>
  );
};
