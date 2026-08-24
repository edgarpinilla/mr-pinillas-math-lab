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
  teksCode: string; // e.g. "TEKS 8.10.C", "TEKS 8.3.C", "TEKS 8.10.B"
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 3;
  transformationType: 'translation' | 'reflection' | 'rotation' | 'dilation';
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
 * Aligned to Texas TEKS (8.3.C, 8.10.B, 8.10.C) and 2026 STAAR metadata.
 *
 * RIGOROUS MULTI-REPRESENTATIONAL BALANCE:
 * Total Questions: 36
 * - Translation: 9 (3 Graph, 2 Rule, 2 Coordinate, 1 Word Problem, 1 Mixed/Table)
 * - Reflection:  9 (3 Graph, 2 Rule, 2 Coordinate, 1 Word Problem, 1 Mixed/Concept)
 * - Rotation:    9 (3 Graph, 2 Rule, 2 Coordinate, 1 Word Problem, 1 Mixed/Table)
 * - Dilation:    9 (3 Graph, 2 Rule, 2 Coordinate, 1 Word Problem, 1 Mixed/Concept)
 *
 * Grand Representation Totals:
 * - Graphical Coordinate Planes: 12 (3 per transformation)
 * - Algebraic Rules: 8 (2 per transformation)
 * - Coordinate / Ordered-Pair Reasoning: 8 (2 per transformation)
 * - Word Problems / Real-World Context: 4 (1 per transformation)
 * - Mixed / Concept / Table Reasoning: 4 (1 per transformation)
 */
export const STAAR_TRANSFORMATIONS_QUESTIONS: StaarPracticeQuestion[] = [
  // ==========================================
  // TRANSLATIONS (9 QUESTIONS: q01 - q09)
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
      'The triangle is dilated by a scale factor of 9.',
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
    subtopic: 'Applying Translation Rule to Ordered Pair',
    question: 'Point P is located at (-4, 7). Point P is translated using the algebraic rule (x, y) -> (x - 5, y + 8) to create point P\'. What are the coordinates of point P\'?',
    context: 'Pre-image: P(-4, 7), Rule: (x, y) -> (x - 5, y + 8)',
    options: [
      '(-9, 15)',
      '(1, 15)',
      '(-9, -1)',
      '(1, -1)',
    ],
    correctIndex: 0,
    explanation: 'Apply the rule directly: x\' = -4 - 5 = -9, and y\' = 7 + 8 = 15. The coordinates of P\' are (-9, 15).',
    hint: 'Subtract 5 from the x-coordinate (-4 - 5) and add 8 to the y-coordinate (7 + 8).',
  },
  {
    id: 'staar-t-q07',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'coordinate',
    subtopic: 'Determine Translation Shift from Ordered Pairs',
    question: 'A polygon vertex with original coordinates (3, -2) is translated to the image coordinates (7, -8). Which translation rule was applied to the vertex?',
    context: 'Pre-image (3, -2) -> Image (7, -8)',
    options: [
      '(x, y) -> (x + 4, y - 6)',
      '(x, y) -> (x - 4, y + 6)',
      '(x, y) -> (x + 10, y - 10)',
      '(x, y) -> (4x, -6y)',
    ],
    correctIndex: 0,
    explanation: 'Change in x: 7 - 3 = +4 (add 4 to x). Change in y: -8 - (-2) = -8 + 2 = -6 (subtract 6 from y). The translation rule is (x, y) -> (x + 4, y - 6).',
    hint: 'Subtract original coordinates from image coordinates: 7 - 3 = +4 and -8 - (-2) = -6.',
  },
  {
    id: 'staar-t-q08',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'translation',
    category: 'word-problem',
    subtopic: 'Robotic Navigation on Coordinate Grid',
    question: 'A warehouse automated robot starts at coordinate position (3, -4) on a floor map. The robot travels 5 units to the right and 7 units up, then pauses. Next, it moves 2 units to the left and 3 units down. What is the final coordinate position of the robot?',
    context: 'Initial Position: (3, -4)',
    options: [
      '(6, 0)',
      '(10, 6)',
      '(0, -10)',
      '(6, 6)',
    ],
    correctIndex: 0,
    explanation: 'Combine the horizontal changes: +5 - 2 = +3. New x = 3 + 3 = 6. Combine the vertical changes: +7 - 3 = +4. New y = -4 + 4 = 0. The final position is (6, 0).',
    hint: 'Net horizontal movement: +5 - 2 = +3. Net vertical movement: +7 - 3 = +4. Apply these to (3, -4).',
  },
  {
    id: 'staar-t-q09',
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
    explanation: 'Find the translation rule from vertex A: x\' = -3 + 5 = 2 (add 5), y\' = 6 - 4 = 2 (subtract 4). Rule is (x + 5, y - 4). Apply to C(-2, -1): x\' = -2 + 5 = 3, y\' = -1 - 4 = -5. C\' is at (3, -5).',
    hint: 'Determine how much x changes (from -3 to 2 is +5) and how much y changes (from 6 to 2 is -4), then apply to C(-2, -1).',
  },

  // ==========================================
  // REFLECTIONS (9 QUESTIONS: q10 - q18)
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
    subtopic: 'Reflection across the Line y = x',
    question: 'A polygon on a coordinate grid is reflected across the line y = x. Which algebraic rule represents this reflection?',
    context: 'Reflection across diagonal line y = x',
    options: [
      '(x, y) -> (y, x)',
      '(x, y) -> (-y, -x)',
      '(x, y) -> (-x, y)',
      '(x, y) -> (x, -y)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the line y = x interchanges the x and y coordinates of every point: (x, y) -> (y, x). For instance, (2, 5) becomes (5, 2).',
    hint: 'When reflecting over y = x, simply swap the position of x and y: (y, x).',
  },
  {
    id: 'staar-t-q15',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'reflection',
    category: 'coordinate',
    subtopic: 'Reflection across the x-axis Calculation',
    question: 'Point G is located at (-8, 5) on a coordinate plane. If point G is reflected across the x-axis to create point G\', what are the coordinates of G\'?',
    context: 'Pre-image: G(-8, 5)',
    options: [
      '(-8, -5)',
      '(8, 5)',
      '(8, -5)',
      '(5, -8)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the x-axis keeps the x-coordinate unchanged and negates the y-coordinate: (x, y) -> (x, -y). G(-8, 5) maps to G\'(-8, -5).',
    hint: 'Keep x unchanged (-8) and change the sign of y from 5 to -5.',
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
    question: 'A graphic designer is creating a symmetrical corporate logo on a coordinate grid. The right half of the logo contains an anchor point at (-7, 4). The designer reflects this point across the vertical y-axis to create the matching anchor point on the opposite side. What are the coordinates of the reflected anchor point?',
    context: 'Anchor Point: (-7, 4), Reflection across y-axis',
    options: [
      '(7, 4)',
      '(-7, -4)',
      '(7, -4)',
      '(4, -7)',
    ],
    correctIndex: 0,
    explanation: 'Reflecting across the vertical y-axis negates the x-coordinate while preserving the y-coordinate: (x, y) -> (-x, y). Negating x = -7 gives -(-7) = 7, and y remains 4. The mirrored anchor point is at (7, 4).',
    hint: 'Across the y-axis, the horizontal coordinate changes sign: -(-7) = 7, while y stays 4.',
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
  // ROTATIONS (9 QUESTIONS: q19 - q27)
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
    id: 'staar-t-q25',
    teksCode: 'TEKS 8.10.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'rotation',
    category: 'coordinate',
    subtopic: '270° Counterclockwise Rotation Calculation',
    question: 'Point R is located at (3, -8). What are the coordinates of point R\' after a 270° counterclockwise rotation about the origin?',
    context: 'Rotation: 270° counterclockwise about (0,0)',
    options: [
      '(-8, -3)',
      '(8, 3)',
      '(-3, 8)',
      '(8, -3)',
    ],
    correctIndex: 0,
    explanation: 'A 270° counterclockwise rotation about the origin is equivalent to a 90° clockwise rotation, with algebraic rule (x, y) -> (y, -x). Substituting x = 3 and y = -8 gives (y, -x) = (-8, -(3)) = (-8, -3).',
    hint: 'A 270° counterclockwise rotation uses the rule (x, y) -> (y, -x). Put y first (-8) and negate x (-(3) = -3).',
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
  // DILATIONS (9 QUESTIONS: q28 - q36)
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
    id: 'staar-t-q34',
    teksCode: 'TEKS 8.3.C',
    standardType: 'Readiness',
    reportingCategory: 3,
    transformationType: 'dilation',
    category: 'coordinate',
    subtopic: 'Determine Scale Factor from Pre-image & Image Coordinates',
    question: 'A polygon vertex located at (8, -12) is dilated centered at the origin to produce an image vertex at (2, -3). What is the scale factor of the dilation?',
    context: 'Pre-image (8, -12) -> Image (2, -3)',
    options: [
      '1/4 (or 0.25)',
      '4',
      '1/2 (or 0.5)',
      '3/4 (or 0.75)',
    ],
    correctIndex: 0,
    explanation: 'Scale factor k = Image coordinate / Pre-image coordinate: k = 2 / 8 = 1/4 = 0.25 (or -3 / -12 = 1/4). The scale factor applied is 1/4.',
    hint: 'Divide the image coordinate by the original coordinate: 2 / 8 = 1/4.',
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
];
