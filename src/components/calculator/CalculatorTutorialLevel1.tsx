import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  Calculator,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Delete,
  Trash2,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';
import { applyNspireKey, INITIAL_NSPIRE_STATE, NspireEngineState } from './nspireEngine';

export interface CalculatorTutorialLevel1Props {
  onBack: () => void;
  onComplete?: () => void;
}

interface ChallengeDef {
  number: number;
  task: string;
  expectedResult: string;
  alternateResult?: string;
  instruction: string;
  explanation: string;
  requiresNegativeKey?: boolean;
  requiresSubtractionKey?: boolean;
  forbidSubtractionForNegative?: boolean;
  forbidNegativeForSubtraction?: boolean;
}

const LEVEL_1_CHALLENGES: ChallengeDef[] = [
  // 1. 24 + 37 = 61
  {
    number: 1,
    task: '24 + 37',
    expectedResult: '61',
    instruction: 'Enter the addition calculation on the TI-Nspire CX keypad and press [enter].',
    explanation: 'The [+] key adds quantities. Press [enter] at the bottom right to evaluate.',
  },
  // 2. 85 - 29 = 56
  {
    number: 2,
    task: '85 - 29',
    expectedResult: '56',
    requiresSubtractionKey: true,
    forbidNegativeForSubtraction: true,
    instruction: 'Enter the subtraction calculation on the keypad and press [enter].',
    explanation: 'The [-] key on the far-right operator column performs subtraction between two numbers.',
  },
  // 3. 14 × 6 = 84
  {
    number: 3,
    task: '14 × 6',
    expectedResult: '84',
    instruction: 'Enter the multiplication calculation on the keypad and press [enter].',
    explanation: 'The [×] key on the far-right operator column performs multiplication.',
  },
  // 4. 96 ÷ 8 = 12
  {
    number: 4,
    task: '96 ÷ 8',
    expectedResult: '12',
    instruction: 'Enter the division calculation on the keypad and press [enter].',
    explanation: 'The [÷] key performs division.',
  },
  // 5. -8 + 13 = 5 (also supports -5 + 4 = -1)
  {
    number: 5,
    task: '-8 + 13',
    expectedResult: '5',
    alternateResult: '-1',
    requiresNegativeKey: true,
    forbidSubtractionForNegative: true,
    instruction: 'Enter the negative number calculation on the keypad and press [enter].',
    explanation: '(-) enters a negative value. The subtraction key performs subtraction.',
  },
  // 6. -7 × 6 = -42
  {
    number: 6,
    task: '-7 × 6',
    expectedResult: '-42',
    requiresNegativeKey: true,
    forbidSubtractionForNegative: true,
    instruction: 'Enter the negative factor calculation on the keypad and press [enter].',
    explanation: 'Use [(-)] before 7 to enter a negative factor. Negative times positive equals negative.',
  },
  // 7. 45 ÷ (-5) = -9
  {
    number: 7,
    task: '45 ÷ (-5)',
    expectedResult: '-9',
    requiresNegativeKey: true,
    forbidSubtractionForNegative: true,
    instruction: 'Enter the calculation on the keypad with the negative divisor and press [enter].',
    explanation: 'Use [÷] for division and [(-)] before 5 for the negative divisor. 45 ÷ (-5) = -9.',
  },
  // 8. -12 - 9 = -21
  {
    number: 8,
    task: '-12 - 9',
    expectedResult: '-21',
    requiresNegativeKey: true,
    requiresSubtractionKey: true,
    forbidSubtractionForNegative: true,
    forbidNegativeForSubtraction: true,
    instruction: 'Enter the calculation using the correct negative key and subtraction key, then press [enter].',
    explanation: 'Start with [(-)] 12 for the negative value, then use the subtraction key [-] for minus 9.',
  },
  // 9. (-6) × (-4) = 24
  {
    number: 9,
    task: '(-6) × (-4)',
    expectedResult: '24',
    requiresNegativeKey: true,
    forbidSubtractionForNegative: true,
    instruction: 'Enter the product of the two negative factors and press [enter].',
    explanation: 'Both factors are negative values entered using [(-)]. Negative times negative equals positive 24.',
  },
  // 10. 18 - (-7) = 25
  {
    number: 10,
    task: '18 - (-7)',
    expectedResult: '25',
    requiresNegativeKey: true,
    requiresSubtractionKey: true,
    forbidSubtractionForNegative: true,
    forbidNegativeForSubtraction: true,
    instruction: 'Enter the subtraction of a negative value on the keypad and press [enter].',
    explanation: '18 minus negative 7: use subtraction [-] between the numbers and [(-)] for negative 7.',
  },
];

type ActiveMode = 'challenge' | 'skill_del' | 'skill_clear';

export const CalculatorTutorialLevel1: React.FC<CalculatorTutorialLevel1Props> = ({
  onBack,
  onComplete,
}) => {
  const [activeMode, setActiveMode] = useState<ActiveMode>('challenge');
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [resetCounter, setResetCounter] = useState<number>(1);
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  // Track completed challenges
  const [completedChallenges, setCompletedChallenges] = useState<Record<number, boolean>>({});
  const [completedDelSkill, setCompletedDelSkill] = useState<boolean>(false);
  const [completedClearSkill, setCompletedClearSkill] = useState<boolean>(false);
  const [isAllComplete, setIsAllComplete] = useState<boolean>(false);

  // Maintain shadow state to inspect exact expressions & evaluated results
  const shadowStateRef = useRef<NspireEngineState>({ ...INITIAL_NSPIRE_STATE });

  const currentChallenge = LEVEL_1_CHALLENGES[challengeIdx];
  const completedCount = Object.keys(completedChallenges).length;

  // Fully resets the calculator buffer, expression, evaluatedResult, and key tracking
  const resetCalculator = () => {
    shadowStateRef.current = { ...INITIAL_NSPIRE_STATE };
    setKeyHistory([]);
    setFeedback({ status: 'idle', message: '' });
    setResetCounter((prev) => prev + 1);
  };

  // Automatically ensure clean calculator reset on any challenge or mode transition
  useEffect(() => {
    resetCalculator();
  }, [challengeIdx, activeMode]);

  const handleNextChallenge = () => {
    if (challengeIdx + 1 < LEVEL_1_CHALLENGES.length) {
      setChallengeIdx((prev) => prev + 1);
      setActiveMode('challenge');
    } else {
      setIsAllComplete(true);
      onComplete?.();
    }
  };

  const handleCalculatorKeyPress = (keyId: string) => {
    const normKey = keyId.toLowerCase().trim();

    // 1. CLEAR Skill Check Mode
    if (activeMode === 'skill_clear') {
      const prevCtrl = shadowStateRef.current.ctrlActive;
      const nextState = applyNspireKey(shadowStateRef.current, keyId);
      shadowStateRef.current = nextState;
      const updatedHistory = [...keyHistory, normKey];
      setKeyHistory(updatedHistory);

      if (normKey === 'clear' || (prevCtrl && (normKey === 'del' || normKey === 'backspace'))) {
        setFeedback({
          status: 'correct',
          message: 'Correct Response ✓\nPressing [ctrl] then [del] activates the yellow "clear" function above the delete key to wipe the scratchpad.',
        });
        setCompletedClearSkill(true);
        return;
      }
      return;
    }

    // 2. DEL Skill Check Mode
    if (activeMode === 'skill_del') {
      const nextState = applyNspireKey(shadowStateRef.current, keyId);
      shadowStateRef.current = nextState;
      const updatedHistory = [...keyHistory, normKey];
      setKeyHistory(updatedHistory);

      if (normKey === 'enter' || normKey === 'exe' || normKey === 'return') {
        const evaluated = nextState.evaluatedResult.trim();
        const usedDel = updatedHistory.includes('del') || updatedHistory.includes('backspace');

        if (evaluated === '42' && usedDel) {
          setFeedback({
            status: 'correct',
            message: 'Correct Response ✓\nThe [del] key deletes the previous character without clearing your entire calculation.',
          });
          setCompletedDelSkill(true);
        } else if (evaluated === '42' && !usedDel) {
          setFeedback({
            status: 'incorrect',
            message: 'Remember to use the [del] key to correct the last digit from 7 to 2.',
          });
        } else {
          setFeedback({
            status: 'incorrect',
            message: 'Type 47, press [del] to remove the 7, type 2 so the display reads 42, then press [enter].',
          });
        }
      }
      return;
    }

    // 3. Main Challenge Mode
    let currentHistory = keyHistory;
    if (feedback.status === 'incorrect') {
      currentHistory = [];
      setFeedback({ status: 'idle', message: '' });
    }

    const nextState = applyNspireKey(shadowStateRef.current, keyId);
    shadowStateRef.current = nextState;
    const updatedHistory = [...currentHistory, normKey];
    setKeyHistory(updatedHistory);

    // If step is already marked correct and awaiting continuation, ignore further keystrokes
    if (feedback.status === 'correct') {
      return;
    }

    // Check when user presses ENTER
    if (normKey === 'enter' || normKey === 'exe' || normKey === 'return') {
      const evaluated = nextState.evaluatedResult.trim();
      const expr = nextState.expression.trim();

      const isCorrectValue =
        evaluated === currentChallenge.expectedResult ||
        (Boolean(currentChallenge.alternateResult) && evaluated === currentChallenge.alternateResult);

      // Negative Number Pedagogy Checks
      if (currentChallenge.forbidSubtractionForNegative || currentChallenge.requiresNegativeKey) {
        const usedNegativeKey = updatedHistory.some(
          (k) => k === '(-)' || k === 'neg' || k === 'negative' || k === '(- )'
        );
        const usedSubtractionKey = updatedHistory.some(
          (k) => k === '-' || k === 'minus' || k === 'subtraction' || k === 'subtract'
        );
        const hasRaisedNegative = expr.includes('⁻');

        // Check whether student used [-] instead of [(-)] to form a negative number
        const failedNegativeKeyCheck =
          !usedNegativeKey || !hasRaisedNegative || expr.startsWith(' - ') || expr.startsWith('-');

        if (failedNegativeKeyCheck) {
          if (isCorrectValue) {
            setFeedback({
              status: 'incorrect',
              message:
                'Correct value, but check how you entered the negative number.\nOn the TI-Nspire, subtraction and negative are different keys.\nTry again.',
            });
            return;
          } else {
            setFeedback({
              status: 'incorrect',
              message:
                'Check how you entered the negative number. On the TI-Nspire, use the dedicated [(-)] key at the bottom of the numbers.\nTry again.',
            });
            return;
          }
        }

        // For challenges with both negative and subtraction (e.g., -12 - 9, 18 - (-7))
        if (currentChallenge.number === 8 || currentChallenge.number === 10) {
          const negativeKeyCount = updatedHistory.filter(
            (k) => k === '(-)' || k === 'neg' || k === 'negative' || k === '(- )'
          ).length;
          if (negativeKeyCount >= 2 && !usedSubtractionKey) {
            setFeedback({
              status: 'incorrect',
              message: 'Think about whether you are subtracting or entering a negative value.',
            });
            return;
          }
        }
      }

      // Subtraction Key Check: if [(-)] was mistakenly used where subtraction was required
      if (currentChallenge.forbidNegativeForSubtraction) {
        const usedNegativeKey = updatedHistory.some(
          (k) => k === '(-)' || k === 'neg' || k === 'negative' || k === '(- )'
        );
        const usedSubtractionKey = updatedHistory.some(
          (k) => k === '-' || k === 'minus' || k === 'subtraction' || k === 'subtract'
        );

        if (currentChallenge.number === 2 && usedNegativeKey && !usedSubtractionKey) {
          setFeedback({
            status: 'incorrect',
            message: 'Think about whether you are subtracting or entering a negative value.',
          });
          return;
        }
      }

      // Final numerical evaluation comparison
      if (isCorrectValue) {
        setFeedback({
          status: 'correct',
          message: `Correct Response ✓\n${currentChallenge.explanation}`,
        });
        setCompletedChallenges((prev) => ({ ...prev, [currentChallenge.number]: true }));
      } else {
        setFeedback({
          status: 'incorrect',
          message: 'Check your calculator entry and try again.',
        });
      }
    }
  };

  // Completion View
  if (isAllComplete) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-400 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Interactive Hardware Mastery
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Level 1 Complete
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg mx-auto">
              Outstanding work! You successfully demonstrated the physical calculator skills required for basic operations and negative numbers on the classroom TI-Nspire CX.
            </p>
          </div>

          {/* Checklist of skills practiced */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto text-left space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">
              Skills Practiced & Verified:
            </h3>
            <ul className="space-y-2 text-sm font-bold text-slate-800">
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Basic operations (+, -, ×, ÷)</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Negative numbers</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subtraction [-] vs. Dedicated Negative [(-)]</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DEL correction</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CTRL + DEL / Clear scratchpad</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ENTER exact evaluation</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setChallengeIdx(0);
                setIsAllComplete(false);
                setCompletedChallenges({});
                setActiveMode('challenge');
                resetCalculator();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Level 1 Again</span>
            </button>

            <button
              disabled
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-300 text-slate-500 font-black text-sm uppercase tracking-wider cursor-not-allowed shadow-none"
              title="Level 2 coming next"
            >
              <span>Continue (Level 2 coming next)</span>
            </button>

            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Calculator Lab</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 pb-2">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-1 mb-1.5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Calculator Lab Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 hidden sm:inline">
            Progress:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-700">
            {completedCount} of 10 Challenges Complete
          </span>
        </div>
      </div>

      {/* Main Responsive Grid: Guided Practice Panel (Left) & Prominent Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-start">
        {/* Left Column: Clean Guided Practice Panel (Stationary) */}
        <div className="lg:col-span-5 space-y-2.5 lg:sticky lg:top-2">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <Calculator className="w-3 h-3 text-blue-600" />
                  <span>LEVEL 1</span>
                </span>

                {activeMode === 'challenge' ? (
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                    Basic Operations & Negatives
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                    {activeMode === 'skill_del' ? 'DEL Skill Practice' : 'CLEAR Skill Practice'}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                {activeMode === 'challenge' ? `Challenge ${currentChallenge.number} of 10` : 'Skill Practice'}
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Basic Operations & Negative Numbers
            </h1>

            {/* 10-Challenge Step Progress Indicators */}
            <div className="pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between gap-1">
                {LEVEL_1_CHALLENGES.map((ch, idx) => {
                  const isCurrent = activeMode === 'challenge' && challengeIdx === idx;
                  const isDone = !!completedChallenges[ch.number];

                  return (
                    <div
                      key={ch.number}
                      onClick={() => {
                        setChallengeIdx(idx);
                        setActiveMode('challenge');
                      }}
                      className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-blue-600 ring-2 ring-blue-300'
                          : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                      title={`Challenge ${ch.number}: ${ch.task}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Mathematical Challenge Card */}
          {activeMode === 'challenge' && (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-3.5 border border-indigo-500/30 shadow-lg space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Challenge {currentChallenge.number} of 10</span>
                </span>

                {feedback.status === 'correct' && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Solved
                  </span>
                )}
              </div>

              {/* Prominent Math Task Display */}
              <div className="bg-black/40 rounded-xl p-2.5 sm:p-3 border border-white/10 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  Mathematical Task
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider">
                  {currentChallenge.task}
                </div>
              </div>

              <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-sky-300 font-bold block mb-0.5">Instruction:</span>
                {currentChallenge.instruction}
              </div>

              {/* Interactive Feedback Box */}
              {feedback.status === 'idle' && (
                <div className="bg-slate-800/80 rounded-xl p-2.5 sm:p-3 border border-slate-700 text-xs text-slate-300 space-y-1 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-200 block text-[11px]">Interactive Handheld Ready:</span>
                    Enter calculation on keypad, then press <code className="bg-slate-900 px-1 py-0.2 rounded font-mono text-amber-300 text-[11px]">[enter]</code>.
                  </div>
                </div>
              )}

              {feedback.status === 'incorrect' && (
                <div className="bg-rose-950/70 border-2 border-rose-500 rounded-xl p-3 text-rose-100 space-y-1.5 animate-shake">
                  <div className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-wide">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Entry Needs Adjustment</span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    {feedback.message}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-rose-300">
                    <span>Unlimited retries • Keep typing on keypad</span>
                    <button
                      onClick={resetCalculator}
                      className="underline hover:text-white font-bold cursor-pointer"
                    >
                      Clear screen & retry
                    </button>
                  </div>
                </div>
              )}

              {feedback.status === 'correct' && (
                <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-xl p-3 sm:p-3.5 text-emerald-100 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Correct Response ✓</span>
                  </div>
                  <div className="text-xs font-medium leading-relaxed whitespace-pre-line text-emerald-50">
                    {feedback.message.replace('Correct Response ✓\n', '')}
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {challengeIdx + 1 < LEVEL_1_CHALLENGES.length ? `Continue to Challenge ${challengeIdx + 2}` : 'View Level 1 Completion'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Reset / Try Again Control */}
              <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={resetCalculator}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                  title="Reset this challenge and clear scratchpad"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset / Try Again</span>
                </button>

                <span className="text-[10px] text-slate-400 font-mono">
                  TI-Nspire CX School Property
                </span>
              </div>
            </div>
          )}

          {/* DEL Practice Embedded View */}
          {activeMode === 'skill_del' && (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-4 border border-indigo-500/30 shadow-lg space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Delete className="w-3.5 h-3.5" />
                  <span>Hardware Skill Check • DEL Key</span>
                </span>
                {completedDelSkill && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Practiced
                  </span>
                )}
              </div>

              <div className="bg-black/40 rounded-xl p-3 border border-white/10 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  Correction Task
                </span>
                <div className="text-xl sm:text-2xl font-mono font-black text-amber-300 tracking-wider">
                  Enter 47 → Correct to 42
                </div>
              </div>

              <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-sky-300 font-bold block mb-0.5">Instruction:</span>
                Type <strong>47</strong> on the calculator. Now correct the last digit using <strong>[del]</strong> so the display reads <strong>42</strong>, then press <strong>[enter]</strong>.
              </div>

              {feedback.status === 'idle' && (
                <div className="bg-slate-800/80 rounded-xl p-2.5 sm:p-3 border border-slate-700 text-xs text-slate-300 space-y-1 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-200 block text-[11px]">DEL Key Practice Ready:</span>
                    Enter 47, press [del] to remove 7, type 2, then press [enter].
                  </div>
                </div>
              )}

              {feedback.status === 'incorrect' && (
                <div className="bg-rose-950/70 border-2 border-rose-500 rounded-xl p-3 text-rose-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-wide">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Correction Needed</span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    {feedback.message}
                  </p>
                </div>
              )}

              {feedback.status === 'correct' && (
                <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-xl p-3 sm:p-3.5 text-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Correct Response ✓</span>
                  </div>
                  <div className="text-xs font-medium leading-relaxed whitespace-pre-line text-emerald-50">
                    {feedback.message.replace('Correct Response ✓\n', '')}
                  </div>
                  <button
                    onClick={() => setActiveMode('challenge')}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Return to Challenge {currentChallenge.number}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={resetCalculator}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Screen</span>
                </button>
                <button
                  onClick={() => setActiveMode('challenge')}
                  className="text-sky-300 hover:underline font-bold"
                >
                  ← Back to Challenge {currentChallenge.number}
                </button>
              </div>
            </div>
          )}

          {/* CLEAR Practice Embedded View */}
          {activeMode === 'skill_clear' && (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-4 border border-indigo-500/30 shadow-lg space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hardware Skill Check • CTRL + DEL</span>
                </span>
                {completedClearSkill && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Practiced
                  </span>
                )}
              </div>

              <div className="bg-black/40 rounded-xl p-3 border border-white/10 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  Clear Screen Task
                </span>
                <div className="text-xl sm:text-2xl font-mono font-black text-amber-300 tracking-wider">
                  Press [ctrl] then [del]
                </div>
              </div>

              <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-sky-300 font-bold block mb-0.5">Instruction:</span>
                On your TI-Nspire CX keypad, press the bright yellow <strong>[ctrl]</strong> key, then press <strong>[del]</strong> (clear) to wipe your scratchpad.
              </div>

              {feedback.status === 'idle' && (
                <div className="bg-slate-800/80 rounded-xl p-2.5 sm:p-3 border border-slate-700 text-xs text-slate-300 space-y-1 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-200 block text-[11px]">Clear Practice Ready:</span>
                    Press [ctrl] then [del] on the calculator to test the clear shortcut.
                  </div>
                </div>
              )}

              {feedback.status === 'correct' && (
                <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-xl p-3 sm:p-3.5 text-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Correct Response ✓</span>
                  </div>
                  <div className="text-xs font-medium leading-relaxed whitespace-pre-line text-emerald-50">
                    {feedback.message.replace('Correct Response ✓\n', '')}
                  </div>
                  <button
                    onClick={() => setActiveMode('challenge')}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Return to Challenge {currentChallenge.number}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={resetCalculator}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Screen</span>
                </button>
                <button
                  onClick={() => setActiveMode('challenge')}
                  className="text-sky-300 hover:underline font-bold"
                >
                  ← Back to Challenge {currentChallenge.number}
                </button>
              </div>
            </div>
          )}

          {/* Embedded Hardware Skill Checks Quick Access */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Embedded Hardware Skill Checks:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveMode(activeMode === 'skill_del' ? 'challenge' : 'skill_del')}
                className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  activeMode === 'skill_del'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                    : completedDelSkill
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono font-black text-xs">[del] Key</span>
                  {completedDelSkill && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Correct 47 to 42 using DEL.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode(activeMode === 'skill_clear' ? 'challenge' : 'skill_clear')}
                className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  activeMode === 'skill_clear'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                    : completedClearSkill
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono font-black text-xs">[ctrl] + [del]</span>
                  {completedClearSkill && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Clear scratchpad with shortcut.
                </p>
              </button>
            </div>
          </div>

          {/* Classroom Key Distinction Reminder Box */}
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-300/80 space-y-1.5 text-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-800">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Keypad Distinction Rule</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
              <div className="bg-white p-2 rounded-xl border border-amber-200">
                <span className="font-black text-slate-900 block mb-0.5 text-[11px]">[-] Subtraction</span>
                <span className="text-[10px] text-slate-600 leading-tight block">
                  Dark key in far-right column. Used <em>between</em> two quantities.
                </span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-200">
                <span className="font-black text-slate-900 block mb-0.5 text-[11px]">[(-)] Negative</span>
                <span className="text-[10px] text-slate-600 leading-tight block">
                  White key next to <code className="font-bold">.</code>. Used <em>before</em> negative value.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic TI-Nspire CX Visualizer (Independent Vertical Scroll) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:max-h-[calc(100vh-75px)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 lg:overscroll-contain">
          <div className="w-full max-w-[480px] pb-6">
            <InteractiveNspireVisualizer
              key={`calc-${activeMode}-${challengeIdx}-${resetCounter}`}
              resetSignal={resetCounter}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1="Scratchpad - Calculate"
              screenLine2=""
              screenLine3=""
              notes="Click the physical keys or type on your keyboard. Press [enter] when ready."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
