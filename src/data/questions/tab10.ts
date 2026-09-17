import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB10_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't10-q1',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Carlos has $80 saved and spends $6 per day. Elena has $20 saved and earns $4 per day. Which inequality shows when Carlos has MORE money than Elena after d days?',
    options: [
      { id: 'a', text: '80 - 6d > 20 + 4d', isCorrect: true },
      { id: 'b', text: '80 - 6d < 20 + 4d' },
      { id: 'c', text: '6d - 80 > 4d + 20' },
      { id: 'd', text: '80 + 6d > 20 - 4d' },
    ],
    correctAnswer: 'a',
    hint: 'Carlos spends money: 80 - 6d. Elena earns money: 20 + 4d. "More than" uses the > symbol.',
    misconceptionFeedback:
      'Carlos is spending (subtract 6d from 80), and Elena is earning (add 4d to 20). "Carlos has more" means 80 - 6d > 20 + 4d.',
    correctExplanation:
      'Correct! 80 - 6d > 20 + 4d represents Carlos having a strictly greater balance than Elena.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q2',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Solve the inequality from Question 1 to find the number of days Carlos has more money than Elena:',
    equationDisplay: '80 - 6d > 20 + 4d',
    inequalityConfig: {
      variable: 'd',
      symbol: '<',
      value: 6,
    },
    hint: 'Subtract 4d from both sides: 80 - 10d > 20. Subtract 80: -10d > -60. Remember to flip when dividing by -10.',
    misconceptionFeedback:
      '-10d > -60. Dividing by -10 reverses the inequality sign, giving d < 6 days.',
    correctExplanation:
      'Correct! -10d > -60 -> d < 6 (Carlos has more money for fewer than 6 days).',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't10-q3',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Carnival Pass A costs $25 admission plus $1.50 per ride. Pass B costs $10 admission plus $2.75 per ride. For what number of rides (r) is Pass A CHEAPER than Pass B?',
    equationDisplay: '1.50r + 25 < 2.75r + 10',
    options: [
      { id: 'a', text: 'r < 12 rides' },
      { id: 'b', text: 'r > 12 rides', isCorrect: true },
      { id: 'c', text: 'r ≤ 12 rides' },
      { id: 'd', text: 'r > 15 rides' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 1.50r from both sides: 25 < 1.25r + 10. Subtract 10: 15 < 1.25r.',
    misconceptionFeedback:
      '15 < 1.25r. Dividing by 1.25 gives 12 < r, which means r > 12 rides.',
    correctExplanation:
      'Correct! 15 < 1.25r -> r > 12 rides.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q4',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Music Service 1 charges $15 per month plus $0.50 per song download. Service 2 charges a flat $25 per month with unlimited downloads. For what number of downloads (s) is Service 1 strictly greater than (more expensive than) Service 2?',
    equationDisplay: '0.50s + 15 > 25',
    inequalityConfig: {
      variable: 's',
      symbol: '>',
      value: 20,
    },
    hint: 'Subtract 15 from both sides: 0.50s > 10. Then divide by 0.50.',
    misconceptionFeedback:
      '0.50s > 10. Divide by 0.50 gives s > 20 songs.',
    correctExplanation:
      'Correct! 0.50s > 10 -> s > 20 songs.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q5',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Warehouse 1 has 500 boxes and ships out 20 boxes each hour (500 - 20h). Warehouse 2 has 200 boxes and receives 10 boxes each hour (200 + 10h). Which inequality models when Warehouse 1 has at least as many boxes as Warehouse 2?',
    options: [
      { id: 'a', text: '500 - 20h ≥ 200 + 10h', isCorrect: true },
      { id: 'b', text: '500 - 20h ≤ 200 + 10h' },
      { id: 'c', text: '500 + 20h ≥ 200 - 10h' },
      { id: 'd', text: '20h - 500 ≥ 10h - 200' },
    ],
    correctAnswer: 'a',
    hint: '"At least as many" translates to the greater than or equal to symbol (≥).',
    misconceptionFeedback:
      'Warehouse 1 is 500 - 20h, Warehouse 2 is 200 + 10h. "At least" means ≥.',
    correctExplanation:
      'Correct! 500 - 20h ≥ 200 + 10h matches the condition "at least as many".',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't10-q6',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Solve the inequality from the previous question to find the maximum number of hours (h) Warehouse 1 has at least as many boxes as Warehouse 2:',
    equationDisplay: '500 - 20h ≥ 200 + 10h',
    inequalityConfig: {
      variable: 'h',
      symbol: '<=',
      value: 10,
    },
    hint: 'Add 20h to both sides: 500 ≥ 200 + 30h. Subtract 200: 300 ≥ 30h. Divide by 30: 10 ≥ h (h ≤ 10).',
    misconceptionFeedback:
      '300 ≥ 30h -> h ≤ 10 hours.',
    correctExplanation:
      'Correct! 30h ≤ 300 -> h ≤ 10 hours.',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't10-q7',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Company A rents a bounce house for $50 plus $15 per hour. Company B rents for $20 plus $20 per hour. For how many hours (h) is Company A LESS EXPENSIVE than Company B?',
    equationDisplay: '15h + 50 < 20h + 20',
    options: [
      { id: 'a', text: 'h < 6 hours' },
      { id: 'b', text: 'h > 6 hours', isCorrect: true },
      { id: 'c', text: 'h ≤ 6 hours' },
      { id: 'd', text: 'h > 8 hours' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 15h: 50 < 5h + 20. Subtract 20: 30 < 5h. Divide by 5: 6 < h, meaning h > 6.',
    misconceptionFeedback:
      '30 < 5h -> 6 < h -> h > 6 hours. For rentals longer than 6 hours, Company A is cheaper.',
    correctExplanation:
      'Correct! 5h > 30 -> h > 6 hours.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q8',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'A swimming pool currently holds 18,000 gallons of water and is filling at 400 gallons per hour (18,000 + 400h). A larger pool holds 14,000 gallons and fills at 800 gallons per hour (14,000 + 800h). In how many hours (h) will the second pool hold MORE water than the first pool?',
    equationDisplay: '800h + 14000 > 400h + 18000',
    inequalityConfig: {
      variable: 'h',
      symbol: '>',
      value: 10,
    },
    hint: 'Subtract 400h: 400h + 14,000 > 18,000. Subtract 14,000: 400h > 4,000.',
    misconceptionFeedback:
      '400h > 4000. Divide by 400 gives h > 10 hours.',
    correctExplanation:
      'Correct! 400h > 4,000 -> h > 10 hours.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q9',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'A cellular carrier offers Plan 1 for $35/month with $0.10 per minute of international calling. Plan 2 costs $20/month with $0.25 per minute. Which inequality finds m, the minutes where Plan 1 is cheaper (costs less) than Plan 2?',
    options: [
      { id: 'a', text: '0.10m + 35 < 0.25m + 20', isCorrect: true },
      { id: 'b', text: '0.10m + 35 > 0.25m + 20' },
      { id: 'c', text: '35m + 0.10 < 20m + 0.25' },
      { id: 'd', text: '0.35m < 55' },
    ],
    correctAnswer: 'a',
    hint: 'Total cost = variable rate × m + monthly fee. "Cheaper than" means strictly less than (<).',
    misconceptionFeedback:
      'Plan 1 is 0.10m + 35. Plan 2 is 0.25m + 20. "Plan 1 costs less" is 0.10m + 35 < 0.25m + 20.',
    correctExplanation:
      'Correct! 0.10m + 35 < 0.25m + 20 accurately models the lower cost threshold.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't10-q10',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Solve the cell plan inequality from the previous problem to determine when Plan 1 is cheaper than Plan 2:',
    equationDisplay: '0.10m + 35 < 0.25m + 20',
    inequalityConfig: {
      variable: 'm',
      symbol: '>',
      value: 100,
    },
    hint: 'Subtract 0.10m: 35 < 0.15m + 20. Subtract 20: 15 < 0.15m. Divide 15 by 0.15: 100 < m (m > 100).',
    misconceptionFeedback:
      '15 < 0.15m -> m > 100 minutes.',
    correctExplanation:
      'Correct! 0.15m > 15 -> m > 100 minutes.',
    teks: 'TEKS 8.8.B',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't10-q11',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Bowling Alley Alpha charges $6 for shoe rental and $4.50 per game. Alley Beta charges $2 for shoes and $5.50 per game. For what number of games (g) is Alley Alpha cheaper than Alley Beta?',
    equationDisplay: '4.50g + 6 < 5.50g + 2',
    options: [
      { id: 'a', text: 'g < 4 games' },
      { id: 'b', text: 'g > 4 games', isCorrect: true },
      { id: 'c', text: 'g ≤ 4 games' },
      { id: 'd', text: 'g > 5 games' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 4.50g: 6 < 1.00g + 2. Subtract 2: 4 < g, so g > 4.',
    misconceptionFeedback:
      '4 < 1.00g means g > 4 games.',
    correctExplanation:
      'Correct! 1.00g > 4 -> g > 4 games.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q12',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'T-Shirt Company 1 charges a $50 screen setup fee plus $8 per shirt. Company 2 charges a $20 setup fee plus $11 per shirt. For how many shirts (s) is Company 1 the better deal (costs strictly less)?',
    equationDisplay: '8s + 50 < 11s + 20',
    inequalityConfig: {
      variable: 's',
      symbol: '>',
      value: 10,
    },
    hint: 'Subtract 8s: 50 < 3s + 20. Subtract 20: 30 < 3s. Divide by 3: 10 < s (s > 10).',
    misconceptionFeedback:
      '30 < 3s -> s > 10 shirts.',
    correctExplanation:
      'Correct! 3s > 30 -> s > 10 shirts.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q13',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Two candles are lit at the same time. Candle A is 30 cm tall and burns down at 2 cm per hour (30 - 2h). Candle B is 20 cm tall and burns at 1 cm per hour (20 - 1h). Which inequality models when Candle A is taller than Candle B?',
    options: [
      { id: 'a', text: '30 - 2h > 20 - 1h', isCorrect: true },
      { id: 'b', text: '30 - 2h < 20 - 1h' },
      { id: 'c', text: '2h - 30 > 1h - 20' },
      { id: 'd', text: '30 + 2h > 20 + 1h' },
    ],
    correctAnswer: 'a',
    hint: 'Heights decrease as candles burn (negative rate). "Taller than" uses >.',
    misconceptionFeedback:
      'Candle A height is 30 - 2h; Candle B height is 20 - h. A > B is 30 - 2h > 20 - h.',
    correctExplanation:
      'Correct! 30 - 2h > 20 - 1h models Candle A remaining taller.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't10-q14',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Solve the candle inequality to find for how many hours (h) Candle A remains taller than Candle B:',
    equationDisplay: '30 - 2h > 20 - 1h',
    inequalityConfig: {
      variable: 'h',
      symbol: '<',
      value: 10,
    },
    hint: 'Add 2h to both sides: 30 > 20 + h. Subtract 20: 10 > h (h < 10).',
    misconceptionFeedback:
      '30 - 20 > 2h - h -> 10 > h, which means h < 10 hours.',
    correctExplanation:
      'Correct! h < 10 hours.',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't10-q15',
    tabId: 'tab-10',
    type: 'multi-select',
    prompt: 'Select ALL real-world problems that can be represented by the inequality 12x + 40 ≤ 18x + 10:',
    options: [
      { id: 'opt1', text: 'Service 1 ($12/hr + $40 fee) costs no more than Service 2 ($18/hr + $10 fee)', isCorrect: true },
      { id: 'opt2', text: 'Store A costs strictly more than Store B' },
      { id: 'opt3', text: 'Weight in bin A (12 lb/min + 40 lb) is at most the weight in bin B (18 lb/min + 10 lb)', isCorrect: true },
      { id: 'opt4', text: 'Distance traveled by car A (12t + 40) is less than or equal to car B (18t + 10)', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt3', 'opt4'],
    hint: 'The symbol "≤" represents "no more than", "at most", or "less than or equal to".',
    misconceptionFeedback:
      '"Strictly more than" uses >, not ≤. Options 1 ("no more than"), 3 ("at most"), and 4 ("less than or equal to") all correctly correspond to ≤.',
    correctExplanation:
      'Correct! Options 1, 3, and 4 all faithfully interpret the "≤" condition.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't10-q16',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Solve the inequality 12x + 40 ≤ 18x + 10 for x:',
    equationDisplay: '12x + 40 ≤ 18x + 10',
    inequalityConfig: {
      variable: 'x',
      symbol: '>=',
      value: 5,
    },
    hint: 'Subtract 12x: 40 ≤ 6x + 10. Subtract 10: 30 ≤ 6x. Divide by 6: 5 ≤ x (x ≥ 5).',
    misconceptionFeedback:
      '30 ≤ 6x -> 6x ≥ 30 -> x ≥ 5.',
    correctExplanation:
      'Correct! 6x ≥ 30 -> x ≥ 5.',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't10-q17',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Park Pass A costs $60 upfront plus $4 per visit. Pass B costs $20 upfront plus $9 per visit. For what number of visits (v) is Pass A CHEAPER than Pass B?',
    equationDisplay: '4v + 60 < 9v + 20',
    options: [
      { id: 'a', text: 'v < 8 visits' },
      { id: 'b', text: 'v > 8 visits', isCorrect: true },
      { id: 'c', text: 'v ≥ 8 visits' },
      { id: 'd', text: 'v > 10 visits' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 4v: 60 < 5v + 20. Subtract 20: 40 < 5v. Divide by 5: 8 < v (v > 8).',
    misconceptionFeedback:
      '40 < 5v -> 5v > 40 -> v > 8 visits.',
    correctExplanation:
      'Correct! 5v > 40 -> v > 8 visits.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q18',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'A hiker starts at elevation 1,200 meters and descends at 40 m/min (1200 - 40t). A second hiker starts at 800 meters and descends at 15 m/min (800 - 15t). After how many minutes (t) will the first hiker be lower in elevation than the second hiker (1200 - 40t < 800 - 15t)?',
    equationDisplay: '1200 - 40t < 800 - 15t',
    inequalityConfig: {
      variable: 't',
      symbol: '>',
      value: 16,
    },
    hint: 'Add 40t to both sides: 1200 < 800 + 25t. Subtract 800: 400 < 25t. Divide by 25: 16 < t (t > 16).',
    misconceptionFeedback:
      '400 < 25t -> 25t > 400 -> t > 16 minutes.',
    correctExplanation:
      'Correct! 25t > 400 -> t > 16 minutes.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q19',
    tabId: 'tab-10',
    type: 'multiple-choice',
    prompt: 'Photographer 1 charges $120 sitting fee plus $15 per print. Photographer 2 charges $50 sitting fee plus $25 per print. For how many prints (p) is Photographer 1 strictly less expensive than Photographer 2?',
    equationDisplay: '15p + 120 < 25p + 50',
    options: [
      { id: 'a', text: 'p < 7 prints' },
      { id: 'b', text: 'p > 7 prints', isCorrect: true },
      { id: 'c', text: 'p ≥ 7 prints' },
      { id: 'd', text: 'p > 10 prints' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 15p: 120 < 10p + 50. Subtract 50: 70 < 10p. Divide by 10: 7 < p (p > 7).',
    misconceptionFeedback:
      '70 < 10p -> 10p > 70 -> p > 7 prints.',
    correctExplanation:
      'Correct! 10p > 70 -> p > 7 prints.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't10-q20',
    tabId: 'tab-10',
    type: 'inequality-entry',
    prompt: 'Two rival streaming services: StreamFast costs $8/month plus $1.50 per live sports stream. PlayMax costs $20/month with all live sports streams included. For what number of live sports streams (s) is StreamFast MORE EXPENSIVE than PlayMax (1.50s + 8 > 20)?',
    equationDisplay: '1.50s + 8 > 20',
    inequalityConfig: {
      variable: 's',
      symbol: '>',
      value: 8,
    },
    hint: 'Subtract 8 from both sides: 1.50s > 12. Divide 12 by 1.50.',
    misconceptionFeedback:
      '1.50s > 12. Divide by 1.50 gives s > 8 streams.',
    correctExplanation:
      'Correct! 1.50s > 12 -> s > 8 streams.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
];
