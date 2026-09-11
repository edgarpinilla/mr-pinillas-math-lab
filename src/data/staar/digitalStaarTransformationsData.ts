// src/data/staar/digitalStaarTransformationsData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 1: Geometric Transformations (Translations, Reflections, Rotations & Congruence/Similarity)
// 100% Client-side local data. Zero runtime API calls.

export type Unit1InteractionType =
  | 'drag-drop-rule'
  | 'hot-spot'
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
  type: Unit1InteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Drag & Drop Rule
export interface Q1DragDropRule extends BaseQuestion {
  type: 'drag-drop-rule';
  scenario: string;
  templatePrefix: string;
  templateMiddle: string;
  templateSuffix: string;
  draggableOptions: string[];
  correctDrop1: string;
  correctDrop2: string;
}

// Q2: Hot Spot Figure Selection
export interface HotSpotOption {
  id: string;
  label: string;
  vertices: [number, number][];
  isCorrect: boolean;
  quadrant: string;
  description: string;
  misconceptionReason: string;
}

export interface Q2HotSpot extends BaseQuestion {
  type: 'hot-spot';
  preImageVertices: [number, number][];
  preImageLabel: string;
  reflectionLine: string;
  figures: HotSpotOption[];
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
}

// Q3: Inline Choice Rotation
export interface Q3InlineChoice extends BaseQuestion {
  type: 'inline-choice';
  scenario: string;
  statement1Prefix: string;
  dropdown1Options: string[];
  correct1: string;
  statement2Prefix: string;
  dropdown2Options: string[];
  correct2: string;
}

// Q4: Match / Table Grid
export interface TableGridRow {
  id: string;
  rule: string;
  transformationType: string;
  correctCategory: 'congruent' | 'similar-only';
}

export interface Q4TableGrid extends BaseQuestion {
  type: 'table-grid';
  instruction: string;
  categories: { id: 'congruent' | 'similar-only'; label: string }[];
  rows: TableGridRow[];
}

// Q5: Numeric Entry
export interface Q5NumericEntry extends BaseQuestion {
  type: 'numeric-entry';
  context: string;
  ruleText: string;
  imageCoord: string;
  xInputLabel: string;
  yInputLabel: string;
  acceptedAnswersX: string[];
  acceptedAnswersY: string[];
}

// Q6: Traditional Selected Response with Graph
export interface Q6SelectedResponse extends BaseQuestion {
  type: 'selected-response';
  preImageVertices: { label: string; x: number; y: number }[];
  imageVertices: { label: string; x: number; y: number }[];
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
  options: { id: string; label: string; text: string; isCorrect: boolean; misconception: string }[];
}

// Q7: Multi-Part Composition
export interface Q7MultiPart extends BaseQuestion {
  type: 'multi-part';
  scenario: string;
  vertices: { label: string; coord: string }[];
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
export interface Q8MultipleSelect extends BaseQuestion {
  type: 'multiple-select';
  scenario: string;
  instruction: string;
  options: { id: string; text: string; isCorrect: boolean; misconception?: string }[];
}

// Q9: Graphing Plotting
export interface Q9Graphing extends BaseQuestion {
  type: 'graphing';
  preImageEndpoints: { label: string; x: number; y: number }[];
  targetEndpoints: { label: string; x: number; y: number }[];
  reflectionAxis: 'x-axis' | 'y-axis';
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
}

// Q10: Drag & Drop Classification
export interface ClassificationRuleCard {
  id: string;
  rule: string;
  scaleFactorDescription: string;
  correctCategory: 'enlargement' | 'reduction';
}

export interface Q10Classification extends BaseQuestion {
  type: 'classification';
  instruction: string;
  categories: { id: 'enlargement' | 'reduction'; title: string; subtitle: string }[];
  cards: ClassificationRuleCard[];
}

// Q11: Multiple Select Properties
export interface Q11MultipleSelect extends BaseQuestion {
  type: 'multiple-select';
  scenario: string;
  instruction: string;
  options: { id: string; text: string; isCorrect: boolean; misconception?: string }[];
}

// Q12: Advanced Inline Choice Composition
export interface Q12InlineChoiceComposition extends BaseQuestion {
  type: 'inline-choice';
  scenario: string;
  statement1Prefix: string;
  dropdown1Options: string[];
  correct1: string;
  statement2Prefix: string;
  dropdown2Options: string[];
  correct2: string;
  dropdown3Label: string;
  dropdown3Options: string[];
  correct3: string;
}

export type Unit1DigitalStaarQuestion =
  | Q1DragDropRule
  | Q2HotSpot
  | Q3InlineChoice
  | Q4TableGrid
  | Q5NumericEntry
  | Q6SelectedResponse
  | Q7MultiPart
  | Q8MultipleSelect
  | Q9Graphing
  | Q10Classification
  | Q11MultipleSelect
  | Q12InlineChoiceComposition;

export const UNIT_1_DIGITAL_STAAR_QUESTIONS: Unit1DigitalStaarQuestion[] = [
  // QUESTION 1 — Drag & Drop: Translation Algebraic Rule
  {
    id: 'u1-dstaar-1',
    number: 1,
    type: 'drag-drop-rule',
    typeLabel: 'Drag & Drop',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Translations on the Coordinate Plane',
    prompt:
      'Triangle LMN is graphed on a coordinate plane. The triangle is translated 7 units to the left and 4 units down to create triangle L\'M\'N\'. Complete the algebraic representation that describes this translation by placing the correct terms in the boxes.',
    scenario:
      'Translating a figure horizontally changes the x-coordinate, and translating vertically changes the y-coordinate.',
    templatePrefix: '(x, y) → (',
    templateMiddle: ', ',
    templateSuffix: ')',
    draggableOptions: ['x - 7', 'x + 7', 'y - 4', 'y + 4', 'x - 4', 'y - 7', '7x', '4y'],
    correctDrop1: 'x - 7',
    correctDrop2: 'y - 4',
    solutionExplanation:
      'Moving 7 units to the left subtracts 7 from the x-coordinate: x - 7. Moving 4 units down subtracts 4 from the y-coordinate: y - 4. Therefore, the complete algebraic representation is (x, y) → (x - 7, y - 4).',
    keyTakeaway:
      'Translations are additive/subtractive rules: Left = (x - a), Right = (x + a), Down = (y - b), Up = (y + b). Never use multiplication for translations.',
  },

  // QUESTION 2 — Hot Spot: Reflection Image Selection
  {
    id: 'u1-dstaar-2',
    number: 2,
    type: 'hot-spot',
    typeLabel: 'Hot Spot',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Reflections Across the Coordinate Axes',
    prompt:
      'Triangle PQR is graphed on the coordinate grid with vertices in Quadrant II. Triangle PQR is reflected across the x-axis to create triangle P\'Q\'R\'. Select the hot spot corresponding to the correct reflected image.',
    preImageVertices: [
      [-6, 2],
      [-2, 2],
      [-4, 6],
    ],
    preImageLabel: 'Triangle PQR (Pre-Image)',
    reflectionLine: 'x-axis (y = 0)',
    gridRange: { minX: -8, maxX: 8, minY: -8, maxY: 8 },
    figures: [
      {
        id: 'fig-A',
        label: 'Figure A',
        vertices: [
          [-6, -2],
          [-2, -2],
          [-4, -6],
        ],
        isCorrect: true,
        quadrant: 'Quadrant III',
        description: 'Reflected across the horizontal x-axis: (x, y) → (x, -y)',
        misconceptionReason: 'Correct! Vertices flip across y = 0 into Quadrant III with inverted vertical orientation.',
      },
      {
        id: 'fig-B',
        label: 'Figure B',
        vertices: [
          [6, 2],
          [2, 2],
          [4, 6],
        ],
        isCorrect: false,
        quadrant: 'Quadrant I',
        description: 'Reflected across the y-axis: (x, y) → (-x, y)',
        misconceptionReason: 'This figure was reflected across the vertical y-axis into Quadrant I instead of the horizontal x-axis.',
      },
      {
        id: 'fig-C',
        label: 'Figure C',
        vertices: [
          [6, -2],
          [2, -2],
          [4, -6],
        ],
        isCorrect: false,
        quadrant: 'Quadrant IV',
        description: 'Rotated 180° about the origin: (x, y) → (-x, -y)',
        misconceptionReason: 'This figure represents a 180° rotation about the origin (or double reflection across both axes) into Quadrant IV.',
      },
      {
        id: 'fig-D',
        label: 'Figure D',
        vertices: [
          [-2, -6],
          [2, -6],
          [0, -2],
        ],
        isCorrect: false,
        quadrant: 'Lower Grid (Quadrants III & IV)',
        description: 'Translated downward without flipping: (x, y) → (x + 4, y - 8)',
        misconceptionReason:
          'This figure is an upright vertical slide (translation) without flipping orientation, which is not a reflection.',
      },
    ],
    solutionExplanation:
      'Reflecting a figure across the x-axis keeps the x-coordinates unchanged and negates the y-coordinates: (x, y) → (x, -y). The pre-image vertices P(-6, 2), Q(-2, 2), and R(-4, 6) map to P\'(-6, -2), Q\'(-2, -2), and R\'(-4, -6). Figure A in Quadrant III represents this exact reflection.',
    keyTakeaway:
      'Reflecting across the x-axis negates y: (x, -y). Reflecting across the y-axis negates x: (-x, y). The coordinate axis of reflection stays the same!',
  },

  // QUESTION 3 — Inline Choice: Rotation Rule & Coordinates
  {
    id: 'u1-dstaar-3',
    number: 3,
    type: 'inline-choice',
    typeLabel: 'Inline Choice',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Rotations About the Origin (90° Counterclockwise)',
    prompt:
      'Rectangle ABCD with vertex A(-3, 5) is rotated 90° counterclockwise about the origin to form rectangle A\'B\'C\'D\'. Choose the correct answer from each drop-down menu to complete the statements.',
    scenario:
      'A counterclockwise rotation turns figures in the opposite direction of clock hands.',
    statement1Prefix:
      'The algebraic representation that models a 90° counterclockwise rotation about the origin is (x, y) → ',
    dropdown1Options: ['(-y, x)', '(y, -x)', '(-x, -y)', '(x, -y)'],
    correct1: '(-y, x)',
    statement2Prefix: 'The coordinates of vertex A\' are ',
    dropdown2Options: ['(-5, -3)', '(5, 3)', '(3, -5)', '(-5, 3)'],
    correct2: '(-5, -3)',
    solutionExplanation:
      'A 90° counterclockwise rotation about the origin follows the coordinate rule (x, y) → (-y, x). Applying this rule to vertex A(-3, 5): the new x-coordinate is -y = -(5) = -5, and the new y-coordinate is the original x = -3. Vertex A\' is located at (-5, -3).',
    keyTakeaway:
      '90° Counterclockwise (CCW) rule: (x, y) → (-y, x). 90° Clockwise (CW) rule: (x, y) → (y, -x). 180° rule: (x, y) → (-x, -y).',
  },

  // QUESTION 4 — Match / Table Grid: Congruent vs. Similar
  {
    id: 'u1-dstaar-4',
    number: 4,
    type: 'table-grid',
    typeLabel: 'Match / Table Grid',
    teks: 'TEKS 8.10.B (Supporting)',
    topic: 'Congruence Invariants vs. Dilations',
    prompt:
      'Four geometric transformation rules are applied to two-dimensional shapes on a coordinate plane. For each algebraic rule, select whether the resulting image is Congruent to the Pre-Image or Similar but NOT Congruent to the Pre-Image.',
    instruction:
      'Select one option in each row.',
    categories: [
      { id: 'congruent', label: 'Congruent to Pre-Image' },
      { id: 'similar-only', label: 'Similar but NOT Congruent' },
    ],
    rows: [
      {
        id: 'row-1',
        rule: '(x, y) → (x + 8.5, y - 12)',
        transformationType: 'Translation (Slide)',
        correctCategory: 'congruent',
      },
      {
        id: 'row-2',
        rule: '(x, y) → (0.75x, 0.75y)',
        transformationType: 'Dilation (Reduction by k = 0.75)',
        correctCategory: 'similar-only',
      },
      {
        id: 'row-3',
        rule: '(x, y) → (-y, x)',
        transformationType: 'Rotation (90° CCW)',
        correctCategory: 'congruent',
      },
      {
        id: 'row-4',
        rule: '(x, y) → (x, -y)',
        transformationType: 'Reflection (across x-axis)',
        correctCategory: 'congruent',
      },
    ],
    solutionExplanation:
      'Translations, reflections, and rotations are rigid motions (isometries) that preserve side lengths and angle measures, producing figures congruent to the pre-image. Dilations where k ≠ 1 multiply coordinates by a scale factor, altering side lengths while preserving angle measures, producing figures that are similar but NOT congruent.',
    keyTakeaway:
      'Rigid motions (Translations, Reflections, Rotations) ALWAYS preserve congruence. Dilations (with k ≠ 1) produce similar non-congruent figures.',
  },

  // QUESTION 5 — Equation / Numeric Entry: Working Backwards
  {
    id: 'u1-dstaar-5',
    number: 5,
    type: 'numeric-entry',
    typeLabel: 'Numeric Entry',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Working Backwards to Find Pre-Image Vertices',
    prompt:
      'Triangle RST was translated using the algebraic representation (x, y) → (x - 6.5, y + 4.25) to form triangle R\'S\'T\'. The coordinates of vertex R\' are (-2, 1.5). What are the coordinates of the original vertex R?',
    context:
      'Enter the numerical coordinates in the boxes below.',
    ruleText: '(x, y) → (x - 6.5, y + 4.25)',
    imageCoord: "R'(-2, 1.5)",
    xInputLabel: 'x-coordinate of R',
    yInputLabel: 'y-coordinate of R',
    acceptedAnswersX: ['4.5', '+4.5', '4.50', '9/2'],
    acceptedAnswersY: ['-2.75', '-2.750', '-11/4'],
    solutionExplanation:
      'To work backwards from the image R\'(-2, 1.5) to the original pre-image R(x, y), inverse operations must be applied:\n• x - 6.5 = -2  =>  x = -2 + 6.5 = 4.5\n• y + 4.25 = 1.5  =>  y = 1.5 - 4.25 = -2.75\nTherefore, the original vertex R is at (4.5, -2.75).',
    keyTakeaway:
      'When working backwards from image to pre-image, reverse the operations: if the rule subtracts, add to the image coordinate; if the rule adds, subtract from the image coordinate.',
  },

  // QUESTION 6 — Selected Response with Graph: Identify Rule from Coordinate Plane
  {
    id: 'u1-dstaar-6',
    number: 6,
    type: 'selected-response',
    typeLabel: 'Selected Response',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Identifying Transformations from a Coordinate Grid',
    prompt:
      'Triangle ABC and its transformed image triangle A\'B\'C\' are graphed on the coordinate grid below. Which algebraic representation best describes the transformation that was applied to triangle ABC to create triangle A\'B\'C\'?',
    preImageVertices: [
      { label: 'A', x: 2, y: 4 },
      { label: 'B', x: 5, y: 7 },
      { label: 'C', x: 5, y: 2 },
    ],
    imageVertices: [
      { label: "A'", x: -4, y: 2 },
      { label: "B'", x: -7, y: 5 },
      { label: "C'", x: -2, y: 5 },
    ],
    gridRange: { minX: -8, maxX: 8, minY: -8, maxY: 8 },
    options: [
      {
        id: 'opt-A',
        label: 'A',
        text: '(x, y) → (-y, x)',
        isCorrect: true,
        misconception: 'Correct! This is a 90° counterclockwise rotation about the origin.',
      },
      {
        id: 'opt-B',
        label: 'B',
        text: '(x, y) → (y, -x)',
        isCorrect: false,
        misconception: 'This is a 90° clockwise rotation rule, which would place A\' at (4, -2).',
      },
      {
        id: 'opt-C',
        label: 'C',
        text: '(x, y) → (-x, y)',
        isCorrect: false,
        misconception: 'This is a reflection across the y-axis, which would place A\' at (-2, 4).',
      },
      {
        id: 'opt-D',
        label: 'D',
        text: '(x, y) → (x - 6, y - 2)',
        isCorrect: false,
        misconception:
          'This translation works only for vertex A (2 - 6 = -4, 4 - 2 = 2), but fails for vertex B (5 - 6 = -1 ≠ -7) and vertex C.',
      },
    ],
    solutionExplanation:
      'Compare corresponding vertices:\n• A(2, 4) → A\'(-4, 2): x-value became -4 (which is -y), y-value became 2 (which is original x).\n• B(5, 7) → B\'(-7, 5): (5, 7) → (-7, 5)\n• C(5, 2) → C\'(-2, 5): (5, 2) → (-2, 5)\nAll vertices strictly obey the algebraic rule (x, y) → (-y, x), representing a 90° counterclockwise rotation about the origin.',
    keyTakeaway:
      'Always test an algebraic rule on at least TWO different vertices before selecting it. Translations often appear to work on one vertex by coincidence.',
  },

  // QUESTION 7 — Multi-Part: Composition of Transformations
  {
    id: 'u1-dstaar-7',
    number: 7,
    type: 'multi-part',
    typeLabel: 'Multi-Part',
    teks: 'TEKS 8.10.C & 8.10.B',
    topic: 'Transformation Sequences & Congruence',
    prompt:
      'Trapezoid W X Y Z has vertices W(-3, 2), X(-1, 2), Y(0, -1), and Z(-4, -1). Trapezoid W X Y Z is reflected across the y-axis to create intermediate trapezoid W′ X′ Y′ Z′. Then, trapezoid W′ X′ Y′ Z′ is translated 3 units down to create final trapezoid W″ X″ Y″ Z″. Answer Part A and Part B based on this scenario.',
    scenario:
      'Step 1: Reflection across the y-axis\nStep 2: Translation 3 units down',
    vertices: [
      { label: 'W', coord: '(-3, 2)' },
      { label: 'X', coord: '(-1, 2)' },
      { label: 'Y', coord: '(0, -1)' },
      { label: 'Z', coord: '(-4, -1)' },
    ],
    partA: {
      prompt: 'Part A: Which ordered pair represents the location of vertex W″ in final trapezoid W″ X″ Y″ Z″?',
      dropdownOptions: ['(3, -1)', '(-3, -1)', '(3, 5)', '(-6, 2)'],
      correct: '(3, -1)',
      explanation:
        'First apply reflection across the y-axis: (x, y) → (-x, y). For W(-3, 2), W′ = (-(-3), 2) = (3, 2). Then apply vertical translation 3 units down: (x, y - 3). W″ = (3, 2 - 3) = (3, -1).',
    },
    partB: {
      prompt:
        'Part B: Which statement regarding original trapezoid W X Y Z and final trapezoid W″ X″ Y″ Z″ is true?',
      options: [
        {
          id: 'b-opt-1',
          text: 'Trapezoid W″ X″ Y″ Z″ is congruent to trapezoid W X Y Z because reflections and translations are rigid transformations that preserve distance and angle measures.',
          isCorrect: true,
        },
        {
          id: 'b-opt-2',
          text: 'Trapezoid W″ X″ Y″ Z″ has interior angle measures that are smaller than trapezoid W X Y Z because of the downward translation.',
          isCorrect: false,
        },
        {
          id: 'b-opt-3',
          text: 'Trapezoid W″ X″ Y″ Z″ is similar to trapezoid W X Y Z, but not congruent, because two transformations were performed.',
          isCorrect: false,
        },
        {
          id: 'b-opt-4',
          text: 'The perimeter of trapezoid W″ X″ Y″ Z″ is 3 units less than the perimeter of trapezoid W X Y Z.',
          isCorrect: false,
        },
      ],
      explanation:
        'Both reflections and translations are rigid motions (isometries). A sequence of rigid motions always produces a final figure that is strictly congruent to the original figure, preserving all side lengths, perimeters, areas, and angle measures.',
    },
    solutionExplanation:
      'In Part A: W(-3, 2) reflects across the y-axis to W′(3, 2), then translates down 3 units to W″(3, -1).\nIn Part B: Because neither reflections nor translations alter side lengths or angle measures, the final figure remains strictly congruent to the original figure.',
    keyTakeaway:
      'Any sequence consisting entirely of translations, reflections, and rotations produces a figure strictly congruent to the original pre-image.',
  },

  // QUESTION 8 — Multiple Select: Equivalent Rotation Descriptions
  {
    id: 'u1-dstaar-8',
    number: 8,
    type: 'multiple-select',
    typeLabel: 'Multiple Select',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: '180° Rotations & Equivalent Transformations',
    prompt:
      'Quadrilateral JKLM is transformed on a coordinate plane to create quadrilateral J\'K\'L\'M\'. The algebraic rule (x, y) → (-x, -y) was applied to every vertex. Which statements must be true about this transformation? Select TWO correct answers.',
    scenario:
      'The rule (x, y) → (-x, -y) negates both coordinates of every point.',
    instruction: 'Select TWO correct answers.',
    options: [
      {
        id: 'opt-1',
        text: 'The transformation represents a rotation of 180° clockwise about the origin.',
        isCorrect: true,
        misconception: 'Correct! A 180° clockwise turn maps (x, y) to (-x, -y).',
      },
      {
        id: 'opt-3',
        text: 'Quadrilateral J\'K\'L\'M\' is located in the exact same quadrant as quadrilateral JKLM.',
        isCorrect: false,
        misconception: 'A 180° rotation moves points into diagonally opposite quadrants (e.g., Q1 to Q3).',
      },
      {
        id: 'opt-5',
        text: 'The orientation of the vertices of quadrilateral J\'K\'L\'M\' is reversed compared to quadrilateral JKLM.',
        isCorrect: false,
        misconception: 'Rotations preserve vertex orientation. Only reflections reverse orientation.',
      },
      {
        id: 'opt-2',
        text: 'The transformation represents a rotation of 180° counterclockwise about the origin.',
        isCorrect: true,
        misconception: 'Correct! A 180° counterclockwise turn also maps (x, y) to (-x, -y).',
      },
      {
        id: 'opt-4',
        text: 'The perimeter of quadrilateral J\'K\'L\'M\' is greater than the perimeter of quadrilateral JKLM because both coordinates were multiplied by -1.',
        isCorrect: false,
        misconception: 'Multiplying coordinates by -1 rotates the figure; it does NOT alter distance or perimeter.',
      },
    ],
    solutionExplanation:
      'A 180° rotation turns a figure half-way around the circle. Because 180° in either direction (clockwise or counterclockwise) lands in the exact same orientation, both 180° clockwise and 180° counterclockwise rotations are algebraically represented by (x, y) → (-x, -y).',
    keyTakeaway:
      '180° clockwise and 180° counterclockwise rotations produce identical results on the coordinate plane: (x, y) → (-x, -y).',
  },

  // QUESTION 9 — Graphing: Coordinate Plotting
  {
    id: 'u1-dstaar-9',
    number: 9,
    type: 'graphing',
    typeLabel: 'Graphing / Coordinate Plotting',
    teks: 'TEKS 8.10.C (Readiness)',
    topic: 'Plotting Reflected Image Endpoints on a Coordinate Plane',
    prompt:
      'Segment AB has endpoints A(-4, 3) and B(2, -1) graphed on the coordinate grid below. Segment AB is reflected across the x-axis to create segment A\'B\'. Plot the locations of points A\' and B\' on the coordinate plane.',
    preImageEndpoints: [
      { label: 'A', x: -4, y: 3 },
      { label: 'B', x: 2, y: -1 },
    ],
    targetEndpoints: [
      { label: "A'", x: -4, y: -3 },
      { label: "B'", x: 2, y: 1 },
    ],
    reflectionAxis: 'x-axis',
    gridRange: { minX: -6, maxX: 6, minY: -6, maxY: 6 },
    solutionExplanation:
      'Under a reflection across the x-axis, the algebraic representation is (x, y) → (x, -y):\n• Endpoint A(-4, 3) maps to A\'(-4, -(3)) = A\'(-4, -3)\n• Endpoint B(2, -1) maps to B\'(2, -(-1)) = B\'(2, 1)\nClicking on (-4, -3) and (2, 1) plots the correct reflected endpoints.',
    keyTakeaway:
      'To reflect across the horizontal x-axis, count the perpendicular distance to y = 0 and measure that same distance to the opposite side.',
  },

  // QUESTION 10 — Drag & Drop Classification: Scale Factor Categories
  {
    id: 'u1-dstaar-10',
    number: 10,
    type: 'classification',
    typeLabel: 'Drag & Drop Classification',
    teks: 'TEKS 8.3.C (Readiness)',
    topic: 'Classifying Dilation Rules (Enlargement vs. Reduction)',
    prompt:
      'Four coordinate dilation rules centered at the origin are shown below. Classify each algebraic representation by dragging it into the correct category: Creates an Enlargement (k > 1) or Creates a Reduction (0 < k < 1).',
    instruction:
      'Drag or click each card to place it in the correct category box.',
    categories: [
      {
        id: 'enlargement',
        title: 'Creates an Enlargement (k > 1)',
        subtitle: 'The image is larger than the pre-image',
      },
      {
        id: 'reduction',
        title: 'Creates a Reduction (0 < k < 1)',
        subtitle: 'The image is smaller than the pre-image',
      },
    ],
    cards: [
      {
        id: 'card-1',
        rule: '(x, y) → ( 5/4 x, 5/4 y )',
        scaleFactorDescription: 'k = 5/4 = 1.25',
        correctCategory: 'enlargement',
      },
      {
        id: 'card-2',
        rule: '(x, y) → ( 0.6x, 0.6y )',
        scaleFactorDescription: 'k = 0.6',
        correctCategory: 'reduction',
      },
      {
        id: 'card-3',
        rule: '(x, y) → ( 2/3 x, 2/3 y )',
        scaleFactorDescription: 'k = 2/3 ≈ 0.67',
        correctCategory: 'reduction',
      },
      {
        id: 'card-4',
        rule: '(x, y) → ( 2.25x, 2.25y )',
        scaleFactorDescription: 'k = 2.25',
        correctCategory: 'enlargement',
      },
    ],
    solutionExplanation:
      'A dilation scale factor k determines whether the transformation enlarges or reduces the figure:\n• 5/4 = 1.25 > 1, so (5/4 x, 5/4 y) creates an enlargement.\n• 2.25 > 1, so (2.25x, 2.25y) creates an enlargement.\n• 0.6 < 1, so (0.6x, 0.6y) creates a reduction.\n• 2/3 ≈ 0.67 < 1, so (2/3 x, 2/3 y) creates a reduction.',
    keyTakeaway:
      'Fractions with numerators larger than denominators (improper fractions like 5/4) are greater than 1 and produce enlargements! Never assume all fractions are reductions.',
  },

  // QUESTION 11 — Multiple Select: Invariant Properties of Rotations
  {
    id: 'u1-dstaar-11',
    number: 11,
    type: 'multiple-select',
    typeLabel: 'Multiple Select',
    teks: 'TEKS 8.10.B (Supporting) & 8.10.C',
    topic: 'Geometric Invariants Under Rigid Motions',
    prompt:
      'A triangle on a coordinate plane undergoes a transformation modeled by the algebraic representation (x, y) → (y, -x). Which statements correctly describe the relationship between the pre-image and the image? Select TWO correct answers.',
    scenario:
      'The rule (x, y) → (y, -x) represents a 90° clockwise rotation about the origin.',
    instruction: 'Select TWO correct answers.',
    options: [
      {
        id: 'opt-1',
        text: 'The interior angle measures of the image triangle are congruent to the interior angle measures of the pre-image triangle.',
        isCorrect: true,
        misconception: 'Correct! Rotations are rigid motions that preserve all interior angle measures.',
      },
      {
        id: 'opt-2',
        text: 'The perimeter of the image triangle is equal to the perimeter of the pre-image triangle.',
        isCorrect: true,
        misconception: 'Correct! Rotations preserve all side lengths and distance, so perimeter is unchanged.',
      },
      {
        id: 'opt-3',
        text: 'The orientation of the vertices of the image triangle is reversed compared to the pre-image triangle.',
        isCorrect: false,
        misconception: 'Rotations preserve orientation. Only reflections reverse vertex orientation.',
      },
      {
        id: 'opt-4',
        text: 'The area of the image triangle is halved because the x- and y-coordinates swapped positions.',
        isCorrect: false,
        misconception: 'Swapping coordinates rotates the shape; it does not change its 2D area.',
      },
      {
        id: 'opt-5',
        text: 'The image triangle is similar to the pre-image triangle, but it is not congruent.',
        isCorrect: false,
        misconception: 'Rotations preserve congruence; the image and pre-image are strictly congruent.',
      },
    ],
    solutionExplanation:
      'The rule (x, y) → (y, -x) is a 90° clockwise rotation about the origin. Rotations are isometric (rigid) transformations. Rigid motions preserve both linear distance (segment lengths, perimeter) and angle measures. Furthermore, rotations preserve vertex orientation (unlike reflections). Therefore, the angle measures are congruent and the perimeter is equal.',
    keyTakeaway:
      'Rigid transformations (Translations, Reflections, Rotations) ALWAYS preserve segment lengths, perimeter, area, and interior angle measures.',
  },

  // QUESTION 12 — Inline Choice: Advanced Multi-Step Composition
  {
    id: 'u1-dstaar-12',
    number: 12,
    type: 'inline-choice',
    typeLabel: 'Inline Choice (Multi-Dropdown)',
    teks: 'TEKS 8.10.C (Readiness) & 8.10.B',
    topic: 'Two-Step Transformation Composition & Invariance',
    prompt:
      'Parallelogram ABCD has vertex C(4, -2). The parallelogram undergoes a two-step transformation on the coordinate plane:\n• Step 1: Parallelogram ABCD is rotated 180° about the origin to create parallelogram A\'B\'C\'D\'.\n• Step 2: Parallelogram A\'B\'C\'D\' is translated according to the rule (x, y) → (x + 3, y - 5) to create parallelogram A\'\'B\'\'C\'\'D\'\'.\nChoose the correct answers from each drop-down menu to complete the statements.',
    scenario:
      'Step 1: 180° rotation about the origin\nStep 2: Translation (x + 3, y - 5)',
    statement1Prefix: 'After Step 1, the coordinates of vertex C\' are ',
    dropdown1Options: ['(-4, 2)', '(4, 2)', '(-2, 4)', '(2, -4)'],
    correct1: '(-4, 2)',
    statement2Prefix: 'After Step 2, the coordinates of vertex C\'\' are ',
    dropdown2Options: ['(-1, -3)', '(7, -3)', '(1, -3)', '(-1, 7)'],
    correct2: '(-1, -3)',
    dropdown3Label: 'The rotation in Step 1 preserves ',
    dropdown3Options: [
      'both congruence and orientation',
      'congruence only',
      'orientation only',
      'neither congruence nor orientation',
    ],
    correct3: 'both congruence and orientation',
    solutionExplanation:
      'Step 1: A 180° rotation about the origin follows (x, y) → (-x, -y). For C(4, -2), vertex C\' is (-(4), -(-2)) = (-4, 2).\nStep 2: Translating C\'(-4, 2) using (x + 3, y - 5) yields C\'\'(-4 + 3, 2 - 5) = C\'\'(-1, -3).\nRotations are rigid motions that preserve side lengths and angles (congruence) and maintain the cyclic ordering of vertices (orientation). Thus, it preserves both congruence and orientation.',
    keyTakeaway:
      'In a multi-step transformation, always apply Step 2 to the intermediate image coordinates from Step 1, not the original starting coordinates!',
  },
];
