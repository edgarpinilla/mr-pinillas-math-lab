// src/components/DigitalStaarSlopeSimulator.tsx
// Complete 12-Question Technology-Enhanced Digital STAAR Simulator for Unit 3: Slope & Linear Equations
// 100% Client-side local architecture. Zero runtime API calls.

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
  TrendingDown,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import {
  UNIT_3_DIGITAL_STAAR_QUESTIONS,
  Unit3DigitalStaarQuestion,
  Q1DragDropFormula,
  Q2GraphHotSpotSlope,
  Q3TableAnalysisSlope,
  Q4MultipleSelectSlope,
  Q5EquationCompletion,
  Q6NumericEntrySlope,
  Q7TwoPartDropdown,
  Q8MultiRepresentation,
  Q9ClassificationSlope,
  Q10MatchingSlope,
  Q11ErrorAnalysisSlope,
  Q12SynthesisChallenge,
} from '../data/staar/digitalStaarSlopeData';

interface DigitalStaarSlopeSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

export const DigitalStaarSlopeSimulator: React.FC<DigitalStaarSlopeSimulatorProps> = ({
  topicTitle = 'Slope & Linear Equations',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});
  const [attemptedQuestions, setAttemptedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Interaction helper states
  const [activeSelectedTile, setActiveSelectedTile] = useState<string | null>(null);

  // Q1 Drag & Drop State
  const [q1DraggedTile, setQ1DraggedTile] = useState<string | null>(null);
  const [q1HoveredSlot, setQ1HoveredSlot] = useState<'num1' | 'num2' | 'den1' | 'den2' | null>(null);
  const [q1PointerPos, setQ1PointerPos] = useState<{ x: number; y: number } | null>(null);
  const [q1IsPointerDragging, setQ1IsPointerDragging] = useState<boolean>(false);
  const q1PointerDownRef = useRef<{ startX: number; startY: number; tile: string } | null>(null);

  // Q9 Drag & Drop State
  const [q9DraggedCardId, setQ9DraggedCardId] = useState<string | null>(null);
  const [q9DragOverZone, setQ9DragOverZone] = useState<string | null>(null);
  const [q9PointerPos, setQ9PointerPos] = useState<{ x: number; y: number } | null>(null);
  const [q9IsPointerDragging, setQ9IsPointerDragging] = useState<boolean>(false);
  const q9PointerDownRef = useRef<{
    startX: number;
    startY: number;
    cardId: string;
    hasMoved?: boolean;
  } | null>(null);
  const q9JustDraggedRef = useRef<boolean>(false);

  const currentQ = UNIT_3_DIGITAL_STAAR_QUESTIONS[currentIndex];
  const isCurrentCompleted = !!completedQuestions[currentIndex];
  const isCurrentAttempted = !!attemptedQuestions[currentIndex];
  const isCurrentFeedbackVisible = isCurrentCompleted || isCurrentAttempted;
  const isCurrentCorrect = isCurrentCompleted;
  const currentAnswer = answers[currentIndex];

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = UNIT_3_DIGITAL_STAAR_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'drag-drop-formula': {
        const qTyped = q as Q1DragDropFormula;
        const num1 = ans.num1;
        const num2 = ans.num2;
        const den1 = ans.den1;
        const den2 = ans.den2;
        const simplified = ans.simplified;

        // Order A: (14 - (-2)) / (5 - (-3))
        const orderA = num1 === '14' && num2 === '-2' && den1 === '5' && den2 === '-3';
        // Order B: ((-2) - 14) / ((-3) - 5)
        const orderB = num1 === '-2' && num2 === '14' && den1 === '-3' && den2 === '5';

        return (orderA || orderB) && simplified === qTyped.finalSlopeValue;
      }

      case 'graph-hot-spot': {
        const qTyped = q as Q2GraphHotSpotSlope;
        const selectedIds: string[] = ans.selectedPoints || [];
        const slopeChosen = ans.chosenSlope;

        if (selectedIds.length !== 2) return false;
        const allOnLine = selectedIds.every((id) => {
          const pt = qTyped.points.find((p) => p.id === id);
          return pt && pt.isOnLine;
        });

        return allOnLine && slopeChosen === qTyped.correctSlope;
      }

      case 'table-analysis': {
        const qTyped = q as Q3TableAnalysisSlope;
        return (
          ans.sel1 === qTyped.correct1 &&
          ans.sel2 === qTyped.correct2 &&
          ans.sel3 === qTyped.correct3
        );
      }

      case 'multiple-select': {
        const qTyped = q as Q4MultipleSelectSlope;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }

      case 'equation-completion': {
        const qTyped = q as Q5EquationCompletion;
        const parseValue = (raw: string): number | null => {
          const s = (raw || '').trim().replace(/\s+/g, '');
          if (!s) return null;
          if (s.includes('/')) {
            const parts = s.split('/');
            if (parts.length === 2) {
              const num = Number(parts[0]);
              const den = Number(parts[1]);
              if (!isNaN(num) && !isNaN(den) && den !== 0) {
                return num / den;
              }
            }
          }
          const val = Number(s);
          return isNaN(val) ? null : val;
        };

        const mRaw = (ans.m || '').toString().trim().toLowerCase();
        const bRaw = (ans.b || '').toString().trim().toLowerCase();
        const mDirect = qTyped.acceptedM.some((acc) => acc.toLowerCase() === mRaw);
        const bDirect = qTyped.acceptedB.some((acc) => acc.toLowerCase() === bRaw);

        const mNum = parseValue(mRaw);
        const bNum = parseValue(bRaw);

        const targetM = parseValue(qTyped.acceptedM[0]);
        const targetB = parseValue(qTyped.acceptedB[0]);

        const mMatch =
          mDirect || (mNum !== null && targetM !== null && Math.abs(mNum - targetM) < 1e-6);
        const bMatch =
          bDirect || (bNum !== null && targetB !== null && Math.abs(bNum - targetB) < 1e-6);

        return mMatch && bMatch;
      }

      case 'numeric-entry': {
        const qTyped = q as Q6NumericEntrySlope;
        const mVal = (ans.m || '').toString().trim().toLowerCase();
        const bVal = (ans.b || '').toString().trim().toLowerCase();
        const mCorrect = qTyped.acceptedM.some((acc) => acc.toLowerCase() === mVal);
        const bCorrect = qTyped.acceptedB.some((acc) => acc.toLowerCase() === bVal);
        return mCorrect && bCorrect;
      }

      case 'two-part-dropdown': {
        const qTyped = q as Q7TwoPartDropdown;
        return ans.partA === qTyped.partA.correct && ans.partB === qTyped.partB.correct;
      }

      case 'multi-representation': {
        const qTyped = q as Q8MultiRepresentation;
        return (
          ans.sel1 === qTyped.correct1 &&
          ans.sel2 === qTyped.correct2 &&
          ans.sel3 === qTyped.correct3
        );
      }

      case 'classification': {
        const qTyped = q as Q9ClassificationSlope;
        const assignments: Record<string, string> = ans.assignments || {};
        return qTyped.cards.every((card) => assignments[card.id] === card.correctCategory);
      }

      case 'matching': {
        const qTyped = q as Q10MatchingSlope;
        const matches: Record<string, string> = ans.matches || {};
        return qTyped.equations.every((eq) => matches[eq.id] === eq.correctGraphId);
      }

      case 'error-analysis': {
        const qTyped = q as Q11ErrorAnalysisSlope;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }

      case 'synthesis-challenge': {
        const qTyped = q as Q12SynthesisChallenge;
        return (
          ans.task1 === qTyped.task1Correct &&
          ans.task2 === qTyped.task2Correct &&
          ans.task3 === qTyped.task3Correct
        );
      }

      default:
        return false;
    }
  };

  const currentIsCorrect = gradeQuestion(currentIndex);

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
    setQ1DraggedTile(null);
    setQ1HoveredSlot(null);
    setQ1IsPointerDragging(false);
    setQ1PointerPos(null);
    setQ9DraggedCardId(null);
    setQ9DragOverZone(null);
    setQ9IsPointerDragging(false);
    setQ9PointerPos(null);
    if (q9PointerDownRef.current) q9PointerDownRef.current = null;
    if (currentIndex < UNIT_3_DIGITAL_STAAR_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setResultsView(true);
    }
  };

  const handlePrev = () => {
    setActiveSelectedTile(null);
    setQ1DraggedTile(null);
    setQ1HoveredSlot(null);
    setQ1IsPointerDragging(false);
    setQ1PointerPos(null);
    setQ9DraggedCardId(null);
    setQ9DragOverZone(null);
    setQ9IsPointerDragging(false);
    setQ9PointerPos(null);
    if (q9PointerDownRef.current) q9PointerDownRef.current = null;
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetQ9 = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
    setAttemptedQuestions((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
    setCompletedQuestions((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
    setActiveSelectedTile(null);
    setQ9DraggedCardId(null);
    setQ9DragOverZone(null);
    setQ9IsPointerDragging(false);
    setQ9PointerPos(null);
    if (q9PointerDownRef.current) {
      q9PointerDownRef.current = null;
    }
  };

  const handleRetake = () => {
    setCompletedQuestions({});
    setAttemptedQuestions({});
    setAnswers({});
    setCurrentIndex(0);
    setResultsView(false);
    setActiveSelectedTile(null);
    setQ1DraggedTile(null);
    setQ1HoveredSlot(null);
    setQ1PointerPos(null);
    setQ1IsPointerDragging(false);
    if (q1PointerDownRef.current) {
      q1PointerDownRef.current = null;
    }
    setQ9DraggedCardId(null);
    setQ9DragOverZone(null);
    setQ9IsPointerDragging(false);
    setQ9PointerPos(null);
    if (q9PointerDownRef.current) {
      q9PointerDownRef.current = null;
    }
  };

  // Check if current question has valid input provided
  const isAnswerProvided = (): boolean => {
    const ans = currentAnswer;
    if (!ans) return false;

    switch (currentQ.type) {
      case 'drag-drop-formula':
        return !!(ans.num1 && ans.num2 && ans.den1 && ans.den2 && ans.simplified);
      case 'graph-hot-spot':
        return Array.isArray(ans.selectedPoints) && ans.selectedPoints.length === 2 && !!ans.chosenSlope;
      case 'table-analysis':
        return !!(ans.sel1 && ans.sel2 && ans.sel3);
      case 'multiple-select':
        return Array.isArray(ans.selected) && ans.selected.length === 2;
      case 'equation-completion':
        return !!((ans.m || '').toString().trim() && (ans.b || '').toString().trim());
      case 'numeric-entry':
        return !!((ans.m || '').toString().trim() && (ans.b || '').toString().trim());
      case 'two-part-dropdown':
        return !!(ans.partA && ans.partB);
      case 'multi-representation':
        return !!(ans.sel1 && ans.sel2 && ans.sel3);
      case 'classification': {
        const qTyped = currentQ as Q9ClassificationSlope;
        const assignments = ans.assignments || {};
        return qTyped.cards.every((c) => !!assignments[c.id]);
      }
      case 'matching': {
        const qTyped = currentQ as Q10MatchingSlope;
        const matches = ans.matches || {};
        const allAssigned = qTyped.equations.every((eq) => !!matches[eq.id]);
        if (!allAssigned) return false;
        const assignedValues = qTyped.equations.map((eq) => matches[eq.id]);
        const uniqueValues = new Set(assignedValues);
        return uniqueValues.size === qTyped.equations.length;
      }
      case 'error-analysis':
        return Array.isArray(ans.selected) && ans.selected.length === 2;
      case 'synthesis-challenge':
        return !!(ans.task1 && ans.task2 && ans.task3);
      default:
        return false;
    }
  };

  const handleAssignTileToSlot = (
    slot: 'num1' | 'num2' | 'den1' | 'den2',
    tile: string
  ) => {
    if (isCurrentCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        [slot]: tile,
      },
    }));
    setActiveSelectedTile(null);
    setQ1HoveredSlot(null);
  };

  const handleClearSlot = (slot: 'num1' | 'num2' | 'den1' | 'den2') => {
    if (isCurrentCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        [slot]: undefined,
      },
    }));
    setActiveSelectedTile(null);
  };

  // Q1 Pointer drag listener for Chromebook touchpads, touchscreen & mouse support
  useEffect(() => {
    if (currentQ.type !== 'drag-drop-formula' || isCurrentCompleted) return;

    const handlePointerMove = (e: PointerEvent) => {
      const down = q1PointerDownRef.current;
      if (!down) return;
      const dist = Math.hypot(e.clientX - down.startX, e.clientY - down.startY);
      if (dist > 5) {
        if (!q1IsPointerDragging) {
          setQ1IsPointerDragging(true);
          setQ1DraggedTile(down.tile);
        }
        setQ1PointerPos({ x: e.clientX, y: e.clientY });
        const elem = document.elementFromPoint(e.clientX, e.clientY);
        const slot = elem?.closest('[data-slot]')?.getAttribute('data-slot') as
          | 'num1'
          | 'num2'
          | 'den1'
          | 'den2'
          | null;
        setQ1HoveredSlot(slot);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const down = q1PointerDownRef.current;
      if (down) {
        const dist = Math.hypot(e.clientX - down.startX, e.clientY - down.startY);
        if (dist > 5) {
          const elem = document.elementFromPoint(e.clientX, e.clientY);
          const slot = elem?.closest('[data-slot]')?.getAttribute('data-slot') as
            | 'num1'
            | 'num2'
            | 'den1'
            | 'den2'
            | null;
          if (slot === 'num1' || slot === 'num2' || slot === 'den1' || slot === 'den2') {
            handleAssignTileToSlot(slot, down.tile);
          }
        }
        q1PointerDownRef.current = null;
      }
      setQ1IsPointerDragging(false);
      setQ1DraggedTile(null);
      setQ1HoveredSlot(null);
      setQ1PointerPos(null);
    };

    const handlePointerCancel = () => {
      q1PointerDownRef.current = null;
      setQ1IsPointerDragging(false);
      setQ1DraggedTile(null);
      setQ1HoveredSlot(null);
      setQ1PointerPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [currentQ.type, isCurrentCompleted, q1IsPointerDragging, currentIndex]);

  // Q9 Pointer drag listener for Chromebooks and touchscreen laptops
  useEffect(() => {
    if (currentQ.type !== 'classification' || isCurrentCompleted) return;

    const getDropZoneAtPoint = (x: number, y: number): string | null => {
      const elem = document.elementFromPoint(x, y);
      const zone = elem?.closest('[data-drop-zone]')?.getAttribute('data-drop-zone');
      if (zone) return zone;

      const dropZones = document.querySelectorAll<HTMLElement>('[data-drop-zone]');
      for (const dz of dropZones) {
        const rect = dz.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return dz.getAttribute('data-drop-zone');
        }
      }
      return null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const down = q9PointerDownRef.current;
      if (!down) return;
      const dist = Math.hypot(e.clientX - down.startX, e.clientY - down.startY);
      if (dist > 5) {
        down.hasMoved = true;
        setQ9IsPointerDragging(true);
        setQ9DraggedCardId(down.cardId);
        setQ9PointerPos({ x: e.clientX, y: e.clientY });
        const zone = getDropZoneAtPoint(e.clientX, e.clientY);
        setQ9DragOverZone(zone);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const down = q9PointerDownRef.current;
      if (down) {
        if (down.hasMoved) {
          q9JustDraggedRef.current = true;
          setTimeout(() => {
            q9JustDraggedRef.current = false;
          }, 120);

          const zone = getDropZoneAtPoint(e.clientX, e.clientY);
          if (
            zone === 'positive' ||
            zone === 'negative' ||
            zone === 'zero' ||
            zone === 'undefined'
          ) {
            handleAssignCardQ9(down.cardId, zone);
          } else if (zone === 'unassigned') {
            handleAssignCardQ9(down.cardId, '');
          }
          // If released outside any valid zone, preserve current placement
        }
        q9PointerDownRef.current = null;
      }
      setQ9IsPointerDragging(false);
      setQ9DraggedCardId(null);
      setQ9DragOverZone(null);
      setQ9PointerPos(null);
    };

    const handlePointerCancel = () => {
      q9PointerDownRef.current = null;
      setQ9IsPointerDragging(false);
      setQ9DraggedCardId(null);
      setQ9DragOverZone(null);
      setQ9PointerPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [currentQ.type, isCurrentCompleted, currentIndex]);

  const handleAssignCardQ9 = (cardId: string, catId: string) => {
    if (isCurrentCompleted) return;
    setAnswers((prev) => {
      const currentQAns = prev[currentIndex] || {};
      const nextAssignments = { ...(currentQAns.assignments || {}) };
      if (catId) {
        nextAssignments[cardId] = catId;
      } else {
        delete nextAssignments[cardId];
      }
      return {
        ...prev,
        [currentIndex]: {
          ...currentQAns,
          assignments: nextAssignments,
        },
      };
    });
    setQ9DraggedCardId(null);
    setQ9DragOverZone(null);
    setQ9IsPointerDragging(false);
    setQ9PointerPos(null);
    if (q9PointerDownRef.current) {
      q9PointerDownRef.current = null;
    }
  };

  // Score metrics
  const totalQuestions = UNIT_3_DIGITAL_STAAR_QUESTIONS.length;
  const completedCount = Object.keys(completedQuestions).filter(
    (key) => completedQuestions[Number(key)]
  ).length;
  const score = completedCount;
  const accuracy = Math.round((score / totalQuestions) * 100);

  // Group performance by Topic
  const performanceByTopic = UNIT_3_DIGITAL_STAAR_QUESTIONS.reduce(
    (acc, q, idx) => {
      const topic = q.topic;
      if (!acc[topic]) {
        acc[topic] = { total: 0, correct: 0, teks: q.teks };
      }
      acc[topic].total += 1;
      if (completedQuestions[idx]) {
        acc[topic].correct += 1;
      }
      return acc;
    },
    {} as Record<string, { total: number; correct: number; teks: string }>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="digital-staar-slope-simulator-section">
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
              title="View Grade 8 STAAR Reference Materials"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>STAAR Formula Reference</span>
            </button>
            <button
              onClick={handleRetake}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
              title="Reset Simulator"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
            {onSwitchPathway && (
              <button
                onClick={() => onSwitchPathway('self-check')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
                title="Return to Practice Modes"
              >
                <span>Return to Practice</span>
              </button>
            )}
          </div>
        </div>

        {/* Formula Reference Overlay Modal */}
        {showFormulaSheet && (
          <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-cyan-500/40 text-xs sm:text-sm text-slate-300 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> STAAR Grade 8 Reference: Linear Equations & Slope
              </span>
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 bg-slate-800 rounded cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Slope Formula & Rate of Change
                </span>
                <p className="text-xs text-slate-300">
                  • Slope of a line: <code className="text-cyan-300 font-bold">m = (y₂ - y₁) / (x₂ - x₁)</code>
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  • Geometric definition: <code className="text-cyan-300 font-bold">m = rise / run = Δy / Δx</code>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Slope is constant along any straight line and can be verified using similar right triangles (TEKS 8.4A).
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wide text-cyan-300">
                  Linear Equation Forms
                </span>
                <p className="text-xs text-slate-300">
                  • Slope-intercept form: <code className="text-cyan-300 font-bold">y = mx + b</code>
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  • Direct variation (proportional): <code className="text-cyan-300 font-bold">y = kx</code> (where <code className="text-cyan-300">k = y/x</code>)
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  In <code className="text-white">y = mx + b</code>, <strong className="text-white">m</strong> represents slope (rate of change) and <strong className="text-white">b</strong> represents the y-intercept at <code className="text-cyan-300">(0, b)</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Question Navigator Bar (1 to 12) */}
        {!resultsView && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              {UNIT_3_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
                const isCompleted = !!completedQuestions[idx];
                const isAttempted = !!attemptedQuestions[idx];
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setActiveSelectedTile(null);
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center relative cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 font-extrabold shadow-md'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : isAttempted
                        ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                    title={`Question ${idx + 1}: ${q.typeLabel}`}
                  >
                    {idx + 1}
                    {(isCompleted || isAttempted) && (
                      <span
                        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                          isCompleted ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>
                Completed: {completedCount} / {totalQuestions}
              </span>
              <button
                onClick={() => setResultsView(true)}
                className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
              >
                View Summary
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {resultsView ? (
        // ==========================================
        // RESULTS / SUMMARY VIEW
        // ==========================================
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              SIMULATOR PERFORMANCE
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Technology-Enhanced Assessment for Grade 8 TEKS 8.4A, 8.4B, 8.4C & 8.5I.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                FINAL SCORE
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                {score} / {totalQuestions}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Correct Questions</span>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ACCURACY
              </span>
              <div
                className={`text-3xl sm:text-4xl font-black mt-1 ${
                  accuracy >= 80
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : accuracy >= 60
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {accuracy}%
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Overall Mastery</span>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                COMPLETED
              </span>
              <div className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400 mt-1">
                {completedCount} / {totalQuestions}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Questions Answered</span>
            </div>
          </div>

          {/* Topic Performance Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-cyan-500" />
              <span>Skill &amp; TEKS Breakdown</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(performanceByTopic).map(([topic, data]) => {
                const topicPct = Math.round((data.correct / data.total) * 100);
                return (
                  <div
                    key={topic}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 block">
                          {data.teks}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {topic}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {data.correct} / {data.total} ({topicPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          topicPct >= 80
                            ? 'bg-emerald-500'
                            : topicPct >= 60
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Question-by-Question Review
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {UNIT_3_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
                const isCompleted = !!completedQuestions[idx];
                const isAttempted = !!attemptedQuestions[idx];
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setResultsView(false);
                    }}
                    className={`p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isCompleted
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-100/40'
                        : isAttempted
                        ? 'border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-100/40'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isAttempted
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {q.typeLabel} • {q.teks}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {q.topic}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : isAttempted ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                          <XCircle className="w-4 h-4" /> Review
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Unanswered</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETAKE DIGITAL SIMULATOR</span>
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setResultsView(false);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Back to Question 1</span>
            </button>
            {onSwitchPathway && (
              <button
                onClick={() => onSwitchPathway('self-check')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Return to Practice Menu</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        // ==========================================
        // SINGLE-QUESTION VIEW (1-12)
        // ==========================================
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-6">
          {/* Question Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Question {currentQ.number} of {totalQuestions}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {currentQ.typeLabel}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {currentQ.teks}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {currentQ.topic}
              </h3>
            </div>
            {isCurrentFeedbackVisible && (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isCurrentCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                }`}
              >
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Correct Response</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Incorrect Response</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Question Prompt */}
          <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {currentQ.prompt}
          </div>

          {/* Interactive Question Body */}
          <div className="pt-2">
            {/* =======================================================
                QUESTION 1: DRAG & DROP FORMULA
               ======================================================= */}
            {currentQ.type === 'drag-drop-formula' && (
              <div className="space-y-6">
                {/* Floating Pointer Drag Preview */}
                {q1IsPointerDragging && q1DraggedTile && q1PointerPos && (
                  <div
                    className="fixed pointer-events-none z-50 px-4 py-2 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 border-2 border-cyan-300 shadow-2xl scale-110 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5"
                    style={{ left: `${q1PointerPos.x}px`, top: `${q1PointerPos.y}px` }}
                  >
                    <GripVertical className="w-3.5 h-3.5 text-slate-950/80" />
                    <span>{q1DraggedTile}</span>
                  </div>
                )}

                {/* Given Points Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-around gap-4 text-center">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Point 1</span>
                    <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">
                      P(x₁, y₁) = ({(currentQ as Q1DragDropFormula).point1.x},{' '}
                      {(currentQ as Q1DragDropFormula).point1.y})
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Point 2</span>
                    <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">
                      Q(x₂, y₂) = ({(currentQ as Q1DragDropFormula).point2.x},{' '}
                      {(currentQ as Q1DragDropFormula).point2.y})
                    </span>
                  </div>
                </div>

                {/* Formula Construction Area */}
                <div className="p-5 rounded-2xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/50 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                    Construct Formula Substitution:
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
                    <div className="text-xl font-black text-slate-800 dark:text-slate-200">
                      m =
                    </div>

                    {/* Fraction Container */}
                    <div className="flex flex-col items-center">
                      {/* Numerator: [slot 1: y2] - [slot 2: y1] */}
                      <div className="flex items-center gap-2 pb-1.5 border-b-2 border-slate-700 dark:border-slate-300">
                        {/* Num Slot 1 (y2) */}
                        <div
                          data-slot="num1"
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (!isCurrentCompleted) setQ1HoveredSlot('num1');
                          }}
                          onDragLeave={() => setQ1HoveredSlot(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setQ1HoveredSlot(null);
                            const tile = e.dataTransfer.getData('text/plain') || q1DraggedTile;
                            if (tile) handleAssignTileToSlot('num1', tile);
                          }}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            if (activeSelectedTile) {
                              handleAssignTileToSlot('num1', activeSelectedTile);
                            } else if (currentAnswer?.num1) {
                              handleClearSlot('num1');
                            }
                          }}
                          className={`w-16 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-base transition select-none cursor-pointer ${
                            q1HoveredSlot === 'num1'
                              ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900/60 ring-2 ring-cyan-400 scale-105 shadow-md'
                              : currentAnswer?.num1
                              ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm hover:bg-cyan-700'
                              : 'bg-white dark:bg-slate-900 border-dashed border-slate-400 dark:border-slate-600 text-slate-400 hover:border-cyan-500'
                          }`}
                        >
                          {currentAnswer?.num1 ? (
                            <div className="flex items-center justify-center gap-1">
                              <span>{currentAnswer.num1}</span>
                              {!isCurrentCompleted && (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearSlot('num1');
                                  }}
                                  className="w-4 h-4 rounded-full bg-cyan-800 hover:bg-rose-600 text-white flex items-center justify-center text-xs ml-0.5 leading-none transition"
                                  title="Remove number"
                                >
                                  ×
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-medium">y₂</span>
                          )}
                        </div>

                        <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                          −
                        </span>

                        {/* Num Slot 2 (y1) */}
                        <div
                          data-slot="num2"
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (!isCurrentCompleted) setQ1HoveredSlot('num2');
                          }}
                          onDragLeave={() => setQ1HoveredSlot(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setQ1HoveredSlot(null);
                            const tile = e.dataTransfer.getData('text/plain') || q1DraggedTile;
                            if (tile) handleAssignTileToSlot('num2', tile);
                          }}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            if (activeSelectedTile) {
                              handleAssignTileToSlot('num2', activeSelectedTile);
                            } else if (currentAnswer?.num2) {
                              handleClearSlot('num2');
                            }
                          }}
                          className={`w-16 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-base transition select-none cursor-pointer ${
                            q1HoveredSlot === 'num2'
                              ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900/60 ring-2 ring-cyan-400 scale-105 shadow-md'
                              : currentAnswer?.num2
                              ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm hover:bg-cyan-700'
                              : 'bg-white dark:bg-slate-900 border-dashed border-slate-400 dark:border-slate-600 text-slate-400 hover:border-cyan-500'
                          }`}
                        >
                          {currentAnswer?.num2 ? (
                            <div className="flex items-center justify-center gap-1">
                              <span>{currentAnswer.num2}</span>
                              {!isCurrentCompleted && (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearSlot('num2');
                                  }}
                                  className="w-4 h-4 rounded-full bg-cyan-800 hover:bg-rose-600 text-white flex items-center justify-center text-xs ml-0.5 leading-none transition"
                                  title="Remove number"
                                >
                                  ×
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-medium">y₁</span>
                          )}
                        </div>
                      </div>

                      {/* Denominator: [slot 3: x2] - [slot 4: x1] */}
                      <div className="flex items-center gap-2 pt-1.5">
                        {/* Den Slot 1 (x2) */}
                        <div
                          data-slot="den1"
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (!isCurrentCompleted) setQ1HoveredSlot('den1');
                          }}
                          onDragLeave={() => setQ1HoveredSlot(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setQ1HoveredSlot(null);
                            const tile = e.dataTransfer.getData('text/plain') || q1DraggedTile;
                            if (tile) handleAssignTileToSlot('den1', tile);
                          }}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            if (activeSelectedTile) {
                              handleAssignTileToSlot('den1', activeSelectedTile);
                            } else if (currentAnswer?.den1) {
                              handleClearSlot('den1');
                            }
                          }}
                          className={`w-16 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-base transition select-none cursor-pointer ${
                            q1HoveredSlot === 'den1'
                              ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900/60 ring-2 ring-cyan-400 scale-105 shadow-md'
                              : currentAnswer?.den1
                              ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm hover:bg-cyan-700'
                              : 'bg-white dark:bg-slate-900 border-dashed border-slate-400 dark:border-slate-600 text-slate-400 hover:border-cyan-500'
                          }`}
                        >
                          {currentAnswer?.den1 ? (
                            <div className="flex items-center justify-center gap-1">
                              <span>{currentAnswer.den1}</span>
                              {!isCurrentCompleted && (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearSlot('den1');
                                  }}
                                  className="w-4 h-4 rounded-full bg-cyan-800 hover:bg-rose-600 text-white flex items-center justify-center text-xs ml-0.5 leading-none transition"
                                  title="Remove number"
                                >
                                  ×
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-medium">x₂</span>
                          )}
                        </div>

                        <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                          −
                        </span>

                        {/* Den Slot 2 (x1) */}
                        <div
                          data-slot="den2"
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (!isCurrentCompleted) setQ1HoveredSlot('den2');
                          }}
                          onDragLeave={() => setQ1HoveredSlot(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setQ1HoveredSlot(null);
                            const tile = e.dataTransfer.getData('text/plain') || q1DraggedTile;
                            if (tile) handleAssignTileToSlot('den2', tile);
                          }}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            if (activeSelectedTile) {
                              handleAssignTileToSlot('den2', activeSelectedTile);
                            } else if (currentAnswer?.den2) {
                              handleClearSlot('den2');
                            }
                          }}
                          className={`w-16 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-base transition select-none cursor-pointer ${
                            q1HoveredSlot === 'den2'
                              ? 'border-cyan-400 bg-cyan-100 dark:bg-cyan-900/60 ring-2 ring-cyan-400 scale-105 shadow-md'
                              : currentAnswer?.den2
                              ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm hover:bg-cyan-700'
                              : 'bg-white dark:bg-slate-900 border-dashed border-slate-400 dark:border-slate-600 text-slate-400 hover:border-cyan-500'
                          }`}
                        >
                          {currentAnswer?.den2 ? (
                            <div className="flex items-center justify-center gap-1">
                              <span>{currentAnswer.den2}</span>
                              {!isCurrentCompleted && (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearSlot('den2');
                                  }}
                                  className="w-4 h-4 rounded-full bg-cyan-800 hover:bg-rose-600 text-white flex items-center justify-center text-xs ml-0.5 leading-none transition"
                                  title="Remove number"
                                >
                                  ×
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-medium">x₁</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="text-xl font-black text-slate-800 dark:text-slate-200 px-2">
                      =
                    </span>

                    {/* Simplified Slope Dropdown */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                        Simplified Slope (m):
                      </label>
                      <select
                        disabled={isCurrentCompleted}
                        value={currentAnswer?.simplified || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: {
                              ...prev[currentIndex],
                              simplified: e.target.value,
                            },
                          }))
                        }
                        className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="">Select m...</option>
                        {(currentQ as Q1DragDropFormula).simplifiedOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            m = {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Drag any number tile into a formula slot, or tap a tile then tap a slot. Tap a placed number or &times; to remove it.
                  </p>
                </div>

                {/* Available Draggable/Tappable Tiles */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Available Number Tiles:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {(currentQ as Q1DragDropFormula).availableTiles.map((tile, idx) => {
                      const isSelected = activeSelectedTile === tile;
                      return (
                        <div
                          key={`${tile}-${idx}`}
                          draggable={!isCurrentCompleted}
                          onDragStart={(e) => {
                            if (isCurrentCompleted) return;
                            e.dataTransfer.setData('text/plain', tile);
                            setQ1DraggedTile(tile);
                          }}
                          onDragEnd={() => {
                            setQ1DraggedTile(null);
                            setQ1HoveredSlot(null);
                          }}
                          onPointerDown={(e) => {
                            if (isCurrentCompleted) return;
                            if (e.button !== 0) return;
                            q1PointerDownRef.current = {
                              startX: e.clientX,
                              startY: e.clientY,
                              tile,
                            };
                          }}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            setActiveSelectedTile(isSelected ? null : tile);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition select-none cursor-grab active:cursor-grabbing touch-none flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 ring-2 ring-cyan-300 scale-105 shadow-md'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-cyan-500'
                          }`}
                        >
                          <GripVertical className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                          <span className="pointer-events-none">{tile}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 2: GRAPH HOT SPOT
               ======================================================= */}
            {currentQ.type === 'graph-hot-spot' && (
              <div className="space-y-6">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>
                      Click or tap exactly TWO candidate points that lie directly on the line. The selected points will glow cyan.
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                      (currentAnswer?.selectedPoints || []).length === 2
                        ? 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700'
                        : (currentAnswer?.selectedPoints || []).length === 1
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {(currentAnswer?.selectedPoints || []).length} of 2 Points Selected
                  </span>
                </div>

                {/* SVG Coordinate Plane with Hot Spots */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-2xl aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-3 sm:p-4 shadow-inner relative overflow-hidden">
                    <svg viewBox="-10.2 -10.2 20.4 20.4" className="w-full h-full select-none">
                      {/* Background fill */}
                      <rect
                        x="-9.8"
                        y="-9.8"
                        width="19.6"
                        height="19.6"
                        fill="#ffffff"
                        className="dark:fill-slate-900"
                        rx="0.4"
                      />

                      {/* Minor Grid Lines: 1x1 integer grid spacing from -8 to 8 */}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gx) => (
                        <line
                          key={`gx-${gx}`}
                          x1={gx}
                          y1={-8}
                          x2={gx}
                          y2={8}
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="0.04"
                        />
                      ))}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gy) => (
                        <line
                          key={`gy-${gy}`}
                          x1={-8}
                          y1={gy}
                          x2={8}
                          y2={gy}
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="0.04"
                        />
                      ))}

                      {/* Outer Grid Perimeter Box */}
                      <rect
                        x="-8"
                        y="-8"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        className="text-slate-300 dark:text-slate-700"
                        strokeWidth="0.06"
                      />

                      {/* Main Axes (x=0 and y=0) - Visually Stronger */}
                      <line
                        x1={-8.8}
                        y1={0}
                        x2={8.8}
                        y2={0}
                        stroke="currentColor"
                        className="text-slate-900 dark:text-slate-100"
                        strokeWidth="0.14"
                      />
                      <line
                        x1={0}
                        y1={8.8}
                        x2={0}
                        y2={-8.8}
                        stroke="currentColor"
                        className="text-slate-900 dark:text-slate-100"
                        strokeWidth="0.14"
                      />

                      {/* Axis Arrowheads */}
                      <polygon
                        points="9.0,0 8.55,-0.22 8.55,0.22"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="-9.0,0 -8.55,-0.22 -8.55,0.22"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="0,-9.0 -0.22,-8.55 0.22,-8.55"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="0,9.0 -0.22,8.55 0.22,8.55"
                        className="fill-slate-900 dark:fill-slate-100"
                      />

                      {/* Axis Labels */}
                      <text
                        x={9.2}
                        y={-0.3}
                        fontSize="0.65"
                        fontWeight="bold"
                        fontStyle="italic"
                        className="fill-slate-900 dark:fill-slate-100"
                      >
                        x
                      </text>
                      <text
                        x={0.35}
                        y={-9.1}
                        fontSize="0.65"
                        fontWeight="bold"
                        fontStyle="italic"
                        className="fill-slate-900 dark:fill-slate-100"
                      >
                        y
                      </text>

                      {/* Origin (0,0) */}
                      <text
                        x={-0.45}
                        y={0.55}
                        fontSize="0.48"
                        fontWeight="bold"
                        className="fill-slate-600 dark:fill-slate-400"
                      >
                        0
                      </text>

                      {/* Integer Axis Tick Marks */}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <g key={`ticks-${n}`}>
                          <line
                            x1={n}
                            y1={-0.12}
                            x2={n}
                            y2={0.12}
                            stroke="currentColor"
                            className="text-slate-900 dark:text-slate-100"
                            strokeWidth="0.07"
                          />
                          <line
                            x1={-0.12}
                            y1={-n}
                            x2={0.12}
                            y2={-n}
                            stroke="currentColor"
                            className="text-slate-900 dark:text-slate-100"
                            strokeWidth="0.07"
                          />
                        </g>
                      ))}

                      {/* Axis Numerical Labels (Every 2 units for maximum readability) */}
                      {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                        <text
                          key={`numx-${n}`}
                          x={n}
                          y={0.68}
                          fontSize="0.46"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="fill-slate-700 dark:fill-slate-300 select-none"
                        >
                          {n}
                        </text>
                      ))}

                      {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                        <text
                          key={`numy-${n}`}
                          x={-0.34}
                          y={-n + 0.16}
                          fontSize="0.46"
                          fontWeight="bold"
                          textAnchor="end"
                          className="fill-slate-700 dark:fill-slate-300 select-none"
                        >
                          {n}
                        </text>
                      ))}

                      {/* Plotted Linear Function: y = -x + 2 */}
                      {/* In SVG coordinate system math y is inverted: svg y = -(-x + 2) = x - 2 */}
                      <line
                        x1={-6.6}
                        y1={-8.6}
                        x2={8.6}
                        y2={6.6}
                        stroke="#2563eb"
                        strokeWidth="0.16"
                        strokeLinecap="round"
                        className="dark:stroke-sky-400"
                      />

                      {/* Selectable Hot Spot Candidate Points */}
                      {(currentQ as Q2GraphHotSpotSlope).points.map((pt) => {
                        const isSelected = (currentAnswer?.selectedPoints || []).includes(pt.id);

                        // Strategic non-overlapping badge and leader-line coordinates ensuring absolute legibility
                        const pointVisualConfigs: Record<
                          string,
                          {
                            bx: number;
                            by: number;
                            bw: number;
                            bh: number;
                            lx1: number;
                            ly1: number;
                            lx2: number;
                            ly2: number;
                          }
                        > = {
                          // A(0, 2): on y-axis -> label shifted up-right into Quadrant 1 with leader line
                          'pt-A': {
                            bx: 0.35,
                            by: -4.11,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: 0.22,
                            ly1: -2.26,
                            lx2: 0.75,
                            ly2: -3.29,
                          },
                          // B(-5, 3): in Quadrant 2 -> label shifted straight up into open space with vertical leader
                          'pt-B': {
                            bx: -6.15,
                            by: -5.31,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: -5.0,
                            ly1: -3.38,
                            lx2: -5.0,
                            ly2: -4.49,
                          },
                          // C(3, 4): in Quadrant 1 -> label shifted straight up into top open space with vertical leader
                          'pt-C': {
                            bx: 1.85,
                            by: -6.41,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: 3.0,
                            ly1: -4.38,
                            lx2: 3.0,
                            ly2: -5.59,
                          },
                          // D(2, 0): on x-axis -> label shifted up-right into Quadrant 1, away from axes and numbers
                          'pt-D': {
                            bx: 2.55,
                            by: -2.21,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: 2.26,
                            ly1: -0.26,
                            lx2: 2.95,
                            ly2: -1.39,
                          },
                          // E(4, -1): in Quadrant 4 -> label shifted down-right into Quadrant 4 open pocket with leader line
                          'pt-E': {
                            bx: 4.85,
                            by: 1.79,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: 4.35,
                            ly1: 1.25,
                            lx2: 5.05,
                            ly2: 1.79,
                          },
                          // F(-2, 3): in Quadrant 2 -> label shifted down-left away from line with leader line
                          'pt-F': {
                            bx: -4.95,
                            by: -1.91,
                            bw: 2.3,
                            bh: 0.82,
                            lx1: -2.28,
                            ly1: -2.72,
                            lx2: -3.15,
                            ly2: -1.91,
                          },
                        };
                        const cfg = pointVisualConfigs[pt.id] || {
                          bx: pt.x + 0.45,
                          by: -pt.y - 0.41,
                          bw: 2.3,
                          bh: 0.82,
                          lx1: pt.x,
                          ly1: -pt.y,
                          lx2: pt.x + 0.45,
                          ly2: -pt.y - 0.41,
                        };

                        return (
                          <g
                            key={pt.id}
                            className="cursor-pointer"
                            onClick={() => {
                              if (isCurrentCompleted) return;
                              const prevSelected: string[] =
                                currentAnswer?.selectedPoints || [];
                              let nextSelected: string[];
                              if (prevSelected.includes(pt.id)) {
                                nextSelected = prevSelected.filter((id) => id !== pt.id);
                              } else {
                                if (prevSelected.length >= 2) {
                                  nextSelected = [prevSelected[1], pt.id];
                                } else {
                                  nextSelected = [...prevSelected, pt.id];
                                }
                              }
                              setAnswers((prev) => ({
                                ...prev,
                                [currentIndex]: {
                                  ...prev[currentIndex],
                                  selectedPoints: nextSelected,
                                },
                              }));
                            }}
                          >
                            {/* Generous touch/click target area for Chromebooks */}
                            <circle cx={pt.x} cy={-pt.y} r={0.95} fill="transparent" />

                            {/* Thin Leader Line Connecting Point Marker to its Coordinate Badge */}
                            <line
                              x1={cfg.lx1}
                              y1={cfg.ly1}
                              x2={cfg.lx2}
                              y2={cfg.ly2}
                              stroke={isSelected ? '#0891b2' : '#64748b'}
                              strokeWidth="0.045"
                              strokeDasharray="0.1 0.08"
                              strokeLinecap="round"
                              className={isSelected ? 'dark:stroke-cyan-400' : 'dark:stroke-slate-400'}
                            />

                            {/* Point Visual Indicator */}
                            {isSelected ? (
                              <>
                                {/* Selection Halo */}
                                <circle
                                  cx={pt.x}
                                  cy={-pt.y}
                                  r={0.58}
                                  fill="#06b6d4"
                                  opacity="0.35"
                                />
                                {/* Selected Point Body */}
                                <circle
                                  cx={pt.x}
                                  cy={-pt.y}
                                  r={0.4}
                                  fill="#0891b2"
                                  stroke="#ffffff"
                                  strokeWidth="0.09"
                                />
                                {/* Selected Center Core */}
                                <circle cx={pt.x} cy={-pt.y} r={0.16} fill="#ffffff" />
                              </>
                            ) : (
                              <>
                                {/* Unselected Candidate Point Body */}
                                <circle
                                  cx={pt.x}
                                  cy={-pt.y}
                                  r={0.32}
                                  fill="#ffffff"
                                  className="dark:fill-slate-900"
                                  stroke="#0284c7"
                                  strokeWidth="0.08"
                                />
                                {/* Unselected Center Dot */}
                                <circle cx={pt.x} cy={-pt.y} r={0.14} fill="#0284c7" />
                              </>
                            )}

                            {/* High-Contrast Label Badge with Solid Background */}
                            <g className="pointer-events-none select-none">
                              <rect
                                x={cfg.bx}
                                y={cfg.by}
                                width={cfg.bw}
                                height={cfg.bh}
                                rx={0.2}
                                className={
                                  isSelected
                                    ? 'fill-cyan-50 dark:fill-cyan-950 stroke-cyan-500 dark:stroke-cyan-400'
                                    : 'fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-500'
                                }
                                strokeWidth={isSelected ? 0.065 : 0.05}
                              />
                              <text
                                x={cfg.bx + cfg.bw / 2}
                                y={cfg.by + cfg.bh * 0.7}
                                textAnchor="middle"
                                fontSize="0.48"
                                fontWeight={isSelected ? '800' : '700'}
                                className={
                                  isSelected
                                    ? 'fill-cyan-700 dark:fill-cyan-300'
                                    : 'fill-slate-900 dark:fill-slate-100'
                                }
                              >
                                {pt.label}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Slope Dropdown Selector */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                    Based on your selected points, what is the slope (rate of change) of the line?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(currentQ as Q2GraphHotSpotSlope).slopeDropdownOptions.map((opt) => {
                      const isChosen = currentAnswer?.chosenSlope === opt;
                      return (
                        <button
                          key={opt}
                          disabled={isCurrentCompleted}
                          onClick={() => {
                            if (isCurrentCompleted) return;
                            setAnswers((prev) => ({
                              ...prev,
                              [currentIndex]: {
                                ...prev[currentIndex],
                                chosenSlope: opt,
                              },
                            }));
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border transition cursor-pointer ${
                            isChosen
                              ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-cyan-500'
                          }`}
                        >
                          m = {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 3: TABLE ANALYSIS
               ======================================================= */}
            {currentQ.type === 'table-analysis' && (
              <div className="space-y-6">
                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full max-w-lg mx-auto text-left border-collapse border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-cyan-900 text-white text-xs uppercase tracking-wider">
                        <th className="p-3 border border-cyan-800">
                          {(currentQ as Q3TableAnalysisSlope).xHeader}
                        </th>
                        <th className="p-3 border border-cyan-800">
                          {(currentQ as Q3TableAnalysisSlope).yHeader}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700 font-medium">
                      {(currentQ as Q3TableAnalysisSlope).rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        >
                          <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                            {row.x}
                          </td>
                          <td className="p-3 border border-slate-200 dark:border-slate-700 text-cyan-700 dark:text-cyan-300 font-bold">
                            {row.y}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Inline Choice Statements */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-sm">
                  {/* Part 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {(currentQ as Q3TableAnalysisSlope).statement1Prefix}:
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel1 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel1: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white"
                    >
                      <option value="">Select change in depth...</option>
                      {(currentQ as Q3TableAnalysisSlope).dropdown1Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Part 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {(currentQ as Q3TableAnalysisSlope).statement2Prefix}:
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel2 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel2: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white"
                    >
                      <option value="">Select slope m...</option>
                      {(currentQ as Q3TableAnalysisSlope).dropdown2Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Part 3 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {(currentQ as Q3TableAnalysisSlope).statement3Prefix}:
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel3 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel3: e.target.value },
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white"
                    >
                      <option value="">Select initial depth b...</option>
                      {(currentQ as Q3TableAnalysisSlope).dropdown3Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 4: MULTIPLE SELECT (Select TWO)
               ======================================================= */}
            {currentQ.type === 'multiple-select' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-center font-mono text-lg font-black text-cyan-800 dark:text-cyan-300">
                  {(currentQ as Q4MultipleSelectSlope).equation}
                </div>

                <div className="space-y-2.5">
                  {(currentQ as Q4MultipleSelectSlope).options.map((opt) => {
                    const selected: string[] = currentAnswer?.selected || [];
                    const isChecked = selected.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (isCurrentCompleted) return;
                          let nextSelected: string[];
                          if (isChecked) {
                            nextSelected = selected.filter((id) => id !== opt.id);
                          } else {
                            if (selected.length >= 2) {
                              nextSelected = [selected[1], opt.id];
                            } else {
                              nextSelected = [...selected, opt.id];
                            }
                          }
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], selected: nextSelected },
                          }));
                        }}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 ${
                            isChecked
                              ? 'bg-cyan-600 border-cyan-600 text-white'
                              : 'border-slate-400 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                          <strong className="text-slate-900 dark:text-white mr-1.5">{opt.label}.</strong>
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs text-slate-400 text-right">
                  Selected: {(currentAnswer?.selected || []).length} / 2 required
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 5: EQUATION COMPLETION FROM GRAPH
               ======================================================= */}
            {currentQ.type === 'equation-completion' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xl aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-3 sm:p-4 shadow-inner relative overflow-hidden">
                    <svg viewBox="-10.2 -10.2 20.4 20.4" className="w-full h-full select-none">
                      {/* Background fill */}
                      <rect
                        x="-9.8"
                        y="-9.8"
                        width="19.6"
                        height="19.6"
                        fill="#ffffff"
                        className="dark:fill-slate-900"
                        rx="0.4"
                      />

                      {/* Minor Grid Lines: 1x1 integer grid spacing from -8 to 8 */}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gx) => (
                        <line
                          key={`gx-${gx}`}
                          x1={gx}
                          y1={-8}
                          x2={gx}
                          y2={8}
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="0.04"
                        />
                      ))}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gy) => (
                        <line
                          key={`gy-${gy}`}
                          x1={-8}
                          y1={gy}
                          x2={8}
                          y2={gy}
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="0.04"
                        />
                      ))}

                      {/* Outer Grid Perimeter Box */}
                      <rect
                        x="-8"
                        y="-8"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        className="text-slate-300 dark:text-slate-700"
                        strokeWidth="0.06"
                      />

                      {/* Main Axes (x=0 and y=0) - Visually Stronger */}
                      <line
                        x1={-8.8}
                        y1={0}
                        x2={8.8}
                        y2={0}
                        stroke="currentColor"
                        className="text-slate-900 dark:text-slate-100"
                        strokeWidth="0.14"
                      />
                      <line
                        x1={0}
                        y1={8.8}
                        x2={0}
                        y2={-8.8}
                        stroke="currentColor"
                        className="text-slate-900 dark:text-slate-100"
                        strokeWidth="0.14"
                      />

                      {/* Axis Arrowheads */}
                      <polygon
                        points="9.0,0 8.55,-0.22 8.55,0.22"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="-9.0,0 -8.55,-0.22 -8.55,0.22"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="0,-9.0 -0.22,-8.55 0.22,-8.55"
                        className="fill-slate-900 dark:fill-slate-100"
                      />
                      <polygon
                        points="0,9.0 -0.22,8.55 0.22,8.55"
                        className="fill-slate-900 dark:fill-slate-100"
                      />

                      {/* Axis Labels */}
                      <text
                        x={9.2}
                        y={-0.3}
                        fontSize="0.65"
                        fontWeight="bold"
                        fontStyle="italic"
                        className="fill-slate-900 dark:fill-slate-100"
                      >
                        x
                      </text>
                      <text
                        x={0.35}
                        y={-9.1}
                        fontSize="0.65"
                        fontWeight="bold"
                        fontStyle="italic"
                        className="fill-slate-900 dark:fill-slate-100"
                      >
                        y
                      </text>

                      {/* Origin (0,0) */}
                      <text
                        x={-0.45}
                        y={0.55}
                        fontSize="0.48"
                        fontWeight="bold"
                        className="fill-slate-600 dark:fill-slate-400"
                      >
                        0
                      </text>

                      {/* Integer Axis Tick Marks */}
                      {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <g key={`ticks-${n}`}>
                          <line
                            x1={n}
                            y1={-0.12}
                            x2={n}
                            y2={0.12}
                            stroke="currentColor"
                            className="text-slate-900 dark:text-slate-100"
                            strokeWidth="0.07"
                          />
                          <line
                            x1={-0.12}
                            y1={-n}
                            x2={0.12}
                            y2={-n}
                            stroke="currentColor"
                            className="text-slate-900 dark:text-slate-100"
                            strokeWidth="0.07"
                          />
                        </g>
                      ))}

                      {/* Axis Numerical Labels (Every 2 units for maximum readability) */}
                      {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                        <text
                          key={`numx-${n}`}
                          x={n}
                          y={0.68}
                          fontSize="0.46"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="fill-slate-700 dark:fill-slate-300 select-none"
                        >
                          {n}
                        </text>
                      ))}

                      {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                        <text
                          key={`numy-${n}`}
                          x={-0.34}
                          y={-n + 0.16}
                          fontSize="0.46"
                          fontWeight="bold"
                          textAnchor="end"
                          className="fill-slate-700 dark:fill-slate-300 select-none"
                        >
                          {n}
                        </text>
                      ))}

                      {/* Plotted Linear Function: y = -2x + 4 */}
                      {/* Line extends cleanly across the grid from x=-2.25, y_svg=-8.5 to x=6.25, y_svg=8.5 */}
                      <line
                        x1={-2.25}
                        y1={-8.5}
                        x2={6.25}
                        y2={8.5}
                        stroke="#2563eb"
                        strokeWidth="0.16"
                        strokeLinecap="round"
                        className="dark:stroke-sky-400"
                      />

                      {/* Small clean markers for mathematically verified lattice points - no text labels, no hints */}
                      {(currentQ as Q5EquationCompletion).guidePoints.map((pt, idx) => (
                        <circle
                          key={`pt-${idx}`}
                          cx={pt.x}
                          cy={-pt.y}
                          r={0.2}
                          fill="#2563eb"
                          className="dark:fill-sky-400 stroke-white dark:stroke-slate-950"
                          strokeWidth="0.07"
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Equation Inputs */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Complete Slope-Intercept Form:
                  </span>
                  <div className="flex items-center justify-center gap-2 text-xl font-black text-slate-900 dark:text-white">
                    <span>y =</span>
                    <input
                      type="text"
                      disabled={isCurrentCompleted}
                      placeholder="Enter m"
                      value={currentAnswer?.m || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], m: e.target.value },
                        }))
                      }
                      className="w-24 sm:w-28 px-3 py-2 text-center text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 focus:ring-2 focus:ring-cyan-500"
                    />
                    <span>x +</span>
                    <input
                      type="text"
                      disabled={isCurrentCompleted}
                      placeholder="Enter b"
                      value={currentAnswer?.b || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], b: e.target.value },
                        }))
                      }
                      className="w-24 sm:w-28 px-3 py-2 text-center text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 6: NUMERIC ENTRY
               ======================================================= */}
            {currentQ.type === 'numeric-entry' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-6 text-center">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">Coordinate 1</span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                      ({(currentQ as Q6NumericEntrySlope).pointA.x}, {(currentQ as Q6NumericEntrySlope).pointA.y})
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">Coordinate 2</span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                      ({(currentQ as Q6NumericEntrySlope).pointB.x}, {(currentQ as Q6NumericEntrySlope).pointB.y})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Slope (m):
                    </label>
                    <input
                      type="text"
                      disabled={isCurrentCompleted}
                      placeholder="Enter slope m"
                      value={currentAnswer?.m || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], m: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 text-center text-base font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      y-Intercept (b):
                    </label>
                    <input
                      type="text"
                      disabled={isCurrentCompleted}
                      placeholder="Enter y-intercept b"
                      value={currentAnswer?.b || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], b: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 text-center text-base font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Live Equation Display */}
                <div className="p-3 bg-cyan-50/40 dark:bg-cyan-950/20 rounded-xl text-center text-xs font-mono text-cyan-800 dark:text-cyan-300">
                  Equation Model: y = {currentAnswer?.m || 'm'}x + ({currentAnswer?.b || 'b'})
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 7: TWO-PART DROPDOWN
               ======================================================= */}
            {currentQ.type === 'two-part-dropdown' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block mb-1">Scenario Details:</strong>
                  {(currentQ as Q7TwoPartDropdown).scenario}
                </div>

                <div className="space-y-5">
                  {/* Part A */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                      {(currentQ as Q7TwoPartDropdown).partA.prompt}
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.partA || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], partA: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="">Select slope meaning...</option>
                      {(currentQ as Q7TwoPartDropdown).partA.dropdownOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Part B */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                      {(currentQ as Q7TwoPartDropdown).partB.prompt}
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.partB || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], partB: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="">Select equation & y-intercept...</option>
                      {(currentQ as Q7TwoPartDropdown).partB.dropdownOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 8: MULTI-REPRESENTATION ANALYSIS
               ======================================================= */}
            {currentQ.type === 'multi-representation' && (
              <div className="space-y-6">
                {/* Side-by-side Table & Graph */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {/* Table Representation */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                          {(currentQ as Q8MultiRepresentation).tableData.title}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                          Data Table
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Battery charge recorded at discrete elapsed time intervals.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner">
                      <table className="w-full text-center border-collapse">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          <tr className="border-b border-slate-300 dark:border-slate-700">
                            <th className="py-3 px-4 font-bold text-xs sm:text-sm tracking-wide border-r border-slate-300 dark:border-slate-700">
                              {(currentQ as Q8MultiRepresentation).tableData.xHeader}
                            </th>
                            <th className="py-3 px-4 font-bold text-xs sm:text-sm tracking-wide">
                              {(currentQ as Q8MultiRepresentation).tableData.yHeader}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                          {(currentQ as Q8MultiRepresentation).tableData.rows.map((r, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0
                                  ? 'bg-white dark:bg-slate-900'
                                  : 'bg-slate-50/70 dark:bg-slate-800/40'
                              }
                            >
                              <td className="py-3.5 sm:py-4 px-4 font-black text-sm sm:text-base border-r border-slate-200 dark:border-slate-800">
                                {r.x}
                              </td>
                              <td className="py-3.5 sm:py-4 px-4 font-black text-sm sm:text-base text-cyan-600 dark:text-cyan-400">
                                {r.y}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Initial State:</span>
                        <span>t = 0 hr → 15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Final State:</span>
                        <span>t = 8 hr → 63%</span>
                      </div>
                    </div>
                  </div>

                  {/* Graph Representation */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-between space-y-4">
                    <div className="w-full space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                          {(currentQ as Q8MultiRepresentation).graphData.title}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                          Coordinate Plane
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Linear charging rate and initial battery level plotted on the coordinate plane.
                      </p>
                    </div>

                    {/* Large Square Coordinate Plane */}
                    <div className="w-full aspect-square max-w-lg bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 sm:p-3 shadow-inner relative overflow-hidden flex items-center justify-center">
                      <svg viewBox="0 0 500 500" className="w-full h-full select-none">
                        <defs>
                          <marker
                            id="q8-line-arrow"
                            viewBox="0 0 10 10"
                            refX="6"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto"
                          >
                            <path
                              d="M 1 2 L 8 5 L 1 8 z"
                              className="fill-sky-600 dark:fill-sky-400"
                            />
                          </marker>
                        </defs>

                        {/* Background fill */}
                        <rect
                          x="70"
                          y="40"
                          width="380"
                          height="380"
                          fill="#ffffff"
                          className="dark:fill-slate-900"
                        />

                        {/* Subtle Grid Lines */}
                        {/* Vertical grid lines: t = 0 to 8 */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => {
                          const gx = 70 + t * 47.5;
                          return (
                            <line
                              key={`q8-gx-${t}`}
                              x1={gx}
                              y1={40}
                              x2={gx}
                              y2={420}
                              stroke="currentColor"
                              className="text-slate-200 dark:text-slate-800"
                              strokeWidth="1"
                            />
                          );
                        })}

                        {/* Horizontal grid lines: B = 0 to 60 in steps of 5 */}
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((bVal) => {
                          const gy = 420 - bVal * (380 / 60);
                          return (
                            <line
                              key={`q8-gy-${bVal}`}
                              x1={70}
                              y1={gy}
                              x2={450}
                              y2={gy}
                              stroke="currentColor"
                              className="text-slate-200 dark:text-slate-800"
                              strokeWidth="1"
                            />
                          );
                        })}

                        {/* Outer Grid Perimeter Box */}
                        <rect
                          x="70"
                          y="40"
                          width="380"
                          height="380"
                          fill="none"
                          stroke="currentColor"
                          className="text-slate-300 dark:text-slate-700"
                          strokeWidth="1.5"
                        />

                        {/* Main Axes (x=0/t=0 and y=0/B=0) - Visually Stronger */}
                        {/* Horizontal axis (Time, t) */}
                        <line
                          x1={70}
                          y1={420}
                          x2={466}
                          y2={420}
                          stroke="currentColor"
                          className="text-slate-900 dark:text-slate-100"
                          strokeWidth="2.5"
                        />
                        <polygon
                          points="474,420 464,415 464,425"
                          className="fill-slate-900 dark:fill-slate-100"
                        />

                        {/* Vertical axis (Charge, B) */}
                        <line
                          x1={70}
                          y1={420}
                          x2={70}
                          y2={24}
                          stroke="currentColor"
                          className="text-slate-900 dark:text-slate-100"
                          strokeWidth="2.5"
                        />
                        <polygon
                          points="70,16 65,26 75,26"
                          className="fill-slate-900 dark:fill-slate-100"
                        />

                        {/* Tick Marks */}
                        {/* Horizontal Axis Ticks (t = 1 to 8) */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => {
                          const tx = 70 + t * 47.5;
                          return (
                            <line
                              key={`q8-tick-x-${t}`}
                              x1={tx}
                              y1={420}
                              x2={tx}
                              y2={426}
                              stroke="currentColor"
                              className="text-slate-900 dark:text-slate-100"
                              strokeWidth="1.5"
                            />
                          );
                        })}

                        {/* Vertical Axis Ticks (B = 5 to 60) */}
                        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((bVal) => {
                          const ty = 420 - bVal * (380 / 60);
                          return (
                            <line
                              key={`q8-tick-y-${bVal}`}
                              x1={64}
                              y1={ty}
                              x2={70}
                              y2={ty}
                              stroke="currentColor"
                              className="text-slate-900 dark:text-slate-100"
                              strokeWidth="1.5"
                            />
                          );
                        })}

                        {/* Origin Label "0" */}
                        <text
                          x="60"
                          y="432"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="end"
                          className="fill-slate-600 dark:fill-slate-400"
                        >
                          0
                        </text>

                        {/* Horizontal Scale Numbers (t = 1 to 8) */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => {
                          const nx = 70 + t * 47.5;
                          return (
                            <text
                              key={`q8-num-x-${t}`}
                              x={nx}
                              y={438}
                              fontSize="12"
                              fontWeight="bold"
                              textAnchor="middle"
                              className="fill-slate-700 dark:fill-slate-300"
                            >
                              {t}
                            </text>
                          );
                        })}

                        {/* Vertical Scale Numbers (B = 5 to 60) */}
                        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((bVal) => {
                          const ny = 420 - bVal * (380 / 60);
                          return (
                            <text
                              key={`q8-num-y-${bVal}`}
                              x={60}
                              y={ny + 4}
                              fontSize="11"
                              fontWeight="bold"
                              textAnchor="end"
                              className="fill-slate-700 dark:fill-slate-300"
                            >
                              {bVal}
                            </text>
                          );
                        })}

                        {/* Axis Titles & Units */}
                        <text
                          x={260}
                          y={468}
                          fontSize="13"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="fill-slate-900 dark:fill-slate-100"
                        >
                          Time, t (hours)
                        </text>
                        <text
                          x={-230}
                          y={22}
                          transform="rotate(-90)"
                          fontSize="13"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="fill-slate-900 dark:fill-slate-100"
                        >
                          Battery Charge, B (%)
                        </text>

                        {/* Linear Graph for Solar Plan B: B = 4t + 25 */}
                        {/* Extends cleanly from t=0 (x=70, y=261.67) to t=8 (x=450, y=59) */}
                        <line
                          x1={70}
                          y1={420 - 25 * (380 / 60)}
                          x2={450}
                          y2={420 - (4 * 8 + 25) * (380 / 60)}
                          stroke="#0284c7"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="dark:stroke-sky-400"
                          markerEnd="url(#q8-line-arrow)"
                        />

                        {/* Plotted Points (t = 0, 2, 4, 6) from graphData */}
                        {(currentQ as Q8MultiRepresentation).graphData.points.map((pt, idx) => {
                          const px = 70 + pt.x * 47.5;
                          const py = 420 - pt.y * (380 / 60);
                          return (
                            <circle
                              key={`q8-pt-${idx}`}
                              cx={px}
                              cy={py}
                              r={6}
                              fill="#0284c7"
                              className="dark:fill-sky-400 stroke-white dark:stroke-slate-900"
                              strokeWidth="2.5"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Dropdown Questions */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      1. Comparing Rates of Change (Slope):
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel1 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel1: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="">Select rate comparison...</option>
                      {(currentQ as Q8MultiRepresentation).dropdown1Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      2. Comparing Initial Battery Levels (y-intercept):
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel2 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel2: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="">Select initial value comparison...</option>
                      {(currentQ as Q8MultiRepresentation).dropdown2Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      3. Modeling Linear Equations:
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.sel3 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], sel3: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="">Select equations...</option>
                      {(currentQ as Q8MultiRepresentation).dropdown3Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 9: CLASSIFICATION DRAG & DROP
               ======================================================= */}
            {currentQ.type === 'classification' && (
              <div className="space-y-6 select-none">
                {/* Floating Pointer Drag Preview for Q9 */}
                {q9IsPointerDragging && q9DraggedCardId && q9PointerPos && (
                  <div
                    className="fixed pointer-events-none z-50 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 border-2 border-cyan-300 shadow-2xl scale-105 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 max-w-xs cursor-grabbing whitespace-nowrap"
                    style={{ left: `${q9PointerPos.x}px`, top: `${q9PointerPos.y}px` }}
                  >
                    <GripVertical className="w-3.5 h-3.5 text-slate-950/80 shrink-0" />
                    <span>
                      {(currentQ as Q9ClassificationSlope).cards.find((c) => c.id === q9DraggedCardId)?.title}
                    </span>
                  </div>
                )}

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>
                      Drag each card to its matching category box, or tap a card below then tap any category box.
                    </span>
                  </div>
                  {!isCurrentCompleted && Object.keys(currentAnswer?.assignments || {}).length > 0 && (
                    <button
                      onClick={handleResetQ9}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                      title="Return all cards to unassigned area"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Placements</span>
                    </button>
                  )}
                </div>

                {/* 4 Classification Category Drop Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(currentQ as Q9ClassificationSlope).categories.map((cat) => {
                    const assignedCards = (currentQ as Q9ClassificationSlope).cards.filter(
                      (c) => currentAnswer?.assignments?.[c.id] === cat.id
                    );
                    const isHovered = q9DragOverZone === cat.id;

                    return (
                      <div
                        key={cat.id}
                        data-drop-zone={cat.id}
                        onClick={() => {
                          if (isCurrentCompleted || q9JustDraggedRef.current) return;
                          if (activeSelectedTile) {
                            handleAssignCardQ9(activeSelectedTile, cat.id);
                            setActiveSelectedTile(null);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition min-h-[170px] flex flex-col justify-between ${
                          cat.color
                        } ${
                          isHovered ? 'ring-4 ring-cyan-400 dark:ring-cyan-400 scale-[1.03] shadow-lg' : ''
                        }`}
                      >
                        <div className="border-b border-slate-300 dark:border-slate-700 pb-2 mb-2">
                          <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white block">
                            {cat.label}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                            {cat.sublabel}
                          </span>
                        </div>

                        {/* Cards Assigned inside this Category */}
                        <div className="space-y-2 grow">
                          {assignedCards.length === 0 ? (
                            <div className="h-full min-h-[80px] flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-2 text-center text-[11px] text-slate-400 select-none">
                              Drop or tap here
                            </div>
                          ) : (
                            assignedCards.map((card) => {
                              const isSelected = activeSelectedTile === card.id;
                              const isCardBeingDragged = q9DraggedCardId === card.id;
                              return (
                                <div
                                  key={card.id}
                                  draggable={false}
                                  onDragStart={(e) => e.preventDefault()}
                                  onPointerDown={(e) => {
                                    if (isCurrentCompleted || e.button !== 0) return;
                                    if ((e.target as HTMLElement)?.closest('button')) return;
                                    q9PointerDownRef.current = {
                                      startX: e.clientX,
                                      startY: e.clientY,
                                      cardId: card.id,
                                      hasMoved: false,
                                    };
                                  }}
                                  onClick={(e) => {
                                    if (isCurrentCompleted || q9JustDraggedRef.current) return;
                                    e.stopPropagation();
                                    setActiveSelectedTile(isSelected ? null : card.id);
                                  }}
                                  className={`p-2 rounded-xl bg-white dark:bg-slate-900 border shadow-xs flex items-center justify-between gap-1 text-xs transition cursor-grab active:cursor-grabbing touch-none select-none ${
                                    isCardBeingDragged ? 'opacity-40 border-dashed border-cyan-500' : ''
                                  } ${
                                    isSelected
                                      ? 'border-cyan-500 ring-2 ring-cyan-400 bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-100 font-bold'
                                      : 'border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 overflow-hidden">
                                    <GripVertical className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                      {card.title}
                                    </span>
                                  </div>
                                  {!isCurrentCompleted && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAssignCardQ9(card.id, '');
                                        if (activeSelectedTile === card.id) {
                                          setActiveSelectedTile(null);
                                        }
                                      }}
                                      className="text-slate-400 hover:text-rose-500 p-0.5 rounded cursor-pointer shrink-0"
                                      title="Remove from category"
                                    >
                                      ×
                                    </button>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Unassigned Cards Pool */}
                <div
                  data-drop-zone="unassigned"
                  onClick={() => {
                    if (isCurrentCompleted || q9JustDraggedRef.current) return;
                    if (activeSelectedTile) {
                      handleAssignCardQ9(activeSelectedTile, '');
                      setActiveSelectedTile(null);
                    }
                  }}
                  className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border transition space-y-2 ${
                    q9DragOverZone === 'unassigned' && q9DraggedCardId
                      ? 'ring-2 ring-cyan-400 border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Cards to Classify (Tap card then tap target category):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(currentQ as Q9ClassificationSlope).cards
                      .filter((c) => !currentAnswer?.assignments?.[c.id])
                      .map((card) => {
                        const isSelected = activeSelectedTile === card.id;
                        const isCardBeingDragged = q9DraggedCardId === card.id;
                        return (
                          <div
                            key={card.id}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            onPointerDown={(e) => {
                              if (isCurrentCompleted || e.button !== 0) return;
                              q9PointerDownRef.current = {
                                startX: e.clientX,
                                startY: e.clientY,
                                cardId: card.id,
                                hasMoved: false,
                              };
                            }}
                            onClick={() => {
                              if (isCurrentCompleted || q9JustDraggedRef.current) return;
                              setActiveSelectedTile(isSelected ? null : card.id);
                            }}
                            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-grab active:cursor-grabbing touch-none select-none flex items-center gap-1.5 ${
                              isCardBeingDragged ? 'opacity-40 border-dashed border-cyan-500' : ''
                            } ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 ring-2 ring-cyan-300 shadow-md'
                                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-cyan-500'
                            }`}
                          >
                            <GripVertical className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="block">{card.title}</span>
                          </div>
                        );
                      })}
                    {(currentQ as Q9ClassificationSlope).cards.every(
                      (c) => !!currentAnswer?.assignments?.[c.id]
                    ) && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ All 8 items placed! You can change assignments before submitting.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 10: MATCHING EQUATIONS TO GRAPHS
               ======================================================= */}
            {currentQ.type === 'matching' && (() => {
              const qTyped = currentQ as Q10MatchingSlope;
              const q10Matches: Record<string, string> = currentAnswer?.matches || {};
              const assignedGraphs = Object.values(q10Matches).filter(Boolean);
              const duplicateGraphIds = assignedGraphs.filter((val, idx, arr) => arr.indexOf(val) !== idx);
              const hasDuplicates = duplicateGraphIds.length > 0;
              const allAssigned = qTyped.equations.every((eq) => !!q10Matches[eq.id]);
              const isUniqueAndComplete = allAssigned && !hasDuplicates;

              return (
                <div className="space-y-6">
                  {/* Informational Guidance Banner */}
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <p>
                      Examine each coordinate plane below. Analyze the line&apos;s slope (positive or negative direction, rise over run) and y-intercept (where the line crosses the y-axis). Then pair each equation with its unique graph in the matching selectors below.
                    </p>
                  </div>

                  {/* 2x2 High-Quality Coordinate Planes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {qTyped.graphs.map((g) => (
                      <div
                        key={g.id}
                        className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col items-center space-y-3"
                      >
                        <div className="w-full flex items-center justify-between">
                          <span className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wide px-3 py-1 bg-cyan-50 dark:bg-cyan-950/60 rounded-lg border border-cyan-200 dark:border-cyan-800">
                            {g.graphId.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                            Window [-8, 8]
                          </span>
                        </div>

                        {/* Coordinate Plane Square Container */}
                        <div className="w-full max-w-[360px] aspect-square mx-auto bg-white dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-700 p-2 sm:p-3 shadow-inner relative overflow-hidden flex items-center justify-center">
                          <svg
                            viewBox="-10.2 -10.2 20.4 20.4"
                            className="w-full h-full select-none"
                            role="img"
                            aria-label={`Coordinate plane for ${g.graphId.replace('-', ' ')}`}
                          >
                            <defs>
                              <clipPath id={`q10-grid-clip-${g.id}`}>
                                <rect x="-8" y="-8" width="16" height="16" />
                              </clipPath>
                            </defs>

                            {/* Background */}
                            <rect
                              x="-9.8"
                              y="-9.8"
                              width="19.6"
                              height="19.6"
                              fill="#ffffff"
                              className="dark:fill-slate-950"
                              rx="0.4"
                            />

                            {/* Grid lines (-8 to 8, step 1) */}
                            {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gx) => (
                              <line
                                key={`gx-${g.id}-${gx}`}
                                x1={gx}
                                y1={-8}
                                x2={gx}
                                y2={8}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800/80"
                                strokeWidth="0.04"
                              />
                            ))}
                            {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((gy) => (
                              <line
                                key={`gy-${g.id}-${gy}`}
                                x1={-8}
                                y1={gy}
                                x2={8}
                                y2={gy}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800/80"
                                strokeWidth="0.04"
                              />
                            ))}

                            {/* Grid Outer Border */}
                            <rect
                              x="-8"
                              y="-8"
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              className="text-slate-300 dark:text-slate-700"
                              strokeWidth="0.06"
                            />

                            {/* Main Axes (x=0 and y=0) */}
                            <line
                              x1={-8.8}
                              y1={0}
                              x2={8.8}
                              y2={0}
                              stroke="currentColor"
                              className="text-slate-900 dark:text-slate-100"
                              strokeWidth="0.14"
                            />
                            <line
                              x1={0}
                              y1={8.8}
                              x2={0}
                              y2={-8.8}
                              stroke="currentColor"
                              className="text-slate-900 dark:text-slate-100"
                              strokeWidth="0.14"
                            />

                            {/* Axis Arrowheads */}
                            <polygon
                              points="9.0,0 8.55,-0.22 8.55,0.22"
                              className="fill-slate-900 dark:fill-slate-100"
                            />
                            <polygon
                              points="-9.0,0 -8.55,-0.22 -8.55,0.22"
                              className="fill-slate-900 dark:fill-slate-100"
                            />
                            <polygon
                              points="0,-9.0 -0.22,-8.55 0.22,-8.55"
                              className="fill-slate-900 dark:fill-slate-100"
                            />
                            <polygon
                              points="0,9.0 -0.22,8.55 0.22,8.55"
                              className="fill-slate-900 dark:fill-slate-100"
                            />

                            {/* Axis Labels */}
                            <text
                              x={9.2}
                              y={-0.3}
                              fontSize="0.65"
                              fontWeight="bold"
                              fontStyle="italic"
                              className="fill-slate-900 dark:fill-slate-100 select-none"
                            >
                              x
                            </text>
                            <text
                              x={0.35}
                              y={-9.1}
                              fontSize="0.65"
                              fontWeight="bold"
                              fontStyle="italic"
                              className="fill-slate-900 dark:fill-slate-100 select-none"
                            >
                              y
                            </text>

                            {/* Origin */}
                            <text
                              x={-0.45}
                              y={0.55}
                              fontSize="0.48"
                              fontWeight="bold"
                              className="fill-slate-600 dark:fill-slate-400 select-none"
                            >
                              0
                            </text>

                            {/* Axis Ticks */}
                            {[-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <g key={`ticks-${g.id}-${n}`}>
                                <line
                                  x1={n}
                                  y1={-0.12}
                                  x2={n}
                                  y2={0.12}
                                  stroke="currentColor"
                                  className="text-slate-900 dark:text-slate-100"
                                  strokeWidth="0.07"
                                />
                                <line
                                  x1={-0.12}
                                  y1={-n}
                                  x2={0.12}
                                  y2={-n}
                                  stroke="currentColor"
                                  className="text-slate-900 dark:text-slate-100"
                                  strokeWidth="0.07"
                                />
                              </g>
                            ))}

                            {/* Numerical Scale Labels (Every 2 Units) */}
                            {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                              <text
                                key={`numx-${g.id}-${n}`}
                                x={n}
                                y={0.68}
                                fontSize="0.46"
                                fontWeight="bold"
                                textAnchor="middle"
                                className="fill-slate-700 dark:fill-slate-300 select-none"
                              >
                                {n}
                              </text>
                            ))}
                            {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                              <text
                                key={`numy-${g.id}-${n}`}
                                x={-0.34}
                                y={-n + 0.16}
                                fontSize="0.46"
                                fontWeight="bold"
                                textAnchor="end"
                                className="fill-slate-700 dark:fill-slate-300 select-none"
                              >
                                {n}
                              </text>
                            ))}

                            {/* Continuous Linear Function Line */}
                            <line
                              x1={-12}
                              y1={-(g.slope * -12 + g.yIntercept)}
                              x2={12}
                              y2={-(g.slope * 12 + g.yIntercept)}
                              stroke="#0284c7"
                              strokeWidth="0.22"
                              className="dark:stroke-cyan-400"
                              clipPath={`url(#q10-grid-clip-${g.id})`}
                            />

                            {/* Reference Points on Line (Integer coordinates, NO text labels) */}
                            {g.points?.map((pt, pIdx) => (
                              <circle
                                key={`pt-${g.id}-${pIdx}`}
                                cx={pt.x}
                                cy={-pt.y}
                                r={0.34}
                                className="fill-cyan-500 dark:fill-cyan-400 stroke-white dark:stroke-slate-950"
                                strokeWidth="0.08"
                              />
                            ))}
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Match Selectors */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                          Match each equation to its graph:
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Determine the slope (direction &amp; steepness) and y-intercept of each line, then select the matching graph.
                        </p>
                      </div>
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {assignedGraphs.length} of {qTyped.equations.length} Assigned
                      </div>
                    </div>

                    {/* Duplicate warning banner */}
                    {hasDuplicates && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>
                          <strong>Duplicate assignment detected:</strong> Each equation must match a unique graph. You have assigned {duplicateGraphIds.map((d) => d.replace('graph-', 'Graph ')).join(', ')} to multiple equations.
                        </span>
                      </div>
                    )}

                    {/* All assigned banner */}
                    {isUniqueAndComplete && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>
                          All 4 equations have been uniquely matched! Review your selections and click &ldquo;Submit Answer&rdquo; below.
                        </span>
                      </div>
                    )}

                    {/* 2x2 Equation Dropdown Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {qTyped.equations.map((eq) => {
                        const selectedGraph = q10Matches[eq.id] || '';
                        const isDuplicate = selectedGraph && duplicateGraphIds.includes(selectedGraph);

                        return (
                          <div
                            key={eq.id}
                            className={`p-3.5 sm:p-4 bg-white dark:bg-slate-900 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                              isDuplicate
                                ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-300/40'
                                : selectedGraph
                                ? 'border-cyan-300 dark:border-cyan-800 bg-cyan-50/20 dark:bg-cyan-950/20'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono font-black text-base text-slate-900 dark:text-white block">
                                {eq.equation}
                              </span>
                              {isDuplicate && (
                                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold block">
                                  ⚠ Graph already assigned to another equation
                                </span>
                              )}
                            </div>

                            <select
                              disabled={isCurrentCompleted}
                              value={selectedGraph}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [currentIndex]: {
                                    ...prev[currentIndex],
                                    matches: {
                                      ...(prev[currentIndex]?.matches || {}),
                                      [eq.id]: e.target.value,
                                    },
                                  },
                                }))
                              }
                              className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition focus:ring-2 focus:ring-cyan-500 cursor-pointer ${
                                isDuplicate
                                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                                  : selectedGraph
                                  ? 'border-cyan-400 bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300'
                                  : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <option value="">Select Graph...</option>
                              <option
                                value="graph-A"
                                disabled={Object.entries(q10Matches).some(
                                  ([id, val]) => id !== eq.id && val === 'graph-A'
                                )}
                              >
                                Graph A
                              </option>
                              <option
                                value="graph-B"
                                disabled={Object.entries(q10Matches).some(
                                  ([id, val]) => id !== eq.id && val === 'graph-B'
                                )}
                              >
                                Graph B
                              </option>
                              <option
                                value="graph-C"
                                disabled={Object.entries(q10Matches).some(
                                  ([id, val]) => id !== eq.id && val === 'graph-C'
                                )}
                              >
                                Graph C
                              </option>
                              <option
                                value="graph-D"
                                disabled={Object.entries(q10Matches).some(
                                  ([id, val]) => id !== eq.id && val === 'graph-D'
                                )}
                              >
                                Graph D
                              </option>
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* =======================================================
                QUESTION 11: ERROR ANALYSIS
               ======================================================= */}
            {currentQ.type === 'error-analysis' && (
              <div className="space-y-6">
                {/* Given Work Box */}
                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>{(currentQ as Q11ErrorAnalysisSlope).problemContext}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-center text-sm py-1">
                    {(currentQ as Q11ErrorAnalysisSlope).studentWorkSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60"
                      >
                        <span className="text-[10px] text-slate-400 block">{step.step}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{step.math}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multiple Select Checkboxes */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                    Select exactly TWO statements that analyze the error and supply the correct math:
                  </span>
                  {(currentQ as Q11ErrorAnalysisSlope).options.map((opt) => {
                    const selected: string[] = currentAnswer?.selected || [];
                    const isChecked = selected.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (isCurrentCompleted) return;
                          let nextSelected: string[];
                          if (isChecked) {
                            nextSelected = selected.filter((id) => id !== opt.id);
                          } else {
                            if (selected.length >= 2) {
                              nextSelected = [selected[1], opt.id];
                            } else {
                              nextSelected = [...selected, opt.id];
                            }
                          }
                          setAnswers((prev) => ({
                            ...prev,
                            [currentIndex]: { ...prev[currentIndex], selected: nextSelected },
                          }));
                        }}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 ${
                            isChecked
                              ? 'bg-cyan-600 border-cyan-600 text-white'
                              : 'border-slate-400 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                          <strong className="text-slate-900 dark:text-white mr-1.5">{opt.label}.</strong>
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs text-slate-400 text-right">
                  Selected: {(currentAnswer?.selected || []).length} / 2 required
                </div>
              </div>
            )}

            {/* =======================================================
                QUESTION 12: SYNTHESIS CHALLENGE
               ======================================================= */}
            {currentQ.type === 'synthesis-challenge' && (
              <div className="space-y-6">
                {/* 3 Company Representations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Company 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 block">
                      {(currentQ as Q12SynthesisChallenge).company1.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">
                      Format: Equation
                    </span>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-black text-base text-slate-800 dark:text-slate-200 shadow-sm">
                      {(currentQ as Q12SynthesisChallenge).company1.expression}
                    </div>
                  </div>

                  {/* Company 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 block">
                      {(currentQ as Q12SynthesisChallenge).company2.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">
                      Format: Table
                    </span>
                    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <table className="w-full text-center text-sm border-collapse">
                        <thead className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th className="py-2 px-3 text-slate-800 dark:text-slate-200">Hours, h</th>
                            <th className="py-2 px-3 text-slate-800 dark:text-slate-200">Cost, C</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                          {(currentQ as Q12SynthesisChallenge).company2.rows.map((r, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 text-sm">
                                {r.x}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-cyan-700 dark:text-cyan-400 text-sm">
                                ${r.y}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Company 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 block">
                      {(currentQ as Q12SynthesisChallenge).company3.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">
                      Format: Graph
                    </span>
                    <div className="w-full bg-white dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-700 p-2 shadow-inner">
                      <svg
                        viewBox="0 0 310 230"
                        className="w-full h-auto select-none"
                        role="img"
                        aria-label="EcoMow Express cost graph"
                      >
                        {/* Grid lines: horizontal at cost = 0, 20, 40, 60, 80, 100, 120, 140 */}
                        {[0, 20, 40, 60, 80, 100, 120, 140].map((val) => {
                          const y = 195 - (val / 140) * 165;
                          return (
                            <g key={`gy-${val}`}>
                              <line
                                x1={45}
                                y1={y}
                                x2={295}
                                y2={y}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="0.8"
                              />
                              <text
                                x={40}
                                y={y + 3.5}
                                textAnchor="end"
                                fontSize="9"
                                fill="#64748b"
                                className="font-mono select-none"
                              >
                                {val}
                              </text>
                            </g>
                          );
                        })}

                        {/* Grid lines: vertical at hours = 0, 1, 2, 3, 4, 5 */}
                        {[0, 1, 2, 3, 4, 5].map((h) => {
                          const x = 45 + (h / 5) * 250;
                          return (
                            <g key={`gx-${h}`}>
                              <line
                                x1={x}
                                y1={30}
                                x2={x}
                                y2={195}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="0.8"
                              />
                              <text
                                x={x}
                                y={208}
                                textAnchor="middle"
                                fontSize="9.5"
                                fill="#64748b"
                                className="font-mono select-none"
                              >
                                {h}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line x1={45} y1={195} x2={298} y2={195} stroke="#475569" strokeWidth="1.5" />
                        <line x1={45} y1={195} x2={45} y2={24} stroke="#475569" strokeWidth="1.5" />

                        {/* Axis Labels */}
                        <text x={45} y={18} fontSize="9.5" fontWeight="bold" fill="#334155" className="dark:fill-slate-300">
                          Cost, C ($)
                        </text>
                        <text x={170} y={223} fontSize="9.5" fontWeight="bold" textAnchor="middle" fill="#334155" className="dark:fill-slate-300">
                          Hours, h
                        </text>

                        {/* Plotted Line: C = 30h + 10 */}
                        <line
                          x1={45}
                          y1={195 - (10 / 140) * 165}
                          x2={45 + (4.333 / 5) * 250}
                          y2={30}
                          stroke="#0284c7"
                          strokeWidth="2.5"
                        />

                        {/* Point (0, 10) - y-intercept */}
                        <circle cx={45} cy={195 - (10 / 140) * 165} r={4} fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                        <rect x={53} y={174} width={38} height={14} rx={3} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
                        <text x={72} y={184.5} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0369a1">
                          (0, 10)
                        </text>

                        {/* Point (2, 70) */}
                        <circle cx={45 + (2 / 5) * 250} cy={195 - (70 / 140) * 165} r={4} fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                        <rect x={153} y={105.5} width={38} height={14} rx={3} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
                        <text x={172} y={116} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0369a1">
                          (2, 70)
                        </text>

                        {/* Point (4, 130) */}
                        <circle cx={45 + (4 / 5) * 250} cy={195 - (130 / 140) * 165} r={4} fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                        <rect x={198} y={34} width={42} height={14} rx={3} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
                        <text x={219} y={44.5} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0369a1">
                          (4, 130)
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Synthesis Dropdown Questions */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs sm:text-sm">
                  {/* Task 1 */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {(currentQ as Q12SynthesisChallenge).task1Prompt}
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.task1 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], task1: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="">Select company...</option>
                      {(currentQ as Q12SynthesisChallenge).task1Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Task 2 */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {(currentQ as Q12SynthesisChallenge).task2Prompt}
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.task2 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], task2: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="">Select company...</option>
                      {(currentQ as Q12SynthesisChallenge).task2Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Task 3 */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {(currentQ as Q12SynthesisChallenge).task3Prompt}
                    </span>
                    <select
                      disabled={isCurrentCompleted}
                      value={currentAnswer?.task3 || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: { ...prev[currentIndex], task3: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="">Select company...</option>
                      {(currentQ as Q12SynthesisChallenge).task3Options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
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
                {!isCurrentCorrect && currentQ.instructionalHint
                  ? currentQ.instructionalHint
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
