import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB8_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't8-q1',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve the inequality. Remember to reverse the inequality symbol when dividing by a negative number:',
    equationDisplay: '2x + 18 < 6x - 6',
    inequalityConfig: {
      variable: 'x',
      symbol: '>',
      value: 6,
    },
    hint: 'Subtract 6x from both sides: -4x + 18 < -6. Subtract 18: -4x < -24. When dividing by -4, flip "<" to ">".',
    misconceptionFeedback:
      '-4x < -24. Dividing by -4 reverses the inequality sign from "<" to ">", giving x > 6.',
    correctExplanation:
      'Correct! Dividing by -4 reverses the inequality symbol: -4x < -24 becomes x > 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q2',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'When solving -5x > 35, why does the inequality symbol flip?',
    options: [
      { id: 'a', text: 'Because 35 is a positive integer' },
      { id: 'b', text: 'Because dividing both sides by a negative number reverses the order of values', isCorrect: true },
      { id: 'c', text: 'Because x is on the left side' },
      { id: 'd', text: 'Because 5 is a prime number' },
    ],
    correctAnswer: 'b',
    hint: 'Think about number line order: 2 < 5, but multiplying/dividing by -1 gives -2 > -5.',
    misconceptionFeedback:
      'Multiplying or dividing both sides by any negative number inverts the direction of inequality on the number line.',
    correctExplanation:
      'Correct! Dividing or multiplying by a negative number inverts the relative positions of quantities on the number line.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q3',
    tabId: 'tab-8',
    type: 'number-line-select',
    prompt: 'Solve -3x + 5 ≤ 2x - 15 and select the correct number line representation:',
    equationDisplay: '-3x + 5 ≤ 2x - 15',
    numberLineData: {
      min: 0,
      max: 8,
      step: 1,
      boundary: 4,
      isClosed: true,
      direction: 'right',
      label: 'x ≥ 4',
    },
    options: [
      { id: 'a', text: 'Closed circle at 4, shaded ray pointing right (x ≥ 4)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 4, shaded ray pointing left (x ≤ 4)' },
      { id: 'c', text: 'Open circle at 4, shaded ray pointing right (x > 4)' },
      { id: 'd', text: 'Open circle at 4, shaded ray pointing left (x < 4)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 2x: -5x + 5 ≤ -15. Subtract 5: -5x ≤ -20. Divide by -5 and flip "≤" to "≥": x ≥ 4.',
    misconceptionFeedback:
      '-5x ≤ -20. Dividing by -5 flips "≤" to "≥", yielding x ≥ 4. A closed circle at 4 points right.',
    correctExplanation:
      'Correct! -5x ≤ -20 -> x ≥ 4 (closed circle at 4 pointing right).',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q4',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for m:',
    equationDisplay: '3m + 14 > 8m - 21',
    inequalityConfig: {
      variable: 'm',
      symbol: '<',
      value: 7,
    },
    hint: 'Subtract 8m: -5m + 14 > -21. Subtract 14: -5m > -35. Dividing by -5 flips ">" to "<".',
    misconceptionFeedback:
      '-5m > -35. Dividing by -5 flips ">" to "<", giving m < 7.',
    correctExplanation:
      'Correct! -5m > -35 -> m < 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q5',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'Solve the inequality: 4 - 6y ≥ 10 - 4y',
    equationDisplay: '4 - 6y ≥ 10 - 4y',
    options: [
      { id: 'a', text: 'y ≤ -3', isCorrect: true },
      { id: 'b', text: 'y ≥ -3' },
      { id: 'c', text: 'y ≤ 3' },
      { id: 'd', text: 'y ≥ 3' },
    ],
    correctAnswer: 'a',
    hint: 'Add 4y to both sides: 4 - 2y ≥ 10. Subtract 4: -2y ≥ 6. Divide by -2 and flip the symbol.',
    misconceptionFeedback:
      '-2y ≥ 6. Dividing by -2 flips "≥" to "≤", so y ≤ -3.',
    correctExplanation:
      'Correct! -2y ≥ 6 -> y ≤ -3.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q6',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for k:',
    equationDisplay: '-7k + 9 < -2k - 16',
    inequalityConfig: {
      variable: 'k',
      symbol: '>',
      value: 5,
    },
    hint: 'Add 2k: -5k + 9 < -16. Subtract 9: -5k < -25. Divide by -5 and flip symbol.',
    misconceptionFeedback:
      '-5k < -25. Dividing by -5 reverses "<" to ">", giving k > 5.',
    correctExplanation:
      'Correct! -5k < -25 -> k > 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q7',
    tabId: 'tab-8',
    type: 'number-line-select',
    prompt: 'Solve 2p + 15 ≤ 7p - 20 and find the matching number line graph:',
    equationDisplay: '2p + 15 ≤ 7p - 20',
    numberLineData: {
      min: 2,
      max: 12,
      step: 1,
      boundary: 7,
      isClosed: true,
      direction: 'right',
      label: 'p ≥ 7',
    },
    options: [
      { id: 'a', text: 'Closed circle at 7, shaded ray pointing right (p ≥ 7)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 7, shaded ray pointing left (p ≤ 7)' },
      { id: 'c', text: 'Open circle at 7, shaded ray pointing right (p > 7)' },
      { id: 'd', text: 'Open circle at 7, shaded ray pointing left (p < 7)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 7p: -5p + 15 ≤ -20. Subtract 15: -5p ≤ -35. Divide by -5: p ≥ 7.',
    misconceptionFeedback:
      '-5p ≤ -35 -> p ≥ 7. Closed circle at 7 pointing right.',
    correctExplanation:
      'Correct! Dividing by -5 flips "≤" to "≥", giving p ≥ 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q8',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'Solve for w: -8w + 6 > -3w - 29',
    equationDisplay: '-8w + 6 > -3w - 29',
    options: [
      { id: 'a', text: 'w < 7', isCorrect: true },
      { id: 'b', text: 'w > 7' },
      { id: 'c', text: 'w < -7' },
      { id: 'd', text: 'w ≥ 7' },
    ],
    correctAnswer: 'a',
    hint: 'Add 3w: -5w + 6 > -29. Subtract 6: -5w > -35. Divide by -5 and flip ">" to "<".',
    misconceptionFeedback:
      '-5w > -35. Divide by -5 gives w < 7.',
    correctExplanation:
      'Correct! -5w > -35 -> w < 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q9',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve for x:',
    equationDisplay: '5 - 9x ≥ 41 - 3x',
    inequalityConfig: {
      variable: 'x',
      symbol: '<=',
      value: -6,
    },
    hint: 'Add 3x: 5 - 6x ≥ 41. Subtract 5: -6x ≥ 36. Divide by -6 and flip.',
    misconceptionFeedback:
      '-6x ≥ 36. Dividing by -6 flips "≥" to "≤", giving x ≤ -6.',
    correctExplanation:
      'Correct! -6x ≥ 36 -> x ≤ -6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q10',
    tabId: 'tab-8',
    type: 'number-line-select',
    prompt: 'Solve -4z + 18 < 2z - 24 and identify the graph:',
    equationDisplay: '-4z + 18 < 2z - 24',
    numberLineData: {
      min: 2,
      max: 12,
      step: 1,
      boundary: 7,
      isClosed: false,
      direction: 'right',
      label: 'z > 7',
    },
    options: [
      { id: 'a', text: 'Open circle at 7, shaded ray pointing right (z > 7)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 7, shaded ray pointing right (z ≥ 7)' },
      { id: 'c', text: 'Open circle at 7, shaded ray pointing left (z < 7)' },
      { id: 'd', text: 'Closed circle at 7, shaded ray pointing left (z ≤ 7)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 2z: -6z + 18 < -24. Subtract 18: -6z < -42. Divide by -6: z > 7.',
    misconceptionFeedback:
      '-6z < -42 -> z > 7. Open circle at 7 pointing right.',
    correctExplanation:
      'Correct! Dividing by -6 flips "<" to ">", giving z > 7.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't8-q11',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for a:',
    equationDisplay: '4a + 23 < 10a - 25',
    inequalityConfig: {
      variable: 'a',
      symbol: '>',
      value: 8,
    },
    hint: 'Subtract 10a: -6a + 23 < -25. Subtract 23: -6a < -48. Divide by -6 and flip.',
    misconceptionFeedback:
      '-6a < -48. Dividing by -6 gives a > 8.',
    correctExplanation:
      'Correct! -6a < -48 -> a > 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q12',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'Solve for d: -7d + 11 ≥ -2d - 24',
    equationDisplay: '-7d + 11 ≥ -2d - 24',
    options: [
      { id: 'a', text: 'd ≤ 7', isCorrect: true },
      { id: 'b', text: 'd ≥ 7' },
      { id: 'c', text: 'd ≤ -7' },
      { id: 'd', text: 'd ≥ -7' },
    ],
    correctAnswer: 'a',
    hint: 'Add 2d: -5d + 11 ≥ -24. Subtract 11: -5d ≥ -35. Divide by -5 and flip.',
    misconceptionFeedback:
      '-5d ≥ -35. Dividing by -5 reverses "≥" to "≤", giving d ≤ 7.',
    correctExplanation:
      'Correct! -5d ≥ -35 -> d ≤ 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q13',
    tabId: 'tab-8',
    type: 'number-line-select',
    prompt: 'Solve 3c + 20 > 8c - 25 and choose the graph:',
    equationDisplay: '3c + 20 > 8c - 25',
    numberLineData: {
      min: 4,
      max: 14,
      step: 1,
      boundary: 9,
      isClosed: false,
      direction: 'left',
      label: 'c < 9',
    },
    options: [
      { id: 'a', text: 'Open circle at 9, shaded ray pointing left (c < 9)', isCorrect: true },
      { id: 'b', text: 'Open circle at 9, shaded ray pointing right (c > 9)' },
      { id: 'c', text: 'Closed circle at 9, shaded ray pointing left (c ≤ 9)' },
      { id: 'd', text: 'Closed circle at 9, shaded ray pointing right (c ≥ 9)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 8c: -5c + 20 > -25. Subtract 20: -5c > -45. Divide by -5: c < 9.',
    misconceptionFeedback:
      '-5c > -45. Dividing by -5 flips ">" to "<", giving c < 9. Open circle pointing left.',
    correctExplanation:
      'Correct! -5c > -45 -> c < 9 (open circle pointing left).',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q14',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve for n in the inequality:',
    equationDisplay: '-10n + 15 ≤ -3n - 41',
    inequalityConfig: {
      variable: 'n',
      symbol: '>=',
      value: 8,
    },
    hint: 'Add 3n: -7n + 15 ≤ -41. Subtract 15: -7n ≤ -56. Divide by -7 and flip.',
    misconceptionFeedback:
      '-7n ≤ -56. Dividing by -7 flips "≤" to "≥", giving n ≥ 8.',
    correctExplanation:
      'Correct! -7n ≤ -56 -> n ≥ 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q15',
    tabId: 'tab-8',
    type: 'multi-select',
    prompt: 'Select ALL inequalities that REQUIRE flipping the inequality symbol when solving for x on the left side:',
    options: [
      { id: 'opt1', text: '-4x > 20', isCorrect: true },
      { id: 'opt2', text: '3x < -12' },
      { id: 'opt3', text: '2x + 8 ≤ 6x - 4', isCorrect: true },
      { id: 'opt4', text: '-x + 3 ≥ 7', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt3', 'opt4'],
    hint: 'A sign flip is needed whenever the final division or multiplication involves a negative coefficient for x.',
    misconceptionFeedback:
      'In 3x < -12, you divide by positive 3, so NO flip. In -4x > 20 (divide by -4), 2x - 6x = -4x (divide by -4), and -x ≥ 4 (divide by -1), a sign flip is required.',
    correctExplanation:
      'Correct! Options 1, 3, and 4 all require dividing by a negative coefficient.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q16',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve for y:',
    equationDisplay: '6 - 8y > 38 - 4y',
    inequalityConfig: {
      variable: 'y',
      symbol: '<',
      value: -8,
    },
    hint: 'Add 4y: 6 - 4y > 38. Subtract 6: -4y > 32. Divide by -4 and flip.',
    misconceptionFeedback:
      '-4y > 32. Dividing by -4 reverses ">" to "<", giving y < -8.',
    correctExplanation:
      'Correct! -4y > 32 -> y < -8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q17',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'Solve for v: -9v + 13 ≤ -4v - 32',
    equationDisplay: '-9v + 13 ≤ -4v - 32',
    options: [
      { id: 'a', text: 'v ≥ 9', isCorrect: true },
      { id: 'b', text: 'v ≤ 9' },
      { id: 'c', text: 'v ≥ -9' },
      { id: 'd', text: 'v > 9' },
    ],
    correctAnswer: 'a',
    hint: 'Add 4v: -5v + 13 ≤ -32. Subtract 13: -5v ≤ -45. Divide by -5 and flip.',
    misconceptionFeedback:
      '-5v ≤ -45. Dividing by -5 flips "≤" to "≥", giving v ≥ 9.',
    correctExplanation:
      'Correct! -5v ≤ -45 -> v ≥ 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q18',
    tabId: 'tab-8',
    type: 'number-line-select',
    prompt: 'Solve 5x + 31 < 11x - 17 and select the correct graph:',
    equationDisplay: '5x + 31 < 11x - 17',
    numberLineData: {
      min: 3,
      max: 13,
      step: 1,
      boundary: 8,
      isClosed: false,
      direction: 'right',
      label: 'x > 8',
    },
    options: [
      { id: 'a', text: 'Open circle at 8, shaded ray pointing right (x > 8)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 8, shaded ray pointing right (x ≥ 8)' },
      { id: 'c', text: 'Open circle at 8, shaded ray pointing left (x < 8)' },
      { id: 'd', text: 'Closed circle at 8, shaded ray pointing left (x ≤ 8)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 11x: -6x + 31 < -17. Subtract 31: -6x < -48. Divide by -6: x > 8.',
    misconceptionFeedback:
      '-6x < -48. Dividing by -6 reverses "<" to ">", giving x > 8. Open circle pointing right.',
    correctExplanation:
      'Correct! x > 8 is graphed with an open circle at 8 pointing right.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q19',
    tabId: 'tab-8',
    type: 'inequality-entry',
    prompt: 'Solve for t:',
    equationDisplay: '-11t + 22 ≥ -3t - 50',
    inequalityConfig: {
      variable: 't',
      symbol: '<=',
      value: 9,
    },
    hint: 'Add 3t: -8t + 22 ≥ -50. Subtract 22: -8t ≥ -72. Divide by -8 and flip.',
    misconceptionFeedback:
      '-8t ≥ -72. Dividing by -8 reverses "≥" to "≤", giving t ≤ 9.',
    correctExplanation:
      'Correct! -8t ≥ -72 -> t ≤ 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't8-q20',
    tabId: 'tab-8',
    type: 'multiple-choice',
    prompt: 'Solve for z in the inequality: 2z + 33 < 8z - 27',
    equationDisplay: '2z + 33 < 8z - 27',
    options: [
      { id: 'a', text: 'z > 10', isCorrect: true },
      { id: 'b', text: 'z < 10' },
      { id: 'c', text: 'z ≥ 10' },
      { id: 'd', text: 'z > -10' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 8z: -6z + 33 < -27. Subtract 33: -6z < -60. Divide by -6: z > 10.',
    misconceptionFeedback:
      '-6z < -60. Dividing by -6 reverses "<" to ">", giving z > 10.',
    correctExplanation:
      'Correct! -6z < -60 -> z > 10.',
    teks: 'TEKS 8.8.C',
  },
];
