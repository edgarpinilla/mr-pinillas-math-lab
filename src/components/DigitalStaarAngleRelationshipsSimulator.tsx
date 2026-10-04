// src/components/DigitalStaarAngleRelationshipsSimulator.tsx
// Unit 7 Digital STAAR Simulator — 12 Original Technology-Enhanced Geometry Items (TEKS 8.8D)

import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Check,
} from 'lucide-react';
import {
  UNIT_7_DIGITAL_STAAR_QUESTIONS,
  Unit7DigitalStaarQuestion,
} from '../data/staar/digitalStaarAngleRelationshipsData';
import { Unit7DigitalStaarDiagram } from './visualizers/Unit7DigitalStaarDiagrams';

interface DigitalStaarAngleRelationshipsSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

function parseNumericValue(raw: string): number | null {
  const cleaned = raw.replace(/°/g, '').replace(/\s+/g, '');
  if (!cleaned) return null;
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : null;
}

export const DigitalStaarAngleRelationshipsSimulator: React.FC<
  DigitalStaarAngleRelationshipsSimulatorProps
> = ({ onSwitchPathway }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 0..11
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showCompleteScreen, setShowCompleteScreen] = useState<boolean>(false);

  const [feedbackState, setFeedbackState] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [attemptCount, setAttemptCount] = useState<number>(0);

  // Q1 Hot Spot state
  const [q1SelectedAngle, setQ1SelectedAngle] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null>(null);

  // Q2 Inline Choice state
  const [q2Drop1, setQ2Drop1] = useState<string>('');
  const [q2Drop2, setQ2Drop2] = useState<string>('');
  const [q2Drop3, setQ2Drop3] = useState<string>('');

  // Q3 Numeric / Equation Entry state
  const [q3Rel, setQ3Rel] = useState<string>('');
  const [q3Eq, setQ3Eq] = useState<string>('');
  const [q3X, setQ3X] = useState<string>('');
  const [q3Angle, setQ3Angle] = useState<string>('');

  // Q4 Drag & Drop Classification state
  const [q4Placements, setQ4Placements] = useState<Record<string, string>>({}); // cardId -> categoryId
  const [q4ActiveCardId, setQ4ActiveCardId] = useState<string | null>(null);

  // Q5 Multi-Select state
  const [q5SelectedIds, setQ5SelectedIds] = useState<string[]>([]);

  // Q6 Numeric Entry (Triangle Sum) state
  const [q6X, setQ6X] = useState<string>('');
  const [q6AngleA, setQ6AngleA] = useState<string>('');
  const [q6Largest, setQ6Largest] = useState<string>('');

  // Q7 Exterior Angle Equation / Numeric state
  const [q7Eq, setQ7Eq] = useState<string>('');
  const [q7X, setQ7X] = useState<string>('');
  const [q7ExtMeasure, setQ7ExtMeasure] = useState<string>('');
  const [q7AdjMeasure, setQ7AdjMeasure] = useState<string>('');

  // Q8 Match / Table Grid state
  const [q8GridSelections, setQ8GridSelections] = useState<Record<string, string>>({}); // rowId -> colId

  // Q9 Drag & Drop Matching (Similar Triangles) state
  const [q9Matches, setQ9Matches] = useState<Record<string, string>>({}); // targetId -> tileId
  const [q9ActiveTileId, setQ9ActiveTileId] = useState<string | null>(null);

  // Q10 Multi-Select (AA Similarity) state
  const [q10SelectedIds, setQ10SelectedIds] = useState<string[]>([]);

  // Q11 Inline Choice + Numeric Entry (AA Similarity) state
  const [q11Part1, setQ11Part1] = useState<string>('');
  const [q11X, setQ11X] = useState<string>('');
  const [q11AngleB, setQ11AngleB] = useState<string>('');
  const [q11AngleF, setQ11AngleF] = useState<string>('');
  const [q11Part4, setQ11Part4] = useState<string>('');

  // Q12 Integrated Synthesis Challenge state
  const [q12HotSpotId, setQ12HotSpotId] = useState<
    'angle-D' | 'angle-E' | 'angle-AEB' | 'angle-DEC' | null
  >(null);
  const [q12Part2Reason, setQ12Part2Reason] = useState<string>('');
  const [q12MeasureD, setQ12MeasureD] = useState<string>('');
  const [q12MeasureDEC, setQ12MeasureDEC] = useState<string>('');
  const [q12Part4Conclusion, setQ12Part4Conclusion] = useState<string>('');

  const currentQuestion: Unit7DigitalStaarQuestion =
    UNIT_7_DIGITAL_STAAR_QUESTIONS[currentIndex] || UNIT_7_DIGITAL_STAAR_QUESTIONS[0];

  const clearFeedbackOnEdit = () => {
    if (feedbackState === 'hint') {
      setFeedbackState('idle');
    }
  };

  // Validate current question
  const isCurrentResponseCorrect = (q: Unit7DigitalStaarQuestion): boolean => {
    switch (q.kind) {
      case 'q1-hotspot':
        return q1SelectedAngle === q.correctTargetAngle;

      case 'q2-inline-choice':
        return (
          q2Drop1 === q.correctDropdown1 &&
          q2Drop2 === q.correctDropdown2 &&
          q2Drop3 === q.correctDropdown3
        );

      case 'q3-numeric-equation':
        return (
          q3Rel === q.correctRelationship &&
          q3Eq === q.correctEquation &&
          parseNumericValue(q3X) === q.correctX &&
          parseNumericValue(q3Angle) === q.correctAngleMeasure
        );

      case 'q4-drag-drop-classification':
        return q.cards.every((c) => q4Placements[c.id] === c.correctCategoryId);

      case 'q5-multi-select': {
        const correctIds = q.statements.filter((s) => s.isCorrect).map((s) => s.id);
        return (
          q5SelectedIds.length === correctIds.length &&
          correctIds.every((id) => q5SelectedIds.includes(id))
        );
      }

      case 'q6-numeric-triangle-sum':
        return (
          parseNumericValue(q6X) === q.correctX &&
          parseNumericValue(q6AngleA) === q.correctAngleA &&
          parseNumericValue(q6Largest) === q.correctLargestAngle
        );

      case 'q7-exterior-equation':
        return (
          q7Eq === q.correctEquation &&
          parseNumericValue(q7X) === q.correctX &&
          parseNumericValue(q7ExtMeasure) === q.correctExteriorMeasure &&
          parseNumericValue(q7AdjMeasure) === q.correctAdjacentInteriorMeasure
        );

      case 'q8-match-table-grid':
        return q.rows.every((r) => q8GridSelections[r.id] === r.correctColumnId);

      case 'q9-drag-drop-matching':
        return q.targets.every((t) => q9Matches[t.id] === t.correctTileId);

      case 'q10-multi-select-aa': {
        const correctIds = q.statements.filter((s) => s.isCorrect).map((s) => s.id);
        return (
          q10SelectedIds.length === correctIds.length &&
          correctIds.every((id) => q10SelectedIds.includes(id))
        );
      }

      case 'q11-inline-numeric-aa':
        return (
          q11Part1 === q.correctPart1 &&
          parseNumericValue(q11X) === q.correctX &&
          parseNumericValue(q11AngleB) === q.correctAngleB &&
          parseNumericValue(q11AngleF) === q.correctAngleF &&
          q11Part4 === q.correctPart4
        );

      case 'q12-integrated-challenge':
        return (
          q12HotSpotId === q.correctHotspotAngleId &&
          q12Part2Reason === q.correctPart2Dropdown &&
          parseNumericValue(q12MeasureD) === q.correctAngleMeasureD &&
          parseNumericValue(q12MeasureDEC) === q.correctAngleMeasureDEC &&
          q12Part4Conclusion === q.correctPart4Conclusion
        );
    }
  };

  const handleCheckAnswer = () => {
    setAttemptCount((c) => c + 1);
    const isCorrect = isCurrentResponseCorrect(currentQuestion);

    if (isCorrect) {
      setFeedbackState('correct');
      const nextCompleted = completedIds.includes(currentQuestion.id)
        ? completedIds
        : [...completedIds, currentQuestion.id];
      setCompletedIds(nextCompleted);
    } else {
      setFeedbackState('hint');
    }
  };

  const handleNextQuestion = () => {
    setFeedbackState('idle');
    if (currentIndex < UNIT_7_DIGITAL_STAAR_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (completedIds.length === UNIT_7_DIGITAL_STAAR_QUESTIONS.length) {
      setShowCompleteScreen(true);
    } else {
      // Jump to first uncompleted question if any remain
      const firstIncompleteIdx = UNIT_7_DIGITAL_STAAR_QUESTIONS.findIndex(
        (q) => !completedIds.includes(q.id)
      );
      if (firstIncompleteIdx !== -1) {
        setCurrentIndex(firstIncompleteIdx);
      } else {
        setShowCompleteScreen(true);
      }
    }
  };

  const handleResetFullCycle = () => {
    setCurrentIndex(0);
    setCompletedIds([]);
    setShowCompleteScreen(false);
    setFeedbackState('idle');
    setQ1SelectedAngle(null);
    setQ2Drop1('');
    setQ2Drop2('');
    setQ2Drop3('');
    setQ3Rel('');
    setQ3Eq('');
    setQ3X('');
    setQ3Angle('');
    setQ4Placements({});
    setQ4ActiveCardId(null);
    setQ5SelectedIds([]);
    setQ6X('');
    setQ6AngleA('');
    setQ6Largest('');
    setQ7Eq('');
    setQ7X('');
    setQ7ExtMeasure('');
    setQ7AdjMeasure('');
    setQ8GridSelections({});
    setQ9Matches({});
    setQ9ActiveTileId(null);
    setQ10SelectedIds([]);
    setQ11Part1('');
    setQ11X('');
    setQ11AngleB('');
    setQ11AngleF('');
    setQ11Part4('');
    setQ12HotSpotId(null);
    setQ12Part2Reason('');
    setQ12MeasureD('');
    setQ12MeasureDEC('');
    setQ12Part4Conclusion('');
  };

  return (
    <div
      id="unit7-digital-staar-simulator-container"
      className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-fadeIn"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-950 text-white p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-black uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5 text-cyan-300" />
                <span>Unit 7 Digital STAAR Simulator · TEKS 8.8D</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-black">
                {completedIds.length} / 12 Completed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Digital STAAR Simulator: Angle Relationships in Parallel Lines & Triangles
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 font-medium">
              12 Original Technology-Enhanced Geometry Items · Lesson 7.1 (Q1–Q4), Lesson 7.2
              (Q5–Q8), and Lesson 7.3 (Q9–Q12)
            </p>
          </div>

          {/* Question Navigator Pills 1..12 */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-2xl border border-white/15 shrink-0">
            {UNIT_7_DIGITAL_STAAR_QUESTIONS.map((q, idx) => {
              const isMastered = completedIds.includes(q.id);
              const isCurrent = idx === currentIndex && !showCompleteScreen;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setShowCompleteScreen(false);
                    setCurrentIndex(idx);
                    setFeedbackState(completedIds.includes(q.id) ? 'correct' : 'idle');
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-400 text-slate-950 shadow-xs scale-105'
                      : isMastered
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="p-5 sm:p-8 space-y-6">
        {showCompleteScreen ? (
          /* 12 / 12 COMPLETION SCREEN */
          <div className="p-6 sm:p-9 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-200 text-emerald-900">
                12 / 12 Technology-Enhanced Questions Mastered
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                UNIT 7 DIGITAL STAAR SIMULATOR COMPLETE
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                You have mastered all 12 technology-enhanced geometry items across Parallel Lines Cut
                by a Transversal (7.1), Triangle Angle Theorems (7.2), and Angle-Angle Similarity
                (7.3).
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFullCycle}
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New 12-Question Cycle</span>
              </button>
              {onSwitchPathway && (
                <button
                  type="button"
                  onClick={() => onSwitchPathway('self-check')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Return to Self-Check
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-6">
            {/* Progress & Lesson Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-cyan-700 text-white text-xs font-black">
                  Question {currentQuestion.questionNumber} of 12
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black">
                  {completedIds.length} / 12 Completed
                </span>
                <span className="px-3 py-1 rounded-xl bg-cyan-50 text-cyan-950 border border-cyan-200 text-xs font-bold">
                  {currentQuestion.lesson} · {currentQuestion.lessonTopic}
                </span>
              </div>

              {completedIds.includes(currentQuestion.id) && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mastered</span>
                </span>
              )}
            </div>

            {/* Two-Column Assessment Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Coherent Geometry Diagram */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 text-cyan-800 font-black uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" /> Geometry Figure
                    </span>
                    <span className="text-slate-500">
                      Question {currentQuestion.questionNumber} of 12 · {currentQuestion.teks}
                    </span>
                  </div>

                  <Unit7DigitalStaarDiagram
                    question={currentQuestion}
                    selectedHotSpotAngle={q1SelectedAngle}
                    onSelectHotSpotAngle={(angleNum) => {
                      setQ1SelectedAngle(angleNum);
                      clearFeedbackOnEdit();
                    }}
                    selectedQ12AngleId={q12HotSpotId}
                    onSelectQ12Angle={(angleId) => {
                      setQ12HotSpotId(angleId);
                      clearFeedbackOnEdit();
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Prompt, Interactive Digital Controls & Feedback */}
              <div className="lg:col-span-6 space-y-4">
                {/* Prompt Card */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    <span>
                      {currentQuestion.lesson} · {currentQuestion.teks}
                    </span>
                    <span>Question {currentQuestion.questionNumber} of 12</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                    {currentQuestion.prompt}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-amber-300 pt-1">
                    {currentQuestion.instruction}
                  </p>
                </div>

                {/* INTERACTIVE RESPONSE CONTROLS BY QUESTION */}
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-5 shadow-2xs">
                  {/* Q1: HOT SPOT */}
                  {currentQuestion.kind === 'q1-hotspot' && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-slate-700">
                          Selected Angle on Diagram:
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-black">
                          {q1SelectedAngle ? `∠${q1SelectedAngle}` : 'Tap an angle on the diagram'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {([1, 2, 4, 5, 6, 7, 8] as const).map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              setQ1SelectedAngle(num);
                              clearFeedbackOnEdit();
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                              q1SelectedAngle === num
                                ? 'bg-indigo-600 text-white border-indigo-700'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            ∠{num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q2: INLINE CHOICE */}
                  {currentQuestion.kind === 'q2-inline-choice' && (
                    <div className="space-y-4 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span>The two marked angles ∠4 and ∠6 are</span>
                          <select
                            value={q2Drop1}
                            onChange={(e) => {
                              setQ2Drop1(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            className="px-3 py-1.5 rounded-lg border-2 border-indigo-300 bg-white text-slate-900 font-bold focus:border-indigo-600 focus:outline-none"
                          >
                            <option value="">Choose...</option>
                            {currentQuestion.dropdown1Options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <span>.</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span>Therefore, their measures are</span>
                          <select
                            value={q2Drop2}
                            onChange={(e) => {
                              setQ2Drop2(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            className="px-3 py-1.5 rounded-lg border-2 border-indigo-300 bg-white text-slate-900 font-bold focus:border-indigo-600 focus:outline-none"
                          >
                            <option value="">Choose...</option>
                            {currentQuestion.dropdown2Options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <span>, and the measure of ∠6 is</span>
                          <select
                            value={q2Drop3}
                            onChange={(e) => {
                              setQ2Drop3(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            className="px-3 py-1.5 rounded-lg border-2 border-indigo-300 bg-white text-slate-900 font-bold focus:border-indigo-600 focus:outline-none"
                          >
                            <option value="">Choose...</option>
                            {currentQuestion.dropdown3Options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <span>.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Q3: NUMERIC / EQUATION ENTRY */}
                  {currentQuestion.kind === 'q3-numeric-equation' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          1. Angle Relationship between ∠2 and ∠6:
                        </label>
                        <select
                          value={q3Rel}
                          onChange={(e) => {
                            setQ3Rel(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose angle relationship...</option>
                          {currentQuestion.relationshipOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          2. Algebraic Equation:
                        </label>
                        <select
                          value={q3Eq}
                          onChange={(e) => {
                            setQ3Eq(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose equation...</option>
                          {currentQuestion.equationOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            3. Enter the value of x:
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-700">x =</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={q3X}
                              onChange={(e) => {
                                setQ3X(e.target.value);
                                clearFeedbackOnEdit();
                              }}
                              placeholder="Enter x"
                              className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            4. Enter {currentQuestion.requestedAngleLabel}:
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              inputMode="numeric"
                              value={q3Angle}
                              onChange={(e) => {
                                setQ3Angle(e.target.value);
                                clearFeedbackOnEdit();
                              }}
                              placeholder="Degrees"
                              className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                            />
                            <span className="text-sm font-black text-slate-700">°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Q4: DRAG & DROP CLASSIFICATION */}
                  {currentQuestion.kind === 'q4-drag-drop-classification' && (
                    <div className="space-y-4">
                      {/* Available Angle-Pair Cards */}
                      <div className="space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Angle-Pair Cards (Drag or Tap a Card, then Tap a Category):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentQuestion.cards.map((card) => {
                            const assignedCat = q4Placements[card.id];
                            const isSelected = q4ActiveCardId === card.id;
                            return (
                              <button
                                key={card.id}
                                type="button"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', card.id);
                                  setQ4ActiveCardId(card.id);
                                  clearFeedbackOnEdit();
                                }}
                                onClick={() => {
                                  setQ4ActiveCardId(isSelected ? null : card.id);
                                  clearFeedbackOnEdit();
                                }}
                                className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                                    : assignedCat
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                    : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-indigo-400'
                                }`}
                              >
                                {card.label} {assignedCat ? '✓' : ''}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4 Category Drop Zones */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentQuestion.categories.map((cat) => {
                          const placedCard = currentQuestion.cards.find(
                            (c) => q4Placements[c.id] === cat.id
                          );
                          return (
                            <div
                              key={cat.id}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const draggedCardId =
                                  e.dataTransfer.getData('text/plain') || q4ActiveCardId;
                                if (draggedCardId) {
                                  const nextPlacements: Record<string, string> = {};
                                  for (const [k, v] of Object.entries<string>(q4Placements)) {
                                    if (v !== cat.id && k !== draggedCardId) {
                                      nextPlacements[k] = v;
                                    }
                                  }
                                  nextPlacements[draggedCardId] = cat.id;
                                  setQ4Placements(nextPlacements);
                                  setQ4ActiveCardId(null);
                                  clearFeedbackOnEdit();
                                }
                              }}
                              onClick={() => {
                                if (q4ActiveCardId) {
                                  const nextPlacements: Record<string, string> = {};
                                  for (const [k, v] of Object.entries<string>(q4Placements)) {
                                    if (v !== cat.id && k !== q4ActiveCardId) {
                                      nextPlacements[k] = v;
                                    }
                                  }
                                  nextPlacements[q4ActiveCardId] = cat.id;
                                  setQ4Placements(nextPlacements);
                                  setQ4ActiveCardId(null);
                                  clearFeedbackOnEdit();
                                } else if (placedCard) {
                                  // Allow tapping a placed card inside a category to pick it up / move it
                                  setQ4ActiveCardId(placedCard.id);
                                  clearFeedbackOnEdit();
                                }
                              }}
                              className={`p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer space-y-2 ${
                                q4ActiveCardId
                                  ? 'border-indigo-400 bg-indigo-50/40 hover:border-indigo-600'
                                  : 'border-slate-300 bg-slate-50/70 hover:border-indigo-400'
                              }`}
                            >
                              <div className="text-xs font-black text-slate-900">{cat.title}</div>
                              <div className="text-[11px] text-slate-500 font-medium">
                                {cat.subtitle}
                              </div>
                              {placedCard ? (
                                <div
                                  className={`px-3 py-1.5 rounded-lg text-white text-xs font-black inline-flex items-center gap-2 ${
                                    q4ActiveCardId === placedCard.id
                                      ? 'bg-amber-600 ring-2 ring-amber-300'
                                      : 'bg-indigo-600'
                                  }`}
                                >
                                  <span>{placedCard.label}</span>
                                </div>
                              ) : (
                                <div className="text-[11px] font-bold text-indigo-600">
                                  Drop or tap to place pair here
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Q5 & Q10: MULTI-SELECT */}
                  {(currentQuestion.kind === 'q5-multi-select' ||
                    currentQuestion.kind === 'q10-multi-select-aa') && (
                    <div className="space-y-2.5">
                      {currentQuestion.statements.map((stmt) => {
                        const selectedList =
                          currentQuestion.kind === 'q5-multi-select'
                            ? q5SelectedIds
                            : q10SelectedIds;
                        const isChecked = selectedList.includes(stmt.id);

                        return (
                          <button
                            key={stmt.id}
                            type="button"
                            onClick={() => {
                              clearFeedbackOnEdit();
                              if (currentQuestion.kind === 'q5-multi-select') {
                                setQ5SelectedIds((prev) =>
                                  prev.includes(stmt.id)
                                    ? prev.filter((id) => id !== stmt.id)
                                    : [...prev, stmt.id]
                                );
                              } else {
                                setQ10SelectedIds((prev) =>
                                  prev.includes(stmt.id)
                                    ? prev.filter((id) => id !== stmt.id)
                                    : [...prev, stmt.id]
                                );
                              }
                            }}
                            className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-start gap-3 cursor-pointer ${
                              isChecked
                                ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                                : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                isChecked
                                  ? 'bg-white border-white text-indigo-700'
                                  : 'bg-white border-slate-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{stmt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Q6: NUMERIC ENTRY (TRIANGLE SUM THEOREM) */}
                  {currentQuestion.kind === 'q6-numeric-triangle-sum' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          1. Value of x:
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={q6X}
                          onChange={(e) => {
                            setQ6X(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          placeholder="x ="
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          2. Measure of ∠A (°):
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={q6AngleA}
                          onChange={(e) => {
                            setQ6AngleA(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          placeholder="m∠A"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          3. Largest Angle (°):
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={q6Largest}
                          onChange={(e) => {
                            setQ6Largest(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          placeholder="Largest °"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* Q7: EXTERIOR ANGLE THEOREM EQUATION & NUMERIC RESPONSE */}
                  {currentQuestion.kind === 'q7-exterior-equation' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          1. Exterior Angle Theorem Equation (Remote 1 + Remote 2 = Exterior):
                        </label>
                        <select
                          value={q7Eq}
                          onChange={(e) => {
                            setQ7Eq(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose equation...</option>
                          {currentQuestion.equationDropdownOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            2. Value of x:
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q7X}
                            onChange={(e) => {
                              setQ7X(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="x ="
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            3. Exterior m∠PRS (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q7ExtMeasure}
                            onChange={(e) => {
                              setQ7ExtMeasure(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠PRS"
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            4. Adjacent m∠PRQ (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q7AdjMeasure}
                            onChange={(e) => {
                              setQ7AdjMeasure(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠PRQ"
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Q8: MATCH / TABLE GRID */}
                  {currentQuestion.kind === 'q8-match-table-grid' && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b-2 border-slate-200 bg-slate-50">
                            <th className="p-2.5 text-xs font-black text-slate-700">
                              Geometric Situation
                            </th>
                            {currentQuestion.columns.map((col) => (
                              <th
                                key={col.id}
                                className="p-2 text-center text-[11px] font-black text-slate-700"
                              >
                                {col.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {currentQuestion.rows.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/70">
                              <td className="p-2.5 space-y-0.5">
                                <div className="text-xs font-bold text-slate-900">
                                  {row.situation}
                                </div>
                                <div className="text-[11px] font-mono font-bold text-indigo-700">
                                  {row.givenInfo}
                                </div>
                              </td>
                              {currentQuestion.columns.map((col) => {
                                const isSelected = q8GridSelections[row.id] === col.id;
                                return (
                                  <td key={col.id} className="p-2 text-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setQ8GridSelections((prev) => ({
                                          ...prev,
                                          [row.id]: col.id,
                                        }));
                                        clearFeedbackOnEdit();
                                      }}
                                      className={`w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-all cursor-pointer ${
                                        isSelected
                                          ? 'bg-indigo-600 border-indigo-700 text-white'
                                          : 'bg-white border-slate-300 hover:border-indigo-400'
                                      }`}
                                    >
                                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Q9: DRAG & DROP MATCHING (SIMILAR TRIANGLES) */}
                  {currentQuestion.kind === 'q9-drag-drop-matching' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Angles in {currentQuestion.tri2Name} (Drag or Tap a Tile, then Tap its
                          Matching Angle in {currentQuestion.tri1Name}):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentQuestion.draggableTiles.map((tile) => {
                            const isSelected = q9ActiveTileId === tile.id;
                            const isUsed = Object.values(q9Matches).includes(tile.id);
                            return (
                              <button
                                key={tile.id}
                                type="button"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', tile.id);
                                  setQ9ActiveTileId(tile.id);
                                }}
                                onClick={() =>
                                  setQ9ActiveTileId(isSelected ? null : tile.id)
                                }
                                className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white border-indigo-700'
                                    : isUsed
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                    : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-indigo-400'
                                }`}
                              >
                                {tile.label} {isUsed ? '✓' : ''}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {currentQuestion.targets.map((target) => {
                          const matchedTile = currentQuestion.draggableTiles.find(
                            (t) => t.id === q9Matches[target.id]
                          );
                          return (
                            <div
                              key={target.id}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const draggedId =
                                  e.dataTransfer.getData('text/plain') || q9ActiveTileId;
                                if (draggedId) {
                                  setQ9Matches((prev) => {
                                    const cleaned: Record<string, string> = {};
                                    for (const [k, v] of Object.entries<string>(prev)) {
                                      if (v !== draggedId) cleaned[k] = v;
                                    }
                                    cleaned[target.id] = draggedId;
                                    return cleaned;
                                  });
                                  setQ9ActiveTileId(null);
                                  clearFeedbackOnEdit();
                                }
                              }}
                              onClick={() => {
                                if (q9ActiveTileId) {
                                  setQ9Matches((prev) => {
                                    const cleaned: Record<string, string> = {};
                                    for (const [k, v] of Object.entries<string>(prev)) {
                                      if (v !== q9ActiveTileId) cleaned[k] = v;
                                    }
                                    cleaned[target.id] = q9ActiveTileId;
                                    return cleaned;
                                  });
                                  setQ9ActiveTileId(null);
                                  clearFeedbackOnEdit();
                                }
                              }}
                              className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:border-indigo-400"
                            >
                              <div>
                                <div className="text-xs font-black text-slate-900">
                                  {target.tri1AngleLabel}
                                </div>
                                <div className="text-[11px] font-semibold text-slate-500">
                                  {target.tri1GivenMeasure}
                                </div>
                              </div>

                              {matchedTile ? (
                                <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-black">
                                  ≅ {matchedTile.label}
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-indigo-600">
                                  Drop or tap matching angle here
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Q11: INLINE CHOICE + NUMERIC ENTRY (AA SIMILARITY) */}
                  {currentQuestion.kind === 'q11-inline-numeric-aa' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          1. Corresponding Angles ∠B and ∠E are:
                        </label>
                        <select
                          value={q11Part1}
                          onChange={(e) => {
                            setQ11Part1(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose relationship & equation...</option>
                          {currentQuestion.part1Options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            2. Value of x:
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q11X}
                            onChange={(e) => {
                              setQ11X(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="x ="
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            3. Measure m∠B (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q11AngleB}
                            onChange={(e) => {
                              setQ11AngleB(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠B"
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            4. Third Angle m∠F (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q11AngleF}
                            onChange={(e) => {
                              setQ11AngleF(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠F"
                            className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          5. Complete the similarity statement in corresponding vertex order: △ABC ~
                        </label>
                        <select
                          value={q11Part4}
                          onChange={(e) => {
                            setQ11Part4(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose corresponding triangle...</option>
                          {currentQuestion.part4Options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Q12: FINAL INTEGRATED SYNTHESIS CHALLENGE */}
                  {currentQuestion.kind === 'q12-integrated-challenge' && (
                    <div className="space-y-4">
                      {/* Part 1: Click/Select Angle on Diagram */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                          Part 1: Select the angle in △DCE on the diagram (or below) that is
                          alternate interior to ∠BAE (54°):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(
                            [
                              { id: 'angle-D', label: '∠CDE (at vertex D)' },
                              { id: 'angle-E', label: '∠DCE (at vertex C)' },
                              { id: 'angle-AEB', label: '∠AEB' },
                              { id: 'angle-DEC', label: '∠DEC' },
                            ] as const
                          ).map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setQ12HotSpotId(item.id);
                                clearFeedbackOnEdit();
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all cursor-pointer ${
                                q12HotSpotId === item.id
                                  ? 'bg-indigo-600 text-white border-indigo-700'
                                  : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Part 2: Inline Choice Reason */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          Part 2: Geometric Justification for ∠BAE ≅ ∠CDE:
                        </label>
                        <select
                          value={q12Part2Reason}
                          onChange={(e) => {
                            setQ12Part2Reason(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose geometric relationship...</option>
                          {currentQuestion.part2DropdownOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Part 3: Numeric Entries */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            Part 3A: Enter m∠CDE (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q12MeasureD}
                            onChange={(e) => {
                              setQ12MeasureD(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠CDE"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                            Part 3B: Enter m∠DEC (°):
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={q12MeasureDEC}
                            onChange={(e) => {
                              setQ12MeasureDEC(e.target.value);
                              clearFeedbackOnEdit();
                            }}
                            placeholder="m∠DEC"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-sm font-black text-slate-900"
                          />
                        </div>
                      </div>

                      {/* Part 4: Similarity Conclusion */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                          Part 4: Final Similarity Conclusion for △ABE and △DCE:
                        </label>
                        <select
                          value={q12Part4Conclusion}
                          onChange={(e) => {
                            setQ12Part4Conclusion(e.target.value);
                            clearFeedbackOnEdit();
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                        >
                          <option value="">Choose final conclusion...</option>
                          {currentQuestion.part4ConclusionOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      id="unit7-digital-staar-check-btn"
                      onClick={handleCheckAnswer}
                      className="px-5 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Check Response</span>
                    </button>

                    {feedbackState === 'correct' && (
                      <button
                        type="button"
                        id="unit7-digital-staar-next-btn"
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer animate-fadeIn"
                      >
                        <span>
                          {currentIndex < UNIT_7_DIGITAL_STAAR_QUESTIONS.length - 1
                            ? 'Next Question'
                            : 'Finish Digital STAAR Simulator'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Conceptual Hint Banner on Incorrect Attempt (Does NOT reveal correct answer) */}
                {feedbackState === 'hint' && (
                  <div
                    key={`dstaar-hint-${attemptCount}`}
                    className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 animate-fadeIn"
                  >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Conceptual Hint — Revise Your Response & Try Again</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {currentQuestion.hint}
                    </p>
                  </div>
                )}

                {/* Correct Response Banner */}
                {feedbackState === 'correct' && (
                  <div
                    key={`dstaar-correct-${attemptCount}`}
                    className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2.5 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Correct Response</span>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                        Verified ✔
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium whitespace-pre-line">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
