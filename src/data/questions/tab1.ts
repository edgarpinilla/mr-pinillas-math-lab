import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB1_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't1-q1',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Solve the linear equation for x:',
    equationDisplay: '7x + 2 = 3x + 18',
    options: [
      { id: 'a', text: 'x = 2' },
      { id: 'b', text: 'x = 4', isCorrect: true },
      { id: 'c', text: 'x = 5' },
      { id: 'd', text: 'x = 8' },
    ],
    correctAnswer: 'b',
    hint: 'Collect variable terms on one side first by subtracting 3x from both sides.',
    misconceptionFeedback:
      'Subtract 3x from both sides: 7x - 3x = 4x, leaving 4x + 2 = 18. Then subtract 2 and divide by 4.',
    correctExplanation:
      'Correct! 7x - 3x = 4x, so 4x + 2 = 18 -> 4x = 16 -> x = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q2',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'What value of x makes the equation true? Enter your numerical answer below.',
    equationDisplay: '9x - 5 = 4x + 20',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Subtract 4x from both sides, then add 5 to isolate the variable.',
    misconceptionFeedback:
      'Subtract 4x: 5x - 5 = 20. Then add 5 to both sides: 5x = 25. Divide by 5.',
    correctExplanation:
      'Correct! 5x - 5 = 20 -> 5x = 25 -> x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q3',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Which step is the most efficient first step to solve 6x + 8 = 2x + 24?',
    equationDisplay: '6x + 8 = 2x + 24',
    options: [
      { id: 'a', text: 'Subtract 2x from both sides of the equation', isCorrect: true },
      { id: 'b', text: 'Divide both sides by 6' },
      { id: 'c', text: 'Add 8 to both sides of the equation' },
      { id: 'd', text: 'Multiply both sides by 2' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract the smaller variable term from both sides to keep the variable positive.',
    misconceptionFeedback:
      'Subtracting 2x eliminates the variable on the right: 4x + 8 = 24.',
    correctExplanation:
      'Correct! Subtracting 2x from both sides leaves 4x + 8 = 24 with positive whole coefficients.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q4',
    tabId: 'tab-1',
    type: 'multi-select',
    prompt: 'Select ALL equations that have a solution of x = 3:',
    options: [
      { id: 'opt1', text: '5x - 2 = 2x + 7', isCorrect: true },
      { id: 'opt2', text: '4x + 1 = x + 10', isCorrect: true },
      { id: 'opt3', text: '6x + 4 = 3x + 15' },
      { id: 'opt4', text: '8x - 12 = 3x + 3', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt4'],
    hint: 'Substitute x = 3 into each equation to verify if left side equals right side.',
    misconceptionFeedback:
      '5(3)-2 = 13 and 2(3)+7 = 13. 4(3)+1 = 13 and 3+10 = 13. 8(3)-12 = 12 and 3(3)+3 = 12. But 6(3)+4 = 22 while 3(3)+15 = 24.',
    correctExplanation:
      'Correct! Options 1, 2, and 4 all evaluate to true equality when x = 3.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q5',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'A balance scale holds 5 mystery bags and 4 one-pound weights on one pan, balanced with 2 mystery bags and 16 one-pound weights on the other. How much does one bag weigh?',
    equationDisplay: '5b + 4 = 2b + 16',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Subtract 2b from both sides, then subtract 4.',
    misconceptionFeedback:
      '5b - 2b = 3b, so 3b + 4 = 16. Subtract 4: 3b = 12. Divide by 3.',
    correctExplanation:
      'Correct! 3b + 4 = 16 -> 3b = 12 -> b = 4 pounds.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q6',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '8x - 7 = 3x + 18',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Subtract 3x from both sides, then add 7 to both sides.',
    misconceptionFeedback:
      '8x - 3x = 5x, so 5x - 7 = 18. Add 7: 5x = 25. Divide by 5.',
    correctExplanation:
      'Correct! 5x - 7 = 18 -> 5x = 25 -> x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q7',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Find the value of k that satisfies the equation:',
    equationDisplay: '10k + 3 = 4k + 27',
    options: [
      { id: 'a', text: 'k = 3' },
      { id: 'b', text: 'k = 4', isCorrect: true },
      { id: 'c', text: 'k = 5' },
      { id: 'd', text: 'k = 6' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 4k from both sides to get 6k + 3 = 27.',
    misconceptionFeedback:
      '10k - 4k = 6k. 6k + 3 = 27. Subtract 3: 6k = 24. Divide by 6 gives k = 4.',
    correctExplanation:
      'Correct! 6k + 3 = 27 -> 6k = 24 -> k = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q8',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'What value of y satisfies the equation?',
    equationDisplay: '11y - 9 = 5y + 15',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Subtract 5y from both sides, then add 9.',
    misconceptionFeedback:
      '11y - 5y = 6y. 6y - 9 = 15. Add 9: 6y = 24. Divide by 6.',
    correctExplanation:
      'Correct! 6y - 9 = 15 -> 6y = 24 -> y = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q9',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Solve for m:',
    equationDisplay: '4m + 19 = 7m - 5',
    options: [
      { id: 'a', text: 'm = 6' },
      { id: 'b', text: 'm = 7' },
      { id: 'c', text: 'm = 8', isCorrect: true },
      { id: 'd', text: 'm = 9' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 4m from both sides: 19 = 3m - 5. Then add 5.',
    misconceptionFeedback:
      'Subtracting 4m gives 19 = 3m - 5. Add 5: 24 = 3m. Divide by 3 gives m = 8.',
    correctExplanation:
      'Correct! 19 = 3m - 5 -> 24 = 3m -> m = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q10',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for w:',
    equationDisplay: '12w - 11 = 2w + 49',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 2w from both sides: 10w - 11 = 49. Then add 11.',
    misconceptionFeedback:
      '12w - 2w = 10w. 10w - 11 = 49. Add 11: 10w = 60. Divide by 10.',
    correctExplanation:
      'Correct! 10w - 11 = 49 -> 10w = 60 -> w = 6.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't1-q11',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Solve the equation for p:',
    equationDisplay: '6p + 7 = 2p + 35',
    options: [
      { id: 'a', text: 'p = 5' },
      { id: 'b', text: 'p = 7', isCorrect: true },
      { id: 'c', text: 'p = 8' },
      { id: 'd', text: 'p = 9' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 2p from both sides to isolate variable terms on the left.',
    misconceptionFeedback:
      '6p - 2p = 4p. 4p + 7 = 35. Subtract 7: 4p = 28. Divide by 4 gives p = 7.',
    correctExplanation:
      'Correct! 4p + 7 = 35 -> 4p = 28 -> p = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q12',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '13x - 14 = 5x + 18',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Subtract 5x from both sides, then add 14.',
    misconceptionFeedback:
      '13x - 5x = 8x. 8x - 14 = 18. Add 14: 8x = 32. Divide by 8 gives x = 4.',
    correctExplanation:
      'Correct! 8x - 14 = 18 -> 8x = 32 -> x = 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q13',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'What value of a makes the equation true?',
    equationDisplay: '15a + 4 = 9a + 46',
    options: [
      { id: 'a', text: 'a = 5' },
      { id: 'b', text: 'a = 6' },
      { id: 'c', text: 'a = 7', isCorrect: true },
      { id: 'd', text: 'a = 8' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 9a from both sides: 6a + 4 = 46.',
    misconceptionFeedback:
      '15a - 9a = 6a. 6a + 4 = 46. Subtract 4: 6a = 42. Divide by 6 gives a = 7.',
    correctExplanation:
      'Correct! 6a + 4 = 46 -> 6a = 42 -> a = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q14',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for d:',
    equationDisplay: '14d - 25 = 6d + 15',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Subtract 6d from both sides: 8d - 25 = 15. Then add 25.',
    misconceptionFeedback:
      '14d - 6d = 8d. 8d - 25 = 15. Add 25: 8d = 40. Divide by 8 gives d = 5.',
    correctExplanation:
      'Correct! 8d - 25 = 15 -> 8d = 40 -> d = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q15',
    tabId: 'tab-1',
    type: 'multi-select',
    prompt: 'Select ALL equations that have a solution of x = 5:',
    options: [
      { id: 'opt1', text: '7x - 9 = 4x + 6', isCorrect: true },
      { id: 'opt2', text: '3x + 10 = x + 20', isCorrect: true },
      { id: 'opt3', text: '5x + 2 = 2x + 14' },
      { id: 'opt4', text: '6x - 13 = 2x + 7', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt4'],
    hint: 'Substitute x = 5 into each equation to verify equality.',
    misconceptionFeedback:
      'Check: 7(5)-9 = 26 and 4(5)+6 = 26 (True). 3(5)+10 = 25 and 5+20 = 25 (True). 5(5)+2 = 27 while 2(5)+14 = 24 (False). 6(5)-13 = 17 and 2(5)+7 = 17 (True).',
    correctExplanation:
      'Correct! Options 1, 2, and 4 balance to true statements when x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q16',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for n:',
    equationDisplay: '16n + 5 = 7n + 59',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 7n from both sides, then subtract 5.',
    misconceptionFeedback:
      '16n - 7n = 9n. 9n + 5 = 59. Subtract 5: 9n = 54. Divide by 9.',
    correctExplanation:
      'Correct! 9n + 5 = 59 -> 9n = 54 -> n = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q17',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Solve for c:',
    equationDisplay: '5c + 31 = 9c - 9',
    options: [
      { id: 'a', text: 'c = 8' },
      { id: 'b', text: 'c = 10', isCorrect: true },
      { id: 'c', text: 'c = 11' },
      { id: 'd', text: 'c = 12' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 5c from both sides: 31 = 4c - 9. Then add 9.',
    misconceptionFeedback:
      '31 = 4c - 9. Add 9 to both sides: 40 = 4c. Divide by 4 gives c = 10.',
    correctExplanation:
      'Correct! 31 = 4c - 9 -> 40 = 4c -> c = 10.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q18',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'What value of v makes this equation true?',
    equationDisplay: '8v + 17 = 3v + 52',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Subtract 3v from both sides, then subtract 17.',
    misconceptionFeedback:
      '8v - 3v = 5v. 5v + 17 = 52. Subtract 17: 5v = 35. Divide by 5.',
    correctExplanation:
      'Correct! 5v + 17 = 52 -> 5v = 35 -> v = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q19',
    tabId: 'tab-1',
    type: 'multiple-choice',
    prompt: 'Solve for x:',
    equationDisplay: '11x - 16 = 7x + 20',
    options: [
      { id: 'a', text: 'x = 7' },
      { id: 'b', text: 'x = 8' },
      { id: 'c', text: 'x = 9', isCorrect: true },
      { id: 'd', text: 'x = 10' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 7x from both sides: 4x - 16 = 20. Then add 16.',
    misconceptionFeedback:
      '11x - 7x = 4x. 4x - 16 = 20. Add 16: 4x = 36. Divide by 4 gives x = 9.',
    correctExplanation:
      'Correct! 4x - 16 = 20 -> 4x = 36 -> x = 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't1-q20',
    tabId: 'tab-1',
    type: 'numeric-input',
    prompt: 'Solve for z:',
    equationDisplay: '18z - 35 = 11z + 14',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Subtract 11z from both sides: 7z - 35 = 14. Then add 35.',
    misconceptionFeedback:
      '18z - 11z = 7z. 7z - 35 = 14. Add 35: 7z = 49. Divide by 7.',
    correctExplanation:
      'Correct! 7z - 35 = 14 -> 7z = 49 -> z = 7.',
    teks: 'TEKS 8.8.C',
  },
];
