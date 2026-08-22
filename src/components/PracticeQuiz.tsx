import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Layers,
  TrendingUp,
  Sliders,
  Table as TableIcon,
} from 'lucide-react';
import { PracticeQuestion, PracticeQuestionBanks } from '../types';

interface PracticeQuizProps {
  topicId?: string;
  questions: PracticeQuestion[];
  quizBanks?: PracticeQuestionBanks;
  topicTitle: string;
}

export type PracticeMode = 'proportional' | 'nonProportional' | 'mixed';

/**
 * Randomizes questions from the appropriate bank.
 * - If bank > 6, selects 6 unique questions.
 * - Avoids repeating the exact previous 6-question set.
 * - In mixed mode, selects a balanced 3 proportional + 3 non-proportional split.
 * - Shuffles answer options while accurately re-mapping correctIndex.
 */
function generateQuizQuestions(
  pool: PracticeQuestion[],
  count: number = 6,
  previousIds: string[] = [],
  mode?: PracticeMode,
  banks?: PracticeQuestionBanks
): PracticeQuestion[] {
  // If dedicated banks are present (Topic 2: Proportional Relationships)
  if (banks && banks.proportional && banks.nonProportional) {
    const propBank = banks.proportional;
    const nonPropBank = banks.nonProportional;

    let selected: PracticeQuestion[] = [];
    let attempts = 0;

    do {
      if (mode === 'proportional') {
        const shuffled = [...propBank].sort(() => Math.random() - 0.5);
        selected = shuffled.slice(0, Math.min(count, shuffled.length));
      } else if (mode === 'nonProportional') {
        const shuffled = [...nonPropBank].sort(() => Math.random() - 0.5);
        selected = shuffled.slice(0, Math.min(count, shuffled.length));
      } else {
        // Mixed Review: 3 Proportional + 3 Non-Proportional
        const propCount = Math.floor(count / 2);
        const nonPropCount = count - propCount;

        const shuffledProp = [...propBank].sort(() => Math.random() - 0.5);
        const shuffledNonProp = [...nonPropBank].sort(() => Math.random() - 0.5);

        const pickedProp = shuffledProp.slice(0, propCount);
        const pickedNonProp = shuffledNonProp.slice(0, nonPropCount);

        selected = [...pickedProp, ...pickedNonProp].sort(() => Math.random() - 0.5);
      }

      attempts++;
      const currentIdSet = new Set(selected.map((q) => q.id));
      const isSameAsPrevious =
        previousIds.length === selected.length &&
        previousIds.every((id) => currentIdSet.has(id));

      if (!isSameAsPrevious || attempts >= 25) break;
    } while (attempts < 25);

    // Shuffle presentation order
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

  // Fallback for Topic 1 (Geometric Transformations) or single-pool questions
  if (pool.length <= count) {
    return pool.map((q) => ({ ...q }));
  }

  // Identify core transformation categories for a balanced Grade 8 mix
  const translations = pool.filter((q) => ['t-q3', 't-q9', 't-q14'].includes(q.id));
  const reflections = pool.filter((q) => ['t-q2', 't-q6', 't-q16', 't-q17'].includes(q.id));
  const rotations = pool.filter((q) => ['t-q5', 't-q7', 't-q11'].includes(q.id));
  const dilations = pool.filter((q) => ['t-q4', 't-q8', 't-q12', 't-q15', 't-q18'].includes(q.id));
  const concepts = pool.filter((q) => ['t-q1', 't-q10', 't-q13'].includes(q.id));

  const pickRandom = (arr: PracticeQuestion[]) => arr[Math.floor(Math.random() * arr.length)];

  let selected: PracticeQuestion[] = [];
  let attempts = 0;

  do {
    const pickedSet = new Set<string>();
    const temp: PracticeQuestion[] = [];

    const addFrom = (group: PracticeQuestion[]) => {
      const candidates = group.filter((item) => !pickedSet.has(item.id));
      if (candidates.length > 0) {
        const item = pickRandom(candidates);
        pickedSet.add(item.id);
        temp.push(item);
      }
    };

    // Guarantee 1 question from each key domain
    if (translations.length > 0) addFrom(translations);
    if (reflections.length > 0) addFrom(reflections);
    if (rotations.length > 0) addFrom(rotations);
    if (dilations.length > 0) addFrom(dilations);
    if (concepts.length > 0) addFrom(concepts);

    // Fill remaining slots
    const remainingPool = pool.filter((item) => !pickedSet.has(item.id));
    const shuffledRemaining = [...remainingPool].sort(() => Math.random() - 0.5);
    for (const item of shuffledRemaining) {
      if (temp.length >= count) break;
      temp.push(item);
      pickedSet.add(item.id);
    }

    selected = temp;
    attempts++;

    const currentIdSet = new Set(selected.map((q) => q.id));
    const isSameAsPrevious =
      previousIds.length === count &&
      previousIds.every((id) => currentIdSet.has(id));

    if (!isSameAsPrevious) break;
  } while (attempts < 25);

  const shuffledSelected = [...selected].sort(() => Math.random() - 0.5);

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

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({
  topicId,
  questions,
  quizBanks,
  topicTitle,
}) => {
  const hasMultipleModes = Boolean(
    quizBanks?.proportional && quizBanks?.nonProportional
  );

  const [currentMode, setCurrentMode] = useState<PracticeMode>('proportional');
  const previousIdsRef = useRef<string[]>([]);
  const isDynamic = Boolean(hasMultipleModes || questions.length > 6);
  const targetCount = 6;

  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>(() => {
    const initial = generateQuizQuestions(
      questions,
      targetCount,
      [],
      'proportional',
      quizBanks
    );
    previousIdsRef.current = initial.map((q) => q.id);
    return initial;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(1);

  // Sync state when topic or question bank changes
  useEffect(() => {
    const initial = generateQuizQuestions(
      questions,
      targetCount,
      [],
      currentMode,
      quizBanks
    );
    previousIdsRef.current = initial.map((q) => q.id);
    setActiveQuestions(initial);
    setSelectedAnswers({});
    setShowHints({});
    setSubmitted(false);
    setAttemptCount(1);
  }, [questions, quizBanks]);

  const handleModeChange = (mode: PracticeMode) => {
    if (mode === currentMode && !submitted) return;
    setCurrentMode(mode);
    const newQuestions = generateQuizQuestions(
      questions,
      targetCount,
      [],
      mode,
      quizBanks
    );
    previousIdsRef.current = newQuestions.map((q) => q.id);
    setActiveQuestions(newQuestions);
    setSelectedAnswers({});
    setShowHints({});
    setSubmitted(false);
    setAttemptCount(1);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleHint = (questionId: string) => {
    setShowHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleReset = () => {
    const nextQuestions = generateQuizQuestions(
      questions,
      targetCount,
      previousIdsRef.current,
      currentMode,
      quizBanks
    );
    previousIdsRef.current = nextQuestions.map((q) => q.id);
    setActiveQuestions(nextQuestions);
    setSelectedAnswers({});
    setShowHints({});
    setSubmitted(false);
    setAttemptCount((prev) => prev + 1);

    // Smoothly scroll back to top of quiz container
    const quizEl = document.getElementById('self-check-quiz-container');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = activeQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const progressPercentage = Math.round(
    (answeredCount / Math.max(activeQuestions.length, 1)) * 100
  );

  return (
    <div
      id="self-check-quiz-container"
      className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-5 sm:p-8"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200/60 shadow-2xs">
              In-Portal Self-Check
            </span>
            {isDynamic && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Randomized Practice Set {attemptCount > 1 ? `• Attempt #${attemptCount}` : ''}
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Quick Check: {topicTitle}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-medium">
            {hasMultipleModes
              ? 'Select your practice mode below to test proportional, non-proportional, or mixed concepts. Each attempt selects 6 unique questions!'
              : 'Complete this 6-question check selected randomly from the question bank. Every retry generates a new practice attempt!'}
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-200 px-4 py-3 rounded-2xl shadow-2xs">
            <Award className="w-7 h-7 text-amber-500 shrink-0" />
            <div>
              <div className="text-[11px] text-blue-800 font-extrabold uppercase tracking-wider">Your Score</div>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {correctCount} / {activeQuestions.length} Correct (
                {Math.round((correctCount / activeQuestions.length) * 100)}%)
              </div>
            </div>
            <button
              onClick={handleReset}
              className="ml-2 p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 border border-slate-200 shadow-2xs transition-all cursor-pointer"
              title="Practice Again with New Questions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Questions
            </button>
          </div>
        ) : (
          <div className="min-w-44 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Progress:</span>
              <span className="text-blue-600 font-extrabold">
                {answeredCount} of {activeQuestions.length} Answered
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* TOPIC 2 MODE SELECTOR TABS */}
      {hasMultipleModes && (
        <div className="mt-6 pt-2">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            <span>Select Practice Mode:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Mode 1: Proportional Relationships */}
            <button
              id="mode-proportional-btn"
              onClick={() => handleModeChange('proportional')}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'proportional'
                  ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
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
                  18 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Direct variation <code className="font-mono text-blue-800 font-bold">y = kx</code>, origin <code className="font-mono font-bold">(0,0)</code>, constant ratios, & unit rates
              </p>
            </button>

            {/* Mode 2: Non-Proportional Relationships */}
            <button
              id="mode-nonproportional-btn"
              onClick={() => handleModeChange('nonProportional')}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'nonProportional'
                  ? 'bg-purple-50/90 border-purple-600 text-purple-950 shadow-sm ring-2 ring-purple-500/20'
                  : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
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
                  18 Bank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Linear <code className="font-mono text-purple-800 font-bold">y = mx + b</code> (b ≠ 0), base fees, unequal ratios, & shifted graphs
              </p>
            </button>

            {/* Mode 3: Mixed Review */}
            <button
              id="mode-mixed-btn"
              onClick={() => handleModeChange('mixed')}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentMode === 'mixed'
                  ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
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
                  Balanced 50/50
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Comprehensive challenge: 3 proportional + 3 non-proportional questions mixed together
              </p>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION LIST */}
      <div className="space-y-6 mt-6">
        {activeQuestions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const selectedOpt = selectedAnswers[q.id];
          const isCorrect = selectedOpt === q.correctIndex;

          // Determine layout: if any option text is long (> 24 chars), use 1 column to avoid cramped text
          const hasLongOptions = q.options.some((opt) => opt.length > 24);

          return (
            <div
              key={`${q.id}-${qIndex}`}
              id={`quiz-question-${q.id}`}
              className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    : 'bg-rose-50/80 border-rose-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Question Header & Prompt */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-slate-900 text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                    {qIndex + 1}
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm sm:text-base font-black text-slate-900 leading-relaxed">
                      {q.question}
                    </p>
                    {q.context && (
                      <p className="text-xs text-blue-900 font-mono bg-blue-50/90 px-3 py-1.5 rounded-xl border border-blue-200 inline-block font-semibold">
                        {q.context}
                      </p>
                    )}
                  </div>
                </div>

                {!submitted && (
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="shrink-0 text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200/80 hover:bg-blue-100 transition-colors shadow-2xs cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    {showHints[q.id] ? 'Hide Hint' : 'Need a Hint?'}
                  </button>
                )}
              </div>

              {/* RENDER VISUAL DATA TABLE IF PRESENT */}
              {q.tableData && (
                <div className="mt-3.5 mb-2 ml-0 sm:ml-10 overflow-x-auto">
                  <div className="inline-block min-w-full sm:min-w-0 border-2 border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
                    <table className="min-w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-900 border-b border-slate-200">
                          {q.tableData.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              className="px-4 py-2.5 text-left font-black tracking-tight border-r border-slate-200 last:border-r-0 whitespace-nowrap"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {q.tableData.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={`border-b border-slate-200 last:border-b-0 ${
                              rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                            }`}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-4 py-2 font-mono font-bold text-slate-800 border-r border-slate-200 last:border-r-0 whitespace-nowrap"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Teacher Hint Box */}
              {showHints[q.id] && !submitted && (
                <div className="mt-3.5 ml-0 sm:ml-10 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed font-medium">
                  💡 <strong className="font-bold">Teacher Hint:</strong> {q.hint}
                </div>
              )}

              {/* Options Grid (Single-column for long text, 2-column for short text) */}
              <div
                className={`grid gap-3 mt-4 ml-0 sm:ml-10 ${
                  hasLongOptions ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOpt === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let buttonStyles =
                    'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300 cursor-pointer';

                  if (submitted) {
                    if (isThisCorrect) {
                      buttonStyles =
                        'bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-md shadow-emerald-500/20';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyles = 'bg-rose-600 border-rose-600 text-white font-extrabold';
                    } else {
                      buttonStyles = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    buttonStyles =
                      'bg-blue-600 border-blue-600 text-white font-extrabold shadow-md shadow-blue-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left p-3.5 rounded-xl text-xs sm:text-sm border-2 transition-all flex items-center justify-between gap-2.5 min-h-[48px] ${buttonStyles}`}
                    >
                      <div className="flex items-start sm:items-center gap-2.5 w-full">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isThisSelected || (submitted && isThisCorrect)
                              ? 'bg-white/25 text-inherit'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-semibold leading-snug break-words">
                          {option}
                        </span>
                      </div>
                      {submitted && isThisCorrect && (
                        <CheckCircle className="w-4 h-4 text-white shrink-0 ml-2" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation upon submit */}
              {submitted && (
                <div
                  className={`mt-4 ml-0 sm:ml-10 p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
                    isCorrect
                      ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                      : 'bg-rose-100/90 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="font-black flex items-center gap-1.5 mb-1 text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>Great Job! That is Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>Review the Solution:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Reset Actions */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 font-medium">
          {submitted
            ? 'Review your results above, or click Practice Again to generate a new randomized set of 6 questions!'
            : `Answer all ${activeQuestions.length} questions and click Check Answers to see explanations.`}
        </p>

        {!submitted ? (
          <button
            id="submit-quiz-button"
            disabled={answeredCount < activeQuestions.length}
            onClick={() => setSubmitted(true)}
            className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm transition-all shadow-md ${
              answeredCount === activeQuestions.length
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/25 hover:scale-[1.02] active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Check Answers ({answeredCount}/{activeQuestions.length})
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again (New 6 Questions)
          </button>
        )}
      </div>
    </div>
  );
};
