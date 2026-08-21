import React, { useState } from 'react';
import { CheckCircle2, XCircle, Calculator, TrendingUp, Sparkles } from 'lucide-react';

export const ProportionalVisualizer: React.FC = () => {
  // Slope (k or m)
  const [kValue, setKValue] = useState<number>(3);
  // Y-intercept (b)
  const [bValue, setBValue] = useState<number>(0);

  const isProportional = bValue === 0;

  // Generate table points for x = 0, 1, 2, 3, 4
  const xValues = [0, 1, 2, 3, 4];
  const tableData = xValues.map((x) => {
    const y = kValue * x + bValue;
    const ratio = x === 0 ? (bValue === 0 ? '0/0 (Origin)' : `${bValue}/0 (Undefined)`) : (Math.round((y / x) * 100) / 100).toString();
    return { x, y, ratio };
  });

  // SVG coordinate graph parameters
  const width = 340;
  const height = 300;
  const padding = 35;
  const maxX = 5;
  const maxY = 20;

  const toGraphX = (x: number) => padding + (x / maxX) * (width - 2 * padding);
  const toGraphY = (y: number) => height - padding - (y / maxY) * (height - 2 * padding);

  // Line endpoints on graph
  const x1 = 0;
  const y1 = kValue * x1 + bValue;
  const x2 = Math.min(maxX, (maxY - bValue) / (kValue || 1));
  const y2 = kValue * x2 + bValue;

  return (
    <div id="proportional-interactive-visualizer" className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Interactive Proportionality Lab
          </div>
          <h3 className="text-xl font-bold text-white">Table & Graph Proportionality Checker</h3>
          <p className="text-slate-400 text-sm mt-0.5">
            Adjust the rate <span className="text-emerald-400 font-semibold">(k)</span> and starting value{' '}
            <span className="text-amber-400 font-semibold">(b)</span> to see the origin rule and constant ratio live!
          </p>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setKValue(3);
              setBValue(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isProportional && kValue === 3
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Proportional: y = 3x
          </button>
          <button
            onClick={() => {
              setKValue(2);
              setBValue(5);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !isProportional && bValue === 5
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-amber-400" />
            Non-Prop (Flat Fee): y = 2x + 5
          </button>
          <button
            onClick={() => {
              setKValue(4);
              setBValue(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isProportional && kValue === 4
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Unit Rate: y = 4x
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className={`mt-4 p-3 rounded-xl flex items-center justify-between border ${
          isProportional
            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isProportional ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <div>
            <span className="font-bold text-sm">
              {isProportional ? 'STATUS: PROPORTIONAL RELATIONSHIP' : 'STATUS: NON-PROPORTIONAL RELATIONSHIP'}
            </span>
            <p className="text-xs opacity-90">
              {isProportional
                ? `Passes both tests! 1) Straight line, and 2) Passes through the origin (0, 0). Ratio k = y/x = ${kValue} is constant.`
                : `Fails origin test! Starts at (0, ${bValue}) because b = ${bValue} ≠ 0. The ratio y/x changes for every row.`}
            </p>
          </div>
        </div>
        <div className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700">
          Equation: y = {kValue}x {bValue > 0 ? `+ ${bValue}` : bValue < 0 ? `- ${Math.abs(bValue)}` : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-start">
        {/* Left Column: Interactive Graph */}
        <div className="lg:col-span-6 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Coordinate Graph
            </span>
            <span className="text-xs font-mono text-emerald-300">
              Unit Rate Point: (1, {kValue + bValue})
            </span>
          </div>

          <div className="w-full max-w-[340px] aspect-[340/300] relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
              {/* Grid Horizontal lines */}
              {[0, 5, 10, 15, 20].map((y) => (
                <g key={`grid-y-${y}`}>
                  <line
                    x1={padding}
                    y1={toGraphY(y)}
                    x2={width - padding}
                    y2={toGraphY(y)}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={padding - 6}
                    y={toGraphY(y) + 3}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="end"
                  >
                    {y}
                  </text>
                </g>
              ))}

              {/* Grid Vertical lines */}
              {[0, 1, 2, 3, 4, 5].map((x) => (
                <g key={`grid-x-${x}`}>
                  <line
                    x1={toGraphX(x)}
                    y1={padding}
                    x2={toGraphX(x)}
                    y2={height - padding}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={toGraphX(x)}
                    y={height - padding + 14}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {x}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="#64748b"
                strokeWidth="2"
              />
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={height - padding}
                stroke="#64748b"
                strokeWidth="2"
              />

              {/* Origin Marker */}
              <circle
                cx={toGraphX(0)}
                cy={toGraphY(0)}
                r="5"
                fill={isProportional ? '#10b981' : '#64748b'}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text
                x={toGraphX(0) - 8}
                y={toGraphY(0) + 14}
                fill={isProportional ? '#34d399' : '#94a3b8'}
                fontSize="9"
                fontWeight="bold"
              >
                (0,0)
              </text>

              {/* Linear Function Line */}
              {y2 >= 0 && (
                <line
                  x1={toGraphX(x1)}
                  y1={toGraphY(Math.min(maxY, y1))}
                  x2={toGraphX(x2)}
                  y2={toGraphY(Math.min(maxY, y2))}
                  stroke={isProportional ? '#10b981' : '#f43f5e'}
                  strokeWidth="3"
                />
              )}

              {/* Data points */}
              {tableData
                .filter((p) => p.y <= maxY && p.y >= 0)
                .map((p) => (
                  <g key={`point-${p.x}`}>
                    <circle
                      cx={toGraphX(p.x)}
                      cy={toGraphY(p.y)}
                      r="4.5"
                      fill={isProportional ? '#34d399' : '#fb7185'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={toGraphX(p.x) + 6}
                      y={toGraphY(p.y) - 6}
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      ({p.x}, {p.y})
                    </text>
                  </g>
                ))}

              {/* Axis titles */}
              <text
                x={width / 2}
                y={height - 6}
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                Input Quantity (x)
              </text>
              <text
                x={12}
                y={height / 2}
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                transform={`rotate(-90 12 ${height / 2})`}
              >
                Output Quantity (y)
              </text>
            </svg>
          </div>

          <div className="w-full flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isProportional ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              Line: {isProportional ? 'Goes through (0,0)' : `Misses (0,0), starts at (0,${bValue})`}
            </span>
            <span>Origin: (0,0)</span>
          </div>
        </div>

        {/* Right Column: Table & Slider Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Sliders Box */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Rate / Constant of Proportionality (k):</span>
                <span className="text-emerald-400 font-bold font-mono">k = {kValue}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={kValue}
                onChange={(e) => setKValue(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Initial Value / Starting Base Fee (b):</span>
                <span className={`font-bold font-mono ${bValue === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  b = {bValue} {bValue === 0 ? '(No Fee → Proportional)' : '(Has Initial Fee → Non-Proportional)'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={bValue}
                onChange={(e) => setBValue(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
            </div>
          </div>

          {/* Table with Ratio Column */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Ratio Table (Checking k = y / x)
              </h4>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isProportional
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {isProportional ? 'k is Constant (All = ' + kValue + ')' : 'Ratios Vary (Not Constant)'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="pb-1.5 font-semibold">x (Input)</th>
                    <th className="pb-1.5 font-semibold">y (Output)</th>
                    <th className="pb-1.5 font-semibold text-emerald-300">Ratio (y ÷ x)</th>
                    <th className="pb-1.5 font-semibold text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 font-mono">
                  {tableData.map((row) => (
                    <tr key={row.x} className="hover:bg-slate-700/30">
                      <td className="py-1.5 font-bold text-slate-200">{row.x}</td>
                      <td className="py-1.5 font-bold text-blue-300">{row.y}</td>
                      <td className="py-1.5 text-emerald-300">
                        {row.x === 0 ? (
                          <span className="text-slate-500">Origin check (0,0)</span>
                        ) : (
                          `${row.y} ÷ ${row.x} = ${row.ratio}`
                        )}
                      </td>
                      <td className="py-1.5 text-right font-sans">
                        {row.x === 0 ? (
                          bValue === 0 ? (
                            <span className="text-emerald-400 font-semibold text-[11px]">Starts at (0,0) ✓</span>
                          ) : (
                            <span className="text-rose-400 font-semibold text-[11px]">Starts at (0,{bValue}) ✗</span>
                          )
                        ) : isProportional ? (
                          <span className="text-emerald-400 font-semibold text-[11px]">k = {kValue} ✓</span>
                        ) : (
                          <span className="text-amber-400 font-semibold text-[11px]">Changes ✗</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
              <strong>Middle School Math Rule: </strong>
              {isProportional
                ? `Because every ratio y/x equals exactly ${kValue} and the graph starts at (0,0), this relationship is PROPORTIONAL with constant k = ${kValue}.`
                : `Because the ratios change (${tableData[1].ratio} ≠ ${tableData[2].ratio}) and the starting value is ${bValue} (not 0), this is NON-PROPORTIONAL.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
