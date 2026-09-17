// src/components/DigitalStaarEquationsSimulator.tsx
// Complete 12-Question Technology-Enhanced Digital STAAR Simulator for Unit 6: Equations & Inequalities
// TEKS 8.8A, 8.8B, 8.8C | 100% Client-side local architecture. Zero runtime API calls.

import React, { useState, useEffect, useRef } from 'react';
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
  HelpCircle,
  Target,
  Sparkles,
  AlertCircle,
  Info,
  Sliders,
  MoveHorizontal,
  FileSpreadsheet,
  Layers,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';
import {
  UNIT_6_DIGITAL_STAAR_QUESTIONS,
  Unit6DigitalStaarQuestion,
  Q1InteractiveNumberLine,
  Q2DragDropEquation,
  Q3InlineChoiceEquations,
  Q4NumericEntryEquations,
  Q5MultipleSelectEquations,
  Q6ClassificationEquations,
  Q7TableAnalysisEquations,
  Q8ErrorAnalysisEquations,
  Q9MatchingEquations,
  Q10GriddedResponseEquations,
  Q11MultiPartEquations,
  Q12SynthesisChallengeEquations,
} from '../data/staar/digitalStaarEquationsData';

interface DigitalStaarEquationsSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

const STORAGE_KEY = 'pinilla_math_staar_u6_simulator_v1';

export const DigitalStaarEquationsSimulator: React.FC<DigitalStaarEquationsSimulatorProps> = ({
  topicTitle = 'Equations & Inequalities',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});
  const [attemptedQuestions, setAttemptedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Q2 Drag & Drop state
  const [q2SelectedTile, setQ2SelectedTile] = useState<string | null>(null);

  // Q6 Classification tap-to-place helper
  const [q6SelectedCard, setQ6SelectedCard] = useState<string | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.completed) setCompletedQuestions(parsed.completed);
        if (parsed.answers) setAnswers(parsed.answers);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress
  const persistState = (newCompleted: Record<number, boolean>, newAnswers: Record<number, any>) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completed: newCompleted, answers: newAnswers })
      );
    } catch {
      // ignore
    }
  };

  const currentQ = UNIT_6_DIGITAL_STAAR_QUESTIONS[currentIndex];
  const isCurrentCompleted = !!completedQuestions[currentIndex];
  const isCurrentAttempted = !!attemptedQuestions[currentIndex];
  const currentAnswer = answers[currentIndex] || {};

  // Update answer for current question
  const setAnswerForCurrent = (update: any) => {
    const updated = typeof update === 'function' ? update(currentAnswer) : { ...currentAnswer, ...update };
    const nextAnswers = { ...answers, [currentIndex]: updated };
    setAnswers(nextAnswers);
  };

  // Helper for Question 2 slots resolution
  const getQ2ResolvedSlots = (ansSlots?: string[]): string[] => {
    const raw = ansSlots || [];
    return [
      raw[0] || '',
      raw[1] || '+',
      raw[2] || '',
      raw[3] || '',
      raw[4] || '+',
      raw[5] || '',
    ];
  };

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = UNIT_6_DIGITAL_STAAR_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'interactive-number-line': {
        const qTyped = q as Q1InteractiveNumberLine;
        const circle = ans.circle || 'open';
        const boundary = ans.boundary !== undefined ? Number(ans.boundary) : 5;
        const direction = ans.direction || 'right';
        return (
          circle === qTyped.correctCircle &&
          boundary === qTyped.correctBoundary &&
          direction === qTyped.correctDirection &&
          ans.statement === qTyped.correctStatement
        );
      }

      case 'drag-drop-equation': {
        const qTyped = q as Q2DragDropEquation;
        const slots = getQ2ResolvedSlots(ans.slots);
        const builtEquation = `${slots[0]} ${slots[1]} ${slots[2]} = ${slots[3]} ${slots[4]} ${slots[5]}`.replace(/\s+/g, ' ').trim();
        const isEqCorrect = qTyped.correctEquationVariations.includes(builtEquation);
        const followUpCorrect = (ans.followUp || '').toString().trim() === qTyped.correctFollowUpAnswer;
        return isEqCorrect && followUpCorrect;
      }

      case 'inline-choice': {
        const qTyped = q as Q3InlineChoiceEquations;
        return (
          ans.dropdown1 === qTyped.correctDropdown1 &&
          ans.dropdown2 === qTyped.correctDropdown2 &&
          ans.dropdown3 === qTyped.correctDropdown3
        );
      }

      case 'numeric-entry': {
        const qTyped = q as Q4NumericEntryEquations;
        const lcmOk = (ans.lcm || '').toString().trim() === qTyped.correctLcm;
        const solVal = (ans.solution || '').toString().trim();
        const solOk = qTyped.acceptedEquivalents.some(
          (eq) => eq.toLowerCase() === solVal.toLowerCase()
        );
        return lcmOk && solOk;
      }

      case 'multiple-select': {
        const qTyped = q as Q5MultipleSelectEquations;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }

      case 'classification': {
        const qTyped = q as Q6ClassificationEquations;
        const assignments: Record<string, string> = ans.assignments || {};
        return qTyped.cards.every((card) => assignments[card.id] === card.correctCategory);
      }

      case 'table-analysis': {
        const qTyped = q as Q7TableAnalysisEquations;
        return (
          ans.partA === qTyped.correctPartA &&
          ans.partB === qTyped.correctPartB &&
          ans.partC === qTyped.correctPartC
        );
      }

      case 'error-analysis': {
        const qTyped = q as Q8ErrorAnalysisEquations;
        const stepOk = Number(ans.errorStep) === qTyped.correctErrorStep;
        const reasonOk = ans.errorExplanation === qTyped.correctErrorExplanation;
        const solOk = (ans.finalSolution || '').toString().trim() === qTyped.correctFinalSolution;
        return stepOk && reasonOk && solOk;
      }

      case 'matching': {
        const qTyped = q as Q9MatchingEquations;
        const matches: Record<string, string> = ans.matches || {};
        return qTyped.situations.every((sit) => matches[sit.id] === sit.correctMatchId);
      }

      case 'gridded-response': {
        const qTyped = q as Q10GriddedResponseEquations;
        const val = (ans.value || '').toString().trim();
        return qTyped.acceptedValues.some((v) => v.toLowerCase() === val.toLowerCase());
      }

      case 'multi-part': {
        const qTyped = q as Q11MultiPartEquations;
        return (
          ans.partA === qTyped.correctPartA &&
          (ans.partB || '').toString().trim() === qTyped.correctPartB &&
          ans.partC === qTyped.correctPartC
        );
      }

      case 'synthesis-challenge': {
        const qTyped = q as Q12SynthesisChallengeEquations;
        const symOk = ans.symbol === qTyped.correctSymbol;
        const boundOk = (ans.boundary || '').toString().trim() === qTyped.correctBoundary;
        const selValues: string[] = ans.selectedValues || [];
        const correctValues = qTyped.membershipValues.filter((m) => m.isInSolution).map((m) => m.id);
        const memOk =
          selValues.length === correctValues.length &&
          correctValues.every((id) => selValues.includes(id));
        return symOk && boundOk && memOk;
      }

      default:
        return false;
    }
  };

  // Check if student provided enough input to submit
  const isAnswerProvided = (): boolean => {
    const ans = answers[currentIndex];
    if (!ans) return false;

    switch (currentQ.type) {
      case 'interactive-number-line':
        return Boolean(ans.statement);

      case 'drag-drop-equation': {
        const slots = getQ2ResolvedSlots(ans.slots);
        // Equation construction attempted when terms are placed on both sides
        const hasLeftAttempt = Boolean(slots[0] || slots[2]);
        const hasRightAttempt = Boolean(slots[3] || slots[5]);
        const hasEquationAttempt = hasLeftAttempt && hasRightAttempt;
        const hasFollowUpAttempt = Boolean((ans.followUp || '').toString().trim());
        return hasEquationAttempt && hasFollowUpAttempt;
      }

      case 'inline-choice':
        return Boolean(ans.dropdown1 && ans.dropdown2 && ans.dropdown3);

      case 'numeric-entry':
        return Boolean(
          (ans.lcm || '').toString().trim() && (ans.solution || '').toString().trim()
        );

      case 'multiple-select':
        return Array.isArray(ans.selected) && ans.selected.length > 0;

      case 'classification': {
        const qTyped = currentQ as Q6ClassificationEquations;
        const assignments = ans.assignments || {};
        return qTyped.cards.every((c) => Boolean(assignments[c.id]));
      }

      case 'table-analysis':
        return Boolean(
          (ans.partA || '').toString().trim() &&
          (ans.partB || '').toString().trim() &&
          (ans.partC || '').toString().trim()
        );

      case 'error-analysis':
        return Boolean(
          ans.errorStep !== undefined &&
          ans.errorStep !== null &&
          (ans.errorExplanation || '').toString().trim() &&
          (ans.finalSolution || '').toString().trim()
        );

      case 'matching': {
        const qTyped = currentQ as Q9MatchingEquations;
        const matches = ans.matches || {};
        return qTyped.situations.every((s) => Boolean(matches[s.id]));
      }

      case 'gridded-response':
        return Boolean((ans.value || '').toString().trim());

      case 'multi-part':
        return Boolean(
          (ans.partA || '').toString().trim() &&
          (ans.partB || '').toString().trim() &&
          (ans.partC || '').toString().trim()
        );

      case 'synthesis-challenge':
        return Boolean(
          ans.symbol &&
          (ans.boundary || '').toString().trim() &&
          Array.isArray(ans.selectedValues) &&
          ans.selectedValues.length > 0
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
      const nextCompleted = { ...completedQuestions, [currentIndex]: true };
      setCompletedQuestions(nextCompleted);
      persistState(nextCompleted, answers);
    }
  };

  const handleNext = () => {
    setQ2SelectedTile(null);
    setQ6SelectedCard(null);
    if (currentIndex < UNIT_6_DIGITAL_STAAR_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setResultsView(true);
    }
  };

  const handlePrev = () => {
    setQ2SelectedTile(null);
    setQ6SelectedCard(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetSimulator = () => {
    if (window.confirm('Reset all progress in the Unit 6 Digital STAAR Simulator?')) {
      setCompletedQuestions({});
      setAttemptedQuestions({});
      setAnswers({});
      setCurrentIndex(0);
      setResultsView(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const isAllCompleted = completedCount === 12;

  // Render question interactions
  const renderQuestionBody = () => {
    switch (currentQ.type) {
      // =======================================================
      // Q1: Interactive Number Line
      // =======================================================
      case 'interactive-number-line': {
        const q = currentQ as Q1InteractiveNumberLine;
        const circle = currentAnswer.circle || 'open';
        const boundary = currentAnswer.boundary !== undefined ? Number(currentAnswer.boundary) : 5;
        const direction = currentAnswer.direction || 'right';
        const statement = currentAnswer.statement || '';

        return (
          <div className="space-y-6" id="q1-interactive-number-line-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Given Inequality
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.equation}
              </span>
            </div>

            {/* Interactive controls */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-600" />
                Step 1: Configure Number Line Graph
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {/* Circle Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Circle Type at Boundary</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAnswerForCurrent({ circle: 'open' })}
                      disabled={isCurrentCompleted}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        circle === 'open'
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-current bg-white inline-block" />
                      Open (&lt;, &gt;)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnswerForCurrent({ circle: 'closed' })}
                      disabled={isCurrentCompleted}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        circle === 'closed'
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-current inline-block" />
                      Closed (≤, ≥)
                    </button>
                  </div>
                </div>

                {/* Boundary Point Slider/Picker */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Boundary Point:</span>
                    <span className="text-cyan-700 font-mono font-bold text-sm">{boundary}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={boundary}
                    disabled={isCurrentCompleted}
                    onChange={(e) => setAnswerForCurrent({ boundary: Number(e.target.value) })}
                    className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Shading Direction */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Shading Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAnswerForCurrent({ direction: 'left' })}
                      disabled={isCurrentCompleted}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        direction === 'left'
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Left (&lt;)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnswerForCurrent({ direction: 'right' })}
                      disabled={isCurrentCompleted}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        direction === 'right'
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Right (&gt;)
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Number Line Visualizer */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-600 mb-2">Live Number Line Preview:</div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
                  <svg viewBox="0 0 500 80" className="w-full max-w-lg mx-auto h-20 overflow-visible">
                    {/* Main Axis Line */}
                    <line x1="30" y1="45" x2="470" y2="45" stroke="#64748b" strokeWidth="2.5" />
                    <polygon points="30,45 42,39 42,51" fill="#64748b" />
                    <polygon points="470,45 458,39 458,51" fill="#64748b" />

                    {/* Tick Marks 0 to 10 */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const xPos = 50 + i * 40;
                      return (
                        <g key={i}>
                          <line x1={xPos} y1="38" x2={xPos} y2="52" stroke="#64748b" strokeWidth="2" />
                          <text
                            x={xPos}
                            y="68"
                            textAnchor="middle"
                            fontSize="11"
                            fontFamily="monospace"
                            fill="#475569"
                            fontWeight="bold"
                          >
                            {i}
                          </text>
                        </g>
                      );
                    })}

                    {/* Ray Shading */}
                    {(() => {
                      const bX = 50 + boundary * 40;
                      const rayStartX = direction === 'left' ? 30 : bX;
                      const rayEndX = direction === 'left' ? bX : 470;
                      return (
                        <g>
                          <line
                            x1={rayStartX}
                            y1="45"
                            x2={rayEndX}
                            y2="45"
                            stroke="#0284c7"
                            strokeWidth="6"
                            strokeLinecap="round"
                            opacity="0.85"
                          />
                          {/* Directional Arrow on Ray */}
                          {direction === 'left' ? (
                            <polygon points="30,45 44,37 44,53" fill="#0284c7" />
                          ) : (
                            <polygon points="470,45 456,37 456,53" fill="#0284c7" />
                          )}
                        </g>
                      );
                    })()}

                    {/* Circle at Boundary */}
                    {(() => {
                      const bX = 50 + boundary * 40;
                      return (
                        <circle
                          cx={bX}
                          cy="45"
                          r="7"
                          fill={circle === 'closed' ? '#0284c7' : '#ffffff'}
                          stroke="#0284c7"
                          strokeWidth="3.5"
                        />
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2: Statement Dropdown */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-600" />
                Step 2: Select Matching Algebraic Solution Statement
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {q.statementOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswerForCurrent({ statement: opt })}
                    disabled={isCurrentCompleted}
                    className={`p-3 rounded-xl border text-center font-mono font-bold text-sm sm:text-base transition-all ${
                      statement === opt
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-800 ring-2 ring-cyan-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q2: Drag & Drop Equation Modeling
      // =======================================================
      case 'drag-drop-equation': {
        const q = currentQ as Q2DragDropEquation;
        const slots: string[] = getQ2ResolvedSlots(currentAnswer.slots);
        const followUp = currentAnswer.followUp || '';

        const handleSlotClick = (slotIndex: number) => {
          if (isCurrentCompleted) return;
          if (q2SelectedTile) {
            const nextSlots = [...slots];
            nextSlots[slotIndex] = q2SelectedTile;
            setAnswerForCurrent({ slots: nextSlots });
            setQ2SelectedTile(null);
          } else if (slotIndex === 1 || slotIndex === 4) {
            // Operator slot: toggle between + and -
            const nextSlots = [...slots];
            nextSlots[slotIndex] = nextSlots[slotIndex] === '+' ? '-' : '+';
            setAnswerForCurrent({ slots: nextSlots });
          } else if (slots[slotIndex]) {
            const nextSlots = [...slots];
            nextSlots[slotIndex] = '';
            setAnswerForCurrent({ slots: nextSlots });
          }
        };

        const handleClearSlots = () => {
          if (isCurrentCompleted) return;
          setAnswerForCurrent({ slots: ['', '+', '', '', '+', ''] });
        };

        return (
          <div className="space-y-6" id="q2-drag-drop-equation-container">
            <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 text-sm text-cyan-900 leading-relaxed font-medium">
              {q.scenario}
            </div>

            {/* Target Equation Construction Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Equation Construction Area
                </span>
                {!isCurrentCompleted && (
                  <button
                    type="button"
                    onClick={handleClearSlots}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline"
                  >
                    Clear All Slots
                  </button>
                )}
              </div>

              {/* Slots Row */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl min-h-[72px]">
                {/* Left Side: Slot 0, Slot 1, Slot 2 */}
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSlotClick(idx)}
                    disabled={isCurrentCompleted}
                    className={`h-12 min-w-[56px] sm:min-w-[68px] px-3 rounded-lg border-2 font-mono font-bold text-base sm:text-lg flex items-center justify-center transition-all ${
                      slots[idx]
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                        : q2SelectedTile
                        ? 'bg-cyan-50 border-cyan-400 border-dashed text-cyan-600 animate-pulse'
                        : 'bg-white border-slate-300 text-slate-600'
                    }`}
                  >
                    {slots[idx] || '?'}
                  </button>
                ))}

                {/* Fixed Equals Sign */}
                <span className="text-2xl font-black text-slate-700 font-mono px-1">=</span>

                {/* Right Side: Slot 3, Slot 4, Slot 5 */}
                {[3, 4, 5].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSlotClick(idx)}
                    disabled={isCurrentCompleted}
                    className={`h-12 min-w-[56px] sm:min-w-[68px] px-3 rounded-lg border-2 font-mono font-bold text-base sm:text-lg flex items-center justify-center transition-all ${
                      slots[idx]
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                        : q2SelectedTile
                        ? 'bg-cyan-50 border-cyan-400 border-dashed text-cyan-600 animate-pulse'
                        : 'bg-white border-slate-300 text-slate-600'
                    }`}
                  >
                    {slots[idx] || '?'}
                  </button>
                ))}
              </div>

              {/* Available Tile Bank */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-600">
                  Click a tile below to select it, then click any box above to place it:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {q.availableTiles.map((tile, i) => (
                    <button
                      key={`${tile}-${i}`}
                      type="button"
                      onClick={() => {
                        if (isCurrentCompleted) return;
                        setQ2SelectedTile(q2SelectedTile === tile ? null : tile);
                      }}
                      disabled={isCurrentCompleted}
                      className={`py-2.5 px-4 rounded-xl border-2 font-mono font-bold text-sm sm:text-base cursor-pointer transition-all ${
                        q2SelectedTile === tile
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md ring-4 ring-cyan-500/20 -translate-y-0.5'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-cyan-400 hover:bg-cyan-50/50 shadow-xs'
                      }`}
                    >
                      {tile}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow-up Numeric Input */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <label className="text-sm font-bold text-slate-800 block">
                {q.followUpPrompt}
              </label>
              <div className="flex items-center gap-3 max-w-xs">
                <input
                  type="text"
                  value={followUp}
                  disabled={isCurrentCompleted}
                  onChange={(e) => setAnswerForCurrent({ followUp: e.target.value })}
                  placeholder="e.g. 3"
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-xl font-mono text-lg font-bold text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
                <span className="text-sm font-semibold text-slate-600">months</span>
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q3: Inline Choice
      // =======================================================
      case 'inline-choice': {
        const q = currentQ as Q3InlineChoiceEquations;
        const d1 = currentAnswer.dropdown1 || '';
        const d2 = currentAnswer.dropdown2 || '';
        const d3 = currentAnswer.dropdown3 || '';

        return (
          <div className="space-y-6" id="q3-inline-choice-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Target Inequality
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.equation}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs leading-loose text-base text-slate-800">
              <span>{q.sentenceBefore1}</span>
              <select
                value={d1}
                disabled={isCurrentCompleted}
                onChange={(e) => setAnswerForCurrent({ dropdown1: e.target.value })}
                className="inline-block mx-1.5 px-3 py-1.5 bg-cyan-50 border-2 border-cyan-400 rounded-lg font-mono font-bold text-cyan-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">[ Select expression ]</option>
                {q.dropdown1Options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>{q.sentenceBefore2}</span>
              <select
                value={d2}
                disabled={isCurrentCompleted}
                onChange={(e) => setAnswerForCurrent({ dropdown2: e.target.value })}
                className="inline-block mx-1.5 px-3 py-1.5 bg-cyan-50 border-2 border-cyan-400 rounded-lg font-mono font-bold text-cyan-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">[ Select value ]</option>
                {q.dropdown2Options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>{q.sentenceBefore3}</span>
              <select
                value={d3}
                disabled={isCurrentCompleted}
                onChange={(e) => setAnswerForCurrent({ dropdown3: e.target.value })}
                className="inline-block mx-1.5 px-3 py-1.5 bg-cyan-50 border-2 border-cyan-400 rounded-lg font-mono font-bold text-cyan-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">[ Select solution set ]</option>
                {q.dropdown3Options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span>{q.sentenceAfter3}</span>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q4: Numeric Entry with LCM
      // =======================================================
      case 'numeric-entry': {
        const q = currentQ as Q4NumericEntryEquations;
        const lcm = currentAnswer.lcm || '';
        const solution = currentAnswer.solution || '';

        return (
          <div className="space-y-6" id="q4-numeric-entry-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Rational Equation
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.equation}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Part 1: LCM */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part 1: Clear Fractions
                </span>
                <label className="text-sm font-semibold text-slate-800 block">
                  {q.lcmPrompt}
                </label>
                <input
                  type="text"
                  value={lcm}
                  disabled={isCurrentCompleted}
                  onChange={(e) => setAnswerForCurrent({ lcm: e.target.value })}
                  placeholder="e.g. 6"
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-xl font-mono text-xl font-bold text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Part 2: Solution */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part 2: Algebraic Solution
                </span>
                <label className="text-sm font-semibold text-slate-800 block">
                  {q.solutionPrompt}
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xl text-slate-600">x =</span>
                  <input
                    type="text"
                    value={solution}
                    disabled={isCurrentCompleted}
                    onChange={(e) => setAnswerForCurrent({ solution: e.target.value })}
                    placeholder="e.g. 18"
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-xl font-mono text-xl font-bold text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q5: Multiple Select Solution Set
      // =======================================================
      case 'multiple-select': {
        const q = currentQ as Q5MultipleSelectEquations;
        const selected: string[] = currentAnswer.selected || [];

        const toggleOption = (id: string) => {
          if (isCurrentCompleted) return;
          const next = selected.includes(id)
            ? selected.filter((item) => item !== id)
            : [...selected, id];
          setAnswerForCurrent({ selected: next });
        };

        return (
          <div className="space-y-6" id="q5-multiple-select-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Given Inequality
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.inequality}
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Select ALL values in the solution set:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const isChecked = selected.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      disabled={isCurrentCompleted}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-950 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                          isChecked ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-mono font-bold text-base block">{opt.text}</span>
                        {isCurrentCompleted && (
                          <span className="text-xs text-slate-500 mt-1 block">{opt.reason}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q6: Classification Cards
      // =======================================================
      case 'classification': {
        const q = currentQ as Q6ClassificationEquations;
        const assignments: Record<string, string> = currentAnswer.assignments || {};

        const handleAssignCard = (cardId: string, categoryId: string) => {
          if (isCurrentCompleted) return;
          const next = { ...assignments, [cardId]: categoryId };
          setAnswerForCurrent({ assignments: next });
          setQ6SelectedCard(null);
        };

        const handleRemoveCard = (cardId: string) => {
          if (isCurrentCompleted) return;
          const next = { ...assignments };
          delete next[cardId];
          setAnswerForCurrent({ assignments: next });
        };

        return (
          <div className="space-y-6" id="q6-classification-container">
            {/* Category Bins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.categories.map((cat) => {
                const assignedCards = q.cards.filter((c) => assignments[c.id] === cat.id);
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      if (q6SelectedCard && !isCurrentCompleted) {
                        handleAssignCard(q6SelectedCard, cat.id);
                      }
                    }}
                    className={`bg-white border-2 rounded-xl p-4 shadow-xs min-h-[190px] flex flex-col justify-between transition-all ${
                      q6SelectedCard && !isCurrentCompleted
                        ? 'border-cyan-500 bg-cyan-50/30 cursor-pointer ring-2 ring-cyan-400/20'
                        : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                        <h4 className="font-bold text-slate-800 text-sm">{cat.title}</h4>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                          {assignedCards.length}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{cat.description}</p>

                      {/* Placed Cards */}
                      <div className="space-y-2">
                        {assignedCards.map((card) => (
                          <div
                            key={card.id}
                            className="bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800 flex items-center justify-between"
                          >
                            <span>{card.text}</span>
                            {!isCurrentCompleted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveCard(card.id);
                                }}
                                className="text-rose-500 hover:text-rose-700 font-bold ml-2 text-sm"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {q6SelectedCard && !isCurrentCompleted && (
                      <div className="text-[11px] text-cyan-700 font-semibold text-center pt-2">
                        Click here to place selected card
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Unassigned Cards Pool */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Click a card to select, then click a category box above to sort:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {q.cards.map((card) => {
                  const isAssigned = !!assignments[card.id];
                  const isSelected = q6SelectedCard === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setQ6SelectedCard(isSelected ? null : card.id)}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                        isAssigned
                          ? 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                          : isSelected
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md ring-4 ring-cyan-500/20'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-cyan-400 hover:bg-cyan-50/50'
                      }`}
                    >
                      {card.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q7: Table Analysis & Rate Comparison
      // =======================================================
      case 'table-analysis': {
        const q = currentQ as Q7TableAnalysisEquations;
        const partA = currentAnswer.partA || '';
        const partB = currentAnswer.partB || '';
        const partC = currentAnswer.partC || '';

        return (
          <div className="space-y-6" id="q7-table-analysis-container">
            {/* Table Display */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    {q.tableData.headers.map((h, i) => (
                      <th key={i} className="py-3 px-3 font-semibold tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {q.tableData.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`border-b border-slate-100 ${
                        row[0] === 6 ? 'bg-amber-50/80 font-bold text-amber-900' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-slate-700">{row[0]}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-cyan-700">${row[1]}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">${row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 3 Interactive Parts */}
            <div className="space-y-4">
              {/* Part A */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part A: Algebraic Equation Model
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partAPrompt}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.partAOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ partA: opt })}
                      className={`p-2.5 rounded-lg border text-left font-mono text-xs sm:text-sm transition-all ${
                        partA === opt
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part B */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part B: Equal Cost Month
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partBPrompt}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {q.partBOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ partB: opt })}
                      className={`p-2.5 rounded-lg border text-center text-xs sm:text-sm transition-all ${
                        partB === opt
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part C */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part C: Long-Term Economic Comparison
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partCPrompt}
                </label>
                <div className="space-y-2">
                  {q.partCOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ partC: opt })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs sm:text-sm transition-all ${
                        partC === opt
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q8: Error Analysis & Step Correction
      // =======================================================
      case 'error-analysis': {
        const q = currentQ as Q8ErrorAnalysisEquations;
        const errorStep = currentAnswer.errorStep;
        const errorExplanation = currentAnswer.errorExplanation || '';
        const finalSolution = currentAnswer.finalSolution || '';

        return (
          <div className="space-y-6" id="q8-error-analysis-container">
            {/* Student Exam Work Paper */}
            <div className="bg-amber-50/40 border-2 border-amber-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Student Examination Work
                </span>
                <span className="text-xs text-amber-700 font-medium">Original Equation: {q.givenEquation}</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                {q.steps.map((s) => (
                  <div
                    key={s.stepNumber}
                    className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                      Number(errorStep) === s.stepNumber
                        ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                        : 'bg-white border-amber-100 text-slate-800'
                    }`}
                  >
                    <span>
                      <strong className="text-slate-500 mr-3">Step {s.stepNumber}:</strong>
                      {s.text}
                    </span>
                    {!isCurrentCompleted && (
                      <button
                        type="button"
                        onClick={() => setAnswerForCurrent({ errorStep: s.stepNumber })}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          Number(errorStep) === s.stepNumber
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {Number(errorStep) === s.stepNumber ? 'Selected Error' : 'Flag as Error'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Explanation Selection */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                Part B: Mathematical Explanation of the Error
              </span>
              <div className="space-y-2">
                {q.partBOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    disabled={isCurrentCompleted}
                    onClick={() => setAnswerForCurrent({ errorExplanation: opt })}
                    className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all ${
                      errorExplanation === opt
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Solution Input */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                Part C: Correct Solution
              </span>
              <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                {q.partCPrompt}
              </label>
              <div className="flex items-center gap-2 max-w-xs">
                <span className="font-mono font-bold text-lg text-slate-600">x =</span>
                <input
                  type="text"
                  value={finalSolution}
                  disabled={isCurrentCompleted}
                  onChange={(e) => setAnswerForCurrent({ finalSolution: e.target.value })}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl font-mono text-lg font-bold text-slate-900 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q9: Matching Real-World Situations
      // =======================================================
      case 'matching': {
        const q = currentQ as Q9MatchingEquations;
        const matches: Record<string, string> = currentAnswer.matches || {};

        const handleSetMatch = (sitId: string, ineqId: string) => {
          if (isCurrentCompleted) return;
          const next = { ...matches, [sitId]: ineqId };
          setAnswerForCurrent({ matches: next });
        };

        return (
          <div className="space-y-6" id="q9-matching-container">
            <div className="space-y-4">
              {q.situations.map((sit, idx) => {
                const currentMatch = matches[sit.id] || '';
                return (
                  <div
                    key={sit.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">
                        Scenario {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                        {sit.text}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                        Select Matching Algebraic Inequality:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.inequalities.map((ineq) => (
                          <button
                            key={ineq.id}
                            type="button"
                            disabled={isCurrentCompleted}
                            onClick={() => handleSetMatch(sit.id, ineq.id)}
                            className={`p-2.5 rounded-lg border text-left font-mono text-xs sm:text-sm transition-all ${
                              currentMatch === ineq.id
                                ? 'bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {ineq.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // =======================================================
      // Q10: Gridded Response / Decimal Entry
      // =======================================================
      case 'gridded-response': {
        const q = currentQ as Q10GriddedResponseEquations;
        const val = currentAnswer.value || '';

        const appendChar = (char: string) => {
          if (isCurrentCompleted) return;
          if (char === 'C') {
            setAnswerForCurrent({ value: '' });
          } else if (char === '⌫') {
            setAnswerForCurrent({ value: val.slice(0, -1) });
          } else {
            setAnswerForCurrent({ value: val + char });
          }
        };

        return (
          <div className="space-y-6" id="q10-gridded-response-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Decimal Model
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.equation}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs max-w-sm mx-auto space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  STAAR Gridded Response Entry
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={val}
                    disabled={isCurrentCompleted}
                    onChange={(e) => setAnswerForCurrent({ value: e.target.value })}
                    placeholder="Enter miles"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl font-mono text-2xl font-bold text-center text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-sm font-semibold text-slate-600 shrink-0">{q.unit}</span>
                </div>
              </div>

              {/* On-screen Gridded Keypad */}
              {!isCurrentCompleted && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => appendChar(k)}
                      className="py-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-mono font-bold text-lg text-slate-800 transition-colors active:scale-95"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }

      // =======================================================
      // Q11: Multi-Part Real-World Modeling
      // =======================================================
      case 'multi-part': {
        const q = currentQ as Q11MultiPartEquations;
        const partA = currentAnswer.partA || '';
        const partB = currentAnswer.partB || '';
        const partC = currentAnswer.partC || '';

        return (
          <div className="space-y-6" id="q11-multi-part-container">
            <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 text-xs sm:text-sm text-cyan-900 font-medium whitespace-pre-line leading-relaxed">
              {q.context}
            </div>

            <div className="space-y-4">
              {/* Part A */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part A: Equation
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partAPrompt}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.partAOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ partA: opt.id })}
                      className={`p-2.5 rounded-lg border text-left font-mono text-xs sm:text-sm transition-all ${
                        partA === opt.id
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part B */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part B: Breakeven Calculation
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partBPrompt}
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <span className="font-mono font-bold text-sm text-slate-600">s =</span>
                  <input
                    type="text"
                    value={partB}
                    disabled={isCurrentCompleted}
                    onChange={(e) => setAnswerForCurrent({ partB: e.target.value })}
                    placeholder="e.g. 30"
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs font-semibold text-slate-600">students</span>
                </div>
              </div>

              {/* Part C */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  Part C: Budgeting Decision
                </span>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                  {q.partCPrompt}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.partCOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ partC: opt.id })}
                      className={`p-2.5 rounded-lg border text-center text-xs sm:text-sm transition-all ${
                        partC === opt.id
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold ring-2 ring-cyan-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      // =======================================================
      // Q12: Synthesis Challenge
      // =======================================================
      case 'synthesis-challenge': {
        const q = currentQ as Q12SynthesisChallengeEquations;
        const symbol = currentAnswer.symbol || '';
        const boundary = currentAnswer.boundary || '';
        const selectedValues: string[] = currentAnswer.selectedValues || [];

        const toggleValue = (id: string) => {
          if (isCurrentCompleted) return;
          const next = selectedValues.includes(id)
            ? selectedValues.filter((v) => v !== id)
            : [...selectedValues, id];
          setAnswerForCurrent({ selectedValues: next });
        };

        return (
          <div className="space-y-6" id="q12-synthesis-challenge-container">
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Multi-Step Rational Inequality
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
                {q.givenInequality}
              </span>
            </div>

            {/* Step 1: Symbol & Boundary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                Step 1: Express Solution Set
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono font-bold text-xl text-slate-700">x</span>
                {/* Symbol options */}
                <div className="flex gap-1.5">
                  {q.symbolOptions.map((sym) => (
                    <button
                      key={sym}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => setAnswerForCurrent({ symbol: sym })}
                      className={`w-10 h-10 rounded-lg border font-mono font-bold text-lg transition-all ${
                        symbol === sym
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
                {/* Boundary Input */}
                <input
                  type="text"
                  value={boundary}
                  disabled={isCurrentCompleted}
                  onChange={(e) => setAnswerForCurrent({ boundary: e.target.value })}
                  placeholder="boundary"
                  className="w-28 px-3 py-2 border-2 border-slate-300 rounded-lg font-mono font-bold text-lg text-slate-900 text-center focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Step 2: Value Membership */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                Step 2: Select All Values Contained in This Solution Set
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {q.membershipValues.map((m) => {
                  const isChecked = selectedValues.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      disabled={isCurrentCompleted}
                      onClick={() => toggleValue(m.id)}
                      className={`p-3 rounded-xl border text-center font-mono font-bold text-base transition-all ${
                        isChecked
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-950 ring-2 ring-cyan-500/20 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {m.val}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // =======================================================
  // Results / Summary Screen
  // =======================================================
  if (resultsView) {
    return (
      <div className="space-y-6 animate-fadeIn" id="simulator-results-view">
        {/* Results Banner */}
        <div className="bg-linear-to-r from-slate-900 via-cyan-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Digital STAAR Simulator Summary
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Unit 6: Equations & Inequalities
              </h2>
              <p className="text-slate-300 text-sm max-w-xl">
                Review your digital technology-enhanced performance across all 12 items aligned to TEKS 8.8A, 8.8B, and 8.8C.
              </p>
            </div>

            {/* Score Ring */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-5 text-center min-w-[160px]">
              <div className="text-4xl sm:text-5xl font-black text-cyan-400 font-mono">
                {completedCount}/12
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-bold mt-1">
                {isAllCompleted ? 'Mastery Achieved' : 'Questions Mastered'}
              </div>
            </div>
          </div>
        </div>

        {/* Question Review Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-600" />
            Item-by-Item Review
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {UNIT_6_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
              const done = !!completedQuestions[idx];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setResultsView(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    done
                      ? 'bg-emerald-50/70 border-emerald-300 hover:bg-emerald-100/70'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-500 block">
                      Question {idx + 1} · {q.teks}
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate block">
                      {q.typeLabel}
                    </span>
                  </div>
                  {done ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 shrink-0">Review</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setCurrentIndex(0);
              setResultsView(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Questions
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetSimulator}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Simulator
            </button>
            {onSwitchPathway && (
              <button
                type="button"
                onClick={() => onSwitchPathway('staar')}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold transition-colors flex items-center gap-2 shadow-xs"
              >
                Go to STAAR Practice
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // Main Simulator Assessment View
  // =======================================================
  return (
    <div className="space-y-6" id="digital-staar-simulator-main">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                STAAR GRADE 8 MATHEMATICS
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-700 text-cyan-200 font-bold">
                Digital TEKS Simulator
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Unit 6: {topicTitle}
            </h2>
          </div>
        </div>

        {/* Header Tools */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowFormulaSheet(true)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            Reference Chart
          </button>
          <button
            type="button"
            onClick={() => setResultsView(true)}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            Summary ({completedCount}/12)
          </button>
        </div>
      </div>

      {/* Question Dots Navigation */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {UNIT_6_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
            const isDone = !!completedQuestions[idx];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setQ2SelectedTile(null);
                  setQ6SelectedCard(null);
                  setCurrentIndex(idx);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'bg-cyan-600 text-white ring-2 ring-cyan-500/30 shadow-xs'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-semibold text-slate-500 shrink-0 font-mono">
          Question {currentIndex + 1} of 12
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Question Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-900 text-xs font-bold">
              {currentQ.teks}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              {currentQ.typeLabel}
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Topic: <span className="text-slate-800">{currentQ.topic}</span>
          </div>
        </div>

        {/* Prompt */}
        <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          {currentQ.prompt}
        </div>

        {/* Interactive Question Body */}
        {renderQuestionBody()}

        {/* Feedback Section */}
        {isCurrentAttempted && (
          <div className="pt-2 animate-fadeIn">
            {isCurrentCompleted ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Correct Response!
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {currentQ.solutionExplanation}
                </p>
                <div className="pt-2 border-t border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Key Takeaway: {currentQ.keyTakeaway}</span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Not Quite Yet — Review & Try Again
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {currentQ.instructionalHint ||
                    'Review your algebraic steps, verify sign rules and inverse operations, and revise your response.'}
                </p>
                <span className="text-xs text-amber-800 font-bold block pt-1">
                  Adjust your inputs above and click &ldquo;Re-check Response&rdquo; to test again.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2.5">
            {!isCurrentCompleted ? (
              <button
                type="button"
                onClick={handleSubmitCurrent}
                disabled={!isAnswerProvided()}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xs ${
                  isAnswerProvided()
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCurrentAttempted ? 'Re-check Response' : 'Submit Response'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2"
              >
                {currentIndex === 11 ? 'View Simulator Summary' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reference Chart Modal */}
      {showFormulaSheet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-600" />
                Grade 8 STAAR Reference Chart: Equations & Inequalities
              </h3>
              <button
                type="button"
                onClick={() => setShowFormulaSheet(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Inverse Operations</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Addition (+) is the inverse of Subtraction (-)</li>
                  <li>Multiplication (×) is the inverse of Division (÷)</li>
                  <li>Apply inverse operations equally to both sides to preserve balance.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Inequality Sign Reversal Rule</strong>
                <p className="text-xs">
                  When you <strong>multiply or divide both sides by a negative number</strong>, the inequality symbol must reverse:
                  <br />
                  &lt; becomes &gt;, and ≤ becomes ≥.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Number Line Conventions</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li><strong>Open Circle (○):</strong> Strict inequalities (&lt; or &gt;), boundary is NOT included.</li>
                  <li><strong>Closed Circle (●):</strong> Inclusive inequalities (≤ or ≥), boundary IS included.</li>
                  <li><strong>Ray to Left:</strong> Values less than boundary (&lt; or ≤).</li>
                  <li><strong>Ray to Right:</strong> Values greater than boundary (&gt; or ≥).</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Clearing Fractions (LCM)</strong>
                <p className="text-xs">
                  To eliminate fractions in an equation, find the Least Common Denominator (LCD) of all fraction denominators and multiply EVERY term on both sides by the LCD.
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowFormulaSheet(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                Close Reference Chart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
