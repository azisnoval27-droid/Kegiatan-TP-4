import React, { useState } from 'react';
import { GameStage, ProductionChoice, CycleRecord } from './types/game';
import { INITIAL_MONEY, INITIAL_SOCIAL_SCORE, CYCLE_DILEMMAS } from './data/gameData';
import { Header } from './components/Header';
import { ScoreDashboard } from './components/ScoreDashboard';
import { IntroScreen } from './components/IntroScreen';
import { ProductionStage } from './components/ProductionStage';
import { DistributionStage } from './components/DistributionStage';
import { ConsumptionStage } from './components/ConsumptionStage';
import { CycleSummaryModal } from './components/CycleSummaryModal';
import { FinalReflectionScreen } from './components/FinalReflectionScreen';
import { QuizSection } from './components/QuizSection';
import { GlossaryModal } from './components/GlossaryModal';
import { InstructionsModal } from './components/InstructionsModal';
import { sound } from './utils/audio';

export default function App() {
  const TOTAL_CYCLES = 3;

  // Global Game State
  const [currentStage, setCurrentStage] = useState<GameStage>('intro');
  const [previousStageBeforeQuiz, setPreviousStageBeforeQuiz] = useState<GameStage>('intro');
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [money, setMoney] = useState<number>(INITIAL_MONEY);
  const [socialScore, setSocialScore] = useState<number>(INITIAL_SOCIAL_SCORE);
  const [cycleRecords, setCycleRecords] = useState<CycleRecord[]>([]);

  // Sound and Modal States
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isRestartConfirmOpen, setIsRestartConfirmOpen] = useState<boolean>(false);

  // Per-Cycle In-Flight Progress Data
  const [productionData, setProductionData] = useState<{
    choice: ProductionChoice;
    totalCost: number;
    unitCost: number;
  } | null>(null);

  const [distributionData, setDistributionData] = useState<{
    choiceType: 'associative' | 'dissociative';
    cost: number;
    socialChange: number;
    successRate: number;
    deliveredUnits: number;
    title: string;
  } | null>(null);

  const [activeCycleRecord, setActiveCycleRecord] = useState<CycleRecord | null>(null);

  // Active Dilemma for current cycle
  const currentDilemma = CYCLE_DILEMMAS[(currentCycle - 1) % CYCLE_DILEMMAS.length];

  // Handler: Start game from intro
  const handleStartGame = () => {
    setCurrentStage('production');
  };

  // Handler: Complete Production Stage
  const handleCompleteProduction = (choice: ProductionChoice, totalCost: number, socialDelta: number) => {
    const unitCost = Math.round(totalCost / choice.quantity);
    setProductionData({
      choice,
      totalCost,
      unitCost
    });

    // Deduct production cost and update social score
    setMoney((prev) => prev - totalCost);
    setSocialScore((prev) => Math.min(100, Math.max(0, prev + socialDelta)));
    setCurrentStage('distribution');
  };

  // Handler: Complete Distribution Stage
  const handleCompleteDistribution = (
    choiceType: 'associative' | 'dissociative',
    distributionCost: number,
    socialChange: number,
    successRate: number,
    deliveredUnits: number,
    dilemmaTitle: string
  ) => {
    setDistributionData({
      choiceType,
      cost: distributionCost,
      socialChange,
      successRate,
      deliveredUnits,
      title: dilemmaTitle
    });

    // Deduct distribution cost and update social score
    setMoney((prev) => prev - distributionCost);
    setSocialScore((prev) => Math.min(100, Math.max(0, prev + socialChange)));
    setCurrentStage('consumption');
  };

  // Handler: Complete Consumption Stage
  const handleCompleteConsumption = (
    sellingPrice: number,
    unitsSold: number,
    totalRevenue: number,
    netProfit: number,
    consumerFeedback: string
  ) => {
    if (!productionData || !distributionData) return;

    const newMoney = money + totalRevenue;
    setMoney(newMoney);

    const record: CycleRecord = {
      cycleNumber: currentCycle,
      production: {
        productName: productionData.choice.product.name,
        quantity: productionData.choice.quantity,
        totalCost: productionData.totalCost,
        unitCost: productionData.unitCost,
        laborChoiceLabel: productionData.choice.laborType
      },
      distribution: {
        choiceType: distributionData.choiceType,
        title: distributionData.title,
        socialChange: distributionData.socialChange,
        cost: distributionData.cost,
        successRate: distributionData.successRate,
        deliveredUnits: distributionData.deliveredUnits
      },
      consumption: {
        sellingPrice,
        unitsSold,
        totalRevenue,
        grossProfit: totalRevenue - productionData.totalCost,
        netProfit,
        marketFeedback: consumerFeedback
      },
      endingMoney: newMoney,
      endingSocialScore: socialScore
    };

    setActiveCycleRecord(record);
    setCycleRecords((prev) => [...prev, record]);
    setCurrentStage('cycle_summary');
  };

  // Handler: Next cycle
  const handleNextCycle = () => {
    setProductionData(null);
    setDistributionData(null);
    setActiveCycleRecord(null);
    setCurrentCycle((prev) => prev + 1);
    setCurrentStage('production');
  };

  // Handler: Go to final reflection
  const handleGoToFinalReflection = () => {
    setCurrentStage('final_reflection');
  };

  // Handler: Restart simulation
  const handleRestartGame = () => {
    setCurrentCycle(1);
    setMoney(INITIAL_MONEY);
    setSocialScore(INITIAL_SOCIAL_SCORE);
    setProductionData(null);
    setDistributionData(null);
    setActiveCycleRecord(null);
    setCycleRecords([]);
    setCurrentStage('intro');
  };

  // Handler: Open Quiz
  const handleOpenQuiz = () => {
    setPreviousStageBeforeQuiz(currentStage);
    setCurrentStage('quiz');
  };

  // Handler: Back from Quiz
  const handleBackFromQuiz = () => {
    if (previousStageBeforeQuiz === 'quiz') {
      setCurrentStage('intro');
    } else {
      setCurrentStage(previousStageBeforeQuiz);
    }
  };

  const handleToggleSound = () => {
    const isNow = sound.toggleSound();
    setSoundEnabled(isNow);
    if (isNow) {
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-emerald-200">
      {/* Top Application Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onRestartGame={() => setIsRestartConfirmOpen(true)}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Persistent Score Dashboard (Visible during active gameplay) */}
      {currentStage !== 'intro' && currentStage !== 'quiz' && (
        <ScoreDashboard
          money={money}
          socialScore={socialScore}
          currentCycle={currentCycle}
          totalCycles={TOTAL_CYCLES}
          currentStage={currentStage}
        />
      )}

      {/* Main Interactive Stage Container */}
      <main className="flex-1 w-full pb-16">
        {currentStage === 'intro' && (
          <IntroScreen
            onStartGame={handleStartGame}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onOpenQuiz={handleOpenQuiz}
          />
        )}

        {currentStage === 'production' && (
          <ProductionStage
            currentMoney={money}
            onCompleteProduction={handleCompleteProduction}
          />
        )}

        {currentStage === 'distribution' && productionData && (
          <DistributionStage
            currentMoney={money}
            socialScore={socialScore}
            dilemma={currentDilemma}
            productionData={productionData}
            onCompleteDistribution={handleCompleteDistribution}
          />
        )}

        {currentStage === 'consumption' && productionData && distributionData && (
          <ConsumptionStage
            currentMoney={money}
            socialScore={socialScore}
            deliveredUnits={distributionData.deliveredUnits}
            productionData={productionData}
            distributionData={distributionData}
            onCompleteConsumption={handleCompleteConsumption}
          />
        )}

        {currentStage === 'final_reflection' && (
          <FinalReflectionScreen
            finalMoney={money}
            finalSocialScore={socialScore}
            cycleRecords={cycleRecords}
            onPlayAgain={handleRestartGame}
            onOpenQuiz={handleOpenQuiz}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}

        {currentStage === 'quiz' && (
          <QuizSection
            onBackToSimulation={handleBackFromQuiz}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}
      </main>

      {/* Cycle Summary Modal (Between cycles) */}
      {currentStage === 'cycle_summary' && activeCycleRecord && (
        <CycleSummaryModal
          record={activeCycleRecord}
          currentCycle={currentCycle}
          totalCycles={TOTAL_CYCLES}
          onNextCycle={handleNextCycle}
          onGoToFinalReflection={handleGoToFinalReflection}
        />
      )}

      {/* Educational Material & Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Game Guidance & Instructions Modal */}
      <InstructionsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Restart Game Confirmation Bento Modal */}
      {isRestartConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-100 text-center space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="text-xl">🔄</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">
                Mulai Ulang Simulasi?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Semua progres siklus usaha, modal kas, dan skor hubungan sosial akan diatur ulang ke kondisi awal.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRestartConfirmOpen(false)}
                className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRestartConfirmOpen(false);
                  handleRestartGame();
                }}
                className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
              >
                Ya, Mulai Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subdued Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>EcoSocial Sim &copy; 2026 Media Pembelajaran IPS SMP Kelas 7</span>
          <span className="text-emerald-700 font-medium">Materi: Kegiatan Ekonomi & Interaksi Sosial Desa</span>
        </div>
      </footer>
    </div>
  );
}
