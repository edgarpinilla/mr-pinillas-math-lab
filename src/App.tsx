import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';
import { TOPICS_DATA } from './data/topicsData';
import { SectionTab } from './types';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SectionTab>('learn');

  const handleNavigateHome = () => {
    setSelectedTopicId(null);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string, defaultTab: string = 'learn') => {
    setSelectedTopicId(topicId);
    setActiveTab((defaultTab as SectionTab) || 'learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTopic = TOPICS_DATA.find((t) => t.id === selectedTopicId);

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden math-grid-bg">
      {/* Soft Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulseGlow" />
      <div className="fixed top-1/3 right-10 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Main Navigation Header */}
      <Header
        currentTopicId={selectedTopicId}
        onNavigateHome={handleNavigateHome}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-10">
        {currentTopic ? (
          <TopicPage
            topic={currentTopic}
            initialTab={activeTab}
            onNavigateHome={handleNavigateHome}
            onSelectTopic={handleSelectTopic}
          />
        ) : (
          <HomePage onSelectTopic={handleSelectTopic} />
        )}
      </main>

      {/* Global Student Safe Footer */}
      <Footer
        onSelectTopic={handleSelectTopic}
        onNavigateHome={handleNavigateHome}
      />
    </div>
  );
}
