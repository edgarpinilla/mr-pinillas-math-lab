import React from 'react';
import { Home, Compass, BookOpen, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';

interface HeaderProps {
  currentTopicId?: string | null;
  onNavigateHome: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTopicId, onNavigateHome, onSelectTopic }) => {
  const currentTopic = TOPICS_DATA.find((t) => t.id === currentTopicId);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <button
            id="header-brand-button"
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  Mr. Pinilla’s Math Lab
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Middle School Math
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                Learn. Watch. Practice.
              </p>
            </div>
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Always visible Home button */}
            <button
              id="header-home-button"
              onClick={onNavigateHome}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                !currentTopicId
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* Quick Topic Selector Dropdown / Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
              {TOPICS_DATA.map((t) => (
                <button
                  key={t.id}
                  id={`header-nav-topic-${t.id}`}
                  onClick={() => onSelectTopic(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    currentTopicId === t.id
                      ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Topic {t.number}: {t.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Context Sub-Bar (When viewing a specific topic) */}
        {currentTopic && (
          <div className="py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onNavigateHome}
                className="hover:text-indigo-600 font-medium"
              >
                Math Lab Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900 truncate">
                Topic {currentTopic.number}: {currentTopic.title}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                {currentTopic.gradeLevel}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
