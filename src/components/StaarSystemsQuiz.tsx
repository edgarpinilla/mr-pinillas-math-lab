import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Layers,
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  ShieldCheck,
  Check,
  Eye,
} from 'lucide-react';
import {
  STAAR_SYSTEMS_QUESTIONS,
  StaarSystemsQuestion,
  QuestionSystemGraph,
} from '../data/staar/staarQuestionsSystems';

interface StaarSystemsQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

export type StaarSystemsMode = 'mixed' | 'graph-intersection' | 'equations-apps';

const STORAGE_SERVED_KEY_PREFIX = 'pinilla_math_staar_systems_served_v2_';
const STORAGE_SELECTED_MODE_KEY = 'pinilla_math_staar_systems_selected_mode_v2';

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
 * Ensures variety across the 5 core domains and prevents identical 6-question set on consecutive attempts.
 */
function generateStaarQuestions(
  mode: StaarSystemsMode,
  count: number = 6,
  previousIds: string[] = []
): StaarSystemsQuestion[] {
  // 1. Filter pool by mode
  const modePool =
    mode === 'graph-intersection'
      ? STAAR_SYSTEMS_QUESTIONS.filter((q) => q.category === 'graph-intersection')
      : mode === 'equations-apps'
      ? STAAR_SYSTEMS_QUESTIONS.filter(
          (q) =>
            q.category === 'verify-solution' ||
            q.category === 'equations-graphical' ||
            q.category === 'real-world' ||
            q.category === 'multi-rep'
        )
      : STAAR_SYSTEMS_QUESTIONS;

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

  // 3. Find candidates not recently served
  let available = modePool.filter((q) => !servedIds.includes(q.id));

  // If pool exhausted, reset served tracking while keeping previousIds to prevent immediate repeat
  if (available.length < count) {
    servedIds = [...previousIds];
    available = modePool.filter((q) => !servedIds.includes(q.id));
    if (available.length < count) available = [...modePool];
  }

  const pickedSet = new Set<string>();
  const selected: StaarSystemsQuestion[] = [];

  const addFromGroup = (group: StaarSystemsQuestion[], desiredCount: number = 1) => {
    const candidates = group.filter((item) => !pickedSet.has(item.id));
    const shuffled = shuffleArray(candidates);
    for (let i = 0; i < desiredCount && i < shuffled.length; i++) {
      pickedSet.add(shuffled[i].id);
      selected.push(shuffled[i]);
    }
  };

  if (mode === 'mixed') {
    // Sample with guaranteed variety across the 5 domains:
    // 2 from graph-intersection, 1 from verify-solution, 1 from equations-graphical, 1 from real-world, 1 from multi-rep
    const graphGroup = available.filter((q) => q.category === 'graph-intersection');
    const verifyGroup = available.filter((q) => q.category === 'verify-solution');
    const eqGroup = available.filter((q) => q.category === 'equations-graphical');
    const realWorldGroup = available.filter((q) => q.category === 'real-world');
    const multiGroup = available.filter((q) => q.category === 'multi-rep');

    addFromGroup(graphGroup, 2);
    addFromGroup(verifyGroup, 1);
    addFromGroup(eqGroup, 1);
    addFromGroup(realWorldGroup, 1);
    addFromGroup(multiGroup, 1);
  } else if (mode === 'equations-apps') {
    // Sample across the non-graph domains
    const verifyGroup = available.filter((q) => q.category === 'verify-solution');
    const eqGroup = available.filter((q) => q.category === 'equations-graphical');
    const realWorldGroup = available.filter((q) => q.category === 'real-world');
    const multiGroup = available.filter((q) => q.category === 'multi-rep');

    addFromGroup(verifyGroup, 2);
    addFromGroup(eqGroup, 2);
    addFromGroup(realWorldGroup, 1);
    addFromGroup(multiGroup, 1);
  } else {
    // graph-intersection mode: all from graphGroup
    addFromGroup(available, count);
  }

  // Fill remaining slots if any
  if (selected.length < count) {
    const remaining = available.filter((item) => !pickedSet.has(item.id));
    const shuffledRemaining = shuffleArray(remaining);
    for (const item of shuffledRemaining) {
      if (selected.length >= count) break;
      selected.push(item);
      pickedSet.add(item.id);
    }
  }

  // Backup fallback if still fewer than count
  if (selected.length < count) {
    const leftover = modePool.filter((item) => !pickedSet.has(item.id));
    const shuffledLeftover = shuffleArray(leftover);
    for (const item of shuffledLeftover) {
      if (selected.length >= count) break;
      selected.push(item);
      pickedSet.add(item.id);
    }
  }

  // Check that the new set isn't identical to previousIds
  const isSameSet =
    previousIds.length === selected.length &&
    selected.every((item) => previousIds.includes(item.id));

  if (isSameSet && modePool.length > count) {
    // Swap at least one question with an alternative
    const alt = modePool.find((item) => !selected.some((s) => s.id === item.id));
    if (alt && selected.length > 0) {
      selected[selected.length - 1] = alt;
    }
  }

  // Save new served history
  try {
    const updatedServed = Array.from(new Set([...servedIds, ...selected.map((q) => q.id)]));
    localStorage.setItem(`${STORAGE_SERVED_KEY_PREFIX}${mode}`, JSON.stringify(updatedServed));
  } catch {
    // ignore
  }

  // Shuffle final question sequence and answer choices
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
 * Displays clean coordinate grid, x/y axes, line equations in legend,
 * and reveals the glowing intersection marker ONLY when requested (after student answers).
 */
const SystemsGraphRenderer: React.FC<{
  graph: QuestionSystemGraph;
  showIntersectionPoint?: boolean;
}> = ({ graph, showIntersectionPoint = false }) => {
  const width = 380;
  const height = 300;
  const paddingLeft = 44;
  const paddingRight = 24;
  const paddingTop = 26;
  const paddingBottom = 42;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const xMin = graph.xMin;
  const xMax = graph.xMax;
  const yMin = graph.yMin;
  const yMax = graph.yMax;
  const xStep = graph.xStep ?? 1;
  const yStep = graph.yStep ?? 1;

  const toSvgX = (x: number) => paddingLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (y: number) => height - paddingBottom - ((y - yMin) / (yMax - yMin)) * plotHeight;

  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax; x += xStep) {
    xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = yMin; y <= yMax; y += yStep) {
    yTicks.push(y);
  }

  const hasOriginX = xMin <= 0 && xMax >= 0;
  const hasOriginY = yMin <= 0 && yMax >= 0;
  const axisX = hasOriginX ? toSvgX(0) : toSvgX(xMin);
  const axisY = hasOriginY ? toSvgY(0) : toSvgY(yMin);

  const clipId = `clip-sys-${Math.abs(xMin)}-${Math.abs(xMax)}-${Math.abs(yMin)}-${Math.abs(yMax)}`;

  return (
    <div className="flex flex-col items-center bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md max-w-md mx-auto w-full">
      {graph.title && (
        <div className="text-xs font-black uppercase tracking-wider text-slate-300 pb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>{graph.title}</span>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none overflow-hidden"
      >
        <defs>
          <clipPath id={clipId}>
            <rect
              x={paddingLeft}
              y={paddingTop}
              width={plotWidth}
              height={plotHeight}
              rx="4"
            />
          </clipPath>
        </defs>

        {/* Background plot area */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={plotWidth}
          height={plotHeight}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1.5"
          rx="4"
        />

        {/* Gridlines */}
        <g stroke="#1e293b" strokeWidth="1">
          {xTicks.map((x) => (
            <line
              key={`xgrid-${x}`}
              x1={toSvgX(x)}
              y1={paddingTop}
              x2={toSvgX(x)}
              y2={height - paddingBottom}
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`ygrid-${y}`}
              x1={paddingLeft}
              y1={toSvgY(y)}
              x2={width - paddingRight}
              y2={toSvgY(y)}
            />
          ))}
        </g>

        {/* X Axis */}
        <line
          x1={paddingLeft}
          y1={axisY}
          x2={width - paddingRight}
          y2={axisY}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Y Axis */}
        <line
          x1={axisX}
          y1={paddingTop}
          x2={axisX}
          y2={height - paddingBottom}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* X Ticks & Labels */}
        {xTicks.map((x) => {
          const svgX = toSvgX(x);
          const isZero = x === 0;
          return (
            <g key={`xtick-${x}`}>
              <line
                x1={svgX}
                y1={axisY - 3}
                x2={svgX}
                y2={axisY + 3}
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {!isZero && (
                <text
                  x={svgX}
                  y={height - paddingBottom + 16}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {x}
                </text>
              )}
            </g>
          );
        })}

        {/* Y Ticks & Labels */}
        {yTicks.map((y) => {
          const svgY = toSvgY(y);
          const isZero = y === 0;
          return (
            <g key={`ytick-${y}`}>
              <line
                x1={axisX - 3}
                y1={svgY}
                x2={axisX + 3}
                y2={svgY}
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {!isZero && (
                <text
                  x={paddingLeft - 8}
                  y={svgY + 3.5}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                  fontWeight="bold"
                >
                  {y}
                </text>
              )}
            </g>
          );
        })}

        {/* Origin Label (0) */}
        {hasOriginX && hasOriginY && (
          <text
            x={axisX - 7}
            y={axisY + 13}
            fill="#64748b"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="end"
          >
            0
          </text>
        )}

        {/* Axis Labels */}
        <text
          x={width - paddingRight - 4}
          y={axisY - 7}
          fill="#cbd5e1"
          fontSize="11"
          fontWeight="bold"
          textAnchor="end"
        >
          {graph.xLabel || 'x'}
        </text>
        <text
          x={axisX + 8}
          y={paddingTop + 12}
          fill="#cbd5e1"
          fontSize="11"
          fontWeight="bold"
          textAnchor="start"
        >
          {graph.yLabel || 'y'}
        </text>

        {/* Clipped Lines Area */}
        <g clipPath={`url(#${clipId})`}>
          {graph.lines.map((line, idx) => {
            // Find two points by evaluating across domain with generous bounds
            const x1 = xMin - 5;
            const y1 = line.slope * x1 + line.intercept;
            const x2 = xMax + 5;
            const y2 = line.slope * x2 + line.intercept;

            return (
              <line
                key={idx}
                x1={toSvgX(x1)}
                y1={toSvgY(y1)}
                x2={toSvgX(x2)}
                y2={toSvgY(y2)}
                stroke={line.color}
                strokeWidth="2.75"
                strokeDasharray={line.dashed ? '5,4' : undefined}
                strokeLinecap="round"
              />
            );
          })}

          {/* Reveal intersection point if requested (e.g. after response) */}
          {showIntersectionPoint && graph.intersectionPoint && (
            <g className="animate-fadeIn">
              {/* Outer pulsing ring */}
              <circle
                cx={toSvgX(graph.intersectionPoint.x)}
                cy={toSvgY(graph.intersectionPoint.y)}
                r="10"
                fill="#fbbf24"
                opacity="0.3"
              />
              {/* Center point */}
              <circle
                cx={toSvgX(graph.intersectionPoint.x)}
                cy={toSvgY(graph.intersectionPoint.y)}
                r="5.5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </g>

        {/* Intersection Label if revealed */}
        {showIntersectionPoint && graph.intersectionPoint && (
          <g>
            <rect
              x={toSvgX(graph.intersectionPoint.x) + 7}
              y={toSvgY(graph.intersectionPoint.y) - 22}
              width="54"
              height="18"
              rx="4"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1"
            />
            <text
              x={toSvgX(graph.intersectionPoint.x) + 34}
              y={toSvgY(graph.intersectionPoint.y) - 10}
              fill="#78350f"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="900"
              textAnchor="middle"
            >
              {graph.intersectionPoint.label ||
                `(${graph.intersectionPoint.x}, ${graph.intersectionPoint.y})`}
            </text>
          </g>
        )}
      </svg>

      {/* Legend showing both lines */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-800/80 w-full text-xs">
        {graph.lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-1.5 font-bold">
            <span
              className="inline-block w-4 h-1 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            <span className="text-slate-300 font-mono text-[11px]">{line.label}</span>
          </div>
        ))}
      </div>

      {showIntersectionPoint && graph.intersectionPoint && (
        <div className="mt-2 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Solution Confirmed at Intersection Point:{' '}
            <strong className="text-white">
              ({graph.intersectionPoint.x}, {graph.intersectionPoint.y})
            </strong>
          </span>
        </div>
      )}
    </div>
  );
};

export const StaarSystemsQuiz: React.FC<StaarSystemsQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  const [currentMode, setCurrentMode] = useState<StaarSystemsMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTED_MODE_KEY);
      if (
        saved === 'mixed' ||
        saved === 'graph-intersection' ||
        saved === 'equations-apps'
      ) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'mixed';
  });

  const [questions, setQuestions] = useState<StaarSystemsQuestion[]>([]);
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

  const handleModeChange = (newMode: StaarSystemsMode) => {
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
    currentMode === 'graph-intersection'
      ? 'Graphing & Intersections'
      : currentMode === 'equations-apps'
      ? 'Equations & Real-World Systems'
      : 'Mixed STAAR Review';

  const activePoolCount =
    currentMode === 'graph-intersection'
      ? STAAR_SYSTEMS_QUESTIONS.filter((q) => q.category === 'graph-intersection').length
      : currentMode === 'equations-apps'
      ? STAAR_SYSTEMS_QUESTIONS.filter(
          (q) =>
            q.category === 'verify-solution' ||
            q.category === 'equations-graphical' ||
            q.category === 'real-world' ||
            q.category === 'multi-rep'
        ).length
      : STAAR_SYSTEMS_QUESTIONS.length;

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-indigo-200">
        <div className="text-sm text-slate-600">Loading STAAR Systems Practice...</div>
      </div>
    );
  }

  // ==========================================
  // VIEW: COMPLETION SCORE CARD
  // ==========================================
  if (isCompleted && !showReview) {
    return (
      <div
        ref={quizContainerRef}
        className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-6 sm:p-10 space-y-8 animate-fadeIn"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
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
              ? 'You answered all 6 STAAR questions correctly! You demonstrated complete mastery of TEKS 8.9A Systems of Linear Equations.'
              : isPassing
              ? 'You passed this STAAR practice session. Review your answers below or try another set to lock in your skills.'
              : 'Systems of equations require finding the point where both lines intersect and satisfy both equations. Review the step-by-step explanations and practice again!'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-900">
              Score
            </div>
            <div className="text-3xl font-black text-indigo-600">
              {scorePercentage}%
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {correctCount} of {questions.length} Correct
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-blue-900">
              Active Question Pool
            </div>
            <div className="text-3xl font-black text-blue-600">
              {activePoolCount}
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {modeTitle} ({STAAR_SYSTEMS_QUESTIONS.length} Total Bank)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-900">
              TEKS Standard
            </div>
            <div className="text-3xl font-black text-emerald-600">
              TEKS 8.9A
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              Readiness · Systems of Equations
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setShowReview(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Review All Answers
          </button>

          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            Practice Again (New Questions)
          </button>

          {onSwitchToSelfCheck && (
            <button
              onClick={onSwitchToSelfCheck}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Go to Self Check
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: FULL REVIEW SCREEN
  // ==========================================
  if (showReview) {
    return (
      <div
        ref={quizContainerRef}
        className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-6 sm:p-10 space-y-8 animate-fadeIn"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Answer Review
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
              Reviewing: {modeTitle}
            </h3>
            <p className="text-xs text-slate-500 font-medium pt-0.5">
              Score: {scorePercentage}% ({correctCount} / {questions.length} Correct)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>New Questions</span>
            </button>
            <button
              onClick={() => setShowReview(false)}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Back to Results</span>
            </button>
          </div>
        </div>

        {/* All Questions in Review */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const userChoice = selectedAnswers[qIndex];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border-2 space-y-4 ${
                  isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    >
                      {qIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {q.subtopic}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {q.question}
                </div>

                {q.context && (
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold">
                    {q.context}
                  </div>
                )}

                {q.tableData && (
                  <div className="max-w-xs mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-xs text-center border-collapse">
                      <thead className="bg-indigo-50 text-indigo-950 font-black border-b border-indigo-200">
                        <tr>
                          {q.tableData.headers.map((h, i) => (
                            <th key={i} className="p-2 border-r border-indigo-200 last:border-r-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-800 font-mono">
                        {q.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-1.5 border-r border-slate-100 last:border-r-0">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {q.graphData && (
                  <SystemsGraphRenderer
                    graph={q.graphData}
                    showIntersectionPoint={true}
                  />
                )}

                {/* Option list */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isTheCorrectOpt = optIdx === q.correctIndex;

                    let optBg = 'bg-white border-slate-200 text-slate-700';
                    if (isTheCorrectOpt) {
                      optBg = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isUserPick) {
                      optBg = 'bg-rose-100 border-rose-500 text-rose-950';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border-2 text-xs flex items-center justify-between gap-2 ${optBg}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px] bg-white border border-slate-300">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isTheCorrectOpt && (
                          <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full">
                            Correct Answer
                          </span>
                        )}
                        {isUserPick && !isTheCorrectOpt && (
                          <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded-full">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs leading-relaxed">
                  <strong>Grade 8 Explanation:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE QUIZ VIEW (6 Questions)
  // ==========================================
  return (
    <div
      ref={quizContainerRef}
      id="staar-systems-quiz-container"
      className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-indigo-100">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200/70 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              TEKS 8.9A · STAAR Practice
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/70">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              36 Original STAAR-Style Questions
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
              <Sparkles className="w-3 h-3 text-amber-500" />
              6 Questions per Attempt
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            STAAR Practice: Systems of Linear Equations
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Solve systems of two linear equations by identifying intersections on coordinate planes, verifying ordered pairs, and modeling real-world problems.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Generate a fresh set of 6 questions"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>New Questions</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Select Question Focus:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleModeChange('mixed')}
            className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
              currentMode === 'mixed'
                ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                Mixed STAAR Review
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                36 Pool
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Balanced 6-question mix across graphs, verification, and word problems
            </p>
          </button>

          <button
            onClick={() => handleModeChange('graph-intersection')}
            className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
              currentMode === 'graph-intersection'
                ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                Graphing & Intersections
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                12 Bank
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Coordinate plane intersection identification on crisp integer grids
            </p>
          </button>

          <button
            onClick={() => handleModeChange('equations-apps')}
            className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
              currentMode === 'equations-apps'
                ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                Equations & Applications
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                24 Bank
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Solution verification, y = mx + b intersections, and real-world plans
            </p>
          </button>
        </div>
      </div>

      {/* Progress Dots Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
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
                    ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white shadow-xs scale-105'
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
          <span className="uppercase tracking-wider text-indigo-700 font-black">
            {currentQ.subtopic}
          </span>
          <span className="font-mono text-[11px] text-slate-400">ID: {currentQ.id}</span>
        </div>

        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Optional Context Box */}
        {currentQ.context && (
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono font-bold shadow-2xs">
            {currentQ.context}
          </div>
        )}

        {/* Optional Data Table */}
        {currentQ.tableData && (
          <div className="max-w-md mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-indigo-50 text-indigo-950 font-black border-b border-indigo-200">
                <tr>
                  {currentQ.tableData.headers.map((h, i) => (
                    <th key={i} className="p-2.5 border-r border-indigo-200 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800 font-mono">
                {currentQ.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 border-r border-slate-100 last:border-r-0">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Optional SVG Graph: Intersection marker hidden until student responds! */}
        {currentQ.graphData && (
          <SystemsGraphRenderer
            graph={currentQ.graphData}
            showIntersectionPoint={isCurrentAnswered}
          />
        )}

        {/* Multiple Choice Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const isCorrect = optIdx === currentQ.correctIndex;
            const showFeedback = isCurrentAnswered;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/30';

            if (showFeedback) {
              if (isCorrect) {
                optionStyle =
                  'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-1 ring-emerald-500';
              } else if (isSelected) {
                optionStyle = 'bg-rose-50 border-rose-600 text-rose-950';
              } else {
                optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-500/20';
            }

            return (
              <button
                key={optIdx}
                disabled={isCurrentAnswered}
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
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{optionText}</span>
                </div>

                {showFeedback && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Toggle */}
        {!isCurrentAnswered && (
          <div className="pt-1">
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 cursor-pointer"
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
        {isCurrentAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn space-y-1.5 ${
              selectedAnswers[currentIdx] === currentQ.correctIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="font-black flex items-center gap-1.5">
              {selectedAnswers[currentIdx] === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect.</span>
                  <span className="font-normal text-slate-700 ml-1">
                    The correct answer is{' '}
                    <strong>
                      {String.fromCharCode(65 + currentQ.correctIndex)}: {currentQ.options[currentQ.correctIndex]}
                    </strong>
                  </span>
                </>
              )}
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentIdx === 0}
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-xs font-bold text-slate-500">
          Question {currentIdx + 1} of {questions.length}
        </div>

        {currentIdx < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            disabled={answeredCount === 0}
            onClick={() => setIsCompleted(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-40"
          >
            Finish Attempt
            <Award className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
