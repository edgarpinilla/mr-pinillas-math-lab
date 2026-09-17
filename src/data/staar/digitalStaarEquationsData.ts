// src/data/staar/digitalStaarEquationsData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 6: Equations & Inequalities (TEKS 8.8A, 8.8B, 8.8C)
// 100% Client-side local data. Zero runtime API calls.

export type Unit6DigitalInteractionType =
  | 'interactive-number-line'
  | 'drag-drop-equation'
  | 'inline-choice'
  | 'numeric-entry'
  | 'multiple-select'
  | 'classification'
  | 'table-analysis'
  | 'error-analysis'
  | 'matching'
  | 'gridded-response'
  | 'multi-part'
  | 'synthesis-challenge';

export interface BaseQuestionUnit6 {
  id: string;
  number: number;
  type: Unit6DigitalInteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  instructionalHint?: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Interactive Number Line Inequality
export interface Q1InteractiveNumberLine extends BaseQuestionUnit6 {
  type: 'interactive-number-line';
  equation: string;
  minVal: number;
  maxVal: number;
  correctCircle: 'open' | 'closed';
  correctBoundary: number;
  correctDirection: 'left' | 'right';
  correctStatement: string;
  statementOptions: string[];
}

// Q2: Drag & Drop Equation Modeling
export interface Q2DragDropEquation extends BaseQuestionUnit6 {
  type: 'drag-drop-equation';
  scenario: string;
  availableTiles: string[];
  correctEquationVariations: string[]; // e.g. "25m + 35 = 15m + 65", "35 + 25m = 65 + 15m"
  followUpPrompt: string;
  correctFollowUpAnswer: string;
}

// Q3: Inline Choice
export interface Q3InlineChoiceEquations extends BaseQuestionUnit6 {
  type: 'inline-choice';
  equation: string;
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

// Q4: Numeric Entry with LCM
export interface Q4NumericEntryEquations extends BaseQuestionUnit6 {
  type: 'numeric-entry';
  equation: string;
  lcmPrompt: string;
  correctLcm: string;
  solutionPrompt: string;
  correctSolution: string;
  acceptedEquivalents: string[];
}

// Q5: Multiple Select Solution Set
export interface Q5MultipleSelectEquations extends BaseQuestionUnit6 {
  type: 'multiple-select';
  inequality: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    reason: string;
  }[];
}

// Q6: Classification Cards
export interface Q6ClassificationEquations extends BaseQuestionUnit6 {
  type: 'classification';
  instruction: string;
  categories: { id: string; title: string; description: string }[];
  cards: { id: string; text: string; correctCategory: string }[];
}

// Q7: Table Analysis & Rate Comparison
export interface Q7TableAnalysisEquations extends BaseQuestionUnit6 {
  type: 'table-analysis';
  scenario: string;
  tableData: {
    headers: string[];
    rows: (string | number)[][];
  };
  partAPrompt: string;
  partAOptions: string[];
  correctPartA: string;
  partBPrompt: string;
  partBOptions: string[];
  correctPartB: string;
  partCPrompt: string;
  partCOptions: string[];
  correctPartC: string;
}

// Q8: Error Analysis & Step Correction
export interface Q8ErrorAnalysisEquations extends BaseQuestionUnit6 {
  type: 'error-analysis';
  givenEquation: string;
  steps: { stepNumber: number; text: string; isError: boolean }[];
  partAPrompt: string;
  correctErrorStep: number;
  partBPrompt: string;
  partBOptions: string[];
  correctErrorExplanation: string;
  partCPrompt: string;
  correctFinalSolution: string;
}

// Q9: Matching Real-World Situations
export interface Q9MatchingEquations extends BaseQuestionUnit6 {
  type: 'matching';
  situations: {
    id: string;
    text: string;
    correctMatchId: string;
  }[];
  inequalities: {
    id: string;
    text: string;
  }[];
}

// Q10: Gridded Response / Decimal Entry
export interface Q10GriddedResponseEquations extends BaseQuestionUnit6 {
  type: 'gridded-response';
  scenario: string;
  equation: string;
  correctValue: string;
  acceptedValues: string[];
  unit: string;
}

// Q11: Multi-Part Real-World Modeling
export interface Q11MultiPartEquations extends BaseQuestionUnit6 {
  type: 'multi-part';
  context: string;
  partAPrompt: string;
  partAOptions: { id: string; text: string }[];
  correctPartA: string;
  partBPrompt: string;
  correctPartB: string;
  partCPrompt: string;
  partCOptions: { id: string; text: string }[];
  correctPartC: string;
}

// Q12: Synthesis Challenge
export interface Q12SynthesisChallengeEquations extends BaseQuestionUnit6 {
  type: 'synthesis-challenge';
  givenInequality: string;
  symbolOptions: string[];
  correctSymbol: string;
  correctBoundary: string;
  membershipValues: { id: string; val: string; isInSolution: boolean }[];
}

export type Unit6DigitalStaarQuestion =
  | Q1InteractiveNumberLine
  | Q2DragDropEquation
  | Q3InlineChoiceEquations
  | Q4NumericEntryEquations
  | Q5MultipleSelectEquations
  | Q6ClassificationEquations
  | Q7TableAnalysisEquations
  | Q8ErrorAnalysisEquations
  | Q9MatchingEquations
  | Q10GriddedResponseEquations
  | Q11MultiPartEquations
  | Q12SynthesisChallengeEquations;

export const UNIT_6_DIGITAL_STAAR_QUESTIONS: Unit6DigitalStaarQuestion[] = [
  // ==========================================
  // Question 1: Interactive Number-Line Inequality
  // ==========================================
  {
    id: 'u6-dig-q01',
    number: 1,
    type: 'interactive-number-line',
    typeLabel: 'Interactive Number Line',
    teks: 'TEKS 8.8C',
    topic: 'Solving Inequalities with Negative Coefficients',
    prompt:
      'Solve the inequality below. Use the interactive controls to configure the circle type, boundary point, and shading direction on the number line, then choose the matching algebraic statement.',
    equation: '-3x + 11 < -4',
    minVal: 0,
    maxVal: 10,
    correctCircle: 'open',
    correctBoundary: 5,
    correctDirection: 'right',
    correctStatement: 'x > 5',
    statementOptions: ['x > 5', 'x < 5', 'x ≥ 5', 'x ≤ 5'],
    instructionalHint:
      'Subtract 11 from both sides to isolate the term with x: -3x < -15. Remember: whenever you divide or multiply both sides by a negative number, the inequality sign must reverse!',
    solutionExplanation:
      'Subtract 11 from both sides: -3x < -15. Divide both sides by -3 and reverse the symbol: x > 5. Because the inequality is strictly greater than (>), the boundary at 5 has an OPEN circle, and values greater than 5 lie to the RIGHT.',
    keyTakeaway:
      'Dividing or multiplying an inequality by a negative number flips the direction of the symbol (< becomes >). Strict inequalities (<, >) use open circles.',
  },

  // ==========================================
  // Question 2: Drag & Drop Equation Modeling
  // ==========================================
  {
    id: 'u6-dig-q02',
    number: 2,
    type: 'drag-drop-equation',
    typeLabel: 'Drag & Drop Equation Modeling',
    teks: 'TEKS 8.8A',
    topic: 'Writing One-Variable Equations',
    prompt:
      'Apex Gym charges a $35 enrollment fee plus $25 per month. Peak Fitness charges a $65 enrollment fee plus $15 per month. Drag tiles into the boxes to construct an equation that models when the total cost at both gyms is identical, then answer the follow-up question.',
    scenario:
      'Let m represent the number of months. Apex Gym total cost: 25m + 35. Peak Fitness total cost: 15m + 65.',
    availableTiles: ['25m', '15m', '35', '65', '+', '-'],
    correctEquationVariations: [
      '25m + 35 = 15m + 65',
      '35 + 25m = 65 + 15m',
      '15m + 65 = 25m + 35',
      '65 + 15m = 35 + 25m',
    ],
    followUpPrompt:
      'After how many months, m, will the total cost at both gyms be equal? Enter the number of months:',
    correctFollowUpAnswer: '3',
    instructionalHint:
      'The monthly rates (25 and 15) must multiply the variable m. The one-time enrollment fees (35 and 65) are constants added to each side.',
    solutionExplanation:
      'Apex Gym charges 25m + 35. Peak Fitness charges 15m + 65. Setting them equal gives 25m + 35 = 15m + 65. Solving: 25m - 15m = 65 - 35 → 10m = 30 → m = 3 months.',
    keyTakeaway:
      'Variable terms represent recurring rates per unit time; constant terms represent one-time fixed starting costs.',
  },

  // ==========================================
  // Question 3: Inline Choice
  // ==========================================
  {
    id: 'u6-dig-q03',
    number: 3,
    type: 'inline-choice',
    typeLabel: 'Inline Choice Dropdown',
    teks: 'TEKS 8.8C',
    topic: 'Distributive Property & Inequality Solving',
    prompt:
      'A student is solving the multi-step inequality shown below. Select the correct algebraic expressions and values from each dropdown menu to complete the mathematical explanation.',
    equation: '-2(4x - 5) ≥ 6x + 24',
    sentenceBefore1: 'First, applying the distributive property to the left side yields the expression ',
    dropdown1Options: ['-8x + 10', '-8x - 10', '8x - 10', '-8x + 5'],
    correctDropdown1: '-8x + 10',
    sentenceBefore2:
      '. Next, collecting like terms by subtracting 6x and subtracting 10 from both sides produces the intermediate inequality -14x ≥ ',
    dropdown2Options: ['14', '34', '-14', '19'],
    correctDropdown2: '14',
    sentenceBefore3: '. Finally, dividing both sides by -14 yields the complete solution set ',
    dropdown3Options: ['x ≤ -1', 'x ≥ -1', 'x ≤ 1', 'x ≥ 1'],
    correctDropdown3: 'x ≤ -1',
    sentenceAfter3: '.',
    instructionalHint:
      'Remember that -2 multiplied by -5 equals positive 10. When you divide 14 by -14, the inequality symbol must reverse from ≥ to ≤.',
    solutionExplanation:
      '-2(4x - 5) = -8x + 10. The inequality is -8x + 10 ≥ 6x + 24. Subtract 6x: -14x + 10 ≥ 24. Subtract 10: -14x ≥ 14. Divide by -14 and flip the symbol: x ≤ -1.',
    keyTakeaway:
      'Carefully distribute negative multipliers to every term inside parentheses: (-2)(-5) = +10. Reversing the inequality symbol upon negative division is essential.',
  },

  // ==========================================
  // Question 4: Numeric Entry with LCM
  // ==========================================
  {
    id: 'u6-dig-q04',
    number: 4,
    type: 'numeric-entry',
    typeLabel: 'Numeric Entry & Denominator Clearing',
    teks: 'TEKS 8.8C',
    topic: 'Rational Number Equations with Fractions',
    prompt:
      'Solve the rational coefficient equation shown below. First determine the least common denominator (LCD) needed to clear all fractions, then enter the exact solution for x.',
    equation: '(2/3)x - 5 = (1/6)x + 4',
    lcmPrompt: 'Least Common Denominator (LCD) of 3 and 6:',
    correctLcm: '6',
    solutionPrompt: 'Solution value for x:',
    correctSolution: '18',
    acceptedEquivalents: ['18', '18.0', 'x=18', 'x = 18'],
    instructionalHint:
      'The least common multiple of 3 and 6 is 6. Multiply EVERY term on both sides by 6, including the integers -5 and +4!',
    solutionExplanation:
      'Multiply all 4 terms by 6: 6(2/3 x) - 6(5) = 6(1/6 x) + 6(4) → 4x - 30 = x + 24. Subtract x: 3x - 30 = 24. Add 30: 3x = 54. Divide by 3: x = 18. Check: 2/3(18) - 5 = 12 - 5 = 7; 1/6(18) + 4 = 3 + 4 = 7.',
    keyTakeaway:
      'Clearing fractions by multiplying by the LCM simplifies multi-step rational equations into standard integer equations.',
  },

  // ==========================================
  // Question 5: Multiple-Select Solution Set
  // ==========================================
  {
    id: 'u6-dig-q05',
    number: 5,
    type: 'multiple-select',
    typeLabel: 'Multiple Select Solution Set',
    teks: 'TEKS 8.8C',
    topic: 'Identifying Values in Inequality Solution Sets',
    prompt:
      'Solve the inequality below. Which of the following values of x belong to the solution set? Select ALL values that make the inequality true.',
    inequality: '7 - 3x ≤ 2x - 13',
    options: [
      { id: 'optA', text: 'x = 4', isCorrect: true, reason: '4 ≥ 4 is true because of the equality condition (≥).' },
      { id: 'optB', text: 'x = 6.5', isCorrect: true, reason: '6.5 is strictly greater than 4.' },
      { id: 'optC', text: 'x = 0', isCorrect: false, reason: '0 is less than 4.' },
      { id: 'optD', text: 'x = 10', isCorrect: true, reason: '10 is greater than 4.' },
      { id: 'optE', text: 'x = -2', isCorrect: false, reason: '-2 is less than 4.' },
      { id: 'optF', text: 'x = 3.9', isCorrect: false, reason: '3.9 is strictly less than 4.' },
    ],
    instructionalHint:
      'Subtract 2x from both sides to get 7 - 5x ≤ -13. Subtract 7 to get -5x ≤ -20. Dividing by -5 reverses the inequality to x ≥ 4.',
    solutionExplanation:
      '7 - 3x ≤ 2x - 13 → -5x ≤ -20 → x ≥ 4 (divided by -5, symbol reversed). The solution set consists of all numbers 4 or greater. Therefore, x = 4, x = 6.5, and x = 10 are valid solutions.',
    keyTakeaway:
      'Inequalities have infinite solutions. When evaluating solution sets with "≥", the boundary number itself is included in the solution set.',
  },

  // ==========================================
  // Question 6: Classification Cards
  // ==========================================
  {
    id: 'u6-dig-q06',
    number: 6,
    type: 'classification',
    typeLabel: 'Classification & Card Sorting',
    teks: 'TEKS 8.8C',
    topic: 'Rules for Reversing Inequality Symbols',
    prompt:
      'Classify each algebraic operation according to whether it REVERSES the inequality symbol or KEEPS the symbol unchanged when applied to both sides of an inequality.',
    instruction: 'Click or drag each card into the appropriate category box.',
    categories: [
      {
        id: 'cat-reverse',
        title: 'Reverses Inequality Symbol',
        description: 'Operation flips the direction of the symbol (< becomes >, etc.)',
      },
      {
        id: 'cat-keep',
        title: 'Keeps Symbol Unchanged',
        description: 'Operation preserves the original direction of the inequality',
      },
    ],
    cards: [
      { id: 'c1', text: 'Dividing both sides by -4', correctCategory: 'cat-reverse' },
      { id: 'c2', text: 'Subtracting 8 from both sides', correctCategory: 'cat-keep' },
      { id: 'c3', text: 'Multiplying both sides by -1/2', correctCategory: 'cat-reverse' },
      { id: 'c4', text: 'Adding 15 to both sides', correctCategory: 'cat-keep' },
      { id: 'c5', text: 'Dividing both sides by +6', correctCategory: 'cat-keep' },
      { id: 'c6', text: 'Multiplying both sides by -3', correctCategory: 'cat-reverse' },
    ],
    instructionalHint:
      'Adding or subtracting any number never changes the inequality sign. Only MULTIPLYING or DIVIDING by a NEGATIVE number reverses the symbol.',
    solutionExplanation:
      'The inequality symbol reverses ONLY when multiplying or dividing both sides by a negative number (Cards 1, 3, 6). Adding, subtracting, or multiplying/dividing by positive numbers preserves the direction (Cards 2, 4, 5).',
    keyTakeaway:
      'The order of numbers reverses when scaled by a negative value (e.g. 2 < 5, but -2 > -5). Hence, negative scaling flips inequality direction.',
  },

  // ==========================================
  // Question 7: Table Analysis & Rate Comparison
  // ==========================================
  {
    id: 'u6-dig-q07',
    number: 7,
    type: 'table-analysis',
    typeLabel: 'Table Analysis & Plan Comparison',
    teks: 'TEKS 8.8A / 8.8C',
    topic: 'Comparing Two Linear Functions from a Table',
    prompt:
      'The table below compares the total cost in dollars for two movie streaming subscription plans over m months. Analyze the table and answer all three parts.',
    scenario:
      'CineStream charges an initial device fee plus a flat monthly rate. ViewMax charges a lower initial device fee with a higher monthly rate.',
    tableData: {
      headers: ['Months (m)', 'CineStream Cost ($)', 'ViewMax Cost ($)'],
      rows: [
        [0, 40, 10],
        [1, 55, 30],
        [2, 70, 50],
        [3, 85, 70],
        [4, 100, 90],
        [5, 115, 110],
        [6, 130, 130],
      ],
    },
    partAPrompt: 'Which equation models when the total cost of CineStream equals the total cost of ViewMax?',
    partAOptions: [
      '15m + 40 = 20m + 10',
      '40m + 15 = 10m + 20',
      '15m + 10 = 20m + 40',
      '55m = 30m',
    ],
    correctPartA: '15m + 40 = 20m + 10',
    partBPrompt: 'At how many months, m, will the total cost of both streaming services be identical?',
    partBOptions: ['4 months', '5 months', '6 months', '8 months'],
    correctPartB: '6 months',
    partCPrompt: 'For a customer subscribing for more than 6 months (m > 6), which service is more economical?',
    partCOptions: [
      'CineStream (because its monthly rate of $15 is lower)',
      'ViewMax (because its initial fee of $10 was lower)',
      'Both plans cost the exact same after 6 months',
    ],
    correctPartC: 'CineStream (because its monthly rate of $15 is lower)',
    instructionalHint:
      'Observe the constant difference: CineStream increases by $15/month starting at $40. ViewMax increases by $20/month starting at $10. Look at month 6 in the table!',
    solutionExplanation:
      'CineStream rate: 55 - 40 = $15/month, initial fee $40 → 15m + 40. ViewMax rate: 30 - 10 = $20/month, initial fee $10 → 20m + 10. Setting them equal: 15m + 40 = 20m + 10. In month 6, both cost $130. For m > 6, CineStream is cheaper because its recurring rate ($15) is lower.',
    keyTakeaway:
      'The plan with the lower variable rate always becomes more economical in the long run once the break-even point is passed.',
  },

  // ==========================================
  // Question 8: Error Analysis & Step Correction
  // ==========================================
  {
    id: 'u6-dig-q08',
    number: 8,
    type: 'error-analysis',
    typeLabel: 'Error Analysis & Correction',
    teks: 'TEKS 8.8C',
    topic: 'Identifying and Correcting Errors in Multi-Step Equations',
    prompt:
      'A student attempted to solve the equation 5(x - 2) + 3x = 2(x + 7) + 6. Review the student’s step-by-step work shown below to identify the error, explain the mistake, and find the correct solution.',
    givenEquation: '5(x - 2) + 3x = 2(x + 7) + 6',
    steps: [
      { stepNumber: 1, text: '5x - 10 + 3x = 2x + 14 + 6', isError: false },
      { stepNumber: 2, text: '8x - 10 = 2x + 20', isError: false },
      { stepNumber: 3, text: '6x - 10 = 20', isError: false },
      { stepNumber: 4, text: '6x = 10', isError: true },
      { stepNumber: 5, text: 'x = 10/6 = 5/3', isError: true },
    ],
    partAPrompt: 'In which step did the student make their first algebraic error?',
    correctErrorStep: 4,
    partBPrompt: 'What was the student’s mathematical mistake in that step?',
    partBOptions: [
      'The student subtracted 10 from 20 instead of adding 10 to 20.',
      'The student failed to distribute 5 to both terms in the parentheses.',
      'The student combined 5x and 3x incorrectly.',
      'The student should have divided by 6 before isolating the constant.',
    ],
    correctErrorExplanation: 'The student subtracted 10 from 20 instead of adding 10 to 20.',
    partCPrompt: 'Enter the actual correct solution for x:',
    correctFinalSolution: '5',
    instructionalHint:
      'In Step 3, the student had 6x - 10 = 20. To eliminate -10, the inverse operation is ADDING 10 to both sides: 20 + 10 = 30.',
    solutionExplanation:
      'Steps 1-3 are algebraically valid: 8x - 10 = 2x + 20 → 6x - 10 = 20. In Step 4, the student mistakenly did 20 - 10 = 10 instead of using the addition property of equality: 6x = 20 + 10 = 30. Dividing by 6 gives the correct solution x = 5.',
    keyTakeaway:
      'Always apply the inverse operation: the opposite of subtracting 10 is adding 10 to both sides.',
  },

  // ==========================================
  // Question 9: Matching Real-World Situations
  // ==========================================
  {
    id: 'u6-dig-q09',
    number: 9,
    type: 'matching',
    typeLabel: 'Real-World Situation Matching',
    teks: 'TEKS 8.8A / 8.8B',
    topic: 'Translating Real-World Problem Situations into Inequalities',
    prompt:
      'Match each verbal scenario with the correct algebraic inequality that represents the situation.',
    situations: [
      {
        id: 'sit1',
        text: 'Marcus has $50 and saves $12 per week. Destiny has $20 and saves $18 per week. When will Destiny have at least as much money as Marcus?',
        correctMatchId: 'ineq1',
      },
      {
        id: 'sit2',
        text: 'A fuel tank starts with 50 gallons and drains at 12 gallons/hr. A second tank has 20 gallons and drains at 18 gallons/hr. When will the first tank have strictly more fuel remaining?',
        correctMatchId: 'ineq2',
      },
      {
        id: 'sit3',
        text: 'Shop A charges a $50 setup fee plus $12 per shirt. Shop B charges a $20 setup fee plus $18 per shirt. For what number of shirts is Shop A strictly less expensive than Shop B?',
        correctMatchId: 'ineq3',
      },
      {
        id: 'sit4',
        text: 'A printing service costs $12 per booklet plus $50 shipping. A competitor costs $18 per booklet plus $20 shipping. When does the first service cost no more than the second?',
        correctMatchId: 'ineq4',
      },
    ],
    inequalities: [
      { id: 'ineq1', text: '18w + 20 ≥ 12w + 50' },
      { id: 'ineq2', text: '50 - 12h > 20 - 18h' },
      { id: 'ineq3', text: '12s + 50 < 18s + 20' },
      { id: 'ineq4', text: '12b + 50 ≤ 18b + 20' },
    ],
    instructionalHint:
      '"At least" translates to ≥. "Strictly more than" translates to >. "Less expensive than" translates to <. "No more than" translates to ≤.',
    solutionExplanation:
      '1. Destiny (18w + 20) at least (≥) Marcus (12w + 50). 2. Tank 1 (50 - 12h) more than (>) Tank 2 (20 - 18h). 3. Shop A (12s + 50) less than (<) Shop B (18s + 20). 4. Service 1 (12b + 50) no more than (≤) Service 2 (18b + 20).',
    keyTakeaway:
      'Key phrases govern inequality symbols: "at least" means ≥, "at most" or "no more than" means ≤, and draining or spending represents subtraction.',
  },

  // ==========================================
  // Question 10: Gridded Response / Decimal Entry
  // ==========================================
  {
    id: 'u6-dig-q10',
    number: 10,
    type: 'gridded-response',
    typeLabel: 'Gridded Response (Decimal Rates)',
    teks: 'TEKS 8.8C',
    topic: 'Solving Equations with Decimal Coefficients',
    prompt:
      'A travel coordinator compares two rental vehicle companies for a business trip:\n\n• QuickRent: $42 base charge plus $0.35 per mile driven\n• MetroDrive: $78 base charge plus $0.15 per mile driven\n\nFind the number of miles, m, for which both rental companies charge the exact same total amount. Record your answer in the grid.',
    scenario: 'Equation: 0.35m + 42 = 0.15m + 78',
    equation: '0.35m + 42 = 0.15m + 78',
    correctValue: '180',
    acceptedValues: ['180', '180.0', '180 miles'],
    unit: 'miles',
    instructionalHint:
      'Subtract 0.15m from 0.35m to get 0.20m. Subtract 42 from 78 to get 36. Then divide 36 by 0.20.',
    solutionExplanation:
      '0.35m + 42 = 0.15m + 78 → 0.20m = 36 → m = 36 / 0.20 = 180 miles. Checking: QuickRent: 0.35(180) + 42 = 63 + 42 = $105; MetroDrive: 0.15(180) + 78 = 27 + 78 = $105.',
    keyTakeaway:
      'Subtract like terms carefully when working with decimals. Dividing by 0.20 is mathematically equivalent to multiplying by 5.',
  },

  // ==========================================
  // Question 11: Multi-Part Real-World Modeling
  // ==========================================
  {
    id: 'u6-dig-q11',
    number: 11,
    type: 'multi-part',
    typeLabel: 'Multi-Part Real-World Application',
    teks: 'TEKS 8.8A / 8.8C',
    topic: 'Comprehensive Contextual Decision Modeling',
    prompt:
      'An 8th grade class is organizing an end-of-year science field trip. The organizers are evaluating two transportation and catering packages:',
    context:
      '• Package A (Charter Coach): $350 flat booking fee plus $8 per student for box lunches\n• Package B (Mini-Vans & Bistro): $110 flat booking fee plus $16 per student for box lunches',
    partAPrompt: 'Part A: Which equation models when the total cost of Package A equals Package B for s students?',
    partAOptions: [
      { id: 'opt1', text: '8s + 350 = 16s + 110' },
      { id: 'opt2', text: '350s + 8 = 110s + 16' },
      { id: 'opt3', text: '8s + 16s = 350 + 110' },
      { id: 'opt4', text: '8s - 350 = 16s - 110' },
    ],
    correctPartA: 'opt1',
    partBPrompt: 'Part B: For how many students, s, will both packages cost the exact same total amount?',
    correctPartB: '30',
    partCPrompt: 'Part C: If 45 students sign up for the trip, which package will cost LESS for the school?',
    partCOptions: [
      { id: 'pkgA', text: 'Package A (Charter Coach)' },
      { id: 'pkgB', text: 'Package B (Mini-Vans & Bistro)' },
      { id: 'pkgSame', text: 'Both packages cost the same' },
    ],
    correctPartC: 'pkgA',
    instructionalHint:
      'Package A is 8s + 350. Package B is 16s + 110. Solve for s. Then calculate the total cost for 45 students: 8(45) + 350 vs 16(45) + 110.',
    solutionExplanation:
      'Part A: 8s + 350 = 16s + 110. Part B: 350 - 110 = 16s - 8s → 240 = 8s → s = 30 students. Part C: At 45 students (> 30), Package A costs 8(45) + 350 = $710, while Package B costs 16(45) + 110 = $830. Package A saves $120.',
    keyTakeaway:
      'Beyond the break-even point of 30 students, the plan with the cheaper per-student rate (Package A at $8/student) provides greater cost savings.',
  },

  // ==========================================
  // Question 12: Synthesis Challenge
  // ==========================================
  {
    id: 'u6-dig-q12',
    number: 12,
    type: 'synthesis-challenge',
    typeLabel: 'Synthesis Challenge: Solution Set & Boundary',
    teks: 'TEKS 8.8C',
    topic: 'Multi-Step Rational Inequality & Boundary Testing',
    prompt:
      'Solve the multi-step rational inequality shown below. Select the correct comparison symbol, enter the boundary value, and select all values that belong to the solution set.',
    givenInequality: '(3/4)(x + 4) ≥ (1/2)x + 7',
    symbolOptions: ['<', '≤', '>', '≥'],
    correctSymbol: '≥',
    correctBoundary: '16',
    membershipValues: [
      { id: 'val1', val: '-4', isInSolution: false },
      { id: 'val2', val: '0', isInSolution: false },
      { id: 'val3', val: '15.9', isInSolution: false },
      { id: 'val4', val: '16', isInSolution: true },
      { id: 'val5', val: '16.5', isInSolution: true },
      { id: 'val6', val: '25', isInSolution: true },
    ],
    instructionalHint:
      'Expand: (3/4)x + 3 ≥ (1/2)x + 7. Multiply all terms by 4 to clear fractions: 3x + 12 ≥ 2x + 28. Subtract 2x and subtract 12 to find x ≥ 16.',
    solutionExplanation:
      'Multiply all terms by 4: 3(x + 4) ≥ 2x + 28 → 3x + 12 ≥ 2x + 28 → x ≥ 16. The boundary is 16 with symbol ≥. Values in the solution set must be 16 or greater: 16, 16.5, and 25.',
    keyTakeaway:
      'When solving multi-step rational inequalities, clearing denominators early prevents arithmetic errors. Always test your boundary in the original inequality.',
  },
];
