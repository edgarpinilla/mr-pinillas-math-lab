import React from 'react';
import {
  Target,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Layers,
  TrendingUp,
  Sliders,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface StaarPracticePlaceholderProps {
  topicId: string;
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

export const StaarPracticePlaceholder: React.FC<StaarPracticePlaceholderProps> = ({
  topicId,
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  const isTransformations = topicId === 'geometric-transformations';

  return (
    <div
      id="staar-practice-container"
      className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200/70 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Aligned to TEKS · STAAR-Style Practice
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Grade 8 Standards
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            STAAR Practice: {topicTitle}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Practice STAAR-style questions aligned to this topic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Teacher-Reviewed Index
          </span>
        </div>
      </div>

      {/* Main Instructional Area Feature Cards */}
      <div className="space-y-4">
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Assessed TEKS & Instructional Focus:</span>
        </div>

        {isTransformations ? (
          /* TRANSFORMATIONS TOPIC BREAKDOWN */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  Translations & Reflections
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-900">
                  TEKS 8.10(C)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Coordinate notation rules for translations <code className="font-mono text-indigo-900 font-bold">(x ± a, y ± b)</code> and axis reflections <code className="font-mono text-indigo-900 font-bold">(x, -y)</code> and <code className="font-mono text-indigo-900 font-bold">(-x, y)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  Rotations & Origin Rules
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-200/70 text-blue-900">
                  TEKS 8.10(C)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Clockwise and counterclockwise rotations about the origin ($90^\circ, 180^\circ, 270^\circ$) across coordinate quadrants.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Dilations & Congruence
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-900">
                  TEKS 8.3(C) · 8.10(B)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Scale factors <code className="font-mono text-purple-900 font-bold">(kx, ky)</code>, similarity, and distinguishing congruence-preserving rigid motions.
              </p>
            </div>
          </div>
        ) : (
          /* PROPORTIONAL & NON-PROPORTIONAL RELATIONSHIPS BREAKDOWN */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Proportional Relationships
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                  TEKS 8.4(B) · 8.5(E) · 8.5(F)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Constant of proportionality <code className="font-mono text-emerald-900 font-bold">k = y/x</code>, direct variation <code className="font-mono text-emerald-900 font-bold">y = kx</code>, origin graphs passing through <code className="font-mono text-emerald-900 font-bold">(0, 0)</code>, unit rate slopes, and similar slope triangles (TEKS 8.4.A).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Non-Proportional Relationships
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-900">
                  TEKS 8.4(C) · 8.5(I) · 8.5(H)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Linear equations in slope-intercept form <code className="font-mono text-purple-900 font-bold">y = mx + b</code> with non-zero initial values <code className="font-mono text-purple-900 font-bold">(b ≠ 0)</code>, rate of change from tables, and fixed fee verbal models.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Student-Friendly Portal Status Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              STAAR-Style Practice Coming Next
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black text-white">
            TEKS-Aligned Practice Questions
          </h4>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl">
            Interactive STAAR-style practice questions aligned with Texas Grade 8 standards are indexed in the lab metadata. While practice questions are being configured for this view, test your mastery with the interactive simulator or complete the in-portal <strong>Self Check</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {onSwitchToSelfCheck && (
              <button
                onClick={onSwitchToSelfCheck}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Go to Self Check Practice
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] text-slate-400 font-medium">
              Self Check features 6 randomized questions with step-by-step teacher hints.
            </span>
          </div>
        </div>
      </div>

      {/* Standard Alignment Notice */}
      <div className="text-center pt-2 text-[11px] text-slate-400 font-medium">
        Practice questions in Mr. Pinilla’s Math Lab are created to align with Texas Grade 8 Mathematics TEKS standards.
      </div>
    </div>
  );
};
