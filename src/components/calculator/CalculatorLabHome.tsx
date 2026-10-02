import React, { useState, useEffect } from 'react';
import {
  Calculator,
  BookOpen,
  Play,
  CheckCircle2,
  Sparkles,
  Trophy,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  Lock,
  Layers,
  ChevronRight,
  Flame,
  Settings,
  Trash2,
} from 'lucide-react';
import {
  CALCULATOR_LEVELS,
  CALCULATOR_LEVEL_1_MODULES,
} from '../../data/calculatorLabData';
import {
  CalculatorLessonModule,
  CalculatorLevel,
} from '../../data/calculatorLabTypes';
import { CalculatorLessonDetail } from './CalculatorLessonDetail';
import { CalculatorChallengeView } from './CalculatorChallengeView';
import { CalculatorTutorialLevel1 } from './CalculatorTutorialLevel1';
import { CalculatorTutorialLevel2 } from './CalculatorTutorialLevel2';
import { CalculatorTutorialLevel3 } from './CalculatorTutorialLevel3';
import { CalculatorTutorialSetup } from './CalculatorTutorialSetup';
import { CalculatorFreeUse } from './CalculatorFreeUse';

interface CalculatorLabHomeProps {
  onNavigateHome: () => void;
  onSelectTopic?: (topicId: string) => void;
  onTutorialActiveChange?: (active: boolean) => void;
}

const STORAGE_KEY_COMPLETED = 'mathlab_calculator_level1_completed';
const STORAGE_KEY_CHALLENGE = 'mathlab_calculator_level1_challenge_passed';

export const CalculatorLabHome: React.FC<CalculatorLabHomeProps> = ({
  onNavigateHome,
  onSelectTopic,
  onTutorialActiveChange,
}) => {
  // Persistence for student progress (fully local client-side)
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [challengePassed, setChallengePassed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_CHALLENGE) === 'true';
    } catch {
      return false;
    }
  });

  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);
  const [isLevel1TutorialActive, setIsLevel1TutorialActive] = useState<boolean>(false);
  const [isLevel2TutorialActive, setIsLevel2TutorialActive] = useState<boolean>(false);
  const [isLevel3TutorialActive, setIsLevel3TutorialActive] = useState<boolean>(false);
  const [isSetupTutorialActive, setIsSetupTutorialActive] = useState<boolean>(false);
  const [setupInitialModule, setSetupInitialModule] = useState<'clear_memory' | 'setup_calculator'>('clear_memory');
  const [isFreeUseActive, setIsFreeUseActive] = useState<boolean>(false);
  const [activeLevelId, setActiveLevelId] = useState<number>(2);

  useEffect(() => {
    onTutorialActiveChange?.(
      isFreeUseActive ||
      isSetupTutorialActive ||
      isLevel1TutorialActive ||
      isLevel2TutorialActive ||
      isLevel3TutorialActive ||
      isChallengeActive
    );
  }, [
    isFreeUseActive,
    isSetupTutorialActive,
    isLevel1TutorialActive,
    isLevel2TutorialActive,
    isLevel3TutorialActive,
    isChallengeActive,
    onTutorialActiveChange,
  ]);

  const completedCount = Object.keys(completedModules).length;
  const totalModules = CALCULATOR_LEVEL_1_MODULES.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const handleMarkComplete = (moduleId: string) => {
    const updated = { ...completedModules, [moduleId]: true };
    setCompletedModules(updated);
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleChallengeCompleted = () => {
    setChallengePassed(true);
    try {
      localStorage.setItem(STORAGE_KEY_CHALLENGE, 'true');
    } catch {
      // ignore
    }
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Reset your Calculator Lab progress for Level 1?')) {
      setCompletedModules({});
      setChallengePassed(false);
      try {
        localStorage.removeItem(STORAGE_KEY_COMPLETED);
        localStorage.removeItem(STORAGE_KEY_CHALLENGE);
      } catch {
        // ignore
      }
    }
  };

  // If in Free-Use Calculator view
  if (isFreeUseActive) {
    return <CalculatorFreeUse onBack={() => setIsFreeUseActive(false)} />;
  }

  // If in Setup Tutorial view (Clear Memory & Set Up Calculator)
  if (isSetupTutorialActive) {
    return (
      <div className="py-0">
        <CalculatorTutorialSetup
          initialModule={setupInitialModule}
          onBack={() => setIsSetupTutorialActive(false)}
        />
      </div>
    );
  }

  // If in Level 1 Tutorial view
  if (isLevel1TutorialActive) {
    return (
      <div className="py-0">
        <CalculatorTutorialLevel1
          onBack={() => setIsLevel1TutorialActive(false)}
        />
      </div>
    );
  }

  // If in Level 2 Tutorial view
  if (isLevel2TutorialActive) {
    return (
      <div className="py-0">
        <CalculatorTutorialLevel2
          onBack={() => setIsLevel2TutorialActive(false)}
        />
      </div>
    );
  }

  // If in Level 3 Tutorial view
  if (isLevel3TutorialActive) {
    return (
      <div className="py-0">
        <CalculatorTutorialLevel3
          onBack={() => setIsLevel3TutorialActive(false)}
        />
      </div>
    );
  }

  // If in Challenge view
  if (isChallengeActive) {
    return (
      <div className="py-0">
        <CalculatorChallengeView
          onBackToModules={() => setIsChallengeActive(false)}
          onChallengeCompleted={handleChallengeCompleted}
        />
      </div>
    );
  }

  // If in specific Lesson Detail view
  if (selectedModuleId) {
    const activeModule = CALCULATOR_LEVEL_1_MODULES.find(
      (m) => m.id === selectedModuleId
    );
    if (activeModule) {
      const currentIndex = CALCULATOR_LEVEL_1_MODULES.findIndex(
        (m) => m.id === selectedModuleId
      );
      const nextModule = CALCULATOR_LEVEL_1_MODULES[currentIndex + 1];

      return (
        <div className="py-6 sm:py-8">
          <CalculatorLessonDetail
            module={activeModule}
            onBack={() => setSelectedModuleId(null)}
            onNextModule={
              nextModule
                ? () => setSelectedModuleId(nextModule.id)
                : () => {
                    setSelectedModuleId(null);
                    setIsChallengeActive(true);
                  }
            }
            onMarkComplete={handleMarkComplete}
            isCompleted={!!completedModules[activeModule.id]}
          />
        </div>
      );
    }
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-2xl border border-indigo-500/30 p-6 sm:p-10 lg:p-12">
        {/* Math Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-mono select-none pointer-events-none text-sky-200">
          [ - ] vs [ ( - ) ]
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30 text-xs sm:text-sm font-black tracking-wide backdrop-blur-md">
            <Calculator className="w-4 h-4 text-amber-300" />
            <span>Classroom Hardware Training Lab</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              TI-Nspire CX Calculator Lab
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl">
              An interactive, hands-on training lab designed to help 8th-grade students master the physical TI-Nspire CX handheld calculator used in Mr. Pinilla’s classroom.
            </p>
          </div>

          {/* 4-Step Learning Structure Callout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-1">
              <span className="text-sky-300 font-black flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> 1. LEARN
              </span>
              <p className="text-slate-300 text-[11px] font-medium leading-snug">
                Visual step-by-step keypad procedures.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-1">
              <span className="text-indigo-300 font-black flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" /> 2. GUIDED
              </span>
              <p className="text-slate-300 text-[11px] font-medium leading-snug">
                Predict the next physical button or step.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-1">
              <span className="text-amber-300 font-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 3. TRY IT
              </span>
              <p className="text-slate-300 text-[11px] font-medium leading-snug">
                Execute on your physical classroom handheld.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-1">
              <span className="text-emerald-300 font-black flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 4. CHECK
              </span>
              <p className="text-slate-300 text-[11px] font-medium leading-snug">
                Verify math and calculator concepts.
              </p>
            </div>
          </div>

          {/* Primary Quick Launch: Interactive Tutorials & Free Use */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsFreeUseActive(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-95 border-2 border-amber-300"
            >
              <Calculator className="w-5 h-5 text-slate-950" />
              <span>OPEN CALCULATOR — FREE USE</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={() => {
                setSetupInitialModule('clear_memory');
                setIsSetupTutorialActive(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-95 border-2 border-teal-400"
            >
              <Settings className="w-5 h-5 text-teal-200" />
              <span>Start Setup Tutorial: Clear Memory & Float 8</span>
              <ArrowRight className="w-4 h-4 text-teal-200" />
            </button>
            <button
              onClick={() => setIsLevel1TutorialActive(true)}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-95 border-2 border-amber-300"
            >
              <Sparkles className="w-5 h-5 text-indigo-950" />
              <span>Start Level 1 Tutorial: Basics & Negatives</span>
              <ArrowRight className="w-4 h-4 text-indigo-950" />
            </button>
            <button
              onClick={() => setIsLevel2TutorialActive(true)}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-95 border-2 border-blue-400"
            >
              <Calculator className="w-5 h-5 text-sky-200" />
              <span>Start Level 2 Tutorial: Graphing & Linear</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </button>
            <button
              onClick={() => setIsLevel3TutorialActive(true)}
              className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-95 border-2 border-purple-400"
            >
              <Calculator className="w-5 h-5 text-purple-200" />
              <span>Start Level 3 Tutorial: Systems of Equations</span>
              <ArrowRight className="w-4 h-4 text-purple-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Progress & Level Selector Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Student Progress Tracker
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Level 1 Mastery: {completedCount} of {totalModules} Modules Complete ({progressPercent}%)
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            {completedCount > 0 && (
              <button
                onClick={handleResetAllProgress}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 hover:underline cursor-pointer"
              >
                Reset Progress
              </button>
            )}
            <button
              onClick={() => setIsFreeUseActive(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 border border-amber-300"
            >
              <Calculator className="w-4 h-4 text-slate-950" />
              <span>OPEN CALCULATOR — FREE USE</span>
            </button>
            <button
              onClick={() => {
                setSetupInitialModule('clear_memory');
                setIsSetupTutorialActive(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-teal-200" />
              <span>Setup Tutorial</span>
            </button>
            <button
              onClick={() => setIsLevel1TutorialActive(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 border border-amber-300"
            >
              <Calculator className="w-4 h-4 text-slate-950" />
              <span>Level 1 Tutorial</span>
            </button>
            <button
              onClick={() => setIsLevel2TutorialActive(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Level 2 Tutorial</span>
            </button>
            <button
              onClick={() => setIsLevel3TutorialActive(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Level 3 Tutorial</span>
            </button>
            <button
              onClick={() => setIsChallengeActive(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Take Basics Challenge</span>
              {challengePassed && <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">✓ Passed</span>}
            </button>
          </div>
        </div>

        {/* Level & Setup Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Setup Tutorial Card */}
          <div
            onClick={() => {
              setSetupInitialModule('clear_memory');
              setIsSetupTutorialActive(true);
            }}
            className="p-5 rounded-2xl border-2 border-teal-500 bg-teal-50/70 hover:bg-teal-50/90 shadow-md scale-[1.01] transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-600 text-white">
                Setup
              </span>
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-200">
                2 Modules
              </span>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-snug">
              Clear Memory & Set Up
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              1. Clear Memory (Delete All) & 2. Set Up Calculator (Float 8)
            </p>

            <div className="mt-3 pt-2 border-t border-teal-200/80 text-xs font-bold text-teal-700 flex items-center justify-between cursor-pointer">
              <span>Launch Setup Tutorial</span>
              <ArrowRight className="w-3.5 h-3.5 cursor-pointer" />
            </div>
          </div>
          {CALCULATOR_LEVELS.map((lvl) => {
            const isActive = lvl.id === activeLevelId;
            const isLocked = lvl.status === 'coming-soon';

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  if (lvl.id === 1) {
                    setIsLevel1TutorialActive(true);
                  } else if (lvl.id === 2) {
                    setIsLevel2TutorialActive(true);
                  } else if (lvl.id === 3) {
                    setIsLevel3TutorialActive(true);
                  } else if (!isLocked) {
                    setActiveLevelId(lvl.id);
                  }
                }}
                className={`p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  isLocked
                    ? 'bg-slate-50 border-slate-200 opacity-75 cursor-not-allowed'
                    : isActive
                    ? 'bg-blue-50/70 hover:bg-blue-50/90 border-blue-500 shadow-md scale-[1.01] cursor-pointer'
                    : 'bg-white hover:bg-slate-50 border-slate-200 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isLocked
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Level {lvl.id}
                  </span>
                  {isLocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" /> Architecture Ready
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Active Training
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {lvl.title.replace(`Level ${lvl.id}: `, '')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  {lvl.subtitle}
                </p>

                {isLocked ? (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-bold text-slate-400">
                    Prepared for future expansion
                  </div>
                ) : (
                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-blue-600 flex items-center justify-between cursor-pointer">
                    <span className="cursor-pointer">Launch {lvl.id === 1 ? 'Level 1' : lvl.id === 2 ? 'Level 2' : 'Level 3'} Tutorial</span>
                    <ArrowRight className="w-3.5 h-3.5 cursor-pointer" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Classroom Emphasis: Subtraction vs. (-) Negative Callout Banner */}
      <section className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
              ⚠️
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Crucial Classroom Skill • Special Emphasis
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Module 7: Subtraction [-] vs. the [(-)] Negative Key
              </h3>
            </div>
          </div>

          <button
            onClick={() => setSelectedModuleId('nspire-subtraction-vs-negative')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            Launch Mini-Lesson →
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-3xl">
          Students frequently confuse the right-column subtraction operator [-] with the dedicated bottom-row negative key [(-)]. Learn why entering <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-slate-900">5 - 8</code> is completely different from entering <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-slate-900">-8</code> on the physical classroom TI-Nspire CX!
        </p>
      </section>

      {/* Handheld Setup & Maintenance: Clear Memory & Float 8 Precision */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-teal-600">
              Essential Handheld Preparation
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Calculator Setup Modules (2 Modules)</span>
            </h2>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full shadow-2xs">
            Interactive Hardware Setup
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Module 1: Clear Memory */}
          <div
            onClick={() => {
              setSetupInitialModule('clear_memory');
              setIsSetupTutorialActive(true);
            }}
            className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50/60 to-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-teal-400 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center bg-teal-600 text-white">
                  1
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md border border-teal-200">
                  Pre-Test Protocol
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 leading-snug flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Clear Memory</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  Teach students how to clear the calculator before beginning work: HOME → Browse → Menu → C: Delete All → OK confirmation.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-teal-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1 font-mono text-[11px]">
                Browse → Delete All → OK
              </span>
              <span className="font-black text-teal-700 flex items-center gap-1">
                <span>Start Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Module 2: Set Up Calculator */}
          <div
            onClick={() => {
              setSetupInitialModule('setup_calculator');
              setIsSetupTutorialActive(true);
            }}
            className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center bg-blue-600 text-white">
                  2
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200">
                  Precision Standard
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 leading-snug flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Set Up Calculator (Float 8)</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  Configure the calculator for classroom precision: Scratchpad → [doc] → Settings & Status → Document Settings → Display Digits = Float 8.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-blue-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1 font-mono text-[11px]">
                Scratchpad → [doc] → Float 8
              </span>
              <span className="font-black text-blue-700 flex items-center gap-1">
                <span>Start Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Level 1 Modules Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Level 1: Calculator Basics (16 Modules)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Click any module to begin the 4-stage interactive tutorial.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-2xs">
            16 Interactive Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CALCULATOR_LEVEL_1_MODULES.map((mod) => {
            const isDone = !!completedModules[mod.id];
            const isSpecial = mod.id === 'nspire-subtraction-vs-negative';
            const isPrecision = mod.id === 'nspire-display-settings';
            const isChallenge = mod.id === 'nspire-basics-challenge';

            return (
              <div
                key={mod.id}
                onClick={() => {
                  if (isChallenge) {
                    setIsChallengeActive(true);
                  } else {
                    setSelectedModuleId(mod.id);
                  }
                }}
                className={`rounded-3xl border-2 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-300 hover:border-emerald-500'
                    : isSpecial
                    ? 'bg-amber-50/60 border-amber-300 hover:border-amber-500'
                    : isChallenge
                    ? 'bg-purple-50/60 border-purple-300 hover:border-purple-500'
                    : 'bg-white border-slate-200/90 hover:border-blue-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isSpecial
                          ? 'bg-amber-500 text-slate-950'
                          : isChallenge
                          ? 'bg-purple-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {mod.moduleNumber}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {mod.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          {mod.badge}
                        </span>
                      )}
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-2 leading-relaxed">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{mod.estimatedMinutes} min
                  </span>
                  <span
                    className={`font-black flex items-center gap-1 ${
                      isDone
                        ? 'text-emerald-700'
                        : isSpecial
                        ? 'text-amber-700'
                        : isChallenge
                        ? 'text-purple-700'
                        : 'text-blue-600'
                    }`}
                  >
                    <span>{isDone ? 'Review' : 'Start'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Numerical Precision Golden Rule Callout */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Classroom Golden Precision Rule</span>
        </div>
        <blockquote className="text-base sm:text-xl font-serif italic text-slate-100 font-semibold border-l-4 border-amber-400 pl-4 py-1">
          “Do not round during intermediate calculations. Keep the calculator value and round only when the problem tells you to.”
        </blockquote>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Module 15 is configured to teach 6-digit float precision. The exact menu configuration sequence is marked for teacher insertion and will be confirmed for our classroom.
        </p>
      </section>
    </div>
  );
};
