import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB3_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't3-q1',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve the equation with negative coefficients for x:',
    equationDisplay: '-4x + 15 = 2x - 9',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 4', isCorrect: true },
      { id: 'c', text: 'x = -4' },
      { id: 'd', text: 'x = 6' },
    ],
    correctAnswer: 'b',
    hint: 'Add 4x to both sides to make the variable coefficient positive: 15 = 6x - 9.',
    misconceptionFeedback:
      'Adding 4x gives 15 = 6x - 9. Then add 9 to both sides: 24 = 6x. Dividing by 6 gives x = 4.',
    correctExplanation:
      'Correct! Add 4x to both sides: 15 = 6x - 9. Add 9: 24 = 6x. Divide by 6: x = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q2',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for x. Pay careful attention to the signs:',
    equationDisplay: '5x - 14 = 8x + 4',
    numericAnswer: -6,
    tolerance: 0.001,
    hint: 'Subtract 5x from both sides to get -14 = 3x + 4. Then subtract 4.',
    misconceptionFeedback:
      '-14 = 3x + 4. Subtract 4: -18 = 3x. Dividing -18 by 3 gives -6.',
    correctExplanation:
      'Correct! 5x - 8x = -3x -> -3x = 18 -> x = -6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q3',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'What value of x satisfies the equation?',
    equationDisplay: '-2x + 7 = 3x - 18',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 5', isCorrect: true },
      { id: 'c', text: 'x = -5' },
      { id: 'd', text: 'x = 7' },
    ],
    correctAnswer: 'b',
    hint: 'Add 2x to both sides: 7 = 5x - 18. Then add 18 to both sides.',
    misconceptionFeedback:
      '7 = 5x - 18. Adding 18 gives 25 = 5x. Dividing by 5 yields x = 5.',
    correctExplanation:
      'Correct! 7 = 5x - 18 -> 25 = 5x -> x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q4',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for k:',
    equationDisplay: '10 - 6k = -2k - 14',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Add 6k to both sides to make the coefficient of k positive.',
    misconceptionFeedback:
      '10 = 4k - 14. Add 14: 24 = 4k. Divide by 4 gives k = 6.',
    correctExplanation:
      'Correct! 10 = 4k - 14 -> 24 = 4k -> k = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q5',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve for m:',
    equationDisplay: '-7m + 8 = -3m - 16',
    options: [
      { id: 'a', text: 'm = -6' },
      { id: 'b', text: 'm = 4' },
      { id: 'c', text: 'm = 6', isCorrect: true },
      { id: 'd', text: 'm = -4' },
    ],
    correctAnswer: 'c',
    hint: 'Add 7m to both sides: 8 = 4m - 16. Then add 16.',
    misconceptionFeedback:
      '8 = 4m - 16. Add 16: 24 = 4m. Divide by 4 gives m = 6.',
    correctExplanation:
      'Correct! 8 = 4m - 16 -> 24 = 4m -> m = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q6',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for y in the equation:',
    equationDisplay: '-5y - 9 = 2y + 26',
    numericAnswer: -5,
    tolerance: 0.001,
    hint: 'Add 5y to both sides: -9 = 7y + 26. Then subtract 26.',
    misconceptionFeedback:
      '-9 = 7y + 26. Subtract 26: -35 = 7y. Divide by 7 gives y = -5.',
    correctExplanation:
      'Correct! -35 = 7y -> y = -5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q7',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Find the solution to the equation:',
    equationDisplay: '3p - 20 = -2p + 15',
    options: [
      { id: 'a', text: 'p = 5' },
      { id: 'b', text: 'p = 7', isCorrect: true },
      { id: 'c', text: 'p = -7' },
      { id: 'd', text: 'p = 9' },
    ],
    correctAnswer: 'b',
    hint: 'Add 2p to both sides: 5p - 20 = 15. Then add 20.',
    misconceptionFeedback:
      '3p + 2p = 5p. 5p - 20 = 15. Add 20: 5p = 35. Divide by 5 gives p = 7.',
    correctExplanation:
      'Correct! 5p - 20 = 15 -> 5p = 35 -> p = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q8',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for w:',
    equationDisplay: '-8w + 5 = -5w - 16',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Add 8w to both sides: 5 = 3w - 16. Then add 16.',
    misconceptionFeedback:
      '5 = 3w - 16. Add 16: 21 = 3w. Divide by 3 gives w = 7.',
    correctExplanation:
      'Correct! 5 = 3w - 16 -> 21 = 3w -> w = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q9',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve for a:',
    equationDisplay: '4a + 18 = -2a - 24',
    options: [
      { id: 'a', text: 'a = -5' },
      { id: 'b', text: 'a = -7', isCorrect: true },
      { id: 'c', text: 'a = 7' },
      { id: 'd', text: 'a = -6' },
    ],
    correctAnswer: 'b',
    hint: 'Add 2a to both sides: 6a + 18 = -24. Then subtract 18.',
    misconceptionFeedback:
      '6a + 18 = -24. Subtract 18: 6a = -42. Divide by 6 gives a = -7.',
    correctExplanation:
      'Correct! 6a + 18 = -24 -> 6a = -42 -> a = -7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q10',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '-6x - 11 = -x + 19',
    numericAnswer: -6,
    tolerance: 0.001,
    hint: 'Add 6x to both sides: -11 = 5x + 19. Then subtract 19.',
    misconceptionFeedback:
      '-11 = 5x + 19. Subtract 19: -30 = 5x. Divide by 5 gives x = -6.',
    correctExplanation:
      'Correct! -11 = 5x + 19 -> -30 = 5x -> x = -6.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't3-q11',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve for n in the equation:',
    equationDisplay: '-9n + 12 = 3n - 36',
    options: [
      { id: 'a', text: 'n = 3' },
      { id: 'b', text: 'n = 4', isCorrect: true },
      { id: 'c', text: 'n = -4' },
      { id: 'd', text: 'n = 5' },
    ],
    correctAnswer: 'b',
    hint: 'Add 9n to both sides: 12 = 12n - 36. Then add 36.',
    misconceptionFeedback:
      '12 = 12n - 36. Add 36: 48 = 12n. Divide by 12 gives n = 4.',
    correctExplanation:
      'Correct! 12 = 12n - 36 -> 48 = 12n -> n = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q12',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for c:',
    equationDisplay: '2c - 28 = -5c + 21',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Add 5c to both sides: 7c - 28 = 21. Then add 28.',
    misconceptionFeedback:
      '7c - 28 = 21. Add 28: 7c = 49. Divide by 7 gives c = 7.',
    correctExplanation:
      'Correct! 7c - 28 = 21 -> 7c = 49 -> c = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q13',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'What value of v makes this equation true?',
    equationDisplay: '-3v - 15 = 4v + 27',
    options: [
      { id: 'a', text: 'v = -5' },
      { id: 'b', text: 'v = -6', isCorrect: true },
      { id: 'c', text: 'v = 6' },
      { id: 'd', text: 'v = -7' },
    ],
    correctAnswer: 'b',
    hint: 'Add 3v to both sides: -15 = 7v + 27. Then subtract 27.',
    misconceptionFeedback:
      '-15 = 7v + 27. Subtract 27: -42 = 7v. Divide by 7 gives v = -6.',
    correctExplanation:
      'Correct! -42 = 7v -> v = -6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q14',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for z:',
    equationDisplay: '7 - 8z = -3z - 28',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Add 8z to both sides: 7 = 5z - 28. Then add 28.',
    misconceptionFeedback:
      '7 = 5z - 28. Add 28: 35 = 5z. Divide by 5 gives z = 7.',
    correctExplanation:
      'Correct! 7 = 5z - 28 -> 35 = 5z -> z = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q15',
    tabId: 'tab-3',
    type: 'multi-select',
    prompt: 'Select ALL equations that result in a negative solution:',
    options: [
      { id: 'opt1', text: '4x + 15 = x - 6', isCorrect: true },
      { id: 'opt2', text: '3x - 5 = 7x + 19', isCorrect: true },
      { id: 'opt3', text: '5x - 2 = 2x + 13' },
      { id: 'opt4', text: '-2x + 8 = 3x + 28', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt4'],
    hint: 'Solve each equation to check the sign of the solution.',
    misconceptionFeedback:
      '4x+15=x-6 -> 3x=-21 -> x=-7 (Negative). 3x-5=7x+19 -> -4x=24 -> x=-6 (Negative). 5x-2=2x+13 -> 3x=15 -> x=5 (Positive). -2x+8=3x+28 -> -5x=20 -> x=-4 (Negative).',
    correctExplanation:
      'Correct! Options 1 (x = -7), 2 (x = -6), and 4 (x = -4) all have negative solutions.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q16',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for b:',
    equationDisplay: '-10b + 9 = -4b - 39',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Add 10b to both sides: 9 = 6b - 39. Then add 39.',
    misconceptionFeedback:
      '9 = 6b - 39. Add 39: 48 = 6b. Divide by 6 gives b = 8.',
    correctExplanation:
      'Correct! 9 = 6b - 39 -> 48 = 6b -> b = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q17',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve for d:',
    equationDisplay: '5d - 33 = -3d + 23',
    options: [
      { id: 'a', text: 'd = 6' },
      { id: 'b', text: 'd = 7', isCorrect: true },
      { id: 'c', text: 'd = 8' },
      { id: 'd', text: 'd = 9' },
    ],
    correctAnswer: 'b',
    hint: 'Add 3d to both sides: 8d - 33 = 23. Then add 33.',
    misconceptionFeedback:
      '8d - 33 = 23. Add 33: 8d = 56. Divide by 8 gives d = 7.',
    correctExplanation:
      'Correct! 8d - 33 = 23 -> 8d = 56 -> d = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q18',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for x in the equation:',
    equationDisplay: '-7x - 13 = 2x + 50',
    numericAnswer: -7,
    tolerance: 0.001,
    hint: 'Add 7x to both sides: -13 = 9x + 50. Then subtract 50.',
    misconceptionFeedback:
      '-13 = 9x + 50. Subtract 50: -63 = 9x. Divide by 9 gives x = -7.',
    correctExplanation:
      'Correct! -13 = 9x + 50 -> -63 = 9x -> x = -7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q19',
    tabId: 'tab-3',
    type: 'multiple-choice',
    prompt: 'Solve for k:',
    equationDisplay: '-11k + 20 = -5k - 28',
    options: [
      { id: 'a', text: 'k = 7' },
      { id: 'b', text: 'k = 8', isCorrect: true },
      { id: 'c', text: 'k = -8' },
      { id: 'd', text: 'k = 9' },
    ],
    correctAnswer: 'b',
    hint: 'Add 11k to both sides: 20 = 6k - 28. Then add 28.',
    misconceptionFeedback:
      '20 = 6k - 28. Add 28: 48 = 6k. Divide by 6 gives k = 8.',
    correctExplanation:
      'Correct! 20 = 6k - 28 -> 48 = 6k -> k = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't3-q20',
    tabId: 'tab-3',
    type: 'numeric-input',
    prompt: 'Solve for m:',
    equationDisplay: '6m + 25 = -2m - 39',
    numericAnswer: -8,
    tolerance: 0.001,
    hint: 'Add 2m to both sides: 8m + 25 = -39. Then subtract 25.',
    misconceptionFeedback:
      '8m + 25 = -39. Subtract 25: 8m = -64. Divide by 8 gives m = -8.',
    correctExplanation:
      'Correct! 8m + 25 = -39 -> 8m = -64 -> m = -8.',
    teks: 'TEKS 8.8.C',
  },
];
