import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Infinity as InfinityIcon,
  HelpCircle,
  Sliders,
  Maximize2,
} from 'lucide-react';

export const SystemsVisualizer: React.FC = () => {
  // Line 1 parameters: y = m1 * x + b1 (Cyan / Blue theme)
  const [m1, setM1] = useState<number>(1);
  const [b1, setB1] = useState<number>(1);

  // Line 2 parameters: y = m2 * x + b2 (Amber / Rose theme)
  const [m2, setM2] = useState<number>(-1);
  const [b2, setB2] = useState<number>(3);

  // Coordinate plane dimensions: -6 to +6 in both axes
  const size = 320;
  const padding = 32;
  const minCoord = -6;
  const maxCoord = 6;

  const toGraphX = (x: number) =>
    padding + ((x - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);
  const toGraphY = (y: number) =>
    size - padding - ((y - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);

  // Solution classification
  const isSameSlope = Math.abs(m1 - m2) < 0.0001;
  const isSameIntercept = Math.abs(b1 - b2) < 0.0001;

  let solutionType: 'one' | 'none' | 'infinite' = 'one';
  let intersectionX: number | null = null;
  let intersectionY: number | null = null;

  if (isSameSlope) {
    if (isSameIntercept) {
      solutionType = 'infinite';
    } else {
      solutionType = 'none';
    }
  } else {
    solutionType = 'one';
    intersectionX = (b2 - b1) / (m1 - m2);
    intersectionY = m1 * intersectionX + b1;
  }

  // Format equation strings nicely for display
  const formatEquation = (m: number, b: number) => {
    if (m === 0) return `y = ${b}`;
    const mStr = m === 1 ? '' : m === -1 ? '-' : `${m}`;
    if (b === 0) return `y = ${mStr}x`;
    const bStr = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    return `y = ${mStr}x ${bStr}`;
  };

  // Format coordinate values with clean decimals
  const formatCoord = (val: number) => {
    if (Number.isInteger(val)) return val.toString();
    return Number(val.toFixed(2)).toString();
  };

  // Preset scenarios
  const applyPreset = (
    presetM1: number,
    presetB1: number,
    presetM2: number,
    presetB2: number
  ) => {
    setM1(presetM1);
    setB1(presetB1);
    setM2(presetM2);
    setB2(presetB2);
  };

  // Line 1 graph endpoints
  const line1X1 = minCoord;
  const line1Y1 = m1 * minCoord + b1;
  const line1X2 = maxCoord;
  const line1Y2 = m1 * maxCoord + b1;

  // Line 2 graph endpoints
  const line2X1 = minCoord;
  const line2Y1 = m2 * minCoord + b2;
  const line2X2 = maxCoord;
  const line2Y2 = m2 * maxCoord + b2;

  // Grid tick marks (-6 to 6)
  const ticks = [-6, -4, -2, 0, 2, 4, 6];

  return (
    <div
      id="systems-interactive-visualizer"
      className="bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 space-y-6"
    >
      {/* Visualizer Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            Interactive Two-Line Coordinate Lab
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Systems of Linear Equations Explorer
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">
            Manipulate the slopes (<span className="text-sky-400 font-bold">m₁</span>,{' '}
            <span className="text-amber-400 font-bold">m₂</span>) and y-intercepts (
            <span className="text-sky-400 font-bold">b₁</span>,{' '}
            <span className="text-amber-400 font-bold">b₂</span>) to see intersection points and
            solution types live.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset(1, 1, -1, 3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              m1 === 1 && b1 === 1 && m2 === -1 && b2 === 3
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Preset 1: (1, 2)
          </button>

          <button
            onClick={() => applyPreset(2, -1, 1, 1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              m1 === 2 && b1 === -1 && m2 === 1 && b2 === 1
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Preset 2: (2, 3)
          </button>

          <button
            onClick={() => applyPreset(2, 2, 2, -2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              m1 === 2 && b1 === 2 && m2 === 2 && b2 === -2
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            Parallel (No Sol)
          </button>

          <button
            onClick={() => applyPreset(-1, 2, -1, 2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              m1 === -1 && b1 === 2 && m2 === -1 && b2 === 2
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <InfinityIcon className="w-3.5 h-3.5 text-indigo-400" />
            Identical (Infinite)
          </button>

          <button
            onClick={() => applyPreset(1, 1, -1, 3)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset to default system"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Graph on Left, Controls & Live Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Coordinate Plane Graph */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 relative shadow-inner">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[340px] h-auto aspect-square select-none overflow-visible"
          >
            {/* Background Grid Lines */}
            {ticks.map((t) => (
              <React.Fragment key={`grid-${t}`}>
                {/* Vertical grid lines */}
                <line
                  x1={toGraphX(t)}
                  y1={padding}
                  x2={toGraphX(t)}
                  y2={size - padding}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray={t === 0 ? '' : '3 3'}
                />
                {/* Horizontal grid lines */}
                <line
                  x1={padding}
                  y1={toGraphY(t)}
                  x2={size - padding}
                  y2={toGraphY(t)}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray={t === 0 ? '' : '3 3'}
                />
              </React.Fragment>
            ))}

            {/* Main Axes (x and y) */}
            <line
              x1={padding}
              y1={toGraphY(0)}
              x2={size - padding}
              y2={toGraphY(0)}
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1={toGraphX(0)}
              y1={size - padding}
              x2={toGraphX(0)}
              y2={padding}
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Axis Labels & Arrowheads */}
            <text
              x={size - padding + 10}
              y={toGraphY(0) + 4}
              fill="#94a3b8"
              fontSize="11"
              fontWeight="bold"
            >
              x
            </text>
            <text
              x={toGraphX(0) - 4}
              y={padding - 8}
              fill="#94a3b8"
              fontSize="11"
              fontWeight="bold"
            >
              y
            </text>

            {/* Ticks numbers along axes */}
            {ticks
              .filter((t) => t !== 0)
              .map((t) => (
                <React.Fragment key={`label-${t}`}>
                  {/* x-axis numbers */}
                  <text
                    x={toGraphX(t)}
                    y={toGraphY(0) + 14}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {t}
                  </text>
                  {/* y-axis numbers */}
                  <text
                    x={toGraphX(0) - 8}
                    y={toGraphY(t) + 3}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="end"
                  >
                    {t}
                  </text>
                </React.Fragment>
              ))}

            {/* Origin (0,0) label */}
            <text
              x={toGraphX(0) - 6}
              y={toGraphY(0) + 12}
              fill="#475569"
              fontSize="8"
              textAnchor="end"
            >
              0
            </text>

            {/* Clip path for lines so they don't leak beyond coordinate boundaries */}
            <defs>
              <clipPath id="coord-clip">
                <rect
                  x={padding}
                  y={padding}
                  width={size - 2 * padding}
                  height={size - 2 * padding}
                />
              </clipPath>
            </defs>

            <g clipPath="url(#coord-clip)">
              {/* Line 1 (Cyan / Sky) */}
              <line
                x1={toGraphX(line1X1)}
                y1={toGraphY(line1Y1)}
                x2={toGraphX(line1X2)}
                y2={toGraphY(line1Y2)}
                stroke="#38bdf8"
                strokeWidth={solutionType === 'infinite' ? '4' : '3'}
                strokeLinecap="round"
              />

              {/* Line 2 (Amber / Rose) */}
              <line
                x1={toGraphX(line2X1)}
                y1={toGraphY(line2Y1)}
                x2={toGraphX(line2X2)}
                y2={toGraphY(line2Y2)}
                stroke="#fbbf24"
                strokeWidth={solutionType === 'infinite' ? '2.5' : '3'}
                strokeDasharray={solutionType === 'infinite' ? '6 4' : ''}
                strokeLinecap="round"
              />

              {/* Intersection Point (if lines intersect within view) */}
              {solutionType === 'one' &&
                intersectionX !== null &&
                intersectionY !== null &&
                intersectionX >= minCoord - 0.5 &&
                intersectionX <= maxCoord + 0.5 &&
                intersectionY >= minCoord - 0.5 &&
                intersectionY <= maxCoord + 0.5 && (
                  <g>
                    {/* Glowing outer pulse ring */}
                    <circle
                      cx={toGraphX(intersectionX)}
                      cy={toGraphY(intersectionY)}
                      r="12"
                      fill="#10b981"
                      fillOpacity="0.25"
                      className="animate-ping"
                    />
                    {/* Outer border */}
                    <circle
                      cx={toGraphX(intersectionX)}
                      cy={toGraphY(intersectionY)}
                      r="7"
                      fill="#064e3b"
                      stroke="#34d399"
                      strokeWidth="2.5"
                    />
                    {/* Center point */}
                    <circle
                      cx={toGraphX(intersectionX)}
                      cy={toGraphY(intersectionY)}
                      r="3"
                      fill="#ffffff"
                    />
                  </g>
                )}
            </g>

            {/* Floating Point Coordinate Label */}
            {solutionType === 'one' &&
              intersectionX !== null &&
              intersectionY !== null &&
              intersectionX >= minCoord &&
              intersectionX <= maxCoord &&
              intersectionY >= minCoord &&
              intersectionY <= maxCoord && (
                <g>
                  <rect
                    x={Math.min(
                      Math.max(toGraphX(intersectionX) - 34, padding),
                      size - padding - 68
                    )}
                    y={Math.min(
                      Math.max(toGraphY(intersectionY) - 26, padding + 4),
                      size - padding - 20
                    )}
                    width="68"
                    height="20"
                    rx="6"
                    fill="#0f172a"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                  <text
                    x={
                      Math.min(
                        Math.max(toGraphX(intersectionX) - 34, padding),
                        size - padding - 68
                      ) + 34
                    }
                    y={
                      Math.min(
                        Math.max(toGraphY(intersectionY) - 26, padding + 4),
                        size - padding - 20
                      ) + 14
                    }
                    fill="#34d399"
                    fontSize="10"
                    fontWeight="black"
                    textAnchor="middle"
                  >
                    ({formatCoord(intersectionX)}, {formatCoord(intersectionY)})
                  </text>
                </g>
              )}
          </svg>

          {/* Color Legend below coordinate plane */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs w-full">
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-sky-500/40">
              <span className="w-3 h-1 bg-sky-400 rounded-full inline-block"></span>
              <span className="text-sky-300 font-bold font-mono">
                Line 1: {formatEquation(m1, b1)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-amber-500/40">
              <span className="w-3 h-1 bg-amber-400 rounded-full inline-block"></span>
              <span className="text-amber-300 font-bold font-mono">
                Line 2: {formatEquation(m2, b2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Controls & Mathematical Classification */}
        <div className="lg:col-span-6 space-y-4">
          {/* Solution Status Card */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              solutionType === 'one'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                : solutionType === 'none'
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {solutionType === 'one' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : solutionType === 'none' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : (
                  <InfinityIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                )}
                <span className="text-xs font-black uppercase tracking-wider">
                  {solutionType === 'one'
                    ? '1 Unique Solution (Lines Intersect)'
                    : solutionType === 'none'
                    ? 'No Solution (Parallel Lines)'
                    : 'Infinitely Many Solutions (Coincident Lines)'}
                </span>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                {solutionType === 'one'
                  ? `(${formatCoord(intersectionX!)}, ${formatCoord(intersectionY!)})`
                  : solutionType === 'none'
                  ? 'No Solution (∅)'
                  : 'All points on line (∞)'}
              </span>
            </div>

            {/* Explanation box */}
            <div className="mt-2.5 text-xs text-slate-300 leading-relaxed font-sans">
              {solutionType === 'one' && intersectionX !== null && intersectionY !== null && (
                <div className="space-y-1">
                  <p>
                    Slopes are different (<span className="text-sky-300 font-bold">m₁ = {m1}</span>{' '}
                    ≠ <span className="text-amber-300 font-bold">m₂ = {m2}</span>), so the two lines
                    must cross at exactly one coordinate point:{' '}
                    <strong className="text-emerald-300">
                      ({formatCoord(intersectionX)}, {formatCoord(intersectionY)})
                    </strong>
                    .
                  </p>
                  <div className="pt-1.5 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-sky-300">
                      <div>Line 1 Check:</div>
                      <div>
                        y = {m1}({formatCoord(intersectionX)}) + {b1} = {formatCoord(intersectionY)} ✓
                      </div>
                    </div>
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-amber-300">
                      <div>Line 2 Check:</div>
                      <div>
                        y = {m2}({formatCoord(intersectionX)}) + {b2} = {formatCoord(intersectionY)} ✓
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {solutionType === 'none' && (
                <div>
                  <p>
                    Both lines have the <strong>exact same slope (m = {m1})</strong>, but different
                    y-intercepts (b₁ = {b1} ≠ b₂ = {b2}).
                  </p>
                  <p className="text-slate-400 mt-1">
                    The lines are strictly parallel with identical steepness and will never intersect.
                    No ordered pair can satisfy both equations.
                  </p>
                </div>
              )}

              {solutionType === 'infinite' && (
                <div>
                  <p>
                    Both equations have the <strong>same slope (m = {m1})</strong> AND the{' '}
                    <strong>same y-intercept (b = {b1})</strong>.
                  </p>
                  <p className="text-slate-400 mt-1">
                    They graph as the exact same line! Every single point along this line satisfies
                    both equations simultaneously.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Line 1 Controls (Sky / Blue) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
                Line 1: {formatEquation(m1, b1)}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                m₁ = {m1}, b₁ = {b1}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Slope m1 Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Slope (m₁):</span>
                  <span className="font-bold text-sky-300">{m1}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={m1}
                  onChange={(e) => setM1(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                </div>
              </div>

              {/* Y-Intercept b1 Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>y-Intercept (b₁):</span>
                  <span className="font-bold text-sky-300">{b1}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={b1}
                  onChange={(e) => setB1(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-5</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Line 2 Controls (Amber / Orange) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                Line 2: {formatEquation(m2, b2)}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                m₂ = {m2}, b₂ = {b2}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Slope m2 Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Slope (m₂):</span>
                  <span className="font-bold text-amber-300">{m2}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={m2}
                  onChange={(e) => setM2(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                </div>
              </div>

              {/* Y-Intercept b2 Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>y-Intercept (b₂):</span>
                  <span className="font-bold text-amber-300">{b2}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={b2}
                  onChange={(e) => setB2(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-5</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Concept Summary footer */}
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Rule to Remember: </strong>
              If slopes are different (<span className="text-sky-300 font-mono">m₁ ≠ m₂</span>),
              lines cross once. If slopes are equal (<span className="text-amber-300 font-mono">m₁ = m₂</span>),
              they are parallel (no solution) or the same line (infinitely many solutions).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
