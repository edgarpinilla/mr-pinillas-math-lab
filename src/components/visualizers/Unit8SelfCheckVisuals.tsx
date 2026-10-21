import React from 'react';

export interface VltGraphOptionItem {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  ariaLabel: string;
  type: 'circle' | 'segment' | 'parabola' | 'ellipse';
}

export interface TableOptionItem {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  headers: [string, string];
  rows: [number | string, number | string][];
}

/**
 * Coordinate graph renderer for Vertical Line Test options (Overall Question 8).
 * Ensures equal physical scale in x and y (1:1 aspect ratio), readable ticks, and high contrast.
 */
export const Unit8VltGraphSvg: React.FC<{
  type: 'circle' | 'segment' | 'parabola' | 'ellipse';
  optId: string;
  ariaLabel?: string;
  className?: string;
  isPrint?: boolean;
  highlightAsCorrect?: boolean;
}> = ({
  type,
  optId,
  ariaLabel,
  className = 'w-full max-w-[160px] h-auto',
  isPrint = false,
  highlightAsCorrect = false,
}) => {
  const cx0 = 100;
  const cy0 = 100;
  const s = 152 / 12; // 12.6667 px/unit -> [-6, 6] domain in 152x152 plot box
  const toX = (x: number) => cx0 + x * s;
  const toY = (y: number) => cy0 - y * s;

  const strokeColor = highlightAsCorrect ? '#059669' : isPrint ? '#0f172a' : '#2563eb';
  const gridColor = isPrint ? '#e2e8f0' : '#f1f5f9';
  const axisColor = isPrint ? '#1e293b' : '#475569';
  const tickTextColor = isPrint ? '#1e293b' : '#64748b';

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={ariaLabel}
      className={`${className} bg-white border ${
        highlightAsCorrect
          ? 'border-emerald-500 ring-2 ring-emerald-300'
          : isPrint
          ? 'border-slate-400'
          : 'border-slate-200'
      } rounded-xl shadow-inner mx-auto select-none p-1`}
    >
      {ariaLabel && <title>{ariaLabel}</title>}
      <defs>
        <clipPath id={`vlt-clip-${optId}`}>
          <rect x="24" y="24" width="152" height="152" />
        </clipPath>
      </defs>

      {/* Gridlines */}
      {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((g) => (
        <g key={`vlt-g-${optId}-${g}`}>
          <line x1={toX(g)} y1={24} x2={toX(g)} y2={176} stroke={gridColor} strokeWidth="1" />
          <line x1={24} y1={toY(g)} x2={176} y2={toY(g)} stroke={gridColor} strokeWidth="1" />
        </g>
      ))}

      {/* Coordinate Axes */}
      <line x1={20} y1={cy0} x2={180} y2={cy0} stroke={axisColor} strokeWidth="1.5" />
      <line x1={cx0} y1={180} x2={cx0} y2={20} stroke={axisColor} strokeWidth="1.5" />

      {/* Axis Arrowheads */}
      <polygon points="180,97 186,100 180,103" fill={axisColor} />
      <polygon points="97,20 100,14 103,20" fill={axisColor} />

      {/* Axis Labels */}
      <text x={186} y={103} fontSize="9" fontWeight="bold" fill={axisColor} textAnchor="start">
        x
      </text>
      <text x={100} y={11} fontSize="9" fontWeight="bold" fill={axisColor} textAnchor="middle">
        y
      </text>

      {/* Ticks and Numerical Labels */}
      {[-4, -2, 2, 4].map((t) => (
        <g key={`vlt-tick-${optId}-${t}`}>
          <line x1={toX(t)} y1={cy0 - 2.5} x2={toX(t)} y2={cy0 + 2.5} stroke={axisColor} strokeWidth="1" />
          <text x={toX(t)} y={cy0 + 10} fontSize="7" fontWeight="bold" fill={tickTextColor} textAnchor="middle">
            {t}
          </text>
          <line x1={cx0 - 2.5} y1={toY(t)} x2={cx0 + 2.5} y2={toY(t)} stroke={axisColor} strokeWidth="1" />
          <text x={cx0 - 4} y={toY(t) + 2.5} fontSize="7" fontWeight="bold" fill={tickTextColor} textAnchor="end">
            {t}
          </text>
        </g>
      ))}

      {/* Origin Marker */}
      <circle cx={cx0} cy={cy0} r="1.5" fill={tickTextColor} />

      {/* Option A: Circle centered at origin with radius 4: x² + y² = 16 */}
      {type === 'circle' && (
        <circle cx={toX(0)} cy={toY(0)} r={4 * s} fill="none" stroke={strokeColor} strokeWidth="2.2" />
      )}

      {/* Option B: Vertical line segment from (3, -2) to (3, 5) with solid endpoints */}
      {type === 'segment' && (
        <g>
          <line x1={toX(3)} y1={toY(-2)} x2={toX(3)} y2={toY(5)} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx={toX(3)} cy={toY(-2)} r="3" fill={strokeColor} />
          <circle cx={toX(3)} cy={toY(5)} r="3" fill={strokeColor} />
        </g>
      )}

      {/* Option C: Upward-opening parabola with vertex (0, -3): y = x² - 3 */}
      {type === 'parabola' && (
        <g clipPath={`url(#vlt-clip-${optId})`}>
          <path
            d={Array.from({ length: 71 }, (_, i) => {
              const xVal = -3.5 + i * 0.1;
              const yVal = xVal * xVal - 3;
              return `${i === 0 ? 'M' : 'L'} ${toX(xVal).toFixed(2)} ${toY(yVal).toFixed(2)}`;
            }).join(' ')}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.2"
          />
        </g>
      )}

      {/* Option D: Ellipse with horizontal major axis: x²/16 + y²/9 = 1 */}
      {type === 'ellipse' && (
        <ellipse cx={toX(0)} cy={toY(0)} rx={4 * s} ry={3 * s} fill="none" stroke={strokeColor} strokeWidth="2.2" />
      )}
    </svg>
  );
};

/**
 * Coordinate graph for Car A (Overall Question 11).
 * Shows line through (0, 0) and (2, 130) with Time (hours) and Distance (miles).
 * No pre-calculated speeds or solved equations are revealed before grading.
 */
export const Unit8CarAGraphSvg: React.FC<{
  className?: string;
  isPrint?: boolean;
}> = ({ className = 'w-full max-w-[320px] h-auto', isPrint = false }) => {
  const ox = 55;
  const oy = 195;
  const pw = 250;
  const ph = 165;
  const toX = (t: number) => ox + (t / 4) * pw;
  const toY = (d: number) => oy - (d / 260) * ph;

  const lineColor = isPrint ? '#0f172a' : '#4338ca';
  const gridColor = isPrint ? '#e2e8f0' : '#f1f5f9';
  const axisColor = isPrint ? '#1e293b' : '#334155';
  const textColor = isPrint ? '#0f172a' : '#0f172a';

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 340 240"
        role="img"
        aria-label="Coordinate graph for Car A showing distance in miles versus time in hours with a ray passing through points (0, 0) and (2, 130)"
        className={`${className} bg-white border ${
          isPrint ? 'border-slate-400' : 'border-slate-300'
        } rounded-2xl shadow-inner select-none p-1`}
      >
        {/* Gridlines for Time 0 to 4 hours */}
        {[0, 1, 2, 3, 4].map((t) => (
          <g key={`car-gx-${t}`}>
            <line x1={toX(t)} y1={30} x2={toX(t)} y2={oy} stroke={gridColor} strokeWidth="1.2" />
            <text x={toX(t)} y={oy + 14} fontSize="10" fontWeight="bold" fill={axisColor} textAnchor="middle">
              {t}
            </text>
          </g>
        ))}

        {/* Gridlines for Distance 0 to 260 miles */}
        {[0, 65, 130, 195, 260].map((d) => (
          <g key={`car-gy-${d}`}>
            <line x1={ox} y1={toY(d)} x2={ox + pw} y2={toY(d)} stroke={gridColor} strokeWidth="1.2" />
            <text x={ox - 6} y={toY(d) + 3.5} fontSize="9" fontWeight="bold" fill={axisColor} textAnchor="end">
              {d}
            </text>
          </g>
        ))}

        {/* Main Coordinate Axes */}
        <line x1={ox} y1={oy} x2={ox + pw + 15} y2={oy} stroke={axisColor} strokeWidth="2" />
        <line x1={ox} y1={oy} x2={ox} y2={18} stroke={axisColor} strokeWidth="2" />

        {/* Axis Arrowheads */}
        <polygon
          points={`${ox + pw + 15},${oy - 3} ${ox + pw + 21},${oy} ${ox + pw + 15},${oy + 3}`}
          fill={axisColor}
        />
        <polygon points={`${ox - 3},18 ${ox},12 ${ox + 3},18`} fill={axisColor} />

        {/* Axis Titles */}
        <text x={ox + pw / 2} y={oy + 32} fontSize="11" fontWeight="800" fill={textColor} textAnchor="middle">
          Time (hours)
        </text>
        <text x={12} y={20} fontSize="11" fontWeight="800" fill={textColor} textAnchor="start">
          Distance (miles)
        </text>

        {/* Car A Ray: passing through (0, 0) and (2, 130) up to (4, 260) */}
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(4)}
          y2={toY(260)}
          stroke={lineColor}
          strokeWidth="3"
        />

        {/* Plotted Points (0, 0) and (2, 130) */}
        <circle cx={toX(0)} cy={toY(0)} r="4.5" fill={lineColor} stroke="#fff" strokeWidth="2" />
        <circle cx={toX(2)} cy={toY(130)} r="4.5" fill={lineColor} stroke="#fff" strokeWidth="2" />

        {/* Point Labels */}
        <text
          x={toX(0) + 8}
          y={toY(0) - 6}
          fontSize="10"
          fontWeight="bold"
          fill="#1e1b4b"
          style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
        >
          (0, 0)
        </text>
        <text
          x={toX(2) + 8}
          y={toY(130) - 6}
          fontSize="10"
          fontWeight="bold"
          fill="#1e1b4b"
          style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
        >
          (2, 130)
        </text>
      </svg>
      <span className="text-[11px] text-slate-500 font-semibold mt-1 text-center">
        Line passing through (0, 0) and (2, 130)
      </span>
    </div>
  );
};

/**
 * 2x2 grid of function vs non-function tables (Overall Question 14).
 * Preserves all rows, including repeated row (-2, 7) in Table B.
 */
export const Unit8TableOptionsGrid: React.FC<{
  tableOptions: TableOptionItem[];
  highlightOptionId?: 'A' | 'B' | 'C' | 'D';
  isPrint?: boolean;
}> = ({ tableOptions, highlightOptionId, isPrint = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      {tableOptions.map((tblOpt) => {
        const isHighlighted = highlightOptionId === tblOpt.id;
        return (
          <div
            key={tblOpt.id}
            className={`p-3 rounded-xl border ${
              isHighlighted
                ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-300'
                : isPrint
                ? 'bg-white border-slate-300'
                : 'bg-white border-slate-200 shadow-2xs'
            } flex flex-col items-center gap-2 break-inside-avoid`}
          >
            <div className="flex items-center justify-between w-full px-1">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                  isHighlighted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-500 text-slate-900'
                }`}
              >
                {tblOpt.id}
              </span>
              <span className="text-xs font-bold text-slate-700">{tblOpt.label}</span>
            </div>

            <div className="w-full flex justify-center">
              <table className="text-center text-xs font-sans border border-slate-300 rounded-lg overflow-hidden min-w-[130px] bg-white">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                    <th className="py-1 px-3 border-r border-slate-300">{tblOpt.headers[0]}</th>
                    <th className="py-1 px-3">{tblOpt.headers[1]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono text-slate-800">
                  {tblOpt.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="py-0.5 px-3 font-semibold border-r border-slate-200">{row[0]}</td>
                      <td className="py-0.5 px-3 font-medium">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Pure HTML string generators for dedicated Answer Key popup window
 */
export function getUnit8VltGraphHtml(
  type: 'circle' | 'segment' | 'parabola' | 'ellipse',
  optId: string,
  highlightAsCorrect = false
): string {
  const cx0 = 100;
  const cy0 = 100;
  const s = 152 / 12;
  const toX = (x: number) => cx0 + x * s;
  const toY = (y: number) => cy0 - y * s;

  const strokeColor = highlightAsCorrect ? '#059669' : '#0f172a';
  const gridColor = '#e2e8f0';
  const axisColor = '#1e293b';

  let curveHtml = '';
  if (type === 'circle') {
    curveHtml = `<circle cx="${toX(0)}" cy="${toY(0)}" r="${4 * s}" fill="none" stroke="${strokeColor}" stroke-width="2.2" />`;
  } else if (type === 'segment') {
    curveHtml = `
      <line x1="${toX(3)}" y1="${toY(-2)}" x2="${toX(3)}" y2="${toY(5)}" stroke="${strokeColor}" stroke-width="2.5" />
      <circle cx="${toX(3)}" cy="${toY(-2)}" r="3" fill="${strokeColor}" />
      <circle cx="${toX(3)}" cy="${toY(5)}" r="3" fill="${strokeColor}" />
    `;
  } else if (type === 'parabola') {
    const dStr = Array.from({ length: 71 }, (_, i) => {
      const xVal = -3.5 + i * 0.1;
      const yVal = xVal * xVal - 3;
      return `${i === 0 ? 'M' : 'L'} ${toX(xVal).toFixed(2)} ${toY(yVal).toFixed(2)}`;
    }).join(' ');
    curveHtml = `
      <g clip-path="url(#vlt-clip-html-${optId})">
        <path d="${dStr}" fill="none" stroke="${strokeColor}" stroke-width="2.2" />
      </g>
    `;
  } else if (type === 'ellipse') {
    curveHtml = `<ellipse cx="${toX(0)}" cy="${toY(0)}" rx="${4 * s}" ry="${3 * s}" fill="none" stroke="${strokeColor}" stroke-width="2.2" />`;
  }

  const gridLines = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
    .map(
      (g) => `
      <line x1="${toX(g)}" y1="24" x2="${toX(g)}" y2="176" stroke="${gridColor}" stroke-width="1" />
      <line x1="24" y1="${toY(g)}" x2="176" y2="${toY(g)}" stroke="${gridColor}" stroke-width="1" />
    `
    )
    .join('');

  const ticks = [-4, -2, 2, 4]
    .map(
      (t) => `
      <line x1="${toX(t)}" y1="${cy0 - 2.5}" x2="${toX(t)}" y2="${cy0 + 2.5}" stroke="${axisColor}" stroke-width="1" />
      <text x="${toX(t)}" y="${cy0 + 10}" font-size="7" font-weight="bold" fill="${axisColor}" text-anchor="middle">${t}</text>
      <line x1="${cx0 - 2.5}" y1="${toY(t)}" x2="${cx0 + 2.5}" y2="${toY(t)}" stroke="${axisColor}" stroke-width="1" />
      <text x="${cx0 - 4}" y="${toY(t) + 2.5}" font-size="7" font-weight="bold" fill="${axisColor}" text-anchor="end">${t}</text>
    `
    )
    .join('');

  return `
    <svg viewBox="0 0 200 200" style="width: 140px; height: 140px; background: #ffffff; border: 1px solid ${
      highlightAsCorrect ? '#059669' : '#cbd5e1'
    }; border-radius: 8px; display: block; margin: 4px auto;">
      <defs>
        <clipPath id="vlt-clip-html-${optId}">
          <rect x="24" y="24" width="152" height="152" />
        </clipPath>
      </defs>
      ${gridLines}
      <line x1="20" y1="${cy0}" x2="180" y2="${cy0}" stroke="${axisColor}" stroke-width="1.5" />
      <line x1="${cx0}" y1="180" x2="${cx0}" y2="20" stroke="${axisColor}" stroke-width="1.5" />
      <polygon points="180,97 186,100 180,103" fill="${axisColor}" />
      <polygon points="97,20 100,14 103,20" fill="${axisColor}" />
      <text x="186" y="103" font-size="9" font-weight="bold" fill="${axisColor}" text-anchor="start">x</text>
      <text x="100" y="11" font-size="9" font-weight="bold" fill="${axisColor}" text-anchor="middle">y</text>
      ${ticks}
      <circle cx="${cx0}" cy="${cy0}" r="1.5" fill="${axisColor}" />
      ${curveHtml}
    </svg>
  `;
}

export function getUnit8CarAGraphHtml(): string {
  const ox = 55;
  const oy = 195;
  const pw = 250;
  const ph = 165;
  const toX = (t: number) => ox + (t / 4) * pw;
  const toY = (d: number) => oy - (d / 260) * ph;

  const lineColor = '#0f172a';
  const gridColor = '#e2e8f0';
  const axisColor = '#1e293b';

  const xGrid = [0, 1, 2, 3, 4]
    .map(
      (t) => `
      <line x1="${toX(t)}" y1="30" x2="${toX(t)}" y2="${oy}" stroke="${gridColor}" stroke-width="1.2" />
      <text x="${toX(t)}" y="${oy + 14}" font-size="10" font-weight="bold" fill="${axisColor}" text-anchor="middle">${t}</text>
    `
    )
    .join('');

  const yGrid = [0, 65, 130, 195, 260]
    .map(
      (d) => `
      <line x1="${ox}" y1="${toY(d)}" x2="${ox + pw}" y2="${toY(d)}" stroke="${gridColor}" stroke-width="1.2" />
      <text x="${ox - 6}" y="${toY(d) + 3.5}" font-size="9" font-weight="bold" fill="${axisColor}" text-anchor="end">${d}</text>
    `
    )
    .join('');

  return `
    <div style="display: flex; flex-direction: column; align-items: center; margin: 8px 0;">
      <svg viewBox="0 0 340 240" style="width: 280px; height: auto; background: #ffffff; border: 1px solid #94a3b8; border-radius: 12px; display: block; padding: 4px;">
        ${xGrid}
        ${yGrid}
        <line x1="${ox}" y1="${oy}" x2="${ox + pw + 15}" y2="${oy}" stroke="${axisColor}" stroke-width="2" />
        <line x1="${ox}" y1="${oy}" x2="${ox}" y2="18" stroke="${axisColor}" stroke-width="2" />
        <polygon points="${ox + pw + 15},${oy - 3} ${ox + pw + 21},${oy} ${ox + pw + 15},${oy + 3}" fill="${axisColor}" />
        <polygon points="${ox - 3},18 ${ox},12 ${ox + 3},18" fill="${axisColor}" />
        <text x="${ox + pw / 2}" y="${oy + 32}" font-size="11" font-weight="800" fill="${axisColor}" text-anchor="middle">Time (hours)</text>
        <text x="12" y="20" font-size="11" font-weight="800" fill="${axisColor}" text-anchor="start">Distance (miles)</text>
        <line x1="${toX(0)}" y1="${toY(0)}" x2="${toX(4)}" y2="${toY(260)}" stroke="${lineColor}" stroke-width="3" />
        <circle cx="${toX(0)}" cy="${toY(0)}" r="4.5" fill="${lineColor}" stroke="#ffffff" stroke-width="2" />
        <circle cx="${toX(2)}" cy="${toY(130)}" r="4.5" fill="${lineColor}" stroke="#ffffff" stroke-width="2" />
        <text x="${toX(0) + 8}" y="${toY(0) - 6}" font-size="10" font-weight="bold" fill="#0f172a" style="paint-order: stroke; stroke: #ffffff; stroke-width: 3px;">(0, 0)</text>
        <text x="${toX(2) + 8}" y="${toY(130) - 6}" font-size="10" font-weight="bold" fill="#0f172a" style="paint-order: stroke; stroke: #ffffff; stroke-width: 3px;">(2, 130)</text>
      </svg>
      <span style="font-size: 11px; color: #64748b; font-weight: 600; margin-top: 4px;">Line passing through (0, 0) and (2, 130)</span>
    </div>
  `;
}

export function getUnit8TableOptionsHtml(
  tableOptions: TableOptionItem[],
  highlightOptionId?: 'A' | 'B' | 'C' | 'D'
): string {
  const cardsHtml = tableOptions
    .map((tblOpt) => {
      const isHighlighted = highlightOptionId === tblOpt.id;
      const rowsHtml = tblOpt.rows
        .map(
          (row) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 2px 10px; font-weight: 600; border-right: 1px solid #e2e8f0; font-family: monospace;">${row[0]}</td>
          <td style="padding: 2px 10px; font-weight: 500; font-family: monospace;">${row[1]}</td>
        </tr>
      `
        )
        .join('');

      return `
      <div style="flex: 1 1 calc(50% - 12px); min-width: 140px; padding: 8px; border: 1px solid ${
        isHighlighted ? '#059669' : '#cbd5e1'
      }; background: ${
        isHighlighted ? '#f0fdf4' : '#ffffff'
      }; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 6px; box-sizing: border-box; break-inside: avoid; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 12px; font-weight: 800; color: #0f172a;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: ${
            isHighlighted ? '#059669' : '#ffffff'
          }; color: ${isHighlighted ? '#ffffff' : '#0f172a'}; border: 1px solid ${
        isHighlighted ? '#059669' : '#64748b'
      }; font-size: 11px;">${tblOpt.id}</span>
          <span>${tblOpt.label}</span>
        </div>
        <table style="text-align: center; font-size: 12px; border-collapse: collapse; border: 1px solid #94a3b8; background: #ffffff; border-radius: 4px; overflow: hidden; min-width: 120px;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold; border-bottom: 1px solid #94a3b8;">
              <th style="padding: 3px 10px; border-right: 1px solid #94a3b8;">${tblOpt.headers[0]}</th>
              <th style="padding: 3px 10px;">${tblOpt.headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
    })
    .join('');

  return `
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 8px 0; width: 100%;">
      ${cardsHtml}
    </div>
  `;
}
