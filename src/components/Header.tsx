import React from 'react';
import { Home, Compass, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';

interface HeaderProps {
  currentTopicId?: string | null;
  onNavigateHome: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTopicId, onNavigateHome, onSelectTopic }) => {
  const currentTopic = TOPICS_DATA.find((t) => t.id === currentTopicId);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo / Brand with improved breathing room and clean alignment */}
          <button
            id="header-brand-button"
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl p-1.5 transition-all duration-200 hover:bg-slate-50/80 active:scale-98 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/35 transition-all duration-300">
              <Compass className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  Mr. Pinilla’s Math Lab
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
                  Middle School Math
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold tracking-wide flex items-center gap-1.5">
                <span className="text-blue-600 font-bold">Learn.</span>
                <span className="text-rose-500 font-bold">Watch.</span>
                <span className="text-emerald-600 font-bold">Practice.</span>
              </p>
            </div>
          </button>

          {/* Top Navigation Items with increased spacing, prominent style, and polished hover states */}
          <nav className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="Main Navigation">
            {/* Home Navigation Button */}
            <button
              id="header-home-button"
              onClick={onNavigateHome}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                !currentTopicId
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 scale-[1.02]'
                  : 'bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 hover:-translate-y-0.5 border border-slate-200/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* Topic Navigation Buttons with consistent spacing & distinct active/hover states */}
            <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 border-l border-slate-200/80">
              {TOPICS_DATA.map((t) => {
                const isActive = currentTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    id={`header-nav-topic-${t.id}`}
                    onClick={() => onSelectTopic(t.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-blue-100/95 text-blue-900 border-2 border-blue-400/90 shadow-sm shadow-blue-500/15 scale-[1.02]'
                        : 'bg-white hover:bg-blue-50/70 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10 hover:-translate-y-0.5'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {t.number}
                    </span>
                    <span className="hidden sm:inline">{t.shortTitle}</span>
                    <span className="sm:hidden">Unit {t.number}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Topic Context Sub-Bar (When viewing a specific topic) */}
        {currentTopic && (
          <div className="py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onNavigateHome}
                className="hover:text-blue-600 font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                Math Lab Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-black text-slate-900 truncate">
                Topic {currentTopic.number}: {currentTopic.title}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <span className="font-extrabold text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                {currentTopic.gradeLevel}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

