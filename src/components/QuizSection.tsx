import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen, User, Check, HelpCircle, ShieldCheck } from 'lucide-react';
import { IPS_QUIZ } from '../data/gameData';
import { sound } from '../utils/audio';

interface QuizSectionProps {
  onBackToSimulation: () => void;
  onOpenGlossary: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onBackToSimulation,
  onOpenGlossary
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');

  const currentQ = IPS_QUIZ[currentQuestionIdx];
  const totalQuestions = IPS_QUIZ.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playSocialDrop();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    const updated = [...userAnswers, selectedOption!];
    setUserAnswers(updated);

    if (currentQuestionIdx + 1 < totalQuestions) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      sound.playSuccess();
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  // Calculate final score
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === IPS_QUIZ[idx].correctIndex ? acc + 1 : acc;
  }, 0);
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div id="quiz-section-container" className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {!isQuizCompleted ? (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-100/90 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Kuis Kilat Evaluasi Pemahaman IPS SMP
                </h3>
                <p className="text-xs text-slate-500">
                  Kegiatan Ekonomi & Interaksi Sosial (Kurikulum Merdeka)
                </p>
              </div>
            </div>

            <div className="text-xs font-black px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Soal {currentQuestionIdx + 1} dari {totalQuestions}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <div className="inline-block text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Topik: {currentQ.concept}
            </div>

            <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optStyle = 'border-slate-100 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                  } else {
                    optStyle = 'border-slate-100 bg-slate-50/30 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswerSubmitted && (
              <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="font-black text-xs uppercase tracking-wider mb-1">
                  {selectedOption === currentQ.correctIndex ? '✅ Jawaban Benar!' : '❌ Jawaban Kurang Tepat.'}
                </div>
                <div className="text-slate-700">{currentQ.explanation}</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={onBackToSimulation}
              className="text-xs font-black text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Kembali ke Simulasi
            </button>

            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  selectedOption !== null
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>{currentQuestionIdx + 1 < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil Akhir Kuis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Result & Certificate Bento Card */
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-emerald-100/90 shadow-xs text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-800">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Evaluasi Pembelajaran Selesai
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2 tracking-tight">
              Hasil Kuis Pemahaman IPS
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Kamu telah menyelesaikan evaluasi Kegiatan Ekonomi & Interaksi Sosial Desa.
            </p>
          </div>

          {/* Big Score Bento Box */}
          <div className="max-w-xs mx-auto p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Skor Perolehan Akhir
            </div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-700">
              {finalScore} <span className="text-lg text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="text-xs font-bold text-emerald-800 pt-1">
              {correctCount} dari {totalQuestions} Soal Dijawab Benar
            </div>
          </div>

          {/* Student Certificate Generator Bento Tile */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-left space-y-4 max-w-lg mx-auto">
            <div className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Sertifikat Digital Pemahaman IPS
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-600 font-bold">
                Ketik Nama Siswa untuk Sertifikat:
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso (Kelas 7A)"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {studentName.trim() && (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1.5 text-xs text-amber-950">
                <div className="font-black text-sm text-slate-900">
                  📜 Sertifikat Apresiasi Wirausahawan Muda IPS
                </div>
                <p className="leading-relaxed">
                  Diberikan kepada: <strong>{studentName}</strong> atas keberhasilan menguasai konsep 
                  <strong> Produksi, Distribusi, Konsumsi & Interaksi Sosial Asosiatif</strong> dengan nilai {finalScore}/100.
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-black text-xs border border-emerald-300 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Materi IPS</span>
            </button>

            <button
              onClick={onBackToSimulation}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
            >
              <span>Kembali ke Permainan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
