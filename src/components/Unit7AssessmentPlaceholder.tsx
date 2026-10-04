import React from 'react';
import {
  CheckCircle2,
  Target,
  Laptop,
  Sparkles,
  BookOpen,
  Layers,
  Triangle,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface Unit7AssessmentPlaceholderProps {
  mode: 'self-check' | 'staar' | 'digital-staar';
  topicTitle: string;
  onSwitchMode: (mode: 'self-check' | 'staar' | 'digital-staar') => void;
}

export const Unit7AssessmentPlaceholder: React.FC<Unit7AssessmentPlaceholderProps> = ({
  mode,
  topicTitle,
  onSwitchMode,
}) => {
  const isSelfCheck = mode === 'self-check';
  const isStaar = mode === 'staar';
  const isDigital = mode === 'digital-staar';

  return (
    <div
      id={`unit7-placeholder-${mode}`}
      className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-md p-5 sm:p-8 space-y-6 animate-fadeIn"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200/70 shadow-2xs">
              {isSelfCheck ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              ) : isStaar ? (
                <Target className="w-3.5 h-3.5 text-indigo-600" />
              ) : (
                <Laptop className="w-3.5 h-3.5 text-cyan-600" />
              )}
              {isSelfCheck
                ? 'Self-Check Architecture · 18 Questions (3 Rounds × 6)'
                : isStaar
                ? 'STAAR Practice Architecture · 36 Questions (3 Rounds × 12)'
                : 'Digital STAAR Simulator Architecture · Technology-Enhanced Items'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Primary TEKS 8.8D
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isSelfCheck
              ? `Self Check: ${topicTitle}`
              : isStaar
              ? `STAAR Practice: ${topicTitle}`
              : `Digital STAAR Simulator: ${topicTitle}`}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            {isSelfCheck
              ? 'Module 7 Self-Check framework reserved for 18 lesson-aligned questions (3 progressive rounds of 6 questions).'
              : isStaar
              ? 'Module 7 STAAR Practice framework reserved for 36 TEKS 8.8D assessment questions (3 progressive rounds of 12 questions).'
              : 'Module 7 Digital STAAR Simulator framework reserved for interactive technology-enhanced geometry items.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Module 7 Framework Ready
          </span>
        </div>
      </div>

      {/* 3 Lesson Areas Breakdown */}
      <div className="space-y-4">
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Module 7 Instructional & Assessment Scope (TEKS 8.8D):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Lesson 7.1 */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Lesson 7.1
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-900">
                TEKS 8.8D
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900">
              Parallel Lines Cut by a Transversal
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Corresponding, alternate interior, alternate exterior, same-side interior, vertical,
              and supplementary angle relationships, plus algebraic missing-angle equations.
            </p>
          </div>

          {/* Lesson 7.2 */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                <Triangle className="w-4 h-4 text-blue-600" />
                Lesson 7.2
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-200/70 text-blue-900">
                TEKS 8.8D
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900">Angle Theorems for Triangles</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Triangle Sum Theorem (<code className="font-mono font-bold">∠A + ∠B + ∠C = 180°</code>
              ), Exterior Angle Theorem (<code className="font-mono font-bold">∠Ext = ∠A + ∠B</code>
              ), and solving linear equations for unknown interior/exterior angles.
            </p>
          </div>

          {/* Lesson 7.3 */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Lesson 7.3
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-900">
                TEKS 8.8D
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900">Angle-Angle (AA) Similarity</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Establishing triangle similarity using the Angle-Angle (AA) criterion by proving two
              pairs of corresponding interior angles are congruent.
            </p>
          </div>
        </div>
      </div>

      {/* Status Callout Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              {isSelfCheck
                ? 'Self-Check Bank (3 Rounds × 6 Questions) — Scheduled for Next Phase'
                : isStaar
                ? 'STAAR Question Bank (3 Rounds × 12 Questions) — Scheduled for Next Phase'
                : 'Digital STAAR Simulator Items — Scheduled for Next Phase'}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black text-white">
            {isSelfCheck
              ? '18-Question Self-Check Placeholder'
              : isStaar
              ? '36-Question STAAR Practice Placeholder'
              : 'Interactive Digital STAAR Simulator Placeholder'}
          </h4>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl">
            This assessment container is prepared for Module 7 (Lessons 7.1, 7.2, and 7.3). While the
            question banks are being developed from released STAAR item patterns, use the{' '}
            <strong>Angle Relationships Interactive Lab</strong> above or review the{' '}
            <strong>Learn</strong>, <strong>Key Vocabulary</strong>, and{' '}
            <strong>Worked Examples</strong> tabs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {!isSelfCheck && (
              <button
                onClick={() => onSwitchMode('self-check')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                <span>View Self-Check Card</span>
              </button>
            )}
            {!isStaar && (
              <button
                onClick={() => onSwitchMode('staar')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <Target className="w-3.5 h-3.5 text-indigo-300" />
                <span>View STAAR Practice Card</span>
              </button>
            )}
            {!isDigital && (
              <button
                onClick={() => onSwitchMode('digital-staar')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-300" />
                <span>View Digital STAAR Simulator Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
