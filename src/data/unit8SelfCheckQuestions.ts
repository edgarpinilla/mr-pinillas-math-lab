export type Unit8QuestionCategory =
  | 'identifying-functions'
  | 'describing-functions'
  | 'comparing-functions';

export interface Unit8SelfCheckQuestion {
  id: string;
  round: 1 | 2 | 3;
  questionInRound: 1 | 2 | 3 | 4 | 5 | 6;
  overallNumber: number; // 1..18
  section:
    | 'Section A: Identifying Functions'
    | 'Section B: Describing Functions'
    | 'Section C: Comparing Functions';
  category: Unit8QuestionCategory;
  teks: string;
  representationType: 'ordered-pairs' | 'table' | 'mapping' | 'graph' | 'equation' | 'verbal';
  prompt: string;
  context?: string;
  orderedPairs?: [number, number][];
  tableData?: {
    headers: [string, string];
    rows: [number | string, number | string][];
  };
  mappingData?: {
    inputs: number[];
    outputs: number[];
    arrows: [number, number][]; // [fromInput, toOutput]
  };
  graphData?: {
    title?: string;
    type: 'points' | 'line' | 'curve' | 'vertical-line-test';
    points?: { x: number; y: number; label?: string }[];
    equation?: string;
    verticalLineX?: number;
    intersectsCount?: number;
  };
  comparisonData?: {
    functionA: {
      name: string;
      representation: 'table' | 'equation' | 'graph' | 'verbal';
      details: string;
      slope: number;
      yIntercept: number;
    };
    functionB: {
      name: string;
      representation: 'table' | 'equation' | 'graph' | 'verbal';
      details: string;
      slope: number;
      yIntercept: number;
    };
  };
  vltGraphOptions?: {
    id: 'A' | 'B' | 'C' | 'D';
    label: string;
    ariaLabel: string;
    type: 'circle' | 'segment' | 'parabola' | 'ellipse';
  }[];
  carAGraphData?: {
    xMax: number;
    yMax: number;
    points: { x: number; y: number; label: string }[];
  };
  tableOptions?: {
    id: 'A' | 'B' | 'C' | 'D';
    label: string;
    headers: [string, string];
    rows: [number | string, number | string][];
  }[];
  options: string[];
  correctIndex: number;
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export const UNIT_8_SELF_CHECK_QUESTIONS: Unit8SelfCheckQuestion[] = [
  // ===========================================================================
  // ROUND 1 (Questions 1–6)
  // Q1: Identifying Functions (Ordered Pairs)
  // Q2: Identifying Functions (Table with identical repeated pair)
  // Q3: Describing Functions (Linear vs Nonlinear from rate of change)
  // Q4: Describing Functions (Proportional y=kx vs Nonproportional y=mx+b)
  // Q5: Comparing Functions (Table vs Equation - Rate of Change)
  // Q6: Comparing Functions (Comparing outputs at a given input x)
  // ===========================================================================
  {
    id: 'u8-sc-q01',
    round: 1,
    questionInRound: 1,
    overallNumber: 1,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'ordered-pairs',
    prompt:
      'Which set of ordered pairs represents y as a function of x?',
    options: [
      '{(−2, 5), (0, 3), (2, 7), (−2, 9)}',
      '{(1, 4), (3, 8), (5, 4), (7, 10)}',
      '{(4, 2), (4, 6), (6, 8), (8, 10)}',
      '{(−3, 1), (−1, 0), (−1, 4), (2, 6)}',
    ],
    correctIndex: 1,
    correctAnswer: '{(1, 4), (3, 8), (5, 4), (7, 10)}',
    hint:
      'Check each set for repeating x-values. If any single input is paired with two or more different outputs, that relation cannot be a function. Note that different inputs sharing an identical output is completely allowed.',
    explanation:
      'In a function, every input (x) must be assigned to exactly one output (y). In {(1, 4), (3, 8), (5, 4), (7, 10)}, each input {1, 3, 5, 7} is unique and pairs with exactly one output. Different inputs sharing the output 4 does NOT violate the definition. In the other three sets, an x-value repeats with conflicting outputs: −2 pairs with 5 and 9; 4 pairs with 2 and 6; −1 pairs with 0 and 4.',
  },
  {
    id: 'u8-sc-q02',
    round: 1,
    questionInRound: 2,
    overallNumber: 2,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'table',
    prompt:
      'A student examines the table below. Does this table represent a function, and why?',
    tableData: {
      headers: ['Input (x)', 'Output (y)'],
      rows: [
        [2, 6],
        [4, 12],
        [2, 6],
        [5, 15],
      ],
    },
    options: [
      'No, because the input value 2 appears twice in the table.',
      'Yes, because both rows with input 2 assign the exact same output (6), so each input has exactly one output.',
      'No, because a function cannot contain the same ordered pair more than once.',
      'Yes, only because the outputs increase from top to bottom.',
    ],
    correctIndex: 1,
    correctAnswer:
      'Yes, because both rows with input 2 assign the exact same output (6), so each input has exactly one output.',
    hint:
      'Compare the outputs assigned to repeated inputs. Does any single input have two different outputs?',
    explanation:
      'Repeating an identical ordered pair (2, 6) simply re-states the same coordinate point on a graph or relation. Input 2 is still paired with exactly one output value (6). A relation only fails to be a function if an input is assigned to two or more DIFFERENT outputs.',
  },
  {
    id: 'u8-sc-q03',
    round: 1,
    questionInRound: 3,
    overallNumber: 3,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.5G, 8.5H',
    representationType: 'table',
    prompt:
      'Determine whether the relationship shown in the table represents a linear or nonlinear function by examining its rate of change (Δy / Δx).',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [1, 5],
        [2, 8],
        [4, 14],
        [7, 23],
      ],
    },
    options: [
      'Linear function, because the rate of change is a constant 3 for every interval.',
      'Nonlinear function, because the x-values do not increase by 1 each time.',
      'Linear function, because the initial value at x = 0 is equal to 0.',
      'Nonlinear function, because the rate of change changes between intervals.',
    ],
    correctIndex: 0,
    correctAnswer:
      'Linear function, because the rate of change is a constant 3 for every interval.',
    hint:
      'Calculate the change in y divided by the change in x for every row step: (8 − 5)/(2 − 1), (14 − 8)/(4 − 2), and (23 − 14)/(7 − 4).',
    explanation:
      'Calculate Δy / Δx between consecutive rows:\n• From (1, 5) to (2, 8): Δy/Δx = (8 − 5)/(2 − 1) = 3/1 = 3\n• From (2, 8) to (4, 14): Δy/Δx = (14 − 8)/(4 − 2) = 6/2 = 3\n• From (4, 14) to (7, 23): Δy/Δx = (23 − 14)/(7 − 4) = 9/3 = 3\nBecause the rate of change is constant (m = 3), this relationship represents a linear function.',
  },
  {
    id: 'u8-sc-q04',
    round: 1,
    questionInRound: 4,
    overallNumber: 4,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.5H',
    representationType: 'equation',
    prompt:
      'Which statement correctly describes and classifies the linear relationship represented by the equation y = 4x + 6?',
    options: [
      'It is proportional because it has a positive constant rate of change of 4.',
      'It is nonproportional because its initial value (y-intercept) is 6, so it does not pass through the origin (0, 0).',
      'It is a nonlinear function because it contains a constant term (+6).',
      'It is proportional because substituting x = 0 produces y = 0.',
    ],
    correctIndex: 1,
    correctAnswer:
      'It is nonproportional because its initial value (y-intercept) is 6, so it does not pass through the origin (0, 0).',
    hint:
      'What happens when x = 0? Proportional relationships must have the form y = kx and pass through (0, 0).',
    explanation:
      'The equation y = 4x + 6 is linear because it has a constant rate of change (m = 4). However, its y-intercept is b = 6. When x = 0, y = 4(0) + 6 = 6. Because the graph crosses the y-axis at (0, 6) rather than the origin (0, 0), it is a nonproportional linear relationship.',
  },
  {
    id: 'u8-sc-q05',
    round: 1,
    questionInRound: 5,
    overallNumber: 5,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A/B',
    representationType: 'table',
    prompt:
      'Function 1 is represented by the table below, and Function 2 is represented by the equation y = 5x + 2. Which function has the greater rate of change?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [0, 10],
        [2, 18],
        [4, 26],
        [6, 34],
      ],
    },
    options: [
      'Function 1, because its rate of change is 8.',
      'Function 2, because its rate of change is 5 and Function 1 has a rate of change of 4.',
      'Both functions have the same rate of change.',
      'Function 1, because its initial value is 10.',
    ],
    correctIndex: 1,
    correctAnswer:
      'Function 2, because its rate of change is 5 and Function 1 has a rate of change of 4.',
    hint:
      'Find the slope of Function 1 using Δy / Δx = (18 − 10)/(2 − 0). Then compare it with the slope m in y = 5x + 2.',
    explanation:
      'For Function 1 (table): rate of change m₁ = (18 − 10)/(2 − 0) = 8/2 = 4.\nFor Function 2 (equation y = 5x + 2): rate of change m₂ = 5.\nComparing the two rates: 5 > 4. Therefore, Function 2 has the greater rate of change.',
  },
  {
    id: 'u8-sc-q06',
    round: 1,
    questionInRound: 6,
    overallNumber: 6,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A',
    representationType: 'verbal',
    prompt:
      'Two mobile phone repair shops charge for labor. TechCare charges a $25 diagnostic fee plus $20 per hour. PhoneDoc’s total charge is modeled by C = 28h + 5, where h is the number of hours. What is the total cost for a 3-hour repair at each shop, and which shop is less expensive?',
    options: [
      'TechCare costs $85 and PhoneDoc costs $89; TechCare is less expensive by $4.',
      'TechCare costs $75 and PhoneDoc costs $84; TechCare is less expensive by $9.',
      'TechCare costs $85 and PhoneDoc costs $85; both shops cost the exact same amount.',
      'PhoneDoc costs $79 and TechCare costs $85; PhoneDoc is less expensive by $6.',
    ],
    correctIndex: 0,
    correctAnswer:
      'TechCare costs $85 and PhoneDoc costs $89; TechCare is less expensive by $4.',
    hint:
      'Write the equation for TechCare: C = 20h + 25. Evaluate both functions when h = 3.',
    explanation:
      'For TechCare: C = 20(3) + 25 = 60 + 25 = $85.\nFor PhoneDoc: C = 28(3) + 5 = 84 + 5 = $89.\nComparing the costs: $85 < $89. TechCare is less expensive by $89 − $85 = $4.',
  },

  // ===========================================================================
  // ROUND 2 (Questions 7–12)
  // Q7: Identifying Functions (Mapping Diagram)
  // Q8: Identifying Functions (Graph & Vertical Line Test)
  // Q9: Describing Functions (Slope and Initial Value in Context)
  // Q10: Describing Functions (Nonlinear functions & curves)
  // Q11: Comparing Functions (Graph vs Verbal description - slopes and intercepts)
  // Q12: Comparing Functions (Decreasing relationships / drainage rates)
  // ===========================================================================
  {
    id: 'u8-sc-q07',
    round: 2,
    questionInRound: 1,
    overallNumber: 7,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'mapping',
    prompt:
      'In a mapping diagram, the domain contains {−3, 0, 4}. Arrows connect −3 → 9, 0 → 0, and 4 → 16. Another relation has domain {2, 5} with arrows 2 → 6, 2 → 10, and 5 → 15. Which statement accurately classifies these two mappings?',
    mappingData: {
      inputs: [-3, 0, 4],
      outputs: [0, 9, 16],
      arrows: [
        [-3, 9],
        [0, 0],
        [4, 16],
      ],
    },
    options: [
      'Both mappings represent functions because both have numbers in domain and range.',
      'The first mapping is a function because exactly one arrow leaves each input; the second mapping is NOT a function because two arrows leave input 2.',
      'Neither mapping is a function because the inputs and outputs are not equal.',
      'The second mapping is a function because input 5 pairs with only one number.',
    ],
    correctIndex: 1,
    correctAnswer:
      'The first mapping is a function because exactly one arrow leaves each input; the second mapping is NOT a function because two arrows leave input 2.',
    hint:
      'Count how many arrows leave each input number on the left. Can an input branch off into two different outputs in a function?',
    explanation:
      'In a mapping diagram, a relation is a function if and only if EXACTLY ONE arrow departs from each input value in the domain. The first mapping has one arrow leaving −3, one from 0, and one from 4 (function). In the second relation, two arrows depart from input 2 (pointing to 6 and 10), which means one input is assigned to two different outputs, making it NOT a function.',
  },
  {
    id: 'u8-sc-q08',
    round: 2,
    questionInRound: 2,
    overallNumber: 8,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'graph',
    prompt:
      'A student applies the vertical line test to four graphs on a coordinate plane. Which graph passes the vertical line test and represents y as a function of x?',
    vltGraphOptions: [
      {
        id: 'A',
        label: 'Graph A',
        type: 'circle',
        ariaLabel: 'Coordinate grid showing a circle centered at the origin with radius 4: x² + y² = 16',
      },
      {
        id: 'B',
        label: 'Graph B',
        type: 'segment',
        ariaLabel: 'Coordinate grid showing a vertical line segment from (3, −2) to (3, 5) with solid endpoints',
      },
      {
        id: 'C',
        label: 'Graph C',
        type: 'parabola',
        ariaLabel: 'Coordinate grid showing an upward-opening parabola with vertex at (0, −3): y = x² − 3',
      },
      {
        id: 'D',
        label: 'Graph D',
        type: 'ellipse',
        ariaLabel: 'Coordinate grid showing an ellipse centered at the origin with horizontal major axis: x²/16 + y²/9 = 1',
      },
    ],
    options: ['Graph A', 'Graph B', 'Graph C', 'Graph D'],
    correctIndex: 2,
    correctAnswer: 'Graph C',
    hint:
      'Imagine drawing vertical lines anywhere across each graph. Which shape will never be crossed more than once by any vertical line?',
    explanation:
      'By the vertical line test, if any vertical line intersects a graph in more than one point, the graph is NOT a function. For Graph A (circle: x² + y² = 16), Graph B (vertical line segment from (3, −2) to (3, 5)), or Graph D (ellipse: x²/16 + y²/9 = 1), a vertical line intersects the graph at multiple points (infinitely many points for the vertical line segment). For Graph C (upward-opening parabola: y = x² − 3), every vertical line intersects the curve in at most one point, so it represents y as a function of x.',
  },
  {
    id: 'u8-sc-q09',
    round: 2,
    questionInRound: 3,
    overallNumber: 9,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.4C, 8.5I',
    representationType: 'verbal',
    prompt:
      'A plumber charges a total fee modeled by the function y = 45x + 60, where x represents the number of hours worked and y represents the total fee in dollars. What do the slope and y-intercept represent in this context?',
    options: [
      'The slope 45 represents the flat house-call fee, and the y-intercept 60 represents the hourly rate.',
      'The slope 45 represents the hourly labor rate ($45 per hour), and the y-intercept 60 represents the initial flat service call fee ($60).',
      'The plumber charges $45 per hour with no starting fee; $60 is the total charge after one hour.',
      'The plumber charges a fixed total of $105 regardless of the number of hours worked.',
    ],
    correctIndex: 1,
    correctAnswer:
      'The slope 45 represents the hourly labor rate ($45 per hour), and the y-intercept 60 represents the initial flat service call fee ($60).',
    hint:
      'In y = mx + b, the slope m is the rate per unit (per hour) and the y-intercept b is the starting/initial amount when hours x = 0.',
    explanation:
      'In a linear equation y = mx + b:\n• The slope (m = 45) is the constant rate of change: the plumber charges $45 for each additional hour worked ($45/hour).\n• The y-intercept (b = 60) is the initial value at x = 0: the customer pays an initial flat service call fee of $60 before any hours are worked.\nOption B is the only correct interpretation.',
  },
  {
    id: 'u8-sc-q10',
    round: 2,
    questionInRound: 4,
    overallNumber: 10,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.5G, 8.5H',
    representationType: 'table',
    prompt:
      'Consider the relationship defined by y = x² shown in the table below. Which statement correctly classifies this relationship?',
    tableData: {
      headers: ['x', 'y = x²'],
      rows: [
        [-2, 4],
        [-1, 1],
        [0, 0],
        [1, 1],
        [2, 4],
      ],
    },
    options: [
      'It is NOT a function because outputs 4 and 1 repeat for different inputs.',
      'It is a function, and it is linear because it passes through (0, 0).',
      'It is a nonlinear function because each input has exactly one output, but the rate of change is not constant.',
      'It is a proportional linear relationship with a constant multiplier of 2.',
    ],
    correctIndex: 2,
    correctAnswer:
      'It is a nonlinear function because each input has exactly one output, but the rate of change is not constant.',
    hint:
      'Does each x-value have only one y-value? Yes, so it is a function! But calculate Δy/Δx: from x=0 to 1, Δy=1; from x=1 to 2, Δy=3. Is the rate of change constant?',
    explanation:
      'Two key concepts:\n1. It is a FUNCTION: Every input x has exactly one output y. The fact that different inputs (−2 and 2) share the same output (4) does NOT violate the definition of a function.\n2. It is NONLINEAR: The rate of change changes across intervals (Δy/Δx from 0 to 1 is 1, but from 1 to 2 it is 3). Even though it passes through (0, 0), it does not have the constant linear form y = kx, so it is a nonlinear function.',
  },
  {
    id: 'u8-sc-q11',
    round: 2,
    questionInRound: 5,
    overallNumber: 11,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A/B',
    representationType: 'graph',
    prompt:
      'Car A’s distance is graphed below. Car B’s trip is described verbally: "Car B starts 20 miles ahead and travels at a steady speed of 60 miles per hour." How do the initial values and rates of change compare?',
    carAGraphData: {
      xMax: 4,
      yMax: 260,
      points: [
        { x: 0, y: 0, label: '(0, 0)' },
        { x: 2, y: 130, label: '(2, 130)' },
      ],
    },
    options: [
      'Car A has a greater initial value and a greater speed than Car B.',
      'Car B has a greater initial value (20 miles vs. 0 miles), but Car A has a greater rate of change (65 mph vs. 60 mph).',
      'Both cars have the same rate of change, but Car A starts ahead.',
      'Car B has a greater rate of change (65 mph) than Car A (60 mph).',
    ],
    correctIndex: 1,
    correctAnswer:
      'Car B has a greater initial value (20 miles vs. 0 miles), but Car A has a greater rate of change (65 mph vs. 60 mph).',
    hint:
      'Find Car A’s starting distance at time 0 and calculate its unit rate using change in distance divided by change in time from the graph. Then compare both values to Car B’s starting distance and speed given in the description.',
    explanation:
      'For Car A (graph):\n• Initial value b = 0 miles (starts at origin)\n• Rate of change m = (130 − 0)/(2 − 0) = 65 mph\n\nFor Car B (verbal description):\n• Initial value b = 20 miles\n• Rate of change m = 60 mph\n\nComparing:\n• Initial values: Car B (20 mi) > Car A (0 mi)\n• Rates of change: Car A (65 mph) > Car B (60 mph). Car A is traveling faster!',
  },
  {
    id: 'u8-sc-q12',
    round: 2,
    questionInRound: 6,
    overallNumber: 12,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A',
    representationType: 'equation',
    prompt:
      'Two storage tanks are being drained. Tank 1 starts with 200 gallons and drains at 15 gallons per minute (y = −15x + 200). Tank 2’s water level is given by the table below. Which tank drains at a faster rate, and which tank has more water remaining after 6 minutes?',
    tableData: {
      headers: ['Time (min, x)', 'Tank 2 Volume (gal, y)'],
      rows: [
        [0, 240],
        [2, 204],
        [4, 168],
        [6, 132],
      ],
    },
    options: [
      'Tank 2 drains faster at 18 gal/min; Tank 2 has more water after 6 minutes (132 gal vs. 110 gal).',
      'Tank 1 drains faster at 15 gal/min; Tank 1 has more water after 6 minutes.',
      'Both tanks drain at the exact same rate of 15 gal/min.',
      'Tank 2 drains faster at 36 gal/min; Tank 1 has more water after 6 minutes.',
    ],
    correctIndex: 0,
    correctAnswer:
      'Tank 2 drains faster at 18 gal/min; Tank 2 has more water after 6 minutes (132 gal vs. 110 gal).',
    hint:
      'Calculate Tank 2’s draining rate: (240 − 204)/(2 − 0). Then find Tank 1’s volume at x = 6: y = −15(6) + 200.',
    explanation:
      '1. Draining rates (slopes):\n• Tank 1: drains at 15 gal/min (rate = −15)\n• Tank 2: m = (204 − 240)/(2 − 0) = −36/2 = −18 gal/min. Tank 2 drains faster (18 gal/min > 15 gal/min).\n\n2. Volume at 6 minutes:\n• Tank 1: y = −15(6) + 200 = −90 + 200 = 110 gallons\n• Tank 2: at x = 6, y = 132 gallons from the table.\nTank 2 has 132 gallons remaining, which is more than Tank 1’s 110 gallons.',
  },

  // ===========================================================================
  // ROUND 3 (Questions 13–18)
  // Q13: Identifying Functions (Complex relation with repeated outputs vs conflicting inputs)
  // Q14: Identifying Functions (Table classification with identical duplicate rows)
  // Q15: Describing Functions (Finding equation y = mx + b and classifying from points)
  // Q16: Describing Functions (Origin misconception: nonlinear curve through (0,0) is not proportional)
  // Q17: Comparing Functions (Finding break-even / equal output input value)
  // Q18: Comparing Functions (Multi-representation comparison across contexts)
  // ===========================================================================
  {
    id: 'u8-sc-q13',
    round: 3,
    questionInRound: 1,
    overallNumber: 13,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'ordered-pairs',
    prompt:
      'A teacher writes four relations on the board. Which relation is NOT a function?',
    options: [
      'R₁ = {(−4, 2), (−2, 2), (0, 2), (2, 2), (4, 2)}',
      'R₂ = {(1, 3), (2, 6), (3, 9), (4, 12), (5, 15)}',
      'R₃ = {(−1, 5), (0, 0), (3, −4), (−1, 8), (5, 2)}',
      'R₄ = {(0, −1), (1, 0), (2, 3), (3, 8), (4, 15)}',
    ],
    correctIndex: 2,
    correctAnswer:
      'R₃ = {(−1, 5), (0, 0), (3, −4), (−1, 8), (5, 2)}',
    hint:
      'Inspect the first coordinate (x) in each ordered pair across all relations. A relation fails to be a function if a single input value is paired with two or more different output values.',
    explanation:
      'In R₃, the input value −1 appears in two different ordered pairs: (−1, 5) and (−1, 8). This means input −1 is assigned to two different output values (5 and 8), which violates the definition of a function. In contrast, R₁ is a valid constant function (every distinct input maps to 2), and R₂ and R₄ have all unique inputs.',
  },
  {
    id: 'u8-sc-q14',
    round: 3,
    questionInRound: 2,
    overallNumber: 14,
    section: 'Section A: Identifying Functions',
    category: 'identifying-functions',
    teks: 'TEKS 8.5G',
    representationType: 'table',
    prompt:
      'Which table below represents y as a function of x?',
    tableOptions: [
      {
        id: 'A',
        label: 'Table A',
        headers: ['x', 'y'],
        rows: [
          [3, 5],
          [4, 8],
          [3, 9],
          [6, 12],
        ],
      },
      {
        id: 'B',
        label: 'Table B',
        headers: ['x', 'y'],
        rows: [
          [-2, 7],
          [1, 4],
          [5, 7],
          [-2, 7],
        ],
      },
      {
        id: 'C',
        label: 'Table C',
        headers: ['x', 'y'],
        rows: [
          [0, 1],
          [0, 3],
          [2, 5],
          [4, 7],
        ],
      },
      {
        id: 'D',
        label: 'Table D',
        headers: ['x', 'y'],
        rows: [
          [5, -1],
          [5, 0],
          [5, 1],
          [5, 2],
        ],
      },
    ],
    options: [
      'Table A: (3, 5), (4, 8), (3, 9), (6, 12)',
      'Table B: (−2, 7), (1, 4), (5, 7), (−2, 7)',
      'Table C: (0, 1), (0, 3), (2, 5), (4, 7)',
      'Table D: (5, −1), (5, 0), (5, 1), (5, 2)',
    ],
    correctIndex: 1,
    correctAnswer:
      'Table B: (−2, 7), (1, 4), (5, 7), (−2, 7)',
    hint:
      'Examine the inputs (x) in each table. If an input repeats with conflicting outputs, it is not a function. But if an identical row repeats or distinct inputs share an output, it remains a function.',
    explanation:
      'In Table B, every input is assigned to exactly one output:\n• Input −2 pairs with 7 both times (identical point).\n• Input 1 pairs with 4.\n• Input 5 pairs with 7.\nSince no input has conflicting outputs, Table B is a function. In Table A, input 3 has outputs 5 and 9 (nonfunction). In Table C, input 0 has outputs 1 and 3 (nonfunction). In Table D, input 5 has four different outputs (vertical line, nonfunction).',
  },
  {
    id: 'u8-sc-q15',
    round: 3,
    questionInRound: 3,
    overallNumber: 15,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.4C, 8.5I',
    representationType: 'table',
    prompt:
      'A linear function contains the points (3, 11), (5, 17), and (8, 26). What is the equation of this function in slope-intercept form (y = mx + b)?',
    options: [
      'y = 3x + 2',
      'y = 2x + 5',
      'y = 3x + 11',
      'y = 6x − 7',
    ],
    correctIndex: 0,
    correctAnswer: 'y = 3x + 2',
    hint:
      'First calculate the slope m = (17 − 11)/(5 − 3). Then substitute one point (3, 11) into y = mx + b to solve for b.',
    explanation:
      'Step 1: Calculate slope m = (17 − 11)/(5 − 3) = 6/2 = 3.\nStep 2: Use point (3, 11) and m = 3 in y = mx + b:\n11 = 3(3) + b\n11 = 9 + b\nb = 2.\nStep 3: Write the equation: y = 3x + 2.\nVerify with (8, 26): 3(8) + 2 = 24 + 2 = 26. ✔ Correct!',
  },
  {
    id: 'u8-sc-q16',
    round: 3,
    questionInRound: 4,
    overallNumber: 16,
    section: 'Section B: Describing Functions',
    category: 'describing-functions',
    teks: 'TEKS 8.5H',
    representationType: 'verbal',
    prompt:
      'A student claims: "Any graph that passes through the origin (0, 0) is a proportional relationship." Which mathematical counterexample disproves this claim?',
    options: [
      'The line y = 3x, because it passes through (0, 0) and has a constant slope of 3.',
      'The parabola y = 2x², which passes through (0, 0) but is nonlinear because its rate of change is not constant and the ratio y/x is not fixed.',
      'The line y = 4x + 8, because its y-intercept is 8.',
      'A horizontal line y = 0, because it lies along the x-axis.',
    ],
    correctIndex: 1,
    correctAnswer:
      'The parabola y = 2x², which passes through (0, 0) but is nonlinear because its rate of change is not constant and the ratio y/x is not fixed.',
    hint:
      'To be proportional, a relationship must satisfy TWO conditions: pass through (0, 0) AND be a straight line with constant ratio y/x = k (form y = kx).',
    explanation:
      'Passing through the origin (0, 0) is a necessary condition for proportionality, but it is NOT sufficient on its own. The relationship must also be linear with a constant ratio y/x = k. The equation y = 2x² passes through (0, 0) since 2(0)² = 0, but for (1, 2) the ratio y/x = 2, while for (2, 8) the ratio y/x = 4. Because the ratio is not constant and the graph curves, it is nonlinear and nonproportional.',
  },
  {
    id: 'u8-sc-q17',
    round: 3,
    questionInRound: 5,
    overallNumber: 17,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A/B',
    representationType: 'table',
    prompt:
      'Two fitness centers offer different payment plans. Plan A is given by the equation y = 15x + 50, where x is the number of months. Plan B is shown in the table below. For how many months x will both plans cost the exact same amount?',
    tableData: {
      headers: ['Months (x)', 'Plan B Total ($)'],
      rows: [
        [1, 45],
        [3, 95],
        [5, 145],
        [7, 195],
      ],
    },
    options: [
      'x = 3 months',
      'x = 4 months',
      'x = 5 months',
      'x = 6 months',
    ],
    correctIndex: 0,
    correctAnswer: 'x = 3 months',
    hint:
      'Find the equation for Plan B: rate m = (95 − 45)/(3 − 1) = 25, initial value b = 45 − 25(1) = 20. Then set Plan A = Plan B: 15x + 50 = 25x + 20.',
    explanation:
      'Step 1: Write equation for Plan B:\n• Slope m = (95 − 45)/(3 − 1) = 50/2 = $25/month\n• Initial fee b = 45 − 25(1) = $20\n• Equation: y = 25x + 20\n\nStep 2: Set both plans equal to find the break-even point:\n15x + 50 = 25x + 20\n50 − 20 = 25x − 15x\n30 = 10x\nx = 3 months.\n\nAt 3 months, Plan A costs 15(3) + 50 = $95, and Plan B costs $95 (matches table!).',
  },
  {
    id: 'u8-sc-q18',
    round: 3,
    questionInRound: 6,
    overallNumber: 18,
    section: 'Section C: Comparing Functions',
    category: 'comparing-functions',
    teks: 'TEKS 8.4C, 8.5A/B/H',
    representationType: 'verbal',
    prompt:
      'Tanya saves money at a constant rate shown by y = 35x + 100, where x is weeks. Marcus begins with $220 and saves $25 each week. Which statement is TRUE after 15 weeks of saving?',
    options: [
      'Marcus has saved more money than Tanya because his starting balance was higher.',
      'Tanya has saved $625 and Marcus has saved $595; Tanya has $30 more than Marcus.',
      'Both Tanya and Marcus have saved the exact same amount of $600.',
      'Tanya has saved $525 and Marcus has saved $550; Marcus has $25 more than Tanya.',
    ],
    correctIndex: 1,
    correctAnswer:
      'Tanya has saved $625 and Marcus has saved $595; Tanya has $30 more than Marcus.',
    hint:
      'Evaluate Tanya: y = 35(15) + 100. Evaluate Marcus: y = 25(15) + 220. Compare the two totals.',
    explanation:
      '1. Tanya’s total after 15 weeks:\ny = 35(15) + 100 = 525 + 100 = $625.\n\n2. Marcus’s equation and total after 15 weeks:\nMarcus: y = 25x + 220\ny = 25(15) + 220 = 375 + 220 = $595.\n\n3. Compare:\n$625 − $595 = $30. Even though Marcus started with more money ($220 vs. $100), Tanya’s higher weekly savings rate ($35/week vs. $25/week) allowed her to overtake Marcus, resulting in $30 more after 15 weeks.',
  },
];
