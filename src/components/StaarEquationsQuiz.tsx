import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Award,
  AlertTriangle,
  Lightbulb,
  Check,
  ArrowRight,
  Target,
} from 'lucide-react';
import {
  STAAR_EQUATIONS_QUESTIONS,
  StaarEquationsQuestion,
  QuestionNumberLine,
  getStaarEquationsRoundQuestions,
} from '../data/staar/staarQuestionsEquations';

interface StaarEquationsQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

const STORAGE_KEY = 'pinilla_math_staar_u6_progress_v1';

interface QuizProgressState {
  completedIds: string[];
  needsReviewIds: string[];
  unlockedRounds: number[]; // e.g. [1, 2, 3]
}

/**
 * High-Contrast SVG Number Line for Inequality Visualizations
 */
const NumberLineVisualizer: React.FC<{
  config: QuestionNumberLine;
  isOption?: boolean;
}> = ({ config, isOption = false }) => {
  const { boundary, symbol, minVal, maxVal } = config;
  const svgWidth = isOption ? 340 : 440;
  const svgHeight = 64;
  const padding = 28;
  const yAxis = 32;

  const toSvgX = (val: number) =>
    padding + ((val - minVal) / (maxVal - minVal)) * (svgWidth - 2 * padding);

  const boundaryX = toSvgX(boundary);
  const isClosed = symbol === '<=' || symbol === '>=';
  const isRight = symbol === '>' || symbol === '>=';

  // Generate tick marks
  const ticks: number[] = [];
  const step = config.step || 1;
  for (let v = minVal; v <= maxVal; v += step) {
    ticks.push(v);
  }

  const markerId = `arrow-${isRight ? 'right' : 'left'}-${isOption ? 'opt' : 'main'}-${boundary}`;

  return (
    <div className="w-full overflow-x-auto py-1">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full max-w-md mx-auto block select-none"
        style={{ height: '64px' }}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#4f46e5" />
          </marker>
        </defs>

        {/* Main horizontal axis */}
        <line
          x1={padding - 10}
          y1={yAxis}
          x2={svgWidth - padding + 10}
          y2={yAxis}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Axis tick marks and numbers */}
        {ticks.map((t) => {
          const tx = toSvgX(t);
          return (
            <g key={`tick-${t}`}>
              <line x1={tx} y1={yAxis - 5} x2={tx} y2={yAxis + 5} stroke="#64748b" strokeWidth="1.5" />
              <text
                x={tx}
                y={yAxis + 20}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#475569"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Shaded inequality ray */}
        {isRight ? (
          <line
            x1={boundaryX}
            y1={yAxis}
            x2={svgWidth - padding + 8}
            y2={yAxis}
            stroke="#4f46e5"
            strokeWidth="4"
            markerEnd={`url(#${markerId})`}
          />
        ) : (
          <line
            x1={boundaryX}
            y1={yAxis}
            x2={padding - 8}
            y2={yAxis}
            stroke="#4f46e5"
            strokeWidth="4"
            markerEnd={`url(#${markerId})`}
          />
        )}

        {/* Boundary circle (Open or Closed) */}
        <circle
          cx={boundaryX}
          cy={yAxis}
          r="6"
          fill={isClosed ? '#4f46e5' : '#ffffff'}
          stroke="#4f46e5"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

export const StaarEquationsQuiz: React.FC<StaarEquationsQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  // Navigation state
  const [activeRound, setActiveRound] = useState<1 | 2 | 3>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Student interaction state
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [inequalitySymbol, setInequalitySymbol] = useState<'<' | '<=' | '>' | '>='>('<');
  const [inequalityVal, setInequalityVal] = useState<string>('');

  // Assessment & Feedback state
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Persistence state
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [needsReviewIds, setNeedsReviewIds] = useState<Set<string>>(new Set());
  const [unlockedRounds, setUnlockedRounds] = useState<Set<number>>(new Set([1]));

  // Load progress from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: QuizProgressState = JSON.parse(raw);
        const comp = new Set(parsed.completedIds || []);
        const review = new Set(parsed.needsReviewIds || []);
        const unlocked = new Set(parsed.unlockedRounds || [1]);

        // Check if round 1 is 12/12 complete to unlock round 2
        const r1Questions = getStaarEquationsRoundQuestions(1);
        const r1Done = r1Questions.every((q) => comp.has(q.id));
        if (r1Done) unlocked.add(2);

        // Check if round 2 is 12/12 complete to unlock round 3
        const r2Questions = getStaarEquationsRoundQuestions(2);
        const r2Done = r2Questions.every((q) => comp.has(q.id));
        if (r2Done) unlocked.add(3);

        setCompletedIds(comp);
        setNeedsReviewIds(review);
        setUnlockedRounds(unlocked);
      }
    } catch {
      // Use defaults
    }
  }, []);

  // Save progress helper
  const persistState = (
    newComp: Set<string>,
    newReview: Set<string>,
    newUnlocked: Set<number>
  ) => {
    try {
      const payload: QuizProgressState = {
        completedIds: Array.from(newComp),
        needsReviewIds: Array.from(newReview),
        unlockedRounds: Array.from(newUnlocked),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage unavailable
    }
  };

  // Get 12 questions for current round
  const roundQuestions = getStaarEquationsRoundQuestions(activeRound);
  const currentQ: StaarEquationsQuestion = roundQuestions[currentIndex] || roundQuestions[0];

  // Reset inputs when switching question or round
  useEffect(() => {
    setSelectedOption('');
    setMultiSelect([]);
    setNumericInput('');
    setInequalitySymbol('<');
    setInequalityVal('');
    setIsAnswered(completedIds.has(currentQ.id));
    setIsCorrect(completedIds.has(currentQ.id));
    setShowHint(false);
  }, [currentIndex, activeRound, currentQ.id, completedIds]);

  const currentAttempts = attemptCounts[currentQ.id] || 0;
  const isRoundComplete = roundQuestions.every((q) => completedIds.has(q.id));
  const roundCompletedCount = roundQuestions.filter((q) => completedIds.has(q.id)).length;
  const roundReviewCount = roundQuestions.filter((q) => needsReviewIds.has(q.id)).length;

  // Validation function
  const handleCheckAnswer = () => {
    let correct = false;

    if (currentQ.type === 'multiple-choice' || currentQ.type === 'error-analysis') {
      correct = selectedOption === currentQ.correctAnswer;
    } else if (currentQ.type === 'multi-select') {
      const correctArr = (currentQ.correctAnswer as string[]).slice().sort();
      const userArr = multiSelect.slice().sort();
      correct =
        correctArr.length === userArr.length &&
        correctArr.every((val, idx) => val === userArr[idx]);
    } else if (currentQ.type === 'numeric-input') {
      const cleaned = numericInput.trim().toLowerCase();
      const num = parseFloat(cleaned);
      if (currentQ.numericAnswer !== undefined && !isNaN(num)) {
        correct = Math.abs(num - currentQ.numericAnswer) < 0.001;
      }
      if (!correct && currentQ.acceptedEquivalents) {
        correct = currentQ.acceptedEquivalents.some(
          (eq) => eq.toLowerCase() === cleaned || eq.replace(/\s+/g, '') === cleaned.replace(/\s+/g, '')
        );
      }
    } else if (currentQ.type === 'inequality-entry') {
      if (currentQ.inequalityConfig) {
        const userNum = parseFloat(inequalityVal.trim());
        const targetNum = currentQ.inequalityConfig.boundary;
        const targetSym = currentQ.inequalityConfig.symbol;
        if (!isNaN(userNum)) {
          // Check standard format: x [symbol] [num]
          if (inequalitySymbol === targetSym && Math.abs(userNum - targetNum) < 0.001) {
            correct = true;
          }
        }
      }
    }

    setIsAnswered(true);
    setIsCorrect(correct);

    const newAttempts = currentAttempts + 1;
    setAttemptCounts((prev) => ({ ...prev, [currentQ.id]: newAttempts }));

    if (correct) {
      // Mark completed & clear review status
      const nextComp = new Set<string>(completedIds);
      nextComp.add(currentQ.id);
      const nextReview = new Set<string>(needsReviewIds);
      nextReview.delete(currentQ.id);

      // Check if this unlocks next round
      const nextUnlocked = new Set<number>(unlockedRounds);
      const allRoundDone = roundQuestions.every((q) => nextComp.has(q.id));
      if (allRoundDone) {
        if (activeRound === 1) nextUnlocked.add(2);
        if (activeRound === 2) nextUnlocked.add(3);
      }

      setCompletedIds(nextComp);
      setNeedsReviewIds(nextReview);
      setUnlockedRounds(nextUnlocked);
      persistState(nextComp, nextReview, nextUnlocked);
    }
  };

  // Skip for Now logic (available on 3rd incorrect attempt)
  const handleSkipForNow = () => {
    const nextReview = new Set<string>(needsReviewIds);
    nextReview.add(currentQ.id);
    setNeedsReviewIds(nextReview);
    persistState(completedIds, nextReview, unlockedRounds);

    // Advance to next incomplete question
    findAndNavigateNextIncomplete(currentIndex);
  };

  // Find next incomplete question
  const findAndNavigateNextIncomplete = (fromIndex: number) => {
    for (let i = 1; i <= 12; i++) {
      const nextIdx = (fromIndex + i) % 12;
      const targetQ = roundQuestions[nextIdx];
      if (!completedIds.has(targetQ.id)) {
        setCurrentIndex(nextIdx);
        return;
      }
    }
    // If all completed, keep index
    if (fromIndex < 11) {
      setCurrentIndex(fromIndex + 1);
    }
  };

  // Reset entire round
  const handleResetRound = () => {
    if (window.confirm(`Reset all 12 questions in Round ${activeRound}?`)) {
      const nextComp = new Set<string>(completedIds);
      const nextReview = new Set<string>(needsReviewIds);
      roundQuestions.forEach((q) => {
        nextComp.delete(q.id);
        nextReview.delete(q.id);
      });
      setCompletedIds(nextComp);
      setNeedsReviewIds(nextReview);
      persistState(nextComp, nextReview, unlockedRounds);
      setCurrentIndex(0);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  // Reset all 36 questions
  const handleResetAll = () => {
    if (window.confirm('Reset ALL 36 questions across all 3 rounds of STAAR Practice?')) {
      localStorage.removeItem(STORAGE_KEY);
      setCompletedIds(new Set());
      setNeedsReviewIds(new Set());
      setUnlockedRounds(new Set([1]));
      setActiveRound(1);
      setCurrentIndex(0);
      setIsAnswered(false);
      setIsCorrect(false);
      setAttemptCounts({});
    }
  };

  return (
    <div id="unit6-staar-practice-container" className="space-y-6">
      {/* Top Header & Round Switcher */}
      <div className="bg-white rounded-2xl border-2 border-indigo-100 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase tracking-wide">
                TEKS 8.8A · 8.8B · 8.8C
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                STAAR Practice · 36 Questions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Unit 6: Equations & Inequalities STAAR Practice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              3 progressive rounds of 12 rigorous, non-repeating questions aligned to Texas Grade 8 STAAR standards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="reset-current-round-btn"
              onClick={handleResetRound}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset progress for the current round"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Round {activeRound}
            </button>
            <button
              id="reset-all-staar-btn"
              onClick={handleResetAll}
              className="px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer border border-rose-200"
              title="Reset all 36 questions"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* 3-Round Interactive Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((rNum) => {
            const isUnlocked = unlockedRounds.has(rNum);
            const rQs = getStaarEquationsRoundQuestions(rNum as 1 | 2 | 3);
            const rDoneCount = rQs.filter((q) => completedIds.has(q.id)).length;
            const isFinished = rDoneCount === 12;
            const isActive = activeRound === rNum;

            return (
              <button
                key={`round-tab-${rNum}`}
                id={`staar-round-tab-${rNum}`}
                disabled={!isUnlocked}
                onClick={() => {
                  setActiveRound(rNum as 1 | 2 | 3);
                  setCurrentIndex(0);
                }}
                className={`p-3.5 rounded-xl text-left border-2 transition-all flex flex-col justify-between gap-1.5 ${
                  isActive
                    ? 'bg-indigo-50/90 border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                    : isUnlocked
                    ? 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer'
                    : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wide uppercase text-indigo-900 flex items-center gap-1.5">
                    {isUnlocked ? (
                      isFinished ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-indigo-600" />
                      )
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    Round {rNum}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isFinished
                        ? 'bg-emerald-100 text-emerald-800'
                        : isUnlocked
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isFinished ? 'Mastered 12/12' : isUnlocked ? `${rDoneCount}/12 Complete` : 'Locked'}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {rNum === 1
                      ? 'Questions 1–12'
                      : rNum === 2
                      ? 'Questions 13–24'
                      : 'Questions 25–36'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {rNum === 1
                      ? 'Foundational Equations & Inequalities'
                      : rNum === 2
                      ? 'Fractions, Decimals & Sign Reversals'
                      : 'Advanced Multi-Step & Contextual Modeling'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Needs Review Alert Banner if unresolved items exist */}
      {roundReviewCount > 0 && !isRoundComplete && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-black">
                {roundReviewCount} Question{roundReviewCount > 1 ? 's' : ''} Flagged as "Needs Review"
              </div>
              <div className="text-xs text-amber-800 font-medium">
                To complete Round {activeRound} and unlock the next round, you must answer all 12 questions correctly.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const firstReviewIdx = roundQuestions.findIndex((q) => needsReviewIds.has(q.id));
              if (firstReviewIdx !== -1) setCurrentIndex(firstReviewIdx);
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            Review Flagged Items
          </button>
        </div>
      )}

      {/* Round 12/12 Mastered Celebration Banner */}
      {isRoundComplete && (
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-emerald-900">
                Round {activeRound} Mastered! (12/12 Questions Solved)
              </div>
              <div className="text-xs sm:text-sm text-emerald-700 font-medium">
                {activeRound < 3
                  ? `Outstanding! Round ${activeRound + 1} has been unlocked for you.`
                  : 'Incredible work! You have completed all 36 STAAR practice questions for Unit 6.'}
              </div>
            </div>
          </div>

          {activeRound < 3 && (
            <button
              onClick={() => {
                setActiveRound((activeRound + 1) as 2 | 3);
                setCurrentIndex(0);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
            >
              Advance to Round {activeRound + 1}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        {/* Sub-header: Strand, TEKS, and 12-Question Navigation Dots */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs">
              #{currentQ.questionNumber}
            </span>
            <div>
              <div className="text-xs font-black text-indigo-900 tracking-tight">
                {currentQ.teks} · {currentQ.strand}
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">
                Round {activeRound} · Question {currentIndex + 1} of 12
              </div>
            </div>
          </div>

          {/* Question Dots Navigation */}
          <div className="flex flex-wrap items-center gap-1.5">
            {roundQuestions.map((q, idx) => {
              const isDone = completedIds.has(q.id);
              const isFlagged = needsReviewIds.has(q.id);
              const isCur = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  id={`staar-q-dot-${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                    isCur
                      ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white shadow-xs scale-105'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                      : isFlagged
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Question ${idx + 1}: ${isDone ? 'Completed' : isFlagged ? 'Needs Review' : 'Not Attempted'}`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Prompt */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </p>

            {/* Display Equation or Expression prominently */}
            {currentQ.equationDisplay && (
              <div className="p-4 rounded-xl bg-slate-900 text-indigo-100 font-mono text-base sm:text-xl font-bold tracking-wide text-center shadow-inner select-all border border-slate-800">
                {currentQ.equationDisplay}
              </div>
            )}
          </div>

          {/* Interaction Area based on Type */}
          <div className="space-y-4 pt-2">
            {/* 1. Multiple Choice & Error Analysis */}
            {(currentQ.type === 'multiple-choice' || currentQ.type === 'error-analysis') && currentQ.options && (
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`staar-option-${opt.id}`}
                      disabled={isCorrect}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`p-4 rounded-xl text-left border-2 transition-all flex flex-col justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-500'
                          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                      } ${isCorrect ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black uppercase transition-colors shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-slate-800">
                          {opt.text}
                        </span>
                      </div>

                      {/* Optional Number Line embedded in option */}
                      {opt.numberLine && (
                        <div className="pl-9 pt-1">
                          <NumberLineVisualizer config={opt.numberLine} isOption={true} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Numeric Input */}
            {currentQ.type === 'numeric-input' && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 max-w-md">
                <label
                  htmlFor="staar-numeric-input"
                  className="block text-xs font-black uppercase tracking-wider text-slate-600"
                >
                  Enter the numerical solution for x:
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono font-bold text-slate-700">x =</span>
                  <input
                    id="staar-numeric-input"
                    type="text"
                    disabled={isCorrect}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 5 or -4"
                    className="flex-1 p-3 rounded-xl border-2 border-slate-300 font-mono text-base font-bold text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-hidden bg-white"
                  />
                </div>
              </div>
            )}

            {/* 3. Inequality Entry */}
            {currentQ.type === 'inequality-entry' && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 max-w-lg">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                  Select Inequality Symbol and Enter Boundary:
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-mono font-black text-indigo-900">x</span>

                  {/* Symbol selector buttons */}
                  <div className="inline-flex rounded-xl border border-slate-300 bg-white p-1 shadow-2xs">
                    {(['<', '<=', '>', '>='] as const).map((sym) => (
                      <button
                        key={sym}
                        id={`staar-ineq-sym-${sym}`}
                        type="button"
                        disabled={isCorrect}
                        onClick={() => setInequalitySymbol(sym)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold transition-colors cursor-pointer ${
                          inequalitySymbol === sym
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {sym === '<=' ? '≤' : sym === '>=' ? '≥' : sym}
                      </button>
                    ))}
                  </div>

                  <input
                    id="staar-ineq-boundary-input"
                    type="text"
                    disabled={isCorrect}
                    value={inequalityVal}
                    onChange={(e) => setInequalityVal(e.target.value)}
                    placeholder="Boundary value"
                    className="w-28 p-2.5 rounded-xl border-2 border-slate-300 font-mono text-base font-bold text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-hidden bg-white"
                  />
                </div>

                {/* Live formatted expression preview */}
                <div className="text-xs text-slate-600 font-medium">
                  Your Answer:{' '}
                  <span className="font-mono font-bold text-indigo-700 text-sm">
                    x {inequalitySymbol === '<=' ? '≤' : inequalitySymbol === '>=' ? '≥' : inequalitySymbol}{' '}
                    {inequalityVal || '___'}
                  </span>
                </div>
              </div>
            )}

            {/* 4. Multi-Select */}
            {currentQ.type === 'multi-select' && currentQ.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isChecked = multiSelect.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      id={`staar-multi-opt-${opt.id}`}
                      disabled={isCorrect}
                      onClick={() => {
                        if (isChecked) {
                          setMultiSelect(multiSelect.filter((id) => id !== opt.id));
                        } else {
                          setMultiSelect([...multiSelect, opt.id]);
                        }
                      }}
                      className={`p-3.5 rounded-xl text-left border-2 transition-all flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-indigo-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${
                          isChecked
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Hint Section */}
          <div className="pt-2">
            <button
              id="staar-hint-toggle-btn"
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
            {showHint && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Feedback & Explanations */}
          {isAnswered && (
            <div className="space-y-3 pt-2">
              {isCorrect ? (
                <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-black text-sm uppercase tracking-wide text-emerald-800">
                      Correct Response!
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                    {currentQ.correctExplanation}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-950 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span className="font-black text-sm uppercase tracking-wide text-rose-800">
                        Incorrect Attempt #{currentAttempts}
                      </span>
                    </div>

                    {/* Show Skip for Now after 3rd failure */}
                    {currentAttempts >= 3 && !isCorrect && (
                      <button
                        id="staar-skip-for-now-btn"
                        onClick={handleSkipForNow}
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                      >
                        Skip for Now (Mark for Review)
                      </button>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
                    {currentQ.misconceptionFeedback}
                  </p>
                  <p className="text-xs text-rose-700 font-semibold italic">
                    Review your work and try again. The controls remain active.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Footer: Submit or Navigate */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Round Progress: {roundCompletedCount} of 12 questions mastered
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="staar-prev-btn"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              {!isCorrect ? (
                <button
                  id="staar-submit-btn"
                  onClick={handleCheckAnswer}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black transition-colors cursor-pointer shadow-xs"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  id="staar-next-btn"
                  onClick={() => findAndNavigateNextIncomplete(currentIndex)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                id="staar-skip-direct-btn"
                disabled={currentIndex === 11}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
