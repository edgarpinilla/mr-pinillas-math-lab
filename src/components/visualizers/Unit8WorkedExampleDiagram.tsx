import React from 'react';

interface Unit8WorkedExampleDiagramProps {
  exampleId: string;
}

export const Unit8WorkedExampleDiagram: React.FC<Unit8WorkedExampleDiagramProps> = ({
  exampleId,
}) => {
  // SVG helpers
  const svgSize = 280;
  const padding = 28;
  const minCoord = -5;
  const maxCoord = 10;

  const toX = (x: number) => padding + ((x - minCoord) / (maxCoord - minCoord)) * (svgSize - 2 * padding);
  const toY = (y: number) => svgSize - padding - ((y - minCoord) / (maxCoord - minCoord)) * (svgSize - 2 * padding);

  switch (exampleId) {
    case 'ex-1-ordered-pairs-function':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-xs font-sans">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <span className="font-black text-emerald-900 block">Relation A: FUNCTION ✔</span>
            <div className="font-mono text-slate-800 font-bold">
              {"{(-3, 4), (-1, 7), (0, 4), (2, 9)}"}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Inputs are distinct. Inputs -3 and 0 both output 4 (Allowed!).
            </span>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
            <span className="font-black text-rose-900 block">Relation B: NOT A FUNCTION ✖</span>
            <div className="font-mono text-slate-800 font-bold">
              {"{(1, 5), (4, 8), (1, -2), (6, 11)}"}
            </div>
            <span className="text-[11px] text-rose-700 font-semibold block">
              Input 1 pairs with both 5 and -2 (Conflicting outputs!).
            </span>
          </div>
        </div>
      );

    case 'ex-2-table-repeated-vs-conflicting':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-xs font-sans">
          <div className="space-y-1 text-center">
            <span className="font-black text-emerald-800 text-xs uppercase block">
              Table 1: Function (Identical Row)
            </span>
            <table className="border border-slate-200 text-center font-mono text-xs mx-auto">
              <thead className="bg-emerald-50 text-emerald-950 font-bold">
                <tr>
                  <th className="px-3 py-1">x</th>
                  <th className="px-3 py-1">y</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-emerald-100/40">
                  <td className="px-3 py-1 font-bold">2</td>
                  <td className="px-3 py-1 text-emerald-800">7</td>
                </tr>
                <tr>
                  <td className="px-3 py-1 font-bold">4</td>
                  <td className="px-3 py-1 text-slate-700">9</td>
                </tr>
                <tr className="bg-emerald-100/40">
                  <td className="px-3 py-1 font-bold">2</td>
                  <td className="px-3 py-1 text-emerald-800">7</td>
                </tr>
                <tr>
                  <td className="px-3 py-1 font-bold">6</td>
                  <td className="px-3 py-1 text-slate-700">11</td>
                </tr>
              </tbody>
            </table>
            <span className="text-[10px] text-emerald-700 font-bold block">
              (2, 7) repeated assigns same output 7!
            </span>
          </div>

          <div className="space-y-1 text-center">
            <span className="font-black text-rose-800 text-xs uppercase block">
              Table 2: Nonfunction (Conflict)
            </span>
            <table className="border border-slate-200 text-center font-mono text-xs mx-auto">
              <thead className="bg-rose-50 text-rose-950 font-bold">
                <tr>
                  <th className="px-3 py-1">x</th>
                  <th className="px-3 py-1">y</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-rose-100/50">
                  <td className="px-3 py-1 font-bold">3</td>
                  <td className="px-3 py-1 text-rose-800 font-black">5</td>
                </tr>
                <tr>
                  <td className="px-3 py-1 font-bold">5</td>
                  <td className="px-3 py-1 text-slate-700">8</td>
                </tr>
                <tr className="bg-rose-100/50">
                  <td className="px-3 py-1 font-bold">3</td>
                  <td className="px-3 py-1 text-rose-800 font-black">12</td>
                </tr>
                <tr>
                  <td className="px-3 py-1 font-bold">7</td>
                  <td className="px-3 py-1 text-slate-700">15</td>
                </tr>
              </tbody>
            </table>
            <span className="text-[10px] text-rose-700 font-bold block">
              Input 3 pairs with 5 AND 12 (Conflict!).
            </span>
          </div>
        </div>
      );

    case 'ex-3-mapping-diagram':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
          <span className="text-xs font-bold text-slate-600 mb-2">
            {'Mapping Diagram: Domain {-2, 0, 3, 5} ➔ Range {1, 6, 9}'}
          </span>
          <svg viewBox="0 0 320 160" className="w-full max-w-sm h-auto select-none">
            <ellipse cx="65" cy="80" rx="45" ry="65" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
            <text x="65" y="28" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
              Domain (Inputs)
            </text>

            <ellipse cx="255" cy="80" rx="45" ry="65" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <text x="255" y="28" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
              Range (Outputs)
            </text>

            {/* Inputs: -2, 0, 3, 5 */}
            <circle cx="65" cy="48" r="4" fill="#047857" />
            <text x="50" y="52" textAnchor="end" fontSize="11" fontWeight="bold">
              -2
            </text>

            <circle cx="65" cy="72" r="4" fill="#047857" />
            <text x="50" y="76" textAnchor="end" fontSize="11" fontWeight="bold">
              0
            </text>

            <circle cx="65" cy="96" r="4" fill="#047857" />
            <text x="50" y="100" textAnchor="end" fontSize="11" fontWeight="bold">
              3
            </text>

            <circle cx="65" cy="120" r="4" fill="#047857" />
            <text x="50" y="124" textAnchor="end" fontSize="11" fontWeight="bold">
              5
            </text>

            {/* Outputs: 1, 6, 9 */}
            <circle cx="255" cy="55" r="4" fill="#1d4ed8" />
            <text x="270" y="59" textAnchor="start" fontSize="11" fontWeight="bold">
              1
            </text>

            <circle cx="255" cy="85" r="4" fill="#1d4ed8" />
            <text x="270" y="89" textAnchor="start" fontSize="11" fontWeight="bold">
              6
            </text>

            <circle cx="255" cy="115" r="4" fill="#1d4ed8" />
            <text x="270" y="119" textAnchor="start" fontSize="11" fontWeight="bold">
              9
            </text>

            {/* Arrows */}
            <line x1="71" y1="48" x2="247" y2="85" stroke="#334155" strokeWidth="2" markerEnd="url(#we-arr)" />
            <line x1="71" y1="72" x2="247" y2="55" stroke="#334155" strokeWidth="2" markerEnd="url(#we-arr)" />
            <line x1="71" y1="96" x2="247" y2="85" stroke="#334155" strokeWidth="2" markerEnd="url(#we-arr)" />
            <line x1="71" y1="120" x2="247" y2="115" stroke="#334155" strokeWidth="2" markerEnd="url(#we-arr)" />

            <defs>
              <marker id="we-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
              </marker>
            </defs>
          </svg>
          <span className="text-[11px] text-emerald-800 font-bold mt-1">
            Function verified: Exactly one arrow departs from each domain element (-2, 0, 3, 5).
          </span>
        </div>
      );

    case 'ex-4-graph-vertical-line-test':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-xs">
          <div className="text-center space-y-1">
            <span className="font-black text-rose-800 uppercase block">Graph A: Fails VLT ✖</span>
            <svg viewBox="0 0 160 160" className="w-40 h-40 bg-slate-50 border border-slate-200 rounded-xl mx-auto">
              <line x1="15" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
              <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
              {/* Horizontal Parabola opening right */}
              <path d="M 135 30 Q 80 80 135 130" fill="none" stroke="#dc2626" strokeWidth="2.5" />
              {/* Vertical line x = 4 */}
              <line x1="120" y1="15" x2="120" y2="145" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="120" cy="45" r="3.5" fill="#2563eb" />
              <circle cx="120" cy="115" r="3.5" fill="#2563eb" />
            </svg>
            <span className="text-[10px] text-rose-700 font-bold block">
              Vertical line crosses twice (Not a function).
            </span>
          </div>

          <div className="text-center space-y-1">
            <span className="font-black text-emerald-800 uppercase block">Graph B: Passes VLT ✔</span>
            <svg viewBox="0 0 160 160" className="w-40 h-40 bg-slate-50 border border-slate-200 rounded-xl mx-auto">
              <line x1="15" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
              <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
              {/* Straight line y = -2x + 5 */}
              <line x1="25" y1="25" x2="135" y2="135" stroke="#059669" strokeWidth="2.5" />
              {/* Vertical line */}
              <line x1="100" y1="15" x2="100" y2="145" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="3.5" fill="#2563eb" />
            </svg>
            <span className="text-[10px] text-emerald-700 font-bold block">
              Vertical line crosses at most once (Function).
            </span>
          </div>
        </div>
      );

    case 'ex-5-linear-vs-nonlinear':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1 font-sans">
            <span className="font-black text-emerald-900 block">Table A: LINEAR FUNCTION</span>
            <div className="font-mono text-xs">
              Δy / Δx = 4 / 2 = 2 (Constant m = 2)
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Straight line y = 2x + 3
            </span>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center space-y-1 font-sans">
            <span className="font-black text-purple-900 block">Table B: NONLINEAR FUNCTION</span>
            <div className="font-mono text-xs">
              Δy / Δx = 1/1, 3/1, 5/1 (Changing rate!)
            </div>
            <span className="text-[11px] text-purple-700 font-semibold block">
              Curved parabola y = x² (Valid function, but curved!)
            </span>
          </div>
        </div>
      );

    case 'ex-6-proportional-vs-nonproportional':
      return (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <span className="font-black text-emerald-900 block">d = 65t (Cruise Control)</span>
            <span className="font-bold text-emerald-700 block">PROPORTIONAL (y = kx)</span>
            <span className="text-[11px] text-slate-600 block">
              Passes through (0, 0) · Constant ratio d/t = 65
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-1">
            <span className="font-black text-blue-900 block">C = 2.50m + 40 (Towing Service)</span>
            <span className="font-bold text-blue-700 block">NONPROPORTIONAL (y = mx + b)</span>
            <span className="text-[11px] text-slate-600 block">
              Initial fee b = $40 at (0, 40) · Does not pass through (0, 0)
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
