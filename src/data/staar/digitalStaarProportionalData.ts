// src/data/staar/digitalStaarProportionalData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 2: Proportional vs. Non-Proportional Relationships
// 100% Client-side local data. Zero runtime API calls.

export type Unit2InteractionType =
  | 'drag-drop-equation'
  | 'graph-hot-spot'
  | 'inline-choice'
  | 'table-grid'
  | 'numeric-entry'
  | 'selected-response'
  | 'multi-part'
  | 'multiple-select'
  | 'graphing'
  | 'classification';

export interface BaseQuestion {
  id: string;
  number: number;
  type: Unit2InteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Drag & Drop Equation Builder
export interface Q1DragDropEquation extends BaseQuestion {
  type: 'drag-drop-equation';
  scenario: string;
  templatePrefix: string;
  templateSuffix: string;
  draggableOptions: string[];
  correctDrop: string;
}

// Q2: Graph Hot Spot Point Selection
export interface GraphPointHotSpot {
  id: string;
  label: string;
  x: number;
  y: number;
  isCorrect: boolean;
  description: string;
  misconceptionReason: string;
}

export interface Q2GraphHotSpot extends BaseQuestion {
  type: 'graph-hot-spot';
  scenario: string;
  xLabel: string;
  yLabel: string;
  xMax: number;
  yMax: number;
  xStep: number;
  yStep: number;
  lineSlope: number;
  points: GraphPointHotSpot[];
}

// Q3: Table Analysis & Inline Choice
export interface TableRowData {
  x: number | string;
  y: number | string;
}

export interface Q3TableInlineChoice extends BaseQuestion {
  type: 'inline-choice';
  table1Title: string;
  table1XLabel: string;
  table1YLabel: string;
  table1Rows: TableRowData[];
  table2Title: string;
  table2XLabel: string;
  table2YLabel: string;
  table2Rows: TableRowData[];
  statement1Prefix: string;
  dropdown1Options: string[];
  correct1: string;
  statement2Prefix: string;
  dropdown2Options: string[];
  correct2: string;
}

// Q4: Match / Table Grid
export interface TableGridRowUnit2 {
  id: string;
  equation: string;
  correctCategory: 'proportional' | 'non-proportional';
  explanationNote: string;
}

export interface Q4TableGridUnit2 extends BaseQuestion {
  type: 'table-grid';
  instruction: string;
  categories: { id: 'proportional' | 'non-proportional'; label: string }[];
  rows: TableGridRowUnit2[];
}

// Q5: Numeric Entry Direct Variation
export interface Q5NumericEntryUnit2 extends BaseQuestion {
  type: 'numeric-entry';
  context: string;
  input1Label: string;
  input2Label: string;
  acceptedAnswers1: string[];
  acceptedAnswers2: string[];
  unit1: string;
  unit2: string;
}

// Q6: Multiple Choice Comparison with Graph
export interface Q6SelectedResponseUnit2 extends BaseQuestion {
  type: 'selected-response';
  scenario: string;
  xLabel: string;
  yLabel: string;
  xMax: number;
  yMax: number;
  lines: {
    name: string;
    slope: number;
    color: string;
    points: { x: number; y: number; label: string }[];
  }[];
  options: {
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
    misconception: string;
  }[];
}

// Q7: Multi-Part Linear Scenario
export interface Q7MultiPartUnit2 extends BaseQuestion {
  type: 'multi-part';
  scenario: string;
  partA: {
    prompt: string;
    dropdownOptions: string[];
    correct: string;
    explanation: string;
  };
  partB: {
    prompt: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    explanation: string;
  };
}

// Q8: Multiple Select
export interface Q8MultipleSelectUnit2 extends BaseQuestion {
  type: 'multiple-select';
  scenario: string;
  instruction: string;
  options: { id: string; text: string; isCorrect: boolean; misconception?: string }[];
}

// Q9: Interactive Graphing
export interface Q9GraphingUnit2 extends BaseQuestion {
  type: 'graphing';
  scenario: string;
  equationRule: string;
  xLabel: string;
  yLabel: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep: number;
  yStep: number;
  targetPoints: { x: number; y: number; label: string }[];
}

// Q10: Drag-and-Drop Classification
export interface ClassificationCardUnit2 {
  id: string;
  situation: string;
  mathModel: string;
  correctCategory: 'proportional' | 'non-proportional';
}

export interface Q10ClassificationUnit2 extends BaseQuestion {
  type: 'classification';
  instruction: string;
  categories: {
    id: 'proportional' | 'non-proportional';
    title: string;
    subtitle: string;
  }[];
  cards: ClassificationCardUnit2[];
}

// Q11: Multiple Select Non-Proportional
export interface Q11MultipleSelectUnit2 extends BaseQuestion {
  type: 'multiple-select';
  scenario: string;
  instruction: string;
  options: { id: string; text: string; isCorrect: boolean; misconception?: string }[];
}

// Q12: Advanced Inline Choice
export interface Q12InlineChoiceUnit2 extends BaseQuestion {
  type: 'inline-choice';
  company1Desc: string;
  company2Desc: string;
  company2Rows: { x: number; y: number }[];
  company3Desc: string;
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

export type Unit2DigitalStaarQuestion =
  | Q1DragDropEquation
  | Q2GraphHotSpot
  | Q3TableInlineChoice
  | Q4TableGridUnit2
  | Q5NumericEntryUnit2
  | Q6SelectedResponseUnit2
  | Q7MultiPartUnit2
  | Q8MultipleSelectUnit2
  | Q9GraphingUnit2
  | Q10ClassificationUnit2
  | Q11MultipleSelectUnit2
  | Q12InlineChoiceUnit2;

export const UNIT_2_DIGITAL_STAAR_QUESTIONS: Unit2DigitalStaarQuestion[] = [
  // Q1: Drag & Drop Equation Builder
  {
    id: 'u2-dstaar-1',
    number: 1,
    type: 'drag-drop-equation',
    typeLabel: 'Drag & Drop Equation',
    teks: 'TEKS 8.5A',
    topic: 'Constant of Proportionality & Equations',
    prompt:
      'A commercial bakery mixes sugar and flour in a constant proportional relationship. For every 3 pounds of sugar, the bakery uses 12 pounds of flour. Let x represent the number of pounds of sugar, and let y represent the number of pounds of flour.',
    scenario: 'Drag the correct numerical value into the box to complete the equation y = [  ]x.',
    templatePrefix: 'y =',
    templateSuffix: 'x',
    draggableOptions: ['0.25', '3', '4', '9', '12', '15'],
    correctDrop: '4',
    keyTakeaway:
      'In any proportional relationship y = kx, the constant of proportionality is calculated by k = y/x = 12 / 3 = 4.',
    solutionExplanation:
      'In a proportional relationship, the ratio between y and x is constant: k = y / x. Substituting the given values gives k = 12 pounds of flour / 3 pounds of sugar = 4 pounds of flour per pound of sugar. Substituting k = 4 into the general proportional equation y = kx yields y = 4x.',
  },

  // Q2: Graph Hot Spot Point Selection
  {
    id: 'u2-dstaar-2',
    number: 2,
    type: 'graph-hot-spot',
    typeLabel: 'Interactive Coordinate Graph',
    teks: 'TEKS 8.4B',
    topic: 'Unit Rate as Slope on a Graph',
    prompt:
      'A remote-controlled drone ascends at a constant proportional speed of 6 meters per second. The coordinate grid shows the relationship between time in seconds, x, and altitude in meters, y.',
    scenario:
      'Select the plotted point on the graph that directly identifies the unit rate of ascent (the altitude gained in exactly 1 second).',
    xLabel: 'Time (seconds)',
    yLabel: 'Altitude (meters)',
    xMax: 5,
    yMax: 30,
    xStep: 1,
    yStep: 6,
    lineSlope: 6,
    points: [
      {
        id: 'pt-A',
        label: 'Point A (0, 0)',
        x: 0,
        y: 0,
        isCorrect: false,
        description: 'The origin (0, 0) confirms proportionality, but it does not specify the unit rate.',
        misconceptionReason: 'The origin indicates 0 seconds and 0 meters, not the rate per 1 second.',
      },
      {
        id: 'pt-B',
        label: 'Point B (1, 6)',
        x: 1,
        y: 6,
        isCorrect: true,
        description: 'Correct! At x = 1 second, y = 6 meters, directly showing the unit rate of 6 m/s.',
        misconceptionReason: '',
      },
      {
        id: 'pt-C',
        label: 'Point C (2, 12)',
        x: 2,
        y: 12,
        isCorrect: false,
        description: 'Point C shows 12 meters in 2 seconds, which is a multiple of the unit rate, not the unit rate itself.',
        misconceptionReason: 'The unit rate is specifically the y-value when x = 1.',
      },
      {
        id: 'pt-D',
        label: 'Point D (3, 18)',
        x: 3,
        y: 18,
        isCorrect: false,
        description: 'Point D shows 18 meters in 3 seconds, which simplifies to the unit rate but is not the point (1, k).',
        misconceptionReason: 'Point (1, k) is the standard graphical representation of unit rate.',
      },
    ],
    keyTakeaway:
      'On the graph of a proportional relationship y = kx, the point (1, k) directly identifies the unit rate.',
    solutionExplanation:
      'In a proportional linear relationship, the unit rate is the value of y when x = 1, represented by the ordered pair (1, k). Because the drone ascends at 6 meters each second, at x = 1 second, y = 6 meters. Therefore, Point B at coordinates (1, 6) directly represents the unit rate of ascent.',
  },

  // Q3: Table Analysis & Inline Choice
  {
    id: 'u2-dstaar-3',
    number: 3,
    type: 'inline-choice',
    typeLabel: 'Table Analysis & Inline Choice',
    teks: 'TEKS 8.5F',
    topic: 'Identifying Proportionality in Tables',
    prompt:
      'Two different vehicle rental companies offer rates shown in the tables below. Analyze whether each table represents a proportional relationship between time and total cost.',
    table1Title: 'Table 1: EcoRide Car Rental',
    table1XLabel: 'Time (days), x',
    table1YLabel: 'Total Cost ($), y',
    table1Rows: [
      { x: 1, y: 45 },
      { x: 2, y: 70 },
      { x: 3, y: 95 },
      { x: 4, y: 120 },
    ],
    table2Title: 'Table 2: CitySpin Bike Rental',
    table2XLabel: 'Time (hours), x',
    table2YLabel: 'Total Cost ($), y',
    table2Rows: [
      { x: 2, y: 16 },
      { x: 4, y: 32 },
      { x: 6, y: 48 },
      { x: 8, y: 64 },
    ],
    statement1Prefix: 'The table that represents a PROPORTIONAL relationship is',
    dropdown1Options: [
      'Select a table...',
      'Table 1 (EcoRide)',
      'Table 2 (CitySpin)',
      'Both Table 1 and Table 2',
      'Neither table',
    ],
    correct1: 'Table 2 (CitySpin)',
    statement2Prefix: 'This table is proportional because',
    dropdown2Options: [
      'Select reasoning...',
      'the ratio y/x is constant for all pairs (k = 8) and passes through (0, 0)',
      'the y-values increase by a constant addition of 25 each day',
      'the cost is always an even number',
      'it has a non-zero starting fee',
    ],
    correct2: 'the ratio y/x is constant for all pairs (k = 8) and passes through (0, 0)',
    keyTakeaway:
      'A table represents a proportional relationship if and only if the ratio y/x is constant across all entries and passes through (0,0).',
    solutionExplanation:
      'For Table 1 (EcoRide), calculate y/x: 45/1 = 45, 70/2 = 35, 95/3 ≈ 31.7. Because y/x is NOT constant (there is a $20 initial fee: y = 25x + 20), Table 1 is non-proportional. For Table 2 (CitySpin), calculate y/x: 16/2 = 8, 32/4 = 8, 48/6 = 8, 64/8 = 8. The quotient y/x is constant at k = 8, and for 0 hours the cost is $0. Thus, Table 2 represents a proportional relationship.',
  },

  // Q4: Match / Table Grid
  {
    id: 'u2-dstaar-4',
    number: 4,
    type: 'table-grid',
    typeLabel: 'Match / Table Grid',
    teks: 'TEKS 8.5F',
    topic: 'Classifying Linear Equations',
    prompt:
      'Determine whether each linear equation models a proportional relationship or a non-proportional relationship.',
    instruction: 'Select one category for each row in the table.',
    categories: [
      { id: 'proportional', label: 'Proportional (y = kx)' },
      { id: 'non-proportional', label: 'Non-Proportional (y = mx + b, b ≠ 0)' },
    ],
    rows: [
      {
        id: 'eq-1',
        equation: 'y = 4.25x',
        correctCategory: 'proportional',
        explanationNote: 'Direct variation in the form y = kx with y-intercept b = 0.',
      },
      {
        id: 'eq-2',
        equation: 'y = 3x - 7',
        correctCategory: 'non-proportional',
        explanationNote: 'Linear equation with a non-zero y-intercept (b = -7).',
      },
      {
        id: 'eq-3',
        equation: 'y = (2/3)x',
        correctCategory: 'proportional',
        explanationNote: 'Direct variation with constant k = 2/3 and b = 0.',
      },
      {
        id: 'eq-4',
        equation: 'y = 8 + 1.5x',
        correctCategory: 'non-proportional',
        explanationNote: 'Linear equation with a non-zero y-intercept (b = 8).',
      },
    ],
    keyTakeaway:
      'Equations in the form y = kx (with b = 0) are proportional; equations with b ≠ 0 are non-proportional.',
    solutionExplanation:
      'A linear relationship is proportional if and only if it can be written as y = kx, which has a y-intercept of 0 and passes through the origin (0, 0). The equations y = 4.25x and y = (2/3)x fit this form. The equations y = 3x - 7 (b = -7) and y = 8 + 1.5x (b = 8) have non-zero y-intercepts and therefore represent non-proportional relationships.',
  },

  // Q5: Numeric Entry Direct Variation
  {
    id: 'u2-dstaar-5',
    number: 5,
    type: 'numeric-entry',
    typeLabel: 'Numeric Response',
    teks: 'TEKS 8.5E',
    topic: 'Direct Variation Problems',
    prompt:
      'In a physics lab, the distance a hanging coil spring stretches varies directly with the mass attached to it. When a mass of 12 grams is attached to the spring, the spring stretches 30 centimeters.',
    context:
      'Enter the constant of proportionality, then use it to find the stretch for a 28-gram mass.',
    input1Label: 'Constant of proportionality, k (in centimeters per gram):',
    input2Label: 'Stretch in centimeters when a mass of 28 grams is attached:',
    acceptedAnswers1: ['2.5', '2.50', '5/2'],
    acceptedAnswers2: ['70', '70.0', '70.00'],
    unit1: 'cm/g',
    unit2: 'cm',
    keyTakeaway:
      'In direct variation y = kx, first determine k = y/x, then substitute the new x to solve for y.',
    solutionExplanation:
      'Because stretch varies directly with mass, y = kx. Step 1: Calculate the constant of proportionality k = y / x = 30 cm / 12 g = 2.5 cm per gram. Step 2: Calculate the stretch for 28 grams: y = 2.5 × 28 = 70 centimeters.',
  },

  // Q6: Multiple Choice Comparison with Graph
  {
    id: 'u2-dstaar-6',
    number: 6,
    type: 'selected-response',
    typeLabel: 'Multiple Choice with Graph',
    teks: 'TEKS 8.4B',
    topic: 'Comparing Rates of Change & Steepness',
    prompt:
      'The coordinate grid displays the distances traveled over time by two runners, Jordan (Line J) and Marcus (Line M), during their endurance training. Both runners maintain constant proportional speeds.',
    scenario:
      'Which statement accurately compares the unit rates (speeds) of the two runners?',
    xLabel: 'Time (seconds)',
    yLabel: 'Distance (meters)',
    xMax: 8,
    yMax: 40,
    lines: [
      {
        name: 'Jordan (Line J)',
        slope: 5,
        color: 'cyan',
        points: [
          { x: 0, y: 0, label: '(0, 0)' },
          { x: 2, y: 10, label: '(2, 10)' },
          { x: 4, y: 20, label: '(4, 20)' },
          { x: 6, y: 30, label: '(6, 30)' },
        ],
      },
      {
        name: 'Marcus (Line M)',
        slope: 3,
        color: 'indigo',
        points: [
          { x: 0, y: 0, label: '(0, 0)' },
          { x: 3, y: 9, label: '(3, 9)' },
          { x: 6, y: 18, label: '(6, 18)' },
        ],
      },
    ],
    options: [
      {
        id: 'opt-1',
        label: 'A',
        text: "Jordan's unit rate is 2 meters per second greater than Marcus's because Jordan runs at 5 meters per second (Line J) and Marcus runs at 3 meters per second (Line M).",
        isCorrect: true,
        misconception: '',
      },
      {
        id: 'opt-2',
        label: 'B',
        text: "Marcus's unit rate is 2 meters per second greater than Jordan's because Marcus runs at 5 meters per second and Jordan runs at 3 meters per second.",
        isCorrect: false,
        misconception: 'Swapped runners: Line J (Jordan) has a unit rate of 5 m/s, which is greater than Line M (Marcus) at 3 m/s.',
      },
      {
        id: 'opt-3',
        label: 'C',
        text: 'Jordan and Marcus have the same unit rate because both lines pass through the origin (0, 0).',
        isCorrect: false,
        misconception: 'Passing through (0, 0) confirms both relationships are proportional, but equal unit rates require equal slopes.',
      },
      {
        id: 'opt-4',
        label: 'D',
        text: "Marcus's unit rate is 2 meters per second greater than Jordan's because a line with a shallower slope represents greater speed.",
        isCorrect: false,
        misconception: 'A steeper slope in a distance-time graph represents greater speed (unit rate), not a shallower slope.',
      },
    ],
    keyTakeaway:
      'In a distance-time graph, the slope represents the unit rate (speed). A steeper line indicates a greater unit rate.',
    solutionExplanation:
      'The unit rate is the slope of each line: Jordan’s rate is k = 10 / 2 = 5 meters per second. Marcus’s rate is k = 9 / 3 = 3 meters per second. Subtracting Marcus’s rate from Jordan’s rate gives 5 - 3 = 2 meters per second. Because Line J is steeper than Line M, Jordan runs 2 m/s faster than Marcus.',
  },

  // Q7: Multi-Part Linear Scenario
  {
    id: 'u2-dstaar-7',
    number: 7,
    type: 'multi-part',
    typeLabel: 'Multi-Part Analysis',
    teks: 'TEKS 8.5B',
    topic: 'Verbal Scenarios & Non-Proportional Linear Models',
    prompt:
      'A municipal swimming pool contains 450,000 gallons of water. At the end of the summer season, the pool is drained at a constant rate of 15,000 gallons per hour. Let h represent the number of hours the pool has been draining, and let g represent the gallons of water remaining in the pool.',
    scenario: 'Answer both Part A and Part B below.',
    partA: {
      prompt: 'Which equation correctly models the relationship between hours of draining, h, and gallons remaining, g?',
      dropdownOptions: [
        'Select equation...',
        'g = 450,000 - 15,000h',
        'g = 15,000h',
        'g = 450,000h - 15,000',
        'g = 450,000 + 15,000h',
      ],
      correct: 'g = 450,000 - 15,000h',
      explanation:
        'The pool starts at 450,000 gallons and decreases by 15,000 gallons each hour: g = 450,000 - 15,000h.',
    },
    partB: {
      prompt: 'Is this linear relationship proportional or non-proportional, and what is the mathematical justification?',
      options: [
        {
          id: 'opt-b-1',
          text: 'Non-proportional, because when h = 0 hours, g = 450,000 gallons (the graph has a non-zero y-intercept of 450,000).',
          isCorrect: true,
        },
        {
          id: 'opt-b-2',
          text: 'Proportional, because the water drains at a steady, constant rate of 15,000 gallons per hour.',
          isCorrect: false,
        },
        {
          id: 'opt-b-3',
          text: 'Proportional, because any linear relationship is automatically proportional.',
          isCorrect: false,
        },
        {
          id: 'opt-b-4',
          text: 'Non-proportional, because the pool will eventually become empty.',
          isCorrect: false,
        },
      ],
      explanation:
        'A relationship is proportional only if it passes through (0, 0). Because the starting amount is 450,000 (b ≠ 0), the relationship is non-proportional.',
    },
    keyTakeaway:
      'Even if a relationship has a constant rate of change, it is non-proportional if the initial value (y-intercept) is not 0.',
    solutionExplanation:
      'Part A: The pool starts with an initial volume of 450,000 gallons and loses 15,000 gallons per hour, which gives g = 450,000 - 15,000h. Part B: To be proportional, a relationship must pass through (0, 0). Here, when h = 0 hours, g = 450,000 gallons ≠ 0. Because the y-intercept is non-zero, this relationship is non-proportional.',
  },

  // Q8: Multiple Select
  {
    id: 'u2-dstaar-8',
    number: 8,
    type: 'multiple-select',
    typeLabel: 'Multiple Select (Checkboxes)',
    teks: 'TEKS 8.5F',
    topic: 'Fundamental Characteristics of Proportional Relationships',
    prompt:
      'An eighth-grade algebra class is studying characteristics of linear functions. Consider any proportional relationship modeled by y = kx, where k is a non-zero constant.',
    scenario:
      'Select TWO statements that are always TRUE regarding any proportional linear relationship.',
    instruction: 'Select exactly TWO correct options.',
    options: [
      {
        id: 'opt-1',
        text: 'The graph of the relationship must be a straight line that passes directly through the origin (0, 0).',
        isCorrect: true,
        misconception: 'Correct! Every proportional graph must pass through (0, 0).',
      },
      {
        id: 'opt-2',
        text: 'The graph always has a non-zero vertical y-intercept located at (0, k).',
        isCorrect: false,
        misconception: 'The y-intercept of a proportional relationship is always (0, 0), not (0, k).',
      },
      {
        id: 'opt-3',
        text: 'The y-values must always be positive whole numbers for all possible x-values.',
        isCorrect: false,
        misconception: 'Proportional relationships can include negative numbers, fractions, and decimals.',
      },
      {
        id: 'opt-4',
        text: 'The ratio y/x is constant for every ordered pair where x ≠ 0, and this ratio equals the slope k.',
        isCorrect: true,
        misconception: 'Correct! In y = kx, y/x = k for all non-zero pairs.',
      },
      {
        id: 'opt-5',
        text: 'The relationship can always be modeled by an equation in the form y = mx + b, where b > 0.',
        isCorrect: false,
        misconception: 'If b > 0, the relationship is non-proportional. For proportional relationships, b must equal 0.',
      },
    ],
    keyTakeaway:
      'Proportional relationships pass through (0,0) and have a constant ratio y/x = k for all points.',
    solutionExplanation:
      'A proportional relationship is defined by two fundamental properties: (1) Its graph is a straight line that passes through the origin (0, 0), meaning when x = 0, y = 0. (2) The quotient y/x is identical for all non-zero ordered pairs and equals the constant rate of change k (y/x = k). Statements B, C, and E are false because the y-intercept is (0, 0), values can be non-integers, and b must equal 0.',
  },

  // Q9: Interactive Graphing
  {
    id: 'u2-dstaar-9',
    number: 9,
    type: 'graphing',
    typeLabel: 'Interactive Coordinate Graphing',
    teks: 'TEKS 8.5A',
    topic: 'Plotting Points on a Proportional Line',
    prompt:
      'A commercial 3D printer creates miniature gear components at a constant proportional rate modeled by the equation y = 2.5x, where x represents printing time in hours and y represents the total number of gears produced.',
    scenario:
      'Plot TWO points on the grid that lie on this proportional line: (1) The point representing 0 hours, and (2) The point representing 4 hours of printing.',
    equationRule: 'y = 2.5x',
    xLabel: 'Time (hours)',
    yLabel: 'Gears Produced',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 15,
    xStep: 1,
    yStep: 2.5,
    targetPoints: [
      { x: 0, y: 0, label: '(0, 0)' },
      { x: 4, y: 10, label: '(4, 10)' },
    ],
    keyTakeaway:
      'To graph y = kx, plot (0, 0) and substitute an x-value to find a second point (x, kx).',
    solutionExplanation:
      'For the proportional equation y = 2.5x: (1) At x = 0 hours, y = 2.5(0) = 0 gears, giving the origin point (0, 0). (2) At x = 4 hours, y = 2.5(4) = 10 gears, giving the point (4, 10). Connecting these two points produces the proportional ray representing the printer’s output.',
  },

  // Q10: Drag-and-Drop Classification
  {
    id: 'u2-dstaar-10',
    number: 10,
    type: 'classification',
    typeLabel: 'Drag & Drop Classification',
    teks: 'TEKS 8.5F',
    topic: 'Classifying Real-World Verbal Situations',
    prompt:
      'Classify each real-world verbal situation as either representing a Proportional relationship or a Non-Proportional relationship.',
    instruction: 'Drag or tap each situation card into the correct category container.',
    categories: [
      {
        id: 'proportional',
        title: 'Proportional Relationships',
        subtitle: 'y = kx · Passes through (0, 0) · No initial flat fee',
      },
      {
        id: 'non-proportional',
        title: 'Non-Proportional Relationships',
        subtitle: 'y = mx + b (b ≠ 0) · Does not pass through (0, 0) · Has initial fee',
      },
    ],
    cards: [
      {
        id: 'card-1',
        situation: 'A cellular plan charges a flat $15 administrative fee plus $10 per gigabyte of high-speed data used.',
        mathModel: 'y = 10x + 15 (Initial fee = $15)',
        correctCategory: 'non-proportional',
      },
      {
        id: 'card-2',
        situation: 'A farmer’s market charges $2.75 per pound of organic honeycrisp apples with no entry fee.',
        mathModel: 'y = 2.75x (k = 2.75, b = 0)',
        correctCategory: 'proportional',
      },
      {
        id: 'card-3',
        situation: 'A car rental company charges $40 per day plus an upfront reservation fee of $25.',
        mathModel: 'y = 40x + 25 (Initial fee = $25)',
        correctCategory: 'non-proportional',
      },
      {
        id: 'card-4',
        situation: 'A communications satellite travels through orbit at a steady speed of 17,500 miles per hour.',
        mathModel: 'y = 17,500x (k = 17,500, b = 0)',
        correctCategory: 'proportional',
      },
    ],
    keyTakeaway:
      'Situations with an initial fee or non-zero starting value are non-proportional; situations with a constant rate and zero initial fee are proportional.',
    solutionExplanation:
      'Proportional relationships have no initial fee or starting constant (when x = 0, y = 0). The apple purchase ($2.75/lb) and satellite orbit (17,500 mph) both start at 0 and have constant ratios, making them proportional. The cellular plan ($15 fee) and car rental ($25 fee) include initial non-zero constants (y-intercepts), making them non-proportional.',
  },

  // Q11: Multiple Select Non-Proportional
  {
    id: 'u2-dstaar-11',
    number: 11,
    type: 'multiple-select',
    typeLabel: 'Multiple Select (Non-Proportional Items)',
    teks: 'TEKS 8.5B',
    topic: 'Identifying Non-Proportional Representations',
    prompt:
      'A math teacher displays five mathematical representations on the board and asks students to identify those that describe NON-PROPORTIONAL linear relationships.',
    scenario:
      'Select TWO representations that describe a NON-PROPORTIONAL linear relationship.',
    instruction: 'Select exactly TWO correct options.',
    options: [
      {
        id: 'opt-1',
        text: 'A taxi service that charges an initial $3.50 pickup fee plus $2.00 for every mile traveled.',
        isCorrect: true,
        misconception: 'Correct! The $3.50 pickup fee creates a non-zero y-intercept: y = 2x + 3.50.',
      },
      {
        id: 'opt-2',
        text: 'A coordinate table with the ordered pairs (2, 10), (4, 20), (6, 30), and (8, 40).',
        isCorrect: false,
        misconception: 'This table has a constant ratio y/x = 5 and passes through (0, 0), so it is proportional.',
      },
      {
        id: 'opt-3',
        text: 'A coordinate graph of a straight line passing through the points (0, 0) and (5, 25).',
        isCorrect: false,
        misconception: 'A line passing through (0, 0) with a constant rate of change is proportional.',
      },
      {
        id: 'opt-4',
        text: 'The linear equation y = -3x + 8.',
        isCorrect: true,
        misconception: 'Correct! The y-intercept is b = 8 ≠ 0, so the equation is non-proportional.',
      },
      {
        id: 'opt-5',
        text: 'A recipe that uses 1.5 cups of milk for every cup of flour.',
        isCorrect: false,
        misconception: 'This represents direct variation y = 1.5x with b = 0, which is proportional.',
      },
    ],
    keyTakeaway:
      'Non-proportional linear representations have a non-zero y-intercept or initial value (b ≠ 0).',
    solutionExplanation:
      'Option A describes a relationship with a non-zero initial fee of $3.50 (y = 2x + 3.50), meaning at 0 miles the cost is $3.50 ≠ 0. Option D is an equation with y-intercept b = 8 (y = -3x + 8), which does not pass through the origin. Both describe non-proportional linear relationships. Options B, C, and E all have a constant ratio y/x and pass through (0, 0), making them proportional.',
  },

  // Q12: Advanced Inline Choice
  {
    id: 'u2-dstaar-12',
    number: 12,
    type: 'inline-choice',
    typeLabel: 'Multi-Representation Synthesis',
    teks: 'TEKS 8.4C',
    topic: 'Comparing Proportional Rates Across Representations',
    prompt:
      'Three catering companies charge for event service based on the number of guests, x, and the total cost in dollars, y. Each company’s pricing structure is shown in a different mathematical representation below.',
    company1Desc: 'Company 1 (Equation): y = 22x',
    company2Desc: 'Company 2 (Table):',
    company2Rows: [
      { x: 10, y: 260 },
      { x: 20, y: 520 },
      { x: 30, y: 780 },
    ],
    company3Desc: 'Company 3 (Graph): A straight line passing through the origin (0, 0) and the point (5, 120).',
    statement1Prefix: 'The catering company with the LEAST expensive unit rate per guest is',
    dropdown1Options: [
      'Select company...',
      'Company 1 ($22 per guest)',
      'Company 2 ($26 per guest)',
      'Company 3 ($24 per guest)',
    ],
    correct1: 'Company 1 ($22 per guest)',
    statement2Prefix: 'All three catering company pricing models are',
    dropdown2Options: [
      'Select classification...',
      'all proportional',
      'all non-proportional',
      'some proportional and some non-proportional',
    ],
    correct2: 'all proportional',
    statement3Prefix: 'Because each model',
    dropdown3Options: [
      'Select mathematical justification...',
      'has a constant unit rate (y/x) and passes through the origin (0, 0)',
      'charges more than $20 per guest',
      'has a non-zero initial equipment fee',
      'has a negative rate of change',
    ],
    correct3: 'has a constant unit rate (y/x) and passes through the origin (0, 0)',
    keyTakeaway:
      'Unit rates from equations (y = kx), tables (k = y/x), and graphs (slope through origin) can be directly compared.',
    solutionExplanation:
      'Step 1: Determine each company’s unit rate: Company 1 has k = $22/guest from y = 22x. Company 2 has k = 260/10 = $26/guest from the table. Company 3 has k = 120/5 = $24/guest from the graph. The lowest rate is Company 1 ($22/guest). Step 2: All three models are proportional because they each have a constant ratio y/x and cost $0 for 0 guests, passing through (0, 0).',
  },
];
