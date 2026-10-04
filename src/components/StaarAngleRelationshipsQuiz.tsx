import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Calculator,
} from 'lucide-react';
import {
  STAAR_ANGLE_RELATIONSHIPS_QUESTIONS,
  Unit7StaarQuestion,
} from '../data/staar/staarQuestionsAngleRelationships';
import { Unit7SelfCheckDiagram } from './visualizers/Unit7SelfCheckDiagram';

interface StaarAngleRelationshipsQuizProps {
  topicTitle?: string;
  onSwitchToSelfCheck?: () => void;
}

function parseStaarNumericInput(raw: string): number | null {
  const cleaned = raw.replace(/°/g, '').replace(/\s+/g, '');
  if (!cleaned) return null;
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : null;
}

const ROUND_LABELS: Record<1 | 2 | 3, { title: string; badge: string; desc: string }> = {
  1: {
    title: 'Round 1 · Foundational STAAR',
    badge: 'Questions 1–12',
    desc: '2023–2026 Digital STAAR style: identify angle relationships, apply direct angle rules, and solve introductory algebraic equations.',
  },
  2: {
    title: 'Round 2 · Intermediate STAAR',
    badge: 'Questions 13–24',
    desc: '2023–2026 Digital STAAR style: construct algebraic equations, solve multi-step angle expressions, and interpret AA similarity.',
  },
  3: {
    title: 'Round 3 · Advanced STAAR',
    badge: 'Questions 25–36',
    desc: '2023–2026 Digital STAAR style: synthesize multi-step variable equations, error-analysis reasoning, and combined geometric arguments.',
  },
};

export const StaarAngleRelationshipsQuiz: React.FC<StaarAngleRelationshipsQuizProps> = ({
  onSwitchToSelfCheck,
}) => {
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
  const [currentIndexInRound, setCurrentIndexInRound] = useState<number>(0); // 0..11

  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [attemptCounter, setAttemptCounter] = useState<number>(0);

  // Completed question IDs across the 36-question cycle
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const [showRoundCompleteSummary, setShowRoundCompleteSummary] = useState<boolean>(false);
  const [showFullCycleComplete, setShowFullCycleComplete] = useState<boolean>(false);

  const roundQuestions: Unit7StaarQuestion[] = STAAR_ANGLE_RELATIONSHIPS_QUESTIONS.filter(
    (q) => q.round === currentRound
  );
  const currentQuestion: Unit7StaarQuestion =
    roundQuestions[currentIndexInRound] || roundQuestions[0];

  const roundCompletedCount = roundQuestions.filter((q) => completedIds.includes(q.id)).length;
  const totalCompletedCount = completedIds.length;
  const isNumericItem =
    currentQuestion.itemFormat === 'numeric-input' && currentQuestion.numericValue !== undefined;

  const resetQuestionInputs = () => {
    setSelectedOptionIdx(null);
    setNumericInput('');
    setFeedbackState('idle');
  };

  const handleCheckAnswer = () => {
    setAttemptCounter((c) => c + 1);

    if (isNumericItem) {
      const parsed = parseStaarNumericInput(numericInput);
      const isCorrectNumeric =
        parsed !== null && parsed === currentQuestion.numericValue;
      const isCorrectChoice =
        selectedOptionIdx !== null && selectedOptionIdx === currentQuestion.correctIndex;

      if (parsed === null && selectedOptionIdx === null) {
        setFeedbackState('hint');
        return;
      }

      if (isCorrectNumeric || isCorrectChoice) {
        setFeedbackState('correct');
        if (!completedIds.includes(currentQuestion.id)) {
          setCompletedIds((prev) => [...prev, currentQuestion.id]);
        }
      } else {
        setFeedbackState('hint');
      }
      return;
    }

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
  };

  const handleNextQuestion = () => {
    if (currentIndexInRound < roundQuestions.length - 1) {
      setCurrentIndexInRound((idx) => idx + 1);
      resetQuestionInputs();
    } else {
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
      id="unit7-staar-practice-container"
      className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-fadeIn"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-violet-800 to-slate-900 text-white p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-black uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-amber-300" />
                <span>Unit 7 STAAR Practice · TEKS 8.8D</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-black">
                2023–2026 Digital STAAR Priority
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-black">
                {totalCompletedCount} / 36 Completed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              STAAR Practice: Angle Relationships in Parallel Lines & Triangles
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium">
              3 Progressive Rounds of 12 Original Questions (36 Total) · Modeled on 2023–2026 Texas
              Digital STAAR Rigor & Problem Structures
            </p>
          </div>

          {/* Round Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/35 p-1.5 rounded-2xl border border-white/15 shrink-0">
            {([1, 2, 3] as const).map((r) => {
              const rQuestions = STAAR_ANGLE_RELATIONSHIPS_QUESTIONS.filter((q) => q.round === r);
              const rDone = rQuestions.every((q) => completedIds.includes(q.id));
              const isCurrent = currentRound === r && !showFullCycleComplete;
              const isUnlocked =
                r === 1 ||
                STAAR_ANGLE_RELATIONSHIPS_QUESTIONS.filter((q) => q.round === r - 1).every((q) =>
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
                      ? 'text-indigo-100 hover:bg-white/10 cursor-pointer'
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
          /* FULL 36-QUESTION CYCLE COMPLETION SCREEN */
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">
                All 3 Rounds Complete · 36 / 36 STAAR Questions Mastered
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                Unit 7 STAAR Practice Completed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Congratulations! You have mastered all 36 TEKS 8.8D STAAR Practice items across
                Foundational (Round 1), Intermediate (Round 2), and Advanced (Round 3) levels.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFullCycle}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New 36-Question Cycle</span>
              </button>
              {onSwitchToSelfCheck && (
                <button
                  type="button"
                  onClick={onSwitchToSelfCheck}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Return to Self-Check
                </button>
              )}
            </div>
          </div>
        ) : showRoundCompleteSummary ? (
          /* ROUND 1 OR ROUND 2 COMPLETION SCREEN */
          <div className="p-6 sm:p-8 rounded-2xl bg-indigo-50 border-2 border-indigo-300 text-center space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-200 text-indigo-900">
                {ROUND_LABELS[currentRound].title} Complete (12 / 12 Questions)
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                Round {currentRound} of 3 Completed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You have accurately solved all 12 questions in {ROUND_LABELS[currentRound].title}.
                Ready to advance to{' '}
                <strong>{ROUND_LABELS[(currentRound + 1) as 1 | 2 | 3].title}</strong>?
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartNextRound}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Begin Round {currentRound + 1} of 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE STAAR QUESTION VIEW */
          <div className="space-y-6">
            {/* Round Info & 12-Question Progress Dots */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-black">
                  Round {currentRound} of 3
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black">
                  Question {currentIndexInRound + 1} of 12
                </span>
                <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold">
                  {currentQuestion.lesson} · {currentQuestion.strand}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-cyan-50 text-cyan-900 border border-cyan-200 text-[11px] font-black">
                  {currentQuestion.staarEraBadge}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                {roundQuestions.map((q, idx) => {
                  const isDone = completedIds.includes(q.id);
                  const isActive = idx === currentIndexInRound;
                  return (
                    <div
                      key={q.id}
                      className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center border transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white border-indigo-700 scale-105 shadow-2xs'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
                <span className="text-xs font-bold text-slate-500 ml-1.5">
                  ({roundCompletedCount}/12)
                </span>
              </div>
            </div>

            {/* Question Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Diagram */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 text-indigo-700 font-black uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" /> STAAR Geometry Figure
                    </span>
                    <span className="text-slate-500">
                      STAAR Item #{currentQuestion.questionNumber} of 36
                    </span>
                  </div>
                  <Unit7SelfCheckDiagram diagram={currentQuestion.diagram} />
                </div>
              </div>

              {/* Right Column: Prompt, Choices, Check & Retry/Feedback */}
              <div className="lg:col-span-6 space-y-4">
                {/* Prompt Box */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    <span>
                      {ROUND_LABELS[currentRound].title} · {currentQuestion.teks}
                    </span>
                    <span>Q{currentQuestion.questionNumber}</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                    {currentQuestion.prompt}
                  </p>
                </div>

                {/* Answer Area (Supports both 2023–2026 Digital STAAR Equation/Numeric Entry & Multiple Choice) */}
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-2xs">
                  {isNumericItem && (
                    <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-900">
                        <Calculator className="w-3.5 h-3.5 text-cyan-700" />
                        <span>2023–2026 Digital STAAR Numeric Entry (or Select Choice Below):</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={numericInput}
                          onChange={(e) => {
                            setNumericInput(e.target.value);
                            if (feedbackState === 'hint') setFeedbackState('idle');
                          }}
                          placeholder="Type numeric value..."
                          className="w-40 px-3.5 py-2 rounded-xl border-2 border-cyan-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900 bg-white"
                        />
                        {currentQuestion.unitLabel && (
                          <span className="text-sm font-black text-slate-700">
                            {currentQuestion.unitLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Select the Correct Answer Choice:
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
                                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                                : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-white text-indigo-700'
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

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      id="unit7-staar-verify-btn"
                      onClick={handleCheckAnswer}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Check Answer</span>
                    </button>

                    {feedbackState === 'correct' && (
                      <button
                        type="button"
                        id="unit7-staar-next-btn"
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer animate-fadeIn"
                      >
                        <span>
                          {currentIndexInRound < roundQuestions.length - 1
                            ? 'Next Question'
                            : currentRound < 3
                            ? `Finish Round ${currentRound}`
                            : 'Complete STAAR Practice'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Conceptual Hint Banner on Incorrect Attempt (Does NOT reveal correct answer) */}
                {feedbackState === 'hint' && (
                  <div
                    key={`staar-hint-${attemptCounter}`}
                    className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 animate-fadeIn"
                  >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Conceptual Hint — Modify Your Selection & Try Again</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {selectedOptionIdx === null && (!isNumericItem || !numericInput.trim())
                        ? 'Please enter a numeric response or select an answer choice (A, B, C, or D) first, then click Check Answer.'
                        : currentQuestion.hint}
                    </p>
                  </div>
                )}

                {/* Correct Response Banner */}
                {feedbackState === 'correct' && (
                  <div
                    key={`staar-correct-${attemptCounter}`}
                    className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2.5 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Correct Response</span>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                        Choice {String.fromCharCode(65 + currentQuestion.correctIndex)} Verified ✔
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
