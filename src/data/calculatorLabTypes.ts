export type CalculatorLessonStage = 'learn' | 'guided' | 'try' | 'check';

export interface GuidedStep {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetKey?: string;
  targetKeyAliases?: string[];
  targetKeyDisplayName?: string;
  initialScreen?: {
    screenLine1?: string;
    screenLine2?: string;
    screenLine3?: string;
    screenOff?: boolean;
  };
  successScreen?: {
    screenLine1?: string;
    screenLine2?: string;
    screenLine3?: string;
  };
}

export interface CalculatorKeyHighlight {
  label: string;
  category: 'control' | 'operator' | 'number' | 'special' | 'menu';
  purpose: string;
  keyRow?: number;
  keyCol?: number;
}

export interface CalculatorLessonModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  badge?: string;
  
  // 1. LEARN
  learn: {
    summary: string;
    keyConcept: string;
    tiNspireProcedure: string[];
    visualDisplay: {
      screenLine1?: string;
      screenLine2?: string;
      screenLine3?: string;
      highlightedKeys: string[];
      notes?: string;
    };
    specialWarning?: string;
    mathRule?: string;
  };

  // 2. GUIDED PRACTICE
  guidedPractice: {
    title: string;
    scenario: string;
    steps: GuidedStep[];
  };

  // 3. TRY IT YOURSELF (Physical TI-Nspire task)
  tryItYourself: {
    taskPrompt: string;
    targetExpression: string;
    studentInputPrompt: string;
    correctExpectedResult: string;
    acceptedAlternates?: string[];
    hint: string;
    successMessage: string;
    solutionSteps: string[];
  };

  // 4. CHECK YOUR UNDERSTANDING
  checkUnderstanding: {
    conceptualQuestion: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    misconceptionTip: string;
  };
}

export interface CalculatorChallengeQuestion {
  id: string;
  questionNumber: number;
  category: string;
  prompt: string;
  expression: string;
  acceptedAnswers: string[];
  displayFormattedAnswer: string;
  hint: string;
  explanation: string;
  calculatorTip: string;
}

export interface CalculatorLevel {
  id: number;
  title: string;
  subtitle: string;
  status: 'active' | 'coming-soon';
  description: string;
  modulesCount: number;
}
