import React from 'react';
import { X, HelpCircle, Target, Sparkles, HeartHandshake, Coins, Activity, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-emerald-100/90 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                Panduan Bermain EcoSocial Sim
              </h3>
              <p className="text-xs text-slate-500">
                Cara Bermain & Penilaian Media Pembelajaran IPS Kelas 7
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-700">
          {/* Objective Bento Tile */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
            <h4 className="font-black text-emerald-950 flex items-center gap-1.5 text-sm">
              <Target className="w-4 h-4 text-emerald-700" />
              Tujuan Utama Permainan:
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Kamu memimpin usaha komoditas desa selama <strong>3 Siklus Usaha</strong>. 
              Tujuanmu adalah menghasilkan keuntungan finansial sekaligus mempertahankan 
              <strong> Poin Hubungan Sosial di atas 75 (Harmonis)</strong> melalui pilihan-pilihan interaksi asosiatif.
            </p>
          </div>

          {/* 3 Indicators Breakdown Bento Cards */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-sm">
              Indikator Dashboard Skor:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1.5">
                <div className="font-black text-amber-950 flex items-center gap-1.5 text-xs">
                  <Coins className="w-4 h-4 text-amber-700" /> Saldo Kas (Rp)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Modal kas untuk membiayai bahan baku, upah pekerja, dan ongkos logistik.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 space-y-1.5">
                <div className="font-black text-teal-950 flex items-center gap-1.5 text-xs">
                  <HeartHandshake className="w-4 h-4 text-teal-700" /> Poin Sosial (0-100)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Tingkat kepercayaan warga & koperasi. Mempengaruhi kelancaran dan minat pembeli.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-black text-slate-900 flex items-center gap-1.5 text-xs">
                  <Activity className="w-4 h-4 text-slate-700" /> Kelancaran Usaha
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Status rantai pasok. Jika sosial rendah, risiko boikot dan kerusakan kiriman naik.
                </div>
              </div>
            </div>
          </div>

          {/* Gameplay Flow steps Bento List */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-black text-slate-900 text-sm">
              Alur 3 Tahap Setiap Siklus Usaha:
            </h4>
            <ol className="space-y-2 list-decimal list-inside text-slate-600 leading-relaxed text-xs">
              <li>
                <strong>Tahap 1 (Produksi):</strong> Pilih komoditas desa, tentukan upah pekerja etis, dan hitung biaya modal.
              </li>
              <li>
                <strong>Tahap 2 (Distribusi):</strong> Selesaikan dilema logistik desa. Pilihlah jalur <strong>Asosiatif</strong> (Koperasi / Gotong Royong) untuk hasil aman.
              </li>
              <li>
                <strong>Tahap 3 (Konsumsi):</strong> Atur harga jual wajar dan saksikan respon daya beli masyarakat pasar desa.
              </li>
              <li>
                <strong>Refleksi & Kuis:</strong> Analisis laporan usaha dan buktikan pemahaman materi IPS Kelas 7.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer shadow-md shadow-emerald-200 transition-colors"
          >
            Mengerti & Mulai Simulasi
          </button>
        </div>
      </div>
    </div>
  );
};
