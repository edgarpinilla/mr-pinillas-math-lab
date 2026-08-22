import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Layers,
  FileText,
  Play,
  Activity,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { TopicData, SectionTab } from '../types';
import { TransformationsVisualizer } from './visualizers/TransformationsVisualizer';
import { ProportionalVisualizer } from './visualizers/ProportionalVisualizer';
import { VideoLessonPlayer } from './VideoLessonPlayer';
import { PracticeQuiz } from './PracticeQuiz';

interface TopicPageProps {
  topic: TopicData;
  initialTab?: SectionTab;
  onNavigateHome: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({
  topic,
  initialTab = 'learn',
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<SectionTab>(initialTab);
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Sync initial tab if changed from parent
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Scroll to top when topic changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id]);

  const filteredVocab = topic.vocabulary.filter(
    (item) =>
      item.term.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(vocabSearch.toLowerCase()))
  );

  const handleCopyPlaceholderUrl = () => {
    navigator.clipboard.writeText(topic.practiceApp.placeholderUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const isTransformations = topic.id === 'geometric-transformations';

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white bg-gradient-to-r ${topic.themeColor.gradient} shadow-xl relative overflow-hidden`}>
        {/* Subtle grid pattern in banner */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Background Math watermark */}
        <div className="absolute right-4 -bottom-6 opacity-15 text-9xl font-serif select-none pointer-events-none">
          {isTransformations ? '△' : 'k'}
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 font-medium">
            <button
              id="topic-page-back-home-btn"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 hover:text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all font-bold backdrop-blur-md shadow-2xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Math Lab Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="font-semibold">Unit {topic.number}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-black bg-black/20 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
              {topic.shortTitle}
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/25 text-white/95 backdrop-blur-md">
              {topic.gradeLevel} • {topic.unit}
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-white/95 font-semibold">
              {topic.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-3xl font-medium">
            {topic.summary}
          </p>
        </div>
      </div>

      {/* Main Section Tabs Navigation Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 border border-slate-200/90 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          <button
            id="tab-btn-learn"
            onClick={() => setActiveTab('learn')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'learn'
                ? `${topic.themeColor.primary} text-white shadow-md shadow-blue-500/25 scale-[1.02]`
                : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 hover:-translate-y-0.5'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>1. Learn</span>
          </button>

          <button
            id="tab-btn-vocab"
            onClick={() => setActiveTab('vocab')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'vocab'
                ? `${topic.themeColor.primary} text-white shadow-md shadow-indigo-500/25 scale-[1.02]`
                : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 hover:-translate-y-0.5'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>2. Key Vocabulary</span>
          </button>

          <button
            id="tab-btn-examples"
            onClick={() => setActiveTab('examples')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'examples'
                ? `${topic.themeColor.primary} text-white shadow-md shadow-purple-500/25 scale-[1.02]`
                : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50/70 hover:-translate-y-0.5'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>3. Worked Examples</span>
          </button>

          <button
            id="tab-btn-watch"
            onClick={() => setActiveTab('watch')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'watch'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 scale-[1.02]'
                : 'text-rose-700 bg-rose-50/90 hover:bg-rose-100 border border-rose-200/60 hover:-translate-y-0.5'
            }`}
          >
            <Play className="w-4 h-4 shrink-0 fill-current" />
            <span>4. Watch Lesson</span>
          </button>

          <button
            id="tab-btn-practice"
            onClick={() => setActiveTab('practice')}
            className={`col-span-2 sm:col-span-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                : 'text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100 border border-emerald-200/60 hover:-translate-y-0.5'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <span>5. Practice App</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: LEARN */}
      {activeTab === 'learn' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Concept Overview Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Conceptual Overview
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Understanding {topic.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {topic.learnOverview}
            </p>
          </div>

          {/* Interactive Visualizer Canvas (Specific to the topic) */}
          {isTransformations ? (
            <TransformationsVisualizer />
          ) : (
            <ProportionalVisualizer />
          )}

          {/* Core Concept Breakdown Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Core Rules & Concept Breakdown
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {topic.concepts.length} key concepts in this unit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {topic.concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    <h4 className="text-base font-extrabold text-slate-900">
                      {concept.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {concept.summary}
                    </p>

                    {concept.ruleFormula && (
                      <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Algebraic Rule / Formula:
                        </div>
                        <div className="font-bold text-sm">{concept.ruleFormula}</div>
                        {concept.ruleExplanation && (
                          <div className="text-slate-300 text-xs mt-1 font-sans">
                            {concept.ruleExplanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Takeaways:
                    </span>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Next Step Callout */}
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-indigo-950 text-base">
                Ready to review key math terminology?
              </h4>
              <p className="text-xs text-indigo-800">
                Explore the definitions, prime notations, formulas, and memory tips for this unit.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('vocab')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Go to Vocabulary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: KEY VOCABULARY */}
      {activeTab === 'vocab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" /> Unit Glossary
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Key Vocabulary & Notation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Clear definitions, notation guides, and memory tricks for middle school mathematicians.
              </p>
            </div>

            {/* Search filter for vocab */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search vocabulary words..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredVocab.map((item, index) => (
              <div
                key={index}
                id={`vocab-item-${index}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {item.term}
                    </h4>
                    {item.category && (
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {item.definition}
                  </p>

                  {item.symbolOrFormula && (
                    <div className="bg-slate-900 text-amber-300 p-2.5 rounded-xl font-mono text-xs border border-slate-800">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                        Math Notation / Formula:
                      </span>
                      <span className="font-bold text-sm">{item.symbolOrFormula}</span>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <strong className="text-slate-900">Example: </strong>
                    {item.example}
                  </div>
                </div>

                {item.tip && (
                  <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Memory Trick: </strong>
                      {item.tip}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-base">
                Ready to see math concepts in action?
              </h4>
              <p className="text-xs text-slate-600">
                Check out the step-by-step worked examples solved with clear strategies.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('examples')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>See Worked Examples</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: WORKED EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Example Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {topic.workedExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExampleIndex(idx)}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedExampleIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Example {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Worked Example Card */}
          {topic.workedExamples[selectedExampleIndex] && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Step-by-Step Problem Solution
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {topic.workedExamples[selectedExampleIndex].title}
                </h3>
              </div>

              {/* Problem Statement Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Problem Statement:
                </div>
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                  {topic.workedExamples[selectedExampleIndex].problem}
                </p>
                {topic.workedExamples[selectedExampleIndex].given && (
                  <div className="pt-2 text-xs font-mono text-indigo-300">
                    Given: {topic.workedExamples[selectedExampleIndex].given}
                  </div>
                )}
              </div>

              {/* Strategy */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Solving Strategy:</strong>
                  <span>{topic.workedExamples[selectedExampleIndex].strategy}</span>
                </div>
              </div>

              {/* Step by Step Breakdown */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Step-by-Step Execution:
                </h4>

                <div className="space-y-3">
                  {topic.workedExamples[selectedExampleIndex].steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                          {step.stepNumber}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm">
                          {step.title}
                        </h5>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 ml-8">
                        {step.explanation}
                      </p>

                      {step.mathDetail && (
                        <pre className="ml-8 p-3 rounded-lg bg-white border border-slate-200 font-mono text-xs text-indigo-950 overflow-x-auto whitespace-pre-wrap">
                          {step.mathDetail}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block font-bold mb-0.5">Final Solution & Answer:</strong>
                  <span>{topic.workedExamples[selectedExampleIndex].conclusion}</span>
                </div>
              </div>

              {/* Teacher Tip & Common Mistake Alert */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {topic.workedExamples[selectedExampleIndex].teacherTip && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Teacher Insight: </strong>
                      {topic.workedExamples[selectedExampleIndex].teacherTip}
                    </div>
                  </div>
                )}

                {topic.workedExamples[selectedExampleIndex].commonMistake && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Common Student Mistake: </strong>
                      {topic.workedExamples[selectedExampleIndex].commonMistake}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: WATCH THE LESSON */}
      {activeTab === 'watch' && (
        <div className="animate-fadeIn">
          <VideoLessonPlayer video={topic.videoLesson} topicTitle={topic.title} />
        </div>
      )}

      {/* TAB CONTENT 5: PRACTICE APP */}
      {activeTab === 'practice' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Large Practice App Launch Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-400" />
                Interactive Cloud Run Math Simulator
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {topic.practiceApp.appTitle}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {topic.practiceApp.appDescription}
                </p>
              </div>

              {/* Key Features of the simulator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {topic.practiceApp.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Large Practice Launch Button with Placeholder URL */}
              <div className="pt-4 space-y-3">
                <a
                  id="large-practice-app-button"
                  href={topic.practiceApp.placeholderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <Activity className="w-6 h-6" />
                  <span>{topic.practiceApp.buttonText}</span>
                  <ExternalLink className="w-5 h-5 opacity-80" />
                </a>

                {/* Clearly Labeled Placeholder URL Notice */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-slate-400 pt-1">
                  <span className="font-semibold text-slate-300">Placeholder Target:</span>
                  <code className="bg-slate-800/90 text-emerald-300 px-2.5 py-1 rounded-lg font-mono text-[11px] border border-slate-700">
                    {topic.practiceApp.placeholderUrl}
                  </code>
                  <button
                    onClick={handleCopyPlaceholderUrl}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* In-Portal Quick Practice Quiz */}
          <PracticeQuiz
            questions={topic.practiceApp.quizQuestions}
            topicTitle={topic.shortTitle}
          />
        </div>
      )}
    </div>
  );
};
