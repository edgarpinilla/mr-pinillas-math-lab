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
  BookOpen,
  Sliders,
  Check,
  Eye,
  Layers,
} from 'lucide-react';
import {
  STAAR_TRANSFORMATIONS_QUESTIONS,
  StaarPracticeQuestion,
  TransformationGraph,
} from '../data/staar/staarQuestionsTransformations';

interface StaarTransformationsQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

/**
 * High-contrast SVG Coordinate Plane & Geometric Figures Visualizer
 * Accurately displays pre-images, transformed images, axes, integer grid ticks,
 * and labeled vertex coordinates for Grade 8 STAAR Transformations.
 */
const TransformationGraphView: React.FC<{ graph: TransformationGraph }> = ({ graph }) => {
  const svgWidth = 440;
  const svgHeight = 360;
  const padding = 34;

  const xMin = graph.xMin ?? -8;
  const xMax = graph.xMax ?? 8;
  const yMin = graph.yMin ?? -8;
  const yMax = graph.yMax ?? 8;
  const xStep = graph.xStep ?? 2;
  const yStep = graph.yStep ?? 2;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding);
  const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * (svgHeight - 2 * padding);

  // Generate grid ticks
  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax; x += xStep) {
    xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = yMin; y <= yMax; y += yStep) {
    yTicks.push(y);
  }

  const colorPalette = {
    indigo: { stroke: '#4f46e5', fill: 'rgba(79, 70, 229, 0.18)', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-900', border: 'border-indigo-300' },
    emerald: { stroke: '#059669', fill: 'rgba(5, 150, 105, 0.18)', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-900', border: 'border-emerald-300' },
    rose: { stroke: '#e11d48', fill: 'rgba(225, 29, 72, 0.18)', badgeBg: 'bg-rose-100', badgeText: 'text-rose-900', border: 'border-rose-300' },
    amber: { stroke: '#d97706', fill: 'rgba(217, 119, 6, 0.18)', badgeBg: 'bg-amber-100', badgeText: 'text-amber-900', border: 'border-amber-300' },
    blue: { stroke: '#2563eb', fill: 'rgba(37, 99, 235, 0.18)', badgeBg: 'bg-blue-100', badgeText: 'text-blue-900', border: 'border-blue-300' },
    purple: { stroke: '#9333ea', fill: 'rgba(147, 51, 234, 0.18)', badgeBg: 'bg-purple-100', badgeText: 'text-purple-900', border: 'border-purple-300' },
    teal: { stroke: '#0d9488', fill: 'rgba(13, 148, 136, 0.18)', badgeBg: 'bg-teal-100', badgeText: 'text-teal-900', border: 'border-teal-300' },
    slate: { stroke: '#475569', fill: 'rgba(71, 85, 105, 0.18)', badgeBg: 'bg-slate-100', badgeText: 'text-slate-900', border: 'border-slate-300' },
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-3 sm:p-4 rounded-2xl border-2 border-indigo-100 shadow-sm space-y-3">
      {/* Title & Figure Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <span className="text-xs font-black text-slate-800 tracking-tight">
          {graph.title || 'Coordinate Plane Graph'}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {graph.figures.map((fig, fIdx) => {
            const theme = colorPalette[fig.color || (fIdx === 0 ? 'indigo' : 'emerald')];
            return (
              <span
                key={fIdx}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${theme.badgeBg} ${theme.badgeText} ${theme.border}`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.stroke }}
                />
                {fig.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative overflow-hidden rounded-xl bg-slate-50/70 border border-slate-200">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none"
          style={{ maxHeight: '340px' }}
        >
          <defs>
            {/* Axis arrow markers */}
            <marker id="axis-arrow-x" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
            </marker>
            <marker id="axis-arrow-y" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
            </marker>
            <marker id="axis-arrow-x-neg" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
              <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
            </marker>
            <marker id="axis-arrow-y-neg" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
              <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
            </marker>
          </defs>

          {/* Grid lines */}
          <g stroke="#e2e8f0" strokeWidth="1">
            {xTicks.map((x) => (
              <line
                key={`grid-x-${x}`}
                x1={toSvgX(x)}
                y1={padding}
                x2={toSvgX(x)}
                y2={svgHeight - padding}
              />
            ))}
            {yTicks.map((y) => (
              <line
                key={`grid-y-${y}`}
                x1={padding}
                y1={toSvgY(y)}
                x2={svgWidth - padding}
                y2={toSvgY(y)}
              />
            ))}
          </g>

          {/* X Axis & Y Axis */}
          <line
            x1={padding - 10}
            y1={toSvgY(0)}
            x2={svgWidth - padding + 10}
            y2={toSvgY(0)}
            stroke="#334155"
            strokeWidth="2"
            markerEnd="url(#axis-arrow-x)"
            markerStart="url(#axis-arrow-x-neg)"
          />
          <line
            x1={toSvgX(0)}
            y1={svgHeight - padding + 10}
            x2={toSvgX(0)}
            y2={padding - 10}
            stroke="#334155"
            strokeWidth="2"
            markerEnd="url(#axis-arrow-y)"
            markerStart="url(#axis-arrow-y-neg)"
          />

          {/* Axis Labels */}
          <text
            x={svgWidth - padding + 14}
            y={toSvgY(0) + 4}
            fill="#1e293b"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            x
          </text>
          <text
            x={toSvgX(0) + 4}
            y={padding - 14}
            fill="#1e293b"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            y
          </text>

          {/* Tick numbers on X-axis */}
          {xTicks.map((x) => {
            if (x === 0) return null;
            return (
              <g key={`tick-x-${x}`}>
                <line
                  x1={toSvgX(x)}
                  y1={toSvgY(0) - 3}
                  x2={toSvgX(x)}
                  y2={toSvgY(0) + 3}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <text
                  x={toSvgX(x)}
                  y={toSvgY(0) + 14}
                  fill="#64748b"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {x}
                </text>
              </g>
            );
          })}

          {/* Tick numbers on Y-axis */}
          {yTicks.map((y) => {
            if (y === 0) return null;
            return (
              <g key={`tick-y-${y}`}>
                <line
                  x1={toSvgX(0) - 3}
                  y1={toSvgY(y)}
                  x2={toSvgX(0) + 3}
                  y2={toSvgY(y)}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <text
                  x={toSvgX(0) - 6}
                  y={toSvgY(y) + 3}
                  fill="#64748b"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {y}
                </text>
              </g>
            );
          })}

          {/* Origin label */}
          <text
            x={toSvgX(0) - 8}
            y={toSvgY(0) + 12}
            fill="#64748b"
            fontSize="9"
            fontWeight="bold"
            textAnchor="end"
            fontFamily="monospace"
          >
            O
          </text>

          {/* Center of Dilation / Rotation point if provided */}
          {graph.centerPoint && (
            <g>
              <circle
                cx={toSvgX(graph.centerPoint.x)}
                cy={toSvgY(graph.centerPoint.y)}
                r="4"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Render Geometric Figures */}
          {graph.figures.map((fig, fIdx) => {
            const theme = colorPalette[fig.color || (fIdx === 0 ? 'indigo' : 'emerald')];
            const pointsString = fig.vertices
              .map((v) => `${toSvgX(v.x)},${toSvgY(v.y)}`)
              .join(' ');

            return (
              <g key={`fig-${fIdx}`}>
                {/* Polygon body */}
                <polygon
                  points={pointsString}
                  fill={theme.fill}
                  stroke={theme.stroke}
                  strokeWidth="2.5"
                  strokeDasharray={fig.isDashed ? '5,4' : undefined}
                  strokeLinejoin="round"
                />

                {/* Vertices and labels */}
                {fig.vertices.map((v, vIdx) => {
                  const vx = toSvgX(v.x);
                  const vy = toSvgY(v.y);
                  const lx = vx + (v.labelOffset?.dx ?? 0);
                  const ly = vy + (v.labelOffset?.dy ?? (vy < toSvgY(0) ? -10 : 12));

                  return (
                    <g key={`fig-${fIdx}-vert-${vIdx}`}>
                      {/* Vertex point */}
                      <circle
                        cx={vx}
                        cy={vy}
                        r="4"
                        fill={theme.stroke}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* Vertex label with halo */}
                      {v.label && (
                        <text
                          x={lx}
                          y={ly}
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          style={{
                            paintOrder: 'stroke',
                            stroke: '#ffffff',
                            strokeWidth: '3.5px',
                            strokeLinejoin: 'round',
                          }}
                        >
                          {v.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/** Helper to test if a question renders a coordinate plane graph */
function isGraphQuestion(q: StaarPracticeQuestion): boolean {
  return q.graphData !== undefined || q.category === 'graph';
}

/** Helper to test if a question requires algebraic transformation rule reasoning */
function isAlgebraicRuleQuestion(q: StaarPracticeQuestion): boolean {
  if (q.category === 'rule') return true;
  const qText = q.question.toLowerCase();
  const subtopic = q.subtopic.toLowerCase();
  if (
    qText.includes('algebraic rule') ||
    qText.includes('algebraic representation') ||
    subtopic.includes('rule')
  ) {
    return true;
  }
  return q.options.some((opt) => opt.includes('->') || opt.includes('→') || opt.includes('(x, y)'));
}

/** Helper to test if a question is a contextual word problem involving real-world situations */
function isContextualWordProblem(q: StaarPracticeQuestion): boolean {
  if (q.category === 'word-problem') return true;
  const qText = q.question.toLowerCase();
  const subtopic = q.subtopic.toLowerCase();
  return (
    subtopic.includes('context') ||
    subtopic.includes('navigation') ||
    subtopic.includes('symmetry') ||
    subtopic.includes('rotor') ||
    subtopic.includes('blueprint') ||
    qText.includes('robot') ||
    qText.includes('architect') ||
    qText.includes('designer') ||
    qText.includes('turbine') ||
    qText.includes('warehouse') ||
    qText.includes('floor plan') ||
    qText.includes('blade') ||
    qText.includes('logo')
  );
}

const STORAGE_KEY = 'staar_unit1_served_ids_v1';
const CYCLE_PLAN_KEY = 'staar_unit1_cycle_plan_v1';

/** Helper to read served question IDs from persistent storage */
function getStoredServedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id) => typeof id === 'string');
    }
  } catch (e) {
    console.error('Error reading STAAR served IDs from storage:', e);
  }
  return [];
}

/** Helper to write served question IDs to persistent storage */
function saveStoredServedIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Error saving STAAR served IDs to storage:', e);
  }
}

/** Helper to read active cycle plan (array of 6 blocks of question IDs) */
function getStoredCyclePlan(): string[][] | null {
  try {
    const raw = localStorage.getItem(CYCLE_PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 6 && parsed.every(block => Array.isArray(block) && block.length === 6)) {
      return parsed;
    }
  } catch (e) {
    console.error('Error reading STAAR cycle plan from storage:', e);
  }
  return null;
}

/** Helper to save cycle plan */
function saveStoredCyclePlan(plan: string[][]): void {
  try {
    localStorage.setItem(CYCLE_PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error('Error saving STAAR cycle plan to storage:', e);
  }
}

/**
 * Robustly partitions the 36 questions into 6 disjoint, balanced blocks of 6 questions.
 * Every block is guaranteed to satisfy:
 * - Exactly 6 unique questions (total across 6 blocks = 36 unique questions)
 * - At least 1 Translation, 1 Reflection, 1 Rotation, 1 Dilation
 * - At least 2 Coordinate-Plane Graph questions
 * - At least 1 Algebraic Transformation Rule question
 * - At least 1 Contextual Real-World Word Problem when available (assigned across 4 blocks)
 * - If lastAttemptIds is provided, Block 0 of the new cycle will have ZERO overlap with lastAttemptIds.
 */
function createFullCyclePartition(
  pool: StaarPracticeQuestion[],
  lastAttemptIds: string[] = []
): string[][] | null {
  const lastAttemptSet = new Set(lastAttemptIds);

  for (let trial = 0; trial < 300; trial++) {
    const blocks: StaarPracticeQuestion[][] = [[], [], [], [], [], []];
    const assignedIds = new Set<string>();

    // Step 1: Assign 1 contextual word problem to 4 different blocks
    const wordProblems = pool.filter(isContextualWordProblem).sort(() => Math.random() - 0.5);
    const wpBlockIndices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, wordProblems.length);
    wpBlockIndices.forEach((bIdx, i) => {
      blocks[bIdx].push(wordProblems[i]);
      assignedIds.add(wordProblems[i].id);
    });

    // Step 2: Ensure 1 of each transformation type in each block
    const types: Array<'translation' | 'reflection' | 'rotation' | 'dilation'> = [
      'translation',
      'reflection',
      'rotation',
      'dilation',
    ];

    let possible = true;
    for (const t of types) {
      const typeQuestions = pool.filter((q) => q.transformationType === t).sort(() => Math.random() - 0.5);
      for (let b = 0; b < 6; b++) {
        if (!blocks[b].some((q) => q.transformationType === t)) {
          const avail = typeQuestions.find((q) => !assignedIds.has(q.id));
          if (!avail) {
            possible = false;
            break;
          }
          blocks[b].push(avail);
          assignedIds.add(avail.id);
        }
      }
      if (!possible) break;
    }
    if (!possible) continue;

    // Step 3: Ensure at least 2 coordinate graphs per block
    const allGraphs = pool.filter(isGraphQuestion).sort(() => Math.random() - 0.5);
    for (let b = 0; b < 6; b++) {
      while (blocks[b].filter(isGraphQuestion).length < 2 && blocks[b].length < 6) {
        const avail = allGraphs.find((q) => !assignedIds.has(q.id));
        if (!avail) break;
        blocks[b].push(avail);
        assignedIds.add(avail.id);
      }
    }

    // Step 4: Ensure at least 1 algebraic rule per block
    const allRules = pool.filter(isAlgebraicRuleQuestion).sort(() => Math.random() - 0.5);
    for (let b = 0; b < 6; b++) {
      while (blocks[b].filter(isAlgebraicRuleQuestion).length < 1 && blocks[b].length < 6) {
        const avail = allRules.find((q) => !assignedIds.has(q.id));
        if (!avail) break;
        blocks[b].push(avail);
        assignedIds.add(avail.id);
      }
    }

    // Step 5: Distribute remaining unassigned questions to blocks that have < 6 items
    const remainingUnassigned = pool.filter((q) => !assignedIds.has(q.id)).sort(() => Math.random() - 0.5);
    for (const q of remainingUnassigned) {
      const targetBlock = blocks.find((b) => b.length < 6);
      if (targetBlock) {
        targetBlock.push(q);
        assignedIds.add(q.id);
      }
    }

    // Validate that every block satisfies all STAAR constraints and total 36 unique items
    const allValid = blocks.every((b) => {
      if (b.length !== 6) return false;
      const transCount = b.filter((q) => q.transformationType === 'translation').length;
      const refCount = b.filter((q) => q.transformationType === 'reflection').length;
      const rotCount = b.filter((q) => q.transformationType === 'rotation').length;
      const dilCount = b.filter((q) => q.transformationType === 'dilation').length;
      const graphCount = b.filter(isGraphQuestion).length;
      const ruleCount = b.filter(isAlgebraicRuleQuestion).length;
      return (
        transCount >= 1 &&
        refCount >= 1 &&
        rotCount >= 1 &&
        dilCount >= 1 &&
        graphCount >= 2 &&
        ruleCount >= 1
      );
    });

    if (allValid && assignedIds.size === pool.length) {
      // If lastAttemptIds was provided, ensure Block 0 has 0 intersection with lastAttemptIds
      if (lastAttemptSet.size > 0 && blocks[0].some((q) => lastAttemptSet.has(q.id))) {
        // Swap block 0 with another block that has 0 overlap with lastAttemptSet
        const nonOverlappingBlockIdx = blocks.findIndex(
          (b, idx) => idx > 0 && !b.some((q) => lastAttemptSet.has(q.id))
        );
        if (nonOverlappingBlockIdx !== -1) {
          const temp = blocks[0];
          blocks[0] = blocks[nonOverlappingBlockIdx];
          blocks[nonOverlappingBlockIdx] = temp;
        } else {
          continue;
        }
      }

      return blocks.map((b) => b.map((q) => q.id));
    }
  }

  return null;
}

/**
 * Generates the next 6 unique STAAR-style questions without repeating previously served questions.
 * - Reads and validates served question IDs from persistent storage (localStorage).
 * - Tracks a persistent 6-block cycle plan containing all 36 questions in balanced groups.
 * - Guarantees 0% overlap across Attempts 1 through 6 (exhausting the entire 36-question bank).
 * - Resets the cycle ONLY after all 36 questions have been served, ensuring 0% overlap between
 *   the final attempt of the old cycle and the first attempt of the new cycle.
 * - Shuffles presentation and answer choices with accurate correctIndex mapping.
 */
function generateStaarNextAttempt(
  pool: StaarPracticeQuestion[],
  count: number = 6
): StaarPracticeQuestion[] {
  if (pool.length <= count) {
    return pool.map((q) => ({ ...q }));
  }

  const poolMap = new Map<string, StaarPracticeQuestion>(pool.map((q) => [q.id, q]));
  const allIds = new Set(pool.map((q) => q.id));
  let servedIds = getStoredServedIds().filter((id) => allIds.has(id));
  let cyclePlan = getStoredCyclePlan();

  // Validate stored cycle plan against current pool
  const isCyclePlanValid =
    cyclePlan !== null &&
    cyclePlan.length === 6 &&
    cyclePlan.flat().length === pool.length &&
    new Set(cyclePlan.flat()).size === pool.length &&
    cyclePlan.flat().every((id) => allIds.has(id));

  // If cycle plan is missing or all 36 questions have been served, create a new cycle plan
  if (!isCyclePlanValid || servedIds.length >= pool.length) {
    const lastAttemptIds = servedIds.slice(-count);
    const newPlan = createFullCyclePartition(pool, lastAttemptIds);
    if (newPlan) {
      cyclePlan = newPlan;
      saveStoredCyclePlan(newPlan);
      servedIds = [];
    }
  }

  let selected: StaarPracticeQuestion[] = [];

  if (cyclePlan) {
    // Find the first block whose IDs have not yet been served in this cycle
    const servedSet = new Set(servedIds);
    const nextBlockIds = cyclePlan.find((block) => !block.some((id) => servedSet.has(id)));

    if (nextBlockIds && nextBlockIds.length === count) {
      selected = nextBlockIds
        .map((id) => poolMap.get(id))
        .filter((q): q is StaarPracticeQuestion => q !== undefined);
    }
  }

  // Safety fallback if ever needed
  if (!selected || selected.length !== count) {
    const immediatePreviousIds = servedIds.slice(-count);
    const safeCandidates = pool.filter((q) => !immediatePreviousIds.includes(q.id));
    selected = (safeCandidates.length >= count ? safeCandidates : pool)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  // Record newly served question IDs into persistent storage
  const newlyServedIds = selected.map((q) => q.id);
  const updatedServedIds = [...servedIds, ...newlyServedIds];
  saveStoredServedIds(updatedServedIds);

  // Shuffle presentation sequence
  const shuffledSelected = [...selected].sort(() => Math.random() - 0.5);

  // Shuffle answer options while maintaining accurate correctIndex mapping
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

export const StaarTransformationsQuiz: React.FC<StaarTransformationsQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  // Lazily initialize initial questions once on component mount
  const [questions, setQuestions] = useState<StaarPracticeQuestion[]>(() =>
    generateStaarNextAttempt(STAAR_TRANSFORMATIONS_QUESTIONS, 6)
  );
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const quizContainerRef = useRef<HTMLDivElement>(null);

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
    const newQuestions = generateStaarNextAttempt(
      STAAR_TRANSFORMATIONS_QUESTIONS,
      6
    );

    setQuestions(newQuestions);
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

  const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-indigo-200">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-slate-600 font-bold text-sm">Loading STAAR Practice Questions...</p>
      </div>
    );
  }

  // Full Review Screen when requested
  if (showReview) {
    return (
      <div
        ref={quizContainerRef}
        id="staar-quiz-review-container"
        className="bg-white rounded-3xl border-2 border-indigo-200 shadow-md p-6 sm:p-8 space-y-6 animate-fadeIn"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Practice Review & Explanations
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Transformations Attempt Review
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Score: <span className="font-bold text-indigo-600">{scorePercentage}%</span> ({correctCount}/{questions.length} Correct)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReview(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors cursor-pointer"
            >
              Back to Summary
            </button>
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Practice Again
            </button>
          </div>
        </div>

        {/* List of reviewed questions */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isUserCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 space-y-4 ${
                  isUserCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center ${
                        isUserCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-md">
                      {q.teksCode}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {q.subtopic}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full ${
                      isUserCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isUserCorrect ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </>
                    )}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {q.question}
                </p>

                {/* Graph View in Review if question has graphData */}
                {q.graphData && <TransformationGraphView graph={q.graphData} />}

                {/* Table Data in Review if available */}
                {q.tableData && (
                  <div className="overflow-x-auto">
                    <table className="w-full max-w-lg border-collapse text-xs text-left bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                      <thead>
                        <tr className="bg-indigo-50 border-b border-indigo-100">
                          {q.tableData.headers.map((header, hIdx) => (
                            <th key={hIdx} className="px-3 py-2 text-indigo-950 font-black">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {q.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3 py-2 font-mono font-medium text-slate-800">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Options in Review */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    const isCorrect = optIdx === q.correctIndex;
                    const letter = String.fromCharCode(65 + optIdx);

                    let itemStyle = 'bg-white border-slate-200 text-slate-700';
                    if (isCorrect) {
                      itemStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      itemStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${itemStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-slate-500">{letter}.</span>
                          <span className="font-mono">{opt}</span>
                        </div>
                        {isCorrect && <Check className="w-4 h-4 text-emerald-700" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
                  <span className="font-black text-indigo-900 block">Explanation:</span>
                  <p className="leading-relaxed font-medium">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
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
        id="staar-quiz-completed-container"
        className="bg-white rounded-3xl border-2 border-indigo-200 shadow-md p-6 sm:p-8 space-y-6 animate-fadeIn"
      >
        {/* Results Header */}
        <div className="text-center space-y-3 pb-6 border-b border-indigo-100">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-indigo-50 border-2 border-indigo-200 text-indigo-600 mb-2">
            <Award className="w-12 h-12" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            STAAR Practice Completed
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isPerfect
              ? 'Outstanding Mastery!'
              : isPassing
              ? 'Great Job on STAAR Practice!'
              : 'Keep Practicing Transformations!'}
          </h3>

          <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
            {isPerfect
              ? 'You answered all 6 STAAR-style questions correctly. You have strong mastery of Grade 8 Transformations TEKS!'
              : isPassing
              ? 'You passed this STAAR practice session. Review your answers below or try another set to lock in your skills.'
              : 'Transformations require careful attention to coordinate rules and scale factors. Review your explanations and practice again!'}
          </p>
        </div>

        {/* Score Cards Grid */}
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
              Question Pool
            </div>
            <div className="text-3xl font-black text-blue-600">
              {STAAR_TRANSFORMATIONS_QUESTIONS.length}
            </div>
            <div className="text-[11px] text-slate-500 font-bold">
              Original Grade 8 STAAR Items
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-purple-900">
              Standards
            </div>
            <div className="text-3xl font-black text-purple-600">3</div>
            <div className="text-[11px] text-slate-500 font-bold">
              TEKS 8.3.C · 8.10.B · 8.10.C
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="staar-practice-again-btn"
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again (New 6 Questions)
          </button>

          <button
            id="staar-review-answers-btn"
            onClick={() => setShowReview(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            Review Questions & Explanations
          </button>

          {onSwitchToSelfCheck && (
            <button
              id="staar-goto-selfcheck-btn"
              onClick={onSwitchToSelfCheck}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-950 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              Switch to Self Check
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active Quiz Mode
  return (
    <div
      ref={quizContainerRef}
      id="staar-quiz-active-container"
      className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200/70 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Aligned to TEKS · STAAR-Style Practice
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Grade 8 Standards
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            STAAR Practice: {topicTitle}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Practice STAAR-style questions aligned to this topic.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs font-black flex items-center gap-1.5">
            <span className="text-indigo-600 font-bold">Progress:</span>
            <span>
              {answeredCount}/{questions.length} Answered
            </span>
          </div>

          <button
            onClick={handleRestart}
            title="Generate new question set"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Progress Dots */}
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
                    ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110 z-10'
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
          Question <span className="text-indigo-600 font-black">{currentIdx + 1}</span> of {questions.length}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="space-y-4">
        {/* Question Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs">
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
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </p>

          {/* Context box if available */}
          {currentQ.context && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 text-xs font-bold">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span>Given: {currentQ.context}</span>
            </div>
          )}

          {/* Graphical Coordinate Plane View */}
          {currentQ.graphData && (
            <div className="pt-2">
              <TransformationGraphView graph={currentQ.graphData} />
            </div>
          )}

          {/* Table Data if available */}
          {currentQ.tableData && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full max-w-lg border-collapse text-xs text-left bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                <thead>
                  <tr className="bg-indigo-50 border-b border-indigo-100">
                    {currentQ.tableData.headers.map((header, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3 py-2 text-indigo-950 font-black tracking-wide"
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
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const isCorrectOption = optIdx === currentQ.correctIndex;

            let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40';

            if (isCurrentAnswered) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
              } else if (isSelected) {
                optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/20';
              } else {
                optionStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                id={`staar-option-${optIdx}`}
                disabled={isCurrentAnswered}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 w-full cursor-pointer ${optionStyle} ${
                  isCurrentAnswered ? 'cursor-default' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                      isCurrentAnswered
                        ? isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono tracking-tight text-slate-800">
                    {opt}
                  </span>
                </div>

                {isCurrentAnswered && (
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

        {/* Explanation & Hint Box (Revealed upon answering) */}
        {isCurrentAnswered && (
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
                  <span>Incorrect — Review Explanation:</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Hint Box Toggle */}
        {!isCurrentAnswered && (
          <div className="pt-1">
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
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
      <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          Previous
        </button>

        {isCurrentAnswered ? (
          <button
            id="staar-next-question-btn"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <span>{currentIdx === questions.length - 1 ? 'Finish Practice' : 'Next Question'}</span>
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
