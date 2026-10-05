import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import {
  Printer,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  FileText,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles,
  Lock,
  KeyRound,
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { STAAR_TRANSFORMATIONS_QUESTIONS } from '../data/staar/staarQuestionsTransformations';
import { STAAR_PROPORTIONAL_QUESTIONS } from '../data/staar/staarQuestionsProportional';
import { STAAR_SLOPE_QUESTIONS } from '../data/staar/staarQuestionsSlope';
import { STAAR_SYSTEMS_QUESTIONS } from '../data/staar/staarQuestionsSystems';
import { STAAR_DILATIONS_QUESTIONS } from '../data/staar/staarQuestionsDilations';
import { STAAR_EQUATIONS_QUESTIONS } from '../data/staar/staarQuestionsEquations';
import { STAAR_ANGLE_RELATIONSHIPS_QUESTIONS } from '../data/staar/staarQuestionsAngleRelationships';
import { UNIT_6_SELF_CHECK_QUESTIONS } from '../data/unit6SelfCheckQuestions';
import { UNIT_7_SELF_CHECK_QUESTIONS } from '../data/unit7SelfCheckQuestions';
import { Unit7SelfCheckDiagram } from './visualizers/Unit7SelfCheckDiagram';

/**
 * Registry connecting topic IDs to existing local STAAR Practice question banks.
 * Reuses existing question objects directly without duplication.
 */
const STAAR_QUESTIONS_BY_TOPIC: Record<string, any[]> = {
  'geometric-transformations': STAAR_TRANSFORMATIONS_QUESTIONS,
  'proportional-relationships': STAAR_PROPORTIONAL_QUESTIONS,
  'slope-linear-equations': STAAR_SLOPE_QUESTIONS,
  'systems-of-linear-equations': STAAR_SYSTEMS_QUESTIONS,
  'dilations-similarity': STAAR_DILATIONS_QUESTIONS,
  'equations-inequalities': STAAR_EQUATIONS_QUESTIONS,
  'angle-relationships-parallel-lines-triangles': STAAR_ANGLE_RELATIONSHIPS_QUESTIONS,
};

/**
 * Extracts the exact correct answer text for a question from the existing question bank.
 */
function getQuestionCorrectAnswerText(q: any, rawUnit6SelfCheck?: any): string {
  // 1. Standard PracticeQuestion or StaarPracticeQuestion (options: string[], correctIndex: number)
  if (
    typeof q.correctIndex === 'number' &&
    Array.isArray(q.options) &&
    typeof q.options[0] === 'string'
  ) {
    // Special case for Unit 6 Self-Check multi-select questions
    if (
      rawUnit6SelfCheck &&
      rawUnit6SelfCheck.type === 'multi-select' &&
      Array.isArray(rawUnit6SelfCheck.correctAnswer) &&
      Array.isArray(rawUnit6SelfCheck.options)
    ) {
      const selected = rawUnit6SelfCheck.options
        .map((opt: any, idx: number) => ({
          opt,
          letter: ['A', 'B', 'C', 'D', 'E', 'F'][idx] || String(opt.id).toUpperCase(),
        }))
        .filter(({ opt }: any) => rawUnit6SelfCheck.correctAnswer.includes(opt.id))
        .map(({ letter, opt }: any) => `${letter}. ${opt.text}`);
      if (selected.length > 0) {
        return selected.join(', ');
      }
    }

    const letter = ['A', 'B', 'C', 'D', 'E', 'F'][q.correctIndex] || `${q.correctIndex + 1}`;
    const optText = q.options[q.correctIndex] ?? '';
    return `${letter}. ${optText}`;
  }

  const source = rawUnit6SelfCheck || q;

  // 2. Unit 6 Multiple Choice / Error Analysis (options: { id, text }[], correctAnswer: string)
  if (source.type === 'multiple-choice' || source.type === 'error-analysis') {
    if (Array.isArray(source.options)) {
      const idx = source.options.findIndex(
        (opt: any) => opt.id === source.correctAnswer || opt.isCorrect
      );
      if (idx >= 0) {
        const opt = source.options[idx];
        const letter = ['A', 'B', 'C', 'D', 'E', 'F'][idx] || String(opt.id).toUpperCase();
        return `${letter}. ${opt.text}`;
      }
    }
  }

  // 3. Multi-Select (correctAnswer: string[], options: { id, text }[])
  if (
    source.type === 'multi-select' &&
    Array.isArray(source.correctAnswer) &&
    Array.isArray(source.options)
  ) {
    const selected = source.options
      .map((opt: any, idx: number) => ({
        opt,
        letter: ['A', 'B', 'C', 'D', 'E', 'F'][idx] || String(opt.id).toUpperCase(),
      }))
      .filter(({ opt }: any) => source.correctAnswer.includes(opt.id))
      .map(({ letter, opt }: any) => `${letter}. ${opt.text}`);
    if (selected.length > 0) {
      return selected.join(', ');
    }
  }

  // 4. Inequality Entry
  if (source.type === 'inequality-entry') {
    if (source.inequalityConfig) {
      const sym =
        source.inequalityConfig.symbol === '<='
          ? '≤'
          : source.inequalityConfig.symbol === '>='
          ? '≥'
          : source.inequalityConfig.symbol;
      const variable = source.inequalityConfig.variable || 'x';
      return `${variable} ${sym} ${source.inequalityConfig.boundary}`;
    }
    return String(source.correctAnswer ?? '')
      .replace('<=', '≤')
      .replace('>=', '≥');
  }

  // 5. Numeric Input
  if (source.type === 'numeric-input') {
    const val = source.numericAnswer ?? source.correctAnswer;
    const promptText = String(source.prompt || source.question || '');
    if (promptText.toLowerCase().includes('in degrees') || promptText.toLowerCase().includes('measure of')) {
      return `${val}°`;
    }
    return `x = ${val}`;
  }

  return String(source.correctAnswer ?? '');
}

interface TeacherPrintCenterProps {
  initialTopicId?: string;
  onClose: () => void;
  onSelectTopic?: (topicId: string) => void;
  onLock?: () => void;
}

/**
 * Unified Print Graph Renderer for student paper copies.
 * Outputs high-contrast, grayscale-friendly vector SVGs with white backgrounds.
 */
const PrintGraphView: React.FC<{ graph: any }> = ({ graph }) => {
  if (!graph) return null;

  // 1. Geometric Transformations Graph (figures array)
  if (Array.isArray(graph.figures)) {
    const width = 320;
    const height = 280;
    const padding = 28;

    const xMin = graph.xMin ?? -8;
    const xMax = graph.xMax ?? 8;
    const yMin = graph.yMin ?? -8;
    const yMax = graph.yMax ?? 8;
    const xStep = graph.xStep ?? 2;
    const yStep = graph.yStep ?? 2;

    const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * (height - 2 * padding);

    const xTicks: number[] = [];
    for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);
    const yTicks: number[] = [];
    for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

    return (
      <div className="inline-block bg-white border border-slate-400 p-2 rounded-lg my-2">
        {graph.title && (
          <div className="text-[11px] font-bold text-slate-800 mb-1 text-center font-sans">
            {graph.title}
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-64 sm:w-72 h-auto select-none bg-white">
          <defs>
            <marker id="print-axis-arrow-x" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#0f172a" />
            </marker>
            <marker id="print-axis-arrow-y" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#0f172a" />
            </marker>
          </defs>

          {/* Grid lines */}
          {xTicks.map((x) => (
            <line
              key={`x-grid-${x}`}
              x1={toSvgX(x)}
              y1={padding}
              x2={toSvgX(x)}
              y2={height - padding}
              stroke={x === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={x === 0 ? 1.5 : 0.6}
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`y-grid-${y}`}
              x1={padding}
              y1={toSvgY(y)}
              x2={width - padding}
              y2={toSvgY(y)}
              stroke={y === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={y === 0 ? 1.5 : 0.6}
            />
          ))}

          {/* Axis arrows & labels */}
          <line
            x1={padding}
            y1={toSvgY(0)}
            x2={width - padding + 8}
            y2={toSvgY(0)}
            stroke="#0f172a"
            strokeWidth="1.5"
            markerEnd="url(#print-axis-arrow-x)"
          />
          <line
            x1={toSvgX(0)}
            y1={height - padding}
            x2={toSvgX(0)}
            y2={padding - 8}
            stroke="#0f172a"
            strokeWidth="1.5"
            markerEnd="url(#print-axis-arrow-y)"
          />

          <text x={width - padding + 12} y={toSvgY(0) + 3} fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="start">
            x
          </text>
          <text x={toSvgX(0)} y={padding - 12} fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
            y
          </text>

          {/* Tick numbers */}
          {xTicks.map((x) => {
            if (x === 0) return null;
            return (
              <text key={`x-tick-${x}`} x={toSvgX(x)} y={toSvgY(0) + 11} fill="#334155" fontSize="8" fontWeight="600" textAnchor="middle">
                {x}
              </text>
            );
          })}
          {yTicks.map((y) => {
            if (y === 0) return null;
            return (
              <text key={`y-tick-${y}`} x={toSvgX(0) - 5} y={toSvgY(y) + 3} fill="#334155" fontSize="8" fontWeight="600" textAnchor="end">
                {y}
              </text>
            );
          })}

          {/* Figures */}
          {graph.figures.map((fig: any, fIdx: number) => {
            const isImage = fig.isDashed || fIdx > 0;
            const pointsString = fig.vertices.map((v: any) => `${toSvgX(v.x)},${toSvgY(v.y)}`).join(' ');

            return (
              <g key={`fig-${fIdx}`}>
                <polygon
                  points={pointsString}
                  fill={isImage ? 'rgba(71, 85, 105, 0.12)' : 'rgba(15, 23, 42, 0.06)'}
                  stroke={isImage ? '#1e293b' : '#0f172a'}
                  strokeWidth="2"
                  strokeDasharray={isImage ? '4,3' : undefined}
                />
                {fig.vertices.map((v: any, vIdx: number) => {
                  const vx = toSvgX(v.x);
                  const vy = toSvgY(v.y);
                  const lx = vx + (v.labelOffset?.dx ?? 0);
                  const ly = vy + (v.labelOffset?.dy ?? (vy < toSvgY(0) ? -8 : 10));

                  return (
                    <g key={`v-${fIdx}-${vIdx}`}>
                      <circle cx={vx} cy={vy} r="3" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
                      {v.label && (
                        <text
                          x={lx}
                          y={ly}
                          fill="#0f172a"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
                        >
                          {v.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-700 mt-1 pt-1 border-t border-slate-200">
          {graph.figures.map((fig: any, fIdx: number) => (
            <span key={fIdx} className="flex items-center gap-1.5">
              <span className={`w-3 h-0.5 inline-block ${fig.isDashed || fIdx > 0 ? 'border-t-2 border-dashed border-slate-700' : 'bg-slate-900'}`} />
              <span>{fig.name}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // 2. Dilations Graph (preImagePoints & imagePoints)
  if (Array.isArray(graph.preImagePoints) && Array.isArray(graph.imagePoints)) {
    const width = 300;
    const height = 260;
    const padding = 26;

    const xMin = graph.xMin ?? 0;
    const xMax = graph.xMax ?? 10;
    const yMin = graph.yMin ?? 0;
    const yMax = graph.yMax ?? 10;
    const xStep = graph.xStep ?? 2;
    const yStep = graph.yStep ?? 2;

    const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * (height - 2 * padding);

    const xTicks: number[] = [];
    for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);
    const yTicks: number[] = [];
    for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

    const prePointsStr = graph.preImagePoints.map((p: any) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
    const imgPointsStr = graph.imagePoints.map((p: any) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');

    return (
      <div className="inline-block bg-white border border-slate-400 p-2 rounded-lg my-2">
        {graph.title && (
          <div className="text-[11px] font-bold text-slate-800 mb-1 text-center font-sans">
            {graph.title}
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-64 sm:w-72 h-auto select-none bg-white">
          {/* Grid lines */}
          {xTicks.map((x) => (
            <line
              key={`d-gx-${x}`}
              x1={toSvgX(x)}
              y1={padding}
              x2={toSvgX(x)}
              y2={height - padding}
              stroke={x === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={x === 0 ? 1.5 : 0.6}
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`d-gy-${y}`}
              x1={padding}
              y1={toSvgY(y)}
              x2={width - padding}
              y2={toSvgY(y)}
              stroke={y === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={y === 0 ? 1.5 : 0.6}
            />
          ))}

          {/* Tick numbers */}
          {xTicks.map((x) => (
            <text key={`d-tx-${x}`} x={toSvgX(x)} y={toSvgY(yMin) + 11} fill="#334155" fontSize="8" fontWeight="600" textAnchor="middle">
              {x}
            </text>
          ))}
          {yTicks.map((y) => (
            <text key={`d-ty-${y}`} x={toSvgX(xMin) - 5} y={toSvgY(y) + 3} fill="#334155" fontSize="8" fontWeight="600" textAnchor="end">
              {y}
            </text>
          ))}

          {/* Dilated Image Polygon */}
          <polygon
            points={imgPointsStr}
            fill="rgba(71, 85, 105, 0.12)"
            stroke="#0f172a"
            strokeWidth="2"
            strokeDasharray="4,3"
          />

          {/* Pre-Image Polygon */}
          <polygon
            points={prePointsStr}
            fill="rgba(15, 23, 42, 0.08)"
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Vertices */}
          {graph.preImagePoints.map((p: any) => (
            <g key={`pre-pt-${p.name}`}>
              <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
              <text
                x={toSvgX(p.x) - 5}
                y={toSvgY(p.y) - 5}
                fill="#0f172a"
                fontSize="8"
                fontWeight="bold"
                textAnchor="end"
                style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
              >
                {p.name}({p.x},{p.y})
              </text>
            </g>
          ))}

          {graph.imagePoints.map((p: any) => (
            <g key={`img-pt-${p.name}`}>
              <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
              <text
                x={toSvgX(p.x) + 5}
                y={toSvgY(p.y) - 5}
                fill="#0f172a"
                fontSize="8"
                fontWeight="bold"
                textAnchor="start"
                style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
              >
                {p.name}({p.x},{p.y})
              </text>
            </g>
          ))}
        </svg>
        <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-700 mt-1 pt-1 border-t border-slate-200">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-900 inline-block" />
            <span>{graph.preImageLabel || 'Pre-image'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-700 inline-block" />
            <span>{graph.imageLabel || 'Image'}</span>
          </span>
        </div>
      </div>
    );
  }

  // 3. Slope, Proportional, or Systems Graph (lines array)
  if (Array.isArray(graph.lines)) {
    const width = 300;
    const height = 250;
    const padding = 28;

    const xMin = graph.xMin ?? 0;
    const xMax = graph.xMax ?? 10;
    const yMin = graph.yMin ?? 0;
    const yMax = graph.yMax ?? 10;
    const xStep = graph.xStep ?? (xMax - xMin > 12 ? 2 : 1);
    const yStep = graph.yStep ?? (yMax - yMin > 12 ? 2 : 1);

    const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * (height - 2 * padding);

    const xTicks: number[] = [];
    for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);
    const yTicks: number[] = [];
    for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

    return (
      <div className="inline-block bg-white border border-slate-400 p-2 rounded-lg my-2">
        {graph.title && (
          <div className="text-[11px] font-bold text-slate-800 mb-1 text-center font-sans">
            {graph.title}
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-64 sm:w-72 h-auto select-none bg-white">
          <defs>
            <marker id="print-axis-arrow-line-x" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#0f172a" />
            </marker>
            <marker id="print-axis-arrow-line-y" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#0f172a" />
            </marker>
          </defs>

          {/* Grid lines */}
          {xTicks.map((x) => (
            <line
              key={`lg-x-${x}`}
              x1={toSvgX(x)}
              y1={padding}
              x2={toSvgX(x)}
              y2={height - padding}
              stroke={x === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={x === 0 ? 1.5 : 0.6}
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`lg-y-${y}`}
              x1={padding}
              y1={toSvgY(y)}
              x2={width - padding}
              y2={toSvgY(y)}
              stroke={y === 0 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={y === 0 ? 1.5 : 0.6}
            />
          ))}

          {/* Axes with arrows */}
          {xMin <= 0 && xMax >= 0 && (
            <line
              x1={toSvgX(0)}
              y1={height - padding}
              x2={toSvgX(0)}
              y2={padding - 6}
              stroke="#0f172a"
              strokeWidth="1.5"
              markerEnd="url(#print-axis-arrow-line-y)"
            />
          )}
          {yMin <= 0 && yMax >= 0 && (
            <line
              x1={padding}
              y1={toSvgY(0)}
              x2={width - padding + 6}
              y2={toSvgY(0)}
              stroke="#0f172a"
              strokeWidth="1.5"
              markerEnd="url(#print-axis-arrow-line-x)"
            />
          )}

          {/* Axis Labels */}
          {graph.xLabel && (
            <text x={width - padding} y={height - 8} fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end">
              {graph.xLabel}
            </text>
          )}
          {graph.yLabel && (
            <text x={padding - 4} y={16} fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="start">
              {graph.yLabel}
            </text>
          )}

          {/* Tick numbers */}
          {xTicks.map((x) => (
            <text
              key={`lt-x-${x}`}
              x={toSvgX(x)}
              y={toSvgY(yMin <= 0 && yMax >= 0 ? 0 : yMin) + 11}
              fill="#334155"
              fontSize="8"
              fontWeight="600"
              textAnchor="middle"
            >
              {x}
            </text>
          ))}
          {yTicks.map((y) => (
            <text
              key={`lt-y-${y}`}
              x={toSvgX(xMin <= 0 && xMax >= 0 ? 0 : xMin) - 5}
              y={toSvgY(y) + 3}
              fill="#334155"
              fontSize="8"
              fontWeight="600"
              textAnchor="end"
            >
              {y}
            </text>
          ))}

          {/* Plotted Lines */}
          {graph.lines.map((line: any, lIdx: number) => {
            const isSecondLine = lIdx > 0;
            // Handle vertical line
            if (line.verticalX !== undefined) {
              const vx = toSvgX(line.verticalX);
              return (
                <line
                  key={`vline-${lIdx}`}
                  x1={vx}
                  y1={toSvgY(yMin)}
                  x2={vx}
                  y2={toSvgY(yMax)}
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeDasharray={line.dashed || isSecondLine ? '4,3' : undefined}
                />
              );
            }

            // Normal line: y = m*x + b
            const m = line.slope ?? 1;
            const b = line.intercept ?? 0;
            const x1 = xMin;
            const y1 = m * x1 + b;
            const x2 = xMax;
            const y2 = m * x2 + b;

            return (
              <g key={`line-wrap-${lIdx}`}>
                <line
                  x1={toSvgX(x1)}
                  y1={toSvgY(y1)}
                  x2={toSvgX(x2)}
                  y2={toSvgY(y2)}
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeDasharray={line.dashed || isSecondLine ? '4,3' : undefined}
                />

                {/* Plotted Points on this line */}
                {Array.isArray(line.points) &&
                  line.points.map((pt: any, pIdx: number) => {
                    const px = toSvgX(pt.x);
                    const py = toSvgY(pt.y);
                    return (
                      <g key={`pt-${lIdx}-${pIdx}`}>
                        <circle cx={px} cy={py} r="3.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
                        {pt.label && (
                          <text
                            x={px + 5}
                            y={py - 5}
                            fill="#0f172a"
                            fontSize="8"
                            fontWeight="bold"
                            style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
                          >
                            {pt.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
              </g>
            );
          })}

          {/* Triangles (Slope Triangles for rate of change) */}
          {Array.isArray(graph.triangles) &&
            graph.triangles.map((tri: any, tIdx: number) => {
              const x1 = toSvgX(tri.x1);
              const y1 = toSvgY(tri.y1);
              const x2 = toSvgX(tri.x2);
              const y2 = toSvgY(tri.y2);

              return (
                <g key={`tri-${tIdx}`}>
                  {/* Horizontal run */}
                  <line x1={x1} y1={y1} x2={x2} y2={y1} stroke="#475569" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* Vertical rise */}
                  <line x1={x2} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* Rise / Run labels */}
                  {tri.runLabel && (
                    <text
                      x={(x1 + x2) / 2}
                      y={y1 + (y2 < y1 ? 12 : -5)}
                      fill="#0f172a"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
                    >
                      {tri.runLabel}
                    </text>
                  )}
                  {tri.riseLabel && (
                    <text
                      x={x2 + 8}
                      y={(y1 + y2) / 2 + 3}
                      fill="#0f172a"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="start"
                      style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
                    >
                      {tri.riseLabel}
                    </text>
                  )}
                </g>
              );
            })}
        </svg>

        {/* Line Labels Legend */}
        {graph.lines.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-700 mt-1 pt-1 border-t border-slate-200">
            {graph.lines.map((l: any, idx: number) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className={`w-3 h-0.5 inline-block ${idx === 0 ? 'bg-slate-900' : 'border-t-2 border-dashed border-slate-700'}`} />
                <span>{l.label || l.equation || `Line ${idx + 1}`}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export const TeacherPrintCenter: React.FC<TeacherPrintCenterProps> = ({
  initialTopicId,
  onClose,
  onSelectTopic,
  onLock,
}) => {
  // Determine active unit (defaults to provided initialTopicId or first topic)
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    initialTopicId || TOPICS_DATA[0].id
  );

  // Print mode: 'self-check', 'staar', or 'both' (all 54 Unit 7 questions)
  const [printMode, setPrintMode] = useState<'self-check' | 'staar' | 'both'>('self-check');

  // Document view: 'questions' (student test) or 'answer-key' (separate teacher answer key)
  const [viewType, setViewType] = useState<'questions' | 'answer-key'>('questions');
  const [printErrorNotice, setPrintErrorNotice] = useState<string | null>(null);

  // Lookup topic data from existing repository
  const currentTopic = TOPICS_DATA.find((t) => t.id === selectedUnitId) || TOPICS_DATA[0];

  // Self Check questions dynamically pulled from topic.practiceApp.quizQuestions (or Unit 7 Self-Check bank)
  const selfCheckQuestions =
    selectedUnitId === 'angle-relationships-parallel-lines-triangles'
      ? UNIT_7_SELF_CHECK_QUESTIONS
      : currentTopic.practiceApp?.quizQuestions || [];

  // STAAR Practice questions dynamically pulled from existing question banks
  const staarQuestions = STAAR_QUESTIONS_BY_TOPIC[selectedUnitId] || [];

  // Combined question bank (Self Check + STAAR Practice)
  const combinedQuestions = [...selfCheckQuestions, ...staarQuestions];

  // Active question set for current mode
  const activeQuestions =
    printMode === 'self-check'
      ? selfCheckQuestions
      : printMode === 'staar'
      ? staarQuestions
      : combinedQuestions;

  const handleUnitChange = (topicId: string) => {
    setSelectedUnitId(topicId);
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
  };

  const buildPrintableHtmlDocument = (
    printableNode: HTMLElement,
    targetElementId: 'printable-student-copy' | 'printable-answer-key'
  ): string => {
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((el) => {
        if (el.tagName.toLowerCase() === 'link') {
          const href = (el as HTMLLinkElement).href;
          return `<link rel="stylesheet" href="${href}" />`;
        }
        return el.outerHTML;
      })
      .join('\n');

    const clonedNode = printableNode.cloneNode(true) as HTMLElement;
    clonedNode.classList.remove('hidden');

    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mr. Pinilla's Math Lab — ${targetElementId === 'printable-answer-key' ? 'Answer Key' : 'Print'}</title>
    ${styles}
    <style>
      body {
        background: #ffffff !important;
        color: #000000 !important;
        margin: 0 auto !important;
        padding: 24px !important;
        max-width: 900px !important;
      }
      #printable-student-copy, #printable-answer-key {
        display: block !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    </style>
  </head>
  <body class="bg-white text-black">
    ${clonedNode.outerHTML}
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () {
          window.focus();
          window.print();
        }, 250);
      });
      window.addEventListener('afterprint', function () {
        setTimeout(function () {
          window.close();
        }, 300);
      });
    </script>
  </body>
</html>`;
  };

  const executeBrowserPrint = (
    preOpenedPrintWin: Window | null = null,
    targetElementId: 'printable-student-copy' | 'printable-answer-key' = 'printable-student-copy'
  ) => {
    setPrintErrorNotice(null);

    // 1. If a top-level print window was synchronously opened (embedded iframe / AI Studio Preview mode)
    if (preOpenedPrintWin) {
      const printableNode = document.getElementById(targetElementId);
      if (!printableNode) {
        preOpenedPrintWin.close();
        setPrintErrorNotice(`Unable to locate the printable document element (#${targetElementId}).`);
        return;
      }

      try {
        const htmlDoc = buildPrintableHtmlDocument(printableNode, targetElementId);
        preOpenedPrintWin.document.open();
        preOpenedPrintWin.document.write(htmlDoc);
        preOpenedPrintWin.document.close();
        preOpenedPrintWin.focus();
      } catch (err) {
        setPrintErrorNotice(
          `Print window could not be written (${err instanceof Error ? err.message : 'Browser restriction'}).`
        );
      }
      return;
    }

    // 2. Normal top-level browser printing (Cloudflare / Netlify deployed builds)
    let beforePrintTriggered = false;
    const onBeforePrint = () => {
      beforePrintTriggered = true;
    };
    window.addEventListener('beforeprint', onBeforePrint, { once: true });

    try {
      window.focus();
      window.print();
    } catch (err) {
      setPrintErrorNotice(
        `Direct browser print failed (${err instanceof Error ? err.message : 'Print blocked'}).`
      );
    }

    window.removeEventListener('beforeprint', onBeforePrint);

    // 3. Fallback if direct window.print() did not trigger beforeprint
    if (!beforePrintTriggered) {
      const printableNode = document.getElementById(targetElementId);
      if (!printableNode) return;

      const popupWin = window.open('', '_blank');
      if (popupWin) {
        const htmlDoc = buildPrintableHtmlDocument(printableNode, targetElementId);
        popupWin.document.open();
        popupWin.document.write(htmlDoc);
        popupWin.document.close();
        popupWin.focus();
        return;
      }

      setPrintErrorNotice(
        'The print window was blocked by your browser. Please allow pop-ups for this site and click Print again.'
      );
    }
  };

  const isRunningInIframe = (): boolean => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  };

  const handlePrintStudentCopy = () => {
    const preOpenedWin = isRunningInIframe() ? window.open('', '_blank') : null;
    if (isRunningInIframe() && !preOpenedWin) {
      setPrintErrorNotice(
        'The print window was blocked by your browser. Please allow pop-ups for this site and click Print Student Copy again.'
      );
      return;
    }

    if (viewType !== 'questions') {
      flushSync(() => {
        setViewType('questions');
      });
    }

    executeBrowserPrint(preOpenedWin, 'printable-student-copy');
  };

  const handlePrintAnswerKey = () => {
    setPrintErrorNotice(null);

    // 1. Open a new top-level browser window synchronously from the user click
    const printWin = window.open('', '_blank');
    if (!printWin) {
      setPrintErrorNotice(
        'The print window was blocked by your browser. Please allow pop-ups for this site and click Print Answer Key again.'
      );
      return;
    }

    // 2. Build Answer Key document DIRECTLY from activeQuestions and getQuestionCorrectAnswerText(...)
    const escapeHtml = (str: string) =>
      String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const selectedBankLabel =
      printMode === 'self-check'
        ? `Self Check (${activeQuestions.length} Questions)`
        : printMode === 'staar'
        ? `STAAR Practice (${activeQuestions.length} Questions)`
        : `Both Banks: Self Check + STAAR Practice (${activeQuestions.length} Questions)`;

    const answerRowsHtml = activeQuestions
      .map((q: any, index: number) => {
        const rawU6SelfCheck =
          selectedUnitId === 'equations-inequalities' &&
          (printMode === 'self-check' ||
            (printMode === 'both' && index < selfCheckQuestions.length))
            ? UNIT_6_SELF_CHECK_QUESTIONS[index]
            : undefined;
        const correctText = escapeHtml(getQuestionCorrectAnswerText(q, rawU6SelfCheck));
        return `<div class="answer-row">
          <span class="q-num">${index + 1}.</span>
          <span class="q-ans">${correctText}</span>
        </div>`;
      })
      .join('\n');

    const answerKeyDocumentHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mr. Pinilla's Math Lab — Answer Key (Unit ${currentTopic.number})</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #ffffff;
        color: #0f172a;
        margin: 0 auto;
        padding: 32px;
        max-width: 820px;
      }
      .header {
        border-bottom: 2px solid #0f172a;
        padding-bottom: 14px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
      }
      .lab-title {
        font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        font-size: 22px;
        font-weight: 900;
        color: #0f172a;
        margin: 0;
      }
      .unit-title {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
        margin-top: 4px;
      }
      .bank-label {
        font-size: 13px;
        font-weight: 600;
        color: #334155;
        margin-top: 3px;
      }
      .badge {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 800;
        color: #0f172a;
        text-align: right;
        text-transform: uppercase;
      }
      .section-heading {
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #0f172a;
        margin: 0 0 12px 0;
      }
      .answer-list {
        display: flex;
        flex-direction: column;
      }
      .answer-row {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding: 7px 0;
        border-bottom: 1px solid #e2e8f0;
        font-size: 14px;
        line-height: 1.45;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .answer-row:last-child {
        border-bottom: none;
      }
      .q-num {
        font-weight: 900;
        width: 30px;
        text-align: right;
        flex-shrink: 0;
        color: #0f172a;
      }
      .q-ans {
        font-weight: 600;
        color: #0f172a;
      }
      @media print {
        body {
          padding: 0;
          max-width: 100%;
        }
        @page {
          margin: 0.5in;
          size: letter portrait;
        }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1 class="lab-title">Mr. Pinilla's Math Lab</h1>
        <div class="unit-title">Unit ${escapeHtml(String(currentTopic.number))}: ${escapeHtml(currentTopic.title)}</div>
        <div class="bank-label">Selected Bank: ${escapeHtml(selectedBankLabel)}</div>
      </div>
      <div class="badge">ANSWER KEY</div>
    </div>
    <h2 class="section-heading">ANSWER KEY</h2>
    <div class="answer-list">
      ${answerRowsHtml}
    </div>
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () {
          window.focus();
          window.print();
        }, 200);
      });
      window.addEventListener('afterprint', function () {
        setTimeout(function () {
          window.close();
        }, 300);
      });
    </script>
  </body>
</html>`;

    printWin.document.open();
    printWin.document.write(answerKeyDocumentHtml);
    printWin.document.close();
    printWin.focus();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white print:text-black">
      {/* Print-specific stylesheet ensuring pristine paper output */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-student-copy,
          #printable-answer-key {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-question-item {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            page-break-after: auto;
          }
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
        }
      `}</style>

      {/* Screen-Only Teacher Control Header */}
      <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Math Lab</span>
            </button>

            <div className="border-l border-slate-200 pl-3">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-600" />
                <span>Teacher Print Center</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Client-side printable worksheets & test prep for classroom instruction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onLock && (
              <button
                id="lock-teacher-access-btn"
                type="button"
                onClick={onLock}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-red-700 bg-slate-100 hover:bg-red-50 transition-colors border border-slate-200 cursor-pointer"
                title="Lock Teacher Access"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Lock Teacher Access</span>
              </button>
            )}

            <button
              id="print-student-copy-btn"
              type="button"
              onClick={handlePrintStudentCopy}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print Student Copy</span>
            </button>

            <button
              id="print-answer-key-btn"
              type="button"
              onClick={handlePrintAnswerKey}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 transition-all cursor-pointer active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span>Print Answer Key</span>
            </button>
          </div>
        </div>
      </header>

      {/* Screen-Only Unit & Mode Configuration Bar */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        {printErrorNotice && (
          <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-2xs">
            <span>{printErrorNotice}</span>
            <button
              type="button"
              onClick={() => setPrintErrorNotice(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-black cursor-pointer shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          {/* Unit Selector */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Select Instructional Unit</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOPICS_DATA.map((t) => {
                const isActive = t.id === selectedUnitId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleUnitChange(t.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 scale-[1.02]'
                        : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-md text-[10px] font-black flex items-center justify-center ${
                        isActive ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t.number}
                    </span>
                    <span>{t.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Selector (Self Check vs. STAAR Practice) & Separate Answer Key Controls */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Question Bank:
                </span>
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => {
                      setPrintMode('self-check');
                      setViewType('questions');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      printMode === 'self-check' && viewType === 'questions'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Self Check ({selfCheckQuestions.length} Questions)
                  </button>
                  <button
                    id="self-check-answer-key-btn"
                    onClick={() => {
                      setPrintMode('self-check');
                      setViewType('answer-key');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                      printMode === 'self-check' && viewType === 'answer-key'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50/70'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Answer Key</span>
                  </button>
                </div>
              </div>

              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => {
                    setPrintMode('staar');
                    setViewType('questions');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    printMode === 'staar' && viewType === 'questions'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  STAAR Practice ({staarQuestions.length} Questions)
                </button>
                <button
                  id="staar-answer-key-btn"
                  onClick={() => {
                    setPrintMode('staar');
                    setViewType('answer-key');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    printMode === 'staar' && viewType === 'answer-key'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50/70'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Answer Key</span>
                </button>
              </div>

              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => {
                    setPrintMode('both');
                    setViewType('questions');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    printMode === 'both' && viewType === 'questions'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Both Banks ({combinedQuestions.length} Questions)
                </button>
                <button
                  id="both-answer-key-btn"
                  onClick={() => {
                    setPrintMode('both');
                    setViewType('answer-key');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    printMode === 'both' && viewType === 'answer-key'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50/70'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Answer Key</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                {viewType === 'answer-key'
                  ? `Showing Separate Answer Key (${activeQuestions.length} Answers)`
                  : `Ready for Print: ${activeQuestions.length} Total Questions`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Printable Document Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* SEPARATE TEACHER ANSWER KEY CONTAINER */}
        <div
          id="printable-answer-key"
          className={`bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 ${
            viewType === 'answer-key' ? '' : 'hidden'
          }`}
        >
          <div>
            <div className="border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                    {printMode === 'self-check'
                      ? 'SELF-CHECK ANSWER KEY'
                      : printMode === 'staar'
                      ? 'STAAR PRACTICE ANSWER KEY'
                      : 'COMPLETE QUESTION BANK ANSWER KEY'}
                  </h1>
                  <div className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    Unit {currentTopic.number}: {currentTopic.title}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono font-bold">
                  Teacher Answer Key ({activeQuestions.length} Questions)
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {activeQuestions.map((q: any, index: number) => {
                const rawU6SelfCheck =
                  selectedUnitId === 'equations-inequalities' &&
                  (printMode === 'self-check' ||
                    (printMode === 'both' && index < selfCheckQuestions.length))
                    ? UNIT_6_SELF_CHECK_QUESTIONS[index]
                    : undefined;
                const answerText = getQuestionCorrectAnswerText(q, rawU6SelfCheck);

                return (
                  <div
                    key={q.id || `answer-${index}`}
                    className="print-question-item py-1.5 border-b border-slate-200 last:border-b-0 flex items-baseline gap-2.5 text-sm sm:text-base text-slate-900 break-inside-avoid"
                  >
                    <span className="font-black shrink-0 w-7 text-right">{index + 1}.</span>
                    <span className="font-semibold">{answerText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STUDENT PRINT COPY CONTAINER (NO ANSWERS INCLUDED) */}
        <div
          id="printable-student-copy"
          className={`bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 ${
            viewType === 'questions' ? '' : 'hidden'
          }`}
        >
          <div>
            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                    Mr. Pinilla’s Math Lab
                  </h1>
                  <div className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    Unit {currentTopic.number}: {currentTopic.title}
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    {printMode === 'self-check'
                      ? `Self Check Practice (${activeQuestions.length} Questions)`
                      : printMode === 'staar'
                      ? `STAAR Practice Review (${activeQuestions.length} Questions)`
                      : `Complete Practice Packet: Self Check + STAAR Practice (${activeQuestions.length} Questions)`}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono font-bold">
                  Student Copy
                </div>
                </div>

                {/* Student Identification Lines */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-300 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="flex items-end gap-1.5">
                    <span>Name:</span>
                    <span className="flex-1 border-b border-slate-800 min-w-32 inline-block" />
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span>Date:</span>
                    <span className="flex-1 border-b border-slate-800 min-w-20 inline-block" />
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span>Period:</span>
                    <span className="flex-1 border-b border-slate-800 min-w-16 inline-block" />
                  </div>
                </div>
              </div>

              {/* Rendered Questions */}
              <div className="space-y-6">
                {activeQuestions.map((q: any, index: number) => {
                  const questionPrompt = q.question || q.prompt || '';
                  return (
                    <div
                      key={q.id || `question-${index}`}
                      className="print-question-item pb-6 border-b border-slate-200 last:border-b-0 break-inside-avoid"
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Question Number */}
                        <span className="font-black text-slate-900 text-sm sm:text-base shrink-0 pt-0.5">
                          {index + 1}.
                        </span>

                        <div className="space-y-2.5 flex-1 min-w-0">
                          {/* Question Text */}
                          <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                            {questionPrompt}
                          </p>

                          {/* Optional Equation Display (Unit 6 STAAR) */}
                          {q.equationDisplay && !q.question && (
                            <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-800 inline-block my-1">
                              {q.equationDisplay}
                            </div>
                          )}

                          {/* Optional Context Box (equations, scenarios) */}
                          {q.context && (
                            <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-800 inline-block my-1">
                              {q.context}
                            </div>
                          )}

                          {/* Optional Table */}
                          {q.tableData && Array.isArray(q.tableData.headers) && Array.isArray(q.tableData.rows) && (
                            <div className="my-3 overflow-x-auto">
                              <table className="border-collapse border border-slate-400 text-xs text-left bg-white">
                                <thead>
                                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-400">
                                    {q.tableData.headers.map((header: string, hIdx: number) => (
                                      <th
                                        key={hIdx}
                                        className="px-3 py-1.5 border-r border-slate-300 last:border-r-0 font-bold whitespace-nowrap"
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {q.tableData.rows.map((row: any[], rIdx: number) => (
                                    <tr key={rIdx} className="border-b border-slate-300 last:border-b-0">
                                      {row.map((cell: any, cIdx: number) => (
                                        <td
                                          key={cIdx}
                                          className="px-3 py-1 border-r border-slate-300 last:border-r-0 font-mono text-slate-800 whitespace-nowrap"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Optional Graph */}
                          {q.graphData && (
                            <div className="my-2">
                              <PrintGraphView graph={q.graphData} />
                            </div>
                          )}

                          {/* Optional Unit 7 Geometry Diagram */}
                          {q.diagram && (
                            <div className="my-2 max-w-md">
                              <Unit7SelfCheckDiagram diagram={q.diagram} />
                            </div>
                          )}

                          {/* Multiple Choice Options or Numeric Response Line (No answers revealed) */}
                          {Array.isArray(q.options) && q.options.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                              {q.options.map((opt: any, optIdx: number) => {
                                const letter = ['A', 'B', 'C', 'D', 'E', 'F'][optIdx] || `${optIdx + 1}`;
                                const optText = typeof opt === 'string' ? opt : opt?.text ?? '';
                                return (
                                  <div
                                    key={optIdx}
                                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 py-1 px-1.5 rounded-md"
                                  >
                                    <span className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 bg-white text-slate-900">
                                      {letter}
                                    </span>
                                    <span className="leading-snug pt-0.5">{optText}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : q.type === 'numeric-input' ? (
                            <div className="pt-3 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                              <span>Answer:</span>
                              <span className="inline-block w-36 border-b-2 border-slate-700 h-5" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};
