import React, { useState } from 'react';
import { Package, Utensils, Sparkles, Palette, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { Product, ProductionChoice } from '../types/game';
import { PRODUCTS } from '../data/gameData';
import { sound } from '../utils/audio';

interface ProductionStageProps {
  currentMoney: number;
  onCompleteProduction: (choice: ProductionChoice, totalCost: number, socialDelta: number) => void;
}

export const ProductionStage: React.FC<ProductionStageProps> = ({
  currentMoney,
  onCompleteProduction
}) => {
  // State for selected product
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  
  // State for labor choice
  const [laborType, setLaborType] = useState<'local_gotong_royong' | 'standard_hired' | 'cheap_overwork'>('local_gotong_royong');
  
  // State for quality
  const [qualityLevel, setQualityLevel] = useState<'standar' | 'premium_organik'>('premium_organik');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Labor costs and social impacts
  const laborOptions = {
    local_gotong_royong: {
      label: 'Gotong Royong & Upah Wajar',
      badge: 'Asosiatif & Etis',
      costPerUnit: 5000,
      socialImpact: 5,
      desc: 'Memberdayakan tetangga desa dengan upah layak dan jam kerja manusiawi (+5 Poin Sosial).'
    },
    standard_hired: {
      label: 'Upah Standar Buruh',
      badge: 'Netral',
      costPerUnit: 3500,
      socialImpact: 0,
      desc: 'Sistem kerja borongan standar tanpa insentif sosial tambahan (0 Poin Sosial).'
    },
    cheap_overwork: {
      label: 'Eksploitasi Lembur Minim',
      badge: 'Disosiatif',
      costPerUnit: 1500,
      socialImpact: -10,
      desc: 'Menekan biaya serendah mungkin dengan mempekerjakan buruh lembur tanpa istirahat (-10 Poin Sosial).'
    }
  };

  const qualitySurcharge = qualityLevel === 'premium_organik' ? 2000 : 0;

  // Single unit production cost
  const unitProductionCost = selectedProduct.baseCost + laborOptions[laborType].costPerUnit + qualitySurcharge;

  // Max affordable quantity
  const maxAffordable = Math.max(1, Math.floor(currentMoney / unitProductionCost));
  const suggestedMax = Math.min(selectedProduct.maxBatch, maxAffordable);

  // Quantity state
  const [quantity, setQuantity] = useState<number>(() => {
    return Math.min(30, Math.max(selectedProduct.minBatch, Math.floor(suggestedMax / 2)));
  });

  // Ensure quantity is clamped when product/labor changes
  const effectiveQuantity = Math.min(quantity, maxAffordable);
  const totalCost = effectiveQuantity * unitProductionCost;
  const remainingMoney = currentMoney - totalCost;

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="w-5 h-5 text-emerald-600" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-600" />;
      default: return <Package className="w-5 h-5 text-emerald-600" />;
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCost > currentMoney) {
      setErrorMessage('Modal kas tidak mencukupi untuk jumlah produksi ini! Kurangi unit atau pilih jenis upah lain.');
      return;
    }
    setErrorMessage(null);

    sound.playClick();
    sound.playCoins();

    const choice: ProductionChoice = {
      product: selectedProduct,
      quantity: effectiveQuantity,
      laborType,
      qualityLevel
    };

    const socialDelta = laborOptions[laborType].socialImpact;
    onCompleteProduction(choice, totalCost, socialDelta);
  };

  return (
    <div id="production-stage-container" className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Left Bento Column (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Bento Tile */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-emerald-100/90 relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Kegiatan Ekonomi Desa
                </span>
              </div>
              <span className="bg-amber-500 text-slate-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                Tahap 1: Produksi
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Rencanakan Produksi Komoditas Desa
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mt-1">
                Pilihlah salah satu potensi desa, atur tenaga kerja warga, dan tentukan jumlah unit yang akan diproduksi.
              </p>
            </div>
          </div>

          {/* Bento Step 1: Choose Product */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">A</span>
                Pilih Jenis Komoditas Potensi Desa:
              </h3>
              <span className="text-xs font-bold text-slate-400">Pilih 1 Produk</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PRODUCTS.map((prod) => {
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    id={`product-card-${prod.id}`}
                    onClick={() => {
                      sound.playClick();
                      setSelectedProduct(prod);
                    }}
                    className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-100 bg-slate-50/40 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-xs">
                          {getProductIcon(prod.iconName)}
                        </div>
                        {isSelected && (
                          <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Terpilih
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{prod.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Bahan Baku:</span>
                      <span className="font-black text-slate-900">{formatRupiah(prod.baseCost)}/unit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bento Step 2: Labor & Social Responsibility */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">B</span>
                Faktor Tenaga Kerja & Etika Sosial:
              </h3>
              <span className="text-xs font-bold text-slate-400">Pengaruh Sosial</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {(Object.keys(laborOptions) as Array<keyof typeof laborOptions>).map((key) => {
                const opt = laborOptions[key];
                const isSelected = laborType === key;
                return (
                  <div
                    key={key}
                    id={`labor-opt-${key}`}
                    onClick={() => {
                      sound.playClick();
                      setLaborType(key);
                    }}
                    className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? key === 'cheap_overwork'
                          ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20 shadow-md'
                          : 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-md'
                        : 'border-slate-100 bg-slate-50/40 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          opt.socialImpact > 0 ? 'bg-emerald-100 text-emerald-800' : opt.socialImpact < 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {opt.badge}
                        </span>
                        {opt.socialImpact !== 0 && (
                          <span className={`text-xs font-black ${opt.socialImpact > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {opt.socialImpact > 0 ? `+${opt.socialImpact}` : opt.socialImpact} Poin
                          </span>
                        )}
                      </div>

                      <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                        {opt.label}
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/60 flex justify-between text-xs">
                      <span className="text-slate-500">Upah Kerja:</span>
                      <span className="font-black text-slate-900">{formatRupiah(opt.costPerUnit)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bento Step 3: Quantity Slider */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">C</span>
                Jumlah Unit Produksi:
              </h3>
              <div className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
                Batas Modal: {maxAffordable} unit
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  id="quantity-range-slider"
                  type="range"
                  min={1}
                  max={Math.max(1, maxAffordable)}
                  value={effectiveQuantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="shrink-0 flex items-center gap-1.5">
                  <input
                    id="quantity-number-input"
                    type="number"
                    min={1}
                    max={maxAffordable}
                    value={effectiveQuantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setQuantity(Math.max(1, Math.min(val, maxAffordable)));
                      }
                    }}
                    className="w-20 px-3 py-2 border border-slate-300 rounded-xl text-center font-black text-slate-800 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-600">Unit</span>
                </div>
              </div>

              {/* Quick preset batch pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-bold text-slate-400 self-center">Pilihan Cepat:</span>
                {[10, 25, 50, 75, maxAffordable].map((q) => {
                  if (q > maxAffordable && q !== maxAffordable) return null;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setQuantity(q);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        effectiveQuantity === q
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {q === maxAffordable ? `Maksimal (${q})` : `${q} unit`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Side Bento Column (Col 4): Live Financials & IPS Knowledge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dark Bento Box for Cost & Budget */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-4 bg-emerald-400 rounded-full"></span>
                Kalkulasi HPP & Biaya
              </h3>
              <span className="text-xs font-bold text-emerald-400">Kas: {formatRupiah(currentMoney)}</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-medium">HPP per Unit (Harga Pokok):</span>
                <div className="text-xl font-black text-white">{formatRupiah(unitProductionCost)}</div>
                <p className="text-[11px] text-slate-400">
                  Bahan: {formatRupiah(selectedProduct.baseCost)} + Upah: {formatRupiah(laborOptions[laborType].costPerUnit)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-medium">Total Modal Produksi:</span>
                <div className="text-xl font-black text-amber-400">{formatRupiah(totalCost)}</div>
                <p className="text-[11px] text-slate-400">
                  {effectiveQuantity} unit × {formatRupiah(unitProductionCost)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-medium">Sisa Modal Operasional:</span>
                <div className="text-xl font-black text-emerald-400">{formatRupiah(remainingMoney)}</div>
                <p className="text-[11px] text-emerald-300/80 font-medium">
                  ✓ Tersedia untuk biaya distribusi ke pasar
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold">
                ⚠️ {errorMessage}
              </div>
            )}

            <button
              id="btn-confirm-production"
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Selesai & Lanjut Distribusi</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Emerald Bento Card for Concept Notes */}
          <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-md shadow-emerald-200/50 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-4 bg-amber-300 rounded-full"></span>
              Konsep IPS: Faktor Produksi
            </h4>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
              Produksi membutuhkan 4 faktor: <strong>Sumber Daya Alam</strong> (bahan baku bambu/singkong/rempah), 
              <strong> Tenaga Kerja</strong> (warga desa), <strong>Modal</strong> (kas), dan <strong>Kewirausahaan</strong> (strategi etis).
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
