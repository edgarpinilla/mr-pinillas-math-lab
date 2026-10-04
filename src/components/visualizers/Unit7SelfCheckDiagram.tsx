import React from 'react';
import { Unit7SelfCheckDiagramConfig } from '../../data/unit7SelfCheckQuestions';

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

export const Unit7SelfCheckDiagram: React.FC<{
  diagram: Unit7SelfCheckDiagramConfig;
}> = ({ diagram }) => {
  // =========================================================================
  // 1. PARALLEL LINES & TRANSVERSAL DIAGRAM
  // =========================================================================
  if (diagram.kind === 'transversal') {
    const { angleAIndex, angleBIndex, labelA, labelB, roleLabelA, roleLabelB } = diagram;
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
      <div className="w-full overflow-x-auto bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs">
        <svg
          viewBox="0 0 600 310"
          className="w-full max-w-xl mx-auto block select-none"
          role="img"
          aria-label="Parallel lines l and m cut by transversal t with highlighted angles"
        >
          <rect x="45" y="105" width="510" height="110" fill="#eef2ff" opacity="0.5" />
          <text x="58" y="123" fill="#6366f1" fontSize="10" fontWeight="800" opacity="0.75">
            INTERIOR REGION
          </text>

          {/* Subdued non-relevant angles */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
            if (idx === angleAIndex || idx === angleBIndex) return null;
            const def = angleDefs[idx];
            return (
              <g key={idx} opacity="0.45">
                <path
                  d={describeSector(def.cx, def.cy, 22, def.start, def.end)}
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

          {/* Highlighted Relevant Angles */}
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
                  strokeWidth="4.5"
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

          {/* Callout Badge A */}
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
                  x={def.badgeX - 75}
                  y={def.badgeY - 22}
                  width="150"
                  height="42"
                  rx="10"
                  fill="#eef2ff"
                  stroke="#4338ca"
                  strokeWidth="2.5"
                />
                <text
                  x={def.badgeX}
                  y={def.badgeY - 6}
                  textAnchor="middle"
                  fill="#4338ca"
                  fontSize="9.5"
                  fontWeight="800"
                >
                  {roleLabelA || 'HIGHLIGHTED ANGLE 1'}
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

          {/* Callout Badge B */}
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
                  x={def.badgeX - 75}
                  y={def.badgeY - 22}
                  width="150"
                  height="42"
                  rx="10"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2.5"
                />
                <text
                  x={def.badgeX}
                  y={def.badgeY - 6}
                  textAnchor="middle"
                  fill="#0369a1"
                  fontSize="9.5"
                  fontWeight="800"
                >
                  {roleLabelB || 'HIGHLIGHTED ANGLE 2'}
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

  // =========================================================================
  // 2. TRIANGLE SUM / EXTERIOR ANGLE THEOREM DIAGRAM
  // =========================================================================
  if (diagram.kind === 'triangle') {
    const { showExterior, vertexLabels, labelA, labelB, labelC, labelExt } = diagram;
    const [vA, vB, vC, vD = 'D'] = vertexLabels || ['A', 'B', 'C', 'D'];
    const isExterior = showExterior;

    return (
      <div className="w-full overflow-x-auto bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs">
        <svg
          viewBox="0 0 600 295"
          className="w-full max-w-xl mx-auto block select-none"
          role="img"
          aria-label="Triangle diagram with highlighted interior and exterior angles"
        >
          <polygon
            points="125,232 255,62 405,232"
            fill="#f8fafc"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {isExterior && (
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
              <text
                x="528"
                y="256"
                textAnchor="middle"
                fill="#0f172a"
                fontSize="15"
                fontWeight="900"
              >
                {vD}
              </text>
            </g>
          )}

          {/* Angle A Arc */}
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

          {/* Angle B Arc */}
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

          {/* Angle C Arc (highlighted if Triangle Sum, subdued if Exterior Angle) */}
          {!isExterior ? (
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
            <path
              d={describeSector(405, 232, 26, 180, 229)}
              fill="#f1f5f9"
              fillOpacity="0.5"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
          )}

          {/* Exterior Angle Arc */}
          {isExterior && (
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
              <path
                d={describeArcOnly(405, 232, 42, 229, 360)}
                fill="none"
                stroke="#ea580c"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Vertices */}
          <circle cx="125" cy="232" r="4.5" fill="#0f172a" />
          <text x="103" y="252" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
            {vA}
          </text>

          <circle cx="255" cy="62" r="4.5" fill="#0f172a" />
          <text x="255" y="42" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
            {vB}
          </text>

          <circle cx="405" cy="232" r="4.5" fill="#0f172a" />
          <text x="405" y="256" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
            {vC}
          </text>

          {/* Badge A */}
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
              <text
                x="98"
                y="147"
                textAnchor="middle"
                fill="#1e40af"
                fontSize="10"
                fontWeight="800"
              >
                {isExterior ? 'Remote Interior 1' : 'Interior Angle 1'}
              </text>
              <text
                x="98"
                y="166"
                textAnchor="middle"
                fill="#1e3a8a"
                fontSize="13"
                fontWeight="900"
              >
                ∠{vA} = {labelA}
              </text>
            </g>
          )}

          {/* Badge B */}
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
              <text
                x="374"
                y="49"
                textAnchor="middle"
                fill="#1e40af"
                fontSize="10"
                fontWeight="800"
              >
                {isExterior ? 'Remote Interior 2' : 'Interior Angle 2'}
              </text>
              <text
                x="374"
                y="68"
                textAnchor="middle"
                fill="#1e3a8a"
                fontSize="13"
                fontWeight="900"
              >
                ∠{vB} = {labelB}
              </text>
            </g>
          )}

          {/* Badge C */}
          {labelC && (
            <g>
              <line
                x1="372"
                y1="215"
                x2="310"
                y2="205"
                stroke="#1d4ed8"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <rect
                x="218"
                y="175"
                width="148"
                height="44"
                rx="10"
                fill="#dbeafe"
                stroke="#1d4ed8"
                strokeWidth="2.5"
              />
              <text
                x="292"
                y="191"
                textAnchor="middle"
                fill="#1e40af"
                fontSize="10"
                fontWeight="800"
              >
                Interior Angle 3
              </text>
              <text
                x="292"
                y="209"
                textAnchor="middle"
                fill="#1e3a8a"
                fontSize="13"
                fontWeight="900"
              >
                ∠{vC} = {labelC}
              </text>
            </g>
          )}

          {/* Badge Exterior */}
          {isExterior && labelExt && (
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
                x="424"
                y="128"
                width="162"
                height="46"
                rx="10"
                fill="#ffedd5"
                stroke="#dc2626"
                strokeWidth="2.5"
              />
              <text
                x="505"
                y="145"
                textAnchor="middle"
                fill="#c2410c"
                fontSize="10"
                fontWeight="800"
              >
                Exterior Angle
              </text>
              <text
                x="505"
                y="164"
                textAnchor="middle"
                fill="#7c2d12"
                fontSize="13"
                fontWeight="900"
              >
                ∠{vB}
                {vC}
                {vD} = {labelExt}
              </text>
            </g>
          )}
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 3. SIDE-BY-SIDE AA SIMILARITY TRIANGLES DIAGRAM
  // =========================================================================
  const { tri1Vertices, tri2Vertices, tri1Angles, tri2Angles, highlightPairs = ['left', 'top'] } =
    diagram;
  const [v1L, v1T, v1R] = tri1Vertices;
  const [v2L, v2T, v2R] = tri2Vertices;
  const [a1L, a1T, a1R] = tri1Angles;
  const [a2L, a2T, a2R] = tri2Angles;

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs">
      <svg
        viewBox="0 0 640 275"
        className="w-full max-w-2xl mx-auto block select-none"
        role="img"
        aria-label="Side-by-side triangles comparing corresponding angle measures for AA similarity"
      >
        {/* Left Triangle: (55, 220), (160, 58), (285, 220) */}
        <polygon
          points="55,220 160,58 285,220"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Left Triangle Angle Arcs */}
        {highlightPairs.includes('left') && (
          <path
            d={describeSector(55, 220, 38, 303, 360)}
            fill="#4f46e5"
            fillOpacity="0.28"
            stroke="#4338ca"
            strokeWidth="3"
          />
        )}
        {highlightPairs.includes('top') && (
          <path
            d={describeSector(160, 58, 38, 52, 123)}
            fill="#0284c7"
            fillOpacity="0.28"
            stroke="#0369a1"
            strokeWidth="3"
          />
        )}
        {highlightPairs.includes('right') && (
          <path
            d={describeSector(285, 220, 38, 180, 232)}
            fill="#059669"
            fillOpacity="0.28"
            stroke="#047857"
            strokeWidth="3"
          />
        )}

        {/* Left Triangle Vertices */}
        <text x="38" y="238" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v1L}
        </text>
        <text x="160" y="40" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v1T}
        </text>
        <text x="300" y="238" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v1R}
        </text>

        {/* Left Triangle Angle Labels */}
        {a1L && (
          <g>
            <rect
              x="22"
              y="142"
              width="95"
              height="28"
              rx="7"
              fill="#eef2ff"
              stroke="#4338ca"
              strokeWidth="2"
            />
            <text x="69" y="160" textAnchor="middle" fill="#1e1b4b" fontSize="11.5" fontWeight="900">
              ∠{v1L} = {a1L}
            </text>
          </g>
        )}
        {a1T && (
          <g>
            <rect
              x="192"
              y="48"
              width="108"
              height="28"
              rx="7"
              fill="#e0f2fe"
              stroke="#0369a1"
              strokeWidth="2"
            />
            <text x="246" y="66" textAnchor="middle" fill="#0c4a6e" fontSize="11.5" fontWeight="900">
              ∠{v1T} = {a1T}
            </text>
          </g>
        )}
        {a1R && (
          <g>
            <rect
              x="175"
              y="182"
              width="95"
              height="28"
              rx="7"
              fill="#ecfdf5"
              stroke="#059669"
              strokeWidth="2"
            />
            <text x="222" y="200" textAnchor="middle" fill="#065f46" fontSize="11.5" fontWeight="900">
              ∠{v1R} = {a1R}
            </text>
          </g>
        )}

        {/* Right Triangle (scaled slightly): (365, 220), (455, 80), (565, 220) */}
        <polygon
          points="365,220 455,80 565,220"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {highlightPairs.includes('left') && (
          <path
            d={describeSector(365, 220, 34, 303, 360)}
            fill="#4f46e5"
            fillOpacity="0.28"
            stroke="#4338ca"
            strokeWidth="3"
          />
        )}
        {highlightPairs.includes('top') && (
          <path
            d={describeSector(455, 80, 34, 52, 123)}
            fill="#0284c7"
            fillOpacity="0.28"
            stroke="#0369a1"
            strokeWidth="3"
          />
        )}
        {highlightPairs.includes('right') && (
          <path
            d={describeSector(565, 220, 34, 180, 232)}
            fill="#059669"
            fillOpacity="0.28"
            stroke="#047857"
            strokeWidth="3"
          />
        )}

        {/* Right Triangle Vertices */}
        <text x="348" y="238" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v2L}
        </text>
        <text x="455" y="62" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v2T}
        </text>
        <text x="580" y="238" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
          {v2R}
        </text>

        {/* Right Triangle Angle Labels */}
        {a2L && (
          <g>
            <rect
              x="332"
              y="142"
              width="95"
              height="28"
              rx="7"
              fill="#eef2ff"
              stroke="#4338ca"
              strokeWidth="2"
            />
            <text x="379" y="160" textAnchor="middle" fill="#1e1b4b" fontSize="11.5" fontWeight="900">
              ∠{v2L} = {a2L}
            </text>
          </g>
        )}
        {a2T && (
          <g>
            <rect
              x="485"
              y="66"
              width="105"
              height="28"
              rx="7"
              fill="#e0f2fe"
              stroke="#0369a1"
              strokeWidth="2"
            />
            <text x="537" y="84" textAnchor="middle" fill="#0c4a6e" fontSize="11.5" fontWeight="900">
              ∠{v2T} = {a2T}
            </text>
          </g>
        )}
        {a2R && (
          <g>
            <rect
              x="462"
              y="182"
              width="95"
              height="28"
              rx="7"
              fill="#ecfdf5"
              stroke="#059669"
              strokeWidth="2"
            />
            <text x="509" y="200" textAnchor="middle" fill="#065f46" fontSize="11.5" fontWeight="900">
              ∠{v2R} = {a2R}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
