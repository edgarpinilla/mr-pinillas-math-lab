import React from 'react';
import { Compass } from 'lucide-react';

interface Unit7WorkedExampleDiagramProps {
  exampleId: string;
}

export const Unit7WorkedExampleDiagram: React.FC<Unit7WorkedExampleDiagramProps> = ({
  exampleId,
}) => {
  // =========================================================================
  // WORKED EXAMPLE 1 — Lesson 7.1: Parallel Lines & Alternate Interior Angles
  // =========================================================================
  if (exampleId === 'ex-7-1-transversal') {
    return (
      <div
        id="unit7-worked-example-diagram-1"
        className="rounded-2xl border-2 border-indigo-200/80 bg-slate-50/70 p-4 sm:p-6 space-y-3 shadow-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Geometric Diagram · Lesson 7.1 Alternate Interior Angles</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
            Line l ∥ Line m · Alternate Interior Pair
          </span>
        </div>

        <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
          <svg
            viewBox="0 0 640 310"
            className="w-full max-w-2xl mx-auto block select-none"
            role="img"
            aria-label="Parallel lines l and m cut by transversal t showing alternate interior angles (3x + 15) degrees and (5x - 25) degrees"
          >
            <defs>
              <pattern
                id="we1-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="640" height="310" fill="url(#we1-grid)" rx="10" />

            {/* Subtle Interior Region Highlight Band between parallel lines */}
            <rect
              x="60"
              y="95"
              width="520"
              height="120"
              fill="#eef2ff"
              opacity="0.55"
            />
            <text
              x="80"
              y="160"
              fill="#6366f1"
              fontSize="11"
              fontWeight="800"
              opacity="0.75"
              letterSpacing="0.06em"
            >
              INTERIOR REGION
            </text>

            {/* Parallel Line l (y = 95) */}
            <line
              x1="60"
              y1="95"
              x2="580"
              y2="95"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Endpoint arrows for Line l */}
            <polygon points="55,95 67,89 67,101" fill="#1e293b" />
            <polygon points="585,95 573,89 573,101" fill="#1e293b" />
            {/* Standard Parallel Line Feather/Arrow Marking on Line l */}
            <polygon points="495,95 481,87 481,103" fill="#2563eb" />
            <polygon points="507,95 493,87 493,103" fill="#2563eb" />
            <text
              x="545"
              y="78"
              fill="#0f172a"
              fontSize="16"
              fontWeight="900"
              fontStyle="italic"
            >
              l
            </text>

            {/* Parallel Line m (y = 215) */}
            <line
              x1="60"
              y1="215"
              x2="580"
              y2="215"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Endpoint arrows for Line m */}
            <polygon points="55,215 67,209 67,221" fill="#1e293b" />
            <polygon points="585,215 573,209 573,221" fill="#1e293b" />
            {/* Standard Parallel Line Feather/Arrow Marking on Line m */}
            <polygon points="495,215 481,207 481,223" fill="#2563eb" />
            <polygon points="507,215 493,207 493,223" fill="#2563eb" />
            <text
              x="545"
              y="198"
              fill="#0f172a"
              fontSize="16"
              fontWeight="900"
              fontStyle="italic"
            >
              m
            </text>

            {/* Transversal Line t:
                Crosses Line l at (336, 95) and Line m at (304, 215).
                Slope dx/dy = -32 / 120 (tilted ~75° like a true 75° acute angle!).
                Top endpoint at y = 20 -> x = 356
                Bottom endpoint at y = 290 -> x = 284
            */}
            <line
              x1="356"
              y1="20"
              x2="284"
              y2="290"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon points="358,14 349,24 360,27" fill="#0f172a" />
            <polygon points="282,296 280,283 291,286" fill="#0f172a" />
            <text
              x="372"
              y="36"
              fill="#dc2626"
              fontSize="16"
              fontWeight="900"
              fontStyle="italic"
            >
              t
            </text>

            {/* Top Intersection at (336, 95):
                Acute Alternate Interior Angle is Bottom-Left (between negative l-ray at 180° and downward t-ray at ~105°).
            */}
            <path
              d="M 336 95 L 290 95 A 46 46 0 0 0 324 140 Z"
              fill="#4f46e5"
              fillOpacity="0.22"
            />
            <path
              d="M 290 95 A 46 46 0 0 0 324 140"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
            />

            {/* Bottom Intersection at (304, 215):
                Acute Alternate Interior Angle is Top-Right (between positive m-ray at 0° and upward t-ray at ~-75°).
            */}
            <path
              d="M 304 215 L 350 215 A 46 46 0 0 0 316 170 Z"
              fill="#0d9488"
              fillOpacity="0.22"
            />
            <path
              d="M 350 215 A 46 46 0 0 0 316 170"
              fill="none"
              stroke="#0d9488"
              strokeWidth="3"
            />

            {/* Intersection Vertex Dots */}
            <circle cx="336" cy="95" r="4" fill="#0f172a" />
            <circle cx="304" cy="215" r="4" fill="#0f172a" />

            {/* Leader Line & Callout Pill for Top-Left Interior Angle: (3x + 15)° */}
            <line
              x1="302"
              y1="118"
              x2="255"
              y2="132"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <rect
              x="125"
              y="114"
              width="130"
              height="34"
              rx="9"
              fill="#eef2ff"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            <text
              x="190"
              y="136"
              textAnchor="middle"
              fill="#312e81"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              (3x + 15)°
            </text>

            {/* Leader Line & Callout Pill for Bottom-Right Interior Angle: (5x − 25)° */}
            <line
              x1="338"
              y1="192"
              x2="385"
              y2="178"
              stroke="#0d9488"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <rect
              x="385"
              y="160"
              width="130"
              height="34"
              rx="9"
              fill="#f0fdfa"
              stroke="#0d9488"
              strokeWidth="2"
            />
            <text
              x="450"
              y="182"
              textAnchor="middle"
              fill="#134e4a"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              (5x − 25)°
            </text>

            {/* Bottom Caption inside SVG */}
            <text
              x="320"
              y="282"
              textAnchor="middle"
              fill="#475569"
              fontSize="12"
              fontWeight="700"
            >
              Alternate interior angles lie between parallel lines l and m on opposite sides of transversal t (Congruent: Equal Measures)
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // WORKED EXAMPLE 2 — Lesson 7.2: Applying the Exterior Angle Theorem
  // =========================================================================
  if (exampleId === 'ex-7-2-exterior-angle') {
    return (
      <div
        id="unit7-worked-example-diagram-2"
        className="rounded-2xl border-2 border-indigo-200/80 bg-slate-50/70 p-4 sm:p-6 space-y-3 shadow-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Geometric Diagram · Lesson 7.2 Exterior Angle Theorem</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
            m∠P + m∠Q = m∠PRS
          </span>
        </div>

        <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
          <svg
            viewBox="0 0 640 310"
            className="w-full max-w-2xl mx-auto block select-none"
            role="img"
            aria-label="Triangle PQR with side QR extended through R to point S, remote interior angles Angle P = (2x + 8) degrees and Angle Q = (x + 16) degrees, and exterior Angle PRS = 114 degrees"
          >
            <defs>
              <pattern
                id="we2-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="640" height="310" fill="url(#we2-grid)" rx="10" />

            {/* Triangle PQR Coordinates:
                Q = (95, 235)   [Bottom-left vertex, m∠Q = 46°]
                R = (385, 235)  [Bottom-right vertex, interior ∠PRQ = 66°, exterior ∠PRS = 114°]
                P = (295, 55)   [Top vertex, m∠P = 68°]
                S = (565, 235)  [Point on ray QR extended through R]
            */}

            {/* Extended Ray RS from R(385, 235) through S(565, 235) */}
            <line
              x1="95"
              y1="235"
              x2="585"
              y2="235"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Arrowhead past S */}
            <polygon points="592,235 578,228 578,242" fill="#1e293b" />

            {/* Triangle PQR Shaded Body */}
            <polygon
              points="295,55 95,235 385,235"
              fill="#eef2ff"
              fillOpacity="0.65"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Remote Interior Angle Arc at Vertex Q (95, 235)
                Ray QP goes to (295, 55) -> dx=200, dy=-180 (len ~269). Unit vector ~(0.743, -0.669).
                At radius 46: point on QP is (95 + 34, 235 - 31) = (129, 204), point on QR is (141, 235).
            */}
            <path
              d="M 95 235 L 141 235 A 46 46 0 0 0 129 204 Z"
              fill="#0284c7"
              fillOpacity="0.22"
            />
            <path
              d="M 141 235 A 46 46 0 0 0 129 204"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Remote Interior Angle Arc at Vertex P (295, 55)
                Ray PQ goes to (95, 235) -> unit vector (-0.743, 0.669). At r=44: (262, 84).
                Ray PR goes to (385, 235) -> dx=90, dy=180 (len ~201). Unit vector (0.447, 0.894). At r=44: (315, 94).
            */}
            <path
              d="M 295 55 L 262 84 A 44 44 0 0 0 315 94 Z"
              fill="#4f46e5"
              fillOpacity="0.22"
            />
            <path
              d="M 262 84 A 44 44 0 0 0 315 94"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
            />

            {/* Exterior Angle Arc ∠PRS at Vertex R (385, 235)
                Between Ray RP (unit vector (-0.447, -0.894)) and Ray RS (unit vector (1, 0)).
                At radius 52: point on RP is (385 - 23, 235 - 46) = (362, 189), point on RS is (437, 235).
            */}
            <path
              d="M 385 235 L 362 189 A 52 52 0 0 1 437 235 Z"
              fill="#e11d48"
              fillOpacity="0.22"
            />
            <path
              d="M 362 189 A 52 52 0 0 1 437 235"
              fill="none"
              stroke="#e11d48"
              strokeWidth="3.5"
            />

            {/* Vertex Dots: P, Q, R, and Point S */}
            <circle cx="295" cy="55" r="5" fill="#1e293b" />
            <circle cx="95" cy="235" r="5" fill="#1e293b" />
            <circle cx="385" cy="235" r="5" fill="#1e293b" />
            <circle cx="550" cy="235" r="5" fill="#1e293b" />

            {/* Vertex Letter Labels (Clearly separated from lines) */}
            <text
              x="295"
              y="36"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="17"
              fontWeight="900"
            >
              P
            </text>
            <text
              x="72"
              y="242"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="17"
              fontWeight="900"
            >
              Q
            </text>
            <text
              x="385"
              y="262"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="17"
              fontWeight="900"
            >
              R
            </text>
            <text
              x="550"
              y="262"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="17"
              fontWeight="900"
            >
              S
            </text>

            {/* Remote Interior Angle Label ∠P = (2x + 8)° */}
            <line
              x1="285"
              y1="96"
              x2="255"
              y2="122"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <rect
              x="175"
              y="122"
              width="148"
              height="34"
              rx="8"
              fill="#eef2ff"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            <text
              x="249"
              y="144"
              textAnchor="middle"
              fill="#312e81"
              fontSize="14"
              fontWeight="900"
              fontFamily="monospace"
            >
              ∠P = (2x + 8)°
            </text>

            {/* Remote Interior Angle Label ∠Q = (x + 16)° */}
            <rect
              x="142"
              y="192"
              width="148"
              height="34"
              rx="8"
              fill="#f0f9ff"
              stroke="#0284c7"
              strokeWidth="2"
            />
            <text
              x="216"
              y="214"
              textAnchor="middle"
              fill="#0c4a6e"
              fontSize="14"
              fontWeight="900"
              fontFamily="monospace"
            >
              ∠Q = (x + 16)°
            </text>

            {/* Exterior Angle Label ∠PRS = 114° */}
            <line
              x1="422"
              y1="202"
              x2="452"
              y2="176"
              stroke="#e11d48"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <rect
              x="430"
              y="138"
              width="156"
              height="36"
              rx="8"
              fill="#fff1f2"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text
              x="508"
              y="161"
              textAnchor="middle"
              fill="#881337"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              ∠PRS = 114°
            </text>
            <text
              x="508"
              y="128"
              textAnchor="middle"
              fill="#be123c"
              fontSize="11"
              fontWeight="800"
            >
              EXTERIOR ANGLE
            </text>

            {/* Bottom Caption inside SVG */}
            <text
              x="320"
              y="294"
              textAnchor="middle"
              fill="#475569"
              fontSize="12"
              fontWeight="700"
            >
              Side QR is extended through R to point S · Remote interior angles ∠P and ∠Q sum to exterior angle ∠PRS
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // WORKED EXAMPLE 3 — Lesson 7.3: Testing Triangle Similarity with AA Criterion
  // =========================================================================
  if (exampleId === 'ex-7-3-aa-similarity') {
    return (
      <div
        id="unit7-worked-example-diagram-3"
        className="rounded-2xl border-2 border-indigo-200/80 bg-slate-50/70 p-4 sm:p-6 space-y-3 shadow-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Geometric Diagram · Lesson 7.3 Angle-Angle (AA) Similarity</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
            Comparing △ABC and △DEF
          </span>
        </div>

        <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
          <svg
            viewBox="0 0 680 310"
            className="w-full max-w-2xl mx-auto block select-none"
            role="img"
            aria-label="Side-by-side comparison of Triangle ABC with Angle A = 42 degrees and Angle B = 63 degrees, and Triangle DEF with Angle D = 42 degrees and Angle F = 75 degrees"
          >
            <defs>
              <pattern
                id="we3-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="680" height="310" fill="url(#we3-grid)" rx="10" />

            {/* ==============================================================
                LEFT TRIANGLE: △ABC
                Vertices:
                  A = (55, 225)   [Bottom-left, 42°]
                  C = (295, 225)  [Bottom-right, ? (75°)]
                  B = (245, 65)   [Top vertex, 63°]
                ============================================================== */}
            <polygon
              points="55,225 245,65 295,225"
              fill="#eef2ff"
              fillOpacity="0.7"
              stroke="#312e81"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Single Arc at ∠A (42°) — Matches ∠D (42°) */}
            <path
              d="M 55 225 L 103 225 A 48 48 0 0 0 92 194 Z"
              fill="#0284c7"
              fillOpacity="0.22"
            />
            <path
              d="M 103 225 A 48 48 0 0 0 92 194"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Double Arc at ∠B (63°) */}
            <path
              d="M 245 65 L 214 91 A 40 40 0 0 0 257 103 Z"
              fill="#4f46e5"
              fillOpacity="0.2"
            />
            <path
              d="M 214 91 A 40 40 0 0 0 257 103"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <path
              d="M 209 95 A 47 47 0 0 0 259 110"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />

            {/* Unknown Angle Arc at ∠C */}
            <path
              d="M 283 187 A 40 40 0 0 0 255 225"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />

            {/* Vertex Dots for △ABC */}
            <circle cx="55" cy="225" r="4.5" fill="#1e293b" />
            <circle cx="245" cy="65" r="4.5" fill="#1e293b" />
            <circle cx="295" cy="225" r="4.5" fill="#1e293b" />

            {/* Vertex Labels for △ABC */}
            <text x="36" y="232" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              A
            </text>
            <text x="245" y="46" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              B
            </text>
            <text x="314" y="232" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              C
            </text>

            {/* Angle Measure Callouts inside/near △ABC */}
            <text
              x="116"
              y="214"
              fill="#0369a1"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              42°
            </text>
            <text
              x="228"
              y="128"
              textAnchor="middle"
              fill="#3730a3"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              63°
            </text>
            <text
              x="266"
              y="214"
              textAnchor="middle"
              fill="#475569"
              fontSize="14"
              fontWeight="900"
              fontFamily="monospace"
            >
              ?
            </text>

            {/* Title under △ABC */}
            <rect
              x="110"
              y="246"
              width="130"
              height="28"
              rx="8"
              fill="#e0e7ff"
              stroke="#6366f1"
              strokeWidth="1.5"
            />
            <text
              x="175"
              y="265"
              textAnchor="middle"
              fill="#1e1b4b"
              fontSize="13"
              fontWeight="900"
            >
              Triangle ABC
            </text>

            {/* ==============================================================
                RIGHT TRIANGLE: △DEF (Scaled 0.78× to show different size, same shape)
                Vertices:
                  D = (390, 225)  [Bottom-left, 42°]
                  F = (585, 225)  [Bottom-right, 75°]
                  E = (544, 95)   [Top vertex, ? (63°)]
                ============================================================== */}
            <polygon
              points="390,225 544,95 585,225"
              fill="#ecfdf5"
              fillOpacity="0.75"
              stroke="#065f46"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Single Arc at ∠D (42°) — Matches ∠A (42°) */}
            <path
              d="M 390 225 L 434 225 A 44 44 0 0 0 424 197 Z"
              fill="#0284c7"
              fillOpacity="0.22"
            />
            <path
              d="M 434 225 A 44 44 0 0 0 424 197"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Triple Arc at ∠F (75°) */}
            <path
              d="M 585 225 L 547 225 A 38 38 0 0 1 574 189 Z"
              fill="#059669"
              fillOpacity="0.22"
            />
            <path
              d="M 547 225 A 38 38 0 0 1 574 189"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
            />
            <path
              d="M 541 225 A 44 44 0 0 1 572 183"
              fill="none"
              stroke="#059669"
              strokeWidth="2"
            />

            {/* Unknown Angle Arc at ∠E */}
            <path
              d="M 518 117 A 34 34 0 0 0 554 127"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />

            {/* Vertex Dots for △DEF */}
            <circle cx="390" cy="225" r="4.5" fill="#1e293b" />
            <circle cx="544" cy="95" r="4.5" fill="#1e293b" />
            <circle cx="585" cy="225" r="4.5" fill="#1e293b" />

            {/* Vertex Labels for △DEF */}
            <text x="371" y="232" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              D
            </text>
            <text x="544" y="76" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              E
            </text>
            <text x="604" y="232" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
              F
            </text>

            {/* Angle Measure Callouts inside/near △DEF */}
            <text
              x="446"
              y="214"
              fill="#0369a1"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              42°
            </text>
            <text
              x="529"
              y="148"
              textAnchor="middle"
              fill="#475569"
              fontSize="14"
              fontWeight="900"
              fontFamily="monospace"
            >
              ?
            </text>
            <text
              x="530"
              y="214"
              textAnchor="middle"
              fill="#065f46"
              fontSize="15"
              fontWeight="900"
              fontFamily="monospace"
            >
              75°
            </text>

            {/* Title under △DEF */}
            <rect
              x="430"
              y="246"
              width="130"
              height="28"
              rx="8"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <text
              x="495"
              y="265"
              textAnchor="middle"
              fill="#064e3b"
              fontSize="13"
              fontWeight="900"
            >
              Triangle DEF
            </text>

            {/* Bottom Caption inside SVG */}
            <text
              x="340"
              y="296"
              textAnchor="middle"
              fill="#475569"
              fontSize="12"
              fontWeight="700"
            >
              Given: m∠A = 42°, m∠B = 63° in △ABC and m∠D = 42°, m∠F = 75° in △DEF · Find m∠C to test AA Similarity
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
};
