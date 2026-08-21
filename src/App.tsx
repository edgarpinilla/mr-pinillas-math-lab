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
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        currentTopicId={selectedTopicId}
        onNavigateHome={handleNavigateHome}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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
