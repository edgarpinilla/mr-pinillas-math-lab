import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Lock,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Flag,
  Check,
  Flame,
} from 'lucide-react';
import {
  Unit6SelfCheckQuestion,
  UNIT_6_SELF_CHECK_QUESTIONS,
  getUnit6RoundQuestions,
} from '../data/unit6SelfCheckQuestions';

interface QuestionState {
  attempts: number;
  status: 'unattempted' | 'incorrect' | 'needs-review' | 'correct';
  selectedOptionId?: string;
  numericValue?: string;
  inequalitySymbol?: '<' | '<=' | '>' | '>=';
  inequalityValue?: string;
  multiSelectIds?: string[];
  feedbackMessage?: string;
}

export const Unit6SelfCheckPractice: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
  const [unlockedRounds, setUnlockedRounds] = useState<Record<1 | 2 | 3, boolean>>({
    1: true,
    2: false,
    3: false,
  });
  const [completedRounds, setCompletedRounds] = useState<Record<1 | 2 | 3, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  // Master state per question ID
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>(() => {
    const initial: Record<string, QuestionState> = {};
    UNIT_6_SELF_CHECK_QUESTIONS.forEach((q) => {
      initial[q.id] = {
        attempts: 0,
        status: 'unattempted',
        inequalitySymbol: q.inequalityConfig?.symbol || '>',
      };
    });
    return initial;
  });

  // Current question index within the 6 questions of the active round (0 to 5)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isReviewModeActive, setIsReviewModeActive] = useState<boolean>(false);

  // Round questions (exactly 6 questions)
  const roundQuestions = useMemo(() => {
    return getUnit6RoundQuestions(currentRound);
  }, [currentRound]);

  const currentQuestion: Unit6SelfCheckQuestion = roundQuestions[currentIndex];
  const currentState: QuestionState = questionStates[currentQuestion.id] || {
    attempts: 0,
    status: 'unattempted',
  };

  // Track progress within the current round
  const roundCorrectCount = useMemo(() => {
    return roundQuestions.filter((q) => questionStates[q.id]?.status === 'correct').length;
  }, [roundQuestions, questionStates]);

  const roundNeedsReviewQuestions = useMemo(() => {
    return roundQuestions.filter((q) => questionStates[q.id]?.status === 'needs-review');
  }, [roundQuestions, questionStates]);

  const isRoundFullyCompleted = roundCorrectCount === 6;

  // Handle switching rounds (only if unlocked)
  const handleSelectRound = (round: 1 | 2 | 3) => {
    if (!unlockedRounds[round]) return;
    setCurrentRound(round);
    setCurrentIndex(0);
    setShowHint(false);
    setIsReviewModeActive(false);
  };

  // Multiple Choice Option Selection
  const handleSelectOption = (optionId: string) => {
    if (currentState.status === 'correct') return;
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOptionId: optionId,
      },
    }));
  };

  // Numeric Input Change
  const handleNumericChange = (val: string) => {
    if (currentState.status === 'correct') return;
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        numericValue: val,
      },
    }));
  };

  // Inequality Entry Changes
  const handleInequalitySymbolChange = (symbol: '<' | '<=' | '>' | '>=') => {
    if (currentState.status === 'correct') return;
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        inequalitySymbol: symbol,
      },
    }));
  };

  const handleInequalityValueChange = (val: string) => {
    if (currentState.status === 'correct') return;
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        inequalityValue: val,
      },
    }));
  };

  // Multi-Select Toggle
  const handleToggleMultiSelect = (optionId: string) => {
    if (currentState.status === 'correct') return;
    const currentList = currentState.multiSelectIds || [];
    const updated = currentList.includes(optionId)
      ? currentList.filter((id) => id !== optionId)
      : [...currentList, optionId];

    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        multiSelectIds: updated,
      },
    }));
  };

  // Submission / Answer Check Handler
  const handleCheckAnswer = () => {
    if (currentState.status === 'correct') return;

    let isCorrect = false;

    if (currentQuestion.type === 'multiple-choice') {
      const selected = currentState.selectedOptionId;
      if (!selected) return;
      isCorrect = selected === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'numeric-input') {
      const input = (currentState.numericValue || '').trim().toLowerCase();
      if (!input) return;

      const num = parseFloat(input.replace(/[^0-9.-]/g, ''));
      const expected = currentQuestion.numericAnswer ?? Number(currentQuestion.correctAnswer);

      // Check numeric equivalence with tolerance
      if (!isNaN(num) && Math.abs(num - expected) < 0.001) {
        isCorrect = true;
      } else if (
        currentQuestion.acceptedEquivalents &&
        currentQuestion.acceptedEquivalents.map((e) => e.toLowerCase().trim()).includes(input)
      ) {
        isCorrect = true;
      }
    } else if (currentQuestion.type === 'inequality-entry') {
      const enteredSymbol = currentState.inequalitySymbol || '>';
      const enteredVal = parseFloat((currentState.inequalityValue || '').trim());
      const expectedSymbol = currentQuestion.inequalityConfig?.symbol || '>';
      const expectedBoundary = currentQuestion.inequalityConfig?.boundary ?? 0;

      if (!isNaN(enteredVal)) {
        if (
          enteredSymbol === expectedSymbol &&
          Math.abs(enteredVal - expectedBoundary) < 0.001
        ) {
          isCorrect = true;
        }
      }
    } else if (currentQuestion.type === 'multi-select') {
      const selected = currentState.multiSelectIds || [];
      const expected = (currentQuestion.correctAnswer as string[]) || [];

      if (selected.length === expected.length) {
        const sortedSelected = [...selected].sort();
        const sortedExpected = [...expected].sort();
        isCorrect = sortedSelected.every((val, idx) => val === sortedExpected[idx]);
      }
    }

    const newAttempts = currentState.attempts + 1;

    if (isCorrect) {
      setQuestionStates((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          attempts: newAttempts,
          status: 'correct',
          feedbackMessage: currentQuestion.correctExplanation,
        },
      }));

      // Check if this makes the round 6/6
      const otherCorrect = roundQuestions.filter(
        (q) => q.id !== currentQuestion.id && questionStates[q.id]?.status === 'correct'
      ).length;

      if (otherCorrect + 1 === 6) {
        setCompletedRounds((prev) => ({ ...prev, [currentRound]: true }));
        if (currentRound < 3) {
          const nextRound = (currentRound + 1) as 1 | 2 | 3;
          setUnlockedRounds((prev) => ({ ...prev, [nextRound]: true }));
        }
      }
    } else {
      setQuestionStates((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          attempts: newAttempts,
          status: 'incorrect',
          feedbackMessage: currentQuestion.misconceptionFeedback,
        },
      }));
    }
  };

  // Skip for Now Handler (enabled after 3rd incorrect attempt)
  const handleSkipForNow = () => {
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        status: 'needs-review',
      },
    }));

    handleAdvanceToNext();
  };

  // Advance to next question in sequence or next review question
  const handleAdvanceToNext = () => {
    setShowHint(false);

    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached the end of the round! Check if any questions need review
      const unresolved = roundQuestions.filter(
        (q) => questionStates[q.id]?.status !== 'correct'
      );

      if (unresolved.length > 0) {
        setIsReviewModeActive(true);
        const nextIdx = roundQuestions.findIndex((q) => q.id === unresolved[0].id);
        if (nextIdx !== -1) {
          setCurrentIndex(nextIdx);
        }
      }
    }
  };

  // Reset current round
  const handleResetRound = () => {
    const updated = { ...questionStates };
    roundQuestions.forEach((q) => {
      updated[q.id] = {
        attempts: 0,
        status: 'unattempted',
        inequalitySymbol: q.inequalityConfig?.symbol || '>',
      };
    });
    setQuestionStates(updated);
    setCurrentIndex(0);
    setShowHint(false);
    setIsReviewModeActive(false);
    setCompletedRounds((prev) => ({ ...prev, [currentRound]: false }));
  };

  // Reset entire Self-Check Practice
  const handleResetEntirePractice = () => {
    const updated: Record<string, QuestionState> = {};
    UNIT_6_SELF_CHECK_QUESTIONS.forEach((q) => {
      updated[q.id] = {
        attempts: 0,
        status: 'unattempted',
        inequalitySymbol: q.inequalityConfig?.symbol || '>',
      };
    });
    setQuestionStates(updated);
    setCurrentRound(1);
    setCurrentIndex(0);
    setShowHint(false);
    setIsReviewModeActive(false);
    setUnlockedRounds({ 1: true, 2: false, 3: false });
    setCompletedRounds({ 1: false, 2: false, 3: false });
  };

  return (
    <div
      id="unit6-self-check-container"
      className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-5 sm:p-8 space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-200/70 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Unit 6 Self-Check Practice
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              TEKS 8.8.A, 8.8.B, 8.8.C
            </span>
            {isRoundFullyCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Round {currentRound} Mastered (6/6)
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Equations & Inequalities Mastery Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Complete 3 progressive rounds of 6 non-repeating questions with step-by-step guidance and retry mastery.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetRound}
            title="Reset active round"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset Round {currentRound}
          </button>
          <button
            onClick={handleResetEntirePractice}
            title="Reset all 3 rounds"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            Reset All Rounds
          </button>
        </div>
      </div>

      {/* Round Selector Tabs with Locking */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((roundNum) => {
          const r = roundNum as 1 | 2 | 3;
          const isUnlocked = unlockedRounds[r];
          const isCompleted = completedRounds[r];
          const isActive = currentRound === r;

          const rQuestions = getUnit6RoundQuestions(r);
          const rCorrect = rQuestions.filter(
            (q) => questionStates[q.id]?.status === 'correct'
          ).length;

          return (
            <button
              key={r}
              disabled={!isUnlocked}
              onClick={() => handleSelectRound(r)}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-teal-50/90 border-teal-600 text-teal-950 shadow-md ring-4 ring-teal-500/15 -translate-y-0.5'
                  : isUnlocked
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-xs cursor-pointer'
                  : 'bg-slate-50/80 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isUnlocked
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : r}
                  </div>
                  <span className="text-sm font-black text-slate-900 tracking-tight">
                    Round {r}
                  </span>
                </div>
                {!isUnlocked && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
                {isCompleted && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    100% Mastery
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {r === 1
                  ? 'Foundational Equations & Inequalities'
                  : r === 2
                  ? 'Rational Coefficients, LCM & Decimals'
                  : 'Advanced Multi-Step & Modeling'}
              </div>

              {/* Progress bar inside tab */}
              <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-teal-600'
                  }`}
                  style={{ width: `${(rCorrect / 6) * 100}%` }}
                />
              </div>
              <div className="text-[10px] font-bold text-slate-500 flex justify-between">
                <span>{rCorrect} of 6 Correct</span>
                <span>{Math.round((rCorrect / 6) * 100)}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Unresolved Needs Review Alert Banner */}
      {roundNeedsReviewQuestions.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-800">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black">
                Needs Review: {roundNeedsReviewQuestions.length} Question(s) Pending
              </div>
              <div className="text-xs text-amber-800">
                To complete Round {currentRound} and unlock the next round, solve all skipped questions correctly.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {roundNeedsReviewQuestions.map((q) => {
              const qIdx = roundQuestions.findIndex((rq) => rq.id === q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(qIdx);
                    setShowHint(false);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-200/80 hover:bg-amber-300 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                >
                  Review Q{qIdx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Round Progress and Question Selector Dots */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            Round {currentRound} · Question {currentIndex + 1} of 6
          </span>
          <span className="text-xs font-black text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full border border-teal-200">
            {roundCorrectCount}/6 Solved
          </span>
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center gap-2 flex-wrap">
          {roundQuestions.map((q, idx) => {
            const st = questionStates[q.id];
            const isCurrent = idx === currentIndex;
            const isCorrect = st?.status === 'correct';
            const isNeedsReview = st?.status === 'needs-review';
            const isIncorrect = st?.status === 'incorrect';

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowHint(false);
                }}
                title={`Question ${idx + 1} (${st?.status || 'unattempted'})`}
                className={`w-8 h-8 rounded-xl font-black text-xs transition-all flex items-center justify-center cursor-pointer border ${
                  isCurrent
                    ? 'ring-2 ring-teal-500 ring-offset-2 border-teal-600 font-bold scale-105'
                    : 'border-slate-200'
                } ${
                  isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs'
                    : isNeedsReview
                    ? 'bg-amber-400 text-amber-950 border-amber-500'
                    : isIncorrect
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isCorrect ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      <div
        id={`self-check-question-${currentQuestion.id}`}
        className="p-6 sm:p-7 rounded-3xl border-2 border-slate-200 bg-white space-y-6 shadow-xs"
      >
        {/* Question Strand and TEKS Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-black border border-teal-200">
              {currentQuestion.teks}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              {currentQuestion.strand}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentState.attempts > 0 && (
              <span className="text-xs font-bold text-slate-500">
                Attempt #{currentState.attempts}
              </span>
            )}
            {currentState.status === 'needs-review' && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-black flex items-center gap-1 border border-amber-300">
                <AlertCircle className="w-3 h-3" /> Needs Review
              </span>
            )}
            {currentState.status === 'correct' && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Solved
              </span>
            )}
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
            {currentQuestion.prompt}
          </h3>

          {/* Equation Display Box */}
          {currentQuestion.equationDisplay && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white text-center font-mono font-bold text-lg sm:text-xl tracking-wider shadow-inner">
              {currentQuestion.equationDisplay}
            </div>
          )}
        </div>

        {/* Interactive Response Area Based on Question Type */}
        <div className="space-y-4 pt-2">
          {/* 1. Multiple Choice Format */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = currentState.selectedOptionId === opt.id;
                const isCorrect = currentState.status === 'correct' && opt.id === currentQuestion.correctAnswer;

                return (
                  <button
                    key={opt.id}
                    disabled={currentState.status === 'correct'}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-2xl border-2 text-left font-medium transition-all flex items-start gap-3 cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-xs ring-2 ring-teal-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 mt-0.5 border ${
                        isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : isSelected
                          ? 'bg-teal-600 text-white border-teal-700'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {opt.id}
                    </div>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Numeric Input Format */}
          {currentQuestion.type === 'numeric-input' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Enter your numerical solution for x:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-600 font-mono">x =</span>
                <input
                  type="text"
                  disabled={currentState.status === 'correct'}
                  value={currentState.numericValue || ''}
                  onChange={(e) => handleNumericChange(e.target.value)}
                  placeholder="e.g., 5 or -12"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 font-mono font-bold text-slate-900 bg-white disabled:bg-slate-100 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Enter integers, decimals (e.g., 8 or 2.5), or simplified fractions.
              </p>
            </div>
          )}

          {/* 3. Inequality Entry Format */}
          {currentQuestion.type === 'inequality-entry' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Choose the correct symbol and boundary value:
              </label>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-base font-black text-slate-700 font-mono px-2">x</span>

                {/* Symbol Selector Buttons */}
                <div className="flex items-center rounded-xl bg-slate-200 p-1 gap-1 border border-slate-300">
                  {(['<', '<=', '>', '>='] as const).map((sym) => {
                    const isSelected = (currentState.inequalitySymbol || '>') === sym;
                    const displaySymbol =
                      sym === '<=' ? '≤' : sym === '>=' ? '≥' : sym;
                    return (
                      <button
                        key={sym}
                        disabled={currentState.status === 'correct'}
                        onClick={() => handleInequalitySymbolChange(sym)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-mono font-black transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-300/70'
                        }`}
                      >
                        {displaySymbol}
                      </button>
                    );
                  })}
                </div>

                {/* Value Input */}
                <input
                  type="text"
                  disabled={currentState.status === 'correct'}
                  value={currentState.inequalityValue || ''}
                  onChange={(e) => handleInequalityValueChange(e.target.value)}
                  placeholder="e.g. -5"
                  className="w-24 px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 font-mono font-bold text-slate-900 bg-white disabled:bg-slate-100 outline-none text-center"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Select whether the symbol reverses and type the boundary value.
              </p>
            </div>
          )}

          {/* 4. Multi-Select Format */}
          {currentQuestion.type === 'multi-select' && currentQuestion.options && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Select all choices that satisfy the statement:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQuestion.options.map((opt) => {
                  const isChecked = (currentState.multiSelectIds || []).includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      disabled={currentState.status === 'correct'}
                      onClick={() => handleToggleMultiSelect(opt.id)}
                      className={`p-3.5 rounded-2xl border-2 text-left font-medium transition-all flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors border ${
                          isChecked
                            ? 'bg-teal-600 text-white border-teal-700'
                            : 'bg-white text-transparent border-slate-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Feedback Banner */}
        {currentState.feedbackMessage && (
          <div
            className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
              currentState.status === 'correct'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div
              className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                currentState.status === 'correct'
                  ? 'bg-emerald-200/80 text-emerald-800'
                  : 'bg-rose-200/80 text-rose-800'
              }`}
            >
              {currentState.status === 'correct' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-black tracking-tight">
                {currentState.status === 'correct'
                  ? 'Correct Response!'
                  : `Incorrect Attempt #${currentState.attempts}`}
              </div>
              <div className="text-xs leading-relaxed font-medium">
                {currentState.feedbackMessage}
              </div>
            </div>
          </div>
        )}

        {/* Hint Dropdown */}
        {showHint && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                Instructional Hint
              </div>
              <div className="text-xs leading-relaxed font-medium">
                {currentQuestion.hint}
              </div>
            </div>
          </div>
        )}

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>

            {/* Skip for Now button: Appears ONLY after 3rd incorrect attempt on this question */}
            {currentState.attempts >= 3 && currentState.status !== 'correct' && (
              <button
                onClick={handleSkipForNow}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer shadow-xs"
              >
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                Skip for Now (Needs Review)
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentState.status !== 'correct' ? (
              <button
                onClick={handleCheckAnswer}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleAdvanceToNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>
                  {currentIndex < 5
                    ? 'Next Question'
                    : roundNeedsReviewQuestions.length > 0
                    ? 'Review Remaining'
                    : `Complete Round ${currentRound}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Round Complete Celebration Banner */}
      {isRoundFullyCompleted && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/20">
              <Award className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="text-xl font-black">
                Outstanding! Round {currentRound} Complete (6/6 Correct)
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                You have demonstrated 100% mastery on this set with zero unresolved questions.
              </div>
            </div>
          </div>

          {currentRound < 3 && (
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => handleSelectRound((currentRound + 1) as 1 | 2 | 3)}
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-black text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Advance to Round {currentRound + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
