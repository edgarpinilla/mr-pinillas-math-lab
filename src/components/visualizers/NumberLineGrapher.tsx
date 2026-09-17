import React from 'react';

interface NumberLineGrapherProps {
  min?: number;
  max?: number;
  boundary: number;
  isClosed: boolean; // true: closed circle (<=, >=), false: open circle (<, >)
  direction: 'left' | 'right'; // 'left': <=, <; 'right': >=, >
  label?: string;
  interactive?: boolean;
  onToggleClosed?: (closed: boolean) => void;
  onToggleDirection?: (dir: 'left' | 'right') => void;
  height?: number;
}

export const NumberLineGrapher: React.FC<NumberLineGrapherProps> = ({
  min = -2,
  max = 10,
  boundary,
  isClosed,
  direction,
  label,
  interactive = false,
  onToggleClosed,
  onToggleDirection,
  height = 90,
}) => {
  // SVG coordinate calculations
  const width = 600;
  const paddingX = 40;
  const lineY = 45;

  const range = max - min;
  const toX = (val: number) => {
    const clamped = Math.max(min, Math.min(max, val));
    return paddingX + ((clamped - min) / range) * (width - 2 * paddingX);
  };

  const boundaryX = toX(boundary);
  const leftEdgeX = paddingX - 10;
  const rightEdgeX = width - paddingX + 10;

  // Generate integer tick marks
  const ticks: number[] = [];
  for (let t = Math.ceil(min); t <= Math.floor(max); t++) {
    ticks.push(t);
  }

  return (
    <div className="w-full flex flex-col items-center select-none bg-slate-900/95 text-white p-4 rounded-2xl border border-slate-700 shadow-md">
      {/* Top Description / Badge */}
      <div className="flex items-center justify-between w-full px-2 mb-2 text-xs">
        <span className="font-bold text-slate-300 flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              isClosed ? 'bg-emerald-400 border border-white' : 'bg-transparent border-2 border-emerald-400'
            }`}
          />
          <span>
            {isClosed ? 'Closed Circle (≤ or ≥: includes value)' : 'Open Circle (< or >: does NOT include value)'}
          </span>
        </span>
        {label && (
          <span className="font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40 text-sm">
            {label}
          </span>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-w-[650px] mx-auto block"
          style={{ minWidth: '320px' }}
        >
          <defs>
            {/* Arrow marker for axis */}
            <marker
              id="axis-arrow-right"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
            </marker>
            <marker
              id="axis-arrow-left"
              viewBox="0 0 10 10"
              refX="4"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 10 1.5 L 2 5 L 10 8.5 z" fill="#94a3b8" />
            </marker>

            {/* Arrow marker for inequality shaded ray */}
            <marker
              id="ray-arrow-right"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="ray-arrow-left"
              viewBox="0 0 10 10"
              refX="4"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 10 1.5 L 2 5 L 10 8.5 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Base Axis Line with End Arrows */}
          <line
            x1={paddingX}
            y1={lineY}
            x2={width - paddingX}
            y2={lineY}
            stroke="#64748b"
            strokeWidth="3"
            strokeLinecap="round"
            markerStart="url(#axis-arrow-left)"
            markerEnd="url(#axis-arrow-right)"
          />

          {/* Integer Ticks & Numbers */}
          {ticks.map((t) => {
            const x = toX(t);
            const isBoundaryTick = Math.abs(t - boundary) < 0.001;
            return (
              <g key={t}>
                <line
                  x1={x}
                  y1={lineY - (isBoundaryTick ? 8 : 5)}
                  x2={x}
                  y2={lineY + (isBoundaryTick ? 8 : 5)}
                  stroke={isBoundaryTick ? '#e2e8f0' : '#475569'}
                  strokeWidth={isBoundaryTick ? '2.5' : '1.5'}
                />
                <text
                  x={x}
                  y={lineY + 24}
                  textAnchor="middle"
                  fill={isBoundaryTick ? '#38bdf8' : '#94a3b8'}
                  fontSize={isBoundaryTick ? '13' : '11'}
                  fontWeight={isBoundaryTick ? '900' : '600'}
                  fontFamily="monospace"
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* Shaded Inequality Ray */}
          {direction === 'right' ? (
            <line
              x1={boundaryX}
              y1={lineY}
              x2={rightEdgeX}
              y2={lineY}
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#ray-arrow-right)"
            />
          ) : (
            <line
              x1={boundaryX}
              y1={lineY}
              x2={leftEdgeX}
              y2={lineY}
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              markerStart="url(#ray-arrow-left)"
            />
          )}

          {/* Boundary Circle */}
          {isClosed ? (
            // CLOSED CIRCLE: solid fill
            <circle
              cx={boundaryX}
              cy={lineY}
              r="7"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />
          ) : (
            // OPEN CIRCLE: white/transparent center, thick boundary stroke
            <circle
              cx={boundaryX}
              cy={lineY}
              r="7"
              fill="#0f172a"
              stroke="#10b981"
              strokeWidth="3.5"
              className="transition-all duration-300"
            />
          )}

          {/* Target Value Indicator */}
          <circle
            cx={boundaryX}
            cy={lineY - 18}
            r="3"
            fill="#38bdf8"
          />
          <text
            x={boundaryX}
            y={lineY - 26}
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {boundary}
          </text>
        </svg>
      </div>

      {/* Interactive Controls (if interactive) */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-800 w-full text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Circle Type:</span>
            <button
              type="button"
              onClick={() => onToggleClosed && onToggleClosed(false)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                !isClosed
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              ○ Open (&lt; or &gt;)
            </button>
            <button
              type="button"
              onClick={() => onToggleClosed && onToggleClosed(true)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                isClosed
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              ● Closed (≤ or ≥)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Direction:</span>
            <button
              type="button"
              onClick={() => onToggleDirection && onToggleDirection('left')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                direction === 'left'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              ← Left (Values Less)
            </button>
            <button
              type="button"
              onClick={() => onToggleDirection && onToggleDirection('right')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                direction === 'right'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Right → (Values Greater)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
