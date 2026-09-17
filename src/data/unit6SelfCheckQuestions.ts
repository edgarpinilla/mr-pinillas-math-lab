import { PracticeQuestion } from '../types';

export type SelfCheckQuestionType =
  | 'multiple-choice'
  | 'numeric-input'
  | 'inequality-entry'
  | 'multi-select';

export interface SelfCheckOption {
  id: string;
  text: string;
  mathFormatted?: string;
  isCorrect?: boolean;
}

export interface Unit6SelfCheckQuestion {
  id: string;
  round: 1 | 2 | 3;
  type: SelfCheckQuestionType;
  teks: string;
  strand: string;
  prompt: string;
  equationDisplay?: string;
  context?: string;
  options?: SelfCheckOption[];
  correctAnswer: string | number | string[];
  acceptedEquivalents?: string[];
  numericAnswer?: number;
  tolerance?: number;
  inequalityConfig?: {
    variable: string;
    symbol: '<' | '<=' | '>' | '>=';
    boundary: number;
  };
  hint: string;
  misconceptionFeedback: string;
  correctExplanation: string;
}

export const UNIT_6_SELF_CHECK_QUESTIONS: Unit6SelfCheckQuestion[] = [
  // =========================================================================
  // ROUND 1: Foundational Equations & Inequalities with Variables on Both Sides
  // =========================================================================
  {
    id: 'u6-sc-q1',
    round: 1,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.C',
    strand: 'Variables on Both Sides (Integers)',
    prompt: 'Solve the linear equation for x:',
    equationDisplay: '5x + 14 = 2x + 29',
    options: [
      { id: 'a', text: 'x = 14.3' },
      { id: 'b', text: 'x = 5', isCorrect: true },
      { id: 'c', text: 'x = -5' },
      { id: 'd', text: 'x = 3' },
    ],
    correctAnswer: 'b',
    hint: 'Collect the variable terms on one side first by subtracting 2x from both sides, then subtract 14 from both sides.',
    misconceptionFeedback:
      'Check your inverse operations. Subtract 2x from both sides: 5x - 2x = 3x, leaving 3x + 14 = 29. Then subtract 14 to isolate the 3x term.',
    correctExplanation:
      'Subtracting 2x from both sides gives 3x + 14 = 29. Subtracting 14 from both sides gives 3x = 15. Dividing both sides by 3 yields x = 5.',
  },
  {
    id: 'u6-sc-q2',
    round: 1,
    type: 'numeric-input',
    teks: 'TEKS 8.8.C',
    strand: 'Negative Coefficients',
    prompt: 'What value of x makes the equation true? Enter your numerical answer below.',
    equationDisplay: '-4x + 7 = 2x - 23',
    correctAnswer: 5,
    numericAnswer: 5,
    acceptedEquivalents: ['5', '5.0', '+5', 'x=5', 'x = 5'],
    hint: 'Add 4x to both sides to make the variable coefficient positive, then add 23 to both sides.',
    misconceptionFeedback:
      'Be careful with negative signs! Subtracting 2x from -4x produces -6x (not -2x). Alternatively, add 4x to both sides to obtain 7 = 6x - 23.',
    correctExplanation:
      'Adding 4x to both sides yields 7 = 6x - 23. Adding 23 to both sides yields 30 = 6x. Dividing both sides by 6 gives x = 5.',
  },
  {
    id: 'u6-sc-q3',
    round: 1,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.A',
    strand: 'Writing Real-World Equations',
    prompt:
      'Fitness Zone charges a $30 signup fee plus $15 per month. Power Gym charges no signup fee but costs $20 per month. Which equation can be used to determine m, the number of months for which the total cost at both gyms is the same?',
    options: [
      { id: 'a', text: '30m + 15 = 20m' },
      { id: 'b', text: '15m + 30 = 20m', isCorrect: true },
      { id: 'c', text: '15m - 30 = 20m' },
      { id: 'd', text: '15 + 30 + m = 20m' },
    ],
    correctAnswer: 'b',
    hint: 'Identify which number is the recurring monthly rate (multiplied by m) and which is the one-time flat fee (added once).',
    misconceptionFeedback:
      'The monthly rate of $15 applies each month, so it multiplies m (15m). The $30 signup fee is paid only once (+ 30).',
    correctExplanation:
      'Fitness Zone charges $15 per month plus a one-time $30 fee, modeled by 15m + 30. Power Gym charges $20 per month with no startup fee, modeled by 20m. Setting their total costs equal gives 15m + 30 = 20m.',
  },
  {
    id: 'u6-sc-q4',
    round: 1,
    type: 'inequality-entry',
    teks: 'TEKS 8.8.B',
    strand: 'Inequality Symbol Reversal',
    prompt: 'Solve the one-variable inequality for x:',
    equationDisplay: '-3x + 8 < 23',
    correctAnswer: 'x > -5',
    inequalityConfig: {
      variable: 'x',
      symbol: '>',
      boundary: -5,
    },
    acceptedEquivalents: ['x > -5', 'x>-5', '-5 < x', '-5<x'],
    hint: 'Subtract 8 from both sides first. When you divide both sides by the negative coefficient -3, remember the rule about reversing the inequality symbol.',
    misconceptionFeedback:
      'Remember the golden rule of inequalities: dividing or multiplying both sides by a negative number reverses the direction of the inequality symbol (< becomes >).',
    correctExplanation:
      'Subtracting 8 from both sides yields -3x < 15. Dividing both sides by -3 reverses the inequality symbol from < to >, resulting in x > -5.',
  },
  {
    id: 'u6-sc-q5',
    round: 1,
    type: 'numeric-input',
    teks: 'TEKS 8.8.C',
    strand: 'Combining Like Terms',
    prompt: 'Simplify and solve for x. Enter your numerical answer below.',
    equationDisplay: '8x - 3 - 2x = 3x + 18',
    correctAnswer: 7,
    numericAnswer: 7,
    acceptedEquivalents: ['7', '7.0', '+7', 'x=7', 'x = 7'],
    hint: 'Combine like terms on the left side (8x - 2x) before moving any terms across the equals sign.',
    misconceptionFeedback:
      'Combine like terms on the left first: 8x - 2x = 6x, so 6x - 3 = 3x + 18. Then subtract 3x from both sides and add 3 to both sides.',
    correctExplanation:
      'Combining like terms on the left gives 6x - 3 = 3x + 18. Subtracting 3x from both sides gives 3x - 3 = 18. Adding 3 gives 3x = 21. Dividing by 3 yields x = 7.',
  },
  {
    id: 'u6-sc-q6',
    round: 1,
    type: 'multi-select',
    teks: 'TEKS 8.8.B',
    strand: 'Inequality Solution Sets',
    prompt:
      'Which of the following values of x make the inequality true? Select ALL that apply.',
    equationDisplay: '4x - 6 ≥ 2x + 4',
    options: [
      { id: 'opt1', text: 'x = 3' },
      { id: 'opt2', text: 'x = 5', isCorrect: true },
      { id: 'opt3', text: 'x = 8', isCorrect: true },
      { id: 'opt4', text: 'x = 0' },
      { id: 'opt5', text: 'x = 10', isCorrect: true },
    ],
    correctAnswer: ['opt2', 'opt3', 'opt5'],
    hint: 'Solve the inequality for x first: subtract 2x from both sides and add 6 to both sides. Any number greater than or equal to that boundary value is a solution.',
    misconceptionFeedback:
      'Solving 4x - 6 ≥ 2x + 4 yields 2x ≥ 10, which simplifies to x ≥ 5. Notice that because the symbol is ≥ (greater than or equal to), the boundary number 5 is included!',
    correctExplanation:
      'Subtracting 2x and adding 6 yields 2x ≥ 10, so x ≥ 5. The values x = 5, x = 8, and x = 10 are all greater than or equal to 5 and make the inequality true.',
  },

  // =========================================================================
  // ROUND 2: Rational Coefficients, Fractions, Decimals & Word Problems
  // =========================================================================
  {
    id: 'u6-sc-q7',
    round: 2,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.C',
    strand: 'Clearing Fractions with LCM',
    prompt: 'Solve the equation with fractional coefficients for x:',
    equationDisplay: '1/2 x + 4 = 3/4 x + 1',
    options: [
      { id: 'a', text: 'x = 6' },
      { id: 'b', text: 'x = 12', isCorrect: true },
      { id: 'c', text: 'x = -12' },
      { id: 'd', text: 'x = 20' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply every single term on both sides by the least common denominator 4 to eliminate all fractions in one step.',
    misconceptionFeedback:
      'When multiplying by the LCM of 4, make sure to multiply every term, including the constants: 4(1/2 x) + 4(4) = 4(3/4 x) + 4(1), which gives 2x + 16 = 3x + 4.',
    correctExplanation:
      'Multiplying every term by 4 gives 2x + 16 = 3x + 4. Subtracting 2x from both sides yields 16 = x + 4. Subtracting 4 from both sides yields x = 12.',
  },
  {
    id: 'u6-sc-q8',
    round: 2,
    type: 'numeric-input',
    teks: 'TEKS 8.8.C',
    strand: 'Decimal Equations',
    prompt: 'Solve the equation involving decimals. Enter the value of x below.',
    equationDisplay: '0.6x + 2.4 = 0.2x + 5.6',
    correctAnswer: 8,
    numericAnswer: 8,
    acceptedEquivalents: ['8', '8.0', '+8', 'x=8', 'x = 8'],
    hint: 'Subtract 0.2x from both sides to collect variable terms, then subtract 2.4 from both sides to isolate x.',
    misconceptionFeedback:
      'Subtracting 0.2x from 0.6x leaves 0.4x. Subtracting 2.4 from 5.6 leaves 3.2. Finally, divide 3.2 by 0.4.',
    correctExplanation:
      'Subtracting 0.2x from both sides gives 0.4x + 2.4 = 5.6. Subtracting 2.4 gives 0.4x = 3.2. Dividing both sides by 0.4 yields x = 8.',
  },
  {
    id: 'u6-sc-q9',
    round: 2,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.A',
    strand: 'Real-World Inequalities',
    prompt:
      'Elena has $120 saved and deposits $15 per week. Marcus has $40 saved and deposits $25 per week. Which inequality can be used to find w, the number of weeks it will take for Marcus’s savings to exceed Elena’s savings?',
    options: [
      { id: 'a', text: '25w + 40 < 15w + 120' },
      { id: 'b', text: '25w + 40 > 15w + 120', isCorrect: true },
      { id: 'c', text: '25w + 40 ≥ 15w + 120' },
      { id: 'd', text: '40w + 25 > 120w + 15' },
    ],
    correctAnswer: 'b',
    hint: 'The word "exceed" means strictly greater than (>), not less than or equal to.',
    misconceptionFeedback:
      'Marcus starts with $40 and adds $25 each week (25w + 40). Elena starts with $120 and adds $15 each week (15w + 120). To exceed means strictly greater than (>).',
    correctExplanation:
      'Marcus’s total savings is represented by 25w + 40 and Elena’s total is 15w + 120. For Marcus to exceed Elena, his total must be strictly greater: 25w + 40 > 15w + 120.',
  },
  {
    id: 'u6-sc-q10',
    round: 2,
    type: 'inequality-entry',
    teks: 'TEKS 8.8.B',
    strand: 'Multi-Step Inequality & Symbol Flip',
    prompt: 'Solve the inequality for x:',
    equationDisplay: '2x - 9 ≤ 7x + 16',
    correctAnswer: 'x >= -5',
    inequalityConfig: {
      variable: 'x',
      symbol: '>=',
      boundary: -5,
    },
    acceptedEquivalents: ['x >= -5', 'x ≥ -5', '-5 <= x', '-5 ≤ x', 'x>=-5', 'x≥-5'],
    hint: 'Subtract 7x from both sides to get -5x - 9 ≤ 16. Add 9, then divide by -5 and remember to reverse the inequality symbol.',
    misconceptionFeedback:
      'Watch the symbol direction! Dividing -5x ≤ 25 by the negative number -5 reverses ≤ to ≥, giving x ≥ -5.',
    correctExplanation:
      'Subtracting 7x from both sides yields -5x - 9 ≤ 16. Adding 9 gives -5x ≤ 25. Dividing both sides by -5 reverses the symbol from ≤ to ≥, giving x ≥ -5.',
  },
  {
    id: 'u6-sc-q11',
    round: 2,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.C',
    strand: 'Error Analysis',
    prompt:
      'A student attempted to solve 6x - 4 = 2x + 12. Review their work:\nStep 1: 4x - 4 = 12\nStep 2: 4x = 8\nStep 3: x = 2\nIn which step did the student make their first error?',
    options: [
      { id: 'a', text: 'Step 1: The student should have added 2x to both sides.' },
      {
        id: 'b',
        text: 'Step 2: The student subtracted 4 instead of adding 4 to both sides.',
        isCorrect: true,
      },
      { id: 'c', text: 'Step 3: The student divided 8 by 4 incorrectly.' },
      { id: 'd', text: 'The student solved the equation correctly with no errors.' },
    ],
    correctAnswer: 'b',
    hint: 'Look closely at Step 2. What is the inverse operation of subtracting 4?',
    misconceptionFeedback:
      'In Step 1, 4x - 4 = 12 is correct. In Step 2, the inverse of subtracting 4 is adding 4: 12 + 4 = 16, so the equation should be 4x = 16.',
    correctExplanation:
      'The student made an error in Step 2. To undo the -4 in 4x - 4 = 12, they should have added 4 to both sides, which gives 4x = 16, resulting in x = 4.',
  },
  {
    id: 'u6-sc-q12',
    round: 2,
    type: 'numeric-input',
    teks: 'TEKS 8.8.A',
    strand: 'Real-World Solution Interpretation',
    prompt:
      'Two water tanks are draining. Tank A begins with 450 gallons and drains at 25 gallons per minute. Tank B begins with 330 gallons and drains at 15 gallons per minute. After how many minutes will both tanks have the exact same volume of water?',
    equationDisplay: '450 - 25m = 330 - 15m',
    correctAnswer: 12,
    numericAnswer: 12,
    acceptedEquivalents: ['12', '12.0', 'm=12', 'm = 12', '12 min', '12 minutes'],
    hint: 'Add 25m to both sides to make the variable term positive: 450 = 330 + 10m. Then subtract 330 from both sides.',
    misconceptionFeedback:
      'Set the two expressions equal: 450 - 25m = 330 - 15m. Adding 25m to both sides gives 450 = 330 + 10m. Subtract 330 to get 120 = 10m.',
    correctExplanation:
      'Equating the two tank volumes gives 450 - 25m = 330 - 15m. Adding 25m to both sides gives 450 = 330 + 10m. Subtracting 330 gives 120 = 10m. Dividing by 10 gives m = 12 minutes.',
  },

  // =========================================================================
  // ROUND 3: Advanced Rational Solving, Multi-Step Modeling & Mastery
  // =========================================================================
  {
    id: 'u6-sc-q13',
    round: 3,
    type: 'numeric-input',
    teks: 'TEKS 8.8.C',
    strand: 'Rational Equations with Different Denominators',
    prompt: 'Solve the equation with rational coefficients. Enter the value of x below.',
    equationDisplay: '2/3 x - 5 = 1/6 x + 1',
    correctAnswer: 12,
    numericAnswer: 12,
    acceptedEquivalents: ['12', '12.0', '+12', 'x=12', 'x = 12'],
    hint: 'Multiply every term on both sides by the least common denominator 6. Remember to multiply -5 and +1 by 6 as well!',
    misconceptionFeedback:
      'Clearing fractions with LCM 6: 6(2/3 x) - 6(5) = 6(1/6 x) + 6(1), giving 4x - 30 = x + 6. Subtract x and add 30.',
    correctExplanation:
      'Multiplying by 6 gives 4x - 30 = x + 6. Subtracting x gives 3x - 30 = 6. Adding 30 gives 3x = 36. Dividing by 3 yields x = 12.',
  },
  {
    id: 'u6-sc-q14',
    round: 3,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.B',
    strand: 'Multi-Step Inequalities with Negatives',
    prompt: 'Solve the inequality for x:',
    equationDisplay: '-5x + 12 > -2x - 9',
    options: [
      { id: 'a', text: 'x > 7' },
      { id: 'b', text: 'x < 7', isCorrect: true },
      { id: 'c', text: 'x < -7' },
      { id: 'd', text: 'x > -7' },
    ],
    correctAnswer: 'b',
    hint: 'Add 2x to both sides to get -3x + 12 > -9. Subtract 12 from both sides, then divide by -3 and flip the inequality symbol.',
    misconceptionFeedback:
      'Adding 2x gives -3x + 12 > -9. Subtracting 12 gives -3x > -21. Dividing by -3 reverses > to < and makes -21 / -3 = +7, so x < 7.',
    correctExplanation:
      'Adding 2x to both sides yields -3x + 12 > -9. Subtracting 12 yields -3x > -21. Dividing both sides by -3 reverses the symbol from > to < and yields x < 7.',
  },
  {
    id: 'u6-sc-q15',
    round: 3,
    type: 'multi-select',
    teks: 'TEKS 8.8.A',
    strand: 'Real-World Constraints & Inequalities',
    prompt:
      'A delivery van can safely carry a maximum cargo weight of 1,800 pounds. The driver weighs 180 pounds and each shipping crate weighs 45 pounds. The inequality 45c + 180 ≤ 1800 represents the number of crates c the van can carry. Which of the following numbers of crates can the van legally carry? Select ALL that apply.',
    options: [
      { id: 'opt1', text: '25 crates', isCorrect: true },
      { id: 'opt2', text: '36 crates', isCorrect: true },
      { id: 'opt3', text: '40 crates' },
      { id: 'opt4', text: '30 crates', isCorrect: true },
      { id: 'opt5', text: '45 crates' },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt4'],
    hint: 'Solve the inequality for c: subtract 180 from 1800, then divide by 45. Any crate count less than or equal to that number is safe.',
    misconceptionFeedback:
      'Subtracting 180 gives 45c ≤ 1620. Dividing by 45 gives c ≤ 36. Any crate count from 0 to 36 is acceptable.',
    correctExplanation:
      'Solving 45c + 180 ≤ 1800 yields 45c ≤ 1620, so c ≤ 36 crates. Therefore, 25, 30, and 36 crates are all within the legal capacity limit.',
  },
  {
    id: 'u6-sc-q16',
    round: 3,
    type: 'numeric-input',
    teks: 'TEKS 8.8.C',
    strand: 'Decimal Equations with Negative Terms',
    prompt: 'Solve the equation for x. Enter your answer below.',
    equationDisplay: '1.5x - 7.5 = -0.5x + 4.5',
    correctAnswer: 6,
    numericAnswer: 6,
    acceptedEquivalents: ['6', '6.0', '+6', 'x=6', 'x = 6'],
    hint: 'Add 0.5x to both sides to eliminate the negative variable term on the right, giving 2.0x - 7.5 = 4.5.',
    misconceptionFeedback:
      'Adding 0.5x to 1.5x gives 2.0x. Then add 7.5 to 4.5 to get 12.0. Finally, divide 12 by 2.',
    correctExplanation:
      'Adding 0.5x to both sides gives 2x - 7.5 = 4.5. Adding 7.5 to both sides gives 2x = 12. Dividing by 2 yields x = 6.',
  },
  {
    id: 'u6-sc-q17',
    round: 3,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.B',
    strand: 'Error Analysis on Inequality Flip',
    prompt:
      'Carlos worked out the inequality -4x + 15 ≥ 35:\nStep 1: -4x ≥ 20\nStep 2: x ≥ -5\nWhat error did Carlos make in his work?',
    options: [
      { id: 'a', text: 'In Step 1, he should have added 15 to 35 instead of subtracting.' },
      { id: 'b', text: 'In Step 2, he divided 20 by -4 and got the wrong sign.' },
      {
        id: 'c',
        text: 'In Step 2, he forgot to reverse the inequality symbol when dividing by -4.',
        isCorrect: true,
      },
      { id: 'd', text: 'Carlos solved the inequality correctly with no errors.' },
    ],
    correctAnswer: 'c',
    hint: 'Notice the division in Step 2: 20 divided by -4. What must happen to the inequality sign when dividing by a negative number?',
    misconceptionFeedback:
      'In Step 2, dividing both sides by the negative number -4 must flip the direction of the inequality: ≥ becomes ≤. The correct solution is x ≤ -5.',
    correctExplanation:
      'When dividing both sides of an inequality by a negative number (-4), the inequality symbol must reverse direction. Carlos should have written x ≤ -5 instead of x ≥ -5.',
  },
  {
    id: 'u6-sc-q18',
    round: 3,
    type: 'multiple-choice',
    teks: 'TEKS 8.8.A',
    strand: 'Real-World Multi-Step Cost Comparison',
    prompt:
      'A plumber charges a $55 diagnostic fee plus $40 per hour of labor. An electrician charges a $30 service fee plus $45 per hour of labor. For how many hours of work, h, do both professionals charge the exact same total amount?',
    options: [
      { id: 'a', text: '55h + 40 = 30h + 45; equal at 5 hours' },
      { id: 'b', text: '40h + 55 = 45h + 30; equal at 5 hours', isCorrect: true },
      { id: 'c', text: '40h + 55 = 45h + 30; equal at 2.5 hours' },
      { id: 'd', text: '40h - 55 = 45h - 30; equal at 5 hours' },
    ],
    correctAnswer: 'b',
    hint: 'The plumber’s cost is 40h + 55 and the electrician’s cost is 45h + 30. Set them equal and solve for h.',
    misconceptionFeedback:
      'Set 40h + 55 = 45h + 30. Subtract 40h from both sides to get 55 = 5h + 30. Subtract 30 to get 25 = 5h, so h = 5 hours.',
    correctExplanation:
      'The plumber charges 40h + 55 and the electrician charges 45h + 30. Setting them equal: 40h + 55 = 45h + 30. Subtracting 40h gives 55 = 5h + 30. Subtracting 30 gives 25 = 5h. Dividing by 5 yields h = 5 hours.',
  },
];

/**
 * Returns exactly 6 unique questions for the requested round:
 * - Round 1: Questions 1–6
 * - Round 2: Questions 7–12
 * - Round 3: Questions 13–18
 */
export function getUnit6RoundQuestions(round: 1 | 2 | 3): Unit6SelfCheckQuestion[] {
  return UNIT_6_SELF_CHECK_QUESTIONS.filter((q) => q.round === round);
}

/**
 * Adapter that converts Unit6SelfCheckQuestions to PracticeQuestion format
 * for TeacherPrintCenter and legacy component consumers.
 */
export const UNIT_6_PRACTICE_QUESTIONS: PracticeQuestion[] = UNIT_6_SELF_CHECK_QUESTIONS.map(
  (q, idx) => {
    let options: string[] = [];
    let correctIndex = 0;

    if (q.options && q.options.length > 0) {
      options = q.options.map((opt) => opt.text);
      const foundIdx = q.options.findIndex((opt) => opt.isCorrect);
      correctIndex = foundIdx >= 0 ? foundIdx : 0;
    } else if (typeof q.correctAnswer === 'number' || typeof q.correctAnswer === 'string') {
      const correctStr = String(q.correctAnswer);
      options = [
        `x = ${correctStr}`,
        `x = ${Number(correctStr) + 2}`,
        `x = -${correctStr}`,
        `x = ${Number(correctStr) - 1}`,
      ];
      correctIndex = 0;
    }

    return {
      id: q.id,
      question: q.prompt + (q.equationDisplay ? `\n\n${q.equationDisplay}` : ''),
      category: q.strand,
      options,
      correctIndex,
      explanation: q.correctExplanation,
      hint: q.hint,
    };
  }
);
