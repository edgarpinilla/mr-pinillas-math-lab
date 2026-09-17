import React, { useState } from 'react';
import {
  Scale,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowLeftRight,
  Zap,
} from 'lucide-react';

interface EquationPreset {
  id: string;
  label: string;
  equationStr: string;
  steps: {
    title: string;
    description: string;
    leftExpr: string;
    rightExpr: string;
    leftBlocks: { xCount: number; units: number };
    rightBlocks: { xCount: number; units: number };
    actionText: string;
  }[];
  solution: string;
}

const EQUATION_PRESETS: EquationPreset[] = [
  {
    id: 'preset-1',
    label: 'x + 5 = 3x - 1',
    equationStr: 'x + 5 = 3x - 1',
    steps: [
      {
        title: 'Starting Equation (Balanced Scale)',
        description: 'Both sides have the exact same value. The scale is in perfect equilibrium.',
        leftExpr: 'x + 5',
        rightExpr: '3x - 1',
        leftBlocks: { xCount: 1, units: 5 },
        rightBlocks: { xCount: 3, units: -1 },
        actionText: 'Ready to solve: eliminate variable terms from one pan.',
      },
      {
        title: 'Step 1: Subtract x from both pans',
        description:
          'Remove 1 variable block (x) from BOTH sides to preserve balance. This eliminates x from the left pan.',
        leftExpr: '5',
        rightExpr: '2x - 1',
        leftBlocks: { xCount: 0, units: 5 },
        rightBlocks: { xCount: 2, units: -1 },
        actionText: 'Subtracted x from both sides ➔ 5 = 2x - 1',
      },
      {
        title: 'Step 2: Add 1 to both pans',
        description:
          'Add 1 unit weight to BOTH sides to cancel the -1 constant on the right pan.',
        leftExpr: '6',
        rightExpr: '2x',
        leftBlocks: { xCount: 0, units: 6 },
        rightBlocks: { xCount: 2, units: 0 },
        actionText: 'Added 1 to both sides ➔ 6 = 2x',
      },
      {
        title: 'Step 3: Divide both pans by 2',
        description:
          'Divide the remaining blocks on both pans into 2 equal groups to isolate 1 single x block.',
        leftExpr: '3',
        rightExpr: 'x',
        leftBlocks: { xCount: 0, units: 3 },
        rightBlocks: { xCount: 1, units: 0 },
        actionText: 'Divided both sides by 2 ➔ 3 = x (so x = 3)',
      },
    ],
    solution: 'x = 3  (Check: 3 + 5 = 8  and  3(3) - 1 = 8  ✔)',
  },
  {
    id: 'preset-2',
    label: '2x + 6 = 4x',
    equationStr: '2x + 6 = 4x',
    steps: [
      {
        title: 'Starting Equation (Balanced Scale)',
        description: 'Left pan holds 2 x-boxes and 6 unit weights. Right pan holds 4 x-boxes.',
        leftExpr: '2x + 6',
        rightExpr: '4x',
        leftBlocks: { xCount: 2, units: 6 },
        rightBlocks: { xCount: 4, units: 0 },
        actionText: 'The scale is balanced. Move variable boxes to the right pan.',
      },
      {
        title: 'Step 1: Subtract 2x from both pans',
        description:
          'Remove 2 x-boxes from both sides. The left pan now has only the constant 6.',
        leftExpr: '6',
        rightExpr: '2x',
        leftBlocks: { xCount: 0, units: 6 },
        rightBlocks: { xCount: 2, units: 0 },
        actionText: 'Subtracted 2x from both sides ➔ 6 = 2x',
      },
      {
        title: 'Step 2: Divide both pans by 2',
        description:
          'Divide both sides by 2 to find how many unit weights balance a single x-box.',
        leftExpr: '3',
        rightExpr: 'x',
        leftBlocks: { xCount: 0, units: 3 },
        rightBlocks: { xCount: 1, units: 0 },
        actionText: 'Divided both sides by 2 ➔ 3 = x (so x = 3)',
      },
    ],
    solution: 'x = 3  (Check: 2(3) + 6 = 12  and  4(3) = 12  ✔)',
  },
  {
    id: 'preset-3',
    label: '3x + 4 = x + 10',
    equationStr: '3x + 4 = x + 10',
    steps: [
      {
        title: 'Starting Equation (Balanced Scale)',
        description: 'Left pan holds 3 x-boxes and 4 units. Right pan holds 1 x-box and 10 units.',
        leftExpr: '3x + 4',
        rightExpr: 'x + 10',
        leftBlocks: { xCount: 3, units: 4 },
        rightBlocks: { xCount: 1, units: 10 },
        actionText: 'Initial state: balance is level.',
      },
      {
        title: 'Step 1: Subtract x from both pans',
        description:
          'Remove 1 x-box from both pans to eliminate variables from the right side.',
        leftExpr: '2x + 4',
        rightExpr: '10',
        leftBlocks: { xCount: 2, units: 4 },
        rightBlocks: { xCount: 0, units: 10 },
        actionText: 'Subtracted x from both sides ➔ 2x + 4 = 10',
      },
      {
        title: 'Step 2: Subtract 4 from both pans',
        description:
          'Remove 4 units from both pans to isolate the variable term 2x.',
        leftExpr: '2x',
        rightExpr: '6',
        leftBlocks: { xCount: 2, units: 0 },
        rightBlocks: { xCount: 0, units: 6 },
        actionText: 'Subtracted 4 from both sides ➔ 2x = 6',
      },
      {
        title: 'Step 3: Divide both pans by 2',
        description:
          'Divide both sides by 2 to isolate 1 single x-box.',
        leftExpr: 'x',
        rightExpr: '3',
        leftBlocks: { xCount: 1, units: 0 },
        rightBlocks: { xCount: 0, units: 3 },
        actionText: 'Divided both sides by 2 ➔ x = 3',
      },
    ],
    solution: 'x = 3  (Check: 3(3) + 4 = 13  and  3 + 10 = 13  ✔)',
  },
];

export const EquationsInequalitiesVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'balance' | 'inequality-flip'>('balance');

  // Balance Scale State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const preset = EQUATION_PRESETS[selectedPresetIndex];
  const step = preset.steps[currentStepIndex];
  const isFinalStep = currentStepIndex === preset.steps.length - 1;

  // Inequality Flip State
  const [baseA, setBaseA] = useState<number>(2);
  const [baseB, setBaseB] = useState<number>(5);
  const [activeMultiplier, setActiveMultiplier] = useState<number>(1);

  const transformedA = baseA * activeMultiplier;
  const transformedB = baseB * activeMultiplier;
  const symbol = transformedA < transformedB ? '<' : transformedA > transformedB ? '>' : '=';
  const originalSymbol = baseA < baseB ? '<' : '>';
  const didFlip = (originalSymbol === '<' && symbol === '>') || (originalSymbol === '>' && symbol === '<');

  // Number Line Coordinate Helper for Inequality Mode
  // Domain: -14 to +14
  const numLineMin = -14;
  const numLineMax = 14;
  const svgWidth = 600;
  const svgHeight = 120;
  const paddingX = 40;

  const toSvgX = (val: number) => {
    const clamped = Math.max(numLineMin, Math.min(numLineMax, val));
    return paddingX + ((clamped - numLineMin) / (numLineMax - numLineMin)) * (svgWidth - 2 * paddingX);
  };

  const handleNextStep = () => {
    if (currentStepIndex < preset.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleResetStep = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div
      id="equations-inequalities-visualizer"
      className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-7 text-white shadow-xl space-y-6"
    >
      {/* Top Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider mb-2 border border-teal-500/30">
            <Scale className="w-3.5 h-3.5" /> TEKS 8.8 Interactive Visualizer
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {activeMode === 'balance'
              ? 'Equation Balance Scale Explorer'
              : 'Inequality Number Line & The Negative Flip Rule'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {activeMode === 'balance'
              ? 'Visualize why equations remain in equilibrium when identical inverse operations are applied to both pans.'
              : 'Discover why multiplying or dividing by a negative number reflects values across zero, reversing the inequality symbol.'}
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 shrink-0">
          <button
            id="btn-mode-balance"
            onClick={() => setActiveMode('balance')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMode === 'balance'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Balance Scale</span>
          </button>
          <button
            id="btn-mode-flip"
            onClick={() => setActiveMode('inequality-flip')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMode === 'inequality-flip'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Negative Flip Rule</span>
          </button>
        </div>
      </div>

      {/* MODE 1: EQUATION BALANCE SCALE */}
      {activeMode === 'balance' && (
        <div className="space-y-6">
          {/* Preset Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Choose Equation:
            </span>
            {EQUATION_PRESETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentStepIndex(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  selectedPresetIndex === idx
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/60 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Current Step Banner */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                  Step {currentStepIndex + 1} of {preset.steps.length}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">{step.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={isFinalStep}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md shadow-teal-600/30 cursor-pointer"
              >
                <span>{isFinalStep ? 'Completed' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetStep}
                title="Reset to initial state"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Animated Balance Beam Visualization */}
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-hidden">
            {/* Equation State Floating Card */}
            <div className="text-center pb-4">
              <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-inner">
                <span className="font-mono text-lg sm:text-2xl font-black text-teal-300">
                  {step.leftExpr}
                </span>
                <span className="text-lg sm:text-2xl font-black text-amber-400">=</span>
                <span className="font-mono text-lg sm:text-2xl font-black text-cyan-300">
                  {step.rightExpr}
                </span>
              </div>
              <div className="pt-2 text-xs font-semibold text-teal-400/90">{step.actionText}</div>
            </div>

            {/* Scale Graphic */}
            <div className="w-full max-w-xl mx-auto py-2">
              <svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-md">
                {/* Central Fulcrum Stand */}
                <polygon points="250,110 230,190 270,190" fill="#334155" stroke="#475569" strokeWidth="2" />
                <rect x="200" y="190" width="100" height="12" rx="4" fill="#1e293b" stroke="#334155" />
                <circle cx="250" cy="110" r="7" fill="#0d9488" stroke="#14b8a6" strokeWidth="2" />

                {/* Balance Crossbeam */}
                <line x1="80" y1="110" x2="420" y2="110" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />

                {/* Left Pan Chains & Pan */}
                <line x1="80" y1="110" x2="50" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="80" y1="110" x2="110" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                <path d="M 40,165 Q 80,185 120,165 Z" fill="#1e293b" stroke="#0ea5e9" strokeWidth="3" />

                {/* Right Pan Chains & Pan */}
                <line x1="420" y1="110" x2="390" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="420" y1="110" x2="450" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                <path d="M 380,165 Q 420,185 460,165 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />

                {/* Balanced Indicator Level */}
                <circle cx="250" cy="92" r="5" fill="#22c55e" className="animate-pulse" />
                <text x="250" y="80" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">
                  PERFECT BALANCE (=)
                </text>

                {/* Left Pan Blocks Label */}
                <text x="80" y="215" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  Left Pan: {step.leftExpr}
                </text>

                {/* Right Pan Blocks Label */}
                <text x="420" y="215" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">
                  Right Pan: {step.rightExpr}
                </text>
              </svg>
            </div>

            {/* Visual Inventory of Pan Contents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Left Pan Contents */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Left Pan Inventory
                  </span>
                  <span className="font-mono text-xs text-slate-400">{step.leftExpr}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
                  {/* x-blocks */}
                  {Array.from({ length: step.leftBlocks.xCount }).map((_, i) => (
                    <div
                      key={`left-x-${i}`}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs shadow-md border border-sky-400/50 flex items-center gap-1 animate-scaleUp"
                    >
                      <span>x</span>
                    </div>
                  ))}
                  {/* unit weights */}
                  {step.leftBlocks.units > 0 &&
                    Array.from({ length: Math.min(step.leftBlocks.units, 12) }).map((_, i) => (
                      <div
                        key={`left-u-${i}`}
                        className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center justify-center shadow-md border border-amber-300 animate-scaleUp"
                      >
                        +1
                      </div>
                    ))}
                  {step.leftBlocks.units < 0 && (
                    <div className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 font-mono text-xs border border-rose-800">
                      {step.leftBlocks.units} units
                    </div>
                  )}
                  {step.leftBlocks.xCount === 0 && step.leftBlocks.units === 0 && (
                    <span className="text-xs text-slate-500 italic">Pan is cleared (0)</span>
                  )}
                </div>
              </div>

              {/* Right Pan Contents */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Right Pan Inventory
                  </span>
                  <span className="font-mono text-xs text-slate-400">{step.rightExpr}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
                  {/* x-blocks */}
                  {Array.from({ length: step.rightBlocks.xCount }).map((_, i) => (
                    <div
                      key={`right-x-${i}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-mono font-bold text-xs shadow-md border border-cyan-400/50 flex items-center gap-1 animate-scaleUp"
                    >
                      <span>x</span>
                    </div>
                  ))}
                  {/* unit weights */}
                  {step.rightBlocks.units > 0 &&
                    Array.from({ length: Math.min(step.rightBlocks.units, 12) }).map((_, i) => (
                      <div
                        key={`right-u-${i}`}
                        className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center justify-center shadow-md border border-amber-300 animate-scaleUp"
                      >
                        +1
                      </div>
                    ))}
                  {step.rightBlocks.units < 0 && (
                    <div className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 font-mono text-xs border border-rose-800">
                      {step.rightBlocks.units} unit
                    </div>
                  )}
                  {step.rightBlocks.xCount === 0 && step.rightBlocks.units === 0 && (
                    <span className="text-xs text-slate-500 italic">Pan is cleared (0)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Final Solution Callout */}
            {isFinalStep && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-emerald-300 font-bold">Solution Verified:</strong>
                  <span>{preset.solution}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: INEQUALITY NUMBER LINE & NEGATIVE FLIP RULE */}
      {activeMode === 'inequality-flip' && (
        <div className="space-y-6">
          {/* Explanatory Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Why Does Multiplying or Dividing by a Negative Number Reverse the Symbol?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Start with the true statement <strong className="text-white font-mono">2 &lt; 5</strong> (because 2 is to the left of 5 on the number line). Watch what happens when you multiply or divide both sides by positive versus negative numbers!
            </p>
          </div>

          {/* Operation Multiplier Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Test Operations on 2 &lt; 5:
            </span>
            {[
              { label: 'Original: (×1)', mult: 1 },
              { label: 'Multiply by +2', mult: 2 },
              { label: 'Multiply by +3', mult: 3 },
              { label: 'Multiply by -1 (FLIP!)', mult: -1 },
              { label: 'Multiply by -2 (FLIP!)', mult: -2 },
            ].map((op) => (
              <button
                key={op.mult}
                onClick={() => setActiveMultiplier(op.mult)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  activeMultiplier === op.mult
                    ? op.mult < 0
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30 scale-105'
                      : 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30 scale-105'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>

          {/* Transformation Result Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xl sm:text-3xl font-black">
              <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono">
                {transformedA}
              </div>

              <div
                className={`px-4 py-2 rounded-2xl font-mono text-2xl sm:text-4xl font-black border transition-all ${
                  didFlip
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                    : 'bg-slate-800 text-amber-300 border-slate-700'
                }`}
              >
                {symbol}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono">
                {transformedB}
              </div>
            </div>

            <div className="text-xs sm:text-sm font-semibold">
              {didFlip ? (
                <span className="text-rose-400 flex items-center justify-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  SYMBOL REVERSED! Because we multiplied by {activeMultiplier} (negative), {transformedA} is now to the RIGHT of {transformedB}.
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Symbol preserved ({symbol}) because {activeMultiplier >= 0 ? `multiplier (${activeMultiplier}) is positive` : 'order remains unchanged'}.
                </span>
              )}
            </div>

            {/* SVG Number Line */}
            <div className="w-full overflow-x-auto py-4">
              <svg viewBox="0 0 600 130" className="w-full min-w-[500px] h-auto">
                {/* Horizontal Axis */}
                <line
                  x1={toSvgX(numLineMin)}
                  y1="65"
                  x2={toSvgX(numLineMax)}
                  y2="65"
                  stroke="#475569"
                  strokeWidth="3"
                />

                {/* Arrow heads */}
                <polygon points="15,65 25,60 25,70" fill="#64748b" />
                <polygon points="585,65 575,60 575,70" fill="#64748b" />

                {/* Axis Tick Marks & Labels */}
                {[-12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12].map((val) => {
                  const x = toSvgX(val);
                  const isZero = val === 0;
                  return (
                    <g key={val}>
                      <line
                        x1={x}
                        y1={isZero ? 50 : 58}
                        x2={x}
                        y2={isZero ? 80 : 72}
                        stroke={isZero ? '#f59e0b' : '#64748b'}
                        strokeWidth={isZero ? '2.5' : '1.5'}
                      />
                      <text
                        x={x}
                        y="95"
                        textAnchor="middle"
                        fill={isZero ? '#fbbf24' : '#94a3b8'}
                        fontSize={isZero ? '13' : '10'}
                        fontWeight={isZero ? 'bold' : 'normal'}
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Zero Mirror Reflection Line */}
                <line
                  x1={toSvgX(0)}
                  y1="25"
                  x2={toSvgX(0)}
                  y2="50"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
                <text x={toSvgX(0)} y="20" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  Zero Mirror
                </text>

                {/* Plot Point A */}
                <circle
                  cx={toSvgX(transformedA)}
                  cy="65"
                  r="7"
                  fill="#38bdf8"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />
                <text
                  x={toSvgX(transformedA)}
                  y="45"
                  textAnchor="middle"
                  fill="#7dd3fc"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {transformedA}
                </text>

                {/* Plot Point B */}
                <circle
                  cx={toSvgX(transformedB)}
                  cy="65"
                  r="7"
                  fill="#34d399"
                  stroke="#059669"
                  strokeWidth="2.5"
                />
                <text
                  x={toSvgX(transformedB)}
                  y="45"
                  textAnchor="middle"
                  fill="#6ee7b7"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {transformedB}
                </text>
              </svg>
            </div>

            {/* Insight Callout */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs sm:text-sm text-slate-300 space-y-2">
              <strong className="text-white block">Key Concept for Students:</strong>
              <p className="leading-relaxed">
                On the number line, whichever number is further to the <strong>RIGHT</strong> is always the greater value. Multiplying by a negative reflects the points across 0. Because 5 was further from 0 than 2, its reflection (-5) ends up much further to the left, making <span className="font-mono text-amber-300 font-bold">-2 &gt; -5</span>.
              </p>
              <div className="pt-1 text-[11px] text-amber-400 font-medium">
                Note: Adding or subtracting a negative number simply shifts both points left together—it does NOT change their relative order, so the symbol never flips!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
