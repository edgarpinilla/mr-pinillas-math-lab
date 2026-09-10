import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Layers,
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  ShieldCheck,
  Check,
  Eye,
  Maximize2,
  Minimize2,
  Compass,
} from 'lucide-react';
import {
  STAAR_DILATIONS_QUESTIONS,
  StaarDilationsQuestion,
  QuestionDilationGraph,
} from '../data/staar/staarQuestionsDilations';

interface StaarDilationsQuizProps {
  topicTitle: string;
  onSwitchToSelfCheck?: () => void;
}

export type StaarDilationsMode = 'mixed' | 'scale-factor' | 'algebraic-similarity';

const STORAGE_SERVED_KEY_PREFIX = 'pinilla_math_staar_dilations_served_v1_';
const STORAGE_SELECTED_MODE_KEY = 'pinilla_math_staar_dilations_selected_mode_v1';
const STORAGE_CYCLE_BLOCK_INDEX_KEY = 'pinilla_math_staar_dilations_block_idx_v1_';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates 6 unique STAAR-style questions from the 36-question bank in sequential non-repeating blocks.
 * Partitioning the 36 questions into 6 sequential non-repeating blocks of 6:
 * Block 1: Questions 1 - 6 (Identify Scale Factor)
 * Block 2: Questions 7 - 12 (Algebraic Representations)
 * Block 3: Questions 13 - 18 (Coordinate Graphs & Ray Projections)
 * Block 4: Questions 19 - 24 (Properties & Angle Preservation)
 * Block 5: Questions 25 - 30 (Perimeter & Area Scaling k vs k²)
 * Block 6: Questions 31 - 36 (Real-World Word Problems & Applications)
 *
 * In 'mixed' mode, it cycles through Blocks 1 to 6 sequentially, guaranteeing zero duplicate questions
 * across consecutive attempts until the entire 36-question bank has been served.
 */
function generateStaarQuestions(
  mode: StaarDilationsMode,
  previousIds: string[] = []
): { questions: StaarDilationsQuestion[]; blockNumber: number } {
  // Determine block index for this mode from localStorage
  let currentBlockIndex = 0;
  try {
    const rawIndex = localStorage.getItem(`${STORAGE_CYCLE_BLOCK_INDEX_KEY}${mode}`);
    if (rawIndex !== null) {
      currentBlockIndex = parseInt(rawIndex, 10);
      if (isNaN(currentBlockIndex) || currentBlockIndex < 0 || currentBlockIndex >= 6) {
        currentBlockIndex = 0;
      }
    }
  } catch {
    currentBlockIndex = 0;
  }

  let selected: StaarDilationsQuestion[] = [];
  let blockNumber = currentBlockIndex + 1;

  if (mode === 'scale-factor') {
    // Sub-mode: Scale Factor Focus (Blocks 1 and 3: 12 total questions, 2 blocks of 6)
    const sfQuestions = [
      ...STAAR_DILATIONS_QUESTIONS.slice(0, 6),
      ...STAAR_DILATIONS_QUESTIONS.slice(12, 18),
    ];
    const sfBlock = currentBlockIndex % 2;
    selected = sfQuestions.slice(sfBlock * 6, (sfBlock + 1) * 6);
    blockNumber = sfBlock + 1;
    // Next attempt advances block
    try {
      localStorage.setItem(`${STORAGE_CYCLE_BLOCK_INDEX_KEY}${mode}`, String((sfBlock + 1) % 2));
    } catch {}
  } else if (mode === 'algebraic-similarity') {
    // Sub-mode: Rules, Properties & Area Focus (Blocks 2, 4, 5: 18 total questions, 3 blocks of 6)
    const algQuestions = [
      ...STAAR_DILATIONS_QUESTIONS.slice(6, 12),
      ...STAAR_DILATIONS_QUESTIONS.slice(18, 24),
      ...STAAR_DILATIONS_QUESTIONS.slice(24, 30),
    ];
    const algBlock = currentBlockIndex % 3;
    selected = algQuestions.slice(algBlock * 6, (algBlock + 1) * 6);
    blockNumber = algBlock + 1;
    // Next attempt advances block
    try {
      localStorage.setItem(`${STORAGE_CYCLE_BLOCK_INDEX_KEY}${mode}`, String((algBlock + 1) % 3));
    } catch {}
  } else {
    // Master Mixed Mode: Sequential cycle across 6 non-repeating blocks of 6
    const startIndex = currentBlockIndex * 6;
    selected = STAAR_DILATIONS_QUESTIONS.slice(startIndex, startIndex + 6);
    blockNumber = currentBlockIndex + 1;

    // Advance to next sequential block for next attempt (wraps around after block 6)
    const nextBlockIndex = (currentBlockIndex + 1) % 6;
    try {
      localStorage.setItem(`${STORAGE_CYCLE_BLOCK_INDEX_KEY}${mode}`, String(nextBlockIndex));
    } catch {}
  }

  // Shuffle answer choices for each question while accurately keeping track of the correct answer
  const questionsWithShuffledOptions = selected.map((q) => {
    const correctText = q.options[q.correctIndex];
    const shuffledOpts = shuffleArray(q.options);
    return {
      ...q,
      options: shuffledOpts,
      correctIndex: shuffledOpts.indexOf(correctText),
    };
  });

  return { questions: questionsWithShuffledOptions, blockNumber };
}

/**
 * Dedicated Coordinate Dilation SVG Renderer
 */
const DilationsGraphRenderer: React.FC<{ graph: QuestionDilationGraph }> = ({ graph }) => {
  const width = 360;
  const height = 300;
  const paddingLeft = 40;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 40;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const xMin = graph.xMin;
  const xMax = graph.xMax;
  const yMin = graph.yMin;
  const yMax = graph.yMax;
  const xStep = graph.xStep ?? 1;
  const yStep = graph.yStep ?? 1;

  const toSvgX = (x: number) => paddingLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (y: number) => height - paddingBottom - ((y - yMin) / (yMax - yMin)) * plotHeight;

  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);

  const yTicks: number[] = [];
  for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

  const preImagePath =
    graph.preImagePoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`)
      .join(' ') + ' Z';

  const imagePath =
    graph.imagePoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`)
      .join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-md max-w-md mx-auto w-full my-3">
      {graph.title && (
        <div className="text-xs font-black uppercase tracking-wider text-slate-300 pb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-violet-400" />
          <span>{graph.title}</span>
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-hidden">
        {/* Grid lines */}
        {xTicks.map((x) => (
          <line
            key={`grid-x-${x}`}
            x1={toSvgX(x)}
            y1={toSvgY(yMin)}
            x2={toSvgX(x)}
            y2={toSvgY(yMax)}
            stroke={x === 0 ? '#64748b' : '#1e293b'}
            strokeWidth={x === 0 ? 1.8 : 0.8}
          />
        ))}
        {yTicks.map((y) => (
          <line
            key={`grid-y-${y}`}
            x1={toSvgX(xMin)}
            y1={toSvgY(y)}
            x2={toSvgX(xMax)}
            y2={toSvgY(y)}
            stroke={y === 0 ? '#64748b' : '#1e293b'}
            strokeWidth={y === 0 ? 1.8 : 0.8}
          />
        ))}

        {/* Axis tick labels */}
        {xTicks
          .filter((x) => x >= 0 && x <= xMax && x % 2 === 0)
          .map((x) => (
            <text
              key={`label-x-${x}`}
              x={toSvgX(x)}
              y={toSvgY(0) + 13}
              fill="#94a3b8"
              fontSize="9"
              textAnchor="middle"
              fontWeight="bold"
            >
              {x}
            </text>
          ))}
        {yTicks
          .filter((y) => y > 0 && y <= yMax && y % 2 === 0)
          .map((y) => (
            <text
              key={`label-y-${y}`}
              x={toSvgX(0) - 8}
              y={toSvgY(y) + 3}
              fill="#94a3b8"
              fontSize="9"
              textAnchor="end"
              fontWeight="bold"
            >
              {y}
            </text>
          ))}

        {/* Origin indicator */}
        <circle cx={toSvgX(0)} cy={toSvgY(0)} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />

        {/* Projection Rays */}
        {graph.showRays &&
          graph.preImagePoints.map((p, idx) => {
            const imgP = graph.imagePoints[idx];
            if (!imgP) return null;
            return (
              <line
                key={`ray-${p.name}`}
                x1={toSvgX(0)}
                y1={toSvgY(0)}
                x2={toSvgX(imgP.x * 1.2)}
                y2={toSvgY(imgP.y * 1.2)}
                stroke="#a855f7"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                strokeOpacity="0.4"
              />
            );
          })}

        {/* Dilated Image Polygon */}
        <path
          d={imagePath}
          fill="#a855f7"
          fillOpacity="0.25"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Pre-image Polygon */}
        <path
          d={preImagePath}
          fill="#38bdf8"
          fillOpacity="0.45"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Pre-image Points */}
        {graph.preImagePoints.map((p) => (
          <g key={`point-pre-${p.name}`}>
            <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
            <text
              x={toSvgX(p.x) - 5}
              y={toSvgY(p.y) - 5}
              fill="#38bdf8"
              fontSize="9"
              fontWeight="bold"
              textAnchor="end"
            >
              {p.name}({p.x},{p.y})
            </text>
          </g>
        ))}

        {/* Image Points */}
        {graph.imagePoints.map((p) => (
          <g key={`point-img-${p.name}`}>
            <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="#c084fc" stroke="#ffffff" strokeWidth="1.5" />
            <text
              x={toSvgX(p.x) + 5}
              y={toSvgY(p.y) - 5}
              fill="#e9d5ff"
              fontSize="9"
              fontWeight="900"
              textAnchor="start"
            >
              {p.name}({p.x},{p.y})
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-between w-full text-[11px] pt-2 border-t border-slate-800 text-slate-400">
        <span className="flex items-center gap-1.5 text-sky-400 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> {graph.preImageLabel || 'Pre-image'}
        </span>
        <span className="flex items-center gap-1.5 text-purple-400 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> {graph.imageLabel || 'Image'}
        </span>
      </div>
    </div>
  );
};

export const StaarDilationsQuiz: React.FC<StaarDilationsQuizProps> = ({
  topicTitle,
  onSwitchToSelfCheck,
}) => {
  const [mode, setMode] = useState<StaarDilationsMode>('mixed');
  const [questions, setQuestions] = useState<StaarDilationsQuestion[]>([]);
  const [blockNumber, setBlockNumber] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Initialize questions
  useEffect(() => {
    let savedMode: StaarDilationsMode = 'mixed';
    try {
      const raw = localStorage.getItem(STORAGE_SELECTED_MODE_KEY);
      if (raw === 'mixed' || raw === 'scale-factor' || raw === 'algebraic-similarity') {
        savedMode = raw;
      }
    } catch {}
    setMode(savedMode);
    const { questions: initialQuestions, blockNumber: blk } = generateStaarQuestions(savedMode);
    setQuestions(initialQuestions);
    setBlockNumber(blk);
  }, []);

  const handleModeChange = (newMode: StaarDilationsMode) => {
    setMode(newMode);
    try {
      localStorage.setItem(STORAGE_SELECTED_MODE_KEY, newMode);
    } catch {}
    const { questions: newQuestions, blockNumber: blk } = generateStaarQuestions(newMode);
    setQuestions(newQuestions);
    setBlockNumber(blk);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setShowHint(false);
    setQuizCompleted(false);
  };

  const handleSelectOption = (optIndex: number) => {
    if (submittedAnswers[currentIndex]) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers[currentIndex] === undefined) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    const { questions: newQuestions, blockNumber: blk } = generateStaarQuestions(mode);
    setQuestions(newQuestions);
    setBlockNumber(blk);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setShowHint(false);
    setQuizCompleted(false);
  };

  // Metrics
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isSubmitted = submittedAnswers[currentIndex] || false;
  const userSelectedIndex = selectedAnswers[currentIndex];
  const isCorrect = isSubmitted && userSelectedIndex === currentQuestion?.correctIndex;

  const correctCount = Object.entries(submittedAnswers).filter(
    ([idx, sub]) => sub && selectedAnswers[Number(idx)] === questions[Number(idx)]?.correctIndex
  ).length;

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 font-bold">
        Loading STAAR Dilations practice questions...
      </div>
    );
  }

  return (
    <div id="staar-dilations-quiz-container" className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-5 sm:p-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> TEKS 8.3A/B/C & 8.10D
            </span>
            <span className="text-xs font-bold text-slate-500">
              STAAR Readiness Assessment · Block {blockNumber} of 6
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Unit 5: Dilations & Similarity STAAR Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Original STAAR-style questions served in sequential non-repeating blocks of 6 from the 36-question bank.
          </p>
        </div>

        {/* Practice Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
          <button
            onClick={() => handleModeChange('mixed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              mode === 'mixed'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 6 Blocks (36 Bank)
          </button>
          <button
            onClick={() => handleModeChange('scale-factor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              mode === 'scale-factor'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scale Factors
          </button>
          <button
            onClick={() => handleModeChange('algebraic-similarity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              mode === 'algebraic-similarity'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rules & Area
          </button>
        </div>
      </div>

      {/* Quiz Progress Header */}
      {!quizCompleted && (
        <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-black">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-[11px] text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md font-extrabold border border-violet-200">
              {currentQuestion.teksCode} · {currentQuestion.subtopic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Score:</span>
            <span className="text-violet-700 font-black">{correctCount} / {totalQuestions}</span>
          </div>
        </div>
      )}

      {/* Main Question Card / Completion Summary */}
      {!quizCompleted ? (
        <div className="space-y-6">
          {/* Question Prompt */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-4">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Context Pill if present */}
            {currentQuestion.context && (
              <div className="text-xs font-mono font-bold bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 inline-block shadow-2xs">
                {currentQuestion.context}
              </div>
            )}

            {/* Table data if question contains a table */}
            {currentQuestion.tableData && (
              <div className="overflow-x-auto my-3">
                <table className="w-full max-w-md mx-auto text-xs text-left border-collapse border border-slate-300 rounded-xl overflow-hidden shadow-xs bg-white">
                  <thead className="bg-slate-100 border-b border-slate-300">
                    <tr>
                      {currentQuestion.tableData.headers.map((h, i) => (
                        <th key={`th-${i}`} className="p-2.5 font-black text-slate-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestion.tableData.rows.map((row, rIdx) => (
                      <tr key={`tr-${rIdx}`} className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
                        {row.map((cell, cIdx) => (
                          <td key={`cell-${rIdx}-${cIdx}`} className="p-2.5 font-mono text-slate-800">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Graph Data if question contains an SVG coordinate plane */}
            {currentQuestion.graphData && (
              <DilationsGraphRenderer graph={currentQuestion.graphData} />
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isChosen = userSelectedIndex === idx;
              const isCorrectOpt = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

              if (isSubmitted) {
                if (isCorrectOpt) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (isChosen && !isCorrectOpt) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-400/20';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isChosen) {
                optionStyle = 'bg-violet-50 border-violet-600 text-violet-950 font-bold ring-2 ring-violet-600/20';
              }

              return (
                <button
                  key={`opt-${idx}`}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs bg-slate-100 text-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base">{option}</span>
                  </div>

                  {isSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isChosen && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission and Explanation Area */}
          <div className="pt-2 space-y-4">
            {!isSubmitted ? (
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>

                <button
                  disabled={userSelectedIndex === undefined}
                  onClick={handleSubmitAnswer}
                  className={`px-6 py-3 rounded-xl font-black text-sm transition-all cursor-pointer ${
                    userSelectedIndex !== undefined
                      ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                {/* Immediate Explanation Box */}
                <div
                  className={`p-5 rounded-2xl border-2 ${
                    isCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-sm mb-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Correct! Mastered Concept</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Incorrect Explanation</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>

                {/* Next Navigation */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={handlePrevious}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm shadow-md shadow-violet-500/20 cursor-pointer"
                  >
                    <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Block'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Hint Box */}
            {showHint && !isSubmitted && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                <span className="font-bold">Teacher Hint: </span>
                {currentQuestion.hint}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Summary View */
        <div className="text-center py-8 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              Block {blockNumber} Completed!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You scored <span className="font-black text-violet-600">{correctCount}</span> out of{' '}
              <span className="font-black">{totalQuestions}</span> ({scorePercentage}%).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm shadow-lg shadow-violet-500/25 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Next Sequential Block (6 Questions)</span>
            </button>

            {onSwitchToSelfCheck && (
              <button
                onClick={onSwitchToSelfCheck}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Switch to Self-Check Mode</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
