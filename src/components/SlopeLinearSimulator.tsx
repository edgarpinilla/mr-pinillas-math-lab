import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const SlopeLinearSimulator: React.FC = () => {
  // Two coordinate points (x1, y1) and (x2, y2)
  const [x1, setX1] = useState<number>(1);
  const [y1, setY1] = useState<number>(3);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(9);

  // Calculate delta y (rise) and delta x (run)
  const deltaY = y2 - y1;
  const deltaX = x2 - x1;

  const isVertical = deltaX === 0;
  const isHorizontal = deltaY === 0 && deltaX !== 0;

  // Slope calculation
  const slopeValue = isVertical ? null : deltaY / deltaX;
  const simplifiedSlope =
    slopeValue !== null ? Math.round(slopeValue * 100) / 100 : null;

  // y-intercept calculation: b = y1 - m * x1
  const bValue =
    slopeValue !== null ? Math.round((y1 - slopeValue * x1) * 100) / 100 : null;

  // Preset scenarios
  const applyPreset = (pX1: number, pY1: number, pX2: number, pY2: number) => {
    setX1(pX1);
    setY1(pY1);
    setX2(pX2);
    setY2(pY2);
  };

  // SVG coordinate graph dimensions (-8 to +12)
  const size = 320;
  const padding = 30;
  const minCoord = -5;
  const maxCoord = 12;

  const toGraphX = (x: number) =>
    padding + ((x - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);
  const toGraphY = (y: number) =>
    size - padding - ((y - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);

  return (
    <div
      id="slope-linear-simulator-lab"
      className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Interactive Two-Point Slope & Equation Solver
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Slope & Linear Equation Lab
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-0.5">
            Enter any two coordinate points to calculate the slope <code className="font-bold text-blue-800">m = (y₂ - y₁) / (x₂ - x₁)</code> and write the equation in slope-intercept form <code className="font-bold text-indigo-800">y = mx + b</code>.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset(1, 3, 4, 9)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Preset 1: m = 2
          </button>
          <button
            onClick={() => applyPreset(0, 5, 3, -1)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Preset 2: m = -2
          </button>
          <button
            onClick={() => applyPreset(2, 4, 7, 4)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Preset 3: m = 0
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs + Calculations + Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Point Controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* Point 1 Input Card */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
            <div className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center justify-between">
              <span>Point 1: (x₁, y₁)</span>
              <span className="font-mono text-blue-700 font-bold">({x1}, {y1})</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">x₁ Value</label>
                <input
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-mono text-sm font-bold text-slate-800 text-center"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">y₁ Value</label>
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-mono text-sm font-bold text-slate-800 text-center"
                />
              </div>
            </div>
          </div>

          {/* Point 2 Input Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center justify-between">
              <span>Point 2: (x₂, y₂)</span>
              <span className="font-mono text-indigo-700 font-bold">({x2}, {y2})</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">x₂ Value</label>
                <input
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-mono text-sm font-bold text-slate-800 text-center"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">y₂ Value</label>
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-mono text-sm font-bold text-slate-800 text-center"
                />
              </div>
            </div>
          </div>

          {/* Resulting Equation Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800 shadow-md">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Computed Linear Equation
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
              {isVertical
                ? `x = ${x1} (Vertical)`
                : bValue === 0
                ? `y = ${simplifiedSlope}x`
                : (bValue || 0) > 0
                ? `y = ${simplifiedSlope}x + ${bValue}`
                : `y = ${simplifiedSlope}x - ${Math.abs(bValue || 0)}`}
            </div>
            <div className="text-xs font-bold text-slate-300">
              {isVertical
                ? 'Undefined Slope'
                : isHorizontal
                ? 'Zero Slope (m = 0)'
                : (slopeValue || 0) > 0
                ? 'Positive Slope (m > 0)'
                : 'Negative Slope (m < 0)'}
            </div>
          </div>
        </div>

        {/* Center Column: Step-by-Step Algebraic Solution */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Step-by-Step Math Steps
            </div>

            {/* Step 1: Rise (Δy) */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-700">1. Calculate Vertical Rise (Δy):</div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-slate-900">
                Δy = y₂ - y₁ = {y2} - {y1} = <strong>{deltaY}</strong>
              </div>
            </div>

            {/* Step 2: Run (Δx) */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-700">2. Calculate Horizontal Run (Δx):</div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-slate-900">
                Δx = x₂ - x₁ = {x2} - {x1} = <strong>{deltaX}</strong>
              </div>
            </div>

            {/* Step 3: Slope m */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-700">3. Apply Slope Formula:</div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-slate-900">
                {isVertical ? (
                  <span className="text-rose-600 font-bold">m = {deltaY} / 0 = Undefined</span>
                ) : (
                  <span>
                    m = {deltaY} / {deltaX} = <strong>{simplifiedSlope}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Step 4: Y-Intercept b */}
            {!isVertical && (
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-700">4. Solve for y-intercept (b):</div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-slate-900 text-[11px]">
                  y = mx + b → {y1} = ({simplifiedSlope})({x1}) + b
                  <br />
                  b = {y1} - {Math.round((simplifiedSlope || 0) * x1 * 100) / 100} ={' '}
                  <strong>{bValue}</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Coordinate Plane Visualizer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-inner">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full aspect-square select-none">
            {/* Grid Lines */}
            {[-4, 0, 4, 8].map((val) => (
              <g key={val}>
                <line
                  x1={toGraphX(val)}
                  y1={padding}
                  x2={toGraphX(val)}
                  y2={size - padding}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <line
                  x1={padding}
                  y1={toGraphY(val)}
                  x2={size - padding}
                  y2={toGraphY(val)}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </g>
            ))}

            {/* Axes */}
            <line
              x1={toGraphX(minCoord)}
              y1={toGraphY(0)}
              x2={toGraphX(maxCoord)}
              y2={toGraphY(0)}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <line
              x1={toGraphX(0)}
              y1={toGraphY(minCoord)}
              x2={toGraphX(0)}
              y2={toGraphY(maxCoord)}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Plotted Line */}
            {!isVertical ? (
              <line
                x1={toGraphX(minCoord)}
                y1={toGraphY(minCoord * (slopeValue || 0) + (bValue || 0))}
                x2={toGraphX(maxCoord)}
                y2={toGraphY(maxCoord * (slopeValue || 0) + (bValue || 0))}
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : (
              <line
                x1={toGraphX(x1)}
                y1={toGraphY(minCoord)}
                x2={toGraphX(x1)}
                y2={toGraphY(maxCoord)}
                stroke="#f43f5e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            )}

            {/* Slope Triangle */}
            {!isVertical && !isHorizontal && (
              <g>
                <line
                  x1={toGraphX(x1)}
                  y1={toGraphY(y1)}
                  x2={toGraphX(x2)}
                  y2={toGraphY(y1)}
                  stroke="#2dd4bf"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
                <line
                  x1={toGraphX(x2)}
                  y1={toGraphY(y1)}
                  x2={toGraphX(x2)}
                  y2={toGraphY(y2)}
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              </g>
            )}

            {/* Point 1 Circle */}
            <circle cx={toGraphX(x1)} cy={toGraphY(y1)} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <text x={toGraphX(x1) + 6} y={toGraphY(y1) - 4} fill="#38bdf8" fontSize="9" fontWeight="bold">
              ({x1}, {y1})
            </text>

            {/* Point 2 Circle */}
            <circle cx={toGraphX(x2)} cy={toGraphY(y2)} r="5" fill="#818cf8" stroke="#ffffff" strokeWidth="1.5" />
            <text x={toGraphX(x2) + 6} y={toGraphY(y2) - 4} fill="#818cf8" fontSize="9" fontWeight="bold">
              ({x2}, {y2})
            </text>
          </svg>
          <div className="text-[11px] text-slate-400 font-mono mt-2">
            P1: ({x1}, {y1}) · P2: ({x2}, {y2})
          </div>
        </div>
      </div>
    </div>
  );
};
