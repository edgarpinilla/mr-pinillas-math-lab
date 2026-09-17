import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB4_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't4-q1',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'What is the least common multiple (LCM) used to clear the denominators in this equation?',
    equationDisplay: '(3/4)x - 5 = (1/8)x + 2',
    options: [
      { id: 'a', text: 'LCM = 4' },
      { id: 'b', text: 'LCM = 8', isCorrect: true },
      { id: 'c', text: 'LCM = 16' },
      { id: 'd', text: 'LCM = 32' },
    ],
    correctAnswer: 'b',
    hint: 'Look at the denominators 4 and 8. The smallest positive integer divisible by both is 8.',
    misconceptionFeedback:
      '4 divides into 8 evenly (4 × 2 = 8) and 8 divides into 8 (8 × 1 = 8). Thus the LCM is 8.',
    correctExplanation:
      'Correct! Multiplying all terms by 8 clears the fractions in a single step.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q2',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Clear denominators by multiplying all terms by 4, then solve for x:',
    equationDisplay: '(1/2)x + 3 = (1/4)x + 5',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Multiply all four terms by 4: 4(1/2 x) + 4(3) = 4(1/4 x) + 4(5) -> 2x + 12 = x + 20.',
    misconceptionFeedback:
      'Remember to multiply constants by 4 too: 2x + 12 = x + 20. Subtract x: x + 12 = 20. Subtract 12: x = 8.',
    correctExplanation:
      'Correct! 2x + 12 = x + 20 -> x = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q3',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for x in the fraction equation by clearing the denominators with LCM 6:',
    equationDisplay: '(2/3)x - 4 = (1/6)x + 1',
    numericAnswer: 10,
    tolerance: 0.001,
    hint: 'Multiply all four terms by 6: 6(2/3 x) - 6(4) = 6(1/6 x) + 6(1) -> 4x - 24 = x + 6.',
    misconceptionFeedback:
      '4x - 24 = x + 6. Subtract x: 3x - 24 = 6. Add 24: 3x = 30. Divide by 3 gives x = 10.',
    correctExplanation:
      'Correct! 4x - 24 = x + 6 -> 3x = 30 -> x = 10.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q4',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for x:',
    equationDisplay: '(3/5)x + 2 = (1/5)x + 8',
    options: [
      { id: 'a', text: 'x = 10' },
      { id: 'b', text: 'x = 12' },
      { id: 'c', text: 'x = 15', isCorrect: true },
      { id: 'd', text: 'x = 20' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract (1/5)x from both sides: (2/5)x + 2 = 8.',
    misconceptionFeedback:
      '(2/5)x = 6. Multiply both sides by 5: 2x = 30. Divide by 2 gives x = 15.',
    correctExplanation:
      'Correct! (2/5)x = 6 -> 2x = 30 -> x = 15.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q5',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for m by multiplying by the LCM 12:',
    equationDisplay: '(1/3)m + 5 = (1/4)m + 7',
    numericAnswer: 24,
    tolerance: 0.001,
    hint: 'Multiply every term by 12: 12(1/3 m) + 12(5) = 12(1/4 m) + 12(7) -> 4m + 60 = 3m + 84.',
    misconceptionFeedback:
      '4m + 60 = 3m + 84. Subtract 3m: m + 60 = 84. Subtract 60: m = 24.',
    correctExplanation:
      'Correct! 4m + 60 = 3m + 84 -> m = 24.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q6',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for y in the equation:',
    equationDisplay: '(3/4)y - 2 = (1/2)y + 3',
    options: [
      { id: 'a', text: 'y = 16' },
      { id: 'b', text: 'y = 20', isCorrect: true },
      { id: 'c', text: 'y = 24' },
      { id: 'd', text: 'y = 28' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply every term by 4: 3y - 8 = 2y + 12.',
    misconceptionFeedback:
      '3y - 8 = 2y + 12. Subtract 2y: y - 8 = 12. Add 8: y = 20.',
    correctExplanation:
      'Correct! 3y - 8 = 2y + 12 -> y = 20.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q7',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for k:',
    equationDisplay: '(5/6)k - 7 = (1/2)k + 1',
    numericAnswer: 24,
    tolerance: 0.001,
    hint: 'Multiply every term by 6: 5k - 42 = 3k + 6.',
    misconceptionFeedback:
      '5k - 42 = 3k + 6. Subtract 3k: 2k - 42 = 6. Add 42: 2k = 48. Divide by 2: k = 24.',
    correctExplanation:
      'Correct! 5k - 42 = 3k + 6 -> 2k = 48 -> k = 24.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q8',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for w:',
    equationDisplay: '(2/5)w + 4 = (1/10)w + 10',
    options: [
      { id: 'a', text: 'w = 15' },
      { id: 'b', text: 'w = 20', isCorrect: true },
      { id: 'c', text: 'w = 25' },
      { id: 'd', text: 'w = 30' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply every term by 10: 4w + 40 = w + 100.',
    misconceptionFeedback:
      '4w + 40 = w + 100. Subtract w: 3w + 40 = 100. Subtract 40: 3w = 60. Divide by 3: w = 20.',
    correctExplanation:
      'Correct! 4w + 40 = w + 100 -> 3w = 60 -> w = 20.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q9',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for p by multiplying by the LCM 12:',
    equationDisplay: '(3/4)p - 6 = (1/3)p - 1',
    numericAnswer: 12,
    tolerance: 0.001,
    hint: 'Multiply all terms by 12: 9p - 72 = 4p - 12.',
    misconceptionFeedback:
      '9p - 72 = 4p - 12. Subtract 4p: 5p - 72 = -12. Add 72: 5p = 60. Divide by 5: p = 12.',
    correctExplanation:
      'Correct! 9p - 72 = 4p - 12 -> 5p = 60 -> p = 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q10',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '(7/8)x - 9 = (3/8)x + 11',
    numericAnswer: 40,
    tolerance: 0.001,
    hint: 'Subtract (3/8)x from both sides: (4/8)x - 9 = 11, or multiply all terms by 8.',
    misconceptionFeedback:
      '7x - 72 = 3x + 88. Subtract 3x: 4x - 72 = 88. Add 72: 4x = 160. Divide by 4: x = 40.',
    correctExplanation:
      'Correct! (4/8)x = 20 -> (1/2)x = 20 -> x = 40.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't4-q11',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'What is the least common multiple (LCM) of the denominators in this equation?',
    equationDisplay: '(1/6)x + 5 = (2/9)x - 1',
    options: [
      { id: 'a', text: 'LCM = 12' },
      { id: 'b', text: 'LCM = 18', isCorrect: true },
      { id: 'c', text: 'LCM = 24' },
      { id: 'd', text: 'LCM = 54' },
    ],
    correctAnswer: 'b',
    hint: 'Multiples of 6: 6, 12, 18... Multiples of 9: 9, 18, 27... Smallest shared is 18.',
    misconceptionFeedback:
      'The least common multiple of 6 and 9 is 18. Multiplying by 18 clears both denominators efficiently.',
    correctExplanation:
      'Correct! 18 is the smallest positive number divisible by both 6 and 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q12',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for x in the equation:',
    equationDisplay: '(1/6)x + 5 = (2/9)x + 2',
    numericAnswer: 54,
    tolerance: 0.001,
    hint: 'Multiply every term by 18: 3x + 90 = 4x + 36.',
    misconceptionFeedback:
      '3x + 90 = 4x + 36. Subtract 3x: 90 = x + 36. Subtract 36: x = 54.',
    correctExplanation:
      'Correct! 3x + 90 = 4x + 36 -> x = 54.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q13',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for c:',
    equationDisplay: '(2/5)c - 3 = (1/4)c + 3',
    options: [
      { id: 'a', text: 'c = 30' },
      { id: 'b', text: 'c = 40', isCorrect: true },
      { id: 'c', text: 'c = 50' },
      { id: 'd', text: 'c = 60' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply all terms by the LCM 20: 8c - 60 = 5c + 60.',
    misconceptionFeedback:
      '8c - 60 = 5c + 60. Subtract 5c: 3c - 60 = 60. Add 60: 3c = 120. Divide by 3: c = 40.',
    correctExplanation:
      'Correct! 8c - 60 = 5c + 60 -> 3c = 120 -> c = 40.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q14',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for n by multiplying by 15:',
    equationDisplay: '(2/3)n - 8 = (1/5)n - 1',
    numericAnswer: 15,
    tolerance: 0.001,
    hint: 'Multiply all terms by 15: 10n - 120 = 3n - 15.',
    misconceptionFeedback:
      '10n - 120 = 3n - 15. Subtract 3n: 7n - 120 = -15. Add 120: 7n = 105. Divide by 7: n = 15.',
    correctExplanation:
      'Correct! 10n - 120 = 3n - 15 -> 7n = 105 -> n = 15.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q15',
    tabId: 'tab-4',
    type: 'multi-select',
    prompt: 'Select ALL statements that are TRUE about clearing denominators in (1/2)x + 4 = (2/3)x + 1:',
    options: [
      { id: 'opt1', text: 'The LCM of the denominators is 6', isCorrect: true },
      { id: 'opt2', text: 'Multiplying both sides by 6 produces 3x + 24 = 4x + 6', isCorrect: true },
      { id: 'opt3', text: 'The solution is x = 18', isCorrect: true },
      { id: 'opt4', text: 'Only the fraction terms need to be multiplied by 6' },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt3'],
    hint: 'Remember that when multiplying an equation by an LCM, every single term must be multiplied.',
    misconceptionFeedback:
      'LCM of 2 and 3 is 6. Multiplying gives 3x + 24 = 4x + 6. Solving: 24 - 6 = 4x - 3x -> x = 18. Constant terms must also be multiplied!',
    correctExplanation:
      'Correct! Statements 1, 2, and 3 are all mathematically accurate.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q16',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for y:',
    equationDisplay: '(5/8)y + 2 = (1/4)y + 8',
    numericAnswer: 16,
    tolerance: 0.001,
    hint: 'Multiply all terms by 8: 5y + 16 = 2y + 64.',
    misconceptionFeedback:
      '5y + 16 = 2y + 64. Subtract 2y: 3y + 16 = 64. Subtract 16: 3y = 48. Divide by 3: y = 16.',
    correctExplanation:
      'Correct! 5y + 16 = 2y + 64 -> 3y = 48 -> y = 16.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q17',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for t:',
    equationDisplay: '(4/5)t - 10 = (3/10)t + 5',
    options: [
      { id: 'a', text: 't = 20' },
      { id: 'b', text: 't = 25' },
      { id: 'c', text: 't = 30', isCorrect: true },
      { id: 'd', text: 't = 35' },
    ],
    correctAnswer: 'c',
    hint: 'Multiply all terms by 10: 8t - 100 = 3t + 50.',
    misconceptionFeedback:
      '8t - 100 = 3t + 50. Subtract 3t: 5t - 100 = 50. Add 100: 5t = 150. Divide by 5: t = 30.',
    correctExplanation:
      'Correct! 8t - 100 = 3t + 50 -> 5t = 150 -> t = 30.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q18',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for b:',
    equationDisplay: '(5/6)b - 11 = (1/3)b + 4',
    numericAnswer: 30,
    tolerance: 0.001,
    hint: 'Multiply all terms by 6: 5b - 66 = 2b + 24.',
    misconceptionFeedback:
      '5b - 66 = 2b + 24. Subtract 2b: 3b - 66 = 24. Add 66: 3b = 90. Divide by 3: b = 30.',
    correctExplanation:
      'Correct! 5b - 66 = 2b + 24 -> 3b = 90 -> b = 30.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q19',
    tabId: 'tab-4',
    type: 'multiple-choice',
    prompt: 'Solve for k in the rational equation:',
    equationDisplay: '(3/8)k + 7 = (1/2)k + 3',
    options: [
      { id: 'a', text: 'k = 24' },
      { id: 'b', text: 'k = 32', isCorrect: true },
      { id: 'c', text: 'k = 36' },
      { id: 'd', text: 'k = 40' },
    ],
    correctAnswer: 'b',
    hint: 'Multiply all terms by 8: 3k + 56 = 4k + 24.',
    misconceptionFeedback:
      '3k + 56 = 4k + 24. Subtract 3k: 56 = k + 24. Subtract 24: k = 32.',
    correctExplanation:
      'Correct! 3k + 56 = 4k + 24 -> k = 32.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't4-q20',
    tabId: 'tab-4',
    type: 'numeric-input',
    prompt: 'Solve for z:',
    equationDisplay: '(7/12)z - 4 = (1/4)z + 4',
    numericAnswer: 24,
    tolerance: 0.001,
    hint: 'Multiply all terms by 12: 7z - 48 = 3z + 48.',
    misconceptionFeedback:
      '7z - 48 = 3z + 48. Subtract 3z: 4z - 48 = 48. Add 48: 4z = 96. Divide by 4: z = 24.',
    correctExplanation:
      'Correct! 7z - 48 = 3z + 48 -> 4z = 96 -> z = 24.',
    teks: 'TEKS 8.8.C',
  },
];
