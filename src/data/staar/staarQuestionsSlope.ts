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
  verticalX?: number;
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
  // SUBTOPIC 1: FINDING SLOPE & RATE OF CHANGE (18 Questions)
  // =========================================================================
  {
    id: 'staar-slope-01',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from a Coordinate Graph',
    question:
      'The graph shows a linear relationship between x and y. What is the slope of the line that passes through (1, 2) and (5, 10)?',
    graphData: {
      title: 'Linear Graph',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 14,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          slope: 2,
          intercept: 0,
          color: '#38bdf8',
          points: [
            { x: 1, y: 2, label: '(1, 2)' },
            { x: 5, y: 10, label: '(5, 10)' },
          ],
        },
      ],
      triangles: [
        {
          x1: 1,
          y1: 2,
          x2: 5,
          y2: 10,
          riseLabel: 'Rise = 8',
          runLabel: 'Run = 4',
        },
      ],
    },
    options: ['2', '1/2', '4', '8'],
    correctIndex: 0,
    explanation:
      'Slope is the vertical change divided by the horizontal change: m = (y₂ - y₁) / (x₂ - x₁) = (10 - 2) / (5 - 1) = 8 / 4 = 2.',
    hint: 'Calculate vertical rise (10 - 2 = 8) and horizontal run (5 - 1 = 4), then compute rise / run.',
  },
  {
    id: 'staar-slope-02',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Rate of Change from a Table',
    question:
      'The table shows the altitude of a research drone in meters, y, after descending for x seconds. What is the rate of change of the altitude with respect to time in meters per second?',
    tableData: {
      headers: ['Seconds (x)', 'Altitude in Meters (y)'],
      rows: [
        [4, 142],
        [7, 127],
        [10, 112],
        [13, 97],
      ],
    },
    options: [
      '-5 meters per second',
      '5 meters per second',
      '-15 meters per second',
      '-1/5 meter per second',
    ],
    correctIndex: 0,
    explanation:
      'Select any two points from the table, such as (4, 142) and (7, 127). The rate of change is (127 - 142) / (7 - 4) = -15 / 3 = -5 meters per second. The negative sign represents a decreasing altitude.',
    hint: 'Find the change in altitude (-15 meters) and divide by the change in seconds (3 seconds).',
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
      'Right triangle ABC and right triangle DEF are positioned on a coordinate plane so that their hypotenuses lie along the same line. Triangle ABC has a vertical leg of 6 units and a horizontal leg of 4 units. Triangle DEF has a horizontal leg of 10 units. Which proportion can be used to find v, the length of the vertical leg of triangle DEF?',
    graphData: {
      title: 'Similar Slope Triangles on a Line',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 16,
      yMin: 0,
      yMax: 20,
      xStep: 2,
      yStep: 2,
      lines: [
        {
          slope: 1.5,
          intercept: 0,
          color: '#38bdf8',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 4, y: 6, label: '(4, 6)' },
            { x: 14, y: 21, label: '' },
          ],
        },
      ],
      triangles: [
        {
          x1: 0,
          y1: 0,
          x2: 4,
          y2: 6,
          riseLabel: 'Vertical = 6',
          runLabel: 'Horizontal = 4',
        },
        {
          x1: 4,
          y1: 6,
          x2: 14,
          y2: 21,
          riseLabel: 'Vertical = v',
          runLabel: 'Horizontal = 10',
        },
      ],
    },
    options: ['6 / 4 = v / 10', '4 / 6 = v / 10', '6 / 10 = v / 4', '6 / 4 = 10 / v'],
    correctIndex: 0,
    explanation:
      'Because both right triangles share hypotenuses along the same straight line, they are similar by AA similarity. The ratio of the vertical leg (rise) to the horizontal leg (run) is constant and equals the slope: 6 / 4 = v / 10.',
    hint: 'Set up the slope ratio for each triangle: (vertical leg) / (horizontal leg).',
  },
  {
    id: 'staar-slope-04',
    category: 'equation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from Two Coordinate Points',
    question:
      'What is the slope of the line that passes through the ordered pairs (-3, 11) and (5, -5)?',
    options: ['-2', '2', '-1/2', '-8'],
    correctIndex: 0,
    explanation:
      'Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁) = (-5 - 11) / (5 - (-3)) = -16 / (5 + 3) = -16 / 8 = -2.',
    hint: 'Watch the double negative in the denominator: 5 - (-3) = 5 + 3 = 8.',
  },
  {
    id: 'staar-slope-05',
    category: 'word-problem',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Unit Rate as Slope in a Proportional Relationship',
    question:
      'A printing company operates a commercial press that produces 150 concert posters every 4 minutes and 375 posters every 10 minutes. What is the slope of the graph that models the total number of posters printed, y, as a function of time in minutes, x?',
    options: ['37.5', '0.027', '150', '225'],
    correctIndex: 0,
    explanation:
      'The relationship is proportional through the origin (0, 0). The slope is the unit rate: m = 150 posters / 4 minutes = 37.5 posters per minute (or 375 / 10 = 37.5).',
    hint: 'Slope is the unit rate: divide total posters (150) by time (4 minutes).',
  },
  {
    id: 'staar-slope-06',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Zero Slope of a Horizontal Line',
    question:
      'The graph displays a horizontal line passing through the coordinates (0, -4) and (5, -4). Which statement correctly describes the slope of this line?',
    graphData: {
      title: 'Horizontal Line',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 7,
      yMin: -6,
      yMax: 2,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          slope: 0,
          intercept: -4,
          color: '#38bdf8',
          points: [
            { x: 0, y: -4, label: '(0, -4)' },
            { x: 5, y: -4, label: '(5, -4)' },
          ],
        },
      ],
    },
    options: [
      'The slope is 0 because the vertical change between any two points is 0, resulting in 0 / run = 0.',
      'The slope is undefined because the line does not slant up or down.',
      'The slope is -4 because the line crosses the y-axis at -4.',
      'The slope is 5 because the horizontal distance between the points is 5 units.',
    ],
    correctIndex: 0,
    explanation:
      'For any two points on a horizontal line, y₂ - y₁ = -4 - (-4) = 0. The slope is 0 / 5 = 0. (A vertical line with run = 0 has an undefined slope).',
    hint: 'Horizontal lines have zero vertical rise. 0 divided by any non-zero run equals 0.',
  },
  {
    id: 'staar-slope-07',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Rate of Change with Decimals',
    question:
      'The table represents the linear relationship between the number of batches of bread baked, x, and the pounds of flour remaining in a storage container, y. What is the rate of change in pounds per batch?',
    tableData: {
      headers: ['Batches Baked (x)', 'Flour Remaining (lbs) (y)'],
      rows: [
        [2, 44.5],
        [5, 34.0],
        [8, 23.5],
        [11, 13.0],
      ],
    },
    options: [
      '-3.5 pounds per batch',
      '3.5 pounds per batch',
      '-10.5 pounds per batch',
      '-0.286 pound per batch',
    ],
    correctIndex: 0,
    explanation:
      'Choose two ordered pairs: (2, 44.5) and (5, 34.0). Rate of change = (34.0 - 44.5) / (5 - 2) = -10.5 / 3 = -3.5 pounds per batch. The negative rate confirms the flour supply is decreasing.',
    hint: 'Find the vertical difference (34.0 - 44.5 = -10.5) and divide by the horizontal change (5 - 2 = 3).',
  },
  {
    id: 'staar-slope-08',
    category: 'equation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope from Coordinates as a Simplified Fraction',
    question:
      'A straight line on a coordinate plane passes through the points (-2, -3) and (6, 1). What is the slope of the line expressed as a simplified fraction?',
    options: ['1/2', '2', '-1/2', '4/8'],
    correctIndex: 0,
    explanation:
      'm = (y₂ - y₁) / (x₂ - x₁) = (1 - (-3)) / (6 - (-2)) = (1 + 3) / (6 + 2) = 4 / 8 = 1/2.',
    hint: 'Subtract the y-coordinates on top: 1 - (-3) = 4. Subtract the x-coordinates on bottom: 6 - (-2) = 8. Then simplify 4/8.',
  },
  {
    id: 'staar-slope-09',
    category: 'word-problem',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Rates of Change Across Multiple Representations',
    question:
      'Landscaper A charges for mowing according to the equation c = 28h, where c is the total charge in dollars for h hours. Landscaper B charges according to a table with points (3, 96) and (7, 224). Which statement correctly compares the hourly rates of change?',
    options: [
      'Landscaper B charges $4 more per hour than Landscaper A because the slope for Landscaper B is $32/hr and Landscaper A is $28/hr.',
      'Landscaper A charges $4 more per hour than Landscaper B because 28 is greater than 24.',
      'Both landscapers charge the same rate per hour because both relationships are linear.',
      'Landscaper B charges $68 more per hour than Landscaper A because 96 - 28 = 68.',
    ],
    correctIndex: 0,
    explanation:
      'Landscaper A hourly rate (slope) is $28/hr. For Landscaper B, rate = (224 - 96) / (7 - 3) = 128 / 4 = $32/hr. Landscaper B charges $32 - $28 = $4 more per hour.',
    hint: 'Compute Landscaper B rate: (224 - 96) / (7 - 3) = 128 / 4 = 32. Compare 32 with Landscaper A rate of 28.',
  },
  {
    id: 'staar-slope-10',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope with Negative Fractional Value',
    question:
      'The graph shows a linear relationship between x and y. What is the slope of the line passing through (1, 8) and (7, 4)?',
    graphData: {
      title: 'Decreasing Linear Graph',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 10,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          slope: -2 / 3,
          intercept: 26 / 3,
          color: '#38bdf8',
          points: [
            { x: 1, y: 8, label: '(1, 8)' },
            { x: 4, y: 6, label: '(4, 6)' },
            { x: 7, y: 4, label: '(7, 4)' },
          ],
        },
      ],
      triangles: [
        {
          x1: 1,
          y1: 8,
          x2: 7,
          y2: 4,
          riseLabel: 'Rise = -4',
          runLabel: 'Run = +6',
        },
      ],
    },
    options: ['-2/3', '-3/2', '2/3', '-4/7'],
    correctIndex: 0,
    explanation:
      'm = (y₂ - y₁) / (x₂ - x₁) = (4 - 8) / (7 - 1) = -4 / 6 = -2/3. The line slants downward from left to right, confirming a negative slope.',
    hint: 'Notice the vertical change is down 4 (-4) and horizontal change is right 6 (+6). Simplify -4/6.',
  },
  {
    id: 'staar-slope-11',
    category: 'multiple-representation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying Slope from Real-World Verbal Description',
    question:
      'A weather balloon is released from an elevation of 1,200 feet and ascends at a constant rate of 45 feet per minute. What is the slope of the linear graph that models the balloon elevation over time?',
    options: ['45', '1,200', '1/45', '-45'],
    correctIndex: 0,
    explanation:
      'In a linear model, the slope represents the constant rate of change per unit of time. Because the balloon ascends 45 feet every minute, the slope m = 45. The initial elevation (1,200) is the y-intercept.',
    hint: 'The slope is the rate per minute, while 1,200 is the initial height (y-intercept).',
  },
  {
    id: 'staar-slope-12',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Finding a Missing Value in a Table Using Slope',
    question:
      'The table represents a linear relationship between x and y. What is the value of k when x = 10?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [-2, -11],
        [1, -2],
        [4, 7],
        [10, 'k'],
      ],
    },
    options: ['25', '16', '30', '28'],
    correctIndex: 0,
    explanation:
      'First calculate the constant slope: m = (7 - (-2)) / (4 - 1) = 9 / 3 = 3. The linear equation is y = 3x + b. Using (1, -2): -2 = 3(1) + b → b = -5, so y = 3x - 5. When x = 10, k = 3(10) - 5 = 30 - 5 = 25.',
    hint: 'Find the slope (m = 3), then write the rule y = 3x - 5 and substitute x = 10.',
  },
  {
    id: 'staar-slope-13',
    category: 'equation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying an Undefined Slope',
    question:
      'Which linear equation represents a line on a coordinate grid that has an undefined slope?',
    options: ['x = -7', 'y = -7', 'y = -7x', 'y = x - 7'],
    correctIndex: 0,
    explanation:
      'A vertical line has an undefined slope because every point on the line shares the same x-value (run = 0). Vertical lines are written in the form x = a (here, x = -7). Division by zero is undefined.',
    hint: 'Vertical lines have an equation of the form x = constant and have undefined slopes.',
  },
  {
    id: 'staar-slope-14',
    category: 'word-problem',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Rate of Drainage to Empty',
    question:
      'A community swimming pool contains 9,600 gallons of water. After 3 hours of continuous pumping, 7,800 gallons remain. After 7 hours, 5,400 gallons remain. How many total hours from the start will it take for the pool to be completely empty?',
    options: ['16 hours', '12 hours', '24 hours', '14 hours'],
    correctIndex: 0,
    explanation:
      'First determine the rate of drainage: m = (5,400 - 7,800) / (7 - 3) = -2,400 / 4 = -600 gallons per hour. At a rate of 600 gallons per hour, draining all 9,600 gallons requires 9,600 / 600 = 16 hours.',
    hint: 'Find the rate of change: (7,800 - 5,400) / (7 - 3) = 600 gal/hr. Divide starting volume (9,600) by 600.',
  },
  {
    id: 'staar-slope-15',
    category: 'multiple-representation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Slopes of Proportional and Non-Proportional Relations',
    question:
      'Relationship P is represented by the equation y = 4.5x. Relationship Q is represented by a table containing the points (2, 11) and (6, 29). Which statement correctly compares their rates of change and proportionality?',
    options: [
      'Both relationships have the exact same rate of change (4.5), but only Relationship P is proportional because its y-intercept is 0.',
      'Relationship Q has a greater rate of change because its y-intercept is 2.',
      'Both relationships are proportional because they share the same rate of change.',
      'Relationship P has a greater rate of change (4.5) than Relationship Q (3.6).',
    ],
    correctIndex: 0,
    explanation:
      'Relationship P has slope 4.5 and passes through (0, 0) (proportional). Relationship Q has slope (29 - 11) / (6 - 2) = 18 / 4 = 4.5, with y-intercept b = 11 - 4.5(2) = 2 (non-proportional). Both have the exact same rate of change (4.5).',
    hint: 'Calculate the slope of Q: (29 - 11) / (6 - 2) = 18 / 4 = 4.5. Check whether the line passes through (0, 0).',
  },
  {
    id: 'staar-slope-16',
    category: 'table',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Rate of Change in Training Miles',
    question:
      'The table shows the cumulative distance in miles a marathon runner has completed by the end of various training weeks. What is the rate of change in miles per week?',
    tableData: {
      headers: ['Training Week (x)', 'Cumulative Miles (y)'],
      rows: [
        [3, 26],
        [6, 47],
        [9, 68],
        [12, 89],
      ],
    },
    options: [
      '7 miles per week',
      '21 miles per week',
      '8.67 miles per week',
      '1/7 mile per week',
    ],
    correctIndex: 0,
    explanation:
      'Rate of change = (47 - 26) / (6 - 3) = 21 / 3 = 7 miles per week. Verification: (68 - 47) / (9 - 6) = 21 / 3 = 7.',
    hint: 'Divide the change in miles (47 - 26 = 21) by the change in weeks (6 - 3 = 3).',
  },
  {
    id: 'staar-slope-17',
    category: 'graph',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope Triangle Expression for Hypotenuse',
    question:
      'On the coordinate plane, right triangle JKL is constructed with vertices at J(2, 3), L(8, 3), and K(8, 15). The hypotenuse JK lies along a straight line. Which expression correctly calculates the slope of line JK?',
    graphData: {
      title: 'Slope Triangle JKL',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 16,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          slope: 2,
          intercept: -1,
          color: '#38bdf8',
          points: [
            { x: 2, y: 3, label: 'J(2, 3)' },
            { x: 8, y: 15, label: 'K(8, 15)' },
          ],
        },
      ],
      triangles: [
        {
          x1: 2,
          y1: 3,
          x2: 8,
          y2: 15,
          riseLabel: 'KL = 12',
          runLabel: 'JL = 6',
        },
      ],
    },
    options: [
      '(15 - 3) / (8 - 2) = 2',
      '(8 - 2) / (15 - 3) = 1/2',
      '(15 - 8) / (3 - 2) = 7',
      '(15 + 3) / (8 + 2) = 1.8',
    ],
    correctIndex: 0,
    explanation:
      'Slope is the vertical change (length of leg KL = 15 - 3 = 12) divided by horizontal change (length of leg JL = 8 - 2 = 6): m = (15 - 3) / (8 - 2) = 12 / 6 = 2.',
    hint: 'Vertical change is y₂ - y₁ on top; horizontal change is x₂ - x₁ on the bottom.',
  },
  {
    id: 'staar-slope-18',
    category: 'multiple-representation',
    slopeType: 'finding-slope',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Interpreting Slope as Unit Rate in a Shipping Model',
    question:
      'The linear equation c = 3.25w + 14 represents the total cost c in dollars of shipping a package that weighs w pounds. What does the value 3.25 represent in this situation?',
    options: [
      'The additional shipping charge of $3.25 for each additional pound of weight',
      'The fixed packaging fee charged regardless of package weight',
      'The total cost to ship a package that weighs 1 pound',
      'The maximum allowable package weight in pounds',
    ],
    correctIndex: 0,
    explanation:
      'In c = 3.25w + 14, 3.25 is the coefficient of w (the slope/rate of change). It represents the cost per pound: $3.25 for every 1-pound increase in weight. The constant 14 is the initial base fee.',
    hint: '3.25 is multiplied by the number of pounds w, so it is the rate per pound.',
  },

  // =========================================================================
  // SUBTOPIC 2: LINEAR EQUATIONS (y = mx + b FORM) (18 Questions)
  // =========================================================================
  {
    id: 'staar-slope-19',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing y = mx + b from a Coordinate Graph',
    question:
      'The graph displays a linear relationship between x and y. Which equation best represents the line shown?',
    graphData: {
      title: 'Linear Graph with Intercept',
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
          intercept: 4,
          color: '#38bdf8',
          points: [
            { x: 0, y: 4, label: '(0, 4)' },
            { x: 3, y: 10, label: '(3, 10)' },
            { x: 6, y: 16, label: '(6, 16)' },
          ],
        },
      ],
    },
    options: ['y = 2x + 4', 'y = 4x + 2', 'y = 1/2 x + 4', 'y = 2x - 4'],
    correctIndex: 0,
    explanation:
      'The line crosses the y-axis at (0, 4), which gives the y-intercept b = 4. Using points (0, 4) and (3, 10), the slope is m = (10 - 4) / (3 - 0) = 6 / 3 = 2. In y = mx + b form, the equation is y = 2x + 4.',
    hint: 'Find where the line crosses the vertical y-axis (b = 4), then count rise over run to find m = 2.',
  },
  {
    id: 'staar-slope-20',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing an Equation from a Table with Omitted x = 0',
    question:
      'Which linear equation represents the relationship between x and y shown in the table?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [3, 17],
        [5, 27],
        [7, 37],
        [9, 47],
      ],
    },
    options: ['y = 5x + 2', 'y = 5x + 17', 'y = 10x - 13', 'y = 2x + 5'],
    correctIndex: 0,
    explanation:
      'First find the slope: m = (27 - 17) / (5 - 3) = 10 / 2 = 5. To find the y-intercept b, substitute (3, 17) into y = 5x + b: 17 = 5(3) + b → 17 = 15 + b → b = 2. The equation is y = 5x + 2.',
    hint: 'Find slope m = 10 / 2 = 5. Work backwards to find y when x = 0: 17 - 5(3) = 2.',
  },
  {
    id: 'staar-slope-21',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing an Equation from a Real-World Rental Situation',
    question:
      'A hardware store charges a one-time insurance deposit of $35 plus $18 per hour to rent a commercial power washer. Which equation can be used to find c, the total cost in dollars to rent the power washer for h hours?',
    options: [
      'c = 18h + 35',
      'c = 35h + 18',
      'c = 53h',
      'c = 18h - 35',
    ],
    correctIndex: 0,
    explanation:
      'The hourly rate of $18 is the slope (rate of change multiplied by h), and the one-time insurance deposit of $35 is the y-intercept (constant starting fee). The equation is c = 18h + 35.',
    hint: 'The rate multiplied by hours is 18h, and the one-time fee added is 35.',
  },
  {
    id: 'staar-slope-22',
    category: 'equation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying m and b with Negative Slope and Intercept',
    question:
      'In the linear equation y = -5/2 x - 6, what are the slope and the y-intercept of the line?',
    options: [
      'Slope = -5/2; y-intercept = (0, -6)',
      'Slope = -6; y-intercept = (0, -5/2)',
      'Slope = 5/2; y-intercept = (0, 6)',
      'Slope = -5/2; y-intercept = (-6, 0)',
    ],
    correctIndex: 0,
    explanation:
      'In slope-intercept form y = mx + b, the slope m is the coefficient of x (m = -5/2), and the y-intercept point is (0, b) = (0, -6).',
    hint: 'm is the number in front of x, and (0, b) is the constant term at the end.',
  },
  {
    id: 'staar-slope-23',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Graph with Negative Slope',
    question:
      'The graph models a linear function. Which equation represents this relationship?',
    graphData: {
      title: 'Downward Sloping Line',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 12,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          slope: -0.75,
          intercept: 9,
          color: '#38bdf8',
          points: [
            { x: 0, y: 9, label: '(0, 9)' },
            { x: 4, y: 6, label: '(4, 6)' },
            { x: 8, y: 3, label: '(8, 3)' },
          ],
        },
      ],
    },
    options: [
      'y = -3/4 x + 9',
      'y = -4/3 x + 9',
      'y = 3/4 x + 9',
      'y = -3/4 x + 12',
    ],
    correctIndex: 0,
    explanation:
      'The line crosses the y-axis at (0, 9), so b = 9. Calculating slope between (0, 9) and (4, 6): m = (6 - 9) / (4 - 0) = -3 / 4. In slope-intercept form, the equation is y = -3/4 x + 9.',
    hint: 'b = 9 from the y-intercept. For slope: vertical change is -3 and horizontal change is 4.',
  },
  {
    id: 'staar-slope-24',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Table with Negative Values',
    question:
      'The table represents a linear relationship between x and y. What is the equation of the line in slope-intercept form?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [-4, -19],
        [-1, -7],
        [2, 5],
        [5, 17],
      ],
    },
    options: ['y = 4x - 3', 'y = 4x + 3', 'y = 3x - 7', 'y = 1/4 x - 3'],
    correctIndex: 0,
    explanation:
      'Calculate the slope: m = (5 - (-7)) / (2 - (-1)) = 12 / 3 = 4. Substitute point (2, 5) into y = 4x + b: 5 = 4(2) + b → 5 = 8 + b → b = -3. The equation is y = 4x - 3.',
    hint: 'Find slope m = 12 / 3 = 4. Then substitute x = 2 and y = 5 into 5 = 4(2) + b to solve for b.',
  },
  {
    id: 'staar-slope-25',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Linear Equation for Gift Card Balance Depletion',
    question:
      'Marcus receives a $120 movie gift card. Each time he purchases a movie ticket, $12.50 is deducted from the card balance. Which equation represents the remaining balance on the card, b, after Marcus purchases t movie tickets?',
    options: [
      'b = -12.50t + 120',
      'b = 12.50t + 120',
      'b = 120t - 12.50',
      'b = -12.50t - 120',
    ],
    correctIndex: 0,
    explanation:
      'The starting gift card amount is $120 (the positive y-intercept). Each ticket purchase reduces the balance by $12.50 (a negative rate of change m = -12.50). The equation is b = -12.50t + 120.',
    hint: 'Balance starts at +120 and decreases by 12.50 for every ticket t.',
  },
  {
    id: 'staar-slope-26',
    category: 'multiple-representation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Two Coordinate Pairs',
    question:
      'A line passes through the coordinate points (-2, -9) and (4, 9). Which equation represents this line in y = mx + b form?',
    options: ['y = 3x - 3', 'y = 3x + 3', 'y = 1/3 x - 3', 'y = 3x - 9'],
    correctIndex: 0,
    explanation:
      'First calculate slope: m = (9 - (-9)) / (4 - (-2)) = 18 / 6 = 3. Next substitute (4, 9) into y = mx + b: 9 = 3(4) + b → 9 = 12 + b → b = -3. The equation is y = 3x - 3.',
    hint: 'Find slope m = 18 / 6 = 3. Substitute (4, 9) into y = 3x + b to solve for b = -3.',
  },
  {
    id: 'staar-slope-27',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Predicting Value from Graph Equation',
    question:
      'The graph models the total cost of an event catering service, y, for x guests. The line passes through (0, 15) and (5, 35). Based on this linear model, what would be the total cost for 24 guests?',
    graphData: {
      title: 'Catering Cost vs Guests',
      xLabel: 'Number of Guests (x)',
      yLabel: 'Total Cost in Dollars (y)',
      xMin: 0,
      xMax: 12,
      yMin: 0,
      yMax: 60,
      xStep: 2,
      yStep: 10,
      lines: [
        {
          slope: 4,
          intercept: 15,
          color: '#38bdf8',
          points: [
            { x: 0, y: 15, label: '(0, 15)' },
            { x: 5, y: 35, label: '(5, 35)' },
            { x: 10, y: 55, label: '(10, 55)' },
          ],
        },
      ],
    },
    options: ['$111', '$96', '$120', '$105'],
    correctIndex: 0,
    explanation:
      'Determine the equation: y-intercept b = 15; slope m = (35 - 15) / (5 - 0) = 20 / 5 = 4. The equation is y = 4x + 15. For 24 guests: y = 4(24) + 15 = 96 + 15 = $111.',
    hint: 'Find the rule y = 4x + 15. Plug in x = 24 to find the cost.',
  },
  {
    id: 'staar-slope-28',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Comparing y-Intercepts from Two Tables',
    question:
      'The tables show the total cost y for x months of membership at two fitness centers. What is the difference between the initial sign-up fees (the y-intercepts) of Plan A and Plan B?',
    tableData: {
      headers: ['Months (x)', 'Plan A Cost ($)', 'Plan B Cost ($)'],
      rows: [
        [2, 50, 60],
        [4, 80, 90],
        [6, 110, 120],
      ],
    },
    options: [
      'Plan B initial sign-up fee is $10 greater than Plan A.',
      'Plan A initial sign-up fee is $25 less than Plan B.',
      'Both plans have the exact same initial sign-up fee.',
      'Plan B initial sign-up fee is $5 greater than Plan A.',
    ],
    correctIndex: 0,
    explanation:
      'For Plan A: slope m = (80 - 50) / 2 = 15. Sign-up fee b = 50 - 15(2) = $20. For Plan B: slope m = (90 - 60) / 2 = 15. Sign-up fee b = 60 - 15(2) = $30. Plan B fee ($30) is $10 greater than Plan A fee ($20).',
    hint: 'Find the monthly rate for each plan (15). Work back to Month 0: Plan A is 50 - 30 = 20; Plan B is 60 - 30 = 30.',
  },
  {
    id: 'staar-slope-29',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Interpreting the y-Intercept in Context',
    question:
      'A laboratory burns a test candle and tracks its remaining height with the equation h = -0.75t + 9, where h is the candle height in inches and t is hours burned. What does the number 9 represent in this equation?',
    options: [
      'The initial height of the candle in inches before it was burned',
      'The number of inches the candle burns each hour',
      'The total number of hours until the candle burns down completely',
      'The diameter of the candle base in inches',
    ],
    correctIndex: 0,
    explanation:
      'When t = 0 (before burning begins), h = -0.75(0) + 9 = 9 inches. In y = mx + b, the constant b = 9 represents the starting height (y-intercept).',
    hint: 'The y-intercept occurs when t = 0 hours, representing the starting condition.',
  },
  {
    id: 'staar-slope-30',
    category: 'equation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Converting Linear Equations to y = mx + b Form',
    question:
      'Which equation is equivalent to 3x + 2y = 12 written in slope-intercept form (y = mx + b)?',
    options: [
      'y = -3/2 x + 6',
      'y = 3/2 x + 6',
      'y = -3x + 12',
      'y = -2/3 x + 4',
    ],
    correctIndex: 0,
    explanation:
      'Isolate y: subtract 3x from both sides to get 2y = -3x + 12. Then divide every term by 2: y = -3/2 x + 6.',
    hint: 'Subtract 3x from both sides, then divide all terms by 2.',
  },
  {
    id: 'staar-slope-31',
    category: 'multiple-representation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Matching Table to Equation and Calculating Value',
    question:
      'The table shows the total charge y for an appliance technician to complete a service call lasting x hours. What is the equation in slope-intercept form, and what is the total charge for a 5-hour repair?',
    tableData: {
      headers: ['Hours of Labor (x)', 'Total Cost in Dollars (y)'],
      rows: [
        [1.5, 95],
        [3.0, 155],
        [4.5, 215],
        [6.0, 275],
      ],
    },
    options: [
      'y = 40x + 35; a 5-hour repair costs $235',
      'y = 60x + 35; a 5-hour repair costs $335',
      'y = 40x + 55; a 5-hour repair costs $255',
      'y = 35x + 40; a 5-hour repair costs $215',
    ],
    correctIndex: 0,
    explanation:
      'Find slope: m = (155 - 95) / (3.0 - 1.5) = 60 / 1.5 = 40. Find y-intercept: 95 = 40(1.5) + b → 95 = 60 + b → b = 35. Equation: y = 40x + 35. For x = 5: y = 40(5) + 35 = 200 + 35 = $235.',
    hint: 'Slope m = 60 / 1.5 = 40. Intercept b = 95 - 60 = 35. Calculate 40(5) + 35.',
  },
  {
    id: 'staar-slope-32',
    category: 'graph',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Graph with Negative y-Intercept',
    question:
      'The graph displays a linear function. Which equation represents this line?',
    graphData: {
      title: 'Line with Negative y-Intercept',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0,
      xMax: 8,
      yMin: -6,
      yMax: 10,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          slope: 2,
          intercept: -4,
          color: '#38bdf8',
          points: [
            { x: 0, y: -4, label: '(0, -4)' },
            { x: 2, y: 0, label: '(2, 0)' },
            { x: 4, y: 4, label: '(4, 4)' },
            { x: 6, y: 8, label: '(6, 8)' },
          ],
        },
      ],
    },
    options: ['y = 2x - 4', 'y = 2x + 4', 'y = -2x - 4', 'y = 1/2 x - 4'],
    correctIndex: 0,
    explanation:
      'The line crosses the vertical y-axis at (0, -4), giving b = -4. Using points (0, -4) and (2, 0), the slope is m = (0 - (-4)) / (2 - 0) = 4 / 2 = 2. In slope-intercept form, the equation is y = 2x - 4.',
    hint: 'b = -4 from the y-intercept. For slope: (0 - (-4)) / 2 = 2.',
  },
  {
    id: 'staar-slope-33',
    category: 'equation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Slope and a Point',
    question:
      'A line has a slope of -3/5 and passes through the coordinate point (10, -2). What is the equation of the line in slope-intercept form?',
    options: [
      'y = -3/5 x + 4',
      'y = -3/5 x - 8',
      'y = 3/5 x + 4',
      'y = -3/5 x - 2',
    ],
    correctIndex: 0,
    explanation:
      'Substitute m = -3/5, x = 10, and y = -2 into y = mx + b: -2 = (-3/5)(10) + b → -2 = -6 + b → b = 4. The equation is y = -3/5 x + 4.',
    hint: 'Multiply (-3/5) by 10 to get -6. Add 6 to -2 to find b = 4.',
  },
  {
    id: 'staar-slope-34',
    category: 'word-problem',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Finding Altitude Equation and Landing Time',
    question:
      'An aircraft cruises at an altitude of 32,000 feet and descends toward an airport at a constant rate of 1,600 feet per minute. Which equation models the altitude A in feet after m minutes, and how many minutes will it take for the aircraft to reach ground level (A = 0)?',
    options: [
      'A = -1,600m + 32,000; 20 minutes to land',
      'A = 1,600m + 32,000; 20 minutes to land',
      'A = -1,600m + 32,000; 50 minutes to land',
      'A = 32,000m - 1,600; 0.05 minute to land',
    ],
    correctIndex: 0,
    explanation:
      'Starting altitude is 32,000 (y-intercept) and altitude decreases at 1,600 ft/min (slope m = -1,600). Equation: A = -1,600m + 32,000. To find landing time, set A = 0: 0 = -1,600m + 32,000 → 1,600m = 32,000 → m = 20 minutes.',
    hint: 'Descent means negative slope (-1,600). Divide 32,000 by 1,600 to find the landing time.',
  },
  {
    id: 'staar-slope-35',
    category: 'table',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Equation from Table with Fractional Slope',
    question:
      'Which linear equation describes the table of coordinates below?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        [-6, -1],
        [-2, 1],
        [2, 3],
        [6, 5],
      ],
    },
    options: ['y = 1/2 x + 2', 'y = 2x + 2', 'y = 1/2 x - 1', 'y = x + 2'],
    correctIndex: 0,
    explanation:
      'Calculate slope: m = (3 - 1) / (2 - (-2)) = 2 / 4 = 1/2. Substitute (2, 3) into y = 1/2 x + b: 3 = (1/2)(2) + b → 3 = 1 + b → b = 2. The equation is y = 1/2 x + 2.',
    hint: 'Slope m = 2 / 4 = 1/2. Test point (2, 3): 3 = 1/2(2) + 2 = 1 + 2 = 3.',
  },
  {
    id: 'staar-slope-36',
    category: 'multiple-representation',
    slopeType: 'linear-equations',
    teksCode: 'TEKS 8.5.I',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Multi-Step Comparison of Rate and Starting Value',
    question:
      'Subscription Service A charges an initial registration fee plus a monthly fee modeled by y = 15x + 25. Subscription Service B charges according to a table containing the points (2, 64) and (5, 127). Which statement correctly compares the two services?',
    options: [
      'Service B has a greater monthly fee ($21/mo vs. $15/mo), but Service A has a greater initial registration fee ($25 vs. $22).',
      'Service A has both a greater monthly fee and a greater initial registration fee.',
      'Service B has both a greater monthly fee and a greater initial registration fee.',
      'Both services charge the exact same monthly fee of $15, but Service B has a $22 registration fee.',
    ],
    correctIndex: 0,
    explanation:
      'For Service A: monthly rate m = $15/mo; registration fee b = $25. For Service B: monthly rate m = (127 - 64) / (5 - 2) = 63 / 3 = $21/mo; registration fee b = 64 - 21(2) = 64 - 42 = $22. Therefore, Service B has a higher monthly rate ($21 > $15), but Service A has a higher initial fee ($25 > $22).',
    hint: 'Find Service B monthly fee: (127 - 64) / 3 = 21. Find Service B starting fee: 64 - 21(2) = 22. Compare with Service A (15 and 25).',
  },
];
