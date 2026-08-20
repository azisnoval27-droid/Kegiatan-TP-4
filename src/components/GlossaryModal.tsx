import React, { useState } from 'react';
import { X, BookOpen, Layers, Users, TrendingUp, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/gameData';
import { sound } from '../utils/audio';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'Kegiatan Ekonomi' | 'Interaksi Sosial' | 'Prinsip & Motif'>('all');

  if (!isOpen) return null;

  const filteredItems = activeTab === 'all' 
    ? GLOSSARY_ITEMS 
    : GLOSSARY_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-emerald-100/90 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                Rangkuman Materi & Glosarium IPS SMP
              </h3>
              <p className="text-xs text-slate-500">
                Konsep Inti Kegiatan Ekonomi & Dinamika Interaksi Sosial Desa (Kelas 7)
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

        {/* Tab Filters Bento Pills */}
        <div className="px-6 pt-3 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {[
            { id: 'all', label: 'Semua Konsep' },
            { id: 'Kegiatan Ekonomi', label: 'Kegiatan Ekonomi' },
            { id: 'Interaksi Sosial', label: 'Interaksi Sosial' },
            { id: 'Prinsip & Motif', label: 'Prinsip & Motif Ekonomi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Bento Cards */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base">
                    {item.term}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.category}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.definition}
              </p>

              <div className="p-3 rounded-xl bg-white border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                <span className="font-bold text-emerald-700 shrink-0">Contoh Nyata:</span>
                <span>{item.example}</span>
              </div>
            </div>
          ))}

          {/* Quick Summary Table */}
          <div className="mt-4 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-2">
            <h4 className="font-black text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Inti Kunci Pembelajaran IPS:
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>
                <strong>Interaksi Asosiatif</strong> (Kerja sama, akomodasi, asimilasi) memperkuat integrasi masyarakat dan memperlancar distribusi ekonomi.
              </li>
              <li>
                <strong>Interaksi Disosiatif</strong> (Persaingan curang, kontravensi, konflik) merusak kepercayaan pasar dan menghancurkan usaha.
              </li>
              <li>
                Kegiatan ekonomi berkelanjutan membutuhkan sinergi antara <strong>keuntungan finansial</strong> dan <strong>modal sosial</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer transition-colors"
          >
            Tutup Materi
          </button>
        </div>
      </div>
    </div>
  );
};
