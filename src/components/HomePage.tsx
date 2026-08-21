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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-850 to-slate-900 text-white shadow-xl border border-indigo-800/40 p-6 sm:p-10 lg:p-12">
        {/* Subtle Math Background Grid / Formula Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Decorative Math Symbols in background */}
        <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl font-serif font-black select-none pointer-events-none text-white">
          k = y/x
        </div>
        <div className="absolute right-1/4 -top-8 opacity-10 text-8xl font-serif select-none pointer-events-none text-white">
          (x,y)
        </div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Middle School Mathematics Portal</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Mr. Pinilla’s Math Lab
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-indigo-200 tracking-wide">
              Learn. Watch. Practice.
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Choose a math topic below to review the concept, watch a lesson, and practice with an interactive activity.
          </p>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 text-center">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-indigo-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 1. Learn
              </div>
              <div className="text-slate-300 text-[11px] sm:text-xs mt-0.5">Rules & Vocab</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-red-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1">
                <Play className="w-3.5 h-3.5" /> 2. Watch
              </div>
              <div className="text-slate-300 text-[11px] sm:text-xs mt-0.5">Video Walkthroughs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-3 rounded-2xl">
              <div className="text-emerald-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1">
                <Activity className="w-3.5 h-3.5" /> 3. Practice
              </div>
              <div className="text-slate-300 text-[11px] sm:text-xs mt-0.5">Interactive Apps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="topic-search-input"
              type="text"
              placeholder="Search concepts (e.g., dilation, constant of proportionality, table)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Grade Quick Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Filter:
            </span>
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics ({TOPICS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedGrade('Grade 8')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === 'Grade 8'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Grade 8
            </button>
            <button
              onClick={() => setSelectedGrade('Grade 7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === 'Grade 7'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Math Units & Topic Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select a module to access the complete learning guide, video lesson, and interactive practice app.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {filteredTopics.length} available
          </span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching math topics found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the filter to see all units in Mr. Pinilla’s Math Lab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGrade('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700"
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
      <section className="rounded-2xl bg-slate-900 text-slate-200 p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Growing Learning Portal
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            More Middle School Units Coming Throughout the Year
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Mr. Pinilla’s Math Lab is built with a flexible curriculum framework. Look out for upcoming modules including Linear Equations (y = mx + b), The Pythagorean Theorem, Angles & Triangles, and Probability!
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
            📐 Linear Equations (Next)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
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
      className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group hover:border-indigo-400"
    >
      {/* Top Banner Accent */}
      <div className={`p-6 sm:p-7 bg-gradient-to-r ${topic.themeColor.gradient} text-white relative overflow-hidden`}>
        <div className="absolute right-3 -bottom-4 opacity-15 text-7xl font-serif select-none pointer-events-none">
          {isGeometry ? '△' : 'k'}
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
            Unit {topic.number}
          </span>
          <span className="text-xs font-medium text-white/90 bg-black/20 px-2.5 py-0.5 rounded-md">
            {topic.gradeLevel}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/85 font-medium mt-1">
          {topic.subtitle}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          {topic.summary}
        </p>

        {/* Section Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-700">{topic.concepts.length} Core Concepts</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-700">{topic.vocabulary.length} Vocab Terms</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2">
            <Play className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold text-slate-700">Video Lesson Embed</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-700">Practice Simulator</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          {/* Primary View Topic Guide Button */}
          <button
            id={`btn-open-topic-${topic.id}`}
            onClick={() => onSelectTopic(topic.id, 'learn')}
            className={`w-full py-3.5 px-5 rounded-xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${topic.themeColor.primary} ${topic.themeColor.primaryHover}`}
          >
            <span>Start Topic Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Sub-Links for Watch & Practice */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onSelectTopic(topic.id, 'vocab')}
              className="py-2 px-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-center"
            >
              Vocabulary
            </button>
            <button
              onClick={() => onSelectTopic(topic.id, 'watch')}
              className="py-2 px-2 text-xs font-bold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors text-center flex items-center justify-center gap-1"
            >
              <Play className="w-3 h-3 fill-red-600 text-red-600" />
              Watch
            </button>
            <button
              onClick={() => onSelectTopic(topic.id, 'practice')}
              className="py-2 px-2 text-xs font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors text-center flex items-center justify-center gap-1"
            >
              <Activity className="w-3 h-3 text-emerald-600" />
              Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
