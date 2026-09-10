import React, { useState } from 'react';
import {
  Maximize2,
  Minimize2,
  RefreshCw,
  Compass,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface Point {
  name: string;
  x: number;
  y: number;
}

const PRE_IMAGE_TRIANGLE: Point[] = [
  { name: 'A', x: 2, y: 1 },
  { name: 'B', x: 4, y: 1 },
  { name: 'C', x: 2, y: 4 },
];

const PRE_IMAGE_RECTANGLE: Point[] = [
  { name: 'P', x: 1, y: 1 },
  { name: 'Q', x: 4, y: 1 },
  { name: 'R', x: 4, y: 3 },
  { name: 'S', x: 1, y: 3 },
];

export const DilationsVisualizer: React.FC = () => {
  const [shapeType, setShapeType] = useState<'triangle' | 'rectangle'>('triangle');
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [showRays, setShowRays] = useState<boolean>(true);
  const [showGridNumbers, setShowGridNumbers] = useState<boolean>(true);

  const preImage = shapeType === 'triangle' ? PRE_IMAGE_TRIANGLE : PRE_IMAGE_RECTANGLE;

  // Dilation centered at origin (0, 0)
  const image: Point[] = preImage.map((p) => ({
    name: `${p.name}'`,
    x: Number((p.x * scaleFactor).toFixed(2)),
    y: Number((p.y * scaleFactor).toFixed(2)),
  }));

  // Coordinate Plane constants
  const gridSize = 400;
  const padding = 36;
  const plotSize = gridSize - 2 * padding;
  const xMin = -1;
  const xMax = 10;
  const yMin = -1;
  const yMax = 10;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotSize;
  const toSvgY = (y: number) => gridSize - padding - ((y - yMin) / (yMax - yMin)) * plotSize;

  const gridTicks = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Polygon path strings
  const preImagePath = preImage.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(' ') + ' Z';
  const imagePath = image.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(' ') + ' Z';

  // Calculations
  const isEnlargement = scaleFactor > 1;
  const isReduction = scaleFactor < 1;
  const isCongruent = scaleFactor === 1;

  // Perimeter & Area relative multipliers
  const perimeterMultiplier = scaleFactor;
  const areaMultiplier = Number((scaleFactor * scaleFactor).toFixed(3));

  return (
    <div id="dilations-interactive-visualizer" className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 text-white shadow-xl space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" /> Interactive Coordinate Lab
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Origin Dilation Explorer: (x, y) → (kx, ky)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Adjust the scale factor slider to watch points project outward along dilation rays from the origin (0, 0).
          </p>
        </div>

        {/* Shape Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setShapeType('triangle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              shapeType === 'triangle'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Triangle
          </button>
          <button
            onClick={() => setShapeType('rectangle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              shapeType === 'rectangle'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rectangle
          </button>
        </div>
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive SVG Coordinate Plane */}
        <div className="lg:col-span-7 flex flex-col items-center bg-slate-950/80 rounded-xl p-4 border border-slate-800">
          <div className="w-full max-w-[380px] aspect-square relative">
            <svg
              viewBox={`0 0 ${gridSize} ${gridSize}`}
              className="w-full h-full select-none overflow-visible"
              aria-label="Interactive coordinate grid illustrating dilation"
            >
              <defs>
                <pattern id="dil-small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Grid Lines */}
              {gridTicks.map((tick) => (
                <g key={`grid-${tick}`}>
                  <line
                    x1={toSvgX(tick)}
                    y1={toSvgY(yMin)}
                    x2={toSvgX(tick)}
                    y2={toSvgY(yMax)}
                    stroke={tick === 0 ? '#64748b' : '#1e293b'}
                    strokeWidth={tick === 0 ? '1.8' : '1'}
                  />
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(tick)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(tick)}
                    stroke={tick === 0 ? '#64748b' : '#1e293b'}
                    strokeWidth={tick === 0 ? '1.8' : '1'}
                  />
                </g>
              ))}

              {/* Tick numbers */}
              {showGridNumbers &&
                gridTicks
                  .filter((t) => t >= 0 && t <= 10 && t % 2 === 0)
                  .map((t) => (
                    <g key={`tick-labels-${t}`}>
                      {t !== 0 && (
                        <text
                          x={toSvgX(t)}
                          y={toSvgY(0) + 14}
                          fill="#94a3b8"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {t}
                        </text>
                      )}
                      {t !== 0 && (
                        <text
                          x={toSvgX(0) - 10}
                          y={toSvgY(t) + 3}
                          fill="#94a3b8"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="end"
                        >
                          {t}
                        </text>
                      )}
                    </g>
                  ))}

              {/* Origin Marker (0,0) */}
              <circle cx={toSvgX(0)} cy={toSvgY(0)} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              <text x={toSvgX(0) - 10} y={toSvgY(0) + 14} fill="#f59e0b" fontSize="9" fontWeight="900">
                (0,0)
              </text>

              {/* Projection Rays from Origin (0,0) through vertices */}
              {showRays &&
                preImage.map((p, idx) => {
                  const targetX = Math.max(p.x * 2.5, image[idx].x * 1.15, 9);
                  const targetY = (targetX / p.x) * p.y;
                  return (
                    <line
                      key={`ray-${p.name}`}
                      x1={toSvgX(0)}
                      y1={toSvgY(0)}
                      x2={toSvgX(targetX)}
                      y2={toSvgY(targetY)}
                      stroke="#a855f7"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      strokeOpacity="0.5"
                    />
                  );
                })}

              {/* Dilated Image Polygon (Violet/Purple) */}
              <path
                d={imagePath}
                fill="#a855f7"
                fillOpacity="0.28"
                stroke="#c084fc"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Original Pre-Image Polygon (Sky Blue) */}
              <path
                d={preImagePath}
                fill="#38bdf8"
                fillOpacity="0.45"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Pre-Image Vertices (Sky Blue Dots) */}
              {preImage.map((p) => (
                <g key={`point-${p.name}`}>
                  <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  <text
                    x={toSvgX(p.x) - 7}
                    y={toSvgY(p.y) - 6}
                    fill="#38bdf8"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    {p.name}({p.x},{p.y})
                  </text>
                </g>
              ))}

              {/* Image Vertices (Purple Dots) */}
              {image.map((p) => (
                <g key={`point-${p.name}`}>
                  <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={toSvgX(p.x) + 7}
                    y={toSvgY(p.y) - 6}
                    fill="#e9d5ff"
                    fontSize="10"
                    fontWeight="900"
                    textAnchor="start"
                  >
                    {p.name}({p.x},{p.y})
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend and Toggles */}
          <div className="flex flex-wrap items-center justify-between w-full gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-sky-400">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" /> Pre-image (Original)
              </span>
              <span className="flex items-center gap-1.5 font-bold text-purple-400">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" /> Image (k = {scaleFactor})
              </span>
            </div>

            <button
              onClick={() => setShowRays(!showRays)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              {showRays ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showRays ? 'Hide Rays' : 'Show Rays'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Controls, Algebraic Formula & Metrics */}
        <div className="lg:col-span-5 space-y-4">
          {/* Scale Factor Slider Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Scale Factor (k)
              </span>
              <span className="text-lg font-black font-mono text-violet-400 bg-violet-950/80 px-2.5 py-0.5 rounded-lg border border-violet-800">
                k = {scaleFactor}
              </span>
            </div>

            {/* Slider */}
            <input
              id="dilation-scale-factor-slider"
              type="range"
              min="0.5"
              max="2.5"
              step="0.25"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
              className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {[0.5, 0.75, 1, 1.5, 2, 2.5].map((preset) => (
                <button
                  key={`preset-${preset}`}
                  onClick={() => setScaleFactor(preset)}
                  className={`py-1 rounded-lg text-xs font-bold transition-all ${
                    scaleFactor === preset
                      ? 'bg-violet-600 text-white shadow-sm ring-1 ring-violet-400'
                      : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2 pt-2">
              {isEnlargement && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                  <Maximize2 className="w-3 h-3" /> Enlargement (k &gt; 1)
                </span>
              )}
              {isReduction && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
                  <Minimize2 className="w-3 h-3" /> Reduction (0 &lt; k &lt; 1)
                </span>
              )}
              {isCongruent && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold border border-blue-500/40">
                  <Sparkles className="w-3 h-3" /> Congruent (k = 1)
                </span>
              )}
            </div>
          </div>

          {/* Coordinate Mapping Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Algebraic Coordinate Mapping
            </div>
            <div className="font-mono text-xs sm:text-sm text-emerald-400 font-bold bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              (x, y) → ({scaleFactor}x, {scaleFactor}y)
            </div>

            {/* Vertex Table */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-mono">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] uppercase font-black text-sky-400 mb-1">Pre-Image</div>
                {preImage.map((p) => (
                  <div key={`pre-${p.name}`} className="text-slate-300">
                    {p.name}: ({p.x}, {p.y})
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] uppercase font-black text-purple-400 mb-1">Image (k={scaleFactor})</div>
                {image.map((p) => (
                  <div key={`post-${p.name}`} className="text-purple-300 font-bold">
                    {p.name}: ({p.x}, {p.y})
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perimeter vs Area Multipliers */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Perimeter & Area Proportional Scaling
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Perimeter Multiplier</div>
                <div className="text-base font-mono font-black text-sky-300">
                  k = {perimeterMultiplier}×
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Scales linearly with side lengths</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Area Multiplier</div>
                <div className="text-base font-mono font-black text-violet-300">
                  k² = {areaMultiplier}×
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">({scaleFactor})² = {areaMultiplier}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
