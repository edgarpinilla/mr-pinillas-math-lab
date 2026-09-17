import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB5_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't5-q1',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve the equation with decimal coefficients for x:',
    equationDisplay: '1.5x + 4.5 = 0.5x + 9.5',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 4' },
      { id: 'c', text: 'x = 5', isCorrect: true },
      { id: 'd', text: 'x = 6' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 0.5x from both sides: 1.5x - 0.5x = 1.0x.',
    misconceptionFeedback:
      '1.0x + 4.5 = 9.5. Subtract 4.5: x = 9.5 - 4.5 = 5.',
    correctExplanation:
      'Correct! 1.0x + 4.5 = 9.5 -> x = 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q2',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for m in the decimal equation:',
    equationDisplay: '0.75m + 2.5 = 0.25m + 6.5',
    numericAnswer: 8,
    tolerance: 0.001,
    hint: 'Subtract 0.25m from both sides: 0.50m + 2.5 = 6.5.',
    misconceptionFeedback:
      '0.50m = 4.0. Divide 4.0 by 0.50 (or multiply 4 by 2) to get m = 8.',
    correctExplanation:
      'Correct! 0.50m = 4.0 -> m = 4.0 / 0.50 = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q3',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for x:',
    equationDisplay: '2.4x - 3.6 = 1.2x + 4.8',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Subtract 1.2x from both sides: 1.2x - 3.6 = 4.8. Then add 3.6.',
    misconceptionFeedback:
      '1.2x = 8.4. Divide 8.4 by 1.2 gives x = 7.',
    correctExplanation:
      'Correct! 1.2x = 8.4 -> x = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q4',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for y in the equation:',
    equationDisplay: '3.5y + 12 = 1.5y + 26',
    options: [
      { id: 'a', text: 'y = 5' },
      { id: 'b', text: 'y = 7', isCorrect: true },
      { id: 'c', text: 'y = 8' },
      { id: 'd', text: 'y = 10' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 1.5y from both sides: 2y + 12 = 26.',
    misconceptionFeedback:
      '2y + 12 = 26. Subtract 12: 2y = 14. Divide by 2 gives y = 7.',
    correctExplanation:
      'Correct! 2y = 14 -> y = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q5',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for k:',
    equationDisplay: '0.8k + 5.2 = 0.3k + 8.7',
    numericAnswer: 7,
    tolerance: 0.001,
    hint: 'Subtract 0.3k from both sides: 0.5k + 5.2 = 8.7.',
    misconceptionFeedback:
      '0.5k = 3.5. Divide 3.5 by 0.5 to get k = 7.',
    correctExplanation:
      'Correct! 0.5k = 3.5 -> k = 3.5 / 0.5 = 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q6',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for p:',
    equationDisplay: '1.8p - 6.4 = 0.6p + 8.0',
    options: [
      { id: 'a', text: 'p = 10' },
      { id: 'b', text: 'p = 12', isCorrect: true },
      { id: 'c', text: 'p = 14' },
      { id: 'd', text: 'p = 16' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.6p from both sides: 1.2p - 6.4 = 8.0.',
    misconceptionFeedback:
      '1.2p = 14.4. Divide 14.4 by 1.2 gives p = 12.',
    correctExplanation:
      'Correct! 1.2p = 14.4 -> p = 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q7',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for w:',
    equationDisplay: '0.6w + 4.8 = 0.2w + 7.2',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 0.2w from both sides: 0.4w + 4.8 = 7.2.',
    misconceptionFeedback:
      '0.4w = 2.4. Divide 2.4 by 0.4 gives w = 6.',
    correctExplanation:
      'Correct! 0.4w = 2.4 -> w = 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q8',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for d in the decimal equation:',
    equationDisplay: '2.5d - 8.5 = 1.5d + 1.5',
    options: [
      { id: 'a', text: 'd = 8' },
      { id: 'b', text: 'd = 9' },
      { id: 'c', text: 'd = 10', isCorrect: true },
      { id: 'd', text: 'd = 12' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 1.5d from both sides: 1.0d - 8.5 = 1.5.',
    misconceptionFeedback:
      '1.0d = 10.0. Thus d = 10.',
    correctExplanation:
      'Correct! 1.0d - 8.5 = 1.5 -> d = 10.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q9',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for n:',
    equationDisplay: '0.4n + 9.6 = 1.2n - 1.6',
    numericAnswer: 14,
    tolerance: 0.001,
    hint: 'Subtract 0.4n from both sides: 9.6 = 0.8n - 1.6. Then add 1.6.',
    misconceptionFeedback:
      '11.2 = 0.8n. Divide 11.2 by 0.8 gives n = 14.',
    correctExplanation:
      'Correct! 11.2 = 0.8n -> n = 14.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q10',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for t:',
    equationDisplay: '1.6t - 5.5 = 0.8t + 4.9',
    numericAnswer: 13,
    tolerance: 0.001,
    hint: 'Subtract 0.8t from both sides: 0.8t - 5.5 = 4.9. Then add 5.5.',
    misconceptionFeedback:
      '0.8t = 10.4. Divide 10.4 by 0.8 gives t = 13.',
    correctExplanation:
      'Correct! 0.8t = 10.4 -> t = 13.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't5-q11',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for x:',
    equationDisplay: '3.2x + 6.4 = 1.2x + 22.4',
    options: [
      { id: 'a', text: 'x = 6' },
      { id: 'b', text: 'x = 8', isCorrect: true },
      { id: 'c', text: 'x = 9' },
      { id: 'd', text: 'x = 10' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 1.2x from both sides: 2.0x + 6.4 = 22.4.',
    misconceptionFeedback:
      '2.0x = 16.0. Divide by 2 gives x = 8.',
    correctExplanation:
      'Correct! 2.0x = 16.0 -> x = 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q12',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for b:',
    equationDisplay: '0.9b - 4.2 = 0.3b + 4.8',
    numericAnswer: 15,
    tolerance: 0.001,
    hint: 'Subtract 0.3b from both sides: 0.6b - 4.2 = 4.8.',
    misconceptionFeedback:
      '0.6b = 9.0. Divide 9.0 by 0.6 gives b = 15.',
    correctExplanation:
      'Correct! 0.6b = 9.0 -> b = 15.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q13',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for m in the equation:',
    equationDisplay: '2.8m + 7.4 = 1.4m + 20.0',
    options: [
      { id: 'a', text: 'm = 7' },
      { id: 'b', text: 'm = 8' },
      { id: 'c', text: 'm = 9', isCorrect: true },
      { id: 'd', text: 'm = 10' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 1.4m from both sides: 1.4m + 7.4 = 20.0.',
    misconceptionFeedback:
      '1.4m = 12.6. Divide 12.6 by 1.4 gives m = 9.',
    correctExplanation:
      'Correct! 1.4m = 12.6 -> m = 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q14',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for y:',
    equationDisplay: '0.45y + 3.2 = 0.15y + 8.6',
    numericAnswer: 18,
    tolerance: 0.001,
    hint: 'Subtract 0.15y from both sides: 0.30y + 3.2 = 8.6.',
    misconceptionFeedback:
      '0.30y = 5.4. Divide 5.4 by 0.30 gives y = 18.',
    correctExplanation:
      'Correct! 0.30y = 5.4 -> y = 18.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q15',
    tabId: 'tab-5',
    type: 'multi-select',
    prompt: 'Select ALL equations that have a solution of x = 10:',
    options: [
      { id: 'opt1', text: '0.5x + 3.0 = 0.2x + 6.0', isCorrect: true },
      { id: 'opt2', text: '1.2x - 4.0 = 0.4x + 4.0', isCorrect: true },
      { id: 'opt3', text: '2.5x + 5.0 = 1.5x + 20.0' },
      { id: 'opt4', text: '0.8x + 6.0 = 0.3x + 11.0', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt2', 'opt4'],
    hint: 'Substitute x = 10 into each equation to verify equality.',
    misconceptionFeedback:
      '0.5(10)+3 = 8 and 0.2(10)+6 = 8 (True). 1.2(10)-4 = 8 and 0.4(10)+4 = 8 (True). 2.5(10)+5 = 30 while 1.5(10)+20 = 35 (False). 0.8(10)+6 = 14 and 0.3(10)+11 = 14 (True).',
    correctExplanation:
      'Correct! Options 1, 2, and 4 balance to true statements when x = 10.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q16',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for c:',
    equationDisplay: '4.5c - 14.5 = 2.5c + 9.5',
    numericAnswer: 12,
    tolerance: 0.001,
    hint: 'Subtract 2.5c from both sides: 2.0c - 14.5 = 9.5.',
    misconceptionFeedback:
      '2.0c = 24.0. Divide by 2 gives c = 12.',
    correctExplanation:
      'Correct! 2.0c = 24.0 -> c = 12.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q17',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for k:',
    equationDisplay: '0.7k + 8.1 = 0.2k + 16.1',
    options: [
      { id: 'a', text: 'k = 14' },
      { id: 'b', text: 'k = 15' },
      { id: 'c', text: 'k = 16', isCorrect: true },
      { id: 'd', text: 'k = 18' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 0.2k from both sides: 0.5k + 8.1 = 16.1.',
    misconceptionFeedback:
      '0.5k = 8.0. Divide 8.0 by 0.5 gives k = 16.',
    correctExplanation:
      'Correct! 0.5k = 8.0 -> k = 16.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q18',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for h:',
    equationDisplay: '1.7h - 8.2 = 0.9h + 6.2',
    numericAnswer: 18,
    tolerance: 0.001,
    hint: 'Subtract 0.9h from both sides: 0.8h - 8.2 = 6.2.',
    misconceptionFeedback:
      '0.8h = 14.4. Divide 14.4 by 0.8 gives h = 18.',
    correctExplanation:
      'Correct! 0.8h = 14.4 -> h = 18.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q19',
    tabId: 'tab-5',
    type: 'multiple-choice',
    prompt: 'Solve for v in the equation:',
    equationDisplay: '0.35v + 4.9 = 0.15v + 8.3',
    options: [
      { id: 'a', text: 'v = 15' },
      { id: 'b', text: 'v = 17', isCorrect: true },
      { id: 'c', text: 'v = 18' },
      { id: 'd', text: 'v = 20' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.15v from both sides: 0.20v + 4.9 = 8.3.',
    misconceptionFeedback:
      '0.20v = 3.4. Divide 3.4 by 0.20 gives v = 17.',
    correctExplanation:
      'Correct! 0.20v = 3.4 -> v = 17.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't5-q20',
    tabId: 'tab-5',
    type: 'numeric-input',
    prompt: 'Solve for z:',
    equationDisplay: '3.6z - 12.8 = 1.6z + 17.2',
    numericAnswer: 15,
    tolerance: 0.001,
    hint: 'Subtract 1.6z from both sides: 2.0z - 12.8 = 17.2.',
    misconceptionFeedback:
      '2.0z = 30.0. Divide by 2 gives z = 15.',
    correctExplanation:
      'Correct! 2.0z = 30.0 -> z = 15.',
    teks: 'TEKS 8.8.C',
  },
];
