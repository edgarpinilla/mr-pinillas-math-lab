import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import {
  CalculatorLessonModule,
  CalculatorLessonStage,
} from '../../data/calculatorLabTypes';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';

interface CalculatorLessonDetailProps {
  module: CalculatorLessonModule;
  onBack: () => void;
  onNextModule?: () => void;
  onMarkComplete: (moduleId: string) => void;
  isCompleted: boolean;
}

export const CalculatorLessonDetail: React.FC<CalculatorLessonDetailProps> = ({
  module,
  onBack,
  onNextModule,
  onMarkComplete,
  isCompleted,
}) => {
  const [stage, setStage] = useState<CalculatorLessonStage>('learn');

  // Stage 2: Guided Practice State
  const [guidedStepIdx, setGuidedStepIdx] = useState<number>(0);
  const [guidedSelectedOption, setGuidedSelectedOption] = useState<number | null>(null);
  const [guidedFeedback, setGuidedFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message?: string;
    pressedKey?: string;
  }>({ status: 'idle' });
  const [guidedPassed, setGuidedPassed] = useState<boolean>(false);

  // Stage 3: Try It Yourself State (Physical TI-Nspire task)
  const [studentTryInput, setStudentTryInput] = useState<string>('');
  const [tryFeedback, setTryFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message?: string;
  }>({ status: 'idle' });
  const [tryPassed, setTryPassed] = useState<boolean>(false);
  const [showTryHint, setShowTryHint] = useState<boolean>(false);

  // Stage 4: Check Understanding State
  const [checkSelectedOption, setCheckSelectedOption] = useState<number | null>(null);
  const [checkFeedback, setCheckFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message?: string;
  }>({ status: 'idle' });
  const [checkPassed, setCheckPassed] = useState<boolean>(isCompleted);

  // 1. GUIDED PRACTICE HANDLER & STATE RESOLUTION
  const currentGuidedStep = module.guidedPractice.steps[guidedStepIdx] || module.guidedPractice.steps[0];
  const isGuidedStepCorrect = guidedFeedback.status === 'correct';

  // Calculator Screen & Power State for Guided Practice
  const guidedScreenOff = isGuidedStepCorrect
    ? (currentGuidedStep.successScreen?.screenOff ?? false)
    : (currentGuidedStep.initialScreen?.screenOff ?? false);

  const guidedScreenLine1 = isGuidedStepCorrect
    ? (currentGuidedStep.successScreen?.screenLine1 ?? 'TI-Nspire CX • Ready')
    : (currentGuidedStep.initialScreen?.screenLine1 ?? 'TI-Nspire CX • Ready');

  const guidedScreenLine2 = isGuidedStepCorrect
    ? (currentGuidedStep.successScreen?.screenLine2 ?? '')
    : (currentGuidedStep.initialScreen?.screenLine2 ?? currentGuidedStep.prompt);

  const guidedScreenLine3 = isGuidedStepCorrect
    ? (currentGuidedStep.successScreen?.screenLine3 ?? 'Action Verified ✓')
    : (currentGuidedStep.initialScreen?.screenLine3 ?? '');

  // Highlighting: ONLY highlight after correct response! Never reveal answer beforehand.
  const guidedHighlightedKeys =
    isGuidedStepCorrect && currentGuidedStep.targetKey
      ? [currentGuidedStep.targetKey]
      : [];

  const handleCalculatorKeyPress = (pressedKey: string) => {
    // If current step is already solved correctly and waiting for transition, ignore
    if (guidedFeedback.status === 'correct') return;

    const targetKey = currentGuidedStep.targetKey?.toLowerCase();
    const targetAliases = (currentGuidedStep.targetKeyAliases || []).map((k) => k.toLowerCase());
    const pressedKeyLower = pressedKey.toLowerCase();

    // Check if key matches target or any alias
    const isCorrectKey = Boolean(
      targetKey && (pressedKeyLower === targetKey || targetAliases.includes(pressedKeyLower))
    );

    if (isCorrectKey) {
      // Mark as correct!
      setGuidedSelectedOption(currentGuidedStep.correctIndex);
      setGuidedFeedback({
        status: 'correct',
        message: currentGuidedStep.explanation,
        pressedKey,
      });

      // Check if more steps exist
      if (guidedStepIdx + 1 < module.guidedPractice.steps.length) {
        setTimeout(() => {
          setGuidedStepIdx((prev) => {
            if (prev === guidedStepIdx) {
              setGuidedSelectedOption(null);
              setGuidedFeedback({ status: 'idle' });
              return prev + 1;
            }
            return prev;
          });
        }, 2200);
      } else {
        setGuidedPassed(true);
      }
    } else {
      // Incorrect key pressed
      setGuidedFeedback({
        status: 'incorrect',
        message: `You pressed [${pressedKey}]. That is not the requested key for this step. Look closely at the TI-Nspire CX keypad and try again!`,
        pressedKey,
      });
    }
  };

  const handleNextGuidedStep = () => {
    if (guidedStepIdx + 1 < module.guidedPractice.steps.length) {
      setGuidedStepIdx((prev) => prev + 1);
      setGuidedSelectedOption(null);
      setGuidedFeedback({ status: 'idle' });
    } else {
      setGuidedPassed(true);
    }
  };

  const handleSelectGuidedOption = (idx: number) => {
    setGuidedSelectedOption(idx);
    if (idx === currentGuidedStep.correctIndex) {
      if (currentGuidedStep.targetKey) {
        // Correct option identified! Guide the student to press the key on the calculator replica
        setGuidedFeedback({
          status: 'idle',
          message: `Good identification! Now press the ${currentGuidedStep.targetKeyDisplayName || 'key'} directly on the TI-Nspire CX replica below to execute the action.`,
        });
      } else {
        // Fallback for steps without targetKey
        setGuidedFeedback({
          status: 'correct',
          message: currentGuidedStep.explanation,
        });
        if (guidedStepIdx + 1 < module.guidedPractice.steps.length) {
          setTimeout(() => {
            setGuidedStepIdx((prev) => prev + 1);
            setGuidedSelectedOption(null);
            setGuidedFeedback({ status: 'idle' });
          }, 1200);
        } else {
          setGuidedPassed(true);
        }
      }
    } else {
      setGuidedFeedback({
        status: 'incorrect',
        message:
          'That is not the correct key or step. Remember to check where the button is located on your handheld. Try again!',
      });
    }
  };

  // 2. TRY IT YOURSELF HANDLER
  const handleVerifyTryItYourself = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = studentTryInput.trim().toLowerCase().replace(/\s+/g, '');
    if (!cleanInput) return;

    const accepted = [
      module.tryItYourself.correctExpectedResult.toLowerCase().replace(/\s+/g, ''),
      ...(module.tryItYourself.acceptedAlternates || []).map((a) =>
        a.toLowerCase().replace(/\s+/g, '')
      ),
    ];

    if (accepted.includes(cleanInput)) {
      setTryFeedback({
        status: 'correct',
        message: module.tryItYourself.successMessage,
      });
      setTryPassed(true);
    } else {
      setTryFeedback({
        status: 'incorrect',
        message:
          'Your entered value does not match the calculator solution. Check the signs and keystrokes on your physical TI-Nspire CX and try again! (Unlimited retries)',
      });
    }
  };

  // 3. CHECK UNDERSTANDING HANDLER
  const handleSelectCheckOption = (idx: number) => {
    setCheckSelectedOption(idx);
    if (idx === module.checkUnderstanding.correctIndex) {
      setCheckFeedback({
        status: 'correct',
        message: module.checkUnderstanding.explanation,
      });
      setCheckPassed(true);
      onMarkComplete(module.id);
    } else {
      setCheckFeedback({
        status: 'incorrect',
        message: `Incorrect. Tip: ${module.checkUnderstanding.misconceptionTip}. Try another option!`,
      });
    }
  };

  const handleResetModule = () => {
    setStage('learn');
    setGuidedStepIdx(0);
    setGuidedSelectedOption(null);
    setGuidedFeedback({ status: 'idle' });
    setGuidedPassed(false);
    setStudentTryInput('');
    setTryFeedback({ status: 'idle' });
    setTryPassed(false);
    setShowTryHint(false);
    setCheckSelectedOption(null);
    setCheckFeedback({ status: 'idle' });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/70 px-3.5 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Calculator Lab</span>
        </button>

        <div className="flex items-center gap-2">
          {module.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
              {module.badge}
            </span>
          )}
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Module {module.moduleNumber} of 16
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-500/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>TI-Nspire CX Interactive Tutorial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {module.moduleNumber}. {module.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl leading-relaxed">
          {module.subtitle}
        </p>
      </div>

      {/* 4-Stage Step Bar */}
      <div className="bg-white rounded-2xl p-2 sm:p-3 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Stage 1: Learn */}
          <button
            onClick={() => setStage('learn')}
            className={`px-3 py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
              stage === 'learn'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Learn</span>
          </button>

          {/* Stage 2: Guided Practice */}
          <button
            onClick={() => setStage('guided')}
            className={`px-3 py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
              stage === 'guided'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                : guidedPassed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>2. Guided Practice</span>
            {guidedPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          {/* Stage 3: Try It Yourself */}
          <button
            onClick={() => setStage('try')}
            className={`px-3 py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
              stage === 'try'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                : tryPassed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Try It Yourself</span>
            {tryPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          {/* Stage 4: Check Understanding */}
          <button
            onClick={() => setStage('check')}
            className={`px-3 py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
              stage === 'check'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                : checkPassed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. Check Understanding</span>
            {checkPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* STAGE 1: LEARN */}
      {stage === 'learn' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Calculator Keypad Visualizer */}
          <InteractiveNspireVisualizer
            highlightedKeys={module.learn.visualDisplay.highlightedKeys}
            screenLine1={module.learn.visualDisplay.screenLine1}
            screenLine2={module.learn.visualDisplay.screenLine2}
            screenLine3={module.learn.visualDisplay.screenLine3}
            notes={module.learn.visualDisplay.notes}
            specialWarning={module.learn.specialWarning}
            mathRule={module.learn.mathRule}
          />

          {/* Step-by-Step Procedure Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-md space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                TI-Nspire CX Step-by-Step Procedure
              </h2>
            </div>

            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {module.learn.summary}
            </p>

            <div className="space-y-3">
              {module.learn.tiNspireProcedure.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed flex items-start gap-3 hover:bg-blue-50/40 transition-colors"
                >
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </div>
              ))}
            </div>

            {/* Stage Transition Button */}
            <div className="pt-4 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setStage('guided')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Guided Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: GUIDED PRACTICE */}
      {stage === 'guided' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Stage Header & Progress */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  2. Guided Practice: {module.guidedPractice.title}
                </h2>
              </div>
              <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                Step {guidedStepIdx + 1} of {module.guidedPractice.steps.length}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Classroom Scenario: </strong>
                {module.guidedPractice.scenario}
              </div>
            </div>

            {/* Prompt Instruction Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  Active Handheld Task
                </span>
                <span className="text-xs font-bold text-indigo-700">
                  {isGuidedStepCorrect ? '✓ Step Completed' : 'Interactive: Press key on calculator'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentGuidedStep.prompt}
              </h3>
              {!isGuidedStepCorrect && (
                <p className="text-xs text-indigo-900 font-medium">
                  Locate and press the button on the digital TI-Nspire CX replica below. (Unlimited retries)
                </p>
              )}
            </div>
          </div>

          {/* Direct Interactive Replica of TI-Nspire CX School Property */}
          <InteractiveNspireVisualizer
            highlightedKeys={guidedHighlightedKeys}
            screenLine1={guidedScreenLine1}
            screenLine2={guidedScreenLine2}
            screenLine3={guidedScreenLine3}
            screenOff={guidedScreenOff}
            onKeyPress={handleCalculatorKeyPress}
            interactive={true}
            notes={
              isGuidedStepCorrect
                ? `Key ${currentGuidedStep.targetKeyDisplayName || ''} verified! Action executed on screen.`
                : 'Click or tap any key on the keypad above to test your understanding.'
            }
          />

          {/* Feedback & Option Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-md space-y-6">
            {/* Feedback alert banner */}
            {guidedFeedback.status === 'correct' && (
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-emerald-900 text-xs sm:text-sm space-y-2 animate-fadeIn shadow-sm">
                <div className="font-black flex items-center gap-2 text-emerald-800 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Key Verified & Screen Updated!</span>
                </div>
                <p className="font-medium text-emerald-800 leading-relaxed">
                  {guidedFeedback.message}
                </p>
                {guidedStepIdx + 1 < module.guidedPractice.steps.length ? (
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleNextGuidedStep}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Proceed to Step {guidedStepIdx + 2}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-emerald-700 font-medium">
                      (Advancing in 2 seconds...)
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 font-bold text-emerald-800">
                    All guided steps completed! You are ready to move to "Try It Yourself".
                  </div>
                )}
              </div>
            )}

            {guidedFeedback.status === 'incorrect' && (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 text-rose-900 text-xs sm:text-sm space-y-2 animate-shake shadow-sm">
                <div className="font-black flex items-center gap-2 text-rose-800 text-sm sm:text-base">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Incorrect Key — Try Again!</span>
                </div>
                <p className="font-medium text-rose-800 leading-relaxed">
                  {guidedFeedback.message}
                </p>
              </div>
            )}

            {guidedFeedback.status === 'idle' && guidedFeedback.message && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-900 text-xs sm:text-sm space-y-1 animate-fadeIn">
                <div className="font-bold flex items-center gap-2 text-blue-800">
                  <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Instruction</span>
                </div>
                <p className="text-blue-800 font-medium">{guidedFeedback.message}</p>
              </div>
            )}

            {/* Multiple Choice Options (Preserved instructional options) */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Instructional Options (You can also select here, or press directly on the calculator):
              </div>
              <div className="grid grid-cols-1 gap-3">
                {currentGuidedStep.options.map((option, idx) => {
                  const isSelected = guidedSelectedOption === idx;
                  const isCorrect = idx === currentGuidedStep.correctIndex;
                  const showSuccess = isSelected && isCorrect && isGuidedStepCorrect;
                  const showError = isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectGuidedOption(idx)}
                      className={`p-4 rounded-2xl text-left text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        showSuccess
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                          : showError
                          ? 'bg-rose-50 border-rose-400 text-rose-950'
                          : isSelected && isCorrect
                          ? 'bg-blue-50 border-blue-400 text-blue-950'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span>{option}</span>
                      {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {showError && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => setStage('learn')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ← Back to Learn
              </button>

              {guidedPassed && (
                <button
                  onClick={() => setStage('try')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 animate-pulse"
                >
                  <span>Move to 3. Try It Yourself</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: TRY IT YOURSELF (Physical TI-Nspire task) */}
      {stage === 'try' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                3. Try It Yourself (Physical TI-Nspire Handheld)
              </h2>
            </div>
            <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full">
              Classroom Handheld Task
            </span>
          </div>

          {/* The Physical Prompt */}
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-50 to-blue-500/10 rounded-2xl p-6 border-2 border-amber-300/80 space-y-4">
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                HANDS-ON
              </span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {module.tryItYourself.taskPrompt}
                </h3>
                <div className="pt-2 text-2xl sm:text-3xl font-mono font-black text-blue-700 tracking-wider">
                  {module.tryItYourself.targetExpression}
                </div>
              </div>
            </div>
          </div>

          {/* Student Verification Input Form */}
          <form onSubmit={handleVerifyTryItYourself} className="space-y-4 max-w-md mx-auto">
            <div>
              <label
                htmlFor="student-try-input"
                className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5"
              >
                {module.tryItYourself.studentInputPrompt}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="student-try-input"
                  type="text"
                  value={studentTryInput}
                  onChange={(e) => setStudentTryInput(e.target.value)}
                  placeholder="Enter your screen value..."
                  className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                  disabled={tryPassed}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!studentTryInput.trim() || tryPassed}
                  className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                    tryPassed
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg active:scale-98'
                  }`}
                >
                  {tryPassed ? 'Verified ✓' : 'Verify Result'}
                </button>
              </div>
            </div>
          </form>

          {/* Feedback Section */}
          {tryFeedback.status === 'correct' && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-emerald-900 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{tryFeedback.message}</span>
              </div>
              <div className="text-xs text-emerald-800 font-semibold space-y-1">
                <div className="font-bold">Keystroke Confirmation:</div>
                <ul className="list-disc pl-5 space-y-0.5 font-mono">
                  {module.tryItYourself.solutionSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tryFeedback.status === 'incorrect' && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 text-rose-900 space-y-2 animate-shake">
              <div className="flex items-center gap-2 font-black text-sm text-rose-800">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Result Not Verified</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed font-medium">
                {tryFeedback.message}
              </p>
              {!showTryHint && (
                <button
                  onClick={() => setShowTryHint(true)}
                  className="text-xs font-bold text-blue-700 underline hover:text-blue-900 cursor-pointer pt-1"
                >
                  Need a hint for physical handheld keystrokes?
                </button>
              )}
            </div>
          )}

          {showTryHint && tryFeedback.status !== 'correct' && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-amber-900 text-xs space-y-1">
              <div className="font-black flex items-center gap-1.5 text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Keypad Hint:
              </div>
              <p className="font-medium text-amber-800/90">{module.tryItYourself.hint}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setStage('guided')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ← Back to Guided Practice
            </button>

            {tryPassed && (
              <button
                onClick={() => setStage('check')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 animate-pulse"
              >
                <span>Move to 4. Check Understanding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 4: CHECK YOUR UNDERSTANDING */}
      {stage === 'check' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                4. Check Your Understanding
              </h2>
            </div>
            <span className="text-xs font-black text-teal-800 bg-teal-50 border border-teal-300 px-3 py-1 rounded-full">
              Final Mastery Check
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {module.checkUnderstanding.conceptualQuestion}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {module.checkUnderstanding.options.map((option, idx) => {
                const isSelected = checkSelectedOption === idx;
                const isCorrect = idx === module.checkUnderstanding.correctIndex;
                const showSuccess = isSelected && isCorrect;
                const showError = isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectCheckOption(idx)}
                    className={`p-4 rounded-2xl text-left text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                        : showError
                        ? 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-400'
                    }`}
                  >
                    <span>{option}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {showError && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {checkFeedback.status === 'correct' && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-emerald-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Module {module.moduleNumber} Completed!</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                {checkFeedback.message}
              </p>
            </div>
          )}

          {checkFeedback.status === 'incorrect' && (
            <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-900 text-xs sm:text-sm space-y-1 animate-shake">
              <div className="font-black flex items-center gap-1.5 text-rose-800">
                <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
              </div>
              <p className="font-medium text-rose-800">{checkFeedback.message}</p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => setStage('try')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ← Back to Try It Yourself
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetModule}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                title="Review this lesson again"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Lesson
              </button>

              {checkPassed && onNextModule && (
                <button
                  onClick={onNextModule}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Next Lesson Module</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
