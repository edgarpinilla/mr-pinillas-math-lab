import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB7_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't7-q1',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for x:',
    equationDisplay: '5x + 4 > 2x + 16',
    inequalityConfig: {
      variable: 'x',
      symbol: '>',
      value: 4,
    },
    hint: 'Subtract 2x from both sides: 3x + 4 > 16. Then subtract 4.',
    misconceptionFeedback:
      '3x > 12. Divide by positive 3 (the inequality symbol does NOT flip): x > 4.',
    correctExplanation:
      'Correct! 5x - 2x = 3x -> 3x > 12 -> x > 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q2',
    tabId: 'tab-7',
    type: 'number-line-select',
    prompt: 'Solve the inequality 6x - 7 ≤ 2x + 13 and determine the correct number line representation:',
    equationDisplay: '6x - 7 ≤ 2x + 13',
    numberLineData: {
      min: 0,
      max: 10,
      step: 1,
      boundary: 5,
      isClosed: true,
      direction: 'left',
      label: 'x ≤ 5',
    },
    options: [
      { id: 'a', text: 'Closed circle at 5, shaded ray pointing left (x ≤ 5)', isCorrect: true },
      { id: 'b', text: 'Open circle at 5, shaded ray pointing left (x < 5)' },
      { id: 'c', text: 'Closed circle at 5, shaded ray pointing right (x ≥ 5)' },
      { id: 'd', text: 'Open circle at 5, shaded ray pointing right (x > 5)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 2x: 4x - 7 ≤ 13. Add 7: 4x ≤ 20. Divide by 4: x ≤ 5. Symbol "≤" means CLOSED circle pointing LEFT.',
    misconceptionFeedback:
      '4x ≤ 20 -> x ≤ 5. Because the symbol is "≤", the boundary circle is CLOSED and ray points LEFT.',
    correctExplanation:
      'Correct! x ≤ 5 has a closed circle at 5 with the ray pointing left.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q3',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'A number line shows an OPEN circle at 3 with a shaded ray pointing to the right. Which inequality matches this graph?',
    options: [
      { id: 'a', text: 'x > 3', isCorrect: true },
      { id: 'b', text: 'x ≥ 3' },
      { id: 'c', text: 'x < 3' },
      { id: 'd', text: 'x ≤ 3' },
    ],
    correctAnswer: 'a',
    hint: 'Open circle means strictly greater than (>) or less than (<). Pointing right means greater than.',
    misconceptionFeedback:
      'An open circle does not include 3 (not ≥). Ray pointing to higher numbers means x > 3.',
    correctExplanation:
      'Correct! Open circle indicates strict inequality (>), and shading to the right represents numbers greater than 3.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q4',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for n:',
    equationDisplay: '7n + 3 ≥ 3n + 19',
    inequalityConfig: {
      variable: 'n',
      symbol: '>=',
      value: 4,
    },
    hint: 'Subtract 3n from both sides, then subtract 3.',
    misconceptionFeedback:
      '4n + 3 ≥ 19 -> 4n ≥ 16. Divide by positive 4: n ≥ 4.',
    correctExplanation:
      'Correct! 7n - 3n = 4n -> 4n ≥ 16 -> n ≥ 4.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q5',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'Solve the inequality: 8x - 15 < 3x + 10',
    equationDisplay: '8x - 15 < 3x + 10',
    options: [
      { id: 'a', text: 'x < 5', isCorrect: true },
      { id: 'b', text: 'x > 5' },
      { id: 'c', text: 'x ≤ 5' },
      { id: 'd', text: 'x < 25' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 3x: 5x - 15 < 10. Add 15: 5x < 25.',
    misconceptionFeedback:
      '5x < 25. Divide by positive 5: x < 5. The inequality symbol stays <.',
    correctExplanation:
      'Correct! 5x - 15 < 10 -> 5x < 25 -> x < 5.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q6',
    tabId: 'tab-7',
    type: 'number-line-select',
    prompt: 'Solve 9y + 2 > 4y + 32 and choose the matching number line graph:',
    equationDisplay: '9y + 2 > 4y + 32',
    numberLineData: {
      min: 0,
      max: 10,
      step: 1,
      boundary: 6,
      isClosed: false,
      direction: 'right',
      label: 'y > 6',
    },
    options: [
      { id: 'a', text: 'Open circle at 6, shaded ray pointing right (y > 6)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 6, shaded ray pointing right (y ≥ 6)' },
      { id: 'c', text: 'Open circle at 6, shaded ray pointing left (y < 6)' },
      { id: 'd', text: 'Closed circle at 6, shaded ray pointing left (y ≤ 6)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 4y: 5y + 2 > 32. Subtract 2: 5y > 30. Divide by 5: y > 6.',
    misconceptionFeedback:
      '5y > 30 -> y > 6. Strict inequality ">" requires an OPEN circle pointing RIGHT.',
    correctExplanation:
      'Correct! y > 6 has an open circle at 6 with a ray extending right.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q7',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for m:',
    equationDisplay: '10m - 8 ≤ 4m + 28',
    inequalityConfig: {
      variable: 'm',
      symbol: '<=',
      value: 6,
    },
    hint: 'Subtract 4m from both sides: 6m - 8 ≤ 28. Then add 8.',
    misconceptionFeedback:
      '6m ≤ 36. Divide by 6: m ≤ 6.',
    correctExplanation:
      'Correct! 10m - 4m = 6m -> 6m ≤ 36 -> m ≤ 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q8',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'Solve the inequality for k: 4k + 25 ≥ k + 46',
    equationDisplay: '4k + 25 ≥ k + 46',
    options: [
      { id: 'a', text: 'k ≥ 5' },
      { id: 'b', text: 'k ≥ 7', isCorrect: true },
      { id: 'c', text: 'k ≤ 7' },
      { id: 'd', text: 'k > 7' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract k from both sides: 3k + 25 ≥ 46. Subtract 25: 3k ≥ 21.',
    misconceptionFeedback:
      '3k ≥ 21. Divide by 3: k ≥ 7.',
    correctExplanation:
      'Correct! 3k ≥ 21 -> k ≥ 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q9',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve for p in the inequality:',
    equationDisplay: '11p - 14 > 5p + 22',
    inequalityConfig: {
      variable: 'p',
      symbol: '>',
      value: 6,
    },
    hint: 'Subtract 5p from both sides: 6p - 14 > 22. Add 14.',
    misconceptionFeedback:
      '6p > 36. Divide by 6 gives p > 6.',
    correctExplanation:
      'Correct! 6p > 36 -> p > 6.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q10',
    tabId: 'tab-7',
    type: 'number-line-select',
    prompt: 'Solve 7w + 6 ≥ 2w + 41 and select the correct number line representation:',
    equationDisplay: '7w + 6 ≥ 2w + 41',
    numberLineData: {
      min: 0,
      max: 12,
      step: 1,
      boundary: 7,
      isClosed: true,
      direction: 'right',
      label: 'w ≥ 7',
    },
    options: [
      { id: 'a', text: 'Closed circle at 7, shaded ray pointing right (w ≥ 7)', isCorrect: true },
      { id: 'b', text: 'Open circle at 7, shaded ray pointing right (w > 7)' },
      { id: 'c', text: 'Closed circle at 7, shaded ray pointing left (w ≤ 7)' },
      { id: 'd', text: 'Open circle at 7, shaded ray pointing left (w < 7)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 2w: 5w + 6 ≥ 41. Subtract 6: 5w ≥ 35. Divide by 5: w ≥ 7. "≥" requires a CLOSED circle pointing RIGHT.',
    misconceptionFeedback:
      '5w ≥ 35 -> w ≥ 7. Greater than or equal to has a closed circle and shades right.',
    correctExplanation:
      'Correct! w ≥ 7 is graphed with a closed circle at 7 pointing right.',
    teks: 'TEKS 8.8.C',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't7-q11',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve for x in the inequality:',
    equationDisplay: '8x + 11 < 3x + 46',
    inequalityConfig: {
      variable: 'x',
      symbol: '<',
      value: 7,
    },
    hint: 'Subtract 3x from both sides: 5x + 11 < 46. Then subtract 11.',
    misconceptionFeedback:
      '5x < 35. Divide by positive 5 gives x < 7.',
    correctExplanation:
      'Correct! 5x < 35 -> x < 7.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q12',
    tabId: 'tab-7',
    type: 'number-line-select',
    prompt: 'Solve 12d - 9 ≤ 5d + 40 and select its number line graph:',
    equationDisplay: '12d - 9 ≤ 5d + 40',
    numberLineData: {
      min: 0,
      max: 12,
      step: 1,
      boundary: 7,
      isClosed: true,
      direction: 'left',
      label: 'd ≤ 7',
    },
    options: [
      { id: 'a', text: 'Closed circle at 7, shaded ray pointing left (d ≤ 7)', isCorrect: true },
      { id: 'b', text: 'Open circle at 7, shaded ray pointing left (d < 7)' },
      { id: 'c', text: 'Closed circle at 7, shaded ray pointing right (d ≥ 7)' },
      { id: 'd', text: 'Open circle at 7, shaded ray pointing right (d > 7)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 5d: 7d - 9 ≤ 40. Add 9: 7d ≤ 49. Divide by 7: d ≤ 7.',
    misconceptionFeedback:
      '7d ≤ 49 -> d ≤ 7. Closed circle at 7 pointing left.',
    correctExplanation:
      'Correct! d ≤ 7 has a closed circle at 7 pointing left.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q13',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'Solve for a: 9a + 8 > 4a + 48',
    equationDisplay: '9a + 8 > 4a + 48',
    options: [
      { id: 'a', text: 'a > 6' },
      { id: 'b', text: 'a > 8', isCorrect: true },
      { id: 'c', text: 'a < 8' },
      { id: 'd', text: 'a ≥ 8' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 4a: 5a + 8 > 48. Subtract 8: 5a > 40.',
    misconceptionFeedback:
      '5a > 40. Divide by 5 gives a > 8.',
    correctExplanation:
      'Correct! 5a > 40 -> a > 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q14',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve the inequality for b:',
    equationDisplay: '6b - 13 ≥ b + 27',
    inequalityConfig: {
      variable: 'b',
      symbol: '>=',
      value: 8,
    },
    hint: 'Subtract b from both sides: 5b - 13 ≥ 27. Then add 13.',
    misconceptionFeedback:
      '5b ≥ 40. Divide by 5 gives b ≥ 8.',
    correctExplanation:
      'Correct! 5b ≥ 40 -> b ≥ 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q15',
    tabId: 'tab-7',
    type: 'multi-select',
    prompt: 'Select ALL numbers that are solutions to the inequality 7x - 4 > 3x + 16:',
    options: [
      { id: 'opt1', text: 'x = 4' },
      { id: 'opt2', text: 'x = 5' },
      { id: 'opt3', text: 'x = 6', isCorrect: true },
      { id: 'opt4', text: 'x = 10', isCorrect: true },
    ],
    correctAnswer: ['opt3', 'opt4'],
    hint: 'Solve for x first: 4x > 20 -> x > 5. Since it is strict (>), 5 is NOT included.',
    misconceptionFeedback:
      '4x > 20 -> x > 5. Numbers must be strictly greater than 5. Thus 6 and 10 are solutions, while 4 and 5 are not.',
    correctExplanation:
      'Correct! The solution set is x > 5, so only 6 and 10 satisfy the inequality.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q16',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve for y in the inequality:',
    equationDisplay: '13y - 20 < 7y + 28',
    inequalityConfig: {
      variable: 'y',
      symbol: '<',
      value: 8,
    },
    hint: 'Subtract 7y: 6y - 20 < 28. Add 20: 6y < 48.',
    misconceptionFeedback:
      '6y < 48. Divide by 6 gives y < 8.',
    correctExplanation:
      'Correct! 6y < 48 -> y < 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q17',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'Solve for t: 10t + 5 ≥ 3t + 61',
    equationDisplay: '10t + 5 ≥ 3t + 61',
    options: [
      { id: 'a', text: 't ≥ 7' },
      { id: 'b', text: 't ≥ 8', isCorrect: true },
      { id: 'c', text: 't ≤ 8' },
      { id: 'd', text: 't > 8' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 3t: 7t + 5 ≥ 61. Subtract 5: 7t ≥ 56.',
    misconceptionFeedback:
      '7t ≥ 56. Divide by 7 gives t ≥ 8.',
    correctExplanation:
      'Correct! 7t ≥ 56 -> t ≥ 8.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q18',
    tabId: 'tab-7',
    type: 'number-line-select',
    prompt: 'Solve 8z - 5 > 2z + 49 and identify its graph:',
    equationDisplay: '8z - 5 > 2z + 49',
    numberLineData: {
      min: 4,
      max: 14,
      step: 1,
      boundary: 9,
      isClosed: false,
      direction: 'right',
      label: 'z > 9',
    },
    options: [
      { id: 'a', text: 'Open circle at 9, shaded ray pointing right (z > 9)', isCorrect: true },
      { id: 'b', text: 'Closed circle at 9, shaded ray pointing right (z ≥ 9)' },
      { id: 'c', text: 'Open circle at 9, shaded ray pointing left (z < 9)' },
      { id: 'd', text: 'Closed circle at 9, shaded ray pointing left (z ≤ 9)' },
    ],
    correctAnswer: 'a',
    hint: 'Subtract 2z: 6z - 5 > 49. Add 5: 6z > 54. Divide by 6: z > 9.',
    misconceptionFeedback:
      '6z > 54 -> z > 9. Open circle pointing right.',
    correctExplanation:
      'Correct! z > 9 has an open circle at 9 with ray pointing right.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q19',
    tabId: 'tab-7',
    type: 'inequality-entry',
    prompt: 'Solve for h:',
    equationDisplay: '14h - 18 ≤ 5h + 63',
    inequalityConfig: {
      variable: 'h',
      symbol: '<=',
      value: 9,
    },
    hint: 'Subtract 5h: 9h - 18 ≤ 63. Add 18: 9h ≤ 81.',
    misconceptionFeedback:
      '9h ≤ 81. Divide by 9 gives h ≤ 9.',
    correctExplanation:
      'Correct! 9h ≤ 81 -> h ≤ 9.',
    teks: 'TEKS 8.8.C',
  },
  {
    id: 't7-q20',
    tabId: 'tab-7',
    type: 'multiple-choice',
    prompt: 'Solve the inequality for c: 11c + 14 > 4c + 84',
    equationDisplay: '11c + 14 > 4c + 84',
    options: [
      { id: 'a', text: 'c > 8' },
      { id: 'b', text: 'c > 9' },
      { id: 'c', text: 'c > 10', isCorrect: true },
      { id: 'd', text: 'c ≥ 10' },
    ],
    correctAnswer: 'c',
    hint: 'Subtract 4c: 7c + 14 > 84. Subtract 14: 7c > 70.',
    misconceptionFeedback:
      '7c > 70. Divide by 7 gives c > 10.',
    correctExplanation:
      'Correct! 7c > 70 -> c > 10.',
    teks: 'TEKS 8.8.C',
  },
];
