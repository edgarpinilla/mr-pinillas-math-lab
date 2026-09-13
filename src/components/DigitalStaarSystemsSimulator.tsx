// src/components/DigitalStaarSystemsSimulator.tsx
// Complete 12-Question Technology-Enhanced Digital STAAR Simulator for Unit 4: Systems of Linear Equations
// TEKS 8.9A | 100% Client-side local architecture. Zero runtime API calls.

import React, { useState, useRef, useEffect } from 'react';
import {
  Laptop,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  BookOpen,
  Check,
  BarChart2,
  GripVertical,
  HelpCircle,
  Target,
  ArrowLeftRight,
  Sliders,
  Sparkles,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  UNIT_4_DIGITAL_STAAR_QUESTIONS,
  Unit4DigitalStaarQuestion,
  Q1GraphHotSpotSystems,
  Q2DragDropSystem,
  Q3InlineChoiceSystems,
  Q4NumericEntrySystems,
  Q5MultipleSelectSystems,
  Q6ClassificationSystems,
  Q7TableAnalysisSystems,
  Q8InteractiveGraphingSystems,
  Q9MatchingSystems,
  Q10ErrorAnalysisSystems,
  Q11MultiPartSystems,
  Q12SystemCompletionSystems,
} from '../data/staar/digitalStaarSystemsData';

interface DigitalStaarSystemsSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

export const DigitalStaarSystemsSimulator: React.FC<DigitalStaarSystemsSimulatorProps> = ({
  topicTitle = 'Systems of Linear Equations',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});
  const [attemptedQuestions, setAttemptedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Tap-to-place helper for Chromebook/touch devices
  const [activeSelectedTile, setActiveSelectedTile] = useState<string | null>(null);

  // Q6 Classification drag & drop / pointer states
  const [q6DraggedCardId, setQ6DraggedCardId] = useState<string | null>(null);
  const [q6DragOverZone, setQ6DragOverZone] = useState<string | null>(null);
  const [q6PointerPos, setQ6PointerPos] = useState<{ x: number; y: number } | null>(null);
  const [q6IsPointerDragging, setQ6IsPointerDragging] = useState<boolean>(false);
  const q6PointerDownRef = useRef<{ startX: number; startY: number; cardId: string } | null>(null);

  // Q2 Drag & drop states
  const [q2DraggedTile, setQ2DraggedTile] = useState<string | null>(null);
  const [q2HoveredSlot, setQ2HoveredSlot] = useState<'eq1' | 'eq2' | null>(null);

  // Q8 Interactive Graphing quick coordinate state
  const [q8QuickX, setQ8QuickX] = useState<number>(0);
  const [q8QuickY, setQ8QuickY] = useState<number>(5);

  const currentQ = UNIT_4_DIGITAL_STAAR_QUESTIONS[currentIndex];
  const isCurrentCompleted = !!completedQuestions[currentIndex];
  const isCurrentAttempted = !!attemptedQuestions[currentIndex];
  const isCurrentFeedbackVisible = isCurrentCompleted || isCurrentAttempted;
  const isCurrentCorrect = isCurrentCompleted;
  const currentAnswer = answers[currentIndex];

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = UNIT_4_DIGITAL_STAAR_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'graph-hot-spot': {
        const qTyped = q as Q1GraphHotSpotSystems;
        const selected = qTyped.points.find((p) => p.id === ans.selectedId);
        return !!selected && selected.isCorrect;
      }

      case 'drag-drop-system': {
        const qTyped = q as Q2DragDropSystem;
        const eq1Correct = ans.eq1 === qTyped.correctEq1;
        const eq2Correct = ans.eq2 === qTyped.correctEq2;
        const followUpCorrect = ans.followUp === qTyped.correctFollowUp;
        return eq1Correct && eq2Correct && followUpCorrect;
      }

      case 'inline-choice': {
        const qTyped = q as Q3InlineChoiceSystems;
        return (
          ans.dropdown1 === qTyped.correctDropdown1 &&
          ans.dropdown2 === qTyped.correctDropdown2 &&
          ans.dropdown3 === qTyped.correctDropdown3
        );
      }

      case 'numeric-entry': {
        const qTyped = q as Q4NumericEntrySystems;
        const xStr = (ans.x || '').toString().trim();
        const yStr = (ans.y || '').toString().trim();
        const xMatch = qTyped.acceptedX.includes(xStr);
        const yMatch = qTyped.acceptedY.includes(yStr);
        return xMatch && yMatch;
      }

      case 'multiple-select': {
        const qTyped = q as Q5MultipleSelectSystems;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }

      case 'classification': {
        const qTyped = q as Q6ClassificationSystems;
        const assignments: Record<string, string> = ans.assignments || {};
        return qTyped.cards.every((card) => assignments[card.id] === card.correctCategory);
      }

      case 'table-analysis': {
        const qTyped = q as Q7TableAnalysisSystems;
        return ans.selectedX === qTyped.correctX && ans.followUp === qTyped.correctFollowUp;
      }

      case 'interactive-graphing': {
        const qTyped = q as Q8InteractiveGraphingSystems;
        const pts: [number, number][] = ans.plottedPoints || [];
        const twoValidPoints =
          pts.length === 2 &&
          pts[0][0] !== pts[1][0] &&
          pts.every(([x, y]) => Math.abs(y - (-0.5 * x + 5)) < 0.001);
        return twoValidPoints && ans.selectedIntersection === qTyped.correctIntersectionText;
      }

      case 'matching': {
        const qTyped = q as Q9MatchingSystems;
        const matches: Record<string, string> = ans.matches || {};
        return qTyped.systems.every((s) => matches[s.id] === s.correctSolutionId);
      }

      case 'error-analysis': {
        const qTyped = q as Q10ErrorAnalysisSystems;
        const selected: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selected.length !== correctIds.length) return false;
        return correctIds.every((id) => selected.includes(id));
      }

      case 'multi-part': {
        const qTyped = q as Q11MultiPartSystems;
        return ans.partA === qTyped.partACorrect && ans.partB === qTyped.partBCorrect;
      }

      case 'system-completion': {
        const qTyped = q as Q12SystemCompletionSystems;
        const task1Ok =
          ans.task1Slope === qTyped.task1CorrectSlope &&
          ans.task1Intercept === qTyped.task1CorrectIntercept;
        const task2Ok =
          ans.task2Coeff === qTyped.task2CorrectCoefficient &&
          ans.task2Const === qTyped.task2CorrectConstant;
        const task3Ok = ans.task3Slope === qTyped.task3CorrectSlope;
        return task1Ok && task2Ok && task3Ok;
      }

      default:
        return false;
    }
  };

  const isAnswerProvided = (): boolean => {
    const ans = answers[currentIndex];
    if (!ans) return false;

    switch (currentQ.type) {
      case 'graph-hot-spot':
        return !!ans.selectedId;
      case 'drag-drop-system':
        return !!(ans.eq1 && ans.eq2 && ans.followUp);
      case 'inline-choice':
        return !!(ans.dropdown1 && ans.dropdown2 && ans.dropdown3);
      case 'numeric-entry':
        return !!((ans.x || '').toString().trim() && (ans.y || '').toString().trim());
      case 'multiple-select':
        return Array.isArray(ans.selected) && ans.selected.length > 0;
      case 'classification': {
        const qTyped = currentQ as Q6ClassificationSystems;
        const assignments = ans.assignments || {};
        return qTyped.cards.every((c) => !!assignments[c.id]);
      }
      case 'table-analysis':
        return ans.selectedX !== undefined && !!ans.followUp;
      case 'interactive-graphing':
        return (ans.plottedPoints?.length === 2) && !!ans.selectedIntersection;
      case 'matching': {
        const qTyped = currentQ as Q9MatchingSystems;
        const matches = ans.matches || {};
        return qTyped.systems.every((s) => !!matches[s.id]);
      }
      case 'error-analysis':
        return Array.isArray(ans.selected) && ans.selected.length === 2;
      case 'multi-part':
        return !!(ans.partA && ans.partB);
      case 'system-completion':
        return !!(
          ans.task1Slope &&
          ans.task1Intercept &&
          ans.task2Coeff &&
          ans.task2Const &&
          ans.task3Slope
        );
      default:
        return false;
    }
  };

  const handleSubmitCurrent = () => {
    if (!isAnswerProvided()) return;
    const isCorrect = gradeQuestion(currentIndex);
    setAttemptedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
    if (isCorrect) {
      setCompletedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
    }
  };

  const handleNext = () => {
    setActiveSelectedTile(null);
    setQ2DraggedTile(null);
    setQ2HoveredSlot(null);
    setQ6DraggedCardId(null);
    setQ6DragOverZone(null);
    if (currentIndex < UNIT_4_DIGITAL_STAAR_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setResultsView(true);
    }
  };

  const handlePrev = () => {
    setActiveSelectedTile(null);
    setQ2DraggedTile(null);
    setQ2HoveredSlot(null);
    setQ6DraggedCardId(null);
    setQ6DragOverZone(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setCompletedQuestions({});
    setAttemptedQuestions({});
    setAnswers({});
    setCurrentIndex(0);
    setResultsView(false);
    setActiveSelectedTile(null);
  };

  const totalQuestions = UNIT_4_DIGITAL_STAAR_QUESTIONS.length;
  const correctCount = Object.keys(completedQuestions).length;
  const attemptedCount = Object.keys(attemptedQuestions).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="space-y-6" id="unit4-digital-staar-simulator">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-cyan-800/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Texas Grade 8 STAAR TEKS 8.9A
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Interactive Technology-Enhanced Items
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Laptop className="w-6 h-6 text-cyan-400" />
              Unit 4: Systems of Linear Equations Digital STAAR Simulator
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/80 mt-1 max-w-2xl">
              Real-world break-even models, dual-line coordinate intersections, and multi-representation systems formatted for TEA STAAR technology-enhanced standards.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormulaSheet(!showFormulaSheet)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
            >
              <BookOpen className="w-4 h-4 text-cyan-300" />
              <span>{showFormulaSheet ? 'Hide Reference' : 'STAAR Reference'}</span>
            </button>
            {onSwitchPathway && (
              <button
                onClick={() => onSwitchPathway('self-check')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Switch Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Formula Sheet Reference Drawer */}
        {showFormulaSheet && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-200 animate-fadeIn space-y-2">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>STAAR Grade 8 Systems of Linear Equations Reference</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold text-white block">One Unique Solution:</span>
                <span className="text-cyan-200 block text-[11px] mt-0.5">m₁ ≠ m₂</span>
                <p className="text-[10px] text-slate-300 mt-1">
                  Lines have different slopes and intersect at exactly one shared coordinate point (x, y).
                </p>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold text-white block">No Solution:</span>
                <span className="text-amber-200 block text-[11px] mt-0.5">m₁ = m₂ and b₁ ≠ b₂</span>
                <p className="text-[10px] text-slate-300 mt-1">
                  Lines have identical slopes with different y-intercepts. They are parallel and never cross.
                </p>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold text-white block">Infinitely Many Solutions:</span>
                <span className="text-emerald-200 block text-[11px] mt-0.5">m₁ = m₂ and b₁ = b₂</span>
                <p className="text-[10px] text-slate-300 mt-1">
                  Both equations represent the exact same line on the coordinate plane; every point is shared.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Question Selector Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1">
          {UNIT_4_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isCompleted = !!completedQuestions[idx];
            const isAttempted = !!attemptedQuestions[idx] && !isCompleted;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setResultsView(false);
                }}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-white ring-offset-2 ring-offset-slate-900 shadow-md'
                    : isCompleted
                    ? 'bg-emerald-500/80 text-white hover:bg-emerald-500'
                    : isAttempted
                    ? 'bg-amber-500/80 text-white hover:bg-amber-500'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
                title={`Question ${idx + 1}: ${q.typeLabel}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      {resultsView ? (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="text-center max-w-md mx-auto space-y-3">
            <div className="inline-flex p-4 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Simulator Session Summary
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You answered <span className="font-bold text-cyan-600">{correctCount}</span> of{' '}
              <span className="font-bold">{totalQuestions}</span> questions correctly ({scorePercent}%).
            </p>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-cyan-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${scorePercent}%` }}
              />
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Simulator</span>
              </button>
              <button
                onClick={() => setResultsView(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-2 cursor-pointer"
              >
                <span>Review Questions</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Single Question View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentQ.typeLabel}
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                TEKS {currentQ.teks}
              </span>
            </div>

            {isCurrentCompleted && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>

          {/* Question Prompt */}
          <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.prompt}
          </div>

          {/* Interactive Question Body */}
          <div className="space-y-6">
            {/* Q1: Graph Hot Spot */}
            {currentQ.type === 'graph-hot-spot' && (
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  {/* SVG Coordinate Grid */}
                  <div className="relative w-full max-w-md aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-inner">
                    <svg viewBox="-1.5 -4.5 9 12.5" className="w-full h-full select-none">
                      {/* Grid Lines */}
                      {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((y) => (
                        <line
                          key={`gy-${y}`}
                          x1={-1}
                          y1={y}
                          x2={7}
                          y2={y}
                          stroke={y === 0 ? '#475569' : '#e2e8f0'}
                          strokeWidth={y === 0 ? 0.08 : 0.03}
                          className="dark:stroke-slate-800"
                        />
                      ))}
                      {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map((x) => (
                        <line
                          key={`gx-${x}`}
                          x1={x}
                          y1={-4}
                          x2={x}
                          y2={7.5}
                          stroke={x === 0 ? '#475569' : '#e2e8f0'}
                          strokeWidth={x === 0 ? 0.08 : 0.03}
                          className="dark:stroke-slate-800"
                        />
                      ))}

                      {/* Axes */}
                      <line x1={-1} y1={0} x2={7} y2={0} stroke="#334155" strokeWidth={0.08} />
                      <line x1={0} y1={-4} x2={0} y2={7.5} stroke="#334155" strokeWidth={0.08} />

                      {/* Line 1: y = 2x - 3 (Plotted in SVG: invert y by multiplying by -1) */}
                      {/* Transform coordinates for SVG y-down */}
                      <g transform="scale(1, -1)">
                        <line
                          x1={-0.5}
                          y1={2 * -0.5 - 3}
                          x2={5}
                          y2={2 * 5 - 3}
                          stroke="#6366f1"
                          strokeWidth={0.12}
                        />
                        {/* Line 2: y = -x + 6 */}
                        <line
                          x1={-0.5}
                          y1={-(-0.5) + 6}
                          x2={6.5}
                          y2={-6.5 + 6}
                          stroke="#f43f5e"
                          strokeWidth={0.12}
                        />

                        {/* Hot Spot Points */}
                        {(currentQ as Q1GraphHotSpotSystems).points.map((pt) => {
                          const isSelected = currentAnswer?.selectedId === pt.id;
                          return (
                            <g
                              key={pt.id}
                              onClick={() => {
                                if (isCurrentCompleted) return;
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { selectedId: pt.id },
                                }));
                              }}
                              className="cursor-pointer group"
                            >
                              {/* Hit target radius */}
                              <circle cx={pt.x} cy={pt.y} r={0.5} fill="transparent" />
                              {/* Outer ring */}
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={isSelected ? 0.32 : 0.22}
                                fill={isSelected ? '#06b6d4' : '#ffffff'}
                                stroke={isSelected ? '#0891b2' : '#475569'}
                                strokeWidth={0.06}
                                className="transition-all"
                              />
                              {/* Center dot */}
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={0.1}
                                fill={isSelected ? '#ffffff' : '#0f172a'}
                              />
                            </g>
                          );
                        })}
                      </g>

                      {/* Coordinate Labels for Points (non-inverted) */}
                      {(currentQ as Q1GraphHotSpotSystems).points.map((pt) => {
                        const isSelected = currentAnswer?.selectedId === pt.id;
                        return (
                          <text
                            key={`lbl-${pt.id}`}
                            x={pt.x + 0.25}
                            y={-pt.y - 0.2}
                            fontSize="0.4"
                            fontWeight="bold"
                            fill={isSelected ? '#0891b2' : '#475569'}
                            className="select-none font-mono"
                          >
                            {pt.label}
                          </text>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Graph Legend & Point Selector Buttons (Chromebook Accessible) */}
                  <div className="space-y-4 max-w-sm">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-indigo-500 rounded-full" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Line 1: {(currentQ as Q1GraphHotSpotSystems).equation1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-rose-500 rounded-full" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Line 2: {(currentQ as Q1GraphHotSpotSystems).equation2}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Select Intersection Coordinate:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {(currentQ as Q1GraphHotSpotSystems).points.map((pt) => {
                          const isSelected = currentAnswer?.selectedId === pt.id;
                          return (
                            <button
                              key={pt.id}
                              disabled={isCurrentCompleted}
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { selectedId: pt.id },
                                }))
                              }
                              className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-500/20'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                            >
                              <span>{pt.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q2: Drag & Drop System Modeling */}
            {currentQ.type === 'drag-drop-system' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
                  {/* Slots */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Slot 1 */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setQ2HoveredSlot('eq1');
                      }}
                      onDragLeave={() => setQ2HoveredSlot(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (q2DraggedTile) {
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], eq1: q2DraggedTile },
                          }));
                        }
                        setQ2HoveredSlot(null);
                        setQ2DraggedTile(null);
                      }}
                      onClick={() => {
                        if (activeSelectedTile) {
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], eq1: activeSelectedTile },
                          }));
                          setActiveSelectedTile(null);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 border-dashed transition flex flex-col justify-between min-h-[110px] cursor-pointer ${
                        currentAnswer?.eq1
                          ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-400 text-cyan-950 dark:text-cyan-200'
                          : q2HoveredSlot === 'eq1'
                          ? 'bg-cyan-100/60 border-cyan-500 ring-2 ring-cyan-400'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-cyan-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                        {(currentQ as Q2DragDropSystem).eq1Label}
                      </span>
                      {currentAnswer?.eq1 ? (
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-base font-black text-cyan-900 dark:text-cyan-200">
                            {currentAnswer.eq1}
                          </span>
                          {!isCurrentCompleted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { ...prev[currentIndex], eq1: undefined },
                                }));
                              }}
                              className="text-xs text-rose-500 hover:text-rose-700 font-bold ml-2"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 italic mt-2">
                          Drag tile here or click tile then click slot
                        </div>
                      )}
                    </div>

                    {/* Slot 2 */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setQ2HoveredSlot('eq2');
                      }}
                      onDragLeave={() => setQ2HoveredSlot(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (q2DraggedTile) {
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], eq2: q2DraggedTile },
                          }));
                        }
                        setQ2HoveredSlot(null);
                        setQ2DraggedTile(null);
                      }}
                      onClick={() => {
                        if (activeSelectedTile) {
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], eq2: activeSelectedTile },
                          }));
                          setActiveSelectedTile(null);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 border-dashed transition flex flex-col justify-between min-h-[110px] cursor-pointer ${
                        currentAnswer?.eq2
                          ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-400 text-cyan-950 dark:text-cyan-200'
                          : q2HoveredSlot === 'eq2'
                          ? 'bg-cyan-100/60 border-cyan-500 ring-2 ring-cyan-400'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-cyan-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                        {(currentQ as Q2DragDropSystem).eq2Label}
                      </span>
                      {currentAnswer?.eq2 ? (
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-base font-black text-cyan-900 dark:text-cyan-200">
                            {currentAnswer.eq2}
                          </span>
                          {!isCurrentCompleted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { ...prev[currentIndex], eq2: undefined },
                                }));
                              }}
                              className="text-xs text-rose-500 hover:text-rose-700 font-bold ml-2"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 italic mt-2">
                          Drag tile here or click tile then click slot
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tile Bank */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Equation Tiles (Drag or Tap to Select):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(currentQ as Q2DragDropSystem).availableTiles.map((tile) => {
                        const isPlaced =
                          currentAnswer?.eq1 === tile || currentAnswer?.eq2 === tile;
                        const isSelected = activeSelectedTile === tile;

                        return (
                          <div
                            key={tile}
                            draggable={!isCurrentCompleted && !isPlaced}
                            onDragStart={() => setQ2DraggedTile(tile)}
                            onDragEnd={() => setQ2DraggedTile(null)}
                            onClick={() => {
                              if (isCurrentCompleted || isPlaced) return;
                              setActiveSelectedTile(isSelected ? null : tile);
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition flex items-center justify-between select-none cursor-pointer ${
                              isPlaced
                                ? 'opacity-30 bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-cyan-500 text-white border-cyan-600 ring-2 ring-cyan-400 shadow-sm'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40'
                            }`}
                          >
                            <span>{tile}</span>
                            <GripVertical className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Follow-up Solution Question */}
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {(currentQ as Q2DragDropSystem).followUpPrompt}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(currentQ as Q2DragDropSystem).followUpOptions.map((opt) => {
                        const isSelected = currentAnswer?.followUp === opt;
                        return (
                          <button
                            key={opt}
                            disabled={isCurrentCompleted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], followUp: opt },
                              }))
                            }
                            className={`p-2.5 rounded-xl text-xs font-medium text-left border transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 font-bold ring-1 ring-cyan-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q3: Inline Choice */}
            {currentQ.type === 'inline-choice' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 leading-loose text-sm text-slate-800 dark:text-slate-200">
                  <span>{(currentQ as Q3InlineChoiceSystems).sentenceBefore1}</span>
                  <select
                    disabled={isCurrentCompleted}
                    value={currentAnswer?.dropdown1 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentIndex]: { ...prev[currentIndex], dropdown1: e.target.value },
                      }))
                    }
                    className="inline-block mx-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300 shadow-xs"
                  >
                    <option value="">[ Select duration ]</option>
                    {(currentQ as Q3InlineChoiceSystems).dropdown1Options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <span>{(currentQ as Q3InlineChoiceSystems).sentenceBefore2}</span>
                  <select
                    disabled={isCurrentCompleted}
                    value={currentAnswer?.dropdown2 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentIndex]: { ...prev[currentIndex], dropdown2: e.target.value },
                      }))
                    }
                    className="inline-block mx-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300 shadow-xs"
                  >
                    <option value="">[ Select cost ]</option>
                    {(currentQ as Q3InlineChoiceSystems).dropdown2Options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <span>{(currentQ as Q3InlineChoiceSystems).sentenceBefore3}</span>
                  <select
                    disabled={isCurrentCompleted}
                    value={currentAnswer?.dropdown3 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentIndex]: { ...prev[currentIndex], dropdown3: e.target.value },
                      }))
                    }
                    className="inline-block mx-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300 shadow-xs"
                  >
                    <option value="">[ Select plan ]</option>
                    {(currentQ as Q3InlineChoiceSystems).dropdown3Options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span>{(currentQ as Q3InlineChoiceSystems).sentenceAfter3}</span>
                </div>
              </div>
            )}

            {/* Q4: Numeric Entry */}
            {currentQ.type === 'numeric-entry' && (
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  {/* SVG Coordinate Grid */}
                  <div className="relative w-full max-w-sm aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-inner">
                    <svg viewBox="-2.5 -4.5 9 11" className="w-full h-full select-none">
                      {/* Grid Lines */}
                      {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((y) => (
                        <line
                          key={`gy-${y}`}
                          x1={-2}
                          y1={y}
                          x2={6}
                          y2={y}
                          stroke={y === 0 ? '#475569' : '#e2e8f0'}
                          strokeWidth={y === 0 ? 0.08 : 0.03}
                          className="dark:stroke-slate-800"
                        />
                      ))}
                      {[-2, -1, 0, 1, 2, 3, 4, 5, 6].map((x) => (
                        <line
                          key={`gx-${x}`}
                          x1={x}
                          y1={-4}
                          x2={x}
                          y2={6}
                          stroke={x === 0 ? '#475569' : '#e2e8f0'}
                          strokeWidth={x === 0 ? 0.08 : 0.03}
                          className="dark:stroke-slate-800"
                        />
                      ))}

                      {/* Axes */}
                      <line x1={-2} y1={0} x2={6} y2={0} stroke="#334155" strokeWidth={0.08} />
                      <line x1={0} y1={-4} x2={0} y2={6} stroke="#334155" strokeWidth={0.08} />

                      {/* Inverted group for y-up math */}
                      <g transform="scale(1, -1)">
                        {/* Line p: y = -x + 4 */}
                        <line x1={-1} y1={5} x2={5} y2={-1} stroke="#0ea5e9" strokeWidth={0.12} />
                        {/* Line q: y = 2x - 2 */}
                        <line x1={-1} y1={-4} x2={4} y2={6} stroke="#8b5cf6" strokeWidth={0.12} />

                        {/* Plotted Points for visual clarity */}
                        <circle cx={0} cy={4} r={0.16} fill="#0ea5e9" stroke="#fff" strokeWidth={0.04} />
                        <circle cx={3} cy={1} r={0.16} fill="#0ea5e9" stroke="#fff" strokeWidth={0.04} />
                        <circle cx={0} cy={-2} r={0.16} fill="#8b5cf6" stroke="#fff" strokeWidth={0.04} />
                        <circle cx={2} cy={2} r={0.2} fill="#06b6d4" stroke="#fff" strokeWidth={0.05} />
                      </g>
                    </svg>
                  </div>

                  {/* Two-field Gridded Entry */}
                  <div className="space-y-4 max-w-xs w-full">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Line p: passes through (0, 4) & (3, 1)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Line q: passes through (0, -2) & (2, 2)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Enter Solution Coordinates:
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 space-y-1">
                          <label className="text-xs font-mono font-bold text-slate-500">x-value</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            disabled={isCurrentCompleted}
                            value={currentAnswer?.x || ''}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], x: e.target.value },
                              }))
                            }
                            placeholder="x"
                            className="w-full px-3 py-2 text-center font-mono font-black text-base rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="text-xs font-mono font-bold text-slate-500">y-value</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            disabled={isCurrentCompleted}
                            value={currentAnswer?.y || ''}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], y: e.target.value },
                              }))
                            }
                            placeholder="y"
                            className="w-full px-3 py-2 text-center font-mono font-black text-base rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q5: Multiple Select */}
            {currentQ.type === 'multiple-select' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  {(currentQ as Q5MultipleSelectSystems).options.map((opt) => {
                    const selectedList: string[] = currentAnswer?.selected || [];
                    const isChecked = selectedList.includes(opt.id);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (isCurrentCompleted) return;
                          const next = isChecked
                            ? selectedList.filter((id) => id !== opt.id)
                            : [...selectedList, opt.id];
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { selected: next },
                          }));
                        }}
                        className={`p-3.5 rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-400 text-cyan-950 dark:text-cyan-200'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          disabled={isCurrentCompleted}
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q6: Classification / Card Sorting */}
            {currentQ.type === 'classification' && (
              <div className="space-y-5">
                {/* Category Buckets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(currentQ as Q6ClassificationSystems).categories.map((cat) => {
                    const assignedCards = (currentQ as Q6ClassificationSystems).cards.filter(
                      (c) => (currentAnswer?.assignments || {})[c.id] === cat.id
                    );
                    const isHovered = q6DragOverZone === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setQ6DragOverZone(cat.id);
                        }}
                        onDragLeave={() => setQ6DragOverZone(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (q6DraggedCardId) {
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                assignments: {
                                  ...(prev[currentIndex]?.assignments || {}),
                                  [q6DraggedCardId]: cat.id,
                                },
                              },
                            }));
                          }
                          setQ6DragOverZone(null);
                          setQ6DraggedCardId(null);
                        }}
                        onClick={() => {
                          if (activeSelectedTile) {
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                assignments: {
                                  ...(prev[currentIndex]?.assignments || {}),
                                  [activeSelectedTile]: cat.id,
                                },
                              },
                            }));
                            setActiveSelectedTile(null);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition min-h-[160px] flex flex-col justify-between ${
                          isHovered
                            ? 'border-cyan-500 bg-cyan-100/60 ring-2 ring-cyan-400'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                            {cat.label}
                          </span>
                          <span className="text-[10px] text-slate-500 block mb-2">
                            {cat.sublabel}
                          </span>

                          {/* Placed Cards */}
                          <div className="space-y-1.5">
                            {assignedCards.map((c) => (
                              <div
                                key={c.id}
                                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between shadow-2xs"
                              >
                                <div>
                                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                                    {c.text}
                                  </span>
                                  <span className="text-[10px] text-slate-500">{c.detail}</span>
                                </div>
                                {!isCurrentCompleted && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAnswers((prev) => {
                                        const copy = { ...(prev[currentIndex]?.assignments || {}) };
                                        delete copy[c.id];
                                        return {
                                          ...prev,
                                          [currentIndex]: { assignments: copy },
                                        };
                                      });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 text-[11px] font-bold ml-1.5"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {assignedCards.length === 0 && (
                          <div className="text-[11px] text-slate-400 italic text-center py-4">
                            Drop cards here or tap card then category
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Unassigned Cards Pool */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Cards to Classify (Drag or Tap to Select):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {(currentQ as Q6ClassificationSystems).cards.map((card) => {
                      const isAssigned = !!(currentAnswer?.assignments || {})[card.id];
                      const isSelected = activeSelectedTile === card.id;

                      return (
                        <div
                          key={card.id}
                          draggable={!isCurrentCompleted && !isAssigned}
                          onDragStart={() => setQ6DraggedCardId(card.id)}
                          onDragEnd={() => setQ6DraggedCardId(null)}
                          onClick={() => {
                            if (isCurrentCompleted || isAssigned) return;
                            setActiveSelectedTile(isSelected ? null : card.id);
                          }}
                          className={`p-2.5 rounded-xl border text-xs transition flex items-center justify-between select-none cursor-pointer ${
                            isAssigned
                              ? 'opacity-30 bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-cyan-500 text-white border-cyan-600 ring-2 ring-cyan-400 shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-cyan-400'
                          }`}
                        >
                          <div>
                            <span className="font-bold block text-[11px]">{card.text}</span>
                            <span className="text-[10px] opacity-75">{card.detail}</span>
                          </div>
                          <GripVertical className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Q7: Table Analysis */}
            {currentQ.type === 'table-analysis' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                          <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                            Week (w)
                          </th>
                          <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                            Maya: S = 15w + 40
                          </th>
                          <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                            Liam: S = 25w + 10
                          </th>
                          <th className="p-3 font-bold text-slate-700 dark:text-slate-300 text-center">
                            Select Row
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(
                          (currentQ as Q7TableAnalysisSystems).rows || [
                            { x: 1, yMaya: 55, yLiam: 35, isSolution: false },
                            { x: 2, yMaya: 70, yLiam: 60, isSolution: false },
                            { x: 3, yMaya: 85, yLiam: 85, isSolution: true },
                            { x: 4, yMaya: 100, yLiam: 110, isSolution: false },
                            { x: 5, yMaya: 115, yLiam: 135, isSolution: false },
                          ]
                        ).map((row) => {
                          const weekNum = row.x;
                          const mayaSavings = row.yMaya;
                          const liamSavings = row.yLiam;
                          const isSelected = currentAnswer?.selectedX === weekNum;

                          return (
                            <tr
                              key={weekNum}
                              onClick={() => {
                                if (isCurrentCompleted) return;
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { ...prev[currentIndex], selectedX: weekNum },
                                }));
                              }}
                              className={`border-b border-slate-200 dark:border-slate-700 transition cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-100/80 dark:bg-cyan-950/80 font-bold'
                                  : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                              }`}
                            >
                              <td className="p-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                                Week {weekNum}
                              </td>
                              <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                                ${mayaSavings}
                              </td>
                              <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                                ${liamSavings}
                              </td>
                              <td className="p-3 text-center whitespace-nowrap">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold transition ${
                                    isSelected
                                      ? 'bg-cyan-600 text-white'
                                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {isSelected ? 'Selected' : 'Select'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Follow-up question */}
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {(currentQ as Q7TableAnalysisSystems).followUpQuestion}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {(currentQ as Q7TableAnalysisSystems).followUpOptions.map((opt) => {
                        const isSelected = currentAnswer?.followUp === opt;
                        return (
                          <button
                            key={opt}
                            disabled={isCurrentCompleted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], followUp: opt },
                              }))
                            }
                            className={`p-3 rounded-xl text-xs sm:text-sm font-medium text-left border transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 font-bold ring-1 ring-cyan-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-cyan-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q8: Interactive Graphing */}
            {currentQ.type === 'interactive-graphing' && (() => {
              const q8PlottedPoints: [number, number][] = currentAnswer?.plottedPoints || [];
              const q8HasTwoValidPoints =
                q8PlottedPoints.length === 2 &&
                q8PlottedPoints[0][0] !== q8PlottedPoints[1][0] &&
                q8PlottedPoints.every(([x, y]) => Math.abs(y - (-0.5 * x + 5)) < 0.001);

              // SVG coordinate mapping for 420x420 viewBox:
              // math x in [-1, 9], math y in [-2, 8]
              const toSvgX = (x: number) => 35 + (x + 1) * 35;
              const toSvgY = (y: number) => 35 + (8 - y) * 35;

              const handlePlotGridPoint = (gx: number, gy: number) => {
                if (isCurrentCompleted) return;
                const existing: [number, number][] = currentAnswer?.plottedPoints || [];
                const idx = existing.findIndex(([px, py]) => px === gx && py === gy);
                let updated: [number, number][];
                if (idx >= 0) {
                  updated = existing.filter((_, i) => i !== idx);
                } else if (existing.length < 2) {
                  updated = [...existing, [gx, gy]];
                } else {
                  // Replace second point if 2 points already placed
                  updated = [existing[0], [gx, gy]];
                }
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: {
                    ...prev[currentIndex],
                    plottedPoints: updated,
                  },
                }));
              };

              const handleClearQ8Points = () => {
                if (isCurrentCompleted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: {
                    ...prev[currentIndex],
                    plottedPoints: [],
                  },
                }));
              };

              return (
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    {/* SVG Coordinate Grid */}
                    <div className="flex flex-col items-center gap-2 w-full max-w-md">
                      <div className="relative w-full aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-inner">
                        <svg viewBox="0 0 420 420" className="w-full h-full select-none">
                          {/* Grid Lines */}
                          {[-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => (
                            <line
                              key={`gy-${y}`}
                              x1={35}
                              y1={toSvgY(y)}
                              x2={385}
                              y2={toSvgY(y)}
                              stroke={y === 0 ? '#475569' : '#e2e8f0'}
                              strokeWidth={y === 0 ? 2 : 1}
                              className={y === 0 ? '' : 'dark:stroke-slate-800'}
                            />
                          ))}
                          {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                            <line
                              key={`gx-${x}`}
                              x1={toSvgX(x)}
                              y1={35}
                              x2={toSvgX(x)}
                              y2={385}
                              stroke={x === 0 ? '#475569' : '#e2e8f0'}
                              strokeWidth={x === 0 ? 2 : 1}
                              className={x === 0 ? '' : 'dark:stroke-slate-800'}
                            />
                          ))}

                          {/* Axis Labels */}
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                            <text
                              key={`x-lbl-${x}`}
                              x={toSvgX(x)}
                              y={toSvgY(0) + 14}
                              textAnchor="middle"
                              fontSize="10"
                              fontWeight="600"
                              fill="#64748b"
                            >
                              {x}
                            </text>
                          ))}
                          {[-2, -1, 1, 2, 3, 4, 5, 6, 7].map((y) => (
                            <text
                              key={`y-lbl-${y}`}
                              x={toSvgX(0) - 7}
                              y={toSvgY(y) + 3.5}
                              textAnchor="end"
                              fontSize="10"
                              fontWeight="600"
                              fill="#64748b"
                            >
                              {y}
                            </text>
                          ))}
                          <text
                            x={toSvgX(0) - 6}
                            y={toSvgY(0) + 13}
                            textAnchor="end"
                            fontSize="10"
                            fontWeight="600"
                            fill="#64748b"
                          >
                            0
                          </text>

                          {/* Axis Titles */}
                          <text
                            x={398}
                            y={toSvgY(0) + 4}
                            fontSize="12"
                            fontWeight="bold"
                            fill="#334155"
                            className="dark:fill-slate-300"
                          >
                            x
                          </text>
                          <text
                            x={toSvgX(0) - 2}
                            y={22}
                            fontSize="12"
                            fontWeight="bold"
                            fill="#334155"
                            className="dark:fill-slate-300"
                          >
                            y
                          </text>

                          {/* Line 1 (y = x - 1): Continuously rendered across visible grid */}
                          <line
                            x1={toSvgX(-1)}
                            y1={toSvgY(-2)}
                            x2={toSvgX(9)}
                            y2={toSvgY(8)}
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            strokeLinecap="round"
                          />
                          <text
                            x={toSvgX(7.2)}
                            y={toSvgY(6.5) - 8}
                            fontSize="10"
                            fontWeight="bold"
                            fill="#7c3aed"
                          >
                            Line 1: y = x - 1
                          </text>

                          {/* Line 2 (y = -0.5x + 5): Continuously rendered ONLY after student plots 2 valid points */}
                          {q8HasTwoValidPoints && (
                            <>
                              <line
                                x1={toSvgX(-1)}
                                y1={toSvgY(5.5)}
                                x2={toSvgX(9)}
                                y2={toSvgY(0.5)}
                                stroke="#06b6d4"
                                strokeWidth={3}
                                strokeLinecap="round"
                              />
                              <text
                                x={toSvgX(1)}
                                y={toSvgY(4.5) - 10}
                                fontSize="10"
                                fontWeight="bold"
                                fill="#0891b2"
                              >
                                Line 2: y = -0.5x + 5
                              </text>
                            </>
                          )}

                          {/* Plotted Points for Line 2 */}
                          {q8PlottedPoints.map(([px, py], i) => (
                            <g key={`plotted-${px}-${py}-${i}`}>
                              <circle
                                cx={toSvgX(px)}
                                cy={toSvgY(py)}
                                r={6.5}
                                fill="#06b6d4"
                                stroke="#ffffff"
                                strokeWidth={2}
                              />
                              <circle cx={toSvgX(px)} cy={toSvgY(py)} r={2.5} fill="#ffffff" />
                              <rect
                                x={toSvgX(px) - 18}
                                y={toSvgY(py) - 22}
                                width={36}
                                height={15}
                                rx={4}
                                fill="#0f172a"
                                opacity={0.88}
                              />
                              <text
                                x={toSvgX(px)}
                                y={toSvgY(py) - 11}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="bold"
                                fill="#ffffff"
                              >
                                ({px}, {py})
                              </text>
                            </g>
                          ))}

                          {/* Highlight Intersection at (4, 3) when student response is completed & correct */}
                          {isCurrentCompleted && isCurrentCorrect && (
                            <g>
                              <circle
                                cx={toSvgX(4)}
                                cy={toSvgY(3)}
                                r={9}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                strokeDasharray="3 2"
                              />
                              <circle cx={toSvgX(4)} cy={toSvgY(3)} r={4} fill="#10b981" />
                              <text
                                x={toSvgX(4) + 12}
                                y={toSvgY(3) - 8}
                                fontSize="10"
                                fontWeight="bold"
                                fill="#059669"
                              >
                                Intersection (4, 3)
                              </text>
                            </g>
                          )}

                          {/* Interactive Grid Nodes: Click to place or remove a point */}
                          {!isCurrentCompleted &&
                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((gx) =>
                              [0, 1, 2, 3, 4, 5, 6, 7].map((gy) => (
                                <circle
                                  key={`hit-${gx}-${gy}`}
                                  cx={toSvgX(gx)}
                                  cy={toSvgY(gy)}
                                  r={14}
                                  fill="transparent"
                                  className="cursor-pointer hover:stroke-cyan-400/80 hover:stroke-[3] hover:fill-cyan-500/10 transition"
                                  onClick={() => handlePlotGridPoint(gx, gy)}
                                >
                                  <title>{`(${gx}, ${gy})`}</title>
                                </circle>
                              ))
                            )}
                        </svg>
                      </div>

                      <span className="text-[11px] text-slate-500 dark:text-slate-400 italic text-center">
                        Tip: Click any grid intersection above to plot or remove a point on Line 2.
                      </span>
                    </div>

                    {/* Controls & Intersection Options */}
                    <div className="space-y-4 max-w-sm w-full">
                      {/* Equations Legend */}
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-1 bg-purple-500 rounded-full" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            Line 1: {(currentQ as Q8InteractiveGraphingSystems).line1Equation} (Already Graphed)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-1 bg-cyan-500 rounded-full" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            Line 2: {(currentQ as Q8InteractiveGraphingSystems).line2Equation}
                          </span>
                        </div>
                      </div>

                      {/* Part A: Plot Two Points */}
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Part A: Plot 2 Points on Line 2
                          </span>
                          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                            {q8PlottedPoints.length} / 2 Points Plotted
                          </span>
                        </div>

                        {/* Plotted Points Badges */}
                        <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
                          {q8PlottedPoints.length === 0 ? (
                            <span className="text-xs text-slate-400 italic">
                              Click grid intersections above or select coordinates below.
                            </span>
                          ) : (
                            q8PlottedPoints.map(([px, py], i) => (
                              <span
                                key={`pt-badge-${px}-${py}-${i}`}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-100/80 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700"
                              >
                                Point {i + 1}: ({px}, {py})
                                {!isCurrentCompleted && (
                                  <button
                                    type="button"
                                    onClick={() => handlePlotGridPoint(px, py)}
                                    className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                                    title="Remove point"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            ))
                          )}
                        </div>

                        {/* Status Message */}
                        {q8PlottedPoints.length === 2 && (
                          <div className="text-xs pt-1">
                            {q8HasTwoValidPoints ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                Valid points plotted! Line 2 is rendered on the grid.
                              </span>
                            ) : (
                              <span className="text-amber-600 dark:text-amber-400 font-medium">
                                Plotted points do not satisfy y = -0.5x + 5. Tap a point to adjust.
                              </span>
                            )}
                          </div>
                        )}

                        {/* Chromebook Coordinate Picker Fallback */}
                        {!isCurrentCompleted && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                            {/* Instructional guidance for Part A */}
                            {q8PlottedPoints.length === 0 && (
                              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                Choose the x- and y-coordinates of a point on Line 2, then click Plot Point 1.
                              </p>
                            )}

                            {q8PlottedPoints.length === 1 && (
                              <div className="space-y-0.5">
                                <p className="text-xs text-slate-800 dark:text-slate-200 font-bold">
                                  Now plot a SECOND different point on Line 2.
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                  Select the x- and y-coordinates, then click Plot Point 2.
                                </p>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="font-mono text-slate-500">x:</span>
                                <select
                                  value={q8QuickX}
                                  onChange={(e) => setQ8QuickX(Number(e.target.value))}
                                  className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white text-slate-900 text-xs font-mono font-bold shadow-sm"
                                >
                                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <option key={n} value={n} className="bg-white text-slate-900 font-semibold">
                                      {n}
                                    </option>
                                  ))}
                                </select>
                                <span className="font-mono text-slate-500 ml-1">y:</span>
                                <select
                                  value={q8QuickY}
                                  onChange={(e) => setQ8QuickY(Number(e.target.value))}
                                  className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white text-slate-900 text-xs font-mono font-bold shadow-sm"
                                >
                                  {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                                    <option key={n} value={n} className="bg-white text-slate-900 font-semibold">
                                      {n}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  onClick={() => handlePlotGridPoint(q8QuickX, q8QuickY)}
                                  className="px-2 py-0.5 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs cursor-pointer ml-1"
                                >
                                  {q8PlottedPoints.length === 0 ? 'Plot Point 1' : 'Plot Point 2'}
                                </button>
                              </div>

                              <button
                                type="button"
                                disabled={q8PlottedPoints.length === 0}
                                onClick={handleClearQ8Points}
                                className="text-xs text-rose-500 hover:text-rose-700 font-bold underline cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Part B: Intersection Point Options */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Part B: Select Coordinates of Intersection:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {(currentQ as Q8InteractiveGraphingSystems).intersectionOptions.map(
                            (opt) => {
                              const isSelected = currentAnswer?.selectedIntersection === opt;
                              return (
                                <button
                                  key={opt}
                                  disabled={isCurrentCompleted}
                                  onClick={() =>
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [currentIndex]: {
                                        ...prev[currentIndex],
                                        selectedIntersection: opt,
                                      },
                                    }))
                                  }
                                  className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-400'
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q9: Matching Pairs */}
            {currentQ.type === 'matching' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Match each system with its solution:
                  </span>
                  <div className="space-y-2.5">
                    {(currentQ as Q9MatchingSystems).systems.map((sys) => {
                      const currentMatch = (currentAnswer?.matches || {})[sys.id];

                      return (
                        <div
                          key={sys.id}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
                        >
                          <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {sys.system}
                          </span>

                          <select
                            disabled={isCurrentCompleted}
                            value={currentMatch || ''}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: {
                                  matches: {
                                    ...(prev[currentIndex]?.matches || {}),
                                    [sys.id]: e.target.value,
                                  },
                                },
                              }))
                            }
                            className="w-full sm:w-64 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-cyan-700 dark:text-cyan-300"
                          >
                            <option value="">Select matching solution...</option>
                            {(currentQ as Q9MatchingSystems).solutions.map((sol) => (
                              <option key={sol.id} value={sol.id}>
                                {sol.label} ({sol.description})
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Q10: Diagnostic Error Analysis */}
            {currentQ.type === 'error-analysis' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Student&apos;s Stated Solution:</span>
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-300 pl-6">
                    {(currentQ as Q10ErrorAnalysisSystems).studentClaim}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Select the TWO correct statements:
                  </span>
                  <div className="space-y-2">
                    {(currentQ as Q10ErrorAnalysisSystems).options.map((opt) => {
                      const selected: string[] = currentAnswer?.selected || [];
                      const isChecked = selected.includes(opt.id);

                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            let next: string[];
                            if (isChecked) {
                              next = selected.filter((id) => id !== opt.id);
                            } else {
                              if (selected.length >= 2) {
                                next = [selected[1], opt.id];
                              } else {
                                next = [...selected, opt.id];
                              }
                            }
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: { selected: next },
                            }));
                          }}
                          className={`p-3.5 rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                            isChecked
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 text-cyan-950 dark:text-cyan-200'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            disabled={isCurrentCompleted}
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Q11: Multi-Part Challenge */}
            {currentQ.type === 'multi-part' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
                  {/* Part A */}
                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                      {(currentQ as Q11MultiPartSystems).partAPrompt}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(currentQ as Q11MultiPartSystems).partAOptions.map((opt) => {
                        const isSelected = currentAnswer?.partA === opt;
                        return (
                          <button
                            key={opt}
                            disabled={isCurrentCompleted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], partA: opt },
                              }))
                            }
                            className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Part B */}
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                      {(currentQ as Q11MultiPartSystems).partBPrompt}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(currentQ as Q11MultiPartSystems).partBOptions.map((opt) => {
                        const isSelected = currentAnswer?.partB === opt;
                        return (
                          <button
                            key={opt}
                            disabled={isCurrentCompleted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...prev[currentIndex], partB: opt },
                              }))
                            }
                            className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q12: System Completion */}
            {currentQ.type === 'system-completion' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4 text-xs sm:text-sm">
                  {/* Task 1 */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {(currentQ as Q12SystemCompletionSystems).task1Prompt}
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-600">Slope m:</span>
                        <select
                          disabled={isCurrentCompleted}
                          value={currentAnswer?.task1Slope || ''}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...prev[currentIndex],
                                task1Slope: e.target.value,
                              },
                            }))
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300"
                        >
                          <option value="">Select m...</option>
                          {(currentQ as Q12SystemCompletionSystems).task1SlopeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-600">Intercept b:</span>
                        <select
                          disabled={isCurrentCompleted}
                          value={currentAnswer?.task1Intercept || ''}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...prev[currentIndex],
                                task1Intercept: e.target.value,
                              },
                            }))
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300"
                        >
                          <option value="">Select b...</option>
                          {(currentQ as Q12SystemCompletionSystems).task1InterceptOptions.map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {(currentQ as Q12SystemCompletionSystems).task2Prompt}
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-600">Coefficient A:</span>
                        <select
                          disabled={isCurrentCompleted}
                          value={currentAnswer?.task2Coeff || ''}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...prev[currentIndex],
                                task2Coeff: e.target.value,
                              },
                            }))
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300"
                        >
                          <option value="">Select A...</option>
                          {(currentQ as Q12SystemCompletionSystems).task2CoefficientOptions.map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-600">Constant B:</span>
                        <select
                          disabled={isCurrentCompleted}
                          value={currentAnswer?.task2Const || ''}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...prev[currentIndex],
                                task2Const: e.target.value,
                              },
                            }))
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300"
                        >
                          <option value="">Select B...</option>
                          {(currentQ as Q12SystemCompletionSystems).task2ConstantOptions.map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {(currentQ as Q12SystemCompletionSystems).task3Prompt}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-600">Slope m:</span>
                      <select
                        disabled={isCurrentCompleted}
                        value={currentAnswer?.task3Slope || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: {
                              ...prev[currentIndex],
                              task3Slope: e.target.value,
                            },
                          }))
                        }
                        className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-cyan-700 dark:text-cyan-300"
                      >
                        <option value="">Select m...</option>
                        {(currentQ as Q12SystemCompletionSystems).task3SlopeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Card (Shown after Submission) */}
          {isCurrentFeedbackVisible && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border animate-fadeIn space-y-3 ${
                isCurrentCorrect
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <span className="font-bold text-sm sm:text-base">
                  {isCurrentCorrect ? 'Correct Response!' : 'Incorrect Response'}
                </span>
              </div>

              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300 pl-7">
                {!isCurrentCorrect
                  ? currentQ.type === 'interactive-graphing'
                    ? (() => {
                        const pts: [number, number][] = currentAnswer?.plottedPoints || [];
                        const twoValidPoints =
                          pts.length === 2 &&
                          pts[0][0] !== pts[1][0] &&
                          pts.every(([x, y]) => Math.abs(y - (-0.5 * x + 5)) < 0.001);
                        const correctInter =
                          currentAnswer?.selectedIntersection === '(4, 3)';
                        if (!twoValidPoints && !correctInter) {
                          return 'Neither part is correct yet. To graph Line 2 (y = -0.5x + 5), substitute integer values for x into the equation to find two valid points. Once Line 2 is plotted, look at where Line 1 and Line 2 cross each other to determine the intersection.';
                        }
                        if (!twoValidPoints) {
                          return 'The points you plotted do not both satisfy Line 2 (y = -0.5x + 5). Substitute integer values for x (such as 0, 2, or 4) into y = -0.5x + 5 to calculate coordinates on the line, then tap the points to adjust.';
                        }
                        if (!correctInter) {
                          return 'Line 2 is plotted correctly, but the selected intersection coordinates are incorrect. Look closely at where Line 1 (purple) and Line 2 (cyan) cross each other on the coordinate plane and select their shared coordinates.';
                        }
                        return currentQ.instructionalHint;
                      })()
                    : currentQ.instructionalHint || currentQ.solutionExplanation
                  : currentQ.solutionExplanation}
              </div>

              <div className="pl-7 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  STAAR Key Concept:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {currentQ.keyTakeaway}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
                currentIndex === 0
                  ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <div className="flex items-center gap-3">
              {!isCurrentCompleted ? (
                <>
                  <button
                    onClick={handleSubmitCurrent}
                    disabled={!isAnswerProvided()}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 cursor-pointer ${
                      isAnswerProvided()
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white ring-2 ring-cyan-400/50'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </button>
                  {isCurrentAttempted && (
                    <button
                      onClick={handleNext}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Final Score'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Final Score'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
