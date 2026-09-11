// src/components/DigitalStaarTransformationsSimulator.tsx
import React, { useState, useRef } from 'react';
import {
  Laptop,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  HelpCircle,
  Check,
  Grid,
  Sparkles,
  Target,
  Maximize2,
  BarChart2,
  BookOpen,
  MousePointerClick,
  Layers,
  Calculator,
  GripVertical,
  X,
} from 'lucide-react';
import {
  UNIT_1_DIGITAL_STAAR_QUESTIONS,
  Unit1DigitalStaarQuestion,
  Q1DragDropRule,
  Q2HotSpot,
  Q3InlineChoice,
  Q4TableGrid,
  Q5NumericEntry,
  Q6SelectedResponse,
  Q7MultiPart,
  Q8MultipleSelect,
  Q9Graphing,
  Q10Classification,
  Q11MultipleSelect,
  Q12InlineChoiceComposition,
} from '../data/staar/digitalStaarTransformationsData';

interface DigitalStaarTransformationsSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

/**
 * Helper to render Question 7 text with clearly separated, non-breaking vertex labels.
 * Ensures trapezoids W″ X″ Y″ Z″, W′ X′ Y′ Z′, and W X Y Z display with distinct horizontal spacing
 * between each vertex label so they are never compressed as a continuous string.
 */
const renderQ7Text = (text: string): React.ReactNode => {
  if (!text) return text;

  // Tokenize trapezoid multi-vertex references and primed vertices
  const Q7_TOKEN_REGEX =
    /(W\s*(?:″|''|′′)\s*X\s*(?:″|''|′′)\s*Y\s*(?:″|''|′′)\s*Z\s*(?:″|''|′′)|W\s*(?:′|')\s*X\s*(?:′|')\s*Y\s*(?:′|')\s*Z\s*(?:′|')|W\s+X\s+Y\s+Z|WXYZ|W\s*(?:″|''|′′)|W\s*(?:′|'))/g;

  const parts = text.split(Q7_TOKEN_REGEX);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // 1. Final Image Trapezoid: W″ X″ Y″ Z″
        if (/W\s*(?:″|''|′′)\s*X\s*(?:″|''|′′)\s*Y\s*(?:″|''|′′)\s*Z\s*(?:″|''|′′)/.test(part)) {
          return (
            <span
              key={idx}
              className="inline-flex items-baseline whitespace-nowrap font-bold"
            >
              <span className="mr-2">W″</span>
              <span className="mr-2">X″</span>
              <span className="mr-2">Y″</span>
              <span>Z″</span>
            </span>
          );
        }

        // 2. Intermediate Image Trapezoid: W′ X′ Y′ Z′
        if (/W\s*(?:′|')\s*X\s*(?:′|')\s*Y\s*(?:′|')\s*Z\s*(?:′|')/.test(part)) {
          return (
            <span
              key={idx}
              className="inline-flex items-baseline whitespace-nowrap font-bold"
            >
              <span className="mr-2">W′</span>
              <span className="mr-2">X′</span>
              <span className="mr-2">Y′</span>
              <span>Z′</span>
            </span>
          );
        }

        // 3. Original Pre-image Trapezoid: W X Y Z
        if (/W\s+X\s+Y\s+Z|WXYZ/.test(part)) {
          return (
            <span
              key={idx}
              className="inline-flex items-baseline whitespace-nowrap font-bold"
            >
              <span className="mr-2">W</span>
              <span className="mr-2">X</span>
              <span className="mr-2">Y</span>
              <span>Z</span>
            </span>
          );
        }

        // 4. Single Primed Vertex W″
        if (/W\s*(?:″|''|′′)/.test(part)) {
          return (
            <span key={idx} className="inline-block whitespace-nowrap font-bold">
              W″
            </span>
          );
        }

        // 5. Single Primed Vertex W′
        if (/W\s*(?:′|')/.test(part)) {
          return (
            <span key={idx} className="inline-block whitespace-nowrap font-bold">
              W′
            </span>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

export const DigitalStaarTransformationsSimulator: React.FC<DigitalStaarTransformationsSimulatorProps> = ({
  topicTitle = 'Geometric Transformations',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Helper for tap-to-place on mobile
  const [activeSelectedOption, setActiveSelectedOption] = useState<string | null>(null);

  // Q1 Drag & Drop State & Refs
  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [dragSourceBox, setDragSourceBox] = useState<1 | 2 | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<1 | 2 | null>(null);
  const [pointerDrag, setPointerDrag] = useState<{
    tile: string;
    fromBox?: 1 | 2 | null;
    x: number;
    y: number;
  } | null>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  const currentQ = UNIT_1_DIGITAL_STAAR_QUESTIONS[currentIndex];
  const isCurrentSubmitted = !!submittedQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = UNIT_1_DIGITAL_STAAR_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'drag-drop-rule': {
        const qTyped = q as Q1DragDropRule;
        return ans.drop1 === qTyped.correctDrop1 && ans.drop2 === qTyped.correctDrop2;
      }
      case 'hot-spot': {
        const qTyped = q as Q2HotSpot;
        const selected = qTyped.figures.find((f) => f.id === ans.selectedId);
        return !!selected && selected.isCorrect;
      }
      case 'inline-choice': {
        if (q.id === 'u1-dstaar-3') {
          const qTyped = q as Q3InlineChoice;
          return ans.sel1 === qTyped.correct1 && ans.sel2 === qTyped.correct2;
        } else if (q.id === 'u1-dstaar-12') {
          const qTyped = q as Q12InlineChoiceComposition;
          return (
            ans.sel1 === qTyped.correct1 &&
            ans.sel2 === qTyped.correct2 &&
            ans.sel3 === qTyped.correct3
          );
        }
        return false;
      }
      case 'table-grid': {
        const qTyped = q as Q4TableGrid;
        const userSelections: Record<string, string> = ans.selections || {};
        return qTyped.rows.every((row) => userSelections[row.id] === row.correctCategory);
      }
      case 'numeric-entry': {
        const qTyped = q as Q5NumericEntry;
        const valX = (ans.valX || '').toString().trim().toLowerCase();
        const valY = (ans.valY || '').toString().trim().toLowerCase();
        const correctX = qTyped.acceptedAnswersX.some((acc) => acc.toLowerCase() === valX);
        const correctY = qTyped.acceptedAnswersY.some((acc) => acc.toLowerCase() === valY);
        return correctX && correctY;
      }
      case 'selected-response': {
        const qTyped = q as Q6SelectedResponse;
        const selectedOpt = qTyped.options.find((o) => o.id === ans.selectedId);
        return !!selectedOpt && selectedOpt.isCorrect;
      }
      case 'multi-part': {
        const qTyped = q as Q7MultiPart;
        const partACorrect = ans.partA === qTyped.partA.correct;
        const partBCorrect = ans.partB === qTyped.partB.options.find((o) => o.isCorrect)?.id;
        return partACorrect && partBCorrect;
      }
      case 'multiple-select': {
        const qTyped = q as Q8MultipleSelect | Q11MultipleSelect;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }
      case 'graphing': {
        const qTyped = q as Q9Graphing;
        const plottedPoints: { x: number; y: number }[] = ans.plotted || [];
        if (plottedPoints.length !== qTyped.targetEndpoints.length) return false;
        // Verify all target endpoints are plotted regardless of order
        return qTyped.targetEndpoints.every((target) =>
          plottedPoints.some(
            (pt) => Math.abs(pt.x - target.x) < 0.2 && Math.abs(pt.y - target.y) < 0.2
          )
        );
      }
      case 'classification': {
        const qTyped = q as Q10Classification;
        const assignments: Record<string, string> = ans.assignments || {};
        return qTyped.cards.every((card) => assignments[card.id] === card.correctCategory);
      }
      default:
        return false;
    }
  };

  const currentIsCorrect = gradeQuestion(currentIndex);

  const handleSubmitCurrent = () => {
    setSubmittedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const clearDragState = () => {
    setDraggedTile(null);
    setDragSourceBox(null);
    setDragOverTarget(null);
    setPointerDrag(null);
  };

  const handleNext = () => {
    setActiveSelectedOption(null);
    clearDragState();
    if (currentIndex < UNIT_1_DIGITAL_STAAR_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setResultsView(true);
    }
  };

  const handlePrev = () => {
    setActiveSelectedOption(null);
    clearDragState();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setSubmittedQuestions({});
    setAnswers({});
    setCurrentIndex(0);
    setResultsView(false);
    setActiveSelectedOption(null);
    clearDragState();
  };

  // Check if current question has any valid input before submit
  const isAnswerProvided = (): boolean => {
    const ans = currentAnswer;
    if (!ans) return false;
    switch (currentQ.type) {
      case 'drag-drop-rule':
        return !!(ans.drop1 && ans.drop2);
      case 'hot-spot':
        return !!ans.selectedId;
      case 'inline-choice':
        if (currentQ.id === 'u1-dstaar-3') {
          return !!(ans.sel1 && ans.sel2);
        } else if (currentQ.id === 'u1-dstaar-12') {
          return !!(ans.sel1 && ans.sel2 && ans.sel3);
        }
        return false;
      case 'table-grid': {
        const qTyped = currentQ as Q4TableGrid;
        const selections = ans.selections || {};
        return qTyped.rows.every((r) => !!selections[r.id]);
      }
      case 'numeric-entry':
        return !!((ans.valX || '').trim() && (ans.valY || '').trim());
      case 'selected-response':
        return !!ans.selectedId;
      case 'multi-part':
        return !!(ans.partA && ans.partB);
      case 'multiple-select':
        return Array.isArray(ans.selected) && ans.selected.length > 0;
      case 'graphing': {
        const qTyped = currentQ as Q9Graphing;
        return Array.isArray(ans.plotted) && ans.plotted.length === qTyped.targetEndpoints.length;
      }
      case 'classification': {
        const qTyped = currentQ as Q10Classification;
        const assignments = ans.assignments || {};
        return qTyped.cards.every((c) => !!assignments[c.id]);
      }
      default:
        return false;
    }
  };

  // Compute final summary score
  const totalQuestions = UNIT_1_DIGITAL_STAAR_QUESTIONS.length;
  const score = UNIT_1_DIGITAL_STAAR_QUESTIONS.reduce((acc, _, idx) => {
    return acc + (gradeQuestion(idx) ? 1 : 0);
  }, 0);
  const accuracy = Math.round((score / totalQuestions) * 100);

  // Group performance by TEKS/Topic
  const performanceByTopic = UNIT_1_DIGITAL_STAAR_QUESTIONS.reduce(
    (acc, q, idx) => {
      const topic = q.topic;
      if (!acc[topic]) {
        acc[topic] = { total: 0, correct: 0, teks: q.teks };
      }
      acc[topic].total += 1;
      if (gradeQuestion(idx)) {
        acc[topic].correct += 1;
      }
      return acc;
    },
    {} as Record<string, { total: number; correct: number; teks: string }>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Banner with STAAR Branding & Quick Tools */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-cyan-900/60 text-cyan-300 rounded border border-cyan-700/50">
                  Digital STAAR Redesign Format
                </span>
                <span className="text-xs text-slate-400">Grade 8 Mathematics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Digital STAAR Simulator: {topicTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-center">
            <button
              onClick={() => setShowFormulaSheet(!showFormulaSheet)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              title="View Grade 8 STAAR Reference Materials"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>STAAR Formula Reference</span>
            </button>
            <button
              onClick={handleRetake}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              title="Reset Simulator"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Formula Reference Overlay Modal */}
        {showFormulaSheet && (
          <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-cyan-500/40 text-xs sm:text-sm text-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> STAAR Grade 8 Reference Materials: Transformations
              </span>
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 bg-slate-800 rounded"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Translations (Rigid Motion)
                </span>
                <p className="text-xs text-slate-300">
                  • Horizontal: Right = <code className="text-cyan-300">x + a</code>, Left = <code className="text-cyan-300">x - a</code>
                </p>
                <p className="text-xs text-slate-300">
                  • Vertical: Up = <code className="text-cyan-300">y + b</code>, Down = <code className="text-cyan-300">y - b</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">Preserves both side length (congruence) and orientation.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Reflections (Rigid Motion)
                </span>
                <p className="text-xs text-slate-300">
                  • Across x-axis: <code className="text-cyan-300">(x, y) → (x, -y)</code>
                </p>
                <p className="text-xs text-slate-300">
                  • Across y-axis: <code className="text-cyan-300">(x, y) → (-x, y)</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">Preserves congruence, but reverses vertex orientation.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Rotations About Origin (Rigid Motion)
                </span>
                <p className="text-xs text-slate-300">
                  • 90° CCW / 270° CW: <code className="text-cyan-300">(x, y) → (-y, x)</code>
                </p>
                <p className="text-xs text-slate-300">
                  • 180° (either direction): <code className="text-cyan-300">(x, y) → (-x, -y)</code>
                </p>
                <p className="text-xs text-slate-300">
                  • 270° CCW / 90° CW: <code className="text-cyan-300">(x, y) → (y, -x)</code>
                </p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Dilations (Non-Rigid Motion)
                </span>
                <p className="text-xs text-slate-300">
                  • Center at origin: <code className="text-cyan-300">(x, y) → (kx, ky)</code>
                </p>
                <p className="text-xs text-slate-300">
                  • Enlargement if <code className="text-cyan-300">k &gt; 1</code>; Reduction if <code className="text-cyan-300">0 &lt; k &lt; 1</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">Preserves angle measures (similar figures), but NOT side lengths.</p>
              </div>
            </div>
          </div>
        )}

        {/* Question Navigator Bar (1 to 12) */}
        {!resultsView && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              {UNIT_1_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
                const isSubmitted = !!submittedQuestions[idx];
                const isCorrect = isSubmitted && gradeQuestion(idx);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setActiveSelectedOption(null);
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center relative ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 font-extrabold shadow-md'
                        : isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-rose-950 text-rose-300 border border-rose-700/60'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                    {isSubmitted && (
                      <span
                        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                          isCorrect ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Question <span className="text-white font-bold">{currentIndex + 1}</span> of{' '}
              <span className="text-white font-bold">{totalQuestions}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Simulator Card or Results View */}
      {!resultsView ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-5 sm:p-8 space-y-6">
          {/* Question Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60">
                {currentQ.typeLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                {currentQ.teks}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Topic: {currentQ.topic}
            </span>
          </div>

          {/* Prompt Section */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.number === 7 ? renderQ7Text(currentQ.prompt) : currentQ.prompt}
            </h3>
          </div>

          {/* Technology-Enhanced Interactive Workspace */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800/80">
            {/* Q1: DRAG & DROP RULE */}
            {currentQ.type === 'drag-drop-rule' && (() => {
              const qTyped = currentQ as Q1DragDropRule;
              const drop1 = currentAnswer?.drop1;
              const drop2 = currentAnswer?.drop2;

              // Placement handler supporting drop, replace, and box-to-box swap
              const handlePlaceInBox = (targetBox: 1 | 2, tile: string, fromBox?: 1 | 2 | null) => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => {
                  const cur = prev[currentIndex] || {};
                  const oldDrop1 = cur.drop1;
                  const oldDrop2 = cur.drop2;

                  if (targetBox === 1) {
                    if (fromBox === 2 || oldDrop2 === tile) {
                      // Move from Box 2 to Box 1 -> swap
                      return {
                        ...prev,
                        [currentIndex]: {
                          ...cur,
                          drop1: tile,
                          drop2: oldDrop1 && oldDrop1 !== tile ? oldDrop1 : undefined,
                        },
                      };
                    } else {
                      // Placed from bank or replaced
                      return {
                        ...prev,
                        [currentIndex]: {
                          ...cur,
                          drop1: tile,
                          drop2: oldDrop2 === tile ? undefined : oldDrop2,
                        },
                      };
                    }
                  } else {
                    if (fromBox === 1 || oldDrop1 === tile) {
                      // Move from Box 1 to Box 2 -> swap
                      return {
                        ...prev,
                        [currentIndex]: {
                          ...cur,
                          drop1: oldDrop2 && oldDrop2 !== tile ? oldDrop2 : undefined,
                          drop2: tile,
                        },
                      };
                    } else {
                      // Placed from bank or replaced
                      return {
                        ...prev,
                        [currentIndex]: {
                          ...cur,
                          drop1: oldDrop1 === tile ? undefined : oldDrop1,
                          drop2: tile,
                        },
                      };
                    }
                  }
                });
              };

              const handleRemoveFromBox = (box: 1 | 2) => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: {
                    ...(prev[currentIndex] || {}),
                    [box === 1 ? 'drop1' : 'drop2']: undefined,
                  },
                }));
              };

              // Pointer / Touch drag handling for touch Chromebooks & mobile
              const handleTilePointerDown = (
                e: React.PointerEvent,
                tile: string,
                fromBox: 1 | 2 | null = null
              ) => {
                if (isCurrentSubmitted) return;
                // Only intercept touch or pen; mouse uses HTML5 DnD
                if (e.pointerType === 'mouse') return;

                try {
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                } catch {}

                setPointerDrag({ tile, fromBox, x: e.clientX, y: e.clientY });
                setDraggedTile(tile);
                setDragSourceBox(fromBox);
              };

              const handlePointerMove = (e: React.PointerEvent) => {
                if (!pointerDrag) return;
                const x = e.clientX;
                const y = e.clientY;
                setPointerDrag((prev) => (prev ? { ...prev, x, y } : null));

                const b1 = box1Ref.current?.getBoundingClientRect();
                const b2 = box2Ref.current?.getBoundingClientRect();

                if (b1 && x >= b1.left && x <= b1.right && y >= b1.top && y <= b1.bottom) {
                  setDragOverTarget(1);
                } else if (b2 && x >= b2.left && x <= b2.right && y >= b2.top && y <= b2.bottom) {
                  setDragOverTarget(2);
                } else {
                  setDragOverTarget(null);
                }
              };

              const handlePointerUp = (e: React.PointerEvent) => {
                if (!pointerDrag) return;
                try {
                  (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                } catch {}

                const x = e.clientX;
                const y = e.clientY;
                const b1 = box1Ref.current?.getBoundingClientRect();
                const b2 = box2Ref.current?.getBoundingClientRect();

                if (b1 && x >= b1.left && x <= b1.right && y >= b1.top && y <= b1.bottom) {
                  handlePlaceInBox(1, pointerDrag.tile, pointerDrag.fromBox);
                } else if (b2 && x >= b2.left && x <= b2.right && y >= b2.top && y <= b2.bottom) {
                  handlePlaceInBox(2, pointerDrag.tile, pointerDrag.fromBox);
                }

                setPointerDrag(null);
                setDraggedTile(null);
                setDragSourceBox(null);
                setDragOverTarget(null);
              };

              const handleBankTileClick = (opt: string) => {
                if (isCurrentSubmitted) return;
                if (!drop1) {
                  handlePlaceInBox(1, opt);
                } else if (!drop2) {
                  handlePlaceInBox(2, opt);
                } else {
                  handlePlaceInBox(1, opt);
                }
              };

              return (
                <div
                  className="space-y-6 select-none"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {/* Floating Drag Avatar for Touch / Pointer Drag */}
                  {pointerDrag && (
                    <div
                      className="fixed z-50 pointer-events-none px-4 py-2 bg-cyan-600 text-white font-mono font-bold rounded-xl shadow-2xl ring-4 ring-cyan-300/80 transform -translate-x-1/2 -translate-y-1/2 opacity-95 text-sm sm:text-base flex items-center gap-1.5"
                      style={{ left: `${pointerDrag.x}px`, top: `${pointerDrag.y}px` }}
                    >
                      <GripVertical className="w-4 h-4" />
                      <span>{pointerDrag.tile}</span>
                    </div>
                  )}

                  {/* Drop Target Area */}
                  <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                      Complete the Algebraic Rule (Drag & Drop Terms):
                    </p>
                    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-base sm:text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
                      <span>{qTyped.templatePrefix}</span>

                      {/* Box 1 Drop Zone */}
                      <div
                        ref={box1Ref}
                        id="q1-drop-target-1"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                          if (dragOverTarget !== 1) setDragOverTarget(1);
                        }}
                        onDragEnter={(e) => {
                          e.preventDefault();
                          setDragOverTarget(1);
                        }}
                        onDragLeave={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                            if (dragOverTarget === 1) setDragOverTarget(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOverTarget(null);
                          let tile = '';
                          let fromBox: 1 | 2 | null = null;
                          try {
                            const raw = e.dataTransfer.getData('application/json');
                            if (raw) {
                              const parsed = JSON.parse(raw);
                              tile = parsed.tile;
                              fromBox = parsed.fromBox;
                            }
                          } catch {}
                          if (!tile) {
                            tile = e.dataTransfer.getData('text/plain') || draggedTile || '';
                            fromBox = dragSourceBox;
                          }
                          if (tile) {
                            handlePlaceInBox(1, tile, fromBox);
                          }
                          setDraggedTile(null);
                          setDragSourceBox(null);
                        }}
                        className={`relative min-w-[125px] sm:min-w-[145px] h-12 px-3 py-1.5 rounded-xl border-2 flex items-center justify-center transition-all ${
                          dragOverTarget === 1
                            ? 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900/60 ring-4 ring-cyan-400/50 scale-105 shadow-md border-solid'
                            : drop1
                            ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 text-cyan-800 dark:text-cyan-200 font-mono font-bold shadow-sm'
                            : 'border-dashed border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/60 text-slate-400'
                        }`}
                      >
                        {dragOverTarget === 1 ? (
                          <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 animate-pulse">
                            Drop 1st Term
                          </span>
                        ) : drop1 ? (
                          <div
                            draggable={!isCurrentSubmitted}
                            onDragStart={(e) => {
                              e.stopPropagation();
                              e.dataTransfer.setData('text/plain', drop1);
                              e.dataTransfer.setData(
                                'application/json',
                                JSON.stringify({ tile: drop1, fromBox: 1 })
                              );
                              e.dataTransfer.effectAllowed = 'move';
                              setDraggedTile(drop1);
                              setDragSourceBox(1);
                            }}
                            onDragEnd={() => {
                              setDraggedTile(null);
                              setDragSourceBox(null);
                              setDragOverTarget(null);
                            }}
                            onPointerDown={(e) => handleTilePointerDown(e, drop1, 1)}
                            className="w-full flex items-center justify-between gap-1.5 cursor-grab active:cursor-grabbing text-sm sm:text-base"
                            title="Drag to Box 2 or click X to remove"
                          >
                            <div className="flex items-center gap-1">
                              <GripVertical className="w-3.5 h-3.5 text-cyan-600/70" />
                              <span>{drop1}</span>
                            </div>
                            {!isCurrentSubmitted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFromBox(1);
                                }}
                                title="Remove term"
                                className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic text-xs font-sans">
                            [ Drag 1st Term ]
                          </span>
                        )}
                      </div>

                      <span>{qTyped.templateMiddle}</span>

                      {/* Box 2 Drop Zone */}
                      <div
                        ref={box2Ref}
                        id="q1-drop-target-2"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                          if (dragOverTarget !== 2) setDragOverTarget(2);
                        }}
                        onDragEnter={(e) => {
                          e.preventDefault();
                          setDragOverTarget(2);
                        }}
                        onDragLeave={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                            if (dragOverTarget === 2) setDragOverTarget(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOverTarget(null);
                          let tile = '';
                          let fromBox: 1 | 2 | null = null;
                          try {
                            const raw = e.dataTransfer.getData('application/json');
                            if (raw) {
                              const parsed = JSON.parse(raw);
                              tile = parsed.tile;
                              fromBox = parsed.fromBox;
                            }
                          } catch {}
                          if (!tile) {
                            tile = e.dataTransfer.getData('text/plain') || draggedTile || '';
                            fromBox = dragSourceBox;
                          }
                          if (tile) {
                            handlePlaceInBox(2, tile, fromBox);
                          }
                          setDraggedTile(null);
                          setDragSourceBox(null);
                        }}
                        className={`relative min-w-[125px] sm:min-w-[145px] h-12 px-3 py-1.5 rounded-xl border-2 flex items-center justify-center transition-all ${
                          dragOverTarget === 2
                            ? 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900/60 ring-4 ring-cyan-400/50 scale-105 shadow-md border-solid'
                            : drop2
                            ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 text-cyan-800 dark:text-cyan-200 font-mono font-bold shadow-sm'
                            : 'border-dashed border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/60 text-slate-400'
                        }`}
                      >
                        {dragOverTarget === 2 ? (
                          <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 animate-pulse">
                            Drop 2nd Term
                          </span>
                        ) : drop2 ? (
                          <div
                            draggable={!isCurrentSubmitted}
                            onDragStart={(e) => {
                              e.stopPropagation();
                              e.dataTransfer.setData('text/plain', drop2);
                              e.dataTransfer.setData(
                                'application/json',
                                JSON.stringify({ tile: drop2, fromBox: 2 })
                              );
                              e.dataTransfer.effectAllowed = 'move';
                              setDraggedTile(drop2);
                              setDragSourceBox(2);
                            }}
                            onDragEnd={() => {
                              setDraggedTile(null);
                              setDragSourceBox(null);
                              setDragOverTarget(null);
                            }}
                            onPointerDown={(e) => handleTilePointerDown(e, drop2, 2)}
                            className="w-full flex items-center justify-between gap-1.5 cursor-grab active:cursor-grabbing text-sm sm:text-base"
                            title="Drag to Box 1 or click X to remove"
                          >
                            <div className="flex items-center gap-1">
                              <GripVertical className="w-3.5 h-3.5 text-cyan-600/70" />
                              <span>{drop2}</span>
                            </div>
                            {!isCurrentSubmitted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFromBox(2);
                                }}
                                title="Remove term"
                                className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic text-xs font-sans">
                            [ Drag 2nd Term ]
                          </span>
                        )}
                      </div>

                      <span>{qTyped.templateSuffix}</span>
                    </div>

                    {(drop1 || drop2) && !isCurrentSubmitted && (
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: { drop1: undefined, drop2: undefined },
                            }))
                          }
                          className="text-xs font-medium text-slate-500 hover:text-rose-500 underline transition"
                        >
                          Clear Both Terms
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Draggable Tiles Pool */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Available Expression Tiles (Drag to Place):
                      </p>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        Drag onto either box, or tap to place
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {qTyped.draggableOptions.map((opt, i) => {
                        const isUsedIn1 = drop1 === opt;
                        const isUsedIn2 = drop2 === opt;
                        const isUsed = isUsedIn1 || isUsedIn2;

                        return (
                          <div
                            key={i}
                            draggable={!isCurrentSubmitted && !isUsed}
                            onDragStart={(e) => {
                              if (isUsed || isCurrentSubmitted) return;
                              e.dataTransfer.setData('text/plain', opt);
                              e.dataTransfer.setData(
                                'application/json',
                                JSON.stringify({ tile: opt, fromBox: null })
                              );
                              e.dataTransfer.effectAllowed = 'copyMove';
                              setDraggedTile(opt);
                              setDragSourceBox(null);
                            }}
                            onDragEnd={() => {
                              setDraggedTile(null);
                              setDragSourceBox(null);
                              setDragOverTarget(null);
                            }}
                            onPointerDown={(e) => {
                              if (isUsed || isCurrentSubmitted) return;
                              handleTilePointerDown(e, opt, null);
                            }}
                            onClick={() => {
                              if (isUsed || isCurrentSubmitted) return;
                              handleBankTileClick(opt);
                            }}
                            className={`group px-3.5 py-2 rounded-xl text-sm font-mono font-bold transition flex items-center gap-1.5 select-none ${
                              isUsed
                                ? 'opacity-35 bg-slate-100 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                                : draggedTile === opt
                                ? 'opacity-50 ring-2 ring-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-700 dark:text-cyan-300 cursor-grabbing shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30 hover:shadow-md cursor-grab active:cursor-grabbing hover:-translate-y-0.5'
                            }`}
                            title={
                              isUsed
                                ? `Placed in ${isUsedIn1 ? '1st' : '2nd'} box`
                                : 'Drag into (x, y) formula box'
                            }
                          >
                            {!isUsed && (
                              <GripVertical className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                            )}
                            <span>{opt}</span>
                            {isUsed && (
                              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-slate-400 ml-1">
                                ({isUsedIn1 ? 'Box 1' : 'Box 2'})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q2: HOT SPOT SELECTION */}
            {currentQ.type === 'hot-spot' && (() => {
              const qTyped = currentQ as Q2HotSpot;
              const selectedId = currentAnswer?.selectedId;

              // Grid conversion helper
              const size = 360;
              const min = -8;
              const max = 8;
              const toSvgX = (x: number) => ((x - min) / (max - min)) * size;
              const toSvgY = (y: number) => size - ((y - min) / (max - min)) * size;

              return (
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* SVG Coordinate Grid */}
                  <div className="relative p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner">
                    <svg
                      width={size}
                      height={size}
                      className="rounded-lg select-none"
                      viewBox={`0 0 ${size} ${size}`}
                    >
                      {/* Grid background lines */}
                      {Array.from({ length: 17 }).map((_, i) => {
                        const val = min + i;
                        const pos = toSvgX(val);
                        const isAxis = val === 0;
                        return (
                          <React.Fragment key={i}>
                            {/* Vertical line */}
                            <line
                              x1={pos}
                              y1={0}
                              x2={pos}
                              y2={size}
                              stroke={isAxis ? '#334155' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.8}
                              strokeDasharray={isAxis ? undefined : '2,2'}
                              className="dark:stroke-slate-700"
                            />
                            {/* Horizontal line */}
                            <line
                              x1={0}
                              y1={pos}
                              x2={size}
                              y2={pos}
                              stroke={isAxis ? '#334155' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.8}
                              strokeDasharray={isAxis ? undefined : '2,2'}
                              className="dark:stroke-slate-700"
                            />
                          </React.Fragment>
                        );
                      })}

                      {/* Axes Labels */}
                      <text x={size - 14} y={toSvgY(0) - 5} fill="#64748b" fontSize="11" fontWeight="bold">
                        x
                      </text>
                      <text x={toSvgX(0) + 5} y={14} fill="#64748b" fontSize="11" fontWeight="bold">
                        y
                      </text>

                      {/* Line of Reflection (x-axis) highlight */}
                      <line
                        x1={0}
                        y1={toSvgY(0)}
                        x2={size}
                        y2={toSvgY(0)}
                        stroke="#f59e0b"
                        strokeWidth={3}
                      />

                      {/* Pre-Image Triangle PQR */}
                      {(() => {
                        const pts = qTyped.preImageVertices
                          .map(([x, y]) => `${toSvgX(x)},${toSvgY(y)}`)
                          .join(' ');
                        return (
                          <g>
                            <polygon
                              points={pts}
                              fill="rgba(59, 130, 246, 0.25)"
                              stroke="#2563eb"
                              strokeWidth={2}
                            />
                            <text
                              x={toSvgX(-4)}
                              y={toSvgY(3.5)}
                              fill="#1d4ed8"
                              fontSize="11"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              Pre-Image PQR
                            </text>
                          </g>
                        );
                      })()}

                      {/* Candidate Hot Spot Figures */}
                      {qTyped.figures.map((fig) => {
                        const pts = fig.vertices
                          .map(([x, y]) => `${toSvgX(x)},${toSvgY(y)}`)
                          .join(' ');
                        const isSelected = selectedId === fig.id;
                        // Center of polygon for label
                        const avgX =
                          fig.vertices.reduce((sum, v) => sum + v[0], 0) / fig.vertices.length;
                        const avgY =
                          fig.vertices.reduce((sum, v) => sum + v[1], 0) / fig.vertices.length;

                        return (
                          <g
                            key={fig.id}
                            className="cursor-pointer"
                            onClick={() => {
                              if (isCurrentSubmitted) return;
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { selectedId: fig.id },
                              }));
                            }}
                          >
                            <polygon
                              points={pts}
                              fill={
                                isSelected
                                  ? 'rgba(6, 182, 212, 0.45)'
                                  : 'rgba(148, 163, 184, 0.18)'
                              }
                              stroke={isSelected ? '#0891b2' : '#64748b'}
                              strokeWidth={isSelected ? 3 : 1.5}
                              className="transition-all hover:fill-cyan-400/30"
                            />
                            <circle
                              cx={toSvgX(avgX)}
                              cy={toSvgY(avgY)}
                              r={13}
                              fill={isSelected ? '#0891b2' : '#475569'}
                            />
                            <text
                              x={toSvgX(avgX)}
                              y={toSvgY(avgY) + 4}
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {fig.label.replace('Figure ', '')}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Hot Spot Selection Cards */}
                  <div className="flex-1 space-y-3 w-full">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Click a Hot Spot on the grid or choose below:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {qTyped.figures.map((fig) => {
                        const isSelected = selectedId === fig.id;
                        return (
                          <button
                            key={fig.id}
                            type="button"
                            disabled={isCurrentSubmitted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { selectedId: fig.id },
                              }))
                            }
                            className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                                isSelected
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {fig.label.replace('Figure ', '')}
                            </span>
                            <div>
                              <div className="text-xs font-bold">{fig.label}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                {fig.quadrant}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q3: INLINE CHOICE (DROPDOWNS) */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'u1-dstaar-3' && (() => {
              const qTyped = currentQ as Q3InlineChoice;
              const sel1 = currentAnswer?.sel1 || '';
              const sel2 = currentAnswer?.sel2 || '';

              return (
                <div className="space-y-6 text-slate-800 dark:text-slate-200">
                  <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    {/* Statement 1 */}
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-loose">
                      <span>{qTyped.statement1Prefix}</span>
                      <select
                        disabled={isCurrentSubmitted}
                        value={sel1}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), sel1: e.target.value },
                          }))
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-cyan-500 outline-none"
                      >
                        <option value="">[ Select Rule ]</option>
                        {qTyped.dropdown1Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Statement 2 */}
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-loose">
                      <span>{qTyped.statement2Prefix}</span>
                      <select
                        disabled={isCurrentSubmitted}
                        value={sel2}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), sel2: e.target.value },
                          }))
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-cyan-500 outline-none"
                      >
                        <option value="">[ Select Coordinates ]</option>
                        {qTyped.dropdown2Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q4: MATCH / TABLE GRID */}
            {currentQ.type === 'table-grid' && (() => {
              const qTyped = currentQ as Q4TableGrid;
              const selections = currentAnswer?.selections || {};

              const handleSelectCell = (rowId: string, categoryId: string) => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: {
                    ...(prev[currentIndex] || {}),
                    selections: {
                      ...(prev[currentIndex]?.selections || {}),
                      [rowId]: categoryId,
                    },
                  },
                }));
              };

              return (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {qTyped.instruction}
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">
                            Transformation Rule
                          </th>
                          {qTyped.categories.map((cat) => (
                            <th
                              key={cat.id}
                              className="p-3.5 text-center font-bold text-slate-700 dark:text-slate-300 w-44"
                            >
                              {cat.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {qTyped.rows.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                              {row.rule}
                            </td>
                            {qTyped.categories.map((cat) => {
                              const isSelected = selections[row.id] === cat.id;
                              return (
                                <td
                                  key={cat.id}
                                  onClick={() => handleSelectCell(row.id, cat.id)}
                                  className="p-3.5 text-center cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`grid-row-${row.id}`}
                                    checked={isSelected}
                                    disabled={isCurrentSubmitted}
                                    onChange={() => handleSelectCell(row.id, cat.id)}
                                    className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}

            {/* Q5: EQUATION / NUMERIC ENTRY */}
            {currentQ.type === 'numeric-entry' && (() => {
              const qTyped = currentQ as Q5NumericEntry;
              const valX = currentAnswer?.valX || '';
              const valY = currentAnswer?.valY || '';

              return (
                <div className="space-y-6">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg space-y-4">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Coordinate Entry Boxes:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* X coordinate */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {qTyped.xInputLabel}:
                        </label>
                        <input
                          type="text"
                          disabled={isCurrentSubmitted}
                          value={valX}
                          placeholder="e.g. 2.5"
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: { ...(prev[currentIndex] || {}), valX: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                      </div>

                      {/* Y coordinate */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {qTyped.yInputLabel}:
                        </label>
                        <input
                          type="text"
                          disabled={isCurrentSubmitted}
                          value={valY}
                          placeholder="e.g. -3.5"
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: { ...(prev[currentIndex] || {}), valY: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q6: TRADITIONAL SELECTED RESPONSE WITH HIGH-CONTRAST GRAPH */}
            {currentQ.type === 'selected-response' && (() => {
              const qTyped = currentQ as Q6SelectedResponse;
              const selectedId = currentAnswer?.selectedId;

              const size = 320;
              const min = -8;
              const max = 8;
              const toSvgX = (x: number) => ((x - min) / (max - min)) * size;
              const toSvgY = (y: number) => size - ((y - min) / (max - min)) * size;

              return (
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* Graph */}
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner [--label-halo:#ffffff] dark:[--label-halo:#0f172a]">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                      {/* Grid Lines */}
                      {Array.from({ length: 17 }).map((_, i) => {
                        const val = min + i;
                        const pos = toSvgX(val);
                        const isAxis = val === 0;
                        return (
                          <React.Fragment key={i}>
                            <line
                              x1={pos}
                              y1={0}
                              x2={pos}
                              y2={size}
                              stroke={isAxis ? '#1e293b' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.7}
                              className="dark:stroke-slate-700"
                            />
                            <line
                              x1={0}
                              y1={pos}
                              x2={size}
                              y2={pos}
                              stroke={isAxis ? '#1e293b' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.7}
                              className="dark:stroke-slate-700"
                            />
                          </React.Fragment>
                        );
                      })}

                      {/* Origin label */}
                      <circle cx={toSvgX(0)} cy={toSvgY(0)} r={3} fill="#0ea5e9" />

                      {/* Pre-Image Triangle ABC (Blue) */}
                      {(() => {
                        const pts = qTyped.preImageVertices
                          .map((v) => `${toSvgX(v.x)},${toSvgY(v.y)}`)
                          .join(' ');

                        // Non-overlapping placements positioned in clear exterior space:
                        // A(2, 4): edges point right -> place label to the left of vertex
                        // B(5, 7): edges point down & left -> place label to top-right of vertex
                        // C(5, 2): edges point up & left -> place label to bottom-right of vertex
                        const getPreImageLabelPos = (label: string, x: number, y: number) => {
                          if (label.startsWith('A')) {
                            return { x: toSvgX(x) - 10, y: toSvgY(y), anchor: 'end' as const, baseline: 'central' as const };
                          }
                          if (label.startsWith('B')) {
                            return { x: toSvgX(x) + 9, y: toSvgY(y) - 4, anchor: 'start' as const, baseline: 'central' as const };
                          }
                          return { x: toSvgX(x) + 9, y: toSvgY(y) + 4, anchor: 'start' as const, baseline: 'central' as const };
                        };

                        return (
                          <g>
                            <polygon
                              points={pts}
                              fill="rgba(59, 130, 246, 0.25)"
                              stroke="#2563eb"
                              strokeWidth={2}
                            />
                            {qTyped.preImageVertices.map((v) => {
                              const pos = getPreImageLabelPos(v.label, v.x, v.y);
                              return (
                                <React.Fragment key={v.label}>
                                  <circle cx={toSvgX(v.x)} cy={toSvgY(v.y)} r={4} fill="#2563eb" />
                                  <text
                                    x={pos.x}
                                    y={pos.y}
                                    textAnchor={pos.anchor}
                                    dominantBaseline={pos.baseline}
                                    fontSize="13"
                                    fontWeight="bold"
                                    fontFamily="system-ui, -apple-system, sans-serif"
                                    className="fill-blue-700 dark:fill-blue-300 select-none"
                                    style={{
                                      paintOrder: 'stroke fill',
                                      stroke: 'var(--label-halo, #ffffff)',
                                      strokeWidth: '4px',
                                      strokeLinejoin: 'round',
                                    }}
                                  >
                                    {v.label}
                                  </text>
                                </React.Fragment>
                              );
                            })}
                          </g>
                        );
                      })()}

                      {/* Image Triangle A'B'C' (Indigo) */}
                      {(() => {
                        const pts = qTyped.imageVertices
                          .map((v) => `${toSvgX(v.x)},${toSvgY(v.y)}`)
                          .join(' ');

                        // Non-overlapping placements positioned in clear exterior space:
                        // A'(-4, 2): edges point upward -> place label directly below vertex
                        // B'(-7, 5): edges point down-right & right -> place label cleanly above vertex B'
                        // C'(-2, 5): edges point left & down-left -> place label to the right of vertex C'
                        const getImageLabelPos = (label: string, x: number, y: number) => {
                          if (label.startsWith('A')) {
                            return { x: toSvgX(x), y: toSvgY(y) + 16, anchor: 'middle' as const, baseline: 'hanging' as const };
                          }
                          if (label.startsWith('B')) {
                            return { x: toSvgX(x) + 6, y: toSvgY(y) - 12, anchor: 'middle' as const, baseline: 'central' as const };
                          }
                          return { x: toSvgX(x) + 9, y: toSvgY(y) - 4, anchor: 'start' as const, baseline: 'central' as const };
                        };

                        return (
                          <g>
                            <polygon
                              points={pts}
                              fill="rgba(99, 102, 241, 0.25)"
                              stroke="#4f46e5"
                              strokeWidth={2}
                            />
                            {qTyped.imageVertices.map((v) => {
                              const pos = getImageLabelPos(v.label, v.x, v.y);
                              const baseLetter = v.label.replace(/['′]/g, '');
                              return (
                                <React.Fragment key={v.label}>
                                  <circle cx={toSvgX(v.x)} cy={toSvgY(v.y)} r={4} fill="#4f46e5" />
                                  <text
                                    x={pos.x}
                                    y={pos.y}
                                    textAnchor={pos.anchor}
                                    dominantBaseline={pos.baseline}
                                    fontSize="13"
                                    fontWeight="bold"
                                    fontFamily="system-ui, -apple-system, sans-serif"
                                    className="fill-indigo-700 dark:fill-indigo-300 select-none"
                                    style={{
                                      paintOrder: 'stroke fill',
                                      stroke: 'var(--label-halo, #ffffff)',
                                      strokeWidth: '4px',
                                      strokeLinejoin: 'round',
                                    }}
                                  >
                                    {baseLetter}
                                    <tspan
                                      fontSize="17"
                                      fontWeight="900"
                                      dx="1"
                                      dy="-2"
                                      className="fill-indigo-950 dark:fill-indigo-100"
                                      style={{
                                        paintOrder: 'stroke fill',
                                        stroke: 'var(--label-halo, #ffffff)',
                                        strokeWidth: '4px',
                                        strokeLinejoin: 'round',
                                      }}
                                    >
                                      ′
                                    </tspan>
                                  </text>
                                </React.Fragment>
                              );
                            })}
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* 4 Answer Choice Cards */}
                  <div className="flex-1 space-y-2.5 w-full">
                    {qTyped.options.map((opt) => {
                      const isSelected = selectedId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isCurrentSubmitted}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: { selectedId: opt.id },
                            }))
                          }
                          className={`w-full p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                            isSelected
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-400 font-semibold'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isSelected
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="font-mono text-sm sm:text-base">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Q7: MULTI-PART CHALLENGE */}
            {currentQ.type === 'multi-part' && (() => {
              const qTyped = currentQ as Q7MultiPart;
              const partA = currentAnswer?.partA || '';
              const partB = currentAnswer?.partB || '';

              return (
                <div className="space-y-6">
                  {/* Part A */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {renderQ7Text(qTyped.partA.prompt)}
                    </p>
                    <div className="flex items-center gap-2">
                      <select
                        disabled={isCurrentSubmitted}
                        value={partA}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), partA: e.target.value },
                          }))
                        }
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                      >
                        <option value="">[ Select Ordered Pair ]</option>
                        {qTyped.partA.dropdownOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Part B */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {renderQ7Text(qTyped.partB.prompt)}
                    </p>
                    <div className="space-y-2">
                      {qTyped.partB.options.map((opt) => {
                        const isSelected = partB === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={isCurrentSubmitted}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { ...(prev[currentIndex] || {}), partB: opt.id },
                              }))
                            }
                            className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition flex items-start gap-2.5 ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-1 ring-cyan-400 font-semibold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="partB-opt"
                              checked={isSelected}
                              disabled={isCurrentSubmitted}
                              readOnly
                              className="mt-0.5"
                            />
                            <span>{renderQ7Text(opt.text)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q8 & Q11: MULTIPLE SELECT (CHECKBOXES) */}
            {currentQ.type === 'multiple-select' && (() => {
              const qTyped = currentQ as Q8MultipleSelect | Q11MultipleSelect;
              const selected: string[] = currentAnswer?.selected || [];

              const toggleOption = (id: string) => {
                if (isCurrentSubmitted) return;
                const next = selected.includes(id)
                  ? selected.filter((item) => item !== id)
                  : [...selected, id];
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: { selected: next },
                }));
              };

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {qTyped.instruction}
                    </p>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Selected: {selected.length} / 2
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {qTyped.options.map((opt) => {
                      const isChecked = selected.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isCurrentSubmitted}
                          onClick={() => toggleOption(opt.id)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-start gap-3 ${
                            isChecked
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-950 dark:text-cyan-100 ring-2 ring-cyan-400 font-semibold'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition flex-shrink-0 ${
                              isChecked
                                ? 'bg-cyan-600 border-cyan-600 text-white'
                                : 'border-slate-400 dark:border-slate-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Q9: GRAPHING / COORDINATE PLOTTING */}
            {currentQ.type === 'graphing' && (() => {
              const qTyped = currentQ as Q9Graphing;
              const plotted: { x: number; y: number }[] = currentAnswer?.plotted || [];

              const size = 360;
              const min = qTyped.gridRange.minX;
              const max = qTyped.gridRange.maxX;
              const toSvgX = (x: number) => ((x - min) / (max - min)) * size;
              const toSvgY = (y: number) => size - ((y - min) / (max - min)) * size;

              const handleGridClick = (e: React.MouseEvent<SVGSVGElement>) => {
                if (isCurrentSubmitted) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                // Map SVG click to nearest integer coordinate
                const mathX = Math.round(min + (clickX / size) * (max - min));
                const mathY = Math.round(min + (1 - clickY / size) * (max - min));

                // If already plotted, remove it (toggle); else add if < 2
                const existingIdx = plotted.findIndex((p) => p.x === mathX && p.y === mathY);
                let next = [...plotted];
                if (existingIdx >= 0) {
                  next.splice(existingIdx, 1);
                } else {
                  if (next.length >= qTyped.targetEndpoints.length) {
                    next.shift(); // remove oldest to allow re-placing
                  }
                  next.push({ x: mathX, y: mathY });
                }

                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: { plotted: next },
                }));
              };

              return (
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* Interactive SVG Canvas */}
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner">
                    <svg
                      width={size}
                      height={size}
                      onClick={handleGridClick}
                      className="cursor-crosshair select-none"
                      viewBox={`0 0 ${size} ${size}`}
                    >
                      {/* Grid lines */}
                      {Array.from({ length: max - min + 1 }).map((_, i) => {
                        const val = min + i;
                        const pos = toSvgX(val);
                        const isAxis = val === 0;
                        return (
                          <React.Fragment key={i}>
                            <line
                              x1={pos}
                              y1={0}
                              x2={pos}
                              y2={size}
                              stroke={isAxis ? '#1e293b' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.8}
                              className="dark:stroke-slate-700"
                            />
                            <line
                              x1={0}
                              y1={pos}
                              x2={size}
                              y2={pos}
                              stroke={isAxis ? '#1e293b' : '#cbd5e1'}
                              strokeWidth={isAxis ? 2 : 0.8}
                              className="dark:stroke-slate-700"
                            />
                            {/* Tick numbers */}
                            {val !== 0 && (
                              <>
                                <text
                                  x={pos}
                                  y={toSvgY(0) + 12}
                                  fontSize="9"
                                  fill="#64748b"
                                  textAnchor="middle"
                                >
                                  {val}
                                </text>
                                <text
                                  x={toSvgX(0) - 8}
                                  y={pos + 3}
                                  fontSize="9"
                                  fill="#64748b"
                                  textAnchor="middle"
                                >
                                  {val}
                                </text>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}

                      {/* Highlight reflection axis (x-axis) */}
                      <line
                        x1={0}
                        y1={toSvgY(0)}
                        x2={size}
                        y2={toSvgY(0)}
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                      />

                      {/* Pre-Image Segment AB (Blue) */}
                      <line
                        x1={toSvgX(qTyped.preImageEndpoints[0].x)}
                        y1={toSvgY(qTyped.preImageEndpoints[0].y)}
                        x2={toSvgX(qTyped.preImageEndpoints[1].x)}
                        y2={toSvgY(qTyped.preImageEndpoints[1].y)}
                        stroke="#2563eb"
                        strokeWidth={2.5}
                      />
                      {qTyped.preImageEndpoints.map((pt) => (
                        <g key={pt.label}>
                          <circle cx={toSvgX(pt.x)} cy={toSvgY(pt.y)} r={5} fill="#2563eb" />
                          <text
                            x={toSvgX(pt.x) + 7}
                            y={toSvgY(pt.y) - 5}
                            fill="#1e40af"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            {pt.label}({pt.x}, {pt.y})
                          </text>
                        </g>
                      ))}

                      {/* User Plotted Points & Line (Cyan) */}
                      {plotted.length === 2 && (
                        <line
                          x1={toSvgX(plotted[0].x)}
                          y1={toSvgY(plotted[0].y)}
                          x2={toSvgX(plotted[1].x)}
                          y2={toSvgY(plotted[1].y)}
                          stroke="#0891b2"
                          strokeWidth={2.5}
                          strokeDasharray="4,4"
                        />
                      )}
                      {plotted.map((pt, i) => (
                        <g key={i}>
                          <circle
                            cx={toSvgX(pt.x)}
                            cy={toSvgY(pt.y)}
                            r={6}
                            fill="#06b6d4"
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                          <text
                            x={toSvgX(pt.x) + 8}
                            y={toSvgY(pt.y) + 12}
                            fill="#0891b2"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            ({pt.x}, {pt.y})
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Plotted Points Status & Clear Controls */}
                  <div className="flex-1 space-y-4 w-full">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Graphing Directions:
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Click on the grid to plot the 2 reflected endpoints: <strong>A'</strong> and{' '}
                        <strong>B'</strong>. Click a point again to remove it.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="text-slate-500">Points Plotted:</span>
                        <span
                          className={`font-bold ${
                            plotted.length === 2 ? 'text-emerald-500' : 'text-amber-500'
                          }`}
                        >
                          {plotted.length} / 2
                        </span>
                      </div>
                      {plotted.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {plotted.map((p, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200 font-mono text-xs border border-cyan-300 dark:border-cyan-800 font-bold"
                            >
                              Endpoint {idx + 1}: ({p.x}, {p.y})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {plotted.length > 0 && !isCurrentSubmitted && (
                      <button
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { plotted: [] },
                          }))
                        }
                        className="text-xs font-medium text-rose-500 hover:text-rose-600 underline"
                      >
                        Clear All Plotted Points
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Q10: DRAG & DROP CLASSIFICATION */}
            {currentQ.type === 'classification' && (() => {
              const qTyped = currentQ as Q10Classification;
              const assignments: Record<string, string> = currentAnswer?.assignments || {};

              const handleAssign = (cardId: string, categoryId: string) => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: {
                    ...(prev[currentIndex] || {}),
                    assignments: {
                      ...(prev[currentIndex]?.assignments || {}),
                      [cardId]: categoryId,
                    },
                  },
                }));
              };

              return (
                <div className="space-y-6">
                  {/* Two Destination Bins */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {qTyped.categories.map((cat) => {
                      const assignedCards = qTyped.cards.filter(
                        (c) => assignments[c.id] === cat.id
                      );
                      return (
                        <div
                          key={cat.id}
                          className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 space-y-3 min-h-[160px]"
                        >
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {cat.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {cat.subtitle}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {assignedCards.map((card) => (
                              <div
                                key={card.id}
                                className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400 dark:border-cyan-800 text-xs flex items-center justify-between font-mono font-bold text-cyan-900 dark:text-cyan-200"
                              >
                                <span>{card.rule}</span>
                                {!isCurrentSubmitted && (
                                  <button
                                    onClick={() => handleAssign(card.id, '')}
                                    className="text-slate-400 hover:text-rose-500 ml-2 text-[11px] font-sans"
                                  >
                                    ✕ Remove
                                  </button>
                                )}
                              </div>
                            ))}
                            {assignedCards.length === 0 && (
                              <div className="py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                Drag or select cards to place here
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cards to Classify */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Transformation Rules to Classify:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {qTyped.cards.map((card) => {
                        const currentCat = assignments[card.id];
                        return (
                          <div
                            key={card.id}
                            className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-2.5 ${
                              currentCat
                                ? 'opacity-50 bg-slate-100 dark:bg-slate-800 border-slate-300'
                                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm'
                            }`}
                          >
                            <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                              {card.rule}
                            </span>
                            {!isCurrentSubmitted && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleAssign(card.id, 'enlargement')}
                                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition ${
                                    currentCat === 'enlargement'
                                      ? 'bg-cyan-600 text-white border-cyan-600'
                                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-cyan-500'
                                  }`}
                                >
                                  Enlargement
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAssign(card.id, 'reduction')}
                                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition ${
                                    currentCat === 'reduction'
                                      ? 'bg-cyan-600 text-white border-cyan-600'
                                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-cyan-500'
                                  }`}
                                >
                                  Reduction
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q12: INLINE CHOICE ADVANCED COMPOSITION */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'u1-dstaar-12' && (() => {
              const qTyped = currentQ as Q12InlineChoiceComposition;
              const sel1 = currentAnswer?.sel1 || '';
              const sel2 = currentAnswer?.sel2 || '';
              const sel3 = currentAnswer?.sel3 || '';

              return (
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-200">
                  {/* Statement 1 */}
                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-loose">
                    <span>{qTyped.statement1Prefix}</span>
                    <select
                      disabled={isCurrentSubmitted}
                      value={sel1}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...(prev[currentIndex] || {}), sel1: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                    >
                      <option value="">[ Select Coordinates ]</option>
                      {qTyped.dropdown1Options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Statement 2 */}
                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-loose">
                    <span>{qTyped.statement2Prefix}</span>
                    <select
                      disabled={isCurrentSubmitted}
                      value={sel2}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...(prev[currentIndex] || {}), sel2: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                    >
                      <option value="">[ Select Coordinates ]</option>
                      {qTyped.dropdown2Options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Statement 3 */}
                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-loose">
                    <span>{qTyped.dropdown3Label}</span>
                    <select
                      disabled={isCurrentSubmitted}
                      value={sel3}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...(prev[currentIndex] || {}), sel3: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                    >
                      <option value="">[ Select Invariant Property ]</option>
                      {qTyped.dropdown3Options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Immediate Feedback Banner (When Submitted) */}
          {isCurrentSubmitted && (
            <div
              className={`p-5 rounded-xl border space-y-3 transition-all ${
                currentIsCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2.5 font-bold text-base">
                {currentIsCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>Correct Response!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                    <span>Incorrect — Review the Solution Explanation</span>
                  </>
                )}
              </div>

              <div className="text-xs sm:text-sm whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
                {currentQ.number === 7
                  ? renderQ7Text(currentQ.solutionExplanation)
                  : currentQ.solutionExplanation}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 pl-7 text-xs font-semibold text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>STAAR Key Takeaway: {currentQ.keyTakeaway}</span>
              </div>
            </div>
          )}

          {/* Action Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-3">
              {!isCurrentSubmitted ? (
                <button
                  onClick={handleSubmitCurrent}
                  disabled={!isAnswerProvided()}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Response
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-md transition"
                >
                  {currentIndex === totalQuestions - 1 ? 'Finish & View Results' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Comprehensive Diagnostic Screen */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 space-y-8">
          {/* Header Trophy Card */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Simulator Diagnostic Complete!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              You completed all 12 technology-enhanced questions simulating the Grade 8 STAAR Transformations standards.
            </p>
          </div>

          {/* Score Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Final Score
              </div>
              <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
                {score} / {totalQuestions}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Accuracy
              </div>
              <div
                className={`text-3xl font-extrabold ${
                  accuracy >= 70 ? 'text-emerald-500' : 'text-amber-500'
                }`}
              >
                {accuracy}%
              </div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Simulator Performance
              </div>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                {accuracy >= 75
                  ? 'Strong Performance'
                  : accuracy >= 50
                  ? 'Developing'
                  : 'Needs Practice'}
              </div>
            </div>
          </div>

          {/* Detailed Skill Breakdown */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-500" />
              Performance by TEKS & Topic
            </h4>
            <div className="space-y-2.5">
              {Object.entries(performanceByTopic).map(([topic, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div
                    key={topic}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {topic}
                      </div>
                      <div className="text-[11px] text-slate-400">{stats.teks}</div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-12 text-right">
                        {stats.correct}/{stats.total} ({pct}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Links & Pathways */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retake Digital Simulator
            </button>
            {onSwitchPathway && (
              <>
                <button
                  onClick={() => onSwitchPathway('self-check')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
                >
                  Practice in Self Check
                </button>
                <button
                  onClick={() => onSwitchPathway('staar')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold text-sm transition"
                >
                  Practice 36-Question STAAR Bank
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
