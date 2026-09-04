import { QuestionTable } from '../../types';

export interface VertexPoint {
  x: number;
  y: number;
  label?: string; // e.g. "A(1, 2)", "B'", "(-3, 6)"
  showCoord?: boolean;
  labelOffset?: { dx: number; dy: number }; // Custom offset in px for clean non-overlapping display
}

export interface GeometricFigure {
  name: string; // e.g. "Pre-Image (ΔABC)", "Image (ΔA'B'C')", "Figure 1", "Figure 2"
  vertices: VertexPoint[];
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'blue' | 'purple' | 'teal' | 'slate';
  isDashed?: boolean;
  fillOpacity?: number;
  closed?: boolean;
}

export interface TransformationGraph {
  title?: string;
  xMin?: number; // default -8 or -10
  xMax?: number; // default 8 or 10
  yMin?: number; // default -8 or -10
  yMax?: number; // default 8 or 10
  xStep?: number; // default 1 or 2
  yStep?: number; // default 1 or 2
  figures: GeometricFigure[];
  reflectionLine?: {
    type: 'x-axis' | 'y-axis' | 'custom';
    slope?: number;
    intercept?: number;
    label?: string;
  };
  centerPoint?: {
    x: number;
    y: number;
    label?: string;
  };
}

export interface StaarPracticeQuestion {
  id: string;
  teksCode: string; // e.g. "TEKS 8.10.C", "TEKS 8.3.C", "TEKS 8.10.B", "TEKS 8.10.A"
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 3;
  transformationType: 'translation' | 'reflection' | 'rotation' | 'dilation' | 'combined';
  category: 'graph' | 'coordinate' | 'rule' | 'table' | 'word-problem' | 'concept';
  subtopic: string;
  question: string;
  context?: string;
  tableData?: QuestionTable;
  graphData?: TransformationGraph;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

/**
 * Bank of 36 Original Grade 8 STAAR-Style Transformations Questions
 * Aligned to Texas TEKS (8.3.C, 8.10.A, 8.10.B, 8.10.C) and STAAR blueprint.
 *
 * RIGOROUS MULTI-REPRESENTATIONAL BLUEPRINT:
 * Total Questions: 36
 * - Translation: 8 (3 Graph, 2 Rule, 1 Working-Backwards Coordinate, 1 Table, 1 Real-World Vector)
 * - Reflection:  8 (3 Graph, 2 Rule, 1 Working-Backwards Coordinate, 1 Quadrant Reasoning, 1 Logo Context, 1 Concept)
 * - Rotation:    8 (3 Graph, 2 Rule, 1 Coordinate, 1 Table, 1 Real-World Rotor)
 * - Dilation:    8 (3 Graph, 2 Rule, 1 Coordinate, 1 Blueprint Context, 1 Linear vs Area Concept)
 * - Multi-Step & Combined: 4 (2 Sequences, 1 Congruence vs. Similarity, 1 Angle & Parallelism Invariance)
 *
 * Grand Representation Totals:
 * - Graphical Coordinate Planes: 12 (3 per core transformation)
 * - Algebraic Rules: 8
 * - Coordinate / Ordered-Pair Reasoning: 8
 * - Real-World Applications / Contexts: 4
 * - Concepts & Mathematical Invariance: 4
 */
export const STAAR_TRANSFORMATIONS_QUESTIONS: StaarPracticeQuestion[] = [
  // ==========================================
  // TRANSLATIONS (8 QUESTIONS: q01 - q08)
  // ==========================================
  {
    id: 'staar-t-q01',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'graph',
    subtopic: 'Determine Image Coordinates from Graph',
    question: 'Triangle ABC is graphed on the coordinate plane. The triangle is translated 4 units to the left and 5 units down to create triangle A\'B\'C\'. What are the coordinates of vertex A\'?',
    context: 'Translation: 4 units left, 5 units down',
    graphData: {
      title: 'Translation of Triangle ABC',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ΔABC)',
          color: 'indigo',
          vertices: [
            { x: 1, y: 2, label: 'A(1, 2)', labelOffset: { dx: -10, dy: -12 } },
            { x: 5, y: 2, label: 'B(5, 2)', labelOffset: { dx: 10, dy: -12 } },
            { x: 3, y: 6, label: 'C(3, 6)', labelOffset: { dx: 0, dy: 14 } },
          ],
        },
        {
          name: 'Image (ΔA\'B\'C\')',
          color: 'emerald',
          isDashed: true,
          vertices: [
            { x: -3, y: -3, label: 'A\'(?, ?)', labelOffset: { dx: -14, dy: -12 } },
            { x: 1, y: -3, label: 'B\'', labelOffset: { dx: 10, dy: -12 } },
            { x: -1, y: 1, label: 'C\'', labelOffset: { dx: 0, dy: 14 } },
          ],
        },
      ],
    },
    options: [
      '(-3, -3)',
      '(5, 7)',
      '(-3, 7)',
      '(3, -3)',
    ],
    correctIndex: 0,
    explanation: 'Vertex A is located at (1, 2). Translating 4 units to the left subtracts 4 from the x-coordinate: 1 - 4 = -3. Translating 5 units down subtracts 5 from the y-coordinate: 2 - 5 = -3. Therefore, vertex A\' is located at (-3, -3).',
    hint: 'Apply the rule (x - 4, y - 5) to the original coordinates of vertex A(1, 2).',
  },
  {
    id: 'staar-t-q02',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'graph',
    subtopic: 'Determine Translation Algebraic Rule from Graph',
    question: 'Quadrilateral ABCD was translated on the coordinate grid to form quadrilateral A\'B\'C\'D\'. Which algebraic rule best describes this translation?',
    context: 'Pre-image ABCD -> Image A\'B\'C\'D\'',
    graphData: {
      title: 'Translation of Quadrilateral ABCD',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ABCD)',
          color: 'indigo',
          vertices: [
            { x: -5, y: 4, label: 'A(-5, 4)', labelOffset: { dx: -12, dy: 12 } },
            { x: -2, y: 4, label: 'B(-2, 4)', labelOffset: { dx: 12, dy: 12 } },
            { x: -1, y: 1, label: 'C(-1, 1)', labelOffset: { dx: 12, dy: -12 } },
            { x: -6, y: 1, label: 'D(-6, 1)', labelOffset: { dx: -12, dy: -12 } },
          ],
        },
        {
          name: 'Image (A\'B\'C\'D\')',
          color: 'emerald',
          isDashed: false,
          vertices: [
            { x: 1, y: 1, label: 'A\'(1, 1)', labelOffset: { dx: -10, dy: 12 } },
            { x: 4, y: 1, label: 'B\'(4, 1)', labelOffset: { dx: 12, dy: 12 } },
            { x: 5, y: -2, label: 'C\'(5, -2)', labelOffset: { dx: 12, dy: -12 } },
            { x: 0, y: -2, label: 'D\'(0, -2)', labelOffset: { dx: -12, dy: -12 } },
          ],
        },
      ],
    },
    options: [
      '(x, y) -> (x + 6, y - 3)',
      '(x, y) -> (x - 6, y + 3)',
      '(x, y) -> (x + 6, y + 3)',
      '(x, y) -> (6x, -3y)',
    ],
    correctIndex: 0,
    explanation: 'Compare corresponding vertices, such as A(-5, 4) and A\'(1, 1). Horizontal change: 1 - (-5) = +6 (6 units right). Vertical change: 1 - 4 = -3 (3 units down). This matches all vertex pairs, giving the algebraic rule (x, y) -> (x + 6, y - 3).',
    hint: 'Subtract the pre-image coordinates from the image coordinates: 1 - (-5) = +6 for x, and 1 - 4 = -3 for y.',
  },
  {
    id: 'staar-t-q03',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'graph',
    subtopic: 'Determine Missing Vertex from Graph',
    question: 'Trapezoid EFGH is graphed on the coordinate plane. The trapezoid is translated using the rule (x, y) -> (x + 7, y - 4) to produce trapezoid E\'F\'G\'H\'. What are the coordinates of vertex F\'?',
    context: 'Rule: (x, y) -> (x + 7, y - 4)',
    graphData: {
      title: 'Trapezoid EFGH on Coordinate Plane',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Trapezoid EFGH',
          color: 'indigo',
          vertices: [
            { x: -5, y: 5, label: 'E(-5, 5)', labelOffset: { dx: -12, dy: 12 } },
            { x: -2, y: 5, label: 'F(-2, 5)', labelOffset: { dx: 12, dy: 12 } },
            { x: -1, y: 2, label: 'G(-1, 2)', labelOffset: { dx: 12, dy: -12 } },
            { x: -6, y: 2, label: 'H(-6, 2)', labelOffset: { dx: -12, dy: -12 } },
          ],
        },
      ],
    },
    options: [
      '(5, 1)',
      '(-9, 9)',
      '(5, 9)',
      '(-9, 1)',
    ],
    correctIndex: 0,
    explanation: 'From the graph, vertex F is located at (-2, 5). Applying the translation rule (x + 7, y - 4): x\' = -2 + 7 = 5, and y\' = 5 - 4 = 1. The image vertex F\' is at (5, 1).',
    hint: 'Find the coordinates of vertex F(-2, 5) from the graph, then add 7 to x and subtract 4 from y.',
  },
  {
    id: 'staar-t-q04',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'rule',
    subtopic: 'Algebraic Representation of Coordinate Shifts',
    question: 'A hexagon on a coordinate plane is translated 8 units to the right and 6 units down to produce a new hexagon. Which algebraic representation best models this translation?',
    context: 'Shift: 8 units right, 6 units down',
    options: [
      '(x, y) -> (x + 8, y - 6)',
      '(x, y) -> (x - 8, y + 6)',
      '(x, y) -> (x + 8, y + 6)',
      '(x, y) -> (8x, -6y)',
    ],
    correctIndex: 0,
    explanation: 'Moving right corresponds to adding to the x-coordinate (+8). Moving down corresponds to subtracting from the y-coordinate (-6). The algebraic rule is (x, y) -> (x + 8, y - 6).',
    hint: 'Horizontal movements affect x (right is +). Vertical movements affect y (down is -).',
  },
  {
    id: 'staar-t-q05',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'rule',
    subtopic: 'Identifying Vector Shift from Algebraic Rule',
    question: 'A triangle on a coordinate plane is transformed using the algebraic rule (x, y) -> (x - 9, y + 4). Which statement correctly describes this transformation?',
    context: 'Algebraic Rule: (x, y) -> (x - 9, y + 4)',
    options: [
      'The triangle is translated 9 units left and 4 units up.',
      'The triangle is translated 9 units right and 4 units down.',
      'The triangle is translated 9 units left and 4 units down.',
      'The triangle is translated 9 units down and 4 units right.',
    ],
    correctIndex: 0,
    explanation: 'In the rule (x - 9, y + 4), subtracting 9 from x represents a horizontal shift of 9 units left. Adding 4 to y represents a vertical shift of 4 units up.',
    hint: 'x - 9 means move 9 units left on the x-axis; y + 4 means move 4 units up on the y-axis.',
  },
  {
    id: 'staar-t-q06',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'coordinate',
    subtopic: 'Working Backwards to Find Pre-Image of Translation',
    question: 'Point P\' is located at (2, -3) after being translated using the algebraic rule (x, y) -> (x - 5, y + 4). What were the coordinates of the original point P?',
    context: 'Image: P\'(2, -3), Rule: (x, y) -> (x - 5, y + 4)',
    options: [
      '(7, -7)',
      '(-3, 1)',
      '(-3, -7)',
      '(7, 1)',
    ],
    correctIndex: 0,
    explanation: 'To find the pre-image coordinates, reverse the translation operations: x - 5 = 2 gives x = 2 + 5 = 7, and y + 4 = -3 gives y = -3 - 4 = -7. The original point P was at (7, -7). Applying the rule to the image instead of working backwards is a common error that incorrectly produces (-3, 1).',
    hint: 'Work backwards from the image coordinates: add 5 to the image x-coordinate (2 + 5 = 7) and subtract 4 from the image y-coordinate (-3 - 4 = -7).',
  },
  {
    id: 'staar-t-q07',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'table',
    subtopic: 'Missing Vertex in Translation Table',
    question: 'The table shows the coordinates of three vertices of triangle ABC and their translated image vertices A\'B\'C\'. What are the coordinates of vertex C\'?',
    tableData: {
      headers: ['Vertex', 'Pre-Image (x, y)', 'Image Vertex', 'Image (x\', y\')'],
      rows: [
        ['A', '(-3, 6)', 'A\'', '(2, 2)'],
        ['B', '(1, 4)', 'B\'', '(6, 0)'],
        ['C', '(-2, -1)', 'C\'', '(?, ?)'],
      ],
    },
    options: [
      '(3, -5)',
      '(-7, 3)',
      '(3, 3)',
      '(-7, -5)',
    ],
    correctIndex: 0,
    explanation: 'Find the translation rule from vertex A: x\' = -3 + 5 = 2 (add 5), and y\' = 6 - 4 = 2 (subtract 4). The rule is (x + 5, y - 4). Apply this rule to C(-2, -1): x\' = -2 + 5 = 3, and y\' = -1 - 4 = -5. Vertex C\' is at (3, -5).',
    hint: 'Determine how much x changes (from -3 to 2 is +5) and how much y changes (from 6 to 2 is -4), then apply those changes to C(-2, -1).',
  },
  {
    id: 'staar-t-q08',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'word-problem',
    subtopic: 'Robotic Navigation Vector & Final Position',
    question: 'A warehouse automated robot starts at coordinate position (3, -4) on a floor map. The robot travels 5 units to the right and 7 units up, then pauses. Next, it moves 2 units to the left and 3 units down. Which algebraic rule models the net translation of the robot, and what is its final coordinate position?',
    context: 'Start: (3, -4); Movements: +5 right, +7 up, then -2 left, -3 down',
    options: [
      '(x, y) -> (x + 3, y + 4), with final position at (6, 0)',
      '(x, y) -> (x + 7, y + 10), with final position at (10, 6)',
      '(x, y) -> (x - 3, y - 4), with final position at (0, -8)',
      '(x, y) -> (3x, 4y), with final position at (9, -16)',
    ],
    correctIndex: 0,
    explanation: 'Calculate the net changes: horizontal movement is +5 - 2 = +3 (x + 3), and vertical movement is +7 - 3 = +4 (y + 4). The net translation rule is (x, y) -> (x + 3, y + 4). Applying this to the starting point (3, -4): x\' = 3 + 3 = 6, and y\' = -4 + 4 = 0. The robot\'s final position is (6, 0).',
    hint: 'Combine movements: horizontal (+5 - 2 = +3) and vertical (+7 - 3 = +4). Apply (x + 3, y + 4) to (3, -4) to get (6, 0).',
  },

  // ==========================================
  // REFLECTIONS (8 QUESTIONS: q10 - q14, q16 - q18)
  // ==========================================
  {
    id: 'staar-t-q10',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'graph',
    subtopic: 'Reflection across the x-axis on Graph',
    question: 'Triangle ABC is graphed on the coordinate grid. Triangle ABC is reflected across the x-axis to create triangle A\'B\'C\'. Which algebraic rule and image coordinates represent this reflection?',
    context: 'Reflection across the x-axis',
    graphData: {
      title: 'Reflection of Triangle ABC across x-axis',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ΔABC)',
          color: 'indigo',
          vertices: [
            { x: 2, y: 3, label: 'A(2, 3)', labelOffset: { dx: -12, dy: 10 } },
            { x: 6, y: 1, label: 'B(6, 1)', labelOffset: { dx: 12, dy: 10 } },
            { x: 4, y: 7, label: 'C(4, 7)', labelOffset: { dx: 0, dy: 14 } },
          ],
        },
        {
          name: 'Image (ΔA\'B\'C\')',
          color: 'emerald',
          isDashed: true,
          vertices: [
            { x: 2, y: -3, label: 'A\'(2, -3)', labelOffset: { dx: -14, dy: -10 } },
            { x: 6, y: -1, label: 'B\'(6, -1)', labelOffset: { dx: 14, dy: -10 } },
            { x: 4, y: -7, label: 'C\'(4, -7)', labelOffset: { dx: 0, dy: -14 } },
          ],
        },
      ],
      reflectionLine: {
        type: 'x-axis',
        label: 'Line of Reflection (x-axis)',
      },
    },
    options: [
      '(x, y) -> (x, -y), with vertex A\' located at (2, -3)',
      '(x, y) -> (-x, y), with vertex A\' located at (-2, 3)',
      '(x, y) -> (-x, -y), with vertex A\' located at (-2, -3)',
      '(x, y) -> (y, x), with vertex A\' located at (3, 2)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the horizontal x-axis preserves the x-coordinate and negates the y-coordinate: (x, y) -> (x, -y). Vertex A(2, 3) becomes A\'(2, -3).',
    hint: 'Reflecting over the x-axis keeps x the same and changes the sign of y: (x, y) -> (x, -y).',
  },
  {
    id: 'staar-t-q11',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'graph',
    subtopic: 'Reflection across the y-axis on Graph',
    question: 'Quadrilateral PQRS in Quadrant II was reflected to create quadrilateral P\'Q\'R\'S\' in Quadrant I as shown on the coordinate plane. Which algebraic rule represents this transformation?',
    context: 'Quadrant II -> Quadrant I Reflection',
    graphData: {
      title: 'Reflection across the y-axis',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (PQRS)',
          color: 'indigo',
          vertices: [
            { x: -7, y: 2, label: 'P(-7, 2)', labelOffset: { dx: -12, dy: -10 } },
            { x: -3, y: 6, label: 'Q(-3, 6)', labelOffset: { dx: -10, dy: 12 } },
            { x: -2, y: 3, label: 'R(-2, 3)', labelOffset: { dx: 12, dy: 10 } },
            { x: -6, y: 1, label: 'S(-6, 1)', labelOffset: { dx: 0, dy: -14 } },
          ],
        },
        {
          name: 'Image (P\'Q\'R\'S\')',
          color: 'emerald',
          vertices: [
            { x: 7, y: 2, label: 'P\'(7, 2)', labelOffset: { dx: 12, dy: -10 } },
            { x: 3, y: 6, label: 'Q\'(3, 6)', labelOffset: { dx: 10, dy: 12 } },
            { x: 2, y: 3, label: 'R\'(2, 3)', labelOffset: { dx: -12, dy: 10 } },
            { x: 6, y: 1, label: 'S\'(6, 1)', labelOffset: { dx: 0, dy: -14 } },
          ],
        },
      ],
      reflectionLine: {
        type: 'y-axis',
        label: 'Line of Reflection (y-axis)',
      },
    },
    options: [
      '(x, y) -> (-x, y)',
      '(x, y) -> (x, -y)',
      '(x, y) -> (-x, -y)',
      '(x, y) -> (y, -x)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the vertical y-axis negates the x-coordinate while leaving the y-coordinate unchanged: (x, y) -> (-x, y). For example, P(-7, 2) maps to P\'(7, 2).',
    hint: 'Notice that the y-values stay the same (height is unchanged) while the x-values flip signs across the y-axis.',
  },
  {
    id: 'staar-t-q12',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'graph',
    subtopic: 'Determine Image Coordinates after Reflection',
    question: 'Triangle XYZ is graphed in Quadrant III. Triangle XYZ is reflected across the y-axis to create triangle X\'Y\'Z\'. What are the coordinates of vertex X\'?',
    context: 'Pre-image in Quadrant III reflected over y-axis',
    graphData: {
      title: 'Triangle XYZ in Quadrant III',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Triangle XYZ',
          color: 'indigo',
          vertices: [
            { x: -6, y: -2, label: 'X(-6, -2)', labelOffset: { dx: -14, dy: -10 } },
            { x: -2, y: -5, label: 'Y(-2, -5)', labelOffset: { dx: 12, dy: -10 } },
            { x: -4, y: -1, label: 'Z(-4, -1)', labelOffset: { dx: 0, dy: 14 } },
          ],
        },
      ],
      reflectionLine: {
        type: 'y-axis',
        label: 'Line of Reflection (y-axis)',
      },
    },
    options: [
      '(6, -2)',
      '(-6, 2)',
      '(6, 2)',
      '(-2, -6)',
    ],
    correctIndex: 0,
    explanation: 'From the graph, vertex X is at (-6, -2). Reflecting across the y-axis applies the rule (x, y) -> (-x, y). Negating the x-coordinate gives -(-6) = 6, while the y-coordinate remains -2. Vertex X\' is located at (6, -2) in Quadrant IV.',
    hint: 'Reflecting across the y-axis changes the sign of x from -6 to +6, while y stays -2.',
  },
  {
    id: 'staar-t-q13',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'rule',
    subtopic: 'Algebraic Coordinate Rules for Reflections',
    question: 'Which algebraic rule represents a reflection across the x-axis on a coordinate grid?',
    context: 'Coordinate Rules for Reflections',
    options: [
      '(x, y) -> (x, -y)',
      '(x, y) -> (-x, y)',
      '(x, y) -> (-x, -y)',
      '(x, y) -> (y, x)',
    ],
    correctIndex: 0,
    explanation: 'A reflection across the horizontal x-axis flips points over the line y = 0. The x-coordinate stays the same and the y-coordinate changes sign: (x, y) -> (x, -y).',
    hint: 'Across the x-axis: x stays the same, y changes sign: (x, -y).',
  },
  {
    id: 'staar-t-q14',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'rule',
    subtopic: 'Working Backwards to Find Pre-Image of Reflection',
    question: 'An image vertex K\' is located at (-6, -8) after a polygon is reflected across the x-axis on a coordinate plane. What were the coordinates of the pre-image vertex K?',
    context: 'Image: K\'(-6, -8), Reflection across x-axis',
    options: [
      '(-6, 8)',
      '(6, -8)',
      '(-6, -8)',
      '(6, 8)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the x-axis keeps the x-coordinate unchanged and negates the y-coordinate according to the rule (x, y) -> (x, -y). If the image coordinates are K\'(-6, -8), then x = -6 and -y = -8, which means y = 8. The pre-image vertex K was located at (-6, 8).',
    hint: 'Reflecting across the x-axis negates only the y-coordinate. If the image y-coordinate is -8, the original pre-image y-coordinate was +8.',
  },
  {
    id: 'staar-t-q16',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'coordinate',
    subtopic: 'Quadrant Mapping under Reflection',
    question: 'Point M is located in Quadrant IV at (5, -6). If point M is reflected across the y-axis to create point M\', in which quadrant will M\' be located, and what will be its coordinates?',
    context: 'Pre-image M(5, -6) in Quadrant IV',
    options: [
      'Quadrant III, at (-5, -6)',
      'Quadrant I, at (5, 6)',
      'Quadrant II, at (-5, 6)',
      'Quadrant IV, at (6, -5)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the y-axis changes the sign of the x-coordinate: (x, y) -> (-x, y). M(5, -6) becomes M\'(-5, -6). A point with both negative x and negative y is located in Quadrant III.',
    hint: 'Negate x: 5 -> -5. Keep y: -6. The point (-5, -6) is in Quadrant III (negative x, negative y).',
  },
  {
    id: 'staar-t-q17',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'word-problem',
    subtopic: 'Graphic Logo Symmetry & Reflection',
    question: 'A graphic designer is creating a symmetrical corporate logo on a coordinate grid. The right half of the logo contains an anchor point at (7, 4). The designer reflects this point across the vertical y-axis to create the matching anchor point on the opposite (left) side of the logo. What are the coordinates of the reflected anchor point?',
    context: 'Anchor Point: (7, 4), Reflection across y-axis',
    options: [
      '(-7, 4)',
      '(7, -4)',
      '(-7, -4)',
      '(4, 7)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the vertical y-axis negates the x-coordinate while preserving the y-coordinate: (x, y) -> (-x, y). Applying this to the right-side anchor point (7, 4) gives -(7) = -7, while the y-coordinate remains 4. The reflected anchor point on the left side is located at (-7, 4).',
    hint: 'Reflecting across the vertical y-axis changes the sign of the horizontal x-coordinate: 7 becomes -7, while y remains 4.',
  },
  {
    id: 'staar-t-q18',
    teksCode: 'TEKS 8.10.B',
    standardType: 'Supporting',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'concept',
    subtopic: 'Orientation and Congruence in Reflections',
    question: 'A polygon is reflected across the y-axis on a coordinate plane. Which statement correctly describes the relationship between the pre-image and the image?',
    context: 'Geometric Properties of Reflections',
    options: [
      'The pre-image and image are congruent, but their vertex orientation is reversed (flipped).',
      'The pre-image and image are similar but have different side lengths.',
      'The angle measures are each multiplied by -1.',
      'The area of the image is negative.',
    ],
    correctIndex: 0,
    explanation: 'Reflections are rigid motions (isometries) that preserve side lengths, angle measures, and area, so the figures are congruent. However, reflections reverse the clockwise/counterclockwise orientation of the vertices (chirality).',
    hint: 'Reflections preserve size and shape (congruence) but flip the orientation of the vertices.',
  },

  // ==========================================
  // ROTATIONS (8 QUESTIONS: q19 - q24, q26 - q27)
  // ==========================================
  {
    id: 'staar-t-q19',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'graph',
    subtopic: '90° Counterclockwise Rotation on Graph',
    question: 'Triangle ABC is graphed in Quadrant I. Triangle ABC is rotated 90° counterclockwise about the origin to create triangle A\'B\'C\'. Which algebraic rule represents this rotation?',
    context: 'Rotation: 90° counterclockwise about origin',
    graphData: {
      title: '90° Counterclockwise Rotation about Origin',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ΔABC)',
          color: 'indigo',
          vertices: [
            { x: 2, y: 5, label: 'A(2, 5)', labelOffset: { dx: 12, dy: 10 } },
            { x: 6, y: 2, label: 'B(6, 2)', labelOffset: { dx: 12, dy: -10 } },
            { x: 3, y: 1, label: 'C(3, 1)', labelOffset: { dx: -10, dy: -12 } },
          ],
        },
        {
          name: 'Image (ΔA\'B\'C\')',
          color: 'emerald',
          vertices: [
            { x: -5, y: 2, label: 'A\'(-5, 2)', labelOffset: { dx: -14, dy: 10 } },
            { x: -2, y: 6, label: 'B\'(-2, 6)', labelOffset: { dx: 0, dy: 14 } },
            { x: -1, y: 3, label: 'C\'(-1, 3)', labelOffset: { dx: 12, dy: 10 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: 'Center (0, 0)' },
    },
    options: [
      '(x, y) -> (-y, x)',
      '(x, y) -> (y, -x)',
      '(x, y) -> (-x, -y)',
      '(x, y) -> (-x, y)',
    ],
    correctIndex: 0,
    explanation: 'Check the coordinates: A(2, 5) maps to A\'(-5, 2). The x and y values are swapped, and the new first coordinate is negated: (-y, x). This is the standard rule for a 90° counterclockwise rotation about the origin.',
    hint: 'A 90° counterclockwise rotation swaps coordinates and negates the first term: (x, y) -> (-y, x).',
  },
  {
    id: 'staar-t-q20',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'graph',
    subtopic: '180° Rotation about Origin on Graph',
    question: 'Rectangle PQRS is rotated 180° about the origin to create rectangle P\'Q\'R\'S\'. What are the coordinates of vertex R\'?',
    context: 'Rotation: 180° about origin',
    graphData: {
      title: '180° Rotation of Rectangle PQRS',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Rectangle PQRS',
          color: 'indigo',
          vertices: [
            { x: -6, y: 2, label: 'P(-6, 2)', labelOffset: { dx: -12, dy: -10 } },
            { x: -2, y: 2, label: 'Q(-2, 2)', labelOffset: { dx: 12, dy: -10 } },
            { x: -2, y: 5, label: 'R(-2, 5)', labelOffset: { dx: 12, dy: 10 } },
            { x: -6, y: 5, label: 'S(-6, 5)', labelOffset: { dx: -12, dy: 10 } },
          ],
        },
        {
          name: 'Image P\'Q\'R\'S\'',
          color: 'emerald',
          isDashed: true,
          vertices: [
            { x: 6, y: -2, label: 'P\'(6, -2)', labelOffset: { dx: 12, dy: 10 } },
            { x: 2, y: -2, label: 'Q\'(2, -2)', labelOffset: { dx: -12, dy: 10 } },
            { x: 2, y: -5, label: 'R\'(?, ?)', labelOffset: { dx: -12, dy: -12 } },
            { x: 6, y: -5, label: 'S\'(6, -5)', labelOffset: { dx: 12, dy: -12 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: '(0,0)' },
    },
    options: [
      '(2, -5)',
      '(-2, -5)',
      '(5, -2)',
      '(-5, 2)',
    ],
    correctIndex: 0,
    explanation: 'From the graph, vertex R is at (-2, 5). A 180° rotation about the origin follows the rule (x, y) -> (-x, -y). Applying this rule: -(-2) = 2, and -(5) = -5. Vertex R\' is located at (2, -5).',
    hint: 'A 180° rotation negates both coordinates: (-x, -y). Replace x with -2 and y with 5.',
  },
  {
    id: 'staar-t-q21',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'graph',
    subtopic: '90° Clockwise Rotation on Graph',
    question: 'Triangle JKL in Quadrant II is rotated 90° clockwise about the origin to create triangle J\'K\'L\'. What are the coordinates of vertex J\'?',
    context: 'Rotation: 90° clockwise about (0,0)',
    graphData: {
      title: 'Triangle JKL in Quadrant II',
      xMin: -8,
      xMax: 8,
      yMin: -8,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Triangle JKL',
          color: 'indigo',
          vertices: [
            { x: -3, y: 6, label: 'J(-3, 6)', labelOffset: { dx: 0, dy: 14 } },
            { x: -1, y: 2, label: 'K(-1, 2)', labelOffset: { dx: 12, dy: -10 } },
            { x: -5, y: 2, label: 'L(-5, 2)', labelOffset: { dx: -12, dy: -10 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: '(0, 0)' },
    },
    options: [
      '(6, 3)',
      '(-6, -3)',
      '(-3, -6)',
      '(3, 6)',
    ],
    correctIndex: 0,
    explanation: 'Vertex J is located at (-3, 6). A 90° clockwise rotation about the origin is given by the rule (x, y) -> (y, -x). Substituting x = -3 and y = 6: (y, -x) = (6, -(-3)) = (6, 3). Vertex J\' is at (6, 3) in Quadrant I.',
    hint: 'The rule for a 90° clockwise rotation is (x, y) -> (y, -x). Place y first (6), then negate x (-(-3) = 3).',
  },
  {
    id: 'staar-t-q22',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'rule',
    subtopic: 'Equivalent Rotations Rule Identification',
    question: 'A polygon is rotated 270° clockwise about the origin. Which algebraic representation models this rotation?',
    context: 'Rotation: 270° clockwise = 90° counterclockwise',
    options: [
      '(x, y) -> (-y, x)',
      '(x, y) -> (y, -x)',
      '(x, y) -> (-x, -y)',
      '(x, y) -> (x, -y)',
    ],
    correctIndex: 0,
    explanation: 'Rotating 270° clockwise (3 quarter turns clockwise) leaves the figure in the exact same orientation as rotating 90° counterclockwise (1 quarter turn counterclockwise). Both are represented by (x, y) -> (-y, x).',
    hint: '3 quarter turns clockwise = 1 quarter turn counterclockwise: (x, y) -> (-y, x).',
  },
  {
    id: 'staar-t-q23',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'rule',
    subtopic: 'Algebraic Coordinate Rule for 180° Rotation',
    question: 'Which algebraic rule represents a 180° rotation about the origin on a coordinate grid?',
    context: 'Coordinate Rules for 180° Rotation',
    options: [
      '(x, y) -> (-x, -y)',
      '(x, y) -> (-y, -x)',
      '(x, y) -> (-y, x)',
      '(x, y) -> (y, -x)',
    ],
    correctIndex: 0,
    explanation: 'A 180° rotation about the origin negates both coordinates without swapping their positions: (x, y) -> (-x, -y). Whether rotated clockwise or counterclockwise, 180° yields the same image.',
    hint: 'A 180° rotation negates both terms: (-x, -y).',
  },
  {
    id: 'staar-t-q24',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'coordinate',
    subtopic: '180° Rotation Calculation',
    question: 'Triangle WXY has vertex W located at (-4, -7). If triangle WXY is rotated 180° about the origin to create triangle W\'X\'Y\', which ordered pair represents vertex W\'?',
    context: 'Rotation: 180° about origin, W(-4, -7)',
    options: [
      '(4, 7)',
      '(-7, -4)',
      '(7, 4)',
      '(-4, 7)',
    ],
    correctIndex: 0,
    explanation: 'A 180° rotation about the origin negates both coordinates: (x, y) -> (-x, -y). Applying this rule to W(-4, -7) yields -(-4) = 4 and -(-7) = 7, giving W\'(4, 7).',
    hint: 'A 180° rotation changes the signs of both coordinates: (x, y) -> (-x, -y).',
  },
  {
    id: 'staar-t-q26',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'word-problem',
    subtopic: 'Mechanical Windmill Rotor Rotation',
    question: 'An automated wind turbine sensor tracks a rotor blade tip at coordinate position (-5, 12) relative to the central hub at (0, 0). The blade completes a 90° counterclockwise rotation about the origin. What is the new coordinate location of the blade tip?',
    context: 'Blade Tip: (-5, 12), 90° counterclockwise rotation',
    options: [
      '(-12, -5)',
      '(12, 5)',
      '(12, -5)',
      '(-5, -12)',
    ],
    correctIndex: 0,
    explanation: 'A 90° counterclockwise rotation about the origin follows the rule (x, y) -> (-y, x). Substituting x = -5 and y = 12: (-y, x) = (-(12), -5) = (-12, -5).',
    hint: 'Apply (x, y) -> (-y, x) to the ordered pair (-5, 12).',
  },
  {
    id: 'staar-t-q27',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'table',
    subtopic: 'Missing Coordinate in 180° Rotation Table',
    question: 'The table lists coordinates of quadrilateral ABCD rotated 180° about the origin to create A\'B\'C\'D\'. What are the coordinates of vertex C\'?',
    tableData: {
      headers: ['Vertex', 'Original (x, y)', 'Image Vertex', 'Image (x\', y\')'],
      rows: [
        ['A', '(-3, 5)', 'A\'', '(3, -5)'],
        ['B', '(2, 5)', 'B\'', '(-2, -5)'],
        ['C', '(4, 1)', 'C\'', '(?, ?)'],
        ['D', '(-1, 1)', 'D\'', '(1, -1)'],
      ],
    },
    options: [
      '(-4, -1)',
      '(4, -1)',
      '(-1, -4)',
      '(1, 4)',
    ],
    correctIndex: 0,
    explanation: 'A 180° rotation about the origin follows (x, y) -> (-x, -y). Applying this rule to C(4, 1) negates both coordinates: -(4) = -4 and -(1) = -1. Vertex C\' is at (-4, -1).',
    hint: 'Negate both coordinates of C(4, 1): -4 and -1.',
  },

  // ==========================================
  // DILATIONS (8 QUESTIONS: q28 - q33, q35 - q36)
  // ==========================================
  {
    id: 'staar-t-q28',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'graph',
    subtopic: 'Determine Dilation Rule from Graph (k > 1)',
    question: 'Triangle ABC was dilated with the origin as the center of dilation to create triangle A\'B\'C\' as shown on the coordinate plane. Which algebraic rule best describes this dilation?',
    context: 'Enlargement Dilation centered at (0, 0)',
    graphData: {
      title: 'Dilation of Triangle ABC (Center at Origin)',
      xMin: -2,
      xMax: 10,
      yMin: -2,
      yMax: 10,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ΔABC)',
          color: 'indigo',
          vertices: [
            { x: 2, y: 1, label: 'A(2, 1)', labelOffset: { dx: -12, dy: -10 } },
            { x: 4, y: 1, label: 'B(4, 1)', labelOffset: { dx: 12, dy: -10 } },
            { x: 2, y: 4, label: 'C(2, 4)', labelOffset: { dx: -12, dy: 10 } },
          ],
        },
        {
          name: 'Image (ΔA\'B\'C\')',
          color: 'emerald',
          vertices: [
            { x: 4, y: 2, label: 'A\'(4, 2)', labelOffset: { dx: -14, dy: -10 } },
            { x: 8, y: 2, label: 'B\'(8, 2)', labelOffset: { dx: 14, dy: -10 } },
            { x: 4, y: 8, label: 'C\'(4, 8)', labelOffset: { dx: -14, dy: 12 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: 'Center (0,0)' },
    },
    options: [
      '(x, y) -> (2x, 2y)',
      '(x, y) -> (0.5x, 0.5y)',
      '(x, y) -> (x + 2, y + 1)',
      '(x, y) -> (4x, 2y)',
    ],
    correctIndex: 0,
    explanation: 'Compare pre-image and image coordinates: A(2, 1) maps to A\'(4, 2), and B(4, 1) maps to B\'(8, 2). Scale factor k = 4 / 2 = 2 (or 2 / 1 = 2). Both coordinates are multiplied by 2, so the rule is (x, y) -> (2x, 2y).',
    hint: 'Divide the image coordinates by the pre-image coordinates: k = 4 / 2 = 2.',
  },
  {
    id: 'staar-t-q29',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'graph',
    subtopic: 'Determine Dilation Scale Factor from Graph (0 < k < 1)',
    question: 'Quadrilateral PQRS was dilated centered at the origin to produce quadrilateral P\'Q\'R\'S\'. What scale factor was applied in this dilation?',
    context: 'Dilation: Pre-image PQRS -> Image P\'Q\'R\'S\'',
    graphData: {
      title: 'Reduction Dilation centered at Origin',
      xMin: -10,
      xMax: 10,
      yMin: -6,
      yMax: 10,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (PQRS)',
          color: 'indigo',
          vertices: [
            { x: -8, y: 4, label: 'P(-8, 4)', labelOffset: { dx: -14, dy: 10 } },
            { x: -4, y: 8, label: 'Q(-4, 8)', labelOffset: { dx: 0, dy: 14 } },
            { x: 8, y: 4, label: 'R(8, 4)', labelOffset: { dx: 14, dy: 10 } },
            { x: 4, y: -4, label: 'S(4, -4)', labelOffset: { dx: 14, dy: -12 } },
          ],
        },
        {
          name: 'Image (P\'Q\'R\'S\')',
          color: 'emerald',
          vertices: [
            { x: -4, y: 2, label: 'P\'(-4, 2)', labelOffset: { dx: -14, dy: 8 } },
            { x: -2, y: 4, label: 'Q\'(-2, 4)', labelOffset: { dx: 0, dy: 12 } },
            { x: 4, y: 2, label: 'R\'(4, 2)', labelOffset: { dx: 14, dy: 8 } },
            { x: 2, y: -2, label: 'S\'(2, -2)', labelOffset: { dx: 14, dy: -10 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: '(0,0)' },
    },
    options: [
      '1/2 (or 0.5)',
      '2',
      '1/4 (or 0.25)',
      '4',
    ],
    correctIndex: 0,
    explanation: 'To find the scale factor k, divide an image coordinate by its corresponding pre-image coordinate: k = P\'x / Px = -4 / -8 = 1/2 = 0.5. Since the image is smaller than the pre-image, the scale factor is k = 1/2.',
    hint: 'Scale factor k = Image coordinate / Pre-image coordinate = -4 / -8 = 1/2.',
  },
  {
    id: 'staar-t-q30',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'graph',
    subtopic: 'Scale Factor with Fractional Values on Graph',
    question: 'Trapezoid ABCD is dilated centered at the origin to create trapezoid A\'B\'C\'D\'. What scale factor was applied to trapezoid ABCD?',
    context: 'Dilation of Trapezoid ABCD',
    graphData: {
      title: 'Dilation of Trapezoid ABCD',
      xMin: -10,
      xMax: 8,
      yMin: -4,
      yMax: 8,
      xStep: 2,
      yStep: 2,
      figures: [
        {
          name: 'Pre-Image (ABCD)',
          color: 'indigo',
          vertices: [
            { x: -4, y: 4, label: 'A(-4, 4)', labelOffset: { dx: -12, dy: 10 } },
            { x: 2, y: 4, label: 'B(2, 4)', labelOffset: { dx: 12, dy: 10 } },
            { x: 4, y: -2, label: 'C(4, -2)', labelOffset: { dx: 12, dy: -12 } },
            { x: -6, y: -2, label: 'D(-6, -2)', labelOffset: { dx: -12, dy: -12 } },
          ],
        },
        {
          name: 'Image (A\'B\'C\'D\')',
          color: 'emerald',
          vertices: [
            { x: -6, y: 6, label: 'A\'(-6, 6)', labelOffset: { dx: -14, dy: 12 } },
            { x: 3, y: 6, label: 'B\'(3, 6)', labelOffset: { dx: 14, dy: 12 } },
            { x: 6, y: -3, label: 'C\'(6, -3)', labelOffset: { dx: 14, dy: -14 } },
            { x: -9, y: -3, label: 'D\'(-9, -3)', labelOffset: { dx: -14, dy: -14 } },
          ],
        },
      ],
      centerPoint: { x: 0, y: 0, label: '(0,0)' },
    },
    options: [
      '3/2 (or 1.5)',
      '2/3 (or 0.67)',
      '2',
      '1/2',
    ],
    correctIndex: 0,
    explanation: 'Divide the image coordinates by the pre-image coordinates: k = A\'x / Ax = -6 / -4 = 3/2 = 1.5 (or B\'x / Bx = 3 / 2 = 1.5). The scale factor applied is 3/2.',
    hint: 'Scale factor k = Image coordinate / Pre-image coordinate = 3 / 2 = 1.5.',
  },
  {
    id: 'staar-t-q31',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'rule',
    subtopic: 'Coordinate Rule for Dilations',
    question: 'A polygon on a coordinate plane is dilated with the center of dilation at the origin and a scale factor of 3/4. Which algebraic rule represents this dilation?',
    context: 'Scale factor: k = 3/4, Center: Origin (0,0)',
    options: [
      '(x, y) -> (3/4 x, 3/4 y)',
      '(x, y) -> (4/3 x, 4/3 y)',
      '(x, y) -> (x + 3/4, y + 3/4)',
      '(x, y) -> (3x, 4y)',
    ],
    correctIndex: 0,
    explanation: 'A dilation centered at the origin with scale factor k multiplies both the x- and y-coordinates by k: (x, y) -> (kx, ky). With k = 3/4, the rule is (x, y) -> (3/4 x, 3/4 y).',
    hint: 'Dilations multiply coordinates by the scale factor k: (kx, ky).',
  },
  {
    id: 'staar-t-q32',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'rule',
    subtopic: 'Distinguishing Dilations from Translations',
    question: 'Which algebraic rule represents a dilation that results in an enlargement?',
    context: 'Identifying Enlargement Dilation Rules',
    options: [
      '(x, y) -> (3.5x, 3.5y)',
      '(x, y) -> (0.6x, 0.6y)',
      '(x, y) -> (x + 3.5, y + 3.5)',
      '(x, y) -> (-3.5x, -3.5y)',
    ],
    correctIndex: 0,
    explanation: 'An enlargement requires a multiplicative scale factor greater than 1 (k > 1). In the rule (x, y) -> (3.5x, 3.5y), k = 3.5 > 1, producing an enlargement. Note that (x + 3.5, y + 3.5) is an additive translation, not a dilation.',
    hint: 'Dilations multiply coordinates (kx, ky). For an enlargement, the multiplier must be greater than 1.',
  },
  {
    id: 'staar-t-q33',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'coordinate',
    subtopic: 'Dilated Vertex Coordinate Calculation',
    question: 'Point P is located at (-6, 9). Point P is dilated with the origin as the center of dilation using a scale factor of 2/3 to create point P\'. What are the coordinates of P\'?',
    context: 'Pre-image: P(-6, 9), Scale factor: k = 2/3',
    options: [
      '(-4, 6)',
      '(-9, 13.5)',
      '(-4, 9)',
      '(-6, 6)',
    ],
    correctIndex: 0,
    explanation: 'Multiply each coordinate by 2/3: x\' = -6 * (2/3) = -4, and y\' = 9 * (2/3) = 6. The coordinates of point P\' are (-4, 6).',
    hint: 'Multiply both -6 and 9 by 2/3: -6 * 2/3 = -4 and 9 * 2/3 = 6.',
  },
  {
    id: 'staar-t-q35',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'word-problem',
    subtopic: 'Digital Blueprint Resizing Context',
    question: 'An architect scales a digital floor plan on a design grid using a dilation centered at the origin. A corner column originally at (12, 16) is relocated to (3, 4) on the reduced floor plan. Which algebraic rule was used to perform this reduction?',
    context: 'Original Column: (12, 16) -> Scaled Column: (3, 4)',
    options: [
      '(x, y) -> (1/4 x, 1/4 y)',
      '(x, y) -> (4x, 4y)',
      '(x, y) -> (x - 9, y - 12)',
      '(x, y) -> (1/3 x, 1/4 y)',
    ],
    correctIndex: 0,
    explanation: 'Find the scale factor k by dividing the new coordinate by the original coordinate: k = 3 / 12 = 1/4 and 4 / 16 = 1/4. The algebraic rule for this dilation is (x, y) -> (1/4 x, 1/4 y).',
    hint: 'Divide new coordinate by original coordinate: 3 / 12 = 1/4. Rule is (1/4 x, 1/4 y).',
  },
  {
    id: 'staar-t-q36',
    teksCode: 'TEKS 8.10.B',
    standardType: 'Supporting',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'concept',
    subtopic: 'Linear vs Area Scaling & Similarity',
    question: 'Rectangle ABCD is dilated with a scale factor of k = 3 centered at the origin to create rectangle A\'B\'C\'D\'. Which statement is true regarding the relationship between rectangle ABCD and rectangle A\'B\'C\'D\'?',
    context: 'Dilation Properties (k = 3)',
    options: [
      'The corresponding side lengths of the image are 3 times as long, the area is 9 times as great, and the figures are similar but not congruent.',
      'The figures are congruent because corresponding angle measures are multiplied by 3.',
      'The perimeter is multiplied by 9 and the area is multiplied by 3.',
      'The corresponding side lengths and area both increase by 3 units.',
    ],
    correctIndex: 0,
    explanation: 'In a dilation with scale factor k, linear dimensions (side lengths, perimeter) are multiplied by k (3x), while the area is multiplied by k² (3² = 9x). Angle measures are preserved, producing similar figures that are not congruent when k != 1.',
    hint: 'Side lengths scale by k = 3; area scales by k² = 9. Dilation creates similar figures.',
  },

  // ==========================================
  // MULTI-STEP & COMBINED TRANSFORMATIONS (4 QUESTIONS: q09, q15, q25, q34)
  // ==========================================
  {
    id: 'staar-t-q09',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'combined',
    category: 'coordinate',
    subtopic: 'Two-Step Transformation Sequence: Reflection then Translation',
    question: 'Point A is located at (-3, 5). Point A is first reflected across the x-axis, and then the resulting point is translated using the rule (x, y) -> (x + 6, y - 2) to create point A\'\'. What are the coordinates of point A\'\'?',
    context: 'Sequence: 1) Reflection across x-axis, 2) Translation (x + 6, y - 2)',
    options: [
      '(3, -7)',
      '(3, 3)',
      '(-9, -7)',
      '(-3, -7)',
    ],
    correctIndex: 0,
    explanation: 'Step 1: Reflecting across the x-axis negates the y-coordinate according to (x, y) -> (x, -y). Point A(-3, 5) becomes A\'(-3, -5). Step 2: Apply the translation rule (x + 6, y - 2) to A\'(-3, -5): x\'\' = -3 + 6 = 3, and y\'\' = -5 - 2 = -7. The final coordinates of A\'\' are (3, -7). If a student forgets the reflection, they would get (-3 + 6, 5 - 2) = (3, 3).',
    hint: 'Perform the transformations in order: first negate the y-coordinate to get (-3, -5), then add 6 to x and subtract 2 from y.',
  },
  {
    id: 'staar-t-q15',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'combined',
    category: 'coordinate',
    subtopic: 'Two-Step Transformation Sequence: Translation then Dilation',
    question: 'A vertex of a polygon is located at (4, -2). The polygon is first translated according to the rule (x, y) -> (x - 2, y + 5). The image is then dilated with the origin as the center of dilation by a scale factor of 3. What are the final coordinates of this vertex?',
    context: 'Sequence: 1) Translation (x - 2, y + 5), 2) Dilation centered at origin with k = 3',
    options: [
      '(6, 9)',
      '(2, 3)',
      '(10, -1)',
      '(12, -6)',
    ],
    correctIndex: 0,
    explanation: 'Step 1: Apply translation to (4, -2): x\' = 4 - 2 = 2, and y\' = -2 + 5 = 3, giving intermediate point (2, 3). Step 2: Dilate (2, 3) by scale factor 3: x\'\' = 2 * 3 = 6, and y\'\' = 3 * 3 = 9. The final coordinates are (6, 9). Notice (2, 3) is only the intermediate point, and (12, -6) comes from dilating before translating.',
    hint: 'First translate: (4 - 2, -2 + 5) = (2, 3). Then dilate by multiplying both coordinates by 3: (2 * 3, 3 * 3) = (6, 9).',
  },
  {
    id: 'staar-t-q25',
    teksCode: 'TEKS 8.10.A',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'combined',
    category: 'concept',
    subtopic: 'Congruence vs. Similarity Across Transformations',
    question: 'A math student analyzes four different transformations on a coordinate plane:\n\nTransformation 1: (x, y) -> (x + 5, y - 7)\nTransformation 2: (x, y) -> (-x, y)\nTransformation 3: (x, y) -> (-y, x)\nTransformation 4: (x, y) -> (2.5x, 2.5y)\n\nWhich statement correctly classifies the relationship between each pre-image and its resulting image?',
    context: 'Classifying Congruence and Similarity across Transformations',
    options: [
      'Transformations 1, 2, and 3 produce congruent figures that preserve side lengths and angle measures, while Transformation 4 produces a similar figure whose side lengths change.',
      'Transformations 1, 2, 3, and 4 all produce figures that are both congruent and similar.',
      'Transformations 1 and 4 produce congruent figures, while Transformations 2 and 3 do not.',
      'Only Transformation 1 produces a congruent figure because the others change the orientation or size.',
    ],
    correctIndex: 0,
    explanation: 'Transformations 1 (translation), 2 (reflection), and 3 (rotation) are rigid transformations (isometries) that preserve side lengths and angle measures, producing congruent figures (which are also similar with scale factor 1). Transformation 4 is a dilation with scale factor k = 2.5, which preserves angle measures and shape but changes side lengths by a factor of 2.5, producing a similar figure that is NOT congruent.',
    hint: 'Translations, reflections, and rotations preserve size (congruence). Only dilations change side lengths while preserving angle measures (similarity).',
  },
  {
    id: 'staar-t-q34',
    teksCode: 'TEKS 8.10.A',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'combined',
    category: 'concept',
    subtopic: 'Preservation of Angle Measure and Parallelism',
    question: 'Triangle PQR has an interior angle measuring 42° and two sides that are parallel to coordinate grid lines. Triangle PQR is transformed to create triangle P\'Q\'R\'. Which transformations guarantee that the corresponding interior angle in triangle P\'Q\'R\' will measure 42° and parallel relationships between lines are preserved?',
    context: 'Invariance of Angle Measures & Parallelism in Transformations',
    options: [
      'Translations, reflections, rotations, and dilations all preserve angle measures and parallelism.',
      'Only translations and rotations preserve angle measures and parallelism.',
      'Only dilations preserve angle measures; rigid transformations do not.',
      'Translations preserve angle measures, but dilations change angle measures proportional to the scale factor.',
    ],
    correctIndex: 0,
    explanation: 'All four transformations taught in Grade 8 (translations, reflections, rotations, and dilations) preserve interior angle measures and line parallelism. Under a dilation, side lengths and perimeter change by the scale factor k, but the corresponding angle measures remain strictly identical (42° remains 42°), which is why dilated figures are similar.',
    hint: 'Dilations change lengths, but NEVER change angle measures or parallel relationships. All four transformations preserve angle measures!',
  },
];
