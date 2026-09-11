// src/components/DigitalStaarProportionalSimulator.tsx
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
} from 'lucide-react';
import {
  UNIT_2_DIGITAL_STAAR_QUESTIONS,
  Unit2DigitalStaarQuestion,
  Q1DragDropEquation,
  Q2GraphHotSpot,
  Q3TableInlineChoice,
  Q4TableGridUnit2,
  Q5NumericEntryUnit2,
  Q6SelectedResponseUnit2,
  Q7MultiPartUnit2,
  Q8MultipleSelectUnit2,
  Q9GraphingUnit2,
  Q10ClassificationUnit2,
  Q11MultipleSelectUnit2,
  Q12InlineChoiceUnit2,
} from '../data/staar/digitalStaarProportionalData';

interface DigitalStaarProportionalSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

export const DigitalStaarProportionalSimulator: React.FC<DigitalStaarProportionalSimulatorProps> = ({
  topicTitle = 'Proportional vs. Non-Proportional Relationships',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Helper for tap-to-place on mobile
  const [activeSelectedOption, setActiveSelectedOption] = useState<string | null>(null);

  // Q1 Drag & Drop State
  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [isDragOverTarget, setIsDragOverTarget] = useState<boolean>(false);

  // Q10 Classification Drag & Drop State
  const [q10DraggedCardId, setQ10DraggedCardId] = useState<string | null>(null);
  const [q10DragOverZone, setQ10DragOverZone] = useState<string | null>(null);
  const [q10PointerPos, setQ10PointerPos] = useState<{ x: number; y: number } | null>(null);
  const [q10IsPointerDragging, setQ10IsPointerDragging] = useState<boolean>(false);
  const q10PointerDownRef = useRef<{ startX: number; startY: number; cardId: string } | null>(null);

  // Q9 Graph Hover State
  const [graphHoverCoords, setGraphHoverCoords] = useState<{ x: number; y: number } | null>(null);

  const currentQ = UNIT_2_DIGITAL_STAAR_QUESTIONS[currentIndex];
  const isCurrentSubmitted = !!submittedQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = UNIT_2_DIGITAL_STAAR_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'drag-drop-equation': {
        const qTyped = q as Q1DragDropEquation;
        return ans.drop === qTyped.correctDrop;
      }
      case 'graph-hot-spot': {
        const qTyped = q as Q2GraphHotSpot;
        const selected = qTyped.points.find((p) => p.id === ans.selectedId);
        return !!selected && selected.isCorrect;
      }
      case 'inline-choice': {
        if (q.id === 'u2-dstaar-3') {
          const qTyped = q as Q3TableInlineChoice;
          return ans.sel1 === qTyped.correct1 && ans.sel2 === qTyped.correct2;
        } else if (q.id === 'u2-dstaar-12') {
          const qTyped = q as Q12InlineChoiceUnit2;
          return (
            ans.sel1 === qTyped.correct1 &&
            ans.sel2 === qTyped.correct2 &&
            ans.sel3 === qTyped.correct3
          );
        }
        return false;
      }
      case 'table-grid': {
        const qTyped = q as Q4TableGridUnit2;
        const userSelections: Record<string, string> = ans.selections || {};
        return qTyped.rows.every((row) => userSelections[row.id] === row.correctCategory);
      }
      case 'numeric-entry': {
        const qTyped = q as Q5NumericEntryUnit2;
        const val1 = (ans.val1 || '').toString().trim().toLowerCase();
        const val2 = (ans.val2 || '').toString().trim().toLowerCase();
        const correct1 = qTyped.acceptedAnswers1.some((acc) => acc.toLowerCase() === val1);
        const correct2 = qTyped.acceptedAnswers2.some((acc) => acc.toLowerCase() === val2);
        return correct1 && correct2;
      }
      case 'selected-response': {
        const qTyped = q as Q6SelectedResponseUnit2;
        const selectedOpt = qTyped.options.find((o) => o.id === ans.selectedId);
        return !!selectedOpt && selectedOpt.isCorrect;
      }
      case 'multi-part': {
        const qTyped = q as Q7MultiPartUnit2;
        const partACorrect = ans.partA === qTyped.partA.correct;
        const partBCorrect = ans.partB === qTyped.partB.options.find((o) => o.isCorrect)?.id;
        return partACorrect && partBCorrect;
      }
      case 'multiple-select': {
        const qTyped = q as Q8MultipleSelectUnit2 | Q11MultipleSelectUnit2;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }
      case 'graphing': {
        const qTyped = q as Q9GraphingUnit2;
        const plottedPoints: { x: number; y: number }[] = ans.plotted || [];
        if (plottedPoints.length !== qTyped.targetPoints.length) return false;
        return qTyped.targetPoints.every((target) =>
          plottedPoints.some(
            (pt) => Math.abs(pt.x - target.x) < 0.25 && Math.abs(pt.y - target.y) < 0.25
          )
        );
      }
      case 'classification': {
        const qTyped = q as Q10ClassificationUnit2;
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
    setIsDragOverTarget(false);
    setQ10DraggedCardId(null);
    setQ10DragOverZone(null);
    setQ10PointerPos(null);
    setQ10IsPointerDragging(false);
    if (q10PointerDownRef.current) {
      q10PointerDownRef.current = null;
    }
  };

  const handleAssignCardQ10 = (cardId: string, catId: string) => {
    if (isCurrentSubmitted) return;
    setAnswers((prev) => {
      const nextAssignments = { ...(prev[currentIndex]?.assignments || {}) };
      if (catId) {
        nextAssignments[cardId] = catId;
      } else {
        delete nextAssignments[cardId];
      }
      return {
        ...prev,
        [currentIndex]: {
          assignments: nextAssignments,
        },
      };
    });
    setActiveSelectedOption(null);
    setQ10DraggedCardId(null);
    setQ10DragOverZone(null);
    setQ10IsPointerDragging(false);
    setQ10PointerPos(null);
    if (q10PointerDownRef.current) {
      q10PointerDownRef.current = null;
    }
  };

  // Pointer drag event listener for Q10 (Chromebook touchscreen & mouse support)
  useEffect(() => {
    if (currentQ.type !== 'classification' || isCurrentSubmitted) return;

    const handlePointerMove = (e: PointerEvent) => {
      const down = q10PointerDownRef.current;
      if (!down) return;

      const dist = Math.hypot(e.clientX - down.startX, e.clientY - down.startY);
      if (dist > 6) {
        if (!q10IsPointerDragging) {
          setQ10IsPointerDragging(true);
          setQ10DraggedCardId(down.cardId);
        }
        setQ10PointerPos({ x: e.clientX, y: e.clientY });
        const elem = document.elementFromPoint(e.clientX, e.clientY);
        const zone = elem?.closest('[data-drop-zone]')?.getAttribute('data-drop-zone') || null;
        setQ10DragOverZone(zone);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const down = q10PointerDownRef.current;
      if (down) {
        const dist = Math.hypot(e.clientX - down.startX, e.clientY - down.startY);
        if (dist > 6) {
          const elem = document.elementFromPoint(e.clientX, e.clientY);
          const zone = elem?.closest('[data-drop-zone]')?.getAttribute('data-drop-zone');
          if (zone === 'proportional' || zone === 'non-proportional') {
            handleAssignCardQ10(down.cardId, zone);
          } else if (zone === 'unassigned') {
            handleAssignCardQ10(down.cardId, '');
          }
        }
        q10PointerDownRef.current = null;
      }
      setQ10IsPointerDragging(false);
      setQ10DraggedCardId(null);
      setQ10DragOverZone(null);
      setQ10PointerPos(null);
    };

    const handlePointerCancel = () => {
      q10PointerDownRef.current = null;
      setQ10IsPointerDragging(false);
      setQ10DraggedCardId(null);
      setQ10DragOverZone(null);
      setQ10PointerPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [currentQ.type, isCurrentSubmitted, q10IsPointerDragging, currentIndex]);

  const handleNext = () => {
    setActiveSelectedOption(null);
    clearDragState();
    if (currentIndex < UNIT_2_DIGITAL_STAAR_QUESTIONS.length - 1) {
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

  // Check if current question has valid input
  const isAnswerProvided = (): boolean => {
    const ans = currentAnswer;
    if (!ans) return false;
    switch (currentQ.type) {
      case 'drag-drop-equation':
        return !!ans.drop;
      case 'graph-hot-spot':
        return !!ans.selectedId;
      case 'inline-choice':
        if (currentQ.id === 'u2-dstaar-3') {
          return !!(ans.sel1 && ans.sel2 && ans.sel1 !== 'Select a table...' && ans.sel2 !== 'Select reasoning...');
        } else if (currentQ.id === 'u2-dstaar-12') {
          return !!(
            ans.sel1 &&
            ans.sel2 &&
            ans.sel3 &&
            ans.sel1 !== 'Select company...' &&
            ans.sel2 !== 'Select classification...' &&
            ans.sel3 !== 'Select mathematical justification...'
          );
        }
        return false;
      case 'table-grid': {
        const qTyped = currentQ as Q4TableGridUnit2;
        const selections = ans.selections || {};
        return qTyped.rows.every((r) => !!selections[r.id]);
      }
      case 'numeric-entry':
        return !!((ans.val1 || '').toString().trim() && (ans.val2 || '').toString().trim());
      case 'selected-response':
        return !!ans.selectedId;
      case 'multi-part':
        return !!(ans.partA && ans.partA !== 'Select equation...' && ans.partB);
      case 'multiple-select':
        return Array.isArray(ans.selected) && ans.selected.length === 2;
      case 'graphing': {
        const qTyped = currentQ as Q9GraphingUnit2;
        return Array.isArray(ans.plotted) && ans.plotted.length === qTyped.targetPoints.length;
      }
      case 'classification': {
        const qTyped = currentQ as Q10ClassificationUnit2;
        const assignments = ans.assignments || {};
        return qTyped.cards.every((c) => !!assignments[c.id]);
      }
      default:
        return false;
    }
  };

  // Score metrics
  const totalQuestions = UNIT_2_DIGITAL_STAAR_QUESTIONS.length;
  const score = UNIT_2_DIGITAL_STAAR_QUESTIONS.reduce((acc, _, idx) => {
    return acc + (gradeQuestion(idx) ? 1 : 0);
  }, 0);
  const accuracy = Math.round((score / totalQuestions) * 100);

  // Group performance by Topic
  const performanceByTopic = UNIT_2_DIGITAL_STAAR_QUESTIONS.reduce(
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
                <BookOpen className="w-4 h-4" /> STAAR Grade 8 Reference: Proportional & Linear Relationships
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
                  Direct Variation & Proportional Relationships
                </span>
                <p className="text-xs text-slate-300">
                  • Equation form: <code className="text-cyan-300 font-bold">y = kx</code>
                </p>
                <p className="text-xs text-slate-300">
                  • Constant of proportionality / unit rate: <code className="text-cyan-300 font-bold">k = y / x</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Graph is always a straight line passing through the origin <strong className="text-white">(0, 0)</strong>. Initial value = 0.
                </p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Non-Proportional Linear Relationships
                </span>
                <p className="text-xs text-slate-300">
                  • Slope-intercept equation: <code className="text-cyan-300 font-bold">y = mx + b</code> (where <code className="text-cyan-300 font-bold">b ≠ 0</code>)
                </p>
                <p className="text-xs text-slate-300">
                  • Rate of change / slope: <code className="text-cyan-300">m = (y₂ - y₁) / (x₂ - x₁)</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Graph does NOT pass through (0, 0); it has a non-zero y-intercept <strong className="text-white">b</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Question Navigator Bar (1 to 12) */}
        {!resultsView && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              {UNIT_2_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
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
              {currentQ.prompt}
            </h3>
          </div>

          {/* Technology-Enhanced Interactive Workspace */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800/80">
            {/* Q1: DRAG & DROP EQUATION BUILDER */}
            {currentQ.type === 'drag-drop-equation' && (() => {
              const qTyped = currentQ as Q1DragDropEquation;
              const currentDrop = currentAnswer?.drop;

              const handlePlaceTile = (tile: string) => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: { drop: tile },
                }));
                setActiveSelectedOption(null);
              };

              const handleClearBox = () => {
                if (isCurrentSubmitted) return;
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: { drop: null },
                }));
              };

              return (
                <div className="space-y-6">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    {qTyped.scenario}
                  </p>

                  {/* Target Equation Template */}
                  <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 dark:text-slate-200">
                      {qTyped.templatePrefix}
                    </span>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (!isCurrentSubmitted) setIsDragOverTarget(true);
                      }}
                      onDragLeave={() => setIsDragOverTarget(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOverTarget(false);
                        if (draggedTile) handlePlaceTile(draggedTile);
                      }}
                      onClick={() => {
                        if (!isCurrentSubmitted && currentDrop) handleClearBox();
                      }}
                      className={`min-w-20 h-14 px-4 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                        currentDrop
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-bold text-xl shadow-inner'
                          : isDragOverTarget
                          ? 'border-cyan-400 bg-cyan-100/50 dark:bg-cyan-900/40 border-dashed scale-105'
                          : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 border-dashed'
                      }`}
                    >
                      {currentDrop ? (
                        <span className="font-mono text-2xl font-bold">{currentDrop}</span>
                      ) : (
                        <span className="text-xs text-slate-400 font-sans">
                          Drop or tap k
                        </span>
                      )}
                    </div>

                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 dark:text-slate-200">
                      {qTyped.templateSuffix}
                    </span>
                  </div>

                  {/* Available Value Tiles */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                      Available Values for k (Drag or Tap to Select)
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {qTyped.draggableOptions.map((opt) => {
                        const isSelected = currentDrop === opt;
                        return (
                          <div
                            key={opt}
                            draggable={!isCurrentSubmitted}
                            onDragStart={() => setDraggedTile(opt)}
                            onDragEnd={clearDragState}
                            onClick={() => {
                              if (isCurrentSubmitted) return;
                              handlePlaceTile(opt);
                            }}
                            className={`px-4 py-2.5 rounded-xl font-mono font-bold text-lg border transition select-none cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-500 text-white border-cyan-600 shadow-md ring-2 ring-cyan-300'
                                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-xs active:scale-95'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <GripVertical className={`w-3.5 h-3.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`} />
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q2: GRAPH HOT SPOT POINT SELECTION */}
            {currentQ.type === 'graph-hot-spot' && (() => {
              const qTyped = currentQ as Q2GraphHotSpot;
              const selectedId = currentAnswer?.selectedId;

              // SVG Coordinates: 360 x 300
              const padLeft = 55;
              const padBottom = 45;
              const padTop = 25;
              const padRight = 25;
              const svgW = 400;
              const svgH = 320;
              const plotW = svgW - padLeft - padRight;
              const plotH = svgH - padTop - padBottom;

              const toSvgX = (x: number) => padLeft + (x / qTyped.xMax) * plotW;
              const toSvgY = (y: number) => padTop + plotH - (y / qTyped.yMax) * plotH;

              return (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    {qTyped.scenario}
                  </p>

                  <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                    {/* SVG Coordinate Grid */}
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <svg width={svgW} height={svgH} className="max-w-full h-auto select-none">
                        {/* Grid lines */}
                        {Array.from({ length: qTyped.xMax + 1 }, (_, i) => {
                          const sx = toSvgX(i);
                          return (
                            <g key={`x-grid-${i}`}>
                              <line
                                x1={sx}
                                y1={padTop}
                                x2={sx}
                                y2={padTop + plotH}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                              />
                              <text
                                x={sx}
                                y={padTop + plotH + 18}
                                textAnchor="middle"
                                className="text-[11px] font-mono fill-slate-500"
                              >
                                {i}
                              </text>
                            </g>
                          );
                        })}

                        {Array.from({ length: qTyped.yMax / qTyped.yStep + 1 }, (_, i) => {
                          const yVal = i * qTyped.yStep;
                          const sy = toSvgY(yVal);
                          return (
                            <g key={`y-grid-${i}`}>
                              <line
                                x1={padLeft}
                                y1={sy}
                                x2={padLeft + plotW}
                                y2={sy}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                              />
                              <text
                                x={padLeft - 10}
                                y={sy + 4}
                                textAnchor="end"
                                className="text-[11px] font-mono fill-slate-500"
                              >
                                {yVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line
                          x1={padLeft}
                          y1={padTop}
                          x2={padLeft}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />
                        <line
                          x1={padLeft}
                          y1={padTop + plotH}
                          x2={padLeft + plotW}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />

                        {/* Axis Labels */}
                        <text
                          x={padLeft + plotW / 2}
                          y={svgH - 8}
                          textAnchor="middle"
                          className="text-xs font-bold fill-slate-700 dark:fill-slate-300"
                        >
                          {qTyped.xLabel}
                        </text>
                        <text
                          x={15}
                          y={padTop + plotH / 2}
                          textAnchor="middle"
                          transform={`rotate(-90, 15, ${padTop + plotH / 2})`}
                          className="text-xs font-bold fill-slate-700 dark:fill-slate-300"
                        >
                          {qTyped.yLabel}
                        </text>

                        {/* Proportional Line y = 6x */}
                        <line
                          x1={toSvgX(0)}
                          y1={toSvgY(0)}
                          x2={toSvgX(5)}
                          y2={toSvgY(30)}
                          stroke="#06b6d4"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {/* Interactive Hot Spot Points */}
                        {qTyped.points.map((pt) => {
                          const sx = toSvgX(pt.x);
                          const sy = toSvgY(pt.y);
                          const isSelected = selectedId === pt.id;

                          return (
                            <g
                              key={pt.id}
                              onClick={() => {
                                if (isCurrentSubmitted) return;
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: { selectedId: pt.id },
                                }));
                              }}
                              className="cursor-pointer group"
                            >
                              {/* Touch Target */}
                              <circle cx={sx} cy={sy} r="20" fill="transparent" />

                              {/* Highlight Halo when Selected */}
                              {isSelected && (
                                <circle
                                  cx={sx}
                                  cy={sy}
                                  r="14"
                                  fill="#06b6d4"
                                  fillOpacity="0.25"
                                  stroke="#0891b2"
                                  strokeWidth="2"
                                />
                              )}

                              {/* Visible Point Dot */}
                              <circle
                                cx={sx}
                                cy={sy}
                                r={isSelected ? '7' : '5.5'}
                                className={`transition-all duration-200 ${
                                  isSelected
                                    ? 'fill-cyan-500 stroke-white'
                                    : 'fill-slate-800 dark:fill-white stroke-slate-900 group-hover:fill-cyan-400'
                                }`}
                                strokeWidth="2"
                              />

                              {/* Point Label Badge */}
                              <rect
                                x={sx + 8}
                                y={sy - 22}
                                width="78"
                                height="20"
                                rx="4"
                                className={`transition-colors ${
                                  isSelected
                                    ? 'fill-cyan-600 text-white'
                                    : 'fill-slate-800/90 text-white group-hover:fill-cyan-700'
                                }`}
                              />
                              <text
                                x={sx + 47}
                                y={sy - 8}
                                textAnchor="middle"
                                className="text-[10px] font-bold fill-white"
                              >
                                {pt.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Point Selection Cards */}
                    <div className="flex flex-col gap-2.5 w-full max-w-xs">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Select One Plotted Point:
                      </div>
                      {qTyped.points.map((pt) => {
                        const isSelected = selectedId === pt.id;
                        return (
                          <button
                            key={pt.id}
                            type="button"
                            onClick={() => {
                              if (isCurrentSubmitted) return;
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { selectedId: pt.id },
                              }));
                            }}
                            className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-500/20 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-300'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-bold font-mono">
                              {pt.label}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-cyan-500 bg-cyan-500 text-white'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q3: TABLE ANALYSIS & INLINE CHOICE */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'u2-dstaar-3' && (() => {
              const qTyped = currentQ as Q3TableInlineChoice;
              const sel1 = currentAnswer?.sel1 || '';
              const sel2 = currentAnswer?.sel2 || '';

              return (
                <div className="space-y-6">
                  {/* Side-by-side Tables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Table 1 */}
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                        {qTyped.table1Title}
                      </div>
                      <table className="w-full text-xs sm:text-sm text-center border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                              {qTyped.table1XLabel}
                            </th>
                            <th className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">
                              {qTyped.table1YLabel}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {qTyped.table1Rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                            >
                              <td className="py-2 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800/60">
                                {row.x}
                              </td>
                              <td className="py-2 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                                {row.y}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table 2 */}
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                        {qTyped.table2Title}
                      </div>
                      <table className="w-full text-xs sm:text-sm text-center border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                              {qTyped.table2XLabel}
                            </th>
                            <th className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">
                              {qTyped.table2YLabel}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {qTyped.table2Rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                            >
                              <td className="py-2 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800/60">
                                {row.x}
                              </td>
                              <td className="py-2 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                                {row.y}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Inline Choice Sentence Dropdowns */}
                  <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
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
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-cyan-700 dark:text-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                      >
                        {qTyped.dropdown1Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span>.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
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
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-indigo-700 dark:text-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden max-w-full"
                      >
                        {qTyped.dropdown2Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span>.</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q4: MATCH / TABLE GRID */}
            {currentQ.type === 'table-grid' && (() => {
              const qTyped = currentQ as Q4TableGridUnit2;
              const selections: Record<string, string> = currentAnswer?.selections || {};

              return (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    {qTyped.instruction}
                  </p>

                  <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <table className="w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                          <th className="py-3 px-4 text-left font-bold text-slate-700 dark:text-slate-300">
                            Linear Equation
                          </th>
                          {qTyped.categories.map((cat) => (
                            <th
                              key={cat.id}
                              className="py-3 px-3 text-center font-bold text-slate-700 dark:text-slate-300 min-w-36"
                            >
                              {cat.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {qTyped.rows.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-base text-slate-900 dark:text-white">
                              {row.equation}
                            </td>
                            {qTyped.categories.map((cat) => {
                              const isChecked = selections[row.id] === cat.id;
                              return (
                                <td key={cat.id} className="py-3.5 px-3 text-center">
                                  <label className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`grid-row-${row.id}`}
                                      disabled={isCurrentSubmitted}
                                      checked={isChecked}
                                      onChange={() => {
                                        if (isCurrentSubmitted) return;
                                        setAnswers((prev) => ({
                                          ...prev,
                                          [currentIndex]: {
                                            selections: {
                                              ...(prev[currentIndex]?.selections || {}),
                                              [row.id]: cat.id,
                                            },
                                          },
                                        }));
                                      }}
                                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                                    />
                                  </label>
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

            {/* Q5: NUMERIC ENTRY */}
            {currentQ.type === 'numeric-entry' && (() => {
              const qTyped = currentQ as Q5NumericEntryUnit2;
              const val1 = currentAnswer?.val1 || '';
              const val2 = currentAnswer?.val2 || '';

              return (
                <div className="space-y-6">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    {qTyped.context}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Part 1 */}
                    <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        {qTyped.input1Label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          disabled={isCurrentSubmitted}
                          placeholder="Enter answer"
                          value={val1}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...(prev[currentIndex] || {}),
                                val1: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                        />
                        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                          {qTyped.unit1}
                        </span>
                      </div>
                    </div>

                    {/* Part 2 */}
                    <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        {qTyped.input2Label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          disabled={isCurrentSubmitted}
                          placeholder="Enter answer"
                          value={val2}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...(prev[currentIndex] || {}),
                                val2: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                        />
                        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                          {qTyped.unit2}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q6: SELECTED RESPONSE WITH GRAPH */}
            {currentQ.type === 'selected-response' && (() => {
              const qTyped = currentQ as Q6SelectedResponseUnit2;
              const selectedId = currentAnswer?.selectedId;

              // SVG Coordinates: 460 x 360 with generous margins to prevent clipping
              const padLeft = 65;
              const padBottom = 55;
              const padTop = 35;
              const padRight = 45;
              const svgW = 460;
              const svgH = 360;
              const plotW = svgW - padLeft - padRight;
              const plotH = svgH - padTop - padBottom;

              const toSvgX = (x: number) => padLeft + (x / qTyped.xMax) * plotW;
              const toSvgY = (y: number) => padTop + plotH - (y / qTyped.yMax) * plotH;

              return (
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
                    {/* SVG Graphic Container */}
                    <div className="w-full lg:w-auto shrink-0 flex flex-col items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      {/* Legend Header */}
                      <div className="flex items-center justify-between w-full max-w-[460px] pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-xs shrink-0" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">Line J: Jordan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-xs shrink-0" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">Line M: Marcus</span>
                        </div>
                      </div>

                      {/* Responsive Coordinate Grid SVG with complete viewBox */}
                      <svg
                        width={svgW}
                        height={svgH}
                        viewBox={`0 0 ${svgW} ${svgH}`}
                        className="w-full max-w-[460px] h-auto select-none mt-2"
                      >
                        {/* Vertical Grid Lines and Tick Labels for Time (seconds) */}
                        {Array.from({ length: 9 }, (_, i) => {
                          const sx = toSvgX(i);
                          return (
                            <g key={`gx-${i}`}>
                              <line
                                x1={sx}
                                y1={padTop}
                                x2={sx}
                                y2={padTop + plotH}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                              />
                              <line
                                x1={sx}
                                y1={padTop + plotH}
                                x2={sx}
                                y2={padTop + plotH + 5}
                                stroke="currentColor"
                                className="text-slate-400 dark:text-slate-500"
                                strokeWidth="1.5"
                              />
                              <text
                                x={sx}
                                y={padTop + plotH + 18}
                                textAnchor="middle"
                                className="text-[11px] font-mono font-medium fill-slate-600 dark:fill-slate-400"
                              >
                                {i}
                              </text>
                            </g>
                          );
                        })}

                        {/* Horizontal Grid Lines and Tick Labels for Distance (meters) */}
                        {Array.from({ length: 9 }, (_, i) => {
                          const yVal = i * 5;
                          const sy = toSvgY(yVal);
                          const isMajor = i % 2 === 0;
                          return (
                            <g key={`gy-${i}`}>
                              <line
                                x1={padLeft}
                                y1={sy}
                                x2={padLeft + plotW}
                                y2={sy}
                                stroke="currentColor"
                                className={isMajor ? 'text-slate-300 dark:text-slate-700' : 'text-slate-200 dark:text-slate-800'}
                                strokeWidth={isMajor ? '1' : '0.75'}
                                strokeDasharray={!isMajor ? '3 3' : undefined}
                              />
                              <line
                                x1={padLeft - 5}
                                y1={sy}
                                x2={padLeft}
                                y2={sy}
                                stroke="currentColor"
                                className="text-slate-400 dark:text-slate-500"
                                strokeWidth="1.5"
                              />
                              <text
                                x={padLeft - 10}
                                y={sy + 4}
                                textAnchor="end"
                                className="text-[11px] font-mono font-medium fill-slate-600 dark:fill-slate-400"
                              >
                                {yVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line
                          x1={padLeft}
                          y1={padTop}
                          x2={padLeft}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />
                        <line
                          x1={padLeft}
                          y1={padTop + plotH}
                          x2={padLeft + plotW}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />

                        {/* Axis Titles */}
                        <text
                          x={padLeft + plotW / 2}
                          y={padTop + plotH + 42}
                          textAnchor="middle"
                          className="text-xs font-bold fill-slate-800 dark:fill-slate-200 tracking-wide"
                        >
                          {qTyped.xLabel}
                        </text>
                        <text
                          x={20}
                          y={padTop + plotH / 2}
                          textAnchor="middle"
                          transform={`rotate(-90, 20, ${padTop + plotH / 2})`}
                          className="text-xs font-bold fill-slate-800 dark:fill-slate-200 tracking-wide"
                        >
                          {qTyped.yLabel}
                        </text>

                        {/* Runner Line J: Jordan (slope 5, y = 5x) */}
                        <line
                          x1={toSvgX(0)}
                          y1={toSvgY(0)}
                          x2={toSvgX(8)}
                          y2={toSvgY(40)}
                          stroke="#06b6d4"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Line J Badge */}
                        <rect
                          x={toSvgX(6.2) - 40}
                          y={toSvgY(34) - 26}
                          width="66"
                          height="22"
                          rx="6"
                          fill="#0891b2"
                        />
                        <text
                          x={toSvgX(6.2) - 7}
                          y={toSvgY(34) - 11}
                          textAnchor="middle"
                          fill="#ffffff"
                          className="text-xs font-bold"
                        >
                          Line J
                        </text>

                        {/* Runner Line M: Marcus (slope 3, y = 3x) */}
                        <line
                          x1={toSvgX(0)}
                          y1={toSvgY(0)}
                          x2={toSvgX(8)}
                          y2={toSvgY(24)}
                          stroke="#6366f1"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Line M Badge */}
                        <rect
                          x={toSvgX(7.2) - 10}
                          y={toSvgY(21.6) + 10}
                          width="66"
                          height="22"
                          rx="6"
                          fill="#4f46e5"
                        />
                        <text
                          x={toSvgX(7.2) + 23}
                          y={toSvgY(21.6) + 25}
                          textAnchor="middle"
                          fill="#ffffff"
                          className="text-xs font-bold"
                        >
                          Line M
                        </text>

                        {/* Origin Point (0, 0) */}
                        <circle
                          cx={toSvgX(0)}
                          cy={toSvgY(0)}
                          r="4.5"
                          fill="#0f172a"
                          className="dark:fill-slate-200"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />

                        {/* Readable Plotted Points on Line J (Jordan, slope 5) */}
                        {/* Point (2, 10) */}
                        <circle cx={toSvgX(2)} cy={toSvgY(10)} r="5.5" fill="#0891b2" stroke="#ffffff" strokeWidth="2" />
                        <rect x={toSvgX(2) + 7} y={toSvgY(10) - 20} width="52" height="18" rx="4" fill="#0e7490" />
                        <text x={toSvgX(2) + 33} y={toSvgY(10) - 7} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
                          (2, 10)
                        </text>

                        {/* Point (4, 20) */}
                        <circle cx={toSvgX(4)} cy={toSvgY(20)} r="5.5" fill="#0891b2" stroke="#ffffff" strokeWidth="2" />
                        <rect x={toSvgX(4) + 7} y={toSvgY(20) - 20} width="52" height="18" rx="4" fill="#0e7490" />
                        <text x={toSvgX(4) + 33} y={toSvgY(20) - 7} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
                          (4, 20)
                        </text>

                        {/* Point (6, 30) */}
                        <circle cx={toSvgX(6)} cy={toSvgY(30)} r="5.5" fill="#0891b2" stroke="#ffffff" strokeWidth="2" />
                        <rect x={toSvgX(6) - 58} y={toSvgY(30) - 10} width="52" height="18" rx="4" fill="#0e7490" />
                        <text x={toSvgX(6) - 32} y={toSvgY(30) + 3} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
                          (6, 30)
                        </text>

                        {/* Readable Plotted Points on Line M (Marcus, slope 3) */}
                        {/* Point (3, 9) */}
                        <circle cx={toSvgX(3)} cy={toSvgY(9)} r="5.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                        <rect x={toSvgX(3) + 7} y={toSvgY(9) + 4} width="46" height="18" rx="4" fill="#4338ca" />
                        <text x={toSvgX(3) + 30} y={toSvgY(9) + 17} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
                          (3, 9)
                        </text>

                        {/* Point (6, 18) */}
                        <circle cx={toSvgX(6)} cy={toSvgY(18)} r="5.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                        <rect x={toSvgX(6) + 7} y={toSvgY(18) + 4} width="52" height="18" rx="4" fill="#4338ca" />
                        <text x={toSvgX(6) + 33} y={toSvgY(18) + 17} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
                          (6, 18)
                        </text>
                      </svg>
                    </div>

                    {/* Radio Options */}
                    <div className="space-y-3 w-full flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {qTyped.scenario || 'Which statement accurately compares the unit rates (speeds) of the two runners?'}
                      </p>
                      {((qTyped.options && qTyped.options.length > 0)
                        ? qTyped.options
                        : [
                            {
                              id: 'opt-1',
                              label: 'A',
                              text: "Jordan's unit rate is 2 meters per second greater than Marcus's because Jordan runs at 5 meters per second (Line J) and Marcus runs at 3 meters per second (Line M).",
                              isCorrect: true,
                              misconception: '',
                            },
                            {
                              id: 'opt-2',
                              label: 'B',
                              text: "Marcus's unit rate is 2 meters per second greater than Jordan's because Marcus runs at 5 meters per second and Jordan runs at 3 meters per second.",
                              isCorrect: false,
                              misconception: 'Swapped runners: Line J (Jordan) has a unit rate of 5 m/s, which is greater than Line M (Marcus) at 3 m/s.',
                            },
                            {
                              id: 'opt-3',
                              label: 'C',
                              text: 'Jordan and Marcus have the same unit rate because both lines pass through the origin (0, 0).',
                              isCorrect: false,
                              misconception: 'Passing through (0, 0) confirms both relationships are proportional, but equal unit rates require equal slopes.',
                            },
                            {
                              id: 'opt-4',
                              label: 'D',
                              text: "Marcus's unit rate is 2 meters per second greater than Jordan's because a line with a shallower slope represents greater speed.",
                              isCorrect: false,
                              misconception: 'A steeper slope in a distance-time graph represents greater speed (unit rate), not a shallower slope.',
                            },
                          ]
                      ).map((opt) => {
                        const isSelected = selectedId === opt.id;
                        const optionText =
                          opt.text || (opt as any).statement || (opt as any).content || '';

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={isCurrentSubmitted}
                            onClick={() => {
                              if (isCurrentSubmitted) return;
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: { selectedId: opt.id },
                              }));
                            }}
                            className={`w-full p-4 rounded-xl border text-left transition flex items-start gap-3.5 cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 text-cyan-950 dark:text-cyan-100 ring-2 ring-cyan-500/30 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-cyan-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="leading-relaxed text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 flex-1">
                              {optionText}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q7: MULTI-PART LINEAR ANALYSIS */}
            {currentQ.type === 'multi-part' && (() => {
              const qTyped = currentQ as Q7MultiPartUnit2;
              const partA = currentAnswer?.partA || '';
              const partB = currentAnswer?.partB || '';

              return (
                <div className="space-y-6">
                  {/* Part A */}
                  <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
                      Part A: Model Selection
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {qTyped.partA.prompt}
                    </p>
                    <select
                      disabled={isCurrentSubmitted}
                      value={partA}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: {
                            ...(prev[currentIndex] || {}),
                            partA: e.target.value,
                          },
                        }))
                      }
                      className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-sm text-cyan-700 dark:text-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                    >
                      {qTyped.partA.dropdownOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Part B */}
                  <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                      Part B: Justification
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {qTyped.partB.prompt}
                    </p>
                    <div className="space-y-2.5">
                      {(qTyped.partB?.options && qTyped.partB.options.length > 0
                        ? qTyped.partB.options
                        : [
                            {
                              id: 'opt-b-1',
                              text: 'Non-proportional, because when h = 0 hours, g = 450,000 gallons (the graph has a non-zero y-intercept of 450,000).',
                              isCorrect: true,
                            },
                            {
                              id: 'opt-b-2',
                              text: 'Proportional, because the water drains at a steady, constant rate of 15,000 gallons per hour.',
                              isCorrect: false,
                            },
                            {
                              id: 'opt-b-3',
                              text: 'Proportional, because any linear relationship is automatically proportional.',
                              isCorrect: false,
                            },
                            {
                              id: 'opt-b-4',
                              text: 'Non-proportional, because the pool will eventually become empty.',
                              isCorrect: false,
                            },
                          ]
                      ).map((opt) => {
                        const isSelected = partB === opt.id;
                        const optionText =
                          opt.text || (opt as any).statement || (opt as any).label || (opt as any).content || '';

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={isCurrentSubmitted}
                            onClick={() => {
                              if (isCurrentSubmitted) return;
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: {
                                  ...(prev[currentIndex] || {}),
                                  partB: opt.id,
                                },
                              }));
                            }}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-indigo-500 bg-indigo-500 text-white'
                                  : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span
                              className={`leading-relaxed text-xs sm:text-sm font-medium flex-1 ${
                                isSelected
                                  ? 'text-indigo-950 dark:text-indigo-100 font-semibold'
                                  : 'text-slate-800 dark:text-slate-100'
                              }`}
                            >
                              {optionText}
                            </span>
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
              const qTyped = currentQ as Q8MultipleSelectUnit2 | Q11MultipleSelectUnit2;
              const selected: string[] = currentAnswer?.selected || [];

              const defaultQ8Options = [
                {
                  id: 'opt-1',
                  text: 'The graph of the relationship must be a straight line that passes directly through the origin (0, 0).',
                  isCorrect: true,
                  misconception: 'Correct! Every proportional graph must pass through (0, 0).',
                },
                {
                  id: 'opt-2',
                  text: 'The graph always has a non-zero vertical y-intercept located at (0, k).',
                  isCorrect: false,
                  misconception: 'The y-intercept of a proportional relationship is always (0, 0), not (0, k).',
                },
                {
                  id: 'opt-3',
                  text: 'The y-values must always be positive whole numbers for all possible x-values.',
                  isCorrect: false,
                  misconception: 'Proportional relationships can include negative numbers, fractions, and decimals.',
                },
                {
                  id: 'opt-4',
                  text: 'The ratio y/x is constant for every ordered pair where x ≠ 0, and this ratio equals the slope k.',
                  isCorrect: true,
                  misconception: 'Correct! In y = kx, y/x = k for all non-zero pairs.',
                },
                {
                  id: 'opt-5',
                  text: 'The relationship can always be modeled by an equation in the form y = mx + b, where b > 0.',
                  isCorrect: false,
                  misconception: 'If b > 0, the relationship is non-proportional. For proportional relationships, b must equal 0.',
                },
              ];

              const optionsList =
                qTyped.options && qTyped.options.length > 0
                  ? qTyped.options
                  : currentQ.id === 'u2-dstaar-8'
                  ? defaultQ8Options
                  : [];

              const toggleOption = (id: string) => {
                if (isCurrentSubmitted) return;
                const next = selected.includes(id)
                  ? selected.filter((item) => item !== id)
                  : selected.length < 2
                  ? [...selected, id]
                  : [selected[1], id]; // rolling replace if already 2
                setAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: { selected: next },
                }));
              };

              return (
                <div className="space-y-4">
                  {qTyped.scenario && (
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {qTyped.scenario}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {qTyped.instruction || 'Select exactly TWO correct options.'}
                    </p>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      Selected: {selected.length} / 2
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {optionsList.map((opt) => {
                      const isChecked = selected.includes(opt.id);
                      const optionText =
                        opt.text || (opt as any).statement || (opt as any).label || (opt as any).content || '';

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isCurrentSubmitted}
                          onClick={() => toggleOption(opt.id)}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-start gap-3.5 cursor-pointer ${
                            isChecked
                              ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 ring-2 ring-cyan-500/30 shadow-xs'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-cyan-600 border-cyan-600 text-white'
                                : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </div>
                          <span
                            className={`leading-relaxed text-xs sm:text-sm font-medium flex-1 ${
                              isChecked
                                ? 'text-cyan-950 dark:text-cyan-100 font-semibold'
                                : 'text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            {optionText}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Q9: INTERACTIVE GRAPHING */}
            {currentQ.type === 'graphing' && (() => {
              const qTyped = currentQ as Q9GraphingUnit2;
              const plotted: { x: number; y: number }[] = currentAnswer?.plotted || [];

              // SVG Coordinates: 400 x 320
              const padLeft = 55;
              const padBottom = 45;
              const padTop = 25;
              const padRight = 30;
              const svgW = 420;
              const svgH = 340;
              const plotW = svgW - padLeft - padRight;
              const plotH = svgH - padTop - padBottom;

              const toSvgX = (x: number) => padLeft + (x / qTyped.xMax) * plotW;
              const toSvgY = (y: number) => padTop + plotH - (y / qTyped.yMax) * plotH;

              const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
                if (isCurrentSubmitted) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                // Snap to nearest integer X and 2.5 step Y
                const mathX = Math.max(
                  0,
                  Math.min(qTyped.xMax, Math.round(((clickX - padLeft) / plotW) * qTyped.xMax))
                );
                const rawY = ((padTop + plotH - clickY) / plotH) * qTyped.yMax;
                const mathY = Math.max(
                  0,
                  Math.min(qTyped.yMax, Math.round(rawY / 2.5) * 2.5)
                );

                // Check if point already plotted -> toggle/remove
                const existingIndex = plotted.findIndex(
                  (pt) => Math.abs(pt.x - mathX) < 0.2 && Math.abs(pt.y - mathY) < 0.2
                );

                if (existingIndex >= 0) {
                  setAnswers((prev) => ({
                    ...prev,
                    [currentIndex]: {
                      plotted: plotted.filter((_, idx) => idx !== existingIndex),
                    },
                  }));
                } else if (plotted.length < 2) {
                  setAnswers((prev) => ({
                    ...prev,
                    [currentIndex]: {
                      plotted: [...plotted, { x: mathX, y: mathY }],
                    },
                  }));
                }
              };

              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                      {qTyped.scenario}
                    </p>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 whitespace-nowrap">
                      Points Plotted: {plotted.length} / 2
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative">
                      <svg
                        width={svgW}
                        height={svgH}
                        onClick={handleSvgClick}
                        onMouseMove={(e) => {
                          if (isCurrentSubmitted) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const mathX = Math.round(
                            ((e.clientX - rect.left - padLeft) / plotW) * qTyped.xMax
                          );
                          const rawY =
                            ((padTop + plotH - (e.clientY - rect.top)) / plotH) * qTyped.yMax;
                          const mathY = Math.round(rawY / 2.5) * 2.5;
                          if (mathX >= 0 && mathX <= qTyped.xMax && mathY >= 0 && mathY <= qTyped.yMax) {
                            setGraphHoverCoords({ x: mathX, y: mathY });
                          } else {
                            setGraphHoverCoords(null);
                          }
                        }}
                        onMouseLeave={() => setGraphHoverCoords(null)}
                        className="max-w-full h-auto select-none cursor-crosshair"
                      >
                        {/* Grid */}
                        {Array.from({ length: qTyped.xMax + 1 }, (_, i) => {
                          const sx = toSvgX(i);
                          return (
                            <g key={`x-grid-${i}`}>
                              <line
                                x1={sx}
                                y1={padTop}
                                x2={sx}
                                y2={padTop + plotH}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                              />
                              <text
                                x={sx}
                                y={padTop + plotH + 18}
                                textAnchor="middle"
                                className="text-[11px] font-mono fill-slate-500"
                              >
                                {i}
                              </text>
                            </g>
                          );
                        })}

                        {Array.from({ length: qTyped.yMax / qTyped.yStep + 1 }, (_, i) => {
                          const yVal = i * qTyped.yStep;
                          const sy = toSvgY(yVal);
                          return (
                            <g key={`y-grid-${i}`}>
                              <line
                                x1={padLeft}
                                y1={sy}
                                x2={padLeft + plotW}
                                y2={sy}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                              />
                              <text
                                x={padLeft - 10}
                                y={sy + 4}
                                textAnchor="end"
                                className="text-[11px] font-mono fill-slate-500"
                              >
                                {yVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line
                          x1={padLeft}
                          y1={padTop}
                          x2={padLeft}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />
                        <line
                          x1={padLeft}
                          y1={padTop + plotH}
                          x2={padLeft + plotW}
                          y2={padTop + plotH}
                          stroke="currentColor"
                          className="text-slate-700 dark:text-slate-300"
                          strokeWidth="2"
                        />

                        {/* Axis Labels */}
                        <text
                          x={padLeft + plotW / 2}
                          y={svgH - 8}
                          textAnchor="middle"
                          className="text-xs font-bold fill-slate-700 dark:fill-slate-300"
                        >
                          {qTyped.xLabel}
                        </text>
                        <text
                          x={15}
                          y={padTop + plotH / 2}
                          textAnchor="middle"
                          transform={`rotate(-90, 15, ${padTop + plotH / 2})`}
                          className="text-xs font-bold fill-slate-700 dark:fill-slate-300"
                        >
                          {qTyped.yLabel}
                        </text>

                        {/* Line connecting plotted points if 2 points */}
                        {plotted.length === 2 && (
                          <line
                            x1={toSvgX(plotted[0].x)}
                            y1={toSvgY(plotted[0].y)}
                            x2={toSvgX(plotted[1].x)}
                            y2={toSvgY(plotted[1].y)}
                            stroke="#06b6d4"
                            strokeWidth="3"
                            strokeDasharray="4 4"
                          />
                        )}

                        {/* Target Solution Ray when submitted */}
                        {isCurrentSubmitted && (
                          <line
                            x1={toSvgX(0)}
                            y1={toSvgY(0)}
                            x2={toSvgX(6)}
                            y2={toSvgY(15)}
                            stroke="#10b981"
                            strokeWidth="2.5"
                          />
                        )}

                        {/* Plotted Points */}
                        {plotted.map((pt, idx) => (
                          <g key={idx}>
                            <circle
                              cx={toSvgX(pt.x)}
                              cy={toSvgY(pt.y)}
                              r="7"
                              fill="#06b6d4"
                              stroke="white"
                              strokeWidth="2"
                            />
                            <text
                              x={toSvgX(pt.x) + 8}
                              y={toSvgY(pt.y) - 6}
                              className="text-[10px] font-mono font-bold fill-cyan-700 dark:fill-cyan-300"
                            >
                              ({pt.x}, {pt.y})
                            </text>
                          </g>
                        ))}

                        {/* Live Cursor Coordinate Indicator */}
                        {graphHoverCoords && plotted.length < 2 && !isCurrentSubmitted && (
                          <g pointerEvents="none">
                            <circle
                              cx={toSvgX(graphHoverCoords.x)}
                              cy={toSvgY(graphHoverCoords.y)}
                              r="5"
                              fill="none"
                              stroke="#06b6d4"
                              strokeWidth="2"
                              strokeDasharray="2 2"
                            />
                            <text
                              x={toSvgX(graphHoverCoords.x) + 8}
                              y={toSvgY(graphHoverCoords.y) - 8}
                              className="text-[10px] font-mono font-bold fill-slate-500 bg-white"
                            >
                              ({graphHoverCoords.x}, {graphHoverCoords.y})
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={isCurrentSubmitted || plotted.length === 0}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { plotted: [] },
                          }))
                        }
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition"
                      >
                        Clear Plotted Points
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Q10: DRAG & DROP CLASSIFICATION */}
            {currentQ.type === 'classification' && (() => {
              const qTyped = currentQ as Q10ClassificationUnit2;
              const assignments: Record<string, string> = currentAnswer?.assignments || {};
              const unassignedCards = qTyped.cards.filter((card) => !assignments[card.id]);

              return (
                <div className="space-y-6 select-none">
                  {/* Floating drag preview for touch screens */}
                  {q10IsPointerDragging && q10PointerPos && q10DraggedCardId && (() => {
                    const draggedCard = qTyped.cards.find((c) => c.id === q10DraggedCardId);
                    if (!draggedCard) return null;
                    return (
                      <div
                        className="fixed pointer-events-none z-50 max-w-sm p-4 rounded-2xl bg-[#0c192d] text-white border-2 border-cyan-400 shadow-2xl text-sm -translate-x-1/2 -translate-y-1/2 backdrop-blur-md ring-4 ring-cyan-500/20"
                        style={{
                          left: `${q10PointerPos.x}px`,
                          top: `${q10PointerPos.y}px`,
                        }}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1.5 text-xs">
                          <GripVertical className="w-4 h-4 shrink-0" />
                          <span>Moving Situation...</span>
                        </div>
                        <p className="text-white font-semibold leading-relaxed text-[15px]">
                          {draggedCard.situation}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Header / Instructions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {qTyped.instruction}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {4 - unassignedCards.length} / 4 Placed
                      </span>
                    </div>
                  </div>

                  {/* Visual feedback banner when a card is selected */}
                  {activeSelectedOption && !isCurrentSubmitted && (() => {
                    const selCard = qTyped.cards.find((c) => c.id === activeSelectedOption);
                    const currentPlacedCat = assignments[activeSelectedOption];
                    return (
                      <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-xs flex items-center justify-between animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                          <span>
                            <strong>Card selected:</strong> Tap a container below to {currentPlacedCat ? 'move' : 'place'} it, or tap the card again to cancel.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveSelectedOption(null)}
                          className="text-[11px] font-bold text-cyan-700 dark:text-cyan-300 hover:underline px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    );
                  })()}

                  {/* Section 1: Available Unassigned Cards */}
                  <div
                    data-drop-zone="unassigned"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (q10DragOverZone !== 'unassigned') setQ10DragOverZone('unassigned');
                    }}
                    onDragLeave={(e) => {
                      if (e.currentTarget === e.target && q10DragOverZone === 'unassigned') {
                        setQ10DragOverZone(null);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const cardId = e.dataTransfer.getData('text/plain') || q10DraggedCardId;
                      if (cardId) handleAssignCardQ10(cardId, '');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      q10DragOverZone === 'unassigned'
                        ? 'border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/30 ring-2 ring-cyan-400/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span>Situations to Classify</span>
                        <span className="text-[11px] font-normal normal-case text-slate-400">
                          (Drag directly or tap card + tap container)
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {unassignedCards.length} unplaced
                      </span>
                    </div>

                    {unassignedCards.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {unassignedCards.map((card) => {
                          const isSelected = activeSelectedOption === card.id;
                          const isDragged = q10DraggedCardId === card.id;

                          return (
                            <div
                              key={card.id}
                              id={`q10-situation-${card.id}`}
                              draggable={!isCurrentSubmitted}
                              onDragStart={(e) => {
                                if (isCurrentSubmitted) return;
                                e.dataTransfer.setData('text/plain', card.id);
                                e.dataTransfer.effectAllowed = 'move';
                                setQ10DraggedCardId(card.id);
                              }}
                              onDragEnd={clearDragState}
                              onPointerDown={(e) => {
                                if (isCurrentSubmitted) return;
                                if ((e.target as HTMLElement).closest('button')) return;
                                q10PointerDownRef.current = {
                                  startX: e.clientX,
                                  startY: e.clientY,
                                  cardId: card.id,
                                };
                              }}
                              onClick={(e) => {
                                if (isCurrentSubmitted) return;
                                if ((e.target as HTMLElement).closest('button')) return;
                                setActiveSelectedOption((prev) => (prev === card.id ? null : card.id));
                              }}
                              style={{ touchAction: !isCurrentSubmitted ? 'none' : 'auto' }}
                              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-grab active:cursor-grabbing flex items-start gap-3 relative min-h-[120px] h-auto ${
                                isDragged
                                  ? 'opacity-40 bg-[#0c192d] border-cyan-400 ring-2 ring-cyan-400 scale-[0.98]'
                                  : isSelected
                                  ? 'bg-[#0c2242] border-cyan-400 ring-4 ring-cyan-400/30 shadow-xl'
                                  : 'bg-[#0c192d] border-slate-700 hover:border-cyan-400/80 hover:shadow-lg shadow-md'
                              }`}
                            >
                              <div className="mt-1 p-1 rounded bg-slate-800 text-cyan-400 shrink-0">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              <div className="space-y-3 flex-1">
                                <p className="text-[16px] sm:text-[17px] font-semibold text-white leading-relaxed tracking-normal break-words">
                                  {card.situation}
                                </p>
                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                                  {isSelected ? (
                                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 animate-pulse">
                                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                      Selected · Tap container below
                                    </span>
                                  ) : (
                                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                                      Drag or tap to select
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-4 px-3 text-center rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-medium">
                          All 4 situations placed. You can drag cards between containers or use "Move" buttons to adjust before submitting.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Section 2: Two Category Destination Containers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {qTyped.categories.map((cat) => {
                      const cardsInCat = qTyped.cards.filter(
                        (c) => assignments[c.id] === cat.id
                      );
                      const isTarget = activeSelectedOption !== null;
                      const isHoveredZone = q10DragOverZone === cat.id;
                      const otherCat = qTyped.categories.find((c) => c.id !== cat.id);

                      return (
                        <div
                          key={cat.id}
                          data-drop-zone={cat.id}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            if (q10DragOverZone !== cat.id) setQ10DragOverZone(cat.id);
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            setQ10DragOverZone(cat.id);
                          }}
                          onDragLeave={(e) => {
                            if (e.currentTarget === e.target && q10DragOverZone === cat.id) {
                              setQ10DragOverZone(null);
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const cardId = e.dataTransfer.getData('text/plain') || q10DraggedCardId;
                            if (cardId) {
                              handleAssignCardQ10(cardId, cat.id);
                            }
                          }}
                          onClick={() => {
                            if (activeSelectedOption) {
                              handleAssignCardQ10(activeSelectedOption, cat.id);
                            }
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all min-h-64 flex flex-col justify-between ${
                            isHoveredZone
                              ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/50 ring-4 ring-cyan-500/25 shadow-lg scale-[1.01]'
                              : isTarget
                              ? 'border-cyan-400 dark:border-cyan-600 bg-cyan-50/30 dark:bg-cyan-950/20 border-dashed cursor-pointer ring-2 ring-cyan-400/20 hover:bg-cyan-50/50'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60'
                          }`}
                        >
                          <div>
                            {/* Category Header */}
                            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-slate-800">
                              <div>
                                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                  <span
                                    className={`w-2.5 h-2.5 rounded-full ${
                                      cat.id === 'proportional' ? 'bg-cyan-500' : 'bg-indigo-500'
                                    }`}
                                  />
                                  <span>{cat.title}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  {cat.subtitle}
                                </p>
                              </div>
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                                  cardsInCat.length > 0
                                    ? cat.id === 'proportional'
                                      ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800'
                                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                {cardsInCat.length} Placed
                              </span>
                            </div>

                            {/* Placed Cards in Container */}
                            <div className="mt-3 space-y-2.5">
                              {cardsInCat.map((card) => {
                                const isCardSelected = activeSelectedOption === card.id;
                                const isCardDragged = q10DraggedCardId === card.id;
                                const isCorrectPlacement = card.correctCategory === cat.id;

                                return (
                                  <div
                                    key={card.id}
                                    draggable={!isCurrentSubmitted}
                                    onDragStart={(e) => {
                                      if (isCurrentSubmitted) return;
                                      e.dataTransfer.setData('text/plain', card.id);
                                      e.dataTransfer.effectAllowed = 'move';
                                      setQ10DraggedCardId(card.id);
                                    }}
                                    onDragEnd={clearDragState}
                                    onPointerDown={(e) => {
                                      if (isCurrentSubmitted) return;
                                      if ((e.target as HTMLElement).closest('button')) return;
                                      q10PointerDownRef.current = {
                                        startX: e.clientX,
                                        startY: e.clientY,
                                        cardId: card.id,
                                      };
                                    }}
                                    onClick={(e) => {
                                      if (isCurrentSubmitted) return;
                                      if ((e.target as HTMLElement).closest('button')) return;
                                      setActiveSelectedOption((prev) =>
                                        prev === card.id ? null : card.id
                                      );
                                    }}
                                    style={{ touchAction: !isCurrentSubmitted ? 'none' : 'auto' }}
                                    className={`p-4 rounded-xl border-2 transition-all text-xs flex flex-col gap-3 min-h-[100px] h-auto ${
                                      isCardDragged
                                        ? 'opacity-40 bg-[#0c192d] border-cyan-400 ring-2 ring-cyan-400'
                                        : isCardSelected
                                        ? 'bg-[#0c2242] border-cyan-400 ring-4 ring-cyan-400/30 shadow-md'
                                        : isCurrentSubmitted
                                        ? isCorrectPlacement
                                          ? 'bg-emerald-950/80 border-emerald-500/80 shadow-md'
                                          : 'bg-rose-950/80 border-rose-500/80 shadow-md'
                                        : 'bg-[#0c192d] border-slate-700 hover:border-cyan-400/80 shadow-md'
                                    }`}
                                  >
                                    <div className="flex items-start gap-2.5">
                                      {!isCurrentSubmitted && (
                                        <div className="mt-1 p-0.5 rounded bg-slate-800 text-cyan-400 shrink-0">
                                          <GripVertical className="w-3.5 h-3.5 cursor-grab active:cursor-grabbing" />
                                        </div>
                                      )}
                                      <span className="font-semibold text-white text-[15px] sm:text-[16px] leading-relaxed flex-1 break-words">
                                        {card.situation}
                                      </span>
                                    </div>

                                    {/* Action buttons before submission */}
                                    {!isCurrentSubmitted && (
                                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                                        {otherCat && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleAssignCardQ10(card.id, otherCat.id);
                                            }}
                                            className="px-2.5 py-1 rounded-md font-semibold bg-slate-800 text-cyan-300 hover:bg-cyan-900/60 hover:text-cyan-100 transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                                          >
                                            <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
                                            <span>
                                              Move to {otherCat.title.includes('Non') ? 'Non-Prop' : 'Prop'}
                                            </span>
                                          </button>
                                        )}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAssignCardQ10(card.id, '');
                                          }}
                                          className="text-rose-400 hover:text-rose-200 font-semibold px-2 py-1 rounded hover:bg-rose-950/60 transition cursor-pointer"
                                        >
                                          ✕ Remove
                                        </button>
                                      </div>
                                    )}

                                    {/* Verification tag after submission */}
                                    {isCurrentSubmitted && (
                                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5 font-bold">
                                          {isCorrectPlacement ? (
                                            <span className="text-emerald-400 flex items-center gap-1.5">
                                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                              Correct Classification
                                            </span>
                                          ) : (
                                            <span className="text-rose-400 flex items-center gap-1.5">
                                              <XCircle className="w-4 h-4 text-rose-400" />
                                              Should be {card.correctCategory === 'proportional' ? 'Proportional' : 'Non-Proportional'}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-cyan-300 font-mono text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                          {card.mathModel}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                              {/* Empty container placeholder */}
                              {cardsInCat.length === 0 && (
                                <div
                                  className={`py-8 px-4 text-center rounded-xl border-2 border-dashed transition-all text-xs ${
                                    isHoveredZone
                                      ? 'border-cyan-500 bg-cyan-100/50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-200 font-bold'
                                      : isTarget
                                      ? 'border-cyan-400 dark:border-cyan-600 bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 font-semibold animate-pulse'
                                      : 'border-slate-300 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                                  }`}
                                >
                                  {isHoveredZone
                                    ? `Release to drop into ${cat.title}`
                                    : isTarget
                                    ? `Tap here to place in ${cat.title}`
                                    : `Drag or tap situation cards into ${cat.title}`}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Q12: ADVANCED INLINE CHOICE */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'u2-dstaar-12' && (() => {
              const qTyped = currentQ as Q12InlineChoiceUnit2;
              const sel1 = currentAnswer?.sel1 || '';
              const sel2 = currentAnswer?.sel2 || '';
              const sel3 = currentAnswer?.sel3 || '';

              return (
                <div className="space-y-6">
                  {/* Three Company Representations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* COMPANY 1 — Equation */}
                    <div className="p-4 sm:p-5 bg-[#0c192d] rounded-2xl border-2 border-slate-700 space-y-3 shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                            Company 1
                          </span>
                          <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                            Equation
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-1">
                          Equation Representation
                        </p>
                      </div>

                      <div className="my-auto py-5 px-4 bg-[#081220] rounded-xl border-2 border-slate-700 text-center shadow-inner">
                        <div className="text-xs text-slate-400 font-mono mb-1">Direct Variation</div>
                        <div className="font-mono font-black text-2xl sm:text-3xl text-white tracking-wider">
                          y = 22x
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 text-center font-medium">
                        Relates guests <span className="font-mono text-cyan-300">(x)</span> to cost <span className="font-mono text-cyan-300">(y)</span>
                      </div>
                    </div>

                    {/* COMPANY 2 — Table Representation */}
                    <div className="p-4 sm:p-5 bg-[#0c192d] rounded-2xl border-2 border-slate-700 space-y-3 shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            Company 2
                          </span>
                          <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
                            Table
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-1">
                          Table Representation
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-xl border-2 border-slate-600 bg-[#081220] shadow-inner">
                        <table className="w-full text-center border-collapse">
                          <thead>
                            <tr className="bg-slate-800 border-b-2 border-slate-600">
                              <th className="py-2.5 px-2.5 text-xs sm:text-sm font-bold text-white border-r-2 border-slate-600">
                                Number of Guests (x)
                              </th>
                              <th className="py-2.5 px-2.5 text-xs sm:text-sm font-bold text-white">
                                Total Cost in Dollars (y)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {qTyped.company2Rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="border-b border-slate-700 last:border-b-0 hover:bg-slate-800/50 transition-colors"
                              >
                                <td className="py-2.5 px-2.5 font-mono font-bold text-white text-base sm:text-lg border-r-2 border-slate-600">
                                  {row.x}
                                </td>
                                <td className="py-2.5 px-2.5 font-mono font-bold text-white text-base sm:text-lg">
                                  {row.y}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-xs text-slate-400 text-center font-medium">
                        Three data points relating guests to total cost
                      </div>
                    </div>

                    {/* COMPANY 3 — Coordinate Graph */}
                    <div className="p-4 sm:p-5 bg-[#0c192d] rounded-2xl border-2 border-slate-700 space-y-3 shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Company 3
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                            Coordinate Graph
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-1">
                          Coordinate Graph Representation
                        </p>
                      </div>

                      <div className="p-3 bg-[#081220] rounded-xl border-2 border-slate-700 space-y-2 shadow-inner">
                        {/* Clean Mini Coordinate Graph */}
                        <div className="w-full max-w-[190px] mx-auto aspect-[4/3]">
                          <svg viewBox="0 0 160 115" className="w-full h-full">
                            {/* Grid lines */}
                            <line x1="28" y1="20" x2="150" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="28" y1="55" x2="150" y2="55" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="28" y1="90" x2="150" y2="90" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="88" y1="15" x2="88" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="140" y1="15" x2="140" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="28" y1="15" x2="28" y2="90" stroke="#64748b" strokeWidth="1.5" />

                            {/* Origin label */}
                            <text x="18" y="98" className="text-[9px] fill-slate-400 font-mono font-bold">0</text>
                            {/* Axes labels */}
                            <text x="150" y="103" className="text-[9px] fill-slate-400 font-bold">x</text>
                            <text x="14" y="18" className="text-[9px] fill-slate-400 font-bold">y</text>

                            {/* Proportional ray through origin (28, 90) and (130, 32) representing (5, 120) */}
                            <line x1="28" y1="90" x2="146" y2="23" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

                            {/* Origin point (0, 0) */}
                            <circle cx="28" cy="90" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />

                            {/* Point (5, 120) */}
                            <circle cx="130" cy="32" r="4" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
                            <text x="75" y="27" className="text-[10px] fill-white font-mono font-bold">
                              (5, 120)
                            </text>
                          </svg>
                        </div>

                        <p className="text-xs text-white text-center font-medium leading-snug">
                          A straight line passing through the origin <strong className="text-emerald-300 font-bold">(0, 0)</strong> and the point <strong className="text-emerald-300 font-bold">(5, 120)</strong>.
                        </p>
                      </div>

                      <div className="text-xs text-slate-400 text-center font-medium">
                        Passes through origin <span className="font-mono text-emerald-300">(0, 0)</span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Sentences */}
                  <div className="p-4 sm:p-5 bg-[#0c192d] rounded-2xl border-2 border-slate-700 space-y-4 text-sm sm:text-base text-white shadow-md">
                    <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                      <span className="font-medium">{qTyped.statement1Prefix}</span>
                      <select
                        disabled={isCurrentSubmitted}
                        value={sel1}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), sel1: e.target.value },
                          }))
                        }
                        className="px-3 py-1.5 rounded-xl border-2 border-slate-600 bg-[#081220] font-bold text-cyan-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-hidden cursor-pointer"
                      >
                        {qTyped.dropdown1Options.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-900 text-white font-normal">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span>.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                      <span className="font-medium">{qTyped.statement2Prefix}</span>
                      <select
                        disabled={isCurrentSubmitted}
                        value={sel2}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), sel2: e.target.value },
                          }))
                        }
                        className="px-3 py-1.5 rounded-xl border-2 border-slate-600 bg-[#081220] font-bold text-indigo-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                      >
                        {qTyped.dropdown2Options.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-900 text-white font-normal">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span>,</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                      <span className="font-medium">{qTyped.statement3Prefix}</span>
                      <select
                        disabled={isCurrentSubmitted}
                        value={sel3}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), sel3: e.target.value },
                          }))
                        }
                        className="px-3 py-1.5 rounded-xl border-2 border-slate-600 bg-[#081220] font-bold text-emerald-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer max-w-full"
                      >
                        {qTyped.dropdown3Options.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-900 text-white font-normal">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span>.</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Submitted Feedback Box */}
          {isCurrentSubmitted && (
            <div
              className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm space-y-2 transition-all ${
                currentIsCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                {currentIsCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Correct Response!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Incorrect — Review Mathematical Reasoning</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed font-normal text-slate-700 dark:text-slate-300">
                {currentQ.solutionExplanation}
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <HelpCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Key STAAR Concept:</strong> {currentQ.keyTakeaway}
                </span>
              </div>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Question
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isCurrentSubmitted ? (
                <button
                  onClick={handleSubmitCurrent}
                  disabled={!isAnswerProvided()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" /> Submit Response
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  {currentIndex < totalQuestions - 1 ? (
                    <>
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>View Final Diagnostic</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
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
              You completed all 12 technology-enhanced questions simulating the Grade 8 STAAR Proportional vs. Non-Proportional Relationships standards.
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
