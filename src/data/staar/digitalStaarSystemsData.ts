// src/data/staar/digitalStaarSystemsData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 4: Systems of Linear Equations (TEKS 8.9A)
// 100% Client-side local data. Zero runtime API calls.

export type Unit4InteractionType =
  | 'graph-hot-spot'
  | 'drag-drop-system'
  | 'inline-choice'
  | 'numeric-entry'
  | 'multiple-select'
  | 'classification'
  | 'table-analysis'
  | 'interactive-graphing'
  | 'matching'
  | 'error-analysis'
  | 'multi-part'
  | 'system-completion';

export interface BaseQuestionUnit4 {
  id: string;
  number: number;
  type: Unit4InteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  instructionalHint?: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Graph Hot Spot (Intersection Point Selection)
export interface HotSpotCandidateQ1 {
  id: string;
  label: string;
  x: number;
  y: number;
  isCorrect: boolean;
  misconception: string;
}

export interface Q1GraphHotSpotSystems extends BaseQuestionUnit4 {
  type: 'graph-hot-spot';
  equation1: string;
  equation2: string;
  line1Points: [number, number][];
  line2Points: [number, number][];
  points: HotSpotCandidateQ1[];
}

// Q2: Drag & Drop System Modeling
export interface Q2DragDropSystem extends BaseQuestionUnit4 {
  type: 'drag-drop-system';
  scenario: string;
  eq1Label: string;
  eq2Label: string;
  availableTiles: string[];
  correctEq1: string;
  correctEq2: string;
  followUpPrompt: string;
  followUpOptions: string[];
  correctFollowUp: string;
}

// Q3: Inline Choice Sentence Completion
export interface Q3InlineChoiceSystems extends BaseQuestionUnit4 {
  type: 'inline-choice';
  scenario: string;
  sentenceBefore1: string;
  dropdown1Options: string[];
  correctDropdown1: string;
  sentenceBefore2: string;
  dropdown2Options: string[];
  correctDropdown2: string;
  sentenceBefore3: string;
  dropdown3Options: string[];
  correctDropdown3: string;
  sentenceAfter3: string;
}

// Q4: Numeric Entry (Gridded Coordinates)
export interface Q4NumericEntrySystems extends BaseQuestionUnit4 {
  type: 'numeric-entry';
  linePDescription: string;
  lineQDescription: string;
  gridSvgData: {
    lineP: { x1: number; y1: number; x2: number; y2: number };
    lineQ: { x1: number; y1: number; x2: number; y2: number };
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  correctX: number;
  correctY: number;
  acceptedX: string[];
  acceptedY: string[];
}

// Q5: Multiple-Select (Select All That Apply)
export interface MultiSelectOptionQ5 {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Q5MultipleSelectSystems extends BaseQuestionUnit4 {
  type: 'multiple-select';
  scenario: string;
  options: MultiSelectOptionQ5[];
}

// Q6: Classification / Card Sorting
export interface ClassificationCardQ6 {
  id: string;
  text: string;
  detail: string;
  correctCategory: 'one-solution' | 'no-solution' | 'inf-solutions';
}

export interface Q6ClassificationSystems extends BaseQuestionUnit4 {
  type: 'classification';
  categories: {
    id: 'one-solution' | 'no-solution' | 'inf-solutions';
    label: string;
    sublabel: string;
  }[];
  cards: ClassificationCardQ6[];
}

// Q7: Table Analysis (Dual Function Comparison)
export interface TableRowQ7 {
  x: number;
  yMaya: number;
  yLiam: number;
  isSolution: boolean;
}

export interface Q7TableAnalysisSystems extends BaseQuestionUnit4 {
  type: 'table-analysis';
  scenario: string;
  rows: TableRowQ7[];
  correctX: number;
  followUpQuestion: string;
  followUpOptions: string[];
  correctFollowUp: string;
}

// Q8: Interactive Graphing
export interface Q8InteractiveGraphingSystems extends BaseQuestionUnit4 {
  type: 'interactive-graphing';
  line1Equation: string;
  line1Points: [number, number][];
  line2Equation: string;
  line2TargetSlope: number;
  line2TargetYIntercept: number;
  correctIntersection: [number, number];
  intersectionOptions: string[];
  correctIntersectionText: string;
}

// Q9: Matching Pairs
export interface MatchingPairQ9 {
  id: string;
  system: string;
  correctSolutionId: string;
}

export interface SolutionOptionQ9 {
  id: string;
  label: string;
  description: string;
}

export interface Q9MatchingSystems extends BaseQuestionUnit4 {
  type: 'matching';
  systems: MatchingPairQ9[];
  solutions: SolutionOptionQ9[];
}

// Q10: Diagnostic Error Analysis
export interface ErrorOptionQ10 {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Q10ErrorAnalysisSystems extends BaseQuestionUnit4 {
  type: 'error-analysis';
  studentClaim: string;
  equation1: string;
  equation2: string;
  options: ErrorOptionQ10[];
}

// Q11: Multi-Part Break-Even Problem
export interface Q11MultiPartSystems extends BaseQuestionUnit4 {
  type: 'multi-part';
  context: string;
  partAPrompt: string;
  partAOptions: string[];
  partACorrect: string;
  partBPrompt: string;
  partBOptions: string[];
  partBCorrect: string;
}

// Q12: System Completion
export interface Q12SystemCompletionSystems extends BaseQuestionUnit4 {
  type: 'system-completion';
  baseEquation: string;
  task1Prompt: string;
  task1SlopeOptions: string[];
  task1CorrectSlope: string;
  task1InterceptOptions: string[];
  task1CorrectIntercept: string;
  task2Prompt: string;
  task2Multiplier: number;
  task2CoefficientOptions: string[];
  task2CorrectCoefficient: string;
  task2ConstantOptions: string[];
  task2CorrectConstant: string;
  task3Prompt: string;
  task3SlopeOptions: string[];
  task3CorrectSlope: string;
}

export type Unit4DigitalStaarQuestion =
  | Q1GraphHotSpotSystems
  | Q2DragDropSystem
  | Q3InlineChoiceSystems
  | Q4NumericEntrySystems
  | Q5MultipleSelectSystems
  | Q6ClassificationSystems
  | Q7TableAnalysisSystems
  | Q8InteractiveGraphingSystems
  | Q9MatchingSystems
  | Q10ErrorAnalysisSystems
  | Q11MultiPartSystems
  | Q12SystemCompletionSystems;

export const UNIT_4_DIGITAL_STAAR_QUESTIONS: Unit4DigitalStaarQuestion[] = [
  // --------------------------------------------------------------------------
  // Q1: Graph Hot Spot (Intersection Point Selection)
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q1',
    number: 1,
    type: 'graph-hot-spot',
    typeLabel: 'Graph Hot Spot',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'The coordinate grid displays a system of two linear equations: Line 1 (y = 2x - 3) and Line 2 (y = -x + 6). Click or tap the point on the grid that represents the single solution (x, y) that simultaneously satisfies both linear equations.',
    equation1: 'y = 2x - 3',
    equation2: 'y = -x + 6',
    line1Points: [
      [0, -3],
      [1, -1],
      [2, 1],
      [3, 3],
      [4, 5],
    ],
    line2Points: [
      [0, 6],
      [2, 4],
      [3, 3],
      [4, 2],
      [6, 0],
    ],
    points: [
      {
        id: 'pt-A',
        label: '(3, 3)',
        x: 3,
        y: 3,
        isCorrect: true,
        misconception: 'Correct! The point of intersection (3, 3) satisfies both lines.',
      },
      {
        id: 'pt-B',
        label: '(0, 6)',
        x: 0,
        y: 6,
        isCorrect: false,
        misconception: 'This point is the y-intercept of Line 2, but it does not lie on Line 1.',
      },
      {
        id: 'pt-C',
        label: '(0, -3)',
        x: 0,
        y: -3,
        isCorrect: false,
        misconception: 'This point is the y-intercept of Line 1, but it does not lie on Line 2.',
      },
      {
        id: 'pt-D',
        label: '(6, 0)',
        x: 6,
        y: 0,
        isCorrect: false,
        misconception: 'This point is the x-intercept of Line 2, not a shared intersection.',
      },
      {
        id: 'pt-E',
        label: '(2, 1)',
        x: 2,
        y: 1,
        isCorrect: false,
        misconception: 'This point satisfies Line 1 (2(2)-3=1), but not Line 2 (-2+6=4 ≠ 1).',
      },
      {
        id: 'pt-F',
        label: '(4, 2)',
        x: 4,
        y: 2,
        isCorrect: false,
        misconception: 'This point satisfies Line 2 (-4+6=2), but not Line 1 (2(4)-3=5 ≠ 2).',
      },
    ],
    instructionalHint:
      'Remember: The solution to a system of linear equations graphed on a coordinate plane is the single point where the two lines intersect and share identical (x, y) coordinates.',
    solutionExplanation:
      'To find the solution graphically, locate the exact point where Line 1 (y = 2x - 3) and Line 2 (y = -x + 6) cross.\n\nSetting the equations equal to verify algebraically:\n2x - 3 = -x + 6\n3x = 9\nx = 3\n\nSubstituting x = 3 into either equation:\ny = 2(3) - 3 = 3\ny = -(3) + 6 = 3\n\nThus, the unique intersection point is (3, 3).',
    keyTakeaway:
      'TEKS 8.9A: The solution to a system of two linear equations is the intersection point (x, y) where both lines cross, satisfying both equations simultaneously.',
  },

  // --------------------------------------------------------------------------
  // Q2: Drag & Drop System Modeling
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q2',
    number: 2,
    type: 'drag-drop-system',
    typeLabel: 'Drag & Drop Modeling',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'A school robotics club sold a total of 28 baked items consisting of muffins (m) and brownies (b). Muffins sold for $3 each and brownies sold for $2 each. The club collected a total of $68. Drag and drop the tiles into the slots to model this situation with a system of linear equations, then select the true solution.',
    scenario: '28 total items (muffins & brownies) sold; muffins = $3 each, brownies = $2 each; total sales = $68.',
    eq1Label: 'Equation for Total Items Sold:',
    eq2Label: 'Equation for Total Sales Revenue:',
    availableTiles: [
      'm + b = 28',
      '3m + 2b = 68',
      '2m + 3b = 68',
      'm + b = 68',
      '3m + 2b = 28',
      '28m + 68b = 5',
    ],
    correctEq1: 'm + b = 28',
    correctEq2: '3m + 2b = 68',
    followUpPrompt: 'Which values of (m, b) represent the solution to this system?',
    followUpOptions: [
      '12 muffins and 16 brownies',
      '16 muffins and 12 brownies',
      '10 muffins and 18 brownies',
      '14 muffins and 14 brownies',
    ],
    correctFollowUp: '12 muffins and 16 brownies',
    instructionalHint:
      'Pair the quantities with their matching totals: total count relates item counts (m + b), while the dollar amounts attach unit prices ($3 and $2) to their respective items to total $68.',
    solutionExplanation:
      '1. Total items equation: The sum of muffins (m) and brownies (b) is 28 items, so m + b = 28.\n2. Total revenue equation: At $3 per muffin and $2 per brownie, total revenue is $68, so 3m + 2b = 68.\n3. Solving the system:\nFrom m + b = 28, we get b = 28 - m.\nSubstitute into revenue equation: 3m + 2(28 - m) = 68\n3m + 56 - 2m = 68\nm = 12 muffins\nThen b = 28 - 12 = 16 brownies.\nCheck: 3(12) + 2(16) = 36 + 32 = $68.',
    keyTakeaway:
      'TEKS 8.9A: Real-world situations are modeled with linear systems by writing one equation for quantities and another for monetary values or rates.',
  },

  // --------------------------------------------------------------------------
  // Q3: Inline Choice Sentence Completion
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q3',
    number: 3,
    type: 'inline-choice',
    typeLabel: 'Inline Choice',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'Two streaming platforms offer family entertainment plans. StreamFlix charges a $30 activation fee plus $15 per month (C = 15m + 30). PrimeMedia charges a $10 activation fee plus $20 per month (C = 20m + 10). Complete each dropdown to make the mathematical statements true.',
    scenario: 'StreamFlix: C = 15m + 30 vs. PrimeMedia: C = 20m + 10',
    sentenceBefore1: 'The two streaming services will cost the exact same total amount after ',
    dropdown1Options: ['2 months', '3 months', '4 months', '5 months'],
    correctDropdown1: '4 months',
    sentenceBefore2: ', at which time the total cost for either service will be ',
    dropdown2Options: ['$70', '$80', '$90', '$100'],
    correctDropdown2: '$90',
    sentenceBefore3: '. If a family keeps the subscription for 6 months, the plan with the lower total cost is ',
    dropdown3Options: ['StreamFlix', 'PrimeMedia', 'Both cost the same'],
    correctDropdown3: 'StreamFlix',
    sentenceAfter3: '.',
    instructionalHint:
      'To find when both services cost the same, set their total cost equations equal: 15m + 30 = 20m + 10. Solve for m, then substitute m into either equation to calculate the cost. For 6 months, calculate the total cost for each plan.',
    solutionExplanation:
      '1. Find the break-even month by setting the costs equal:\n15m + 30 = 20m + 10\n30 - 10 = 20m - 15m\n20 = 5m\nm = 4 months.\n\n2. Calculate total cost at m = 4:\nC = 15(4) + 30 = 60 + 30 = $90 (and 20(4) + 10 = 80 + 10 = $90).\n\n3. Compare at m = 6 months:\nStreamFlix: C = 15(6) + 30 = 90 + 30 = $120.\nPrimeMedia: C = 20(6) + 10 = 120 + 10 = $130.\nStreamFlix is $10 cheaper for 6 months.',
    keyTakeaway:
      'TEKS 8.9A: The intersection point represents the break-even point where both options cost the same. Beyond that point, the option with the smaller rate of change (slope) becomes less expensive.',
  },

  // --------------------------------------------------------------------------
  // Q4: Numeric Entry (Gridded Coordinates)
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q4',
    number: 4,
    type: 'numeric-entry',
    typeLabel: 'Gridded Numeric Entry',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'The coordinate plane displays Line p and Line q. Line p passes through (0, 4) and (3, 1). Line q passes through (0, -2) and (2, 2). Enter the x-value and y-value of the solution point (x, y) that satisfies both linear equations.',
    linePDescription: 'Line p: passes through (0, 4) and (3, 1) with slope m = -1 (y = -x + 4)',
    lineQDescription: 'Line q: passes through (0, -2) and (2, 2) with slope m = 2 (y = 2x - 2)',
    gridSvgData: {
      lineP: { x1: -1, y1: 5, x2: 5, y2: -1 },
      lineQ: { x1: -1, y1: -4, x2: 4, y2: 6 },
      minX: -2,
      maxX: 6,
      minY: -4,
      maxY: 6,
    },
    correctX: 2,
    correctY: 2,
    acceptedX: ['2', '2.0', '+2'],
    acceptedY: ['2', '2.0', '+2'],
    instructionalHint:
      'Inspect where Line p and Line q cross on the grid. Verify your coordinates by plugging them into the equation of each line: y = -x + 4 and y = 2x - 2.',
    solutionExplanation:
      'Equation for Line p:\nSlope m = (1 - 4)/(3 - 0) = -3/3 = -1.\ny-intercept is (0, 4), so y = -x + 4.\n\nEquation for Line q:\nSlope m = (2 - (-2))/(2 - 0) = 4/2 = 2.\ny-intercept is (0, -2), so y = 2x - 2.\n\nEquating the two:\n2x - 2 = -x + 4\n3x = 6\nx = 2.\n\nSubstitute x = 2:\ny = -(2) + 4 = 2\ny = 2(2) - 2 = 2.\n\nThe solution is x = 2 and y = 2.',
    keyTakeaway:
      'TEKS 8.9A: Always write equations in y = mx + b form from graphed points and verify that the intersection coordinates satisfy both rules.',
  },

  // --------------------------------------------------------------------------
  // Q5: Multiple-Select (Select All That Apply)
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q5',
    number: 5,
    type: 'multiple-select',
    typeLabel: 'Multiple Select',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'A system of equations consists of Line A: y = (1/3)x + 2 and Line B: y = -x + 6. Select ALL statements that are true about this system.',
    scenario: 'Line A: y = (1/3)x + 2, Line B: y = -x + 6. Intersection occurs at (3, 3).',
    options: [
      {
        id: 'opt-1',
        text: 'The point (3, 3) is the only solution that satisfies both linear equations simultaneously.',
        isCorrect: true,
        explanation: '(1/3)(3) + 2 = 3 and -(3) + 6 = 3. Both equations are true at (3, 3).',
      },
      {
        id: 'opt-2',
        text: 'Line A and Line B have different slopes (m = 1/3 and m = -1), which guarantees exactly one intersection point.',
        isCorrect: true,
        explanation: 'Linear equations with different slopes always intersect at exactly one point.',
      },
      {
        id: 'opt-3',
        text: 'The point (0, 2) is a solution to the system because it is the y-intercept of Line A.',
        isCorrect: false,
        explanation: '(0, 2) is on Line A, but does not lie on Line B (-(0) + 6 = 6 ≠ 2).',
      },
      {
        id: 'opt-4',
        text: 'Substituting x = 3 and y = 3 into Line B yields a true equation: 3 = -(3) + 6.',
        isCorrect: true,
        explanation: '3 = -3 + 6 is mathematically true.',
      },
      {
        id: 'opt-5',
        text: 'The lines are parallel because both equations have positive constant terms (y-intercepts).',
        isCorrect: false,
        explanation: 'Parallel lines require equal slopes. Here the slopes are 1/3 and -1 (not equal).',
      },
    ],
    instructionalHint:
      'Carefully evaluate each statement. Check whether slopes are equal or different, and test whether proposed points satisfy BOTH equations simultaneously or just one.',
    solutionExplanation:
      'Statements 1, 2, and 4 are correct:\n- Solving (1/3)x + 2 = -x + 6 gives (4/3)x = 4, so x = 3 and y = 3. The unique intersection point is (3, 3).\n- Lines with different slopes (1/3 ≠ -1) always intersect at exactly one point.\n- (3, 3) makes 3 = -3 + 6 true.\n\nStatements 3 and 5 are false:\n- (0, 2) only satisfies Line A, not Line B.\n- Having positive y-intercepts does not make lines parallel; only identical slopes make lines parallel.',
    keyTakeaway:
      'TEKS 8.9A: Exactly one solution occurs whenever two lines have different slopes, regardless of their y-intercepts.',
  },

  // --------------------------------------------------------------------------
  // Q6: Classification / Card Sorting
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q6',
    number: 6,
    type: 'classification',
    typeLabel: 'Card Sorting',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'Categorize each card into the correct classification based on the number of solutions the system possesses. You may drag each card or tap a card and select its target category.',
    categories: [
      {
        id: 'one-solution',
        label: 'Exactly One Solution',
        sublabel: 'Intersecting Lines (Different Slopes)',
      },
      {
        id: 'no-solution',
        label: 'No Solution',
        sublabel: 'Parallel Lines (Same Slope, Different y-Intercepts)',
      },
      {
        id: 'inf-solutions',
        label: 'Infinitely Many Solutions',
        sublabel: 'Coincident Lines (Same Slope, Same y-Intercept)',
      },
    ],
    cards: [
      {
        id: 'card-1',
        text: 'y = 4x - 1 and y = -2x + 5',
        detail: 'Slopes are 4 and -2',
        correctCategory: 'one-solution',
      },
      {
        id: 'card-2',
        text: 'y = -3x + 4 and y = -3x - 2',
        detail: 'Slopes both -3; y-intercepts 4 and -2',
        correctCategory: 'no-solution',
      },
      {
        id: 'card-3',
        text: 'y = 2x + 6 and 2y = 4x + 12',
        detail: 'Dividing second equation by 2 yields y = 2x + 6',
        correctCategory: 'inf-solutions',
      },
      {
        id: 'card-4',
        text: 'Two lines with slopes m = 5 and m = 1/5',
        detail: 'Different slopes',
        correctCategory: 'one-solution',
      },
      {
        id: 'card-5',
        text: 'Two distinct lines that are parallel and never intersect',
        detail: 'Equal slopes, different intercepts',
        correctCategory: 'no-solution',
      },
      {
        id: 'card-6',
        text: 'Two lines graphed directly on top of each other',
        detail: 'All coordinate points are shared',
        correctCategory: 'inf-solutions',
      },
    ],
    instructionalHint:
      'Examine the slopes (m) and y-intercepts (b):\n• Different slopes (m1 ≠ m2) → Exactly One Solution\n• Same slope (m1 = m2) with different intercepts (b1 ≠ b2) → No Solution (parallel lines)\n• Same slope and same intercept (m1 = m2, b1 = b2) → Infinitely Many Solutions (same line)',
    solutionExplanation:
      'Classification Rules:\n1. y = 4x - 1 and y = -2x + 5: Slopes 4 ≠ -2 → Exactly One Solution.\n2. y = -3x + 4 and y = -3x - 2: Same slope (-3) and different y-intercepts (4 ≠ -2) → No Solution.\n3. y = 2x + 6 and 2y = 4x + 12: Dividing 2y = 4x + 12 by 2 gives y = 2x + 6, identical lines → Infinitely Many Solutions.\n4. Slopes 5 and 1/5: 5 ≠ 1/5 → Exactly One Solution.\n5. Parallel lines never intersect → No Solution.\n6. Coincident lines share every point → Infinitely Many Solutions.',
    keyTakeaway:
      'TEKS 8.9A: Compare slope (m) and y-intercept (b) to immediately determine whether a system has 1 solution, 0 solutions, or infinitely many solutions.',
  },

  // --------------------------------------------------------------------------
  // Q7: Table Analysis (Dual Function Comparison)
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q7',
    number: 7,
    type: 'table-analysis',
    typeLabel: 'Table Analysis',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'The tables show the total savings for Maya and Liam after w weeks. Maya starts with $40 and saves $15 each week (S = 15w + 40). Liam starts with $10 and saves $25 each week (S = 25w + 10). Click or tap the table row that represents the solution to this system of linear equations, then answer the interpretation question below.',
    scenario: 'Maya: S = 15w + 40 vs. Liam: S = 25w + 10',
    rows: [
      { x: 1, yMaya: 55, yLiam: 35, isSolution: false },
      { x: 2, yMaya: 70, yLiam: 60, isSolution: false },
      { x: 3, yMaya: 85, yLiam: 85, isSolution: true },
      { x: 4, yMaya: 100, yLiam: 110, isSolution: false },
      { x: 5, yMaya: 115, yLiam: 135, isSolution: false },
    ],
    correctX: 3,
    followUpQuestion: 'What does this solution row represent in the real-world context?',
    followUpOptions: [
      'At Week 3, Maya and Liam have saved the exact same amount of money ($85).',
      'At Week 3, Maya has saved $15 more than Liam.',
      'Maya and Liam both spent $85 on week 3.',
      'At Week 5, Liam has saved the greatest amount of money.',
    ],
    correctFollowUp:
      'At Week 3, Maya and Liam have saved the exact same amount of money ($85).',
    instructionalHint:
      'In a table of values, the solution to a system of equations is the input value (w) where both functions produce the exact same output value (S).',
    solutionExplanation:
      'Looking across each row:\n• Week 1: Maya = $55, Liam = $35 (difference $20)\n• Week 2: Maya = $70, Liam = $60 (difference $10)\n• Week 3: Maya = $85, Liam = $85 (EQUAL!)\n• Week 4: Maya = $100, Liam = $110\n• Week 5: Maya = $115, Liam = $135\n\nAt w = 3 weeks, both Maya and Liam have accumulated exactly $85. Thus, (3, 85) is the simultaneous solution to the system.',
    keyTakeaway:
      'TEKS 8.9A: In a table representation, the system solution is identified by the row where the dependent output values are identical for the same independent input.',
  },

  // --------------------------------------------------------------------------
  // Q8: Interactive Graphing
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q8',
    number: 8,
    type: 'interactive-graphing',
    typeLabel: 'Interactive Graphing',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'On the coordinate plane, Line 1 (y = x - 1) is already graphed. Graph Line 2 (y = -0.5x + 5) by plotting two points on Line 2, then select the coordinates of the resulting intersection point.',
    line1Equation: 'y = x - 1',
    line1Points: [
      [0, -1],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
    ],
    line2Equation: 'y = -0.5x + 5',
    line2TargetSlope: -0.5,
    line2TargetYIntercept: 5,
    correctIntersection: [4, 3],
    intersectionOptions: ['(2, 1)', '(3, 2)', '(4, 3)', '(5, 4)'],
    correctIntersectionText: '(4, 3)',
    instructionalHint:
      'Line 2 has a y-intercept of 5 (where x = 0) and a slope of -0.5 (-1/2). To find valid points on Line 2, substitute integer values for x into y = -0.5x + 5. Once Line 2 is plotted, identify the point (x, y) where Line 1 and Line 2 cross each other.',
    solutionExplanation:
      '1. Graph Line 2 (y = -0.5x + 5):\nStart at y-intercept (0, 5). Move down 1 unit and right 2 units to (2, 4), and another down 1 and right 2 to (4, 3).\n\n2. Locate the intersection with Line 1 (y = x - 1):\nSet equations equal: x - 1 = -0.5x + 5\n1.5x = 6\nx = 4.\n\nSubstitute x = 4 into either equation:\ny = 4 - 1 = 3\ny = -0.5(4) + 5 = -2 + 5 = 3.\n\nThe intersection point is (4, 3).',
    keyTakeaway:
      'TEKS 8.9A: When graphing lines to solve a system, use the slope and y-intercept to plot accurate integer coordinates, then read the shared intersection point directly.',
  },

  // --------------------------------------------------------------------------
  // Q9: Matching Pairs
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q9',
    number: 9,
    type: 'matching',
    typeLabel: 'Matching Pairs',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'Match each system of equations on the left with its corresponding solution or graphical description on the right.',
    systems: [
      {
        id: 'sys-1',
        system: 'y = 3x - 1  and  y = x + 3',
        correctSolutionId: 'sol-A',
      },
      {
        id: 'sys-2',
        system: 'y = -2x + 8  and  y = -2x + 1',
        correctSolutionId: 'sol-B',
      },
      {
        id: 'sys-3',
        system: 'y = x - 4  and  y = -2x + 5',
        correctSolutionId: 'sol-C',
      },
      {
        id: 'sys-4',
        system: 'y = 2x + 1  and  3y = 6x + 3',
        correctSolutionId: 'sol-D',
      },
    ],
    solutions: [
      {
        id: 'sol-A',
        label: '(2, 5)',
        description: 'Single intersection point: 3(2) - 1 = 5 and 2 + 3 = 5',
      },
      {
        id: 'sol-B',
        label: 'No Solution',
        description: 'Parallel lines with equal slopes (m = -2) and different y-intercepts (8 ≠ 1)',
      },
      {
        id: 'sol-C',
        label: '(3, -1)',
        description: 'Single intersection point: 3 - 4 = -1 and -2(3) + 5 = -1',
      },
      {
        id: 'sol-D',
        label: 'Infinitely Many Solutions',
        description: 'Coincident lines; dividing 3y = 6x + 3 by 3 yields y = 2x + 1',
      },
    ],
    instructionalHint:
      'Examine the slopes first:\n• If slopes are equal, check y-intercepts for No Solution (different b) or Infinitely Many Solutions (same b).\n• If slopes are different, solve by setting equations equal to determine the coordinates.',
    solutionExplanation:
      '1. 3x - 1 = x + 3 → 2x = 4 → x = 2, y = 5. Matches (2, 5).\n2. Both lines have slope m = -2 with different y-intercepts (8 and 1). Parallel lines have No Solution.\n3. x - 4 = -2x + 5 → 3x = 9 → x = 3, y = -1. Matches (3, -1).\n4. Divide 3y = 6x + 3 by 3 → y = 2x + 1. The two equations are identical, meaning Infinitely Many Solutions.',
    keyTakeaway:
      'TEKS 8.9A: Quickly classify systems by slope and intercept properties, and solve intersecting systems to locate exact coordinates.',
  },

  // --------------------------------------------------------------------------
  // Q10: Diagnostic Error Analysis
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q10',
    number: 10,
    type: 'error-analysis',
    typeLabel: 'Diagnostic Error Analysis',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'A student was asked to find the solution to the system graphed: Line 1 (y = x + 3) and Line 2 (y = -2x + 9). The student stated: "The solution to the system is (0, 3) because that point is on the vertical y-axis." Select the TWO statements that correctly identify the error and provide the correct mathematical conclusion.',
    equation1: 'y = x + 3',
    equation2: 'y = -2x + 9',
    studentClaim: '"The solution is (0, 3) because that point is on the vertical y-axis."',
    options: [
      {
        id: 'err-1',
        text: 'The student mistakenly selected the y-intercept of Line 1 instead of the point where both lines intersect.',
        isCorrect: true,
      },
      {
        id: 'err-2',
        text: 'The true solution that satisfies both equations simultaneously is (2, 5).',
        isCorrect: true,
      },
      {
        id: 'err-3',
        text: 'The student should have averaged the y-intercepts: (0, 6).',
        isCorrect: false,
      },
      {
        id: 'err-4',
        text: 'The system has no solution because one slope is positive and the other is negative.',
        isCorrect: false,
      },
      {
        id: 'err-5',
        text: 'The true solution must always be on the x-axis: (3, 0).',
        isCorrect: false,
      },
    ],
    instructionalHint:
      'Remember that the solution to a linear system is not where an individual line crosses an axis (intercept), but where the two lines cross each other (intersection).',
    solutionExplanation:
      'Analysis of the error:\n• The point (0, 3) is merely the y-intercept of Line 1 (y = x + 3). It does not satisfy Line 2 (-2(0) + 9 = 9 ≠ 3).\n• To find the true solution, determine where the lines cross:\nx + 3 = -2x + 9\n3x = 6\nx = 2.\nSubstitute x = 2: y = 2 + 3 = 5 (and y = -2(2) + 9 = 5).\n• Therefore, the true solution is (2, 5).',
    keyTakeaway:
      'TEKS 8.9A: Common misconception alert: Do not confuse individual line intercepts with the shared intersection point of a system.',
  },

  // --------------------------------------------------------------------------
  // Q11: Multi-Part Break-Even Problem
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q11',
    number: 11,
    type: 'multi-part',
    typeLabel: 'Multi-Part Challenge',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'The student council is selling spirit t-shirts for homecoming. The total production cost is modeled by C = 5t + 150 (a $150 setup fee plus $5 per shirt). Total revenue from selling shirts at $15 each is modeled by R = 15t. Answer Part A and Part B.',
    context: 'Production Cost: C = 5t + 150. Revenue: R = 15t. (t = number of t-shirts)',
    partAPrompt: 'Part A: How many t-shirts must the student council sell to break even (where revenue equals cost)?',
    partAOptions: ['10 t-shirts', '15 t-shirts', '25 t-shirts', '30 t-shirts'],
    partACorrect: '15 t-shirts',
    partBPrompt: 'Part B: If the student council sells 40 t-shirts, what will be their total profit (Revenue - Cost)?',
    partBOptions: ['$150', '$200', '$250', '$300'],
    partBCorrect: '$250',
    instructionalHint:
      'For Part A: Set Revenue equal to Cost (15t = 5t + 150) and solve for t.\nFor Part B: Calculate Revenue R = 15(40) and Cost C = 5(40) + 150, then compute Profit = Revenue - Cost.',
    solutionExplanation:
      'Part A (Break-Even):\nSet R = C:\n15t = 5t + 150\n10t = 150\nt = 15 t-shirts.\nAt 15 shirts, Revenue = 15(15) = $225 and Cost = 5(15) + 150 = $225.\n\nPart B (Profit at 40 shirts):\nRevenue = 15(40) = $600.\nCost = 5(40) + 150 = 200 + 150 = $350.\nProfit = $600 - $350 = $250.',
    keyTakeaway:
      'TEKS 8.9A: The break-even point is the intersection where Cost equals Revenue. Selling units beyond the break-even point generates positive profit.',
  },

  // --------------------------------------------------------------------------
  // Q12: System Completion
  // --------------------------------------------------------------------------
  {
    id: 'staar-u4-q12',
    number: 12,
    type: 'system-completion',
    typeLabel: 'System Completion',
    teks: '8.9A',
    topic: 'Systems of Linear Equations',
    prompt:
      'Given the reference line y = 2x + 4, complete each second equation by selecting the required values to achieve the specified solution condition.',
    baseEquation: 'y = 2x + 4',
    task1Prompt: 'Task 1: Complete y = [ m ]x + [ b ] so that the system has NO SOLUTION:',
    task1SlopeOptions: ['-2', '1/2', '2', '4'],
    task1CorrectSlope: '2',
    task1InterceptOptions: ['-3', '4'],
    task1CorrectIntercept: '-3',
    task2Prompt: 'Task 2: Complete 3y = [ A ]x + [ B ] so that the system has INFINITELY MANY SOLUTIONS:',
    task2Multiplier: 3,
    task2CoefficientOptions: ['2', '3', '6', '12'],
    task2CorrectCoefficient: '6',
    task2ConstantOptions: ['4', '6', '8', '12'],
    task2CorrectConstant: '12',
    task3Prompt: 'Task 3: Complete y = [ m ]x + 4 so that the system has EXACTLY ONE SOLUTION:',
    task3SlopeOptions: ['-1', '2'],
    task3CorrectSlope: '-1',
    instructionalHint:
      '• No Solution: Slopes must be identical (m = 2), but y-intercepts must differ (b ≠ 4).\n• Infinitely Many Solutions: Multiply the entire equation by 3: 3(y) = 3(2x + 4) = 6x + 12.\n• Exactly One Solution: The slope must be different from the reference line (m ≠ 2).',
    solutionExplanation:
      '1. No Solution: Parallel lines must have identical slopes (m = 2) and different y-intercepts (b = -3 ≠ 4). Thus, y = 2x - 3.\n\n2. Infinitely Many Solutions: Multiply y = 2x + 4 by 3:\n3(y) = 3(2x + 4) → 3y = 6x + 12. Both equations are mathematically equivalent.\n\n3. Exactly One Solution: Intersecting lines require different slopes. Choosing m = -1 (where -1 ≠ 2) guarantees exactly one intersection point.',
    keyTakeaway:
      'TEKS 8.9A: Master the algebraic criteria: m1 ≠ m2 → 1 solution; m1 = m2 and b1 ≠ b2 → 0 solutions; m1 = m2 and b1 = b2 → infinitely many solutions.',
  },
];
