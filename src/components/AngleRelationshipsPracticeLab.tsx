import React, { useState } from 'react';
import {
  Activity,
  Triangle,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Layers,
  Shuffle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import {
  LabStationId,
  LabChallenge,
  AngleRelationshipChoice,
  MathRuleChoice,
  generateStation1Challenge,
  generateStation2Challenge,
  generateStation3Challenge,
  generateRandomMixedChallenge,
} from '../data/unit7LabChallenges';
import { Unit7ChallengeDiagram } from './visualizers/Unit7LabChallengeDiagram';
import {
  Station1InteractiveExplorer,
  Station2InteractiveExplorer,
} from './visualizers/Unit7InteractiveExplorers';

export const AngleRelationshipsPracticeLab: React.FC = () => {
  const [activeStation, setActiveStation] = useState<LabStationId | 'mixed'>('station-1');
  const [station3SubType, setStation3SubType] = useState<'type-a' | 'type-b' | 'type-c' | 'type-d'>(
    'type-a'
  );
  const [challenge, setChallenge] = useState<LabChallenge>(() => generateStation1Challenge());

  // Student reasoning responses
  const [selectedRelationship, setSelectedRelationship] = useState<AngleRelationshipChoice | ''>('');
  const [selectedRule, setSelectedRule] = useState<MathRuleChoice | ''>('');
  const [selectedEquationIdx, setSelectedEquationIdx] = useState<number | null>(null);
  const [xInput, setXInput] = useState<string>('');
  const [angleInput, setAngleInput] = useState<string>('');
  const [secondaryAngleInput, setSecondaryAngleInput] = useState<string>('');

  // Feedback / Retry state
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [feedbackHint, setFeedbackHint] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const parseNumericInput = (raw: string): number => {
    const cleaned = raw
      .replace(/°/g, '')
      .replace(/^[a-zA-Z∠\s=]+/, '')
      .trim();
    if (cleaned === '') return NaN;
    return Number(cleaned);
  };

  const resetInputsForChallenge = (nextChallenge: LabChallenge) => {
    setChallenge(nextChallenge);
    setSelectedRelationship('');
    setSelectedRule('');
    setSelectedEquationIdx(null);
    setXInput('');
    setAngleInput('');
    setSecondaryAngleInput('');
    setFeedbackStatus('idle');
    setFeedbackHint('');
  };

  const handleSelectStation = (station: LabStationId) => {
    setActiveStation(station);
    if (station === 'station-1') {
      resetInputsForChallenge(generateStation1Challenge(challenge.id));
    } else if (station === 'station-2') {
      resetInputsForChallenge(generateStation2Challenge(challenge.id));
    } else {
      resetInputsForChallenge(generateStation3Challenge(station3SubType, challenge.id));
    }
  };

  const handleSelectStation3Type = (subType: 'type-a' | 'type-b' | 'type-c' | 'type-d') => {
    setActiveStation('station-3');
    setStation3SubType(subType);
    resetInputsForChallenge(generateStation3Challenge(subType, challenge.id));
  };

  const handleNewRandomChallenge = () => {
    setActiveStation('mixed');
    resetInputsForChallenge(generateRandomMixedChallenge(challenge.id));
  };

  const handleNextStationChallenge = () => {
    if (activeStation === 'station-1') {
      resetInputsForChallenge(generateStation1Challenge(challenge.id));
    } else if (activeStation === 'station-2') {
      resetInputsForChallenge(generateStation2Challenge(challenge.id));
    } else if (activeStation === 'station-3') {
      const order: ('type-a' | 'type-b' | 'type-c' | 'type-d')[] = [
        'type-a',
        'type-b',
        'type-c',
        'type-d',
      ];
      const nextType = order[(order.indexOf(station3SubType) + 1) % order.length];
      setStation3SubType(nextType);
      resetInputsForChallenge(generateStation3Challenge(nextType, challenge.id));
    } else {
      resetInputsForChallenge(generateRandomMixedChallenge(challenge.id));
    }
  };

  // Validate step-by-step without revealing the answer on error
  const handleVerifyResponse = () => {
    setAttemptCount((n) => n + 1);

    // Step 1 check: Angle Relationship
    if (!selectedRelationship) {
      setFeedbackStatus('hint');
      setFeedbackHint('Step 1: First select the geometric angle relationship shown in the diagram.');
      return;
    }
    if (selectedRelationship !== challenge.correctRelationship) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        `Check Step 1 (Angle Relationship): ${challenge.relationshipHint} Look closely at the diagram and try again.`
      );
      return;
    }

    // Step 2 check: Mathematical Rule (Congruent vs Supplementary vs Triangle Sum vs Exterior Angle)
    if (!selectedRule) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        'Step 2: Decide whether these angles are congruent, supplementary, sum to 180° in a triangle, or follow the Exterior Angle Theorem.'
      );
      return;
    }
    const isStep2RuleValid =
      selectedRule === challenge.correctRule ||
      (challenge.correctRule === 'Triangle Sum (3 Interior Angles ADD to 180°)' &&
        selectedRule === 'Supplementary (Measures ADD to 180°)');

    if (!isStep2RuleValid) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        `Check Step 2 (Mathematical Rule): Do these angles have equal measures, or should their measures add to 180° (or equal the exterior angle)? ${challenge.ruleHint}`
      );
      return;
    }

    // Step 3 check: Correct Equation
    if (selectedEquationIdx === null) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        'Step 3: Choose the algebraic or numerical equation that represents the relationship you identified.'
      );
      return;
    }
    if (selectedEquationIdx !== challenge.correctEquationIndex) {
      setFeedbackStatus('hint');
      setFeedbackHint(`Check Step 3 (Equation Setup): ${challenge.equationHint}`);
      return;
    }

    // Step 4 check: Solve for x (if variable present)
    if (challenge.hasVariableX && typeof challenge.correctX === 'number') {
      const parsedX = parseNumericInput(xInput);
      if (Number.isNaN(parsedX)) {
        setFeedbackStatus('hint');
        setFeedbackHint('Step 4: Solve your chosen equation for x and enter a numerical value.');
        return;
      }
      if (parsedX !== challenge.correctX) {
        setFeedbackStatus('hint');
        setFeedbackHint(
          `Check Step 4 (Solving for x): Your equation setup is right! Re-check your algebra when solving for x. ${
            challenge.xHint || ''
          }`
        );
        return;
      }
    }

    // Step 5 check: Find Actual Requested Angle Measure
    const parsedAngle = parseNumericInput(angleInput);
    if (Number.isNaN(parsedAngle)) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        `Step 4/5: Enter the actual degree measure for ${challenge.targetAngleLabel}.`
      );
      return;
    }
    if (parsedAngle !== challenge.correctAngleMeasure) {
      setFeedbackStatus('hint');
      setFeedbackHint(
        `Check Target Angle Measure (${challenge.targetAngleLabel}): ${challenge.angleHint}`
      );
      return;
    }

    // Optional Secondary Angle check (for Type C Two Variable Expressions)
    if (
      challenge.secondaryAngleLabel &&
      typeof challenge.correctSecondaryAngleMeasure === 'number'
    ) {
      const parsedSec = parseNumericInput(secondaryAngleInput);
      if (Number.isNaN(parsedSec)) {
        setFeedbackStatus('hint');
        setFeedbackHint(
          `Also enter the degree measure for ${challenge.secondaryAngleLabel} so you can verify all three angles sum to 180°.`
        );
        return;
      }
      if (parsedSec !== challenge.correctSecondaryAngleMeasure) {
        setFeedbackStatus('hint');
        setFeedbackHint(
          `Check ${challenge.secondaryAngleLabel}: Substitute x = ${challenge.correctX} into the expression for ${challenge.secondaryAngleLabel}.`
        );
        return;
      }
    }

    // All steps verified!
    if (feedbackStatus !== 'correct') {
      setCompletedCount((c) => c + 1);
    }
    setFeedbackStatus('correct');
    setFeedbackHint('');
  };

  // Unlock equation choices only after student selects a Relationship & Rule (so equation isn't given away before reasoning)
  const hasReasonedGeometry = Boolean(selectedRelationship && selectedRule);

  return (
    <div
      id="angle-relationships-practice-lab"
      className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-indigo-100 text-xs font-black uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                <span>Module 7 Interactive Angle Relationships Lab · TEKS 8.8D</span>
              </div>
              {completedCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 text-xs font-black">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {completedCount} Solved
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Angle Relationships Interactive Lab
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
              Look at the geometric diagram, identify the angle relationship, decide whether angles
              are congruent, supplementary, or follow a triangle theorem, build the equation, solve
              for <em>x</em>, and verify the angle measure!
            </p>
          </div>

          {/* 3 Learning Stations + Prominent New Challenge Mode */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/30 p-1.5 rounded-2xl border border-white/15">
              <button
                onClick={() => handleSelectStation('station-1')}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStation === 'station-1'
                    ? 'bg-white text-indigo-900 shadow-sm'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>7.1 Parallel Lines & Transversal Explorer</span>
              </button>
              <button
                onClick={() => handleSelectStation('station-2')}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStation === 'station-2'
                    ? 'bg-white text-indigo-900 shadow-sm'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Triangle className="w-3.5 h-3.5" />
                <span>7.2 Triangle Angle Theorems Lab</span>
              </button>
              <button
                onClick={() => handleSelectStation('station-3')}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStation === 'station-3'
                    ? 'bg-white text-indigo-900 shadow-sm'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>7.3 Triangle Angle Equations Lab</span>
              </button>
            </div>

            <button
              id="unit7-lab-new-challenge-btn"
              onClick={handleNewRandomChallenge}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black tracking-wide transition-all shadow-lg shadow-emerald-950/25 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Shuffle className="w-4 h-4" />
              <span>New Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Lab Body */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Interactive Visual Explorer for Station 1 or Station 2 */}
        {activeStation === 'station-1' && <Station1InteractiveExplorer />}
        {activeStation === 'station-2' && <Station2InteractiveExplorer />}

        {/* Station 3 Problem Structure Selector (Type A, B, C, D) */}
        {activeStation === 'station-3' && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-indigo-700">
                Station 3 · Triangle Equation Structures
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Practice building equations across all four triangle problem structures or press{' '}
                <strong>New Challenge</strong> to mix all concepts randomly.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'type-a', label: 'Type A: Numbers Only' },
                  { id: 'type-b', label: 'Type B: Number + Variable' },
                  { id: 'type-c', label: 'Type C: Two Variables' },
                  { id: 'type-d', label: 'Type D: Intermediate x' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectStation3Type(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    station3SubType === t.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reasoning Sequence Progress Bar */}
        <div className="bg-indigo-950 text-white rounded-2xl p-3.5 sm:px-5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
          <span className="text-indigo-200 uppercase tracking-wider font-black">
            Reasoning Flow:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">1. Diagram</span>
            <span>→</span>
            <span
              className={`px-2.5 py-1 rounded-lg ${
                selectedRelationship ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-white/10'
              }`}
            >
              2. Angle Relationship
            </span>
            <span>→</span>
            <span
              className={`px-2.5 py-1 rounded-lg ${
                selectedRule ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-white/10'
              }`}
            >
              3. Congruent / Supp / Sum
            </span>
            <span>→</span>
            <span
              className={`px-2.5 py-1 rounded-lg ${
                selectedEquationIdx !== null
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-white/10'
              }`}
            >
              4. Build Equation
            </span>
            <span>→</span>
            <span
              className={`px-2.5 py-1 rounded-lg ${
                feedbackStatus === 'correct'
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-white/10'
              }`}
            >
              5. Solve & Verify
            </span>
          </div>
        </div>

        {/* Main 2-Column Challenge Workspace: Left = Diagram, Right = Guided Reasoning Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Geometric Diagram & Problem Prompt */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                  {challenge.stationBadge}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {challenge.problemTypeBadge}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {challenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {challenge.prompt}
                </p>
              </div>

              {/* Dynamic SVG Diagram */}
              <Unit7ChallengeDiagram diagram={challenge.diagram} />

              {/* Quick Reference Reminder Card */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Geometry-to-Algebra Strategy</span>
                </div>
                <p>
                  • <strong>Congruent angles</strong> → Set expressions <strong>EQUAL</strong>{' '}
                  (Expression 1 = Expression 2)
                </p>
                <p>
                  • <strong>Supplementary angles</strong> → <strong>ADD</strong> expressions to{' '}
                  <strong>180°</strong>
                </p>
                <p>
                  • <strong>Triangle Interior Sum</strong> → <strong>ADD all 3</strong> interior
                  angles to <strong>180°</strong>
                </p>
                <p>
                  • <strong>Exterior Angle Theorem</strong> → Exterior Angle ={' '}
                  <strong>Remote Interior 1 + Remote Interior 2</strong>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Step-by-Step Reasoning & Equation Builder */}
          <div className="lg:col-span-6 space-y-4">
            {/* STEP 1: Identify Angle Relationship */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                  {challenge.diagram.kind === 'triangle'
                    ? challenge.diagram.showExterior
                      ? 'Step 1 · What relationship connects the highlighted exterior angle and the two highlighted remote interior angles?'
                      : 'Step 1 · What relationship connects the three highlighted interior angles of the triangle?'
                    : 'Step 1 · What is the relationship between the two highlighted angles?'}
                </span>
                {selectedRelationship === challenge.correctRelationship &&
                  feedbackStatus === 'correct' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {challenge.relationshipOptions.map((rel) => (
                  <button
                    key={rel}
                    onClick={() => {
                      setSelectedRelationship(rel);
                      if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedRelationship === rel
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Decide Mathematical Rule */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-2xs">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block">
                Step 2 · Which mathematical rule applies to these angles?
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {challenge.ruleOptions.map((rule) => (
                  <button
                    key={rule}
                    onClick={() => {
                      setSelectedRule(rule);
                      if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedRule === rule
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {rule}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: Build/Select the Correct Equation (Unlocked after Steps 1 & 2) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-2xs">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block">
                Step 3 · Which equation correctly represents this relationship?
              </span>

              {!hasReasonedGeometry ? (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-semibold">
                  Complete <strong>Step 1</strong> and <strong>Step 2</strong> above first to reason
                  about the geometry before selecting your equation!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {challenge.equationOptions.map((eqText, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedEquationIdx(idx);
                        if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                      }}
                      className={`p-3 rounded-xl border font-mono text-xs font-bold text-left transition-all cursor-pointer ${
                        selectedEquationIdx === idx
                          ? 'bg-slate-900 text-emerald-400 border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {eqText}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* STEP 4 & STEP 5: Solve for x and Find the Requested Angle Measure */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-2xs">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block">
                {challenge.hasVariableX
                  ? `Step 4 & Step 5 · Solve for x and Find ${challenge.targetAngleLabel}`
                  : `Step 4 · Find the Requested Angle Measure (${challenge.targetAngleLabel})`}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.hasVariableX && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Value of <span className="font-mono text-indigo-700">x</span>:
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-slate-600">x =</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={xInput}
                        onChange={(e) => {
                          setXInput(e.target.value);
                          if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleVerifyResponse();
                        }}
                        placeholder="Enter x"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Requested Angle{' '}
                    <span className="font-mono text-indigo-700">{challenge.targetAngleLabel}</span>:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={angleInput}
                      onChange={(e) => {
                        setAngleInput(e.target.value);
                        if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleVerifyResponse();
                      }}
                      placeholder="Degrees"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="font-mono text-sm font-black text-slate-700">°</span>
                  </div>
                </div>

                {challenge.secondaryAngleLabel && (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Second Variable Angle{' '}
                      <span className="font-mono text-indigo-700">
                        {challenge.secondaryAngleLabel}
                      </span>{' '}
                      (to verify all 3 angles sum to 180°):
                    </label>
                    <div className="flex items-center gap-1.5 max-w-xs">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={secondaryAngleInput}
                        onChange={(e) => {
                          setSecondaryAngleInput(e.target.value);
                          if (feedbackStatus === 'hint') setFeedbackStatus('idle');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleVerifyResponse();
                        }}
                        placeholder="Degrees"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="font-mono text-sm font-black text-slate-700">°</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  id="unit7-lab-check-btn"
                  onClick={handleVerifyResponse}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Check & Verify Response</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStationChallenge}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Another in This Station</span>
                </button>
              </div>
            </div>

            {/* FEEDBACK / RETRY BANNER (Does NOT reveal answer on error) */}
            {feedbackStatus === 'hint' && (
              <div
                key={`hint-${attemptCount}`}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 animate-fadeIn"
              >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Conceptual Hint — Modify Your Response & Try Again</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">{feedbackHint}</p>
              </div>
            )}

            {/* CORRECT RESPONSE BANNER */}
            {feedbackStatus === 'correct' && (
              <div
                key={`correct-${attemptCount}`}
                className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-3 animate-fadeIn"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Correct Response</span>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                    Verified ✔
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {challenge.justification}
                </p>

                <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs font-bold">
                  {challenge.verificationSummary}
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleNewRandomChallenge}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>New Challenge (Mixed)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
