import React, { useState } from 'react';
import { Sliders, Sparkles, Compass } from 'lucide-react';

type TransversalPairPreset =
  | 'corresponding'
  | 'alt-interior'
  | 'alt-exterior'
  | 'same-side-interior'
  | 'vertical'
  | 'linear-pair';

const PAIR_PRESETS: Record<
  TransversalPairPreset,
  {
    label: string;
    pair: [number, number];
    type: 'Congruent (Equal)' | 'Supplementary (Sum = 180°)';
    algebraRule: string;
    explanation: string;
  }
> = {
  corresponding: {
    label: 'Corresponding (∠1 & ∠5)',
    pair: [1, 5],
    type: 'Congruent (Equal)',
    algebraRule: 'Congruent → Set Expressions EQUAL: (3x + 4) = (2x + 13)',
    explanation:
      'Both angles sit in the top-left corner of their intersection. Sliding along the transversal shows they have identical openings.',
  },
  'alt-interior': {
    label: 'Alternate Interior (∠3 & ∠6)',
    pair: [3, 6],
    type: 'Congruent (Equal)',
    algebraRule: 'Congruent → Set Expressions EQUAL: (3x + 4) = (2x + 13)',
    explanation:
      'Both angles are between the parallel lines on opposite sides of the transversal. Both are acute and equal in measure.',
  },
  'alt-exterior': {
    label: 'Alternate Exterior (∠1 & ∠8)',
    pair: [1, 8],
    type: 'Congruent (Equal)',
    algebraRule: 'Congruent → Set Expressions EQUAL: (3x + 4) = (2x + 13)',
    explanation:
      'Both angles are outside the parallel lines on opposite sides of the transversal. Both are obtuse and equal in measure.',
  },
  'same-side-interior': {
    label: 'Same-Side Interior (∠4 & ∠6)',
    pair: [4, 6],
    type: 'Supplementary (Sum = 180°)',
    algebraRule: 'Supplementary → ADD to 180°: (3x + 4) + (2x + 6) = 180',
    explanation:
      'One angle is obtuse (∠4) and one is acute (∠6) between the parallel lines on the same side. Together they form 180°.',
  },
  vertical: {
    label: 'Vertical Angles (∠1 & ∠4)',
    pair: [1, 4],
    type: 'Congruent (Equal)',
    algebraRule: 'Congruent → Set Expressions EQUAL: (3x + 4) = (2x + 13)',
    explanation:
      'Directly opposite each other at an intersection (forming an X). Vertical angles are always congruent.',
  },
  'linear-pair': {
    label: 'Linear Pair (∠1 & ∠2)',
    pair: [1, 2],
    type: 'Supplementary (Sum = 180°)',
    algebraRule: 'Supplementary → ADD to 180°: (3x + 4) + (2x + 6) = 180',
    explanation:
      'Adjacent angles side-by-side along a straight line always combine to form a 180° straight angle.',
  },
};

export const Station1InteractiveExplorer: React.FC = () => {
  const [givenAngle1, setGivenAngle1] = useState<number>(124);
  const [activePreset, setActivePreset] = useState<TransversalPairPreset>('alt-interior');
  const [customPair, setCustomPair] = useState<[number, number] | null>(null);

  const acute = 180 - givenAngle1;
  const measures: Record<number, number> = {
    1: givenAngle1,
    2: acute,
    3: acute,
    4: givenAngle1,
    5: givenAngle1,
    6: acute,
    7: acute,
    8: givenAngle1,
  };

  const selectedPair = customPair || PAIR_PRESETS[activePreset].pair;
  const [a1, a2] = selectedPair;
  const isCongruent = measures[a1] === measures[a2];

  const handleAngleClick = (idx: number) => {
    if (!customPair) {
      setCustomPair([a1, idx === a1 ? a2 : idx]);
    } else {
      setCustomPair([customPair[1], idx]);
    }
  };

  const positions: Record<number, { x: number; y: number }> = {
    1: { x: 295, y: 76 },
    2: { x: 382, y: 76 },
    3: { x: 285, y: 132 },
    4: { x: 372, y: 132 },
    5: { x: 215, y: 186 },
    6: { x: 302, y: 186 },
    7: { x: 205, y: 242 },
    8: { x: 292, y: 242 },
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Interactive 8-Angle Parallel Lines Sandbox
          </span>
          <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
            Explore Why Some Angles Are Equal and Others Add to 180°
          </h4>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
          Obtuse = {givenAngle1}° · Acute = {acute}°
        </span>
      </div>

      {/* Relationship Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(PAIR_PRESETS) as TransversalPairPreset[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActivePreset(key);
              setCustomPair(null);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !customPair && activePreset === key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {PAIR_PRESETS[key].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Interactive SVG with clickable 8 angles */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-2.5">
          <svg
            viewBox="0 0 580 285"
            className="w-full max-w-lg mx-auto block select-none"
            role="img"
            aria-label="Interactive parallel lines cut by a transversal with 8 clickable angles"
          >
            <rect x="40" y="102" width="500" height="110" fill="#eef2ff" opacity="0.55" />
            <text x="54" y="120" fill="#6366f1" fontSize="10" fontWeight="800">
              INTERIOR REGION
            </text>

            {/* Parallel Line l */}
            <line x1="40" y1="102" x2="540" y2="102" stroke="#0f172a" strokeWidth="3.5" />
            <polygon points="480,102 468,95 468,109" fill="#2563eb" />
            <polygon points="491,102 479,95 479,109" fill="#2563eb" />
            <text x="520" y="88" fill="#0f172a" fontSize="14" fontWeight="900" fontStyle="italic">
              l
            </text>

            {/* Parallel Line m */}
            <line x1="40" y1="212" x2="540" y2="212" stroke="#0f172a" strokeWidth="3.5" />
            <polygon points="480,212 468,205 468,219" fill="#2563eb" />
            <polygon points="491,212 479,205 479,219" fill="#2563eb" />
            <text x="520" y="198" fill="#0f172a" fontSize="14" fontWeight="900" fontStyle="italic">
              m
            </text>

            {/* Transversal t */}
            <line x1="395" y1="25" x2="195" y2="275" stroke="#334155" strokeWidth="3" />
            <text x="406" y="40" fill="#334155" fontSize="14" fontWeight="900" fontStyle="italic">
              t
            </text>

            {/* 8 Clickable Angle Badges */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
              const pos = positions[idx];
              const isSelected = idx === a1 || idx === a2;
              return (
                <g
                  key={idx}
                  onClick={() => handleAngleClick(idx)}
                  className="cursor-pointer"
                >
                  <rect
                    x={pos.x - 35}
                    y={pos.y - 16}
                    width="70"
                    height="32"
                    rx="8"
                    fill={
                      isSelected
                        ? isCongruent
                          ? '#4f46e5'
                          : '#d97706'
                        : '#ffffff'
                    }
                    stroke={
                      isSelected
                        ? isCongruent
                          ? '#312e81'
                          : '#92400e'
                        : '#cbd5e1'
                    }
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#1e293b'}
                    fontSize="11.5"
                    fontWeight="900"
                  >
                    ∠{idx}: {measures[idx]}°
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Controls & Live Algebra Connection */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" /> Slide Given Angle m∠1:
              </span>
              <span className="font-mono text-indigo-700 font-black">{givenAngle1}°</span>
            </div>
            <input
              type="range"
              min={100}
              max={150}
              value={givenAngle1}
              onChange={(e) => setGivenAngle1(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Click any angle on the diagram or use the buttons above to compare two angles.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isCongruent
                ? 'bg-indigo-50/90 border-indigo-200 text-indigo-950'
                : 'bg-amber-50/90 border-amber-200 text-amber-950'
            }`}
          >
            <div className="text-[11px] font-black uppercase tracking-wider">
              Comparing ∠{a1} ({measures[a1]}°) & ∠{a2} ({measures[a2]}°)
            </div>
            <div className="text-xs font-bold">
              {isCongruent ? (
                <span>
                  CONGRUENT: Both angles measure <strong>{measures[a1]}°</strong>
                </span>
              ) : (
                <span>
                  SUPPLEMENTARY: {measures[a1]}° + {measures[a2]}° = <strong>180°</strong>
                </span>
              )}
            </div>
            <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] font-bold">
              {isCongruent
                ? 'Algebra Rule: Expression 1 = Expression 2'
                : 'Algebra Rule: (Expression 1) + (Expression 2) = 180'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Station2InteractiveExplorer: React.FC = () => {
  const [angleA, setAngleA] = useState<number>(55);
  const [angleB, setAngleB] = useState<number>(65);
  const [selectedRole, setSelectedRole] = useState<'remote' | 'interior-sum' | 'exterior'>('exterior');

  const angleExt = angleA + angleB;
  const angleC = 180 - angleExt;

  // Dynamic vertex B position based on angleA and angleB so triangle visually responds
  const topX = 240 + (angleA - angleB) * 1.1;
  const topY = 65;

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Triangle & Exterior Angle Sandbox
          </span>
          <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
            Manipulate Angles to See Triangle Sum (180°) & Exterior Angle Theorem
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedRole('exterior')}
            className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
              selectedRole === 'exterior'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Exterior Angle Theorem
          </button>
          <button
            onClick={() => setSelectedRole('interior-sum')}
            className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
              selectedRole === 'interior-sum'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Triangle Sum (180°)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-2.5">
          <svg
            viewBox="0 0 580 250"
            className="w-full max-w-lg mx-auto block select-none"
            role="img"
            aria-label="Interactive triangle with extended side showing interior and exterior angles"
          >
            <polygon
              points={`110,205 ${topX},${topY} 395,205`}
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Extended Ray CD */}
            <line x1="395" y1="205" x2="540" y2="205" stroke="#0f172a" strokeWidth="3.5" />
            <polygon points="546,205 533,199 533,211" fill="#0f172a" />
            <text x="520" y="228" fill="#0f172a" fontSize="14" fontWeight="900">
              D
            </text>

            {/* Vertex labels */}
            <text x="90" y="220" fill="#0f172a" fontSize="15" fontWeight="900">
              A
            </text>
            <text x={topX} y={topY - 14} textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
              B
            </text>
            <text x="395" y="228" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
              C
            </text>

            {/* Remote Interior A badge */}
            <g onClick={() => setSelectedRole('remote')} className="cursor-pointer">
              <rect
                x="35"
                y="130"
                width="125"
                height="30"
                rx="8"
                fill="#eef2ff"
                stroke="#4f46e5"
                strokeWidth="2"
              />
              <text x="97" y="149" textAnchor="middle" fill="#312e81" fontSize="11.5" fontWeight="900">
                Remote ∠A = {angleA}°
              </text>
            </g>

            {/* Remote Interior B badge */}
            <g onClick={() => setSelectedRole('remote')} className="cursor-pointer">
              <rect
                x={topX + 24}
                y={topY - 10}
                width="125"
                height="30"
                rx="8"
                fill="#e0f2fe"
                stroke="#0284c7"
                strokeWidth="2"
              />
              <text
                x={topX + 86}
                y={topY + 9}
                textAnchor="middle"
                fill="#0c4a6e"
                fontSize="11.5"
                fontWeight="900"
              >
                Remote ∠B = {angleB}°
              </text>
            </g>

            {/* Interior C badge */}
            <g onClick={() => setSelectedRole('interior-sum')} className="cursor-pointer">
              <rect
                x="260"
                y="168"
                width="122"
                height="28"
                rx="8"
                fill="#ecfdf5"
                stroke="#059669"
                strokeWidth="2"
              />
              <text x="321" y="186" textAnchor="middle" fill="#065f46" fontSize="11.5" fontWeight="900">
                Interior ∠C = {angleC}°
              </text>
            </g>

            {/* Exterior ACD badge */}
            <g onClick={() => setSelectedRole('exterior')} className="cursor-pointer">
              <rect
                x="418"
                y="138"
                width="145"
                height="32"
                rx="8"
                fill="#fff1f2"
                stroke="#e11d48"
                strokeWidth="2"
              />
              <text x="490" y="158" textAnchor="middle" fill="#881337" fontSize="11.5" fontWeight="900">
                Exterior ∠ACD = {angleExt}°
              </text>
            </g>
          </svg>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Remote Interior ∠A:</span>
                <span className="font-mono text-indigo-700">{angleA}°</span>
              </div>
              <input
                type="range"
                min={35}
                max={75}
                value={angleA}
                onChange={(e) => setAngleA(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Remote Interior ∠B:</span>
                <span className="font-mono text-sky-700">{angleB}°</span>
              </div>
              <input
                type="range"
                min={35}
                max={75}
                value={angleB}
                onChange={(e) => setAngleB(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1.5">
            <div className="text-rose-300 font-bold">
              Exterior Angle Theorem: {angleA}° + {angleB}° = {angleExt}°
            </div>
            <div className="text-emerald-300 font-bold">
              Triangle Sum Theorem: {angleA}° + {angleB}° + {angleC}° = 180°
            </div>
            <div className="text-slate-300 text-[11px] font-sans pt-1 border-t border-slate-800">
              Notice that Exterior ∠ACD ({angleExt}°) and Interior ∠C ({angleC}°) also form a
              straight line (180°)!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
