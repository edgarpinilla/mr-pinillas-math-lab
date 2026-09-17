import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB9_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't9-q1',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve the inequality with fractions for x:',
    equationDisplay: '(3/4)x + 2 > (1/4)x + 6',
    inequalityConfig: {
      variable: 'x',
      symbol: '>',
      value: 8,
    },
    hint: 'Subtract (1/4)x from both sides: (2/4)x + 2 > 6. That simplifies to (1/2)x > 4.',
    misconceptionFeedback:
      '(1/2)x > 4. Multiply both sides by 2 gives x > 8.',
    correctExplanation:
      'Correct! (2/4)x + 2 > 6 -> (1/2)x > 4 -> x > 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q2',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve the decimal inequality for m:',
    equationDisplay: '1.5m - 4.5 ≤ 0.5m + 3.5',
    options: [
      { id: 'a', text: 'm ≤ 6' },
      { id: 'b', text: 'm ≤ 8', isCorrect: true },
      { id: 'c', text: 'm ≥ 8' },
      { id: 'd', text: 'm ≤ 10' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.5m from both sides: 1.0m - 4.5 ≤ 3.5. Then add 4.5.',
    misconceptionFeedback:
      '1.0m ≤ 8.0 -> m ≤ 8.',
    correctExplanation:
      'Correct! 1.0m - 4.5 ≤ 3.5 -> m ≤ 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q3',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve the fraction inequality by multiplying all terms by the LCM 6:',
    equationDisplay: '(2/3)x - 3 ≥ (1/6)x + 2',
    inequalityConfig: {
      variable: 'x',
      symbol: '>=',
      value: 10,
    },
    hint: 'Multiply every term by 6: 4x - 18 ≥ x + 12. Then subtract x.',
    misconceptionFeedback:
      '4x - 18 ≥ x + 12 -> 3x ≥ 30 -> x ≥ 10.',
    correctExplanation:
      'Correct! 4x - 18 ≥ x + 12 -> 3x ≥ 30 -> x ≥ 10.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q4',
    tabId: 'tab-9',
    type: 'number-line-select',
    prompt: 'Solve 2.4k + 5.2 < 1.2k + 13.6 and select its graph:',
    equationDisplay: '2.4k + 5.2 < 1.2k + 13.6',
    numberLineData: {
      min: 2,
      max: 12,
      step: 1,
      boundary: 7,
      isClosed: false,
      direction: 'left',
      label: 'k < 7',
    },
    options: [
      { id: 'a', text: 'Open circle at 7, shaded ray pointing left (k < 7)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 7, shaded ray pointing left (k ≤ 7)' },
      { id: 'c', text: 'Open circle at 7, shaded ray pointing right (k > 7)' },
      { id: 'd', text: 'Closed circle at 7, shaded ray pointing right (k ≥ 7)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 1.2k: 1.2k + 5.2 < 13.6. Subtract 5.2: 1.2k < 8.4. Divide by 1.2: k < 7.',
    misconceptionFeedback:
      '1.2k < 8.4 -> k < 7. Open circle pointing left.',
    correctExplanation:
      'Correct! k < 7 has an open circle at 7 pointing left.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q5',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for y in the fraction inequality:',
    equationDisplay: '(1/2)y + 5 > (1/4)y + 8',
    inequalityConfig: {
      variable: 'y',
      symbol: '>',
      value: 12,
    },
    hint: 'Multiply every term by 4: 2y + 20 > y + 32.',
    misconceptionFeedback:
      '2y + 20 > y + 32. Subtract y: y + 20 > 32. Subtract 20: y > 12.',
    correctExplanation:
      'Correct! 2y + 20 > y + 32 -> y > 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q6',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve the decimal inequality: 0.8p - 3.4 ≥ 0.3p + 2.6',
    equationDisplay: '0.8p - 3.4 ≥ 0.3p + 2.6',
    options: [
      { id: 'a', text: 'p ≥ 10' },
      { id: 'b', text: 'p ≥ 12', isCorrect: true },
      { id: 'c', text: 'p ≤ 12' },
      { id: 'd', text: 'p ≥ 14' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.3p: 0.5p - 3.4 ≥ 2.6. Add 3.4: 0.5p ≥ 6.0.',
    misconceptionFeedback:
      '0.5p ≥ 6.0. Divide by 0.5 gives p ≥ 12.',
    correctExplanation:
      'Correct! 0.5p ≥ 6.0 -> p ≥ 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q7',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for w by multiplying all terms by 10:',
    equationDisplay: '(3/5)w - 4 ≤ (1/10)w + 6',
    inequalityConfig: {
      variable: 'w',
      symbol: '<=',
      value: 20,
    },
    hint: 'Multiply every term by 10: 6w - 40 ≤ w + 60.',
    misconceptionFeedback:
      '6w - 40 ≤ w + 60. Subtract w: 5w ≤ 100. Divide by 5: w ≤ 20.',
    correctExplanation:
      'Correct! 5w ≤ 100 -> w ≤ 20.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q8',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve for d: 3.5d + 7.5 > 1.5d + 23.5',
    equationDisplay: '3.5d + 7.5 > 1.5d + 23.5',
    options: [
      { id: 'a', text: 'd > 6' },
      { id: 'b', text: 'd > 8', isCorrect: true },
      { id: 'c', text: 'd > 9' },
      { id: 'd', text: 'd ≥ 8' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 1.5d: 2.0d + 7.5 > 23.5. Subtract 7.5: 2.0d > 16.0.',
    misconceptionFeedback:
      '2.0d > 16.0. Divide by 2: d > 8.',
    correctExplanation:
      'Correct! 2.0d > 16.0 -> d > 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q9',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for n by multiplying all terms by the LCM 12:',
    equationDisplay: '(3/4)n - 7 < (1/3)n - 2',
    inequalityConfig: {
      variable: 'n',
      symbol: '<',
      value: 12,
    },
    hint: 'Multiply every term by 12: 9n - 84 < 4n - 24.',
    misconceptionFeedback:
      '9n - 84 < 4n - 24. Subtract 4n: 5n - 84 < -24. Add 84: 5n < 60. Divide by 5: n < 12.',
    correctExplanation:
      'Correct! 5n < 60 -> n < 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q10',
    tabId: 'tab-9',
    type: 'number-line-select',
    prompt: 'Solve 1.8z - 4.2 ≥ 0.6z + 9.0 and identify the correct number line graph:',
    equationDisplay: '1.8z - 4.2 ≥ 0.6z + 9.0',
    numberLineData: {
      min: 5,
      max: 17,
      step: 1,
      boundary: 11,
      isClosed: true,
      direction: 'right',
      label: 'z ≥ 11',
    },
    options: [
      { id: 'a', text: 'Closed circle at 11, shaded ray pointing right (z ≥ 11)', isCorrect: true },
      { id: 'b', text: 'Open circle at 11, shaded ray pointing right (z > 11)' },
      { id: 'c', text: 'Closed circle at 11, shaded ray pointing left (z ≤ 11)' },
      { id: 'd', text: 'Open circle at 11, shaded ray pointing left (z < 11)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 0.6z: 1.2z - 4.2 ≥ 9.0. Add 4.2: 1.2z ≥ 13.2. Divide by 1.2: z ≥ 11.',
    misconceptionFeedback:
      '1.2z ≥ 13.2 -> z ≥ 11. Closed circle pointing right.',
    correctExplanation:
      'Correct! z ≥ 11 has a closed circle at 11 pointing right.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't9-q11',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve the fraction inequality by multiplying all terms by 15:',
    equationDisplay: '(2/3)x + 4 > (1/5)x + 11',
    inequalityConfig: {
      variable: 'x',
      symbol: '>',
      value: 15,
    },
    hint: 'Multiply every term by 15: 10x + 60 > 3x + 165.',
    misconceptionFeedback:
      '10x + 60 > 3x + 165. Subtract 3x: 7x + 60 > 165. Subtract 60: 7x > 105. Divide by 7: x > 15.',
    correctExplanation:
      'Correct! 7x > 105 -> x > 15.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q12',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve the decimal inequality for b: 2.8b - 6.6 ≤ 0.8b + 17.4',
    equationDisplay: '2.8b - 6.6 ≤ 0.8b + 17.4',
    options: [
      { id: 'a', text: 'b ≤ 10' },
      { id: 'b', text: 'b ≤ 12', isCorrect: true },
      { id: 'c', text: 'b ≥ 12' },
      { id: 'd', text: 'b ≤ 14' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.8b: 2.0b - 6.6 ≤ 17.4. Add 6.6: 2.0b ≤ 24.0.',
    misconceptionFeedback:
      '2.0b ≤ 24.0. Divide by 2 gives b ≤ 12.',
    correctExplanation:
      'Correct! 2.0b ≤ 24.0 -> b ≤ 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q13',
    tabId: 'tab-9',
    type: 'number-line-select',
    prompt: 'Solve (5/6)k - 8 < (1/3)k - 2 and choose the graph:',
    equationDisplay: '(5/6)k - 8 < (1/3)k - 2',
    numberLineData: {
      min: 6,
      max: 18,
      step: 1,
      boundary: 12,
      isClosed: false,
      direction: 'left',
      label: 'k < 12',
    },
    options: [
      { id: 'a', text: 'Open circle at 12, shaded ray pointing left (k < 12)', isCorrect: true },
      { id: 'b', text: 'Open circle at 12, shaded ray pointing right (k > 12)' },
      { id: 'c', text: 'Closed circle at 12, shaded ray pointing left (k ≤ 12)' },
      { id: 'd', text: 'Closed circle at 12, shaded ray pointing right (k ≥ 12)' },
    ],
    correctAnswer: 'a',
    hint: 'Multiply every term by 6: 5k - 48 < 2k - 12. Subtract 2k: 3k - 48 < -12. Add 48: 3k < 36. Divide by 3: k < 12.',
    misconceptionFeedback:
      '3k < 36 -> k < 12. Open circle pointing left.',
    correctExplanation:
      'Correct! k < 12 is graphed with an open circle at 12 pointing left.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q14',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for c in the decimal inequality:',
    equationDisplay: '0.45c + 5.5 ≥ 0.15c + 11.5',
    inequalityConfig: {
      variable: 'c',
      symbol: '>=',
      value: 20,
    },
    hint: 'Subtract 0.15c: 0.30c + 5.5 ≥ 11.5. Subtract 5.5: 0.30c ≥ 6.0.',
    misconceptionFeedback:
      '0.30c ≥ 6.0. Divide by 0.30 gives c ≥ 20.',
    correctExplanation:
      'Correct! 0.30c ≥ 6.0 -> c ≥ 20.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q15',
    tabId: 'tab-9',
    type: 'multi-select',
    prompt: 'Select ALL numbers that satisfy the inequality (3/4)x - 2 ≥ (1/2)x + 1:',
    options: [
      { id: 'opt1', text: 'x = 10' },
      { id: 'opt2', text: 'x = 12', isCorrect: true },
      { id: 'opt3', text: 'x = 15', isCorrect: true },
      { id: 'opt4', text: 'x = 20', isCorrect: true },
    ],
    correctAnswer: ['opt2', 'opt3', 'opt4'],
    hint: 'Multiply by 4: 3x - 8 ≥ 2x + 4. Subtract 2x: x - 8 ≥ 4 -> x ≥ 12.',
    misconceptionFeedback:
      'x ≥ 12 includes 12, 15, and 20, but not 10.',
    correctExplanation:
      'Correct! The solution is x ≥ 12, so 12, 15, and 20 are all valid solutions.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q16',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for p:',
    equationDisplay: '(7/8)p - 11 ≤ (3/8)p + 9',
    inequalityConfig: {
      variable: 'p',
      symbol: '<=',
      value: 40,
    },
    hint: 'Subtract (3/8)p: (4/8)p - 11 ≤ 9. (1/2)p ≤ 20. Multiply by 2: p ≤ 40.',
    misconceptionFeedback:
      '(1/2)p ≤ 20 -> p ≤ 40.',
    correctExplanation:
      'Correct! (4/8)p ≤ 20 -> (1/2)p ≤ 20 -> p ≤ 40.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q17',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve the decimal inequality for h: 1.6h - 7.5 > 0.6h + 4.5',
    equationDisplay: '1.6h - 7.5 > 0.6h + 4.5',
    options: [
      { id: 'a', text: 'h > 10' },
      { id: 'b', text: 'h > 12', isCorrect: true },
      { id: 'c', text: 'h < 12' },
      { id: 'd', text: 'h ≥ 12' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.6h: 1.0h - 7.5 > 4.5. Add 7.5: h > 12.',
    misconceptionFeedback:
      '1.0h > 12.0 -> h > 12.',
    correctExplanation:
      'Correct! 1.0h - 7.5 > 4.5 -> h > 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q18',
    tabId: 'tab-9',
    type: 'number-line-select',
    prompt: 'Solve (4/5)t - 9 ≥ (3/10)t + 6 and identify the graph:',
    equationDisplay: '(4/5)t - 9 ≥ (3/10)t + 6',
    numberLineData: {
      min: 20,
      max: 40,
      step: 2,
      boundary: 30,
      isClosed: true,
      direction: 'right',
      label: 't ≥ 30',
    },
    options: [
      { id: 'a', text: 'Closed circle at 30, shaded ray pointing right (t ≥ 30)', isCorrect: true },
      { id: 'b', text: 'Open circle at 30, shaded ray pointing right (t > 30)' },
      { id: 'c', text: 'Closed circle at 30, shaded ray pointing left (t ≤ 30)' },
      { id: 'd', text: 'Open circle at 30, shaded ray pointing left (t < 30)' },
    ],
    correctAnswer: 'a',
    hint: 'Multiply by 10: 8t - 90 ≥ 3t + 60. Subtract 3t: 5t - 90 ≥ 60. Add 90: 5t ≥ 150. Divide by 5: t ≥ 30.',
    misconceptionFeedback:
      '5t ≥ 150 -> t ≥ 30. Closed circle pointing right.',
    correctExplanation:
      'Correct! t ≥ 30 has a closed circle at 30 pointing right.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q19',
    tabId: 'tab-9',
    type: 'inequality-entry',
    prompt: 'Solve for y in the decimal inequality:',
    equationDisplay: '0.7y + 11.2 < 0.3y + 16.8',
    inequalityConfig: {
      variable: 'y',
      symbol: '<',
      value: 14,
    },
    hint: 'Subtract 0.3y: 0.4y + 11.2 < 16.8. Subtract 11.2: 0.4y < 5.6. Divide by 0.4: y < 14.',
    misconceptionFeedback:
      '0.4y < 5.6. Divide 5.6 by 0.4 gives y < 14.',
    correctExplanation:
      'Correct! 0.4y < 5.6 -> y < 14.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't9-q20',
    tabId: 'tab-9',
    type: 'multiple-choice',
    prompt: 'Solve the fraction inequality for z: (5/8)z + 3 > (1/4)z + 9',
    equationDisplay: '(5/8)z + 3 > (1/4)z + 9',
    options: [
      { id: 'a', text: 'z > 14' },
      { id: 'b', text: 'z > 16', isCorrect: true },
      { id: 'c', text: 'z > 18' },
      { id: 'd', text: 'z ≥ 16' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply all terms by 8: 5z + 24 > 2z + 72. Subtract 2z: 3z + 24 > 72. Subtract 24: 3z > 48. Divide by 3: z > 16.',
    misconceptionFeedback:
      '3z > 48. Divide by 3 gives z > 16.',
    correctExplanation:
      'Correct! 3z > 48 -> z > 16.',
    teks: 'TEKS 8.8.C',
  },
];
