import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Target,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Sliders,
  Layers,
  TrendingUp,
  Table as TableIcon,
  ShieldCheck,
} from 'lucide-react';
import {
  STAAR_TRANSFORMATIONS_QUESTIONS,
  StaarPracticeQuestion,
} from '../data/staar/staarQuestionsTransformations';

interface StaarTransformationsQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

/**
 * Generates 6 unique STAAR-style questions from the bank of 36 questions.
 * - Balances TEKS coverage (TEKS 8.10.C, 8.3.C, 8.10.B).
 * - Ensures no exact duplicate set from the previous run.
 * - Shuffles answer choices while preserving correct answer mapping.
 */
function generateStaarQuestions(
  pool: StaarPracticeQuestion[],
  count: number = 6,
  previousIds: string[] = []
): StaarPracticeQuestion[] {
  if (pool.length <= count) {
    return pool.map((q) => ({ ...q }));
  }

  // Categorize questions by TEKS standard
  const teks810C = pool.filter((q) => q.teksCode === 'TEKS 8.10.C');
  const teks83C = pool.filter((q) => q.teksCode === 'TEKS 8.3.C');
  const teks810B = pool.filter((q) => q.teksCode === 'TEKS 8.10.B');

  const pickRandom = (arr: StaarPracticeQuestion[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  let selected: StaarPracticeQuestion[] = [];
  let attempts = 0;

  do {
    const pickedSet = new Set<string>();
    const temp: StaarPracticeQuestion[] = [];

    const addFrom = (group: StaarPracticeQuestion[]) => {
      const candidates = group.filter((item) => !pickedSet.has(item.id));
      if (candidates.length > 0) {
        const item = pickRandom(candidates);
        pickedSet.add(item.id);
        temp.push(item);
      }
    };

    // Guarantee coverage: 3 from 8.10.C (Translations/Reflections/Rotations), 2 from 8.3.C (Dilations), 1 from 8.10.B (Congruence)
    if (teks810C.length > 0) addFrom(teks810C);
    if (teks810C.length > 1) addFrom(teks810C);
    if (teks810C.length > 2) addFrom(teks810C);
    if (teks83C.length > 0) addFrom(teks83C);
    if (teks83C.length > 1) addFrom(teks83C);
    if (teks810B.length > 0) addFrom(teks810B);

    // Fill any remaining slots if needed
    const remaining = pool.filter((item) => !pickedSet.has(item.id));
    const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
    for (const item of shuffledRemaining) {
      if (temp.length >= count) break;
      temp.push(item);
      pickedSet.add(item.id);
    }

    selected = temp;
    attempts++;

    const currentIdSet = new Set(selected.map((q) => q.id));
    const isSameAsPrevious =
      previousIds.length === selected.length &&
      previousIds.every((id) => currentIdSet.has(id));

    if (!isSameAsPrevious || attempts >= 30) break;
  } while (attempts < 30);

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

export const StaarTransformationsQuiz: React.FC<StaarTransformationsQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
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
    const initialQuestions = generateStaarQuestions(STAAR_TRANSFORMATIONS_QUESTIONS, 6, []);
    setQuestions(initialQuestions);
    setPreviousQuestionIds(initialQuestions.map((q) => q.id));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setShowHint(false);
    setShowReview(false);
  }, []);

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
      STAAR_TRANSFORMATIONS_QUESTIONS,
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

  const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-indigo-200">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
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

  // Active Quiz or Review Mode
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
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
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
