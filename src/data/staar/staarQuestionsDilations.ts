import { QuestionTable } from '../../types';

export interface DilationPoint {
  name: string;
  x: number;
  y: number;
  imageX?: number;
  imageY?: number;
}

export interface QuestionDilationGraph {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep?: number;
  yStep?: number;
  scaleFactor: number;
  centerOfDilation?: { x: number; y: number };
  preImagePoints: DilationPoint[];
  imagePoints: DilationPoint[];
  preImageColor?: string;
  imageColor?: string;
  preImageLabel?: string;
  imageLabel?: string;
  showRays?: boolean;
}

export type DilationsCategory =
  | 'identify-scale-factor'
  | 'algebraic-representation'
  | 'graph-coordinate'
  | 'properties-similarity'
  | 'perimeter-area'
  | 'real-world';

export interface StaarDilationsQuestion {
  id: string;
  category: DilationsCategory;
  teksCode: string; // TEKS 8.3C, 8.3B, 8.3A, 8.10D
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 3;
  subtopic: string;
  question: string;
  context?: string;
  tableData?: QuestionTable;
  graphData?: QuestionDilationGraph;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export const STAAR_DILATIONS_QUESTIONS: StaarDilationsQuestion[] = [
  // =========================================================================
  // SUBTOPIC 1: IDENTIFYING SCALE FACTOR (k = image / pre-image) (6 Questions)
  // TEKS 8.3C (Readiness)
  // =========================================================================
  {
    id: 'staar-dil-01',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Scale Factor from Ordered Pairs',
    question:
      'Triangle ABC was dilated with the origin as the center of dilation to create triangle A\'B\'C\'. Vertex A is located at (4, 6) and vertex A\' is located at (10, 15). What scale factor was applied to triangle ABC to create triangle A\'B\'C\'?',
    context: 'Pre-image vertex: A(4, 6)  |  Image vertex: A\'(10, 15)  |  Center: (0, 0)',
    options: ['k = 2.5', 'k = 0.4', 'k = 6', 'k = 1.5'],
    correctIndex: 0,
    explanation:
      'The scale factor k of a dilation centered at the origin is found by dividing any image coordinate by its corresponding pre-image coordinate: k = x\' / x = 10 / 4 = 2.5 (or k = y\' / y = 15 / 6 = 2.5). Because k = 2.5 > 1, this dilation is an enlargement.',
    hint: 'Divide the image coordinate by the pre-image coordinate: k = 10 / 4. Check if 15 / 6 gives the exact same ratio.',
  },
  {
    id: 'staar-dil-02',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Scale Factor from Corresponding Side Lengths',
    question:
      'Rectangle ABCD has a length of 24 units and a width of 16 units. It was dilated with the origin as the center of dilation to create rectangle A\'B\'C\'D\', which has a length of 18 units and a width of 12 units. What scale factor was used to create rectangle A\'B\'C\'D\'?',
    options: ['3/4', '4/3', '1/2', '2/3'],
    correctIndex: 0,
    explanation:
      'The scale factor k is the ratio of corresponding side lengths: k = (image side) / (pre-image side) = 18 / 24 = 3/4. We verify with width: 12 / 16 = 3/4. Because 0 < 3/4 < 1, the dilation is a reduction.',
    hint: 'Always put the new dimension (image) in the numerator and the original dimension (pre-image) in the denominator: 18 / 24.',
  },
  {
    id: 'staar-dil-03',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Identifying Reduction vs. Enlargement Scale Factor',
    question:
      'A trapezoid on a coordinate grid was dilated by a scale factor of k with the origin as the center of dilation. Which value of k represents a dilation that results in a reduction of the trapezoid?',
    options: ['k = 5/8', 'k = 8/5', 'k = 1.25', 'k = 7/4'],
    correctIndex: 0,
    explanation:
      'A dilation produces a reduction when the scale factor k satisfies 0 < k < 1. Here, 5/8 = 0.625, which is between 0 and 1. The values 8/5 = 1.6, 1.25, and 7/4 = 1.75 are all greater than 1 and represent enlargements.',
    hint: 'A reduction shrinks the shape, so the scale factor must be strictly between 0 and 1. Which fraction is less than 1?',
  },
  {
    id: 'staar-dil-04',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Scale Factor from Table of Vertices',
    question:
      'The table below shows the coordinates of the vertices of polygon PQRS and dilated polygon P\'Q\'R\'S\'. What is the scale factor of the dilation?',
    tableData: {
      headers: ['Vertex', 'Pre-image (x, y)', "Image (x', y')"],
      rows: [
        ['P', '(-6, 9)', '(-2, 3)'],
        ['Q', '(3, 12)', '(1, 4)'],
        ['R', '(9, -3)', '(3, -1)'],
        ['S', '(-3, -6)', '(-1, -2)'],
      ],
    },
    options: ['k = 1/3', 'k = 3', 'k = -1/3', 'k = 2/3'],
    correctIndex: 0,
    explanation:
      'Find the ratio of any image coordinate to its pre-image coordinate: for vertex P, k = x\' / x = -2 / -6 = 1/3, and k = y\' / y = 3 / 9 = 1/3. For vertex Q, 1 / 3 = 1/3. Therefore, the scale factor is 1/3 (a reduction).',
    hint: 'Divide the image coordinate by the original coordinate: -2 divided by -6, or 1 divided by 3.',
  },
  {
    id: 'staar-dil-05',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Fractional Scale Factor from Grid Coordinates',
    question:
      'A line segment with endpoints at (0, 0) and (8, 12) was dilated with the origin as the center of dilation. The new endpoint is located at (6, 9). What scale factor was used for this dilation?',
    options: ['3/4', '4/3', '2/3', '1/2'],
    correctIndex: 0,
    explanation:
      'Compute k = x\' / x = 6 / 8 = 3/4. Check y: y\' / y = 9 / 12 = 3/4. Both coordinates were multiplied by 3/4, confirming that the scale factor is 3/4.',
    hint: 'Set up the ratio k = (new coordinate) / (original coordinate) = 6/8 and simplify the fraction.',
  },
  {
    id: 'staar-dil-06',
    category: 'identify-scale-factor',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Scale Factor for Enlargement Greater than 1',
    question:
      'Circle M has a diameter of 7.5 cm. It is dilated to create Circle M\', which has a diameter of 22.5 cm. What scale factor was applied to Circle M to produce Circle M\'?',
    options: ['3', '1/3', '15', '2.5'],
    correctIndex: 0,
    explanation:
      'The scale factor is the ratio of corresponding linear dimensions: k = (diameter of image) / (diameter of pre-image) = 22.5 / 7.5 = 3. Because k = 3 > 1, the circle is enlarged by a factor of 3.',
    hint: 'Divide the new diameter by the original diameter: 22.5 / 7.5.',
  },

  // =========================================================================
  // SUBTOPIC 2: ALGEBRAIC REPRESENTATIONS & COORDINATE RULES (6 Questions)
  // TEKS 8.3C & 8.10D (Readiness)
  // =========================================================================
  {
    id: 'staar-dil-07',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Algebraic Representation of Dilation',
    question:
      'Triangle JKL was dilated with the origin as the center of dilation to create triangle J\'K\'L\'. Which algebraic rule correctly represents a dilation with a scale factor of 5/2?',
    options: [
      '(x, y) → (5/2 x, 5/2 y)',
      '(x, y) → (x + 5/2, y + 5/2)',
      '(x, y) → (2/5 x, 2/5 y)',
      '(x, y) → (5x, 2y)',
    ],
    correctIndex: 0,
    explanation:
      'Under a dilation centered at the origin by scale factor k, both the x- and y-coordinates are multiplied by k: (x, y) → (kx, ky). With k = 5/2, the correct rule is (x, y) → (5/2 x, 5/2 y). Adding 5/2 represents a translation (slide), not a dilation.',
    hint: 'Dilations multiply coordinates by the scale factor: (x, y) → (kx, ky). Never add for a dilation!',
  },
  {
    id: 'staar-dil-08',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Distinguishing Dilation from Translation Rules',
    question:
      'Four transformations are shown below. Which transformation represents a dilation that creates an image similar to the original figure?',
    options: [
      '(x, y) → (0.75x, 0.75y)',
      '(x, y) → (x - 4, y + 6)',
      '(x, y) → (0.75x, 1.25y)',
      '(x, y) → (x + 0.75, y + 0.75)',
    ],
    correctIndex: 0,
    explanation:
      'A dilation centered at the origin must multiply both x and y by the SAME non-zero constant k: (x, y) → (kx, ky). Here, (0.75x, 0.75y) multiplies both by k = 0.75. Multiplying by different factors (0.75x, 1.25y) distorts the shape, and adding constants produces translations.',
    hint: 'Look for multiplication by the exact same positive number for both x and y.',
  },
  {
    id: 'staar-dil-09',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Finding Image Coordinates from an Algebraic Rule',
    question:
      'A polygon on a coordinate plane is transformed according to the rule (x, y) → (1.4x, 1.4y). If one of the vertices of the pre-image is located at (-5, 10), what are the coordinates of this vertex on the image?',
    options: ['(-7, 14)', '(-3.6, 11.4)', '(-6.4, 8.6)', '(-7, 10)'],
    correctIndex: 0,
    explanation:
      'Apply the rule: x\' = 1.4 · (-5) = -7, and y\' = 1.4 · 10 = 14. The transformed vertex is located at (-7, 14).',
    hint: 'Multiply each coordinate of (-5, 10) by 1.4.',
  },
  {
    id: 'staar-dil-10',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.10D',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Coordinate Notation for Reductions',
    question:
      'A rectangle on a coordinate grid has vertices at (0, 0), (12, 0), (12, 8), and (0, 8). The rectangle is dilated by a scale factor of 1/4 with the origin as the center of dilation. Which coordinate pair represents a vertex of the dilated rectangle?',
    options: ['(3, 2)', '(4, 2)', '(3, 4)', '(12, 2)'],
    correctIndex: 0,
    explanation:
      'Multiply each vertex coordinate by k = 1/4: (0, 0) → (0, 0); (12, 0) → (3, 0); (12, 8) → (3, 2); (0, 8) → (0, 2). The pair (3, 2) is a vertex of the dilated rectangle.',
    hint: 'Multiply (12, 8) by 1/4: 12 · (1/4) = 3 and 8 · (1/4) = 2.',
  },
  {
    id: 'staar-dil-11',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Determining the Rule from Two Known Points',
    question:
      'Under a dilation centered at the origin, point W(-8, 12) maps to point W\'(-2, 3). Which algebraic representation describes this dilation?',
    options: [
      '(x, y) → (1/4 x, 1/4 y)',
      '(x, y) → (4x, 4y)',
      '(x, y) → (x + 6, y - 9)',
      '(x, y) → (-1/4 x, -1/4 y)',
    ],
    correctIndex: 0,
    explanation:
      'Calculate k: k = -2 / -8 = 1/4, and k = 3 / 12 = 1/4. Since both coordinates are multiplied by 1/4, the algebraic representation is (x, y) → (1/4 x, 1/4 y).',
    hint: 'Divide the image coordinate by the pre-image coordinate: -2 / -8 = 1/4.',
  },
  {
    id: 'staar-dil-12',
    category: 'algebraic-representation',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Decimal Scale Factor Transformation Rule',
    question:
      'A graphic designer enlarges a digital logo using the rule (x, y) → (3.2x, 3.2y). Which statement correctly describes the transformation?',
    options: [
      'The logo is dilated by a scale factor of 3.2 with the origin as the center of dilation, resulting in an enlargement.',
      'The logo is translated 3.2 units right and 3.2 units up.',
      'The logo is dilated by a scale factor of 3.2, resulting in a reduction.',
      'The logo is rotated 320 degrees clockwise about the origin.',
    ],
    correctIndex: 0,
    explanation:
      'The rule (x, y) → (3.2x, 3.2y) represents a dilation centered at the origin with scale factor k = 3.2. Because 3.2 > 1, the transformation results in an enlargement.',
    hint: 'Multiplying both coordinates by 3.2 is a dilation. Since 3.2 > 1, it makes the figure bigger (enlargement).',
  },

  // =========================================================================
  // SUBTOPIC 3: COORDINATE GRAPH INTERPRETATION & DILATIONS (6 Questions)
  // TEKS 8.3C & 8.3B (Readiness)
  // =========================================================================
  {
    id: 'staar-dil-13',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Dilation Graph with Scale Factor 2',
    question:
      'The coordinate grid below displays triangle ABC with vertices A(1, 1), B(4, 1), and C(1, 3), along with dilated triangle A\'B\'C\' with vertices A\'(2, 2), B\'(8, 2), and C\'(2, 6). What is the scale factor of this dilation?',
    graphData: {
      title: 'Dilation of Triangle ABC (k = 2)',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 9,
      yMin: -1,
      yMax: 7,
      xStep: 1,
      yStep: 1,
      scaleFactor: 2,
      preImagePoints: [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 4, y: 1 },
        { name: 'C', x: 1, y: 3 },
      ],
      imagePoints: [
        { name: "A'", x: 2, y: 2 },
        { name: "B'", x: 8, y: 2 },
        { name: "C'", x: 2, y: 6 },
      ],
      preImageColor: '#38bdf8',
      imageColor: '#a855f7',
      preImageLabel: 'Pre-image: △ABC',
      imageLabel: "Image: △A'B'C'",
      showRays: true,
    },
    options: ['k = 2', 'k = 1/2', 'k = 4', 'k = 3'],
    correctIndex: 0,
    explanation:
      'Compare corresponding coordinates: A(1, 1) → A\'(2, 2). The scale factor k = 2 / 1 = 2. Verify with B: B(4, 1) → B\'(8, 2) where 8 / 4 = 2 and 2 / 1 = 2. The scale factor is 2.',
    hint: 'Compare vertex A(1, 1) with A\'(2, 2): divide 2 by 1.',
  },
  {
    id: 'staar-dil-14',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Dilation Graph with Scale Factor 1/2',
    question:
      'The coordinate plane shows rectangle PQRS and dilated rectangle P\'Q\'R\'S\'. The pre-image vertex P is located at (6, 4) and image vertex P\' is located at (3, 2). What scale factor was used to create rectangle P\'Q\'R\'S\'?',
    graphData: {
      title: 'Reduction of Rectangle PQRS (k = 0.5)',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -1,
      xMax: 8,
      yMin: -1,
      yMax: 6,
      xStep: 1,
      yStep: 1,
      scaleFactor: 0.5,
      preImagePoints: [
        { name: 'P', x: 6, y: 4 },
        { name: 'Q', x: 6, y: 1 },
        { name: 'R', x: 2, y: 1 },
        { name: 'S', x: 2, y: 4 },
      ],
      imagePoints: [
        { name: "P'", x: 3, y: 2 },
        { name: "Q'", x: 3, y: 0.5 },
        { name: "R'", x: 1, y: 0.5 },
        { name: "S'", x: 1, y: 2 },
      ],
      preImageColor: '#38bdf8',
      imageColor: '#a855f7',
      preImageLabel: 'Pre-image: PQRS',
      imageLabel: "Image: P'Q'R'S'",
      showRays: true,
    },
    options: ['1/2', '2', '1/3', '3/4'],
    correctIndex: 0,
    explanation:
      'Divide the coordinates of P\'(3, 2) by the corresponding coordinates of P(6, 4): k = 3 / 6 = 1/2, and 2 / 4 = 1/2. Because 0 < 1/2 < 1, this is a reduction by a scale factor of 1/2.',
    hint: 'Divide the image coordinate by the pre-image coordinate: 3 / 6 = 1/2.',
  },
  {
    id: 'staar-dil-15',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Ray Projection and Center of Dilation',
    question:
      'Lines drawn connecting corresponding vertices of a pre-image and image (such as line AA\', line BB\', and line CC\') all intersect at the same coordinate point. What does this point of intersection represent?',
    options: [
      'The center of dilation',
      'The scale factor of the dilation',
      'The midpoint of side AB',
      'The centroid of the image',
    ],
    correctIndex: 0,
    explanation:
      'In any dilation, rays projected through corresponding vertices (A to A\', B to B\', C to C\') all converge at a single common point: the center of dilation. For 8th grade TEKS standards, the center of dilation is standardly the origin (0, 0).',
    hint: 'The point where all dilation rays meet is the anchor point of the transformation, called the center of dilation.',
  },
  {
    id: 'staar-dil-16',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Identifying Image Coordinates on a Grid',
    question:
      'Triangle DEF has vertices D(2, 4), E(6, 4), and F(2, 1). Triangle DEF is dilated with the origin as the center of dilation by a scale factor of 1.5. What is the location of vertex E\'?',
    options: ['(9, 6)', '(7.5, 5.5)', '(4, 2.67)', '(8, 6)'],
    correctIndex: 0,
    explanation:
      'Multiply the coordinates of E(6, 4) by the scale factor 1.5: x\' = 6 · 1.5 = 9, and y\' = 4 · 1.5 = 6. Vertex E\' is located at (9, 6).',
    hint: 'Calculate 6 × 1.5 and 4 × 1.5.',
  },
  {
    id: 'staar-dil-17',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3B',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Proportional Relationships in Similar Triangles on a Grid',
    question:
      'On a coordinate grid, right triangle ABC has legs of length 3 units and 4 units. Triangle A\'B\'C\' is a dilation of triangle ABC with hypotenuse length 15 units. What is the length of the hypotenuse of triangle ABC, and what scale factor was used?',
    options: [
      'Hypotenuse = 5 units; scale factor k = 3',
      'Hypotenuse = 7 units; scale factor k = 2.14',
      'Hypotenuse = 5 units; scale factor k = 1/3',
      'Hypotenuse = 25 units; scale factor k = 3',
    ],
    correctIndex: 0,
    explanation:
      'By the Pythagorean theorem, the hypotenuse of triangle ABC is √(3² + 4²) = √(9 + 16) = √25 = 5 units. The scale factor is (image hypotenuse) / (pre-image hypotenuse) = 15 / 5 = 3.',
    hint: 'Find the hypotenuse of a 3-4-5 right triangle, then divide 15 by 5 to find k.',
  },
  {
    id: 'staar-dil-18',
    category: 'graph-coordinate',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Reading Distance from Origin Under Dilation',
    question:
      'A point M is located at (0, 8) on the y-axis, 8 units from the origin. After a dilation centered at the origin, point M\' is located at (0, 2). How did the distance from the origin change?',
    options: [
      'The distance was multiplied by 1/4, because the scale factor is 1/4.',
      'The distance decreased by 6 units, so the scale factor is 6.',
      'The distance was multiplied by 4, because the scale factor is 4.',
      'The distance was divided by 2, because the scale factor is 1/2.',
    ],
    correctIndex: 0,
    explanation:
      'In a dilation centered at the origin, the distance of every point from the origin is multiplied by the scale factor k: new distance = k · (original distance). Here, 2 = k · 8 → k = 2 / 8 = 1/4. The distance was multiplied by 1/4.',
    hint: 'Divide the image distance (2) by the original distance (8): 2 / 8 = 1/4.',
  },

  // =========================================================================
  // SUBTOPIC 4: PROPERTIES OF SIMILAR FIGURES & PRESERVATION (6 Questions)
  // TEKS 8.3A & 8.10A (Readiness / Supporting)
  // =========================================================================
  {
    id: 'staar-dil-19',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.3A',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Angle Preservation in Dilations',
    question:
      'Triangle GHI has angle measures of 42°, 68°, and 70°. Triangle GHI is dilated by a scale factor of 3 to produce triangle G\'H\'I\'. What are the angle measures of triangle G\'H\'I\'?',
    options: [
      '42°, 68°, and 70°',
      '126°, 204°, and 210°',
      '14°, 22.67°, and 23.33°',
      '84°, 136°, and 140°',
    ],
    correctIndex: 0,
    explanation:
      'Dilations preserve angle measures! Even though side lengths change by the scale factor k, the corresponding angles of similar figures are always CONGRUENT (identical). Therefore, the angle measures remain 42°, 68°, and 70°.',
    hint: 'Do angles change size when a figure is enlarged? Remember: similar shapes have congruent corresponding angles!',
  },
  {
    id: 'staar-dil-20',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.3A',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'True Properties of Similar Figures',
    question:
      'Which statement is ALWAYS true about two figures that are similar as a result of a dilation?',
    options: [
      'Corresponding angles are congruent, and corresponding side lengths are proportional.',
      'Corresponding angles are proportional, and corresponding side lengths are congruent.',
      'Both corresponding angles and corresponding side lengths are congruent.',
      'Corresponding angles sum to 180°, and side lengths are equal.',
    ],
    correctIndex: 0,
    explanation:
      'By mathematical definition, similar figures satisfy two core conditions: (1) Corresponding angles are congruent (equal measures), and (2) Corresponding side lengths are proportional (form equal ratios equal to scale factor k).',
    hint: 'Angles stay equal (congruent); sides change proportionally by scale factor k.',
  },
  {
    id: 'staar-dil-21',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.10A',
    standardType: 'Supporting',
    reportingCategory: 3,
    subtopic: 'Congruence vs. Similarity Transformations',
    question:
      'A student wants to classify transformations into those that preserve congruence and those that produce similarity without congruence. Which transformation produces an image that is similar but NOT congruent to the pre-image?',
    options: [
      'A dilation with scale factor k = 2.5',
      'A reflection across the line y = x',
      'A rotation of 180° about the origin',
      'A translation 5 units left and 3 units down',
    ],
    correctIndex: 0,
    explanation:
      'Translations, reflections, and rotations are rigid transformations (isometries) that preserve both shape AND size, producing congruent figures (k = 1). A dilation with scale factor k ≠ 1 changes the size while preserving the shape, producing similar figures that are not congruent.',
    hint: 'Which transformation changes the size of the figure?',
  },
  {
    id: 'staar-dil-22',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.3A',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Writing Proportions for Similar Triangles',
    question:
      'Triangle ABC is similar to triangle DEF. Which proportion must be true?',
    options: [
      'AB / DE = BC / EF = AC / DF',
      'AB / BC = DE / DF',
      'AB + BC = DE + EF',
      'AB · DE = BC · EF',
    ],
    correctIndex: 0,
    explanation:
      'For similar triangles △ABC ~ △DEF, the ratios of all pairs of corresponding sides are equal to the scale factor k: AB / DE = BC / EF = AC / DF.',
    hint: 'Match corresponding side letters in order: AB matches DE, BC matches EF, and AC matches DF.',
  },
  {
    id: 'staar-dil-23',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.3A',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Finding a Missing Side Using Similarity Ratios',
    question:
      'Triangle RST is dilated to produce similar triangle R\'S\'T\'. Side RS = 8 cm, side ST = 12 cm, and corresponding side R\'S\' = 20 cm. What is the length of side S\'T\'?',
    options: ['30 cm', '24 cm', '16 cm', '36 cm'],
    correctIndex: 0,
    explanation:
      'Find the scale factor: k = R\'S\' / RS = 20 / 8 = 2.5. Multiply the corresponding side ST by k: S\'T\' = 12 · 2.5 = 30 cm. Alternatively, solve the proportion 8 / 20 = 12 / x → 8x = 240 → x = 30 cm.',
    hint: 'Set up the proportion 8 / 20 = 12 / x and cross-multiply.',
  },
  {
    id: 'staar-dil-24',
    category: 'properties-similarity',
    teksCode: 'TEKS 8.10A',
    standardType: 'Supporting',
    reportingCategory: 3,
    subtopic: 'Orientation and Parallelism Under Dilations',
    question:
      'When a polygon is dilated with the origin as the center of dilation by a positive scale factor k, which statement correctly describes the orientation and line segments of the image?',
    options: [
      'The orientation is preserved, and corresponding line segments are parallel to each other.',
      'The orientation is reversed, and corresponding line segments are perpendicular.',
      'The orientation is preserved, but corresponding line segments never remain parallel.',
      'The orientation rotates 90 degrees clockwise.',
    ],
    correctIndex: 0,
    explanation:
      'In a dilation centered at the origin by a positive scale factor, orientation (the clockwise/counterclockwise order of vertices) is PRESERVED, and each side of the image is parallel to its corresponding side of the pre-image.',
    hint: 'Dilations do not turn or flip shapes; they expand or shrink straight outward along rays from the origin.',
  },

  // =========================================================================
  // SUBTOPIC 5: PERIMETER & AREA RELATIONSHIPS UNDER DILATIONS (6 Questions)
  // TEKS 8.3C & 8.10D (Readiness)
  // =========================================================================
  {
    id: 'staar-dil-25',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Effect of Dilation on Perimeter',
    question:
      'A square has a perimeter of 36 inches. It is dilated by a scale factor of 1/3 with the origin as the center of dilation. What is the perimeter of the dilated square?',
    options: ['12 inches', '4 inches', '108 inches', '6 inches'],
    correctIndex: 0,
    explanation:
      'Perimeter is a one-dimensional linear measure. When a figure is dilated by scale factor k, its perimeter is multiplied directly by k: New Perimeter = k · (Original Perimeter) = (1/3) · 36 = 12 inches.',
    hint: 'Perimeter scales linearly: multiply the original perimeter by the scale factor k (36 × 1/3).',
  },
  {
    id: 'staar-dil-26',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Effect of Dilation on Area (k² rule)',
    question:
      'A rectangle has an area of 20 square centimeters. The rectangle is dilated by a scale factor of 4. What is the area of the dilated rectangle?',
    options: ['320 cm²', '80 cm²', '160 cm²', '400 cm²'],
    correctIndex: 0,
    explanation:
      'Area is a two-dimensional measure. When a figure is dilated by scale factor k, both its length and width are multiplied by k, so its area is multiplied by k²: New Area = k² · (Original Area) = 4² · 20 = 16 · 20 = 320 cm².',
    hint: 'Area scales by k squared (k²)! Calculate 4² = 16, then multiply 16 by 20.',
  },
  {
    id: 'staar-dil-27',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Comparing Perimeter vs. Area Ratios',
    question:
      'Triangle ABC is dilated by a scale factor of k = 2.5 to create triangle A\'B\'C\'. Which statement correctly describes how the perimeter and area of triangle A\'B\'C\' compare to triangle ABC?',
    options: [
      'The perimeter is 2.5 times the original perimeter, and the area is 6.25 times the original area.',
      'Both the perimeter and area are 2.5 times the original measurements.',
      'The perimeter is 5 times the original, and the area is 2.5 times the original.',
      'The perimeter is 2.5 times the original, and the area is 5 times the original.',
    ],
    correctIndex: 0,
    explanation:
      'Perimeter is multiplied by k = 2.5. Area is multiplied by k² = (2.5)² = 6.25. Therefore, perimeter is 2.5 times the original, and area is 6.25 times the original.',
    hint: 'Remember: Linear dimensions and perimeter scale by k; area scales by k² = 2.5² = 6.25.',
  },
  {
    id: 'staar-dil-28',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Area Reduction Under Fractional Scale Factor',
    question:
      'A geometric figure with an area of 72 square units is dilated by a scale factor of k = 1/2. What is the area of the dilated figure?',
    options: ['18 square units', '36 square units', '9 square units', '24 square units'],
    correctIndex: 0,
    explanation:
      'Multiply the original area by k²: New Area = (1/2)² · 72 = (1/4) · 72 = 18 square units.',
    hint: 'Square the scale factor first: (1/2)² = 1/4. Then calculate 72 ÷ 4.',
  },
  {
    id: 'staar-dil-29',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Finding Scale Factor from Area Ratio',
    question:
      'A photograph with an area of 24 square inches is enlarged to a poster with an area of 216 square inches. What scale factor was applied to the dimensions of the photograph?',
    options: ['k = 3', 'k = 9', 'k = 4.5', 'k = 6'],
    correctIndex: 0,
    explanation:
      'The ratio of areas is k² = (Area of Image) / (Area of Pre-image) = 216 / 24 = 9. To find the linear scale factor k, take the square root: k = √9 = 3.',
    hint: 'The ratio of areas equals k². Divide 216 by 24 = 9, then take the square root of 9.',
  },
  {
    id: 'staar-dil-30',
    category: 'perimeter-area',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Perimeter and Area of Dilated Polygon on Grid',
    question:
      'A rectangle on a coordinate grid has vertices at (1, 1), (5, 1), (5, 4), and (1, 4). The rectangle has a perimeter of 14 units and an area of 12 square units. If the rectangle is dilated by a scale factor of 3, what are the perimeter and area of the image?',
    options: [
      'Perimeter = 42 units; Area = 108 square units',
      'Perimeter = 42 units; Area = 36 square units',
      'Perimeter = 28 units; Area = 108 square units',
      'Perimeter = 126 units; Area = 324 square units',
    ],
    correctIndex: 0,
    explanation:
      'Multiply the perimeter by k = 3: New Perimeter = 14 · 3 = 42 units. Multiply the area by k² = 3² = 9: New Area = 12 · 9 = 108 square units.',
    hint: 'Perimeter: 14 × 3 = 42. Area: 12 × 3² = 12 × 9 = 108.',
  },

  // =========================================================================
  // SUBTOPIC 6: REAL-WORLD DILATION APPLICATIONS & WORD PROBLEMS (6 Questions)
  // TEKS 8.3B & 8.3C (Readiness)
  // =========================================================================
  {
    id: 'staar-dil-31',
    category: 'real-world',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Blueprint Architecture Scale Factor',
    question:
      'An architect draws a blueprint of a rectangular classroom where 1 inch represents 8 feet. If the classroom on the blueprint measures 4.5 inches by 3.5 inches, what is the actual perimeter of the classroom in feet?',
    options: ['128 feet', '64 feet', '16 feet', '126 feet'],
    correctIndex: 0,
    explanation:
      'Find the blueprint perimeter: P = 2(4.5 + 3.5) = 2(8) = 16 inches. The scale factor from blueprint to actual room is 8 feet per inch: Actual Perimeter = 16 inches · 8 feet/inch = 128 feet.',
    hint: 'Calculate the perimeter of the blueprint first: 4.5 + 3.5 + 4.5 + 3.5 = 16 inches. Then multiply by 8.',
  },
  {
    id: 'staar-dil-32',
    category: 'real-world',
    teksCode: 'TEKS 8.3B',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Shadow Indirect Measurement Using Similar Triangles',
    question:
      'A 6-foot tall person standing near a flagpole casts a shadow that is 4.5 feet long. At the same time, the flagpole casts a shadow that is 27 feet long. What is the height of the flagpole?',
    options: ['36 feet', '30 feet', '40.5 feet', '28.5 feet'],
    correctIndex: 0,
    explanation:
      'The sun rays form similar right triangles. Set up the proportion: (height of pole) / (shadow of pole) = (height of person) / (shadow of person) → h / 27 = 6 / 4.5. Cross-multiply: 4.5h = 162 → h = 162 / 4.5 = 36 feet. (Scale factor k = 27 / 4.5 = 6; h = 6 · 6 = 36 feet).',
    hint: 'Divide the shadow lengths to find the scale factor: 27 ÷ 4.5 = 6. Multiply person height by 6.',
  },
  {
    id: 'staar-dil-33',
    category: 'real-world',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Smartphone Screen Zoom Dilation',
    question:
      'A student pinches and zooms in on a photo on their smartphone screen. The original photo was 4 inches wide and 6 inches tall. After zooming in by a scale factor of 2.25, what is the new height of the photo?',
    options: ['13.5 inches', '9 inches', '12.25 inches', '15 inches'],
    correctIndex: 0,
    explanation:
      'Under a zoom dilation by scale factor k = 2.25, the new height is: New Height = Original Height · k = 6 · 2.25 = 13.5 inches.',
    hint: 'Multiply the original height (6 inches) by the scale factor 2.25.',
  },
  {
    id: 'staar-dil-34',
    category: 'real-world',
    teksCode: 'TEKS 8.3B',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Map Scale Ratio Calculation',
    question:
      'On a state map, the distance between Austin and San Antonio is 4 centimeters. The actual driving distance is approximately 120 kilometers. Which scale represents the map?',
    options: [
      '1 cm represents 30 km',
      '1 cm represents 40 km',
      '1 cm represents 24 km',
      '1 cm represents 60 km',
    ],
    correctIndex: 0,
    explanation:
      'Divide the actual distance by the map distance to find the unit scale: 120 km / 4 cm = 30 km per centimeter. Thus, 1 cm represents 30 km.',
    hint: 'Divide 120 km by 4 cm to find how many kilometers 1 cm equals.',
  },
  {
    id: 'staar-dil-35',
    category: 'real-world',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Microscope Cell Magnification Scale Factor',
    question:
      'A science student views an amoeba under a microscope. The actual diameter of the amoeba is 0.05 millimeters. On the microscope monitor, the image of the amoeba has a diameter of 25 millimeters. What magnification scale factor was used?',
    options: ['500', '50', '250', '1,250'],
    correctIndex: 0,
    explanation:
      'Magnification scale factor k = (image size) / (actual size) = 25 mm / 0.05 mm = 500. The microscope enlarged the cell by a scale factor of 500.',
    hint: 'Divide the image size (25) by the actual size (0.05): 25 ÷ 0.05 = 500.',
  },
  {
    id: 'staar-dil-36',
    category: 'real-world',
    teksCode: 'TEKS 8.3C',
    standardType: 'Readiness',
    reportingCategory: 3,
    subtopic: 'Cost Calculation Based on Dilated Area',
    question:
      'A rectangular banner measuring 3 feet by 5 feet costs $30 to print ($2 per square foot). If a company orders a larger banner with dimensions dilated by a scale factor of 2, what will be the printing cost of the larger banner?',
    options: ['$120', '$60', '$90', '$150'],
    correctIndex: 0,
    explanation:
      'Original banner area is 3 · 5 = 15 ft², costing $30. When dimensions are dilated by scale factor k = 2, the area multiplies by k² = 2² = 4. The new area is 15 · 4 = 60 ft². At $2 per square foot, the cost is 60 · $2 = $120. (Or directly: Cost scales with area by k²: $30 · 4 = $120).',
    hint: 'Area increases by k² = 2² = 4 times. Multiply the original $30 cost by 4.',
  },
];
