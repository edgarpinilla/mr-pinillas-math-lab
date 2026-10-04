// src/components/visualizers/Unit7DigitalStaarDiagrams.tsx
// Accurate SVG Geometry Diagrams for Unit 7 Digital STAAR Simulator (Q1–Q12)

import React from 'react';
import { Unit7DigitalStaarQuestion } from '../../data/staar/digitalStaarAngleRelationshipsData';
import { Unit7SelfCheckDiagram } from './Unit7SelfCheckDiagram';

// Helper to compute SVG sector path for interactive hot spots
function describeArcSector(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  let diff = endDeg - startDeg;
  if (diff < 0) diff += 360;
  const largeArcFlag = diff > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
}

interface Unit7DigitalStaarDiagramProps {
  question: Unit7DigitalStaarQuestion;
  // Q1 Hot Spot state
  selectedHotSpotAngle?: number | null;
  onSelectHotSpotAngle?: (angleNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
  // Q12 Hot Spot state
  selectedQ12AngleId?: 'angle-D' | 'angle-E' | 'angle-AEB' | 'angle-DEC' | null;
  onSelectQ12Angle?: (angleId: 'angle-D' | 'angle-E' | 'angle-AEB' | 'angle-DEC') => void;
}

export const Unit7DigitalStaarDiagram: React.FC<Unit7DigitalStaarDiagramProps> = ({
  question,
  selectedHotSpotAngle,
  onSelectHotSpotAngle,
  selectedQ12AngleId,
  onSelectQ12Angle,
}) => {
  // ===========================================================================
  // Q1 — INTERACTIVE HOT SPOT PARALLEL LINES & TRANSVERSAL DIAGRAM
  // ===========================================================================
  if (question.kind === 'q1-hotspot') {
    // Top intersection: (265, 95), Bottom intersection: (205, 225)
    // Transversal direction angle ~115° (and 295°)
    const topCx = 265;
    const topCy = 95;
    const botCx = 205;
    const botCy = 225;

    const angles: {
      num: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      cx: number;
      cy: number;
      startDeg: number;
      endDeg: number;
      labelX: number;
      labelY: number;
    }[] = [
      { num: 1, cx: topCx, cy: topCy, startDeg: 180, endDeg: 295, labelX: topCx - 42, labelY: topCy - 24 },
      { num: 2, cx: topCx, cy: topCy, startDeg: 295, endDeg: 360, labelX: topCx + 42, labelY: topCy - 22 },
      { num: 3, cx: topCx, cy: topCy, startDeg: 115, endDeg: 180, labelX: topCx - 44, labelY: topCy + 28 },
      { num: 4, cx: topCx, cy: topCy, startDeg: 0, endDeg: 115, labelX: topCx + 42, labelY: topCy + 28 },
      { num: 5, cx: botCx, cy: botCy, startDeg: 180, endDeg: 295, labelX: botCx - 42, labelY: botCy - 24 },
      { num: 6, cx: botCx, cy: botCy, startDeg: 295, endDeg: 360, labelX: botCx + 42, labelY: botCy - 22 },
      { num: 7, cx: botCx, cy: botCy, startDeg: 115, endDeg: 180, labelX: botCx - 44, labelY: botCy + 28 },
      { num: 8, cx: botCx, cy: botCy, startDeg: 0, endDeg: 115, labelX: botCx + 42, labelY: botCy + 28 },
    ];

    return (
      <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-3 sm:p-4 shadow-2xs">
        <svg viewBox="0 0 480 320" className="w-full h-auto max-h-[340px] mx-auto select-none">
          {/* Parallel Line l (y = 95) */}
          <line x1="45" y1="95" x2="435" y2="95" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Parallel arrow markings on Line l */}
          <path d="M 130 88 L 140 95 L 130 102" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 138 88 L 148 95 L 138 102" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="415" y="82" fontSize="14" fontWeight="900" fontStyle="italic" fill="#0f172a">
            l
          </text>

          {/* Parallel Line m (y = 225) */}
          <line x1="45" y1="225" x2="435" y2="225" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Parallel arrow markings on Line m */}
          <path d="M 100 218 L 110 225 L 100 232" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 108 218 L 118 225 L 108 232" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="415" y="212" fontSize="14" fontWeight="900" fontStyle="italic" fill="#0f172a">
            m
          </text>

          {/* Transversal t passing through (265,95) and (205,225) */}
          <line x1="297" y1="25" x2="173" y2="295" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
          <text x="308" y="38" fontSize="14" fontWeight="900" fontStyle="italic" fill="#334155">
            t
          </text>

          {/* Interactive Angle Sectors & Hot Spot Pills */}
          {angles.map((a) => {
            const isReference = a.num === question.referenceAngle;
            const isSelected = selectedHotSpotAngle === a.num;

            return (
              <g
                key={a.num}
                onClick={() => {
                  if (!isReference && onSelectHotSpotAngle) {
                    onSelectHotSpotAngle(a.num);
                  }
                }}
                className={isReference ? 'cursor-default' : 'cursor-pointer group'}
              >
                {/* Clickable Wedge */}
                <path
                  d={describeArcSector(a.cx, a.cy, isReference || isSelected ? 46 : 38, a.startDeg, a.endDeg)}
                  fill={
                    isReference
                      ? 'rgba(245, 158, 11, 0.35)'
                      : isSelected
                      ? 'rgba(79, 70, 229, 0.38)'
                      : 'rgba(148, 163, 184, 0.14)'
                  }
                  stroke={
                    isReference
                      ? '#d97706'
                      : isSelected
                      ? '#4f46e5'
                      : '#94a3b8'
                  }
                  strokeWidth={isReference || isSelected ? 3 : 1.5}
                />

                {/* Clickable Pill Badge for Chromebook / Touch reliability */}
                <rect
                  x={a.labelX - 24}
                  y={a.labelY - 14}
                  width="48"
                  height="26"
                  rx="8"
                  fill={
                    isReference
                      ? '#fef3c7'
                      : isSelected
                      ? '#4f46e5'
                      : '#ffffff'
                  }
                  stroke={
                    isReference
                      ? '#d97706'
                      : isSelected
                      ? '#312e81'
                      : '#cbd5e1'
                  }
                  strokeWidth={isReference || isSelected ? 2.5 : 1.5}
                />
                <text
                  x={a.labelX}
                  y={a.labelY + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="900"
                  fill={
                    isReference
                      ? '#92400e'
                      : isSelected
                      ? '#ffffff'
                      : '#1e293b'
                  }
                >
                  ∠{a.num}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <rect x="16" y="14" width="175" height="28" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
          <text x="103" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">
            Highlighted Angle: ∠3
          </text>
        </svg>
      </div>
    );
  }

  // ===========================================================================
  // Q2 & Q3 — PARALLEL LINES & TRANSVERSAL WITH HIGHLIGHTED ANGLES
  // ===========================================================================
  if (question.kind === 'q2-inline-choice' || question.kind === 'q3-numeric-equation') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'transversal',
          angleAIndex: question.angleAIndex,
          angleBIndex: question.angleBIndex,
          labelA: question.labelA,
          labelB: question.labelB,
          roleLabelA: `Angle ∠${question.angleAIndex}`,
          roleLabelB: `Angle ∠${question.angleBIndex}`,
        }}
      />
    );
  }

  // ===========================================================================
  // Q4 — NUMBERED PARALLEL LINES & TRANSVERSAL DIAGRAM (∠1–∠8)
  // ===========================================================================
  if (question.kind === 'q4-drag-drop-classification') {
    const topCx = 265;
    const topCy = 95;
    const botCx = 205;
    const botCy = 225;

    const labels = [
      { num: 1, x: topCx - 38, y: topCy - 18 },
      { num: 2, x: topCx + 38, y: topCy - 18 },
      { num: 3, x: topCx - 38, y: topCy + 26 },
      { num: 4, x: topCx + 38, y: topCy + 26 },
      { num: 5, x: botCx - 38, y: botCy - 18 },
      { num: 6, x: botCx + 38, y: botCy - 18 },
      { num: 7, x: botCx - 38, y: botCy + 26 },
      { num: 8, x: botCx + 38, y: botCy + 26 },
    ];

    return (
      <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-3 sm:p-4 shadow-2xs">
        <svg viewBox="0 0 480 310" className="w-full h-auto max-h-[320px] mx-auto select-none">
          {/* Interior shading between parallel lines */}
          <rect x="45" y="95" width="390" height="130" fill="#f8fafc" />
          <text x="65" y="164" fontSize="11" fontWeight="800" fill="#64748b">
            INTERIOR REGION (l ∥ m)
          </text>

          {/* Line l */}
          <line x1="45" y1="95" x2="435" y2="95" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 135 88 L 145 95 L 135 102" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 143 88 L 153 95 L 143 102" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="418" y="82" fontSize="14" fontWeight="900" fontStyle="italic" fill="#0f172a">
            l
          </text>

          {/* Line m */}
          <line x1="45" y1="225" x2="435" y2="225" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 105 218 L 115 225 L 105 232" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 113 218 L 123 225 L 113 232" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="418" y="212" fontSize="14" fontWeight="900" fontStyle="italic" fill="#0f172a">
            m
          </text>

          {/* Transversal t */}
          <line x1="297" y1="25" x2="173" y2="295" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
          <text x="308" y="38" fontSize="14" fontWeight="900" fontStyle="italic" fill="#334155">
            t
          </text>

          {/* Angle Number Badges */}
          {labels.map((item) => (
            <g key={item.num}>
              <rect
                x={item.x - 20}
                y={item.y - 13}
                width="40"
                height="24"
                rx="7"
                fill="#eef2ff"
                stroke="#6366f1"
                strokeWidth="1.8"
              />
              <text
                x={item.x}
                y={item.y + 3}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="#312e81"
              >
                ∠{item.num}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // ===========================================================================
  // Q5 — LINE DE PARALLEL TO BASE BC OF TRIANGLE ABC
  // ===========================================================================
  if (question.kind === 'q5-multi-select') {
    // Vertex A at (240, 80) on line DE (y = 80)
    // Base B at (110, 250), C at (370, 250) on line BC (y = 250)
    return (
      <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-3 sm:p-4 shadow-2xs">
        <svg viewBox="0 0 480 310" className="w-full h-auto max-h-[320px] mx-auto select-none">
          {/* Parallel line DE through A (y = 80) */}
          <line x1="40" y1="80" x2="440" y2="80" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Parallel arrows on DE */}
          <path d="M 140 73 L 150 80 L 140 87" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 148 73 L 158 80 L 148 87" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="52" y="66" fontSize="13" fontWeight="900" fill="#0f172a">
            D
          </text>
          <text x="240" y="62" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">
            A
          </text>
          <text x="425" y="66" fontSize="13" fontWeight="900" fill="#0f172a">
            E
          </text>

          {/* Base segment BC extended slightly */}
          <line x1="65" y1="250" x2="415" y2="250" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Parallel arrows on BC */}
          <path d="M 235 243 L 245 250 L 235 257" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 243 243 L 253 250 L 243 257" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="95" y="274" fontSize="14" fontWeight="900" fill="#0f172a">
            B
          </text>
          <text x="382" y="274" fontSize="14" fontWeight="900" fill="#0f172a">
            C
          </text>

          {/* Triangle sides AB and AC */}
          <polygon
            points="240,80 110,250 370,250"
            fill="rgba(79, 70, 229, 0.06)"
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Angle DAB (between ray AD at 180° and AB at ~127°) */}
          <path
            d={describeArcSector(240, 80, 44, 127, 180)}
            fill="rgba(245, 158, 11, 0.3)"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          <rect x="148" y="92" width="54" height="24" rx="6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.8" />
          <text x="175" y="108" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400e">
            54°
          </text>

          {/* Angle BAC (interior at A: 53° to 127°) */}
          <path
            d={describeArcSector(240, 80, 40, 53, 127)}
            fill="rgba(79, 70, 229, 0.25)"
            stroke="#4f46e5"
            strokeWidth="2.5"
          />
          <rect x="213" y="126" width="54" height="24" rx="6" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.8" />
          <text x="240" y="142" textAnchor="middle" fontSize="12" fontWeight="900" fill="#312e81">
            68°
          </text>

          {/* Angle EAC (between AC at 53° and ray AE at 0°) */}
          <path
            d={describeArcSector(240, 80, 44, 0, 53)}
            fill="rgba(16, 185, 129, 0.25)"
            stroke="#059669"
            strokeWidth="2.5"
          />
          <text x="305" y="106" fontSize="12" fontWeight="900" fill="#065f46">
            ∠EAC
          </text>

          {/* Angle ABC at vertex B (110, 250) */}
          <path
            d={describeArcSector(110, 250, 42, 307, 360)}
            fill="rgba(245, 158, 11, 0.3)"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          <rect x="145" y="214" width="52" height="24" rx="6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.8" />
          <text x="171" y="230" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400e">
            54°
          </text>

          {/* Angle ACB at vertex C (370, 250) */}
          <path
            d={describeArcSector(370, 250, 42, 180, 233)}
            fill="rgba(16, 185, 129, 0.25)"
            stroke="#059669"
            strokeWidth="2.5"
          />
          <text x="305" y="234" fontSize="12" fontWeight="900" fill="#065f46">
            ∠ACB
          </text>
        </svg>
      </div>
    );
  }

  // ===========================================================================
  // Q6 — TRIANGLE SUM THEOREM ALGEBRAIC DIAGRAM
  // ===========================================================================
  if (question.kind === 'q6-numeric-triangle-sum') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'triangle',
          showExterior: false,
          vertexLabels: question.vertexLabels,
          labelA: question.labelA,
          labelB: question.labelB,
          labelC: question.labelC,
        }}
      />
    );
  }

  // ===========================================================================
  // Q7 — EXTERIOR ANGLE THEOREM DIAGRAM
  // ===========================================================================
  if (question.kind === 'q7-exterior-equation') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'triangle',
          showExterior: true,
          vertexLabels: question.vertexLabels,
          labelA: question.labelRemote1,
          labelB: question.labelRemote2,
          labelC: '∠PRQ',
          labelExt: question.labelExterior,
        }}
      />
    );
  }

  // ===========================================================================
  // Q8 — COMPOSITE 4-MINI-DIAGRAM REFERENCE PANEL FOR TABLE GRID
  // ===========================================================================
  if (question.kind === 'q8-match-table-grid') {
    return (
      <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="text-xs font-black uppercase tracking-wider text-indigo-900">
          Visual Reference for Table Situations 1–4
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Mini 1: Triangle Sum */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-black text-slate-700 mb-1">Row 1: △ABC Interior</div>
            <svg viewBox="0 0 180 110" className="w-full h-24 mx-auto">
              <polygon points="90,15 25,95 155,95" fill="#eef2ff" stroke="#312e81" strokeWidth="2.5" />
              <text x="90" y="42" textAnchor="middle" fontSize="10" fontWeight="800" fill="#312e81">65°</text>
              <text x="52" y="86" textAnchor="middle" fontSize="10" fontWeight="800" fill="#312e81">48°</text>
              <text x="122" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill="#4f46e5">(2x+7)°</text>
            </svg>
          </div>

          {/* Mini 2: Exterior Angle */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-black text-slate-700 mb-1">Row 2: Exterior ∠PRS</div>
            <svg viewBox="0 0 180 110" className="w-full h-24 mx-auto">
              <polygon points="75,18 20,92 125,92" fill="#fffbeb" stroke="#92400e" strokeWidth="2.5" />
              <line x1="125" y1="92" x2="170" y2="92" stroke="#92400e" strokeWidth="2.5" />
              <text x="75" y="44" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e">61°</text>
              <text x="45" y="84" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e">52°</text>
              <text x="148" y="82" textAnchor="middle" fontSize="10" fontWeight="900" fill="#b45309">∠PRS</text>
            </svg>
          </div>

          {/* Mini 3: Linear Pair */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-black text-slate-700 mb-1">Row 3: Straight Line BCD</div>
            <svg viewBox="0 0 180 110" className="w-full h-24 mx-auto">
              <line x1="15" y1="88" x2="165" y2="88" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="95" y1="88" x2="55" y2="20" stroke="#0f172a" strokeWidth="2.5" />
              <text x="68" y="78" textAnchor="middle" fontSize="10" fontWeight="800" fill="#047857">64°</text>
              <text x="126" y="78" textAnchor="middle" fontSize="10" fontWeight="900" fill="#dc2626">∠ACD</text>
            </svg>
          </div>

          {/* Mini 4: Vertical Angles */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-black text-slate-700 mb-1">Row 4: Shared Vertex V</div>
            <svg viewBox="0 0 180 110" className="w-full h-24 mx-auto">
              <line x1="25" y1="20" x2="155" y2="90" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="25" y1="90" x2="155" y2="20" stroke="#1e293b" strokeWidth="2.5" />
              <text x="48" y="59" textAnchor="middle" fontSize="9" fontWeight="800" fill="#4f46e5">(5x-10)°</text>
              <text x="134" y="59" textAnchor="middle" fontSize="10" fontWeight="800" fill="#4f46e5">75°</text>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // Q9 — DRAG & DROP MATCHING SIMILAR TRIANGLES DIAGRAM
  // ===========================================================================
  if (question.kind === 'q9-drag-drop-matching') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'aa-triangles',
          tri1Vertices: ['A', 'B', 'C'],
          tri2Vertices: ['D', 'E', 'F'],
          tri1Angles: ['46°', '72°', '?°'],
          tri2Angles: ['?°', '72°', '62°'],
          highlightPairs: ['left', 'top', 'right'],
        }}
      />
    );
  }

  // ===========================================================================
  // Q10 — AA SIMILARITY MULTI-SELECT DIAGRAM
  // ===========================================================================
  if (question.kind === 'q10-multi-select-aa') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'aa-triangles',
          tri1Vertices: ['J', 'K', 'L'],
          tri2Vertices: ['M', 'N', 'P'],
          tri1Angles: ['53°', '64°', '?°'],
          tri2Angles: ['53°', '?°', '63°'],
          highlightPairs: ['left', 'top', 'right'],
        }}
      />
    );
  }

  // ===========================================================================
  // Q11 — INLINE CHOICE + NUMERIC ENTRY AA SIMILARITY DIAGRAM
  // ===========================================================================
  if (question.kind === 'q11-inline-numeric-aa') {
    return (
      <Unit7SelfCheckDiagram
        diagram={{
          kind: 'aa-triangles',
          tri1Vertices: ['A', 'B', 'C'],
          tri2Vertices: ['D', 'E', 'F'],
          tri1Angles: ['48°', '(5x - 8)°', '?°'],
          tri2Angles: ['48°', '(3x + 20)°', '?°'],
          highlightPairs: ['left', 'top', 'right'],
        }}
      />
    );
  }

  // ===========================================================================
  // Q12 — FINAL INTEGRATED CHALLENGE (HOURGLASS PARALLEL LINES + TWO TRIANGLES)
  // ===========================================================================
  if (question.kind === 'q12-integrated-challenge') {
    // Top segment AB on y = 65: A(110, 65), B(370, 65)
    // Bottom segment CD on y = 255: C(110, 255), D(370, 255)
    // Segment AD from (110,65) to (370,255)
    // Segment BC from (370,65) to (110,255)
    // Intersection E at (240, 160)
    const clickableTargets: {
      id: 'angle-D' | 'angle-E' | 'angle-AEB' | 'angle-DEC';
      label: string;
      x: number;
      y: number;
    }[] = [
      { id: 'angle-D', label: '∠CDE', x: 306, y: 236 },
      { id: 'angle-E', label: '∠DCE', x: 174, y: 236 },
      { id: 'angle-AEB', label: '∠AEB', x: 240, y: 118 },
      { id: 'angle-DEC', label: '∠DEC', x: 240, y: 204 },
    ];

    return (
      <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-3 sm:p-4 shadow-2xs">
        <svg viewBox="0 0 480 320" className="w-full h-auto max-h-[340px] mx-auto select-none">
          {/* Shaded triangles △ABE and △DCE */}
          <polygon
            points="110,65 370,65 240,160"
            fill="rgba(79, 70, 229, 0.08)"
            stroke="#1e293b"
            strokeWidth="3"
          />
          <polygon
            points="110,255 370,255 240,160"
            fill="rgba(16, 185, 129, 0.08)"
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Parallel segment AB (y = 65) */}
          <line x1="90" y1="65" x2="390" y2="65" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 235 58 L 245 65 L 235 72" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 243 58 L 253 65 L 243 72" fill="none" stroke="#dc2626" strokeWidth="2.5" />

          {/* Parallel segment CD (y = 255) */}
          <line x1="90" y1="255" x2="390" y2="255" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 235 248 L 245 255 L 235 262" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M 243 248 L 253 255 L 243 262" fill="none" stroke="#dc2626" strokeWidth="2.5" />

          {/* Vertex Labels */}
          <text x="92" y="55" fontSize="15" fontWeight="900" fill="#0f172a">
            A
          </text>
          <text x="378" y="55" fontSize="15" fontWeight="900" fill="#0f172a">
            B
          </text>
          <text x="92" y="276" fontSize="15" fontWeight="900" fill="#0f172a">
            C
          </text>
          <text x="378" y="276" fontSize="15" fontWeight="900" fill="#0f172a">
            D
          </text>
          <text x="262" y="165" fontSize="15" fontWeight="900" fill="#0f172a">
            E
          </text>

          {/* Given Angle BAE = 54° at A(110, 65) */}
          <path
            d={describeArcSector(110, 65, 42, 0, 36)}
            fill="rgba(245, 158, 11, 0.35)"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          <rect x="148" y="74" width="50" height="22" rx="6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.8" />
          <text x="173" y="89" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400e">
            54°
          </text>

          {/* Given Angle ABE = 63° at B(370, 65) */}
          <path
            d={describeArcSector(370, 65, 42, 144, 180)}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          <rect x="282" y="74" width="50" height="22" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" />
          <text x="307" y="89" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1e40af">
            63°
          </text>

          {/* Clickable Hot Spot Angle Pills for Part 1 */}
          {clickableTargets.map((t) => {
            const isSelected = selectedQ12AngleId === t.id;
            return (
              <g
                key={t.id}
                onClick={() => onSelectQ12Angle && onSelectQ12Angle(t.id)}
                className="cursor-pointer"
              >
                <rect
                  x={t.x - 28}
                  y={t.y - 13}
                  width="56"
                  height="26"
                  rx="8"
                  fill={isSelected ? '#4f46e5' : '#ffffff'}
                  stroke={isSelected ? '#312e81' : '#64748b'}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />
                <text
                  x={t.x}
                  y={t.y + 4}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="900"
                  fill={isSelected ? '#ffffff' : '#0f172a'}
                >
                  {t.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return null;
};
