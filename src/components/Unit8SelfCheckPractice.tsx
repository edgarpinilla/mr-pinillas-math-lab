import React, { useState } from 'react';
import {
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Sparkles,
  HelpCircle,
  Table as TableIcon,
  Search,
} from 'lucide-react';
import {
  UNIT_8_SELF_CHECK_QUESTIONS,
  Unit8SelfCheckQuestion,
} from '../data/unit8SelfCheckQuestions';

export const Unit8SelfCheckPractice: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
  const [currentIndexInRound, setCurrentIndexInRound] = useState<number>(0); // 0..5

  // Student response state for active question
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  // Feedback state: 'idle' | 'hint' | 'correct'
  const [feedbackState, setFeedbackState] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [questionAttempts, setQuestionAttempts] = useState<number>(0);
  const [totalSessionAttempts, setTotalSessionAttempts] = useState<number>(0);

  // Completed question IDs across the 18-question cycle
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Round summary screen state
  const [showRoundCompleteSummary, setShowRoundCompleteSummary] = useState<boolean>(false);
  const [showFullCycleComplete, setShowFullCycleComplete] = useState<boolean>(false);

  const roundQuestions: Unit8SelfCheckQuestion[] = UNIT_8_SELF_CHECK_QUESTIONS.filter(
    (q) => q.round === currentRound
  );
  const currentQuestion: Unit8SelfCheckQuestion =
    roundQuestions[currentIndexInRound] || roundQuestions[0];

  const roundCompletedCount = roundQuestions.filter((q) => completedIds.includes(q.id)).length;
  const totalCompletedCount = completedIds.length;

  const resetQuestionInputs = () => {
    setSelectedOptionIdx(null);
    setFeedbackState('idle');
    setQuestionAttempts(0);
  };

  const handleCheckAnswer = () => {
    setQuestionAttempts((q) => q + 1);
    setTotalSessionAttempts((t) => t + 1);

    if (selectedOptionIdx === null) {
      setFeedbackState('hint');
      return;
    }

    const isCorrect = selectedOptionIdx === currentQuestion.correctIndex;
    if (isCorrect) {
      setFeedbackState('correct');
      if (!completedIds.includes(currentQuestion.id)) {
        setCompletedIds((prev) => [...prev, currentQuestion.id]);
      }
    } else {
      setFeedbackState('hint');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndexInRound < roundQuestions.length - 1) {
      setCurrentIndexInRound((idx) => idx + 1);
      resetQuestionInputs();
    } else {
      // Completed all 6 questions of current round
      if (currentRound < 3) {
        setShowRoundCompleteSummary(true);
      } else {
        setShowFullCycleComplete(true);
      }
    }
  };

  const handleStartNextRound = () => {
    const nextRound = (currentRound + 1) as 1 | 2 | 3;
    setCurrentRound(nextRound);
    setCurrentIndexInRound(0);
    setShowRoundCompleteSummary(false);
    resetQuestionInputs();
  };

  const handleResetFullCycle = () => {
    setCurrentRound(1);
    setCurrentIndexInRound(0);
    setCompletedIds([]);
    setShowRoundCompleteSummary(false);
    setShowFullCycleComplete(false);
    resetQuestionInputs();
  };

  const renderVltSvgGraph = (
    type: 'circle' | 'segment' | 'parabola' | 'ellipse',
    optId: string,
    ariaLabel?: string
  ) => {
    // Equal scale in x and y: x in [-6, 6], y in [-6, 6]
    // SVG 200x200 with padding 24 => plot size 152x152 => exactly 12.6667 px/unit
    const cx0 = 100;
    const cy0 = 100;
    const s = 152 / 12; // 12.6667 px/unit
    const toX = (x: number) => cx0 + x * s;
    const toY = (y: number) => cy0 - y * s;

    return (
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={ariaLabel}
        className="w-full max-w-[170px] h-auto bg-white border border-slate-200 rounded-xl shadow-inner mx-auto select-none p-1"
      >
        {ariaLabel && <title>{ariaLabel}</title>}
        <defs>
          <clipPath id={`vlt-clip-${optId}`}>
            <rect x="24" y="24" width="152" height="152" />
          </clipPath>
        </defs>

        {/* Gridlines */}
        {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((g) => (
          <g key={`grid-${g}`}>
            <line x1={toX(g)} y1={24} x2={toX(g)} y2={176} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={24} y1={toY(g)} x2={176} y2={toY(g)} stroke="#f1f5f9" strokeWidth="1" />
          </g>
        ))}

        {/* Coordinate Axes */}
        <line x1={20} y1={cy0} x2={180} y2={cy0} stroke="#475569" strokeWidth="1.5" />
        <line x1={cx0} y1={180} x2={cx0} y2={20} stroke="#475569" strokeWidth="1.5" />

        {/* Axis Arrowheads */}
        <polygon points="180,97 186,100 180,103" fill="#475569" />
        <polygon points="97,20 100,14 103,20" fill="#475569" />

        {/* Axis Labels */}
        <text x={186} y={103} fontSize="8" fontWeight="bold" fill="#334155" textAnchor="start">
          x
        </text>
        <text x={100} y={11} fontSize="8" fontWeight="bold" fill="#334155" textAnchor="middle">
          y
        </text>

        {/* Ticks and Labels */}
        {[-4, -2, 2, 4].map((t) => (
          <g key={`tick-${t}`}>
            <line x1={toX(t)} y1={cy0 - 2.5} x2={toX(t)} y2={cy0 + 2.5} stroke="#475569" strokeWidth="1" />
            <text x={toX(t)} y={cy0 + 10} fontSize="7" fontWeight="bold" fill="#64748b" textAnchor="middle">
              {t}
            </text>
            <line x1={cx0 - 2.5} y1={toY(t)} x2={cx0 + 2.5} y2={toY(t)} stroke="#475569" strokeWidth="1" />
            <text x={cx0 - 4} y={toY(t) + 2.5} fontSize="7" fontWeight="bold" fill="#64748b" textAnchor="end">
              {t}
            </text>
          </g>
        ))}

        {/* Origin Marker */}
        <circle cx={cx0} cy={cy0} r="1.5" fill="#64748b" />

        {/* Specific Relation Curves */}
        {type === 'circle' && (
          <circle cx={toX(0)} cy={toY(0)} r={4 * s} fill="none" stroke="#2563eb" strokeWidth="2.2" />
        )}

        {type === 'segment' && (
          <g>
            <line x1={toX(3)} y1={toY(-2)} x2={toX(3)} y2={toY(5)} stroke="#2563eb" strokeWidth="2.5" />
            <circle cx={toX(3)} cy={toY(-2)} r="3" fill="#2563eb" />
            <circle cx={toX(3)} cy={toY(5)} r="3" fill="#2563eb" />
          </g>
        )}

        {type === 'parabola' && (
          <g clipPath={`url(#vlt-clip-${optId})`}>
            <path
              d={Array.from({ length: 71 }, (_, i) => {
                const xVal = -3.5 + i * 0.1;
                const yVal = xVal * xVal - 3;
                return `${i === 0 ? 'M' : 'L'} ${toX(xVal).toFixed(2)} ${toY(yVal).toFixed(2)}`;
              }).join(' ')}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.2"
            />
          </g>
        )}

        {type === 'ellipse' && (
          <ellipse cx={toX(0)} cy={toY(0)} rx={4 * s} ry={3 * s} fill="none" stroke="#2563eb" strokeWidth="2.2" />
        )}
      </svg>
    );
  };

  const renderCarAGraph = () => {
    // Time t in [0, 4] hours, Distance d in [0, 260] miles
    const ox = 55;
    const oy = 195;
    const pw = 250;
    const ph = 165;
    const toX = (t: number) => ox + (t / 4) * pw;
    const toY = (d: number) => oy - (d / 260) * ph;

    return (
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 340 240"
          role="img"
          aria-label="Coordinate graph for Car A showing distance in miles versus time in hours with a ray passing through points (0, 0) and (2, 130)"
          className="w-full max-w-[320px] h-auto bg-white border border-slate-300 rounded-2xl shadow-inner select-none p-1"
        >
          {/* Gridlines for Time 0 to 4 hours */}
          {[0, 1, 2, 3, 4].map((t) => (
            <g key={`car-gx-${t}`}>
              <line x1={toX(t)} y1={30} x2={toX(t)} y2={oy} stroke="#f1f5f9" strokeWidth="1.2" />
              <text x={toX(t)} y={oy + 14} fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">
                {t}
              </text>
            </g>
          ))}

          {/* Gridlines for Distance 0 to 260 miles */}
          {[0, 65, 130, 195, 260].map((d) => (
            <g key={`car-gy-${d}`}>
              <line x1={ox} y1={toY(d)} x2={ox + pw} y2={toY(d)} stroke="#f1f5f9" strokeWidth="1.2" />
              <text x={ox - 6} y={toY(d) + 3.5} fontSize="9" fontWeight="bold" fill="#475569" textAnchor="end">
                {d}
              </text>
            </g>
          ))}

          {/* Main Coordinate Axes */}
          <line x1={ox} y1={oy} x2={ox + pw + 15} y2={oy} stroke="#334155" strokeWidth="2" />
          <line x1={ox} y1={oy} x2={ox} y2={18} stroke="#334155" strokeWidth="2" />

          {/* Axis Arrowheads */}
          <polygon
            points={`${ox + pw + 15},${oy - 3} ${ox + pw + 21},${oy} ${ox + pw + 15},${oy + 3}`}
            fill="#334155"
          />
          <polygon points={`${ox - 3},18 ${ox},12 ${ox + 3},18`} fill="#334155" />

          {/* Axis Titles */}
          <text x={ox + pw / 2} y={oy + 32} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="middle">
            Time (hours)
          </text>
          <text x={12} y={20} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="start">
            Distance (miles)
          </text>

          {/* Car A Ray: passing through (0, 0) and (2, 130) up to (4, 260) */}
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(4)}
            y2={toY(260)}
            stroke="#4338ca"
            strokeWidth="3"
          />

          {/* Plotted Points (0, 0) and (2, 130) */}
          <circle cx={toX(0)} cy={toY(0)} r="4.5" fill="#4338ca" stroke="#fff" strokeWidth="2" />
          <circle cx={toX(2)} cy={toY(130)} r="4.5" fill="#4338ca" stroke="#fff" strokeWidth="2" />

          {/* Point Labels */}
          <text
            x={toX(0) + 8}
            y={toY(0) - 6}
            fontSize="10"
            fontWeight="bold"
            fill="#1e1b4b"
            style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
          >
            (0, 0)
          </text>
          <text
            x={toX(2) + 8}
            y={toY(130) - 6}
            fontSize="10"
            fontWeight="bold"
            fill="#1e1b4b"
            style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
          >
            (2, 130)
          </text>
        </svg>
        <span className="text-[11px] text-slate-500 font-semibold mt-1.5 text-center">
          Line passing through (0, 0) and (2, 130)
        </span>
      </div>
    );
  };

  return (
    <div
      id="unit8-self-check-container"
      className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-fadeIn"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Unit 8 Self-Check · Functions</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-black">
                {totalCompletedCount} / 18 Completed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Functions Self-Check Practice
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              3 Progressive Rounds of 6 Questions · Identifying (8.5G), Describing (8.5G/H) & Comparing Functions (8.4C)
            </p>
          </div>

          {/* Round Status Pills */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((r) => {
              const rNum = r as 1 | 2 | 3;
              const isCurrent = currentRound === rNum;
              const rQuestions = UNIT_8_SELF_CHECK_QUESTIONS.filter((q) => q.round === rNum);
              const rDone = rQuestions.filter((q) => completedIds.includes(q.id)).length;
              const isDone = rDone === 6;

              return (
                <div
                  key={r}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isCurrent
                      ? 'bg-white text-emerald-950 border-white shadow-md'
                      : isDone
                      ? 'bg-emerald-600/40 text-emerald-200 border-emerald-400/30'
                      : 'bg-white/10 text-emerald-200 border-white/10'
                  }`}
                >
                  <div className="text-[10px] uppercase font-black opacity-80">Round {r}</div>
                  <div className="font-black text-sm">
                    {rDone} / 6 {isDone && '✔'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL CYCLE COMPLETION SCREEN (All 18 Questions Mastered) */}
      {showFullCycleComplete ? (
        <div className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Unit 8 Mastery Achieved
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Outstanding Work! 18 of 18 Complete!
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              You have successfully completed all three rounds of the Functions Self-Check Practice,
              mastering relation testing, linear vs. nonlinear classification, and multi-representation
              comparisons.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold max-w-lg mx-auto">
            Ready to review again? You can reset the 18-question cycle to reinforce your understanding.
          </div>

          <button
            onClick={handleResetFullCycle}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Unit 8 Self-Check Again</span>
          </button>
        </div>
      ) : showRoundCompleteSummary ? (
        /* ROUND COMPLETION SUMMARY SCREEN */
        <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Round {currentRound} Complete!
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              6 Questions Mastered in Round {currentRound}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Great progress! You are ready to advance to Round {currentRound + 1} with next-level
              representations and reasoning.
            </p>
          </div>

          <button
            onClick={handleStartNextRound}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
          >
            <span>Proceed to Round {currentRound + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* ACTIVE QUESTION WORKSPACE */
        <div className="p-6 sm:p-8 space-y-6">
          {/* Question Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">
                Question {currentIndexInRound + 1} of 6 (Overall #{currentQuestion.overallNumber})
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentQuestion.section}
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {currentQuestion.teks}
            </span>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.prompt}
            </h4>

            {/* Embedded Table if question has tableData */}
            {currentQuestion.tableData && (
              <div className="inline-block bg-slate-50 rounded-xl border border-slate-200 p-3 my-2 shadow-2xs">
                <table className="text-center text-xs sm:text-sm font-sans min-w-[200px]">
                  <thead>
                    <tr className="bg-emerald-100/70 text-emerald-950 font-black border-b border-emerald-200">
                      <th className="py-1.5 px-4">{currentQuestion.tableData.headers[0]}</th>
                      <th className="py-1.5 px-4">{currentQuestion.tableData.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {currentQuestion.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/80">
                        <td className="py-1.5 px-4 font-bold text-slate-900">{row[0]}</td>
                        <td className="py-1.5 px-4 text-indigo-700 font-semibold">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Embedded Mapping Diagram if question has mappingData */}
            {currentQuestion.mappingData && (
              <div className="inline-block bg-slate-50 rounded-xl border border-slate-200 p-3 my-2 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 mb-1 text-center">
                  Mapping Diagram:
                </div>
                <svg viewBox="0 0 280 140" className="w-64 h-auto select-none">
                  {/* Domain Oval */}
                  <ellipse cx="50" cy="70" rx="36" ry="58" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
                  <text x="50" y="24" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
                    Domain
                  </text>
                  {/* Range Oval */}
                  <ellipse cx="230" cy="70" rx="36" ry="58" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="230" y="24" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
                    Range
                  </text>

                  {/* Inputs */}
                  {currentQuestion.mappingData.inputs.map((inp, idx) => {
                    const yPos = 45 + idx * 30;
                    return (
                      <g key={`in-${idx}`}>
                        <circle cx="50" cy={yPos} r="3.5" fill="#047857" />
                        <text x="36" y={yPos + 4} textAnchor="end" fontSize="10" fontWeight="bold" fill="#0f172a">
                          {inp}
                        </text>
                      </g>
                    );
                  })}

                  {/* Outputs */}
                  {currentQuestion.mappingData.outputs.map((out, idx) => {
                    const yPos = 45 + idx * 30;
                    return (
                      <g key={`out-${idx}`}>
                        <circle cx="230" cy={yPos} r="3.5" fill="#1d4ed8" />
                        <text x="244" y={yPos + 4} textAnchor="start" fontSize="10" fontWeight="bold" fill="#0f172a">
                          {out}
                        </text>
                      </g>
                    );
                  })}

                  {/* Arrows */}
                  {currentQuestion.mappingData.arrows.map((arr, idx) => {
                    const inIdx = currentQuestion.mappingData!.inputs.indexOf(arr[0]);
                    const outIdx = currentQuestion.mappingData!.outputs.indexOf(arr[1]);
                    const y1 = 45 + inIdx * 30;
                    const y2 = 45 + outIdx * 30;
                    return (
                      <line
                        key={`arr-${idx}`}
                        x1="55"
                        y1={y1}
                        x2="223"
                        y2={y2}
                        stroke="#475569"
                        strokeWidth="1.5"
                        markerEnd="url(#sc-arr)"
                      />
                    );
                  })}

                  <defs>
                    <marker id="sc-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#475569" />
                    </marker>
                  </defs>
                </svg>
              </div>
            )}
            {/* Embedded Car A Graph if question has carAGraphData (Overall Question 11) */}
            {currentQuestion.carAGraphData && (
              <div className="my-3 flex justify-center">
                {renderCarAGraph()}
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          {currentQuestion.vltGraphOptions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.vltGraphOptions.map((vltOpt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedOptionIdx === idx;
                const isCorrectState = feedbackState === 'correct';
                const isWrongChoice = isSelected && feedbackState === 'hint';

                return (
                  <button
                    key={vltOpt.id}
                    disabled={isCorrectState}
                    onClick={() => {
                      setSelectedOptionIdx(idx);
                      if (feedbackState === 'hint') setFeedbackState('idle');
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${
                      isSelected
                        ? isCorrectState
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                          : isWrongChoice
                          ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-200'
                          : 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? isCorrectState
                              ? 'bg-emerald-600 text-white'
                              : isWrongChoice
                              ? 'bg-amber-500 text-white'
                              : 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {vltOpt.label}
                      </span>
                    </div>

                    <div className="w-full flex justify-center py-1">
                      {renderVltSvgGraph(vltOpt.type, vltOpt.id, vltOpt.ariaLabel)}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : currentQuestion.tableOptions ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.tableOptions.map((tblOpt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedOptionIdx === idx;
                const isCorrectState = feedbackState === 'correct';
                const isWrongChoice = isSelected && feedbackState === 'hint';

                return (
                  <button
                    key={tblOpt.id}
                    disabled={isCorrectState}
                    onClick={() => {
                      setSelectedOptionIdx(idx);
                      if (feedbackState === 'hint') setFeedbackState('idle');
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${
                      isSelected
                        ? isCorrectState
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                          : isWrongChoice
                          ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-200'
                          : 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? isCorrectState
                              ? 'bg-emerald-600 text-white'
                              : isWrongChoice
                              ? 'bg-amber-500 text-white'
                              : 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {tblOpt.label}
                      </span>
                    </div>

                    <div className="w-full flex justify-center py-1">
                      <table className="text-center text-xs font-sans border border-slate-200 rounded-lg overflow-hidden min-w-[140px] shadow-2xs">
                        <thead>
                          <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                            <th className="py-1 px-3 border-r border-slate-200">{tblOpt.headers[0]}</th>
                            <th className="py-1 px-3">{tblOpt.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {tblOpt.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              <td className="py-1 px-3 font-semibold text-slate-800 border-r border-slate-100">{row[0]}</td>
                              <td className="py-1 px-3 font-medium text-indigo-700">{row[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedOptionIdx === idx;
                const isCorrectState = feedbackState === 'correct';
                const isWrongChoice = isSelected && feedbackState === 'hint';

                return (
                  <button
                    key={idx}
                    disabled={isCorrectState}
                    onClick={() => {
                      setSelectedOptionIdx(idx);
                      if (feedbackState === 'hint') setFeedbackState('idle');
                    }}
                    className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? isCorrectState
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                          : isWrongChoice
                          ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-200'
                          : 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected
                          ? isCorrectState
                            ? 'bg-emerald-600 text-white'
                            : isWrongChoice
                            ? 'bg-amber-500 text-white'
                            : 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed pt-0.5">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback and Hints Banner */}
          {feedbackState === 'hint' && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Not quite — review the hint and try again:</span>
              </div>
              <p className="leading-relaxed font-medium pl-6">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Full Explanation Banner on Correct Answer */}
          {feedbackState === 'correct' && (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Correct! Mathematical Explanation:</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-line pl-7">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex items-center justify-between">
            {feedbackState !== 'correct' ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOptionIdx === null}
                className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedOptionIdx !== null
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>
                  {currentIndexInRound < 5
                    ? 'Next Question'
                    : currentRound < 3
                    ? 'Complete Round'
                    : 'Finish Self-Check'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="text-xs font-semibold text-slate-500 flex items-center gap-2.5">
              <span>Question Attempts: <strong className="text-slate-800 font-bold">{questionAttempts}</strong></span>
              <span className="text-slate-300">·</span>
              <span>Session Attempts: <strong className="text-slate-800 font-bold">{totalSessionAttempts}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
