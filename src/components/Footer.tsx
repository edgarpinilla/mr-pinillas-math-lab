import React from 'react';
import { Compass, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';

interface FooterProps {
  onSelectTopic: (topicId: string) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTopic, onNavigateHome }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Welcome */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-black text-white text-xl tracking-tight">
                Mr. Pinilla’s Math Lab
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              A growing middle school mathematics portal designed to help students master core mathematical concepts through clear visual guides, video explanations, worked examples, and interactive practice apps.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold">
              <span className="text-blue-400">Learn.</span>
              <span className="text-rose-400">Watch.</span>
              <span className="text-emerald-400">Practice.</span>
            </div>
          </div>

          {/* Col 2: Topics Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Current Math Topics
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-blue-400 transition-colors text-slate-400 font-semibold"
                >
                  Portal Overview (Home)
                </button>
              </li>
              {TOPICS_DATA.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="hover:text-blue-400 transition-colors text-slate-400 font-semibold text-left"
                  >
                    Unit {t.number}: {t.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student Privacy & Chromebook Policy */}
          <div className="md:col-span-4 space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 100% Student-Safe & Private
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              <strong className="text-white">Privacy Guarantee:</strong> This website is entirely client-side. No sign-in, usernames, passwords, emails, or personal student information (PII) are ever collected or stored.
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Optimized for classroom Chromebooks, laptops, and tablet displays.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Mr. Pinilla’s Math Lab. All educational materials created for Middle School Mathematics.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span>Built with dedication for math learners</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
