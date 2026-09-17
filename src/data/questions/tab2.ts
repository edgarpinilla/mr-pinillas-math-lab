import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB2_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't2-q1',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Simplify by combining like terms, then solve for x:',
    equationDisplay: '3x + 4 + 2x = x + 20',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 4', isCorrect: true },
      { id: 'c', text: 'x = 5' },
      { id: 'd', text: 'x = 6' },
    ],
    correctAnswer: 'b',
    hint: 'Combine 3x and 2x on the left side first: 3x + 2x = 5x.',
    misconceptionFeedback:
      '3x + 2x = 5x, giving 5x + 4 = x + 20. Subtract x: 4x + 4 = 20. Subtract 4: 4x = 16. Divide by 4.',
    correctExplanation:
      'Correct! 5x + 4 = x + 20 -> 4x = 16 -> x = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q2',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for x after combining like terms on the left side:',
    equationDisplay: '8x - 3 - 2x = 3x + 15',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Combine 8x and -2x on the left side to get 6x.',
    misconceptionFeedback:
      '8x - 2x = 6x, so 6x - 3 = 3x + 15. Subtract 3x: 3x - 3 = 15. Add 3: 3x = 18. Divide by 3.',
    correctExplanation:
      'Correct! 6x - 3 = 3x + 15 -> 3x = 18 -> x = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q3',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'In the equation 7x - 2 + 3x = 4x + 22, what is the simplified left-hand expression?',
    equationDisplay: '7x - 2 + 3x = 4x + 22',
    options: [
      { id: 'a', text: '10x - 2', isCorrect: true },
      { id: 'b', text: '4x - 2' },
      { id: 'c', text: '10x + 2' },
      { id: 'd', text: '8x' },
    ],
    correctAnswer: 'a',
    hint: 'Add the variable coefficients 7x + 3x, and keep the constant -2.',
    misconceptionFeedback:
      '7x and +3x are like terms: 7x + 3x = 10x. The constant is -2, so the left side simplifies to 10x - 2.',
    correctExplanation:
      'Correct! 7x + 3x = 10x, leaving 10x - 2.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q4',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for y in the equation:',
    equationDisplay: '2y + 5 + 5y - 1 = 3y + 24',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Combine like terms on the left: (2y + 5y) + (5 - 1) = 7y + 4.',
    misconceptionFeedback:
      'Combine: 7y + 4 = 3y + 24. Subtract 3y: 4y + 4 = 24. Subtract 4: 4y = 20. Divide by 4.',
    correctExplanation:
      'Correct! 7y + 4 = 3y + 24 -> 4y = 20 -> y = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q5',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Combine like terms on both sides and solve for m:',
    equationDisplay: '4m + 6 + 2m = m + 15 + 2m',
    options: [
      { id: 'a', text: 'm = 2' },
      { id: 'b', text: 'm = 3', isCorrect: true },
      { id: 'c', text: 'm = 4' },
      { id: 'd', text: 'm = 5' },
    ],
    correctAnswer: 'b',
    hint: 'Left side: 4m + 2m + 6 = 6m + 6. Right side: m + 2m + 15 = 3m + 15.',
    misconceptionFeedback:
      '6m + 6 = 3m + 15. Subtract 3m: 3m + 6 = 15. Subtract 6: 3m = 9. Divide by 3.',
    correctExplanation:
      'Correct! 6m + 6 = 3m + 15 -> 3m = 9 -> m = 3.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q6',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '9x + 2 - 4x + 3 = 2x + 23',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Combine on the left: (9x - 4x) + (2 + 3) = 5x + 5.',
    misconceptionFeedback:
      '5x + 5 = 2x + 23. Subtract 2x: 3x + 5 = 23. Subtract 5: 3x = 18. Divide by 3.',
    correctExplanation:
      'Correct! 5x + 5 = 2x + 23 -> 3x = 18 -> x = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q7',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Solve for w:',
    equationDisplay: '6w - 8 + 2w = 5w + 13',
    options: [
      { id: 'a', text: 'w = 5' },
      { id: 'b', text: 'w = 6' },
      { id: 'c', text: 'w = 7', isCorrect: true },
      { id: 'd', text: 'w = 8' },
    ],
    correctAnswer: 'c',
    hint: 'Combine 6w + 2w = 8w on the left.',
    misconceptionFeedback:
      '8w - 8 = 5w + 13. Subtract 5w: 3w - 8 = 13. Add 8: 3w = 21. Divide by 3.',
    correctExplanation:
      'Correct! 8w - 8 = 5w + 13 -> 3w = 21 -> w = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q8',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for k:',
    equationDisplay: '5k + 12 - 2k = 2k + 20',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Combine 5k - 2k = 3k on the left side: 3k + 12 = 2k + 20.',
    misconceptionFeedback:
      '3k + 12 = 2k + 20. Subtract 2k: k + 12 = 20. Subtract 12: k = 8.',
    correctExplanation:
      'Correct! 3k + 12 = 2k + 20 -> k = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q9',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Solve for p:',
    equationDisplay: '10p - 7 - 3p = 4p + 17',
    options: [
      { id: 'a', text: 'p = 6' },
      { id: 'b', text: 'p = 7' },
      { id: 'c', text: 'p = 8', isCorrect: true },
      { id: 'd', text: 'p = 9' },
    ],
    correctAnswer: 'c',
    hint: 'Combine 10p - 3p = 7p on the left side.',
    misconceptionFeedback:
      '7p - 7 = 4p + 17. Subtract 4p: 3p - 7 = 17. Add 7: 3p = 24. Divide by 3.',
    correctExplanation:
      'Correct! 7p - 7 = 4p + 17 -> 3p = 24 -> p = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q10',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for b:',
    equationDisplay: '7b + 1 - 2b + 5 = 2b + 30',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Combine like terms on left: (7b - 2b) + (1 + 5) = 5b + 6.',
    misconceptionFeedback:
      '5b + 6 = 2b + 30. Subtract 2b: 3b + 6 = 30. Subtract 6: 3b = 24. Divide by 3.',
    correctExplanation:
      'Correct! 5b + 6 = 2b + 30 -> 3b = 24 -> b = 8.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't2-q11',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Simplify both sides by combining like terms, then solve for x:',
    equationDisplay: '5x + 9 + 3x = 2x + 39',
    options: [
      { id: 'a', text: 'x = 4' },
      { id: 'b', text: 'x = 5', isCorrect: true },
      { id: 'c', text: 'x = 6' },
      { id: 'd', text: 'x = 7' },
    ],
    correctAnswer: 'b',
    hint: 'Combine 5x + 3x = 8x on the left side.',
    misconceptionFeedback:
      '8x + 9 = 2x + 39. Subtract 2x: 6x + 9 = 39. Subtract 9: 6x = 30. Divide by 6.',
    correctExplanation:
      'Correct! 8x + 9 = 2x + 39 -> 6x = 30 -> x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q12',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for n:',
    equationDisplay: '11n - 4 - 3n = 5n + 17',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Combine 11n - 3n = 8n on the left side.',
    misconceptionFeedback:
      '8n - 4 = 5n + 17. Subtract 5n: 3n - 4 = 17. Add 4: 3n = 21. Divide by 3.',
    correctExplanation:
      'Correct! 8n - 4 = 5n + 17 -> 3n = 21 -> n = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q13',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Solve for y in the equation:',
    equationDisplay: '4y + 8 + 3y - 2 = 2y + 41',
    options: [
      { id: 'a', text: 'y = 6' },
      { id: 'b', text: 'y = 7', isCorrect: true },
      { id: 'c', text: 'y = 8' },
      { id: 'd', text: 'y = 9' },
    ],
    correctAnswer: 'b',
    hint: 'Combine (4y + 3y) + (8 - 2) = 7y + 6 on the left.',
    misconceptionFeedback:
      '7y + 6 = 2y + 41. Subtract 2y: 5y + 6 = 41. Subtract 6: 5y = 35. Divide by 5.',
    correctExplanation:
      'Correct! 7y + 6 = 2y + 41 -> 5y = 35 -> y = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q14',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for t:',
    equationDisplay: '9t + 15 - 4t = 2t + 36',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Combine 9t - 4t = 5t on the left side.',
    misconceptionFeedback:
      '5t + 15 = 2t + 36. Subtract 2t: 3t + 15 = 36. Subtract 15: 3t = 21. Divide by 3.',
    correctExplanation:
      'Correct! 5t + 15 = 2t + 36 -> 3t = 21 -> t = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q15',
    tabId: 'tab-2',
    type: 'multi-select',
    prompt: 'Select ALL equations that simplify to 6x + 5 = 2x + 21:',
    options: [
      { id: 'opt1', text: '4x + 2x + 5 = 2x + 21', isCorrect: true },
      { id: 'opt2', text: '7x - x + 5 = 2x + 21', isCorrect: true },
      { id: 'opt3', text: '5x + 3 + x + 2 = 2x + 21', isCorrect: true },
      { id: 'opt4', text: '8x - 3x + 5 = 2x + 21' },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt3'],
    hint: 'Check if the left-hand terms sum to 6x + 5.',
    misconceptionFeedback:
      '4x + 2x + 5 = 6x + 5 (True). 7x - x + 5 = 6x + 5 (True). 5x + x = 6x and 3 + 2 = 5 (True). But 8x - 3x = 5x, not 6x.',
    correctExplanation:
      'Correct! Options 1, 2, and 3 each combine to 6x + 5 on the left side.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q16',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for a:',
    equationDisplay: '8a - 11 + 2a = 6a + 21',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Combine 8a + 2a = 10a on the left side.',
    misconceptionFeedback:
      '10a - 11 = 6a + 21. Subtract 6a: 4a - 11 = 21. Add 11: 4a = 32. Divide by 4.',
    correctExplanation:
      'Correct! 10a - 11 = 6a + 21 -> 4a = 32 -> a = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q17',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Solve for c:',
    equationDisplay: '12c + 5 - 5c - 2 = 3c + 31',
    options: [
      { id: 'a', text: 'c = 5' },
      { id: 'b', text: 'c = 6' },
      { id: 'c', text: 'c = 7', isCorrect: true },
      { id: 'd', text: 'c = 8' },
    ],
    correctAnswer: 'c',
    hint: 'Combine (12c - 5c) + (5 - 2) = 7c + 3 on the left side.',
    misconceptionFeedback:
      '7c + 3 = 3c + 31. Subtract 3c: 4c + 3 = 31. Subtract 3: 4c = 28. Divide by 4.',
    correctExplanation:
      'Correct! 7c + 3 = 3c + 31 -> 4c = 28 -> c = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q18',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for m:',
    equationDisplay: '6m + 14 + 3m - 4 = 4m + 35',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Combine (6m + 3m) + (14 - 4) = 9m + 10.',
    misconceptionFeedback:
      '9m + 10 = 4m + 35. Subtract 4m: 5m + 10 = 35. Subtract 10: 5m = 25. Divide by 5.',
    correctExplanation:
      'Correct! 9m + 10 = 4m + 35 -> 5m = 25 -> m = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q19',
    tabId: 'tab-2',
    type: 'multiple-choice',
    prompt: 'Solve for v:',
    equationDisplay: '14v - 6 - 6v = 3v + 29',
    options: [
      { id: 'a', text: 'v = 5' },
      { id: 'b', text: 'v = 6' },
      { id: 'c', text: 'v = 7', isCorrect: true },
      { id: 'd', text: 'v = 8' },
    ],
    correctAnswer: 'c',
    hint: 'Combine 14v - 6v = 8v on the left side: 8v - 6 = 3v + 29.',
    misconceptionFeedback:
      '8v - 6 = 3v + 29. Subtract 3v: 5v - 6 = 29. Add 6: 5v = 35. Divide by 5.',
    correctExplanation:
      'Correct! 8v - 6 = 3v + 29 -> 5v = 35 -> v = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't2-q20',
    tabId: 'tab-2',
    type: 'numeric-input',
    prompt: 'Solve for z:',
    equationDisplay: '10z + 8 - 3z + 2 = 2z + 55',
    numericAnswer: 9,
    tolerance: 0.001,
    hint: 'Combine (10z - 3z) + (8 + 2) = 7z + 10 on the left.',
    misconceptionFeedback:
      '7z + 10 = 2z + 55. Subtract 2z: 5z + 10 = 55. Subtract 10: 5z = 45. Divide by 5.',
    correctExplanation:
      'Correct! 7z + 10 = 2z + 55 -> 5z = 45 -> z = 9.',
    teks: 'TEKS 8.8.C',
  },
];
