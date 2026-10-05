import React, { useState, useEffect } from 'react';
import {
  Printer,
  BarChart3,
  ArrowLeft,
  Lock,
  Sparkles,
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { TeacherPrintCenter } from './TeacherPrintCenter';
import { Unit1StaarAnalysis } from './Unit1StaarAnalysis';
import { Unit7StaarAnalysis } from './Unit7StaarAnalysis';

interface TeacherAccessPortalProps {
  initialTopicId: string;
  onClose: () => void;
  onSelectTopic?: (topicId: string) => void;
  onLock: () => void;
}

/**
 * Explicit list of unit numbers that have a completed STAAR Analysis.
 * Currently Unit 1 (Transformations) and Unit 7 (Angle Relationships) have completed STAAR Analyses.
 * Future units (e.g., 2–6, 8, 9, 10) can be added here once their research is completed.
 */
export const STAAR_ANALYSIS_AVAILABLE_UNITS: number[] = [1, 7];

export const TeacherAccessPortal: React.FC<TeacherAccessPortalProps> = ({
  initialTopicId,
  onClose,
  onSelectTopic,
  onLock,
}) => {
  const [activeTool, setActiveTool] = useState<'print-center' | 'staar-analysis'>('print-center');
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialTopicId);

  useEffect(() => {
    setSelectedUnitId(initialTopicId);
  }, [initialTopicId]);

  const currentTopic = TOPICS_DATA.find((t) => t.id === selectedUnitId) || TOPICS_DATA[0];
  const isStaarAnalysisAvailable = STAAR_ANALYSIS_AVAILABLE_UNITS.includes(currentTopic.number);

  // If the teacher switches to a unit without STAAR Analysis, ensure Print Center is active
  useEffect(() => {
    if (!isStaarAnalysisAvailable && activeTool === 'staar-analysis') {
      setActiveTool('print-center');
    }
  }, [isStaarAnalysisAvailable, activeTool]);

  const handleUnitSelectFromPrintCenter = (topicId: string) => {
    setSelectedUnitId(topicId);
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white print:text-black">
      {/* Screen-Only Teacher Access Tools Switcher Banner */}
      <div className="no-print bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Teacher Access Unlocked</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300">
                Unit {currentTopic.number}: {currentTopic.shortTitle}
              </span>
            </div>

            {/* Contextual Teacher Tool Cards */}
            <div
              className={`grid grid-cols-1 ${
                isStaarAnalysisAvailable ? 'sm:grid-cols-2 max-w-3xl' : 'max-w-md'
              } gap-2.5 flex-1`}
            >
              <button
                id="teacher-tool-print-center-btn"
                type="button"
                onClick={() => setActiveTool('print-center')}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer border flex items-start gap-3 ${
                  activeTool === 'print-center'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                    : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <span className="text-lg leading-none pt-0.5" role="img" aria-label="printer">
                  🖨️
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-black flex items-center justify-between gap-2">
                    <span>Teacher Print Center</span>
                    {activeTool === 'print-center' && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] mt-0.5 leading-snug ${
                      activeTool === 'print-center' ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    Print Student Copies and Answer Keys.
                  </p>
                </div>
              </button>

              {isStaarAnalysisAvailable && (
                <button
                  id="teacher-tool-staar-analysis-btn"
                  type="button"
                  onClick={() => setActiveTool('staar-analysis')}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border flex items-start gap-3 ${
                    activeTool === 'staar-analysis'
                      ? 'bg-[#0D9488] text-white border-teal-300 shadow-md shadow-teal-500/25'
                      : 'bg-[#0F766E] hover:bg-[#0D9488] text-white border-teal-500/70'
                  }`}
                >
                  <span className="text-lg leading-none pt-0.5" role="img" aria-label="chart">
                    📊
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-black flex items-center justify-between gap-2">
                      <span>STAAR Analysis</span>
                      {activeTool === 'staar-analysis' && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 leading-snug ${
                        activeTool === 'staar-analysis' ? 'text-teal-50' : 'text-teal-100'
                      }`}
                    >
                      View historical STAAR alignment, TEKS frequency, comparable released items,
                      match levels, and question-by-question analysis.
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE TEACHER TOOL CONTENT */}
      {activeTool === 'print-center' || !isStaarAnalysisAvailable ? (
        <TeacherPrintCenter
          initialTopicId={selectedUnitId}
          onClose={onClose}
          onSelectTopic={handleUnitSelectFromPrintCenter}
          onLock={onLock}
        />
      ) : (
        <div className="min-h-screen bg-slate-100 text-slate-900">
          {/* Teacher Control Header for STAAR Analysis */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Math Lab</span>
                </button>

                <div className="border-l border-slate-200 pl-3">
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                    <span>
                      Unit {currentTopic.number} — {currentTopic.shortTitle}: STAAR Analysis
                    </span>
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Historical STAAR alignment, TEKS frequency, comparable released items &
                    question-by-question analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTool('print-center')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Return to Teacher Print Center</span>
                </button>

                <button
                  type="button"
                  onClick={onLock}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-red-700 bg-slate-100 hover:bg-red-50 transition-colors border border-slate-200 cursor-pointer"
                  title="Lock Teacher Access"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Lock Teacher Access</span>
                </button>
              </div>
            </div>
          </header>

          {/* Direct Unit STAAR Analysis View (No redundant unit selection required) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            {currentTopic.number === 1 && <Unit1StaarAnalysis />}
            {currentTopic.number === 7 && <Unit7StaarAnalysis />}
          </div>
        </div>
      )}
    </div>
  );
};
