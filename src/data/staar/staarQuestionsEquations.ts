export interface QuestionNumberLine {
  boundary: number;
  symbol: '<' | '<=' | '>' | '>=';
  minVal: number;
  maxVal: number;
  step?: number;
}

export interface StaarEquationsQuestion {
  id: string;
  round: 1 | 2 | 3;
  questionNumber: number;
  teks: string;
  strand: string;
  type: 'multiple-choice' | 'numeric-input' | 'inequality-entry' | 'multi-select' | 'error-analysis';
  prompt: string;
  equationDisplay?: string;
  options?: {
    id: string;
    text: string;
    numberLine?: QuestionNumberLine;
  }[];
  correctAnswer: string | string[];
  acceptedEquivalents?: string[];
  numericAnswer?: number;
  inequalityConfig?: {
    symbol: '<' | '<=' | '>' | '>=';
    boundary: number;
  };
  hint: string;
  misconceptionFeedback: string;
  correctExplanation: string;
}

export const STAAR_EQUATIONS_QUESTIONS: StaarEquationsQuestion[] = [
  // ==========================================
  // ROUND 1 (Questions 1 to 12)
  // ==========================================
  {
    id: 'u6-staar-q01',
    round: 1,
    questionNumber: 1,
    teks: 'TEKS 8.8.C',
    strand: 'Equations with Variables on Both Sides',
    type: 'multiple-choice',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '7x + 18 = 3x + 42',
    options: [
      { id: 'a', text: 'x = 15' },
      { id: 'b', text: 'x = 6' },
      { id: 'c', text: 'x = -6' },
      { id: 'd', text: 'x = 2.4' },
    ],
    correctAnswer: 'b',
    hint: 'Collect variable terms on one side by subtracting 3x from both sides, then subtract 18 from both sides to isolate the variable term.',
    misconceptionFeedback:
      'Remember to perform the opposite operation on both sides. Subtracting 3x from 7x gives 4x, and subtracting 18 from 42 gives 24. Then divide 24 by 4.',
    correctExplanation:
      'Subtract 3x from both sides: 4x + 18 = 42. Subtract 18 from both sides: 4x = 24. Divide by 4: x = 6. Verification: 7(6) + 18 = 60 and 3(6) + 42 = 60.',
  },
  {
    id: 'u6-staar-q02',
    round: 1,
    questionNumber: 2,
    teks: 'TEKS 8.8.A',
    strand: 'Writing Equations from Real-World Situations',
    type: 'multiple-choice',
    prompt:
      'Sparkle Car Wash charges $12 for an exterior wash plus $3 per minute of vacuum detailing. Clean Wheels Car Wash charges $6 for an exterior wash plus $5 per minute of vacuum detailing.\n\nWhich equation can be used to find m, the number of minutes of vacuum detailing for which the total cost at both car washes will be equal?',
    options: [
      { id: 'a', text: '12m + 3 = 6m + 5' },
      { id: 'b', text: '3m + 12 = 5m + 6' },
      { id: 'c', text: '12 + 5m = 6 + 3m' },
      { id: 'd', text: '3m + 5m = 12 + 6' },
    ],
    correctAnswer: 'b',
    hint: 'Identify the fixed fee (constant) and per-minute charge (rate multiplying m) for each car wash, then set their expressions equal.',
    misconceptionFeedback:
      'The variable m must multiply the per-minute rate ($3 and $5), while the exterior wash fees ($12 and $6) are one-time constants added to each side.',
    correctExplanation:
      'Sparkle Car Wash charges 3m + 12. Clean Wheels charges 5m + 6. Setting their total costs equal gives 3m + 12 = 5m + 6 (or 12 + 3m = 6 + 5m).',
  },
  {
    id: 'u6-staar-q03',
    round: 1,
    questionNumber: 3,
    teks: 'TEKS 8.8.C',
    strand: 'Solving with Negative Coefficients',
    type: 'numeric-input',
    prompt: 'What is the solution to the equation shown below?',
    equationDisplay: '-5x + 9 = 2x - 26',
    correctAnswer: '5',
    acceptedEquivalents: ['5', '5.0', 'x=5', 'x = 5'],
    numericAnswer: 5,
    hint: 'Add 5x to both sides to eliminate the negative variable term, then add 26 to both sides.',
    misconceptionFeedback:
      'Be careful with negative signs! Adding 5x to both sides gives 9 = 7x - 26. Then add 26 to 9 to get 35 = 7x.',
    correctExplanation:
      'Add 5x to both sides: 9 = 7x - 26. Add 26 to both sides: 35 = 7x. Divide by 7: x = 5. Checking: -5(5) + 9 = -16 and 2(5) - 26 = -16.',
  },
  {
    id: 'u6-staar-q04',
    round: 1,
    questionNumber: 4,
    teks: 'TEKS 8.8.C',
    strand: 'Inequalities with Symbol Reversal',
    type: 'multiple-choice',
    prompt: 'Which number line represents the solution set for the inequality?',
    equationDisplay: '-4x + 15 < 3',
    options: [
      {
        id: 'a',
        text: 'x > 3 (Open circle at 3, shaded to the right)',
        numberLine: { boundary: 3, symbol: '>', minVal: 0, maxVal: 6 },
      },
      {
        id: 'b',
        text: 'x < 3 (Open circle at 3, shaded to the left)',
        numberLine: { boundary: 3, symbol: '<', minVal: 0, maxVal: 6 },
      },
      {
        id: 'c',
        text: 'x ≥ 3 (Closed circle at 3, shaded to the right)',
        numberLine: { boundary: 3, symbol: '>=', minVal: 0, maxVal: 6 },
      },
      {
        id: 'd',
        text: 'x > -3 (Open circle at -3, shaded to the right)',
        numberLine: { boundary: -3, symbol: '>', minVal: -6, maxVal: 0 },
      },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 15 from both sides: -4x < -12. When dividing both sides by negative 4, remember to reverse the inequality symbol.',
    misconceptionFeedback:
      'Dividing both sides of an inequality by a negative number reverses the inequality symbol from < to >. Also, strict inequalities (< or >) use an open circle.',
    correctExplanation:
      'Subtract 15 from both sides: -4x < -12. Divide both sides by -4 and reverse the symbol: x > 3. Because it is strictly greater than, the number line has an open circle at 3 with shading pointing to the right.',
  },
  {
    id: 'u6-staar-q05',
    round: 1,
    questionNumber: 5,
    teks: 'TEKS 8.8.B',
    strand: 'Writing Real-World Problems from Equations',
    type: 'multiple-choice',
    prompt: 'Which real-world situation can be modeled by the equation shown?',
    equationDisplay: '20x + 45 = 15x + 75',
    options: [
      {
        id: 'a',
        text: 'Gym A charges a $45 registration fee plus $20 per month. Gym B charges a $75 registration fee plus $15 per month. For what number of months, x, will the total cost be the same?',
      },
      {
        id: 'b',
        text: 'A student starts with $45 and spends $20 each week. Another student starts with $75 and spends $15 each week. After how many weeks, x, will both students have the same balance?',
      },
      {
        id: 'c',
        text: 'A repairman charges $20 for parts and $45 per hour of labor. Another technician charges $15 for parts and $75 per hour. For how many hours, x, will the charges be equal?',
      },
      {
        id: 'd',
        text: 'A store sells x notebooks for $20 each and 45 pens for $15 each, totaling $75 in sales.',
      },
    ],
    correctAnswer: 'a',
    hint: 'Notice that x multiplies 20 on the left and 15 on the right, representing recurring monthly rates. The constants 45 and 75 represent one-time initial fees.',
    misconceptionFeedback:
      'In option C, the hourly rate and one-time parts fees are reversed (45x + 20 = 75x + 15). In option B, spending would represent subtraction rather than addition.',
    correctExplanation:
      'In option A, Gym A charges 20x + 45 and Gym B charges 15x + 75. Setting their total costs equal produces the exact equation 20x + 45 = 15x + 75.',
  },
  {
    id: 'u6-staar-q06',
    round: 1,
    questionNumber: 6,
    teks: 'TEKS 8.8.C',
    strand: 'Solving Multi-Step Inequalities',
    type: 'inequality-entry',
    prompt:
      'Solve the inequality. Select the correct comparison symbol and enter the boundary value for x.',
    equationDisplay: '6x - 14 ≥ 2x + 18',
    correctAnswer: 'x >= 8',
    inequalityConfig: {
      symbol: '>=',
      boundary: 8,
    },
    hint: 'Subtract 2x from both sides to get 4x - 14 ≥ 18. Then add 14 to both sides and divide by 4.',
    misconceptionFeedback:
      'Because you divide both sides by positive 4, the inequality symbol does NOT reverse. 4x ≥ 32 gives x ≥ 8.',
    correctExplanation:
      'Subtract 2x from both sides: 4x - 14 ≥ 18. Add 14 to both sides: 4x ≥ 32. Divide both sides by 4: x ≥ 8. The symbol does not flip because 4 is positive.',
  },
  {
    id: 'u6-staar-q07',
    round: 1,
    questionNumber: 7,
    teks: 'TEKS 8.8.C',
    strand: 'Decimal Equations with Variables on Both Sides',
    type: 'multiple-choice',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '1.2x + 4.8 = 0.4x + 9.6',
    options: [
      { id: 'a', text: 'x = 0.6' },
      { id: 'b', text: 'x = 6' },
      { id: 'c', text: 'x = 9' },
      { id: 'd', text: 'x = 3' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.4x from both sides to get 0.8x + 4.8 = 9.6. Then subtract 4.8 from both sides.',
    misconceptionFeedback:
      'Subtracting 0.4x from 1.2x yields 0.8x. Subtracting 4.8 from 9.6 yields 4.8. Dividing 4.8 by 0.8 equals 6 (not 0.6).',
    correctExplanation:
      '1.2x - 0.4x = 9.6 - 4.8 → 0.8x = 4.8 → x = 4.8 / 0.8 = 6. Verification: 1.2(6) + 4.8 = 7.2 + 4.8 = 12; 0.4(6) + 9.6 = 2.4 + 9.6 = 12.',
  },
  {
    id: 'u6-staar-q08',
    round: 1,
    questionNumber: 8,
    teks: 'TEKS 8.8.C',
    strand: 'Multi-Step Equation Error Analysis',
    type: 'error-analysis',
    prompt:
      'A student attempted to solve the equation 4(x - 3) = 2x + 10 as shown below:\n\nStep 1: 4x - 12 = 2x + 10\nStep 2: 2x - 12 = 10\nStep 3: 2x = -2\nStep 4: x = -1\n\nIn which step did the student make their first algebraic error?',
    options: [
      { id: 'a', text: 'Step 1: The student failed to distribute 4 to the -3.' },
      { id: 'b', text: 'Step 2: The student subtracted 2x from only one side.' },
      { id: 'c', text: 'Step 3: The student subtracted 12 from 10 instead of adding 12 to 10.' },
      { id: 'd', text: 'Step 4: The student divided by 2 incorrectly.' },
    ],
    correctAnswer: 'c',
    hint: 'Examine how the student moved from 2x - 12 = 10 to 2x = -2. What inverse operation cancels out -12?',
    misconceptionFeedback:
      'The inverse of subtracting 12 is adding 12! The student did 10 - 12 = -2 instead of 10 + 12 = 22.',
    correctExplanation:
      'Step 1 correctly expands 4(x - 3) = 4x - 12. Step 2 correctly subtracts 2x from both sides. In Step 3, the inverse of -12 is +12, so 2x = 10 + 12 = 22. The student subtracted 12, creating the error.',
  },
  {
    id: 'u6-staar-q09',
    round: 1,
    questionNumber: 9,
    teks: 'TEKS 8.8.A',
    strand: 'Writing Inequalities from Word Problems',
    type: 'multiple-choice',
    prompt:
      'A community pool charges non-members $8 per visit. A summer pass costs a flat fee of $50 plus $3 per visit.\n\nMaya wants to know the minimum number of visits, v, for which buying the summer pass will cost less than paying per visit as a non-member. Which inequality models this problem?',
    options: [
      { id: 'a', text: '50 + 3v > 8v' },
      { id: 'b', text: '50 + 3v < 8v' },
      { id: 'c', text: '50v + 3 ≤ 8v' },
      { id: 'd', text: '50 + 3v ≤ 8' },
    ],
    correctAnswer: 'b',
    hint: '"Cost less than" translates directly to the strict less than symbol (<). Summer pass cost is 50 + 3v and non-member cost is 8v.',
    misconceptionFeedback:
      'Option A states the pass costs more than non-member visits (>). Option C puts the variable on the flat fee ($50). Option B correctly states 50 + 3v < 8v.',
    correctExplanation:
      'Summer pass cost: 50 + 3v. Non-member cost: 8v. For the pass to cost less than non-member admission, 50 + 3v < 8v.',
  },
  {
    id: 'u6-staar-q10',
    round: 1,
    questionNumber: 10,
    teks: 'TEKS 8.8.C',
    strand: 'Distributive Property with Equations',
    type: 'numeric-input',
    prompt: 'What value of x makes this equation true?',
    equationDisplay: '3(2x + 5) = 4x + 29',
    correctAnswer: '7',
    acceptedEquivalents: ['7', '7.0', 'x=7', 'x = 7'],
    numericAnswer: 7,
    hint: 'First apply the distributive property on the left side: 3(2x) + 3(5) = 6x + 15.',
    misconceptionFeedback:
      'Distribute 3 to both terms inside the parentheses: 6x + 15 = 4x + 29. Subtract 4x from both sides: 2x + 15 = 29. Subtract 15: 2x = 14.',
    correctExplanation:
      '3(2x + 5) = 4x + 29 → 6x + 15 = 4x + 29. Subtract 4x: 2x + 15 = 29. Subtract 15: 2x = 14. Divide by 2: x = 7. Verification: 3(2(7) + 5) = 3(19) = 57 and 4(7) + 29 = 28 + 29 = 57.',
  },
  {
    id: 'u6-staar-q11',
    round: 1,
    questionNumber: 11,
    teks: 'TEKS 8.8.C',
    strand: 'Identifying Values in Solution Sets',
    type: 'multi-select',
    prompt:
      'Consider the inequality 5x - 7 > 2x + 8.\n\nWhich of the following values of x are solutions to the inequality? Select all that apply.',
    options: [
      { id: 'opt1', text: 'x = 3' },
      { id: 'opt2', text: 'x = 5' },
      { id: 'opt3', text: 'x = 6' },
      { id: 'opt4', text: 'x = 9' },
      { id: 'opt5', text: 'x = -2' },
      { id: 'opt6', text: 'x = 5.5' },
    ],
    correctAnswer: ['opt3', 'opt4', 'opt6'],
    hint: 'Solve the inequality first: 5x - 2x > 8 + 7 → 3x > 15 → x > 5. Then select all values strictly greater than 5.',
    misconceptionFeedback:
      'Notice the inequality is strictly greater than (>), so x = 5 is NOT a solution because 5 is not greater than 5! Only values greater than 5 qualify.',
    correctExplanation:
      'Solving 5x - 7 > 2x + 8 yields 3x > 15, so x > 5. Among the choices, 6, 9, and 5.5 are strictly greater than 5.',
  },
  {
    id: 'u6-staar-q12',
    round: 1,
    questionNumber: 12,
    teks: 'TEKS 8.8.C',
    strand: 'Combining Like Terms on One Side',
    type: 'multiple-choice',
    prompt: 'What is the solution to the equation shown?',
    equationDisplay: '9x - 4 - 3x = 2x + 24',
    options: [
      { id: 'a', text: 'x = 7' },
      { id: 'b', text: 'x = 2.8' },
      { id: 'c', text: 'x = 5' },
      { id: 'd', text: 'x = -7' },
    ],
    correctAnswer: 'a',
    hint: 'Combine the like terms on the left side first: 9x - 3x = 6x, so 6x - 4 = 2x + 24.',
    misconceptionFeedback:
      'Combine 9x - 3x to get 6x - 4. Subtract 2x from both sides to get 4x - 4 = 24. Add 4 to both sides: 4x = 28, so x = 7.',
    correctExplanation:
      'Combine like terms on left: 6x - 4 = 2x + 24. Subtract 2x: 4x - 4 = 24. Add 4: 4x = 28. Divide by 4: x = 7. Verification: 9(7) - 4 - 3(7) = 63 - 4 - 21 = 38; 2(7) + 24 = 38.',
  },

  // ==========================================
  // ROUND 2 (Questions 13 to 24)
  // ==========================================
  {
    id: 'u6-staar-q13',
    round: 2,
    questionNumber: 13,
    teks: 'TEKS 8.8.C',
    strand: 'Rational Coefficient Equations with LCM',
    type: 'multiple-choice',
    prompt: 'What is the solution to the equation shown?',
    equationDisplay: '(1/3)x + 5 = (5/6)x - 1',
    options: [
      { id: 'a', text: 'x = 12' },
      { id: 'b', text: 'x = 8' },
      { id: 'c', text: 'x = 6' },
      { id: 'd', text: 'x = -12' },
    ],
    correctAnswer: 'a',
    hint: 'Clear the denominators by multiplying every term on both sides by the least common denominator (LCD), which is 6.',
    misconceptionFeedback:
      'Be sure to multiply the integer terms by 6 as well! 6(1/3 x) + 6(5) = 6(5/6 x) - 6(1) gives 2x + 30 = 5x - 6.',
    correctExplanation:
      'Multiply all terms by 6: 2x + 30 = 5x - 6. Subtract 2x from both sides: 30 = 3x - 6. Add 6 to both sides: 36 = 3x. Divide by 3: x = 12. Verification: 1/3(12) + 5 = 9 and 5/6(12) - 1 = 10 - 1 = 9.',
  },
  {
    id: 'u6-staar-q14',
    round: 2,
    questionNumber: 14,
    teks: 'TEKS 8.8.A',
    strand: 'Modeling Plan Comparisons with Tables',
    type: 'multiple-choice',
    prompt:
      'Two electronics repair shops charge for screen replacement as follows:\n\n• Shop A: $30 diagnostic fee plus $25 per hour of labor\n• Shop B: $50 diagnostic fee plus $20 per hour of labor\n\nWhich equation can be used to determine h, the number of hours of labor for which both repair shops charge the same total amount?',
    options: [
      { id: 'a', text: '30h + 25 = 50h + 20' },
      { id: 'b', text: '25h + 30 = 20h + 50' },
      { id: 'c', text: '25h + 20h = 30 + 50' },
      { id: 'd', text: '25h - 30 = 20h - 50' },
    ],
    correctAnswer: 'b',
    hint: 'The hourly rates ($25 and $20) must be multiplied by h. The diagnostic fees ($30 and $50) are flat constants.',
    misconceptionFeedback:
      'Do not switch the rates and flat fees. Shop A charges 25h + 30 and Shop B charges 20h + 50.',
    correctExplanation:
      'Shop A charges 25h + 30 and Shop B charges 20h + 50. Setting them equal to find when costs are the same gives 25h + 30 = 20h + 50.',
  },
  {
    id: 'u6-staar-q15',
    round: 2,
    questionNumber: 15,
    teks: 'TEKS 8.8.C',
    strand: 'Inequalities with Variables on Both Sides',
    type: 'inequality-entry',
    prompt:
      'Solve the inequality. Select the correct comparison symbol and enter the boundary value for x.',
    equationDisplay: '-3x + 14 > 5x - 18',
    correctAnswer: 'x < 4',
    inequalityConfig: {
      symbol: '<',
      boundary: 4,
    },
    hint: 'Subtract 5x from both sides: -8x + 14 > -18. Then subtract 14: -8x > -32. Remember to reverse the symbol when dividing by -8.',
    misconceptionFeedback:
      'Dividing -32 by -8 gives positive 4, and dividing both sides by negative 8 reverses the symbol from > to <.',
    correctExplanation:
      'Subtract 5x from both sides: -8x + 14 > -18. Subtract 14: -8x > -32. Divide by -8 and flip the inequality symbol: x < 4.',
  },
  {
    id: 'u6-staar-q16',
    round: 2,
    questionNumber: 16,
    teks: 'TEKS 8.8.C',
    strand: 'Decimal Precision with Constant Isolation',
    type: 'numeric-input',
    prompt: 'What value of x satisfies the equation shown?',
    equationDisplay: '0.75x - 6 = 0.25x + 4',
    correctAnswer: '20',
    acceptedEquivalents: ['20', '20.0', 'x=20', 'x = 20'],
    numericAnswer: 20,
    hint: 'Subtract 0.25x from both sides: 0.50x - 6 = 4. Then add 6 to both sides.',
    misconceptionFeedback:
      '0.75x - 0.25x = 0.5x. Adding 6 to 4 gives 10. Dividing 10 by 0.5 equals 20 (since dividing by one-half is multiplying by 2).',
    correctExplanation:
      '0.75x - 0.25x = 4 + 6 → 0.5x = 10 → x = 10 / 0.5 = 20. Checking: 0.75(20) - 6 = 15 - 6 = 9 and 0.25(20) + 4 = 5 + 4 = 9.',
  },
  {
    id: 'u6-staar-q17',
    round: 2,
    questionNumber: 17,
    teks: 'TEKS 8.8.C',
    strand: 'Number Line Inequalities with Reversal',
    type: 'multiple-choice',
    prompt: 'Which number line represents the solution to the inequality?',
    equationDisplay: '2x - 7 ≤ 6x + 9',
    options: [
      {
        id: 'a',
        text: 'x ≥ -4 (Closed circle at -4, shaded to the right)',
        numberLine: { boundary: -4, symbol: '>=', minVal: -8, maxVal: 0 },
      },
      {
        id: 'b',
        text: 'x ≤ -4 (Closed circle at -4, shaded to the left)',
        numberLine: { boundary: -4, symbol: '<=', minVal: -8, maxVal: 0 },
      },
      {
        id: 'c',
        text: 'x > -4 (Open circle at -4, shaded to the right)',
        numberLine: { boundary: -4, symbol: '>', minVal: -8, maxVal: 0 },
      },
      {
        id: 'd',
        text: 'x ≥ 4 (Closed circle at 4, shaded to the right)',
        numberLine: { boundary: 4, symbol: '>=', minVal: 0, maxVal: 8 },
      },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 6x from both sides: -4x - 7 ≤ 9. Add 7: -4x ≤ 16. Divide by -4 and reverse the inequality symbol.',
    misconceptionFeedback:
      'When dividing 16 by -4, you get -4, and dividing by a negative number flips ≤ to ≥. Since ≤ contains an equals bar, use a closed circle.',
    correctExplanation:
      '2x - 6x ≤ 9 + 7 → -4x ≤ 16 → x ≥ -4 (reversing the symbol). Because it is ≥, the graph has a closed circle at -4 with an arrow pointing right.',
  },
  {
    id: 'u6-staar-q18',
    round: 2,
    questionNumber: 18,
    teks: 'TEKS 8.8.B',
    strand: 'Situations with Decreasing Rates',
    type: 'multiple-choice',
    prompt: 'Which real-world scenario is represented by the equation shown?',
    equationDisplay: '120 - 15w = 80 - 10w',
    options: [
      {
        id: 'a',
        text: 'Water tank A has 120 gallons and drains at 15 gallons per minute. Tank B has 80 gallons and drains at 10 gallons per minute. At how many minutes, w, will both tanks have the same amount of water?',
      },
      {
        id: 'b',
        text: 'Tank A starts with 120 gallons and fills at 15 gallons per minute, while Tank B starts with 80 gallons and fills at 10 gallons per minute.',
      },
      {
        id: 'c',
        text: 'A student with $120 earns $15 each week, while a student with $80 earns $10 each week.',
      },
      {
        id: 'd',
        text: 'A store has 120 items and receives 15 more daily, while another store has 80 items and sells 10 daily.',
      },
    ],
    correctAnswer: 'a',
    hint: 'Notice the minus signs: subtracting 15w and 10w represents quantities decreasing over time, such as draining water tanks.',
    misconceptionFeedback:
      'Options B and C represent quantities increasing (addition). Option D would have +15w on one side and -10w on the other.',
    correctExplanation:
      'Both tanks start with an initial volume (120 and 80) and lose water at constant rates (-15w and -10w). Setting their remaining volumes equal matches 120 - 15w = 80 - 10w.',
  },
  {
    id: 'u6-staar-q19',
    round: 2,
    questionNumber: 19,
    teks: 'TEKS 8.8.C',
    strand: 'Distributive Property on Both Sides',
    type: 'multiple-choice',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '2(3x - 4) = 5(x + 1) + 3',
    options: [
      { id: 'a', text: 'x = 16' },
      { id: 'b', text: 'x = 0' },
      { id: 'c', text: 'x = 10' },
      { id: 'd', text: 'x = -16' },
    ],
    correctAnswer: 'a',
    hint: 'Distribute on both sides: 2(3x) - 2(4) = 6x - 8. On the right: 5(x) + 5(1) + 3 = 5x + 5 + 3 = 5x + 8.',
    misconceptionFeedback:
      '6x - 8 = 5x + 8. Subtract 5x from both sides: x - 8 = 8. Add 8 to both sides: x = 16 (not 0).',
    correctExplanation:
      'Expand: 6x - 8 = 5x + 8. Subtract 5x from both sides: x - 8 = 8. Add 8 to both sides: x = 16. Checking: 2(3(16) - 4) = 2(44) = 88 and 5(17) + 3 = 85 + 3 = 88.',
  },
  {
    id: 'u6-staar-q20',
    round: 2,
    questionNumber: 20,
    teks: 'TEKS 8.8.A',
    strand: '"At Least" Inequality Modeling',
    type: 'multiple-choice',
    prompt:
      'Kendra has $65 saved and deposits $15 each week from babysitting. Her brother Leo has $35 saved and deposits $20 each week.\n\nWhich inequality can be used to find w, the number of weeks it will take for Leo\'s total savings to be at least Kendra\'s total savings?',
    options: [
      { id: 'a', text: '20w + 35 ≤ 15w + 65' },
      { id: 'b', text: '20w + 35 > 15w + 65' },
      { id: 'c', text: '20w + 35 ≥ 15w + 65' },
      { id: 'd', text: '35w + 20 ≥ 65w + 15' },
    ],
    correctAnswer: 'c',
    hint: '"At least" means greater than or equal to (≥). Leo\'s savings is 20w + 35 and Kendra\'s savings is 15w + 65.',
    misconceptionFeedback:
      '"At least" translates to ≥, not ≤ or >. Option A uses ≤, which means "at most." Option C correctly sets Leo ≥ Kendra.',
    correctExplanation:
      'Leo\'s savings: 20w + 35. Kendra\'s savings: 15w + 65. For Leo to have at least as much as Kendra: 20w + 35 ≥ 15w + 65.',
  },
  {
    id: 'u6-staar-q21',
    round: 2,
    questionNumber: 21,
    teks: 'TEKS 8.8.C',
    strand: 'Rational Equations with Common Multiples',
    type: 'numeric-input',
    prompt: 'What value of x satisfies the equation?',
    equationDisplay: '(3/4)x - 2 = (1/2)x + 3',
    correctAnswer: '20',
    acceptedEquivalents: ['20', '20.0', 'x=20', 'x = 20'],
    numericAnswer: 20,
    hint: 'Clear the fractions by multiplying every term on both sides by 4.',
    misconceptionFeedback:
      'Multiplying by 4 gives 3x - 8 = 2x + 12. Subtract 2x from both sides to get x - 8 = 12, then add 8 to both sides to get 20.',
    correctExplanation:
      '4(3/4 x) - 4(2) = 4(1/2 x) + 4(3) → 3x - 8 = 2x + 12 → x = 20. Check: 3/4(20) - 2 = 15 - 2 = 13; 1/2(20) + 3 = 10 + 3 = 13.',
  },
  {
    id: 'u6-staar-q22',
    round: 2,
    questionNumber: 22,
    teks: 'TEKS 8.8.C',
    strand: 'Evaluating Solution Sets of Inequalities',
    type: 'multi-select',
    prompt:
      'Which of the following values of x make the inequality true?\n\n-2x + 6 ≤ -10\n\nSelect all that apply.',
    options: [
      { id: 'opt1', text: 'x = 8' },
      { id: 'opt2', text: 'x = 10' },
      { id: 'opt3', text: 'x = 6' },
      { id: 'opt4', text: 'x = 0' },
      { id: 'opt5', text: 'x = 12' },
      { id: 'opt6', text: 'x = -8' },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt5'],
    hint: 'Subtract 6 from both sides: -2x ≤ -16. Divide both sides by -2 and reverse the symbol to get x ≥ 8.',
    misconceptionFeedback:
      'Dividing -16 by -2 reverses ≤ to ≥, giving x ≥ 8. Therefore, any number 8 or greater is in the solution set.',
    correctExplanation:
      '-2x + 6 ≤ -10 → -2x ≤ -16 → x ≥ 8 (divided by negative 2). Among the given options, x = 8, x = 10, and x = 12 satisfy x ≥ 8.',
  },
  {
    id: 'u6-staar-q23',
    round: 2,
    questionNumber: 23,
    teks: 'TEKS 8.8.C',
    strand: 'Inequality Step Error Analysis',
    type: 'error-analysis',
    prompt:
      'A student solved the inequality -6x + 20 ≥ 50 using the steps below:\n\nStep 1: -6x ≥ 30\nStep 2: x ≥ -5\n\nWhich statement correctly evaluates the student\'s work?',
    options: [
      { id: 'a', text: 'The student\'s work is completely correct.' },
      { id: 'b', text: 'In Step 1, the student should have added 20 to 50.' },
      {
        id: 'c',
        text: 'In Step 2, the student failed to reverse the inequality symbol when dividing both sides by -6.',
      },
      { id: 'd', text: 'In Step 2, the student calculated 30 divided by -6 as -5 instead of +5.' },
    ],
    correctAnswer: 'c',
    hint: 'Whenever both sides of an inequality are multiplied or divided by a negative number, what must happen to the inequality symbol?',
    misconceptionFeedback:
      'In Step 2, the student divided by -6, so the symbol should have changed from ≥ to ≤, yielding x ≤ -5.',
    correctExplanation:
      'Step 1 correctly subtracted 20 from both sides: -6x ≥ 30. In Step 2, dividing both sides by negative 6 requires reversing the inequality symbol to ≤. The correct solution is x ≤ -5.',
  },
  {
    id: 'u6-staar-q24',
    round: 2,
    questionNumber: 24,
    teks: 'TEKS 8.8.C',
    strand: 'Interpreting Solutions in Real-World Context',
    type: 'multiple-choice',
    prompt:
      'Paws & Whiskers pet care charges a $14 booking fee plus $18 per hour. Happy Tails pet care charges a $32 booking fee plus $12 per hour.\n\nAfter how many hours of pet care will the total cost of both services be the exact same?',
    options: [
      { id: 'a', text: '3 hours' },
      { id: 'b', text: '4 hours' },
      { id: 'c', text: '6 hours' },
      { id: 'd', text: '2 hours' },
    ],
    correctAnswer: 'a',
    hint: 'Set up the equation 18h + 14 = 12h + 32, where h represents the number of hours.',
    misconceptionFeedback:
      'Subtract 12h from both sides: 6h + 14 = 32. Subtract 14: 6h = 18. Divide by 6 to get h = 3 hours.',
    correctExplanation:
      '18h + 14 = 12h + 32 → 6h = 18 → h = 3. At 3 hours, Paws & Whiskers costs 18(3) + 14 = $68, and Happy Tails costs 12(3) + 32 = $68.',
  },

  // ==========================================
  // ROUND 3 (Questions 25 to 36)
  // ==========================================
  {
    id: 'u6-staar-q25',
    round: 3,
    questionNumber: 25,
    teks: 'TEKS 8.8.C',
    strand: 'Multi-Step Rational Number Equations',
    type: 'numeric-input',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '(2/5)x + 7 = (1/10)x + 19',
    correctAnswer: '40',
    acceptedEquivalents: ['40', '40.0', 'x=40', 'x = 40'],
    numericAnswer: 40,
    hint: 'Multiply all four terms by the common denominator of 10 to clear all fractions.',
    misconceptionFeedback:
      '10(2/5 x) + 10(7) = 10(1/10 x) + 10(19) gives 4x + 70 = x + 190. Subtract x from both sides: 3x = 120, so x = 40.',
    correctExplanation:
      'Multiply by 10: 4x + 70 = x + 190. Subtract x: 3x + 70 = 190. Subtract 70: 3x = 120. Divide by 3: x = 40. Verification: 2/5(40) + 7 = 16 + 7 = 23 and 1/10(40) + 19 = 4 + 19 = 23.',
  },
  {
    id: 'u6-staar-q26',
    round: 3,
    questionNumber: 26,
    teks: 'TEKS 8.8.A',
    strand: '"No More Than" Maximum Capacity Constraints',
    type: 'multiple-choice',
    prompt:
      'A freight elevator has a maximum cargo capacity of 2,400 pounds. The operator weighs 180 pounds. A delivery driver needs to load crates onto the elevator that weigh 75 pounds each.\n\nWhich inequality can be used to find c, the maximum number of crates that can be safely loaded onto the elevator with the operator?',
    options: [
      { id: 'a', text: '75c + 180 ≥ 2,400' },
      { id: 'b', text: '75c + 180 < 2,400' },
      { id: 'c', text: '75c + 180 ≤ 2,400' },
      { id: 'd', text: '180c + 75 ≤ 2,400' },
    ],
    correctAnswer: 'c',
    hint: '"Maximum capacity" and "no more than" mean that the total weight must be less than or equal to 2,400 (≤).',
    misconceptionFeedback:
      'Maximum means the weight CANNOT exceed 2,400 pounds, but it CAN equal 2,400, which requires ≤.',
    correctExplanation:
      'The total weight is 75c (weight of crates) plus 180 (operator weight). To avoid exceeding the maximum capacity of 2,400 pounds, 75c + 180 ≤ 2,400.',
  },
  {
    id: 'u6-staar-q27',
    round: 3,
    questionNumber: 27,
    teks: 'TEKS 8.8.C',
    strand: 'Negative Multipliers & Multi-Step Expansion',
    type: 'multiple-choice',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '-3(2x - 5) = 4(x + 5) - 35',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = -3' },
      { id: 'c', text: 'x = 0' },
      { id: 'd', text: 'x = 5' },
    ],
    correctAnswer: 'a',
    hint: 'Remember that -3 multiplied by -5 on the left yields +15. On the right, distribute 4 to get 4x + 20 - 35.',
    misconceptionFeedback:
      'Left side: -6x + 15. Right side: 4x - 15. Then -6x + 15 = 4x - 15 → 30 = 10x → x = 3.',
    correctExplanation:
      '-3(2x - 5) = -6x + 15. Right side: 4x + 20 - 35 = 4x - 15. Equation: -6x + 15 = 4x - 15. Add 6x and add 15: 30 = 10x → x = 3. Checking: -3(6 - 5) = -3 and 4(8) - 35 = -3.',
  },
  {
    id: 'u6-staar-q28',
    round: 3,
    questionNumber: 28,
    teks: 'TEKS 8.8.C',
    strand: 'Two-Step Inequality Reversals on Number Lines',
    type: 'multiple-choice',
    prompt: 'Which number line represents the solution set for the inequality?',
    equationDisplay: '-5x + 8 ≥ -22',
    options: [
      {
        id: 'a',
        text: 'x ≤ 6 (Closed circle at 6, shaded to the left)',
        numberLine: { boundary: 6, symbol: '<=', minVal: 0, maxVal: 10 },
      },
      {
        id: 'b',
        text: 'x ≥ 6 (Closed circle at 6, shaded to the right)',
        numberLine: { boundary: 6, symbol: '>=', minVal: 0, maxVal: 10 },
      },
      {
        id: 'c',
        text: 'x < 6 (Open circle at 6, shaded to the left)',
        numberLine: { boundary: 6, symbol: '<', minVal: 0, maxVal: 10 },
      },
      {
        id: 'd',
        text: 'x ≤ -6 (Closed circle at -6, shaded to the left)',
        numberLine: { boundary: -6, symbol: '<=', minVal: -10, maxVal: 0 },
      },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 8 from both sides: -5x ≥ -30. Divide by -5 and remember that dividing by a negative reverses ≥ to ≤.',
    misconceptionFeedback:
      '-30 divided by -5 is positive 6. Dividing by a negative flips ≥ to ≤, requiring a closed circle at 6 shaded left.',
    correctExplanation:
      '-5x + 8 ≥ -22 → -5x ≥ -30 → x ≤ 6 (symbol flipped). On the number line, x ≤ 6 is shown with a solid closed circle at 6 and shading extending to the left.',
  },
  {
    id: 'u6-staar-q29',
    round: 3,
    questionNumber: 29,
    teks: 'TEKS 8.8.A',
    strand: 'Geometric Perimeter Modeling',
    type: 'multiple-choice',
    prompt:
      'Rectangle A has a length of (3x + 4) and a width of 5.\nRectangle B has a length of (x + 10) and a width of 7.\n\nThe perimeters of Rectangle A and Rectangle B are equal. Which equation models this relationship?',
    options: [
      { id: 'a', text: '(3x + 4) + 5 = (x + 10) + 7' },
      { id: 'b', text: '2(3x + 4) + 10 = 2(x + 10) + 14' },
      { id: 'c', text: '5(3x + 4) = 7(x + 10)' },
      { id: 'd', text: '2(3x + 4) = 2(x + 10)' },
    ],
    correctAnswer: 'b',
    hint: 'Perimeter of a rectangle is 2(length) + 2(width). For Rectangle A, 2(3x + 4) + 2(5) = 2(3x + 4) + 10.',
    misconceptionFeedback:
      'Option A only adds one length and one width (semi-perimeter). Option C multiplies length by width, which models area instead of perimeter.',
    correctExplanation:
      'Perimeter of Rectangle A: 2(3x + 4) + 2(5) = 2(3x + 4) + 10. Perimeter of Rectangle B: 2(x + 10) + 2(7) = 2(x + 10) + 14. Setting perimeters equal yields 2(3x + 4) + 10 = 2(x + 10) + 14.',
  },
  {
    id: 'u6-staar-q30',
    round: 3,
    questionNumber: 30,
    teks: 'TEKS 8.8.C',
    strand: 'Rational Coefficient Inequality Solving',
    type: 'inequality-entry',
    prompt:
      'Solve the inequality. Select the correct comparison symbol and enter the boundary value for x.',
    equationDisplay: '(1/2)x - 6 > (3/4)x - 9',
    correctAnswer: 'x < 12',
    inequalityConfig: {
      symbol: '<',
      boundary: 12,
    },
    hint: 'Multiply every term by 4: 2x - 24 > 3x - 36. Then subtract 3x from both sides or subtract 2x to keep the variable positive.',
    misconceptionFeedback:
      '2x - 24 > 3x - 36 → -x > -12 → x < 12 (dividing by -1 reverses the inequality symbol).',
    correctExplanation:
      'Multiply by 4: 2x - 24 > 3x - 36. Subtract 3x: -x - 24 > -36. Add 24: -x > -12. Divide by -1 and reverse the symbol: x < 12 (or 12 > x).',
  },
  {
    id: 'u6-staar-q31',
    round: 3,
    questionNumber: 31,
    teks: 'TEKS 8.8.C',
    strand: 'Decimal Coefficients with Negative Constants',
    type: 'numeric-input',
    prompt: 'What value of x makes the equation true?',
    equationDisplay: '-1.6x + 14.4 = 0.8x - 9.6',
    correctAnswer: '10',
    acceptedEquivalents: ['10', '10.0', 'x=10', 'x = 10'],
    numericAnswer: 10,
    hint: 'Add 1.6x to both sides to get 14.4 = 2.4x - 9.6. Then add 9.6 to both sides.',
    misconceptionFeedback:
      'Adding 1.6x to 0.8x gives 2.4x. Adding 9.6 to 14.4 gives 24.0. Dividing 24.0 by 2.4 gives 10.',
    correctExplanation:
      '14.4 + 9.6 = 0.8x + 1.6x → 24 = 2.4x → x = 24 / 2.4 = 10. Checking: -1.6(10) + 14.4 = -16 + 14.4 = -1.6; 0.8(10) - 9.6 = 8 - 9.6 = -1.6.',
  },
  {
    id: 'u6-staar-q32',
    round: 3,
    questionNumber: 32,
    teks: 'TEKS 8.8.B',
    strand: 'Interpreting Inequalities as Cost Comparisons',
    type: 'multiple-choice',
    prompt: 'Which real-world situation can be modeled by the inequality shown?',
    equationDisplay: '15x + 40 ≤ 20x + 10',
    options: [
      {
        id: 'a',
        text: 'Plan A charges a $40 signup fee plus $15 per session. Plan B charges a $10 signup fee plus $20 per session. For what number of sessions, x, is Plan A no more expensive than Plan B?',
      },
      {
        id: 'b',
        text: 'Plan A charges a $40 signup fee plus $15 per session. Plan B charges a $10 signup fee plus $20 per session. For what number of sessions, x, is Plan A strictly more expensive than Plan B?',
      },
      {
        id: 'c',
        text: 'Student A saves $15 per week starting with $40. Student B spends $20 per week starting with $10.',
      },
      {
        id: 'd',
        text: 'Plan A costs $15 per session for 40 sessions. Plan B costs $20 per session for 10 sessions.',
      },
    ],
    correctAnswer: 'a',
    hint: 'The symbol ≤ represents "less than or equal to" or "no more expensive than." Plan A is on the left and Plan B is on the right.',
    misconceptionFeedback:
      'Option B uses "strictly more expensive" (>). Option A correctly pairs "no more expensive than" with ≤.',
    correctExplanation:
      'Plan A total: 15x + 40. Plan B total: 20x + 10. For Plan A to be no more expensive than Plan B (less than or equal to Plan B): 15x + 40 ≤ 20x + 10.',
  },
  {
    id: 'u6-staar-q33',
    round: 3,
    questionNumber: 33,
    teks: 'TEKS 8.8.C',
    strand: 'Negative Values in Inequality Solution Sets',
    type: 'multi-select',
    prompt:
      'Consider the inequality 4(x - 2) ≥ 6x + 8.\n\nWhich of the following values of x belong to the solution set? Select all that apply.',
    options: [
      { id: 'opt1', text: 'x = -8' },
      { id: 'opt2', text: 'x = -10' },
      { id: 'opt3', text: 'x = -12' },
      { id: 'opt4', text: 'x = -6' },
      { id: 'opt5', text: 'x = 0' },
      { id: 'opt6', text: 'x = 2' },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt3'],
    hint: 'Expand the left side: 4x - 8 ≥ 6x + 8. Subtract 6x: -2x - 8 ≥ 8. Add 8: -2x ≥ 16. Divide by -2 and reverse the symbol to get x ≤ -8.',
    misconceptionFeedback:
      'Dividing 16 by -2 yields -8 and flips ≥ to ≤, giving x ≤ -8. Remember that for negative numbers, -10 and -12 are smaller than -8, so they are solutions!',
    correctExplanation:
      '4x - 8 ≥ 6x + 8 → -2x ≥ 16 → x ≤ -8. Numbers less than or equal to -8 include -8, -10, and -12.',
  },
  {
    id: 'u6-staar-q34',
    round: 3,
    questionNumber: 34,
    teks: 'TEKS 8.8.C',
    strand: 'Multi-Step Real-World Cost Equivalence',
    type: 'multiple-choice',
    prompt:
      'A school club orders customized t-shirts from one of two vendors:\n\n• Print Pro charges a $150 setup fee plus $12 per shirt.\n• Custom Ink charges a $60 setup fee plus $15 per shirt.\n\nFor how many t-shirts, t, will the total cost charged by both vendors be exactly the same?',
    options: [
      { id: 'a', text: '30 shirts' },
      { id: 'b', text: '25 shirts' },
      { id: 'c', text: '70 shirts' },
      { id: 'd', text: '15 shirts' },
    ],
    correctAnswer: 'a',
    hint: 'Set up the equation 12t + 150 = 15t + 60, where t is the number of t-shirts.',
    misconceptionFeedback:
      'Subtract 12t from both sides: 150 = 3t + 60. Subtract 60 from 150: 90 = 3t. Divide 90 by 3: t = 30.',
    correctExplanation:
      '12t + 150 = 15t + 60 → 90 = 3t → t = 30. At 30 shirts, Print Pro costs 12(30) + 150 = $510, and Custom Ink costs 15(30) + 60 = $510.',
  },
  {
    id: 'u6-staar-q35',
    round: 3,
    questionNumber: 35,
    teks: 'TEKS 8.8.C',
    strand: 'Sign and Constant Isolation Error Analysis',
    type: 'error-analysis',
    prompt:
      'Marcus was asked to solve the equation 3x - 11 = 8x + 19. His written steps are shown below:\n\nStep 1: 3x - 8x - 11 = 19\nStep 2: -5x - 11 = 19\nStep 3: -5x = 8\nStep 4: x = -1.6\n\nIn which step did Marcus make an algebraic error, and what was the mistake?',
    options: [
      { id: 'a', text: 'Step 1: He subtracted 8x instead of adding 8x.' },
      { id: 'b', text: 'Step 2: He combined 3x - 8x incorrectly.' },
      { id: 'c', text: 'Step 3: He subtracted 11 from 19 instead of adding 11 to 19.' },
      { id: 'd', text: 'Step 4: He divided 8 by 5 instead of -5.' },
    ],
    correctAnswer: 'c',
    hint: 'In Step 2, Marcus had -5x - 11 = 19. What is the inverse operation needed to eliminate -11?',
    misconceptionFeedback:
      'The inverse of subtracting 11 is adding 11! In Step 3, he should have calculated 19 + 11 = 30, so -5x = 30 → x = -6.',
    correctExplanation:
      'In Step 2, Marcus correctly obtained -5x - 11 = 19. In Step 3, the inverse of -11 is +11, which gives -5x = 19 + 11 = 30. Marcus mistakenly subtracted 11 (19 - 11 = 8), producing the error in Step 3.',
  },
  {
    id: 'u6-staar-q36',
    round: 3,
    questionNumber: 36,
    teks: 'TEKS 8.8.C',
    strand: 'Multi-Step Equation with Distributive Property & Like Terms',
    type: 'numeric-input',
    prompt: 'What is the solution to the multi-step equation?',
    equationDisplay: '5(2x - 3) - 4x = 2(x + 8) + 1',
    correctAnswer: '8',
    acceptedEquivalents: ['8', '8.0', 'x=8', 'x = 8'],
    numericAnswer: 8,
    hint: 'Distribute on both sides: 10x - 15 - 4x = 2x + 16 + 1. Combine like terms: 6x - 15 = 2x + 17.',
    misconceptionFeedback:
      'Expand: 10x - 15 - 4x = 2x + 17. Combine like terms: 6x - 15 = 2x + 17. Subtract 2x: 4x - 15 = 17. Add 15: 4x = 32 → x = 8.',
    correctExplanation:
      'Expand: 10x - 15 - 4x = 2x + 16 + 1. Combine like terms: 6x - 15 = 2x + 17. Subtract 2x from both sides: 4x - 15 = 17. Add 15: 4x = 32. Divide by 4: x = 8. Verification: 5(13) - 32 = 65 - 32 = 33; 2(16) + 1 = 33.',
  },
];

export function getStaarEquationsRoundQuestions(round: 1 | 2 | 3): StaarEquationsQuestion[] {
  return STAAR_EQUATIONS_QUESTIONS.filter((q) => q.round === round);
}
