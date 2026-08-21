import React, { useState } from 'react';
import { ArrowRight, RotateCw, FlipHorizontal, Move, Maximize2, RefreshCw } from 'lucide-react';

interface Point {
  name: string;
  x: number;
  y: number;
}

const INITIAL_POINTS: Point[] = [
  { name: 'A', x: 1, y: 2 },
  { name: 'B', x: 4, y: 2 },
  { name: 'C', x: 2, y: 5 },
];

export const TransformationsVisualizer: React.FC = () => {
  const [activeType, setActiveType] = useState<'translation' | 'reflection' | 'rotation' | 'dilation'>('translation');
  
  // Translation state
  const [transX, setTransX] = useState<number>(3);
  const [transY, setTransY] = useState<number>(-2);

  // Reflection state
  const [reflectAxis, setReflectAxis] = useState<'x' | 'y'>('x');

  // Rotation state (around origin)
  const [rotationAngle, setRotationAngle] = useState<90 | 180 | 270>(90);

  // Dilation state (center origin)
  const [scaleFactor, setScaleFactor] = useState<number>(2);

  // Compute transformed points
  const getTransformedPoints = (): { points: Point[]; ruleString: string; explanation: string } => {
    switch (activeType) {
      case 'translation': {
        const signX = transX >= 0 ? `+ ${transX}` : `- ${Math.abs(transX)}`;
        const signY = transY >= 0 ? `+ ${transY}` : `- ${Math.abs(transY)}`;
        return {
          points: INITIAL_POINTS.map((p) => ({
            name: `${p.name}'`,
            x: p.x + transX,
            y: p.y + transY,
          })),
          ruleString: `(x, y) → (x ${signX}, y ${signY})`,
          explanation: `Slide ${Math.abs(transX)} units ${transX >= 0 ? 'RIGHT' : 'LEFT'} and ${Math.abs(transY)} units ${transY >= 0 ? 'UP' : 'DOWN'}. Shape & size stay congruent!`,
        };
      }
      case 'reflection': {
        if (reflectAxis === 'x') {
          return {
            points: INITIAL_POINTS.map((p) => ({
              name: `${p.name}'`,
              x: p.x,
              y: -p.y,
            })),
            ruleString: '(x, y) → (x, -y)',
            explanation: 'Flipped across the X-AXIS (horizontal mirror). The x-coordinates stay identical; the y-coordinates become opposite.',
          };
        } else {
          return {
            points: INITIAL_POINTS.map((p) => ({
              name: `${p.name}'`,
              x: -p.x,
              y: p.y,
            })),
            ruleString: '(x, y) → (-x, y)',
            explanation: 'Flipped across the Y-AXIS (vertical mirror). The y-coordinates stay identical; the x-coordinates become opposite.',
          };
        }
      }
      case 'rotation': {
        if (rotationAngle === 90) {
          return {
            points: INITIAL_POINTS.map((p) => ({
              name: `${p.name}'`,
              x: -p.y,
              y: p.x,
            })),
            ruleString: '90° CCW: (x, y) → (-y, x)',
            explanation: 'Turned 90° Counterclockwise around the origin (0, 0). Swap coordinates and negate the new x-value.',
          };
        } else if (rotationAngle === 180) {
          return {
            points: INITIAL_POINTS.map((p) => ({
              name: `${p.name}'`,
              x: -p.x,
              y: -p.y,
            })),
            ruleString: '180°: (x, y) → (-x, -y)',
            explanation: 'Turned 180° around the origin (0, 0). Both x and y coordinates change to their opposite signs.',
          };
        } else {
          return {
            points: INITIAL_POINTS.map((p) => ({
              name: `${p.name}'`,
              x: p.y,
              y: -p.x,
            })),
            ruleString: '270° CCW (90° CW): (x, y) → (y, -x)',
            explanation: 'Turned 270° Counterclockwise (or 90° Clockwise) around the origin (0, 0).',
          };
        }
      }
      case 'dilation': {
        return {
          points: INITIAL_POINTS.map((p) => ({
            name: `${p.name}'`,
            x: Math.round(p.x * scaleFactor * 10) / 10,
            y: Math.round(p.y * scaleFactor * 10) / 10,
          })),
          ruleString: `(x, y) → (${scaleFactor}x, ${scaleFactor}y)`,
          explanation: `Dilated from origin (0,0) with scale factor k = ${scaleFactor}. Since ${
            scaleFactor > 1 ? 'k > 1, this is an ENLARGEMENT' : '0 < k < 1, this is a REDUCTION'
          }. Sides are proportional, angles stay equal!`,
        };
      }
    }
  };

  const { points: transformedPoints, ruleString, explanation } = getTransformedPoints();

  // Grid SVG parameters
  const gridSize = 360;
  const range = 8; // -8 to +8
  const center = gridSize / 2;
  const scale = gridSize / (range * 2);

  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale;

  const preImageSvgPoints = INITIAL_POINTS.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const imageSvgPoints = transformedPoints.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');

  // Grid lines
  const gridTicks = [];
  for (let i = -range; i <= range; i++) {
    if (i !== 0) gridTicks.push(i);
  }

  return (
    <div id="transformations-interactive-visualizer" className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Interactive Coordinate Plane Lab
          </div>
          <h3 className="text-xl font-bold text-white">Live Transformation Explorer</h3>
          <p className="text-slate-400 text-sm mt-0.5">
            Test how rules transform pre-image <span className="text-blue-400 font-semibold">△ABC</span> into image{' '}
            <span className="text-amber-400 font-semibold">△A&apos;B&apos;C&apos;</span>.
          </p>
        </div>

        {/* Transformation Type Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            id="tab-translation"
            onClick={() => setActiveType('translation')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeType === 'translation'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Move className="w-4 h-4" />
            1. Translation
          </button>
          <button
            id="tab-reflection"
            onClick={() => setActiveType('reflection')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeType === 'reflection'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <FlipHorizontal className="w-4 h-4" />
            2. Reflection
          </button>
          <button
            id="tab-rotation"
            onClick={() => setActiveType('rotation')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeType === 'rotation'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            3. Rotation
          </button>
          <button
            id="tab-dilation"
            onClick={() => setActiveType('dilation')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeType === 'dilation'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            4. Dilation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left / Center: Interactive SVG Coordinate Plane */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/80 rounded-xl p-4 border border-slate-800">
          <div className="w-full max-w-[360px] aspect-square relative">
            <svg
              viewBox={`0 0 ${gridSize} ${gridSize}`}
              className="w-full h-full select-none"
              aria-label="Coordinate grid showing geometric transformations"
            >
              {/* Background Grid Lines */}
              {gridTicks.map((tick) => (
                <g key={`grid-${tick}`}>
                  <line
                    x1={toSvgX(tick)}
                    y1={0}
                    x2={toSvgX(tick)}
                    y2={gridSize}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <line
                    x1={0}
                    y1={toSvgY(tick)}
                    x2={gridSize}
                    y2={toSvgY(tick)}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Reflection Axis Highlight */}
              {activeType === 'reflection' && (
                <line
                  x1={reflectAxis === 'x' ? 0 : center}
                  y1={reflectAxis === 'x' ? center : 0}
                  x2={reflectAxis === 'x' ? gridSize : center}
                  y2={reflectAxis === 'x' ? center : gridSize}
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
              )}

              {/* Primary X and Y Axes */}
              <line x1={0} y1={center} x2={gridSize} y2={center} stroke="#64748b" strokeWidth="2" />
              <line x1={center} y1={0} x2={center} y2={gridSize} stroke="#64748b" strokeWidth="2" />

              {/* Axis Labels */}
              <text x={gridSize - 14} y={center - 6} fill="#94a3b8" fontSize="12" fontWeight="bold">
                x
              </text>
              <text x={center + 6} y={14} fill="#94a3b8" fontSize="12" fontWeight="bold">
                y
              </text>
              <text x={center - 12} y={center + 14} fill="#64748b" fontSize="10">
                0
              </text>

              {/* Tick numbers */}
              {[-6, -4, -2, 2, 4, 6].map((tick) => (
                <g key={`num-${tick}`}>
                  <text
                    x={toSvgX(tick)}
                    y={center + 14}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {tick}
                  </text>
                  <text
                    x={center - 10}
                    y={toSvgY(tick) + 3}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="end"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {/* Pre-Image Shape (Blue) */}
              <polygon
                points={preImageSvgPoints}
                fill="rgba(59, 130, 246, 0.25)"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray={activeType === 'dilation' ? '4 2' : undefined}
              />

              {/* Image Shape (Amber) */}
              <polygon
                points={imageSvgPoints}
                fill="rgba(245, 158, 11, 0.3)"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />

              {/* Pre-Image Vertices & Labels */}
              {INITIAL_POINTS.map((p) => (
                <g key={`pre-${p.name}`}>
                  <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={toSvgX(p.x) + (p.x >= 0 ? 8 : -8)}
                    y={toSvgY(p.y) + (p.y >= 0 ? -6 : 12)}
                    fill="#93c5fd"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor={p.x >= 0 ? 'start' : 'end'}
                  >
                    {p.name}({p.x},{p.y})
                  </text>
                </g>
              ))}

              {/* Image Vertices & Labels */}
              {transformedPoints.map((p) => (
                <g key={`img-${p.name}`}>
                  <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={toSvgX(p.x) + (p.x >= 0 ? 8 : -8)}
                    y={toSvgY(p.y) + (p.y >= 0 ? -6 : 12)}
                    fill="#fde68a"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor={p.x >= 0 ? 'start' : 'end'}
                  >
                    {p.name}({p.x},{p.y})
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between w-full mt-3 px-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-blue-500 border border-white"></span>
              <span>Pre-Image △ABC (Original)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-amber-500 border border-white"></span>
              <span>Image △A&apos;B&apos;C&apos; (Transformed)</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Coordinate Table */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Box */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                Transformation Controls
              </h4>
              <button
                onClick={() => {
                  setTransX(3);
                  setTransY(-2);
                  setReflectAxis('x');
                  setRotationAngle(90);
                  setScaleFactor(2);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Translation Controls */}
            {activeType === 'translation' && (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Horizontal Shift (x):</span>
                    <span className="text-indigo-300">{transX > 0 ? `+${transX} (Right)` : transX < 0 ? `${transX} (Left)` : '0 (No shift)'}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={transX}
                    onChange={(e) => setTransX(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Vertical Shift (y):</span>
                    <span className="text-indigo-300">{transY > 0 ? `+${transY} (Up)` : transY < 0 ? `${transY} (Down)` : '0 (No shift)'}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={transY}
                    onChange={(e) => setTransY(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Reflection Controls */}
            {activeType === 'reflection' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Choose Line of Reflection:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setReflectAxis('x')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      reflectAxis === 'x'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Across X-Axis (y = 0)
                  </button>
                  <button
                    onClick={() => setReflectAxis('y')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      reflectAxis === 'y'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Across Y-Axis (x = 0)
                  </button>
                </div>
              </div>
            )}

            {/* Rotation Controls */}
            {activeType === 'rotation' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Turn Around Origin (0,0):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[90, 180, 270].map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setRotationAngle(angle as 90 | 180 | 270)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                        rotationAngle === angle
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {angle}° CCW
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dilation Controls */}
            {activeType === 'dilation' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Scale Factor (k):</span>
                  <span className="text-amber-300 font-bold">
                    k = {scaleFactor} ({scaleFactor > 1 ? 'Enlargement' : scaleFactor < 1 ? 'Reduction' : 'Same Size'})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0.5, 1.5, 2].map((factor) => (
                    <button
                      key={factor}
                      onClick={() => setScaleFactor(factor)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                        scaleFactor === factor
                          ? 'bg-amber-600 border-amber-400 text-white'
                          : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      k = {factor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Formula Badge */}
            <div className="pt-2 border-t border-slate-700">
              <div className="text-xs text-slate-400 font-medium mb-1">Algebraic Coordinate Rule:</div>
              <div className="font-mono text-sm bg-slate-950 px-3 py-2 rounded-lg text-emerald-400 border border-emerald-500/30 flex items-center gap-2">
                <span>⚡</span>
                <span className="font-bold">{ruleString}</span>
              </div>
            </div>
          </div>

          {/* Coordinates Mapping Table */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Coordinate Mapping Table
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="pb-1.5 font-semibold">Pre-Image</th>
                    <th className="pb-1.5 font-semibold text-center">
                      <ArrowRight className="w-3 h-3 inline text-slate-500" />
                    </th>
                    <th className="pb-1.5 font-semibold text-amber-300">Transformed Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 font-mono">
                  {INITIAL_POINTS.map((pre, idx) => {
                    const img = transformedPoints[idx];
                    return (
                      <tr key={pre.name} className="hover:bg-slate-700/30">
                        <td className="py-1.5 text-blue-300 font-bold">
                          {pre.name}({pre.x}, {pre.y})
                        </td>
                        <td className="py-1.5 text-center text-slate-500">→</td>
                        <td className="py-1.5 text-amber-300 font-bold">
                          {img.name}({img.x}, {img.y})
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
              💡 <span className="font-semibold text-white">Rule Insight: </span>
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
