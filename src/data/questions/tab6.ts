import { EquationsLabQuestion } from '../equationsPracticeData';

export const TAB6_QUESTIONS: EquationsLabQuestion[] = [
  // ROUND 1: Questions 1–10
  {
    id: 't6-q1',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Gym A charges a $30 registration fee plus $15 per month. Gym B charges a $10 registration fee plus $20 per month. After how many months (m) will the total cost at both gyms be equal?',
    equationDisplay: '15m + 30 = 20m + 10',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Set the costs equal: 15m + 30 = 20m + 10, then solve for m.',
    misconceptionFeedback:
      'Subtract 15m from both sides: 30 = 5m + 10. Subtract 10: 20 = 5m. Divide by 5 gives m = 4.',
    correctExplanation:
      'Correct! 15m + 30 = 20m + 10 -> 5m = 20 -> m = 4 months.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q2',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Taxi Company X charges a $4.00 flat fee plus $2.00 per mile. Taxi Company Y charges a $10.00 flat fee plus $1.25 per mile. For how many miles (m) will the fare be exactly the same?',
    equationDisplay: '2m + 4 = 1.25m + 10',
    options: [
      { id: 'a', text: '6 miles' },
      { id: 'b', text: '8 miles', isCorrect: true },
      { id: 'c', text: '10 miles' },
      { id: 'd', text: '12 miles' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 1.25m from both sides: 0.75m + 4 = 10.',
    misconceptionFeedback:
      '0.75m = 6. Divide 6 by 0.75 gives m = 8 miles.',
    correctExplanation:
      'Correct! 0.75m = 6 -> m = 8 miles.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q3',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Maya has $50 saved and deposits $10 each week. Liam has $110 saved and deposits $5 each week. Which equation can be used to find w, the number of weeks until Maya and Liam have the same amount of money?',
    options: [
      { id: 'a', text: '10w + 50 = 5w + 110', isCorrect: true },
      { id: 'b', text: '50w + 10 = 110w + 5' },
      { id: 'c', text: '10w - 50 = 5w - 110' },
      { id: 'd', text: '15w = 160' },
    ],
    correctAnswer: 'a',
    hint: 'Weekly deposits multiply the variable w, while initial savings are constant amounts.',
    misconceptionFeedback:
      'Maya: 10w + 50. Liam: 5w + 110. Setting them equal gives 10w + 50 = 5w + 110.',
    correctExplanation:
      'Correct! 10w + 50 = 5w + 110 accurately equates both savings balances.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't6-q4',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Tank A holds 120 gallons of water and drains at a rate of 5 gallons per minute (120 - 5t). Tank B holds 40 gallons and fills at a rate of 3 gallons per minute (40 + 3t). After how many minutes (t) will both tanks contain the same amount of water?',
    equationDisplay: '120 - 5t = 40 + 3t',
    numericAnswer: 10,
    tolerance: 0.001,
    hint: 'Add 5t to both sides: 120 = 40 + 8t. Then subtract 40.',
    misconceptionFeedback:
      '120 - 40 = 8t -> 80 = 8t. Divide by 8 gives t = 10 minutes.',
    correctExplanation:
      'Correct! 120 - 5t = 40 + 3t -> 8t = 80 -> t = 10 minutes.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q5',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Car Rental Company A charges $35 per day plus $0.20 per mile. Company B charges $20 per day plus $0.50 per mile. For a one-day rental, at how many miles (m) do both companies charge the same amount?',
    equationDisplay: '0.20m + 35 = 0.50m + 20',
    options: [
      { id: 'a', text: '40 miles' },
      { id: 'b', text: '50 miles', isCorrect: true },
      { id: 'c', text: '60 miles' },
      { id: 'd', text: '75 miles' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.20m from both sides: 35 = 0.30m + 20.',
    misconceptionFeedback:
      '15 = 0.30m. Divide 15 by 0.30 gives m = 50 miles.',
    correctExplanation:
      'Correct! 0.30m = 15 -> m = 50 miles.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q6',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Plumber A charges a $45 house-call fee plus $40 per hour. Plumber B charges a $25 house-call fee plus $45 per hour. For how many hours of work (h) will both plumbers cost the same?',
    equationDisplay: '40h + 45 = 45h + 25',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Subtract 40h from both sides: 45 = 5h + 25.',
    misconceptionFeedback:
      '45 - 25 = 5h -> 20 = 5h. Divide by 5 gives h = 4 hours.',
    correctExplanation:
      'Correct! 40h + 45 = 45h + 25 -> 5h = 20 -> h = 4 hours.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q7',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'A pine tree is 24 inches tall and grows 4 inches each year. An oak tree is 12 inches tall and grows 6 inches each year. Which equation can be used to find y, the number of years until both trees are the exact same height?',
    options: [
      { id: 'a', text: '4y + 24 = 6y + 12', isCorrect: true },
      { id: 'b', text: '24y + 4 = 12y + 6' },
      { id: 'c', text: '4y - 24 = 6y - 12' },
      { id: 'd', text: '10y = 36' },
    ],
    correctAnswer: 'a',
    hint: 'Annual growth rates multiply the year variable y, added to starting heights.',
    misconceptionFeedback:
      'Pine: 4y + 24. Oak: 6y + 12. Setting their heights equal gives 4y + 24 = 6y + 12.',
    correctExplanation:
      'Correct! 4y + 24 = 6y + 12 models the equal heights over y years.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't6-q8',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Club Alpha charges a $15 membership fee plus $6 per fitness class. Club Beta charges no membership fee but charges $9 per fitness class. How many fitness classes (c) make the total cost at both clubs equal?',
    equationDisplay: '6c + 15 = 9c',
    numericAnswer: 5,
    tolerance: 0.001,
    hint: 'Subtract 6c from both sides: 15 = 3c.',
    misconceptionFeedback:
      '15 = 3c. Divide 15 by 3 gives c = 5 classes.',
    correctExplanation:
      'Correct! 6c + 15 = 9c -> 3c = 15 -> c = 5 classes.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q9',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Cell Phone Plan P costs $40 per month plus $0.05 per text message. Plan Q costs $30 per month plus $0.10 per text message. At how many text messages (t) will both plans cost the same?',
    equationDisplay: '0.05t + 40 = 0.10t + 30',
    options: [
      { id: 'a', text: '150 texts' },
      { id: 'b', text: '200 texts', isCorrect: true },
      { id: 'c', text: '250 texts' },
      { id: 'd', text: '300 texts' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 0.05t from both sides: 40 = 0.05t + 30.',
    misconceptionFeedback:
      '10 = 0.05t. Divide 10 by 0.05 gives t = 200 texts.',
    correctExplanation:
      'Correct! 0.05t = 10 -> t = 200 texts.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q10',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Movie Service A charges $12 per month plus $2 per movie download. Movie Service B charges a flat $24 per month with all downloads included. For how many downloads (d) will Service A cost the same as Service B?',
    equationDisplay: '2d + 12 = 24',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 12 from both sides: 2d = 12. Then divide by 2.',
    misconceptionFeedback:
      '2d = 12. Divide by 2 gives d = 6 downloads.',
    correctExplanation:
      'Correct! 2d + 12 = 24 -> 2d = 12 -> d = 6 downloads.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },

  // ROUND 2: Questions 11–20
  {
    id: 't6-q11',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Catering Service 1 charges $18 per person plus a $100 setup fee. Catering Service 2 charges $22 per person plus a $40 setup fee. For how many guests (g) will both catering services cost the same?',
    equationDisplay: '18g + 100 = 22g + 40',
    options: [
      { id: 'a', text: '12 guests' },
      { id: 'b', text: '15 guests', isCorrect: true },
      { id: 'c', text: '18 guests' },
      { id: 'd', text: '20 guests' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 18g from both sides: 100 = 4g + 40.',
    misconceptionFeedback:
      '60 = 4g. Divide 60 by 4 gives g = 15 guests.',
    correctExplanation:
      'Correct! 18g + 100 = 22g + 40 -> 4g = 60 -> g = 15 guests.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q12',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Electrician X charges a $60 travel fee plus $50 per hour. Electrician Y charges a $30 travel fee plus $55 per hour. For how many hours (h) will both electricians charge the same total?',
    equationDisplay: '50h + 60 = 55h + 30',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 50h from both sides: 60 = 5h + 30.',
    misconceptionFeedback:
      '30 = 5h. Divide 30 by 5 gives h = 6 hours.',
    correctExplanation:
      'Correct! 50h + 60 = 55h + 30 -> 5h = 30 -> h = 6 hours.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q13',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Print Shop 1 charges $25 for plate setup plus $0.15 per color brochure. Print Shop 2 charges $10 for setup plus $0.20 per color brochure. Which equation models finding b, the number of brochures where both print shops cost the same?',
    options: [
      { id: 'a', text: '0.15b + 25 = 0.20b + 10', isCorrect: true },
      { id: 'b', text: '25b + 0.15 = 10b + 0.20' },
      { id: 'c', text: '0.15b - 25 = 0.20b - 10' },
      { id: 'd', text: '0.35b = 35' },
    ],
    correctAnswer: 'a',
    hint: 'Multiply the per-brochure cost by b, and add the fixed setup fee.',
    misconceptionFeedback:
      'Shop 1: 0.15b + 25. Shop 2: 0.20b + 10. Equating them gives 0.15b + 25 = 0.20b + 10.',
    correctExplanation:
      'Correct! 0.15b + 25 = 0.20b + 10 accurately models the equal cost condition.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't6-q14',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'At what number of brochures (b) will Print Shop 1 and Print Shop 2 from the previous problem charge the exact same total price?',
    equationDisplay: '0.15b + 25 = 0.20b + 10',
    numericAnswer: 300,
    tolerance: 0.001,
    hint: 'Subtract 0.15b from both sides: 25 = 0.05b + 10. Subtract 10: 15 = 0.05b.',
    misconceptionFeedback:
      '15 = 0.05b. Divide 15 by 0.05 gives b = 300 brochures.',
    correctExplanation:
      'Correct! 0.05b = 15 -> b = 300 brochures.',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't6-q15',
    tabId: 'tab-6',
    type: 'multi-select',
    prompt: 'Select ALL real-world situations that can be modeled by the equation 8x + 20 = 12x + 4:',
    options: [
      { id: 'opt1', text: 'Store A charges $8 per shirt plus a $20 member fee; Store B charges $12 per shirt plus a $4 fee', isCorrect: true },
      { id: 'opt2', text: 'Candle 1 is 20 cm tall and burns 8 cm/hr; Candle 2 is 4 cm tall and burns 12 cm/hr' },
      { id: 'opt3', text: 'Tutor A charges $20 registration plus $8/hr; Tutor B charges $4 registration plus $12/hr', isCorrect: true },
      { id: 'opt4', text: 'A pool starts with 20 gallons and fills at 8 gal/min; another pool starts with 4 gallons and fills at 12 gal/min', isCorrect: true },
    ],
    correctAnswer: ['opt1', 'opt3', 'opt4'],
    hint: 'Identify situations where an initial positive amount has an increasing rate of 8x and 12x.',
    misconceptionFeedback:
      'Burning candles represent decreasing amounts (negative slope), not positive 8x and 12x. Options 1, 3, and 4 all model positive linear accumulation.',
    correctExplanation:
      'Correct! Options 1, 3, and 4 correctly pair the constant fees with the per-unit rates.',
    teks: 'TEKS 8.8.A',
  },
  {
    id: 't6-q16',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Solve for x in the equation 8x + 20 = 12x + 4 to find the break-even quantity:',
    equationDisplay: '8x + 20 = 12x + 4',
    numericAnswer: 4,
    tolerance: 0.001,
    hint: 'Subtract 8x from both sides: 20 = 4x + 4. Then subtract 4.',
    misconceptionFeedback:
      '16 = 4x. Divide 16 by 4 gives x = 4.',
    correctExplanation:
      'Correct! 4x = 16 -> x = 4.',
    teks: 'TEKS 8.8.B',
  },
  {
    id: 't6-q17',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Dog Daycare P charges $28 per day plus a one-time $50 health screening fee. Daycare Q charges $33 per day plus a $20 screening fee. For how many days (d) will the total bill be equal?',
    equationDisplay: '28d + 50 = 33d + 20',
    options: [
      { id: 'a', text: '5 days' },
      { id: 'b', text: '6 days', isCorrect: true },
      { id: 'c', text: '7 days' },
      { id: 'd', text: '8 days' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 28d from both sides: 50 = 5d + 20.',
    misconceptionFeedback:
      '30 = 5d. Divide 30 by 5 gives d = 6 days.',
    correctExplanation:
      'Correct! 28d + 50 = 33d + 20 -> 5d = 30 -> d = 6 days.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q18',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Two hot air balloons descend toward the ground. Balloon 1 starts at 600 feet and descends at 25 ft/min (600 - 25m). Balloon 2 starts at 450 feet and descends at 10 ft/min (450 - 10m). In how many minutes (m) will both balloons be at the exact same altitude?',
    equationDisplay: '600 - 25m = 450 - 10m',
    numericAnswer: 10,
    tolerance: 0.001,
    hint: 'Add 25m to both sides: 600 = 450 + 15m. Then subtract 450.',
    misconceptionFeedback:
      '150 = 15m. Divide 150 by 15 gives m = 10 minutes.',
    correctExplanation:
      'Correct! 15m = 150 -> m = 10 minutes.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q19',
    tabId: 'tab-6',
    type: 'multiple-choice',
    prompt: 'Lawn Service 1 charges $30 per lawn mowing plus a seasonal contract fee of $80. Lawn Service 2 charges $40 per mowing with no contract fee. For how many lawn mowings (m) are both services the same total cost?',
    equationDisplay: '30m + 80 = 40m',
    options: [
      { id: 'a', text: '6 mowings' },
      { id: 'b', text: '8 mowings', isCorrect: true },
      { id: 'c', text: '10 mowings' },
      { id: 'd', text: '12 mowings' },
    ],
    correctAnswer: 'b',
    hint: 'Subtract 30m from both sides: 80 = 10m.',
    misconceptionFeedback:
      '80 = 10m. Divide 80 by 10 gives m = 8 mowings.',
    correctExplanation:
      'Correct! 30m + 80 = 40m -> 10m = 80 -> m = 8 mowings.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
  {
    id: 't6-q20',
    tabId: 'tab-6',
    type: 'numeric-input',
    prompt: 'Storage Facility A charges $75 per month plus a $50 administrative fee. Facility B charges $65 per month plus a $110 administrative fee. After how many months (m) will both facilities cost the exact same total amount?',
    equationDisplay: '75m + 50 = 65m + 110',
    numericAnswer: 6,
    tolerance: 0.001,
    hint: 'Subtract 65m from both sides: 10m + 50 = 110. Then subtract 50.',
    misconceptionFeedback:
      '10m = 60. Divide 60 by 10 gives m = 6 months.',
    correctExplanation:
      'Correct! 75m + 50 = 65m + 110 -> 10m = 60 -> m = 6 months.',
    teks: 'TEKS 8.8.A / 8.8.B',
  },
];
