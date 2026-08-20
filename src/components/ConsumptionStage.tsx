import React, { useState, useMemo } from 'react';
import { ShoppingBag, ArrowRight, TrendingUp, AlertCircle, CheckCircle2, Star, ThumbsUp, ThumbsDown, MessageSquareQuote, DollarSign } from 'lucide-react';
import { ProductionChoice } from '../types/game';
import { sound } from '../utils/audio';

interface ConsumptionStageProps {
  currentMoney: number;
  socialScore: number;
  deliveredUnits: number;
  productionData: {
    choice: ProductionChoice;
    totalCost: number;
    unitCost: number;
  };
  distributionData: {
    choiceType: 'associative' | 'dissociative';
    cost: number;
    title: string;
  };
  onCompleteConsumption: (
    sellingPrice: number,
    unitsSold: number,
    totalRevenue: number,
    netProfit: number,
    consumerFeedback: string
  ) => void;
}

export const ConsumptionStage: React.FC<ConsumptionStageProps> = ({
  currentMoney,
  socialScore,
  deliveredUnits,
  productionData,
  distributionData,
  onCompleteConsumption
}) => {
  const suggestedPrice = productionData.choice.product.suggestedPrice;
  const unitCost = productionData.unitCost;

  const [sellingPrice, setSellingPrice] = useState<number>(suggestedPrice);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Determine market absorption based on price and social score
  const marketAnalysis = useMemo(() => {
    // Price factor (ratio against suggested)
    const priceRatio = sellingPrice / suggestedPrice;
    let priceDemandModifier = 1.0;
    if (priceRatio <= 0.9) priceDemandModifier = 1.1; // cheap
    else if (priceRatio <= 1.05) priceDemandModifier = 1.0; // fair
    else if (priceRatio <= 1.25) priceDemandModifier = 0.85; // slightly expensive
    else priceDemandModifier = 0.6; // too expensive

    // Social factor: high social score brings loyal customers and boycott immunity
    let socialDemandModifier = 1.0;
    let feedbackText = '';
    let isBoycotted = false;

    if (socialScore >= 75) {
      socialDemandModifier = 1.05;
      feedbackText = 'Warga desa dan wisatawan sangat antusias! Hubungan harmonis tokomu dengan Koperasi membuat produkmu sangat direkomendasikan dari mulut ke mulut.';
    } else if (socialScore >= 50) {
      socialDemandModifier = 0.95;
      feedbackText = 'Penjualan stabil. Konsumen membeli karena butuh dan harga yang kamu tawarkan dinilai cukup masuk akal.';
    } else if (socialScore >= 30) {
      socialDemandModifier = 0.7;
      feedbackText = 'Beberapa warga enggan membeli karena mendengar desas-desus perselisihan distribusi tokomu. Penjualan agak tersendat.';
    } else {
      isBoycotted = true;
      socialDemandModifier = 0.45;
      feedbackText = 'Terjadi aksi boikot oleh sebagian pedagang dan warga desa akibat persaingan curang/konflik kemarin! Banyak stok tidak laku di lapak.';
    }

    const finalAbsorptionRate = Math.min(1.0, Math.max(0.2, priceDemandModifier * socialDemandModifier));
    const unitsSold = Math.min(deliveredUnits, Math.max(1, Math.round(deliveredUnits * finalAbsorptionRate)));
    const totalRevenue = unitsSold * sellingPrice;
    const totalExpense = productionData.totalCost + distributionData.cost;
    const netProfit = totalRevenue - totalExpense;

    return {
      unitsSold,
      unsoldUnits: deliveredUnits - unitsSold,
      totalRevenue,
      totalExpense,
      netProfit,
      feedbackText,
      isBoycotted,
      finalAbsorptionRate
    };
  }, [sellingPrice, suggestedPrice, socialScore, deliveredUnits, productionData, distributionData]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCalculateSales = () => {
    sound.playClick();
    if (marketAnalysis.netProfit > 0) {
      sound.playCoins();
      sound.playSuccess();
    } else {
      sound.playSocialDrop();
    }
    setHasCalculated(true);
  };

  const handleNext = () => {
    sound.playClick();
    onCompleteConsumption(
      sellingPrice,
      marketAnalysis.unitsSold,
      marketAnalysis.totalRevenue,
      marketAnalysis.netProfit,
      marketAnalysis.feedbackText
    );
  };

  return (
    <div id="consumption-stage-container" className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Left Bento Column (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Bento Tile */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-emerald-100/90 relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Pasar & Konsumen
                </span>
              </div>
              <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                Tahap 3: Konsumsi
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Penjualan ke Konsumen Pasar
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mt-1">
                Barang siap jual: <strong>{deliveredUnits} unit {productionData.choice.product.name}</strong>. Atur harga jual dan amati respon daya serap konsumen desa!
              </p>
            </div>
          </div>

          {/* Pricing Bento Card */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  Pengaturan Harga Jual per Unit
                </h3>
                <p className="text-xs text-slate-500">
                  Biaya Modal (HPP): {formatRupiah(unitCost)} | Rekomendasi Wajar: {formatRupiah(suggestedPrice)}
                </p>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                {formatRupiah(sellingPrice)}
              </div>
            </div>

            {/* Quick Price Bento Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSellingPrice(Math.round(suggestedPrice * 0.85));
                  setHasCalculated(false);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  sellingPrice === Math.round(suggestedPrice * 0.85)
                    ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Diskon Promo (-15%)
                </span>
                <div className="font-black text-slate-900 text-sm mt-2">{formatRupiah(Math.round(suggestedPrice * 0.85))}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Daya tarik tinggi bagi warga</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSellingPrice(suggestedPrice);
                  setHasCalculated(false);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  sellingPrice === suggestedPrice
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Harga Wajar Pasar
                </span>
                <div className="font-black text-slate-900 text-sm mt-2">{formatRupiah(suggestedPrice)}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Seimbang & disukai pembeli</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSellingPrice(Math.round(suggestedPrice * 1.2));
                  setHasCalculated(false);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  sellingPrice === Math.round(suggestedPrice * 1.2)
                    ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Harga Premium (+20%)
                </span>
                <div className="font-black text-slate-900 text-sm mt-2">{formatRupiah(Math.round(suggestedPrice * 1.2))}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Margin besar, risiko sisa</p>
              </button>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <input
                id="selling-price-slider"
                type="range"
                min={Math.round(unitCost * 0.9)}
                max={Math.round(suggestedPrice * 1.8)}
                step={500}
                value={sellingPrice}
                onChange={(e) => {
                  setSellingPrice(parseInt(e.target.value, 10));
                  setHasCalculated(false);
                }}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>Murah ({formatRupiah(Math.round(unitCost * 0.9))})</span>
                <span>Wajar ({formatRupiah(suggestedPrice)})</span>
                <span>Tinggi ({formatRupiah(Math.round(suggestedPrice * 1.8))})</span>
              </div>
            </div>

            {/* Action Trigger button */}
            {!hasCalculated && (
              <div className="pt-2 flex justify-center">
                <button
                  id="btn-trigger-sales-calc"
                  type="button"
                  onClick={handleCalculateSales}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm sm:text-base shadow-md transition-all cursor-pointer"
                >
                  <DollarSign className="w-5 h-5" />
                  Buka Lapak & Transaksikan Produk
                </button>
              </div>
            )}
          </div>

          {/* Realtime Sales Results & Feedback Tile */}
          {hasCalculated && (
            <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <MessageSquareQuote className="w-5 h-5 text-teal-600" />
                  Respon Konsumen & Pasar:
                </h3>
                {marketAnalysis.isBoycotted ? (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                    ⚠️ Dampak Disosiatif
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✨ Dukungan Sosial Positif
                  </span>
                )}
              </div>

              <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                marketAnalysis.isBoycotted
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                {marketAnalysis.feedbackText}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Pasokan Pasar</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">{deliveredUnits} unit</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-emerald-700 text-[10px] uppercase font-bold tracking-wider">Terjual</div>
                  <div className="text-lg font-black text-emerald-800 mt-0.5">{marketAnalysis.unitsSold} unit</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Sisa Stok</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">{marketAnalysis.unsoldUnits} unit</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Daya Serap</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {Math.round(marketAnalysis.finalAbsorptionRate * 100)}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Bento Column (Col 4): Financial Statement & IPS Concept */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dark Bento Financial Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-4 bg-emerald-400 rounded-full"></span>
                Laba / Rugi Siklus Ini
              </h3>
              <span className="text-xs font-bold text-emerald-400">Total Omzet</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-medium">Penerimaan Penjualan (Omzet):</span>
                <div className="text-xl font-black text-emerald-400">
                  +{formatRupiah(marketAnalysis.totalRevenue)}
                </div>
                <p className="text-[11px] text-slate-400">
                  {marketAnalysis.unitsSold} unit terjual × {formatRupiah(sellingPrice)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-medium">Total Beban Operasional:</span>
                <div className="text-lg font-black text-rose-300">
                  -{formatRupiah(marketAnalysis.totalExpense)}
                </div>
                <p className="text-[11px] text-slate-400">
                  Produksi: {formatRupiah(productionData.totalCost)} + Distribusi: {formatRupiah(distributionData.cost)}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1 ${
                marketAnalysis.netProfit >= 0
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              }`}>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {marketAnalysis.netProfit >= 0 ? 'Laba Bersih (+)' : 'Rugi Bersih (-)'}:
                </span>
                <div className={`text-2xl font-black ${marketAnalysis.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {marketAnalysis.netProfit >= 0 ? `+${formatRupiah(marketAnalysis.netProfit)}` : formatRupiah(marketAnalysis.netProfit)}
                </div>
                <p className="text-[11px] text-slate-300">
                  Estimasi Kas Baru: <strong>{formatRupiah(currentMoney + marketAnalysis.netProfit)}</strong>
                </p>
              </div>
            </div>

            {hasCalculated && (
              <button
                id="btn-complete-consumption-cycle"
                onClick={handleNext}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lihat Laporan Siklus & Refleksi</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Emerald Bento Card for Concept Notes */}
          <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-md shadow-emerald-200/50 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-4 bg-amber-300 rounded-full"></span>
              Konsep IPS: Perilaku Konsumen
            </h4>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
              Konsumen dipengaruhi oleh <strong>Tingkat Pendapatan</strong>, <strong>Harga Barang</strong>, serta <strong>Faktor Sosial & Kepercayaan</strong>. Hubungan sosial yang harmonis menciptakan loyalitas pembeli yang setia!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
