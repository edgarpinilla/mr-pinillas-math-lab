import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  ChevronRight,
  Sliders,
  Scale,
  Layers,
  MinusCircle,
  Divide,
  Hash,
  Briefcase,
  ArrowLeftRight,
  Percent,
  Check,
  RefreshCw,
  Info,
  Lock,
  Unlock,
  SkipForward,
  AlertCircle,
} from 'lucide-react';
import {
  PRACTICE_TABS,
  PracticeTabInfo,
  EquationsLabQuestion,
  normalizeAndCheckInequality,
  checkNumericEquivalence,
} from '../data/equationsPracticeData';
import { getTabRoundQuestions } from '../data/equationsSampleQuestions';
import { NumberLineGrapher } from './visualizers/NumberLineGrapher';

// Lucide icon helper mapping
const getTabIcon = (iconName: string) => {
  switch (iconName) {
    case 'Scale':
      return <Scale className="w-4 h-4" />;
    case 'Layers':
      return <Layers className="w-4 h-4" />;
    case 'MinusCircle':
      return <MinusCircle className="w-4 h-4" />;
    case 'Divide':
      return <Divide className="w-4 h-4" />;
    case 'Hash':
      return <Hash className="w-4 h-4" />;
    case 'Briefcase':
      return <Briefcase className="w-4 h-4" />;
    case 'Sliders':
      return <Sliders className="w-4 h-4" />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight className="w-4 h-4" />;
    case 'Percent':
      return <Percent className="w-4 h-4" />;
    case 'Award':
    default:
      return <Award className="w-4 h-4" />;
  }
};

export const EquationsPracticeLab: React.FC = () => {
  // Current active practice tab (1 to 10)
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // Round tracking: Round 1 (10 questions) or Round 2 (10 questions)
  const [currentRound, setCurrentRound] = useState<1 | 2>(1);

  // Tab completion status map: tabId -> { round1Complete: boolean, round2Complete: boolean }
  const [tabProgress, setTabProgress] = useState<
    Record<string, { round1Complete: boolean; round2Complete: boolean }>
  >({});

  // Question index within current 10-question round (0 to 9)
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // Score and gamification stats
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  // Question State
  const questionsQueue = useMemo(() => {
    return getTabRoundQuestions(activeTabId, currentRound);
  }, [activeTabId, currentRound]);

  const currentQuestion: EquationsLabQuestion | undefined = questionsQueue[questionIndex];

  // Per-question tracking within active tab and round:
  // questionAttempts: questionId -> total incorrect attempts
  const [questionAttempts, setQuestionAttempts] = useState<Record<string, number>>({});
  // needsReviewQuestions: Set of questionIds marked as "Needs Review"
  const [needsReviewQuestions, setNeedsReviewQuestions] = useState<Record<string, boolean>>({});
  // masteredQuestions: Set of questionIds answered correctly
  const [masteredQuestions, setMasteredQuestions] = useState<Record<string, boolean>>({});

  // Answer Inputs
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<string[]>([]);
  const [numericInputVal, setNumericInputVal] = useState<string>('');
  const [inequalityInputVal, setInequalityInputVal] = useState<string>('');
  const [inequalitySymbol, setInequalitySymbol] = useState<'<' | '<=' | '>' | '>='>('>');
  const [inequalityNumberVal, setInequalityNumberVal] = useState<string>('');

  // Interactive Number Line State (for number-line-select)
  const [interactiveClosed, setInteractiveClosed] = useState<boolean>(false);
  const [interactiveDirection, setInteractiveDirection] = useState<'left' | 'right'>('right');

  // Interaction feedback states
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [incorrectFeedback, setIncorrectFeedback] = useState<string | null>(null);

  // Round Completion Celebration Modal state
  const [showRoundModal, setShowRoundModal] = useState<boolean>(false);

  // Reset current question inputs whenever question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setSelectedMultiOptions([]);
    setNumericInputVal('');
    setInequalityInputVal('');
    setInequalitySymbol('>');
    setInequalityNumberVal('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setIncorrectFeedback(null);

    if (currentQuestion?.numberLineData) {
      setInteractiveClosed(currentQuestion.numberLineData.isClosed);
      setInteractiveDirection(currentQuestion.numberLineData.direction);
    }
  }, [questionIndex, activeTabId, currentRound, currentQuestion]);

  // Current question attempt count
  const currentQAttempts = currentQuestion ? questionAttempts[currentQuestion.id] || 0 : 0;
  const isCurrentQNeedsReview = currentQuestion ? !!needsReviewQuestions[currentQuestion.id] : false;
  const isCurrentQMastered = currentQuestion ? !!masteredQuestions[currentQuestion.id] : false;

  // Calculate completed (mastered) questions in current round
  const currentRoundMasteredCount = useMemo(() => {
    return questionsQueue.filter((q) => masteredQuestions[q.id]).length;
  }, [questionsQueue, masteredQuestions]);

  // Calculate count of currently unresolved "Needs Review" questions in this round
  const unresolvedNeedsReviewCount = useMemo(() => {
    return questionsQueue.filter((q) => needsReviewQuestions[q.id] && !masteredQuestions[q.id]).length;
  }, [questionsQueue, needsReviewQuestions, masteredQuestions]);

  // Tab switching handler
  const handleSelectTab = (tabId: string) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    setCurrentRound(1);
    setQuestionIndex(0);
    setShowRoundModal(false);
  };

  // Helper to find the next question index to visit:
  // First searches remaining unmastered questions starting after currentIndex (looping around).
  const findNextUnmasteredIndex = (fromIndex: number): number | null => {
    const total = questionsQueue.length;
    for (let offset = 1; offset <= total; offset++) {
      const idx = (fromIndex + offset) % total;
      const q = questionsQueue[idx];
      if (q && !masteredQuestions[q.id]) {
        return idx;
      }
    }
    return null;
  };

  // Skip for Now Handler
  const handleSkipQuestion = () => {
    if (!currentQuestion || isCorrect) return;

    // 1. Mark this question as Needs Review
    setNeedsReviewQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));

    // Reset streak on skip
    setStreak(0);

    // 2. Find next unresolved question in the round
    const nextIdx = findNextUnmasteredIndex(questionIndex);
    if (nextIdx !== null && nextIdx !== questionIndex) {
      setQuestionIndex(nextIdx);
    }
  };

  // Submit Answer Logic (Strict adherence to Required Retry Logic)
  const handleSubmitAnswer = () => {
    if (!currentQuestion || isCorrect) return;

    let correct = false;

    // Check by Question Type
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'number-line-select': {
        if (!selectedOptionId) return;
        correct = selectedOptionId === currentQuestion.correctAnswer;
        break;
      }

      case 'multi-select': {
        if (selectedMultiOptions.length === 0) return;
        const expected = (currentQuestion.correctAnswer as string[]) || [];
        const matchesCount = selectedMultiOptions.length === expected.length;
        const allIncluded = selectedMultiOptions.every((id) => expected.includes(id));
        correct = matchesCount && allIncluded;
        break;
      }

      case 'numeric-input': {
        if (!numericInputVal.trim()) return;
        if (currentQuestion.numericAnswer !== undefined) {
          correct = checkNumericEquivalence(
            numericInputVal,
            currentQuestion.numericAnswer,
            currentQuestion.tolerance || 0.001
          );
        }
        break;
      }

      case 'inequality-entry': {
        if (currentQuestion.inequalityConfig) {
          const expected = currentQuestion.inequalityConfig;

          // Check direct text entry if filled (e.g. 'x > 5' or '5 < x')
          if (inequalityInputVal.trim()) {
            correct = normalizeAndCheckInequality(
              inequalityInputVal,
              expected.variable,
              expected.symbol,
              expected.value
            );
          } else if (inequalityNumberVal.trim()) {
            // Check structured symbol + number selector
            const num = parseFloat(inequalityNumberVal);
            if (!isNaN(num)) {
              correct =
                inequalitySymbol === expected.symbol &&
                Math.abs(num - expected.value) < 0.001;
            }
          }
        }
        break;
      }
    }

    if (correct) {
      // CORRECT ANSWER:
      // - Display "Correct Response"
      // - Mark the question mastered
      // - Remove Needs Review status
      // - Increase progress and award +10 XP
      setIsCorrect(true);
      setIsSubmitted(true);
      setIncorrectFeedback(null);
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setCompletedCount((prev) => prev + 1);

      setMasteredQuestions((prev) => ({
        ...prev,
        [currentQuestion.id]: true,
      }));

      // Remove from needsReviewQuestions if previously skipped
      setNeedsReviewQuestions((prev) => {
        const copy = { ...prev };
        delete copy[currentQuestion.id];
        return copy;
      });
    } else {
      // INCORRECT ANSWER:
      // - Show feedback explaining the mistake
      // - DO NOT reveal the correct answer
      // - Increment question-specific attempt count
      // - Allow retry
      // - DO NOT increase progress or award XP
      setIsCorrect(false);
      setIsSubmitted(false);
      setStreak(0);
      setQuestionAttempts((prev) => ({
        ...prev,
        [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1,
      }));
      setIncorrectFeedback(
        currentQuestion.misconceptionFeedback ||
          'Check your steps carefully and try again. Use inverse operations to isolate the variable!'
      );
    }
  };

  // Next Question / Complete Round Handler
  const handleNextQuestion = () => {
    if (!isCorrect) return;

    // Check if there are other unmastered questions in the round
    const nextIdx = findNextUnmasteredIndex(questionIndex);

    if (nextIdx !== null) {
      // Move to the next unmastered question (or skipped Needs Review question)
      setQuestionIndex(nextIdx);
    } else {
      // All 10 questions in this round are mastered!
      setTabProgress((prev) => ({
        ...prev,
        [activeTabId]: {
          round1Complete: currentRound === 1 ? true : prev[activeTabId]?.round1Complete ?? true,
          round2Complete: currentRound === 2 ? true : prev[activeTabId]?.round2Complete ?? false,
        },
      }));
      setShowRoundModal(true);
    }
  };

  // Advance to Round 2
  const handleStartRound2 = () => {
    setCurrentRound(2);
    setQuestionIndex(0);
    setShowRoundModal(false);
  };

  // Reset Practice (Section 11)
  const handleResetPractice = () => {
    if (
      window.confirm(
        'Are you sure you want to reset your Equations & Inequalities practice session? This will clear all scores, attempts, Needs Review states, and return to Round 1.'
      )
    ) {
      setScore(0);
      setStreak(0);
      setCompletedCount(0);
      setCurrentRound(1);
      setQuestionIndex(0);
      setTabProgress({});
      setQuestionAttempts({});
      setNeedsReviewQuestions({});
      setMasteredQuestions({});
      setShowRoundModal(false);
      setSelectedOptionId(null);
      setSelectedMultiOptions([]);
      setNumericInputVal('');
      setInequalityInputVal('');
      setInequalityNumberVal('');
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowHint(false);
      setIncorrectFeedback(null);
    }
  };

  const currentTab = PRACTICE_TABS.find((t) => t.id === activeTabId) || PRACTICE_TABS[0];
  const isRound1Done = tabProgress[activeTabId]?.round1Complete;
  const isRound2Done = tabProgress[activeTabId]?.round2Complete;

  // Effective completed count in current round including if current question is just solved
  const effectiveRoundCompleted = currentRoundMasteredCount;
  const roundProgressPercent = Math.round((effectiveRoundCompleted / 10) * 100);

  return (
    <div
      id="equations-practice-lab-container"
      className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6 font-sans antialiased text-slate-900"
    >
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                Dallas ISD Practice Lab
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black tracking-wider">
                TEKS 8.8.A · 8.8.B · 8.8.C
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
                Client-Side Engine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Equations & Inequalities Practice Lab
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
              Master one-variable linear equations and inequalities with variables on both sides, rational numbers, negative symbol flips, and real-world models.
            </p>
          </div>

          {/* Top Stats Cards */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center min-w-[85px] shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                {streak}
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Streak
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center min-w-[95px] shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-blue-400 flex items-center justify-center gap-1">
                <Award className="w-5 h-5 text-blue-400" />
                {score}
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Lab XP
              </div>
            </div>

            <button
              id="reset-practice-btn"
              onClick={handleResetPractice}
              title="Reset Practice Session"
              className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-colors flex flex-col items-center justify-center cursor-pointer shadow-sm group"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="text-[10px] font-bold mt-1 uppercase">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10 PRACTICE TABS NAVIGATION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Practice Domains (10 Tabs)
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Grade 8 Standards
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Scroll or click to switch skills
          </span>
        </div>

        {/* Scrollable Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
          {PRACTICE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            const isDoneR1 = tabProgress[tab.id]?.round1Complete;
            const isDoneR2 = tabProgress[tab.id]?.round2Complete;

            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {getTabIcon(tab.iconName)}
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-bold">{tab.shortTitle}</span>
                  <span
                    className={`text-[10px] ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    Tab {tab.number} · {tab.teks}
                  </span>
                </div>

                {/* Completion Check Badge */}
                {isDoneR2 ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </span>
                ) : isDoneR1 ? (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    1
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* TWO-ROUND TRACKER & PROGRESS BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Round Selector Pill */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                id="round-1-btn"
                onClick={() => {
                  setCurrentRound(1);
                  setQuestionIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentRound === 1
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Round 1 {isRound1Done && '✓'}
              </button>

              <button
                id="round-2-btn"
                disabled={!isRound1Done}
                onClick={() => {
                  if (isRound1Done) {
                    setCurrentRound(2);
                    setQuestionIndex(0);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  !isRound1Done
                    ? 'text-slate-400 cursor-not-allowed opacity-60'
                    : currentRound === 2
                    ? 'bg-blue-600 text-white shadow-sm cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 cursor-pointer'
                }`}
              >
                {!isRound1Done ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                Round 2 {isRound2Done && '✓'}
              </button>
            </div>

            <div className="hidden sm:block text-xs font-bold text-slate-500">
              {currentRound === 1 ? 'Foundational Skills (10 Qs)' : 'Advanced Mastery (10 Qs)'}
            </div>
          </div>

          {/* Progress Indicators & Needs Review Badge */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            {unresolvedNeedsReviewCount > 0 && (
              <span
                id="unresolved-review-badge"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                {unresolvedNeedsReviewCount} Needs Review
              </span>
            )}

            <span className="text-slate-500">
              Question{' '}
              <span className="text-blue-700 font-black text-sm">{questionIndex + 1}</span> of 10
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Mastered:{' '}
              <span className="text-emerald-700 font-black">
                {effectiveRoundCompleted} / 10
              </span>{' '}
              ({roundProgressPercent}%)
            </span>
          </div>
        </div>

        {/* 10-Segment Question Stepper Bar with Status Styling */}
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
          {questionsQueue.map((q, idx) => {
            const isCurrent = idx === questionIndex;
            const isMastered = !!masteredQuestions[q.id];
            const isNeedsReview = !!needsReviewQuestions[q.id] && !isMastered;

            return (
              <div
                key={q.id}
                onClick={() => {
                  setQuestionIndex(idx);
                }}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  isMastered
                    ? 'bg-emerald-500'
                    : isNeedsReview
                    ? 'bg-amber-400'
                    : isCurrent
                    ? isCorrect
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-blue-600 ring-2 ring-blue-300'
                    : 'bg-slate-200'
                }`}
                title={`Question ${idx + 1}${
                  isMastered ? ' (Mastered)' : isNeedsReview ? ' (Needs Review)' : ''
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* ACTIVE QUESTION INTERFACE */}
      {currentQuestion ? (
        <div
          id="active-question-card"
          className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-8 space-y-6"
        >
          {/* Question Header & TEKS Tag & Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200/80">
                {currentTab.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                Round {currentRound} · Question {questionIndex + 1}
              </span>

              {/* Status Badge: Mastered or Needs Review */}
              {isCurrentQMastered ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Mastered
                </span>
              ) : isCurrentQNeedsReview ? (
                <span
                  id="needs-review-indicator"
                  className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-extrabold flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Needs Review
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentQuestion.teks}
              </span>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  showHint
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>
          </div>

          {/* Scaffolded Hint Card (guides thinking WITHOUT giving away answer) */}
          {showHint && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                <Info className="w-4 h-4 text-amber-600" />
                Scaffolded Math Hint
              </div>
              <p className="text-sm font-medium leading-relaxed">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Question Prompt */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.prompt}
            </h2>

            {/* Display Equation Banner if present */}
            {currentQuestion.equationDisplay && (
              <div className="py-4 px-6 rounded-2xl bg-slate-900 text-white font-mono text-xl sm:text-2xl md:text-3xl font-black text-center tracking-wide shadow-inner border border-slate-800 overflow-x-auto">
                <span className="text-sky-300">{currentQuestion.equationDisplay}</span>
              </div>
            )}
          </div>

          {/* Number Line Visualizer (if Question includes Number Line Data) */}
          {currentQuestion.numberLineData && (
            <div className="pt-2">
              <NumberLineGrapher
                min={currentQuestion.numberLineData.min}
                max={currentQuestion.numberLineData.max}
                boundary={currentQuestion.numberLineData.boundary}
                isClosed={currentQuestion.numberLineData.isClosed}
                direction={currentQuestion.numberLineData.direction}
                label={currentQuestion.numberLineData.label}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* INTERACTION CONTROLS BY QUESTION TYPE */}
          {/* ================================================================= */}

          {/* TYPE 1: Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    id={`option-${option.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedOptionId(option.id);
                      setIncorrectFeedback(null);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {option.id.toUpperCase()}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 2: Number Line Selection */}
          {currentQuestion.type === 'number-line-select' && currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    id={`numline-opt-${option.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedOptionId(option.id);
                      setIncorrectFeedback(null);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-xs ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {option.id.toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 3: Multi-Select */}
          {currentQuestion.type === 'multi-select' && currentQuestion.options && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select all choices that apply:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                  const isChecked = selectedMultiOptions.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedMultiOptions((prev) =>
                          isChecked ? prev.filter((id) => id !== option.id) : [...prev, option.id]
                        );
                        setIncorrectFeedback(null);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-800">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 4: Numeric Input */}
          {currentQuestion.type === 'numeric-input' && (
            <div className="max-w-md space-y-3 pt-2">
              <label htmlFor="numeric-answer-input" className="block text-xs font-black uppercase tracking-wider text-slate-600">
                Your Numerical Answer:
              </label>
              <div className="relative">
                <input
                  id="numeric-answer-input"
                  type="text"
                  value={numericInputVal}
                  onChange={(e) => {
                    setNumericInputVal(e.target.value);
                    setIncorrectFeedback(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmitAnswer();
                  }}
                  placeholder="e.g. 4, -6, or 12.5"
                  className="w-full px-5 py-3.5 text-lg font-mono font-bold rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* TYPE 5: Inequality Entry */}
          {currentQuestion.type === 'inequality-entry' && (
            <div className="space-y-4 max-w-lg pt-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                Select Inequality Symbol & Enter Value:
              </label>

              {/* Symbol Buttons Selector */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { sym: '<', label: 'Less than (<)' },
                  { sym: '<=', label: 'Less than or equal (≤)' },
                  { sym: '>', label: 'Greater than (>)' },
                  { sym: '>=', label: 'Greater than or equal (≥)' },
                ].map(({ sym, label }) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => {
                      setInequalitySymbol(sym as any);
                      setIncorrectFeedback(null);
                    }}
                    className={`py-3 px-2 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      inequalitySymbol === sym
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xl font-black">
                      {sym === '<=' ? '≤' : sym === '>=' ? '≥' : sym}
                    </span>
                    <span className="text-[10px] font-bold opacity-80 mt-0.5">{label}</span>
                  </button>
                ))}
              </div>

              {/* Variable + Symbol + Value Input Row */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xl font-black text-blue-700 px-2">
                  {currentQuestion.inequalityConfig?.variable || 'x'}
                </span>
                <span className="font-mono text-xl font-black text-slate-800">
                  {inequalitySymbol === '<=' ? '≤' : inequalitySymbol === '>=' ? '≥' : inequalitySymbol}
                </span>
                <input
                  id="inequality-number-input"
                  type="text"
                  value={inequalityNumberVal}
                  onChange={(e) => {
                    setInequalityNumberVal(e.target.value);
                    setIncorrectFeedback(null);
                  }}
                  placeholder="Enter number (e.g. 5 or -4)"
                  className="flex-1 px-4 py-2.5 font-mono font-bold text-base rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white text-slate-900"
                />
              </div>

              {/* Optional direct text input supporting equivalent answers like 5 < x */}
              <div className="pt-1 text-xs text-slate-500">
                <span className="font-semibold">Or enter algebraic inequality: </span>
                <input
                  type="text"
                  value={inequalityInputVal}
                  onChange={(e) => {
                    setInequalityInputVal(e.target.value);
                    setIncorrectFeedback(null);
                  }}
                  placeholder="e.g. x > 5 or 5 < x"
                  className="mt-1 w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none bg-white"
                />
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* FEEDBACK & ACTION BUTTONS */}
          {/* ================================================================= */}

          {/* INCORRECT RESPONSE FEEDBACK (REQUIRED RETRY LOGIC: DO NOT REVEAL ANSWER) */}
          {incorrectFeedback && !isCorrect && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700">
                <XCircle className="w-4 h-4 text-rose-600" />
                Incorrect · Let’s Rethink the Steps
              </div>
              <p className="text-sm font-medium leading-relaxed">{incorrectFeedback}</p>
              <div className="text-xs text-rose-700 font-bold pt-1">
                ➔ You can adjust your answer above and click "Submit Answer" to retry!
              </div>
            </div>
          )}

          {/* CORRECT RESPONSE CELEBRATION (CRITICAL REQUIREMENT) */}
          {isCorrect && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Correct Response! +10 XP
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-extrabold">
                  Mastered
                </span>
              </div>
              <p className="text-sm font-medium text-emerald-900 leading-relaxed">
                {currentQuestion.correctExplanation}
              </p>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium">
              {isCorrect ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Ready for next challenge!
                </span>
              ) : currentQAttempts > 0 ? (
                <span className="text-amber-700 font-bold">
                  Attempt {currentQAttempts} · Keep trying!
                </span>
              ) : (
                'Select or enter your answer, then click Submit.'
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Skip for Now button: Appears ONLY after 3rd incorrect attempt on this question */}
              {!isCorrect && currentQAttempts >= 3 && (
                <button
                  id="skip-for-now-btn"
                  type="button"
                  onClick={handleSkipQuestion}
                  className="px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Move to next question and revisit this question later"
                >
                  <SkipForward className="w-4 h-4 text-amber-700" />
                  Skip for Now
                </button>
              )}

              {!isCorrect ? (
                <button
                  id="submit-answer-btn"
                  type="button"
                  onClick={handleSubmitAnswer}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm shadow-md shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Answer
                </button>
              ) : (
                <button
                  id="next-question-btn"
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  {effectiveRoundCompleted < 10 ? 'Next Question' : 'Complete Round'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">No questions loaded for this tab.</div>
      )}

      {/* ROUND COMPLETE CELEBRATION MODAL */}
      {showRoundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                Round {currentRound} Complete!
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Outstanding Mathematical Work!
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                You successfully solved all 10 questions in{' '}
                <span className="font-bold text-slate-900">{currentTab.title}</span> (Round{' '}
                {currentRound}).
              </p>
            </div>

            {/* Score Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-blue-600">{score}</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Total XP</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600">10 / 10</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Questions Solved</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {currentRound === 1 ? (
                <button
                  id="unlock-round-2-btn"
                  onClick={handleStartRound2}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock & Start Round 2
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowRoundModal(false);
                    // Cycle to next tab if available
                    const curIndex = PRACTICE_TABS.findIndex((t) => t.id === activeTabId);
                    if (curIndex < PRACTICE_TABS.length - 1) {
                      handleSelectTab(PRACTICE_TABS[curIndex + 1].id);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  Next Practice Domain
                </button>
              )}

              <button
                onClick={() => setShowRoundModal(false)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                Review Tab Questions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
