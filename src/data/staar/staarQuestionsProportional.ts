import { QuestionTable } from '../../types';

export interface GraphPoint {
  x: number;
  y: number;
  label?: string; // e.g. "(0, 0)", "(1, 14)", "(4, 56)"
  highlight?: boolean;
}

export interface GraphLine {
  id?: string;
  name?: string; // e.g. "Line A", "Car 1", "Plan 1"
  slope: number; // m in y = mx + b
  intercept: number; // b in y = mx + b
  color?: string; // e.g. "emerald", "indigo", "rose", "amber"
  points?: GraphPoint[];
  dashed?: boolean;
}

export interface SlopeTriangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  riseLabel?: string; // e.g. "Rise = 5"
  runLabel?: string;  // e.g. "Run = 2"
}

export interface QuestionGraph {
  title?: string;
  xLabel: string; // e.g. "Time (hours)" or "x"
  yLabel: string; // e.g. "Distance (miles)" or "y"
  xMin?: number; // default 0
  xMax: number;  // e.g. 6, 8, 10
  yMin?: number; // default 0
  yMax: number;  // e.g. 30, 80, 100
  xStep?: number; // e.g. 1 or 2
  yStep?: number; // e.g. 5, 10, 20
  lines: GraphLine[];
  triangles?: SlopeTriangle[];
}

export type RelationshipType = 'proportional' | 'nonProportional' | 'mixed';

export type QuestionCategory =
  | 'graph'
  | 'table'
  | 'equation'
  | 'word-problem'
  | 'multiple-representation';

export interface StaarPracticeQuestion {
  id: string;
  category: QuestionCategory;
  relationshipType: RelationshipType;
  teksCode: string; // e.g. "TEKS 8.4.B", "TEKS 8.5.E", "TEKS 8.5.F", "TEKS 8.5.H", "TEKS 8.4.A", "TEKS 8.4.C"
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

/**
 * Bank of exactly 36 Original Grade 8 STAAR-Style Proportional & Linear Relationships Questions.
 * Aligned to Texas TEKS:
 *   - TEKS 8.4.A: Similar right triangles & slope
 *   - TEKS 8.4.B: Unit rate as slope from graphs (y = kx)
 *   - TEKS 8.4.C: Slope & y-intercept from tables, graphs, equations (y = mx + b)
 *   - TEKS 8.5.E: Direct variation problem solving (y = kx)
 *   - TEKS 8.5.F: Distinguishing proportional vs non-proportional representations
 *   - TEKS 8.5.H: Real-world proportional vs non-proportional situations
 *
 * Balanced Distribution:
 *   - 8 Graph-based questions (with dedicated interactive/visual coordinate graphs)
 *   - 6 Table/Data questions
 *   - 8 Equation-focused questions
 *   - 10 Real-world word problems
 *   - 4 Multiple-representation & comparison questions
 * Total: 36 questions
 */
export const STAAR_PROPORTIONAL_QUESTIONS: StaarPracticeQuestion[] = [
  // ==========================================
  // SECTION 1: GRAPH-BASED QUESTIONS (8 Items: q01 - q08)
  // ==========================================
  {
    id: 'staar-p-q01',
    relationshipType: 'proportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Unit Rate as Slope from a Coordinate Graph',
    question: 'The coordinate graph shows the total distance traveled by a cyclist over time during a training ride. What is the unit rate in miles per hour?',
    context: 'Graph of proportional line passing through (0, 0) and (4, 56)',
    graphData: {
      title: 'Cyclist Training Distance Over Time',
      xLabel: 'Time in Hours (x)',
      yLabel: 'Distance in Miles (y)',
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 80,
      xStep: 1,
      yStep: 10,
      lines: [
        {
          id: 'cyclist-line',
          name: 'Cyclist',
          slope: 14,
          intercept: 0,
          color: 'emerald',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 1, y: 14, label: '(1, 14)', highlight: true },
            { x: 4, y: 56, label: '(4, 56)' },
          ],
        },
      ],
    },
    options: [
      '14 miles per hour',
      '12 miles per hour',
      '0.07 miles per hour',
      '52 miles per hour',
    ],
    correctIndex: 0,
    explanation: 'The graph represents a proportional relationship passing through (0, 0) and (4, 56). The unit rate is the slope: k = y / x = 56 / 4 = 14 miles per hour. The point (1, 14) directly confirms that in 1 hour, the cyclist travels 14 miles.',
    hint: 'Divide the distance (56) by the time (4 hours): k = 56 / 4, or locate the y-value when x = 1.',
  },
  {
    id: 'staar-p-q02',
    relationshipType: 'mixed',
    category: 'graph',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Proportional vs Non-Proportional Graphical Comparison',
    question: 'The coordinate plane shows the linear graphs of Line A and Line B. Which statement correctly explains why only Line A represents a proportional relationship?',
    context: 'Comparing Line A (y = 3x) and Line B (y = 3x + 6)',
    graphData: {
      title: 'Comparison of Linear Relationships',
      xLabel: 'Input (x)',
      yLabel: 'Output (y)',
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 24,
      xStep: 1,
      yStep: 4,
      lines: [
        {
          id: 'line-a',
          name: 'Line A (Proportional)',
          slope: 3,
          intercept: 0,
          color: 'emerald',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 2, y: 6, label: '(2, 6)' },
            { x: 4, y: 12, label: '(4, 12)' },
          ],
        },
        {
          id: 'line-b',
          name: 'Line B (Non-Proportional)',
          slope: 3,
          intercept: 6,
          color: 'rose',
          points: [
            { x: 0, y: 6, label: '(0, 6)' },
            { x: 2, y: 12, label: '(2, 12)' },
            { x: 4, y: 18, label: '(4, 18)' },
          ],
        },
      ],
    },
    options: [
      'Line A passes through the origin (0, 0) with a constant ratio y/x = 3, whereas Line B has a non-zero y-intercept at (0, 6).',
      'Line A has a steeper slope than Line B.',
      'Line B is proportional because it has a positive y-intercept.',
      'Both lines are proportional because they are parallel straight lines.',
    ],
    correctIndex: 0,
    explanation: 'By definition, a proportional linear graph MUST pass through the origin (0, 0) so that the ratio y/x is constant for all points (6/2 = 3, 12/4 = 3). Line B crosses the y-axis at (0, 6), which makes y/x change (12/2 = 6, 18/4 = 4.5), making Line B non-proportional.',
    hint: 'Look at where each line intersects the vertical y-axis. Proportional graphs must pass through the origin (0, 0).',
  },
  {
    id: 'staar-p-q03',
    relationshipType: 'nonProportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope and y-Intercept from a Non-Proportional Linear Graph',
    question: 'The graph shows the total cost y in dollars of renting a kayak for x hours from a lakeside rental shop. Which linear equation represents this relationship?',
    context: 'Kayak rental fee graph with initial fee and hourly rate',
    graphData: {
      title: 'Kayak Rental Cost Model',
      xLabel: 'Rental Time in Hours (x)',
      yLabel: 'Total Cost in Dollars (y)',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 100,
      xStep: 1,
      yStep: 10,
      lines: [
        {
          id: 'kayak-line',
          name: 'Total Rental Cost',
          slope: 10,
          intercept: 20,
          color: 'indigo',
          points: [
            { x: 0, y: 20, label: '(0, 20)' },
            { x: 2, y: 40, label: '(2, 40)' },
            { x: 4, y: 60, label: '(4, 60)' },
            { x: 6, y: 80, label: '(6, 80)' },
          ],
        },
      ],
    },
    options: [
      'y = 10x + 20',
      'y = 20x + 10',
      'y = 10x',
      'y = 20x',
    ],
    correctIndex: 0,
    explanation: 'The line crosses the y-axis at (0, 20), so the initial base fee (y-intercept) is b = 20. The slope is m = (60 - 20) / (4 - 0) = 40 / 4 = $10 per hour. In slope-intercept form y = mx + b, the equation is y = 10x + 20.',
    hint: 'Identify the y-intercept (starting value at x = 0) and calculate the slope (rise over run) between (0, 20) and (4, 60).',
  },
  {
    id: 'staar-p-q04',
    relationshipType: 'proportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.A',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Similar Right Triangles on a Linear Graph',
    question: 'Two similar right triangles are drawn along the graphed line on the coordinate plane. Which proportion correctly shows that the slope of the line is constant?',
    context: 'Similar slope triangles along line y = 2.5x',
    graphData: {
      title: 'Slope Triangles on a Linear Graph',
      xLabel: 'Horizontal Change (Run)',
      yLabel: 'Vertical Change (Rise)',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 20,
      xStep: 1,
      yStep: 2,
      lines: [
        {
          id: 'slope-line',
          name: 'Line (slope = 2.5)',
          slope: 2.5,
          intercept: 0,
          color: 'indigo',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 2, y: 5, label: '(2, 5)' },
            { x: 6, y: 15, label: '(6, 15)' },
          ],
        },
      ],
      triangles: [
        {
          x1: 0,
          y1: 0,
          x2: 2,
          y2: 5,
          riseLabel: 'Rise = 5',
          runLabel: 'Run = 2',
        },
        {
          x1: 2,
          y1: 5,
          x2: 6,
          y2: 15,
          riseLabel: 'Rise = 10',
          runLabel: 'Run = 4',
        },
      ],
    },
    options: [
      '5 / 2 = 10 / 4',
      '5 / 10 = 4 / 2',
      '2 / 5 = 10 / 4',
      '5 * 2 = 10 * 4',
    ],
    correctIndex: 0,
    explanation: 'Slope is defined as the ratio of vertical change (rise) to horizontal change (run). For the first triangle, the ratio is 5 / 2 = 2.5. For the second triangle, the ratio is 10 / 4 = 2.5. Because the right triangles are similar by Angle-Angle similarity, 5 / 2 = 10 / 4 proves the slope is constant.',
    hint: 'Slope = rise / run. Match (vertical leg of Triangle 1) / (horizontal leg of Triangle 1) = (vertical leg of Triangle 2) / (horizontal leg of Triangle 2).',
  },
  {
    id: 'staar-p-q05',
    relationshipType: 'proportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Rates of Change on a Coordinate Graph',
    question: 'The coordinate graph displays the distance in meters traveled over time in seconds by two motorized robot cars, Car 1 and Car 2. Which statement accurately compares their speeds?',
    context: 'Graph comparing Car 1 (6 m/s) and Car 2 (4 m/s)',
    graphData: {
      title: 'Robot Car Distance vs. Time Comparison',
      xLabel: 'Time in Seconds (x)',
      yLabel: 'Distance in Meters (y)',
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 60,
      xStep: 1,
      yStep: 10,
      lines: [
        {
          id: 'car-1',
          name: 'Car 1',
          slope: 6,
          intercept: 0,
          color: 'emerald',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 5, y: 30, label: '(5, 30)' },
          ],
        },
        {
          id: 'car-2',
          name: 'Car 2',
          slope: 4,
          intercept: 0,
          color: 'indigo',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 8, y: 32, label: '(8, 32)' },
          ],
        },
      ],
    },
    options: [
      'Car 1 travels 2 meters per second faster than Car 2.',
      'Car 2 travels 2 meters per second faster than Car 1.',
      'Both cars travel at the exact same speed of 4 meters per second.',
      'Car 1 travels 30 meters per second and Car 2 travels 32 meters per second.',
    ],
    correctIndex: 0,
    explanation: 'Speed is the slope (distance divided by time). Car 1 rate: 30 / 5 = 6 m/s. Car 2 rate: 32 / 8 = 4 m/s. Comparing the speeds: 6 - 4 = 2 meters per second faster for Car 1.',
    hint: 'Find the unit rate for each car by dividing distance (y) by time (x), then compare the two rates.',
  },
  {
    id: 'staar-p-q06',
    relationshipType: 'nonProportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Interpreting the Real-World Meaning of y-Intercept',
    question: 'A rainwater harvesting tank is being filled during a storm. The graph models the total volume of water y in gallons in the tank after x hours. What does the y-intercept of the graph represent?',
    context: 'Graph of rainwater collection starting at (0, 40)',
    graphData: {
      title: 'Rainwater Harvesting Tank Volume',
      xLabel: 'Time in Hours (x)',
      yLabel: 'Volume in Gallons (y)',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 180,
      xStep: 1,
      yStep: 20,
      lines: [
        {
          id: 'tank-line',
          name: 'Water Volume',
          slope: 15,
          intercept: 40,
          color: 'teal',
          points: [
            { x: 0, y: 40, label: '(0, 40)', highlight: true },
            { x: 4, y: 100, label: '(4, 100)' },
            { x: 8, y: 160, label: '(8, 160)' },
          ],
        },
      ],
    },
    options: [
      'The tank already contained 40 gallons of water before the storm began.',
      'The water fills at a constant rate of 40 gallons per hour.',
      'The tank reaches full capacity after 40 hours of rainfall.',
      'The maximum capacity of the storage tank is 160 gallons.',
    ],
    correctIndex: 0,
    explanation: 'The y-intercept is the point (0, 40), where time x = 0. At 0 hours (before the rain started filling the tank), the tank already contained 40 gallons of residual water. The slope ($15 gal/hr) is the fill rate.',
    hint: 'The y-intercept occurs where x = 0. In this problem, what does 0 hours mean?',
  },
  {
    id: 'staar-p-q07',
    relationshipType: 'nonProportional',
    category: 'graph',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Non-Proportional Service Fee Analysis from Graph',
    question: 'The line graphed on the coordinate plane represents the total charges for an appliance repair technician based on labor hours worked. Why is this relationship classified as non-proportional?',
    context: 'Technician fee graph: initial fee $30 plus $10/hr',
    graphData: {
      title: 'Appliance Repair Technician Charges',
      xLabel: 'Labor Time in Hours (x)',
      yLabel: 'Total Service Cost in Dollars (y)',
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 100,
      xStep: 1,
      yStep: 10,
      lines: [
        {
          id: 'repair-line',
          name: 'Total Service Cost',
          slope: 10,
          intercept: 30,
          color: 'amber',
          points: [
            { x: 0, y: 30, label: '(0, 30)', highlight: true },
            { x: 2, y: 50, label: '(2, 50)' },
            { x: 4, y: 70, label: '(4, 70)' },
            { x: 6, y: 90, label: '(6, 90)' },
          ],
        },
      ],
    },
    options: [
      'The graph has a non-zero y-intercept at (0, 30) instead of passing through (0, 0), so the ratio y/x is not constant.',
      'The graph is a straight line with a constant positive slope.',
      'The technician charges a flat hourly rate of $10 per hour.',
      'The total cost increases as the number of labor hours increases.',
    ],
    correctIndex: 0,
    explanation: 'A linear relationship is proportional ONLY if it passes through the origin (0, 0). Because this graph has an initial service fee of $30 (y-intercept at (0, 30)), calculating y/x yields 50/2 = 25 and 70/4 = 17.5. Since the ratio is not constant and b ≠ 0, it is non-proportional.',
    hint: 'Check if the line passes through (0, 0). If the line intersects the y-axis above or below 0, it cannot be proportional.',
  },
  {
    id: 'staar-p-q08',
    relationshipType: 'proportional',
    category: 'graph',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying the Unit Rate Point (1, r) on a Graph',
    question: 'A gourmet bakery sells handcrafted cookies by the dozen. The graph shows the proportional relationship between the number of dozens purchased (x) and the total cost (y). What point on the graph represents the unit rate?',
    context: 'Graph showing cookie cost with points (0, 0), (1, 15), (3, 45), (5, 75)',
    graphData: {
      title: 'Handcrafted Cookie Pricing',
      xLabel: 'Dozens of Cookies (x)',
      yLabel: 'Total Price in Dollars (y)',
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 90,
      xStep: 1,
      yStep: 15,
      lines: [
        {
          id: 'cookie-line',
          name: 'Cookie Cost',
          slope: 15,
          intercept: 0,
          color: 'emerald',
          points: [
            { x: 0, y: 0, label: '(0, 0)' },
            { x: 1, y: 15, label: '(1, 15)', highlight: true },
            { x: 3, y: 45, label: '(3, 45)' },
            { x: 5, y: 75, label: '(5, 75)' },
          ],
        },
      ],
    },
    options: [
      '(1, 15), which shows that 1 dozen cookies costs $15',
      '(15, 1), which shows that 15 dozen cookies cost $1',
      '(0, 0), which shows that 0 dozen cookies cost $0',
      '(3, 45), which shows that 3 dozen cookies cost $45',
    ],
    correctIndex: 0,
    explanation: 'On a proportional graph passing through (0, 0), the unit rate is always represented by the ordered pair (1, r), where r is the rate of change. The point (1, 15) indicates that 1 dozen cookies costs exactly $15.',
    hint: 'The unit rate always has an x-coordinate of 1: look for the point (1, y).',
  },

  // ==========================================
  // SECTION 2: TABLE / DATA QUESTIONS (6 Items: q09 - q14)
  // ==========================================
  {
    id: 'staar-p-q09',
    relationshipType: 'proportional',
    category: 'table',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Identifying Proportional Relationships in Tables',
    question: 'Which table represents a proportional relationship between x and y?',
    tableData: {
      headers: ['x', 'Table A (y)', 'Table B (y)', 'Table C (y)', 'Table D (y)'],
      rows: [
        ['2', '7', '9', '6', '10'],
        ['4', '14', '13', '14', '16'],
        ['6', '21', '17', '24', '22'],
        ['8', '28', '21', '36', '28'],
      ],
    },
    options: [
      'Table A, because the ratio y/x is constant at 3.5 for all data pairs',
      'Table B, because each y-value increases by 4 as x increases by 2',
      'Table C, because the values of y increase as x increases',
      'Table D, because when x = 8, y = 28',
    ],
    correctIndex: 0,
    explanation: 'In Table A, testing each row gives y / x: 7 / 2 = 3.5, 14 / 4 = 3.5, 21 / 6 = 3.5, and 28 / 8 = 3.5. Because the ratio y / x is identical for every single pair, Table A is the only proportional relationship. Table B and D have non-zero y-intercepts (y = 2x + 5 and y = 3x + 4), making them non-proportional.',
    hint: 'Calculate the ratio y / x for every row in each table. A proportional table must have the exact same quotient in every row.',
  },
  {
    id: 'staar-p-q10',
    relationshipType: 'nonProportional',
    category: 'table',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Slope and y-Intercept from a Tabular Relationship',
    question: 'The table shows the linear relationship between x and y. What are the slope (m) and y-intercept (b) represented by this table?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        ['0', '14'],
        ['2', '24'],
        ['5', '39'],
        ['8', '54'],
      ],
    },
    options: [
      'Slope m = 5, y-intercept b = 14',
      'Slope m = 14, y-intercept b = 5',
      'Slope m = 10, y-intercept b = 14',
      'Slope m = 5, y-intercept b = 0',
    ],
    correctIndex: 0,
    explanation: 'When x = 0, y = 14, which directly gives the y-intercept b = 14. The slope is m = (change in y) / (change in x) = (24 - 14) / (2 - 0) = 10 / 2 = 5 (or (39 - 24) / (5 - 2) = 15 / 3 = 5). Thus, m = 5 and b = 14 (Equation: y = 5x + 14).',
    hint: 'The y-intercept is the y-value when x = 0. Find the slope using m = (y2 - y1) / (x2 - x1).',
  },
  {
    id: 'staar-p-q11',
    relationshipType: 'proportional',
    category: 'table',
    teksCode: 'TEKS 8.5.E',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Constant of Proportionality from Decimal Table',
    question: 'The table shows the volume of water pumped by an agricultural irrigation system over different amounts of operating time. What is the constant of proportionality in gallons per minute?',
    tableData: {
      headers: ['Time in Minutes (x)', 'Volume in Gallons (y)'],
      rows: [
        ['2.5', '45'],
        ['4.0', '72'],
        ['7.5', '135'],
        ['10.0', '180'],
      ],
    },
    options: [
      '18 gallons per minute',
      '16.5 gallons per minute',
      '0.056 gallons per minute',
      '42.5 gallons per minute',
    ],
    correctIndex: 0,
    explanation: 'Calculate the constant of proportionality k = y / x for each row: 45 / 2.5 = 18, 72 / 4.0 = 18, 135 / 7.5 = 18, and 180 / 10.0 = 18. The constant of proportionality is 18 gallons per minute.',
    hint: 'Divide the volume in gallons (y) by the time in minutes (x): k = 72 / 4 = 18.',
  },
  {
    id: 'staar-p-q12',
    relationshipType: 'nonProportional',
    category: 'table',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Determining Missing Value in Non-Proportional Linear Table',
    question: 'The table represents a non-proportional linear relationship between x and y. What is the missing value of y when x = 10?',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        ['1', '11'],
        ['3', '17'],
        ['6', '26'],
        ['10', '?'],
      ],
    },
    options: [
      '38',
      '35',
      '41',
      '30',
    ],
    correctIndex: 0,
    explanation: 'First find the constant slope: m = (17 - 11) / (3 - 1) = 6 / 2 = 3. Using point (1, 11) to find the y-intercept: 11 = 3(1) + b, so b = 8 (Equation: y = 3x + 8). When x = 10, y = 3(10) + 8 = 30 + 8 = 38.',
    hint: 'Find the slope m = (17 - 11) / (3 - 1) = 3. Write the equation y = 3x + 8, then plug in x = 10.',
  },
  {
    id: 'staar-p-q13',
    relationshipType: 'nonProportional',
    category: 'table',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Identifying Non-Proportional Tabular Data',
    question: 'The table represents the total balance remaining in a prepaid student account after purchasing meals. Why is this relationship non-proportional?',
    tableData: {
      headers: ['Meals Purchased (x)', 'Account Balance in Dollars (y)'],
      rows: [
        ['0', '50'],
        ['2', '42'],
        ['5', '30'],
        ['8', '18'],
      ],
    },
    options: [
      'When x = 0, y = 50 instead of 0, so the ratio y/x is not constant (42/2 = 21 ≠ 30/5 = 6).',
      'The balance decreases at a constant rate of $4 per meal.',
      'The values of y decrease as x increases.',
      'All the numbers in the table are whole positive integers.',
    ],
    correctIndex: 0,
    explanation: 'A proportional relationship requires that when x = 0, y = 0. In this table, when 0 meals are purchased, there is an initial balance of $50 (b = 50 ≠ 0). Testing ratios gives 42 / 2 = 21 and 30 / 5 = 6. Because the ratio y/x changes, this linear relationship is non-proportional.',
    hint: 'Notice that at 0 meals, the balance is $50. Proportional relationships must have y = 0 when x = 0.',
  },
  {
    id: 'staar-p-q14',
    relationshipType: 'nonProportional',
    category: 'table',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Constant Rate of Change from Tabular Data',
    question: 'A commercial bakery mixes artisanal dough using flour according to the proportional relationship in the table. What is the constant rate of change in cups of flour per batch?',
    tableData: {
      headers: ['Batches of Bread (x)', 'Cups of Flour (y)'],
      rows: [
        ['3', '10.5'],
        ['5', '17.5'],
        ['8', '28.0'],
        ['12', '42.0'],
      ],
    },
    options: [
      '3.5 cups per batch',
      '0.29 cups per batch',
      '7.0 cups per batch',
      '2.5 cups per batch',
    ],
    correctIndex: 0,
    explanation: 'The rate of change is k = y / x. For every row: 10.5 / 3 = 3.5, 17.5 / 5 = 3.5, 28.0 / 8 = 3.5, and 42.0 / 12 = 3.5 cups of flour per batch.',
    hint: 'Divide the cups of flour (y) by the number of batches (x): 10.5 / 3 = 3.5.',
  },

  // ==========================================
  // SECTION 3: EQUATION-FOCUSED QUESTIONS (8 Items: q15 - q22)
  // ==========================================
  {
    id: 'staar-p-q15',
    relationshipType: 'mixed',
    category: 'equation',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Classifying Linear Equations as Proportional vs Non-Proportional',
    question: 'Which of the following linear equations represents a proportional relationship between x and y?',
    context: 'Evaluating linear equations for direct variation form y = kx',
    options: [
      'y = (5/8)x',
      'y = (5/8)x + 3',
      'y = 5x - 8',
      'y = 5 / (8x)',
    ],
    correctIndex: 0,
    explanation: 'A proportional equation has the direct variation linear form y = kx with a y-intercept of b = 0. The equation y = (5/8)x passes through (0, 0). The equations y = (5/8)x + 3 and y = 5x - 8 are non-proportional because b ≠ 0, and y = 5/(8x) is an inverse variation.',
    hint: 'Proportional equations follow the exact form y = kx with NO added or subtracted constant.',
  },
  {
    id: 'staar-p-q16',
    relationshipType: 'nonProportional',
    category: 'equation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Interpreting Slope and y-Intercept in a Contextual Equation',
    question: 'The temperature of a cooling chemical solution is modeled by the linear equation y = -2.5x + 75, where x represents time in minutes and y represents temperature in °F. What do the slope and y-intercept represent in this context?',
    context: 'Linear equation: y = -2.5x + 75',
    options: [
      'The slope (-2.5) means the temperature decreases by 2.5°F per minute, and the y-intercept (75) is the initial temperature of 75°F.',
      'The slope (75) means the initial temperature is 75°F, and the y-intercept (-2.5) is the rate of cooling.',
      'The solution cools by 75°F every 2.5 minutes.',
      'The equation represents a proportional relationship with a constant rate of 72.5°F.',
    ],
    correctIndex: 0,
    explanation: 'In the linear equation y = mx + b, m is the rate of change (slope) and b is the initial starting value (y-intercept). Here, m = -2.5 means the temperature drops 2.5°F every minute, and b = 75 means at x = 0 minutes, the solution started at 75°F.',
    hint: 'In y = mx + b, m is the rate per unit of x, and b is the starting value when x = 0.',
  },
  {
    id: 'staar-p-q17',
    relationshipType: 'proportional',
    category: 'equation',
    teksCode: 'TEKS 8.5.E',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Direct Variation Equation Solving',
    question: 'The value of y varies directly with x. When x = 8, the value of y is 36. What is the value of y when x = 14?',
    context: 'Direct variation: y = kx, with (8, 36)',
    options: [
      '63',
      '56',
      '42',
      '3.11',
    ],
    correctIndex: 0,
    explanation: 'First find the constant of proportionality k = y / x = 36 / 8 = 4.5. Then substitute x = 14 into the direct variation equation y = 4.5x: y = 4.5 * 14 = 63.',
    hint: 'Step 1: Calculate k = 36 / 8 = 4.5. Step 2: Multiply 4.5 by 14.',
  },
  {
    id: 'staar-p-q18',
    relationshipType: 'nonProportional',
    category: 'equation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Formulating Slope-Intercept Equation from Verbal Description',
    question: 'A licensed plumber charges a $55 diagnostic service fee plus $45 for each hour of repair work. Which equation can be used to determine C, the total cost for h hours of repair work?',
    context: 'Plumber pricing: $55 base fee + $45/hour',
    options: [
      'C = 45h + 55',
      'C = 55h + 45',
      'C = 100h',
      'C = 45h - 55',
    ],
    correctIndex: 0,
    explanation: 'The hourly rate of $45 per hour is the slope (rate of change multiplied by h), and the one-time diagnostic fee of $55 is the y-intercept (initial value b). The slope-intercept equation is C = 45h + 55.',
    hint: 'The rate per hour ($45) multiplies the hours (h), and the one-time fee ($55) is added.',
  },
  {
    id: 'staar-p-q19',
    relationshipType: 'nonProportional',
    category: 'equation',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Identifying Non-Proportional Equations with Intercepts',
    question: 'Which of the following equations represents a relationship that is NOT proportional?',
    context: 'Comparing equations for direct variation vs. slope-intercept form',
    options: [
      'y = 4.5x - 6',
      'y = 4.5x',
      'y = 0.8x',
      'y = (3/4)x',
    ],
    correctIndex: 0,
    explanation: 'A proportional linear equation has the direct variation form y = kx where the y-intercept is 0. The equation y = 4.5x - 6 has a y-intercept of b = -6 (when x = 0, y = -6 ≠ 0), which makes it non-proportional.',
    hint: 'Look for the equation that has an added or subtracted constant term (b ≠ 0).',
  },
  {
    id: 'staar-p-q20',
    relationshipType: 'proportional',
    category: 'equation',
    teksCode: 'TEKS 8.5.E',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Direct Variation with Fractional Coefficient',
    question: 'The variable y varies directly with x according to the equation y = (4/9)x. What is the value of y when x = 63?',
    context: 'Direct variation: y = (4/9)x',
    options: [
      '28',
      '141.75',
      '31.5',
      '24',
    ],
    correctIndex: 0,
    explanation: 'Substitute x = 63 into the direct variation equation: y = (4/9) * 63 = 4 * (63 / 9) = 4 * 7 = 28.',
    hint: 'Divide 63 by 9 to get 7, then multiply 7 by 4: 7 * 4 = 28.',
  },
  {
    id: 'staar-p-q21',
    relationshipType: 'mixed',
    category: 'equation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Rates of Change and Initial Values of Equations',
    question: 'A student compares two equations: Equation 1 is y = 6x, and Equation 2 is y = 4x + 15. Which statement accurately compares the two equations?',
    context: 'Comparing y = 6x and y = 4x + 15',
    options: [
      'Equation 1 represents a proportional relationship with a rate of change of 6, while Equation 2 is non-proportional with an initial value of 15 and a rate of change of 4.',
      'Both equations are proportional because both have positive slopes.',
      'Equation 2 has a greater rate of change than Equation 1.',
      'Equation 1 has an initial value of 6 and Equation 2 has an initial value of 4.',
    ],
    correctIndex: 0,
    explanation: 'Equation 1 has b = 0 and passes through (0, 0), making it proportional with slope m = 6. Equation 2 has b = 15 (initial value) and slope m = 4, making it non-proportional. Equation 1 has a steeper slope (6 > 4).',
    hint: 'Check the coefficient of x (slope/rate of change) and the constant term (initial value/y-intercept) for each equation.',
  },
  {
    id: 'staar-p-q22',
    relationshipType: 'nonProportional',
    category: 'equation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Linear Equation from Ordered Pairs',
    question: 'A linear relationship contains the ordered pairs (0, 18) and (5, 48). Which equation represents this relationship?',
    context: 'Ordered pairs: (0, 18) and (5, 48)',
    options: [
      'y = 6x + 18',
      'y = 18x + 6',
      'y = 6x',
      'y = 9.6x',
    ],
    correctIndex: 0,
    explanation: 'The point (0, 18) gives the y-intercept b = 18. The slope is m = (48 - 18) / (5 - 0) = 30 / 5 = 6. In slope-intercept form y = mx + b, the equation is y = 6x + 18.',
    hint: 'The point (0, 18) tells you b = 18. Find the slope m = (48 - 18) / (5 - 0) = 6.',
  },

  // ==========================================
  // SECTION 4: REAL-WORLD WORD PROBLEMS (10 Items: q23 - q32)
  // ==========================================
  {
    id: 'staar-p-q23',
    relationshipType: 'mixed',
    category: 'word-problem',
    teksCode: 'TEKS 8.5.H',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Classifying Real-World Proportional Situations',
    question: 'Four fitness gyms advertise their monthly pricing plans. Which gym offers a payment plan where total cost is directly proportional to the number of months?',
    context: 'Evaluating four membership fee structures',
    options: [
      'Gym 1: Charges $29.00 per month with $0 enrollment or annual maintenance fees',
      'Gym 2: Charges $20.00 per month plus a $40.00 one-time registration fee',
      'Gym 3: Charges $25.00 per month plus an annual $15.00 locker fee',
      'Gym 4: First month is free, then $30.00 per month thereafter',
    ],
    correctIndex: 0,
    explanation: 'Gym 1 charges total cost y = 29x. At 0 months, the cost is $0, and y/x = 29 is constant for all months. Gyms 2, 3, and 4 include registration fees, annual surcharges, or free trials that create non-zero starting values (b ≠ 0), making them non-proportional.',
    hint: 'A proportional relationship has a single constant multiplier per unit and zero upfront or registration fees.',
  },
  {
    id: 'staar-p-q24',
    relationshipType: 'nonProportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Non-Proportional Rental Cost Problem Solving',
    question: 'A moving truck rental company charges a daily rental fee of $29.95 plus $0.45 per mile driven. If Marcus rents a truck for one day and drives 120 miles, what is the total cost before taxes?',
    context: 'Truck rental: $29.95 base + $0.45/mile for 120 miles',
    options: [
      '$83.95',
      '$54.00',
      '$84.40',
      '$149.95',
    ],
    correctIndex: 0,
    explanation: 'Set up the non-proportional equation C = 0.45m + 29.95. Multiply the mileage cost: 0.45 * 120 = $54.00. Add the daily base fee: $54.00 + $29.95 = $83.95.',
    hint: 'Multiply the mileage rate ($0.45) by 120 miles, then add the one-time daily fee ($29.95).',
  },
  {
    id: 'staar-p-q25',
    relationshipType: 'mixed',
    category: 'word-problem',
    teksCode: 'TEKS 8.5.H',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Hourly Wage and Earnings Proportionality',
    question: 'Which employee earns total weekly pay that is directly proportional to the number of hours worked?',
    context: 'Evaluating four wage payment policies',
    options: [
      'Elena earns a flat wage of $17.50 per hour for every hour worked.',
      'Lucas earns a base salary of $150 per week plus $12.00 per hour.',
      'Mia earns $16.00 per hour for regular hours and $24.00 per hour for overtime.',
      'Noah earns $18.00 per hour minus a $15.00 weekly uniform fee.',
    ],
    correctIndex: 0,
    explanation: 'Elena earns pay y = 17.50x. If she works 0 hours, she earns $0, and y/x = 17.50 is constant. The other employees have base salaries, tiered overtime rates, or weekly deductions that make their pay non-proportional.',
    hint: 'Look for the employee who earns the exact same rate per hour with no base salary, deductions, or overtime tier changes.',
  },
  {
    id: 'staar-p-q26',
    relationshipType: 'nonProportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Writing Linear Model for Admission and Per-Unit Charges',
    question: 'An amusement park charges an admission fee of $18.00 plus $2.25 for each carnival ride ticket. Which linear equation represents y, the total cost in dollars for admission and x ride tickets?',
    context: 'Amusement park: $18.00 admission + $2.25 per ticket',
    options: [
      'y = 2.25x + 18.00',
      'y = 18.00x + 2.25',
      'y = 20.25x',
      'y = 2.25x - 18.00',
    ],
    correctIndex: 0,
    explanation: 'The per-ticket charge ($2.25) is the rate of change (slope) multiplied by the number of tickets x. The general admission fee ($18.00) is the initial value (y-intercept). The linear equation is y = 2.25x + 18.00.',
    hint: 'Multiply the price per ticket ($2.25) by tickets (x) and add the starting admission fee ($18.00).',
  },
  {
    id: 'staar-p-q27',
    relationshipType: 'proportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.5.E',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Direct Variation Physics Application',
    question: 'The distance a spring stretches varies directly with the mass attached to the spring. A mass of 16 kilograms stretches the spring 5.6 centimeters. How many kilograms are needed to stretch the spring 10.5 centimeters?',
    context: 'Direct variation: (16 kg, 5.6 cm)',
    options: [
      '30 kilograms',
      '28 kilograms',
      '3.675 kilograms',
      '32 kilograms',
    ],
    correctIndex: 0,
    explanation: 'Find the stretch rate per kilogram: k = 5.6 / 16 = 0.35 cm per kg. To find the mass required for 10.5 cm of stretch: 10.5 = 0.35 * m, so m = 10.5 / 0.35 = 30 kilograms.',
    hint: 'Find the stretch per kg: 5.6 / 16 = 0.35 cm/kg. Then divide 10.5 by 0.35.',
  },
  {
    id: 'staar-p-q28',
    relationshipType: 'nonProportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Negative Rate of Change Real-World Model',
    question: 'A community swimming pool contains 12,000 gallons of water. When the drain valve is opened, water drains at a constant rate of 400 gallons per hour. Which linear equation models W, the gallons of water remaining in the pool after t hours?',
    context: 'Pool draining: initial 12,000 gal, draining 400 gal/hr',
    options: [
      'W = 12,000 - 400t',
      'W = 400t + 12,000',
      'W = 12,000t - 400',
      'W = 400t',
    ],
    correctIndex: 0,
    explanation: 'The pool starts with an initial volume of 12,000 gallons (y-intercept b = 12,000). Because water is draining, the rate of change is negative (-400 gallons per hour). The equation for remaining water is W = 12,000 - 400t (or W = -400t + 12,000).',
    hint: 'Start with 12,000 and subtract 400 for each hour t.',
  },
  {
    id: 'staar-p-q29',
    relationshipType: 'nonProportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.5.H',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Classifying Non-Proportional Transportation Scenarios',
    question: 'A city taxi charges a $3.75 pickup fee the moment a passenger enters the cab, plus $2.40 for each mile traveled. Is this pricing structure proportional or non-proportional, and why?',
    context: 'Taxi fare: $3.75 pickup fee + $2.40 per mile',
    options: [
      'Non-proportional, because the $3.75 pickup fee creates a non-zero y-intercept (b = 3.75), meaning a 0-mile ride costs $3.75 instead of $0.',
      'Proportional, because the cost increases at a constant rate of $2.40 per mile.',
      'Proportional, because both $3.75 and $2.40 are positive numbers.',
      'Non-proportional, because the cost per mile changes at different traffic speeds.',
    ],
    correctIndex: 0,
    explanation: 'A proportional relationship must start at (0, 0). Because the taxi charges a $3.75 base pickup fee, the cost for 0 miles is $3.75. The equation is y = 2.40x + 3.75, which has b ≠ 0 and a non-constant ratio y/x, making it non-proportional.',
    hint: 'Ask yourself: if you get into the taxi and travel 0 miles, is the cost $0? If not, it is non-proportional.',
  },
  {
    id: 'staar-p-q30',
    relationshipType: 'proportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.4.B',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Unit Price Comparison between Two Stores',
    question: 'Store A sells 6 pounds of raw almonds for $27.00. Store B sells 10 pounds of the same almonds for $42.50. Which store offers the lower unit price, and by how much per pound?',
    context: 'Store A: 6 lbs for $27.00; Store B: 10 lbs for $42.50',
    options: [
      'Store B is cheaper by $0.25 per pound.',
      'Store A is cheaper by $0.25 per pound.',
      'Store A is cheaper by $1.50 per pound.',
      'Both stores charge the exact same price of $4.50 per pound.',
    ],
    correctIndex: 0,
    explanation: 'Calculate the unit rate for each store: Store A = $27.00 / 6 = $4.50 per pound. Store B = $42.50 / 10 = $4.25 per pound. Comparing the unit prices: $4.50 - $4.25 = $0.25 per pound savings at Store B.',
    hint: 'Find the price per pound at Store A ($27 / 6) and Store B ($42.50 / 10), then subtract.',
  },
  {
    id: 'staar-p-q31',
    relationshipType: 'proportional',
    category: 'word-problem',
    teksCode: 'TEKS 8.5.E',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Recipe Scaling Direct Variation',
    question: 'A caterer follows a recipe where the amount of sugar needed varies directly with the number of muffins baked. The recipe uses 2.5 cups of sugar to make 15 muffins. How many cups of sugar are needed to bake 36 muffins?',
    context: 'Direct variation: 2.5 cups for 15 muffins',
    options: [
      '6.0 cups',
      '5.5 cups',
      '9.0 cups',
      '7.2 cups',
    ],
    correctIndex: 0,
    explanation: 'Find the constant of proportionality: k = 2.5 / 15 = 1/6 (or 0.1667) cups per muffin. For 36 muffins: y = (1/6) * 36 = 6.0 cups of sugar.',
    hint: 'Find the cups of sugar per 1 muffin: 2.5 / 15 = 1/6 cup. Then multiply 1/6 by 36 muffins.',
  },
  {
    id: 'staar-p-q32',
    relationshipType: 'mixed',
    category: 'word-problem',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Comparing Two Linear Payment Plans',
    question: 'Mobile Carrier X charges a $25 monthly access fee plus $6 per gigabyte of data used. Mobile Carrier Y charges $11 per gigabyte of data with no monthly access fee. For how many gigabytes x will both carriers charge the exact same monthly total?',
    context: 'Carrier X: y = 6x + 25; Carrier Y: y = 11x',
    options: [
      '5 gigabytes',
      '4 gigabytes',
      '6 gigabytes',
      '2.5 gigabytes',
    ],
    correctIndex: 0,
    explanation: 'Set the two linear equations equal to each other: 6x + 25 = 11x. Subtract 6x from both sides: 25 = 5x. Divide by 5: x = 5 gigabytes. At 5 GB, both plans cost exactly $55.',
    hint: 'Set up the equation 6x + 25 = 11x and solve for x.',
  },

  // ==========================================
  // SECTION 5: MULTIPLE-REPRESENTATION & COMPARISON QUESTIONS (4 Items: q33 - q36)
  // ==========================================
  {
    id: 'staar-p-q33',
    relationshipType: 'nonProportional',
    category: 'multiple-representation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Connecting Word Problem to Equation and Initial Value',
    question: 'A decorative candle is 14 inches tall when lit and burns down at a steady rate of 1.75 inches per hour. Which linear equation and initial value represent h, the height of the candle after t hours?',
    context: 'Candle: starting height 14 inches, burning rate 1.75 inches/hr',
    options: [
      'Equation: h = -1.75t + 14; Initial Value: 14 inches',
      'Equation: h = 1.75t + 14; Initial Value: 1.75 inches',
      'Equation: h = 14t - 1.75; Initial Value: -1.75 inches',
      'Equation: h = -14t + 1.75; Initial Value: 14 inches',
    ],
    correctIndex: 0,
    explanation: 'The candle starts at an initial height of 14 inches (y-intercept b = 14). Because it burns down, the rate of change is negative (-1.75 inches per hour). The correct linear model is h = -1.75t + 14 with an initial value of 14 inches.',
    hint: 'The starting height at t = 0 is 14 inches (initial value), and burning down means a negative slope of -1.75.',
  },
  {
    id: 'staar-p-q34',
    relationshipType: 'mixed',
    category: 'multiple-representation',
    teksCode: 'TEKS 8.5.F',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Identifying Non-Proportional Representation Among Multiple Models',
    question: 'A teacher displays four mathematical representations. Which representation describes a NON-PROPORTIONAL relationship?',
    tableData: {
      headers: ['Representation 1', 'Representation 2', 'Representation 3', 'Representation 4 (Table)'],
      rows: [
        ['Equation: y = 4.5x', 'Ordered Pairs:', 'Verbal Situation:', 'x = [0, 2, 4]'],
        ['', '(3, 15), (5, 25), (8, 40)', 'Bulk oats cost $0.40/oz', 'y = [10, 18, 26]'],
        ['', 'Ratio y/x = 5', 'with no container fee', 'Starts at (0, 10)'],
      ],
    },
    options: [
      'Representation 4, because when x = 0, y = 10, so the ratio y/x is not constant (18/2 = 9 ≠ 26/4 = 6.5).',
      'Representation 1, because the coefficient is a decimal.',
      'Representation 2, because the ratio y/x is 5 for all pairs.',
      'Representation 3, because it involves physical weight in ounces.',
    ],
    correctIndex: 0,
    explanation: 'Representations 1, 2, and 3 all have direct variation forms y = kx with b = 0 and constant y/x ratios. Representation 4 starts at (0, 10) with equation y = 4x + 10. Because b = 10 ≠ 0 and its ratio changes (9 ≠ 6.5), Representation 4 is non-proportional.',
    hint: 'Look for the representation that starts with a non-zero value at x = 0 (b ≠ 0).',
  },
  {
    id: 'staar-p-q35',
    relationshipType: 'nonProportional',
    category: 'multiple-representation',
    teksCode: 'TEKS 8.4.C',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Connecting Table, Graph, and Equation',
    question: 'The table and coordinate graph represent the same linear relationship between x and y. Which equation models this relationship?',
    context: 'Table and Graph showing line with points (0, 5), (2, 11), (4, 17), (6, 23)',
    tableData: {
      headers: ['x', 'y'],
      rows: [
        ['0', '5'],
        ['2', '11'],
        ['4', '17'],
        ['6', '23'],
      ],
    },
    graphData: {
      title: 'Linear Relationship Table & Graph Connection',
      xLabel: 'Input (x)',
      yLabel: 'Output (y)',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 30,
      xStep: 1,
      yStep: 5,
      lines: [
        {
          id: 'matched-line',
          name: 'y = 3x + 5',
          slope: 3,
          intercept: 5,
          color: 'indigo',
          points: [
            { x: 0, y: 5, label: '(0, 5)', highlight: true },
            { x: 2, y: 11, label: '(2, 11)' },
            { x: 4, y: 17, label: '(4, 17)' },
            { x: 6, y: 23, label: '(6, 23)' },
          ],
        },
      ],
    },
    options: [
      'y = 3x + 5',
      'y = 5x + 3',
      'y = 3x',
      'y = 6x + 5',
    ],
    correctIndex: 0,
    explanation: 'From both the table and the graph, when x = 0, y = 5, which gives y-intercept b = 5. The rate of change is m = (11 - 5) / (2 - 0) = 6 / 2 = 3. Thus, the matching equation in slope-intercept form is y = 3x + 5.',
    hint: 'Find the y-intercept b where x = 0 (b = 5). Then find the slope m = (11 - 5) / (2 - 0) = 3.',
  },
  {
    id: 'staar-p-q36',
    relationshipType: 'mixed',
    category: 'multiple-representation',
    teksCode: 'TEKS 8.5.H',
    standardType: 'Supporting',
    reportingCategory: 2,
    subtopic: 'Comparative Analysis of Two Savings Models',
    question: 'Sofia starts with $40 in her savings account and deposits $15 each week (y = 15x + 40). Mateo starts with $0 in his savings account and deposits $25 each week (y = 25x). Which statement accurately compares the proportionality of the two savings plans?',
    context: 'Sofia: y = 15x + 40; Mateo: y = 25x',
    options: [
      'Only Mateo\'s plan is proportional because it starts at (0, 0) with a constant ratio y/x = 25, while Sofia\'s plan has a non-zero initial value (b = 40).',
      'Sofia\'s plan is proportional because she saves a constant $15 each week.',
      'Both plans are proportional because both students save money at constant weekly rates.',
      'Neither plan is proportional because the total balance changes every week.',
    ],
    correctIndex: 0,
    explanation: 'A relationship is proportional only if it has the direct variation form y = kx with b = 0. Mateo\'s equation is y = 25x (b = 0), so it passes through (0, 0) and y/x = 25 is constant. Sofia\'s equation is y = 15x + 40 with b = 40, so at week 0 she already has $40, making her plan non-proportional.',
    hint: 'Proportional relationships must pass through the origin (0, 0) and have an initial starting amount of $0.',
  },
];
