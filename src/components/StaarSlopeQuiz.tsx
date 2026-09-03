import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Layers,
  TrendingUp,
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Check,
  Table as TableIcon,
  Calculator,
} from 'lucide-react';
import {
  STAAR_SLOPE_QUESTIONS,
  StaarPracticeQuestion,
  QuestionGraph,
  SlopeTopicType,
} from '../data/staar/staarQuestionsSlope';

interface StaarSlopeQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

export type StaarSlopeMode = 'finding-slope' | 'linear-equations' | 'mixed';

const STORAGE_SERVED_KEY_PREFIX = 'pinilla_math_staar_slope_served_';
const STORAGE_SELECTED_MODE_KEY = 'pinilla_math_staar_slope_selected_mode';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates 6 unique STAAR-style questions for the selected mode from the 36-question bank.
 * Guarantees zero-repeat presentation until the entire mode pool is exhausted.
 */
function generateStaarQuestions(
  mode: StaarSlopeMode,
  count: number = 6,
  previousIds: string[] = []
): StaarPracticeQuestion[] {
  // 1. Filter bank by mode
  const modePool =
    mode === 'finding-slope'
      ? STAAR_SLOPE_QUESTIONS.filter((q) => q.slopeType === 'finding-slope')
      : mode === 'linear-equations'
      ? STAAR_SLOPE_QUESTIONS.filter((q) => q.slopeType === 'linear-equations')
      : STAAR_SLOPE_QUESTIONS;

  if (modePool.length <= count) {
    return modePool.map((q) => ({ ...q }));
  }

  // 2. Read served history from localStorage
  let servedIds: string[] = [];
  try {
    const raw = localStorage.getItem(`${STORAGE_SERVED_KEY_PREFIX}${mode}`);
    if (raw) servedIds = JSON.parse(raw);
  } catch {
    servedIds = [];
  }

  // 3. Find unserved candidates
  let available = modePool.filter((q) => !servedIds.includes(q.id));

  // If pool exhausted, reset served tracking
  if (available.length < count) {
    servedIds = [...previousIds];
    available = modePool.filter((q) => !servedIds.includes(q.id));
    if (available.length < count) available = [...modePool];
  }

  // 4. Partition available questions by representation
  const graphGroup = available.filter((q) => q.category === 'graph');
  const tableGroup = available.filter((q) => q.category === 'table');
  const eqGroup = available.filter((q) => q.category === 'equation');
  const wordGroup = available.filter((q) => q.category === 'word-problem');
  const multiGroup = available.filter((q) => q.category === 'multiple-representation');

  const pickedSet = new Set<string>();
  const selected: StaarPracticeQuestion[] = [];

  const addFromGroup = (group: StaarPracticeQuestion[]) => {
    const candidates = group.filter((item) => !pickedSet.has(item.id));
    if (candidates.length > 0) {
      const idx = Math.floor(Math.random() * candidates.length);
      const chosen = candidates[idx];
      pickedSet.add(chosen.id);
      selected.push(chosen);
    }
  };

  // Sample balanced representation
  if (graphGroup.length > 0) addFromGroup(graphGroup);
  if (tableGroup.length > 0) addFromGroup(tableGroup);
  if (eqGroup.length > 0) addFromGroup(eqGroup);
  if (wordGroup.length > 0) addFromGroup(wordGroup);
  if (multiGroup.length > 0) addFromGroup(multiGroup);

  // Fill remaining slots
  const remaining = available.filter((item) => !pickedSet.has(item.id));
  const shuffledRemaining = shuffleArray(remaining);
  for (const item of shuffledRemaining) {
    if (selected.length >= count) break;
    selected.push(item);
    pickedSet.add(item.id);
  }

  // Save new served history
  try {
    const updatedServed = Array.from(new Set([...servedIds, ...selected.map((q) => q.id)]));
    localStorage.setItem(`${STORAGE_SERVED_KEY_PREFIX}${mode}`, JSON.stringify(updatedServed));
  } catch {
    // ignore
  }

  // Shuffle sequence and options with Fisher-Yates
  const shuffledSelected = shuffleArray(selected);

  return shuffledSelected.map((q) => {
    const correctText = q.options[q.correctIndex];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIdx = shuffledOptions.indexOf(correctText);
    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIdx,
    };
  });
}

/**
 * Coordinate Graph Renderer for SVG questions
 */
const GraphRenderer: React.FC<{ graph: QuestionGraph }> = ({ graph }) => {
  const width = 360;
  const height = 280;
  const padding = 38;

  const xMin = graph.xMin ?? 0;
  const xMax = graph.xMax;
  const yMin = graph.yMin ?? 0;
  const yMax = graph.yMax;
  const xStep = graph.xStep ?? 1;
  const yStep = graph.yStep ?? 1;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toSvgY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);

  const yTicks: number[] = [];
  for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-inner flex flex-col items-center">
      {graph.title && (
        <div className="text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
          {graph.title}
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[340px] aspect-[360/280] select-none">
        <defs>
          <clipPath id="graph-plot-area">
            <rect
              x={padding}
              y={padding}
              width={width - 2 * padding}
              height={height - 2 * padding}
            />
          </clipPath>
        </defs>

        {/* Grid Lines */}
        {xTicks.map((xVal) => (
          <line
            key={`x-grid-${xVal}`}
            x1={toSvgX(xVal)}
            y1={padding}
            x2={toSvgX(xVal)}
            y2={height - padding}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}
        {yTicks.map((yVal) => (
          <line
            key={`y-grid-${yVal}`}
            x1={padding}
            y1={toSvgY(yVal)}
            x2={width - padding}
            y2={toSvgY(yVal)}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}

        {/* Main Axes */}
        <line
          x1={toSvgX(xMin)}
          y1={toSvgY(0)}
          x2={toSvgX(xMax)}
          y2={toSvgY(0)}
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <line
          x1={toSvgX(0)}
          y1={toSvgY(yMin)}
          x2={toSvgX(0)}
          y2={toSvgY(yMax)}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Ticks & Labels */}
        {xTicks.map((xVal) => (
          <text
            key={`x-lbl-${xVal}`}
            x={toSvgX(xVal)}
            y={toSvgY(0) + 12}
            fill="#94a3b8"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
          >
            {xVal}
          </text>
        ))}
        {yTicks.map((yVal) => (
          <text
            key={`y-lbl-${yVal}`}
            x={toSvgX(0) - 6}
            y={toSvgY(yVal) + 3}
            fill="#94a3b8"
            fontSize="9"
            fontWeight="bold"
            textAnchor="end"
          >
            {yVal}
          </text>
        ))}

        {/* Slope Triangles */}
        {graph.triangles?.map((t, idx) => (
          <g key={`triangle-${idx}`}>
            <line
              x1={toSvgX(t.x1)}
              y1={toSvgY(t.y1)}
              x2={toSvgX(t.x2)}
              y2={toSvgY(t.y1)}
              stroke="#2dd4bf"
              strokeWidth="2.5"
              strokeDasharray="3,3"
            />
            <line
              x1={toSvgX(t.x2)}
              y1={toSvgY(t.y1)}
              x2={toSvgX(t.x2)}
              y2={toSvgY(t.y2)}
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="3,3"
            />
            {t.runLabel && (
              <text
                x={(toSvgX(t.x1) + toSvgX(t.x2)) / 2}
                y={toSvgY(t.y1) + 12}
                fill="#2dd4bf"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                {t.runLabel}
              </text>
            )}
            {t.riseLabel && (
              <text
                x={toSvgX(t.x2) + 6}
                y={(toSvgY(t.y1) + toSvgY(t.y2)) / 2}
                fill="#818cf8"
                fontSize="9"
                fontWeight="bold"
                textAnchor="start"
              >
                {t.riseLabel}
              </text>
            )}
          </g>
        ))}

        {/* Plotted Function Lines */}
        {graph.lines.map((line, lIdx) => {
          const isVertical = line.verticalX !== undefined;
          const startX = isVertical ? line.verticalX! : xMin;
          const startY = isVertical ? yMin : line.slope * startX + line.intercept;
          const endX = isVertical ? line.verticalX! : xMax;
          const endY = isVertical ? yMax : line.slope * endX + line.intercept;

          return (
            <g key={`line-${lIdx}`}>
              <line
                x1={toSvgX(startX)}
                y1={toSvgY(startY)}
                x2={toSvgX(endX)}
                y2={toSvgY(endY)}
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                clipPath="url(#graph-plot-area)"
              />
              {line.points?.map((pt, pIdx) => (
                <g key={`pt-${pIdx}`}>
                  <circle
                    cx={toSvgX(pt.x)}
                    cy={toSvgY(pt.y)}
                    r="5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {pt.label && (
                    <text
                      x={toSvgX(pt.x) + 7}
                      y={toSvgY(pt.y) - 5}
                      fill="#f59e0b"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {pt.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-bold px-2 pt-2 border-t border-slate-800/80">
        <span>X: {graph.xLabel}</span>
        <span>Y: {graph.yLabel}</span>
      </div>
    </div>
  );
};

export const StaarSlopeQuiz: React.FC<StaarSlopeQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  const [currentMode, setCurrentMode] = useState<StaarSlopeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTED_MODE_KEY);
      if (saved === 'finding-slope' || saved === 'linear-equations' || saved === 'mixed') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'mixed';
  });

  const [questions, setQuestions] = useState<StaarPracticeQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [previousQuestionIds, setPreviousQuestionIds] = useState<string[]>([]);
  const quizContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialQuestions = generateStaarQuestions(currentMode, 6, []);
    setQuestions(initialQuestions);
    setPreviousQuestionIds(initialQuestions.map((q) => q.id));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setShowHint(false);
    setShowReview(false);
  }, []);

  const handleModeChange = (newMode: StaarSlopeMode) => {
    if (newMode === currentMode && questions.length > 0 && !isCompleted) return;
    setCurrentMode(newMode);
    try {
      localStorage.setItem(STORAGE_SELECTED_MODE_KEY, newMode);
    } catch {
      // ignore
    }
    const newQuestions = generateStaarQuestions(newMode, 6, previousQuestionIds);
    setQuestions(newQuestions);
    setPreviousQuestionIds(newQuestions.map((q) => q.id));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setShowHint(false);
    setShowReview(false);

    if (quizContainerRef.current) {
      quizContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isCurrentAnswered = currentQ ? selectedAnswers[currentIdx] !== undefined : false;

  const handleSelectOption = (optionIndex: number) => {
    if (isCurrentAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    const newQuestions = generateStaarQuestions(currentMode, 6, previousQuestionIds);
    setQuestions(newQuestions);
    setPreviousQuestionIds(newQuestions.map((q) => q.id));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setShowHint(false);
    setShowReview(false);

    if (quizContainerRef.current) {
      quizContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage =
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const isPassing = scorePercentage >= 70;

  const modeTitle =
    currentMode === 'finding-slope'
      ? 'Finding Slope & Rate of Change'
      : currentMode === 'linear-equations'
      ? 'Linear Equations (y = mx + b)'
      : 'Mixed STAAR Review';

  const activePoolCount =
    currentMode === 'finding-slope'
      ? STAAR_SLOPE_QUESTIONS.filter((q) => q.slopeType === 'finding-slope').length
      : currentMode === 'linear-equations'
      ? STAAR_SLOPE_QUESTIONS.filter((q) => q.slopeType === 'linear-equations').length
      : STAAR_SLOPE_QUESTIONS.length;

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-blue-200">
        <div className="text-sm text-slate-600">Loading STAAR Slope Practice...</div>
      </div>
    );
  }

  // ==========================================
  // VIEW: COMPLETION SCORE CARD & REVIEW
  // ==========================================
  if (isCompleted && !showReview) {
    return (
      <div
        ref={quizContainerRef}
        className="bg-white rounded-3xl border-2 border-blue-200/90 shadow-md p-6 sm:p-10 space-y-8 animate-fadeIn"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            STAAR {modeTitle} Practice Completed
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {scorePercentage === 100
              ? 'Outstanding Mastery!'
              : isPassing
              ? `Great Job on ${modeTitle}!`
              : `Keep Practicing ${modeTitle}!`}
          </h3>

          <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
            {scorePercentage === 100
              ? 'You answered all 6 STAAR questions correctly. You have strong mastery of Grade 8 Slope & Linear Equations TEKS!'
              : isPassing
              ? 'You passed this STAAR practice session. Review your answers below or try another set to lock in your skills.'
              : 'Slope and linear relationships require verifying rise/run, coordinate signs, and the y-intercept. Review your explanations and practice again!'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-blue-900">
              Score
            </div>
            <div className="text-3xl font-black text-blue-600">
              {scorePercentage}%
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {correctCount} of {questions.length} Correct
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-900">
              Active Mode Pool
            </div>
            <div className="text-3xl font-black text-indigo-600">
              {activePoolCount}
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {modeTitle} ({STAAR_SLOPE_QUESTIONS.length} Total Bank)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-900">
              TEKS Standard
            </div>
            <div className="text-3xl font-black text-emerald-600">
              8.4.C / 8.5.I
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              STAAR Readiness Focus
            </div>
          </div>
        </div>

        {/* Mode Selector in Summary */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Select Next STAAR Practice Focus</span>
            <span className="text-[11px] font-bold text-blue-700">Zero-Repeat Guaranteed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleModeChange('finding-slope')}
              className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                currentMode === 'finding-slope'
                  ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Finding Slope
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                  18 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Rise/run, slope formula, triangles</span>
            </button>

            <button
              onClick={() => handleModeChange('linear-equations')}
              className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                currentMode === 'linear-equations'
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  y = mx + b Form
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                  18 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Identify m & b, write equations</span>
            </button>

            <button
              onClick={() => handleModeChange('mixed')}
              className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                currentMode === 'mixed'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Mixed Review
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  36 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">All 36 STAAR slope questions</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setShowReview(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Review Explanations
          </button>

          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Another 6 Questions
          </button>

          {onSwitchToSelfCheck && (
            <button
              onClick={onSwitchToSelfCheck}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Switch to Self Check
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE QUIZ OR REVIEW MODE
  // ==========================================
  return (
    <div
      ref={quizContainerRef}
      id="staar-slope-quiz-container"
      className="bg-white rounded-3xl border-2 border-blue-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-blue-100">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider border border-blue-200">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              STAAR Practice · {topicTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              {currentQ.teksCode}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {showReview ? 'STAAR Question Review' : `Question ${currentIdx + 1} of ${questions.length}`}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            {showReview
              ? 'Review all 6 questions, student answers, and pedagogical explanations.'
              : `Currently practicing ${modeTitle}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            title="Generate new question set for current mode"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Selection Tabs (3 Modes) */}
      {!showReview && (
        <div className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-600 uppercase tracking-wider">
            <span>Select STAAR Practice Mode</span>
            <span className="text-[11px] font-bold text-blue-700">Zero-Repeat Guarantee</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleModeChange('finding-slope')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'finding-slope'
                  ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                  Finding Slope
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                  18 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Rise/run, slope formula <code className="font-mono text-blue-800 font-bold">m = Δy/Δx</code>, similar triangles
              </p>
            </button>

            <button
              onClick={() => handleModeChange('linear-equations')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'linear-equations'
                  ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  y = mx + b Form
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                  18 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Identify <code className="font-mono text-indigo-800 font-bold">m</code> and <code className="font-mono text-indigo-800 font-bold">b</code>, formulate equations from tables/graphs
              </p>
            </button>

            <button
              onClick={() => handleModeChange('mixed')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'mixed'
                  ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  Mixed Review
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  36 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                All 36 STAAR slope & equation challenge models
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Progress Dots Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {questions.map((q, idx) => {
            const isAns = selectedAnswers[idx] !== undefined;
            const isCorr = selectedAnswers[idx] === q.correctIndex;
            const isCurr = idx === currentIdx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(idx);
                  setShowHint(false);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                  isCurr
                    ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white shadow-xs scale-105'
                    : isAns
                    ? isCorr
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-slate-500">
          Answered: {answeredCount} / {questions.length}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="p-5 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 space-y-5">
        <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500">
          <span className="uppercase tracking-wider text-blue-700 font-black">
            {currentQ.subtopic}
          </span>
          <span className="font-mono text-[11px] text-slate-400">ID: {currentQ.id}</span>
        </div>

        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Optional Data Table */}
        {currentQ.tableData && (
          <div className="max-w-md mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-blue-50 text-blue-950 font-black border-b border-blue-200">
                <tr>
                  {currentQ.tableData.headers.map((h, i) => (
                    <th key={i} className="p-2.5 border-r border-blue-200 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {currentQ.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 border-r border-slate-100 last:border-r-0 font-mono">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Optional SVG Graph */}
        {currentQ.graphData && <GraphRenderer graph={currentQ.graphData} />}

        {/* Multiple Choice Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const isCorrect = optIdx === currentQ.correctIndex;
            const showFeedback = isCurrentAnswered || showReview;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/30';

            if (showFeedback) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-1 ring-emerald-500';
              } else if (isSelected) {
                optionStyle = 'bg-rose-50 border-rose-600 text-rose-950';
              } else {
                optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-500/20';
            }

            return (
              <button
                key={optIdx}
                disabled={isCurrentAnswered && !showReview}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      showFeedback && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : showFeedback && isSelected
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{optionText}</span>
                </div>

                {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Toggle */}
        {!isCurrentAnswered && !showReview && (
          <div className="pt-1">
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>

            {showHint && (
              <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium animate-fadeIn">
                <strong>Teacher Hint:</strong> {currentQ.hint}
              </div>
            )}
          </div>
        )}

        {/* Explanation Card */}
        {(isCurrentAnswered || showReview) && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn space-y-1.5 ${
              selectedAnswers[currentIdx] === currentQ.correctIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="font-black flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              {selectedAnswers[currentIdx] === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Pedagogical Explanation</span>
                </>
              )}
            </div>
            <p className="leading-relaxed font-medium">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          disabled={currentIdx === 0}
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {showReview ? (
          <button
            onClick={() => setShowReview(false)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Back to Score Card</span>
          </button>
        ) : currentIdx < questions.length - 1 ? (
          <button
            disabled={!isCurrentAnswered}
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            disabled={!isCurrentAnswered}
            onClick={() => setIsCompleted(true)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Finish & View Score</span>
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
