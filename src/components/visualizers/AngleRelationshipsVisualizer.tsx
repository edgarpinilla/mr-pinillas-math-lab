import React, { useState } from 'react';
import {
  Compass,
  Triangle,
  Layers,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Sliders,
  ArrowRight,
  Info,
} from 'lucide-react';

type LessonTab = 'lesson-7-1' | 'lesson-7-2' | 'lesson-7-3';

type AnglePairType =
  | 'corresponding'
  | 'alternate-interior'
  | 'alternate-exterior'
  | 'same-side-interior'
  | 'vertical'
  | 'supplementary';

interface AnglePairInfo {
  id: AnglePairType;
  label: string;
  relationship: 'Congruent (Equal)' | 'Supplementary (Sum = 180°)';
  badgeColor: string;
  description: string;
  examplePairs: [number, number][];
  activePairIndex: number;
}

const ANGLE_PAIR_MODES: Omit<AnglePairInfo, 'activePairIndex'>[] = [
  {
    id: 'corresponding',
    label: 'Corresponding Angles',
    relationship: 'Congruent (Equal)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description:
      'Angles in the exact same relative position at each intersection where the transversal crosses the parallel lines. Corresponding angles are always congruent.',
    examplePairs: [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ],
  },
  {
    id: 'alternate-interior',
    label: 'Alternate Interior Angles',
    relationship: 'Congruent (Equal)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description:
      'Angles located inside (between) the two parallel lines on opposite sides of the transversal. Alternate interior angles are always congruent (form a "Z" pattern).',
    examplePairs: [
      [3, 6],
      [4, 5],
    ],
  },
  {
    id: 'alternate-exterior',
    label: 'Alternate Exterior Angles',
    relationship: 'Congruent (Equal)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description:
      'Angles located outside the two parallel lines on opposite sides of the transversal. Alternate exterior angles are always congruent.',
    examplePairs: [
      [1, 8],
      [2, 7],
    ],
  },
  {
    id: 'same-side-interior',
    label: 'Same-Side Interior Angles',
    relationship: 'Supplementary (Sum = 180°)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description:
      'Angles located inside (between) the two parallel lines on the same side of the transversal. Same-side (consecutive) interior angles are supplementary and add up to 180°.',
    examplePairs: [
      [3, 5],
      [4, 6],
    ],
  },
  {
    id: 'vertical',
    label: 'Vertical Angles',
    relationship: 'Congruent (Equal)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description:
      'Opposite ("kissing") angles formed by two intersecting lines. Vertical angles share a vertex and are always congruent.',
    examplePairs: [
      [1, 4],
      [2, 3],
      [5, 8],
      [6, 7],
    ],
  },
  {
    id: 'supplementary',
    label: 'Adjacent Supplementary (Linear Pair)',
    relationship: 'Supplementary (Sum = 180°)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description:
      'Two adjacent angles that form a straight line (a linear pair). Their angle measures always add up to 180°.',
    examplePairs: [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
  },
];

export const AngleRelationshipsVisualizer: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<LessonTab>('lesson-7-1');

  // =========================================================================
  // LESSON 7.1 STATE: Parallel Lines Cut by a Transversal
  // =========================================================================
  const [transversalAngle, setTransversalAngle] = useState<number>(115); // Obtuse angle ∠1 (degrees)
  const [selectedPairType, setSelectedPairType] = useState<AnglePairType>('corresponding');
  const [pairVariantIdx, setPairVariantIdx] = useState<number>(0);

  const acuteAngle = 180 - transversalAngle;
  // Standard 8-angle numbering:
  // Top intersection: 1 (top-left, obtuse), 2 (top-right, acute), 3 (bottom-left, acute), 4 (bottom-right, obtuse)
  // Bottom intersection: 5 (top-left, obtuse), 6 (top-right, acute), 7 (bottom-left, acute), 8 (bottom-right, obtuse)
  const angleMeasures: Record<number, number> = {
    1: transversalAngle,
    2: acuteAngle,
    3: acuteAngle,
    4: transversalAngle,
    5: transversalAngle,
    6: acuteAngle,
    7: acuteAngle,
    8: transversalAngle,
  };

  const currentPairConfig =
    ANGLE_PAIR_MODES.find((m) => m.id === selectedPairType) || ANGLE_PAIR_MODES[0];
  const activePair =
    currentPairConfig.examplePairs[pairVariantIdx % currentPairConfig.examplePairs.length];

  // =========================================================================
  // LESSON 7.2 STATE: Angle Theorems for Triangles
  // =========================================================================
  const [triAngleA, setTriAngleA] = useState<number>(65);
  const [triAngleB, setTriAngleB] = useState<number>(45);
  const triAngleC = 180 - triAngleA - triAngleB;
  const exteriorAngleC = triAngleA + triAngleB;

  // =========================================================================
  // LESSON 7.3 STATE: Angle-Angle (AA) Similarity
  // =========================================================================
  const [simAngle1, setSimAngle1] = useState<number>(50);
  const [simAngle2, setSimAngle2] = useState<number>(70);
  const [secondTriAngle2, setSecondTriAngle2] = useState<number>(70);
  const [scaleFactorPreview, setScaleFactorPreview] = useState<number>(1.5);

  const simAngle3 = 180 - simAngle1 - simAngle2;
  const secondTriAngle3 = 180 - simAngle1 - secondTriAngle2;
  const isSimilarAA =
    simAngle2 === secondTriAngle2 ||
    simAngle2 === secondTriAngle3 ||
    simAngle3 === secondTriAngle2;

  return (
    <div
      id="angle-relationships-visualizer"
      className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-7 text-white shadow-xl space-y-6"
    >
      {/* Top Header & Lesson Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider mb-2 border border-indigo-500/30">
            <Compass className="w-3.5 h-3.5" /> Module 7 · TEKS 8.8D Interactive Lesson Explorer
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {activeLesson === 'lesson-7-1'
              ? 'Lesson 7.1: Parallel Lines Cut by a Transversal'
              : activeLesson === 'lesson-7-2'
              ? 'Lesson 7.2: Angle Theorems for Triangles'
              : 'Lesson 7.3: Angle-Angle (AA) Similarity Criterion'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {activeLesson === 'lesson-7-1'
              ? 'Explore all 8 angles formed when parallel lines l and m are intersected by transversal line t.'
              : activeLesson === 'lesson-7-2'
              ? 'Investigate the Triangle Sum Theorem (∠A + ∠B + ∠C = 180°) and the Exterior Angle Theorem (∠4 = ∠1 + ∠2).'
              : 'Test whether two triangles are geometrically similar by comparing two pairs of corresponding interior angles.'}
          </p>
        </div>

        {/* 3-Lesson Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 shrink-0">
          <button
            id="btn-lesson-7-1"
            onClick={() => setActiveLesson('lesson-7-1')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeLesson === 'lesson-7-1'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>7.1 Parallel Lines</span>
          </button>

          <button
            id="btn-lesson-7-2"
            onClick={() => setActiveLesson('lesson-7-2')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeLesson === 'lesson-7-2'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Triangle className="w-3.5 h-3.5" />
            <span>7.2 Triangle Theorems</span>
          </button>

          <button
            id="btn-lesson-7-3"
            onClick={() => setActiveLesson('lesson-7-3')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeLesson === 'lesson-7-3'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>7.3 AA Similarity</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          LESSON 7.1 VIEW: PARALLEL LINES CUT BY A TRANSVERSAL
          ===================================================================== */}
      {activeLesson === 'lesson-7-1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive SVG Transversal Diagram */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interactive Transversal Diagram (Line l ∥ Line m)
              </span>
              <span className={`text-xs font-black px-3 py-1 rounded-full border ${currentPairConfig.badgeColor}`}>
                {currentPairConfig.relationship}
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 520 340"
                className="w-full max-w-xl mx-auto block select-none"
              >
                {/* Background subtle grid */}
                <defs>
                  <pattern id="mod7-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="0.75"
                    />
                  </pattern>
                </defs>
                <rect width="520" height="340" fill="url(#mod7-grid)" rx="12" />

                {/* Parallel Line l (y = 110) */}
                <line x1="40" y1="110" x2="480" y2="110" stroke="#94a3b8" strokeWidth="3.5" />
                {/* Parallel arrow marker on line l */}
                <polygon points="430,110 420,104 420,116" fill="#38bdf8" />
                <text x="455" y="98" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">
                  line l
                </text>

                {/* Parallel Line m (y = 240) */}
                <line x1="40" y1="240" x2="480" y2="240" stroke="#94a3b8" strokeWidth="3.5" />
                {/* Parallel arrow marker on line m */}
                <polygon points="430,240 420,234 420,246" fill="#38bdf8" />
                <text x="455" y="228" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">
                  line m
                </text>

                {/* Transversal Line t passing through (230, 110) and (290, 240) */}
                <line x1="190" y1="23" x2="330" y2="327" stroke="#f8fafc" strokeWidth="3" />
                <text x="205" y="42" fill="#f43f5e" fontSize="14" fontWeight="bold" fontStyle="italic">
                  transversal t
                </text>

                {/* Angle Badges Around Top Intersection (230, 110) and Bottom Intersection (290, 240) */}
                {[
                  { num: 1, x: 182, y: 84 },
                  { num: 2, x: 266, y: 84 },
                  { num: 3, x: 200, y: 142 },
                  { num: 4, x: 282, y: 142 },
                  { num: 5, x: 242, y: 214 },
                  { num: 6, x: 326, y: 214 },
                  { num: 7, x: 260, y: 272 },
                  { num: 8, x: 342, y: 272 },
                ].map((pos) => {
                  const isHighlighted = activePair.includes(pos.num);
                  const deg = angleMeasures[pos.num];
                  const isObtuse = pos.num === 1 || pos.num === 4 || pos.num === 5 || pos.num === 8;

                  return (
                    <g key={pos.num}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHighlighted ? 23 : 19}
                        fill={
                          isHighlighted
                            ? isObtuse
                              ? '#4f46e5'
                              : '#0d9488'
                            : '#0f172a'
                        }
                        stroke={
                          isHighlighted
                            ? '#fbbf24'
                            : isObtuse
                            ? '#6366f1'
                            : '#14b8a6'
                        }
                        strokeWidth={isHighlighted ? 3 : 1.75}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 3}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="900"
                      >
                        ∠{pos.num}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 11}
                        textAnchor="middle"
                        fill={isHighlighted ? '#fde68a' : '#cbd5e1'}
                        fontSize="10"
                        fontWeight="700"
                      >
                        {deg}°
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Slider to adjust transversal angle measure */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  Adjust Obtuse Angle Measure (∠1, ∠4, ∠5, ∠8):
                </span>
                <span className="font-mono font-black text-indigo-300 text-sm">
                  {transversalAngle}° (Acute Angles = {acuteAngle}°)
                </span>
              </div>
              <input
                type="range"
                min={95}
                max={145}
                value={transversalAngle}
                onChange={(e) => setTransversalAngle(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Obtuse = {transversalAngle}°</span>
                <span>Acute = {acuteAngle}°</span>
                <span>Sum: {transversalAngle}° + {acuteAngle}° = 180°</span>
              </div>
            </div>
          </div>

          {/* Right Column: Relationship Selector & Live Pair Equations */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Select an Angle Relationship to Highlight:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {ANGLE_PAIR_MODES.map((mode) => {
                const isSelected = selectedPairType === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedPairType(mode.id);
                      setPairVariantIdx(0);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-400 text-white shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-black">{mode.label}</div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {mode.relationship}
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-indigo-300 translate-x-0.5' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Relationship Card */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-black text-white">{currentPairConfig.label}</span>
                <button
                  onClick={() => setPairVariantIdx((prev) => prev + 1)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold cursor-pointer transition-colors"
                >
                  Cycle Pair ({(pairVariantIdx % currentPairConfig.examplePairs.length) + 1}/
                  {currentPairConfig.examplePairs.length})
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentPairConfig.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">
                  Highlighted Pair Equation:
                </div>
                {currentPairConfig.relationship === 'Congruent (Equal)' ? (
                  <div className="text-emerald-400 font-bold text-sm">
                    m∠{activePair[0]} = m∠{activePair[1]} ➔ {angleMeasures[activePair[0]]}° ={' '}
                    {angleMeasures[activePair[1]]}°
                  </div>
                ) : (
                  <div className="text-amber-300 font-bold text-sm">
                    m∠{activePair[0]} + m∠{activePair[1]} = 180° ➔ {angleMeasures[activePair[0]]}° +{' '}
                    {angleMeasures[activePair[1]]}° = 180°
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LESSON 7.2 VIEW: ANGLE THEOREMS FOR TRIANGLES
          ===================================================================== */}
      {activeLesson === 'lesson-7-2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left SVG Diagram showing Interior & Exterior Angles */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Triangle Sum & Exterior Angle Theorem Visualizer
              </span>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ∠A + ∠B + ∠C = 180°
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 520 300" className="w-full max-w-xl mx-auto block select-none">
                <rect width="520" height="300" fill="#090d16" rx="12" />

                {/* Extended base line for exterior angle */}
                <line x1="60" y1="230" x2="470" y2="230" stroke="#64748b" strokeWidth="3" strokeDasharray="6 4" />

                {/* Triangle ABC */}
                <polygon
                  points="90,230 230,65 350,230"
                  fill="rgba(79, 70, 229, 0.16)"
                  stroke="#818cf8"
                  strokeWidth="3.5"
                />

                {/* Vertex Labels */}
                <text x="70" y="255" fill="#38bdf8" fontSize="14" fontWeight="900">
                  A ({triAngleA}°)
                </text>
                <text x="205" y="48" fill="#34d399" fontSize="14" fontWeight="900">
                  B ({triAngleB}°)
                </text>
                <text x="315" y="255" fill="#fbbf24" fontSize="14" fontWeight="900">
                  C ({triAngleC}°)
                </text>

                {/* Interior Angle Badges */}
                <circle cx="125" cy="212" r="18" fill="#0284c7" />
                <text x="125" y="216" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                  {triAngleA}°
                </text>

                <circle cx="230" cy="108" r="18" fill="#059669" />
                <text x="230" y="112" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                  {triAngleB}°
                </text>

                <circle cx="312" cy="212" r="18" fill="#d97706" />
                <text x="312" y="216" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                  {triAngleC}°
                </text>

                {/* Exterior Angle at Vertex C */}
                <circle cx="392" cy="205" r="22" fill="#e11d48" stroke="#fda4af" strokeWidth="2" />
                <text x="392" y="201" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                  Ext ∠
                </text>
                <text x="392" y="214" textAnchor="middle" fill="#ffe4e6" fontSize="12" fontWeight="900">
                  {exteriorAngleC}°
                </text>

                <text x="380" y="255" fill="#fb7185" fontSize="12" fontWeight="bold">
                  Exterior Angle = ∠A + ∠B
                </text>
              </svg>
            </div>

            {/* Sliders for Remote Interior Angles A and B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-sky-300">Remote Interior ∠A:</span>
                  <span className="font-mono text-white">{triAngleA}°</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={85}
                  value={triAngleA}
                  onChange={(e) => setTriAngleA(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-300">Remote Interior ∠B:</span>
                  <span className="font-mono text-white">{triAngleB}°</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={85}
                  value={triAngleB}
                  onChange={(e) => setTriAngleB(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Theorem Proofs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-indigo-300">
                1. Triangle Sum Theorem
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The sum of the measures of the three interior angles of any triangle is always{' '}
                <strong className="text-white">180°</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">m∠A + m∠B + m∠C = 180°</div>
                <div className="text-emerald-400 font-bold text-sm">
                  {triAngleA}° + {triAngleB}° + {triAngleC}° = 180°
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-rose-300">
                2. Exterior Angle Theorem
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The measure of an exterior angle of a triangle is equal to the sum of the measures of
                its two <strong className="text-white">remote interior angles</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">m∠Exterior = m∠A + m∠B</div>
                <div className="text-rose-400 font-bold text-sm">
                  {exteriorAngleC}° = {triAngleA}° + {triAngleB}°
                </div>
                <div className="text-slate-400 pt-1 text-[11px]">
                  Linear Pair Check: {triAngleC}° (Adjacent Interior) + {exteriorAngleC}° (Exterior) = 180°
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LESSON 7.3 VIEW: ANGLE-ANGLE (AA) SIMILARITY
          ===================================================================== */}
      {activeLesson === 'lesson-7-3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Side-by-Side Triangles Comparison */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Angle-Angle (AA) Similarity Tester
              </span>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full border ${
                  isSimilarAA
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {isSimilarAA ? '△ABC ~ △DEF (Similar by AA)' : 'Not Similar (Angles Do Not Match)'}
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 520 260" className="w-full max-w-xl mx-auto block select-none">
                <rect width="520" height="260" fill="#090d16" rx="12" />

                {/* Triangle 1: △ABC */}
                <polygon
                  points="45,205 130,75 215,205"
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
                <text x="130" y="238" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="900">
                  Triangle ABC
                </text>
                <text x="68" y="195" fill="#fff" fontSize="11" fontWeight="bold">
                  ∠A={simAngle1}°
                </text>
                <text x="130" y="62" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                  ∠B={simAngle2}°
                </text>
                <text x="165" y="195" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                  ∠C={simAngle3}°
                </text>

                {/* Triangle 2: △DEF (scaled visually) */}
                {(() => {
                  const cx = 375;
                  const cy = 155;
                  const s = scaleFactorPreview;
                  const p1x = cx - 65 * s;
                  const p1y = cy + 45 * s;
                  const p2x = cx;
                  const p2y = cy - 55 * s;
                  const p3x = cx + 65 * s;
                  const p3y = cy + 45 * s;
                  return (
                    <g>
                      <polygon
                        points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`}
                        fill={
                          isSimilarAA
                            ? 'rgba(16, 185, 129, 0.16)'
                            : 'rgba(244, 63, 94, 0.16)'
                        }
                        stroke={isSimilarAA ? '#10b981' : '#f43f5e'}
                        strokeWidth="3"
                      />
                      <text
                        x={cx}
                        y="238"
                        textAnchor="middle"
                        fill={isSimilarAA ? '#34d399' : '#fb7185'}
                        fontSize="13"
                        fontWeight="900"
                      >
                        Triangle DEF
                      </text>
                      <text x={p1x + 15} y={p1y - 8} fill="#fff" fontSize="11" fontWeight="bold">
                        ∠D={simAngle1}°
                      </text>
                      <text
                        x={p2x}
                        y={p2y - 10}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        ∠E={secondTriAngle2}°
                      </text>
                      <text x={p3x - 52} y={p3y - 8} fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        ∠F={secondTriAngle3}°
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Controls for AA Similarity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-sky-300">Shared ∠A & ∠D:</span>
                  <span className="font-mono">{simAngle1}°</span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={75}
                  value={simAngle1}
                  onChange={(e) => setSimAngle1(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-indigo-300">△ABC Angle B:</span>
                  <span className="font-mono">{simAngle2}°</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={85}
                  value={simAngle2}
                  onChange={(e) => setSimAngle2(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-300">△DEF Angle E:</span>
                  <span className="font-mono">{secondTriAngle2}°</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={85}
                  value={secondTriAngle2}
                  onChange={(e) => setSecondTriAngle2(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: AA Similarity Criterion Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-300">
                Angle-Angle (AA) Similarity Criterion
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If <strong className="text-white">two angles</strong> of one triangle are congruent to{' '}
                <strong className="text-white">two angles</strong> of another triangle, then the third
                angles are automatically congruent (by the Triangle Sum Theorem) and the two triangles
                are <strong className="text-white">similar (~)</strong>.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
                <div className="text-sky-300">
                  △ABC Angles: {simAngle1}°, {simAngle2}°, {simAngle3}° (Sum = 180°)
                </div>
                <div className="text-emerald-300">
                  △DEF Angles: {simAngle1}°, {secondTriAngle2}°, {secondTriAngle3}° (Sum = 180°)
                </div>
                <div className="pt-1 border-t border-slate-800 font-bold">
                  {isSimilarAA ? (
                    <span className="text-emerald-400">
                      ✔ Two angle pairs match! Therefore △ABC ~ △DEF.
                    </span>
                  ) : (
                    <span className="text-rose-400">
                      ✘ Only one angle pair matches ({simAngle1}°). Adjust ∠E to {simAngle2}° or{' '}
                      {simAngle3}° to establish AA Similarity!
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => setSecondTriAngle2(simAngle2)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Match ∠E = ∠B ({simAngle2}°)
                </button>
                <button
                  onClick={() =>
                    setScaleFactorPreview((prev) => (prev === 1.1 ? 0.8 : 1.1))
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resize △DEF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
