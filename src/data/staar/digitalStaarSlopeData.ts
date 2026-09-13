// src/data/staar/digitalStaarSlopeData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 3: Slope & Linear Equations (TEKS 8.4A, 8.4B, 8.4C, 8.5I)
// 100% Client-side local data. Zero runtime API calls.

export type Unit3InteractionType =
  | 'drag-drop-formula'
  | 'graph-hot-spot'
  | 'table-analysis'
  | 'multiple-select'
  | 'equation-completion'
  | 'numeric-entry'
  | 'two-part-dropdown'
  | 'multi-representation'
  | 'classification'
  | 'matching'
  | 'error-analysis'
  | 'synthesis-challenge';

export interface BaseQuestionUnit3 {
  id: string;
  number: number;
  type: Unit3InteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  instructionalHint?: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Drag & Drop Slope Formula Construction
export interface Q1DragDropFormula extends BaseQuestionUnit3 {
  type: 'drag-drop-formula';
  point1: { name: string; x: number; y: number };
  point2: { name: string; x: number; y: number };
  instruction: string;
  availableTiles: string[];
  correctNumerator: [string, string]; // [y2, y1] or [y1, y2]
  correctDenominator: [string, string]; // [x2, x1] or [x1, x2]
  finalSlopeValue: string;
  simplifiedOptions: string[];
}

// Q2: Graph Hot Spot Point Selection
export interface HotSpotCandidate {
  id: string;
  label: string;
  x: number;
  y: number;
  isOnLine: boolean;
  misconception: string;
}

export interface Q2GraphHotSpotSlope extends BaseQuestionUnit3 {
  type: 'graph-hot-spot';
  scenario: string;
  xLabel: string;
  yLabel: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep: number;
  yStep: number;
  lineSlope: number;
  lineYIntercept: number;
  points: HotSpotCandidate[];
  slopeDropdownOptions: string[];
  correctSlope: string;
}

// Q3: Table Analysis Rate of Change
export interface TableRowSlope {
  x: number;
  y: number;
}

export interface Q3TableAnalysisSlope extends BaseQuestionUnit3 {
  type: 'table-analysis';
  context: string;
  tableTitle: string;
  xHeader: string;
  yHeader: string;
  rows: TableRowSlope[];
  statement1Prefix: string;
  dropdown1Options: string[];
  correct1: string;
  statement2Prefix: string;
  dropdown2Options: string[];
  correct2: string;
  statement3Prefix: string;
  dropdown3Options: string[];
  correct3: string;
}

// Q4: Multiple Select (Select TWO)
export interface OptionSlope {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  distractorType: string;
}

export interface Q4MultipleSelectSlope extends BaseQuestionUnit3 {
  type: 'multiple-select';
  equation: string;
  scenario: string;
  graphDetails: {
    yIntercept: { x: number; y: number };
    xIntercept: { x: number; y: number };
    slope: string;
  };
  options: OptionSlope[];
}

// Q5: Equation Completion from Graph
export interface Q5EquationCompletion extends BaseQuestionUnit3 {
  type: 'equation-completion';
  scenario: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  guidePoints: { x: number; y: number; label: string }[];
  acceptedM: string[];
  acceptedB: string[];
}

// Q6: Numeric Entry Two Points
export interface Q6NumericEntrySlope extends BaseQuestionUnit3 {
  type: 'numeric-entry';
  pointA: { x: number; y: number };
  pointB: { x: number; y: number };
  acceptedM: string[];
  acceptedB: string[];
}

// Q7: Two-Part Real-World Dropdown
export interface Q7TwoPartDropdown extends BaseQuestionUnit3 {
  type: 'two-part-dropdown';
  scenario: string;
  partA: {
    prompt: string;
    dropdownOptions: string[];
    correct: string;
    explanation: string;
  };
  partB: {
    prompt: string;
    dropdownOptions: string[];
    correct: string;
    explanation: string;
  };
}

// Q8: Multi-Representation Analysis (Table vs Graph)
export interface Q8MultiRepresentation extends BaseQuestionUnit3 {
  type: 'multi-representation';
  scenario: string;
  tableData: {
    title: string;
    xHeader: string;
    yHeader: string;
    rows: TableRowSlope[];
    rate: number;
    initial: number;
  };
  graphData: {
    title: string;
    xHeader: string;
    yHeader: string;
    points: { x: number; y: number }[];
    rate: number;
    initial: number;
  };
  dropdown1Options: string[];
  correct1: string;
  dropdown2Options: string[];
  correct2: string;
  dropdown3Options: string[];
  correct3: string;
}

// Q9: Classification Drag & Drop (Positive, Negative, Zero, Undefined)
export interface ClassificationCardSlope {
  id: string;
  title: string;
  description: string;
  correctCategory: 'positive' | 'negative' | 'zero' | 'undefined';
  rationale: string;
}

export interface Q9ClassificationSlope extends BaseQuestionUnit3 {
  type: 'classification';
  categories: {
    id: 'positive' | 'negative' | 'zero' | 'undefined';
    label: string;
    sublabel: string;
    color: string;
  }[];
  cards: ClassificationCardSlope[];
}

// Q10: Equation to Graph Matching
export interface GraphMatchingItem {
  id: string;
  graphId: 'graph-A' | 'graph-B' | 'graph-C' | 'graph-D';
  slope: number;
  yIntercept: number;
  equation: string;
  points: { x: number; y: number }[];
  description: string;
}

export interface Q10MatchingSlope extends BaseQuestionUnit3 {
  type: 'matching';
  equations: {
    id: string;
    equation: string;
    correctGraphId: 'graph-A' | 'graph-B' | 'graph-C' | 'graph-D';
    characteristics: string;
  }[];
  graphs: GraphMatchingItem[];
}

// Q11: Error Analysis Multiple Select
export interface Q11ErrorAnalysisSlope extends BaseQuestionUnit3 {
  type: 'error-analysis';
  problemContext: string;
  givenPoints: string;
  studentWorkSteps: { step: string; math: string }[];
  options: OptionSlope[];
}

// Q12: Synthesis Challenge (3 Companies)
export interface Q12SynthesisChallenge extends BaseQuestionUnit3 {
  type: 'synthesis-challenge';
  scenario: string;
  company1: {
    name: string;
    representationType: 'Equation';
    expression: string;
    rate: number;
    fee: number;
  };
  company2: {
    name: string;
    representationType: 'Table';
    headers: [string, string];
    rows: TableRowSlope[];
    rate: number;
    fee: number;
  };
  company3: {
    name: string;
    representationType: 'Graph';
    points: { x: number; y: number }[];
    rate: number;
    fee: number;
  };
  task1Prompt: string;
  task1Options: string[];
  task1Correct: string;
  task2Prompt: string;
  task2Options: string[];
  task2Correct: string;
  task3Prompt: string;
  task3Options: string[];
  task3Correct: string;
}

export type Unit3DigitalStaarQuestion =
  | Q1DragDropFormula
  | Q2GraphHotSpotSlope
  | Q3TableAnalysisSlope
  | Q4MultipleSelectSlope
  | Q5EquationCompletion
  | Q6NumericEntrySlope
  | Q7TwoPartDropdown
  | Q8MultiRepresentation
  | Q9ClassificationSlope
  | Q10MatchingSlope
  | Q11ErrorAnalysisSlope
  | Q12SynthesisChallenge;

export const UNIT_3_DIGITAL_STAAR_QUESTIONS: Unit3DigitalStaarQuestion[] = [
  // ==========================================
  // QUESTION 1: Drag & Drop Slope Formula
  // ==========================================
  {
    id: 'u3-dstaar-1',
    number: 1,
    type: 'drag-drop-formula',
    typeLabel: 'Drag & Drop Equation Builder',
    teks: 'TEKS 8.4A & 8.4C',
    topic: 'Slope from Two Points',
    prompt:
      'Construct the slope formula substitution to calculate the rate of change for the line passing through point P(-3, -2) and point Q(5, 14). Drag the numbers into the corresponding numerator and denominator slots, then select the resulting simplified slope.',
    point1: { name: 'P', x: -3, y: -2 },
    point2: { name: 'Q', x: 5, y: 14 },
    instruction:
      'Drag or tap values into the formula slots: m = (y₂ - y₁) / (x₂ - x₁)',
    availableTiles: ['14', '-2', '5', '-3', '-14', '2', '-5', '3'],
    correctNumerator: ['14', '-2'],
    correctDenominator: ['5', '-3'],
    finalSlopeValue: '2',
    simplifiedOptions: ['2', '1/2', '-2', '6'],
    solutionExplanation:
      'To determine slope between P(-3, -2) and Q(5, 14), substitute coordinates into m = (y₂ - y₁) / (x₂ - x₁). In the numerator, calculate the vertical change: 14 - (-2) = 14 + 2 = 16. In the denominator, calculate the horizontal change: 5 - (-3) = 5 + 3 = 8. Dividing the vertical change by horizontal change gives m = 16 / 8 = 2.',
    keyTakeaway:
      'Slope is always Δy / Δx (rise over run). When subtracting negative coordinates, remember that subtracting a negative is equivalent to adding a positive.',
  },

  // ==========================================
  // QUESTION 2: Graph Hot Spot Point Selection
  // ==========================================
  {
    id: 'u3-dstaar-2',
    number: 2,
    type: 'graph-hot-spot',
    typeLabel: 'Graph Hot Spot',
    teks: 'TEKS 8.4C',
    topic: 'Slope from a Coordinate Graph',
    prompt:
      'The linear graph below models a relationship with a negative constant rate of change. Click or tap exactly TWO candidate points that lie directly on the line, then choose the correct slope of the line.',
    scenario:
      'Identify two ordered pairs situated on grid intersections along the line y = -x + 2, then determine the slope m = Δy / Δx.',
    xLabel: 'x',
    yLabel: 'y',
    xMin: -8,
    xMax: 8,
    yMin: -8,
    yMax: 8,
    xStep: 1,
    yStep: 1,
    lineSlope: -1, // -1
    lineYIntercept: 2, // y = -x + 2
    points: [
      {
        id: 'pt-A',
        label: 'A(0, 2)',
        x: 0,
        y: 2,
        isOnLine: true,
        misconception: 'On line: y-intercept at (0, 2). Matches y = -(0) + 2 = 2.',
      },
      {
        id: 'pt-B',
        label: 'B(-5, 3)',
        x: -5,
        y: 3,
        isOnLine: false,
        misconception: 'Distractor: Off line. For x = -5, y = -(-5) + 2 = 7, not 3.',
      },
      {
        id: 'pt-C',
        label: 'C(3, 4)',
        x: 3,
        y: 4,
        isOnLine: false,
        misconception: 'Distractor: Off line. For x = 3, y = -(3) + 2 = -1, not 4.',
      },
      {
        id: 'pt-D',
        label: 'D(2, 0)',
        x: 2,
        y: 0,
        isOnLine: true,
        misconception: 'On line: x-intercept at (2, 0). Matches y = -(2) + 2 = 0.',
      },
      {
        id: 'pt-E',
        label: 'E(4, -1)',
        x: 4,
        y: -1,
        isOnLine: false,
        misconception: 'Distractor: Off line. For x = 4, y = -(4) + 2 = -2, not -1.',
      },
      {
        id: 'pt-F',
        label: 'F(-2, 3)',
        x: -2,
        y: 3,
        isOnLine: false,
        misconception: 'Distractor: Off line. For x = -2, y = -(-2) + 2 = 4, not 3.',
      },
    ],
    slopeDropdownOptions: ['-2', '-3/2', '-1', '-1/2', '2'],
    correctSlope: '-1',
    solutionExplanation:
      'Points A(0, 2) and D(2, 0) lie directly on the graphed line y = -x + 2. Using these two points, the slope is m = (y₂ - y₁) / (x₂ - x₁) = (0 - 2) / (2 - 0) = -2 / 2 = -1. Distractor points B(-5, 3), C(3, 4), E(4, -1), and F(-2, 3) do not satisfy the linear equation y = -x + 2. Distractor choices such as m = -2 or m = -1/2 reflect miscalculating rise over run or inverting coordinates.',
    keyTakeaway:
      'Lines that fall from left to right always possess a negative slope. Using any two points on the line (x₁, y₁) and (x₂, y₂), compute slope as m = (y₂ - y₁) / (x₂ - x₁) = rise / run = Δy / Δx.',
  },

  // ==========================================
  // QUESTION 3: Table Analysis Rate of Change
  // ==========================================
  {
    id: 'u3-dstaar-3',
    number: 3,
    type: 'table-analysis',
    typeLabel: 'Table Analysis & Inline Choice',
    teks: 'TEKS 8.4C',
    topic: 'Rate of Change from a Table',
    prompt:
      'The table displays the water depth in a flood retention basin recorded over several hours during a controlled release. Analyze the table to determine the constant rate of change and the initial water depth.',
    context: 'Retention Basin Controlled Water Release',
    tableTitle: 'Basin Water Level During Drainage',
    xHeader: 'Time, x (hours)',
    yHeader: 'Water Depth, y (feet)',
    rows: [
      { x: 2, y: 22.5 },
      { x: 5, y: 18.0 },
      { x: 8, y: 13.5 },
      { x: 12, y: 7.5 },
    ],
    statement1Prefix:
      'From x = 2 to x = 5 hours (Δx = +3), the change in water depth (Δy) is',
    dropdown1Options: ['-4.5 feet', '+4.5 feet', '-3.0 feet', '18.0 feet'],
    correct1: '-4.5 feet',
    statement2Prefix:
      'The rate of change (slope m) of the linear relationship is',
    dropdown2Options: [
      '-1.5 ft/hr',
      '+1.5 ft/hr',
      '-0.67 hr/ft',
      '-4.5 ft/hr',
    ],
    correct2: '-1.5 ft/hr',
    statement3Prefix:
      'The initial water depth (y-intercept b) when x = 0 hours was',
    dropdown3Options: ['25.5 feet', '22.5 feet', '-1.5 feet', '27.0 feet'],
    correct3: '25.5 feet',
    solutionExplanation:
      '1. Δy from x = 2 to x = 5 is 18.0 - 22.5 = -4.5 feet.\n2. The rate of change m = Δy / Δx = -4.5 / 3 = -1.5 ft/hr. (Notice from x = 8 to x = 12: Δy = 7.5 - 13.5 = -6.0; Δx = 4; -6.0 / 4 = -1.5 ft/hr).\n3. To find b, use y = mx + b with point (2, 22.5): 22.5 = -1.5(2) + b => 22.5 = -3.0 + b => b = 25.5 feet. Assuming the first table entry (22.5) is the initial value is a common misconception because x ≠ 0 at that point.',
    keyTakeaway:
      'When x does not increment by 1, divide Δy by Δx to find the true unit rate of change. The initial value b is the y-value when x = 0, not necessarily the first row in the table.',
  },

  // ==========================================
  // QUESTION 4: Multiple Select (Select TWO)
  // ==========================================
  {
    id: 'u3-dstaar-4',
    number: 4,
    type: 'multiple-select',
    typeLabel: 'Multiple Select',
    teks: 'TEKS 8.4C & 8.5I',
    topic: 'Slope & y-Intercept Properties',
    prompt:
      'A line is represented by the linear equation y = (3/4)x - 6. Which TWO statements about the slope and intercepts of this linear relationship are true? (Select exactly TWO choices.)',
    equation: 'y = (3/4)x - 6',
    scenario:
      'Analyze the slope m = 3/4 and y-intercept b = -6 from slope-intercept form y = mx + b.',
    graphDetails: {
      yIntercept: { x: 0, y: -6 },
      xIntercept: { x: 8, y: 0 },
      slope: '3/4',
    },
    options: [
      {
        id: 'opt-A',
        label: 'A',
        text: 'The slope of the line is 3/4, indicating that the graph rises 3 vertical units for every 4 horizontal units.',
        isCorrect: true,
        distractorType: 'Correct definition of slope m = rise/run.',
      },
      {
        id: 'opt-B',
        label: 'B',
        text: 'The slope of the line is 4/3 because the horizontal change is 4 and the vertical change is 3.',
        isCorrect: false,
        distractorType: 'Distractor: Inverting rise and run (Δx / Δy).',
      },
      {
        id: 'opt-C',
        label: 'C',
        text: 'The y-intercept of the line is (8, 0) because that is where the line crosses an axis.',
        isCorrect: false,
        distractorType:
          'Distractor: Confusing the x-intercept (8, 0) with the y-intercept (0, -6).',
      },
      {
        id: 'opt-D',
        label: 'D',
        text: 'The y-intercept of the line is (0, -6), meaning the graph crosses the vertical y-axis at -6.',
        isCorrect: true,
        distractorType: 'Correct definition of y-intercept b = -6.',
      },
      {
        id: 'opt-E',
        label: 'E',
        text: 'The line has a negative rate of change because the constant term -6 is negative.',
        isCorrect: false,
        distractorType:
          'Distractor: Confusing the sign of the y-intercept with the direction of slope.',
      },
    ],
    solutionExplanation:
      'In y = mx + b, m is the slope and b is the y-intercept.\n• Here, m = 3/4, meaning a rise of 3 for a run of 4 (Statement A is TRUE).\n• Statement B inverts rise and run (4/3 instead of 3/4).\n• Statement C describes the x-intercept where y = 0: 0 = (3/4)x - 6 => (3/4)x = 6 => x = 8, which is the x-intercept, NOT the y-intercept.\n• The y-intercept is b = -6, giving the coordinate (0, -6) where the line crosses the y-axis (Statement D is TRUE).\n• Statement E incorrectly assumes a negative b makes the slope negative; the slope is +3/4 (positive).',
    keyTakeaway:
      'In y = mx + b, m always multiplies x (rate of change) while b is the constant added (y-intercept at (0, b)). Do not confuse the x-intercept (where y = 0) with the y-intercept (where x = 0).',
  },

  // ==========================================
  // QUESTION 5: Equation Completion from Graph
  // ==========================================
  {
    id: 'u3-dstaar-5',
    number: 5,
    type: 'equation-completion',
    typeLabel: 'Equation Completion',
    teks: 'TEKS 8.5I & 8.4C',
    topic: 'Writing y = mx + b from a Graph',
    prompt:
      'Look at the graphed line on the coordinate plane. Determine both the slope (m) and the y-intercept (b) to complete the equation of the line in slope-intercept form.',
    scenario:
      'Find the constant rate of change m and the initial vertical position b from the plotted grid points.',
    xMin: -8,
    xMax: 8,
    yMin: -8,
    yMax: 8,
    guidePoints: [
      { x: -2, y: 8, label: '(-2, 8)' },
      { x: 0, y: 4, label: '(0, 4)' },
      { x: 3, y: -2, label: '(3, -2)' },
    ],
    acceptedM: ['-2', '-2.0', '-2/1', '-4/2', '-6/3', '-2.00'],
    acceptedB: ['4', '+4', '4.0', '4/1'],
    instructionalHint:
      'To determine the equation in slope-intercept form y = mx + b:\n• First, locate the y-intercept (b) where the line crosses the vertical y-axis (where x = 0).\n• Second, identify any two points on the line and calculate the slope: m = (y₂ - y₁) / (x₂ - x₁) = rise / run.\n• Notice whether the line slants upward (positive slope) or downward (negative slope) from left to right.\n• Enter your revised values for m and b above and submit again.',
    solutionExplanation:
      '1. Find the y-intercept: The line crosses the vertical y-axis at the point (0, 4), so b = 4.\n2. Find the slope: Select two points on the line, such as (0, 4) and (3, -2). The vertical change is Δy = -2 - 4 = -6, and the horizontal change is Δx = 3 - 0 = 3. Thus, m = -6 / 3 = -2.\n3. Combine into slope-intercept form: y = -2x + 4.',
    keyTakeaway:
      'To write y = mx + b from a graph: locate the y-intercept where the line hits the y-axis (b), then calculate rise over run between any two clean intersection points (m).',
  },

  // ==========================================
  // QUESTION 6: Numeric Entry Two Points
  // ==========================================
  {
    id: 'u3-dstaar-6',
    number: 6,
    type: 'numeric-entry',
    typeLabel: 'Numeric Entry',
    teks: 'TEKS 8.4C & 8.5I',
    topic: 'Linear Equation from Two Coordinates',
    prompt:
      'A line on a coordinate plane passes through the two ordered pairs (4, 11) and (8, 23). Determine the numerical value of the slope (m) and the y-intercept (b).',
    pointA: { x: 4, y: 11 },
    pointB: { x: 8, y: 23 },
    acceptedM: ['3', '3.0', '3/1'],
    acceptedB: ['-1', '-1.0'],
    solutionExplanation:
      '1. Calculate the slope m: m = (y₂ - y₁) / (x₂ - x₁) = (23 - 11) / (8 - 4) = 12 / 4 = 3.\n2. Calculate the y-intercept b using y = mx + b with point (4, 11):\n11 = 3(4) + b\n11 = 12 + b\nb = 11 - 12 = -1.\n3. The resulting equation is y = 3x - 1.',
    keyTakeaway:
      'After finding slope m from two points, substitute m and one known point (x, y) into y = mx + b to solve algebraically for b.',
  },

  // ==========================================
  // QUESTION 7: Two-Part Real-World Dropdown
  // ==========================================
  {
    id: 'u3-dstaar-7',
    number: 7,
    type: 'two-part-dropdown',
    typeLabel: 'Two-Part Inline Dropdown',
    teks: 'TEKS 8.4C & 8.5I',
    topic: 'Interpreting m and b in Context',
    prompt:
      'Apex Express Logistics rents utility moving vans. The company charges a one-time administrative contract fee of $45 plus an operational fee of $0.35 for every mile driven.',
    scenario:
      'Analyze the fixed initial fee and variable unit rate in this commercial transportation model.',
    partA: {
      prompt:
        'Part A: In the linear function modeling the total rental cost, what does the slope (m = 0.35) represent?',
      dropdownOptions: [
        'The variable rate of $0.35 charged for each mile driven',
        'The one-time administrative contract fee of $45',
        'The total cost of the rental agreement',
        'The maximum number of miles the van can be driven',
      ],
      correct: 'The variable rate of $0.35 charged for each mile driven',
      explanation:
        'Slope is the rate of change per unit. Since the customer is charged $0.35 for each mile, m = 0.35 represents the cost per mile.',
    },
    partB: {
      prompt:
        'Part B: Which linear equation represents the total cost, y, for driving x miles, and what is its y-intercept?',
      dropdownOptions: [
        'y = 0.35x + 45, with y-intercept (0, 45) representing the upfront cost before driving any miles',
        'y = 45x + 0.35, with y-intercept (0, 0.35) representing the price per mile',
        'y = 0.35x, with y-intercept (0, 0) because there is no initial starting cost',
        'y = 45x - 0.35, with y-intercept (0, -0.35) representing a fuel discount',
      ],
      correct:
        'y = 0.35x + 45, with y-intercept (0, 45) representing the upfront cost before driving any miles',
      explanation:
        'The total cost y is the variable mileage cost (0.35x) plus the fixed administrative fee (45). When x = 0 miles, y = 45, confirming the y-intercept is (0, 45).',
    },
    solutionExplanation:
      'Part A: Slope is the rate of change connected to the independent variable (miles driven). Here m = $0.35/mile.\nPart B: The initial value (y-intercept) is the fixed fee charged when x = 0 miles, which is $45. Therefore, the equation is y = 0.35x + 45 with y-intercept (0, 45). Distractor y = 45x + 0.35 reverses the role of rate and fixed fee.',
    keyTakeaway:
      'In real-world linear situations, slope m is the repeating unit rate (cost per mile, per hour, per item), while y-intercept b is the fixed, one-time initial value at x = 0.',
  },

  // ==========================================
  // QUESTION 8: Multi-Representation Analysis
  // ==========================================
  {
    id: 'u3-dstaar-8',
    number: 8,
    type: 'multi-representation',
    typeLabel: 'Multi-Representation Analysis',
    teks: 'TEKS 8.4C',
    topic: 'Comparing Rates of Change & Initial Values',
    prompt:
      'Two solar generators are recharging emergency backup batteries. Solar Plan A is represented in the data table, and Solar Plan B is shown on the coordinate graph. Compare their rates of change and initial battery levels.',
    scenario:
      'Examine the table and the graph to extract rate of change (slope) and starting battery percentage (y-intercept).',
    tableData: {
      title: 'Solar Plan A (Table)',
      xHeader: 'Time, t (hours)',
      yHeader: 'Charge, B (%)',
      rows: [
        { x: 0, y: 15 },
        { x: 2, y: 27 },
        { x: 5, y: 45 },
        { x: 8, y: 63 },
      ],
      rate: 6, // (27 - 15) / 2 = 6% per hour
      initial: 15,
    },
    graphData: {
      title: 'Solar Plan B (Graph)',
      xHeader: 'Time, t (hours)',
      yHeader: 'Charge, B (%)',
      points: [
        { x: 0, y: 25 },
        { x: 2, y: 33 },
        { x: 4, y: 41 },
        { x: 6, y: 49 },
      ],
      rate: 4, // (33 - 25) / 2 = 4% per hour
      initial: 25,
    },
    dropdown1Options: [
      'Plan A rate = 6% / hr, Plan B rate = 4% / hr (Plan A charges faster)',
      'Plan A rate = 4% / hr, Plan B rate = 6% / hr (Plan B charges faster)',
      'Plan A rate = 12% / hr, Plan B rate = 8% / hr',
      'Both plans charge at identical rates of 5% / hr',
    ],
    correct1:
      'Plan A rate = 6% / hr, Plan B rate = 4% / hr (Plan A charges faster)',
    dropdown2Options: [
      'Plan B has a greater initial charge (25% vs. 15%, difference of 10%)',
      'Plan A has a greater initial charge (15% vs. 0%, difference of 15%)',
      'Both plans start with equal charge of 0%',
      'Plan B has a lower initial charge (20% vs. 25%)',
    ],
    correct2:
      'Plan B has a greater initial charge (25% vs. 15%, difference of 10%)',
    dropdown3Options: [
      'Plan A equation: B = 6t + 15; Plan B equation: B = 4t + 25',
      'Plan A equation: B = 15t + 6; Plan B equation: B = 25t + 4',
      'Plan A equation: B = 12t + 15; Plan B equation: B = 8t + 25',
      'Plan A equation: B = 6t; Plan B equation: B = 4t',
    ],
    correct3: 'Plan A equation: B = 6t + 15; Plan B equation: B = 4t + 25',
    instructionalHint:
      'To compare the two solar charging plans:\n• Rate of Change (m): For Plan A, calculate ΔCharge / ΔTime using any two rows in the table. For Plan B, choose two clear plotted points on the graph and find rise / run (ΔB / Δt).\n• Initial Value (b): For Plan A, find the charge when Time = 0 hours. For Plan B, look where the line crosses the vertical axis at t = 0.\n• Compare which rate is greater and which starting charge is higher, then revise your dropdown selections and submit again.',
    solutionExplanation:
      '1. Rate of Change (Slope):\n• Plan A (table): m_A = (27 - 15) / (2 - 0) = 12 / 2 = 6% per hour.\n• Plan B (graph): m_B = (33 - 25) / (2 - 0) = 8 / 2 = 4% per hour.\nTherefore, Plan A has a steeper slope and charges faster.\n2. Initial Value (y-intercept):\n• Plan A: At t = 0, charge is 15%.\n• Plan B: At t = 0, charge is 25%.\nPlan B started with 10% more charge than Plan A (25 - 15 = 10%).\n3. Slope-intercept equations:\n• Plan A: B = 6t + 15\n• Plan B: B = 4t + 25.',
    keyTakeaway:
      'When comparing representations, extract m (Δy / Δx) and b (value when x = 0) from each. Higher slope means faster rate of change; higher y-intercept means greater initial quantity.',
  },

  // ==========================================
  // QUESTION 9: Classification Drag & Drop
  // ==========================================
  {
    id: 'u3-dstaar-9',
    number: 9,
    type: 'classification',
    typeLabel: 'Classification Drag & Drop',
    teks: 'TEKS 8.4A & 8.4C',
    topic: 'Classifying Slopes (Positive, Negative, Zero, Undefined)',
    prompt:
      'Categorize each linear statement or representation into the correct slope category: Positive Slope, Negative Slope, Zero Slope, or Undefined Slope. Drag each card to its target box, or tap a card and tap the target box.',
    categories: [
      {
        id: 'positive',
        label: 'Positive Slope',
        sublabel: 'Rises from left to right (m > 0)',
        color: 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30',
      },
      {
        id: 'negative',
        label: 'Negative Slope',
        sublabel: 'Falls from left to right (m < 0)',
        color: 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30',
      },
      {
        id: 'zero',
        label: 'Zero Slope',
        sublabel: 'Horizontal line (m = 0, y = b)',
        color: 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30',
      },
      {
        id: 'undefined',
        label: 'Undefined Slope',
        sublabel: 'Vertical line (x = a, Δx = 0)',
        color: 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30',
      },
    ],
    cards: [
      {
        id: 'card-1',
        title: 'Points (-2, -3) and (3, 7)',
        description: 'Line passes through (-2, -3) and (3, 7)',
        correctCategory: 'positive',
        rationale: 'm = (7 - (-3)) / (3 - (-2)) = 10 / 5 = +2 (positive).',
      },
      {
        id: 'card-2',
        title: 'Equation y = 4.5x - 8',
        description: 'Linear equation with coefficient m = 4.5',
        correctCategory: 'positive',
        rationale: 'The coefficient of x is +4.5 > 0, so the slope is positive.',
      },
      {
        id: 'card-3',
        title: 'Points (-1, 6) and (4, -9)',
        description: 'Line passes through (-1, 6) and (4, -9)',
        correctCategory: 'negative',
        rationale: 'm = (-9 - 6) / (4 - (-1)) = -15 / 5 = -3 (negative).',
      },
      {
        id: 'card-4',
        title: 'Table: Δy = -5 when Δx = +2',
        description: 'Constant table rates of Δy = -5 and Δx = +2',
        correctCategory: 'negative',
        rationale: 'm = -5 / 2 = -2.5 (negative rate of change).',
      },
      {
        id: 'card-5',
        title: 'Horizontal Line y = -4',
        description: 'Passes through (3, -4) and (-5, -4)',
        correctCategory: 'zero',
        rationale: 'Δy = -4 - (-4) = 0. Slope m = 0 / Δx = 0.',
      },
      {
        id: 'card-6',
        title: 'Table where all y = 7',
        description: 'Points (1, 7), (2, 7), (3, 7), (4, 7)',
        correctCategory: 'zero',
        rationale:
          'No vertical change occurs as x changes; m = 0 / 1 = 0 (zero slope).',
      },
      {
        id: 'card-7',
        title: 'Vertical Line x = 5',
        description: 'Passes through (5, -2) and (5, 6)',
        correctCategory: 'undefined',
        rationale:
          'Δx = 5 - 5 = 0. Division by zero (m = 8 / 0) is undefined.',
      },
      {
        id: 'card-8',
        title: 'Fraction (8 - 2) / (3 - 3)',
        description: 'Slope calculation yielding 6 / 0',
        correctCategory: 'undefined',
        rationale:
          'Dividing by zero in a slope calculation produces an undefined slope.',
      },
    ],
    instructionalHint:
      'Review the key classification rules:\n• Positive Slope (m > 0): The line rises from left to right, or y increases as x increases.\n• Negative Slope (m < 0): The line falls from left to right, or y decreases as x increases.\n• Zero Slope (m = 0): A horizontal line where y does not change (Δy = 0), in the form y = b.\n• Undefined Slope: A vertical line where x does not change (Δx = 0), causing division by zero, in the form x = a.\nCheck each card again, adjust your placements, and submit your revision.',
    solutionExplanation:
      '• Positive Slope: Lines that rise from left to right or have m > 0 (Cards 1 & 2).\n• Negative Slope: Lines that fall from left to right or have m < 0 (Cards 3 & 4).\n• Zero Slope: Horizontal lines where Δy = 0, giving m = 0 / Δx = 0; equations take the form y = b (Cards 5 & 6).\n• Undefined Slope: Vertical lines where Δx = 0, leading to division by zero (m = Δy / 0); equations take the form x = a (Cards 7 & 8).',
    keyTakeaway:
      'Remember: "Zero is horizontal (y = b); Undefined is vertical (x = a)". A line with zero slope is flat like a floor; an undefined slope is vertical like a wall.',
  },

  // ==========================================
  // QUESTION 10: Equation to Graph Matching
  // ==========================================
  {
    id: 'u3-dstaar-10',
    number: 10,
    type: 'matching',
    typeLabel: 'Equation-to-Graph Matching',
    teks: 'TEKS 8.5I & 8.4C',
    topic: 'Connecting Equations with Graphs',
    prompt:
      'Match each linear equation in slope-intercept form to its corresponding graph. Pay close attention to the sign of the slope (direction), the steepness, and the y-intercept location.',
    instructionalHint:
      'Analyze each linear equation using slope-intercept form (y = mx + b):\n• Slope direction (sign of m): A positive slope (m > 0) rises from left to right. A negative slope (m < 0) falls from left to right.\n• Slope steepness (|m|): |m| = 2 rises or falls 2 vertical units for every 1 horizontal unit (steep). |m| = 1/2 rises 1 vertical unit for every 2 horizontal units (gentle).\n• y-intercept (b): Locate where the line crosses the vertical y-axis (where x = 0). Positive values cross above the origin; negative values cross below the origin.\nRe-examine the graphs carefully, adjust your dropdown selections, and submit again.',
    equations: [
      {
        id: 'eq-1',
        equation: 'y = 2x + 1',
        correctGraphId: 'graph-B',
        characteristics:
          'Positive slope m = 2 (steep upward), positive y-intercept at (0, 1)',
      },
      {
        id: 'eq-2',
        equation: 'y = -2x + 1',
        correctGraphId: 'graph-C',
        characteristics:
          'Negative slope m = -2 (steep downward), positive y-intercept at (0, 1)',
      },
      {
        id: 'eq-3',
        equation: 'y = (1/2)x - 2',
        correctGraphId: 'graph-D',
        characteristics:
          'Positive slope m = 1/2 (gentle upward), negative y-intercept at (0, -2)',
      },
      {
        id: 'eq-4',
        equation: 'y = -2x - 3',
        correctGraphId: 'graph-A',
        characteristics:
          'Negative slope m = -2 (steep downward), negative y-intercept at (0, -3)',
      },
    ],
    graphs: [
      {
        id: 'graph-A',
        graphId: 'graph-A',
        slope: -2,
        yIntercept: -3,
        equation: 'y = -2x - 3',
        points: [
          { x: -2, y: 1 },
          { x: -1, y: -1 },
          { x: 0, y: -3 },
          { x: 1, y: -5 },
        ],
        description: 'Graph A: Slope m = -2, y-intercept (0, -3)',
      },
      {
        id: 'graph-B',
        graphId: 'graph-B',
        slope: 2,
        yIntercept: 1,
        equation: 'y = 2x + 1',
        points: [
          { x: -1, y: -1 },
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 5 },
        ],
        description: 'Graph B: Slope m = 2, y-intercept (0, 1)',
      },
      {
        id: 'graph-C',
        graphId: 'graph-C',
        slope: -2,
        yIntercept: 1,
        equation: 'y = -2x + 1',
        points: [
          { x: -1, y: 3 },
          { x: 0, y: 1 },
          { x: 1, y: -1 },
          { x: 2, y: -3 },
        ],
        description: 'Graph C: Slope m = -2, y-intercept (0, 1)',
      },
      {
        id: 'graph-D',
        graphId: 'graph-D',
        slope: 0.5,
        yIntercept: -2,
        equation: 'y = (1/2)x - 2',
        points: [
          { x: -2, y: -3 },
          { x: 0, y: -2 },
          { x: 2, y: -1 },
          { x: 4, y: 0 },
        ],
        description: 'Graph D: Slope m = 1/2, y-intercept (0, -2)',
      },
    ],
    solutionExplanation:
      '• Graph A matches y = -2x - 3: Falls steeply with negative slope m = -2 and crosses the y-axis below the origin at (0, -3).\n• Graph B matches y = 2x + 1: Rises steeply with positive slope m = 2 and crosses the y-axis above the origin at (0, 1).\n• Graph C matches y = -2x + 1: Falls steeply with negative slope m = -2 and crosses the y-axis above the origin at (0, 1).\n• Graph D matches y = (1/2)x - 2: Rises gently with positive slope m = 1/2 and crosses the y-axis below the origin at (0, -2).',
    keyTakeaway:
      'Check both features systematically: 1) Does the line go up or down? (sign of m), 2) Where does it cross the vertical axis? (b).',
  },

  // ==========================================
  // QUESTION 11: Error Analysis Multiple Select
  // ==========================================
  {
    id: 'u3-dstaar-11',
    number: 11,
    type: 'error-analysis',
    typeLabel: 'Error Analysis (Multiple Select)',
    teks: 'TEKS 8.4A & 8.4C',
    topic: 'Identifying Slope Misconceptions',
    prompt:
      'A student was assigned to calculate the slope of the line passing through coordinates A(2, 7) and B(6, 1). Examine the student’s written work below. Which TWO statements accurately identify the error and explain the correct mathematical reasoning? (Select exactly TWO choices.)',
    problemContext:
      'Student Work for Finding the Slope Between A(2, 7) and B(6, 1):',
    givenPoints: 'Point A(2, 7) and Point B(6, 1)',
    studentWorkSteps: [
      {
        step: 'Step 1',
        math: 'm = (6 - 2) / (1 - 7)',
      },
      {
        step: 'Step 2',
        math: 'm = 4 / (-6)',
      },
      {
        step: 'Step 3',
        math: 'm = -2/3',
      },
    ],
    options: [
      {
        id: 'err-A',
        label: 'A',
        text: 'The student inverted the ratio by placing the change in x in the numerator and the change in y in the denominator (Δx / Δy instead of Δy / Δx).',
        isCorrect: true,
        distractorType:
          'Accurately diagnoses the primary misconception of run over rise.',
      },
      {
        id: 'err-B',
        label: 'B',
        text: 'The student made an arithmetic sign error in Step 2 because 1 - 7 should equal +6.',
        isCorrect: false,
        distractorType: 'Distractor: 1 - 7 is indeed -6; this is not the error.',
      },
      {
        id: 'err-C',
        label: 'C',
        text: 'The correct calculation is m = (1 - 7) / (6 - 2) = -6 / 4 = -3/2.',
        isCorrect: true,
        distractorType: 'Provides the mathematically sound correction.',
      },
      {
        id: 'err-D',
        label: 'D',
        text: 'The slope must be positive because both given coordinate points lie in Quadrant I with positive coordinates.',
        isCorrect: false,
        distractorType:
          'Distractor: Common misconception that positive coordinates require positive slopes.',
      },
      {
        id: 'err-E',
        label: 'E',
        text: 'The student should have added the coordinates together instead of subtracting them.',
        isCorrect: false,
        distractorType:
          'Distractor: Slope requires the difference between coordinates, not sum.',
      },
    ],
    solutionExplanation:
      '1. In Step 1, the student placed (6 - 2) in the numerator. But 6 and 2 are the x-coordinates (Δx). The student placed (1 - 7) in the denominator, which are the y-coordinates (Δy). This produced Δx / Δy (run / rise) rather than Δy / Δx (rise / run). Statement A correctly identifies this error.\n2. The correct formula is m = (y₂ - y₁) / (x₂ - x₁) = (1 - 7) / (6 - 2) = -6 / 4 = -3/2. Statement C correctly shows this calculation.\n3. Note: Even though both points have positive coordinates, as x increases from 2 to 6, y decreases from 7 to 1, creating a downward line with negative slope -3/2.',
    keyTakeaway:
      'Always remember: "y goes high, x goes low". Rise (change in y) is always in the numerator, and run (change in x) is always in the denominator.',
  },

  // ==========================================
  // QUESTION 12: Synthesis Challenge (3 Companies)
  // ==========================================
  {
    id: 'u3-dstaar-12',
    number: 12,
    type: 'synthesis-challenge',
    typeLabel: 'Synthesis Challenge',
    teks: 'TEKS 8.4C & 8.5I',
    topic: 'Multi-Representation Synthesis',
    prompt:
      'Three landscaping businesses offer residential yard care with different pricing structures shown via an equation, a table, and a graph. Compare the rates of change and initial consultation fees to answer the synthesis questions.',
    scenario:
      'Synthesize linear functions across three distinct representations to identify extreme rates, minimum fees, and optimal customer cost.',
    company1: {
      name: 'CleanCut Yards',
      representationType: 'Equation',
      expression: 'C = 25h + 20',
      rate: 25, // $25/hr
      fee: 20, // $20
    },
    company2: {
      name: 'GreenThumb Pros',
      representationType: 'Table',
      headers: ['Hours, h', 'Total Cost, C ($)'],
      rows: [
        { x: 1, y: 55 },
        { x: 3, y: 95 },
        { x: 5, y: 135 },
      ],
      rate: 20, // (95 - 55) / 2 = $20/hr
      fee: 35, // 55 - 20(1) = $35
    },
    company3: {
      name: 'EcoMow Express',
      representationType: 'Graph',
      points: [
        { x: 0, y: 10 },
        { x: 2, y: 70 },
        { x: 4, y: 130 },
      ],
      rate: 30, // (70 - 10) / 2 = $30/hr
      fee: 10, // $10
    },
    task1Prompt:
      '1. Which company charges the HIGHEST hourly rate of change (steepest slope m)?',
    task1Options: [
      'EcoMow Express ($30/hr)',
      'CleanCut Yards ($25/hr)',
      'GreenThumb Pros ($20/hr)',
    ],
    task1Correct: 'EcoMow Express ($30/hr)',
    task2Prompt:
      '2. Which company charges the LOWEST initial consultation fee (smallest y-intercept b)?',
    task2Options: [
      'EcoMow Express ($10 initial fee)',
      'CleanCut Yards ($20 initial fee)',
      'GreenThumb Pros ($35 initial fee)',
    ],
    task2Correct: 'EcoMow Express ($10 initial fee)',
    task3Prompt:
      '3. For a comprehensive 4-hour yard renovation, which company offers the LOWEST total cost?',
    task3Options: [
      'GreenThumb Pros ($115 total)',
      'CleanCut Yards ($120 total)',
      'EcoMow Express ($130 total)',
    ],
    task3Correct: 'GreenThumb Pros ($115 total)',
    solutionExplanation:
      'Analyze each company’s parameters:\n• CleanCut Yards (Equation): C = 25h + 20. Rate m = $25/hr; Initial fee b = $20.\n• GreenThumb Pros (Table): Rate m = (95 - 55) / (3 - 1) = 40 / 2 = $20/hr. Initial fee b = 55 - 20(1) = $35. Equation: C = 20h + 35.\n• EcoMow Express (Graph): Initial fee b = $10 (y-intercept). Rate m = (70 - 10) / 2 = $30/hr. Equation: C = 30h + 10.\n\nEvaluation:\n1. Highest hourly rate is EcoMow Express at $30/hr (vs. $25/hr and $20/hr).\n2. Lowest initial fee is EcoMow Express at $10 (vs. $20 and $35).\n3. Total cost for h = 4 hours:\n• CleanCut: C = 25(4) + 20 = 100 + 20 = $120.\n• GreenThumb: C = 20(4) + 35 = 80 + 35 = $115.\n• EcoMow: C = 30(4) + 10 = 120 + 10 = $130.\nGreenThumb Pros provides the lowest total cost of $115 despite its higher upfront fee because its hourly rate of change ($20/hr) is the lowest.',
    keyTakeaway:
      'Synthesis requires computing both rate (slope) and initial value (y-intercept) across all formats, then evaluating C = mh + b for the specified independent variable value.',
  },
];
