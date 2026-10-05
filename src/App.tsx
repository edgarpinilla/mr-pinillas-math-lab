import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';
import { CalculatorLabHome } from './components/calculator/CalculatorLabHome';
import { TeacherAccessPortal } from './components/TeacherAccessPortal';
import { TeacherPinModal, TEACHER_SESSION_KEY } from './components/TeacherPinModal';
import { TOPICS_DATA } from './data/topicsData';
import { SectionTab } from './types';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isCalculatorLabOpen, setIsCalculatorLabOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<SectionTab>('learn');
  const [isPrintCenterOpen, setIsPrintCenterOpen] = useState<boolean>(false);
  const [printCenterTopicId, setPrintCenterTopicId] = useState<string | null>(null);
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TEACHER_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [isTutorialActive, setIsTutorialActive] = useState<boolean>(true);

  const handleNavigateHome = () => {
    setSelectedTopicId(null);
    setIsCalculatorLabOpen(false);
    setActiveTab('learn');
    setIsPrintCenterOpen(false);
    setShowPinModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCalculatorLab = () => {
    setSelectedTopicId(null);
    setIsCalculatorLabOpen(true);
    setIsPrintCenterOpen(false);
    setShowPinModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string, defaultTab: string = 'learn') => {
    setSelectedTopicId(topicId);
    setIsCalculatorLabOpen(false);
    setActiveTab((defaultTab as SectionTab) || 'learn');
    setIsPrintCenterOpen(false);
    setShowPinModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrintCenter = (topicId?: string) => {
    const targetId = topicId || selectedTopicId || TOPICS_DATA[0].id;
    setPrintCenterTopicId(targetId);

    if (isTeacherUnlocked) {
      setIsPrintCenterOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowPinModal(true);
    }
  };

  const handlePinSuccess = () => {
    setIsTeacherUnlocked(true);
    setShowPinModal(false);
    setIsPrintCenterOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLockTeacherAccess = () => {
    try {
      sessionStorage.removeItem(TEACHER_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsTeacherUnlocked(false);
    setIsPrintCenterOpen(false);
    setShowPinModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePrintCenter = () => {
    setIsPrintCenterOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Teacher Access is open, render Teacher Access Portal (Print Center + STAAR Analysis)
  if (isPrintCenterOpen) {
    return (
      <TeacherAccessPortal
        initialTopicId={printCenterTopicId || selectedTopicId || TOPICS_DATA[0].id}
        onClose={handleClosePrintCenter}
        onSelectTopic={(topicId) => {
          setSelectedTopicId(topicId);
          setPrintCenterTopicId(topicId);
        }}
        onLock={handleLockTeacherAccess}
      />
    );
  }

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
        isCalculatorLabOpen={isCalculatorLabOpen}
        onNavigateHome={handleNavigateHome}
        onSelectTopic={handleSelectTopic}
        onOpenCalculatorLab={handleOpenCalculatorLab}
        onOpenPrintCenter={() => handleOpenPrintCenter()}
      />

      {/* Main Page Content */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 relative z-10 ${
        isCalculatorLabOpen && isTutorialActive ? 'pt-1 pb-1 sm:pt-1.5' : 'pt-6 sm:pt-8'
      }`}>
        {isCalculatorLabOpen ? (
          <CalculatorLabHome
            onNavigateHome={handleNavigateHome}
            onSelectTopic={handleSelectTopic}
            onTutorialActiveChange={setIsTutorialActive}
          />
        ) : currentTopic ? (
          <TopicPage
            topic={currentTopic}
            initialTab={activeTab}
            onNavigateHome={handleNavigateHome}
            onSelectTopic={handleSelectTopic}
            onOpenPrintCenter={handleOpenPrintCenter}
          />
        ) : (
          <HomePage
            onSelectTopic={handleSelectTopic}
            onOpenCalculatorLab={handleOpenCalculatorLab}
          />
        )}
      </main>

      {/* Global Student Safe Footer */}
      {(!isCalculatorLabOpen || !isTutorialActive) && (
        <Footer
          onSelectTopic={handleSelectTopic}
          onNavigateHome={handleNavigateHome}
          onOpenCalculatorLab={handleOpenCalculatorLab}
          onOpenPrintCenter={() => handleOpenPrintCenter()}
        />
      )}

      {/* Teacher PIN Access Modal */}
      <TeacherPinModal
        isOpen={showPinModal}
        onSuccess={handlePinSuccess}
        onClose={() => setShowPinModal(false)}
      />
    </div>
  );
}
