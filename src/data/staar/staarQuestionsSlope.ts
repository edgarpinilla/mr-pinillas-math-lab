import { QuestionTable } from '../../types';

export interface GraphPoint {
  x: number;
  y: number;
  label?: string;
  highlight?: boolean;
}

export interface GraphLine {
  id?: string;
  name?: string;
  slope: number;
  intercept: number;
  color?: string;
  points?: GraphPoint[];
  dashed?: boolean;
}

export interface SlopeTriangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  riseLabel?: string;
  runLabel?: string;
}

export interface QuestionGraph {
  title?: string;
  xLabel: string;
  yLabel: string;
  xMin?: number;
  xMax: number;
  yMin?: number;
  yMax: number;
  xStep?: number;
  yStep?: number;
  lines: GraphLine[];
  triangles?: SlopeTriangle[];
}

export type SlopeTopicType = 'finding-slope' | 'linear-equations' | 'mixed';

export type QuestionCategory =
  | 'graph'
  | 'table'
  | 'equation'
  | 'word-problem'
  | 'multiple-representation';

export interface StaarPracticeQuestion {
  id: string;
  category: QuestionCategory;
  slopeType: SlopeTopicType;
  teksCode: string;
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 2;
  subtopic: string;
  question: string;
  context?: string;
  tableData?: QuestionTable;
  graphData?: QuestionGraph;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export const STAAR_SLOPE_QUESTIONS: StaarPracticeQuestion[] = [
  // =========================================================================
  // SUBTOPIC 1: FINDING SLOPE & RATE OF CHANGE (12 Questions)
  // =========================================================================
  {
    id: 'staar-slope-01',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from a Graph',
    question:
      'The graph of a linear relationship passes through the coordinate points (2, 5) and (6, 13). What is the slope of the line?',
    graphData: {
      title: 'Linear Graph',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 16,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          slope: 2,
          intercept: 1,
          color: 'blue',
          points: [
            { x: 2, y: 5, label: '(2, 5)' },
            { x: 6, y: 13, label: '(6, 13)' },
          ],
        },
      ],
      triangles: [
        {
          x1: 2,
          y1: 5,
          x2: 6,
          y2: 13,
          riseLabel: 'Rise = 8',
          runLabel: 'Run = 4',
        },
      ],
    },
    options: ['m = 2', 'm = 1/2', 'm = 4', 'm = 8'],
    correctIndex: 0,
    explanation:
      'Slope is the vertical change divided by the horizontal change: m = (y₂ - y₁) / (x₂ - x₁) = (13 - 5) / (6 - 2) = 8 / 4 = 2.',
    hint: 'Calculate rise (13 - 5 = 8) and run (6 - 2 = 4), then divide rise by run.',
  },
  {
    id: 'staar-slope-02',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from a Table',
    question:
      'The table below shows the linear relationship between the number of hours a lawn mower operates (x) and the gallons of gasoline remaining in its fuel tank (y). What is the rate of change in gallons per hour?',
    tableData: {
      headers: ['Hours (x)', 'Gasoline Remaining (y)'],
      rows: [
        [1, 5.5],
        [3, 4.5],
        [5, 3.5],
        [7, 2.5],
      ],
    },
    options: [
      '-0.5 gallon per hour',
      '0.5 gallon per hour',
      '-1.0 gallon per hour',
      '-2.0 gallons per hour',
    ],
    correctIndex: 0,
    explanation:
      'Pick any two points: (1, 5.5) and (3, 4.5). Rate of change = (4.5 - 5.5) / (3 - 1) = -1.0 / 2 = -0.5 gallon per hour.',
    hint: 'Notice that gasoline is decreasing as hours increase, meaning the rate of change must be negative.',
  },
  {
    id: 'staar-slope-03',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Similar Slope Triangles',
    question:
      'Two right triangles are drawn along the same straight line on a coordinate plane. Triangle A has a vertical height of 6 and a horizontal base of 4. Triangle B has a horizontal base of 10. What must be the vertical height of Triangle B?',
    options: ['15', '12', '8', '20'],
    correctIndex: 0,
    explanation:
      'Right triangles along the same straight line are similar, so their slope ratios are equal: 6 / 4 = h / 10. Multiplying both sides by 10 gives h = (6 × 10) / 4 = 60 / 4 = 15.',
    hint: 'Set up a proportion for similar triangles: height / base = 6 / 4 = h / 10.',
  },
  {
    id: 'staar-slope-04',
    category: 'equation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from Two Points',
    question:
      'What is the slope of the line that passes through the coordinates (-4, 9) and (2, -3)?',
    options: ['-2', '2', '-1/2', '6'],
    correctIndex: 0,
    explanation:
      'Apply the slope formula: m = (-3 - 9) / (2 - (-4)) = -12 / (2 + 4) = -12 / 6 = -2.',
    hint: 'Watch for the double negative in the denominator: 2 - (-4) = 2 + 4 = 6.',
  },
  {
    id: 'staar-slope-05',
    category: 'word-problem',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Unit Rate as Slope',
    question:
      'A cyclist rides at a constant speed, covering 42 miles in 3 hours. Which statement correctly identifies the slope of the graph representing distance versus time?',
    options: [
      'The slope is 14 miles per hour because slope represents the unit rate of distance over time.',
      'The slope is 3/42 because time is the dependent variable.',
      'The slope is 39 because you subtract 3 from 42.',
      'The slope is 126 because you multiply 42 by 3.',
    ],
    correctIndex: 0,
    explanation:
      'Unit rate is calculated as distance / time = 42 miles / 3 hours = 14 miles/hour. On a graph of distance versus time, this unit rate is the slope m = 14.',
    hint: 'Slope = Change in distance / Change in time = 42 / 3.',
  },
  {
    id: 'staar-slope-06',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Zero Slope vs Undefined',
    question:
      'Which linear equation represents a line with a slope equal to 0?',
    options: ['y = 5', 'x = 5', 'y = 5x', 'y = x + 5'],
    correctIndex: 0,
    explanation:
      'A horizontal line has zero vertical rise (m = 0) and has an equation of the form y = b (here, y = 0x + 5 → y = 5). In contrast, x = 5 is a vertical line with an undefined slope.',
    hint: 'Horizontal lines have a slope of 0 and only contain the variable y.',
  },
  {
    id: 'staar-slope-07',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Rate of Change in Savings',
    question:
      'A student tracks their bank account balance over several weeks. The table below represents this linear relationship. What is the weekly rate of change in dollars?',
    tableData: {
      headers: ['Weeks (x)', 'Account Balance (y)'],
      rows: [
        [2, 110],
        [4, 160],
        [6, 210],
        [8, 260],
      ],
    },
    options: [
      '$25 per week',
      '$50 per week',
      '$55 per week',
      '$20 per week',
    ],
    correctIndex: 0,
    explanation:
      'Rate of change = (160 - 110) / (4 - 2) = 50 / 2 = $25 per week.',
    hint: 'Find the change in balance ($50) and divide by the change in weeks (2 weeks).',
  },
  {
    id: 'staar-slope-08',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Slope Triangles',
    question:
      'Why is the ratio of the vertical leg to the horizontal leg of any right triangle drawn between two points on the same line always constant?',
    options: [
      'Because all right triangles on the line share the same angle measures and are similar by AA similarity.',
      'Because the triangles always have the exact same area.',
      'Because the line must pass through the origin (0, 0).',
      'Because the horizontal legs are always congruent to the vertical legs.',
    ],
    correctIndex: 0,
    explanation:
      'Triangles drawn on the same straight line are similar because they share corresponding angle measures (AA similarity). Thus, the ratio of vertical leg (rise) to horizontal leg (run) is constant and equals the slope m.',
    hint: 'Think about why slope is constant on any straight line: the right triangles are similar.',
  },
  {
    id: 'staar-slope-09',
    category: 'equation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope with Fractions',
    question:
      'What is the slope of the line passing through (3, 4) and (7, 6)?',
    options: ['1/2', '2', '2/3', '4/3'],
    correctIndex: 0,
    explanation:
      'm = (6 - 4) / (7 - 3) = 2 / 4 = 1/2.',
    hint: 'Subtract y-values (6 - 4 = 2) and x-values (7 - 3 = 4), then simplify 2/4.',
  },
  {
    id: 'staar-slope-10',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Negative Slope Identification',
    question:
      'A line slants downwards from the upper-left quadrant to the lower-right quadrant. Which statement about the slope must be true?',
    options: [
      'The slope is negative because y decreases as x increases.',
      'The slope is positive because both axes have positive numbers.',
      'The slope is zero because the line is straight.',
      'The slope is undefined because it crosses both axes.',
    ],
    correctIndex: 0,
    explanation:
      'A line that falls from left to right has a negative vertical change (Δy < 0) for a positive horizontal change (Δx > 0), resulting in a negative slope.',
    hint: 'Downhill lines from left to right have negative slopes.',
  },
  {
    id: 'staar-slope-11',
    category: 'word-problem',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Rate of Water Flow',
    question:
      'A water reservoir loses 150 gallons of water every 6 hours due to evaporation. What is the rate of change in gallons per hour?',
    options: [
      '-25 gallons per hour',
      '-150 gallons per hour',
      '-900 gallons per hour',
      '-15 gallons per hour',
    ],
    correctIndex: 0,
    explanation:
      'Rate of change = Change in water / Change in time = -150 gallons / 6 hours = -25 gallons/hour.',
    hint: 'Divide the 150-gallon loss by 6 hours.',
  },
  {
    id: 'staar-slope-12',
    category: 'multiple-representation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Rates of Change',
    question:
      'Car A travels at a rate modeled by d = 55t. Car B travels according to a table with points (2, 120) and (4, 240). Which car has the greater speed (slope)?',
    options: [
      'Car B has a greater speed (60 mph vs. 55 mph).',
      'Car A has a greater speed (55 mph vs. 50 mph).',
      'Both cars have the exact same speed of 55 mph.',
      'Car B travels slower at 30 mph.',
    ],
    correctIndex: 0,
    explanation:
      'Car A speed = 55 mph. Car B speed = (240 - 120) / (4 - 2) = 120 / 2 = 60 mph. Car B is faster by 5 mph.',
    hint: 'Calculate Car B rate: 120 / 2 = 60 mph. Compare 60 with Car A rate of 55 mph.',
  },

  // =========================================================================
  // SUBTOPIC 2: LINEAR EQUATIONS (y = mx + b) & Y-INTERCEPTS (12 Questions)
  // =========================================================================
  {
    id: 'staar-slope-13',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing y = mx + b from Graph',
    question:
      'A line crosses the y-axis at (0, 3) and passes through the point (2, 7). Which equation represents this line in slope-intercept form?',
    options: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', 'y = 4x + 3'],
    correctIndex: 0,
    explanation:
      'The y-intercept is b = 3. The slope is m = (7 - 3) / (2 - 0) = 4 / 2 = 2. In slope-intercept form y = mx + b, the equation is y = 2x + 3.',
    hint: 'Identify b = 3 from the y-intercept (0, 3). Calculate slope m = (7 - 3) / (2 - 0) = 2.',
  },
  {
    id: 'staar-slope-14',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Equation from Table',
    question:
      'Which linear equation represents the relationship shown in the table below?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [0, -5],
        [2, 1],
        [4, 7],
        [6, 13],
      ],
    },
    options: ['y = 3x - 5', 'y = 3x + 5', 'y = -5x + 3', 'y = 2x - 5'],
    correctIndex: 0,
    explanation:
      'When x = 0, y = -5, so b = -5. The slope is m = (1 - (-5)) / (2 - 0) = 6 / 2 = 3. Combining gives y = 3x - 5.',
    hint: 'Look at the row x = 0 to find the y-intercept b = -5. Then calculate m = (1 - (-5)) / 2 = 3.',
  },
  {
    id: 'staar-slope-15',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Word Problem to Equation',
    question:
      'A taxi company charges a $4.50 pick-up fee plus $2.25 for every mile driven. Which equation represents the total cost C for a ride of m miles?',
    options: [
      'C = 2.25m + 4.50',
      'C = 4.50m + 2.25',
      'C = 6.75m',
      'C = 2.25m - 4.50',
    ],
    correctIndex: 0,
    explanation:
      'The variable rate per mile is $2.25 (slope), and the one-time flat pick-up fee is $4.50 (y-intercept). Therefore, C = 2.25m + 4.50.',
    hint: 'The rate multiplied by miles is 2.25m, and the one-time fee added is 4.50.',
  },
  {
    id: 'staar-slope-16',
    category: 'equation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying m and b',
    question:
      'In the linear equation y = -3/4 x + 8, what are the slope and the y-intercept?',
    options: [
      'Slope = -3/4; y-intercept = (0, 8)',
      'Slope = 8; y-intercept = (0, -3/4)',
      'Slope = 3/4; y-intercept = (0, -8)',
      'Slope = -3/4; y-intercept = (8, 0)',
    ],
    correctIndex: 0,
    explanation:
      'In y = mx + b, m = -3/4 (the coefficient of x) and b = 8 (the constant y-intercept point (0, 8)).',
    hint: 'Slope is the number in front of x; y-intercept is the constant on the end.',
  },
  {
    id: 'staar-slope-17',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Negative y-Intercept Graph',
    question:
      'A line has a slope of -3 and passes through the point (0, -2). What is the equation of this line?',
    options: ['y = -3x - 2', 'y = -3x + 2', 'y = 2x - 3', 'y = -2x - 3'],
    correctIndex: 0,
    explanation:
      'Given m = -3 and b = -2 (from (0, -2)), the slope-intercept form is y = -3x - 2.',
    hint: 'Substitute m = -3 and b = -2 into y = mx + b.',
  },
  {
    id: 'staar-slope-18',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Finding b Algebraically from Table',
    question:
      'A table contains the points (3, 11), (5, 17), and (7, 23). What is the y-intercept of the line representing this table?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [3, 11],
        [5, 17],
        [7, 23],
      ],
    },
    options: ['(0, 2)', '(0, 3)', '(0, 5)', '(0, 0)'],
    correctIndex: 0,
    explanation:
      'Slope m = (17 - 11) / (5 - 3) = 6 / 2 = 3. Using point (3, 11): 11 = 3(3) + b → 11 = 9 + b → b = 2. So the y-intercept is (0, 2).',
    hint: 'Find slope m = 3. Count backwards 3 units of x to reach x = 0: 11 - 3(3) = 2.',
  },
  {
    id: 'staar-slope-19',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Draining Tank Equation',
    question:
      'A swimming pool has 800 gallons of water and drains at a constant rate of 40 gallons per minute. Which equation models the gallons of water remaining y after x minutes?',
    options: [
      'y = -40x + 800',
      'y = 40x + 800',
      'y = 800x - 40',
      'y = -40x - 800',
    ],
    correctIndex: 0,
    explanation:
      'Initial amount = 800 (y-intercept b). Rate of loss = -40 gal/min (slope m). Therefore, y = -40x + 800.',
    hint: 'Since water is draining, the slope is negative (-40) and starting volume is +800.',
  },
  {
    id: 'staar-slope-20',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Line Passing through Origin',
    question:
      'What is the slope-intercept equation of a line passing through (0, 0) and (4, 10)?',
    options: ['y = 2.5x', 'y = 2.5x + 4', 'y = 4x + 10', 'y = 10x'],
    correctIndex: 0,
    explanation:
      'The line passes through (0, 0), so b = 0. Slope m = (10 - 0) / (4 - 0) = 2.5. The equation is y = 2.5x + 0 → y = 2.5x.',
    hint: 'When a line passes through the origin (0, 0), b = 0 and the equation simplifies to y = mx.',
  },
  {
    id: 'staar-slope-21',
    category: 'multiple-representation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Matching Table to Verbal',
    question:
      'A tree is 4 feet tall when planted and grows 1.5 feet each year. Which equation models height h after t years?',
    options: [
      'h = 1.5t + 4',
      'h = 4t + 1.5',
      'h = 5.5t',
      'h = 1.5t - 4',
    ],
    correctIndex: 0,
    explanation:
      'Starting height = 4 ft (y-intercept). Annual growth rate = 1.5 ft/year (slope). Equation is h = 1.5t + 4.',
    hint: 'Growth per year multiplies years (1.5t) and initial height is added (+4).',
  },
  {
    id: 'staar-slope-22',
    category: 'equation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Point and Slope',
    question:
      'A line has a slope of 4 and passes through the point (2, 13). What is the equation of the line?',
    options: ['y = 4x + 5', 'y = 4x + 13', 'y = 4x - 5', 'y = 2x + 13'],
    correctIndex: 0,
    explanation:
      'Substitute m = 4 and (2, 13) into y = mx + b: 13 = 4(2) + b → 13 = 8 + b → b = 5. The equation is y = 4x + 5.',
    hint: 'Substitute x = 2 and y = 13 into y = 4x + b to solve for b.',
  },
  {
    id: 'staar-slope-23',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Negative Slope from Table',
    question:
      'Which linear equation describes the table below?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [0, 10],
        [2, 6],
        [4, 2],
        [6, -2],
      ],
    },
    options: ['y = -2x + 10', 'y = 2x + 10', 'y = -2x - 10', 'y = -4x + 10'],
    correctIndex: 0,
    explanation:
      'When x = 0, y = 10 (b = 10). Slope m = (6 - 10) / (2 - 0) = -4 / 2 = -2. The equation is y = -2x + 10.',
    hint: 'Find the rate of change: y decreases by 4 when x increases by 2 (-4/2 = -2). Starting value is 10.',
  },
  {
    id: 'staar-slope-24',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Interpreting y-Intercept Meaning',
    question:
      'A linear equation is given by y = 12x + 45, where y is the total repair cost and x is hours of labor. What does 45 represent in this real-world situation?',
    options: [
      'The initial diagnostic fee charged before any hours of labor begin',
      'The hourly labor rate of $45 per hour',
      'The total number of hours worked on the repair',
      'The maximum cost possible for the repair',
    ],
    correctIndex: 0,
    explanation:
      'The constant term b = 45 represents the y-intercept (the cost when x = 0 hours), which is the fixed initial diagnostic fee.',
    hint: 'When hours x = 0, the cost is y = 45. What kind of fee is charged before work starts?',
  },

  // =========================================================================
  // SUBTOPIC 3: MULTIPLE REPRESENTATIONS & MIXED STAAR CHALLENGES (12 Questions)
  // =========================================================================
  {
    id: 'staar-slope-25',
    category: 'multiple-representation',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Graph and Table Comparison',
    question:
      'Line 1 is represented by y = 3x + 4. Line 2 passes through (1, 5) and (3, 13). Which statement comparing the two lines is true?',
    options: [
      'Line 2 is steeper because its slope (4) is greater than the slope of Line 1 (3).',
      'Line 1 is steeper because its y-intercept is greater.',
      'Both lines have the exact same slope.',
      'Line 1 is steeper because its slope is 3 and Line 2 slope is 2.',
    ],
    correctIndex: 0,
    explanation:
      'Line 1 slope = 3. Line 2 slope = (13 - 5) / (3 - 1) = 8 / 2 = 4. Since 4 > 3, Line 2 is steeper.',
    hint: 'Calculate Line 2 slope: (13 - 5)/(3 - 1) = 4. Compare with Line 1 slope of 3.',
  },
  {
    id: 'staar-slope-26',
    category: 'graph',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Finding Equation from Coordinate Graph',
    question:
      'A line passes through (-3, 0) and (0, 6). What is the slope-intercept equation of this line?',
    options: ['y = 2x + 6', 'y = -2x + 6', 'y = 1/2 x + 6', 'y = 2x - 3'],
    correctIndex: 0,
    explanation:
      'y-intercept is (0, 6), so b = 6. Slope m = (6 - 0) / (0 - (-3)) = 6 / 3 = 2. Equation: y = 2x + 6.',
    hint: 'b = 6. m = (6 - 0)/(0 - (-3)) = 6/3 = 2.',
  },
  {
    id: 'staar-slope-27',
    category: 'table',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Determining Linearity and Equation',
    question:
      'Look at the table below. What is the linear equation relating x and y?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [-2, -7],
        [1, 2],
        [3, 8],
        [5, 14],
      ],
    },
    options: ['y = 3x - 1', 'y = 3x + 1', 'y = 2x - 3', 'y = 4x + 1'],
    correctIndex: 0,
    explanation:
      'Slope m = (8 - 2) / (3 - 1) = 6 / 2 = 3. Using point (1, 2): 2 = 3(1) + b → 2 = 3 + b → b = -1. The equation is y = 3x - 1.',
    hint: 'm = (8 - 2) / (3 - 1) = 3. Test points with y = 3x - 1: 3(1) - 1 = 2.',
  },
  {
    id: 'staar-slope-28',
    category: 'word-problem',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Proportional vs Non-Proportional Slopes',
    question:
      'Which of the following linear relationships has a slope of 5 and represents a PROPORTIONAL relationship?',
    options: [
      'y = 5x (passes through (0, 0))',
      'y = 5x + 3 (y-intercept is 3)',
      'y = 5x - 5 (y-intercept is -5)',
      'y = 3x + 5 (slope is 3)',
    ],
    correctIndex: 0,
    explanation:
      'Proportional relationships have the form y = kx with a y-intercept of b = 0. Only y = 5x has slope 5 and passes through (0, 0).',
    hint: 'Proportional means b = 0.',
  },
  {
    id: 'staar-slope-29',
    category: 'graph',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope Triangle Equations',
    question:
      'Triangle 1 on a line has vertices at (1, 2), (4, 2), and (4, 8). Which ratio represents the slope of the line?',
    options: ['(8 - 2) / (4 - 1) = 6 / 3 = 2', '(4 - 1) / (8 - 2) = 3 / 6 = 1/2', '(8 + 2) / (4 + 1) = 10 / 5 = 2', '8 / 4 = 2'],
    correctIndex: 0,
    explanation:
      'The vertical leg (rise) is 8 - 2 = 6. The horizontal leg (run) is 4 - 1 = 3. The slope ratio is Rise / Run = 6 / 3 = 2.',
    hint: 'Vertical change on top, horizontal change on bottom.',
  },
  {
    id: 'staar-slope-30',
    category: 'equation',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Parallel Lines Slopes',
    question:
      'Two linear functions are graphed on the same plane. Function A is y = 2/3 x + 4 and Function B is y = 2/3 x - 7. How are their graphs related?',
    options: [
      'They are parallel lines because they have the exact same slope (2/3) but different y-intercepts.',
      'They are perpendicular lines because one is positive and one is negative.',
      'They intersect at the origin (0, 0).',
      'They represent the exact same line.',
    ],
    correctIndex: 0,
    explanation:
      'Lines with the same slope and different y-intercepts are parallel and will never intersect.',
    hint: 'Check their slopes: both are 2/3. Equal slopes mean parallel lines.',
  },
  {
    id: 'staar-slope-31',
    category: 'table',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Finding Missing Table Value',
    question:
      'A linear table has a constant slope of -3. If the table contains the point (2, 8), what is the y-value when x = 5?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [2, 8],
        [5, '?'],
      ],
    },
    options: ['-1', '1', '2', '-7'],
    correctIndex: 0,
    explanation:
      'When x increases from 2 to 5 (Δx = +3), y must change by m · Δx = (-3)(3) = -9. So y = 8 - 9 = -1.',
    hint: 'Multiply the slope (-3) by the change in x (5 - 2 = 3): -3 × 3 = -9. Subtract 9 from 8.',
  },
  {
    id: 'staar-slope-32',
    category: 'word-problem',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Cell Phone Plan Cost',
    question:
      'Plan A costs $20 per month plus $0.05 per text. Plan B costs $35 per month with unlimited free texting. If x is texts and y is total monthly cost, which equation represents Plan A?',
    options: ['y = 0.05x + 20', 'y = 20x + 0.05', 'y = 35x', 'y = 20.05x'],
    correctIndex: 0,
    explanation:
      'The recurring per-text rate is $0.05 (slope m) and the monthly base fee is $20 (y-intercept b). Therefore, y = 0.05x + 20.',
    hint: '0.05 multiplies x (number of texts), and 20 is the base fee.',
  },
  {
    id: 'staar-slope-33',
    category: 'graph',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from Intercepts',
    question:
      'A line crosses the x-axis at (4, 0) and the y-axis at (0, -8). What is the slope of the line?',
    options: ['2', '-2', '1/2', '-1/2'],
    correctIndex: 0,
    explanation:
      'm = (-8 - 0) / (0 - 4) = -8 / -4 = +2.',
    hint: 'm = (y₂ - y₁) / (x₂ - x₁) = (-8 - 0) / (0 - 4) = -8 / -4 = 2.',
  },
  {
    id: 'staar-slope-34',
    category: 'multiple-representation',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Converting Word Scenario to Table Row',
    question:
      'An airplane descends at a constant rate of 400 feet per minute from an altitude of 10,000 feet. What is the airplane altitude after 15 minutes?',
    options: ['4,000 feet', '6,000 feet', '2,500 feet', '8,000 feet'],
    correctIndex: 0,
    explanation:
      'Equation: A = -400t + 10,000. At t = 15: A = -400(15) + 10,000 = -6,000 + 10,000 = 4,000 feet.',
    hint: 'Multiply descent rate 400 ft/min by 15 min = 6,000 ft descended. Subtract 6,000 from 10,000.',
  },
  {
    id: 'staar-slope-35',
    category: 'equation',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope of Vertical Line',
    question:
      'Why is the slope of the vertical line x = -2 undefined?',
    options: [
      'Because the horizontal change (run) between any two points is 0, and division by zero is mathematically undefined.',
      'Because the line does not have any points.',
      'Because the line has a negative x-value.',
      'Because the y-intercept is -2.',
    ],
    correctIndex: 0,
    explanation:
      'Any two points on x = -2 share the same x-coordinate (e.g. (-2, 1) and (-2, 5)). Horizontal run = -2 - (-2) = 0. Since slope is rise / run = 4 / 0, division by zero is undefined.',
    hint: 'Run is 0, and dividing any number by 0 is undefined.',
  },
  {
    id: 'staar-slope-36',
    category: 'multiple-representation',
    slopeType: 'mixed',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comprehensive Slope-Intercept Review',
    question:
      'Which linear representation below has a slope of -1/2 and a y-intercept of (0, 3)?',
    options: [
      'y = -1/2 x + 3',
      'y = 3x - 1/2',
      'y = 1/2 x + 3',
      'y = -1/2 x - 3',
    ],
    correctIndex: 0,
    explanation:
      'In slope-intercept form y = mx + b, substitute m = -1/2 and b = 3 to get y = -1/2 x + 3.',
    hint: 'Check that m = -1/2 is multiplied by x and +3 is the constant.',
  },
];
