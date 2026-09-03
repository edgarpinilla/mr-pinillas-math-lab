export type SectionTab = 'learn' | 'vocab' | 'examples' | 'watch' | 'practice';

export interface VocabularyItem {
  term: string;
  definition: string;
  symbolOrFormula?: string;
  example: string;
  tip?: string;
  category?: string;
}

export interface ExampleStep {
  stepNumber: number;
  title: string;
  explanation: string;
  mathDetail?: string;
  visualNote?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  problem: string;
  given?: string;
  strategy: string;
  steps: ExampleStep[];
  conclusion: string;
  teacherTip?: string;
  commonMistake?: string;
}

export interface VideoLessonItem {
  id: string;
  title: string;
  subtitle?: string;
  youtubeEmbedUrl: string;
  youtubeWatchUrl: string;
  description?: string;
  badge?: string;
}

export interface VideoLessonInfo {
  title: string;
  subtitle: string;
  duration?: string;
  instructor: string;
  youtubeEmbedUrl?: string;
  youtubeWatchUrl?: string;
  youtubeEmbedUrlPlaceholder?: string;
  youtubeWatchUrlPlaceholder?: string;
  description: string;
  chapters?: { time: string; title: string }[];
  keyTakeaways: string[];
  lessons?: VideoLessonItem[];
}

export interface QuestionTable {
  headers: string[];
  rows: (string | number)[][];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  context?: string;
  category?:
    | 'proportional'
    | 'non-proportional'
    | 'mixed'
    | 'transformations'
    | 'slope-formula'
    | 'rise-run'
    | 'special-slopes'
    | 'slope-intercept'
    | 'tables-coordinates'
    | 'real-world'
    | string;
  tableData?: QuestionTable;
  diagramSvgType?: 'grid' | 'table' | 'equation' | 'graph';
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface PracticeQuestionBanks {
  proportional?: PracticeQuestion[];
  nonProportional?: PracticeQuestion[];
}

export interface PracticeAppInfo {
  buttonText: string;
  appTitle: string;
  placeholderUrl: string;
  appDescription: string;
  features: string[];
  estimatedTime: string;
  quizQuestions: PracticeQuestion[];
  quizBanks?: PracticeQuestionBanks;
}

export interface LearnConcept {
  id: string;
  title: string;
  summary: string;
  ruleFormula?: string;
  ruleExplanation?: string;
  keyPoints: string[];
  visualType?: 'transformation-grid' | 'proportional-comparison' | 'rule-cards';
}

export interface TopicData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  gradeLevel: string;
  standards: string;
  unit: string;
  summary: string;
  themeColor: {
    primary: string;
    primaryHover: string;
    lightBg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  };
  learnOverview: string;
  concepts: LearnConcept[];
  vocabulary: VocabularyItem[];
  workedExamples: WorkedExample[];
  videoLesson: VideoLessonInfo;
  practiceApp: PracticeAppInfo;
}
