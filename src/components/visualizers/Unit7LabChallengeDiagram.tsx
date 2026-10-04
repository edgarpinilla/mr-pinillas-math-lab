import React from 'react';
import { TransversalDiagramConfig, TriangleDiagramConfig } from '../../data/unit7LabChallenges';

// Helper to compute SVG sector path
function describeSector(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const rad = Math.PI / 180;
  const x1 = cx + r * Math.cos(startDeg * rad);
  const y1 = cy + r * Math.sin(startDeg * rad);
  const x2 = cx + r * Math.cos(endDeg * rad);
  const y2 = cy + r * Math.sin(endDeg * rad);
  let diff = endDeg - startDeg;
  while (diff < 0) diff += 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(
    1
  )} ${y2.toFixed(1)} Z`;
}

// Helper to compute only the arc stroke path (for prominent outer arc ring)
function describeArcOnly(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const rad = Math.PI / 180;
  const x1 = cx + r * Math.cos(startDeg * rad);
  const y1 = cy + r * Math.sin(startDeg * rad);
  const x2 = cx + r * Math.cos(endDeg * rad);
  const y2 = cy + r * Math.sin(endDeg * rad);
  let diff = endDeg - startDeg;
  while (diff < 0) diff += 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(
    1
  )} ${y2.toFixed(1)}`;
}

// ============================================================================
// CHALLENGE DIAGRAM RENDERER (FOR TRANSVERSAL OR TRIANGLE CHALLENGES)
// ============================================================================
export const Unit7ChallengeDiagram: React.FC<{
  diagram: TransversalDiagramConfig | TriangleDiagramConfig;
}> = ({ diagram }) => {
  if (diagram.kind === 'transversal') {
    const { angleAIndex, angleBIndex, labelA, labelB } = diagram;
    const topCx = 340;
    const topCy = 105;
    const botCx = 260;
    const botCy = 215;

    const angleDefs: Record<
      number,
      {
        cx: number;
        cy: number;
        start: number;
        end: number;
        numX: number;
        numY: number;
        anchorX: number;
        anchorY: number;
        badgeX: number;
        badgeY: number;
      }
    > = {
      1: {
        cx: topCx,
        cy: topCy,
        start: 180,
        end: 306,
        numX: 305,
        numY: 82,
        anchorX: 312,
        anchorY: 76,
        badgeX: 195,
        badgeY: 52,
      },
      2: {
        cx: topCx,
        cy: topCy,
        start: 306,
        end: 360,
        numX: 378,
        numY: 85,
        anchorX: 372,
        anchorY: 82,
        badgeX: 475,
        badgeY: 52,
      },
      3: {
        cx: topCx,
        cy: topCy,
        start: 126,
        end: 180,
        numX: 298,
        numY: 128,
        anchorX: 304,
        anchorY: 125,
        badgeX: 185,
        badgeY: 148,
      },
      4: {
        cx: topCx,
        cy: topCy,
        start: 0,
        end: 126,
        numX: 368,
        numY: 134,
        anchorX: 365,
        anchorY: 132,
        badgeX: 480,
        badgeY: 148,
      },
      5: {
        cx: botCx,
        cy: botCy,
        start: 180,
        end: 306,
        numX: 225,
        numY: 192,
        anchorX: 232,
        anchorY: 186,
        badgeX: 125,
        badgeY: 175,
      },
      6: {
        cx: botCx,
        cy: botCy,
        start: 306,
        end: 360,
        numX: 298,
        numY: 195,
        anchorX: 294,
        anchorY: 192,
        badgeX: 410,
        badgeY: 176,
      },
      7: {
        cx: botCx,
        cy: botCy,
        start: 126,
        end: 180,
        numX: 218,
        numY: 238,
        anchorX: 225,
        anchorY: 235,
        badgeX: 125,
        badgeY: 266,
      },
      8: {
        cx: botCx,
        cy: botCy,
        start: 0,
        end: 126,
        numX: 288,
        numY: 244,
        anchorX: 285,
        anchorY: 242,
        badgeX: 405,
        badgeY: 266,
      },
    };

    return (
      <div className="w-full overflow-x-auto bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs space-y-2">
        {/* Legend Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-0.5 text-[11px] font-bold text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-indigo-900 font-extrabold">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              Highlighted Angle 1 (∠{angleAIndex})
            </span>
            <span className="inline-flex items-center gap-1.5 text-sky-900 font-extrabold">
              <span className="w-3 h-3 rounded-full bg-sky-600 inline-block" />
              Highlighted Angle 2 (∠{angleBIndex})
            </span>
          </div>
          <span className="text-slate-400">Non-relevant angles subdued</span>
        </div>

        <svg
          viewBox="0 0 600 315"
          className="w-full max-w-xl mx-auto block select-none"
          role="img"
          aria-label="Parallel lines cut by a transversal with highlighted challenge angles"
        >
          {/* Interior band */}
          <rect x="45" y="105" width="510" height="110" fill="#eef2ff" opacity="0.5" />
          <text x="58" y="123" fill="#6366f1" fontSize="10" fontWeight="800" opacity="0.75">
            INTERIOR REGION
          </text>
          <text x="58" y="92" fill="#94a3b8" fontSize="10" fontWeight="700">
            EXTERIOR
          </text>
          <text x="58" y="234" fill="#94a3b8" fontSize="10" fontWeight="700">
            EXTERIOR
          </text>

          {/* 1. Render non-relevant angles subdued first */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
            if (idx === angleAIndex || idx === angleBIndex) return null;
            const def = angleDefs[idx];
            return (
              <g key={idx} opacity="0.45">
                <path
                  d={describeSector(def.cx, def.cy, 23, def.start, def.end)}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                <text
                  x={def.numX}
                  y={def.numY}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10.5"
                  fontWeight="700"
                >
                  ∠{idx}
                </text>
              </g>
            );
          })}

          {/* 2. Render ONLY the 2 relevant angles with strong visual highlighting */}
          {[
            { idx: angleAIndex, fill: '#4f46e5', stroke: '#3730a3' },
            { idx: angleBIndex, fill: '#0284c7', stroke: '#0369a1' },
          ].map(({ idx, fill, stroke }) => {
            const def = angleDefs[idx];
            return (
              <g key={idx}>
                <path
                  d={describeSector(def.cx, def.cy, 44, def.start, def.end)}
                  fill={fill}
                  fillOpacity="0.32"
                  stroke={stroke}
                  strokeWidth="3"
                />
                <path
                  d={describeArcOnly(def.cx, def.cy, 44, def.start, def.end)}
                  fill="none"
                  stroke={stroke}
                  strokeWidth="4"
                />
                <text
                  x={def.numX}
                  y={def.numY}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="13.5"
                  fontWeight="900"
                >
                  ∠{idx}
                </text>
              </g>
            );
          })}

          {/* Parallel Line l */}
          <line x1="45" y1="105" x2="555" y2="105" stroke="#0f172a" strokeWidth="3.5" />
          <polygon points="40,105 52,99 52,111" fill="#0f172a" />
          <polygon points="560,105 548,99 548,111" fill="#0f172a" />
          <polygon points="485,105 473,98 473,112" fill="#2563eb" />
          <polygon points="496,105 484,98 484,112" fill="#2563eb" />
          <text x="530" y="90" fill="#0f172a" fontSize="15" fontWeight="900" fontStyle="italic">
            l
          </text>

          {/* Parallel Line m */}
          <line x1="45" y1="215" x2="555" y2="215" stroke="#0f172a" strokeWidth="3.5" />
          <polygon points="40,215 52,209 52,221" fill="#0f172a" />
          <polygon points="560,215 548,209 548,221" fill="#0f172a" />
          <polygon points="485,215 473,208 473,222" fill="#2563eb" />
          <polygon points="496,215 484,208 484,222" fill="#2563eb" />
          <text x="530" y="200" fill="#0f172a" fontSize="15" fontWeight="900" fontStyle="italic">
            m
          </text>

          {/* Transversal t */}
          <line x1="395" y1="29" x2="205" y2="291" stroke="#334155" strokeWidth="3" />
          <text x="405" y="42" fill="#334155" fontSize="15" fontWeight="900" fontStyle="italic">
            t
          </text>

          {/* Connector & Callout Badge for Highlighted Angle A */}
          {(() => {
            const def = angleDefs[angleAIndex];
            return (
              <g>
                <line
                  x1={def.anchorX}
                  y1={def.anchorY}
                  x2={def.badgeX}
                  y2={def.badgeY}
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <rect
                  x={def.badgeX - 74}
                  y={def.badgeY - 23}
                  width="148"
                  height="44"
                  rx="10"
                  fill="#eef2ff"
                  stroke="#4338ca"
                  strokeWidth="2.5"
                />
                <text
                  x={def.badgeX}
                  y={def.badgeY - 7}
                  textAnchor="middle"
                  fill="#4338ca"
                  fontSize="9.5"
                  fontWeight="800"
                >
                  HIGHLIGHTED ANGLE 1
                </text>
                <text
                  x={def.badgeX}
                  y={def.badgeY + 11}
                  textAnchor="middle"
                  fill="#1e1b4b"
                  fontSize="13"
                  fontWeight="900"
                >
                  ∠{angleAIndex} = {labelA}
                </text>
              </g>
            );
          })()}

          {/* Connector & Callout Badge for Highlighted Angle B */}
          {(() => {
            const def = angleDefs[angleBIndex];
            return (
              <g>
                <line
                  x1={def.anchorX}
                  y1={def.anchorY}
                  x2={def.badgeX}
                  y2={def.badgeY}
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <rect
                  x={def.badgeX - 74}
                  y={def.badgeY - 23}
                  width="148"
                  height="44"
                  rx="10"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2.5"
                />
                <text
                  x={def.badgeX}
                  y={def.badgeY - 7}
                  textAnchor="middle"
                  fill="#0369a1"
                  fontSize="9.5"
                  fontWeight="800"
                >
                  HIGHLIGHTED ANGLE 2
                </text>
                <text
                  x={def.badgeX}
                  y={def.badgeY + 11}
                  textAnchor="middle"
                  fill="#0c4a6e"
                  fontSize="13"
                  fontWeight="900"
                >
                  ∠{angleBIndex} = {labelB}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
    );
  }

  // ==========================================================================
  // TRIANGLE CHALLENGE DIAGRAM (EXTERIOR ANGLE THEOREM & TRIANGLE SUM THEOREM)
  // ==========================================================================
  const { showExterior, labelA, labelB, labelC, labelExt } = diagram;
  // Vertices: A(125, 232), B(255, 62), C(405, 232), D(555, 232)
  const isExteriorProblem = showExterior;

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs space-y-2">
      {/* Visual Color Grouping Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-0.5 text-[11px] font-bold">
        {isExteriorProblem ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-blue-800 font-extrabold">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              Blue = Remote Interior Angles (∠A & ∠B)
            </span>
            <span className="inline-flex items-center gap-1.5 text-orange-800 font-extrabold">
              <span className="w-3 h-3 rounded-full bg-orange-600 inline-block" />
              Orange/Red = Exterior Angle (∠ACD)
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-indigo-800 font-extrabold">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              Highlighted = 3 Triangle Interior Angles (∠A, ∠B, ∠C)
            </span>
          </div>
        )}
      </div>

      <svg
        viewBox="0 0 600 305"
        className="w-full max-w-xl mx-auto block select-none"
        role="img"
        aria-label="Triangle angle diagram with highlighted relevant angles and orientation labels"
      >
        {/* Triangle Interior Fill */}
        <polygon
          points="125,232 255,62 405,232"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Extended Side CD if showExterior */}
        {showExterior && (
          <g>
            <line
              x1="405"
              y1="232"
              x2="555"
              y2="232"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon points="562,232 548,225 548,239" fill="#0f172a" />
            <circle cx="528" cy="232" r="4" fill="#0f172a" />
            <text x="528" y="256" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
              D
            </text>
          </g>
        )}

        {/* ===================================================================
            ANGLE ARCS & SECTORS
            - Exterior Angle Theorem:
              Remote Interior 1 (∠A) & Remote Interior 2 (∠B) -> same blue-family
              Exterior Angle (∠ACD) -> contrasting orange/red-family
              Adjacent Interior ∠ACB -> subdued (or dashed target if Type D)
            - Triangle Sum Theorem:
              All 3 Interior Angles (∠A, ∠B, ∠C) -> prominent blue/indigo-family
        =================================================================== */}

        {/* Angle A Sector at (125, 232): B is at ~307 deg, C is at 360 deg */}
        <path
          d={describeSector(125, 232, 46, 307, 360)}
          fill="#2563eb"
          fillOpacity="0.28"
          stroke="#1d4ed8"
          strokeWidth="3"
        />
        <path
          d={describeArcOnly(125, 232, 46, 307, 360)}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="4.5"
        />

        {/* Angle B Sector at (255, 62): C is at ~49 deg, A is at ~127 deg */}
        <path
          d={describeSector(255, 62, 46, 49, 127)}
          fill="#2563eb"
          fillOpacity="0.28"
          stroke="#1d4ed8"
          strokeWidth="3"
        />
        <path
          d={describeArcOnly(255, 62, 46, 49, 127)}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="4.5"
        />

        {/* Interior Angle C Sector at (405, 232): A is at 180 deg, B is at 229 deg */}
        {!isExteriorProblem ? (
          <g>
            <path
              d={describeSector(405, 232, 46, 180, 229)}
              fill="#2563eb"
              fillOpacity="0.28"
              stroke="#1d4ed8"
              strokeWidth="3"
            />
            <path
              d={describeArcOnly(405, 232, 46, 180, 229)}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="4.5"
            />
          </g>
        ) : (
          /* Subdued interior angle at C during Exterior Angle Theorem problems */
          <path
            d={describeSector(405, 232, 28, 180, 229)}
            fill={labelC ? '#fef3c7' : '#f1f5f9'}
            fillOpacity={labelC ? '0.65' : '0.45'}
            stroke={labelC ? '#d97706' : '#cbd5e1'}
            strokeWidth={labelC ? '2' : '1.2'}
            strokeDasharray={labelC ? '3 2' : undefined}
          />
        )}

        {/* Exterior Angle ACD Sector at (405, 232): B is at 229 deg, D is at 360 deg */}
        {isExteriorProblem && (
          <g>
            <path
              d={describeSector(405, 232, 50, 229, 360)}
              fill="#ea580c"
              fillOpacity="0.28"
              stroke="#dc2626"
              strokeWidth="3"
            />
            <path
              d={describeArcOnly(405, 232, 50, 229, 360)}
              fill="none"
              stroke="#dc2626"
              strokeWidth="4.5"
            />
            {/* Second inner arc ring to visually distinguish the exterior angle */}
            <path
              d={describeArcOnly(405, 232, 42, 229, 360)}
              fill="none"
              stroke="#ea580c"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Vertex Dots & Labels */}
        <circle cx="125" cy="232" r="4.5" fill="#0f172a" />
        <text x="103" y="252" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          A
        </text>

        <circle cx="255" cy="62" r="4.5" fill="#0f172a" />
        <text x="255" y="42" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          B
        </text>

        <circle cx="405" cy="232" r="4.5" fill="#0f172a" />
        <text x="405" y="256" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          C
        </text>

        {/* ===================================================================
            CALLOUT BADGES WITH ROLE LABELS & CONNECTOR LINES
        =================================================================== */}

        {/* Callout Badge for ∠A */}
        {labelA && (
          <g>
            <line
              x1="152"
              y1="212"
              x2="102"
              y2="176"
              stroke="#1d4ed8"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            <rect
              x="22"
              y="130"
              width="152"
              height="46"
              rx="10"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2.5"
            />
            <text x="98" y="147" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="800">
              {isExteriorProblem ? 'Remote Interior 1' : 'Interior Angle 1'}
            </text>
            <text x="98" y="166" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="900">
              ∠A = {labelA}
            </text>
          </g>
        )}

        {/* Callout Badge for ∠B */}
        {labelB && (
          <g>
            <line
              x1="255"
              y1="96"
              x2="352"
              y2="68"
              stroke="#1d4ed8"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            <rect
              x="296"
              y="32"
              width="156"
              height="46"
              rx="10"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2.5"
            />
            <text x="374" y="49" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="800">
              {isExteriorProblem ? 'Remote Interior 2' : 'Interior Angle 2'}
            </text>
            <text x="374" y="68" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="900">
              ∠B = {labelB}
            </text>
          </g>
        )}

        {/* Callout Badge for Interior ∠C */}
        {labelC && (
          <g>
            <line
              x1="372"
              y1="215"
              x2="310"
              y2="205"
              stroke={isExteriorProblem ? '#d97706' : '#1d4ed8'}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <rect
              x="218"
              y="175"
              width="148"
              height="44"
              rx="10"
              fill={isExteriorProblem ? '#fef3c7' : '#dbeafe'}
              stroke={isExteriorProblem ? '#d97706' : '#1d4ed8'}
              strokeWidth="2.5"
            />
            <text
              x="292"
              y="191"
              textAnchor="middle"
              fill={isExteriorProblem ? '#92400e' : '#1e40af'}
              fontSize="10"
              fontWeight="800"
            >
              {isExteriorProblem ? 'Adjacent Interior' : 'Interior Angle 3'}
            </text>
            <text
              x="292"
              y="209"
              textAnchor="middle"
              fill={isExteriorProblem ? '#78350f' : '#1e3a8a'}
              fontSize="13"
              fontWeight="900"
            >
              ∠ACB = {labelC}
            </text>
          </g>
        )}

        {/* Callout Badge for Exterior ∠ACD */}
        {showExterior && labelExt && (
          <g>
            <line
              x1="442"
              y1="205"
              x2="498"
              y2="174"
              stroke="#dc2626"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            <rect
              x="426"
              y="128"
              width="158"
              height="46"
              rx="10"
              fill="#ffedd5"
              stroke="#dc2626"
              strokeWidth="2.5"
            />
            <text x="505" y="145" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="800">
              Exterior Angle
            </text>
            <text x="505" y="164" textAnchor="middle" fill="#7c2d12" fontSize="13" fontWeight="900">
              ∠ACD = {labelExt}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
