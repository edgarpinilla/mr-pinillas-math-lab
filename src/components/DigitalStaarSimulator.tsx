// src/components/DigitalStaarSimulator.tsx
import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  HelpCircle,
  Check,
  Grid,
  Layers,
  Sparkles,
  Target,
  Maximize2,
  Compass,
  Move,
  BarChart2,
  BookOpen,
} from 'lucide-react';
import {
  DIGITAL_STAAR_12_QUESTIONS,
  DigitalStaarQuestion,
  DragDropRuleQuestion,
  GraphingOriginQuestion,
  InlineChoiceQuestion,
  NumericEntryQuestion,
  MultipleSelectQuestion,
  MatchingQuestion,
  HotSpotQuestion,
  NonOriginGraphingQuestion,
  ProportionInlineQuestion,
  AreaScalingQuestion,
  ClassificationQuestion,
  MultiPartQuestion,
} from '../data/staar/digitalStaarSimulatorData';

interface DigitalStaarSimulatorProps {
  topicTitle?: string;
  onSwitchPathway?: (pathway: 'self-check' | 'staar') => void;
}

export const DigitalStaarSimulator: React.FC<DigitalStaarSimulatorProps> = ({
  topicTitle = 'Dilations & Similarity',
  onSwitchPathway,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [resultsView, setResultsView] = useState<boolean>(false);

  // Drag & drop active selection helper for tap-to-place on mobile
  const [activeSelectedOption, setActiveSelectedOption] = useState<string | null>(null);

  const currentQ = DIGITAL_STAAR_12_QUESTIONS[currentIndex];
  const isCurrentSubmitted = !!submittedQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];

  // Grade individual question
  const gradeQuestion = (qIndex: number): boolean => {
    const q = DIGITAL_STAAR_12_QUESTIONS[qIndex];
    const ans = answers[qIndex];
    if (!ans) return false;

    switch (q.type) {
      case 'drag-drop': {
        const qTyped = q as DragDropRuleQuestion;
        return ans.drop1 === qTyped.correctDrop1 && ans.drop2 === qTyped.correctDrop2;
      }
      case 'graphing': {
        const qTyped = q as GraphingOriginQuestion | NonOriginGraphingQuestion;
        const plottedPoints: { x: number; y: number }[] = ans.plotted || [];
        if (plottedPoints.length !== qTyped.targetVertices.length) return false;

        // Check each target vertex has a plotted match within 0.1 tolerance
        return qTyped.targetVertices.every((target) =>
          plottedPoints.some(
            (pt) => Math.abs(pt.x - target.x) < 0.1 && Math.abs(pt.y - target.y) < 0.1
          )
        );
      }
      case 'inline-choice': {
        if (q.id === 'dstaar-3') {
          const qTyped = q as InlineChoiceQuestion;
          return (
            ans.sel1 === qTyped.sentenceParts.correct1 &&
            ans.sel2 === qTyped.sentenceParts.correct2 &&
            ans.sel3 === qTyped.sentenceParts.correct3 &&
            ans.sel4 === qTyped.sentenceParts.correct4
          );
        } else if (q.id === 'dstaar-9') {
          const qTyped = q as ProportionInlineQuestion;
          return (
            ans.sel1 === qTyped.proportionPart.rightNumDropdown.correct &&
            ans.sel2 === qTyped.valuePart.dropdown.correct
          );
        }
        return false;
      }
      case 'numeric-entry': {
        const qTyped = q as NumericEntryQuestion | AreaScalingQuestion;
        const normalized = (ans.text || '').toString().trim().toLowerCase();
        return qTyped.acceptedAnswers.some((accepted) => accepted.toLowerCase() === normalized);
      }
      case 'multiple-select': {
        const qTyped = q as MultipleSelectQuestion;
        const selectedIds: string[] = ans.selected || [];
        const correctIds = qTyped.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (selectedIds.length !== correctIds.length) return false;
        return correctIds.every((id) => selectedIds.includes(id));
      }
      case 'matching': {
        const qTyped = q as MatchingQuestion;
        const userPairs: Record<string, string> = ans.pairs || {};
        return qTyped.pairs.every((p) => userPairs[p.id] === p.rightText);
      }
      case 'hot-spot': {
        const qTyped = q as HotSpotQuestion;
        const selectedFig = qTyped.figures.find((f) => f.id === ans.selectedId);
        return !!selectedFig && selectedFig.isCorrect;
      }
      case 'classification': {
        const qTyped = q as ClassificationQuestion;
        const userCards: Record<string, 'congruence' | 'similarity-only'> = ans.assignments || {};
        return qTyped.cards.every((c) => userCards[c.id] === c.correctCategory);
      }
      case 'multi-part': {
        const qTyped = q as MultiPartQuestion;
        const ansA = (ans.partA || '').toString().trim().toLowerCase();
        const aCorrect = qTyped.partA.acceptedAnswers.some((acc) => acc.toLowerCase() === ansA);
        const bCorrect = ans.partB === qTyped.partB.correct;
        const cCorrect = ans.partC === qTyped.partC.correct;
        const ansD = (ans.partD || '').toString().trim().toLowerCase();
        const dCorrect = qTyped.partD.acceptedAnswers.some((acc) => acc.toLowerCase() === ansD);
        return aCorrect && bCorrect && cCorrect && dCorrect;
      }
      default:
        return false;
    }
  };

  const currentIsCorrect = gradeQuestion(currentIndex);

  const handleSubmitCurrent = () => {
    setSubmittedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    if (currentIndex < DIGITAL_STAAR_12_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveSelectedOption(null);
    } else {
      setResultsView(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setActiveSelectedOption(null);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSubmittedQuestions({});
    setAnswers({});
    setResultsView(false);
    setActiveSelectedOption(null);
  };

  // Helper update current answer
  const updateAnswer = (newVal: any) => {
    if (isCurrentSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...(prev[currentIndex] || {}), ...newVal },
    }));
  };

  // Calculate overall performance
  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < DIGITAL_STAAR_12_QUESTIONS.length; i++) {
      if (gradeQuestion(i)) score++;
    }
    return score;
  };

  // Calculate breakdown by interaction type
  const calculateBreakdown = () => {
    const counts: Record<string, { correct: number; total: number }> = {
      'Drag & Drop': { correct: 0, total: 0 },
      Graphing: { correct: 0, total: 0 },
      'Inline Choice': { correct: 0, total: 0 },
      'Equation/Numeric Entry': { correct: 0, total: 0 },
      'Multiple Select': { correct: 0, total: 0 },
      'Hot Spot': { correct: 0, total: 0 },
      'Multi-Part Challenge': { correct: 0, total: 0 },
    };

    DIGITAL_STAAR_12_QUESTIONS.forEach((q, idx) => {
      const isCorrect = gradeQuestion(idx);
      if (q.id === 'dstaar-1' || q.id === 'dstaar-6' || q.id === 'dstaar-11') {
        counts['Drag & Drop'].total += 1;
        if (isCorrect) counts['Drag & Drop'].correct += 1;
      } else if (q.id === 'dstaar-2' || q.id === 'dstaar-8') {
        counts['Graphing'].total += 1;
        if (isCorrect) counts['Graphing'].correct += 1;
      } else if (q.id === 'dstaar-3' || q.id === 'dstaar-9') {
        counts['Inline Choice'].total += 1;
        if (isCorrect) counts['Inline Choice'].correct += 1;
      } else if (q.id === 'dstaar-4' || q.id === 'dstaar-10') {
        counts['Equation/Numeric Entry'].total += 1;
        if (isCorrect) counts['Equation/Numeric Entry'].correct += 1;
      } else if (q.id === 'dstaar-5') {
        counts['Multiple Select'].total += 1;
        if (isCorrect) counts['Multiple Select'].correct += 1;
      } else if (q.id === 'dstaar-7') {
        counts['Hot Spot'].total += 1;
        if (isCorrect) counts['Hot Spot'].correct += 1;
      } else if (q.id === 'dstaar-12') {
        counts['Multi-Part Challenge'].total += 1;
        if (isCorrect) counts['Multi-Part Challenge'].correct += 1;
      }
    });

    return counts;
  };

  // Deterministic local recommendation based on missed questions
  const getRecommendation = (): string => {
    const missedIds = DIGITAL_STAAR_12_QUESTIONS.filter((_, idx) => !gradeQuestion(idx)).map(
      (q) => q.id
    );

    if (missedIds.length === 0) {
      return 'Outstanding mastery! You demonstrated 100% precision across all technology-enhanced digital STAAR item formats.';
    }
    if (missedIds.includes('dstaar-8')) {
      return 'Focus on dilations centered away from the origin C(h, k). Remember to measure distances from C using P\' = C + k(P - C) rather than multiplying directly from (0, 0).';
    }
    if (missedIds.includes('dstaar-10') || missedIds.includes('dstaar-12')) {
      return 'Review area scaling rules: side lengths scale by k, perimeter scales by k, and area scales by k². Practice applying k² to 2D areas.';
    }
    if (missedIds.includes('dstaar-5') || missedIds.includes('dstaar-11')) {
      return 'Review fundamental transformation properties: dilations preserve angles and shape (similarity), but change side lengths by k. Translations, reflections, and rotations are rigid motions that preserve congruence.';
    }
    if (missedIds.includes('dstaar-4') || missedIds.includes('dstaar-1')) {
      return 'Remember the golden ratio rule for scale factors: k = Image / Pre-Image. Always divide the new coordinate or length by the original.';
    }
    return 'Review coordinate dilations and corresponding side proportions before retaking the simulator.';
  };

  return (
    <div
      id="digital-staar-simulator-section"
      className="space-y-6 sm:space-y-8 animate-fadeIn text-slate-900"
    >
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-black uppercase tracking-wider">
              <Laptop className="w-4 h-4 text-cyan-300" />
              DIGITAL STAAR SIMULATOR
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Grade 8 Mathematics
            </h1>
            <p className="text-sm sm:text-base font-semibold text-cyan-200">
              Unit 5: Dilations & Similarity • 12 Technology-Enhanced Questions
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Authentic practice for the new digital STAAR interaction formats: Drag & Drop, Coordinate Graphing, Inline Choice, Equation Editor, Multiple Select, Hot Spot, and Multi-Part challenges.
            </p>
          </div>

          {/* Quick Pathway Switchers */}
          {onSwitchPathway && (
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <button
                onClick={() => onSwitchPathway('self-check')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition-colors cursor-pointer"
              >
                Go to Self Check (6 Qs)
              </button>
              <button
                onClick={() => onSwitchPathway('staar')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition-colors cursor-pointer"
              >
                Go to STAAR Practice (36 Qs)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RESULTS VIEW */}
      {resultsView ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-700">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Digital STAAR Simulator Complete
            </h2>
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Score
                </div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-600">
                  {calculateScore()} <span className="text-xl text-slate-400 font-normal">/ 12</span>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Accuracy
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {Math.round((calculateScore() / 12) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Performance by interaction type */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              Performance by Interaction Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(calculateBreakdown()).map(([type, stats]) => (
                <div
                  key={type}
                  className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-xl flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-slate-700">{type}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-black ${
                        stats.correct === stats.total ? 'text-emerald-600' : 'text-slate-800'
                      }`}
                    >
                      {stats.correct} / {stats.total}
                    </span>
                    {stats.correct === stats.total ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-xs text-slate-400">
                        ({Math.round((stats.correct / stats.total) * 100)}%)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200/80 p-5 rounded-2xl flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                Targeted Review Recommendation
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {getRecommendation()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="retake-digital-simulator-btn"
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Digital Simulator
            </button>
            {onSwitchPathway && (
              <button
                onClick={() => onSwitchPathway('staar')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Practice Full STAAR Bank (36 Questions)
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUESTION CARD VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-md space-y-6">
          {/* Top Question Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                Question {currentQ.number} of 12
              </span>
              <span className="text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/70 px-2.5 py-1 rounded-lg">
                {currentQ.typeLabel}
              </span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-1 rounded-lg">
                {currentQ.teks}
              </span>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {DIGITAL_STAAR_12_QUESTIONS.map((q, idx) => {
                const isAnswered = !!submittedQuestions[idx];
                const isCorrect = isAnswered && gradeQuestion(idx);
                const isCurr = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    id={`nav-dot-${idx + 1}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveSelectedOption(null);
                    }}
                    title={`Question ${idx + 1} (${q.typeLabel})`}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isCurr
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-1 shadow-xs font-black'
                        : isAnswered
                        ? isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Topic: {currentQ.topic}
            </div>
            <div className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </div>
          </div>

          {/* INTERACTIVE WORKSPACE ACCORDING TO QUESTION TYPE */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80">
            {/* Q1: Drag & Drop Rule */}
            {currentQ.type === 'drag-drop' && (
              <RenderDragDropRule
                question={currentQ as DragDropRuleQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
                activeOption={activeSelectedOption}
                setActiveOption={setActiveSelectedOption}
              />
            )}

            {/* Q2: Graphing Origin */}
            {currentQ.type === 'graphing' && currentQ.id === 'dstaar-2' && (
              <RenderGraphingOrigin
                question={currentQ as GraphingOriginQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q3: Inline Choice */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'dstaar-3' && (
              <RenderInlineChoice
                question={currentQ as InlineChoiceQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q4: Numeric Entry */}
            {currentQ.type === 'numeric-entry' && currentQ.id === 'dstaar-4' && (
              <RenderNumericEntry
                question={currentQ as NumericEntryQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q5: Multiple Select */}
            {currentQ.type === 'multiple-select' && (
              <RenderMultipleSelect
                question={currentQ as MultipleSelectQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q6: Matching */}
            {currentQ.type === 'matching' && (
              <RenderMatching
                question={currentQ as MatchingQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q7: Hot Spot */}
            {currentQ.type === 'hot-spot' && (
              <RenderHotSpot
                question={currentQ as HotSpotQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q8: Graphing Non-Origin */}
            {currentQ.type === 'graphing' && currentQ.id === 'dstaar-8' && (
              <RenderNonOriginGraphing
                question={currentQ as NonOriginGraphingQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q9: Proportion Inline Dropdown */}
            {currentQ.type === 'inline-choice' && currentQ.id === 'dstaar-9' && (
              <RenderProportionDropdown
                question={currentQ as ProportionInlineQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q10: Area Scaling Numeric */}
            {currentQ.type === 'numeric-entry' && currentQ.id === 'dstaar-10' && (
              <RenderAreaScalingNumeric
                question={currentQ as AreaScalingQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}

            {/* Q11: Classification Drag & Drop */}
            {currentQ.type === 'classification' && (
              <RenderClassification
                question={currentQ as ClassificationQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
                activeOption={activeSelectedOption}
                setActiveOption={setActiveSelectedOption}
              />
            )}

            {/* Q12: Multi-Part Challenge */}
            {currentQ.type === 'multi-part' && (
              <RenderMultiPartChallenge
                question={currentQ as MultiPartQuestion}
                answer={currentAnswer}
                isSubmitted={isCurrentSubmitted}
                onUpdate={updateAnswer}
              />
            )}
          </div>

          {/* SUBMIT OR NEXT ACTION CONTROLS */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                id="btn-prev-q"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentIndex === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            </div>

            <div className="flex items-center gap-3">
              {!isCurrentSubmitted ? (
                <button
                  id="btn-submit-answer"
                  onClick={handleSubmitCurrent}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Submit Response
                </button>
              ) : (
                <button
                  id="btn-next-q"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  {currentIndex === DIGITAL_STAAR_12_QUESTIONS.length - 1 ? (
                    <>
                      View Final Results <Award className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next Question <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* POST-SUBMISSION FEEDBACK */}
          {isCurrentSubmitted && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3 ${
                currentIsCorrect
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/90 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2.5 font-black text-sm sm:text-base">
                {currentIsCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Correct! Great reasoning.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Incorrect — Review the solution below.</span>
                  </>
                )}
              </div>

              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800">
                {currentQ.solutionExplanation}
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-start gap-2 text-xs font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Key STAAR Rule: </strong>
                  {currentQ.keyTakeaway}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
 * INDIVIDUAL QUESTION RENDERERS
 * ========================================================================= */

// Q1: Drag & Drop Dilation Rule
const RenderDragDropRule: React.FC<{
  question: DragDropRuleQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
  activeOption: string | null;
  setActiveOption: (val: string | null) => void;
}> = ({ question, answer, isSubmitted, onUpdate, activeOption, setActiveOption }) => {
  const drop1 = answer?.drop1 || null;
  const drop2 = answer?.drop2 || null;

  const handleDropInto = (slot: 'drop1' | 'drop2', value: string) => {
    if (isSubmitted) return;
    onUpdate({ [slot]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-700">
        <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          Pre-Image: {question.coordinatesInfo.preImage}
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
          Dilated Image: {question.coordinatesInfo.image}
        </span>
      </div>

      {/* Target Formula with Drop Boxes */}
      <div className="flex items-center justify-center flex-wrap gap-2 text-base sm:text-xl font-mono font-bold text-slate-900 bg-white p-6 rounded-2xl border-2 border-dashed border-indigo-200">
        <span>{question.templatePrefix}</span>

        {/* Drop Slot 1 */}
        <div
          id="drop-target-1"
          onClick={() => {
            if (activeOption) {
              handleDropInto('drop1', activeOption);
            } else if (drop1) {
              handleDropInto('drop1', null as any);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            if (data) handleDropInto('drop1', data);
          }}
          className={`min-w-16 sm:min-w-20 h-10 sm:h-12 rounded-xl border-2 flex items-center justify-center px-2 text-sm sm:text-base font-black transition-all cursor-pointer ${
            drop1
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-indigo-400'
          }`}
        >
          {drop1 || '[ Drop k ]'}
        </div>
        <span>{question.templateMiddle}</span>

        {/* Drop Slot 2 */}
        <div
          id="drop-target-2"
          onClick={() => {
            if (activeOption) {
              handleDropInto('drop2', activeOption);
            } else if (drop2) {
              handleDropInto('drop2', null as any);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            if (data) handleDropInto('drop2', data);
          }}
          className={`min-w-16 sm:min-w-20 h-10 sm:h-12 rounded-xl border-2 flex items-center justify-center px-2 text-sm sm:text-base font-black transition-all cursor-pointer ${
            drop2
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-indigo-400'
          }`}
        >
          {drop2 || '[ Drop k ]'}
        </div>
        <span>{question.templateSuffix}</span>
      </div>

      {/* Draggable Choice Cards */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
          Drag an option or tap an option, then tap a target box:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {question.draggableOptions.map((opt, i) => (
            <div
              key={i}
              id={`draggable-opt-${i}`}
              draggable={!isSubmitted}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', opt);
              }}
              onClick={() => {
                if (isSubmitted) return;
                setActiveOption(activeOption === opt ? null : opt);
              }}
              className={`px-4 py-2.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs border transition-all cursor-pointer select-none ${
                activeOption === opt
                  ? 'bg-indigo-600 text-white border-indigo-700 scale-105 ring-2 ring-indigo-400'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50'
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Q2: Graphing (Dilation Centered at Origin)
const RenderGraphingOrigin: React.FC<{
  question: GraphingOriginQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const plotted: { x: number; y: number }[] = answer?.plotted || [];

  const handleTogglePoint = (x: number, y: number) => {
    if (isSubmitted) return;
    const existingIndex = plotted.findIndex((p) => p.x === x && p.y === y);
    if (existingIndex >= 0) {
      const next = [...plotted];
      next.splice(existingIndex, 1);
      onUpdate({ plotted: next });
    } else {
      onUpdate({ plotted: [...plotted, { x, y }] });
    }
  };

  const handleClear = () => {
    if (isSubmitted) return;
    onUpdate({ plotted: [] });
  };

  // SVG grid sizing
  const width = 360;
  const height = 300;
  const { minX, maxX, minY, maxY } = question.gridRange;
  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 60) + 30;
  const scaleY = (y: number) => height - 30 - ((y - minY) / (maxY - minY)) * (height - 60);

  // Generate grid values
  const xValues: number[] = [];
  for (let x = minX; x <= maxX; x++) xValues.push(x);
  const yValues: number[] = [];
  for (let y = minY; y <= maxY; y++) yValues.push(y);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-600">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          Pre-Image △ABC (given)
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block ml-3" />
          Plotted Points ({plotted.length} / 3)
        </div>
        <button
          id="btn-clear-graph-q2"
          onClick={handleClear}
          disabled={isSubmitted || plotted.length === 0}
          className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
        >
          Clear Points
        </button>
      </div>

      <div className="flex justify-center overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200">
        <svg width={width} height={height} className="select-none font-sans">
          {/* Grid lines */}
          {xValues.map((x) => (
            <line
              key={`grid-x-${x}`}
              x1={scaleX(x)}
              y1={scaleY(minY)}
              x2={scaleX(x)}
              y2={scaleY(maxY)}
              stroke={x === 0 ? '#475569' : '#e2e8f0'}
              strokeWidth={x === 0 ? 2 : 1}
            />
          ))}
          {yValues.map((y) => (
            <line
              key={`grid-y-${y}`}
              x1={scaleX(minX)}
              y1={scaleY(y)}
              x2={scaleX(maxX)}
              y2={scaleY(y)}
              stroke={y === 0 ? '#475569' : '#e2e8f0'}
              strokeWidth={y === 0 ? 2 : 1}
            />
          ))}

          {/* Coordinate tick labels */}
          {xValues.map((x) => (
            <text
              key={`lbl-x-${x}`}
              x={scaleX(x)}
              y={scaleY(0) + 14}
              fontSize="9"
              textAnchor="middle"
              fill="#64748b"
            >
              {x}
            </text>
          ))}
          {yValues.map((y) =>
            y !== 0 ? (
              <text
                key={`lbl-y-${y}`}
                x={scaleX(0) - 8}
                y={scaleY(y) + 3}
                fontSize="9"
                textAnchor="end"
                fill="#64748b"
              >
                {y}
              </text>
            ) : null
          )}

          {/* Pre-image triangle ABC polygon */}
          <polygon
            points={question.preImageVertices.map((v) => `${scaleX(v.x)},${scaleY(v.y)}`).join(' ')}
            fill="rgba(59, 130, 246, 0.15)"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          {question.preImageVertices.map((v) => (
            <g key={v.label}>
              <circle cx={scaleX(v.x)} cy={scaleY(v.y)} r="4.5" fill="#3b82f6" />
              <text
                x={scaleX(v.x) + 6}
                y={scaleY(v.y) - 6}
                fontSize="11"
                fontWeight="bold"
                fill="#1e3a8a"
              >
                {v.label}({v.x}, {v.y})
              </text>
            </g>
          ))}

          {/* Plotted Image Points and Polygon */}
          {plotted.length >= 2 && (
            <polygon
              points={plotted.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}
          {plotted.map((p, idx) => (
            <g key={`plotted-${idx}`}>
              <circle cx={scaleX(p.x)} cy={scaleY(p.y)} r="5.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              <text
                x={scaleX(p.x) + 7}
                y={scaleY(p.y) - 7}
                fontSize="10"
                fontWeight="bold"
                fill="#065f46"
              >
                ({p.x}, {p.y})
              </text>
            </g>
          ))}

          {/* Interactive clickable grid dots */}
          {!isSubmitted &&
            xValues.map((x) =>
              yValues.map((y) => (
                <circle
                  key={`click-${x}-${y}`}
                  id={`grid-click-${x}-${y}`}
                  cx={scaleX(x)}
                  cy={scaleY(y)}
                  r="7"
                  fill="transparent"
                  className="cursor-pointer hover:fill-indigo-400 hover:opacity-50"
                  onClick={() => handleTogglePoint(x, y)}
                />
              ))
            )}
        </svg>
      </div>

      <div className="text-xs text-center text-slate-500 font-medium">
        {plotted.length === 0
          ? 'Click any coordinate intersection to place a vertex.'
          : `Currently plotted: ${plotted.map((p) => `(${p.x}, ${p.y})`).join(', ')}`}
      </div>
    </div>
  );
};

// Q3: Inline Choice (Dropdowns for Image Coordinates)
const RenderInlineChoice: React.FC<{
  question: InlineChoiceQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const parts = question.sentenceParts;
  const sel1 = answer?.sel1 || '';
  const sel2 = answer?.sel2 || '';
  const sel3 = answer?.sel3 || '';
  const sel4 = answer?.sel4 || '';

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 text-sm sm:text-base leading-loose font-medium text-slate-800">
        <span>{parts.textBeforeW}</span>

        {/* Dropdown 1: W' x */}
        <select
          id="dropdown-w-x"
          disabled={isSubmitted}
          value={sel1}
          onChange={(e) => onUpdate({ sel1: e.target.value })}
          className="mx-1 px-2.5 py-1.5 rounded-lg border-2 border-indigo-300 font-bold bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">[ select x ]</option>
          {parts.dropdown1Options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span>{parts.textBetweenW}</span>

        {/* Dropdown 2: W' y */}
        <select
          id="dropdown-w-y"
          disabled={isSubmitted}
          value={sel2}
          onChange={(e) => onUpdate({ sel2: e.target.value })}
          className="mx-1 px-2.5 py-1.5 rounded-lg border-2 border-indigo-300 font-bold bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">[ select y ]</option>
          {parts.dropdown2Options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span>{parts.textBeforeZ}</span>

        {/* Dropdown 3: Z' x */}
        <select
          id="dropdown-z-x"
          disabled={isSubmitted}
          value={sel3}
          onChange={(e) => onUpdate({ sel3: e.target.value })}
          className="mx-1 px-2.5 py-1.5 rounded-lg border-2 border-indigo-300 font-bold bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">[ select x ]</option>
          {parts.dropdown3Options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span>{parts.textBetweenZ}</span>

        {/* Dropdown 4: Z' y */}
        <select
          id="dropdown-z-y"
          disabled={isSubmitted}
          value={sel4}
          onChange={(e) => onUpdate({ sel4: e.target.value })}
          className="mx-1 px-2.5 py-1.5 rounded-lg border-2 border-indigo-300 font-bold bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">[ select y ]</option>
          {parts.dropdown4Options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span>{parts.textAfterZ}</span>
      </div>
    </div>
  );
};

// Q4: Numeric Entry (Scale Factor k)
const RenderNumericEntry: React.FC<{
  question: NumericEntryQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const textVal = answer?.text || '';

  const handleKeypadPress = (key: string) => {
    if (isSubmitted) return;
    if (key === 'CLEAR') {
      onUpdate({ text: '' });
    } else if (key === 'BACK') {
      onUpdate({ text: textVal.slice(0, -1) });
    } else {
      onUpdate({ text: textVal + key });
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-semibold text-slate-700 text-sm">
        <span>Pre-Image: {question.preImageCoord}</span>
        <span className="mx-3 text-slate-400">→</span>
        <span className="text-indigo-600 font-bold">Image: {question.imageCoord}</span>
      </div>

      {/* Input Display */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block text-center">
          {question.inputLabel}
        </label>
        <div className="flex items-center justify-center gap-2">
          <input
            id="numeric-input-k"
            type="text"
            disabled={isSubmitted}
            value={textVal}
            placeholder={question.placeholder}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-56 text-center text-xl font-bold font-mono py-2.5 px-4 rounded-xl border-2 border-indigo-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>
      </div>

      {/* STAAR On-Screen Math Keypad */}
      {!isSubmitted && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            On-Screen Keypad
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-sm font-bold font-mono">
            {['7', '8', '9', '/'].map((k) => (
              <button
                key={k}
                id={`keypad-${k}`}
                onClick={() => handleKeypadPress(k)}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                {k}
              </button>
            ))}
            {['4', '5', '6', '.'].map((k) => (
              <button
                key={k}
                id={`keypad-${k}`}
                onClick={() => handleKeypadPress(k)}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                {k}
              </button>
            ))}
            {['1', '2', '3', '-'].map((k) => (
              <button
                key={k}
                id={`keypad-${k}`}
                onClick={() => handleKeypadPress(k)}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                {k}
              </button>
            ))}
            {['0', 'CLEAR', 'BACK'].map((k, idx) => (
              <button
                key={k}
                id={`keypad-${k}`}
                onClick={() => handleKeypadPress(k)}
                className={`py-2.5 rounded-lg border transition-colors cursor-pointer ${
                  k === '0'
                    ? 'col-span-2 bg-slate-100 text-slate-800 border-slate-200'
                    : k === 'CLEAR'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                }`}
              >
                {k === 'BACK' ? '⌫' : k}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Q5: Multiple Select (Properties of Dilations)
const RenderMultipleSelect: React.FC<{
  question: MultipleSelectQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const selected: string[] = answer?.selected || [];

  const handleToggle = (id: string) => {
    if (isSubmitted) return;
    if (selected.includes(id)) {
      onUpdate({ selected: selected.filter((s) => s !== id) });
    } else {
      onUpdate({ selected: [...selected, id] });
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {question.instruction}
      </div>
      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isChecked = selected.includes(opt.id);
          return (
            <div
              key={opt.id}
              id={`multi-select-${opt.id}`}
              onClick={() => handleToggle(opt.id)}
              className={`p-3.5 sm:p-4 rounded-xl border-2 flex items-start gap-3 transition-all cursor-pointer ${
                isChecked
                  ? 'bg-indigo-50/80 border-indigo-500 text-slate-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-400 bg-white'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Q6: Matching (Corresponding Sides & Vertices)
const RenderMatching: React.FC<{
  question: MatchingQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const pairs: Record<string, string> = answer?.pairs || {};
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const availableRightOptions = [
    'Side PQ',
    'Side QR',
    'Side RS',
    'Vertex S',
  ];

  const handlePair = (leftId: string, rightVal: string) => {
    if (isSubmitted) return;
    onUpdate({ pairs: { ...pairs, [leftId]: rightVal } });
    setSelectedLeft(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center font-bold text-indigo-700 text-sm">
        {question.figureStatement}
      </div>

      <div className="space-y-3">
        {question.pairs.map((p) => {
          const matched = pairs[p.id] || null;
          const isCurrentSelected = selectedLeft === p.id;
          return (
            <div
              key={p.id}
              className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div
                onClick={() => {
                  if (!isSubmitted) setSelectedLeft(isCurrentSelected ? null : p.id);
                }}
                className={`px-3.5 py-2 rounded-lg font-bold text-xs sm:text-sm border transition-colors cursor-pointer ${
                  isCurrentSelected
                    ? 'bg-indigo-600 text-white border-indigo-700'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {p.leftText}
              </div>

              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                <select
                  id={`match-select-${p.id}`}
                  disabled={isSubmitted}
                  value={matched || ''}
                  onChange={(e) => handlePair(p.id, e.target.value)}
                  className="w-full sm:w-44 px-3 py-2 rounded-lg border-2 border-slate-300 font-bold text-xs sm:text-sm bg-white text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">-- Match Corresponding Part --</option>
                  {availableRightOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Q7: Hot Spot / Visual Selection
const RenderHotSpot: React.FC<{
  question: HotSpotQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const selectedId = answer?.selectedId || null;

  const width = 360;
  const height = 300;
  const { minX, maxX, minY, maxY } = question.gridRange;
  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 60) + 30;
  const scaleY = (y: number) => height - 30 - ((y - minY) / (maxY - minY)) * (height - 60);

  const xTicks = [0, 2, 4, 6, 8];
  const yTicks = [0, 2, 4, 6, 8, 10];

  return (
    <div className="space-y-4">
      <div className="text-xs text-center text-slate-500 font-medium">
        Click on any figure inside the graph or the cards below to select your answer.
      </div>

      <div className="flex justify-center overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200">
        <svg width={width} height={height} className="select-none font-sans">
          {/* Grid lines */}
          {xTicks.map((x) => (
            <line
              key={`grid-x-${x}`}
              x1={scaleX(x)}
              y1={scaleY(minY)}
              x2={scaleX(x)}
              y2={scaleY(maxY)}
              stroke="#e2e8f0"
              strokeWidth={x === 0 ? 2 : 1}
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`grid-y-${y}`}
              x1={scaleX(minX)}
              y1={scaleY(y)}
              x2={scaleX(maxX)}
              y2={scaleY(y)}
              stroke="#e2e8f0"
              strokeWidth={y === 0 ? 2 : 1}
            />
          ))}

          {/* Axes labels */}
          {xTicks.map((x) => (
            <text key={`tx-${x}`} x={scaleX(x)} y={scaleY(0) + 14} fontSize="9" textAnchor="middle" fill="#64748b">
              {x}
            </text>
          ))}
          {yTicks.map((y) => (
            <text key={`ty-${y}`} x={scaleX(0) - 8} y={scaleY(y) + 3} fontSize="9" textAnchor="end" fill="#64748b">
              {y}
            </text>
          ))}

          {/* Pre-Image Triangle T */}
          <polygon
            points={question.preImageVertices.map((v) => `${scaleX(v[0])},${scaleY(v[1])}`).join(' ')}
            fill="rgba(71, 85, 105, 0.2)"
            stroke="#334155"
            strokeWidth="2"
          />
          <text
            x={scaleX(2.3)}
            y={scaleY(3.5)}
            fontSize="10"
            fontWeight="bold"
            fill="#1e293b"
          >
            T (Pre-Image)
          </text>

          {/* Candidate Figures (Hot Spots) */}
          {question.figures.map((fig) => {
            const isSelected = selectedId === fig.id;
            return (
              <g
                key={fig.id}
                id={`hotspot-${fig.id}`}
                onClick={() => {
                  if (!isSubmitted) onUpdate({ selectedId: fig.id });
                }}
                className="cursor-pointer"
              >
                <polygon
                  points={fig.vertices.map((v) => `${scaleX(v[0])},${scaleY(v[1])}`).join(' ')}
                  fill={isSelected ? `${fig.color}55` : `${fig.color}22`}
                  stroke={fig.color}
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeDasharray={isSelected ? 'none' : '3 2'}
                  className="transition-all hover:opacity-80"
                />
                <text
                  x={scaleX(fig.vertices[0][0]) + 4}
                  y={scaleY(fig.vertices[0][1]) - 4}
                  fontSize="11"
                  fontWeight="bold"
                  fill={fig.color}
                >
                  {fig.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selectable Hot Spot Card Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {question.figures.map((fig) => {
          const isSelected = selectedId === fig.id;
          return (
            <button
              key={fig.id}
              id={`hotspot-btn-${fig.id}`}
              onClick={() => {
                if (!isSubmitted) onUpdate({ selectedId: fig.id });
              }}
              className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-400'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="text-xs font-bold flex items-center justify-between">
                <span style={{ color: fig.color }}>● {fig.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">{fig.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Q8: Non-Origin Center Graphing (C(1, 1), k = 2)
const RenderNonOriginGraphing: React.FC<{
  question: NonOriginGraphingQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const plotted: { x: number; y: number }[] = answer?.plotted || [];

  const handleTogglePoint = (x: number, y: number) => {
    if (isSubmitted) return;
    const existingIndex = plotted.findIndex((p) => p.x === x && p.y === y);
    if (existingIndex >= 0) {
      const next = [...plotted];
      next.splice(existingIndex, 1);
      onUpdate({ plotted: next });
    } else {
      onUpdate({ plotted: [...plotted, { x, y }] });
    }
  };

  const handleClear = () => {
    if (isSubmitted) return;
    onUpdate({ plotted: [] });
  };

  const width = 360;
  const height = 300;
  const { minX, maxX, minY, maxY } = question.gridRange;
  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 60) + 30;
  const scaleY = (y: number) => height - 30 - ((y - minY) / (maxY - minY)) * (height - 60);

  const xVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yVals = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-600">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          Center C(1, 1)
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block ml-2" />
          Pre-Image Segment AB
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block ml-2" />
          Plotted ({plotted.length} / 2)
        </div>
        <button
          id="btn-clear-graph-q8"
          onClick={handleClear}
          disabled={isSubmitted || plotted.length === 0}
          className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
        >
          Clear Points
        </button>
      </div>

      <div className="flex justify-center overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200">
        <svg width={width} height={height} className="select-none font-sans">
          {/* Grid lines */}
          {xVals.map((x) => (
            <line
              key={`gx-${x}`}
              x1={scaleX(x)}
              y1={scaleY(minY)}
              x2={scaleX(x)}
              y2={scaleY(maxY)}
              stroke={x === 0 ? '#475569' : '#e2e8f0'}
              strokeWidth={x === 0 ? 2 : 1}
            />
          ))}
          {yVals.map((y) => (
            <line
              key={`gy-${y}`}
              x1={scaleX(minX)}
              y1={scaleY(y)}
              x2={scaleX(maxX)}
              y2={scaleY(y)}
              stroke={y === 0 ? '#475569' : '#e2e8f0'}
              strokeWidth={y === 0 ? 2 : 1}
            />
          ))}

          {/* Coordinate ticks */}
          {xVals.map((x) => (
            <text key={`tx-${x}`} x={scaleX(x)} y={scaleY(0) + 14} fontSize="9" textAnchor="middle" fill="#64748b">
              {x}
            </text>
          ))}
          {yVals.map((y) => (
            <text key={`ty-${y}`} x={scaleX(0) - 8} y={scaleY(y) + 3} fontSize="9" textAnchor="end" fill="#64748b">
              {y}
            </text>
          ))}

          {/* Center Point C(1, 1) */}
          <circle cx={scaleX(1)} cy={scaleY(1)} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
          <text x={scaleX(1) + 8} y={scaleY(1) + 4} fontSize="11" fontWeight="bold" fill="#b45309">
            C(1, 1)
          </text>

          {/* Pre-Image Segment AB */}
          <line
            x1={scaleX(3)}
            y1={scaleY(4)}
            x2={scaleX(5)}
            y2={scaleY(2)}
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <circle cx={scaleX(3)} cy={scaleY(4)} r="4.5" fill="#3b82f6" />
          <text x={scaleX(3) - 8} y={scaleY(4) - 6} fontSize="10" fontWeight="bold" fill="#1e40af">
            A(3, 4)
          </text>
          <circle cx={scaleX(5)} cy={scaleY(2)} r="4.5" fill="#3b82f6" />
          <text x={scaleX(5) + 6} y={scaleY(2) + 10} fontSize="10" fontWeight="bold" fill="#1e40af">
            B(5, 2)
          </text>

          {/* Plotted points and line */}
          {plotted.length === 2 && (
            <line
              x1={scaleX(plotted[0].x)}
              y1={scaleY(plotted[0].y)}
              x2={scaleX(plotted[1].x)}
              y2={scaleY(plotted[1].y)}
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          )}
          {plotted.map((p, i) => (
            <g key={`plotted-${i}`}>
              <circle cx={scaleX(p.x)} cy={scaleY(p.y)} r="5.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              <text x={scaleX(p.x) + 7} y={scaleY(p.y) - 7} fontSize="10" fontWeight="bold" fill="#065f46">
                ({p.x}, {p.y})
              </text>
            </g>
          ))}

          {/* Clickable intersections */}
          {!isSubmitted &&
            xVals.map((x) =>
              yVals.map((y) => (
                <circle
                  key={`cl-${x}-${y}`}
                  id={`grid-click-q8-${x}-${y}`}
                  cx={scaleX(x)}
                  cy={scaleY(y)}
                  r="7"
                  fill="transparent"
                  className="cursor-pointer hover:fill-indigo-400 hover:opacity-50"
                  onClick={() => handleTogglePoint(x, y)}
                />
              ))
            )}
        </svg>
      </div>

      <div className="text-xs text-center text-slate-500 font-medium">
        {plotted.length === 0
          ? 'Click to place image endpoints A\' and B\'.'
          : `Currently plotted: ${plotted.map((p) => `(${p.x}, ${p.y})`).join(', ')}`}
      </div>
    </div>
  );
};

// Q9: Inline Proportion Dropdown
const RenderProportionDropdown: React.FC<{
  question: ProportionInlineQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const sel1 = answer?.sel1 || '';
  const sel2 = answer?.sel2 || '';

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-700">
        <span className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
          {question.triangleStatement}
        </span>
        {question.measurements.map((m, i) => (
          <span key={i} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {m}
          </span>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-5 text-base sm:text-lg font-medium text-slate-800">
        {/* Proportion Equation */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Proportion:</span>
          <div className="inline-flex flex-col items-center">
            <span className="font-bold text-slate-900 border-b-2 border-slate-800 px-3">6</span>
            <span className="font-bold text-slate-900 px-3">10</span>
          </div>
          <span className="text-xl font-bold">=</span>
          <div className="inline-flex flex-col items-center">
            <select
              id="dropdown-prop-num"
              disabled={isSubmitted}
              value={sel1}
              onChange={(e) => onUpdate({ sel1: e.target.value })}
              className="px-2 py-1 border-b-2 border-indigo-500 font-bold bg-indigo-50 text-indigo-900 rounded focus:outline-none cursor-pointer"
            >
              <option value="">[ ? ]</option>
              {question.proportionPart.rightNumDropdown.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="font-bold text-slate-900 px-3 mt-1">x</span>
          </div>
        </div>

        {/* Solving for x */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Side length:</span>
          <span className="font-bold text-slate-900">x =</span>
          <select
            id="dropdown-prop-val"
            disabled={isSubmitted}
            value={sel2}
            onChange={(e) => onUpdate({ sel2: e.target.value })}
            className="px-3 py-1.5 border-2 border-indigo-300 font-bold bg-white text-indigo-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="">[ select value ]</option>
            {question.valuePart.dropdown.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="font-bold text-slate-700">cm</span>
        </div>
      </div>
    </div>
  );
};

// Q10: Area Scaling Numeric
const RenderAreaScalingNumeric: React.FC<{
  question: AreaScalingQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const textVal = answer?.text || '';

  const handleKeypadPress = (key: string) => {
    if (isSubmitted) return;
    if (key === 'CLEAR') {
      onUpdate({ text: '' });
    } else if (key === 'BACK') {
      onUpdate({ text: textVal.slice(0, -1) });
    } else {
      onUpdate({ text: textVal + key });
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-semibold text-slate-700 text-sm">
        <span>Original Area: {question.originalMeasurement}</span>
        <span className="mx-3 text-slate-400">•</span>
        <span className="text-indigo-600 font-bold">Scale Factor k = {question.scaleFactor}</span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block text-center">
          {question.inputLabel}
        </label>
        <div className="flex items-center justify-center gap-2">
          <input
            id="numeric-input-area"
            type="text"
            disabled={isSubmitted}
            value={textVal}
            placeholder="Enter numerical value"
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-56 text-center text-xl font-bold font-mono py-2.5 px-4 rounded-xl border-2 border-indigo-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          <span className="text-xs font-bold text-slate-500">{question.unit}</span>
        </div>
      </div>

      {/* On-screen Keypad */}
      {!isSubmitted && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="grid grid-cols-4 gap-1.5 text-sm font-bold font-mono">
            {['7', '8', '9', '.'].map((k) => (
              <button
                key={k}
                id={`keypad-area-${k}`}
                onClick={() => handleKeypadPress(k)}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                {k}
              </button>
            ))}
            {['4', '5', '6', '0'].map((k) => (
              <button
                key={k}
                id={`keypad-area-${k}`}
                onClick={() => handleKeypadPress(k)}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                {k}
              </button>
            ))}
            {['1', '2', '3', 'BACK'].map((k) => (
              <button
                key={k}
                id={`keypad-area-${k}`}
                onClick={() => handleKeypadPress(k)}
                className={`py-2.5 rounded-lg border transition-colors cursor-pointer ${
                  k === 'BACK'
                    ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                {k === 'BACK' ? '⌫' : k}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Q11: Classification Drag & Drop (Rigid vs Non-Rigid)
const RenderClassification: React.FC<{
  question: ClassificationQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
  activeOption: string | null;
  setActiveOption: (val: string | null) => void;
}> = ({ question, answer, isSubmitted, onUpdate, activeOption, setActiveOption }) => {
  const assignments: Record<string, 'congruence' | 'similarity-only'> =
    answer?.assignments || {};

  const handleAssign = (cardId: string, category: 'congruence' | 'similarity-only') => {
    if (isSubmitted) return;
    onUpdate({ assignments: { ...assignments, [cardId]: category } });
    if (activeOption === cardId) setActiveOption(null);
  };

  return (
    <div className="space-y-6">
      {/* 2 Target Category Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.categories.map((cat) => {
          const cardsInCat = question.cards.filter((c) => assignments[c.id] === cat.id);
          return (
            <div
              key={cat.id}
              id={`cat-drop-${cat.id}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const cardId = e.dataTransfer.getData('text/plain');
                if (cardId) handleAssign(cardId, cat.id);
              }}
              onClick={() => {
                if (activeOption) handleAssign(activeOption, cat.id);
              }}
              className="bg-white p-4 rounded-2xl border-2 border-slate-200 min-h-48 flex flex-col justify-between space-y-3"
            >
              <div>
                <h4 className="text-sm font-black text-slate-900">{cat.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{cat.subtitle}</p>
              </div>

              {/* Cards dropped in this category */}
              <div className="space-y-2 flex-1 pt-2">
                {cardsInCat.map((card) => (
                  <div
                    key={card.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-800"
                  >
                    <span>{card.rule}</span>
                    {!isSubmitted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = { ...assignments };
                          delete next[card.id];
                          onUpdate({ assignments: next });
                        }}
                        className="text-slate-400 hover:text-rose-500 px-1 font-sans text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {cardsInCat.length === 0 && (
                  <div className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
                    Drop items here or tap an item below and tap here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Cards Tray */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
          Items to Classify:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {question.cards.map((card) => {
            const isAssigned = !!assignments[card.id];
            const isSelected = activeOption === card.id;
            return (
              <div
                key={card.id}
                id={`card-classify-${card.id}`}
                draggable={!isSubmitted}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', card.id);
                }}
                onClick={() => {
                  if (isSubmitted) return;
                  setActiveOption(isSelected ? null : card.id);
                }}
                className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer select-none ${
                  isAssigned
                    ? 'opacity-40 bg-slate-100 border-slate-200 line-through'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400 scale-105'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50'
                }`}
              >
                {card.rule}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Q12: Multi-Part Digital Challenge
const RenderMultiPartChallenge: React.FC<{
  question: MultiPartQuestion;
  answer: any;
  isSubmitted: boolean;
  onUpdate: (val: any) => void;
}> = ({ question, answer, isSubmitted, onUpdate }) => {
  const partA = answer?.partA || '';
  const partB = answer?.partB || '';
  const partC = answer?.partC || '';
  const partD = answer?.partD || '';

  return (
    <div className="space-y-6">
      {/* Coordinate Summary Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
        <div className="font-bold text-slate-900 mb-2">Given Dilations Scenario:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-blue-900">
            <strong>Pre-Image △JKL: </strong>
            {question.preImagePoints.map((p) => `${p.label}${p.coord}`).join(', ')}
          </div>
          <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-900">
            <strong>Image △J'K'L': </strong>
            {question.imagePoints.map((p) => `${p.label}${p.coord}`).join(', ')}
          </div>
        </div>
      </div>

      {/* Part 1: Scale factor k */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          {question.partA.question}
        </label>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-800">k =</span>
          <input
            id="multipart-part-a"
            type="text"
            disabled={isSubmitted}
            value={partA}
            placeholder="Enter decimal or fraction"
            onChange={(e) => onUpdate({ partA: e.target.value })}
            className="w-48 px-3 py-1.5 rounded-lg border-2 border-indigo-200 font-mono font-bold text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Part 2: Enlargement vs Reduction */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          {question.partB.question}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {question.partB.options.map((opt, i) => (
            <button
              key={i}
              id={`multipart-opt-b-${i}`}
              type="button"
              disabled={isSubmitted}
              onClick={() => onUpdate({ partB: opt })}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                partB === opt
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Part 3: Algebraic Rule */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          {question.partC.question}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.partC.options.map((opt, i) => (
            <button
              key={i}
              id={`multipart-opt-c-${i}`}
              type="button"
              disabled={isSubmitted}
              onClick={() => onUpdate({ partC: opt })}
              className={`p-2.5 rounded-xl text-left text-xs font-mono font-bold border transition-all cursor-pointer ${
                partC === opt
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Part 4: Area Scaling */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          {question.partD.question}
        </label>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-800">New Area =</span>
          <input
            id="multipart-part-d"
            type="text"
            disabled={isSubmitted}
            value={partD}
            placeholder="Enter numerical area"
            onChange={(e) => onUpdate({ partD: e.target.value })}
            className="w-48 px-3 py-1.5 rounded-lg border-2 border-indigo-200 font-mono font-bold text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-xs font-bold text-slate-500">{question.partD.unit}</span>
        </div>
      </div>
    </div>
  );
};
