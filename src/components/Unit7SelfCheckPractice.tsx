import React, { useState } from 'react';
import {
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  UNIT_7_SELF_CHECK_QUESTIONS,
  Unit7SelfCheckQuestion,
} from '../data/unit7SelfCheckQuestions';
import { Unit7SelfCheckDiagram } from './visualizers/Unit7SelfCheckDiagram';

export const Unit7SelfCheckPractice: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
  const [currentIndexInRound, setCurrentIndexInRound] = useState<number>(0); // 0..5

  // Student response state for active question
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [numericValue, setNumericValue] = useState<string>('');

  // Feedback state: 'idle' | 'hint' | 'correct'
  const [feedbackState, setFeedbackState] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [attemptCounter, setAttemptCounter] = useState<number>(0);

  // Completed question IDs across the 18-question cycle (no duplicates)
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Round summary screen state
  const [showRoundCompleteSummary, setShowRoundCompleteSummary] = useState<boolean>(false);
  const [showFullCycleComplete, setShowFullCycleComplete] = useState<boolean>(false);

  const roundQuestions: Unit7SelfCheckQuestion[] = UNIT_7_SELF_CHECK_QUESTIONS.filter(
    (q) => q.round === currentRound
  );
  const currentQuestion: Unit7SelfCheckQuestion =
    roundQuestions[currentIndexInRound] || roundQuestions[0];

  const roundCompletedCount = roundQuestions.filter((q) => completedIds.includes(q.id)).length;
  const totalCompletedCount = completedIds.length;

  const resetQuestionInputs = () => {
    setSelectedOptionIdx(null);
    setNumericValue('');
    setFeedbackState('idle');
  };

  const handleCheckAnswer = () => {
    setAttemptCounter((c) => c + 1);

    if (currentQuestion.type === 'multiple-choice') {
      if (selectedOptionIdx === null) {
        setFeedbackState('hint');
        return;
      }
      const isCorrect = selectedOptionIdx === currentQuestion.correctIndex;
      if (isCorrect) {
        setFeedbackState('correct');
        if (!completedIds.includes(currentQuestion.id)) {
          setCompletedIds((prev) => [...prev, currentQuestion.id]);
        }
      } else {
        setFeedbackState('hint');
      }
      return;
    }

    // numeric-input
    const cleaned = numericValue
      .replace(/°/g, '')
      .replace(/^[a-zA-Z∠\s=]+/, '')
      .trim();
    if (cleaned === '' || Number.isNaN(Number(cleaned))) {
      setFeedbackState('hint');
      return;
    }

    const isCorrect = Number(cleaned) === Number(currentQuestion.correctAnswer);
    if (isCorrect) {
      setFeedbackState('correct');
      if (!completedIds.includes(currentQuestion.id)) {
        setCompletedIds((prev) => [...prev, currentQuestion.id]);
      }
    } else {
      setFeedbackState('hint');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndexInRound < roundQuestions.length - 1) {
      setCurrentIndexInRound((idx) => idx + 1);
      resetQuestionInputs();
    } else {
      // Completed all 6 questions of the current round
      if (currentRound < 3) {
        setShowRoundCompleteSummary(true);
      } else {
        setShowFullCycleComplete(true);
      }
    }
  };

  const handleStartNextRound = () => {
    const nextRound = (currentRound + 1) as 1 | 2 | 3;
    setCurrentRound(nextRound);
    setCurrentIndexInRound(0);
    setShowRoundCompleteSummary(false);
    resetQuestionInputs();
  };

  const handleResetFullCycle = () => {
    setCurrentRound(1);
    setCurrentIndexInRound(0);
    setCompletedIds([]);
    setShowRoundCompleteSummary(false);
    setShowFullCycleComplete(false);
    resetQuestionInputs();
  };

  return (
    <div
      id="unit7-self-check-container"
      className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-fadeIn"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Unit 7 Self-Check · TEKS 8.8D</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-black">
                {totalCompletedCount} / 18 Completed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Angle Relationships Self-Check Practice
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              3 Progressive Rounds of 6 Questions · Parallel Lines (7.1), Triangle Theorems (7.2) &
              AA Similarity (7.3)
            </p>
          </div>

          {/* Round Status Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/35 p-1.5 rounded-2xl border border-white/15 shrink-0">
            {([1, 2, 3] as const).map((r) => {
              const rQuestions = UNIT_7_SELF_CHECK_QUESTIONS.filter((q) => q.round === r);
              const rDone = rQuestions.every((q) => completedIds.includes(q.id));
              const isCurrent = currentRound === r && !showFullCycleComplete;
              const isUnlocked =
                r === 1 ||
                UNIT_7_SELF_CHECK_QUESTIONS.filter((q) => q.round === r - 1).every((q) =>
                  completedIds.includes(q.id)
                );
              return (
                <button
                  key={r}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (isUnlocked) {
                      setCurrentRound(r);
                      setCurrentIndexInRound(0);
                      setShowRoundCompleteSummary(false);
                      setShowFullCycleComplete(false);
                      resetQuestionInputs();
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-white text-indigo-950 shadow-xs cursor-pointer'
                      : rDone
                      ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 cursor-pointer'
                      : isUnlocked
                      ? 'text-blue-100 hover:bg-white/10 cursor-pointer'
                      : 'text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span>Round {r}</span>
                  {rDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-8 space-y-6">
        {showFullCycleComplete ? (
          /* FULL 18-QUESTION SELF-CHECK COMPLETE SCREEN */
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">
                All 3 Rounds Complete · 18 / 18 Questions Mastered
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                Unit 7 Self-Check Completed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You have completed all 18 Self-Check questions across Lesson 7.1 (Parallel Lines Cut
                by a Transversal), Lesson 7.2 (Triangle Sum & Exterior Angle Theorems), and Lesson
                7.3 (Angle-Angle Similarity).
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFullCycle}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New 18-Question Cycle</span>
              </button>
            </div>
          </div>
        ) : showRoundCompleteSummary ? (
          /* ROUND 1 OR ROUND 2 COMPLETION SUMMARY */
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-200 text-blue-900">
                Round {currentRound} of 3 Complete (6 / 6 Questions)
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                Great Work Completing Round {currentRound}!
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You answered all 6 questions in Round {currentRound} correctly. Ready to continue to{' '}
                <strong>Round {currentRound + 1} of 3</strong>?
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartNextRound}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Begin Round {currentRound + 1} of 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-6">
            {/* Round & Question Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black">
                  Round {currentRound} of 3
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black">
                  Question {currentIndexInRound + 1} of 6
                </span>
                <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
                  {currentQuestion.lesson} · {currentQuestion.lessonTopic}
                </span>
              </div>

              {/* 6 Question Dots for Current Round */}
              <div className="flex items-center gap-1.5">
                {roundQuestions.map((q, idx) => {
                  const isDone = completedIds.includes(q.id);
                  const isActive = idx === currentIndexInRound;
                  return (
                    <div
                      key={q.id}
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center border transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-700 scale-105 shadow-2xs'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
                <span className="text-xs font-bold text-slate-500 ml-2">
                  ({roundCompletedCount}/6 in Round {currentRound})
                </span>
              </div>
            </div>

            {/* Question Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Geometry Diagram */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 text-indigo-700 font-black uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" /> Geometric Diagram
                    </span>
                    <span className="text-slate-500">
                      Item #{currentQuestion.overallNumber} of 18
                    </span>
                  </div>
                  <Unit7SelfCheckDiagram diagram={currentQuestion.diagram} />
                </div>
              </div>

              {/* Right Column: Prompt, Answer Controls, Check & Feedback */}
              <div className="lg:col-span-6 space-y-4">
                {/* Prompt Box */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    {currentQuestion.lesson} · {currentQuestion.teks}
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                    {currentQuestion.prompt}
                  </p>
                </div>

                {/* Answer Input Area */}
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-2xs">
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
                    <div className="space-y-2.5">
                      <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Select the Best Answer:
                      </div>
                      <div className="space-y-2">
                        {currentQuestion.options.map((opt, idx) => {
                          const letter = String.fromCharCode(65 + idx);
                          const isSelected = selectedOptionIdx === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedOptionIdx(idx);
                                if (feedbackState === 'hint') setFeedbackState('idle');
                              }}
                              className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-start gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-white text-blue-700'
                                    : 'bg-white text-slate-700 border border-slate-300'
                                }`}
                              >
                                {letter}
                              </span>
                              <span className="leading-snug pt-0.5">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                        Enter Your Numerical Answer:
                      </label>
                      <div className="flex items-center gap-2 max-w-xs">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={numericValue}
                          onChange={(e) => {
                            setNumericValue(e.target.value);
                            if (feedbackState === 'hint') setFeedbackState('idle');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCheckAnswer();
                          }}
                          placeholder="Enter value"
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      id="unit7-selfcheck-verify-btn"
                      onClick={handleCheckAnswer}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Check Answer</span>
                    </button>

                    {feedbackState === 'correct' && (
                      <button
                        type="button"
                        id="unit7-selfcheck-next-btn"
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer animate-fadeIn"
                      >
                        <span>
                          {currentIndexInRound < roundQuestions.length - 1
                            ? 'Next Question'
                            : currentRound < 3
                            ? `Finish Round ${currentRound}`
                            : 'Finish Self-Check'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Conceptual Hint Banner on Incorrect Attempt (Does NOT reveal correct answer) */}
                {feedbackState === 'hint' && (
                  <div
                    key={`sc-hint-${attemptCounter}`}
                    className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 animate-fadeIn"
                  >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Conceptual Hint — Adjust Your Answer & Try Again</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {currentQuestion.type === 'multiple-choice' && selectedOptionIdx === null
                        ? 'Please select an answer choice first, then press Check Answer.'
                        : currentQuestion.type === 'numeric-input' && numericValue.trim() === ''
                        ? 'Please enter a numerical value first, then press Check Answer.'
                        : currentQuestion.hint}
                    </p>
                  </div>
                )}

                {/* Correct Response Banner */}
                {feedbackState === 'correct' && (
                  <div
                    key={`sc-correct-${attemptCounter}`}
                    className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2.5 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Correct Response</span>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                        Completed ✔
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
