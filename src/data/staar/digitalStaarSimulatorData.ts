// src/data/staar/digitalStaarSimulatorData.ts
// 12 Original Technology-Enhanced Digital STAAR Questions for Grade 8 Mathematics
// Unit 5: Dilations & Similarity
// 100% Client-side local data. Zero runtime API calls.

export type InteractionType =
  | 'drag-drop'
  | 'graphing'
  | 'inline-choice'
  | 'numeric-entry'
  | 'multiple-select'
  | 'matching'
  | 'hot-spot'
  | 'classification'
  | 'multi-part';

export interface BaseQuestion {
  id: string;
  number: number;
  type: InteractionType;
  typeLabel: string;
  teks: string;
  topic: string;
  prompt: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

// Q1: Drag & Drop Rule
export interface DragDropRuleQuestion extends BaseQuestion {
  type: 'drag-drop';
  preImageDescription: string;
  imageDescription: string;
  coordinatesInfo: { preImage: string; image: string };
  templatePrefix: string;
  templateMiddle: string;
  templateSuffix: string;
  draggableOptions: string[];
  correctDrop1: string;
  correctDrop2: string;
}

// Q2: Graphing Origin
export interface GraphingOriginQuestion extends BaseQuestion {
  type: 'graphing';
  center: [number, number];
  scaleFactor: number;
  scaleFactorText: string;
  preImageVertices: { label: string; x: number; y: number }[];
  targetVertices: { label: string; x: number; y: number }[];
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
}

// Q3: Inline Choice Image Coordinates
export interface InlineChoiceQuestion extends BaseQuestion {
  type: 'inline-choice';
  scenario: string;
  sentenceParts: {
    textBeforeW: string;
    dropdown1Options: string[];
    correct1: string;
    textBetweenW: string;
    dropdown2Options: string[];
    correct2: string;
    textBeforeZ: string;
    dropdown3Options: string[];
    correct3: string;
    textBetweenZ: string;
    dropdown4Options: string[];
    correct4: string;
    textAfterZ: string;
  };
}

// Q4: Numeric Entry Scale Factor
export interface NumericEntryQuestion extends BaseQuestion {
  type: 'numeric-entry';
  context: string;
  preImageCoord: string;
  imageCoord: string;
  inputLabel: string;
  acceptedAnswers: string[];
  placeholder: string;
  unit?: string;
}

// Q5: Multiple Select Properties
export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple-select';
  instruction: string;
  options: { id: string; text: string; isCorrect: boolean; misconception?: string }[];
}

// Q6: Drag & Drop Matching Corresponding Sides/Vertices
export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  figureStatement: string;
  pairs: { id: string; leftText: string; rightText: string }[];
}

// Q7: Hot Spot / Visual Selection
export interface HotSpotOption {
  id: string;
  label: string;
  vertices: [number, number][];
  description: string;
  isCorrect: boolean;
  color: string;
  misconceptionReason?: string;
}

export interface HotSpotQuestion extends BaseQuestion {
  type: 'hot-spot';
  preImageVertices: [number, number][];
  preImageLabel: string;
  center: [number, number];
  scaleFactor: number;
  figures: HotSpotOption[];
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
}

// Q8: Non-Origin Center Graphing
export interface NonOriginGraphingQuestion extends BaseQuestion {
  type: 'graphing';
  center: [number, number];
  centerLabel: string;
  scaleFactor: number;
  preImageVertices: { label: string; x: number; y: number }[];
  targetVertices: { label: string; x: number; y: number }[];
  gridRange: { minX: number; maxX: number; minY: number; maxY: number };
}

// Q9: Inline Choice Proportions
export interface ProportionInlineQuestion extends BaseQuestion {
  type: 'inline-choice';
  scenario: string;
  triangleStatement: string;
  measurements: string[];
  proportionPart: {
    leftNum: string;
    leftDen: string;
    rightNumDropdown: { options: string[]; correct: string };
    rightDen: string;
  };
  valuePart: {
    dropdown: { options: string[]; correct: string };
    unit: string;
  };
}

// Q10: Perimeter / Area Scaling Numeric Entry
export interface AreaScalingQuestion extends BaseQuestion {
  type: 'numeric-entry';
  context: string;
  originalMeasurement: string;
  scaleFactor: number;
  dimensionType: 'area' | 'perimeter';
  inputLabel: string;
  acceptedAnswers: string[];
  unit: string;
}

// Q11: Classification Transformations
export interface ClassificationCard {
  id: string;
  rule: string;
  description: string;
  correctCategory: 'congruence' | 'similarity-only';
}

export interface ClassificationQuestion extends BaseQuestion {
  type: 'classification';
  categories: { id: 'congruence' | 'similarity-only'; title: string; subtitle: string }[];
  cards: ClassificationCard[];
}

// Q12: Multi-Part Challenge
export interface MultiPartQuestion extends BaseQuestion {
  type: 'multi-part';
  coordinateScenario: string;
  preImagePoints: { label: string; coord: string }[];
  imagePoints: { label: string; coord: string }[];
  partA: {
    question: string;
    acceptedAnswers: string[];
    explanation: string;
  };
  partB: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
  partC: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
  partD: {
    question: string;
    preImageArea: number;
    acceptedAnswers: string[];
    unit: string;
    explanation: string;
  };
}

export type DigitalStaarQuestion =
  | DragDropRuleQuestion
  | GraphingOriginQuestion
  | InlineChoiceQuestion
  | NumericEntryQuestion
  | MultipleSelectQuestion
  | MatchingQuestion
  | HotSpotQuestion
  | NonOriginGraphingQuestion
  | ProportionInlineQuestion
  | AreaScalingQuestion
  | ClassificationQuestion
  | MultiPartQuestion;

export const DIGITAL_STAAR_12_QUESTIONS: DigitalStaarQuestion[] = [
  // QUESTION 1 — Drag & Drop
  {
    id: 'dstaar-1',
    number: 1,
    type: 'drag-drop',
    typeLabel: 'Drag & Drop',
    teks: 'TEKS 8.3C',
    topic: 'Scale Factor Algebraic Rule',
    prompt:
      'Rectangle ABCD is dilated with the center of dilation at the origin (0, 0) to create rectangle A\'B\'C\'D\'. The coordinates of vertex C are (4, 6), and the coordinates of the corresponding dilated image vertex C\' are (10, 15).\n\nDrag the correct scale factor value into each placeholder box to complete the algebraic dilation rule that represents this transformation.',
    preImageDescription: 'Pre-Image C(4, 6)',
    imageDescription: 'Image C\'(10, 15)',
    coordinatesInfo: { preImage: 'C(4, 6)', image: 'C\'(10, 15)' },
    templatePrefix: '(x, y) → (',
    templateMiddle: 'x,',
    templateSuffix: 'y)',
    draggableOptions: ['2.5', '0.4', '6', '1.5', 'x + 6', 'y + 9'],
    correctDrop1: '2.5',
    correctDrop2: '2.5',
    solutionExplanation:
      'To find the scale factor k, divide an image coordinate by its corresponding pre-image coordinate: k = 10 / 4 = 2.5, or k = 15 / 6 = 2.5. Since the dilation is centered at the origin, both coordinates are multiplied by 2.5, producing the algebraic rule (x, y) → (2.5x, 2.5y).',
    keyTakeaway: 'Scale factor k = Image / Pre-Image = 10 / 4 = 2.5. Center at origin means (x, y) → (kx, ky).',
  },

  // QUESTION 2 — Graphing (Dilation Centered at the Origin)
  {
    id: 'dstaar-2',
    number: 2,
    type: 'graphing',
    typeLabel: 'Graphing',
    teks: 'TEKS 8.3B',
    topic: 'Dilation Centered at the Origin (0, 0)',
    prompt:
      'Triangle ABC has vertices A(2, 4), B(6, 2), and C(2, -2). The triangle is dilated with the center of dilation at the origin (0, 0) using a scale factor of k = 0.5 (or 1/2) to produce triangle A\'B\'C\'.\n\nClick on the coordinate plane to plot the locations of the image vertices A\', B\', and C\'.',
    center: [0, 0],
    scaleFactor: 0.5,
    scaleFactorText: 'k = 0.5',
    preImageVertices: [
      { label: 'A', x: 2, y: 4 },
      { label: 'B', x: 6, y: 2 },
      { label: 'C', x: 2, y: -2 },
    ],
    targetVertices: [
      { label: "A'", x: 1, y: 2 },
      { label: "B'", x: 3, y: 1 },
      { label: "C'", x: 1, y: -1 },
    ],
    gridRange: { minX: -1, maxX: 7, minY: -3, maxY: 5 },
    solutionExplanation:
      'When dilating with the center at the origin (0, 0) and scale factor k = 0.5, multiply both the x- and y-coordinates of each vertex by 0.5:\n• A(2, 4) → A\'(2 × 0.5, 4 × 0.5) = A\'(1, 2)\n• B(6, 2) → B\'(6 × 0.5, 2 × 0.5) = B\'(3, 1)\n• C(2, -2) → C\'(2 × 0.5, -2 × 0.5) = C\'(1, -1)',
    keyTakeaway:
      'With origin center (0,0), multiply each coordinate by k: (x, y) → (0.5x, 0.5y). Vertices map to (1, 2), (3, 1), and (1, -1).',
  },

  // QUESTION 3 — Inline Choice / Dropdown
  {
    id: 'dstaar-3',
    number: 3,
    type: 'inline-choice',
    typeLabel: 'Inline Choice / Dropdown',
    teks: 'TEKS 8.3B',
    topic: 'Image Coordinates Using Dropdowns',
    prompt:
      'Trapezoid WXYZ is graphed on a coordinate plane. Vertex W is located at (-8, 4) and vertex Z is located at (4, -12). The trapezoid is dilated with the center of dilation at the origin by a scale factor of k = 3/4.\n\nSelect the correct coordinate values from the dropdown menus to complete the statement about the locations of image vertices W\' and Z\'.',
    scenario: 'Trapezoid WXYZ with W(-8, 4) and Z(4, -12), dilated by k = 3/4 about (0, 0).',
    sentenceParts: {
      textBeforeW: "The image vertex W' is located at ( ",
      dropdown1Options: ['-6', '-10.67', '-7.25', '6'],
      correct1: '-6',
      textBetweenW: ', ',
      dropdown2Options: ['3', '5.33', '3.25', '-3'],
      correct2: '3',
      textBeforeZ: " ) and the image vertex Z' is located at ( ",
      dropdown3Options: ['3', '5.33', '4.75', '-3'],
      correct3: '3',
      textBetweenZ: ', ',
      dropdown4Options: ['-9', '-16', '-11.25', '9'],
      correct4: '-9',
      textAfterZ: ' ).',
    },
    solutionExplanation:
      'Apply the scale factor k = 3/4 (or 0.75) to each coordinate:\n• For W(-8, 4): x = -8 × (3/4) = -6 and y = 4 × (3/4) = 3 → W\'(-6, 3).\n• For Z(4, -12): x = 4 × (3/4) = 3 and y = -12 × (3/4) = -9 → Z\'(3, -9).\nDistractors represent common student traps such as multiplying by the reciprocal 4/3 or subtracting 3/4.',
    keyTakeaway: 'Multiply both coordinates by 3/4: W(-8, 4) → W\'(-6, 3) and Z(4, -12) → Z\'(3, -9).',
  },

  // QUESTION 4 — Equation Editor / Numeric Entry
  {
    id: 'dstaar-4',
    number: 4,
    type: 'numeric-entry',
    typeLabel: 'Equation Editor / Numeric Entry',
    teks: 'TEKS 8.3C',
    topic: 'Find Numerical Scale Factor k',
    prompt:
      'On a coordinate grid, point M located at (15, 25) was dilated with the center of dilation at the origin to produce point M\' located at (6, 10).\n\nWhat is the numerical scale factor k of this dilation? Enter your answer as a decimal or simplified fraction in the box below.',
    context: 'Pre-image M(15, 25) dilated about (0,0) to image M\'(6, 10).',
    preImageCoord: 'M(15, 25)',
    imageCoord: "M'(6, 10)",
    inputLabel: 'Scale factor k =',
    acceptedAnswers: ['0.4', '2/5', '.4'],
    placeholder: 'Enter decimal or fraction',
    solutionExplanation:
      'The scale factor k is determined by comparing corresponding image and pre-image values:\nk = (Image coordinate) / (Pre-Image coordinate)\nk = 6 / 15 = 2/5 = 0.4 (or k = 10 / 25 = 2/5 = 0.4).\nSince 0 < 0.4 < 1, this dilation represents a reduction. The reciprocal 15 / 6 = 2.5 is a common mistake when students accidentally invert pre-image and image.',
    keyTakeaway: 'Always use k = Image / Pre-Image: k = 6 / 15 = 0.4 (or 2/5).',
  },

  // QUESTION 5 — Multiple Select
  {
    id: 'dstaar-5',
    number: 5,
    type: 'multiple-select',
    typeLabel: 'Multiple Select',
    teks: 'TEKS 8.3A',
    topic: 'Properties of Dilations',
    prompt:
      'A two-dimensional polygon is dilated on a coordinate grid by a positive scale factor k (where k ≠ 1). Which statements are ALWAYS true regarding the pre-image and the dilated image?\n\nSelect ALL that apply.',
    instruction: 'Select all correct statements (more than one statement may be correct):',
    options: [
      {
        id: 'opt-1',
        text: 'The corresponding angles of the pre-image and dilated image are congruent (equal in measure).',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        text: 'The dilated image is always mathematically similar to the pre-image.',
        isCorrect: true,
      },
      {
        id: 'opt-3',
        text: 'The lengths of corresponding sides of the image and pre-image are proportional.',
        isCorrect: true,
      },
      {
        id: 'opt-4',
        text: 'The orientation of the vertices (clockwise/counterclockwise order) is preserved.',
        isCorrect: true,
      },
      {
        id: 'opt-5',
        text: 'The corresponding side lengths of the pre-image and image are always congruent.',
        isCorrect: false,
        misconception: 'Side lengths are congruent only if k = 1 (rigid motion), not for general dilations.',
      },
      {
        id: 'opt-6',
        text: 'The measure of each interior angle is multiplied by the scale factor k.',
        isCorrect: false,
        misconception: 'Angles are preserved (unchanged), never multiplied by the scale factor.',
      },
    ],
    solutionExplanation:
      'Under any dilation:\n1. Corresponding angles remain congruent (never multiplied by k!).\n2. Corresponding side lengths are proportional by ratio k.\n3. The figure remains similar (same shape, proportional size).\n4. Orientation of vertices is preserved.\nSide lengths are NOT congruent when k ≠ 1, and angle measures do NOT change.',
    keyTakeaway:
      'Dilations preserve angle measures and similarity. Sides change proportionally by k, but angles NEVER change.',
  },

  // QUESTION 6 — Drag & Drop Matching
  {
    id: 'dstaar-6',
    number: 6,
    type: 'matching',
    typeLabel: 'Drag & Drop Matching',
    teks: 'TEKS 8.3A',
    topic: 'Corresponding Sides & Vertices of Similar Figures',
    prompt:
      'Trapezoid JKLM is mathematically similar to Trapezoid PQRS (represented as JKLM ~ PQRS).\n\nMatch each geometric part from Trapezoid JKLM on the left with its exact corresponding part from Trapezoid PQRS on the right.',
    figureStatement: 'Trapezoid JKLM ~ Trapezoid PQRS',
    pairs: [
      { id: 'p1', leftText: 'Side JK', rightText: 'Side PQ' },
      { id: 'p2', leftText: 'Side KL', rightText: 'Side QR' },
      { id: 'p3', leftText: 'Side LM', rightText: 'Side RS' },
      { id: 'p4', leftText: 'Vertex M', rightText: 'Vertex S' },
    ],
    solutionExplanation:
      'In a similarity statement like JKLM ~ PQRS, the order of the letters strictly indicates corresponding vertices:\n• J corresponds to P, K to Q, L to R, and M to S.\n• Therefore: Side JK ↔ Side PQ, Side KL ↔ Side QR, Side LM ↔ Side RS, and Vertex M ↔ Vertex S.',
    keyTakeaway: 'The letter order in JKLM ~ PQRS determines corresponding vertices and sides: 1st-2nd pairs with 1st-2nd.',
  },

  // QUESTION 7 — Hot Spot / Visual Selection
  {
    id: 'dstaar-7',
    number: 7,
    type: 'hot-spot',
    typeLabel: 'Hot Spot / Visual Selection',
    teks: 'TEKS 8.3B',
    topic: 'Identify the Correct Dilated Image',
    prompt:
      'Pre-image right triangle T has vertices at (2, 2), (4, 2), and (2, 6). Triangle T is dilated with the center of dilation at the origin (0, 0) by a scale factor of k = 1.5 to create an image triangle.\n\nClick on the figure on the coordinate plane that represents the correct dilated image.',
    preImageVertices: [
      [2, 2],
      [4, 2],
      [2, 6],
    ],
    preImageLabel: 'Pre-Image T',
    center: [0, 0],
    scaleFactor: 1.5,
    figures: [
      {
        id: 'fig-A',
        label: 'Figure A',
        vertices: [
          [3, 3],
          [6, 3],
          [3, 9],
        ],
        description: 'Vertices at (3, 3), (6, 3), and (3, 9)',
        isCorrect: true,
        color: '#10b981', // Emerald
      },
      {
        id: 'fig-B',
        label: 'Figure B',
        vertices: [
          [3.5, 3.5],
          [5.5, 3.5],
          [3.5, 7.5],
        ],
        description: 'Vertices at (3.5, 3.5), (5.5, 3.5), and (3.5, 7.5)',
        isCorrect: false,
        color: '#ef4444', // Red
        misconceptionReason: 'Additive trap: added 1.5 to coordinates instead of multiplying by 1.5.',
      },
      {
        id: 'fig-C',
        label: 'Figure C',
        vertices: [
          [1, 1],
          [2, 1],
          [1, 3],
        ],
        description: 'Vertices at (1, 1), (2, 1), and (1, 3)',
        isCorrect: false,
        color: '#f59e0b', // Amber
        misconceptionReason: 'Reduction trap: divided coordinates by 2 instead of enlarging by k = 1.5.',
      },
      {
        id: 'fig-D',
        label: 'Figure D',
        vertices: [
          [3, 2],
          [6, 2],
          [3, 6],
        ],
        description: 'Vertices at (3, 2), (6, 2), and (3, 6)',
        isCorrect: false,
        color: '#8b5cf6', // Violet
        misconceptionReason: 'Partial dilation trap: only multiplied x-coordinates by 1.5; y-coordinates remained unchanged.',
      },
    ],
    gridRange: { minX: 0, maxX: 8, minY: 0, maxY: 10 },
    solutionExplanation:
      'Multiply all coordinates of triangle T by 1.5:\n• (2, 2) → (2 × 1.5, 2 × 1.5) = (3, 3)\n• (4, 2) → (4 × 1.5, 2 × 1.5) = (6, 3)\n• (2, 6) → (2 × 1.5, 6 × 1.5) = (3, 9)\nFigure A matches these exact coordinates. Figure B made the mistake of adding 1.5; Figure C reduced by 0.5; and Figure D only multiplied x.',
    keyTakeaway: 'Both x and y must be multiplied by k = 1.5: (2,2)→(3,3), (4,2)→(6,3), and (2,6)→(3,9).',
  },

  // QUESTION 8 — Graphing (Non-Origin Center C(h, k))
  {
    id: 'dstaar-8',
    number: 8,
    type: 'graphing',
    typeLabel: 'Graphing',
    teks: 'TEKS 8.3B',
    topic: 'Dilation with Non-Origin Center C(h, k)',
    prompt:
      'Segment AB has endpoints A(3, 4) and B(5, 2). The segment is dilated with the center of dilation at point C(1, 1) by a scale factor of k = 2.\n\nUse the rule P\' = C + k(P - C) to find the image endpoints. Click on the coordinate plane to plot the locations of the image endpoints A\' and B\'.',
    center: [1, 1],
    centerLabel: 'Center C(1, 1)',
    scaleFactor: 2,
    preImageVertices: [
      { label: 'A', x: 3, y: 4 },
      { label: 'B', x: 5, y: 2 },
    ],
    targetVertices: [
      { label: "A'", x: 5, y: 7 },
      { label: "B'", x: 9, y: 3 },
    ],
    gridRange: { minX: 0, maxX: 10, minY: 0, maxY: 8 },
    solutionExplanation:
      'Because the center of dilation is C(1, 1) and NOT the origin, we must measure displacement from C:\nFormula: x\' = h + k(x - h) and y\' = k_center + k(y - k_center)\n• For A(3, 4): x\' = 1 + 2(3 - 1) = 1 + 4 = 5; y\' = 1 + 2(4 - 1) = 1 + 6 = 7 → A\'(5, 7).\n• For B(5, 2): x\' = 1 + 2(5 - 1) = 1 + 8 = 9; y\' = 1 + 2(2 - 1) = 1 + 2 = 3 → B\'(9, 3).\nNotice that multiplying coordinates directly by 2 gives (6, 8) and (10, 4), which is incorrect because the center is at (1, 1).',
    keyTakeaway:
      'With center C(1,1) and k=2: P\' = C + 2(P - C). Point A(3,4) maps to A\'(5,7) and B(5,2) maps to B\'(9,3).',
  },

  // QUESTION 9 — Inline Choice / Dropdown (Similar Figures & Proportions)
  {
    id: 'dstaar-9',
    number: 9,
    type: 'inline-choice',
    typeLabel: 'Inline Choice / Dropdown',
    teks: 'TEKS 8.3A',
    topic: 'Similar Figures & Setting Up Proportions',
    prompt:
      'Triangle ABC is similar to triangle DEF (△ABC ~ △DEF).\n• In △ABC: side AB = 6 cm and side BC = 9 cm.\n• In △DEF: side DE = 10 cm and side EF = x cm.\n\nSelect the correct values from the dropdown menus to complete the proportion comparing corresponding sides and solve for the unknown side length x.',
    scenario: '△ABC ~ △DEF with AB = 6 cm, BC = 9 cm, DE = 10 cm, and EF = x cm.',
    triangleStatement: '△ABC ~ △DEF',
    measurements: ['AB = 6 cm', 'BC = 9 cm', 'DE = 10 cm', 'EF = x cm'],
    proportionPart: {
      leftNum: '6',
      leftDen: '10',
      rightNumDropdown: { options: ['9', '6', '10', '15', '54'], correct: '9' },
      rightDen: 'x',
    },
    valuePart: {
      dropdown: { options: ['15', '13', '5.4', '22.5'], correct: '15' },
      unit: 'cm',
    },
    sentenceParts: {
      textBeforeW: 'Proportion: 6 / 10 = ',
      dropdown1Options: ['9', '6', '10', '15'],
      correct1: '9',
      textBetweenW: ' / x. Solving the proportion yields x = ',
      dropdown2Options: ['15', '13', '5.4', '22.5'],
      correct2: '15',
      textBeforeZ: '',
      dropdown3Options: [],
      correct3: '',
      textBetweenZ: '',
      dropdown4Options: [],
      correct4: '',
      textAfterZ: ' cm.',
    },
    solutionExplanation:
      'Set up a ratio of corresponding sides:\nAB / DE = BC / EF\n6 / 10 = 9 / x\nCross-multiply to solve: 6 × x = 10 × 9\n6x = 90\nx = 90 / 6 = 15 cm.\nThe distractor 13 comes from adding 4 (since 10 - 6 = 4), which is incorrect because similar figures scale by multiplication, not addition.',
    keyTakeaway: 'Corresponding sides are proportional: 6 / 10 = 9 / x → 6x = 90 → x = 15 cm.',
  },

  // QUESTION 10 — Equation Editor / Numeric Entry (Perimeter or Area Scaling)
  {
    id: 'dstaar-10',
    number: 10,
    type: 'numeric-entry',
    typeLabel: 'Equation Editor / Numeric Entry',
    teks: 'TEKS 8.10D',
    topic: 'Area Scaling by Factor of k²',
    prompt:
      'A rectangular playground has an area of 32 square yards. The city planning department designs an enlarged recreation park by dilating the dimensions of the playground using a scale factor of k = 2.5.\n\nWhat is the area of the enlarged recreation park in square yards? Enter your numerical answer in the box below.',
    context: 'Original area = 32 sq yd, scale factor k = 2.5.',
    originalMeasurement: '32 square yards',
    scaleFactor: 2.5,
    dimensionType: 'area',
    inputLabel: 'New Area =',
    acceptedAnswers: ['200', '200.0'],
    unit: 'square yards',
    placeholder: 'Enter numerical area',
    solutionExplanation:
      'When a two-dimensional shape is dilated by scale factor k:\n• Linear measurements (side lengths and perimeter) are multiplied by k.\n• Area measurements are multiplied by k².\nHere, k = 2.5, so k² = (2.5)² = 6.25.\nNew Area = Original Area × k²\nNew Area = 32 × 6.25 = 200 square yards.\nCommon error alert: Multiplying 32 × 2.5 = 80 applies the perimeter scaling rule instead of the area scaling rule!',
    keyTakeaway: 'Area scales by k²: New Area = 32 × (2.5)² = 32 × 6.25 = 200 sq yd.',
  },

  // QUESTION 11 — Drag & Drop Classification (Transformations & Congruence)
  {
    id: 'dstaar-11',
    number: 11,
    type: 'classification',
    typeLabel: 'Drag & Drop Classification',
    teks: 'TEKS 8.10A',
    topic: 'Rigid Motions vs. Non-Rigid Dilations',
    prompt:
      'Transformations can be classified by whether they preserve congruence (rigid motions) or produce similar figures that are not congruent (non-rigid dilations where k ≠ 1).\n\nClassify each algebraic transformation rule into the appropriate category.',
    categories: [
      {
        id: 'congruence',
        title: 'Preserves Congruence',
        subtitle: 'Rigid Motion (Orientation/Position changes, Size is identical)',
      },
      {
        id: 'similarity-only',
        title: 'Produces Similarity Only',
        subtitle: 'Non-Rigid Dilation (Shape preserved, Size changes by k ≠ 1)',
      },
    ],
    cards: [
      {
        id: 'c1',
        rule: '(x, y) → (x + 5, y - 3)',
        description: 'Translation 5 units right, 3 units down',
        correctCategory: 'congruence',
      },
      {
        id: 'c2',
        rule: '(x, y) → (3x, 3y)',
        description: 'Dilation by scale factor k = 3',
        correctCategory: 'similarity-only',
      },
      {
        id: 'c3',
        rule: '(x, y) → (-x, y)',
        description: 'Reflection across the y-axis',
        correctCategory: 'congruence',
      },
      {
        id: 'c4',
        rule: '(x, y) → (0.25x, 0.25y)',
        description: 'Dilation by scale factor k = 0.25',
        correctCategory: 'similarity-only',
      },
      {
        id: 'c5',
        rule: '(x, y) → (-y, x)',
        description: 'Rotation 90° counter-clockwise about origin',
        correctCategory: 'congruence',
      },
      {
        id: 'c6',
        rule: '(x, y) → (2/3 x, 2/3 y)',
        description: 'Dilation by scale factor k = 2/3',
        correctCategory: 'similarity-only',
      },
    ],
    solutionExplanation:
      'Translations, reflections, and rotations are rigid motions (isometries) that preserve both angle measures and side lengths, meaning the image is always congruent to the pre-image. Dilations by a scale factor k ≠ 1 change the side lengths proportionally, creating similar figures that are NOT congruent.',
    keyTakeaway:
      'Translations, reflections, and rotations preserve congruence. Dilations (k ≠ 1) change side lengths and produce similarity only.',
  },

  // QUESTION 12 — Multi-Part Digital Challenge
  {
    id: 'dstaar-12',
    number: 12,
    type: 'multi-part',
    typeLabel: 'Multi-Part Challenge',
    teks: 'TEKS 8.3B',
    topic: 'Multi-Step Comprehensive Dilations Reasoning',
    prompt:
      'Triangle JKL with vertices J(2, 4), K(6, 2), and L(2, -2) is dilated with the center of dilation at the origin (0, 0) to create triangle J\'K\'L\' with vertices J\'(5, 10), K\'(15, 5), and L\'(5, -5).\n\nComplete all four parts of this multi-step challenge to analyze the transformation.',
    coordinateScenario:
      'Pre-image △JKL: J(2, 4), K(6, 2), L(2, -2) → Dilated Image △J\'K\'L\': J\'(5, 10), K\'(15, 5), L\'(5, -5)',
    preImagePoints: [
      { label: 'J', coord: '(2, 4)' },
      { label: 'K', coord: '(6, 2)' },
      { label: 'L', coord: '(2, -2)' },
    ],
    imagePoints: [
      { label: "J'", coord: '(5, 10)' },
      { label: "K'", coord: '(15, 5)' },
      { label: "L'", coord: '(5, -5)' },
    ],
    partA: {
      question: 'Part 1: What is the numerical scale factor k of the dilation? (Enter as a decimal or fraction):',
      acceptedAnswers: ['2.5', '5/2'],
      explanation: 'k = Image / Pre-Image = 5 / 2 = 2.5.',
    },
    partB: {
      question: 'Part 2: Does this dilation represent an enlargement or a reduction?',
      options: ['Enlargement (because k > 1)', 'Reduction (because 0 < k < 1)'],
      correct: 'Enlargement (because k > 1)',
      explanation: 'Because k = 2.5 is greater than 1, the image is larger than the pre-image (enlargement).',
    },
    partC: {
      question: 'Part 3: Which algebraic coordinate rule represents this dilation?',
      options: [
        '(x, y) → (2.5x, 2.5y)',
        '(x, y) → (x + 3, y + 6)',
        '(x, y) → (0.4x, 0.4y)',
        '(x, y) → (2.5x, y)',
      ],
      correct: '(x, y) → (2.5x, 2.5y)',
      explanation: 'Both coordinates are multiplied by the scale factor: (x, y) → (2.5x, 2.5y).',
    },
    partD: {
      question:
        'Part 4: If the area of pre-image △JKL is 12 square units, what is the area of image △J\'K\'L\' in square units?',
      preImageArea: 12,
      acceptedAnswers: ['75', '75.0'],
      unit: 'square units',
      explanation: 'Area scales by k²: New Area = 12 × (2.5)² = 12 × 6.25 = 75 square units.',
    },
    solutionExplanation:
      'Step-by-step synthesis:\n1. Scale factor: k = 5 / 2 = 2.5 (or 10 / 4 = 2.5).\n2. Since k = 2.5 > 1, the transformation is an enlargement.\n3. Centered at the origin, the rule is (x, y) → (2.5x, 2.5y).\n4. Area scales by k² = (2.5)² = 6.25. Therefore, Area = 12 × 6.25 = 75 square units.',
    keyTakeaway:
      'k = 2.5 (>1 means enlargement). Algebraic rule is (x, y) → (2.5x, 2.5y). Area scales by k² = 6.25 to yield 75 sq units.',
  },
];
