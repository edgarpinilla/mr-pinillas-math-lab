import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, HelpCircle, RotateCcw, Award, Sparkles } from 'lucide-react';
import { PracticeQuestion } from '../types';

interface PracticeQuizProps {
  questions: PracticeQuestion[];
  topicTitle: string;
}

/**
 * Generates a randomized, balanced set of questions from the question bank.
 * If the pool contains > 6 questions (Transformations), it selects 6 unique questions
 * with balanced representation across all transformation types, ensuring the set differs
 * from the previous attempt and randomizing answer choice order while preserving correct index.
 */
function generateQuizQuestions(
  pool: PracticeQuestion[],
  count: number = 6,
  previousIds: string[] = []
): PracticeQuestion[] {
  // If pool has 6 or fewer questions (e.g. Proportional Relationships), preserve as is
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

    // Fill the remaining question slots from the rest of the pool
    const remainingPool = pool.filter((item) => !pickedSet.has(item.id));
    const shuffledRemaining = [...remainingPool].sort(() => Math.random() - 0.5);
    for (const item of shuffledRemaining) {
      if (temp.length >= count) break;
      temp.push(item);
      pickedSet.add(item.id);
    }

    selected = temp;
    attempts++;

    // Ensure the 6-question combination is not identical to the previous attempt
    const currentIdSet = new Set(selected.map((q) => q.id));
    const isSameAsPrevious =
      previousIds.length === count &&
      previousIds.every((id) => currentIdSet.has(id));

    if (!isSameAsPrevious) break;
  } while (attempts < 25);

  // Shuffle question presentation sequence
  const shuffledSelected = [...selected].sort(() => Math.random() - 0.5);

  // Shuffle answer options for each question while accurately tracking correct answer index
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

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ questions, topicTitle }) => {
  const previousIdsRef = useRef<string[]>([]);
  const isDynamic = questions.length > 6;
  const targetCount = isDynamic ? 6 : questions.length;

  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>(() => {
    const initial = generateQuizQuestions(questions, targetCount, []);
    previousIdsRef.current = initial.map((q) => q.id);
    return initial;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(1);

  // Sync state if topic/questions prop changes
  useEffect(() => {
    const count = questions.length > 6 ? 6 : questions.length;
    const generated = generateQuizQuestions(questions, count, []);
    previousIdsRef.current = generated.map((q) => q.id);
    setActiveQuestions(generated);
    setSelectedAnswers({});
    setShowHints({});
    setSubmitted(false);
    setAttemptCount(1);
  }, [questions]);

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
    const count = questions.length > 6 ? 6 : questions.length;
    const nextQuestions = generateQuizQuestions(
      questions,
      count,
      previousIdsRef.current
    );
    previousIdsRef.current = nextQuestions.map((q) => q.id);
    setActiveQuestions(nextQuestions);
    setSelectedAnswers({});
    setShowHints({});
    setSubmitted(false);
    setAttemptCount((prev) => prev + 1);

    // Smoothly scroll back to the top of the quiz container
    const quizEl = document.getElementById('self-check-quiz-container');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = activeQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const progressPercentage = Math.round((answeredCount / activeQuestions.length) * 100);

  return (
    <div id="self-check-quiz-container" className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
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
            {isDynamic
              ? 'Complete this 6-question check selected randomly from the question bank. Every retry generates a new practice attempt!'
              : 'Test your understanding with these check questions. Instant feedback with step-by-step explanations!'}
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-200 px-4 py-3 rounded-2xl shadow-2xs">
            <Award className="w-7 h-7 text-amber-500 shrink-0" />
            <div>
              <div className="text-[11px] text-blue-800 font-extrabold uppercase tracking-wider">Your Score</div>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {correctCount} / {activeQuestions.length} Correct ({Math.round((correctCount / activeQuestions.length) * 100)}%)
              </div>
            </div>
            <button
              onClick={handleReset}
              className="ml-2 p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 border border-slate-200 shadow-2xs transition-all cursor-pointer"
              title="Practice Again with New Questions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isDynamic ? 'New Questions' : 'Retry'}
            </button>
          </div>
        ) : (
          <div className="min-w-44 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Progress:</span>
              <span className="text-blue-600 font-extrabold">{answeredCount} of {activeQuestions.length} Answered</span>
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

      <div className="space-y-6 mt-6">
        {activeQuestions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const selectedOpt = selectedAnswers[q.id];
          const isCorrect = selectedOpt === q.correctIndex;

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
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-slate-900 text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                    {qIndex + 1}
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-base font-black text-slate-900 leading-relaxed">
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

              {/* Hint Box */}
              {showHints[q.id] && !submitted && (
                <div className="mt-3.5 ml-0 sm:ml-10 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed font-medium">
                  💡 <strong className="font-bold">Teacher Hint:</strong> {q.hint}
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 ml-0 sm:ml-10">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOpt === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let buttonStyles = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300 cursor-pointer';

                  if (submitted) {
                    if (isThisCorrect) {
                      buttonStyles = 'bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-md shadow-emerald-500/20';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyles = 'bg-rose-600 border-rose-600 text-white font-extrabold';
                    } else {
                      buttonStyles = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    buttonStyles = 'bg-blue-600 border-blue-600 text-white font-extrabold shadow-md shadow-blue-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left p-3.5 rounded-xl text-xs sm:text-sm border-2 transition-all flex items-center justify-between gap-2.5 min-h-[48px] ${buttonStyles}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isThisSelected || (submitted && isThisCorrect)
                              ? 'bg-white/25 text-inherit'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-semibold">{option}</span>
                      </div>
                      {submitted && isThisCorrect && (
                        <CheckCircle className="w-4 h-4 text-white shrink-0" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-white shrink-0" />
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
            ? 'Review your results above, or click Practice Again to generate a new randomized set of questions!'
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
            {isDynamic ? 'Practice Again (New 6 Questions)' : 'Reset & Practice Again'}
          </button>
        )}
      </div>
    </div>
  );
};

