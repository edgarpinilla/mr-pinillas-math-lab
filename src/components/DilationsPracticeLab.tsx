import React, { useState, useEffect } from 'react';
import {
  Activity,
  Award,
  Flame,
  RotateCcw,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  Sun,
  Map,
  Shapes,
  Crosshair,
  Square,
  Grid,
  Divide,
  Code,
  Sliders,
  ChevronRight,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  PRACTICE_SKILLS,
  PracticeSkillId,
  PracticeProblem,
  generateProblemBySkill,
  VisualPayload,
  ScaleFactorGeometryData,
} from '../data/dilationsPracticeGenerator';

// Gamification Mastery Ranks
interface MasteryRank {
  minScore: number;
  title: string;
  badgeColor: string;
}

const MASTERY_RANKS: MasteryRank[] = [
  { minScore: 0, title: 'Apprentice Scaler', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300' },
  { minScore: 40, title: 'Ratio Detective', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
  { minScore: 100, title: 'Similarity Champion', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { minScore: 180, title: 'Dilation Virtuoso', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
  { minScore: 280, title: 'Grand Master Geometer', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
];

export const DilationsPracticeLab: React.FC = () => {
  // Top-level Navigation Mode: Quests vs Interactive Sandbox
  const [activeLabTab, setActiveLabTab] = useState<'quests' | 'sandbox'>('quests');

  // Gamification Stats
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);

  // Selected Skill Filter: 'all' or specific skill
  const [selectedSkill, setSelectedSkill] = useState<PracticeSkillId | 'all'>('all');

  // Current Active Question State
  const [currentProblem, setCurrentProblem] = useState<PracticeProblem>(() =>
    generateProblemBySkill('all')
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [wrongOptions, setWrongOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [earnedXpNotice, setEarnedXpNotice] = useState<string | null>(null);

  // ==========================================
  // SANDBOX STATE
  // ==========================================
  const [sandboxShape, setSandboxShape] = useState<'triangle' | 'right-triangle' | 'rectangle'>('triangle');
  const [sandboxScale, setSandboxScale] = useState<number>(2);
  const [centerMode, setCenterMode] = useState<'origin' | 'custom'>('origin');
  const [centerCustomX, setCenterCustomX] = useState<number>(2);
  const [centerCustomY, setCenterCustomY] = useState<number>(1);
  const [showSandboxRays, setShowSandboxRays] = useState<boolean>(true);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);

  // Load new problem when skill changes
  const handleSelectSkill = (skillId: PracticeSkillId | 'all') => {
    if (skillId === selectedSkill) return;
    setSelectedSkill(skillId);
    loadNewProblem(skillId);
  };

  const loadNewProblem = (skillId: PracticeSkillId | 'all' = selectedSkill) => {
    setCurrentProblem(generateProblemBySkill(skillId));
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAttemptCount(0);
    setWrongOptions([]);
    setShowHint(false);
    setEarnedXpNotice(null);
  };

  // Submit Answer Logic (Supports true 2-attempt pedagogical workflow)
  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentProblem.correctIndex;

    if (attemptCount === 0) {
      // FIRST ATTEMPT
      if (isCorrect) {
        setAttemptCount(1);
        setIsAnswerSubmitted(true);
        const points = 10;
        setScore((prev) => prev + points);
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        if (nextStreak > bestStreak) setBestStreak(nextStreak);
        setTotalAnswered((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setEarnedXpNotice('+10 XP');
      } else {
        // First incorrect attempt:
        // 1. Mark ONLY the selected incorrect answer red.
        // 2. DO NOT reveal or highlight the correct answer.
        // 3. DO NOT display the full Step-by-Step Walkthrough yet.
        // 4. Display a short scaffolded hint without giving away the answer.
        // 5. Allow student to select another answer.
        // 6. Display "Try Again — 1 attempt remaining."
        // 7. Do not award XP yet.
        setAttemptCount(1);
        setWrongOptions([selectedOption]);
        setSelectedOption(null);
        setShowHint(true);
      }
    } else if (attemptCount === 1) {
      // SECOND ATTEMPT
      if (isCorrect) {
        setAttemptCount(2);
        setIsAnswerSubmitted(true);
        const points = 5;
        setScore((prev) => prev + points);
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        if (nextStreak > bestStreak) setBestStreak(nextStreak);
        setTotalAnswered((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setEarnedXpNotice('+5 XP');
      } else {
        // Second incorrect attempt:
        // 1. Mark the second incorrect answer red.
        // 2. Reveal and highlight the correct answer in green.
        // 3. Award 0 XP (streak resets to 0).
        // 4. Display the complete Step-by-Step Walkthrough.
        // 5. Enable "Next Practice Problem".
        setAttemptCount(2);
        setWrongOptions((prev) => [...prev, selectedOption]);
        setIsAnswerSubmitted(true);
        setStreak(0);
        setTotalAnswered((prev) => prev + 1);
        setEarnedXpNotice(null);
      }
    }
  };

  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset your practice lab stats?')) {
      setScore(0);
      setStreak(0);
      setTotalAnswered(0);
      setTotalCorrect(0);
      loadNewProblem();
    }
  };

  // Calculate current rank
  const currentRank =
    [...MASTERY_RANKS].reverse().find((r) => score >= r.minScore) || MASTERY_RANKS[0];
  const nextRank = MASTERY_RANKS.find((r) => r.minScore > score);
  const progressToNext = nextRank
    ? Math.min(100, Math.round(((score - currentRank.minScore) / (nextRank.minScore - currentRank.minScore)) * 100))
    : 100;

  // ==========================================
  // SANDBOX SHAPE DEFINITIONS
  // ==========================================
  const sandboxCenter =
    centerMode === 'origin' ? { x: 0, y: 0 } : { x: centerCustomX, y: centerCustomY };

  const getSandboxPreImage = () => {
    switch (sandboxShape) {
      case 'triangle':
        return [
          { name: 'A', x: 2, y: 1 },
          { name: 'B', x: 5, y: 1 },
          { name: 'C', x: 3, y: 4 },
        ];
      case 'right-triangle':
        return [
          { name: 'A', x: 2, y: 2 },
          { name: 'B', x: 6, y: 2 },
          { name: 'C', x: 2, y: 5 },
        ];
      case 'rectangle':
        return [
          { name: 'P', x: 1, y: 1 },
          { name: 'Q', x: 4, y: 1 },
          { name: 'R', x: 4, y: 3 },
          { name: 'S', x: 1, y: 3 },
        ];
    }
  };

  const preImagePoints = getSandboxPreImage();
  const imagePoints = preImagePoints.map((p) => {
    const dx = p.x - sandboxCenter.x;
    const dy = p.y - sandboxCenter.y;
    return {
      name: `${p.name}'`,
      x: Number((sandboxCenter.x + sandboxScale * dx).toFixed(2)),
      y: Number((sandboxCenter.y + sandboxScale * dy).toFixed(2)),
      dx,
      dy,
      scaledDx: Number((dx * sandboxScale).toFixed(2)),
      scaledDy: Number((dy * sandboxScale).toFixed(2)),
    };
  });

  return (
    <div
      id="dilations-similarity-practice-lab"
      className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn"
    >
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 sm:p-7 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-black uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Unit 5 Interactive Practice Experience · TEKS 8.3ABC & 8.10D</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Dilations & Similarity Interactive Studio
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed font-medium">
              Explore hands-on coordinate dilations centered at the origin or any custom point, and master scale factors, similarity invariants, perimeter scaling by <code className="font-bold text-white bg-black/25 px-1.5 py-0.5 rounded">k</code>, area scaling by <code className="font-bold text-white bg-black/25 px-1.5 py-0.5 rounded">k²</code>, scale drawings, and shadow proportions!
            </p>
          </div>

          {/* Gamification Stats Dashboard */}
          <div className="bg-slate-950/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-4 text-white shadow-lg">
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Score</div>
              <div className="text-2xl font-black text-white flex items-center justify-center gap-1">
                <Award className="w-5 h-5 text-amber-400" />
                <span>{score} XP</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Streak</div>
              <div className="text-2xl font-black text-white flex items-center justify-center gap-1">
                <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{streak}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Accuracy</div>
              <div className="text-2xl font-black text-white">
                {totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '—'}
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div className="space-y-1 min-w-[120px]">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-200">
                <span>{currentRank.title}</span>
                <span>{progressToNext}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleResetStats}
              title="Reset Lab Stats"
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer ml-auto"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => setActiveLabTab('quests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeLabTab === 'quests'
                ? 'bg-white text-emerald-950 shadow-md scale-[1.02]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>1. Skill Mastery Quests (10 Competencies)</span>
          </button>

          <button
            onClick={() => setActiveLabTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeLabTab === 'sandbox'
                ? 'bg-white text-emerald-950 shadow-md scale-[1.02]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sliders className="w-4 h-4 text-teal-600" />
            <span>2. Origin & Non-Origin Visual Sandbox</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODE A: SKILL MASTERY QUESTS & QUESTION GENERATOR                       */}
      {/* ========================================================================= */}
      {activeLabTab === 'quests' && (
        <div className="p-5 sm:p-8 space-y-6">
          {/* Skill Filter Carousel / Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose Practice Focus Area:
              </span>
              <button
                onClick={() => loadNewProblem(selectedSkill)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Problem with New Numbers</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSelectSkill('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSkill === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🎲 Mixed Practice (All 10 Skills)
              </button>

              {PRACTICE_SKILLS.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSkill === skill.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {skill.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN PROBLEM CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INTERACTIVE VISUAL CANVAS */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 text-white flex flex-col justify-between min-h-[360px] shadow-inner overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Dynamic Mathematical Diagram</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {currentProblem.skillTitle}
                </span>
              </div>

              {/* DYNAMIC SVG RENDERER BASED ON VISUAL TYPE */}
              <div className="py-2 flex items-center justify-center min-h-[280px] w-full overflow-hidden">
                <VisualDiagramRenderer visualData={currentProblem.visualData} skillId={currentProblem.skillId} />
              </div>

              <div className="text-[11px] text-slate-400 text-center border-t border-slate-800/80 pt-2 font-medium">
                Client-side generated diagram. Diagrams reflect exact problem proportions.
              </div>
            </div>

            {/* RIGHT COLUMN: QUESTION PROMPT, OPTIONS & FEEDBACK */}
            <div className="lg:col-span-6 space-y-4">
              {/* Problem Metadata Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {currentProblem.difficulty} Challenge
                </span>
                {earnedXpNotice && (
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 animate-bounce">
                    🎉 {earnedXpNotice}!
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentProblem.question}
              </h3>

              {/* Answer Options Grid */}
              <div className="space-y-2.5 pt-1">
                {currentProblem.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentProblem.correctIndex;
                  const isWrong = wrongOptions.includes(idx);

                  let cardClasses = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                  let badgeClasses = 'bg-slate-100 text-slate-700';
                  let icon = null;

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      cardClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                      badgeClasses = 'bg-emerald-600 text-white';
                      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (isWrong || (isSelected && !isCorrect)) {
                      cardClasses = 'border-rose-300 bg-rose-50 text-rose-950';
                      badgeClasses = 'bg-rose-500 text-white';
                      icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
                    } else {
                      cardClasses = 'opacity-50 border-slate-200 bg-slate-50 text-slate-500';
                    }
                  } else {
                    // Before problem is submitted (attempt 0 or awaiting attempt 2)
                    if (isWrong) {
                      // Marked red from attempt 1, disabled, correct answer NOT revealed
                      cardClasses = 'border-rose-300 bg-rose-50 text-rose-900 cursor-not-allowed opacity-80';
                      badgeClasses = 'bg-rose-500 text-white';
                      icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
                    } else if (isSelected) {
                      cardClasses = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                      badgeClasses = 'bg-emerald-600 text-white';
                    }
                  }

                  const isDisabled = isAnswerSubmitted || isWrong;

                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-3 sm:p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition-all ${
                        isDisabled && !isAnswerSubmitted
                          ? 'cursor-not-allowed'
                          : isAnswerSubmitted
                          ? 'cursor-default'
                          : 'cursor-pointer'
                      } ${cardClasses}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${badgeClasses}`}>
                          {letter}
                        </span>
                        <span className="text-xs sm:text-sm font-medium">{option}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Try Again Banner for 1st Attempt Incorrect */}
              {attemptCount === 1 && !isAnswerSubmitted && (
                <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Try Again — 1 attempt remaining.</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                    Earn +5 XP if correct
                  </span>
                </div>
              )}

              {/* Action Buttons: Submit / Hint / Next */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isAnswerSubmitted ? (
                  <>
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                        selectedOption !== null
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 cursor-pointer active:scale-98'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{attemptCount === 0 ? 'Check Answer' : 'Check Answer (Attempt 2 of 2)'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => loadNewProblem()}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-98"
                  >
                    <span>Next Practice Problem</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Coaching Hint Banner */}
              {showHint && !isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Scaffolded Strategy Hint:</span>
                  </div>
                  <p className="leading-relaxed text-amber-800">{currentProblem.hint}</p>
                </div>
              )}

              {/* Full Step-by-Step Explanation Banner */}
              {isAnswerSubmitted && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn text-xs text-slate-800">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOption === currentProblem.correctIndex ? (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>
                          {attemptCount === 1
                            ? 'Outstanding! Correct on your first attempt (+10 XP)!'
                            : 'Great job correcting your mistake (+5 XP)!'}
                        </span>
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5" />
                        <span>Incorrect after 2 attempts. Full Step-by-Step Walkthrough:</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 pl-2 border-l-2 border-slate-300">
                    {currentProblem.solutionSteps.map((step, idx) => (
                      <div key={idx} className="leading-relaxed font-mono text-[11px] sm:text-xs">
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-black uppercase tracking-wide text-[10px] text-emerald-800 block mb-0.5">
                      Key Takeaway for STAAR:
                    </span>
                    <span className="font-medium text-xs">{currentProblem.keyTakeaway}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODE B: INTERACTIVE ORIGIN & NON-ORIGIN SCALING SANDBOX                */}
      {/* ========================================================================= */}
      {activeLabTab === 'sandbox' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Origin & Non-Origin Dilation Sandbox
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Freely move the center of dilation, choose shapes, and drag the scale factor slider to observe how projection rays and coordinate calculations adapt in real time!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: INTERACTIVE SVG COORDINATE PLANE */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 text-white shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Compass className="w-4 h-4" />
                  <span>
                    Center of Dilation: {centerMode === 'origin' ? 'Origin (0, 0)' : `Custom C(${centerCustomX}, ${centerCustomY})`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowSandboxRays(!showSandboxRays)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showSandboxRays ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>Projection Rays</span>
                  </button>
                  <button
                    onClick={() => setShowCoordinates(!showCoordinates)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showCoordinates ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>Coordinates</span>
                  </button>
                </div>
              </div>

              {/* Interactive SVG Plot */}
              <div className="flex items-center justify-center">
                <SandboxSvgGrid
                  center={sandboxCenter}
                  preImage={preImagePoints}
                  image={imagePoints}
                  scale={sandboxScale}
                  showRays={showSandboxRays}
                  showCoords={showCoordinates}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-2 border-t border-slate-800 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span>Pre-Image (Original)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span>Dilated Image</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block ring-2 ring-amber-400/40" />
                  <span>Center of Dilation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 border-b-2 border-dashed border-emerald-400/60 inline-block" />
                  <span>Projection Rays</span>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTROLS & COORDINATE CALCULATION MATRIX */}
            <div className="lg:col-span-5 space-y-5">
              {/* 1. Center of Dilation Selector */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  1. Center of Dilation:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCenterMode('origin')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      centerMode === 'origin'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Origin (0, 0)
                  </button>
                  <button
                    onClick={() => setCenterMode('custom')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      centerMode === 'custom'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Custom Point C(h, k)
                  </button>
                </div>

                {centerMode === 'custom' && (
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Center X (h): {centerCustomX}</span>
                      <div className="flex items-center gap-1">
                        {[-1, 0, 1, 2, 3].map((val) => (
                          <button
                            key={val}
                            onClick={() => setCenterCustomX(val)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer ${
                              centerCustomX === val
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Center Y (k): {centerCustomY}</span>
                      <div className="flex items-center gap-1">
                        {[-1, 0, 1, 2, 3].map((val) => (
                          <button
                            key={val}
                            onClick={() => setCenterCustomY(val)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer ${
                              centerCustomY === val
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Scale Factor Slider */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="uppercase tracking-wider text-slate-700">2. Scale Factor (k):</span>
                  <span className="text-emerald-700 font-mono text-sm bg-emerald-100 px-2 py-0.5 rounded">
                    k = {sandboxScale}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.25"
                  value={sandboxScale}
                  onChange={(e) => setSandboxScale(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[0.5, 0.75, 1, 1.5, 2, 2.5, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => setSandboxScale(val)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer ${
                        sandboxScale === val
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {val === 0.5 ? '1/2' : val === 0.75 ? '3/4' : val}
                    </button>
                  ))}
                </div>

                {/* Classification Badge */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Type:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {sandboxScale > 1
                      ? 'Enlargement (k > 1)'
                      : sandboxScale < 1
                      ? 'Reduction (0 < k < 1)'
                      : 'Congruent (k = 1)'}
                  </span>
                </div>
              </div>

              {/* 3. Shape Selector */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  3. Select Geometry Shape:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSandboxShape('triangle')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      sandboxShape === 'triangle'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Scalene △
                  </button>
                  <button
                    onClick={() => setSandboxShape('right-triangle')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      sandboxShape === 'right-triangle'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Right △
                  </button>
                  <button
                    onClick={() => setSandboxShape('rectangle')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      sandboxShape === 'rectangle'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Rectangle ▭
                  </button>
                </div>
              </div>

              {/* 4. Live Metrics: Perimeter & Area Multipliers */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <div className="text-[10px] font-black uppercase text-blue-700">Perimeter (1D)</div>
                  <div className="font-mono font-bold text-blue-900 text-sm">
                    P' = {sandboxScale} · P
                  </div>
                  <div className="text-[10px] text-blue-800">Scales directly by k</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                  <div className="text-[10px] font-black uppercase text-purple-700">Area (2D)</div>
                  <div className="font-mono font-bold text-purple-900 text-sm">
                    A' = {(sandboxScale * sandboxScale).toFixed(2)} · A
                  </div>
                  <div className="text-[10px] text-purple-800">Scales quadratically by k²</div>
                </div>
              </div>

              {/* 5. Live Coordinates Table */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800 text-[11px] font-mono overflow-x-auto">
                <div className="font-bold text-xs text-emerald-400 font-sans flex items-center justify-between">
                  <span>Transformation Coordinates:</span>
                  <span className="text-[10px] text-slate-400">
                    {centerMode === 'origin' ? '(x, y) → (kx, ky)' : 'x\' = h + k(Δx), y\' = k + k(Δy)'}
                  </span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-1">Vertex</th>
                      <th className="pb-1">Pre-Image</th>
                      <th className="pb-1">Distance (Δx, Δy)</th>
                      <th className="pb-1">Image Vertex</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imagePoints.map((p, idx) => (
                      <tr key={idx} className="border-b border-slate-800/50">
                        <td className="py-1 text-slate-300 font-bold">{p.name.replace("'", '')} → {p.name}</td>
                        <td className="py-1 text-blue-300">({preImagePoints[idx].x}, {preImagePoints[idx].y})</td>
                        <td className="py-1 text-slate-400">({p.dx}, {p.dy})</td>
                        <td className="py-1 text-emerald-300 font-bold">({p.x}, {p.y})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: Dynamic Visual Diagram Renderer for Skill Quests
// =========================================================================
interface VisualDiagramRendererProps {
  visualData: VisualPayload;
  skillId?: PracticeSkillId | 'all';
}

const VisualDiagramRenderer: React.FC<VisualDiagramRendererProps> = ({ visualData, skillId }) => {
  // CRITICAL ARCHITECTURAL SAFETY:
  // Algebraic Rules MUST NEVER use similar-triangles or any side-length diagrams.
  // It must always render an authentic coordinate plane dilation grid.
  if (skillId === 'algebraic-rules' || visualData.type === 'coordinate-grid') {
    if (visualData.gridData) {
      return <GridDiagram grid={visualData.gridData} />;
    }
  }

  switch (visualData.type) {
    case 'coordinate-grid':
      return <GridDiagram grid={visualData.gridData!} />;
    case 'shadow-scene':
      return <ShadowDiagram shadow={visualData.shadowData!} />;
    case 'scale-drawing':
      return <ScaleDrawingDiagram drawing={visualData.scaleDrawingData!} />;
    case 'similar-triangles':
      return <SimilarTrianglesDiagram data={visualData.similarTrianglesData!} />;
    case 'perimeter-area-compare':
      return <PerimeterAreaDiagram data={visualData.compareData!} />;
    case 'scale-factor-geometry':
      return <ScaleFactorGeometricDiagram data={visualData.scaleFactorGeometryData!} />;
    default:
      return null;
  }
};

// 1. Grid Diagram for Coordinate Dilations
const GridDiagram: React.FC<{ grid: NonNullable<VisualPayload['gridData']> }> = ({ grid }) => {
  // SVG Viewport Dimensions
  const width = 380;
  const height = 290;
  const padLeft = 28;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 22;

  // Resolve image points (if not explicitly passed)
  const imagePts =
    grid.image && grid.image.length > 0
      ? grid.image
      : grid.preImage.map((pt, i) => {
          const k = grid.scaleFactor;
          const imgX = Number((grid.center.x + k * (pt.x - grid.center.x)).toFixed(2));
          const imgY = Number((grid.center.y + k * (pt.y - grid.center.y)).toFixed(2));
          return {
            x: imgX,
            y: imgY,
            label: pt.label ? `${pt.label.split('(')[0]}'(${imgX}, ${imgY})` : `P${i + 1}'`,
          };
        });

  // Collect all geometric points: (0, 0), center, pre-image vertices, and image vertices
  const allPts: { x: number; y: number }[] = [
    { x: 0, y: 0 },
    grid.center,
    ...grid.preImage,
    ...imagePts,
  ];

  // Dynamically calculate coordinate bounds from ACTUAL coordinates of the current problem
  const rawMinX = Math.min(...allPts.map((p) => p.x));
  const rawMaxX = Math.max(...allPts.map((p) => p.x));
  const rawMinY = Math.min(...allPts.map((p) => p.y));
  const rawMaxY = Math.max(...allPts.map((p) => p.y));

  const geomSpanX = Math.max(1, rawMaxX - rawMinX);
  const geomSpanY = Math.max(1, rawMaxY - rawMinY);

  // Calibrate margins to occupy ~70-80% of viewport with ~10-15% visual padding around geometry
  const rightPad = Math.max(1, Math.ceil(geomSpanX * 0.14));
  const leftPad = rawMinX < 0 ? Math.max(1, Math.ceil(geomSpanX * 0.14)) : (geomSpanX > 14 ? 2 : 1);
  const topPad = Math.max(1, Math.ceil(geomSpanY * 0.14));
  const bottomPad = rawMinY < 0 ? Math.max(1, Math.ceil(geomSpanY * 0.14)) : (geomSpanY > 14 ? 2 : 1);

  const minX = rawMinX < 0 ? Math.floor(rawMinX - leftPad) : -leftPad;
  const maxX = Math.ceil(rawMaxX + rightPad);
  const minY = rawMinY < 0 ? Math.floor(rawMinY - bottomPad) : -bottomPad;
  const maxY = Math.ceil(rawMaxY + topPad);

  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Preserve strict 1:1 mathematical aspect ratio (proportional scaling)
  const unitSize = Math.min(plotW / rangeX, plotH / rangeY);

  const actualPlotW = unitSize * rangeX;
  const actualPlotH = unitSize * rangeY;

  // Center plot within the padded viewport
  const offsetX = padLeft + (plotW - actualPlotW) / 2;
  const offsetY = padTop + (plotH - actualPlotH) / 2;

  const toSvgX = (x: number) => offsetX + (x - minX) * unitSize;
  const toSvgY = (y: number) => offsetY + (maxY - y) * unitSize;

  const centerX = toSvgX(grid.center.x);
  const centerY = toSvgY(grid.center.y);

  // Dynamic grid line density and tick intervals based on actual problem range
  const maxRange = Math.max(rangeX, rangeY);
  const gridStep = maxRange > 24 ? 2 : 1;
  const tickStep = maxRange > 18 ? 5 : maxRange > 10 ? 2 : 1;

  const isEnlargement = grid.scaleFactor > 1;

  // Intelligent label positioning: outer along ray, inner perpendicular to ray
  const getPlacement = (ptSvgX: number, ptSvgY: number, isOuter: boolean) => {
    const dx = ptSvgX - centerX;
    const dy = ptSvgY - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist < 1) {
      return {
        x: Math.max(8, Math.min(width - 8, ptSvgX + 8)),
        y: Math.max(12, Math.min(height - 8, ptSvgY - 8)),
        textAnchor: 'start' as const,
        dominantBaseline: 'auto' as const,
      };
    }

    const ux = dx / dist;
    const uy = dy / dist;
    const nx = -uy;
    const ny = ux;

    let lx: number;
    let ly: number;
    let textAnchor: 'start' | 'end' | 'middle';
    let dominantBaseline: 'hanging' | 'auto' | 'central';

    if (isOuter) {
      const offset = Math.max(9, Math.min(13, unitSize * 0.45));
      lx = ptSvgX + ux * offset;
      ly = ptSvgY + uy * offset;
      textAnchor = ux > 0.25 ? 'start' : ux < -0.25 ? 'end' : 'middle';
      dominantBaseline = uy > 0.25 ? 'hanging' : uy < -0.25 ? 'auto' : 'central';
    } else {
      const offset = Math.max(8, Math.min(12, unitSize * 0.4));
      lx = ptSvgX + nx * offset;
      ly = ptSvgY + ny * offset;
      textAnchor = nx > 0.2 ? 'start' : nx < -0.2 ? 'end' : 'middle';
      dominantBaseline = ny > 0.25 ? 'hanging' : ny < -0.25 ? 'auto' : 'central';
    }

    return {
      x: Math.max(8, Math.min(width - 8, lx)),
      y: Math.max(10, Math.min(height - 8, ly)),
      textAnchor,
      dominantBaseline,
    };
  };

  // Position center/origin label clearly
  const centerLabelX = centerX < 70 ? centerX + 8 : centerX - 8;
  const centerAnchor: 'start' | 'end' = centerX < 70 ? 'start' : 'end';
  const centerLabelY = centerY > height - 35 ? centerY - 8 : centerY + 14;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      className="w-full max-w-[400px] h-auto max-h-[300px] select-none rounded-lg bg-slate-950/60 overflow-hidden"
    >
      {/* Grid Lines */}
      {Array.from({ length: Math.floor((maxX - minX) / gridStep) + 1 }).map((_, i) => {
        const xVal = minX + i * gridStep;
        return (
          <line
            key={`vl-${i}`}
            x1={toSvgX(xVal)}
            y1={toSvgY(minY)}
            x2={toSvgX(xVal)}
            y2={toSvgY(maxY)}
            stroke="#334155"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        );
      })}
      {Array.from({ length: Math.floor((maxY - minY) / gridStep) + 1 }).map((_, i) => {
        const yVal = minY + i * gridStep;
        return (
          <line
            key={`hl-${i}`}
            x1={toSvgX(minX)}
            y1={toSvgY(yVal)}
            x2={toSvgX(maxX)}
            y2={toSvgY(yVal)}
            stroke="#334155"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        );
      })}

      {/* Main Axes */}
      <line
        x1={toSvgX(minX)}
        y1={toSvgY(0)}
        x2={toSvgX(maxX)}
        y2={toSvgY(0)}
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <line
        x1={toSvgX(0)}
        y1={toSvgY(minY)}
        x2={toSvgX(0)}
        y2={toSvgY(maxY)}
        stroke="#64748b"
        strokeWidth="1.5"
      />

      {/* Axis Direction Indicators */}
      <text
        x={toSvgX(maxX) - 2}
        y={toSvgY(0) + 12}
        fill="#94a3b8"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="end"
      >
        x
      </text>
      <text
        x={toSvgX(0) - 6}
        y={toSvgY(maxY) + 10}
        fill="#94a3b8"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="end"
      >
        y
      </text>

      {/* Tick numbers on axes */}
      {Array.from({ length: Math.floor((maxX - minX) / tickStep) + 1 }).map((_, i) => {
        const xVal = Math.floor(minX / tickStep) * tickStep + i * tickStep;
        if (xVal === 0 || xVal < minX || xVal > maxX) return null;
        return (
          <text
            key={`xtick-${xVal}`}
            x={toSvgX(xVal)}
            y={toSvgY(0) + 11}
            fill="#64748b"
            fontSize="8"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {xVal}
          </text>
        );
      })}
      {Array.from({ length: Math.floor((maxY - minY) / tickStep) + 1 }).map((_, i) => {
        const yVal = Math.floor(minY / tickStep) * tickStep + i * tickStep;
        if (yVal === 0 || yVal < minY || yVal > maxY) return null;
        return (
          <text
            key={`ytick-${yVal}`}
            x={toSvgX(0) - 5}
            y={toSvgY(yVal) + 3}
            fill="#64748b"
            fontSize="8"
            fontFamily="sans-serif"
            textAnchor="end"
          >
            {yVal}
          </text>
        );
      })}

      {/* Projection Rays (origin through pre-image and image) */}
      {grid.showRays &&
        grid.preImage.map((pt, i) => {
          const imgPt = imagePts[i];
          if (!imgPt) return null;
          const farX = grid.scaleFactor >= 1 ? imgPt.x : pt.x;
          const farY = grid.scaleFactor >= 1 ? imgPt.y : pt.y;
          return (
            <line
              key={`ray-${i}`}
              x1={centerX}
              y1={centerY}
              x2={toSvgX(farX)}
              y2={toSvgY(farY)}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.6"
            />
          );
        })}

      {/* Center of Dilation Marker (Orange) */}
      <circle cx={centerX} cy={centerY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      <text
        x={Math.max(8, Math.min(width - 8, centerLabelX))}
        y={Math.max(10, Math.min(height - 8, centerLabelY))}
        textAnchor={centerAnchor}
        fill="#f59e0b"
        stroke="#090d16"
        strokeWidth="3.5"
        paintOrder="stroke"
        strokeLinejoin="round"
        fontSize="10"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {grid.center.label || 'Origin (0, 0)'}
      </text>

      {/* Pre-Image Polygon (Blue) */}
      {(grid.geometryType === 'triangle' || grid.geometryType === 'quadrilateral' || (!grid.geometryType && grid.preImage.length >= 3)) && (
        <polygon
          points={grid.preImage.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
          fill="rgba(59, 130, 246, 0.25)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
      )}
      {grid.preImage.map((pt, i) => {
        const svgX = toSvgX(pt.x);
        const svgY = toSvgY(pt.y);
        const isOuter = !isEnlargement;
        const pos = getPlacement(svgX, svgY, isOuter);
        return (
          <g key={`pre-${i}`}>
            <circle cx={svgX} cy={svgY} r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor={pos.textAnchor}
              dominantBaseline={pos.dominantBaseline}
              fill="#93c5fd"
              stroke="#090d16"
              strokeWidth="3.5"
              paintOrder="stroke"
              strokeLinejoin="round"
              fontSize={maxRange > 20 ? '9' : '10'}
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {pt.label || `P${i + 1}`}
            </text>
          </g>
        );
      })}

      {/* Dilated Image Polygon (Green) */}
      {(grid.geometryType === 'triangle' || grid.geometryType === 'quadrilateral' || (!grid.geometryType && imagePts.length >= 3)) && (
        <polygon
          points={imagePts.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
          fill="rgba(16, 185, 129, 0.25)"
          stroke="#10b981"
          strokeWidth="2"
        />
      )}
      {imagePts.map((pt, i) => {
        const svgX = toSvgX(pt.x);
        const svgY = toSvgY(pt.y);
        const isOuter = isEnlargement;
        const pos = getPlacement(svgX, svgY, isOuter);
        return (
          <g key={`img-${i}`}>
            <circle cx={svgX} cy={svgY} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor={pos.textAnchor}
              dominantBaseline={pos.dominantBaseline}
              fill="#6ee7b7"
              stroke="#090d16"
              strokeWidth="3.5"
              paintOrder="stroke"
              strokeLinejoin="round"
              fontSize={maxRange > 20 ? '9' : '10'}
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {pt.label || `P'${i + 1}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 2. Shadow Indirect Measurement Diagram
const ShadowDiagram: React.FC<{ shadow: NonNullable<VisualPayload['shadowData']> }> = ({ shadow }) => {
  const type = shadow.objectType || 'tree';
  const layout = shadow.layout || 'student-left';
  const isFlipped = layout === 'student-right'; // Layout B: object on LEFT, student on RIGHT
  const groundY = 195;
  const slope = 1.353; // slope of sun rays (Delta y / Delta x)

  const isHoop = type === 'hoop';

  // Base parameters in canonical coordinates (Layout A)
  const yStudentTop = 149;
  const studentShadowW = Math.round((groundY - yStudentTop) / slope); // 34px
  const yObjTop = isHoop ? 107 : 63;
  const objShadowW = Math.round((groundY - yObjTop) / slope); // 65px (hoop) or 98px (others)

  // Layout A: Sun on top-left (38, 30), Student on LEFT (70), Object on RIGHT (228 / 235), shadows cast RIGHT
  // Layout B: Sun on top-right (342, 30), Object on LEFT (152 / 145), Student on RIGHT (310), shadows cast LEFT
  const sunCx = isFlipped ? 342 : 38;
  const sunCy = 30;

  // Student positions
  const xStudent = isFlipped ? 310 : 70;
  const xStudentShadowTip = isFlipped ? xStudent - studentShadowW : xStudent + studentShadowW;
  const dimXStudent = isFlipped ? 338 : 42;

  // Object positions
  const xObj = isFlipped ? (isHoop ? 145 : 152) : (isHoop ? 235 : 228);
  const xObjShadowTip = isFlipped ? xObj - objShadowW : xObj + objShadowW;
  const dimXObj = isFlipped ? (isHoop ? 64 : 36) : (isHoop ? 316 : 344);

  // Direction multiplier for right-angle marks and symbols (1 = rightward, -1 = leftward)
  const dir = isFlipped ? -1 : 1;

  const capitalizedShortName = shadow.objectShortName.charAt(0).toUpperCase() + shadow.objectShortName.slice(1);

  return (
    <svg width="100%" height="260" viewBox="0 0 380 260" className="overflow-visible select-none max-w-full">
      {/* Sky & Sun */}
      <circle cx={sunCx} cy={sunCy} r="16" fill="#fbbf24" />
      <circle cx={sunCx} cy={sunCy} r="23" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />
      {/* Sun Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = sunCx + Math.cos(rad) * 19;
        const y1 = sunCy + Math.sin(rad) * 19;
        const x2 = sunCx + Math.cos(rad) * 26;
        const y2 = sunCy + Math.sin(rad) * 26;
        return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />;
      })}

      {/* Sun rays condition badge */}
      <g transform="translate(190, 20)">
        <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x="0" y="4" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
          Parallel Sun Rays (Same Angle θ)
        </text>
      </g>

      {/* Ground Line */}
      <line x1="12" y1={groundY} x2="368" y2={groundY} stroke="#65a30d" strokeWidth="3.5" strokeLinecap="round" />

      {/* ========================================================= */}
      {/* 1. STUDENT (REFERENCE FIGURE) */}
      {/* ========================================================= */}
      {/* Title */}
      <text x={xStudent} y={yStudentTop - 11} fill="#93c5fd" fontSize="11" fontWeight="900" textAnchor="middle">
        Student
      </text>

      {/* Student Figure (Mirrored cleanly when in Layout B) */}
      <g id="shadow-student-figure" transform={isFlipped ? 'translate(380, 0) scale(-1, 1)' : undefined}>
        <circle cx="70" cy="155" r="6.5" fill="#60a5fa" />
        <line x1="70" y1="161.5" x2="70" y2="178" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="169" x2="78" y2="169" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="70" y1="178" x2="64" y2={groundY} stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="178" x2="76" y2={groundY} stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Student Height Dimension */}
      <line x1={dimXStudent} y1={yStudentTop} x2={dimXStudent} y2={groundY} stroke="#93c5fd" strokeWidth="1.5" />
      <line x1={dimXStudent - 4} y1={yStudentTop} x2={dimXStudent + 4} y2={yStudentTop} stroke="#93c5fd" strokeWidth="1.5" />
      <line x1={dimXStudent - 4} y1={groundY} x2={dimXStudent + 4} y2={groundY} stroke="#93c5fd" strokeWidth="1.5" />
      <text
        x={isFlipped ? dimXStudent + 6 : dimXStudent - 6}
        y="176"
        fill="#93c5fd"
        fontSize="11"
        fontWeight="bold"
        textAnchor={isFlipped ? 'start' : 'end'}
      >
        {shadow.personHeight} {shadow.unit}
      </text>

      {/* Right Angle Symbol at Student Base */}
      <path
        d={`M ${xStudent} ${groundY - 8} L ${xStudent + 8 * dir} ${groundY - 8} L ${xStudent + 8 * dir} ${groundY}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.2"
      />

      {/* Student Ground Shadow */}
      <line x1={xStudent} y1={groundY} x2={xStudentShadowTip} y2={groundY} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <text x={(xStudent + xStudentShadowTip) / 2} y="212" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
        {shadow.personShadow} {shadow.unit} shadow
      </text>

      {/* Student Sun Ray (Hypotenuse) */}
      <line
        x1={xStudent}
        y1={yStudentTop}
        x2={xStudentShadowTip}
        y2={groundY}
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeDasharray="3,3"
        opacity="0.85"
      />

      {/* Angle θ at Student Shadow Tip */}
      <path
        d={
          !isFlipped
            ? `M ${xStudentShadowTip - 8} ${groundY} A 8 8 0 0 1 ${xStudentShadowTip - 5} ${groundY - 6}`
            : `M ${xStudentShadowTip + 8} ${groundY} A 8 8 0 0 0 ${xStudentShadowTip + 5} ${groundY - 6}`
        }
        fill="none"
        stroke="#fde047"
        strokeWidth="1.5"
      />
      <text
        x={!isFlipped ? xStudentShadowTip + 3 : xStudentShadowTip - 11}
        y={groundY - 3}
        fill="#fde047"
        fontSize="9"
        fontWeight="bold"
      >
        θ
      </text>

      {/* ========================================================= */}
      {/* 2. DYNAMIC OBJECT VISUAL SCENARIO */}
      {/* ========================================================= */}
      {/* Title */}
      <text x={xObj} y={yObjTop - 11} fill="#6ee7b7" fontSize="11" fontWeight="900" textAnchor="middle">
        {shadow.objectShortName.toUpperCase()}
      </text>

      {/* Scenario Graphics (Mirrored cleanly when in Layout B) */}
      <g id="shadow-obj-figure" transform={isFlipped ? 'translate(380, 0) scale(-1, 1)' : undefined}>
        {type === 'tree' && (
          <g id="shadow-obj-tree">
            {/* Trunk */}
            <rect x="222" y="110" width="12" height="85" fill="#78350f" rx="2" stroke="#451a03" strokeWidth="1" />
            <line x1="226" y1="125" x2="226" y2="185" stroke="#542307" strokeWidth="1" />
            <line x1="230" y1="135" x2="230" y2="175" stroke="#542307" strokeWidth="1" />
            {/* Canopy Puffs */}
            <circle cx="228" cy="100" r="30" fill="#15803d" />
            <circle cx="212" cy="112" r="22" fill="#16a34a" />
            <circle cx="244" cy="112" r="22" fill="#16a34a" />
            <circle cx="228" cy="80" r="24" fill="#22c55e" />
            <circle cx="220" cy="74" r="14" fill="#4ade80" opacity="0.6" />
          </g>
        )}

        {type === 'building' && (
          <g id="shadow-obj-building">
            {/* School Building Facade */}
            <rect x="198" y="75" width="60" height="120" rx="3" fill="#7f1d1d" stroke="#991b1b" strokeWidth="1.5" />
            {/* Roof Pediment */}
            <polygon points="194,75 228,55 262,75" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            {/* Cupola & Bell */}
            <rect x="223" y="42" width="10" height="14" fill="#475569" rx="1" />
            <circle cx="228" cy="49" r="3" fill="#f59e0b" />
            <polygon points="221,42 228,34 235,42" fill="#cbd5e1" />
            {/* Windows Top Row */}
            <rect x="206" y="85" width="13" height="13" rx="1.5" fill="#93c5fd" stroke="#1e293b" strokeWidth="1" />
            <line x1="212.5" y1="85" x2="212.5" y2="98" stroke="#1e293b" strokeWidth="1" />
            <line x1="206" y1="91.5" x2="219" y2="91.5" stroke="#1e293b" strokeWidth="1" />
            <rect x="237" y="85" width="13" height="13" rx="1.5" fill="#93c5fd" stroke="#1e293b" strokeWidth="1" />
            <line x1="243.5" y1="85" x2="243.5" y2="98" stroke="#1e293b" strokeWidth="1" />
            <line x1="237" y1="91.5" x2="250" y2="91.5" stroke="#1e293b" strokeWidth="1" />
            {/* Windows Mid Row */}
            <rect x="206" y="112" width="13" height="13" rx="1.5" fill="#93c5fd" stroke="#1e293b" strokeWidth="1" />
            <line x1="212.5" y1="112" x2="212.5" y2="125" stroke="#1e293b" strokeWidth="1" />
            <line x1="206" y1="118.5" x2="219" y2="118.5" stroke="#1e293b" strokeWidth="1" />
            <rect x="237" y="112" width="13" height="13" rx="1.5" fill="#93c5fd" stroke="#1e293b" strokeWidth="1" />
            <line x1="243.5" y1="112" x2="243.5" y2="125" stroke="#1e293b" strokeWidth="1" />
            <line x1="237" y1="118.5" x2="250" y2="118.5" stroke="#1e293b" strokeWidth="1" />
            {/* Double Entrance Doors */}
            <rect x="218" y="165" width="20" height="30" fill="#382215" rx="1" stroke="#5c361b" strokeWidth="1" />
            <rect x="220" y="168" width="6" height="11" fill="#bfdbfe" />
            <rect x="230" y="168" width="6" height="11" fill="#bfdbfe" />
            <circle cx="226" cy="183" r="1" fill="#f59e0b" />
            <circle cx="230" cy="183" r="1" fill="#f59e0b" />
            <rect x="215" y="193" width="26" height="2" fill="#94a3b8" />
          </g>
        )}

        {type === 'flagpole' && (
          <g id="shadow-obj-flagpole">
            {/* Concrete Base */}
            <rect x="220" y="187" width="16" height="8" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
            {/* Mast */}
            <line x1="228" y1="65" x2="228" y2="187" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
            {/* Gold Finial Ball */}
            <circle cx="228" cy="63" r="4.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            {/* Waving Flag */}
            <path d="M 228 66 Q 235 64 242 67 L 242 88 Q 235 85 228 87 Z" fill="#2563eb" />
            <circle cx="235" cy="76" r="2" fill="#ffffff" />
            <path d="M 242 67 Q 251 70 260 67 L 260 77 Q 251 80 242 77 Z" fill="#ef4444" />
            <path d="M 242 77 Q 251 80 260 77 L 260 88 Q 251 91 242 88 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
            {/* Halyard Cord */}
            <line x1="229" y1="65" x2="229" y2="187" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
          </g>
        )}

        {type === 'lightpole' && (
          <g id="shadow-obj-lightpole">
            {/* Base */}
            <rect x="221" y="186" width="14" height="9" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <circle cx="224" cy="192" r="1" fill="#94a3b8" />
            <circle cx="232" cy="192" r="1" fill="#94a3b8" />
            {/* Tall Steel Pole */}
            <line x1="228" y1="75" x2="228" y2="186" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            {/* Curved Gooseneck Arm */}
            <path d="M 228 85 C 228 63, 215 63, 204 65" fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
            {/* Luminaire Head */}
            <rect x="194" y="62" width="18" height="7" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
            <ellipse cx="203" cy="69" rx="6" ry="2" fill="#fef08a" />
            {/* Subtle Light Beam */}
            <polygon points="196,70 210,70 220,115 186,115" fill="rgba(254, 240, 138, 0.08)" />
          </g>
        )}

        {type === 'monument' && (
          <g id="shadow-obj-monument">
            {/* Multi-tier Foundation */}
            <rect x="210" y="186" width="36" height="9" rx="1" fill="#334155" stroke="#475569" strokeWidth="1" />
            <rect x="214" y="177" width="28" height="9" rx="1" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <rect x="220" y="180" width="16" height="4" fill="#d97706" rx="0.5" />
            {/* Obelisk Shaft */}
            <polygon points="217,177 228,177 228,76 221,76" fill="#64748b" />
            <polygon points="228,177 239,177 235,76 228,76" fill="#94a3b8" />
            {/* Pyramidion Top */}
            <polygon points="221,76 228,76 228,63" fill="#94a3b8" />
            <polygon points="228,76 235,76 228,63" fill="#cbd5e1" />
          </g>
        )}

        {type === 'hoop' && (
          <g id="shadow-obj-hoop">
            {/* Base Protective Padding */}
            <rect x="230" y="170" width="10" height="25" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
            {/* Main Upright Steel Post */}
            <line x1="235" y1="120" x2="235" y2="170" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
            {/* Gooseneck Overhang Extension */}
            <path d="M 235 135 L 216 122" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="235" y1="145" x2="216" y2="134" stroke="#475569" strokeWidth="2.5" />
            {/* Regulation Backboard */}
            <rect x="213" y="107" width="3.5" height="34" rx="1" fill="#f8fafc" stroke="#0f172a" strokeWidth="1" />
            <line x1="213" y1="120" x2="213" y2="132" stroke="#ef4444" strokeWidth="2.5" />
            {/* Orange Rim */}
            <line x1="213" y1="131" x2="198" y2="131" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
            <circle cx="212" cy="131" r="2" fill="#ea580c" />
            {/* White Net */}
            <path d="M 213 131 L 210 144 L 201 144 L 198 131 Z" fill="rgba(255,255,255,0.18)" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" />
          </g>
        )}
      </g>

      {/* Right Angle Symbol at Object Base */}
      <path
        d={`M ${xObj} ${groundY - 8} L ${xObj + 8 * dir} ${groundY - 8} L ${xObj + 8 * dir} ${groundY}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="1.2"
      />

      {/* Object Height Dimension */}
      <line x1={dimXObj} y1={yObjTop} x2={dimXObj} y2={groundY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1={dimXObj - 4} y1={yObjTop} x2={dimXObj + 4} y2={yObjTop} stroke="#f59e0b" strokeWidth="1.5" />
      <line x1={dimXObj - 4} y1={groundY} x2={dimXObj + 4} y2={groundY} stroke="#f59e0b" strokeWidth="1.5" />
      <text
        x={isFlipped ? dimXObj - 6 : dimXObj + 6}
        y={(yObjTop + groundY) / 2 + 4}
        fill="#fcd34d"
        fontSize="11"
        fontWeight="900"
        textAnchor={isFlipped ? 'end' : 'start'}
      >
        {shadow.objectHeight ? `${shadow.objectHeight} ${shadow.unit}` : 'Height = ?'}
      </text>

      {/* Object Ground Shadow */}
      <line x1={xObj} y1={groundY} x2={xObjShadowTip} y2={groundY} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <text x={(xObj + xObjShadowTip) / 2} y="212" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
        {shadow.objectShadow} {shadow.unit} shadow
      </text>

      {/* Object Sun Ray (Hypotenuse - exactly parallel to Student ray) */}
      <line
        x1={xObj}
        y1={yObjTop}
        x2={xObjShadowTip}
        y2={groundY}
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeDasharray="3,3"
        opacity="0.85"
      />

      {/* Angle θ at Object Shadow Tip */}
      <path
        d={
          !isFlipped
            ? `M ${xObjShadowTip - 8} ${groundY} A 8 8 0 0 1 ${xObjShadowTip - 5} ${groundY - 6}`
            : `M ${xObjShadowTip + 8} ${groundY} A 8 8 0 0 0 ${xObjShadowTip + 5} ${groundY - 6}`
        }
        fill="none"
        stroke="#fde047"
        strokeWidth="1.5"
      />
      <text
        x={!isFlipped ? xObjShadowTip + 3 : xObjShadowTip - 11}
        y={groundY - 3}
        fill="#fde047"
        fontSize="9"
        fontWeight="bold"
      >
        θ
      </text>

      {/* Bottom Summary Bar */}
      <text x="190" y="242" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">
        {isFlipped
          ? `△ ${capitalizedShortName} & Shadow ~ △ Student & Shadow (AA Similarity)`
          : `△ Student & Shadow ~ △ ${capitalizedShortName} & Shadow (AA Similarity)`}
      </text>
    </svg>
  );
};

// 3. Scale Drawing / Blueprint Diagram
const ScaleDrawingDiagram: React.FC<{ drawing: NonNullable<VisualPayload['scaleDrawingData']> }> = ({ drawing }) => {
  return (
    <div className="w-full max-w-xs bg-slate-950 p-4 rounded-xl border border-cyan-800/80 shadow-md font-mono text-xs space-y-3">
      <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
        <span className="flex items-center gap-1.5">
          <Map className="w-4 h-4" />
          <span>{drawing.drawingLabel}</span>
        </span>
        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
          Scale: {drawing.scaleRatio}
        </span>
      </div>

      <div className="h-32 bg-cyan-950/40 rounded-lg border border-dashed border-cyan-700/60 relative p-3 flex flex-col justify-between">
        <div className="text-[10px] text-slate-400">Architectural Grid [1/4" = 1']</div>
        <div className="border border-cyan-400 bg-cyan-500/20 p-2 rounded text-center text-white font-bold text-xs">
          Patio Dimension: <span className="text-emerald-300">{drawing.drawingMeasurement}</span>
        </div>
        <div className="text-[10px] text-right text-slate-400">Actual Real-World Length: ?</div>
      </div>

      <div className="text-[11px] text-slate-300 flex items-center justify-between bg-slate-900 p-2 rounded">
        <span>Map Scale Key:</span>
        <span className="font-bold text-emerald-400">{drawing.scaleRatio}</span>
      </div>
    </div>
  );
};

// 4. Similar Triangles Diagram
const SimilarTrianglesDiagram: React.FC<{ data: NonNullable<VisualPayload['similarTrianglesData']> }> = ({ data }) => {
  const { triangleA, triangleB, scaleFactor: k } = data;

  // 1. Pre-image is always unprimed letters, dilated image is primed letters
  const cleanA = triangleA.name.replace(/[^A-Za-z]/g, '');
  const lettersA = cleanA.length >= 3
    ? [cleanA[cleanA.length - 3], cleanA[cleanA.length - 2], cleanA[cleanA.length - 1]]
    : ['A', 'B', 'C'];

  const cleanB = triangleB.name.replace(/[^A-Za-z]/g, '');
  const lettersB = cleanB.length >= 3 && cleanB !== cleanA
    ? [cleanB[cleanB.length - 3] + "'", cleanB[cleanB.length - 2] + "'", cleanB[cleanB.length - 1] + "'"]
    : [lettersA[0] + "'", lettersA[1] + "'", lettersA[2] + "'"];

  // 2. Corresponding angles remain congruent
  const angle0 = triangleA.angles[0] || 50; // bottom-left angle
  const angle1 = triangleA.angles[1] || 60; // bottom-right angle
  const rad0 = (angle0 * Math.PI) / 180;
  const rad1 = (angle1 * Math.PI) / 180;
  const sinSum = Math.sin(rad0 + rad1) || 1;

  // Trigonometric shape computation for any base b
  const calcHeight = (b: number) => (b * Math.sin(rad0) * Math.sin(rad1)) / sinSum;
  const calcTopOffsetX = (b: number) => (b * Math.cos(rad0) * Math.sin(rad1)) / sinSum;

  // 3. Proportional visual base sizing:
  // If 0 < k < 1: Pre-image A is visually larger, Image B is visually smaller
  // If k > 1: Image B is visually larger, Pre-image A is visually smaller
  let baseA: number;
  let baseB: number;

  if (k < 1) {
    baseA = 130;
    const visualRatio = Math.max(0.42, Math.min(0.85, k));
    baseB = Math.round(baseA * visualRatio);
  } else if (k > 1) {
    baseB = 135;
    const visualRatio = Math.min(2.3, Math.max(1.25, k));
    baseA = Math.round(baseB / visualRatio);
  } else {
    baseA = 100;
    baseB = 100;
  }

  const yBase = 195;
  const cxA = 95;
  const cxB = 280;

  // Triangle A coordinates
  const xA0 = Math.round(cxA - baseA / 2);
  const xA1 = xA0 + baseA;
  const hA = calcHeight(baseA);
  const xA2 = Math.round(xA0 + calcTopOffsetX(baseA));
  const yA2 = Math.round(yBase - hA);

  // Triangle B coordinates
  const xB0 = Math.round(cxB - baseB / 2);
  const xB1 = xB0 + baseB;
  const hB = calcHeight(baseB);
  const xB2 = Math.round(xB0 + calcTopOffsetX(baseB));
  const yB2 = Math.round(yBase - hB);

  // Angle arc radii (responsive to base size)
  const arcRadiusA = Math.min(18, Math.max(12, baseA * 0.16));
  const arcRadiusB = Math.min(18, Math.max(12, baseB * 0.16));

  // Side lengths: image length = k * pre-image length
  const sideA0 = triangleA.sides[0];
  const sideB0 = triangleB.sides[0];
  const sideA1 = triangleA.sides[1];
  const sideB1 = triangleB.sides[1];

  return (
    <svg width="100%" height="240" viewBox="0 0 380 240" className="overflow-visible select-none max-w-full">
      {/* Title Header Pre-Image */}
      <text x={cxA} y="24" fill="#93c5fd" fontSize="12" fontWeight="900" textAnchor="middle">
        {triangleA.name} (Pre-Image)
      </text>

      {/* Title Header Image with scale factor */}
      <text x={cxB} y="24" fill="#6ee7b7" fontSize="12" fontWeight="900" textAnchor="middle">
        {triangleB.name} (Image, k = {k})
      </text>

      {/* Central Dilation Transformation Indicator */}
      <g transform="translate(187, 100)">
        <rect x="-34" y="-18" width="68" height="36" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x="0" y="-3" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">
          DILATION
        </text>
        <text x="0" y="11" fill={k >= 1 ? '#34d399' : '#38bdf8'} fontSize="11" fontWeight="900" textAnchor="middle">
          k = {k}
        </text>
        <path d="M -14 23 L 14 23 M 8 19 L 14 23 L 8 27" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Triangle A (Pre-Image) */}
      <polygon
        points={`${xA0},${yBase} ${xA1},${yBase} ${xA2},${yA2}`}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Triangle A Angle Arcs & Labels */}
      <path
        d={`M ${xA0 + arcRadiusA} ${yBase} A ${arcRadiusA} ${arcRadiusA} 0 0 0 ${Math.round(xA0 + arcRadiusA * Math.cos(rad0))} ${Math.round(yBase - arcRadiusA * Math.sin(rad0))}`}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      <text x={xA0 + arcRadiusA + 3} y={yBase - 4} fill="#93c5fd" fontSize="10" fontWeight="bold">
        {angle0}°
      </text>

      <path
        d={`M ${xA1 - arcRadiusA} ${yBase} A ${arcRadiusA} ${arcRadiusA} 0 0 1 ${Math.round(xA1 - arcRadiusA * Math.cos(rad1))} ${Math.round(yBase - arcRadiusA * Math.sin(rad1))}`}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      <text x={xA1 - arcRadiusA - 20} y={yBase - 4} fill="#93c5fd" fontSize="10" fontWeight="bold">
        {angle1}°
      </text>

      {/* Triangle A Vertex Markers & Labels */}
      <circle cx={xA0} cy={yBase} r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
      <text x={xA0 - 12} y={yBase + 4} fill="#93c5fd" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersA[0]}
      </text>

      <circle cx={xA1} cy={yBase} r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
      <text x={xA1 + 12} y={yBase + 4} fill="#93c5fd" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersA[1]}
      </text>

      <circle cx={xA2} cy={yA2} r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
      <text x={xA2} y={yA2 - 8} fill="#93c5fd" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersA[2]}
      </text>

      {/* Triangle A Side 0 (Base) */}
      <text x={Math.round((xA0 + xA1) / 2)} y={yBase + 16} fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle">
        {sideA0} cm
      </text>

      {/* Triangle A Side 1 (Left Leg, if specified) */}
      {sideA1 !== undefined && (
        <text
          x={Math.round((xA0 + xA2) / 2) - 12}
          y={Math.round((yBase + yA2) / 2)}
          fill="#bfdbfe"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
        >
          {sideA1} cm
        </text>
      )}

      {/* Triangle B (Dilated Image) */}
      <polygon
        points={`${xB0},${yBase} ${xB1},${yBase} ${xB2},${yB2}`}
        fill="rgba(16, 185, 129, 0.2)"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Triangle B Angle Arcs & Labels (Congruent to Triangle A) */}
      <path
        d={`M ${xB0 + arcRadiusB} ${yBase} A ${arcRadiusB} ${arcRadiusB} 0 0 0 ${Math.round(xB0 + arcRadiusB * Math.cos(rad0))} ${Math.round(yBase - arcRadiusB * Math.sin(rad0))}`}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
      />
      <text x={xB0 + arcRadiusB + 3} y={yBase - 4} fill="#6ee7b7" fontSize="10" fontWeight="bold">
        {angle0}°
      </text>

      <path
        d={`M ${xB1 - arcRadiusB} ${yBase} A ${arcRadiusB} ${arcRadiusB} 0 0 1 ${Math.round(xB1 - arcRadiusB * Math.cos(rad1))} ${Math.round(yBase - arcRadiusB * Math.sin(rad1))}`}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
      />
      <text x={xB1 - arcRadiusB - 20} y={yBase - 4} fill="#6ee7b7" fontSize="10" fontWeight="bold">
        {angle1}°
      </text>

      {/* Triangle B Vertex Markers & Labels */}
      <circle cx={xB0} cy={yBase} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
      <text x={xB0 - 14} y={yBase + 4} fill="#6ee7b7" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersB[0]}
      </text>

      <circle cx={xB1} cy={yBase} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
      <text x={xB1 + 14} y={yBase + 4} fill="#6ee7b7" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersB[1]}
      </text>

      <circle cx={xB2} cy={yB2} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
      <text x={xB2} y={yB2 - 8} fill="#6ee7b7" fontSize="12" fontWeight="black" textAnchor="middle">
        {lettersB[2]}
      </text>

      {/* Triangle B Side 0 (Base) */}
      <text x={Math.round((xB0 + xB1) / 2)} y={yBase + 16} fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        {triangleB.unknownSideIdx === 0 ? 'Side = ?' : `${sideB0} cm`}
      </text>

      {/* Triangle B Side 1 (Left Leg, if specified) */}
      {sideB1 !== undefined && (
        <text
          x={Math.round((xB0 + xB2) / 2) - 12}
          y={Math.round((yBase + yB2) / 2)}
          fill="#a7f3d0"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
        >
          {triangleB.unknownSideIdx === 1 ? 'Side = ?' : `${sideB1} cm`}
        </text>
      )}
    </svg>
  );
};

// 5. Perimeter & Area Comparative Model
const PerimeterAreaDiagram: React.FC<{ data: NonNullable<VisualPayload['compareData']> }> = ({ data }) => {
  return (
    <div className="w-full max-w-xs space-y-3 font-mono text-xs">
      <div className="grid grid-cols-2 gap-3">
        {/* Original Box */}
        <div className="bg-blue-950/60 border border-blue-600/80 p-3 rounded-xl text-center space-y-1">
          <div className="text-[10px] font-bold text-blue-400 uppercase">Original Figure</div>
          <div className="w-12 h-12 border-2 border-blue-400 bg-blue-500/20 mx-auto rounded flex items-center justify-center font-bold text-white">
            1D
          </div>
          <div className="text-slate-300 text-[11px] pt-1">
            {data.askingFor === 'perimeter'
              ? `Perimeter: ${data.originalPerimeter} ${data.unit}`
              : `Area: ${data.originalArea} ${data.unit}`}
          </div>
        </div>

        {/* Dilated Box */}
        <div className="bg-emerald-950/60 border border-emerald-600/80 p-3 rounded-xl text-center space-y-1">
          <div className="text-[10px] font-bold text-emerald-400 uppercase">Dilated (k = {data.scaleFactor})</div>
          <div className="w-20 h-20 border-2 border-emerald-400 bg-emerald-500/20 mx-auto rounded flex items-center justify-center font-bold text-emerald-300">
            {data.askingFor === 'perimeter' ? `× k` : `× k²`}
          </div>
          <div className="text-emerald-300 text-[11px] font-bold pt-1">
            {data.askingFor === 'perimeter'
              ? `New Perimeter = ?`
              : `New Area = ?`}
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
        Formula: {data.askingFor === 'perimeter' ? 'New Perimeter = Original · k' : 'New Area = Original · k²'}
      </div>
    </div>
  );
};

// 6. Multi-Representation Geometric Diagram for Scale Factor
const ScaleFactorGeometricDiagram: React.FC<{ data: ScaleFactorGeometryData }> = ({ data }) => {
  const isEnlarge = data.scaleFactor > 1;

  // Render Category: Triangles
  const renderTriangles = () => {
    // Pre-image triangle coordinates (left) & Image triangle coordinates (right)
    // Baseline y = 180
    const yBase = 180;
    const xCenterPre = 95;
    const xCenterImg = 285;

    // Dimensions: larger vs smaller based on scale factor
    const preW = isEnlarge ? 68 : 124;
    const preH = isEnlarge ? 58 : 100;
    const imgW = isEnlarge ? 124 : 68;
    const imgH = isEnlarge ? 100 : 58;

    // Pre-Image Triangle
    const preA = { x: xCenterPre - preW / 2, y: yBase };
    const preB = { x: xCenterPre + preW / 2, y: yBase };
    const preC = { x: xCenterPre - preW / 6, y: yBase - preH };

    // Image Triangle
    const imgA = { x: xCenterImg - imgW / 2, y: yBase };
    const imgB = { x: xCenterImg + imgW / 2, y: yBase };
    const imgC = { x: xCenterImg - imgW / 6, y: yBase - imgH };

    const preBaseDim = data.preImageDimensions.find((d) => d.position === 'bottom') || data.preImageDimensions[0];
    const preSideDim = data.preImageDimensions.find((d) => d.position === 'left') || data.preImageDimensions[1];
    const imgBaseDim = data.imageDimensions.find((d) => d.position === 'bottom') || data.imageDimensions[0];
    const imgSideDim = data.imageDimensions.find((d) => d.position === 'left') || data.imageDimensions[1];

    return (
      <g>
        {/* Pre-Image Triangle */}
        <polygon
          points={`${preA.x},${preA.y} ${preB.x},${preB.y} ${preC.x},${preC.y}`}
          fill="rgba(59, 130, 246, 0.18)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx={preA.x} cy={preA.y} r="3" fill="#60a5fa" />
        <circle cx={preB.x} cy={preB.y} r="3" fill="#60a5fa" />
        <circle cx={preC.x} cy={preC.y} r="3" fill="#60a5fa" />

        {/* Pre-Image Base Dimension */}
        {preBaseDim && (
          <g>
            <line x1={preA.x} y1={yBase + 12} x2={preB.x} y2={yBase + 12} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1={preA.x} y1={yBase + 8} x2={preA.x} y2={yBase + 16} stroke="#60a5fa" strokeWidth="1.5" />
            <line x1={preB.x} y1={yBase + 8} x2={preB.x} y2={yBase + 16} stroke="#60a5fa" strokeWidth="1.5" />
            <text x={xCenterPre} y={yBase + 26} fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
              {preBaseDim.label}: {preBaseDim.value} {data.unit}
            </text>
          </g>
        )}

        {/* Pre-Image Side Dimension */}
        {preSideDim && (
          <text
            x={(preA.x + preC.x) / 2 - 8}
            y={(preA.y + preC.y) / 2}
            fill="#93c5fd"
            fontSize="10"
            fontWeight="bold"
            textAnchor="end"
          >
            {preSideDim.value} {data.unit}
          </text>
        )}

        {/* Dilated Image Triangle */}
        <polygon
          points={`${imgA.x},${imgA.y} ${imgB.x},${imgB.y} ${imgC.x},${imgC.y}`}
          fill="rgba(16, 185, 129, 0.18)"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx={imgA.x} cy={imgA.y} r="3" fill="#34d399" />
        <circle cx={imgB.x} cy={imgB.y} r="3" fill="#34d399" />
        <circle cx={imgC.x} cy={imgC.y} r="3" fill="#34d399" />

        {/* Image Base Dimension */}
        {imgBaseDim && (
          <g>
            <line x1={imgA.x} y1={yBase + 12} x2={imgB.x} y2={yBase + 12} stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1={imgA.x} y1={yBase + 8} x2={imgA.x} y2={yBase + 16} stroke="#34d399" strokeWidth="1.5" />
            <line x1={imgB.x} y1={yBase + 8} x2={imgB.x} y2={yBase + 16} stroke="#34d399" strokeWidth="1.5" />
            <text x={xCenterImg} y={yBase + 26} fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
              {imgBaseDim.label}: {imgBaseDim.value} {data.unit}
            </text>
          </g>
        )}

        {/* Image Side Dimension */}
        {imgSideDim && (
          <text
            x={(imgA.x + imgC.x) / 2 - 8}
            y={(imgA.y + imgC.y) / 2}
            fill="#6ee7b7"
            fontSize="10"
            fontWeight="bold"
            textAnchor="end"
          >
            {imgSideDim.value} {data.unit}
          </text>
        )}
      </g>
    );
  };

  // Render Category: Rectangles
  const renderRectangles = () => {
    const yBase = 180;
    const xCenterPre = 95;
    const xCenterImg = 285;

    const preW = isEnlarge ? 68 : 124;
    const preH = isEnlarge ? 46 : 84;
    const imgW = isEnlarge ? 124 : 68;
    const imgH = isEnlarge ? 84 : 46;

    const preX = xCenterPre - preW / 2;
    const preY = yBase - preH;
    const imgX = xCenterImg - imgW / 2;
    const imgY = yBase - imgH;

    const preL = data.preImageDimensions.find((d) => d.position === 'bottom') || data.preImageDimensions[0];
    const preWDim = data.preImageDimensions.find((d) => d.position === 'left') || data.preImageDimensions[1];
    const imgL = data.imageDimensions.find((d) => d.position === 'bottom') || data.imageDimensions[0];
    const imgWDim = data.imageDimensions.find((d) => d.position === 'left') || data.imageDimensions[1];

    return (
      <g>
        {/* Pre-Image Rectangle */}
        <rect
          x={preX}
          y={preY}
          width={preW}
          height={preH}
          rx="2"
          fill="rgba(59, 130, 246, 0.18)"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        {/* Pre-Image Right-Angle mark */}
        <polyline
          points={`${preX},${yBase - 8} ${preX + 8},${yBase - 8} ${preX + 8},${yBase}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.2"
        />

        {/* Pre-Image Dimensions */}
        {preL && (
          <g>
            <line x1={preX} y1={yBase + 10} x2={preX + preW} y2={yBase + 10} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x={xCenterPre} y={yBase + 24} fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
              {preL.label}: {preL.value} {data.unit}
            </text>
          </g>
        )}
        {preWDim && (
          <text x={preX - 8} y={preY + preH / 2 + 4} fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="end">
            {preWDim.label}: {preWDim.value} {data.unit}
          </text>
        )}

        {/* Dilated Image Rectangle */}
        <rect
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          rx="2"
          fill="rgba(16, 185, 129, 0.18)"
          stroke="#10b981"
          strokeWidth="2.5"
        />
        {/* Image Right-Angle mark */}
        <polyline
          points={`${imgX},${yBase - 8} ${imgX + 8},${yBase - 8} ${imgX + 8},${yBase}`}
          fill="none"
          stroke="#34d399"
          strokeWidth="1.2"
        />

        {/* Image Dimensions */}
        {imgL && (
          <g>
            <line x1={imgX} y1={yBase + 10} x2={imgX + imgW} y2={yBase + 10} stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x={xCenterImg} y={yBase + 24} fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
              {imgL.label}: {imgL.value} {data.unit}
            </text>
          </g>
        )}
        {imgWDim && (
          <text x={imgX - 8} y={imgY + imgH / 2 + 4} fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="end">
            {imgWDim.label}: {imgWDim.value} {data.unit}
          </text>
        )}
      </g>
    );
  };

  // Render Category: Polygons (Trapezoid, Parallelogram, L-shape)
  const renderPolygons = () => {
    const yBase = 180;
    const xCenterPre = 95;
    const xCenterImg = 285;
    const polyType = data.polygonType || 'trapezoid';

    const scalePre = isEnlarge ? 0.6 : 1.1;
    const scaleImg = isEnlarge ? 1.1 : 0.6;

    const getPolygonPoints = (centerX: number, scale: number) => {
      if (polyType === 'trapezoid') {
        const bBottom = 110 * scale;
        const bTop = 64 * scale;
        const h = 76 * scale;
        const p1 = `${centerX - bBottom / 2},${yBase}`;
        const p2 = `${centerX + bBottom / 2},${yBase}`;
        const p3 = `${centerX + bTop / 2},${yBase - h}`;
        const p4 = `${centerX - bTop / 2},${yBase - h}`;
        return `${p1} ${p2} ${p3} ${p4}`;
      } else if (polyType === 'parallelogram') {
        const b = 95 * scale;
        const slant = 26 * scale;
        const h = 70 * scale;
        const p1 = `${centerX - b / 2},${yBase}`;
        const p2 = `${centerX + b / 2 - slant},${yBase}`;
        const p3 = `${centerX + b / 2},${yBase - h}`;
        const p4 = `${centerX - b / 2 + slant},${yBase - h}`;
        return `${p1} ${p2} ${p3} ${p4}`;
      } else {
        // L-shape
        const wTotal = 95 * scale;
        const hTotal = 75 * scale;
        const wStem = 45 * scale;
        const hBase = 35 * scale;
        const x0 = centerX - wTotal / 2;
        const y0 = yBase;
        return `${x0},${y0} ${x0 + wTotal},${y0} ${x0 + wTotal},${y0 - hBase} ${x0 + wStem},${y0 - hBase} ${x0 + wStem},${y0 - hTotal} ${x0},${y0 - hTotal}`;
      }
    };

    const prePoints = getPolygonPoints(xCenterPre, scalePre);
    const imgPoints = getPolygonPoints(xCenterImg, scaleImg);

    const preDim1 = data.preImageDimensions[0];
    const preDim2 = data.preImageDimensions[1];
    const imgDim1 = data.imageDimensions[0];
    const imgDim2 = data.imageDimensions[1];

    return (
      <g>
        {/* Pre-Image Polygon */}
        <polygon
          points={prePoints}
          fill="rgba(59, 130, 246, 0.18)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {preDim1 && (
          <text x={xCenterPre} y={yBase + 24} fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
            {preDim1.label}: {preDim1.value} {data.unit}
          </text>
        )}
        {preDim2 && (
          <text x={xCenterPre} y={yBase - (isEnlarge ? 54 : 94)} fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
            {preDim2.label}: {preDim2.value} {data.unit}
          </text>
        )}

        {/* Dilated Image Polygon */}
        <polygon
          points={imgPoints}
          fill="rgba(16, 185, 129, 0.18)"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {imgDim1 && (
          <text x={xCenterImg} y={yBase + 24} fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
            {imgDim1.label}: {imgDim1.value} {data.unit}
          </text>
        )}
        {imgDim2 && (
          <text x={xCenterImg} y={yBase - (isEnlarge ? 94 : 54)} fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
            {imgDim2.label}: {imgDim2.value} {data.unit}
          </text>
        )}
      </g>
    );
  };

  // Render Category: Real-World Context (Photograph, Blueprint, Model, Map, Poster)
  const renderRealWorld = () => {
    const yBase = 180;
    const xCenterPre = 95;
    const xCenterImg = 285;
    const rw = data.realWorldContext;

    const preW = isEnlarge ? 70 : 124;
    const preH = isEnlarge ? 50 : 90;
    const imgW = isEnlarge ? 124 : 70;
    const imgH = isEnlarge ? 90 : 50;

    const preX = xCenterPre - preW / 2;
    const preY = yBase - preH;
    const imgX = xCenterImg - imgW / 2;
    const imgY = yBase - imgH;

    const preDim = data.preImageDimensions[0];
    const imgDim = data.imageDimensions[0];

    return (
      <g>
        {/* Pre-Image Card */}
        <rect
          x={preX}
          y={preY}
          width={preW}
          height={preH}
          rx="6"
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Visual decoration according to context type */}
        {rw?.type === 'photo' || rw?.type === 'poster' ? (
          <g opacity="0.85">
            <rect x={preX + 4} y={preY + 4} width={preW - 8} height={preH - 8} rx="4" fill="#1e293b" />
            <circle cx={preX + preW * 0.3} cy={preY + preH * 0.4} r={preH * 0.16} fill="#fbbf24" />
            <path
              d={`M ${preX + 6} ${preY + preH - 6} L ${preX + preW * 0.45} ${preY + preH * 0.55} L ${preX + preW * 0.75} ${preY + preH * 0.75} L ${preX + preW - 6} ${preY + preH - 6} Z`}
              fill="#334155"
            />
          </g>
        ) : rw?.type === 'blueprint' ? (
          <g opacity="0.85">
            <rect x={preX + 4} y={preY + 4} width={preW - 8} height={preH - 8} rx="3" fill="#0369a1" fillOpacity="0.4" />
            <line x1={preX + 8} y1={preY + preH / 2} x2={preX + preW - 8} y2={preY + preH / 2} stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <rect x={preX + 12} y={preY + 10} width={preW * 0.4} height={preH * 0.5} fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
          </g>
        ) : rw?.type === 'model' ? (
          <g opacity="0.85">
            {/* Wing / fuselage silhouette */}
            <line x1={preX + 8} y1={preY + preH / 2} x2={preX + preW - 8} y2={preY + preH / 2} stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <line x1={preX + preW / 2} y1={preY + 6} x2={preX + preW / 2} y2={preY + preH - 6} stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g opacity="0.85">
            {/* Map route */}
            <path
              d={`M ${preX + 8} ${preY + preH - 8} Q ${preX + preW / 2} ${preY + 8} ${preX + preW - 8} ${preY + preH / 2}`}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Pre-Image Measurement Callout */}
        {preDim && (
          <g>
            <line x1={preX} y1={yBase + 10} x2={preX + preW} y2={yBase + 10} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x={xCenterPre} y={yBase + 24} fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
              {preDim.label}: {preDim.value} {data.unit}
            </text>
          </g>
        )}

        {/* Dilated Image Card */}
        <rect
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          rx="6"
          fill="#064e3b"
          fillOpacity="0.3"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Visual decoration for image */}
        {rw?.type === 'photo' || rw?.type === 'poster' ? (
          <g opacity="0.85">
            <rect x={imgX + 4} y={imgY + 4} width={imgW - 8} height={imgH - 8} rx="4" fill="#064e3b" fillOpacity="0.4" />
            <circle cx={imgX + imgW * 0.3} cy={imgY + imgH * 0.4} r={imgH * 0.16} fill="#fbbf24" />
            <path
              d={`M ${imgX + 6} ${imgY + imgH - 6} L ${imgX + imgW * 0.45} ${imgY + imgH * 0.55} L ${imgX + imgW * 0.75} ${imgY + imgH * 0.75} L ${imgX + imgW - 6} ${imgY + imgH - 6} Z`}
              fill="#047857"
              fillOpacity="0.7"
            />
          </g>
        ) : rw?.type === 'blueprint' ? (
          <g opacity="0.85">
            <rect x={imgX + 4} y={imgY + 4} width={imgW - 8} height={imgH - 8} rx="3" fill="#047857" fillOpacity="0.4" />
            <line x1={imgX + 8} y1={imgY + imgH / 2} x2={imgX + imgW - 8} y2={imgY + imgH / 2} stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
            <rect x={imgX + 12} y={imgY + 10} width={imgW * 0.4} height={imgH * 0.5} fill="none" stroke="#6ee7b7" strokeWidth="1.5" />
          </g>
        ) : rw?.type === 'model' ? (
          <g opacity="0.85">
            <line x1={imgX + 8} y1={imgY + imgH / 2} x2={imgX + imgW - 8} y2={imgY + imgH / 2} stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
            <line x1={imgX + imgW / 2} y1={imgY + 6} x2={imgX + imgW / 2} y2={imgY + imgH - 6} stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g opacity="0.85">
            <path
              d={`M ${imgX + 8} ${imgY + imgH - 8} Q ${imgX + imgW / 2} ${imgY + 8} ${imgX + imgW - 8} ${imgY + imgH / 2}`}
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Dilated Image Measurement Callout */}
        {imgDim && (
          <g>
            <line x1={imgX} y1={yBase + 10} x2={imgX + imgW} y2={yBase + 10} stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x={xCenterImg} y={yBase + 24} fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
              {imgDim.label}: {imgDim.value} {data.unit}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="w-full max-w-sm bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-md font-sans select-none flex flex-col items-center">
      {/* Real-World Context Badge if present */}
      {data.realWorldContext && (
        <div className="mb-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800/80 uppercase tracking-wide">
          {data.realWorldContext.contextLabel}
        </div>
      )}

      <svg width="380" height="210" viewBox="0 0 380 210" className="overflow-visible">
        {/* Pre-Image Title (Left) */}
        <text x="95" y="22" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
          {data.preImageTitle}
        </text>

        {/* Dilated Image Title (Right) */}
        <text x="285" y="22" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
          {data.imageTitle}
        </text>

        {/* Center Dilation Indicator */}
        <g>
          {/* Connecting Arrow */}
          <line x1="162" y1="120" x2="218" y2="120" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
          <polygon points="218,114 228,120 218,126" fill="#f59e0b" />

          {/* Dilation Badge */}
          <rect
            x="166"
            y="98"
            width="48"
            height="44"
            rx="8"
            fill="#1e1b4b"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text x="190" y="113" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            DILATION
          </text>
          <text x="190" y="132" fill="#fbbf24" fontSize="14" fontWeight="black" textAnchor="middle">
            k = ?
          </text>
        </g>

        {/* Category-Specific Visual Rendering */}
        {data.category === 'triangles' && renderTriangles()}
        {data.category === 'rectangles' && renderRectangles()}
        {data.category === 'polygons' && renderPolygons()}
        {data.category === 'real-world' && renderRealWorld()}
      </svg>

      {/* Instructional Scale-Factor Formula Displayed as a Readable Fraction */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/90 w-full flex items-center justify-center gap-2.5 select-none">
        <span className="text-slate-300 font-bold text-xs sm:text-sm">Scale Factor:</span>
        <span className="font-black text-amber-400 text-sm sm:text-base">k =</span>
        <div className="inline-flex flex-col items-center px-1">
          <span className="text-emerald-400 font-bold text-xs sm:text-[13px] leading-tight pb-0.5">
            Image Measurement
          </span>
          <div className="w-full h-[2px] bg-slate-400 rounded-full" />
          <span className="text-blue-400 font-bold text-xs sm:text-[13px] leading-tight pt-0.5">
            Pre-Image Measurement
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: Coordinate Plane SVG Grid for Sandbox
// =========================================================================
interface SandboxSvgGridProps {
  center: { x: number; y: number };
  preImage: { name: string; x: number; y: number }[];
  image: { name: string; x: number; y: number }[];
  scale: number;
  showRays: boolean;
  showCoords: boolean;
}

const SandboxSvgGrid: React.FC<SandboxSvgGridProps> = ({
  center,
  preImage,
  image,
  scale,
  showRays,
  showCoords,
}) => {
  const size = 360;
  const padding = 34;
  const minCoord = -2;
  const maxCoord = 12;

  const toSvgX = (x: number) => padding + ((x - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);
  const toSvgY = (y: number) => size - padding - ((y - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);

  const centerX = toSvgX(center.x);
  const centerY = toSvgY(center.y);

  const preImagePath = preImage.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(' ') + ' Z';
  const imagePath = image.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="overflow-visible select-none">
      {/* Grid Lines */}
      {Array.from({ length: maxCoord - minCoord + 1 }).map((_, idx) => {
        const coord = minCoord + idx;
        return (
          <React.Fragment key={`grid-${coord}`}>
            <line
              x1={toSvgX(coord)}
              y1={toSvgY(minCoord)}
              x2={toSvgX(coord)}
              y2={toSvgY(maxCoord)}
              stroke="#1e293b"
              strokeWidth="0.75"
            />
            <line
              x1={toSvgX(minCoord)}
              y1={toSvgY(coord)}
              x2={toSvgX(maxCoord)}
              y2={toSvgY(coord)}
              stroke="#1e293b"
              strokeWidth="0.75"
            />
          </React.Fragment>
        );
      })}

      {/* Main Axes */}
      <line x1={toSvgX(minCoord)} y1={toSvgY(0)} x2={toSvgX(maxCoord)} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
      <line x1={toSvgX(0)} y1={toSvgY(minCoord)} x2={toSvgX(0)} y2={toSvgY(maxCoord)} stroke="#475569" strokeWidth="1.5" />

      {/* Axis Numbers */}
      {[0, 2, 4, 6, 8, 10].map((num) => (
        <React.Fragment key={`num-${num}`}>
          {num !== 0 && (
            <>
              <text x={toSvgX(num)} y={toSvgY(0) + 12} fill="#64748b" fontSize="9" textAnchor="middle">
                {num}
              </text>
              <text x={toSvgX(0) - 8} y={toSvgY(num) + 3} fill="#64748b" fontSize="9" textAnchor="end">
                {num}
              </text>
            </>
          )}
        </React.Fragment>
      ))}

      {/* Projection Rays from Center */}
      {showRays &&
        image.map((p, idx) => (
          <line
            key={`ray-${idx}`}
            x1={centerX}
            y1={centerY}
            x2={toSvgX(p.x)}
            y2={toSvgY(p.y)}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.6"
          />
        ))}

      {/* Pre-Image Polygon */}
      <path d={preImagePath} fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2" />

      {/* Image Polygon */}
      <path d={imagePath} fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2.5" />

      {/* Pre-Image Points */}
      {preImage.map((p, idx) => (
        <g key={`pre-pt-${idx}`}>
          <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
          {showCoords && (
            <text x={toSvgX(p.x) + 4} y={toSvgY(p.y) - 4} fill="#93c5fd" fontSize="9" fontWeight="bold">
              {p.name}({p.x}, {p.y})
            </text>
          )}
        </g>
      ))}

      {/* Image Points */}
      {image.map((p, idx) => (
        <g key={`img-pt-${idx}`}>
          <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          {showCoords && (
            <text x={toSvgX(p.x) + 4} y={toSvgY(p.y) - 4} fill="#6ee7b7" fontSize="9" fontWeight="bold">
              {p.name}({p.x}, {p.y})
            </text>
          )}
        </g>
      ))}

      {/* Center of Dilation Pin */}
      <circle cx={centerX} cy={centerY} r="5.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <text x={centerX + 6} y={centerY - 6} fill="#fbbf24" fontSize="10" fontWeight="black">
        C({center.x}, {center.y})
      </text>
    </svg>
  );
};
