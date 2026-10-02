import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import {
  CALCULATOR_BASICS_CHALLENGE_QUESTIONS,
} from '../../data/calculatorLabData';
import { CalculatorChallengeQuestion } from '../../data/calculatorLabTypes';

interface CalculatorChallengeViewProps {
  onBackToModules: () => void;
  onChallengeCompleted?: () => void;
}

export const CalculatorChallengeView: React.FC<CalculatorChallengeViewProps> = ({
  onBackToModules,
  onChallengeCompleted,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [studentInput, setStudentInput] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message?: string;
  }>({ status: 'idle' });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  const currentQ: CalculatorChallengeQuestion =
    CALCULATOR_BASICS_CHALLENGE_QUESTIONS[currentIdx];

  const totalQuestions = CALCULATOR_BASICS_CHALLENGE_QUESTIONS.length;
  const completedCount = Object.keys(completedQuestions).length;
  const isAllDone = completedCount === totalQuestions;

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = studentInput.trim().toLowerCase().replace(/\s+/g, '');
    if (!cleanInput) return;

    setAttempts((prev) => prev + 1);

    const isMatch = currentQ.acceptedAnswers.some(
      (ans) => ans.trim().toLowerCase().replace(/\s+/g, '') === cleanInput
    );

    if (isMatch) {
      setFeedback({
        status: 'correct',
        message: `Correct! ${currentQ.displayFormattedAnswer} is the exact solution.`,
      });
      const nextCompleted = {
        ...completedQuestions,
        [currentQ.id]: true,
      };
      setCompletedQuestions(nextCompleted);

      if (Object.keys(nextCompleted).length === totalQuestions && onChallengeCompleted) {
        onChallengeCompleted();
      }
    } else {
      setFeedback({
        status: 'incorrect',
        message:
          'Not quite yet. Check your keypad entries and signs on your physical TI-Nspire CX, then try again! (Unlimited retries)',
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setStudentInput('');
      setFeedback({ status: 'idle' });
      setShowHint(false);
      setAttempts(0);
    }
  };

  const handleJumpTo = (idx: number) => {
    setCurrentIdx(idx);
    setStudentInput('');
    setFeedback({ status: 'idle' });
    setShowHint(false);
    setAttempts(0);
  };

  const handleResetChallenge = () => {
    setCurrentIdx(0);
    setStudentInput('');
    setFeedback({ status: 'idle' });
    setShowHint(false);
    setAttempts(0);
    setCompletedQuestions({});
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-purple-500/30 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Comprehensive Level 1 Assessment</span>
          </div>
          <button
            onClick={onBackToModules}
            className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            ← Back to All Lessons
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Calculator Basics Challenge
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-2xl font-medium">
            This challenge mixes skills from all 15 lessons. You are not told which operations or keys are needed—you must inspect each mathematical problem and operate your physical TI-Nspire CX independently.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-purple-800/60 text-xs">
          <div className="font-extrabold text-purple-200">
            Progress: {completedCount} of {totalQuestions} challenges verified
          </div>
          <div className="flex items-center gap-1.5">
            {CALCULATOR_BASICS_CHALLENGE_QUESTIONS.map((q, idx) => {
              const isDone = completedQuestions[q.id];
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpTo(idx)}
                  className={`w-8 h-8 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {isDone ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Trophy Card */}
      {isAllDone && (
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/70 shadow-2xl text-center space-y-4 text-emerald-100">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300">
            <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">
              Level 1 TI-Nspire CX Master Certification!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-lg mx-auto font-medium">
              Congratulations! You have independently demonstrated mastery of signed numbers, division, exponents, roots, parentheses, and fractional conversions on the physical classroom TI-Nspire CX.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetChallenge}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Challenge
            </button>
            <button
              onClick={onBackToModules}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md transition-all cursor-pointer"
            >
              Return to Calculator Lab
            </button>
          </div>
        </div>
      )}

      {/* Active Question Workspace */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
              #{currentQ.questionNumber}
            </span>
            <div>
              <span className="text-xs font-black text-purple-700 uppercase tracking-wider">
                {currentQ.category}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Independent Evaluation
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Question {currentIdx + 1} of {totalQuestions}
          </span>
        </div>

        {/* The Expression Prompt */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {currentQ.prompt}
          </p>
          <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 tracking-wider">
            {currentQ.expression}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Type this into your physical handheld. Decide whether you need [(-)], [-], [^], [x²], [( )], or [ctrl][÷].
          </p>
        </div>

        {/* Student Submission Form */}
        <form onSubmit={handleSubmitAnswer} className="space-y-4 max-w-md mx-auto">
          <div>
            <label
              htmlFor="challenge-input"
              className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Your Calculator Screen Result:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="challenge-input"
                type="text"
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                placeholder="e.g. 5 or -6 or 0.375"
                className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                disabled={feedback.status === 'correct'}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!studentInput.trim() || feedback.status === 'correct'}
                className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                  feedback.status === 'correct'
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg active:scale-98'
                }`}
              >
                {feedback.status === 'correct' ? 'Verified ✓' : 'Verify'}
              </button>
            </div>
          </div>
        </form>

        {/* Feedback Alert */}
        {feedback.status === 'correct' && (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-emerald-900 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{feedback.message}</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              {currentQ.explanation}
            </p>
            <div className="text-[11px] text-emerald-700 pt-1 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tip: {currentQ.calculatorTip}</span>
            </div>
          </div>
        )}

        {feedback.status === 'incorrect' && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 text-rose-900 space-y-2 animate-shake">
            <div className="flex items-center gap-2 font-black text-sm text-rose-800">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Incorrect Result</span>
            </div>
            <p className="text-xs text-rose-700 leading-relaxed font-medium">
              {feedback.message}
            </p>
            {!showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs font-bold text-rose-700 underline hover:text-rose-900 cursor-pointer pt-1"
              >
                Need a calculator hint?
              </button>
            )}
          </div>
        )}

        {/* Hint Box (Optional, upon student request) */}
        {showHint && feedback.status !== 'correct' && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-amber-900 text-xs space-y-1">
            <div className="font-black flex items-center gap-1.5 text-amber-800">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Calculator Hint:
            </div>
            <p className="font-medium text-amber-800/90">{currentQ.hint}</p>
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            onClick={() => currentIdx > 0 && handleJumpTo(currentIdx - 1)}
            disabled={currentIdx === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            ← Previous
          </button>

          {currentIdx < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              disabled={feedback.status !== 'correct' && !completedQuestions[currentQ.id]}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                feedback.status === 'correct' || completedQuestions[currentQ.id]
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onBackToModules}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md cursor-pointer transition-all"
            >
              Complete Challenge View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
