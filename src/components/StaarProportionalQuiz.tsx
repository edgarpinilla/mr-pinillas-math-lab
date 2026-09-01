import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Target,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  TrendingUp,
  Layers,
  Check,
} from 'lucide-react';
import {
  STAAR_PROPORTIONAL_QUESTIONS,
  StaarPracticeQuestion,
  QuestionGraph,
  RelationshipType,
} from '../data/staar/staarQuestionsProportional';

export type StaarProportionalMode = 'proportional' | 'nonProportional' | 'mixed';

interface StaarProportionalQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

const STORAGE_SERVED_KEY_PREFIX = 'staar_unit2_served_ids_v1_';
const STORAGE_SELECTED_MODE_KEY = 'staar_unit2_selected_mode_v1';

function getStoredModeServedIds(mode: StaarProportionalMode): string[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_SERVED_KEY_PREFIX}${mode}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === 'string');
    }
  } catch {
    // ignore
  }
  return [];
}

function saveStoredModeServedIds(mode: StaarProportionalMode, ids: string[]): void {
  try {
    localStorage.setItem(`${STORAGE_SERVED_KEY_PREFIX}${mode}`, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

function getPoolForMode(mode: StaarProportionalMode): StaarPracticeQuestion[] {
  if (mode === 'proportional') {
    return STAAR_PROPORTIONAL_QUESTIONS.filter((q) => q.relationshipType === 'proportional');
  }
  if (mode === 'nonProportional') {
    return STAAR_PROPORTIONAL_QUESTIONS.filter((q) => q.relationshipType === 'nonProportional');
  }
  return STAAR_PROPORTIONAL_QUESTIONS;
}

/**
 * Generates 6 unique STAAR-style questions from the chosen mode pool.
 * - Filters by mode (Proportional, Non-Proportional, Mixed).
 * - Tracks served IDs to ensure zero repeats across consecutive attempts until pool is exhausted.
 * - Balances question representations (Graph, Table, Equation, Word Problem, Multiple Representation).
 * - Shuffles answer choices while preserving correct answer mapping.
 */
function generateStaarQuestions(
  mode: StaarProportionalMode,
  count: number = 6,
  previousIds: string[] = []
): StaarPracticeQuestion[] {
  const pool = getPoolForMode(mode);
  if (pool.length <= count) {
    return pool.map((q) => ({ ...q }));
  }

  const allIds = new Set(pool.map((q) => q.id));
  let servedIds = getStoredModeServedIds(mode).filter((id) => allIds.has(id));
  let servedSet = new Set(servedIds);

  let candidatePool = pool.filter((q) => !servedSet.has(q.id));

  // If candidate unserved pool is smaller than count, rollover cycle
  // carrying forward only the immediately previous attempt IDs to prevent immediate repeats
  if (candidatePool.length < count) {
    const carryForward = (previousIds.length > 0 ? previousIds : servedIds.slice(-count)).filter((id) =>
      allIds.has(id)
    );
    servedIds = [...carryForward];
    servedSet = new Set(servedIds);
    candidatePool = pool.filter((q) => !servedSet.has(q.id));
  }

  // Partition candidates by representation category
  const graphPool = candidatePool.filter((q) => q.category === 'graph');
  const tablePool = candidatePool.filter((q) => q.category === 'table');
  const eqPool = candidatePool.filter((q) => q.category === 'equation');
  const wordPool = candidatePool.filter((q) => q.category === 'word-problem');
  const multiPool = candidatePool.filter((q) => q.category === 'multiple-representation');

  const pickedSet = new Set<string>();
  const selected: StaarPracticeQuestion[] = [];

  const addFrom = (group: StaarPracticeQuestion[]) => {
    const candidates = group.filter((item) => !pickedSet.has(item.id));
    if (candidates.length > 0) {
      const item = candidates[Math.floor(Math.random() * candidates.length)];
      pickedSet.add(item.id);
      selected.push(item);
    }
  };

  // 1. Try to take 1 from each representation category available in candidates
  if (graphPool.length > 0) addFrom(graphPool);
  if (tablePool.length > 0) addFrom(tablePool);
  if (eqPool.length > 0) addFrom(eqPool);
  if (wordPool.length > 0) addFrom(wordPool);
  if (multiPool.length > 0) addFrom(multiPool);

  // 2. Fill remainder up to count from candidatePool
  const remainingCandidates = candidatePool
    .filter((item) => !pickedSet.has(item.id))
    .sort(() => Math.random() - 0.5);

  for (const item of remainingCandidates) {
    if (selected.length >= count) break;
    selected.push(item);
    pickedSet.add(item.id);
  }

  // Safety fallback if candidatePool alone was insufficient
  if (selected.length < count) {
    const fallbackCandidates = pool
      .filter((item) => !pickedSet.has(item.id))
      .sort(() => Math.random() - 0.5);
    for (const item of fallbackCandidates) {
      if (selected.length >= count) break;
      selected.push(item);
      pickedSet.add(item.id);
    }
  }

  // Persist updated served history for this mode
  const newlyServedIds = selected.map((q) => q.id);
  saveStoredModeServedIds(mode, [...servedIds, ...newlyServedIds]);

  // Shuffle presentation sequence
  const shuffledSelected = [...selected].sort(() => Math.random() - 0.5);

  // Shuffle answer options while maintaining correctIndex
  return shuffledSelected.map((q) => {
    const correctOptionText = q.options[q.correctIndex];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}

/**
 * High-Contrast SVG Coordinate Graph Renderer for STAAR questions
 */
const CoordinateGraphView: React.FC<{ graph: QuestionGraph }> = ({ graph }) => {
  const {
    title,
    xLabel,
    yLabel,
    xMin = 0,
    xMax,
    yMin = 0,
    yMax,
    xStep = 1,
    yStep = 10,
    lines,
    triangles,
  } = graph;

  const width = 440;
  const height = 300;
  const marginLeft = 56;
  const marginRight = 24;
  const marginTop = title ? 36 : 24;
  const marginBottom = 48;

  const plotWidth = width - marginLeft - marginRight;
  const plotHeight = height - marginTop - marginBottom;

  const toPxX = (x: number) => marginLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toPxY = (y: number) => marginTop + ((yMax - y) / (yMax - yMin)) * plotHeight;

  // Generate grid ticks
  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax + 0.0001; x += xStep) {
    xTicks.push(Math.round(x * 100) / 100);
  }

  const yTicks: number[] = [];
  for (let y = yMin; y <= yMax + 0.0001; y += yStep) {
    yTicks.push(Math.round(y * 100) / 100);
  }

  const colorMap: Record<string, { stroke: string; fill: string; bg: string }> = {
    emerald: { stroke: '#059669', fill: '#059669', bg: 'bg-emerald-500' },
    indigo: { stroke: '#4f46e5', fill: '#4f46e5', bg: 'bg-indigo-600' },
    rose: { stroke: '#e11d48', fill: '#e11d48', bg: 'bg-rose-600' },
    teal: { stroke: '#0d9488', fill: '#0d9488', bg: 'bg-teal-600' },
    amber: { stroke: '#d97706', fill: '#d97706', bg: 'bg-amber-600' },
    blue: { stroke: '#2563eb', fill: '#2563eb', bg: 'bg-blue-600' },
  };

  return (
    <div className="my-3 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
      {/* Optional Title */}
      {title && (
        <div className="text-center font-bold text-xs sm:text-sm text-slate-800 mb-2">
          {title}
        </div>
      )}

      {/* Legend if multiple lines exist */}
      {lines.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2 pb-2 border-b border-slate-100">
          {lines.map((line, idx) => {
            const c = colorMap[line.color || 'indigo'] || colorMap.indigo;
            return (
              <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                <span>{line.name || `Line ${idx + 1}`}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="relative w-full aspect-[44/30] overflow-hidden rounded-xl bg-slate-50/50">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          aria-label={title || 'Coordinate Graph'}
        >
          {/* Grid lines */}
          {xTicks.map((xVal) => (
            <line
              key={`grid-x-${xVal}`}
              x1={toPxX(xVal)}
              y1={marginTop}
              x2={toPxX(xVal)}
              y2={marginTop + plotHeight}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={xVal === 0 ? undefined : '2,2'}
            />
          ))}

          {yTicks.map((yVal) => (
            <line
              key={`grid-y-${yVal}`}
              x1={marginLeft}
              y1={toPxY(yVal)}
              x2={marginLeft + plotWidth}
              y2={toPxY(yVal)}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={yVal === 0 ? undefined : '2,2'}
            />
          ))}

          {/* Coordinate Axes */}
          {/* X Axis */}
          <line
            x1={marginLeft}
            y1={toPxY(0)}
            x2={marginLeft + plotWidth + 6}
            y2={toPxY(0)}
            stroke="#334155"
            strokeWidth="2"
          />
          {/* X Axis Arrow */}
          <polygon
            points={`${marginLeft + plotWidth + 10},${toPxY(0)} ${marginLeft + plotWidth + 4},${toPxY(0) - 4} ${marginLeft + plotWidth + 4},${toPxY(0) + 4}`}
            fill="#334155"
          />

          {/* Y Axis */}
          <line
            x1={toPxX(0)}
            y1={marginTop + plotHeight}
            x2={toPxX(0)}
            y2={marginTop - 6}
            stroke="#334155"
            strokeWidth="2"
          />
          {/* Y Axis Arrow */}
          <polygon
            points={`${toPxX(0)},${marginTop - 10} ${toPxX(0) - 4},${marginTop - 4} ${toPxX(0) + 4},${marginTop - 4}`}
            fill="#334155"
          />

          {/* X Axis Ticks and Numeric Labels */}
          {xTicks.map((xVal) => (
            <g key={`tick-x-${xVal}`}>
              <line
                x1={toPxX(xVal)}
                y1={toPxY(0) - 3}
                x2={toPxX(xVal)}
                y2={toPxY(0) + 3}
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text
                x={toPxX(xVal)}
                y={toPxY(0) + 16}
                textAnchor="middle"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
                fill="#475569"
              >
                {xVal}
              </text>
            </g>
          ))}

          {/* Y Axis Ticks and Numeric Labels */}
          {yTicks.map((yVal) => (
            <g key={`tick-y-${yVal}`}>
              <line
                x1={toPxX(0) - 3}
                y1={toPxY(yVal)}
                x2={toPxX(0) + 3}
                y2={toPxY(yVal)}
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text
                x={toPxX(0) - 8}
                y={toPxY(yVal) + 3.5}
                textAnchor="end"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
                fill="#475569"
              >
                {yVal}
              </text>
            </g>
          ))}

          {/* Slope Triangles if present */}
          {triangles &&
            triangles.map((tri, triIdx) => {
              const p1x = toPxX(tri.x1);
              const p1y = toPxY(tri.y1);
              const p2x = toPxX(tri.x2);
              const p2y = toPxY(tri.y1); // Corner of right triangle
              const p3x = toPxX(tri.x2);
              const p3y = toPxY(tri.y2);

              const rightAngleSize = 6;

              return (
                <g key={`tri-${triIdx}`}>
                  {/* Triangle Shading */}
                  <polygon
                    points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`}
                    fill="rgba(99, 102, 241, 0.14)"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  {/* Right angle corner box */}
                  <polyline
                    points={`${p2x - rightAngleSize},${p2y} ${p2x - rightAngleSize},${p2y - rightAngleSize} ${p2x},${p2y - rightAngleSize}`}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                  />
                  {/* Run Label */}
                  {tri.runLabel && (
                    <g>
                      <rect
                        x={(p1x + p2x) / 2 - 24}
                        y={p2y + 4}
                        width="48"
                        height="14"
                        rx="4"
                        fill="#ffffff"
                        fillOpacity="0.95"
                      />
                      <text
                        x={(p1x + p2x) / 2}
                        y={p2y + 15}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#4f46e5"
                      >
                        {tri.runLabel}
                      </text>
                    </g>
                  )}
                  {/* Rise Label */}
                  {tri.riseLabel && (
                    <g>
                      <rect
                        x={p3x + 4}
                        y={(p2y + p3y) / 2 - 7}
                        width="48"
                        height="14"
                        rx="4"
                        fill="#ffffff"
                        fillOpacity="0.95"
                      />
                      <text
                        x={p3x + 28}
                        y={(p2y + p3y) / 2 + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#4f46e5"
                      >
                        {tri.riseLabel}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

          {/* Graphed Lines */}
          {lines.map((line, lineIdx) => {
            const c = colorMap[line.color || 'indigo'] || colorMap.indigo;

            // Compute endpoints within graph bounds
            let xStart = xMin;
            let yStart = line.slope * xStart + line.intercept;
            if (yStart < yMin && line.slope !== 0) {
              yStart = yMin;
              xStart = (yMin - line.intercept) / line.slope;
            } else if (yStart > yMax && line.slope !== 0) {
              yStart = yMax;
              xStart = (yMax - line.intercept) / line.slope;
            }

            let xEnd = xMax;
            let yEnd = line.slope * xEnd + line.intercept;
            if (yEnd > yMax && line.slope !== 0) {
              yEnd = yMax;
              xEnd = (yMax - line.intercept) / line.slope;
            } else if (yEnd < yMin && line.slope !== 0) {
              yEnd = yMin;
              xEnd = (yMin - line.intercept) / line.slope;
            }

            return (
              <g key={`line-${lineIdx}`}>
                <line
                  x1={toPxX(xStart)}
                  y1={toPxY(yStart)}
                  x2={toPxX(xEnd)}
                  y2={toPxY(yEnd)}
                  stroke={c.stroke}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={line.dashed ? '6,4' : undefined}
                />

                {/* Points on this line */}
                {line.points &&
                  line.points.map((pt, ptIdx) => {
                    const px = toPxX(pt.x);
                    const py = toPxY(pt.y);

                    // Don't render points outside bounds
                    if (pt.x < xMin || pt.x > xMax || pt.y < yMin || pt.y > yMax) return null;

                    return (
                      <g key={`pt-${lineIdx}-${ptIdx}`}>
                        {/* Point halo */}
                        <circle
                          cx={px}
                          cy={py}
                          r={pt.highlight ? 8 : 6}
                          fill={pt.highlight ? '#fef08a' : '#ffffff'}
                          stroke={c.stroke}
                          strokeWidth="2.5"
                        />
                        <circle cx={px} cy={py} r={pt.highlight ? 4 : 3} fill={c.fill} />

                        {/* Point Coordinate Badge */}
                        {pt.label && (
                          <g>
                            <rect
                              x={px - 24}
                              y={py - 20}
                              width="48"
                              height="15"
                              rx="4"
                              fill="#1e293b"
                              fillOpacity="0.9"
                            />
                            <text
                              x={px}
                              y={py - 9}
                              textAnchor="middle"
                              fontSize="9"
                              fontFamily="ui-monospace, monospace"
                              fontWeight="bold"
                              fill="#ffffff"
                            >
                              {pt.label}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
              </g>
            );
          })}

          {/* X Axis Title */}
          <text
            x={marginLeft + plotWidth / 2}
            y={height - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#334155"
          >
            {xLabel}
          </text>

          {/* Y Axis Title */}
          <text
            x={14}
            y={marginTop + plotHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${marginTop + plotHeight / 2})`}
            fontSize="11"
            fontWeight="bold"
            fill="#334155"
          >
            {yLabel}
          </text>
        </svg>
      </div>
    </div>
  );
};

export const StaarProportionalQuiz: React.FC<StaarProportionalQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  const [currentMode, setCurrentMode] = useState<StaarProportionalMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTED_MODE_KEY);
      if (saved === 'proportional' || saved === 'nonProportional' || saved === 'mixed') {
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

  // Initialize questions on mount
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

  const handleModeChange = (newMode: StaarProportionalMode) => {
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

  const handleSelectOption = (optIdx: number) => {
    if (isCurrentAnswered || !currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
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
    const newQuestions = generateStaarQuestions(
      currentMode,
      6,
      previousQuestionIds
    );
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

  // Calculate score
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage =
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const activePoolCount =
    currentMode === 'proportional'
      ? STAAR_PROPORTIONAL_QUESTIONS.filter((q) => q.relationshipType === 'proportional').length
      : currentMode === 'nonProportional'
      ? STAAR_PROPORTIONAL_QUESTIONS.filter((q) => q.relationshipType === 'nonProportional').length
      : STAAR_PROPORTIONAL_QUESTIONS.length;

  const modeTitle =
    currentMode === 'proportional'
      ? 'Proportional Relationships'
      : currentMode === 'nonProportional'
      ? 'Non-Proportional Relationships'
      : 'Mixed Review';

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-emerald-200">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-slate-600 font-bold text-sm">Loading STAAR Practice Questions...</p>
      </div>
    );
  }

  // Summary View when completed
  if (isCompleted && !showReview) {
    const isPassing = scorePercentage >= 70;
    const isPerfect = scorePercentage === 100;

    return (
      <div
        ref={quizContainerRef}
        id="staar-proportional-completed-container"
        className="bg-white rounded-3xl border-2 border-emerald-200 shadow-md p-6 sm:p-8 space-y-6 animate-fadeIn"
      >
        {/* Results Header */}
        <div className="text-center space-y-3 pb-6 border-b border-emerald-100">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 mb-2">
            <Award className="w-12 h-12" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            STAAR {modeTitle} Practice Completed
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isPerfect
              ? 'Outstanding Mastery!'
              : isPassing
              ? `Great Job on ${modeTitle}!`
              : `Keep Practicing ${modeTitle}!`}
          </h3>

          <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
            {isPerfect
              ? 'You answered all 6 STAAR-style questions correctly. You have strong mastery of Grade 8 Proportional Relationships TEKS!'
              : isPassing
              ? 'You passed this STAAR practice session. Review your answers below or try another set to lock in your skills.'
              : 'Proportional and linear relationships require verifying if the ratio y/x is constant and if the graph passes through (0, 0). Review your explanations and practice again!'}
          </p>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-900">
              Score
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {scorePercentage}%
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {correctCount} of {questions.length} Correct
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-teal-900">
              Active Mode Pool
            </div>
            <div className="text-3xl font-black text-teal-600">
              {activePoolCount}
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              {modeTitle} ({STAAR_PROPORTIONAL_QUESTIONS.length} Total Bank)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-900">
              Standards Covered
            </div>
            <div className="text-3xl font-black text-indigo-600">6</div>
            <div className="text-[11px] text-slate-500 font-bold">
              8.4.A · 8.4.B · 8.4.C · 8.5.E · 8.5.F · 8.5.H
            </div>
          </div>
        </div>

        {/* Practice Mode Selector in Summary */}
        <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Select Next STAAR Practice Focus</span>
            <span className="text-[11px] font-bold text-emerald-700">Zero-Repeat Guaranteed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleModeChange('proportional')}
              className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                currentMode === 'proportional'
                  ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Proportional
                </span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    currentMode === 'proportional' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  11 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">y = kx, origin (0,0), unit rates</span>
            </button>

            <button
              onClick={() => handleModeChange('nonProportional')}
              className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                currentMode === 'nonProportional'
                  ? 'bg-purple-50 border-purple-600 text-purple-950 shadow-xs ring-2 ring-purple-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  Non-Proportional
                </span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    currentMode === 'nonProportional' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  17 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">y = mx + b, b ≠ 0, base fees</span>
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
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    currentMode === 'mixed' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  36 Bank
                </span>
              </div>
              <span className="text-[10px] text-slate-500">All 36 STAAR practice models</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="staar-proportional-practice-again-btn"
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again (New 6 Questions)
          </button>

          <button
            id="staar-proportional-review-answers-btn"
            onClick={() => setShowReview(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            Review Questions & Explanations
          </button>

          {onSwitchToSelfCheck && (
            <button
              id="staar-proportional-goto-selfcheck-btn"
              onClick={onSwitchToSelfCheck}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-emerald-200 hover:bg-emerald-50 text-emerald-950 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Switch to Self Check
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active Quiz or Review Mode Header Info
  return (
    <div
      ref={quizContainerRef}
      id="staar-proportional-active-container"
      className="bg-white rounded-3xl border-2 border-emerald-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200/70 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              Aligned to TEKS · STAAR-Style Practice
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Grade 8 Standards
            </span>
            {showReview && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
                Review Mode
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            STAAR Practice: {topicTitle}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            {showReview
              ? 'Review all 6 questions, student answers, and pedagogical explanations.'
              : `Currently practicing ${modeTitle}. Choose a mode below to customize your STAAR preparation.`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {showReview ? (
            <button
              onClick={() => setShowReview(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Score Summary
            </button>
          ) : (
            <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-black flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">Progress:</span>
              <span>
                {answeredCount}/{questions.length} Answered
              </span>
            </div>
          )}

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
            <span className="text-[11px] font-bold text-emerald-700">Zero-Repeat Guarantee</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Mode 1: Proportional Relationships */}
            <button
              id="staar-mode-proportional-btn"
              onClick={() => handleModeChange('proportional')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'proportional'
                  ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                  Proportional Relationships
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    currentMode === 'proportional'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  11 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Direct variation <code className="font-mono text-blue-800 font-bold">y = kx</code>, origin <code className="font-mono font-bold">(0,0)</code>, constant ratios & unit rates
              </p>
            </button>

            {/* Mode 2: Non-Proportional Relationships */}
            <button
              id="staar-mode-nonproportional-btn"
              onClick={() => handleModeChange('nonProportional')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'nonProportional'
                  ? 'bg-purple-50/90 border-purple-600 text-purple-950 shadow-sm ring-2 ring-purple-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600 shrink-0" />
                  Non-Proportional Relationships
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    currentMode === 'nonProportional'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  17 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Linear <code className="font-mono text-purple-800 font-bold">y = mx + b</code> (b ≠ 0), base fees, unequal ratios & initial values
              </p>
            </button>

            {/* Mode 3: Mixed Review */}
            <button
              id="staar-mode-mixed-btn"
              onClick={() => handleModeChange('mixed')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'mixed'
                  ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  Mixed Review
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    currentMode === 'mixed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  36 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                All 36 STAAR items combining proportional, non-proportional, & comparison models
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Question Progress Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isCorrect = isAnswered && selectedAnswers[idx] === q.correctIndex;
            const isCurrent = currentIdx === idx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(idx);
                  setShowHint(false);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-black text-xs transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110 z-10'
                    : ''
                } ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-slate-500">
          Question <span className="text-emerald-600 font-black">{currentIdx + 1}</span> of{' '}
          {questions.length}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="space-y-4">
        {/* Question Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">
              {currentQ.teksCode}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
              {currentQ.standardType} Standard
            </span>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Subtopic: <span className="font-bold text-slate-700">{currentQ.subtopic}</span>
          </span>
        </div>

        {/* Question Stem */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </p>

          {/* Context box if available */}
          {currentQ.context && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Given: {currentQ.context}</span>
            </div>
          )}

          {/* Table Data if available */}
          {currentQ.tableData && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full max-w-lg border-collapse text-xs text-left bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                <thead>
                  <tr className="bg-emerald-50 border-b border-emerald-100">
                    {currentQ.tableData.headers.map((header, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3 py-2 text-emerald-950 font-black tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentQ.tableData.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3 py-2 font-mono font-medium text-slate-800"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Render High-Contrast SVG Coordinate Graph if available */}
          {currentQ.graphData && <CoordinateGraphView graph={currentQ.graphData} />}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const isCorrectOption = optIdx === currentQ.correctIndex;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/40';

            if (isCurrentAnswered || showReview) {
              if (isCorrectOption) {
                optionStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
              } else if (isSelected) {
                optionStyle =
                  'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/20';
              } else {
                optionStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                id={`staar-proportional-option-${optIdx}`}
                disabled={isCurrentAnswered || showReview}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 w-full cursor-pointer ${optionStyle} ${
                  isCurrentAnswered || showReview ? 'cursor-default' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                      isCurrentAnswered || showReview
                        ? isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono tracking-tight text-slate-800">
                    {opt}
                  </span>
                </div>

                {(isCurrentAnswered || showReview) && (
                  <div>
                    {isCorrectOption ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback Box (Revealed upon answering or in Review Mode) */}
        {(isCurrentAnswered || showReview) && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 space-y-2 animate-fadeIn ${
              selectedAnswers[currentIdx] === currentQ.correctIndex
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-rose-50/70 border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedAnswers[currentIdx] === currentQ.correctIndex ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>
                    {selectedAnswers[currentIdx] !== undefined
                      ? 'Incorrect — Review Explanation:'
                      : 'Question Explanation:'}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Hint Box Toggle */}
        {!isCurrentAnswered && !showReview && (
          <div className="pt-1">
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{showHint ? 'Hide Teacher Hint' : 'Need a Hint?'}</span>
            </button>

            {showHint && (
              <div className="mt-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-medium animate-fadeIn">
                <span className="font-bold text-amber-900">Teacher Hint: </span>
                {currentQ.hint}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {showReview ? (
          <div className="flex items-center gap-2">
            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowReview(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Return to Summary</span>
              </button>
            )}
          </div>
        ) : isCurrentAnswered ? (
          <button
            id="staar-proportional-next-question-btn"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <span>
              {currentIdx === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">
            Select an answer to continue
          </span>
        )}
      </div>
    </div>
  );
};
