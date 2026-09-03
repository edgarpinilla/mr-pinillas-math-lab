import React, { useState } from 'react';
import { TrendingUp, Sparkles, CheckCircle2, RotateCcw, ArrowUpRight, ArrowDownRight, Minus, MoveVertical } from 'lucide-react';

export const SlopeVisualizer: React.FC = () => {
  // Mode: 'standard' (y = mx + b) or 'vertical' (x = a)
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [verticalX, setVerticalX] = useState<number>(2);

  // Slope m and y-intercept b
  const [mValue, setMValue] = useState<number>(2);
  const [bValue, setBValue] = useState<number>(1);

  // Two reference points along the line for rise/run triangle
  const x1 = 0;
  const y1 = isVertical ? 0 : bValue;
  const x2 = isVertical ? verticalX : 2;
  const y2 = isVertical ? 4 : mValue * 2 + bValue;

  const rise = isVertical ? 'Undefined' : (y2 - y1).toString();
  const run = isVertical ? '0' : (x2 - x1).toString();

  // Slope classification
  const slopeType = isVertical
    ? 'Undefined Slope (Vertical Line: x = a)'
    : mValue > 0
    ? 'Positive Slope (Rises from Left to Right)'
    : mValue < 0
    ? 'Negative Slope (Falls from Left to Right)'
    : 'Zero Slope (Horizontal Line: y = b)';

  // SVG coordinate graph dimensions (-6 to +6)
  const size = 320;
  const padding = 30;
  const minCoord = -6;
  const maxCoord = 6;

  const toGraphX = (x: number) => padding + ((x - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);
  const toGraphY = (y: number) => size - padding - ((y - minCoord) / (maxCoord - minCoord)) * (size - 2 * padding);

  // Line endpoints within coordinate bounding box
  let lineX1 = minCoord;
  let lineY1 = minCoord * mValue + bValue;
  let lineX2 = maxCoord;
  let lineY2 = maxCoord * mValue + bValue;

  if (isVertical) {
    lineX1 = verticalX;
    lineY1 = minCoord;
    lineX2 = verticalX;
    lineY2 = maxCoord;
  }

  // Format equation string
  const formatEquation = () => {
    if (isVertical) return `x = ${verticalX}`;
    if (mValue === 0) return `y = ${bValue}`;
    const mStr = mValue === 1 ? '' : mValue === -1 ? '-' : mValue.toString();
    if (bValue === 0) return `y = ${mStr}x`;
    const bStr = bValue > 0 ? `+ ${bValue}` : `- ${Math.abs(bValue)}`;
    return `y = ${mStr}x ${bStr}`;
  };

  return (
    <div
      id="slope-interactive-visualizer"
      className="bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 space-y-6"
    >
      {/* Visualizer Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            Interactive Coordinate Plane Lab
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Slope & Linear Equation Explorer
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">
            Manipulate slope <span className="text-blue-400 font-bold">(m)</span> and y-intercept{' '}
            <span className="text-amber-400 font-bold">(b)</span> to see the rise/run slope triangle live.
          </p>
        </div>

        {/* Quick Preset Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setIsVertical(false);
              setMValue(2);
              setBValue(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isVertical && mValue === 2 && bValue === 1
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
            m = +2 (Positive)
          </button>

          <button
            onClick={() => {
              setIsVertical(false);
              setMValue(-1.5);
              setBValue(3);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isVertical && mValue === -1.5 && bValue === 3
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5 text-purple-400" />
            m = -1.5 (Negative)
          </button>

          <button
            onClick={() => {
              setIsVertical(false);
              setMValue(0);
              setBValue(2);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isVertical && mValue === 0
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Minus className="w-3.5 h-3.5 text-amber-400" />
            m = 0 (Horizontal)
          </button>

          <button
            onClick={() => {
              setIsVertical(true);
              setVerticalX(3);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isVertical
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <MoveVertical className="w-3.5 h-3.5 text-rose-400" />
            Vertical (Undefined)
          </button>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Equation Display Card */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Current Linear Equation</span>
              <span className="text-blue-400 font-mono">y = mx + b</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {formatEquation()}
            </div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-2 pt-1 border-t border-slate-700/60">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>{slopeType}</span>
            </div>
          </div>

          {!isVertical ? (
            <>
              {/* Slope Slider (m) */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="slope-m-slider" className="text-xs font-black uppercase text-blue-300">
                    Slope (m = Rise / Run)
                  </label>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs border border-blue-500/30">
                    m = {mValue}
                  </span>
                </div>
                <input
                  id="slope-m-slider"
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={mValue}
                  onChange={(e) => setMValue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                  <span>-4 (Steep Down)</span>
                  <span>0 (Flat)</span>
                  <span>+4 (Steep Up)</span>
                </div>
              </div>

              {/* Y-Intercept Slider (b) */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="intercept-b-slider" className="text-xs font-black uppercase text-amber-300">
                    y-Intercept (b = Starting Value)
                  </label>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-600/30 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                    (0, {bValue})
                  </span>
                </div>
                <input
                  id="intercept-b-slider"
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={bValue}
                  onChange={(e) => setBValue(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                  <span>-4 (Below Origin)</span>
                  <span>0 (Origin)</span>
                  <span>+4 (Above Origin)</span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-3">
              <div className="text-xs font-black text-rose-300 uppercase tracking-wider">
                Vertical Line Position (x = a)
              </div>
              <input
                id="vertical-x-slider"
                type="range"
                min="-4"
                max="4"
                step="1"
                value={verticalX}
                onChange={(e) => setVerticalX(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <p className="text-[11px] text-rose-200 leading-relaxed font-medium">
                Vertical lines have zero horizontal run (Δx = 0). Since division by zero is impossible, the slope is <strong>undefined</strong>.
              </p>
            </div>
          )}

          {/* Rise / Run Calculation Box */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <div className="text-[10px] font-black uppercase text-indigo-400">Vertical Rise (Δy)</div>
              <div className="text-lg font-black font-mono text-white mt-0.5">{rise}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <div className="text-[10px] font-black uppercase text-teal-400">Horizontal Run (Δx)</div>
              <div className="text-lg font-black font-mono text-white mt-0.5">{run}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Coordinate Plane SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/80 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-inner">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[340px] aspect-square select-none"
          >
            {/* Grid Lines */}
            {Array.from({ length: 13 }).map((_, i) => {
              const val = minCoord + i;
              const gx = toGraphX(val);
              const gy = toGraphY(val);
              return (
                <g key={i}>
                  <line
                    x1={gx}
                    y1={padding}
                    x2={gx}
                    y2={size - padding}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={val === 0 ? '0' : '2,2'}
                  />
                  <line
                    x1={padding}
                    y1={gy}
                    x2={size - padding}
                    y2={gy}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={val === 0 ? '0' : '2,2'}
                  />
                </g>
              );
            })}

            {/* Main X and Y Axes */}
            <line
              x1={toGraphX(minCoord)}
              y1={toGraphY(0)}
              x2={toGraphX(maxCoord)}
              y2={toGraphY(0)}
              stroke="#94a3b8"
              strokeWidth="2.5"
            />
            <line
              x1={toGraphX(0)}
              y1={toGraphY(minCoord)}
              x2={toGraphX(0)}
              y2={toGraphY(maxCoord)}
              stroke="#94a3b8"
              strokeWidth="2.5"
            />

            {/* Axis Tick Labels */}
            {[-4, -2, 2, 4].map((n) => (
              <g key={n}>
                <text
                  x={toGraphX(n)}
                  y={toGraphY(0) + 12}
                  fill="#94a3b8"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {n}
                </text>
                <text
                  x={toGraphX(0) - 8}
                  y={toGraphY(n) + 3}
                  fill="#94a3b8"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  {n}
                </text>
              </g>
            ))}

            {/* Rise / Run Right Triangle (if not vertical and not horizontal) */}
            {!isVertical && mValue !== 0 && (
              <g>
                {/* Horizontal Run Line */}
                <line
                  x1={toGraphX(x1)}
                  y1={toGraphY(y1)}
                  x2={toGraphX(x2)}
                  y2={toGraphY(y1)}
                  stroke="#2dd4bf"
                  strokeWidth="3"
                  strokeDasharray="4,3"
                />
                {/* Vertical Rise Line */}
                <line
                  x1={toGraphX(x2)}
                  y1={toGraphY(y1)}
                  x2={toGraphX(x2)}
                  y2={toGraphY(y2)}
                  stroke="#818cf8"
                  strokeWidth="3"
                  strokeDasharray="4,3"
                />
                {/* Right angle marker */}
                <polyline
                  points={`
                    ${toGraphX(x2) - (x2 > x1 ? 8 : -8)},${toGraphY(y1)} 
                    ${toGraphX(x2) - (x2 > x1 ? 8 : -8)},${toGraphY(y1) - (y2 > y1 ? 8 : -8)} 
                    ${toGraphX(x2)},${toGraphY(y1) - (y2 > y1 ? 8 : -8)}
                  `}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                {/* Run Label */}
                <text
                  x={(toGraphX(x1) + toGraphX(x2)) / 2}
                  y={toGraphY(y1) + (y2 > y1 ? 14 : -6)}
                  fill="#2dd4bf"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Run = {Math.abs(x2 - x1)}
                </text>
                {/* Rise Label */}
                <text
                  x={toGraphX(x2) + (x2 > x1 ? 8 : -8)}
                  y={(toGraphY(y1) + toGraphY(y2)) / 2}
                  fill="#818cf8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor={x2 > x1 ? 'start' : 'end'}
                >
                  Rise = {y2 - y1}
                </text>
              </g>
            )}

            {/* The Linear Function Graph */}
            <line
              x1={toGraphX(lineX1)}
              y1={toGraphY(lineY1)}
              x2={toGraphX(lineX2)}
              y2={toGraphY(lineY2)}
              stroke={isVertical ? '#f43f5e' : '#38bdf8'}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* y-Intercept Point */}
            {!isVertical && (
              <g>
                <circle
                  cx={toGraphX(0)}
                  cy={toGraphY(bValue)}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={toGraphX(0) + 9}
                  y={toGraphY(bValue) - 4}
                  fill="#f59e0b"
                  fontSize="10"
                  fontWeight="900"
                >
                  b = (0, {bValue})
                </text>
              </g>
            )}

            {/* Second Coordinate Point */}
            {!isVertical && mValue !== 0 && (
              <g>
                <circle
                  cx={toGraphX(x2)}
                  cy={toGraphY(y2)}
                  r="5"
                  fill="#38bdf8"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={toGraphX(x2) + 7}
                  y={toGraphY(y2) - 4}
                  fill="#38bdf8"
                  fontSize="9"
                  fontWeight="bold"
                >
                  ({x2}, {y2})
                </text>
              </g>
            )}
          </svg>

          <div className="mt-3 text-center text-xs text-slate-400 font-medium">
            Coordinate Plane [-6, 6] · Blue: Linear Function · Yellow: y-Intercept (0, b)
          </div>
        </div>
      </div>
    </div>
  );
};
