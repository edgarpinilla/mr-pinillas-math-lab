import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Play,
  Activity,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Grid,
  TrendingUp,
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { TopicData } from '../types';

interface HomePageProps {
  onSelectTopic: (topicId: string, defaultTab?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'Grade 8' | 'Grade 7'>('all');

  const filteredTopics = TOPICS_DATA.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.concepts.some((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      topic.vocabulary.some((v) => v.term.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGrade =
      selectedGrade === 'all' || topic.gradeLevel.toLowerCase().includes(selectedGrade.toLowerCase());

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white shadow-2xl border border-blue-500/30 p-6 sm:p-10 lg:p-12">
        {/* Subtle Math Background Grid / Formula Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Decorative Math Symbols & Coordinate Watermarks */}
        <div className="absolute -right-6 -bottom-6 opacity-10 text-9xl font-serif font-black select-none pointer-events-none text-white tracking-tighter">
          k = y/x
        </div>
        <div className="absolute right-1/3 -top-6 opacity-10 text-7xl font-serif select-none pointer-events-none text-sky-200">
          (x, y) → (x', y')
        </div>
        <div className="absolute left-2/3 bottom-4 opacity-10 text-6xl font-mono select-none pointer-events-none text-amber-200">
          y = mx + b
        </div>

        {/* Ambient Top Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/25 text-blue-100 border border-blue-400/40 text-xs sm:text-sm font-black tracking-wide backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Middle School Mathematics Portal</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
              Mr. Pinilla’s Math Lab
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xl sm:text-2xl lg:text-3xl font-black tracking-wide">
              <span className="text-sky-300 drop-shadow-xs">Learn.</span>
              <span className="text-rose-300 drop-shadow-xs">Watch.</span>
              <span className="text-emerald-300 drop-shadow-xs">Practice.</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed font-medium max-w-2xl">
            Explore visual explanations, watch step-by-step video lessons, and master middle school math with interactive practice apps.
          </p>

          {/* Quick 3 Pillars Interactive Highlights with Coordinated Accents */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
            {/* 1. Learn (Sky/Blue Accent) */}
            <div className="bg-sky-950/40 hover:bg-sky-900/50 backdrop-blur-md border border-sky-400/30 hover:border-sky-400/60 p-4 sm:p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/20 group cursor-default">
              <div className="text-sky-300 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-sky-500/30 border border-sky-400/40 flex items-center justify-center text-sky-200 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>1. Learn</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                Step-by-step rules, clear formulas, and key vocabulary terms.
              </p>
            </div>

            {/* 2. Watch (Coral/Rose Accent) */}
            <div className="bg-rose-950/40 hover:bg-rose-900/50 backdrop-blur-md border border-rose-400/30 hover:border-rose-400/60 p-4 sm:p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/20 group cursor-default">
              <div className="text-rose-300 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-rose-200 group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span>2. Watch</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                Teacher-created YouTube video walkthroughs and worked examples.
              </p>
            </div>

            {/* 3. Practice (Emerald/Teal Accent) */}
            <div className="bg-emerald-950/40 hover:bg-emerald-900/50 backdrop-blur-md border border-emerald-400/30 hover:border-emerald-400/60 p-4 sm:p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 group cursor-default">
              <div className="text-emerald-300 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-200 group-hover:scale-110 transition-transform">
                  <Activity className="w-4 h-4" />
                </div>
                <span>3. Practice</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                Interactive coordinate visualizers and instant self-check quizzes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <input
              id="topic-search-input"
              type="text"
              placeholder="Search concepts (e.g., dilation, unit rate, table, slope)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-500 hover:text-slate-900 bg-slate-200/80 hover:bg-slate-300 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Grade Quick Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider hidden sm:inline">
              Filter:
            </span>
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                selectedGrade === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:-translate-y-0.5'
              }`}
            >
              All Topics ({TOPICS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedGrade('Grade 8')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                selectedGrade === 'Grade 8'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:-translate-y-0.5'
              }`}
            >
              Grade 8
            </button>
            <button
              onClick={() => setSelectedGrade('Grade 7')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                selectedGrade === 'Grade 7'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:-translate-y-0.5'
              }`}
            >
              Grade 7
            </button>
          </div>
        </div>
      </section>

      {/* Main Topic Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Math Units & Learning Modules</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Select a module to access visual notes, video walkthroughs, and practice applications.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-2xs">
            {filteredTopics.length} available
          </span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching math topics found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the filter to see all units in Mr. Pinilla’s Math Lab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGrade('all');
              }}
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onSelectTopic={onSelectTopic} />
            ))}
          </div>
        )}
      </section>

      {/* Growing Portal Banner / Extensibility Notice */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-200 p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Growing Learning Portal
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white">
            More Middle School Units Coming Throughout the Year
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mr. Pinilla’s Math Lab is built with a flexible curriculum framework. Look out for upcoming modules including Linear Equations (y = mx + b), The Pythagorean Theorem, Angles & Triangles, and Probability!
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap gap-2 text-xs font-bold relative z-10">
          <span className="px-3.5 py-2 rounded-xl bg-slate-800/90 text-blue-200 border border-blue-500/30 shadow-sm">
            📐 Linear Equations (Next)
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-slate-800/90 text-amber-200 border border-amber-500/30 shadow-sm">
            🔺 Pythagorean Theorem
          </span>
        </div>
      </section>
    </div>
  );
};

// Sub-Component: Individual Topic Card
interface TopicCardProps {
  topic: TopicData;
  onSelectTopic: (topicId: string, defaultTab?: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelectTopic }) => {
  const isGeometry = topic.id === 'geometric-transformations';

  return (
    <div
      id={`topic-card-${topic.id}`}
      className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Top Banner Accent */}
      <div className={`p-6 sm:p-8 bg-gradient-to-r ${topic.themeColor.gradient} text-white relative overflow-hidden`}>
        {/* Subtle grid pattern in card banner */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="absolute right-3 -bottom-4 opacity-15 text-8xl font-serif select-none pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500">
          {isGeometry ? '△' : 'k'}
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs">
              Unit {topic.number}
            </span>
            <span className="text-xs font-bold text-white bg-black/25 px-3 py-1 rounded-full backdrop-blur-xs">
              {topic.gradeLevel}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug tracking-tight">
            {topic.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 font-semibold">
            {topic.subtitle}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {topic.summary}
        </p>

        {/* Section Highlights Grid with Clear Color Coordination */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-sky-50/90 border border-sky-100 flex items-center gap-2.5 transition-colors group-hover:bg-sky-50">
            <div className="w-7 h-7 rounded-xl bg-sky-600/10 flex items-center justify-center text-sky-600 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">{topic.concepts.length} Core Concepts</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-center gap-2.5 transition-colors group-hover:bg-indigo-50">
            <div className="w-7 h-7 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">{topic.vocabulary.length} Vocab Terms</span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/90 border border-rose-100 flex items-center gap-2.5 transition-colors group-hover:bg-rose-50">
            <div className="w-7 h-7 rounded-xl bg-rose-600/10 flex items-center justify-center text-rose-600 shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-slate-800">Video Lesson Embed</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-100 flex items-center gap-2.5 transition-colors group-hover:bg-emerald-50">
            <div className="w-7 h-7 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">Practice Simulator</span>
          </div>
        </div>

        {/* Action Buttons with distinct accents, cursor pointer, and hover feedback */}
        <div className="pt-2 space-y-3">
          {/* Primary View Topic Guide Button */}
          <button
            id={`btn-open-topic-${topic.id}`}
            onClick={() => onSelectTopic(topic.id, 'learn')}
            className={`w-full py-4 px-6 rounded-2xl text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-98 cursor-pointer ${topic.themeColor.primary} ${topic.themeColor.primaryHover}`}
          >
            <span>Start Topic Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-200" />
          </button>

          {/* Quick Sub-Links for Vocab, Watch & Practice */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => onSelectTopic(topic.id, 'vocab')}
              className="py-2.5 px-2 text-xs font-extrabold rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-700 transition-all text-center hover:scale-[1.02] active:scale-98 cursor-pointer hover:shadow-xs"
            >
              Vocabulary
            </button>
            <button
              onClick={() => onSelectTopic(topic.id, 'watch')}
              className="py-2.5 px-2 text-xs font-extrabold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 border border-rose-200/60 cursor-pointer hover:shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              Watch
            </button>
            <button
              onClick={() => onSelectTopic(topic.id, 'practice')}
              className="py-2.5 px-2 text-xs font-extrabold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 border border-emerald-200/60 cursor-pointer hover:shadow-xs"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
