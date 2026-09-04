import { QuestionTable } from '../../types';

export interface SystemGraphLine {
  label: string;
  slope: number;
  intercept: number;
  color: string;
  equation: string;
  dashed?: boolean;
}

export interface QuestionSystemGraph {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep?: number;
  yStep?: number;
  lines: SystemGraphLine[];
  intersectionPoint?: { x: number; y: number; label?: string };
}

export type SystemsCategory =
  | 'graph-intersection'
  | 'verify-solution'
  | 'equations-graphical'
  | 'real-world'
  | 'multi-rep';

export interface StaarSystemsQuestion {
  id: string;
  category: SystemsCategory;
  teksCode: string;
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 2;
  subtopic: string;
  question: string;
  context?: string;
  tableData?: QuestionTable;
  graphData?: QuestionSystemGraph;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export const STAAR_SYSTEMS_QUESTIONS: StaarSystemsQuestion[] = [
  // =========================================================================
  // SUBTOPIC 1: GRAPH / INTERSECTION QUESTIONS (12 Questions: 01 - 12)
  // Students identify the ordered pair representing the intersection of two linear equations.
  // =========================================================================
  {
    id: 'staar-sys-01',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Solution as Point of Intersection',
    question:
      'The coordinate plane below shows the graphs of two linear equations. What is the solution to this system of equations?',
    context: 'Line 1: y = x + 1 (blue)  |  Line 2: y = -x + 5 (purple)',
    graphData: {
      title: 'Graph of System 1',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 6,
      yMin: -1,
      yMax: 7,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = x + 1',
          slope: 1,
          intercept: 1,
          color: '#2563eb',
          equation: 'y = x + 1',
        },
        {
          label: 'Line 2: y = -x + 5',
          slope: -1,
          intercept: 5,
          color: '#9333ea',
          equation: 'y = -x + 5',
        },
      ],
      intersectionPoint: { x: 2, y: 3, label: '(2, 3)' },
    },
    options: ['(2, 3)', '(3, 2)', '(0, 1)', '(0, 5)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. In this graph, the lines cross at (2, 3). Option (3, 2) reverses the x and y coordinates, while (0, 1) and (0, 5) are y-intercepts of the individual lines.',
    hint: 'Find the point where both lines cross. Trace straight down to the x-axis to read x = 2, and trace across to the y-axis to read y = 3.',
  },
  {
    id: 'staar-sys-02',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identifying Coordinate Intersection',
    question:
      'Two linear equations are graphed on the grid below. Which ordered pair represents the solution to the system?',
    context: 'Line 1: y = 2x - 1 (teal)  |  Line 2: y = -x + 8 (rose)',
    graphData: {
      title: 'Graph of System 2',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 7,
      yMin: -2,
      yMax: 9,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 2x - 1',
          slope: 2,
          intercept: -1,
          color: '#0d9488',
          equation: 'y = 2x - 1',
        },
        {
          label: 'Line 2: y = -x + 8',
          slope: -1,
          intercept: 8,
          color: '#e11d48',
          equation: 'y = -x + 8',
        },
      ],
      intersectionPoint: { x: 3, y: 5, label: '(3, 5)' },
    },
    options: ['(3, 5)', '(5, 3)', '(0, 8)', '(4, 7)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The two lines cross exactly at (3, 5). Reversing the coordinates gives (5, 3), and (0, 8) is only the y-intercept of the rose line.',
    hint: 'Locate the intersection point of the teal and rose lines. Read the horizontal coordinate x first (3), then the vertical coordinate y (5).',
  },
  {
    id: 'staar-sys-03',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection with Proportional Line',
    question:
      'Line p and Line q are graphed on the coordinate plane. What ordered pair represents the intersection of the two lines?',
    context: 'Line p: y = -2x + 6 (blue)  |  Line q: y = x (emerald)',
    graphData: {
      title: 'Intersection of Line p and Line q',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 6,
      yMin: -1,
      yMax: 7,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line p: y = -2x + 6',
          slope: -2,
          intercept: 6,
          color: '#2563eb',
          equation: 'y = -2x + 6',
        },
        {
          label: 'Line q: y = x',
          slope: 1,
          intercept: 0,
          color: '#059669',
          equation: 'y = x',
        },
      ],
      intersectionPoint: { x: 2, y: 2, label: '(2, 2)' },
    },
    options: ['(2, 2)', '(0, 6)', '(3, 0)', '(1, 4)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. Line p and Line q intersect at (2, 2). The point (0, 6) is the y-intercept of Line p, and (3, 0) is its x-intercept.',
    hint: 'Look for the single point shared by both lines. At this point, both the x-value and y-value are equal to 2.',
  },
  {
    id: 'staar-sys-04',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection Coordinates in Quadrant I',
    question:
      'The graph models a system of two linear equations. What is the solution to the system?',
    context: 'Line 1: y = 3x - 2 (indigo)  |  Line 2: y = -x + 6 (amber)',
    graphData: {
      title: 'Graph of Linear System',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 6,
      yMin: -3,
      yMax: 8,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 3x - 2',
          slope: 3,
          intercept: -2,
          color: '#4f46e5',
          equation: 'y = 3x - 2',
        },
        {
          label: 'Line 2: y = -x + 6',
          slope: -1,
          intercept: 6,
          color: '#d97706',
          equation: 'y = -x + 6',
        },
      ],
      intersectionPoint: { x: 2, y: 4, label: '(2, 4)' },
    },
    options: ['(2, 4)', '(4, 2)', '(0, 6)', '(0, -2)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The lines intersect at (2, 4). Be careful not to reverse the coordinates as (4, 2). The points (0, 6) and (0, -2) are y-intercepts.',
    hint: 'Follow the intersection point straight down to the x-axis to find x = 2, and straight across to the y-axis to find y = 4.',
  },
  {
    id: 'staar-sys-05',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection on the X-Axis',
    question:
      'The coordinate grid displays two lines representing a linear system. What point satisfies both linear relationships?',
    context: 'Line 1: y = -x + 3 (purple)  |  Line 2: y = 2x - 6 (blue)',
    graphData: {
      title: 'System with Axis Intersection',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 6,
      yMin: -7,
      yMax: 5,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = -x + 3',
          slope: -1,
          intercept: 3,
          color: '#9333ea',
          equation: 'y = -x + 3',
        },
        {
          label: 'Line 2: y = 2x - 6',
          slope: 2,
          intercept: -6,
          color: '#2563eb',
          equation: 'y = 2x - 6',
        },
      ],
      intersectionPoint: { x: 3, y: 0, label: '(3, 0)' },
    },
    options: ['(3, 0)', '(0, 3)', '(0, -6)', '(1, 2)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. Both lines cross each other directly on the x-axis at (3, 0). The point (0, 3) is a y-intercept, not the intersection point.',
    hint: 'Notice where the two lines cross: the point lies directly on the horizontal x-axis where y = 0.',
  },
  {
    id: 'staar-sys-06',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Fractional Slope Intersection',
    question:
      'The graph shows two linear equations. What ordered pair represents the solution to this system?',
    context: 'Line 1: y = 0.5x + 3 (teal)  |  Line 2: y = -x + 6 (rose)',
    graphData: {
      title: 'Linear System Graph',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 7,
      yMin: -1,
      yMax: 8,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 0.5x + 3',
          slope: 0.5,
          intercept: 3,
          color: '#0d9488',
          equation: 'y = 0.5x + 3',
        },
        {
          label: 'Line 2: y = -x + 6',
          slope: -1,
          intercept: 6,
          color: '#e11d48',
          equation: 'y = -x + 6',
        },
      ],
      intersectionPoint: { x: 2, y: 4, label: '(2, 4)' },
    },
    options: ['(2, 4)', '(4, 2)', '(0, 3)', '(0, 6)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The teal line and rose line meet at (2, 4). Testing algebraically: 0.5(2) + 3 = 4 and -(2) + 6 = 4.',
    hint: 'Look at the point where the two lines intersect. Trace down to the x-axis to find x = 2 and across to the y-axis to find y = 4.',
  },
  {
    id: 'staar-sys-07',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection with Opposite Slopes',
    question:
      'Two lines are graphed on the grid below. Which ordered pair is the solution to the system?',
    context: 'Line 1: y = 2x - 5 (blue)  |  Line 2: y = -x + 4 (purple)',
    graphData: {
      title: 'Coordinate Intersection',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 6,
      yMin: -6,
      yMax: 6,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 2x - 5',
          slope: 2,
          intercept: -5,
          color: '#2563eb',
          equation: 'y = 2x - 5',
        },
        {
          label: 'Line 2: y = -x + 4',
          slope: -1,
          intercept: 4,
          color: '#9333ea',
          equation: 'y = -x + 4',
        },
      ],
      intersectionPoint: { x: 3, y: 1, label: '(3, 1)' },
    },
    options: ['(3, 1)', '(1, 3)', '(0, 4)', '(0, -5)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The lines intersect at (3, 1). The points (0, 4) and (0, -5) are y-intercepts of the individual lines.',
    hint: 'Find the intersection point of the blue and purple lines. Check the coordinates: x = 3 and y = 1.',
  },
  {
    id: 'staar-sys-08',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection in Quadrant II',
    question:
      'The coordinate plane below displays two lines that intersect in Quadrant II. What is the solution to this system?',
    context: 'Line 1: y = x + 4 (emerald)  |  Line 2: y = -2x - 2 (indigo)',
    graphData: {
      title: 'Quadrant II Intersection',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -5,
      xMax: 4,
      yMin: -4,
      yMax: 6,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = x + 4',
          slope: 1,
          intercept: 4,
          color: '#059669',
          equation: 'y = x + 4',
        },
        {
          label: 'Line 2: y = -2x - 2',
          slope: -2,
          intercept: -2,
          color: '#4f46e5',
          equation: 'y = -2x - 2',
        },
      ],
      intersectionPoint: { x: -2, y: 2, label: '(-2, 2)' },
    },
    options: ['(-2, 2)', '(2, -2)', '(0, 4)', '(0, -2)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. In Quadrant II, x is negative and y is positive. The intersection point is (-2, 2).',
    hint: 'Quadrant II is in the upper left. Read the negative x-coordinate (-2) and positive y-coordinate (2).',
  },
  {
    id: 'staar-sys-09',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection on Negative X-Axis',
    question:
      'Two linear relationships are graphed on the coordinate grid. Which point represents the solution to the system?',
    context: 'Line 1: y = 2x + 4 (teal)  |  Line 2: y = -x - 2 (rose)',
    graphData: {
      title: 'Negative Axis Intersection',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -5,
      xMax: 4,
      yMin: -4,
      yMax: 6,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 2x + 4',
          slope: 2,
          intercept: 4,
          color: '#0d9488',
          equation: 'y = 2x + 4',
        },
        {
          label: 'Line 2: y = -x - 2',
          slope: -1,
          intercept: -2,
          color: '#e11d48',
          equation: 'y = -x - 2',
        },
      ],
      intersectionPoint: { x: -2, y: 0, label: '(-2, 0)' },
    },
    options: ['(-2, 0)', '(0, -2)', '(0, 4)', '(-1, 2)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The lines intersect on the horizontal axis at (-2, 0). Distractor (0, -2) is on the vertical y-axis.',
    hint: 'The intersection is on the x-axis to the left of the origin at x = -2. The y-value on the x-axis is 0.',
  },
  {
    id: 'staar-sys-10',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection with a Horizontal Line',
    question:
      'The coordinate plane shows the graph of a horizontal line y = 3 and a slanted line y = 2x - 1. What is the solution to the system?',
    context: 'Line 1: y = 3 (blue)  |  Line 2: y = 2x - 1 (amber)',
    graphData: {
      title: 'Horizontal Line System',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -2,
      xMax: 5,
      yMin: -2,
      yMax: 6,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = 3',
          slope: 0,
          intercept: 3,
          color: '#2563eb',
          equation: 'y = 3',
        },
        {
          label: 'Line 2: y = 2x - 1',
          slope: 2,
          intercept: -1,
          color: '#d97706',
          equation: 'y = 2x - 1',
        },
      ],
      intersectionPoint: { x: 2, y: 3, label: '(2, 3)' },
    },
    options: ['(2, 3)', '(3, 2)', '(0, 3)', '(0, -1)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. Since Line 1 has the constant value y = 3, the intersection must have y = 3. Substituting into Line 2: 3 = 2x - 1 gives x = 2, so the intersection is (2, 3).',
    hint: 'Any point on the horizontal line has y = 3. Find the x-coordinate where the slanted line crosses this height: x = 2.',
  },
  {
    id: 'staar-sys-11',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersection in Quadrant IV',
    question:
      'The coordinate grid displays two linear equations. What is the solution to this linear system?',
    context: 'Line 1: y = -x + 1 (purple)  |  Line 2: y = 2x - 5 (blue)',
    graphData: {
      title: 'Quadrant IV Intersection',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -2,
      xMax: 6,
      yMin: -6,
      yMax: 4,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line 1: y = -x + 1',
          slope: -1,
          intercept: 1,
          color: '#9333ea',
          equation: 'y = -x + 1',
        },
        {
          label: 'Line 2: y = 2x - 5',
          slope: 2,
          intercept: -5,
          color: '#2563eb',
          equation: 'y = 2x - 5',
        },
      ],
      intersectionPoint: { x: 2, y: -1, label: '(2, -1)' },
    },
    options: ['(2, -1)', '(-1, 2)', '(0, 1)', '(0, -5)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. In Quadrant IV (lower right), x is positive and y is negative. The lines cross at (2, -1).',
    hint: 'Look in Quadrant IV (below the x-axis, to the right of the y-axis). The intersection point has x = 2 and y = -1.',
  },
  {
    id: 'staar-sys-12',
    category: 'graph-intersection',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Coordinate Grid with Gentle Slopes',
    question:
      'Line r and Line s are graphed on the coordinate plane below. Which ordered pair represents the solution to the system of equations?',
    context: 'Line r: y = (1/3)x + 1 (teal)  |  Line s: y = -x + 5 (rose)',
    graphData: {
      title: 'System with Fraction Slope',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 7,
      yMin: -1,
      yMax: 7,
      xStep: 1,
      yStep: 1,
      lines: [
        {
          label: 'Line r: y = (1/3)x + 1',
          slope: 1 / 3,
          intercept: 1,
          color: '#0d9488',
          equation: 'y = (1/3)x + 1',
        },
        {
          label: 'Line s: y = -x + 5',
          slope: -1,
          intercept: 5,
          color: '#e11d48',
          equation: 'y = -x + 5',
        },
      ],
      intersectionPoint: { x: 3, y: 2, label: '(3, 2)' },
    },
    options: ['(3, 2)', '(2, 3)', '(0, 1)', '(0, 5)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations on a coordinate plane is the ordered pair where both lines intersect. The lines intersect at (3, 2). Testing both equations: (1/3)(3) + 1 = 2 and -(3) + 5 = 2.',
    hint: 'Find where Line r and Line s intersect. Trace down to x = 3 and across to y = 2.',
  },

  // =========================================================================
  // SUBTOPIC 2: VERIFY THE SOLUTION QUESTIONS (8 Questions: 13 - 20)
  // Students determine which ordered pair satisfies BOTH equations in a system or verify whether a given point satisfies both.
  // =========================================================================
  {
    id: 'staar-sys-13',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Testing Ordered Pairs in Both Equations',
    question:
      'Which ordered pair is a solution to the system of linear equations shown below?',
    context: 'Equation 1: y = 2x + 3  |  Equation 2: x + y = 9',
    options: ['(2, 7)', '(1, 5)', '(4, 5)', '(7, 2)'],
    correctIndex: 0,
    explanation:
      'Check (2, 7) in both equations: In Equation 1: 2(2) + 3 = 4 + 3 = 7 ✓ (y = 7). In Equation 2: 2 + 7 = 9 ✓. Because (2, 7) satisfies both equations, it is the solution to the system. Notice that (1, 5) only satisfies Equation 1, and (4, 5) only satisfies Equation 2.',
    hint: 'Substitute x and y into BOTH equations. The solution must make both statements true.',
  },
  {
    id: 'staar-sys-14',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Verifying Simultaneous Solutions',
    question:
      'Which ordered pair satisfies both equations in the system?',
    context: 'Equation 1: y = 4x - 5  |  Equation 2: 2x + y = 7',
    options: ['(2, 3)', '(3, 2)', '(1, -1)', '(0, 7)'],
    correctIndex: 0,
    explanation:
      'Substitute (2, 3): In Equation 1: 4(2) - 5 = 8 - 5 = 3 ✓ (y = 3). In Equation 2: 2(2) + 3 = 4 + 3 = 7 ✓. Since (2, 3) satisfies both equations, it is the solution. Distractor (3, 2) reverses the coordinates.',
    hint: 'Test x = 2 and y = 3 in both equations: 4(2) - 5 = 3 and 2(2) + 3 = 7. Does it satisfy both?',
  },
  {
    id: 'staar-sys-15',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Evaluating Student Claims',
    question:
      'A student tests the point (2, 4) in the system below. Which statement correctly evaluates whether (2, 4) is the solution?',
    context: 'Equation 1: y = -3x + 10  |  Equation 2: y = x + 2',
    options: [
      '(2, 4) is the solution because it makes both equations true statements simultaneously.',
      '(2, 4) is not the solution because it only satisfies y = x + 2.',
      '(2, 4) is not the solution because it only satisfies y = -3x + 10.',
      '(2, 4) is not the solution because a solution cannot have equal even numbers.',
    ],
    correctIndex: 0,
    explanation:
      'Substitute x = 2 and y = 4: In Equation 1: -3(2) + 10 = -6 + 10 = 4 ✓. In Equation 2: 2 + 2 = 4 ✓. Because (2, 4) makes both equations true, it is the true solution to the system.',
    hint: 'Calculate -3(2) + 10 and 2 + 2. Do both equal 4? If so, (2, 4) satisfies both equations.',
  },
  {
    id: 'staar-sys-16',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Standard Form & Slope-Intercept Verification',
    question:
      'Which ordered pair satisfies both equations in the system below?',
    context: 'Equation 1: 3x - y = 5  |  Equation 2: y = 2x - 1',
    options: ['(4, 7)', '(7, 4)', '(2, 3)', '(3, 4)'],
    correctIndex: 0,
    explanation:
      'Test (4, 7): In Equation 1: 3(4) - 7 = 12 - 7 = 5 ✓. In Equation 2: 2(4) - 1 = 8 - 1 = 7 ✓. Both equations are satisfied, so (4, 7) is the solution. The pair (7, 4) reverses the coordinates.',
    hint: 'Test (4, 7) by plugging in x = 4 and y = 7 into 3x - y = 5 and y = 2x - 1.',
  },
  {
    id: 'staar-sys-17',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Eliminating Single-Line Points',
    question:
      'Which ordered pair is the solution to the system of equations?',
    context: 'Equation 1: x + 2y = 14  |  Equation 2: y = -2x + 10',
    options: ['(2, 6)', '(6, 2)', '(4, 5)', '(1, 8)'],
    correctIndex: 0,
    explanation:
      'Test (2, 6): In Equation 1: 2 + 2(6) = 2 + 12 = 14 ✓. In Equation 2: -2(2) + 10 = -4 + 10 = 6 ✓. Point (4, 5) satisfies x + 2y = 14 but fails Equation 2 (-2(4) + 10 = 2 ≠ 5). Only (2, 6) satisfies both.',
    hint: 'Be careful with points that only work in one equation. Test (2, 6) in both: 2 + 2(6) = 14 and 6 = -2(2) + 10.',
  },
  {
    id: 'staar-sys-18',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Testing Points in Mixed Format Systems',
    question:
      'Which ordered pair satisfies both equations in the system?',
    context: 'Equation 1: y = 5x - 4  |  Equation 2: 2x + y = 17',
    options: ['(3, 11)', '(11, 3)', '(2, 6)', '(1, 15)'],
    correctIndex: 0,
    explanation:
      'Test (3, 11): In Equation 1: 5(3) - 4 = 15 - 4 = 11 ✓. In Equation 2: 2(3) + 11 = 6 + 11 = 17 ✓. Both are true, so (3, 11) is the solution.',
    hint: 'Test (3, 11): 5(3) - 4 = 11 and 2(3) + 11 = 17. Both equations must balance.',
  },
  {
    id: 'staar-sys-19',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Evaluating Solution Definitions',
    question:
      'Elena tests the point (3, 2) in the system below. Which statement correctly describes her findings?',
    context: 'Equation 1: y = -x + 5  |  Equation 2: 3x + y = 11',
    options: [
      '(3, 2) is the solution because substituting x = 3 and y = 2 yields true equations for both lines: 2 = 2 and 11 = 11.',
      '(3, 2) is not the solution because 3(3) + 2 = 11 does not equal 5.',
      '(3, 2) is not the solution because it only satisfies Equation 1.',
      '(3, 2) is not the solution because the coordinates must be equal for a linear system.',
    ],
    correctIndex: 0,
    explanation:
      'For Equation 1: 2 = -(3) + 5 = 2 ✓. For Equation 2: 3(3) + 2 = 9 + 2 = 11 ✓. Because substituting x = 3 and y = 2 makes both equations true statements simultaneously, (3, 2) is the solution.',
    hint: 'Substitute 3 for x and 2 for y in both equations. Does 2 = -3 + 5? Does 3(3) + 2 = 11? Both statements are true.',
  },
  {
    id: 'staar-sys-20',
    category: 'verify-solution',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Testing Decimal Coefficients',
    question:
      'Which ordered pair satisfies both equations in the system?',
    context: 'Equation 1: y = 0.5x + 3  |  Equation 2: y = 2x - 3',
    options: ['(4, 5)', '(5, 4)', '(2, 4)', '(3, 3)'],
    correctIndex: 0,
    explanation:
      'Test (4, 5): In Equation 1: 0.5(4) + 3 = 2 + 3 = 5 ✓. In Equation 2: 2(4) - 3 = 8 - 3 = 5 ✓. Both equations equal 5 when x = 4, so (4, 5) is the solution.',
    hint: 'Multiply 0.5 by 4 and add 3: does it equal 5? Multiply 2 by 4 and subtract 3: does it equal 5?',
  },

  // =========================================================================
  // SUBTOPIC 3: EQUATIONS + GRAPHICAL SOLUTION QUESTIONS (6 Questions: 21 - 26)
  // Provide two equations primarily in y = mx + b form and require students to determine or interpret their graphical intersection.
  // =========================================================================
  {
    id: 'staar-sys-21',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Determining Graphical Intersection from Equations',
    question:
      'At what coordinate point do the graphs of the two linear equations intersect?',
    context: 'Equation 1: y = 2x + 1  |  Equation 2: y = -3x + 16',
    options: ['(3, 7)', '(7, 3)', '(1, 3)', '(5, 11)'],
    correctIndex: 0,
    explanation:
      'Set the two equations equal to find the intersection: 2x + 1 = -3x + 16. Add 3x to both sides: 5x + 1 = 16. Subtract 1: 5x = 15, so x = 3. Now find y: y = 2(3) + 1 = 7. The graphs intersect at (3, 7).',
    hint: 'Since both equations equal y, set them equal to each other: 2x + 1 = -3x + 16. Solve for x, then substitute back to find y.',
  },
  {
    id: 'staar-sys-22',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Finding Intersection of Linear Functions',
    question:
      'Which ordered pair represents the point of intersection for the graphs of the two linear equations?',
    context: 'Equation 1: y = -x + 8  |  Equation 2: y = 3x - 4',
    options: ['(3, 5)', '(5, 3)', '(0, 8)', '(2, 6)'],
    correctIndex: 0,
    explanation:
      'Set the equations equal: -x + 8 = 3x - 4. Add x to both sides: 8 = 4x - 4. Add 4: 12 = 4x, so x = 3. Find y: y = -(3) + 8 = 5. Check in Equation 2: 3(3) - 4 = 5 ✓. The lines intersect at (3, 5).',
    hint: 'Set -x + 8 = 3x - 4. Add x to both sides and add 4 to both sides to solve for x.',
  },
  {
    id: 'staar-sys-23',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Crossing Point of Two Linear Functions',
    question:
      'What are the coordinates of the point where the graphs of the two linear equations cross?',
    context: 'Equation 1: y = 4x - 3  |  Equation 2: y = x + 6',
    options: ['(3, 9)', '(9, 3)', '(2, 5)', '(0, 6)'],
    correctIndex: 0,
    explanation:
      'Set the equations equal: 4x - 3 = x + 6. Subtract x from both sides: 3x - 3 = 6. Add 3: 3x = 9, so x = 3. Find y: y = 3 + 6 = 9. Check in Equation 1: 4(3) - 3 = 12 - 3 = 9 ✓. The lines cross at (3, 9).',
    hint: 'Set 4x - 3 = x + 6. Subtract x from both sides to get 3x - 3 = 6.',
  },
  {
    id: 'staar-sys-24',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Intersecting Fractional & Negative Slopes',
    question:
      'At what point on the coordinate plane will the graphs of these two equations intersect?',
    context: 'Equation 1: y = -2x + 9  |  Equation 2: y = 0.5x - 1',
    options: ['(4, 1)', '(1, 4)', '(0, 9)', '(2, 5)'],
    correctIndex: 0,
    explanation:
      'Set the equations equal: -2x + 9 = 0.5x - 1. Add 2x to both sides: 9 = 2.5x - 1. Add 1: 10 = 2.5x, so x = 4. Substitute x = 4 to find y: y = -2(4) + 9 = -8 + 9 = 1. The lines intersect at (4, 1).',
    hint: 'Set -2x + 9 = 0.5x - 1. Add 2x to both sides to get 9 = 2.5x - 1, then add 1 to get 10 = 2.5x.',
  },
  {
    id: 'staar-sys-25',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Quadrant Location of Intersection',
    question:
      'In which quadrant of the coordinate plane do the graphs of the two linear equations intersect, and at what point?',
    context: 'Equation 1: y = x - 5  |  Equation 2: y = -2x + 4',
    options: [
      'Quadrant IV, at (3, -2)',
      'Quadrant II, at (-2, 3)',
      'Quadrant I, at (3, 2)',
      'Quadrant III, at (-3, -2)',
    ],
    correctIndex: 0,
    explanation:
      'Find the intersection: x - 5 = -2x + 4. Add 2x to both sides: 3x - 5 = 4. Add 5: 3x = 9, so x = 3. Substitute x = 3 to find y: y = 3 - 5 = -2. The point is (3, -2). Because x is positive (3) and y is negative (-2), the point is located in Quadrant IV.',
    hint: 'Solve x - 5 = -2x + 4 to find x = 3 and y = -2. Points with (+x, -y) are in Quadrant IV.',
  },
  {
    id: 'staar-sys-26',
    category: 'equations-graphical',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Targeting Y-Coordinate of Intersection',
    question:
      'What is the y-coordinate of the point of intersection for the graphs of the two linear equations below?',
    context: 'Equation 1: y = 3x - 8  |  Equation 2: y = -x + 4',
    options: ['1', '3', '-8', '4'],
    correctIndex: 0,
    explanation:
      'Set the equations equal: 3x - 8 = -x + 4. Add x to both sides: 4x - 8 = 4. Add 8: 4x = 12, so x = 3. The question asks specifically for the y-coordinate: y = -(3) + 4 = 1. Distractor 3 is the x-coordinate, and -8 and 4 are y-intercepts.',
    hint: 'Solve 3x - 8 = -x + 4 for x first (x = 3). Then substitute x = 3 into y = -x + 4 to find the y-coordinate.',
  },

  // =========================================================================
  // SUBTOPIC 4: REAL-WORLD SYSTEM QUESTIONS (6 Questions: 27 - 32)
  // Use original Grade 8 appropriate contexts: costs, memberships, savings, tickets, rentals, distance.
  // =========================================================================
  {
    id: 'staar-sys-27',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Break-Even Subscription Costs',
    question:
      'Two streaming services offer monthly movie plans. StreamPass charges a $12 device setup fee plus $6 per month (y = 6x + 12). CineBox charges $0 setup fee plus $9 per month (y = 9x). What is the point of intersection for the graphs of these two plans, and what does it represent?',
    options: [
      '(4, 36); after 4 months, both plans cost the same total amount of $36.',
      '(36, 4); after 36 months, both plans cost the same total amount of $4.',
      '(4, 24); after 4 months, CineBox costs $24 less than StreamPass.',
      '(0, 12); both plans have an initial sign-up fee of $12.',
    ],
    correctIndex: 0,
    explanation:
      'Set the two cost equations equal: 9x = 6x + 12. Subtract 6x from both sides: 3x = 12, so x = 4 months. Calculate the total cost: y = 9(4) = $36. The point of intersection is (4, 36), which means that at 4 months, both plans cost the exact same amount ($36).',
    hint: 'Set 9x = 6x + 12. Solve for months (x), then find the total cost (y). Remember that x represents months and y represents total dollars.',
  },
  {
    id: 'staar-sys-28',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Weekly Savings Comparison',
    question:
      'Liam and Sophia are saving money each week. Liam has $40 saved and adds $15 each week (y = 15x + 40). Sophia has $10 saved and adds $20 each week (y = 20x + 10). At what point do the lines intersect on a graph of weeks (x) versus total savings (y), and what does this point mean?',
    options: [
      '(6, 130); at 6 weeks, both Liam and Sophia have saved the exact same amount of $130.',
      '(130, 6); after $130 in deposits, both students have saved for 6 weeks.',
      '(5, 115); at 5 weeks, Liam has saved $115 and Sophia has saved $110.',
      '(6, 100); at 6 weeks, both students reach their goal of $100.',
    ],
    correctIndex: 0,
    explanation:
      'Set the savings equations equal: 20x + 10 = 15x + 40. Subtract 15x: 5x + 10 = 40. Subtract 10: 5x = 30, so x = 6 weeks. Total savings: y = 20(6) + 10 = $130. The intersection point (6, 130) indicates that after 6 weeks, both students have identical savings of $130.',
    hint: 'Set 20x + 10 = 15x + 40. Subtract 15x from both sides and subtract 10 from both sides.',
  },
  {
    id: 'staar-sys-29',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Equipment Rental Rates',
    question:
      'Two bicycle rental shops charge different hourly rates for renting an electric bike for x hours. PedalFast charges y = 8x + 10 (a $10 equipment fee plus $8 per hour). CityCruiser charges y = 10x + 4 (a $4 equipment fee plus $10 per hour). After how many hours of rental will the total cost for both shops be equal, and what will be the total cost?',
    options: [
      '3 hours, with a total cost of $34',
      '4 hours, with a total cost of $42',
      '2 hours, with a total cost of $26',
      '3 hours, with a total cost of $24',
    ],
    correctIndex: 0,
    explanation:
      'Set the total cost equations equal: 10x + 4 = 8x + 10. Subtract 8x: 2x + 4 = 10. Subtract 4: 2x = 6, so x = 3 hours. Total cost: y = 8(3) + 10 = $34 (or y = 10(3) + 4 = $34). At 3 hours, both rentals cost $34.',
    hint: 'Set 10x + 4 = 8x + 10 to find hours (x). Then substitute x = 3 back into either equation to find total cost.',
  },
  {
    id: 'staar-sys-30',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Carnival Ticket Revenue System',
    question:
      'A school carnival sells wristbands. Child wristbands cost $4 each (c) and adult wristbands cost $7 each (a). The ticket booth sold 80 wristbands in total and collected $410. Which ordered pair (c, a) represents the solution to this system of equations, and what does it tell the school?',
    context: 'Total wristbands: c + a = 80  |  Total revenue: 4c + 7a = 410',
    options: [
      '(50, 30); the booth sold 50 child wristbands and 30 adult wristbands.',
      '(30, 50); the booth sold 30 child wristbands and 50 adult wristbands.',
      '(40, 40); the booth sold 40 child wristbands and 40 adult wristbands.',
      '(50, 30); the booth sold 50 adult wristbands and 30 child wristbands.',
    ],
    correctIndex: 0,
    explanation:
      'From c + a = 80, we have c = 80 - a. Substitute into revenue: 4(80 - a) + 7a = 410 → 320 - 4a + 7a = 410 → 320 + 3a = 410 → 3a = 90 → a = 30 adult wristbands. Then c = 80 - 30 = 50 child wristbands. Total revenue check: 4(50) + 7(30) = 200 + 210 = $410 ✓.',
    hint: 'From c + a = 80, replace c with (80 - a) in 4c + 7a = 410: 4(80 - a) + 7a = 410.',
  },
  {
    id: 'staar-sys-31',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Vehicle Catch-Up Distance Model',
    question:
      'Truck Alpha travels at 45 miles per hour: y = 45x. Truck Beta started 30 miles ahead and travels at 30 miles per hour: y = 30x + 30, where x is hours driven and y is total distance in miles. What is the point of intersection on a graph of these two equations, and what does it describe?',
    options: [
      '(2, 90); after 2 hours, Truck Alpha catches Truck Beta at mile marker 90.',
      '(90, 2); after 90 hours, both trucks have traveled 2 miles.',
      '(2, 60); after 2 hours, Truck Beta has traveled 60 miles.',
      '(3, 135); after 3 hours, Truck Alpha has traveled 135 miles.',
    ],
    correctIndex: 0,
    explanation:
      'Set the distance equations equal: 45x = 30x + 30. Subtract 30x: 15x = 30, so x = 2 hours. Find distance: y = 45(2) = 90 miles. The point (2, 90) means that after 2 hours, Truck Alpha catches up to Truck Beta at 90 miles.',
    hint: 'Set 45x = 30x + 30. Subtract 30x from both sides to find hours (x).',
  },
  {
    id: 'staar-sys-32',
    category: 'real-world',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Cell Phone Calling Rates',
    question:
      'Two mobile carriers offer prepaid plans with international calling. Plan TalkMore charges y = 0.10x + 25 ($25 base fee plus $0.10 per minute). Plan GlobalConnect charges y = 0.20x + 15 ($15 base fee plus $0.20 per minute). For how many minutes of international calling (x) will both plans cost the exact same amount, and what will that total cost be?',
    options: [
      '100 minutes, with a total cost of $35',
      '80 minutes, with a total cost of $33',
      '120 minutes, with a total cost of $37',
      '50 minutes, with a total cost of $30',
    ],
    correctIndex: 0,
    explanation:
      'Set the plan cost equations equal: 0.20x + 15 = 0.10x + 25. Subtract 0.10x: 0.10x + 15 = 25. Subtract 15: 0.10x = 10. Divide by 0.10: x = 100 minutes. Total cost: y = 0.10(100) + 25 = $35. At 100 minutes, both plans cost $35.',
    hint: 'Set 0.20x + 15 = 0.10x + 25. Subtract 0.10x and subtract 15 to solve for minutes (x).',
  },

  // =========================================================================
  // SUBTOPIC 5: HIGHER-REASONING / MULTIPLE-REPRESENTATION (4 Questions: 33 - 36)
  // Combine equations, graphs, tables, or contextual information while remaining appropriate for Grade 8 STAAR.
  // =========================================================================
  {
    id: 'staar-sys-33',
    category: 'multi-rep',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Table and Equation System',
    question:
      'Line A is represented by the table of values below. Line B is represented by the equation y = -x + 7. At what ordered pair (x, y) do Line A and Line B intersect on a coordinate plane?',
    tableData: {
      headers: ['x', 'y (Line A)'],
      rows: [
        [0, 1],
        [1, 3],
        [2, 5],
        [3, 7],
      ],
    },
    context: 'Line A: Table above (slope = 2, y-intercept = 1)  |  Line B: y = -x + 7',
    options: ['(2, 5)', '(5, 2)', '(1, 3)', '(3, 4)'],
    correctIndex: 0,
    explanation:
      'From the table, Line A has y-intercept b = 1 and slope m = (3 - 1)/(1 - 0) = 2, so its equation is y = 2x + 1. Set the equations equal: 2x + 1 = -x + 7 → 3x = 6 → x = 2. Looking at the table for x = 2, y = 5. Checking Line B: y = -(2) + 7 = 5 ✓. The lines intersect at (2, 5).',
    hint: 'Find which (x, y) pair in the table makes y = -x + 7 true. Test x = 2: does 5 = -2 + 7?',
  },
  {
    id: 'staar-sys-34',
    category: 'multi-rep',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Parallel Lines & Solution Types',
    question:
      'Line 1 has the equation y = 2x + 3. Line 2 passes through the points (0, -1) and (2, 3). If both lines are graphed on the same coordinate plane, how many points of intersection will they have?',
    options: [
      '0 points of intersection (no solution), because both lines have a slope of 2 but different y-intercepts, meaning they are parallel.',
      'Exactly 1 point of intersection at (2, 3).',
      'Infinitely many points of intersection, because both equations represent the exact same line.',
      '2 points of intersection, one on each axis.',
    ],
    correctIndex: 0,
    explanation:
      'Find the slope of Line 2: m = (3 - (-1))/(2 - 0) = 4/2 = 2, and its y-intercept is (0, -1), giving y = 2x - 1. Line 1 has the equation y = 2x + 3. Because both lines have the identical slope (m = 2) but different y-intercepts (3 and -1), they are parallel lines that will never cross. Therefore, they have 0 points of intersection (no solution).',
    hint: 'Calculate the slope of Line 2 using (3 - (-1))/(2 - 0). Compare this slope with the slope of Line 1.',
  },
  {
    id: 'staar-sys-35',
    category: 'multi-rep',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Dual-Table Representation',
    question:
      'The table below shows coordinate values for two linear functions, Line J and Line K. Based on the table of values, what is the solution (x, y) to the system of linear equations formed by Line J and Line K?',
    tableData: {
      headers: ['x', 'Line J (y)', 'Line K (y)'],
      rows: [
        [1, 4, 12],
        [2, 7, 11],
        [3, 10, 10],
        [4, 13, 9],
      ],
    },
    options: ['(3, 10)', '(10, 3)', '(2, 7)', '(4, 9)'],
    correctIndex: 0,
    explanation:
      'The solution to a system of linear equations is the ordered pair that satisfies both relationships. In the table, when x = 3, Line J has y = 10 and Line K also has y = 10. Because both lines share the point (3, 10), this ordered pair is the solution to the system.',
    hint: 'Look for the row in the table where the y-value for Line J equals the y-value for Line K.',
  },
  {
    id: 'staar-sys-36',
    category: 'multi-rep',
    teksCode: 'TEKS 8.9A',
    standardType: 'Readiness',
    reportingCategory: 2,
    subtopic: 'Identical Lines & Infinite Solutions',
    question:
      'A system consists of the two linear equations y = -2x + 6 and 2x + y = 6. Which statement best describes the graphs of these two equations on a coordinate plane?',
    context: 'Equation 1: y = -2x + 6  |  Equation 2: 2x + y = 6',
    options: [
      'The two equations represent the exact same line and have infinitely many points of intersection.',
      'The two lines are parallel and have no points of intersection.',
      'The two lines intersect at exactly one point, (0, 6).',
      'The two lines are perpendicular and intersect at (3, 0).',
    ],
    correctIndex: 0,
    explanation:
      'Rearrange Equation 2 into slope-intercept form by subtracting 2x from both sides: y = -2x + 6. This is identical to Equation 1. Because both equations have the same slope (m = -2) and the same y-intercept (b = 6), they lie directly on top of each other as the exact same line, giving infinitely many points of intersection.',
    hint: 'Solve Equation 2 for y by subtracting 2x from both sides. Compare the result directly with Equation 1.',
  },
];
