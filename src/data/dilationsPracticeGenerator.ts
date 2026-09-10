// src/data/dilationsPracticeGenerator.ts
// Pure local, client-side algorithmic question generator and curated banks
// Covers all 10 required competencies for TEKS 8.3ABC & 8.10D

export type PracticeSkillId =
  | 'scale-factor'
  | 'enlargement-reduction'
  | 'origin-dilation'
  | 'non-origin-dilation'
  | 'algebraic-rules'
  | 'similar-figures'
  | 'perimeter-scaling'
  | 'area-scaling'
  | 'scale-drawings'
  | 'shadow-measurement';

export type CanonicalSkillId =
  | 'scale-factor'
  | 'size-changes'
  | 'origin-dilations'
  | 'non-origin-center'
  | 'algebraic-rules'
  | 'similar-figures'
  | 'perimeter'
  | 'area'
  | 'scale-drawings'
  | 'shadow-proportions';

export const MIXED_PRACTICE_CANONICAL_SKILLS: readonly CanonicalSkillId[] = [
  'scale-factor',
  'size-changes',
  'origin-dilations',
  'non-origin-center',
  'algebraic-rules',
  'similar-figures',
  'perimeter',
  'area',
  'scale-drawings',
  'shadow-proportions',
] as const;

export function normalizeSkillId(skill: PracticeSkillId | CanonicalSkillId | string): PracticeSkillId {
  switch (skill) {
    case 'size-changes':
    case 'enlargement-reduction':
      return 'enlargement-reduction';
    case 'origin-dilations':
    case 'origin-dilation':
      return 'origin-dilation';
    case 'non-origin-center':
    case 'non-origin-dilation':
      return 'non-origin-dilation';
    case 'perimeter':
    case 'perimeter-scaling':
      return 'perimeter-scaling';
    case 'area':
    case 'area-scaling':
      return 'area-scaling';
    case 'shadow-proportions':
    case 'shadow-measurement':
      return 'shadow-measurement';
    case 'scale-factor':
      return 'scale-factor';
    case 'algebraic-rules':
      return 'algebraic-rules';
    case 'similar-figures':
      return 'similar-figures';
    case 'scale-drawings':
      return 'scale-drawings';
    default:
      return 'scale-factor';
  }
}

export function toCanonicalSkillId(skill: PracticeSkillId | CanonicalSkillId | string): CanonicalSkillId {
  switch (skill) {
    case 'enlargement-reduction':
    case 'size-changes':
      return 'size-changes';
    case 'origin-dilation':
    case 'origin-dilations':
      return 'origin-dilations';
    case 'non-origin-dilation':
    case 'non-origin-center':
      return 'non-origin-center';
    case 'perimeter-scaling':
    case 'perimeter':
      return 'perimeter';
    case 'area-scaling':
    case 'area':
      return 'area';
    case 'shadow-measurement':
    case 'shadow-proportions':
      return 'shadow-proportions';
    case 'scale-factor':
      return 'scale-factor';
    case 'algebraic-rules':
      return 'algebraic-rules';
    case 'similar-figures':
      return 'similar-figures';
    case 'scale-drawings':
      return 'scale-drawings';
    default:
      return 'scale-factor';
  }
}

export interface PracticeSkillInfo {
  id: PracticeSkillId;
  title: string;
  shortName: string;
  teks: string;
  iconName: string;
  description: string;
}

export const PRACTICE_SKILLS: PracticeSkillInfo[] = [
  {
    id: 'scale-factor',
    title: 'Scale Factor (k = Image / Pre-Image)',
    shortName: 'Scale Factor',
    teks: 'TEKS 8.3C',
    iconName: 'Divide',
    description: 'Find scale factor k from coordinates, corresponding side lengths, or ratio of measurements.',
  },
  {
    id: 'enlargement-reduction',
    title: 'Enlargement vs. Reduction',
    shortName: 'Size Changes',
    teks: 'TEKS 8.3C',
    iconName: 'Maximize2',
    description: 'Determine whether a scale factor expands (k > 1) or shrinks (0 < k < 1) a figure.',
  },
  {
    id: 'origin-dilation',
    title: 'Dilations Centered at the Origin (0, 0)',
    shortName: 'Origin Dilations',
    teks: 'TEKS 8.3C',
    iconName: 'Compass',
    description: 'Apply (x, y) → (kx, ky) to determine vertices dilated from (0, 0).',
  },
  {
    id: 'non-origin-dilation',
    title: 'Dilations with Center NOT at Origin C(h, k)',
    shortName: 'Non-Origin Center',
    teks: 'TEKS 8.3C / Geometry',
    iconName: 'Crosshair',
    description: 'Measure distance from center point C(h, k), scale by k, and locate image coordinates.',
  },
  {
    id: 'algebraic-rules',
    title: 'Algebraic Coordinate Rules',
    shortName: 'Algebraic Rules',
    teks: 'TEKS 8.3C',
    iconName: 'Code',
    description: 'Identify valid dilation rules (kx, ky) vs translations, reflections, or distorted stretches.',
  },
  {
    id: 'similar-figures',
    title: 'Similar Figures: Angles & Proportions',
    shortName: 'Similar Figures',
    teks: 'TEKS 8.3A / 8.3B',
    iconName: 'Shapes',
    description: 'Angles stay congruent (unchanged) while corresponding side lengths remain proportional.',
  },
  {
    id: 'perimeter-scaling',
    title: 'Perimeter Scaling by Scale Factor k',
    shortName: 'Perimeter (k)',
    teks: 'TEKS 8.10D',
    iconName: 'Square',
    description: 'Linear 1D dimensions and perimeter scale directly by multiplying by k.',
  },
  {
    id: 'area-scaling',
    title: 'Area Scaling by Scale Factor k²',
    shortName: 'Area (k²)',
    teks: 'TEKS 8.10D',
    iconName: 'Grid',
    description: 'Two-dimensional area scales quadratically by multiplying by the square of the scale factor (k²).',
  },
  {
    id: 'scale-drawings',
    title: 'Scale Drawings, Blueprints & Maps',
    shortName: 'Scale Drawings',
    teks: 'TEKS 7.5C / 8.3C',
    iconName: 'Map',
    description: 'Use scale ratios (e.g., 1 in = 15 ft or 1 cm = 4 m) to solve for real and blueprint distances.',
  },
  {
    id: 'shadow-measurement',
    title: 'Indirect Measurement Using Shadows',
    shortName: 'Shadow Proportions',
    teks: 'TEKS 8.3A',
    iconName: 'Sun',
    description: 'Set up proportions between object heights and cast shadows using similar right triangles.',
  },
];

export type ShadowObjectType = 'tree' | 'building' | 'flagpole' | 'lightpole' | 'monument' | 'hoop';
export type ShadowDiagramLayout = 'student-left' | 'student-right';

export interface ScaleFactorGeometryDimension {
  label: string;
  value: number | string;
  position?: 'bottom' | 'top' | 'left' | 'right';
}

export interface ScaleFactorGeometryData {
  category: 'triangles' | 'rectangles' | 'polygons' | 'real-world';
  preImageTitle: string;
  imageTitle: string;
  unit: string;
  scaleFactor: number;
  preImageDimensions: ScaleFactorGeometryDimension[];
  imageDimensions: ScaleFactorGeometryDimension[];
  polygonType?: 'trapezoid' | 'parallelogram' | 'l-shape';
  realWorldContext?: {
    type: 'photo' | 'blueprint' | 'model' | 'poster' | 'map';
    contextLabel: string;
    description: string;
  };
}

export interface VisualPayload {
  type:
    | 'coordinate-grid'
    | 'shadow-scene'
    | 'scale-drawing'
    | 'similar-triangles'
    | 'perimeter-area-compare'
    | 'scale-factor-geometry';
  gridData?: {
    geometryType?: 'point' | 'triangle' | 'quadrilateral';
    center: { x: number; y: number; label?: string };
    preImage: { x: number; y: number; label: string }[];
    image?: { x: number; y: number; label: string }[];
    scaleFactor: number;
    showRays?: boolean;
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  shadowData?: {
    personHeight: number;
    personShadow: number;
    objectType: ShadowObjectType;
    objectName: string;
    objectShortName: string;
    objectHeight: number | null; // null if object height is unknown
    objectShadow: number;
    unit: string;
    layout?: ShadowDiagramLayout;
  };
  scaleDrawingData?: {
    drawingLabel: string;
    scaleRatio: string;
    drawingMeasurement: string;
    actualMeasurement?: string;
  };
  similarTrianglesData?: {
    triangleA: {
      name: string;
      angles: [number, number, number];
      sides: [number, number, number];
      unknownSideIdx?: number;
      unknownAngleIdx?: number;
    };
    triangleB: {
      name: string;
      angles: [number, number, number];
      sides: [number, number, number];
      unknownSideIdx?: number;
      unknownAngleIdx?: number;
    };
    scaleFactor: number;
  };
  compareData?: {
    shapeName: string;
    originalDims: string;
    originalPerimeter: number;
    originalArea: number;
    scaleFactor: number;
    unit: string;
    askingFor: 'perimeter' | 'area';
  };
  scaleFactorGeometryData?: ScaleFactorGeometryData;
}

export interface PracticeProblem {
  id: string;
  skillId: PracticeSkillId;
  canonicalSkillId?: CanonicalSkillId;
  skillTitle: string;
  difficulty: 'Standard' | 'Challenge' | 'Mastery';
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  solutionSteps: string[];
  keyTakeaway: string;
  visualData: VisualPayload;
  geometryType?: 'point' | 'triangle' | 'quadrilateral';
  preImageVertices?: { x: number; y: number; label: string }[];
  imageVertices?: { x: number; y: number; label: string }[];
  scaleFactor?: number;
  center?: { x: number; y: number };
}

// Helper utilities for math and randomization
function randomChoice<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleOptions<T>(correct: T, distractors: T[]): { options: T[]; correctIndex: number } {
  // Deduplicate distractors and ensure correct is not inside distractors
  const uniqueDistractors = Array.from(new Set(distractors)).filter((d) => d !== correct);
  while (uniqueDistractors.length < 3) {
    uniqueDistractors.push(`Option ${uniqueDistractors.length + 1}` as unknown as T);
  }
  const chosenDistractors = uniqueDistractors.slice(0, 3);
  const combined = [correct, ...chosenDistractors];
  // Fisher-Yates shuffle
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return {
    options: combined,
    correctIndex: combined.indexOf(correct),
  };
}

// ==========================================
// 1. SCALE FACTOR GENERATOR (MULTI-REPRESENTATION)
// ==========================================
export type ScaleFactorProblemType =
  | 'coordinate-point'
  | 'triangle-side'
  | 'rectangle-dimensions'
  | 'polygon-similarity'
  | 'coordinate-plane-figure'
  | 'real-world';

let lastScaleFactorType: ScaleFactorProblemType | null = null;

interface ScaleFactorKDefinition {
  k: number;
  label: string;
  reciprocal: string;
  alt1: string;
  alt2: string;
  isEnlarge: boolean;
}

const SCALE_FACTOR_K_POOL: ScaleFactorKDefinition[] = [
  // Enlargements (k > 1)
  { k: 2, label: 'k = 2', reciprocal: 'k = 0.5 (or 1/2)', alt1: 'k = 3', alt2: 'k = 4', isEnlarge: true },
  { k: 2.5, label: 'k = 2.5 (or 5/2)', reciprocal: 'k = 0.4 (or 2/5)', alt1: 'k = 2', alt2: 'k = 3', isEnlarge: true },
  { k: 3, label: 'k = 3', reciprocal: 'k = 0.33 (or 1/3)', alt1: 'k = 2', alt2: 'k = 4', isEnlarge: true },
  { k: 4, label: 'k = 4', reciprocal: 'k = 0.25 (or 1/4)', alt1: 'k = 2', alt2: 'k = 3', isEnlarge: true },
  { k: 1.5, label: 'k = 1.5 (or 3/2)', reciprocal: 'k = 0.67 (or 2/3)', alt1: 'k = 2', alt2: 'k = 2.5 (or 5/2)', isEnlarge: true },
  // Reductions (0 < k < 1)
  { k: 0.5, label: 'k = 0.5 (or 1/2)', reciprocal: 'k = 2', alt1: 'k = 0.25 (or 1/4)', alt2: 'k = 0.75 (or 3/4)', isEnlarge: false },
  { k: 0.25, label: 'k = 0.25 (or 1/4)', reciprocal: 'k = 4', alt1: 'k = 0.5 (or 1/2)', alt2: 'k = 0.75 (or 3/4)', isEnlarge: false },
  { k: 0.75, label: 'k = 0.75 (or 3/4)', reciprocal: 'k = 1.33 (or 4/3)', alt1: 'k = 0.5 (or 1/2)', alt2: 'k = 0.25 (or 1/4)', isEnlarge: false },
];

function buildScaleFactorOptions(
  chosenK: ScaleFactorKDefinition,
  additiveDiffVal?: number
): { options: string[]; correctIndex: number } {
  let dist2 = chosenK.alt1;
  let dist3 = chosenK.alt2;

  if (
    additiveDiffVal !== undefined &&
    additiveDiffVal > 0 &&
    Math.abs(additiveDiffVal - chosenK.k) > 0.05 &&
    Math.abs(additiveDiffVal - 1 / chosenK.k) > 0.05
  ) {
    dist2 = `k = ${Number(additiveDiffVal.toFixed(1))}`;
  }

  return shuffleOptions(chosenK.label, [chosenK.reciprocal, dist2, dist3]);
}

// 1A. Coordinate Point Scale Factor: P(x, y) -> P'(x', y')
function generateCoordinatePointScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  let px = 4;
  let py = 6;

  if (chosenK.k === 2) {
    [px, py] = randomChoice([[2, 3], [3, 2], [4, 1], [1, 4], [3, 4]]);
  } else if (chosenK.k === 2.5) {
    [px, py] = randomChoice([[2, 4], [4, 2], [4, 6], [6, 2], [4, 4]]);
  } else if (chosenK.k === 3) {
    [px, py] = randomChoice([[1, 2], [2, 1], [2, 3], [3, 1]]);
  } else if (chosenK.k === 4) {
    [px, py] = randomChoice([[1, 2], [2, 1], [1, 3], [2, 2]]);
  } else if (chosenK.k === 1.5) {
    [px, py] = randomChoice([[2, 4], [4, 2], [4, 6], [6, 4]]);
  } else if (chosenK.k === 0.5) {
    [px, py] = randomChoice([[6, 4], [4, 8], [8, 6], [10, 4]]);
  } else if (chosenK.k === 0.25) {
    [px, py] = randomChoice([[8, 4], [4, 8], [8, 12], [12, 4]]);
  } else if (chosenK.k === 0.75) {
    [px, py] = randomChoice([[8, 4], [4, 8], [8, 12], [12, 4]]);
  }

  const ix = Number((px * chosenK.k).toFixed(2));
  const iy = Number((py * chosenK.k).toFixed(2));
  const pt = randomChoice(['P', 'M', 'R', 'T', 'W', 'K']);

  const additiveDiff = Number(Math.abs(ix - px).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  return {
    id: `sf-pt-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `A figure is dilated on a coordinate plane with the origin (0, 0) as the center of dilation. Pre-image point ${pt}(${px}, ${py}) is mapped to image point ${pt}'(${ix}, ${iy}). What is the scale factor k of this dilation?`,
    options,
    correctIndex,
    hint: `Scale factor k is always equal to the image coordinate divided by the pre-image coordinate: k = (Image Coordinate) ÷ (Pre-Image Coordinate). Divide ${ix} by ${px}, or ${iy} by ${py}.`,
    solutionSteps: [
      `Identify the pre-image coordinate: ${pt}(${px}, ${py}).`,
      `Identify the corresponding dilated image coordinate: ${pt}'(${ix}, ${iy}).`,
      `Apply the scale factor ratio using x-coordinates: k = x' / x = ${ix} / ${px} = ${chosenK.k}.`,
      `Verify with y-coordinates: k = y' / y = ${iy} / ${py} = ${chosenK.k}.`,
      `Classification: Since ${chosenK.k} ${chosenK.isEnlarge ? '> 1, this dilation is an enlargement' : '< 1, this dilation is a reduction'}. (Dividing pre-image by image (${px} / ${ix}) gives ${chosenK.reciprocal}, which is the inverted reciprocal ratio).`,
    ],
    keyTakeaway: 'Always compute scale factor as Image ÷ Pre-Image (New ÷ Old). If k > 1 it is an enlargement; if 0 < k < 1 it is a reduction.',
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: [{ x: px, y: py, label: `${pt}(${px}, ${py})` }],
        image: [{ x: ix, y: iy, label: `${pt}'(${ix}, ${iy})` }],
        scaleFactor: chosenK.k,
        showRays: true,
        minX: -1,
        maxX: Math.max(10, Math.ceil(ix + 2)),
        minY: -1,
        maxY: Math.max(10, Math.ceil(iy + 2)),
      },
    },
  };
}

// 1B. Triangle Side-Length Scale Factor: ΔABC -> ΔA'B'C'
function generateTriangleSideScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  const unit = randomChoice(['cm', 'in', 'units', 'mm']);
  const triOrig = randomChoice(['ABC', 'JKL', 'PQR', 'DEF']);
  const triPrime = triOrig.split('').map((c) => `${c}'`).join('');
  const [vA, vB, vC] = triOrig.split('');
  const [vpA, vpB, vpC] = triPrime.split("'");

  let basePre = 6;
  let legPre = 4;

  if (chosenK.k === 2) {
    basePre = randomChoice([4, 5, 6, 7]);
    legPre = randomChoice([3, 4]);
  } else if (chosenK.k === 2.5) {
    basePre = randomChoice([4, 6, 8]);
    legPre = randomChoice([4, 6]);
  } else if (chosenK.k === 3) {
    basePre = randomChoice([3, 4, 5]);
    legPre = randomChoice([2, 3]);
  } else if (chosenK.k === 4) {
    basePre = randomChoice([2, 3, 4]);
    legPre = randomChoice([2, 3]);
  } else if (chosenK.k === 1.5) {
    basePre = randomChoice([6, 8, 10]);
    legPre = randomChoice([4, 6]);
  } else if (chosenK.k === 0.5) {
    basePre = randomChoice([10, 12, 14, 16]);
    legPre = randomChoice([8, 10]);
  } else if (chosenK.k === 0.25) {
    basePre = randomChoice([12, 16, 20]);
    legPre = randomChoice([8, 12]);
  } else if (chosenK.k === 0.75) {
    basePre = randomChoice([8, 12, 16]);
    legPre = randomChoice([8, 12]);
  }

  const baseImg = Number((basePre * chosenK.k).toFixed(2));
  const legImg = Number((legPre * chosenK.k).toFixed(2));

  const additiveDiff = Number(Math.abs(baseImg - basePre).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  return {
    id: `sf-tri-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `Triangle ${triPrime} is a dilation of triangle ${triOrig}. In the pre-image triangle, corresponding side ${vA}${vB} has a length of ${basePre} ${unit}. In the dilated image triangle, side ${vpA}'${vpB}' has a length of ${baseImg} ${unit}. What scale factor k was applied to triangle ${triOrig} to produce triangle ${triPrime}?`,
    options,
    correctIndex,
    hint: `Scale factor k is always equal to the dilated image side length divided by the original pre-image side length: k = (Image Side) ÷ (Pre-Image Side). Divide ${baseImg} by ${basePre}.`,
    solutionSteps: [
      `Identify the pre-image side length: side ${vA}${vB} = ${basePre} ${unit}.`,
      `Identify the corresponding dilated image side length: side ${vpA}'${vpB}' = ${baseImg} ${unit}.`,
      `Apply the scale factor formula: k = (Image Side) / (Pre-Image Side) = ${baseImg} / ${basePre}.`,
      `Divide and simplify: ${baseImg} ÷ ${basePre} = ${chosenK.k}.`,
      `Classification: Since ${chosenK.k} ${chosenK.isEnlarge ? '> 1, this dilation is an enlargement' : '< 1, this dilation is a reduction'}. Note: dividing ${basePre} ÷ ${baseImg} yields ${chosenK.reciprocal}, which incorrectly inverts the ratio.`,
    ],
    keyTakeaway: 'Always find the scale factor as Image ÷ Pre-Image (New ÷ Old). Verify whether the image expanded (k > 1) or shrunk (0 < k < 1).',
    visualData: {
      type: 'scale-factor-geometry',
      scaleFactorGeometryData: {
        category: 'triangles',
        preImageTitle: `△${triOrig} (Pre-Image)`,
        imageTitle: `△${triPrime} (Image)`,
        unit,
        scaleFactor: chosenK.k,
        preImageDimensions: [
          { label: 'Base', value: basePre, position: 'bottom' },
          { label: 'Side', value: legPre, position: 'left' },
        ],
        imageDimensions: [
          { label: 'Base', value: baseImg, position: 'bottom' },
          { label: 'Side', value: legImg, position: 'left' },
        ],
      },
    },
  };
}

// 1C. Rectangle Scale Factor: Dimensions L x W -> L' x W'
function generateRectangleScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  const unit = randomChoice(['cm', 'in', 'ft', 'm']);

  let lengthPre = 8;
  let widthPre = 4;

  if (chosenK.k === 2) {
    lengthPre = randomChoice([5, 6, 7]);
    widthPre = randomChoice([3, 4]);
  } else if (chosenK.k === 2.5) {
    lengthPre = randomChoice([6, 8]);
    widthPre = randomChoice([4, 6]);
  } else if (chosenK.k === 3) {
    lengthPre = randomChoice([4, 5]);
    widthPre = randomChoice([2, 3]);
  } else if (chosenK.k === 4) {
    lengthPre = randomChoice([3, 4]);
    widthPre = randomChoice([2, 3]);
  } else if (chosenK.k === 1.5) {
    lengthPre = randomChoice([6, 8]);
    widthPre = randomChoice([4, 6]);
  } else if (chosenK.k === 0.5) {
    lengthPre = randomChoice([12, 14, 16]);
    widthPre = randomChoice([6, 8, 10]);
  } else if (chosenK.k === 0.25) {
    lengthPre = randomChoice([16, 20]);
    widthPre = randomChoice([8, 12]);
  } else if (chosenK.k === 0.75) {
    lengthPre = randomChoice([12, 16]);
    widthPre = randomChoice([8, 12]);
  }

  const lengthImg = Number((lengthPre * chosenK.k).toFixed(2));
  const widthImg = Number((widthPre * chosenK.k).toFixed(2));

  const additiveDiff = Number(Math.abs(lengthImg - lengthPre).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  return {
    id: `sf-rect-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `Rectangle A'B'C'D' is a dilation of rectangle ABCD. The pre-image rectangle has a length of ${lengthPre} ${unit} and a width of ${widthPre} ${unit}. The dilated image rectangle has a length of ${lengthImg} ${unit} and a width of ${widthImg} ${unit}. What scale factor k was applied to produce the image?`,
    options,
    correctIndex,
    hint: `Calculate scale factor k by dividing any dilated image dimension by its corresponding pre-image dimension: k = (Image Dimension) ÷ (Pre-Image Dimension). Use length (${lengthImg} ÷ ${lengthPre}) or width (${widthImg} ÷ ${widthPre}).`,
    solutionSteps: [
      `Identify the pre-image dimensions: Length = ${lengthPre} ${unit}, Width = ${widthPre} ${unit}.`,
      `Identify the corresponding image dimensions: Length = ${lengthImg} ${unit}, Width = ${widthImg} ${unit}.`,
      `Apply the scale factor ratio: k = (Image Length) / (Pre-Image Length) = ${lengthImg} / ${lengthPre}.`,
      `Calculate: ${lengthImg} ÷ ${lengthPre} = ${chosenK.k}. (Confirm with width: ${widthImg} ÷ ${widthPre} = ${chosenK.k}).`,
      `Classification: Since ${chosenK.k} ${chosenK.isEnlarge ? '> 1, the image is an enlargement' : '< 1, the image is a reduction'}.`,
    ],
    keyTakeaway: 'Corresponding sides of similar rectangles share the exact same ratio: k = Image Dimension ÷ Pre-Image Dimension.',
    visualData: {
      type: 'scale-factor-geometry',
      scaleFactorGeometryData: {
        category: 'rectangles',
        preImageTitle: 'Rectangle ABCD (Pre-Image)',
        imageTitle: "Rectangle A'B'C'D' (Image)",
        unit,
        scaleFactor: chosenK.k,
        preImageDimensions: [
          { label: 'Length', value: lengthPre, position: 'bottom' },
          { label: 'Width', value: widthPre, position: 'left' },
        ],
        imageDimensions: [
          { label: 'Length', value: lengthImg, position: 'bottom' },
          { label: 'Width', value: widthImg, position: 'left' },
        ],
      },
    },
  };
}

// 1D. Polygon / Geometric Figure Scale Factor
function generatePolygonScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  const unit = randomChoice(['cm', 'in', 'm', 'units']);
  const shapeType = randomChoice(['trapezoid', 'parallelogram', 'l-shape'] as const);

  let side1Pre = 8;
  let side2Pre = 4;
  let side1Name = 'bottom base';
  let side2Name = 'top base';

  if (shapeType === 'trapezoid') {
    side1Name = 'bottom base';
    side2Name = 'top base';
    if (chosenK.k === 2) { side1Pre = 8; side2Pre = 4; }
    else if (chosenK.k === 2.5) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 3) { side1Pre = 4; side2Pre = 2; }
    else if (chosenK.k === 4) { side1Pre = 3; side2Pre = 2; }
    else if (chosenK.k === 1.5) { side1Pre = 8; side2Pre = 4; }
    else if (chosenK.k === 0.5) { side1Pre = 12; side2Pre = 6; }
    else if (chosenK.k === 0.25) { side1Pre = 16; side2Pre = 8; }
    else if (chosenK.k === 0.75) { side1Pre = 12; side2Pre = 8; }
  } else if (shapeType === 'parallelogram') {
    side1Name = 'base';
    side2Name = 'side';
    if (chosenK.k === 2) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 2.5) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 3) { side1Pre = 4; side2Pre = 3; }
    else if (chosenK.k === 4) { side1Pre = 3; side2Pre = 2; }
    else if (chosenK.k === 1.5) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 0.5) { side1Pre = 10; side2Pre = 6; }
    else if (chosenK.k === 0.25) { side1Pre = 16; side2Pre = 12; }
    else if (chosenK.k === 0.75) { side1Pre = 12; side2Pre = 8; }
  } else {
    // L-shape
    side1Name = 'total width';
    side2Name = 'total height';
    if (chosenK.k === 2) { side1Pre = 5; side2Pre = 4; }
    else if (chosenK.k === 2.5) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 3) { side1Pre = 3; side2Pre = 2; }
    else if (chosenK.k === 4) { side1Pre = 3; side2Pre = 2; }
    else if (chosenK.k === 1.5) { side1Pre = 6; side2Pre = 4; }
    else if (chosenK.k === 0.5) { side1Pre = 12; side2Pre = 8; }
    else if (chosenK.k === 0.25) { side1Pre = 16; side2Pre = 12; }
    else if (chosenK.k === 0.75) { side1Pre = 12; side2Pre = 8; }
  }

  const side1Img = Number((side1Pre * chosenK.k).toFixed(2));
  const side2Img = Number((side2Pre * chosenK.k).toFixed(2));

  const additiveDiff = Number(Math.abs(side1Img - side1Pre).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  const shapeTitle = shapeType === 'trapezoid' ? 'trapezoid' : shapeType === 'parallelogram' ? 'parallelogram' : 'geometric polygon';

  return {
    id: `sf-poly-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `Figure 2 is a dilation of Figure 1 (${shapeTitle}). In Figure 1 (pre-image), the ${side1Name} measures ${side1Pre} ${unit} and the ${side2Name} measures ${side2Pre} ${unit}. In Figure 2 (dilated image), the corresponding ${side1Name} measures ${side1Img} ${unit} and the ${side2Name} measures ${side2Img} ${unit}. What is the scale factor k of this dilation?`,
    options,
    correctIndex,
    hint: `To find the scale factor of similar polygons, divide any side length of the dilated image by the corresponding side length of the pre-image: k = (Image Side) ÷ (Pre-Image Side). Divide ${side1Img} by ${side1Pre}.`,
    solutionSteps: [
      `Identify the pre-image measurement: ${side1Name} = ${side1Pre} ${unit}.`,
      `Identify the corresponding dilated image measurement: ${side1Name} = ${side1Img} ${unit}.`,
      `Apply the scale factor ratio: k = (Image Side) / (Pre-Image Side) = ${side1Img} / ${side1Pre}.`,
      `Simplify: ${side1Img} ÷ ${side1Pre} = ${chosenK.k}. (Check second side: ${side2Img} ÷ ${side2Pre} = ${chosenK.k}).`,
      `Conclusion: Because ${chosenK.k} ${chosenK.isEnlarge ? '> 1, Figure 2 is an enlargement' : '< 1, Figure 2 is a reduction'}.`,
    ],
    keyTakeaway: 'Scale factor connects corresponding sides of similar polygons through multiplication: Image = k × Pre-Image.',
    visualData: {
      type: 'scale-factor-geometry',
      scaleFactorGeometryData: {
        category: 'polygons',
        preImageTitle: 'Figure 1 (Pre-Image)',
        imageTitle: 'Figure 2 (Dilated Image)',
        unit,
        scaleFactor: chosenK.k,
        polygonType: shapeType,
        preImageDimensions: [
          { label: side1Name === 'bottom base' ? 'Base 1' : side1Name === 'base' ? 'Base' : 'Width', value: side1Pre, position: 'bottom' },
          { label: side2Name === 'top base' ? 'Base 2' : side2Name === 'side' ? 'Side' : 'Height', value: side2Pre, position: 'top' },
        ],
        imageDimensions: [
          { label: side1Name === 'bottom base' ? 'Base 1' : side1Name === 'base' ? 'Base' : 'Width', value: side1Img, position: 'bottom' },
          { label: side2Name === 'top base' ? 'Base 2' : side2Name === 'side' ? 'Side' : 'Height', value: side2Img, position: 'top' },
        ],
      },
    },
  };
}

// 1E. Coordinate-Plane Figure Scale Factor: Multi-vertex shape on coordinate grid
function generateCoordinatePlaneFigureScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  const triName = randomChoice(['ABC', 'JKL', 'RST']);
  const [vA, vB, vC] = triName.split('');

  // Define pre-image right triangle coordinates with base on horizontal and leg on vertical
  let ax = 1;
  let ay = 1;
  let bx = 4;
  let by = 1;
  let cx = 1;
  let cy = 3;

  if (chosenK.k === 2) {
    ax = 1; ay = 1; bx = 4; by = 1; cx = 1; cy = 3;
  } else if (chosenK.k === 2.5) {
    ax = 2; ay = 2; bx = 4; by = 2; cx = 2; cy = 4;
  } else if (chosenK.k === 3) {
    ax = 1; ay = 1; bx = 3; by = 1; cx = 1; cy = 2;
  } else if (chosenK.k === 4) {
    ax = 1; ay = 1; bx = 2; by = 1; cx = 1; cy = 2;
  } else if (chosenK.k === 1.5) {
    ax = 2; ay = 2; bx = 6; by = 2; cx = 2; cy = 4;
  } else if (chosenK.k === 0.5) {
    ax = 2; ay = 2; bx = 8; by = 2; cx = 2; cy = 6;
  } else if (chosenK.k === 0.25) {
    ax = 4; ay = 4; bx = 12; by = 4; cx = 4; cy = 8;
  } else if (chosenK.k === 0.75) {
    ax = 4; ay = 4; bx = 12; by = 4; cx = 4; cy = 8;
  }

  const basePre = Math.abs(bx - ax);
  const heightPre = Math.abs(cy - ay);

  const apx = Number((ax * chosenK.k).toFixed(2));
  const apy = Number((ay * chosenK.k).toFixed(2));
  const bpx = Number((bx * chosenK.k).toFixed(2));
  const bpy = Number((by * chosenK.k).toFixed(2));
  const cpx = Number((cx * chosenK.k).toFixed(2));
  const cpy = Number((cy * chosenK.k).toFixed(2));

  const baseImg = Math.abs(bpx - apx);

  const additiveDiff = Number(Math.abs(baseImg - basePre).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  const maxCoordX = Math.max(bx, bpx);
  const maxCoordY = Math.max(cy, cpy);

  return {
    id: `sf-cfig-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `On the coordinate grid, triangle ${vA}'${vB}'${vC}' is a dilation of triangle ${vA}${vB}${vC} with the origin (0, 0) as the center of dilation. Pre-image vertex ${vA} is at (${ax}, ${ay}) and image vertex ${vA}' is at (${apx}, ${apy}). Pre-image horizontal side ${vA}${vB} has a length of ${basePre} units, and image side ${vA}'${vB}' has a length of ${baseImg} units. What is the scale factor k of this dilation?`,
    options,
    correctIndex,
    hint: `You can find the scale factor k by dividing any image vertex coordinate by its corresponding pre-image vertex coordinate: k = (Image Coordinate) ÷ (Pre-Image Coordinate) = ${apx} ÷ ${ax}, or by dividing the corresponding side lengths: k = (Image Side) ÷ (Pre-Image Side) = ${baseImg} ÷ ${basePre}.`,
    solutionSteps: [
      `Identify the pre-image vertex: ${vA}(${ax}, ${ay}) and horizontal side length ${vA}${vB} = ${basePre} units.`,
      `Identify the corresponding image vertex: ${vA}'(${apx}, ${apy}) and horizontal side length ${vA}'${vB}' = ${baseImg} units.`,
      `Method 1 (Coordinates): k = x' / x = ${apx} / ${ax} = ${chosenK.k}.`,
      `Method 2 (Side Lengths): k = (Image Side) / (Pre-Image Side) = ${baseImg} / ${basePre} = ${chosenK.k}.`,
      `Classification: Since ${chosenK.k} ${chosenK.isEnlarge ? '> 1, the dilation is an enlargement' : '< 1, the dilation is a reduction'}.`,
    ],
    keyTakeaway: 'On a coordinate plane centered at the origin, scale factor k applies equally to all vertex coordinates (x, y) → (kx, ky) and all side lengths.',
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: [
          { x: ax, y: ay, label: `${vA}(${ax}, ${ay})` },
          { x: bx, y: by, label: `${vB}(${bx}, ${by})` },
          { x: cx, y: cy, label: `${vC}(${cx}, ${cy})` },
        ],
        image: [
          { x: apx, y: apy, label: `${vA}'(${apx}, ${apy})` },
          { x: bpx, y: bpy, label: `${vB}'(${bpx}, ${bpy})` },
          { x: cpx, y: cpy, label: `${vC}'(${cpx}, ${cpy})` },
        ],
        scaleFactor: chosenK.k,
        showRays: true,
        minX: -1,
        maxX: Math.max(10, Math.ceil(maxCoordX + 2)),
        minY: -1,
        maxY: Math.max(10, Math.ceil(maxCoordY + 2)),
      },
    },
  };
}

// 1F. Real-World Context Scale Factor
interface RealWorldScenario {
  type: 'photo' | 'blueprint' | 'model' | 'poster' | 'map';
  contextLabel: string;
  description: string;
  preLabel: string;
  imgLabel: string;
  unit: string;
  getDimensions: (k: number) => { preDim: number; imgDim: number; dimName: string };
}

const REAL_WORLD_SCENARIOS: RealWorldScenario[] = [
  {
    type: 'photo',
    contextLabel: 'Photograph Enlargement',
    description: 'An art student dilates a wallet photograph to create a framed gallery print.',
    preLabel: 'Original Photo (Pre-Image)',
    imgLabel: 'Framed Print (Dilated Image)',
    unit: 'inches',
    getDimensions: (k) => {
      let preDim = 4;
      if (k === 2) preDim = 5;
      else if (k === 2.5) preDim = 4;
      else if (k === 3) preDim = 3;
      else if (k === 4) preDim = 2;
      else if (k === 1.5) preDim = 6;
      else if (k === 0.5) preDim = 10;
      else if (k === 0.25) preDim = 16;
      else if (k === 0.75) preDim = 12;
      return { preDim, imgDim: Number((preDim * k).toFixed(2)), dimName: 'width' };
    },
  },
  {
    type: 'blueprint',
    contextLabel: 'Architectural Blueprint',
    description: 'An architect scales a floorplan feature for an exhibition display model.',
    preLabel: 'Blueprint Plan (Pre-Image)',
    imgLabel: 'Display Model (Dilated Image)',
    unit: 'cm',
    getDimensions: (k) => {
      let preDim = 6;
      if (k === 2) preDim = 6;
      else if (k === 2.5) preDim = 6;
      else if (k === 3) preDim = 4;
      else if (k === 4) preDim = 3;
      else if (k === 1.5) preDim = 8;
      else if (k === 0.5) preDim = 14;
      else if (k === 0.25) preDim = 16;
      else if (k === 0.75) preDim = 12;
      return { preDim, imgDim: Number((preDim * k).toFixed(2)), dimName: 'length' };
    },
  },
  {
    type: 'model',
    contextLabel: 'Museum Scale Model',
    description: 'A museum curator constructs a scaled replica model of an aerospace vehicle.',
    preLabel: 'Full Vehicle (Pre-Image)',
    imgLabel: 'Scale Model (Dilated Image)',
    unit: 'meters',
    getDimensions: (k) => {
      let preDim = 8;
      if (k === 2) preDim = 4;
      else if (k === 2.5) preDim = 4;
      else if (k === 3) preDim = 3;
      else if (k === 4) preDim = 2;
      else if (k === 1.5) preDim = 6;
      else if (k === 0.5) preDim = 12;
      else if (k === 0.25) preDim = 16;
      else if (k === 0.75) preDim = 12;
      return { preDim, imgDim: Number((preDim * k).toFixed(2)), dimName: 'wing span' };
    },
  },
  {
    type: 'poster',
    contextLabel: 'Concert Poster Print',
    description: 'A graphic designer enlarges a digital album sketch into a street promotional poster.',
    preLabel: 'Original Sketch (Pre-Image)',
    imgLabel: 'Wall Poster (Dilated Image)',
    unit: 'inches',
    getDimensions: (k) => {
      let preDim = 6;
      if (k === 2) preDim = 8;
      else if (k === 2.5) preDim = 6;
      else if (k === 3) preDim = 6;
      else if (k === 4) preDim = 4;
      else if (k === 1.5) preDim = 8;
      else if (k === 0.5) preDim = 14;
      else if (k === 0.25) preDim = 16;
      else if (k === 0.75) preDim = 12;
      return { preDim, imgDim: Number((preDim * k).toFixed(2)), dimName: 'width' };
    },
  },
  {
    type: 'map',
    contextLabel: 'Transit Map Guide',
    description: 'A city transit department creates a dilated pocket guide from a regional map.',
    preLabel: 'Regional Map (Pre-Image)',
    imgLabel: 'Pocket Guide (Dilated Image)',
    unit: 'cm',
    getDimensions: (k) => {
      let preDim = 8;
      if (k === 2) preDim = 5;
      else if (k === 2.5) preDim = 4;
      else if (k === 3) preDim = 4;
      else if (k === 4) preDim = 2;
      else if (k === 1.5) preDim = 6;
      else if (k === 0.5) preDim = 12;
      else if (k === 0.25) preDim = 16;
      else if (k === 0.75) preDim = 12;
      return { preDim, imgDim: Number((preDim * k).toFixed(2)), dimName: 'route segment' };
    },
  },
];

function generateRealWorldScaleFactor(): PracticeProblem {
  const chosenK = randomChoice(SCALE_FACTOR_K_POOL);
  const scenario = randomChoice(REAL_WORLD_SCENARIOS);
  const { preDim, imgDim, dimName } = scenario.getDimensions(chosenK.k);

  const additiveDiff = Number(Math.abs(imgDim - preDim).toFixed(1));
  const { options, correctIndex } = buildScaleFactorOptions(chosenK, additiveDiff);

  return {
    id: `sf-rw-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-factor',
    skillTitle: 'Scale Factor (k = Image / Pre-Image)',
    difficulty: chosenK.isEnlarge ? 'Standard' : 'Challenge',
    question: `${scenario.description} In the original pre-image, the ${dimName} measures ${preDim} ${scenario.unit}. In the dilated image, the corresponding ${dimName} measures ${imgDim} ${scenario.unit}. What scale factor k was applied to the original to create the dilated image?`,
    options,
    correctIndex,
    hint: `Scale factor k in real-world applications is always the dilated image measurement divided by the original pre-image measurement: k = (Dilated Image) ÷ (Original Pre-Image). Divide ${imgDim} by ${preDim}.`,
    solutionSteps: [
      `Identify the original pre-image measurement: ${preDim} ${scenario.unit}.`,
      `Identify the dilated image measurement: ${imgDim} ${scenario.unit}.`,
      `Apply the scale factor formula: k = (Image Measurement) / (Pre-Image Measurement) = ${imgDim} / ${preDim}.`,
      `Divide: ${imgDim} ÷ ${preDim} = ${chosenK.k}.`,
      `Classification: Since ${chosenK.k} ${chosenK.isEnlarge ? '> 1, this represents an enlargement dilation' : '< 1, this represents a reduction dilation'}.`,
    ],
    keyTakeaway: 'In any real-world dilation, always compute: k = Dilated Measurement ÷ Original Measurement.',
    visualData: {
      type: 'scale-factor-geometry',
      scaleFactorGeometryData: {
        category: 'real-world',
        preImageTitle: scenario.preLabel,
        imageTitle: scenario.imgLabel,
        unit: scenario.unit,
        scaleFactor: chosenK.k,
        realWorldContext: {
          type: scenario.type,
          contextLabel: scenario.contextLabel,
          description: scenario.description,
        },
        preImageDimensions: [
          { label: dimName.charAt(0).toUpperCase() + dimName.slice(1), value: preDim, position: 'bottom' },
        ],
        imageDimensions: [
          { label: dimName.charAt(0).toUpperCase() + dimName.slice(1), value: imgDim, position: 'bottom' },
        ],
      },
    },
  };
}

// Master Scale Factor Generator: Rotates across 6 distinct representations
function generateScaleFactorProblem(): PracticeProblem {
  const allTypes: ScaleFactorProblemType[] = [
    'coordinate-point',
    'triangle-side',
    'rectangle-dimensions',
    'polygon-similarity',
    'coordinate-plane-figure',
    'real-world',
  ];

  // Strictly avoid repeating the immediately previous representation
  const candidateTypes = allTypes.filter((t) => t !== lastScaleFactorType);
  const chosenType = randomChoice(candidateTypes);
  lastScaleFactorType = chosenType;

  switch (chosenType) {
    case 'coordinate-point':
      return generateCoordinatePointScaleFactor();
    case 'triangle-side':
      return generateTriangleSideScaleFactor();
    case 'rectangle-dimensions':
      return generateRectangleScaleFactor();
    case 'polygon-similarity':
      return generatePolygonScaleFactor();
    case 'coordinate-plane-figure':
      return generateCoordinatePlaneFigureScaleFactor();
    case 'real-world':
      return generateRealWorldScaleFactor();
    default:
      return generateCoordinatePointScaleFactor();
  }
}

// ==========================================
// 2. ENLARGEMENT & REDUCTION GENERATOR
// ==========================================
function generateEnlargementReductionProblem(): PracticeProblem {
  const scenarioType = randomChoice(['classify-k', 'identify-change', 'fraction-compare']);

  if (scenarioType === 'classify-k') {
    const isEnlargementTarget = Math.random() > 0.5;
    const enlargements = ['k = 5/3', 'k = 1.45', 'k = 9/8', 'k = 3.2', 'k = 7/2'];
    const reductions = ['k = 3/4', 'k = 0.85', 'k = 2/5', 'k = 5/8', 'k = 0.6'];

    const correct = isEnlargementTarget ? randomChoice(enlargements) : randomChoice(reductions);
    const pool = isEnlargementTarget ? reductions : enlargements;
    const { options, correctIndex } = shuffleOptions(correct, pool);

    return {
      id: `er-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'enlargement-reduction',
      skillTitle: 'Enlargement vs. Reduction',
      difficulty: 'Standard',
      question: isEnlargementTarget
        ? 'Which of the following scale factors will produce an ENLARGEMENT (an image larger than the pre-image)?'
        : 'Which of the following scale factors will produce a REDUCTION (an image smaller than the pre-image)?',
      options,
      correctIndex,
      hint: isEnlargementTarget
        ? 'An enlargement requires a scale factor k strictly greater than 1 (k > 1). Convert fractions to decimals or check if the numerator is greater than the denominator.'
        : 'A reduction requires a scale factor k strictly between 0 and 1 (0 < k < 1). Look for a fraction where the numerator is smaller than the denominator, or a decimal less than 1.0.',
      solutionSteps: [
        isEnlargementTarget
          ? 'Rule for Enlargements: k > 1. The image becomes larger than the original figure.'
          : 'Rule for Reductions: 0 < k < 1. The image becomes smaller than the original figure.',
        `Analyzing ${correct}: Since it is ${isEnlargementTarget ? 'greater than 1' : 'less than 1'}, it produces a ${isEnlargementTarget ? 'larger enlargement' : 'smaller reduction'}.`,
        'All other choices fall into the opposite category.',
      ],
      keyTakeaway:
        'If k > 1, the figure expands (enlargement). If 0 < k < 1, the figure contracts (reduction). If k = 1, size is unchanged (congruent).',
      visualData: {
        type: 'similar-triangles',
        similarTrianglesData: {
          triangleA: {
            name: 'Original △ABC',
            angles: [40, 60, 80],
            sides: [6, 8, 10],
          },
          triangleB: {
            name: isEnlargementTarget ? "Enlarged △A'B'C' (k > 1)" : "Reduced △A'B'C' (k < 1)",
            angles: [40, 60, 80],
            sides: isEnlargementTarget ? [12, 16, 20] : [3, 4, 5],
          },
          scaleFactor: isEnlargementTarget ? 2 : 0.5,
        },
      },
    };
  } else {
    // identify size change under rule (x, y) -> (0.4x, 0.4y) etc.
    const k = randomChoice([0.35, 0.6, 0.8, 1.6, 2.2, 3.5]);
    const isEnlarge = k > 1;
    const correct = isEnlarge
      ? `The image is an enlargement similar to the pre-image because k = ${k} > 1.`
      : `The image is a reduction similar to the pre-image because 0 < k = ${k} < 1.`;
    const distractor1 = isEnlarge
      ? `The image is a reduction similar to the pre-image because k = ${k}.`
      : `The image is an enlargement similar to the pre-image because k = ${k}.`;
    const distractor2 = `The image is congruent to the pre-image because shape is preserved.`;
    const distractor3 = `The image is translated ${k} units diagonally across the grid.`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractor1,
      distractor2,
      distractor3,
    ]);

    return {
      id: `er-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'enlargement-reduction',
      skillTitle: 'Enlargement vs. Reduction',
      difficulty: 'Standard',
      question: `A polygon on a coordinate grid is transformed according to the algebraic rule (x, y) → (${k}x, ${k}y). Which statement accurately describes the resulting image?`,
      options,
      correctIndex,
      hint: `Check the multiplier ${k}. Is it greater than 1 or between 0 and 1? Also remember dilations create similar figures, not congruent figures (unless k = 1).`,
      solutionSteps: [
        `The transformation multiplies both x and y by ${k}. This is a dilation with scale factor k = ${k}.`,
        `Examine the value of k: ${k} is ${isEnlarge ? 'greater than 1' : 'between 0 and 1'}.`,
        `Therefore, the transformation results in a ${isEnlarge ? 'enlargement' : 'reduction'} that is similar to the original polygon.`,
      ],
      keyTakeaway:
        'Multiplying both coordinates by k produces similar figures: k > 1 yields an enlargement; 0 < k < 1 yields a reduction.',
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage: [
            { x: 2, y: 2, label: 'A(2, 2)' },
            { x: 5, y: 2, label: 'B(5, 2)' },
            { x: 2, y: 6, label: 'C(2, 6)' },
          ],
          image: [
            { x: 2 * k, y: 2 * k, label: `A'` },
            { x: 5 * k, y: 2 * k, label: `B'` },
            { x: 2 * k, y: 6 * k, label: `C'` },
          ],
          scaleFactor: k,
          showRays: true,
        },
      },
    };
  }
}

// ==========================================
// 3. DILATION CENTERED AT ORIGIN (0, 0)
// ==========================================

// TYPE 1: POINT DILATION (20% distribution)
function generateOriginPointProblem(forcedK?: { k: number; label: string }): PracticeProblem {
  const kOptions = [
    { k: 2, label: '2' },
    { k: 3, label: '3' },
    { k: 0.5, label: '1/2' },
    { k: 1.5, label: '1.5' },
    { k: 0.25, label: '1/4' },
  ];
  const chosen = forcedK || randomChoice(kOptions);

  let px: number;
  let py: number;
  if (chosen.k === 0.5) {
    px = randomChoice([-6, -4, -2, 2, 4, 6, 8]);
    py = randomChoice([-8, -6, -4, 2, 4, 6, 8]);
  } else if (chosen.k === 0.25) {
    px = randomChoice([-8, -4, 4, 8, 12]);
    py = randomChoice([-8, -4, 4, 8, 12]);
  } else if (chosen.k === 1.5) {
    px = randomChoice([-4, -2, 2, 4, 6]);
    py = randomChoice([-6, -4, 2, 4, 6]);
  } else {
    // k = 2 or 3
    px = randomChoice([-4, -3, -2, 2, 3, 4, 5]);
    py = randomChoice([-5, -4, -3, 2, 3, 4, 6]);
  }

  // MATHEMATICAL RULE: x' = k * x, y' = k * y calculated programmatically
  const ix = Number((px * chosen.k).toFixed(2));
  const iy = Number((py * chosen.k).toFixed(2));

  const pointName = randomChoice(['V', 'P', 'M', 'W', 'K']);

  const correct = `(${ix}, ${iy})`;
  const distractor1 = `(${px + chosen.k}, ${py + chosen.k})`; // added instead of multiplied
  const distractor2 = `(${ix}, ${-iy})`; // inverted sign
  const divX = Number((px / chosen.k).toFixed(1));
  const divY = Number((py / chosen.k).toFixed(1));
  const distractor3 = `(${divX}, ${divY})`; // divided instead of multiplied
  const distractor4 = `(${iy}, ${ix})`; // swapped

  const { options, correctIndex } = shuffleOptions(correct, [
    distractor1,
    distractor2,
    distractor3,
    distractor4,
  ]);

  const preImageVertices = [{ x: px, y: py, label: `${pointName}(${px}, ${py})` }];
  const imageVertices = [{ x: ix, y: iy, label: `${pointName}'(${ix}, ${iy})` }];

  return {
    id: `od-pt-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'origin-dilation',
    skillTitle: 'Dilations Centered at the Origin (0, 0)',
    difficulty: 'Standard',
    geometryType: 'point',
    scaleFactor: chosen.k,
    center: { x: 0, y: 0 },
    preImageVertices,
    imageVertices,
    question: `Point ${pointName}(${px}, ${py}) is dilated by a scale factor of k = ${chosen.label} with the origin (0, 0) as the center of dilation. What are the coordinates of the image point ${pointName}'?`,
    options,
    correctIndex,
    hint: `For a dilation centered at the origin, multiply BOTH coordinates by the scale factor: (x, y) → (kx, ky). Calculate ${px} × ${chosen.label} and ${py} × ${chosen.label}.`,
    solutionSteps: [
      `Use the coordinate dilation rule centered at the origin: (x, y) → (kx, ky).`,
      `Substitute x = ${px}, y = ${py}, and k = ${chosen.label}.`,
      `New x-coordinate: x' = ${px} · ${chosen.label} = ${ix}.`,
      `New y-coordinate: y' = ${py} · ${chosen.label} = ${iy}.`,
      `The dilated coordinates of ${pointName}' are (${ix}, ${iy}).`,
    ],
    keyTakeaway:
      'Origin dilation formula: (x, y) → (kx, ky). Multiply each coordinate directly by scale factor k.',
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'point',
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: chosen.k,
        showRays: true,
      },
    },
  };
}

// TYPE 2: TRIANGLE DILATION (50% distribution)
function generateOriginTriangleProblem(forcedK?: { k: number; label: string }): PracticeProblem {
  const kOptions = [
    { k: 2, label: '2' },
    { k: 3, label: '3' },
    { k: 0.5, label: '1/2' },
    { k: 1.5, label: '1.5' },
    { k: 0.25, label: '1/4' },
  ];
  const chosen = forcedK || randomChoice(kOptions);

  type RawVertex = { name: string; x: number; y: number };
  let templates: RawVertex[][];

  if (chosen.k === 0.5) {
    templates = [
      // Right triangle (User's example: A(2,2), B(6,2), C(2,6))
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 6, y: 2 },
        { name: 'C', x: 2, y: 6 },
      ],
      [
        { name: 'A', x: -4, y: 2 },
        { name: 'B', x: 2, y: 2 },
        { name: 'C', x: -1, y: 6 },
      ],
      [
        { name: 'A', x: 2, y: 4 },
        { name: 'B', x: 8, y: 4 },
        { name: 'C', x: 4, y: 10 },
      ],
      [
        { name: 'A', x: -2, y: -2 },
        { name: 'B', x: 4, y: -2 },
        { name: 'C', x: 0, y: 4 },
      ],
      [
        { name: 'A', x: 4, y: 2 },
        { name: 'B', x: 10, y: 2 },
        { name: 'C', x: 4, y: 8 },
      ],
      [
        { name: 'A', x: -4, y: -2 },
        { name: 'B', x: -2, y: -2 },
        { name: 'C', x: -4, y: 4 },
      ],
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 8, y: 2 },
        { name: 'C', x: 5, y: 6 },
      ],
    ];
  } else if (chosen.k === 0.25) {
    templates = [
      [
        { name: 'A', x: 4, y: 4 },
        { name: 'B', x: 12, y: 4 },
        { name: 'C', x: 4, y: 12 },
      ],
      [
        { name: 'A', x: -4, y: 4 },
        { name: 'B', x: 8, y: 4 },
        { name: 'C', x: 0, y: 12 },
      ],
      [
        { name: 'A', x: 4, y: 8 },
        { name: 'B', x: 16, y: 8 },
        { name: 'C', x: 8, y: 16 },
      ],
      [
        { name: 'A', x: 8, y: 4 },
        { name: 'B', x: 16, y: 4 },
        { name: 'C', x: 8, y: 12 },
      ],
    ];
  } else if (chosen.k === 1.5) {
    templates = [
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 6, y: 2 },
        { name: 'C', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: -2, y: 2 },
        { name: 'B', x: 4, y: 2 },
        { name: 'C', x: 0, y: 6 },
      ],
      [
        { name: 'A', x: 4, y: 2 },
        { name: 'B', x: 8, y: 2 },
        { name: 'C', x: 4, y: 6 },
      ],
    ];
  } else if (chosen.k === 3) {
    templates = [
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 3, y: 1 },
        { name: 'C', x: 1, y: 3 },
      ],
      [
        { name: 'A', x: -1, y: 1 },
        { name: 'B', x: 2, y: 1 },
        { name: 'C', x: 0, y: 3 },
      ],
      [
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 3, y: 2 },
        { name: 'C', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: 2, y: 1 },
        { name: 'B', x: 4, y: 1 },
        { name: 'C', x: 2, y: 3 },
      ],
    ];
  } else {
    // k = 2
    templates = [
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 4, y: 1 },
        { name: 'C', x: 1, y: 4 },
      ],
      [
        { name: 'A', x: 2, y: 1 },
        { name: 'B', x: 5, y: 1 },
        { name: 'C', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: -2, y: 1 },
        { name: 'B', x: 3, y: 1 },
        { name: 'C', x: 0, y: 4 },
      ],
      [
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 4, y: 2 },
        { name: 'C', x: 2, y: 5 },
      ],
      [
        { name: 'A', x: -1, y: -1 },
        { name: 'B', x: 3, y: -1 },
        { name: 'C', x: 1, y: 3 },
      ],
      [
        { name: 'A', x: -3, y: 1 },
        { name: 'B', x: 1, y: 1 },
        { name: 'C', x: -1, y: 4 },
      ],
    ];
  }

  const rawVertices = randomChoice(templates);

  // MATHEMATICAL RULE: x' = k * x, y' = k * y calculated programmatically
  const imageRawVertices = rawVertices.map((v) => ({
    name: `${v.name}'`,
    x: Number((v.x * chosen.k).toFixed(2)),
    y: Number((v.y * chosen.k).toFixed(2)),
  }));

  // Target vertex to solve for
  const targetIdx = randomInt(0, rawVertices.length - 1);
  const targetPre = rawVertices[targetIdx];
  const targetImg = imageRawVertices[targetIdx];

  const correct = `(${targetImg.x}, ${targetImg.y})`;
  const distractor1 = `(${targetPre.x + chosen.k}, ${targetPre.y + chosen.k})`; // added k
  const otherImg = imageRawVertices[(targetIdx + 1) % imageRawVertices.length];
  const distractor2 = `(${otherImg.x}, ${otherImg.y})`; // wrong vertex
  const divX = Number((targetPre.x / chosen.k).toFixed(1));
  const divY = Number((targetPre.y / chosen.k).toFixed(1));
  const distractor3 = `(${divX}, ${divY})`; // divided by k
  const distractor4 = `(${targetImg.x}, ${-targetImg.y})`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractor1,
    distractor2,
    distractor3,
    distractor4,
  ]);

  const preImageVertices = rawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const imageVertices = imageRawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const vertsListStr = rawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');

  return {
    id: `od-tri-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'origin-dilation',
    skillTitle: 'Dilations Centered at the Origin (0, 0)',
    difficulty: 'Standard',
    geometryType: 'triangle',
    scaleFactor: chosen.k,
    center: { x: 0, y: 0 },
    preImageVertices,
    imageVertices,
    question: `Triangle ABC has vertices ${vertsListStr}. The triangle is dilated by a scale factor of k = ${chosen.label} with the origin (0, 0) as the center of dilation. What are the coordinates of the image vertex ${targetImg.name}?`,
    options,
    correctIndex,
    hint: `For a dilation centered at the origin, multiply BOTH coordinates of vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) by the scale factor k = ${chosen.label}: (x, y) → (kx, ky).`,
    solutionSteps: [
      `Use the coordinate dilation rule centered at the origin: (x, y) → (kx, ky).`,
      `Identify vertex ${targetPre.name}: x = ${targetPre.x}, y = ${targetPre.y}, and scale factor k = ${chosen.label}.`,
      `New x-coordinate: x' = ${targetPre.x} · ${chosen.label} = ${targetImg.x}.`,
      `New y-coordinate: y' = ${targetPre.y} · ${chosen.label} = ${targetImg.y}.`,
      `The dilated coordinates of ${targetImg.name} are (${targetImg.x}, ${targetImg.y}).`,
    ],
    keyTakeaway:
      'Origin dilation applies to every vertex: (x, y) → (kx, ky). Dilating all 3 vertices produces a similar triangle with proportional sides.',
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'triangle',
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: chosen.k,
        showRays: true,
      },
    },
  };
}

// TYPE 3: QUADRILATERAL DILATION (30% distribution)
function generateOriginQuadrilateralProblem(forcedK?: { k: number; label: string }): PracticeProblem {
  const kOptions = [
    { k: 2, label: '2' },
    { k: 3, label: '3' },
    { k: 0.5, label: '1/2' },
    { k: 1.5, label: '1.5' },
    { k: 0.25, label: '1/4' },
  ];
  const chosen = forcedK || randomChoice(kOptions);

  type RawVertex = { name: string; x: number; y: number };
  let templates: RawVertex[][];

  if (chosen.k === 2) {
    templates = [
      // Rectangle (User's exact example: A(-2,2), B(2,2), C(2,6), D(-2,6))
      [
        { name: 'A', x: -2, y: 2 },
        { name: 'B', x: 2, y: 2 },
        { name: 'C', x: 2, y: 6 },
        { name: 'D', x: -2, y: 6 },
      ],
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 4, y: 1 },
        { name: 'C', x: 4, y: 3 },
        { name: 'D', x: 1, y: 3 },
      ],
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 4, y: 1 },
        { name: 'C', x: 5, y: 4 },
        { name: 'D', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: -3, y: 1 },
        { name: 'B', x: 2, y: 1 },
        { name: 'C', x: 1, y: 4 },
        { name: 'D', x: -2, y: 4 },
      ],
      [
        { name: 'A', x: 2, y: 1 },
        { name: 'B', x: 5, y: 1 },
        { name: 'C', x: 5, y: 4 },
        { name: 'D', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: -1, y: -1 },
        { name: 'B', x: 2, y: -1 },
        { name: 'C', x: 2, y: 2 },
        { name: 'D', x: -1, y: 2 },
      ],
    ];
  } else if (chosen.k === 3) {
    templates = [
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 3, y: 1 },
        { name: 'C', x: 3, y: 3 },
        { name: 'D', x: 1, y: 3 },
      ],
      [
        { name: 'A', x: -1, y: 1 },
        { name: 'B', x: 2, y: 1 },
        { name: 'C', x: 2, y: 3 },
        { name: 'D', x: -1, y: 3 },
      ],
      [
        { name: 'A', x: 1, y: 1 },
        { name: 'B', x: 3, y: 1 },
        { name: 'C', x: 4, y: 3 },
        { name: 'D', x: 2, y: 3 },
      ],
    ];
  } else if (chosen.k === 0.5) {
    templates = [
      [
        { name: 'A', x: -2, y: 2 },
        { name: 'B', x: 2, y: 2 },
        { name: 'C', x: 2, y: 6 },
        { name: 'D', x: -2, y: 6 },
      ],
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 8, y: 2 },
        { name: 'C', x: 8, y: 6 },
        { name: 'D', x: 2, y: 6 },
      ],
      [
        { name: 'A', x: -4, y: 2 },
        { name: 'B', x: 4, y: 2 },
        { name: 'C', x: 2, y: 6 },
        { name: 'D', x: -2, y: 6 },
      ],
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 6, y: 2 },
        { name: 'C', x: 8, y: 6 },
        { name: 'D', x: 4, y: 6 },
      ],
      [
        { name: 'A', x: 4, y: 2 },
        { name: 'B', x: 10, y: 2 },
        { name: 'C', x: 10, y: 8 },
        { name: 'D', x: 4, y: 8 },
      ],
    ];
  } else if (chosen.k === 0.25) {
    templates = [
      [
        { name: 'A', x: 4, y: 4 },
        { name: 'B', x: 12, y: 4 },
        { name: 'C', x: 12, y: 8 },
        { name: 'D', x: 4, y: 8 },
      ],
      [
        { name: 'A', x: -4, y: 4 },
        { name: 'B', x: 4, y: 4 },
        { name: 'C', x: 4, y: 12 },
        { name: 'D', x: -4, y: 12 },
      ],
      [
        { name: 'A', x: 4, y: 4 },
        { name: 'B', x: 16, y: 4 },
        { name: 'C', x: 16, y: 12 },
        { name: 'D', x: 4, y: 12 },
      ],
    ];
  } else {
    // k = 1.5
    templates = [
      [
        { name: 'A', x: 2, y: 2 },
        { name: 'B', x: 6, y: 2 },
        { name: 'C', x: 6, y: 4 },
        { name: 'D', x: 2, y: 4 },
      ],
      [
        { name: 'A', x: -2, y: 2 },
        { name: 'B', x: 2, y: 2 },
        { name: 'C', x: 2, y: 4 },
        { name: 'D', x: -2, y: 4 },
      ],
    ];
  }

  const rawVertices = randomChoice(templates);

  // MATHEMATICAL RULE: x' = k * x, y' = k * y calculated programmatically
  const imageRawVertices = rawVertices.map((v) => ({
    name: `${v.name}'`,
    x: Number((v.x * chosen.k).toFixed(2)),
    y: Number((v.y * chosen.k).toFixed(2)),
  }));

  // Target vertex to solve for
  const targetIdx = randomInt(0, rawVertices.length - 1);
  const targetPre = rawVertices[targetIdx];
  const targetImg = imageRawVertices[targetIdx];

  const correct = `(${targetImg.x}, ${targetImg.y})`;
  const distractor1 = `(${targetPre.x + chosen.k}, ${targetPre.y + chosen.k})`; // added k
  const otherImg = imageRawVertices[(targetIdx + 1) % imageRawVertices.length];
  const distractor2 = `(${otherImg.x}, ${otherImg.y})`; // wrong vertex
  const divX = Number((targetPre.x / chosen.k).toFixed(1));
  const divY = Number((targetPre.y / chosen.k).toFixed(1));
  const distractor3 = `(${divX}, ${divY})`; // divided by k
  const distractor4 = `(${targetImg.x}, ${-targetImg.y})`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractor1,
    distractor2,
    distractor3,
    distractor4,
  ]);

  const preImageVertices = rawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const imageVertices = imageRawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const vertsListStr = rawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');

  return {
    id: `od-quad-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'origin-dilation',
    skillTitle: 'Dilations Centered at the Origin (0, 0)',
    difficulty: 'Standard',
    geometryType: 'quadrilateral',
    scaleFactor: chosen.k,
    center: { x: 0, y: 0 },
    preImageVertices,
    imageVertices,
    question: `Quadrilateral ABCD has vertices ${vertsListStr}. The quadrilateral is dilated by a scale factor of k = ${chosen.label} with the origin (0, 0) as the center of dilation. What are the coordinates of the image vertex ${targetImg.name}?`,
    options,
    correctIndex,
    hint: `For a dilation centered at the origin, multiply BOTH coordinates of vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) by the scale factor k = ${chosen.label}: (x, y) → (kx, ky).`,
    solutionSteps: [
      `Use the coordinate dilation rule centered at the origin: (x, y) → (kx, ky).`,
      `Identify vertex ${targetPre.name}: x = ${targetPre.x}, y = ${targetPre.y}, and scale factor k = ${chosen.label}.`,
      `New x-coordinate: x' = ${targetPre.x} · ${chosen.label} = ${targetImg.x}.`,
      `New y-coordinate: y' = ${targetPre.y} · ${chosen.label} = ${targetImg.y}.`,
      `The dilated coordinates of ${targetImg.name} are (${targetImg.x}, ${targetImg.y}).`,
    ],
    keyTakeaway:
      'Origin dilation applies to every vertex: (x, y) → (kx, ky). Dilating all 4 vertices preserves angle measures and scales side lengths by k.',
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'quadrilateral',
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: chosen.k,
        showRays: true,
      },
    },
  };
}

export function generateOriginDilationProblem(
  forcedType?: 'point' | 'triangle' | 'quadrilateral'
): PracticeProblem {
  let geomType: 'point' | 'triangle' | 'quadrilateral';
  if (forcedType) {
    geomType = forcedType;
  } else {
    // Exact distribution: Point 20%, Triangle 50%, Quadrilateral 30%
    const roll = Math.random();
    if (roll < 0.20) {
      geomType = 'point';
    } else if (roll < 0.70) {
      geomType = 'triangle';
    } else {
      geomType = 'quadrilateral';
    }
  }

  if (geomType === 'point') {
    return generateOriginPointProblem();
  } else if (geomType === 'triangle') {
    return generateOriginTriangleProblem();
  } else {
    return generateOriginQuadrilateralProblem();
  }
}

// ==========================================
// 4. DILATION CENTERED AT POINT OTHER THAN ORIGIN C(h, k)
// ==========================================

const NON_ORIGIN_CENTERS: { h: number; k: number }[] = [
  { h: -2, k: 1 },
  { h: 1, k: -2 },
  { h: 2, k: 3 },
  { h: -3, k: -1 },
  { h: 1, k: 2 },
  { h: -1, k: 2 },
  { h: 2, k: -1 },
  { h: -2, k: -2 },
  { h: 3, k: 1 },
  { h: -1, k: -2 },
  { h: 1, k: 1 },
  { h: -2, k: 2 },
  { h: 2, k: 2 },
  { h: -1, k: -1 },
  { h: 3, k: -1 },
  { h: -3, k: 2 },
  { h: 0, k: 2 },
  { h: 0, k: -2 },
  { h: 2, k: 0 },
  { h: -2, k: 0 },
];

interface NonOriginScaleOption {
  s: number;
  label: string;
  reciprocalLabel: string;
  isReduction: boolean;
}

const NON_ORIGIN_SCALES: NonOriginScaleOption[] = [
  { s: 0.25, label: '1/4', reciprocalLabel: '4', isReduction: true },
  { s: 0.5, label: '1/2', reciprocalLabel: '2', isReduction: true },
  { s: 0.75, label: '3/4', reciprocalLabel: '4/3', isReduction: true },
  { s: 1.5, label: '1.5', reciprocalLabel: '2/3', isReduction: false },
  { s: 2, label: '2', reciprocalLabel: '1/2', isReduction: false },
  { s: 2.5, label: '2.5', reciprocalLabel: '2/5', isReduction: false },
  { s: 3, label: '3', reciprocalLabel: '1/3', isReduction: false },
];

// Mathematical rule: P' = C + s(P - C)
function dilatePointNonOrigin(
  p: { x: number; y: number },
  center: { h: number; k: number },
  s: number
): { x: number; y: number } {
  return {
    x: Number((center.h + s * (p.x - center.h)).toFixed(2)),
    y: Number((center.k + s * (p.y - center.k)).toFixed(2)),
  };
}

// TYPE 1: NON-ORIGIN POINT DILATION (20% distribution)
function generateNonOriginPointProblem(forcedScale?: NonOriginScaleOption): PracticeProblem {
  const center = randomChoice(NON_ORIGIN_CENTERS);
  const scale = forcedScale || randomChoice(NON_ORIGIN_SCALES);

  let dx: number;
  let dy: number;
  if (scale.s === 0.25 || scale.s === 0.75) {
    dx = randomChoice([-8, -4, 4, 8]);
    dy = randomChoice([-8, -4, 4, 8]);
  } else if (scale.s === 0.5 || scale.s === 1.5 || scale.s === 2.5) {
    dx = randomChoice([-6, -4, -2, 2, 4, 6]);
    dy = randomChoice([-6, -4, -2, 2, 4, 6]);
  } else {
    // scale = 2 or 3
    dx = randomChoice([-4, -3, -2, -1, 1, 2, 3, 4]);
    dy = randomChoice([-4, -3, -2, -1, 1, 2, 3, 4]);
  }

  const px = center.h + dx;
  const py = center.k + dy;

  // MATHEMATICAL RULE: P' = C + s(P - C)
  const imgPt = dilatePointNonOrigin({ x: px, y: py }, center, scale.s);
  const ix = imgPt.x;
  const iy = imgPt.y;

  const pointName = randomChoice(['P', 'V', 'M', 'W', 'Q']);
  const preImageVertices = [{ x: px, y: py, label: `${pointName}(${px}, ${py})` }];
  const imageVertices = [{ x: ix, y: iy, label: `${pointName}'(${ix}, ${iy})` }];

  // Question variations (find coordinates vs find scale factor vs identify rule)
  const qMode = randomChoice(['find-coords', 'find-coords', 'find-scale', 'identify-rule']);

  let question: string;
  let correct: string;
  let distractors: string[];
  let hint: string;
  let solutionSteps: string[];
  let keyTakeaway: string;

  if (qMode === 'find-scale') {
    question = `Point ${pointName}(${px}, ${py}) is dilated with center of dilation C(${center.h}, ${center.k}) to produce image point ${pointName}'(${ix}, ${iy}). What is the scale factor k of the dilation?`;
    correct = `k = ${scale.label}`;
    distractors = [
      `k = ${scale.reciprocalLabel}`,
      `k = ${scale.s > 1 ? (scale.s + 1).toString() : '2'}`,
      `k = ${scale.s === 2 ? '3' : '2'}`,
      `k = ${scale.s === 0.5 ? '1/4' : '1/2'}`,
    ];
    hint = `Measure horizontal or vertical distance from center C(${center.h}, ${center.k}) to ${pointName} and from C to ${pointName}'. The scale factor is the ratio k = (x' - h) / (x - h) = (y' - k) / (y - k).`;
    solutionSteps = [
      `1. Find directed horizontal distance from center C(${center.h}, ${center.k}) to pre-image ${pointName}(${px}, ${py}):`,
      `   • run = x - h = ${px} - (${center.h}) = ${dx}.`,
      `2. Find directed horizontal distance from center C(${center.h}, ${center.k}) to image ${pointName}'(${ix}, ${iy}):`,
      `   • new run = x' - h = ${ix} - (${center.h}) = ${Number((ix - center.h).toFixed(2))}.`,
      `3. Compute the scale factor ratio:`,
      `   • k = (new run) / (original run) = ${Number((ix - center.h).toFixed(2))} / ${dx} = ${scale.label}.`,
      `4. Verify with vertical distance:`,
      `   • k = (y' - k) / (y - k) = (${iy} - (${center.k})) / (${py} - (${center.k})) = ${Number((iy - center.k).toFixed(2))} / ${dy} = ${scale.label}.`,
    ];
    keyTakeaway =
      'From center C(h, k), the scale factor is always k = (x\' - h)/(x - h) = (y\' - k)/(y - k).';
  } else if (qMode === 'identify-rule') {
    question = `Which algebraic coordinate rule correctly models a dilation centered at point C(${center.h}, ${center.k}) by a scale factor of k = ${scale.label}?`;
    correct = `(x, y) → (${center.h} + ${scale.label}(x - ${center.h}), ${center.k} + ${scale.label}(y - ${center.k}))`;
    distractors = [
      `(x, y) → (${scale.label}x, ${scale.label}y)`,
      `(x, y) → (x + ${scale.label}, y + ${scale.label})`,
      `(x, y) → (${scale.label}(x + ${center.h}), ${scale.label}(y + ${center.k}))`,
      `(x, y) → (${center.h} - ${scale.label}(x + ${center.h}), ${center.k} - ${scale.label}(y + ${center.k}))`,
    ];
    hint = `For a non-origin center C(h, k), measure distance from center (x - h, y - k), scale by k, and add back to the center coordinates: x' = h + k(x - h) and y' = k + k(y - k).`;
    solutionSteps = [
      `1. Find distance from the center C(h, k): horizontal run is (x - h) and vertical rise is (y - k).`,
      `2. Scale those distances by factor k: k(x - h) and k(y - k).`,
      `3. Add the scaled distances back to the center: x' = h + k(x - h) and y' = k + k(y - k).`,
      `4. Notice that (x, y) → (kx, ky) is ONLY valid when the center is the origin (0, 0)!`,
    ];
    keyTakeaway =
      'Vector rule from center C(h, k): P\' = C + k(P - C), so (x, y) → (h + k(x - h), k + k(y - k)).';
  } else {
    // 'find-coords'
    question = `Point ${pointName}(${px}, ${py}) is dilated by a scale factor of k = ${scale.label} with the center of dilation at C(${center.h}, ${center.k}) (NOT at the origin). What are the coordinates of image point ${pointName}'?`;
    correct = `(${ix}, ${iy})`;
    const distractorOriginMisconception = `(${Number((px * scale.s).toFixed(2))}, ${Number((py * scale.s).toFixed(2))})`;
    const distractorAdd = `(${px + scale.s}, ${py + scale.s})`;
    const distractorFlip = `(${center.h + Number((scale.s * dy).toFixed(2))}, ${center.k + Number((scale.s * dx).toFixed(2))})`;
    const distractorDiv = `(${Number((center.h + dx / scale.s).toFixed(1))}, ${Number((center.k + dy / scale.s).toFixed(1))})`;
    distractors = [distractorOriginMisconception, distractorAdd, distractorFlip, distractorDiv];
    hint = `Do NOT just multiply (${px}, ${py}) by ${scale.label}! First measure horizontal distance (x - h) and vertical distance (y - k) from center C(${center.h}, ${center.k}). Then multiply those distances by k = ${scale.label}, and add back to C(${center.h}, ${center.k}).`;
    solutionSteps = [
      `1. Find horizontal and vertical distance from center C(${center.h}, ${center.k}) to ${pointName}(${px}, ${py}):`,
      `   • Horizontal distance: ${px} - (${center.h}) = ${dx} units.`,
      `   • Vertical distance: ${py} - (${center.k}) = ${dy} units.`,
      `2. Multiply both distances by the scale factor k = ${scale.label}:`,
      `   • New horizontal distance: ${dx} · ${scale.label} = ${Number((dx * scale.s).toFixed(2))} units.`,
      `   • New vertical distance: ${dy} · ${scale.label} = ${Number((dy * scale.s).toFixed(2))} units.`,
      `3. Add new distances back to the center C(${center.h}, ${center.k}):`,
      `   • x' = ${center.h} + ${Number((dx * scale.s).toFixed(2))} = ${ix}.`,
      `   • y' = ${center.k} + ${Number((dy * scale.s).toFixed(2))} = ${iy}.`,
      `Result: Image point ${pointName}' has coordinates (${ix}, ${iy}).`,
      `Notice: (${Number((px * scale.s).toFixed(2))}, ${Number((py * scale.s).toFixed(2))}) is the classic mistake of dilating from the origin (0, 0)!`,
    ];
    keyTakeaway =
      'Non-origin formula: P\' = C + k(P - C), so x\' = h + k(x - h) and y\' = k + k(y - k). Measure from the center, scale the distance, then count from the center!';
  }

  const { options, correctIndex } = shuffleOptions(correct, distractors);

  return {
    id: `nod-pt-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'non-origin-dilation',
    skillTitle: 'Dilations with Center NOT at Origin C(h, k)',
    difficulty: 'Mastery',
    geometryType: 'point',
    scaleFactor: scale.s,
    center: { x: center.h, y: center.k },
    preImageVertices,
    imageVertices,
    question,
    options,
    correctIndex,
    hint,
    solutionSteps,
    keyTakeaway,
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'point',
        center: { x: center.h, y: center.k, label: `C(${center.h}, ${center.k})` },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: scale.s,
        showRays: true,
      },
    },
  };
}

// TYPE 2: NON-ORIGIN TRIANGLE DILATION (50% distribution)
function generateNonOriginTriangleProblem(forcedScale?: NonOriginScaleOption): PracticeProblem {
  const center = randomChoice(NON_ORIGIN_CENTERS);
  const scale = forcedScale || randomChoice(NON_ORIGIN_SCALES);

  type DeltaVertex = { name: string; dx: number; dy: number };
  let deltaTemplates: DeltaVertex[][];

  if (scale.s === 0.25 || scale.s === 0.75) {
    deltaTemplates = [
      [
        { name: 'A', dx: 4, dy: 4 },
        { name: 'B', dx: 12, dy: 4 },
        { name: 'C', dx: 4, dy: 12 },
      ],
      [
        { name: 'A', dx: -4, dy: 4 },
        { name: 'B', dx: 8, dy: 4 },
        { name: 'C', dx: 0, dy: 12 },
      ],
      [
        { name: 'A', dx: 4, dy: 8 },
        { name: 'B', dx: 16, dy: 8 },
        { name: 'C', dx: 8, dy: 16 },
      ],
      [
        { name: 'A', dx: -8, dy: -4 },
        { name: 'B', dx: 4, dy: -4 },
        { name: 'C', dx: -4, dy: 8 },
      ],
      [
        { name: 'A', dx: 4, dy: -4 },
        { name: 'B', dx: 12, dy: -4 },
        { name: 'C', dx: 8, dy: -12 },
      ],
    ];
  } else if (scale.s === 0.5 || scale.s === 1.5 || scale.s === 2.5) {
    deltaTemplates = [
      // Right triangle
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 6, dy: 2 },
        { name: 'C', dx: 2, dy: 6 },
      ],
      // User's prompt triangle example offsets: (2, 2), (4, 2), (2, 4)
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 2, dy: 4 },
      ],
      [
        { name: 'A', dx: -4, dy: 2 },
        { name: 'B', dx: 2, dy: 2 },
        { name: 'C', dx: -2, dy: 6 },
      ],
      [
        { name: 'A', dx: 2, dy: 4 },
        { name: 'B', dx: 8, dy: 4 },
        { name: 'C', dx: 4, dy: 10 },
      ],
      [
        { name: 'A', dx: -2, dy: -2 },
        { name: 'B', dx: 4, dy: -2 },
        { name: 'C', dx: 0, dy: 4 },
      ],
      [
        { name: 'A', dx: 4, dy: 2 },
        { name: 'B', dx: 10, dy: 2 },
        { name: 'C', dx: 4, dy: 8 },
      ],
      [
        { name: 'A', dx: -4, dy: -2 },
        { name: 'B', dx: -2, dy: -2 },
        { name: 'C', dx: -4, dy: 4 },
      ],
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 8, dy: 2 },
        { name: 'C', dx: 4, dy: 6 },
      ],
      [
        { name: 'A', dx: -2, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 0, dy: 6 },
      ],
    ];
  } else {
    // scale = 2 or 3
    deltaTemplates = [
      [
        { name: 'A', dx: 1, dy: 1 },
        { name: 'B', dx: 4, dy: 1 },
        { name: 'C', dx: 1, dy: 4 },
      ],
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 2, dy: 4 },
      ],
      [
        { name: 'A', dx: 2, dy: 1 },
        { name: 'B', dx: 5, dy: 1 },
        { name: 'C', dx: 2, dy: 4 },
      ],
      [
        { name: 'A', dx: -2, dy: 1 },
        { name: 'B', dx: 3, dy: 1 },
        { name: 'C', dx: 0, dy: 4 },
      ],
      [
        { name: 'A', dx: 1, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 2, dy: 5 },
      ],
      [
        { name: 'A', dx: -1, dy: -1 },
        { name: 'B', dx: 3, dy: -1 },
        { name: 'C', dx: 1, dy: 3 },
      ],
      [
        { name: 'A', dx: -3, dy: 1 },
        { name: 'B', dx: 1, dy: 1 },
        { name: 'C', dx: -1, dy: 4 },
      ],
    ];
  }

  const chosenDelta = randomChoice(deltaTemplates);

  // Pre-image vertices: P = C + delta
  const rawVertices = chosenDelta.map((t) => ({
    name: t.name,
    x: center.h + t.dx,
    y: center.k + t.dy,
    dx: t.dx,
    dy: t.dy,
  }));

  // MATHEMATICAL RULE: P' = C + s(P - C) calculated programmatically
  const imageRawVertices = rawVertices.map((v) => {
    const dilated = dilatePointNonOrigin(v, center, scale.s);
    return {
      name: `${v.name}'`,
      x: dilated.x,
      y: dilated.y,
    };
  });

  const preImageVertices = rawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const imageVertices = imageRawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const vertsListStr = rawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');

  // Question variations (one-vertex vs all-vertices vs missing-vertex vs find-scale vs enlargement-reduction)
  const qMode = randomChoice(['one-vertex', 'one-vertex', 'all-vertices', 'missing-vertex', 'find-scale', 'enlarge-reduce']);

  let question: string;
  let correct: string;
  let distractors: string[];
  let hint: string;
  let solutionSteps: string[];
  let keyTakeaway: string;

  const targetIdx = randomInt(0, rawVertices.length - 1);
  const targetPre = rawVertices[targetIdx];
  const targetImg = imageRawVertices[targetIdx];

  if (qMode === 'all-vertices') {
    question = `Triangle ABC with vertices ${vertsListStr} is dilated by a scale factor of k = ${scale.label} with center of dilation at C(${center.h}, ${center.k}) (NOT at the origin). Which set of coordinates represents the dilated image triangle A'B'C'?`;
    correct = imageRawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');
    const originMistake = rawVertices
      .map((v) => `${v.name}'(${Number((v.x * scale.s).toFixed(2))}, ${Number((v.y * scale.s).toFixed(2))})`)
      .join(', ');
    const addMistake = rawVertices
      .map((v) => `${v.name}'(${v.x + scale.s}, ${v.y + scale.s})`)
      .join(', ');
    const wrongCenter = rawVertices
      .map((v) => {
        const fake = dilatePointNonOrigin(v, { h: center.k, k: center.h }, scale.s);
        return `${v.name}'(${fake.x}, ${fake.y})`;
      })
      .join(', ');
    distractors = [originMistake, addMistake, wrongCenter];
    hint = `Apply the non-origin formula P' = C + k(P - C) to ALL 3 vertices: x' = ${center.h} + ${scale.label}(x - ${center.h}), y' = ${center.k} + ${scale.label}(y - ${center.k}).`;
    solutionSteps = [
      `Apply x' = h + k(x - h) and y' = k + k(y - k) with center C(${center.h}, ${center.k}) and k = ${scale.label}:`,
      ...rawVertices.map((v, i) => {
        const img = imageRawVertices[i];
        return `• Vertex ${v.name}(${v.x}, ${v.y}): x' = ${center.h} + ${scale.label}(${v.x} - (${center.h})) = ${img.x}, y' = ${center.k} + ${scale.label}(${v.y} - (${center.k})) = ${img.y} → ${img.name}(${img.x}, ${img.y}).`;
      }),
      `The dilated triangle A'B'C' has vertices ${correct}.`,
    ];
    keyTakeaway =
      'Every vertex must be measured from center C(h, k), scaled by k, and counted from C: P\' = C + k(P - C).';
  } else if (qMode === 'missing-vertex') {
    const other1 = imageRawVertices[(targetIdx + 1) % 3];
    const other2 = imageRawVertices[(targetIdx + 2) % 3];
    question = `Triangle ABC has vertices ${vertsListStr}. After a dilation centered at C(${center.h}, ${center.k}) with scale factor k = ${scale.label}, two of the image vertices are ${other1.name}(${other1.x}, ${other1.y}) and ${other2.name}(${other2.x}, ${other2.y}). What are the coordinates of the third vertex ${targetImg.name}?`;
    correct = `(${targetImg.x}, ${targetImg.y})`;
    const originMistake = `(${Number((targetPre.x * scale.s).toFixed(2))}, ${Number((targetPre.y * scale.s).toFixed(2))})`;
    const addMistake = `(${targetPre.x + scale.s}, ${targetPre.y + scale.s})`;
    const otherCoord = `(${other1.x}, ${other1.y})`;
    const signMistake = `(${targetImg.x}, ${-targetImg.y})`;
    distractors = [originMistake, addMistake, otherCoord, signMistake];
    hint = `Dilate the missing vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) from center C(${center.h}, ${center.k}) using: x' = ${center.h} + ${scale.label}(${targetPre.x} - ${center.h}) and y' = ${center.k} + ${scale.label}(${targetPre.y} - ${center.k}).`;
    solutionSteps = [
      `1. Identify vertex ${targetPre.name}: (${targetPre.x}, ${targetPre.y}).`,
      `2. Horizontal run from center: ${targetPre.x} - (${center.h}) = ${targetPre.dx}.`,
      `3. Vertical rise from center: ${targetPre.y} - (${center.k}) = ${targetPre.dy}.`,
      `4. Multiply by scale factor k = ${scale.label}:`,
      `   • new run: ${targetPre.dx} · ${scale.label} = ${Number((targetPre.dx * scale.s).toFixed(2))}.`,
      `   • new rise: ${targetPre.dy} · ${scale.label} = ${Number((targetPre.dy * scale.s).toFixed(2))}.`,
      `5. Add to center C(${center.h}, ${center.k}): x' = ${targetImg.x}, y' = ${targetImg.y}.`,
      `Result: ${targetImg.name} is (${targetImg.x}, ${targetImg.y}).`,
    ];
    keyTakeaway =
      'Dilate the pre-image coordinates of the missing vertex directly from the center point C(h, k).';
  } else if (qMode === 'find-scale') {
    question = `Triangle ABC has vertex ${rawVertices[0].name}(${rawVertices[0].x}, ${rawVertices[0].y}). After a dilation centered at point C(${center.h}, ${center.k}), the corresponding image vertex is ${imageRawVertices[0].name}(${imageRawVertices[0].x}, ${imageRawVertices[0].y}). What is the scale factor k of this dilation?`;
    correct = `k = ${scale.label}`;
    distractors = [
      `k = ${scale.reciprocalLabel}`,
      `k = ${scale.s === 2 ? '3' : '2'}`,
      `k = ${scale.s === 0.5 ? '1/4' : '1/2'}`,
      `k = ${scale.s > 1 ? (scale.s + 1).toString() : '4'}`,
    ];
    hint = `Compute the ratio of distance from center C(${center.h}, ${center.k}) to image vertex A' over the distance from C to pre-image vertex A: k = (x' - h) / (x - h).`;
    solutionSteps = [
      `1. Find distance from center C(${center.h}, ${center.k}) to pre-image vertex ${rawVertices[0].name}(${rawVertices[0].x}, ${rawVertices[0].y}):`,
      `   • run = ${rawVertices[0].x} - (${center.h}) = ${rawVertices[0].dx}.`,
      `2. Find distance from center C(${center.h}, ${center.k}) to image vertex ${imageRawVertices[0].name}(${imageRawVertices[0].x}, ${imageRawVertices[0].y}):`,
      `   • new run = ${imageRawVertices[0].x} - (${center.h}) = ${Number((imageRawVertices[0].x - center.h).toFixed(2))}.`,
      `3. Scale factor k = (new run) / (original run) = ${Number((imageRawVertices[0].x - center.h).toFixed(2))} / ${rawVertices[0].dx} = ${scale.label}.`,
    ];
    keyTakeaway =
      'Scale factor k is always (image distance from center) / (pre-image distance from center).';
  } else if (qMode === 'enlarge-reduce') {
    question = `Triangle ABC is dilated from center C(${center.h}, ${center.k}) by scale factor k = ${scale.label} to produce triangle A'B'C'. Which statement correctly describes this transformation?`;
    correct = scale.s > 1
      ? `Enlargement, because scale factor k = ${scale.label} is greater than 1 (k > 1)`
      : `Reduction, because scale factor k = ${scale.label} is between 0 and 1 (0 < k < 1)`;
    const opposite = scale.s > 1
      ? `Reduction, because scale factor k = ${scale.label}`
      : `Enlargement, because scale factor k = ${scale.label}`;
    distractors = [
      opposite,
      'Neither enlargement nor reduction, because the center of dilation is not the origin (0, 0)',
      'Rigid transformation, because dilating from a non-origin center preserves side lengths',
      `Translation, moving each vertex by ${scale.label} units`,
    ];
    hint = `A scale factor k > 1 enlarges a figure, while 0 < k < 1 reduces it. The position of the center point C does not change this rule!`;
    solutionSteps = [
      `1. Check the value of the scale factor: k = ${scale.label} (${scale.s}).`,
      `2. Since ${scale.s > 1 ? `${scale.s} > 1` : `0 < ${scale.s} < 1`}, the dilated image is ${scale.s > 1 ? 'larger than' : 'smaller than'} the pre-image.`,
      `3. Therefore, this dilation is a ${scale.s > 1 ? 'enlargement' : 'reduction'}.`,
    ];
    keyTakeaway =
      'Whether centered at the origin or a non-origin point, k > 1 produces an enlargement and 0 < k < 1 produces a reduction.';
  } else {
    // 'one-vertex'
    question = `Triangle ABC has vertices ${vertsListStr}. The triangle is dilated by a scale factor of k = ${scale.label} with center of dilation C(${center.h}, ${center.k}) (NOT at the origin). What are the coordinates of image vertex ${targetImg.name}?`;
    correct = `(${targetImg.x}, ${targetImg.y})`;
    const distractorOrigin = `(${Number((targetPre.x * scale.s).toFixed(2))}, ${Number((targetPre.y * scale.s).toFixed(2))})`;
    const distractorAdd = `(${targetPre.x + scale.s}, ${targetPre.y + scale.s})`;
    const otherImg = imageRawVertices[(targetIdx + 1) % 3];
    const distractorOther = `(${otherImg.x}, ${otherImg.y})`;
    const distractorFlip = `(${center.h + Number((scale.s * targetPre.dy).toFixed(2))}, ${center.k + Number((scale.s * targetPre.dx).toFixed(2))})`;
    distractors = [distractorOrigin, distractorAdd, distractorOther, distractorFlip];
    hint = `For vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) with center C(${center.h}, ${center.k}), use: x' = ${center.h} + ${scale.label}(${targetPre.x} - ${center.h}) and y' = ${center.k} + ${scale.label}(${targetPre.y} - ${center.k}).`;
    solutionSteps = [
      `1. Target vertex is ${targetPre.name}(${targetPre.x}, ${targetPre.y}), center is C(${center.h}, ${center.k}), and scale factor is k = ${scale.label}.`,
      `2. Calculate horizontal and vertical distances from C:`,
      `   • run = ${targetPre.x} - (${center.h}) = ${targetPre.dx}.`,
      `   • rise = ${targetPre.y} - (${center.k}) = ${targetPre.dy}.`,
      `3. Multiply distances by scale factor k = ${scale.label}:`,
      `   • new run = ${targetPre.dx} · ${scale.label} = ${Number((targetPre.dx * scale.s).toFixed(2))}.`,
      `   • new rise = ${targetPre.dy} · ${scale.label} = ${Number((targetPre.dy * scale.s).toFixed(2))}.`,
      `4. Add to center C(${center.h}, ${center.k}):`,
      `   • x' = ${center.h} + ${Number((targetPre.dx * scale.s).toFixed(2))} = ${targetImg.x}.`,
      `   • y' = ${center.k} + ${Number((targetPre.dy * scale.s).toFixed(2))} = ${targetImg.y}.`,
      `The dilated coordinates of ${targetImg.name} are (${targetImg.x}, ${targetImg.y}).`,
    ];
    keyTakeaway =
      'Dilation from C(h, k): x\' = h + k(x - h) and y\' = k + k(y - k). Do not multiply coordinates directly by k!';
  }

  const { options, correctIndex } = shuffleOptions(correct, distractors);

  return {
    id: `nod-tri-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'non-origin-dilation',
    skillTitle: 'Dilations with Center NOT at Origin C(h, k)',
    difficulty: 'Mastery',
    geometryType: 'triangle',
    scaleFactor: scale.s,
    center: { x: center.h, y: center.k },
    preImageVertices,
    imageVertices,
    question,
    options,
    correctIndex,
    hint,
    solutionSteps,
    keyTakeaway,
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'triangle',
        center: { x: center.h, y: center.k, label: `C(${center.h}, ${center.k})` },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: scale.s,
        showRays: true,
      },
    },
  };
}

// TYPE 3: NON-ORIGIN QUADRILATERAL DILATION (30% distribution)
function generateNonOriginQuadrilateralProblem(forcedScale?: NonOriginScaleOption): PracticeProblem {
  const center = randomChoice(NON_ORIGIN_CENTERS);
  const scale = forcedScale || randomChoice(NON_ORIGIN_SCALES);

  type DeltaVertex = { name: string; dx: number; dy: number };
  let deltaTemplates: DeltaVertex[][];

  if (scale.s === 0.25 || scale.s === 0.75) {
    deltaTemplates = [
      [
        { name: 'A', dx: 4, dy: 4 },
        { name: 'B', dx: 12, dy: 4 },
        { name: 'C', dx: 12, dy: 8 },
        { name: 'D', dx: 4, dy: 8 },
      ],
      [
        { name: 'A', dx: -4, dy: 4 },
        { name: 'B', dx: 4, dy: 4 },
        { name: 'C', dx: 4, dy: 12 },
        { name: 'D', dx: -4, dy: 12 },
      ],
      [
        { name: 'A', dx: 4, dy: 4 },
        { name: 'B', dx: 16, dy: 4 },
        { name: 'C', dx: 16, dy: 12 },
        { name: 'D', dx: 4, dy: 12 },
      ],
      [
        { name: 'A', dx: -8, dy: -4 },
        { name: 'B', dx: 4, dy: -4 },
        { name: 'C', dx: 4, dy: 4 },
        { name: 'D', dx: -8, dy: 4 },
      ],
    ];
  } else if (scale.s === 0.5 || scale.s === 1.5 || scale.s === 2.5) {
    deltaTemplates = [
      // User's prompt quadrilateral example offsets: (2, 2), (4, 2), (4, 4), (2, 4)
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 4, dy: 4 },
        { name: 'D', dx: 2, dy: 4 },
      ],
      // Rectangles and quadrilaterals
      [
        { name: 'A', dx: -2, dy: 2 },
        { name: 'B', dx: 2, dy: 2 },
        { name: 'C', dx: 2, dy: 6 },
        { name: 'D', dx: -2, dy: 6 },
      ],
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 8, dy: 2 },
        { name: 'C', dx: 8, dy: 6 },
        { name: 'D', dx: 2, dy: 6 },
      ],
      [
        { name: 'A', dx: -4, dy: 2 },
        { name: 'B', dx: 4, dy: 2 },
        { name: 'C', dx: 2, dy: 6 },
        { name: 'D', dx: -2, dy: 6 },
      ],
      [
        { name: 'A', dx: 2, dy: 2 },
        { name: 'B', dx: 6, dy: 2 },
        { name: 'C', dx: 8, dy: 6 },
        { name: 'D', dx: 4, dy: 6 },
      ],
      [
        { name: 'A', dx: 4, dy: 2 },
        { name: 'B', dx: 10, dy: 2 },
        { name: 'C', dx: 10, dy: 8 },
        { name: 'D', dx: 4, dy: 8 },
      ],
      [
        { name: 'A', dx: -2, dy: -2 },
        { name: 'B', dx: 4, dy: -2 },
        { name: 'C', dx: 4, dy: 2 },
        { name: 'D', dx: -2, dy: 2 },
      ],
    ];
  } else {
    // scale = 2 or 3
    deltaTemplates = [
      [
        { name: 'A', dx: 1, dy: 1 },
        { name: 'B', dx: 4, dy: 1 },
        { name: 'C', dx: 4, dy: 3 },
        { name: 'D', dx: 1, dy: 3 },
      ],
      [
        { name: 'A', dx: 1, dy: 1 },
        { name: 'B', dx: 4, dy: 1 },
        { name: 'C', dx: 5, dy: 4 },
        { name: 'D', dx: 2, dy: 4 },
      ],
      [
        { name: 'A', dx: -3, dy: 1 },
        { name: 'B', dx: 2, dy: 1 },
        { name: 'C', dx: 1, dy: 4 },
        { name: 'D', dx: -2, dy: 4 },
      ],
      [
        { name: 'A', dx: 2, dy: 1 },
        { name: 'B', dx: 5, dy: 1 },
        { name: 'C', dx: 5, dy: 4 },
        { name: 'D', dx: 2, dy: 4 },
      ],
      [
        { name: 'A', dx: -1, dy: -1 },
        { name: 'B', dx: 2, dy: -1 },
        { name: 'C', dx: 2, dy: 2 },
        { name: 'D', dx: -1, dy: 2 },
      ],
      [
        { name: 'A', dx: 1, dy: 1 },
        { name: 'B', dx: 3, dy: 1 },
        { name: 'C', dx: 3, dy: 3 },
        { name: 'D', dx: 1, dy: 3 },
      ],
      [
        { name: 'A', dx: -1, dy: 1 },
        { name: 'B', dx: 2, dy: 1 },
        { name: 'C', dx: 2, dy: 3 },
        { name: 'D', dx: -1, dy: 3 },
      ],
    ];
  }

  const chosenDelta = randomChoice(deltaTemplates);

  // Pre-image vertices: P = C + delta
  const rawVertices = chosenDelta.map((t) => ({
    name: t.name,
    x: center.h + t.dx,
    y: center.k + t.dy,
    dx: t.dx,
    dy: t.dy,
  }));

  // MATHEMATICAL RULE: P' = C + s(P - C) calculated programmatically
  const imageRawVertices = rawVertices.map((v) => {
    const dilated = dilatePointNonOrigin(v, center, scale.s);
    return {
      name: `${v.name}'`,
      x: dilated.x,
      y: dilated.y,
    };
  });

  const preImageVertices = rawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const imageVertices = imageRawVertices.map((v) => ({
    x: v.x,
    y: v.y,
    label: `${v.name}(${v.x}, ${v.y})`,
  }));

  const vertsListStr = rawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');

  // Question variations (one-vertex vs missing-vertex vs find-scale vs all-vertices)
  const qMode = randomChoice(['one-vertex', 'one-vertex', 'missing-vertex', 'find-scale', 'all-vertices']);

  let question: string;
  let correct: string;
  let distractors: string[];
  let hint: string;
  let solutionSteps: string[];
  let keyTakeaway: string;

  const targetIdx = randomInt(0, rawVertices.length - 1);
  const targetPre = rawVertices[targetIdx];
  const targetImg = imageRawVertices[targetIdx];

  if (qMode === 'missing-vertex') {
    const other1 = imageRawVertices[(targetIdx + 1) % 4];
    const other2 = imageRawVertices[(targetIdx + 2) % 4];
    const other3 = imageRawVertices[(targetIdx + 3) % 4];
    question = `Quadrilateral ABCD has vertices ${vertsListStr}. After a dilation centered at C(${center.h}, ${center.k}) with scale factor k = ${scale.label}, three of the image vertices are ${other1.name}(${other1.x}, ${other1.y}), ${other2.name}(${other2.x}, ${other2.y}), and ${other3.name}(${other3.x}, ${other3.y}). What are the coordinates of the fourth image vertex ${targetImg.name}?`;
    correct = `(${targetImg.x}, ${targetImg.y})`;
    const distractorOrigin = `(${Number((targetPre.x * scale.s).toFixed(2))}, ${Number((targetPre.y * scale.s).toFixed(2))})`;
    const distractorAdd = `(${targetPre.x + scale.s}, ${targetPre.y + scale.s})`;
    const distractorOther = `(${other1.x}, ${other1.y})`;
    const distractorFlip = `(${targetImg.y}, ${targetImg.x})`;
    distractors = [distractorOrigin, distractorAdd, distractorOther, distractorFlip];
    hint = `Dilate the missing vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) from center C(${center.h}, ${center.k}) using: x' = ${center.h} + ${scale.label}(${targetPre.x} - ${center.h}) and y' = ${center.k} + ${scale.label}(${targetPre.y} - ${center.k}).`;
    solutionSteps = [
      `1. Target vertex to find is ${targetPre.name}(${targetPre.x}, ${targetPre.y}).`,
      `2. Directed distance from center C(${center.h}, ${center.k}):`,
      `   • run = ${targetPre.x} - (${center.h}) = ${targetPre.dx}.`,
      `   • rise = ${targetPre.y} - (${center.k}) = ${targetPre.dy}.`,
      `3. Multiply by scale factor k = ${scale.label}:`,
      `   • new run = ${targetPre.dx} · ${scale.label} = ${Number((targetPre.dx * scale.s).toFixed(2))}.`,
      `   • new rise = ${targetPre.dy} · ${scale.label} = ${Number((targetPre.dy * scale.s).toFixed(2))}.`,
      `4. Add back to center C(${center.h}, ${center.k}):`,
      `   • x' = ${center.h} + ${Number((targetPre.dx * scale.s).toFixed(2))} = ${targetImg.x}.`,
      `   • y' = ${center.k} + ${Number((targetPre.dy * scale.s).toFixed(2))} = ${targetImg.y}.`,
      `Image vertex ${targetImg.name} has coordinates (${targetImg.x}, ${targetImg.y}).`,
    ];
    keyTakeaway =
      'Each vertex of the quadrilateral is dilated independently using P\' = C + k(P - C).';
  } else if (qMode === 'find-scale') {
    question = `Quadrilateral ABCD has vertex ${rawVertices[0].name}(${rawVertices[0].x}, ${rawVertices[0].y}) which dilates to image vertex ${imageRawVertices[0].name}(${imageRawVertices[0].x}, ${imageRawVertices[0].y}) with center of dilation C(${center.h}, ${center.k}). What is the scale factor k of the dilation?`;
    correct = `k = ${scale.label}`;
    distractors = [
      `k = ${scale.reciprocalLabel}`,
      `k = ${scale.s === 2 ? '3' : '2'}`,
      `k = ${scale.s === 0.5 ? '1/4' : '1/2'}`,
      `k = ${scale.s > 1 ? (scale.s + 1).toString() : '4'}`,
    ];
    hint = `Find the scale factor by comparing the distance of vertex A' from center C to the distance of vertex A from center C: k = (x' - h) / (x - h).`;
    solutionSteps = [
      `1. Distance from center C(${center.h}, ${center.k}) to pre-image ${rawVertices[0].name}(${rawVertices[0].x}, ${rawVertices[0].y}):`,
      `   • run = ${rawVertices[0].x} - (${center.h}) = ${rawVertices[0].dx}.`,
      `2. Distance from center C(${center.h}, ${center.k}) to image ${imageRawVertices[0].name}(${imageRawVertices[0].x}, ${imageRawVertices[0].y}):`,
      `   • new run = ${imageRawVertices[0].x} - (${center.h}) = ${Number((imageRawVertices[0].x - center.h).toFixed(2))}.`,
      `3. Scale factor k = ${Number((imageRawVertices[0].x - center.h).toFixed(2))} / ${rawVertices[0].dx} = ${scale.label}.`,
    ];
    keyTakeaway =
      'The scale factor is the constant ratio of corresponding distances from the center of dilation.';
  } else if (qMode === 'all-vertices') {
    question = `Quadrilateral ABCD with vertices ${vertsListStr} is dilated by a scale factor of k = ${scale.label} with center of dilation at C(${center.h}, ${center.k}). Which set of coordinates represents the dilated quadrilateral A'B'C'D'?`;
    correct = imageRawVertices.map((v) => `${v.name}(${v.x}, ${v.y})`).join(', ');
    const originMistake = rawVertices
      .map((v) => `${v.name}'(${Number((v.x * scale.s).toFixed(2))}, ${Number((v.y * scale.s).toFixed(2))})`)
      .join(', ');
    const addMistake = rawVertices
      .map((v) => `${v.name}'(${v.x + scale.s}, ${v.y + scale.s})`)
      .join(', ');
    const wrongCenter = rawVertices
      .map((v) => {
        const fake = dilatePointNonOrigin(v, { h: center.k, k: center.h }, scale.s);
        return `${v.name}'(${fake.x}, ${fake.y})`;
      })
      .join(', ');
    distractors = [originMistake, addMistake, wrongCenter];
    hint = `Apply x' = ${center.h} + ${scale.label}(x - ${center.h}) and y' = ${center.k} + ${scale.label}(y - ${center.k}) to all 4 vertices.`;
    solutionSteps = [
      `Use P' = C + k(P - C) for all 4 vertices:`,
      ...rawVertices.map((v, i) => {
        const img = imageRawVertices[i];
        return `• ${v.name}(${v.x}, ${v.y}) → x' = ${center.h} + ${scale.label}(${v.dx}) = ${img.x}, y' = ${center.k} + ${scale.label}(${v.dy}) = ${img.y} → ${img.name}(${img.x}, ${img.y}).`;
      }),
      `The dilated quadrilateral A'B'C'D' has vertices: ${correct}.`,
    ];
    keyTakeaway =
      'Dilating all 4 vertices creates a similar quadrilateral with side lengths multiplied by k.';
  } else {
    // 'one-vertex'
    question = `Quadrilateral ABCD has vertices ${vertsListStr}. The quadrilateral is dilated by a scale factor of k = ${scale.label} with center of dilation at C(${center.h}, ${center.k}) (NOT at the origin). What are the coordinates of image vertex ${targetImg.name}?`;
    correct = `(${targetImg.x}, ${targetImg.y})`;
    const distractorOrigin = `(${Number((targetPre.x * scale.s).toFixed(2))}, ${Number((targetPre.y * scale.s).toFixed(2))})`;
    const distractorAdd = `(${targetPre.x + scale.s}, ${targetPre.y + scale.s})`;
    const otherImg = imageRawVertices[(targetIdx + 1) % 4];
    const distractorOther = `(${otherImg.x}, ${otherImg.y})`;
    const distractorFlip = `(${center.h + Number((scale.s * targetPre.dy).toFixed(2))}, ${center.k + Number((scale.s * targetPre.dx).toFixed(2))})`;
    distractors = [distractorOrigin, distractorAdd, distractorOther, distractorFlip];
    hint = `For vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) with center C(${center.h}, ${center.k}), use: x' = ${center.h} + ${scale.label}(${targetPre.x} - ${center.h}) and y' = ${center.k} + ${scale.label}(${targetPre.y} - ${center.k}).`;
    solutionSteps = [
      `1. Identify vertex ${targetPre.name}(${targetPre.x}, ${targetPre.y}) and center C(${center.h}, ${center.k}).`,
      `2. Horizontal distance: ${targetPre.x} - (${center.h}) = ${targetPre.dx}.`,
      `3. Vertical distance: ${targetPre.y} - (${center.k}) = ${targetPre.dy}.`,
      `4. Multiply by scale factor k = ${scale.label}:`,
      `   • new run: ${targetPre.dx} · ${scale.label} = ${Number((targetPre.dx * scale.s).toFixed(2))}.`,
      `   • new rise: ${targetPre.dy} · ${scale.label} = ${Number((targetPre.dy * scale.s).toFixed(2))}.`,
      `5. Add to center C(${center.h}, ${center.k}):`,
      `   • x' = ${center.h} + ${Number((targetPre.dx * scale.s).toFixed(2))} = ${targetImg.x}.`,
      `   • y' = ${center.k} + ${Number((targetPre.dy * scale.s).toFixed(2))} = ${targetImg.y}.`,
      `The dilated coordinates of ${targetImg.name} are (${targetImg.x}, ${targetImg.y}).`,
    ];
    keyTakeaway =
      'Dilation centered at C(h, k): x\' = h + k(x - h) and y\' = k + k(y - k).';
  }

  const { options, correctIndex } = shuffleOptions(correct, distractors);

  return {
    id: `nod-quad-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'non-origin-dilation',
    skillTitle: 'Dilations with Center NOT at Origin C(h, k)',
    difficulty: 'Mastery',
    geometryType: 'quadrilateral',
    scaleFactor: scale.s,
    center: { x: center.h, y: center.k },
    preImageVertices,
    imageVertices,
    question,
    options,
    correctIndex,
    hint,
    solutionSteps,
    keyTakeaway,
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'quadrilateral',
        center: { x: center.h, y: center.k, label: `C(${center.h}, ${center.k})` },
        preImage: preImageVertices,
        image: imageVertices,
        scaleFactor: scale.s,
        showRays: true,
      },
    },
  };
}

export function generateNonOriginDilationProblem(
  forcedType?: 'point' | 'triangle' | 'quadrilateral'
): PracticeProblem {
  let geomType: 'point' | 'triangle' | 'quadrilateral';
  if (forcedType) {
    geomType = forcedType;
  } else {
    // Exact distribution: Point 20%, Triangle 50%, Quadrilateral 30%
    const roll = Math.random();
    if (roll < 0.20) {
      geomType = 'point';
    } else if (roll < 0.70) {
      geomType = 'triangle';
    } else {
      geomType = 'quadrilateral';
    }
  }

  if (geomType === 'point') {
    return generateNonOriginPointProblem();
  } else if (geomType === 'triangle') {
    return generateNonOriginTriangleProblem();
  } else {
    return generateNonOriginQuadrilateralProblem();
  }
}

// ==========================================
// 5. ALGEBRAIC COORDINATE RULES
// ==========================================

interface OriginDilationConfig {
  id: string;
  k: number;
  kStr: string;
  isEnlargement: boolean;
  preImage: { x: number; y: number; label: string }[];
  geometryType: 'point' | 'triangle' | 'quadrilateral';
  shapeName: string;
}

// 1. Curated Triangle Origin Dilations (Clean integer/half-integer coordinates within [-10, 10])
const TRIANGLE_ORIGIN_CONFIGS: OriginDilationConfig[] = [
  // Enlargement: k = 2, Q1
  {
    id: 'tri-k2-q1',
    k: 2,
    kStr: '2',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle ABC',
    preImage: [
      { x: 1, y: 2, label: 'A(1, 2)' },
      { x: 4, y: 1, label: 'B(4, 1)' },
      { x: 2, y: 4, label: 'C(2, 4)' },
    ],
  },
  // Enlargement: k = 2.5, Q1
  {
    id: 'tri-k2.5-q1',
    k: 2.5,
    kStr: '2.5',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle PQR',
    preImage: [
      { x: 2, y: 2, label: 'P(2, 2)' },
      { x: 4, y: 2, label: 'Q(4, 2)' },
      { x: 2, y: 4, label: 'R(2, 4)' },
    ],
  },
  // Enlargement: k = 1.5, Q1 & Q2
  {
    id: 'tri-k1.5-q1q2',
    k: 1.5,
    kStr: '1.5',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle DEF',
    preImage: [
      { x: -2, y: 2, label: 'D(-2, 2)' },
      { x: 4, y: 2, label: 'E(4, 2)' },
      { x: 2, y: 6, label: 'F(2, 6)' },
    ],
  },
  // Enlargement: k = 3, Q1
  {
    id: 'tri-k3-q1',
    k: 3,
    kStr: '3',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle JKL',
    preImage: [
      { x: 1, y: 1, label: 'J(1, 1)' },
      { x: 3, y: 1, label: 'K(3, 1)' },
      { x: 1, y: 3, label: 'L(1, 3)' },
    ],
  },
  // Enlargement: k = 4, Q1
  {
    id: 'tri-k4-q1',
    k: 4,
    kStr: '4',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle TUV',
    preImage: [
      { x: 1, y: 1, label: 'T(1, 1)' },
      { x: 2, y: 1, label: 'U(2, 1)' },
      { x: 1, y: 2, label: 'V(1, 2)' },
    ],
  },
  // Reduction: k = 0.5, Q1
  {
    id: 'tri-k0.5-q1',
    k: 0.5,
    kStr: '0.5',
    isEnlargement: false,
    geometryType: 'triangle',
    shapeName: 'Triangle MNO',
    preImage: [
      { x: 2, y: 4, label: 'M(2, 4)' },
      { x: 8, y: 2, label: 'N(8, 2)' },
      { x: 4, y: 8, label: 'O(4, 8)' },
    ],
  },
  // Reduction: k = 0.75 (3/4), Q1
  {
    id: 'tri-k0.75-q1',
    k: 0.75,
    kStr: '3/4',
    isEnlargement: false,
    geometryType: 'triangle',
    shapeName: 'Triangle ABC',
    preImage: [
      { x: 4, y: 4, label: 'A(4, 4)' },
      { x: 8, y: 4, label: 'B(8, 4)' },
      { x: 4, y: 8, label: 'C(4, 8)' },
    ],
  },
  // Reduction: k = 0.25 (1/4), Q1
  {
    id: 'tri-k0.25-q1',
    k: 0.25,
    kStr: '1/4',
    isEnlargement: false,
    geometryType: 'triangle',
    shapeName: 'Triangle XYZ',
    preImage: [
      { x: 4, y: 4, label: 'X(4, 4)' },
      { x: 8, y: 4, label: 'Y(8, 4)' },
      { x: 4, y: 12, label: 'Z(4, 12)' },
    ],
  },
  // Reduction: k = 0.5, Q1 & Q2
  {
    id: 'tri-k0.5-q1q2',
    k: 0.5,
    kStr: '0.5',
    isEnlargement: false,
    geometryType: 'triangle',
    shapeName: 'Triangle DEF',
    preImage: [
      { x: -4, y: 2, label: 'D(-4, 2)' },
      { x: 6, y: 2, label: 'E(6, 2)' },
      { x: 2, y: 8, label: 'F(2, 8)' },
    ],
  },
  // Enlargement: k = 2, Q2 & Q1
  {
    id: 'tri-k2-q2q1',
    k: 2,
    kStr: '2',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle GHI',
    preImage: [
      { x: -1, y: 3, label: 'G(-1, 3)' },
      { x: 2, y: 1, label: 'H(2, 1)' },
      { x: 1, y: 4, label: 'I(1, 4)' },
    ],
  },
  // Enlargement: k = 1.5, Q1
  {
    id: 'tri-k1.5-q1',
    k: 1.5,
    kStr: '1.5',
    isEnlargement: true,
    geometryType: 'triangle',
    shapeName: 'Triangle ABC',
    preImage: [
      { x: 2, y: 2, label: 'A(2, 2)' },
      { x: 6, y: 2, label: 'B(6, 2)' },
      { x: 2, y: 6, label: 'C(2, 6)' },
    ],
  },
  // Reduction: k = 0.75, Q1
  {
    id: 'tri-k0.75-q1-2',
    k: 0.75,
    kStr: '0.75',
    isEnlargement: false,
    geometryType: 'triangle',
    shapeName: 'Triangle PQR',
    preImage: [
      { x: 4, y: 8, label: 'P(4, 8)' },
      { x: 8, y: 4, label: 'Q(8, 4)' },
      { x: 8, y: 8, label: 'R(8, 8)' },
    ],
  },
];

// 2. Curated Quadrilateral Origin Dilations (Clean integer/half-integer coordinates)
const QUADRILATERAL_ORIGIN_CONFIGS: OriginDilationConfig[] = [
  // Enlargement: k = 2, Rectangle
  {
    id: 'quad-k2-rect',
    k: 2,
    kStr: '2',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Rectangle ABCD',
    preImage: [
      { x: 1, y: 1, label: 'A(1, 1)' },
      { x: 4, y: 1, label: 'B(4, 1)' },
      { x: 4, y: 3, label: 'C(4, 3)' },
      { x: 1, y: 3, label: 'D(1, 3)' },
    ],
  },
  // Enlargement: k = 1.5, Trapezoid across Q1 & Q2
  {
    id: 'quad-k1.5-trap',
    k: 1.5,
    kStr: '1.5',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Trapezoid EFGH',
    preImage: [
      { x: -2, y: 2, label: 'E(-2, 2)' },
      { x: 4, y: 2, label: 'F(4, 2)' },
      { x: 2, y: 4, label: 'G(2, 4)' },
      { x: 0, y: 4, label: 'H(0, 4)' },
    ],
  },
  // Reduction: k = 0.5, Rectangle
  {
    id: 'quad-k0.5-rect',
    k: 0.5,
    kStr: '0.5',
    isEnlargement: false,
    geometryType: 'quadrilateral',
    shapeName: 'Rectangle WXYZ',
    preImage: [
      { x: 2, y: 2, label: 'W(2, 2)' },
      { x: 8, y: 2, label: 'X(8, 2)' },
      { x: 8, y: 6, label: 'Y(8, 6)' },
      { x: 2, y: 6, label: 'Z(2, 6)' },
    ],
  },
  // Enlargement: k = 2.5, Rectangle
  {
    id: 'quad-k2.5-rect',
    k: 2.5,
    kStr: '2.5',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Rectangle ABCD',
    preImage: [
      { x: 1, y: 1, label: 'A(1, 1)' },
      { x: 3, y: 1, label: 'B(3, 1)' },
      { x: 3, y: 2, label: 'C(3, 2)' },
      { x: 1, y: 2, label: 'D(1, 2)' },
    ],
  },
  // Reduction: k = 0.25 (1/4), Quadrilateral
  {
    id: 'quad-k0.25-poly',
    k: 0.25,
    kStr: '1/4',
    isEnlargement: false,
    geometryType: 'quadrilateral',
    shapeName: 'Quadrilateral PQRS',
    preImage: [
      { x: 4, y: 4, label: 'P(4, 4)' },
      { x: 12, y: 4, label: 'Q(12, 4)' },
      { x: 8, y: 8, label: 'R(8, 8)' },
      { x: 4, y: 8, label: 'S(4, 8)' },
    ],
  },
  // Enlargement: k = 3, Rectangle
  {
    id: 'quad-k3-rect',
    k: 3,
    kStr: '3',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Rectangle JKLM',
    preImage: [
      { x: 1, y: 1, label: 'J(1, 1)' },
      { x: 3, y: 1, label: 'K(3, 1)' },
      { x: 3, y: 2, label: 'L(3, 2)' },
      { x: 1, y: 2, label: 'M(1, 2)' },
    ],
  },
  // Enlargement: k = 4, Square
  {
    id: 'quad-k4-sq',
    k: 4,
    kStr: '4',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Square EFGH',
    preImage: [
      { x: 1, y: 1, label: 'E(1, 1)' },
      { x: 2, y: 1, label: 'F(2, 1)' },
      { x: 2, y: 2, label: 'G(2, 2)' },
      { x: 1, y: 2, label: 'H(1, 2)' },
    ],
  },
  // Reduction: k = 0.75 (3/4), Rectangle
  {
    id: 'quad-k0.75-rect',
    k: 0.75,
    kStr: '3/4',
    isEnlargement: false,
    geometryType: 'quadrilateral',
    shapeName: 'Rectangle ABCD',
    preImage: [
      { x: 4, y: 4, label: 'A(4, 4)' },
      { x: 8, y: 4, label: 'B(8, 4)' },
      { x: 8, y: 8, label: 'C(8, 8)' },
      { x: 4, y: 8, label: 'D(4, 8)' },
    ],
  },
  // Enlargement: k = 2, Parallelogram
  {
    id: 'quad-k2-para',
    k: 2,
    kStr: '2',
    isEnlargement: true,
    geometryType: 'quadrilateral',
    shapeName: 'Parallelogram KLMN',
    preImage: [
      { x: 1, y: 1, label: 'K(1, 1)' },
      { x: 3, y: 1, label: 'L(3, 1)' },
      { x: 4, y: 3, label: 'M(4, 3)' },
      { x: 2, y: 3, label: 'N(2, 3)' },
    ],
  },
  // Reduction: k = 0.5, Trapezoid
  {
    id: 'quad-k0.5-trap',
    k: 0.5,
    kStr: '0.5',
    isEnlargement: false,
    geometryType: 'quadrilateral',
    shapeName: 'Trapezoid QRST',
    preImage: [
      { x: 2, y: 2, label: 'Q(2, 2)' },
      { x: 8, y: 2, label: 'R(8, 2)' },
      { x: 6, y: 6, label: 'S(6, 6)' },
      { x: 4, y: 6, label: 'T(4, 6)' },
    ],
  },
];

// 3. Curated Single-Point Origin Dilations
interface SinglePointConfig {
  id: string;
  name: string;
  px: number;
  py: number;
  k: number;
  kStr: string;
  isEnlargement: boolean;
}

const SINGLE_POINT_CONFIGS: SinglePointConfig[] = [
  { id: 'pt-k2-1', name: 'P', px: 3, py: 4, k: 2, kStr: '2', isEnlargement: true },
  { id: 'pt-k2.5-1', name: 'Q', px: 2, py: 4, k: 2.5, kStr: '2.5', isEnlargement: true },
  { id: 'pt-k3-1', name: 'R', px: 2, py: 3, k: 3, kStr: '3', isEnlargement: true },
  { id: 'pt-k4-1', name: 'S', px: 1, py: 2, k: 4, kStr: '4', isEnlargement: true },
  { id: 'pt-k1.5-1', name: 'T', px: 4, py: 2, k: 1.5, kStr: '1.5', isEnlargement: true },
  { id: 'pt-k0.5-1', name: 'M', px: 6, py: 8, k: 0.5, kStr: '0.5', isEnlargement: false },
  { id: 'pt-k0.75-1', name: 'A', px: 4, py: 8, k: 0.75, kStr: '3/4', isEnlargement: false },
  { id: 'pt-k0.25-1', name: 'B', px: 8, py: 4, k: 0.25, kStr: '1/4', isEnlargement: false },
  { id: 'pt-k2-neg', name: 'C', px: -3, py: 4, k: 2, kStr: '2', isEnlargement: true },
  { id: 'pt-k0.5-neg', name: 'D', px: -4, py: -6, k: 0.5, kStr: '0.5', isEnlargement: false },
  { id: 'pt-k1.5-2', name: 'E', px: 2, py: 4, k: 1.5, kStr: '1.5', isEnlargement: true },
  { id: 'pt-k3-2', name: 'F', px: 1, py: 3, k: 3, kStr: '3', isEnlargement: true },
];

function computeOriginImageVertices(
  preImage: { x: number; y: number; label: string }[],
  k: number
): { x: number; y: number; label: string }[] {
  return preImage.map((pt) => {
    const rawLetter = pt.label.split('(')[0] || 'P';
    const ix = Number((pt.x * k).toFixed(2));
    const iy = Number((pt.y * k).toFixed(2));
    return {
      x: ix,
      y: iy,
      label: `${rawLetter}'(${ix}, ${iy})`,
    };
  });
}

// Global rotation and consecutive tracking for Algebraic Rules
const ALGEBRAIC_FAMILIES = [
  'single-point',
  'triangle',
  'quadrilateral',
  'apply-rule',
  'find-k',
  'identify-true-dilation',
  'identify-non-dilation',
  'enlargement-reduction',
] as const;

type AlgebraicFamilyType = (typeof ALGEBRAIC_FAMILIES)[number];

let lastAlgebraicFamily: AlgebraicFamilyType | null = null;
let lastSelectedConfigId: string | null = null;

function selectNextAlgebraicFamily(): AlgebraicFamilyType {
  // Enforce rotation: filter out the immediately preceding family so that
  // consecutive problems ALWAYS vary the problem family and visual structure!
  const candidates = lastAlgebraicFamily
    ? ALGEBRAIC_FAMILIES.filter((fam) => fam !== lastAlgebraicFamily)
    : ALGEBRAIC_FAMILIES;
  const chosen = randomChoice(candidates);
  lastAlgebraicFamily = chosen;
  return chosen;
}

function getVariedTriangleConfig(): OriginDilationConfig {
  const candidates = TRIANGLE_ORIGIN_CONFIGS.filter((c) => c.id !== lastSelectedConfigId);
  const chosen = randomChoice(candidates.length > 0 ? candidates : TRIANGLE_ORIGIN_CONFIGS);
  lastSelectedConfigId = chosen.id;
  return chosen;
}

function getVariedQuadrilateralConfig(): OriginDilationConfig {
  const candidates = QUADRILATERAL_ORIGIN_CONFIGS.filter((c) => c.id !== lastSelectedConfigId);
  const chosen = randomChoice(candidates.length > 0 ? candidates : QUADRILATERAL_ORIGIN_CONFIGS);
  lastSelectedConfigId = chosen.id;
  return chosen;
}

function getVariedSinglePointConfig(): SinglePointConfig {
  const candidates = SINGLE_POINT_CONFIGS.filter((c) => c.id !== lastSelectedConfigId);
  const chosen = randomChoice(candidates.length > 0 ? candidates : SINGLE_POINT_CONFIGS);
  lastSelectedConfigId = chosen.id;
  return chosen;
}

// -------------------------------------------------------------------------
// FAMILY 1: SINGLE POINT
// Pre-image point P(x, y) and image P'(x', y') dilated centered at (0, 0).
// Students determine scale factor or algebraic dilation rule.
// -------------------------------------------------------------------------
function generateFamily1SinglePoint(): PracticeProblem {
  const cfg = getVariedSinglePointConfig();
  const ix = Number((cfg.px * cfg.k).toFixed(2));
  const iy = Number((cfg.py * cfg.k).toFixed(2));
  const preImage = [{ x: cfg.px, y: cfg.py, label: `${cfg.name}(${cfg.px}, ${cfg.py})` }];
  const image = [{ x: ix, y: iy, label: `${cfg.name}'(${ix}, ${iy})` }];

  const askForRule = Math.random() > 0.4;

  if (askForRule) {
    const correct = `(x, y) → (${cfg.kStr}x, ${cfg.kStr}y)`;
    const dx = Number((ix - cfg.px).toFixed(1));
    const dy = Number((iy - cfg.py).toFixed(1));
    const distractorTranslate = `(x, y) → (x ${dx >= 0 ? '+' : '-'} ${Math.abs(dx)}, y ${dy >= 0 ? '+' : '-'} ${Math.abs(dy)})`;
    const altK = Number((cfg.k > 1 ? cfg.k + 1 : cfg.k + 0.5).toFixed(1));
    const distractorUneven = `(x, y) → (${cfg.kStr}x, ${altK}y)`;
    const recip = Number((1 / cfg.k).toFixed(2));
    const distractorRecip = `(x, y) → (${recip}x, ${recip}y)`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorTranslate,
      distractorUneven,
      distractorRecip,
    ]);

    return {
      id: `ar-pt-rule-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `Under a dilation centered at the origin (0, 0), pre-image point ${cfg.name}(${cfg.px}, ${cfg.py}) is mapped to image point ${cfg.name}'(${ix}, ${iy}). Which algebraic coordinate rule represents this dilation?`,
      options,
      correctIndex,
      hint: `Find the scale factor k by dividing the image coordinates by the pre-image coordinates: k = ${ix} ÷ ${cfg.px}. The origin dilation rule is (x, y) → (kx, ky).`,
      solutionSteps: [
        `Identify corresponding pre-image and image coordinates: ${cfg.name}(${cfg.px}, ${cfg.py}) → ${cfg.name}'(${ix}, ${iy}).`,
        `Compute scale factor for x: k = Image x ÷ Pre-Image x = ${ix} ÷ ${cfg.px} = ${cfg.kStr}.`,
        `Verify scale factor for y: k = Image y ÷ Pre-Image y = ${iy} ÷ ${cfg.py} = ${cfg.kStr}.`,
        `Since both coordinates are multiplied by ${cfg.kStr}, the dilation rule is (x, y) → (${cfg.kStr}x, ${cfg.kStr}y).`,
      ],
      keyTakeaway:
        'Dilations centered at the origin always multiply both coordinates by the same scale factor k: (x, y) → (kx, ky).',
      geometryType: 'point',
      preImageVertices: preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: 'point',
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  } else {
    // Mode B: Determine scale factor k
    const correct = `k = ${cfg.kStr}`;
    const recipVal = Number((1 / cfg.k).toFixed(2));
    const distractorRecip = `k = ${recipVal}`;
    const altKVal = Number((cfg.k > 1 ? cfg.k + 1 : cfg.k + 0.5).toFixed(1));
    const distractorAlt = `k = ${altKVal}`;
    const diff = Math.abs(ix - cfg.px);
    const distractorDiff = `k = ${diff}`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorRecip,
      distractorAlt,
      distractorDiff,
    ]);

    return {
      id: `ar-pt-k-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `On the coordinate grid, vertex ${cfg.name}(${cfg.px}, ${cfg.py}) is dilated centered at the origin (0, 0) to produce image ${cfg.name}'(${ix}, ${iy}). What is the scale factor k of the dilation?`,
      options,
      correctIndex,
      hint: `Recall the scale factor formula: k = (Image coordinate) ÷ (Pre-image coordinate). Both x and y will yield the same ratio.`,
      solutionSteps: [
        `Use the dilation formula centered at origin: Image = k × Pre-image.`,
        `Solve for k using the x-coordinates: k = ${ix} ÷ ${cfg.px} = ${cfg.kStr}.`,
        `Confirm using the y-coordinates: k = ${iy} ÷ ${cfg.py} = ${cfg.kStr}.`,
        `Therefore, the scale factor is k = ${cfg.kStr}.`,
      ],
      keyTakeaway:
        'Always compute scale factor as k = Image ÷ Pre-image. When k > 1 it is an enlargement; when 0 < k < 1 it is a reduction.',
      geometryType: 'point',
      preImageVertices: preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: 'point',
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  }
}

// -------------------------------------------------------------------------
// FAMILY 2: TRIANGLE
// Triangle ABC and its dilated image A'B'C'.
// Students determine the algebraic rule or scale factor.
// -------------------------------------------------------------------------
function generateFamily2Triangle(): PracticeProblem {
  const cfg = getVariedTriangleConfig();
  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const p0 = cfg.preImage[0];
  const i0 = image[0];

  const askForRule = Math.random() > 0.35;

  if (askForRule) {
    const correct = `(x, y) → (${cfg.kStr}x, ${cfg.kStr}y)`;
    const dx = Number((i0.x - p0.x).toFixed(1));
    const dy = Number((i0.y - p0.y).toFixed(1));
    const distractorTranslate = `(x, y) → (x ${dx >= 0 ? '+' : '-'} ${Math.abs(dx)}, y ${dy >= 0 ? '+' : '-'} ${Math.abs(dy)})`;
    const altK = Number((cfg.k > 1 ? cfg.k + 0.5 : cfg.k + 0.25).toFixed(2));
    const distractorUneven = `(x, y) → (${cfg.kStr}x, ${altK}y)`;
    const recip = Number((1 / cfg.k).toFixed(2));
    const distractorRecip = `(x, y) → (${recip}x, ${recip}y)`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorTranslate,
      distractorUneven,
      distractorRecip,
    ]);

    return {
      id: `ar-tri-rule-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `On the coordinate plane, ${cfg.shapeName} is dilated centered at the origin (0, 0) to produce image ${cfg.shapeName}'. Which algebraic coordinate rule describes this dilation?`,
      options,
      correctIndex,
      hint: `Pick any vertex from ${cfg.shapeName} and its corresponding prime vertex on ${cfg.shapeName}'. Calculate k = Image ÷ Pre-image. The rule is (x, y) → (kx, ky).`,
      solutionSteps: [
        `Select corresponding vertices on the grid: ${p0.label} and ${i0.label}.`,
        `Calculate the scale factor: k = ${i0.x} ÷ ${p0.x} = ${cfg.kStr}.`,
        `Check with the y-coordinates: k = ${i0.y} ÷ ${p0.y} = ${cfg.kStr}.`,
        `Because the center of dilation is the origin (0, 0), every vertex coordinate is multiplied by ${cfg.kStr}: (x, y) → (${cfg.kStr}x, ${cfg.kStr}y).`,
      ],
      keyTakeaway:
        'To find the algebraic rule for a polygon dilation, compare one pair of corresponding coordinates: k = Image ÷ Pre-image. The rule is (x, y) → (kx, ky).',
      geometryType: 'triangle',
      preImageVertices: cfg.preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: 'triangle',
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage: cfg.preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  } else {
    // Mode B: Determine scale factor
    const correct = `k = ${cfg.kStr}`;
    const recip = Number((1 / cfg.k).toFixed(2));
    const distractorRecip = `k = ${recip}`;
    const altK = Number((cfg.k > 1 ? cfg.k + 1 : cfg.k + 0.5).toFixed(1));
    const distractorAlt = `k = ${altK}`;
    const distractorAdd = `k = ${Math.abs(Number((i0.x - p0.x).toFixed(1)))}`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorRecip,
      distractorAlt,
      distractorAdd,
    ]);

    return {
      id: `ar-tri-k-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `On the coordinate grid, ${cfg.shapeName} is dilated with the center of dilation at the origin (0, 0) to produce ${cfg.shapeName}'. What is the scale factor k of this dilation?`,
      options,
      correctIndex,
      hint: `Compare the coordinates of any vertex to its image: k = (Image Coordinate) ÷ (Pre-Image Coordinate).`,
      solutionSteps: [
        `Select pre-image vertex ${p0.label} and image vertex ${i0.label}.`,
        `Divide the image coordinate by the pre-image coordinate: k = ${i0.x} ÷ ${p0.x} = ${cfg.kStr}.`,
        `Verify with the second coordinate: k = ${i0.y} ÷ ${p0.y} = ${cfg.kStr}.`,
        `The scale factor of the dilation is k = ${cfg.kStr}.`,
      ],
      keyTakeaway:
        'For all figures dilated about the origin, k = x\'/x = y\'/y. The same constant ratio applies to all vertices.',
      geometryType: 'triangle',
      preImageVertices: cfg.preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: 'triangle',
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage: cfg.preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  }
}

// -------------------------------------------------------------------------
// FAMILY 3: QUADRILATERAL
// Quadrilateral and its dilated image on the coordinate plane.
// Students determine the algebraic coordinate rule.
// -------------------------------------------------------------------------
function generateFamily3Quadrilateral(): PracticeProblem {
  const cfg = getVariedQuadrilateralConfig();
  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const p0 = cfg.preImage[0];
  const i0 = image[0];

  const correct = `(x, y) → (${cfg.kStr}x, ${cfg.kStr}y)`;
  const dx = Number((i0.x - p0.x).toFixed(1));
  const dy = Number((i0.y - p0.y).toFixed(1));
  const distractorTranslate = `(x, y) → (x ${dx >= 0 ? '+' : '-'} ${Math.abs(dx)}, y ${dy >= 0 ? '+' : '-'} ${Math.abs(dy)})`;
  const altK = Number((cfg.k > 1 ? cfg.k + 0.5 : cfg.k + 0.25).toFixed(2));
  const distractorUneven = `(x, y) → (${cfg.kStr}x, ${altK}y)`;
  const recip = Number((1 / cfg.k).toFixed(2));
  const distractorRecip = `(x, y) → (${recip}x, ${recip}y)`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorTranslate,
    distractorUneven,
    distractorRecip,
  ]);

  return {
    id: `ar-quad-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'algebraic-rules',
    skillTitle: 'Algebraic Coordinate Rules',
    difficulty: 'Standard',
    question: `On the coordinate grid, ${cfg.shapeName} is dilated with the center of dilation at the origin (0, 0) to produce image ${cfg.shapeName}'. Which algebraic coordinate rule represents this dilation?`,
    options,
    correctIndex,
    hint: `Find the scale factor k by dividing any image vertex coordinate by its corresponding pre-image coordinate: k = Image ÷ Pre-image. The rule has the form (x, y) → (kx, ky).`,
    solutionSteps: [
      `Identify corresponding vertices from the diagram: ${p0.label} maps to ${i0.label}.`,
      `Compute the scale factor: k = ${i0.x} ÷ ${p0.x} = ${cfg.kStr} (and verify with y: ${i0.y} ÷ ${p0.y} = ${cfg.kStr}).`,
      `In an origin dilation, each coordinate is multiplied by the scale factor k = ${cfg.kStr}: (x, y) → (${cfg.kStr}x, ${cfg.kStr}y).`,
      `Translational rules that add or subtract numbers move the quadrilateral without scaling it.`,
    ],
    keyTakeaway:
      'Any polygon dilated about the origin follows the rule (x, y) → (kx, ky). Both dimensions are scaled by the identical factor k.',
    geometryType: 'quadrilateral',
    preImageVertices: cfg.preImage,
    imageVertices: image,
    scaleFactor: cfg.k,
    center: { x: 0, y: 0 },
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: 'quadrilateral',
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: cfg.preImage,
        image,
        scaleFactor: cfg.k,
        showRays: true,
      },
    },
  };
}

// -------------------------------------------------------------------------
// FAMILY 4: APPLY THE RULE
// Give a rule such as (x, y) → (2x, 2y) or (0.5x, 0.5y).
// Students determine image coordinates.
// Alternates dynamically between triangles, quadrilaterals, and points!
// -------------------------------------------------------------------------
function generateFamily4ApplyRule(): PracticeProblem {
  const geomType = randomChoice(['triangle', 'quadrilateral', 'point']);
  let cfg: OriginDilationConfig;

  if (geomType === 'triangle') {
    cfg = getVariedTriangleConfig();
  } else if (geomType === 'quadrilateral') {
    cfg = getVariedQuadrilateralConfig();
  } else {
    const pt = getVariedSinglePointConfig();
    cfg = {
      id: pt.id,
      k: pt.k,
      kStr: pt.kStr,
      isEnlargement: pt.isEnlargement,
      geometryType: 'point',
      shapeName: `Point ${pt.name}`,
      preImage: [{ x: pt.px, y: pt.py, label: `${pt.name}(${pt.px}, ${pt.py})` }],
    };
  }

  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const targetIdx = randomInt(0, cfg.preImage.length - 1);
  const targetPre = cfg.preImage[targetIdx];
  const targetImg = image[targetIdx];
  const rawName = targetPre.label.split('(')[0] || 'P';

  const correct = `(${targetImg.x}, ${targetImg.y})`;
  const distractorAdd = `(${Number((targetPre.x + cfg.k).toFixed(1))}, ${Number((targetPre.y + cfg.k).toFixed(1))})`;
  const distractorOne = `(${targetImg.x}, ${targetPre.y})`;
  const distractorRecip = `(${Number((targetPre.x / cfg.k).toFixed(1))}, ${Number((targetPre.y / cfg.k).toFixed(1))})`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorAdd,
    distractorOne,
    distractorRecip,
  ]);

  return {
    id: `ar-apply-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'algebraic-rules',
    skillTitle: 'Algebraic Coordinate Rules',
    difficulty: 'Standard',
    question: `A figure on the coordinate plane is dilated centered at the origin according to the algebraic coordinate rule (x, y) → (${cfg.kStr}x, ${cfg.kStr}y). If pre-image vertex ${rawName} is located at (${targetPre.x}, ${targetPre.y}), what are the coordinates of image vertex ${rawName}'?`,
    options,
    correctIndex,
    hint: `Apply the algebraic rule by multiplying each coordinate of ${rawName}(${targetPre.x}, ${targetPre.y}) by the scale factor ${cfg.kStr}: x' = ${cfg.kStr} × ${targetPre.x} and y' = ${cfg.kStr} × ${targetPre.y}.`,
    solutionSteps: [
      `The given algebraic rule is (x, y) → (${cfg.kStr}x, ${cfg.kStr}y), with scale factor k = ${cfg.kStr}.`,
      `Multiply the x-coordinate: x' = ${cfg.kStr} × (${targetPre.x}) = ${targetImg.x}.`,
      `Multiply the y-coordinate: y' = ${cfg.kStr} × (${targetPre.y}) = ${targetImg.y}.`,
      `Therefore, the coordinates of the dilated vertex are ${rawName}'(${targetImg.x}, ${targetImg.y}).`,
    ],
    keyTakeaway:
      'To apply an algebraic rule (x, y) → (kx, ky), multiply both the x- and y-coordinates of each point by k.',
    geometryType: cfg.geometryType,
    preImageVertices: cfg.preImage,
    imageVertices: image,
    scaleFactor: cfg.k,
    center: { x: 0, y: 0 },
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: cfg.geometryType,
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: cfg.preImage,
        image,
        scaleFactor: cfg.k,
        showRays: true,
      },
    },
  };
}

// -------------------------------------------------------------------------
// FAMILY 5: FIND k
// Give corresponding pre-image and image coordinates.
// Students calculate the scale factor k.
// -------------------------------------------------------------------------
function generateFamily5FindK(): PracticeProblem {
  const usePolygon = Math.random() > 0.35;
  let cfg: OriginDilationConfig;

  if (usePolygon) {
    cfg = Math.random() > 0.5 ? getVariedTriangleConfig() : getVariedQuadrilateralConfig();
  } else {
    const pt = getVariedSinglePointConfig();
    cfg = {
      id: pt.id,
      k: pt.k,
      kStr: pt.kStr,
      isEnlargement: pt.isEnlargement,
      geometryType: 'point',
      shapeName: `Point ${pt.name}`,
      preImage: [{ x: pt.px, y: pt.py, label: `${pt.name}(${pt.px}, ${pt.py})` }],
    };
  }

  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const targetIdx = randomInt(0, cfg.preImage.length - 1);
  const p = cfg.preImage[targetIdx];
  const img = image[targetIdx];
  const name = p.label.split('(')[0] || 'P';

  const correct = `k = ${cfg.kStr}`;
  const recip = Number((1 / cfg.k).toFixed(2));
  const distractorRecip = `k = ${recip}`;
  const altK = Number((cfg.k > 1 ? cfg.k + 1 : cfg.k + 0.5).toFixed(1));
  const distractorAlt = `k = ${altK}`;
  const distractorDiff = `k = ${Math.abs(Number((img.x - p.x).toFixed(1)))}`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorRecip,
    distractorAlt,
    distractorDiff,
  ]);

  return {
    id: `ar-findk-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'algebraic-rules',
    skillTitle: 'Algebraic Coordinate Rules',
    difficulty: 'Standard',
    question: `Under an origin-centered dilation (x, y) → (kx, ky), vertex ${name}(${p.x}, ${p.y}) is mapped to image vertex ${name}'(${img.x}, ${img.y}) as shown in the diagram. What is the scale factor k of the dilation?`,
    options,
    correctIndex,
    hint: `Divide the image coordinate by the pre-image coordinate: k = (Image x) ÷ (Pre-Image x). Both x and y give the same scale factor.`,
    solutionSteps: [
      `Identify the corresponding coordinates: Pre-image ${name}(${p.x}, ${p.y}) and Image ${name}'(${img.x}, ${img.y}).`,
      `Set up the scale factor ratio: k = Image ÷ Pre-image = ${img.x} ÷ ${p.x}.`,
      `Perform the division: k = ${cfg.kStr}.`,
      `Verify with y-coordinates: ${img.y} ÷ ${p.y} = ${cfg.kStr}. Both confirm k = ${cfg.kStr}.`,
    ],
    keyTakeaway:
      'Always calculate scale factor as k = Image ÷ Pre-image. Remember: Image goes in the numerator, Pre-image in the denominator.',
    geometryType: cfg.geometryType,
    preImageVertices: cfg.preImage,
    imageVertices: image,
    scaleFactor: cfg.k,
    center: { x: 0, y: 0 },
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: cfg.geometryType,
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: cfg.preImage,
        image,
        scaleFactor: cfg.k,
        showRays: true,
      },
    },
  };
}

// -------------------------------------------------------------------------
// FAMILY 6: IDENTIFY A TRUE DILATION
// Give four algebraic rules.
// Students identify which one represents a dilation centered at the origin.
// Distractors: (x+3, y+3), (2x, 3y), (x-2, y+4)
// -------------------------------------------------------------------------
function generateFamily6IdentifyTrueDilation(): PracticeProblem {
  const cfg = Math.random() > 0.5 ? getVariedTriangleConfig() : getVariedQuadrilateralConfig();
  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const kStr = cfg.kStr;

  const correct = `(x, y) → (${kStr}x, ${kStr}y)`;
  const distractorTranslation1 = '(x, y) → (x + 3, y + 3)';
  const distractorUneven = `(x, y) → (2x, 3y)`;
  const distractorTranslation2 = '(x, y) → (x - 2, y + 4)';

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorTranslation1,
    distractorUneven,
    distractorTranslation2,
  ]);

  const p0 = cfg.preImage[0];
  const i0 = image[0];

  return {
    id: `ar-true-dil-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'algebraic-rules',
    skillTitle: 'Algebraic Coordinate Rules',
    difficulty: 'Standard',
    question:
      'Which of the following algebraic representations represents a true dilation centered at the origin?',
    options,
    correctIndex,
    hint: `A true dilation centered at the origin must MULTIPLY both x and y by the EXACT SAME constant scale factor k: (x, y) → (kx, ky). Adding numbers slides the shape (translation), and different multipliers distort it.`,
    solutionSteps: [
      `A true origin dilation scales distances from (0, 0) by a constant multiplier k: (x, y) → (kx, ky).`,
      `(x, y) → (${kStr}x, ${kStr}y) is a true dilation because both x and y are multiplied by the same factor k = ${kStr}.`,
      `(x, y) → (2x, 3y) is NOT a dilation; unequal multipliers stretch and distort the geometric shape.`,
      `(x, y) → (x + 3, y + 3) and (x, y) → (x - 2, y + 4) are translations (rigid slides), not dilations.`,
    ],
    keyTakeaway:
      'A dilation centered at the origin ALWAYS has the form (x, y) → (kx, ky). Both coordinates MUST share the exact same multiplier.',
    geometryType: cfg.geometryType,
    preImageVertices: cfg.preImage,
    imageVertices: image,
    scaleFactor: cfg.k,
    center: { x: 0, y: 0 },
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: cfg.geometryType,
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: cfg.preImage,
        image,
        scaleFactor: cfg.k,
        showRays: true,
      },
    },
  };
}

// -------------------------------------------------------------------------
// FAMILY 7: IDENTIFY A NON-DILATION
// Ask which algebraic rule does NOT represent a dilation.
// 3 choices ARE true dilations, 1 choice is NOT a dilation.
// -------------------------------------------------------------------------
function generateFamily7IdentifyNonDilation(): PracticeProblem {
  const cfg = Math.random() > 0.5 ? getVariedTriangleConfig() : getVariedQuadrilateralConfig();
  const image = computeOriginImageVertices(cfg.preImage, cfg.k);

  // The correct answer is the one that is NOT a dilation
  const nonDilationChoices = [
    { rule: '(x, y) → (x + 4, y + 4)', reason: 'it adds 4 to each coordinate, which represents a translation (slide) rather than a dilation' },
    { rule: '(x, y) → (2x, 5y)', reason: 'the x and y multipliers are different (2 and 5), which stretches and distorts the figure' },
    { rule: '(x, y) → (x - 3, y + 2)', reason: 'it adds/subtracts constants, which represents a translation rather than a dilation' },
    { rule: '(x, y) → (3x, 4y)', reason: 'it uses unequal scaling factors (3 and 4), destroying geometric similarity' },
  ];
  const chosenNonDilation = randomChoice(nonDilationChoices);
  const correct = chosenNonDilation.rule;

  // 3 true dilations as distractors
  const trueDilationPool = [
    '(x, y) → (2x, 2y)',
    '(x, y) → (0.5x, 0.5y)',
    '(x, y) → (1.5x, 1.5y)',
    '(x, y) → (3x, 3y)',
    '(x, y) → (0.25x, 0.25y)',
    '(x, y) → (4x, 4y)',
    '(x, y) → (2.5x, 2.5y)',
  ];
  const shuffledTrue = [...trueDilationPool].sort(() => Math.random() - 0.5).slice(0, 3);

  const { options, correctIndex } = shuffleOptions(correct, shuffledTrue);

  return {
    id: `ar-non-dil-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'algebraic-rules',
    skillTitle: 'Algebraic Coordinate Rules',
    difficulty: 'Standard',
    question:
      'Which of the following algebraic coordinate rules does NOT represent a dilation centered at the origin?',
    options,
    correctIndex,
    hint: `Remember that a true origin dilation MUST multiply both x and y by the same number: (x, y) → (kx, ky). Look for a rule that either adds/subtracts values or multiplies x and y by different numbers.`,
    solutionSteps: [
      `A true dilation centered at the origin has the algebraic form (x, y) → (kx, ky) where both coordinates are multiplied by the same non-zero scale factor k.`,
      `${chosenNonDilation.rule} does NOT represent a dilation because ${chosenNonDilation.reason}.`,
      `The other three options all multiply both x and y by the exact same constant, which correctly resizes figures proportionally.`,
    ],
    keyTakeaway:
      'Rules with addition/subtraction like (x + a, y + b) are translations. Rules with unequal multipliers like (ax, by) are distortions. Only (kx, ky) is a true dilation.',
    geometryType: cfg.geometryType,
    preImageVertices: cfg.preImage,
    imageVertices: image,
    scaleFactor: cfg.k,
    center: { x: 0, y: 0 },
    visualData: {
      type: 'coordinate-grid',
      gridData: {
        geometryType: cfg.geometryType,
        center: { x: 0, y: 0, label: 'Origin (0, 0)' },
        preImage: cfg.preImage,
        image,
        scaleFactor: cfg.k,
        showRays: true,
      },
    },
  };
}

// -------------------------------------------------------------------------
// FAMILY 8: ENLARGEMENT VS. REDUCTION
// Use scale factors both > 1 and 0 < k < 1.
// Students identify whether enlargement or reduction and/or determine the rule.
// -------------------------------------------------------------------------
function generateFamily8EnlargementReduction(): PracticeProblem {
  const cfg = Math.random() > 0.5 ? getVariedTriangleConfig() : getVariedQuadrilateralConfig();
  const image = computeOriginImageVertices(cfg.preImage, cfg.k);
  const isEnlarge = cfg.isEnlargement;
  const kStr = cfg.kStr;

  const subType = Math.random() > 0.5 ? 'classification' : 'rule-and-type';

  if (subType === 'classification') {
    const correct = isEnlarge
      ? `It is an enlargement because the scale factor k = ${kStr} is greater than 1 (k > 1).`
      : `It is a reduction because the scale factor k = ${kStr} is between 0 and 1 (0 < k < 1).`;

    const distractorOpposite = isEnlarge
      ? `It is a reduction because the scale factor k = ${kStr} is greater than 1.`
      : `It is an enlargement because both coordinates are multiplied by positive ${kStr}.`;

    const distractorTranslation = `It is a translation that shifts the figure by ${kStr} units.`;
    const distractorCongruence = `It is a rigid motion that preserves side lengths and shape.`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorOpposite,
      distractorTranslation,
      distractorCongruence,
    ]);

    return {
      id: `ar-enlarge-class-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `Which statement correctly describes the transformation represented by the algebraic coordinate rule (x, y) → (${kStr}x, ${kStr}y)?`,
      options,
      correctIndex,
      hint: `Check the scale factor k. If k > 1, the image expands (enlargement). If 0 < k < 1, the image shrinks (reduction).`,
      solutionSteps: [
        `Identify the scale factor k from the rule (x, y) → (${kStr}x, ${kStr}y): k = ${kStr}.`,
        isEnlarge
          ? `Because k = ${kStr} > 1, distances from the origin increase, making the image larger (an ENLARGEMENT).`
          : `Because 0 < k = ${kStr} < 1, distances from the origin decrease, making the image smaller (a REDUCTION).`,
        `Multiplication by a scalar changes size while preserving angles and similarity.`,
      ],
      keyTakeaway:
        'In dilation rule (x, y) → (kx, ky): If k > 1, it is an ENLARGEMENT. If 0 < k < 1, it is a REDUCTION.',
      geometryType: cfg.geometryType,
      preImageVertices: cfg.preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: cfg.geometryType,
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage: cfg.preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  } else {
    // Mode B: Determine both type and rule from the diagram
    const correct = `${isEnlarge ? 'Enlargement' : 'Reduction'} with rule (x, y) → (${kStr}x, ${kStr}y)`;
    const distractorWrongType = `${isEnlarge ? 'Reduction' : 'Enlargement'} with rule (x, y) → (${kStr}x, ${kStr}y)`;
    const recip = Number((1 / cfg.k).toFixed(2));
    const distractorRecip = `${isEnlarge ? 'Enlargement' : 'Reduction'} with rule (x, y) → (${recip}x, ${recip}y)`;
    const distractorTranslate = `Translation with rule (x, y) → (x + ${kStr}, y + ${kStr})`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorWrongType,
      distractorRecip,
      distractorTranslate,
    ]);

    return {
      id: `ar-enlarge-diag-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'algebraic-rules',
      skillTitle: 'Algebraic Coordinate Rules',
      difficulty: 'Standard',
      question: `Examine the origin-centered dilation of ${cfg.shapeName} (blue) to ${cfg.shapeName}' (green) on the coordinate plane. Which statement correctly classifies this dilation and its algebraic rule?`,
      options,
      correctIndex,
      hint: `Compare the size of image (green) to pre-image (blue): is it larger or smaller? Then compute k = Image ÷ Pre-image to write (x, y) → (kx, ky).`,
      solutionSteps: [
        `Compare the image (green) to the pre-image (blue): ${isEnlarge ? 'The image is larger, so this is an ENLARGEMENT.' : 'The image is smaller, so this is a REDUCTION.'}`,
        `Find scale factor k: divide an image coordinate by its pre-image coordinate: k = ${cfg.kStr}.`,
        `Write the algebraic rule: (x, y) → (${kStr}x, ${kStr}y).`,
        `Combining both: ${isEnlarge ? 'Enlargement' : 'Reduction'} with rule (x, y) → (${kStr}x, ${kStr}y).`,
      ],
      keyTakeaway:
        'Always verify both the geometric behavior (enlargement vs reduction) and the algebraic multiplier (k = Image / Pre-image).',
      geometryType: cfg.geometryType,
      preImageVertices: cfg.preImage,
      imageVertices: image,
      scaleFactor: cfg.k,
      center: { x: 0, y: 0 },
      visualData: {
        type: 'coordinate-grid',
        gridData: {
          geometryType: cfg.geometryType,
          center: { x: 0, y: 0, label: 'Origin (0, 0)' },
          preImage: cfg.preImage,
          image,
          scaleFactor: cfg.k,
          showRays: true,
        },
      },
    };
  }
}

// -------------------------------------------------------------------------
// ACCURACY VERIFICATION FOR ALGEBRAIC RULES
// Checks mathematical dilation consistency, coordinate match, options uniqueness,
// and diagram rendering integrity before displaying to the student.
// -------------------------------------------------------------------------
function verifyAlgebraicProblem(p: PracticeProblem): boolean {
  if (p.visualData.type !== 'coordinate-grid' || !p.visualData.gridData) return false;
  const g = p.visualData.gridData;
  if (g.center.x !== 0 || g.center.y !== 0) return false;
  const k = g.scaleFactor;
  if (!k || k <= 0) return false;

  // Check origin dilation mathematics: (kx, ky)
  if (g.preImage && g.image) {
    for (let i = 0; i < g.preImage.length; i++) {
      const pre = g.preImage[i];
      const img = g.image[i];
      const expectedX = Number((pre.x * k).toFixed(2));
      const expectedY = Number((pre.y * k).toFixed(2));
      if (Math.abs(img.x - expectedX) > 0.05 || Math.abs(img.y - expectedY) > 0.05) {
        return false;
      }
    }
  }

  // Options validation: exactly 4 distinct options, valid correctIndex
  if (!p.options || p.options.length !== 4) return false;
  if (new Set(p.options).size !== 4) return false;
  if (p.correctIndex < 0 || p.correctIndex >= 4) return false;

  return true;
}

// Master Dispatcher for Algebraic Coordinate Rules
function generateAlgebraicRuleProblem(): PracticeProblem {
  const maxAttempts = 5;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const family = selectNextAlgebraicFamily();
    let problem: PracticeProblem;

    switch (family) {
      case 'single-point':
        problem = generateFamily1SinglePoint();
        break;
      case 'triangle':
        problem = generateFamily2Triangle();
        break;
      case 'quadrilateral':
        problem = generateFamily3Quadrilateral();
        break;
      case 'apply-rule':
        problem = generateFamily4ApplyRule();
        break;
      case 'find-k':
        problem = generateFamily5FindK();
        break;
      case 'identify-true-dilation':
        problem = generateFamily6IdentifyTrueDilation();
        break;
      case 'identify-non-dilation':
        problem = generateFamily7IdentifyNonDilation();
        break;
      case 'enlargement-reduction':
        problem = generateFamily8EnlargementReduction();
        break;
      default:
        problem = generateFamily2Triangle();
        break;
    }

    if (verifyAlgebraicProblem(problem)) {
      return problem;
    }
  }

  // Fallback to verified triangle problem
  return generateFamily2Triangle();
}

// ==========================================
// 6. SIMILAR FIGURES: ANGLES & PROPORTIONS
// ==========================================
function generateSimilarFiguresProblem(): PracticeProblem {
  const questionType = randomChoice(['angle-congruence', 'side-proportion']);

  if (questionType === 'angle-congruence') {
    const angleA = randomChoice([35, 42, 50, 58, 64]);
    const angleB = randomChoice([45, 52, 60, 68, 70]);
    const angleC = 180 - angleA - angleB;
    const k = randomChoice([0.5, 0.75, 1.5, 2, 2.5, 3]);
    const basePre = randomChoice([4, 5, 6, 8, 10]);
    const baseImg = Number((basePre * k).toFixed(2));
    const side2Pre = Number((basePre * 1.4).toFixed(1));
    const side2Img = Number((side2Pre * k).toFixed(2));
    const side3Pre = Number((basePre * 1.6).toFixed(1));
    const side3Img = Number((side3Pre * k).toFixed(2));

    const correct = `${angleA}°`;
    const distractorMultiply = `${Math.round(angleA * k)}°`;
    const distractorOther = `${angleC}°`;
    const distractorDivide = `${Math.round(angleA / (k || 1))}°`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractorMultiply,
      distractorOther,
      distractorDivide,
    ]);

    return {
      id: `sf-ang-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'similar-figures',
      skillTitle: 'Similar Figures: Angles & Proportions',
      difficulty: 'Standard',
      question: `Triangle JKL is dilated by a scale factor of k = ${k} to produce similar triangle J'K'L'. In triangle JKL, the measure of angle J is ${angleA}° and the measure of angle K is ${angleB}°. What is the measure of angle J' in the dilated triangle?`,
      options,
      correctIndex,
      hint: 'Remember the most important rule of similar figures: Dilations preserve shape, which means corresponding angles are ALWAYS congruent (equal in measure). Do you multiply angles by scale factor k?',
      solutionSteps: [
        'Dilations change side lengths, but NEVER change angle measures.',
        'In any similar figures, corresponding angles are congruent (equal): m∠J\' = m∠J.',
        `Since m∠J = ${angleA}°, m∠J\' must also be exactly ${angleA}°.`,
        `Multiplying ${angleA}° by ${k} = ${Math.round(angleA * k)}° is the #1 STAAR trap! Angles are never multiplied by the scale factor.`,
      ],
      keyTakeaway:
        'Angle measures are invariant under dilation: corresponding angles remain CONGRUENT (m∠A = m∠A\'). Never multiply angle measures by scale factor k!',
      visualData: {
        type: 'similar-triangles',
        similarTrianglesData: {
          triangleA: {
            name: '△JKL',
            angles: [angleA, angleB, angleC],
            sides: [basePre, side2Pre, side3Pre],
          },
          triangleB: {
            name: "△J'K'L'",
            angles: [angleA, angleB, angleC],
            sides: [baseImg, side2Img, side3Img],
          },
          scaleFactor: k,
        },
      },
    };
  } else {
    // Missing side proportion
    const side1 = randomChoice([6, 8, 10, 12]);
    const k = randomChoice([0.5, 1.5, 2, 2.5, 3]);
    const side2 = Number((side1 * k).toFixed(1));
    const baseSide1 = randomChoice([4, 5, 8]);
    const baseSide2 = Number((baseSide1 * k).toFixed(1));

    const correct = `${baseSide2} cm`;
    const distractor1 = `${Number((baseSide1 + k).toFixed(1))} cm`;
    const distractor2 = `${Number((baseSide1 * (k + 1)).toFixed(1))} cm`;
    const distractor3 = `${Number((baseSide1 / (k || 1)).toFixed(1))} cm`;

    const { options, correctIndex } = shuffleOptions(correct, [
      distractor1,
      distractor2,
      distractor3,
    ]);

    return {
      id: `sf-side-${Date.now()}-${randomInt(100, 999)}`,
      skillId: 'similar-figures',
      skillTitle: 'Similar Figures: Angles & Proportions',
      difficulty: 'Standard',
      question: `Triangle ABC is dilated by a scale factor of k = ${k} to produce similar triangle A'B'C' (△ABC ~ △A'B'C'). Side AB is ${side1} cm and corresponds to side A'B', which is ${side2} cm. If side BC is ${baseSide1} cm, what is the length of corresponding side B'C'?`,
      options,
      correctIndex,
      hint: `Set up a proportion using corresponding sides: A'B' / AB = B'C' / BC. Or find the scale factor k = ${side2} ÷ ${side1} = ${k}, then multiply side BC by k.`,
      solutionSteps: [
        `Find the scale factor k between corresponding sides: k = A'B' / AB = ${side2} / ${side1} = ${k}.`,
        `Use scale factor k to find missing side B'C': B'C' = BC · k = ${baseSide1} · ${k} = ${baseSide2} cm.`,
        `Alternative proportion setup: ${side2} / ${side1} = B'C' / ${baseSide1} → Cross multiply: ${side1} · B'C' = ${Number((side2 * baseSide1).toFixed(1))} → B'C' = ${baseSide2} cm.`,
      ],
      keyTakeaway:
        'In similar figures, corresponding side lengths are proportional: Side_image = k × Side_preimage.',
      visualData: {
        type: 'similar-triangles',
        similarTrianglesData: {
          triangleA: {
            name: '△ABC',
            angles: [50, 60, 70],
            sides: [baseSide1, side1, Number((side1 * 1.2).toFixed(1))],
          },
          triangleB: {
            name: "△A'B'C'",
            angles: [50, 60, 70],
            sides: [baseSide2, side2, Number((side1 * 1.2 * k).toFixed(1))],
            unknownSideIdx: 0,
          },
          scaleFactor: k,
        },
      },
    };
  }
}

// ==========================================
// 7. PERIMETER SCALING (k)
// ==========================================
function generatePerimeterScalingProblem(): PracticeProblem {
  const originalPerimeter = randomChoice([20, 24, 30, 36, 48]);
  const k = randomChoice([1.5, 2, 2.5, 3, 0.5]);
  const newPerimeter = originalPerimeter * k;

  const correct = `${newPerimeter} cm`;
  const distractorAreaTrap = `${originalPerimeter * k * k} cm`; // multiplied by k²
  const distractorAdd = `${originalPerimeter + k} cm`;
  const distractorHalf = `${originalPerimeter * (k - 0.5 || 1.2)} cm`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorAreaTrap,
    distractorAdd,
    distractorHalf,
  ]);

  return {
    id: `perim-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'perimeter-scaling',
    skillTitle: 'Perimeter Scaling by Scale Factor k',
    difficulty: 'Standard',
    question: `A polygon has a perimeter of ${originalPerimeter} centimeters. If the polygon is dilated by a scale factor of k = ${k}, what will be the perimeter of the dilated polygon?`,
    options,
    correctIndex,
    hint: `Perimeter is a one-dimensional linear measure (length of the boundary). Under a dilation, all linear measurements scale directly by k: New Perimeter = Original Perimeter × k.`,
    solutionSteps: [
      `Recall the 1D Linear Scaling Rule: Perimeter_new = Perimeter_old · k.`,
      `Substitute given values: Perimeter_new = ${originalPerimeter} cm · ${k}.`,
      `Calculate: ${originalPerimeter} · ${k} = ${newPerimeter} cm.`,
      `Remember: Perimeter scales by k (linear), whereas area scales by k² (quadratic).`,
    ],
    keyTakeaway:
      'Perimeter is a 1-dimensional measurement, so it scales directly by k: New Perimeter = Original Perimeter × k.',
    visualData: {
      type: 'perimeter-area-compare',
      compareData: {
        shapeName: 'Polygon',
        originalDims: 'Perimeter = ' + originalPerimeter + ' cm',
        originalPerimeter,
        originalArea: Math.round((originalPerimeter / 4) ** 2),
        scaleFactor: k,
        unit: 'cm',
        askingFor: 'perimeter',
      },
    },
  };
}

// ==========================================
// 8. AREA SCALING (k²)
// ==========================================
function generateAreaScalingProblem(): PracticeProblem {
  const originalArea = randomChoice([12, 16, 20, 24, 32, 40]);
  const k = randomChoice([2, 3, 4, 0.5]);
  const kSquared = k * k;
  const newArea = originalArea * kSquared;

  const correct = `${newArea} sq in`;
  const distractorLinear = `${originalArea * k} sq in`; // multiplied by k only (common misconception)
  const distractorTwice = `${originalArea * 2 * k} sq in`;
  const distractorAdd = `${originalArea + kSquared} sq in`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractorLinear,
    distractorTwice,
    distractorAdd,
  ]);

  return {
    id: `area-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'area-scaling',
    skillTitle: 'Area Scaling by Scale Factor k²',
    difficulty: 'Challenge',
    question: `A photograph has an area of ${originalArea} square inches. If the photograph is dilated by a scale factor of k = ${k}, what is the area of the new photograph?`,
    options,
    correctIndex,
    hint: `Area is a two-dimensional measurement (length × width). When both dimensions are multiplied by k, the area multiplies by k² (k squared). Calculate ${k}² first, then multiply by ${originalArea}.`,
    solutionSteps: [
      `Recall the 2D Area Scaling Rule: Area_new = Area_old · k².`,
      `Calculate k² (scale factor squared): (${k})² = ${kSquared}.`,
      `Multiply original area by k²: ${originalArea} · ${kSquared} = ${newArea} sq in.`,
      `Common STAAR Trap: Multiplying ${originalArea} · ${k} = ${originalArea * k} sq in is WRONG! That is only for 1D perimeter, NOT 2D area!`,
    ],
    keyTakeaway:
      'Area scales by the square of the scale factor: New Area = Original Area × k².',
    visualData: {
      type: 'perimeter-area-compare',
      compareData: {
        shapeName: 'Photograph',
        originalDims: 'Area = ' + originalArea + ' sq in',
        originalPerimeter: Math.round(Math.sqrt(originalArea) * 4),
        originalArea,
        scaleFactor: k,
        unit: 'sq in',
        askingFor: 'area',
      },
    },
  };
}

// ==========================================
// 9. SCALE DRAWINGS & BLUEPRINTS
// ==========================================
function generateScaleDrawingProblem(): PracticeProblem {
  const scenarios = [
    {
      context: 'architectural blueprint of a modern house',
      drawingUnit: 'inches',
      realUnit: 'feet',
      scaleNum: 1, // 1 in
      scaleReal: 15, // 15 ft
      drawingLength: randomChoice([2.5, 3, 4, 4.5, 5]),
      calcActual: (d: number) => d * 15,
    },
    {
      context: 'state highway road map',
      drawingUnit: 'centimeters',
      realUnit: 'kilometers',
      scaleNum: 1, // 1 cm
      scaleReal: 25, // 25 km
      drawingLength: randomChoice([3.2, 4, 5.5, 6]),
      calcActual: (d: number) => d * 25,
    },
    {
      context: 'school campus landscape design map',
      drawingUnit: 'inches',
      realUnit: 'yards',
      scaleNum: 2, // 2 in
      scaleReal: 50, // 50 yards
      drawingLength: randomChoice([4, 6, 8]),
      calcActual: (d: number) => (d / 2) * 50,
    },
  ];

  const s = randomChoice(scenarios);
  const actual = s.calcActual(s.drawingLength);

  const correct = `${actual} ${s.realUnit}`;
  const distractor1 = `${actual + s.scaleReal} ${s.realUnit}`;
  const distractor2 = `${Math.round(actual * 1.5)} ${s.realUnit}`;
  const distractor3 = `${(actual / 2).toFixed(1)} ${s.realUnit}`;

  const { options, correctIndex } = shuffleOptions(correct, [
    distractor1,
    distractor2,
    distractor3,
  ]);

  return {
    id: `sd-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'scale-drawings',
    skillTitle: 'Scale Drawings, Blueprints & Maps',
    difficulty: 'Standard',
    question: `On an ${s.context}, the scale is ${s.scaleNum} ${s.drawingUnit} = ${s.scaleReal} ${s.realUnit}. If a patio measures ${s.drawingLength} ${s.drawingUnit} on the drawing, what is its actual length?`,
    options,
    correctIndex,
    hint: `Set up a unit rate proportion: (${s.scaleNum} ${s.drawingUnit}) / (${s.scaleReal} ${s.realUnit}) = (${s.drawingLength} ${s.drawingUnit}) / (x ${s.realUnit}). Cross-multiply to solve for x!`,
    solutionSteps: [
      `1. Identify the given scale ratio: ${s.scaleNum} ${s.drawingUnit} represents ${s.scaleReal} ${s.realUnit}.`,
      `2. Set up the proportion: (${s.scaleNum} ${s.drawingUnit}) / (${s.scaleReal} ${s.realUnit}) = (${s.drawingLength} ${s.drawingUnit}) / (x ${s.realUnit}).`,
      `3. Cross-multiply: ${s.scaleNum} · x = ${s.scaleReal} · ${s.drawingLength}.`,
      `4. Solve for x: x = (${s.scaleReal} · ${s.drawingLength}) / ${s.scaleNum} = ${actual} ${s.realUnit}.`,
    ],
    keyTakeaway:
      'In scale drawings, maintain consistent units in your proportion: (Drawing Scale) / (Actual Scale) = (Drawing Measurement) / (Actual Measurement).',
    visualData: {
      type: 'scale-drawing',
      scaleDrawingData: {
        drawingLabel: 'Patio Floorplan',
        scaleRatio: `${s.scaleNum} ${s.drawingUnit} = ${s.scaleReal} ${s.realUnit}`,
        drawingMeasurement: `${s.drawingLength} ${s.drawingUnit}`,
        actualMeasurement: `? ${s.realUnit}`,
      },
    },
  };
}

// ==========================================
// 10. INDIRECT MEASUREMENT USING SHADOWS
// ==========================================
interface ShadowScenarioDefinition {
  type: ShadowObjectType;
  shortName: string;
  names: string[];
  settings: string[];
  combos: {
    personHeight: number;
    personShadow: number;
    objectShadow: number;
  }[];
}

const shadowScenarios: ShadowScenarioDefinition[] = [
  {
    type: 'tree',
    shortName: 'tree',
    names: ['oak tree', 'pine tree', 'maple tree', 'courtyard shade tree'],
    settings: ['in the school yard', 'on the school grounds', 'outside the campus', 'in the school courtyard'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 8 }, // 20 ft
      { personHeight: 5, personShadow: 2, objectShadow: 10 }, // 25 ft
      { personHeight: 5, personShadow: 2, objectShadow: 12 }, // 30 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 10 }, // 20 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 12 }, // 24 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 14 }, // 28 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 16 }, // 32 ft
      { personHeight: 4, personShadow: 2, objectShadow: 10 }, // 20 ft
      { personHeight: 4, personShadow: 2, objectShadow: 11 }, // 22 ft
      { personHeight: 4, personShadow: 2, objectShadow: 12 }, // 24 ft
      { personHeight: 6, personShadow: 3, objectShadow: 12 }, // 24 ft
      { personHeight: 6, personShadow: 3, objectShadow: 14 }, // 28 ft
      { personHeight: 6, personShadow: 4, objectShadow: 16 }, // 24 ft
      { personHeight: 5, personShadow: 3, objectShadow: 15 }, // 25 ft
    ],
  },
  {
    type: 'building',
    shortName: 'school building',
    names: ['school building', 'middle school building', 'campus library building', 'school science wing'],
    settings: ['near the campus plaza', 'outside the main entrance', 'on the school grounds', 'beside the campus quad'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 12 }, // 30 ft
      { personHeight: 5, personShadow: 2, objectShadow: 14 }, // 35 ft
      { personHeight: 5, personShadow: 2, objectShadow: 16 }, // 40 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 14 }, // 28 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 16 }, // 32 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 18 }, // 36 ft
      { personHeight: 4, personShadow: 2, objectShadow: 13 }, // 26 ft
      { personHeight: 4, personShadow: 2, objectShadow: 14 }, // 28 ft
      { personHeight: 4, personShadow: 2, objectShadow: 15 }, // 30 ft
      { personHeight: 6, personShadow: 3, objectShadow: 15 }, // 30 ft
      { personHeight: 6, personShadow: 3, objectShadow: 18 }, // 36 ft
      { personHeight: 6, personShadow: 4, objectShadow: 20 }, // 30 ft
      { personHeight: 6, personShadow: 4, objectShadow: 24 }, // 36 ft
      { personHeight: 5, personShadow: 3, objectShadow: 18 }, // 30 ft
    ],
  },
  {
    type: 'flagpole',
    shortName: 'flagpole',
    names: ['school flagpole', 'campus flagpole', 'courtyard flagpole'],
    settings: ['in front of the school', 'in the campus courtyard', 'near the athletic field', 'by the main entrance'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 8 }, // 20 ft
      { personHeight: 5, personShadow: 2, objectShadow: 10 }, // 25 ft
      { personHeight: 5, personShadow: 2, objectShadow: 12 }, // 30 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 10 }, // 20 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 12 }, // 24 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 15 }, // 30 ft
      { personHeight: 4, personShadow: 2, objectShadow: 9 }, // 18 ft
      { personHeight: 4, personShadow: 2, objectShadow: 11 }, // 22 ft
      { personHeight: 6, personShadow: 3, objectShadow: 10 }, // 20 ft
      { personHeight: 6, personShadow: 3, objectShadow: 12 }, // 24 ft
      { personHeight: 6, personShadow: 4, objectShadow: 16 }, // 24 ft
      { personHeight: 6, personShadow: 4, objectShadow: 18 }, // 27 ft
      { personHeight: 5, personShadow: 3, objectShadow: 12 }, // 20 ft
    ],
  },
  {
    type: 'lightpole',
    shortName: 'light pole',
    names: ['parking lot light pole', 'campus street light pole', 'athletic field light pole'],
    settings: ['in the school parking lot', 'along the campus sidewalk', 'beside the track field', 'near the gym entrance'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 8 }, // 20 ft
      { personHeight: 5, personShadow: 2, objectShadow: 10 }, // 25 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 8 }, // 16 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 10 }, // 20 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 12 }, // 24 ft
      { personHeight: 4, personShadow: 2, objectShadow: 8 }, // 16 ft
      { personHeight: 4, personShadow: 2, objectShadow: 9 }, // 18 ft
      { personHeight: 4, personShadow: 2, objectShadow: 10 }, // 20 ft
      { personHeight: 6, personShadow: 3, objectShadow: 9 }, // 18 ft
      { personHeight: 6, personShadow: 3, objectShadow: 11 }, // 22 ft
      { personHeight: 5, personShadow: 3, objectShadow: 12 }, // 20 ft
      { personHeight: 6, personShadow: 4, objectShadow: 14 }, // 21 ft
      { personHeight: 6, personShadow: 4, objectShadow: 16 }, // 24 ft
    ],
  },
  {
    type: 'monument',
    shortName: 'monument',
    names: ['stone monument', 'memorial obelisk monument', 'campus historic stone monument', 'park memorial monument'],
    settings: ['in the community park', 'in the historic town square', 'in the memorial garden', 'on the campus plaza'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 10 }, // 25 ft
      { personHeight: 5, personShadow: 2, objectShadow: 12 }, // 30 ft
      { personHeight: 5, personShadow: 2, objectShadow: 14 }, // 35 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 11 }, // 22 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 13 }, // 26 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 15 }, // 30 ft
      { personHeight: 4, personShadow: 2, objectShadow: 10 }, // 20 ft
      { personHeight: 4, personShadow: 2, objectShadow: 12 }, // 24 ft
      { personHeight: 6, personShadow: 3, objectShadow: 12 }, // 24 ft
      { personHeight: 6, personShadow: 3, objectShadow: 14 }, // 28 ft
      { personHeight: 6, personShadow: 3, objectShadow: 15 }, // 30 ft
      { personHeight: 6, personShadow: 4, objectShadow: 18 }, // 27 ft
      { personHeight: 6, personShadow: 4, objectShadow: 20 }, // 30 ft
    ],
  },
  {
    type: 'hoop',
    shortName: 'basketball hoop',
    names: ['outdoor basketball hoop', 'playground basketball hoop and post', 'basketball hoop support structure'],
    settings: ['on the school basketball court', 'at the neighborhood park court', 'on the blacktop playground', 'by the outdoor courts'],
    combos: [
      { personHeight: 5, personShadow: 2, objectShadow: 4 }, // 10 ft
      { personHeight: 5, personShadow: 2, objectShadow: 4.8 }, // 12 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 5 }, // 10 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 6 }, // 12 ft
      { personHeight: 5, personShadow: 2.5, objectShadow: 7 }, // 14 ft
      { personHeight: 4, personShadow: 2, objectShadow: 5 }, // 10 ft
      { personHeight: 4, personShadow: 2, objectShadow: 6 }, // 12 ft
      { personHeight: 6, personShadow: 3, objectShadow: 5 }, // 10 ft
      { personHeight: 6, personShadow: 3, objectShadow: 6 }, // 12 ft
      { personHeight: 5, personShadow: 3, objectShadow: 6 }, // 10 ft
      { personHeight: 6, personShadow: 4, objectShadow: 8 }, // 12 ft
    ],
  },
];

let lastShadowScenarioType: ShadowObjectType | null = null;
let lastShadowLayout: ShadowDiagramLayout | null = null;
let consecutiveLayoutCount = 0;

function generateShadowMeasurementProblem(): PracticeProblem {
  // Select scenario avoiding immediate repetition
  const availableScenarios = shadowScenarios.filter((s) => s.type !== lastShadowScenarioType);
  const scenario = availableScenarios.length > 0 ? randomChoice(availableScenarios) : randomChoice(shadowScenarios);
  lastShadowScenarioType = scenario.type;

  // Randomly select between Layout A ('student-left') and Layout B ('student-right')
  // Avoid repeating the same orientation too many times in a row
  let selectedLayout: ShadowDiagramLayout;
  if (lastShadowLayout === null) {
    selectedLayout = Math.random() < 0.5 ? 'student-left' : 'student-right';
  } else if (consecutiveLayoutCount >= 2) {
    selectedLayout = lastShadowLayout === 'student-left' ? 'student-right' : 'student-left';
  } else {
    // 65% chance of alternating, 35% chance of remaining, ensuring natural feel with frequent switching
    selectedLayout = Math.random() < 0.65
      ? (lastShadowLayout === 'student-left' ? 'student-right' : 'student-left')
      : lastShadowLayout;
  }

  if (selectedLayout === lastShadowLayout) {
    consecutiveLayoutCount++;
  } else {
    consecutiveLayoutCount = 1;
  }
  lastShadowLayout = selectedLayout;

  const objName = randomChoice(scenario.names);
  const objShortName = scenario.shortName;
  const setting = randomChoice(scenario.settings);
  const combo = randomChoice(scenario.combos);

  const personHeight = combo.personHeight;
  const personShadow = combo.personShadow;
  const objectShadow = combo.objectShadow;

  // Height / Shadow = ObjHeight / ObjShadow
  // ObjHeight = (personHeight / personShadow) * objectShadow
  const rawHeight = (personHeight / personShadow) * objectShadow;
  const calculatedHeight = Number(rawHeight.toFixed(1));

  const scaleK = Number((objectShadow / personShadow).toFixed(2));
  const crossProduct = Number((personHeight * objectShadow).toFixed(1));

  const correct = `${calculatedHeight} feet`;

  // Generate distinct and realistic distractors
  const distractorCandidates: number[] = [
    Number((calculatedHeight + 6).toFixed(1)),
    Number((calculatedHeight - 4 > 0 ? calculatedHeight - 4 : calculatedHeight + 8).toFixed(1)),
    Number(((personShadow / personHeight) * objectShadow).toFixed(1)), // inverted ratio trap
    Number(objectShadow.toFixed(1)), // shadow length trap
    Number((objectShadow + (personHeight - personShadow)).toFixed(1)), // additive mistake trap
    Number((calculatedHeight + 4).toFixed(1)),
    Number((calculatedHeight - 2 > 0 ? calculatedHeight - 2 : calculatedHeight + 5).toFixed(1)),
  ];

  const uniqueDistractors: string[] = [];
  for (const val of distractorCandidates) {
    const formatted = `${val} feet`;
    if (val > 0 && formatted !== correct && !uniqueDistractors.includes(formatted)) {
      uniqueDistractors.push(formatted);
    }
    if (uniqueDistractors.length === 3) break;
  }

  // Fallback if needed
  let fallbackDelta = 3;
  while (uniqueDistractors.length < 3) {
    const fallbackFormatted = `${calculatedHeight + fallbackDelta} feet`;
    if (!uniqueDistractors.includes(fallbackFormatted) && fallbackFormatted !== correct) {
      uniqueDistractors.push(fallbackFormatted);
    }
    fallbackDelta += 3;
  }

  const { options, correctIndex } = shuffleOptions(correct, uniqueDistractors.slice(0, 3));

  const capitalizedShortName = objShortName.charAt(0).toUpperCase() + objShortName.slice(1);

  return {
    id: `shadow-${Date.now()}-${randomInt(100, 999)}`,
    skillId: 'shadow-measurement',
    skillTitle: 'Indirect Measurement Using Shadows',
    difficulty: 'Standard',
    question: `A ${personHeight}-foot tall student casts a ${personShadow}-foot shadow ${setting}. At the exact same time, a nearby ${objName} casts a ${objectShadow}-foot shadow. Using similar triangles, what is the height of the ${objShortName}?`,
    options,
    correctIndex,
    hint: `Because the sun's rays hit the ground at the same angle at the exact same time, the student and the ${objShortName} form similar right triangles. Set up a proportion comparing height to shadow: (Student Height) / (Student Shadow) = (${capitalizedShortName} Height) / (${capitalizedShortName} Shadow), then cross-multiply or multiply by the scale factor!`,
    solutionSteps: [
      `Because the sun's rays strike the ground at the same angle at the exact same time, the student and the ${objName} form similar right triangles with their cast shadows (AA similarity).`,
      `Set up a proportion of corresponding sides: (Student Height) / (Student Shadow) = (${capitalizedShortName} Height) / (${capitalizedShortName} Shadow).`,
      `Substitute the known measurements from the problem: ${personHeight} / ${personShadow} = h / ${objectShadow}.`,
      `Method 1 (Scale Factor k): Calculate how many times longer the shadow is: k = ${objectShadow} ÷ ${personShadow} = ${scaleK}. Then multiply the student's height: h = ${personHeight} · ${scaleK} = ${calculatedHeight} feet.`,
      `Method 2 (Cross-Multiplication): ${personHeight} · ${objectShadow} = ${personShadow} · h → ${crossProduct} = ${personShadow}h → h = ${crossProduct} ÷ ${personShadow} = ${calculatedHeight} feet.`,
    ],
    keyTakeaway:
      'Sun shadows cast at the same time create similar right triangles: Height₁ / Shadow₁ = Height₂ / Shadow₂. Always match corresponding parts (height to height, shadow to shadow).',
    visualData: {
      type: 'shadow-scene',
      shadowData: {
        personHeight,
        personShadow,
        objectType: scenario.type,
        objectName: objName,
        objectShortName: objShortName,
        objectHeight: null,
        objectShadow,
        unit: 'ft',
        layout: selectedLayout,
      },
    },
  };
}

// ==========================================
// MIXED PRACTICE (ALL 10 SKILLS) ROTATION
// ==========================================
export const ALL_10_PRACTICE_SKILLS: readonly PracticeSkillId[] = [
  'scale-factor',
  'enlargement-reduction',
  'origin-dilation',
  'non-origin-dilation',
  'algebraic-rules',
  'similar-figures',
  'perimeter-scaling',
  'area-scaling',
  'scale-drawings',
  'shadow-measurement',
] as const;

/**
 * Creates one shuffled array containing all 10 unique skill IDs.
 * Ensures the first skill of the new cycle is not equal to the last skill of the previous cycle.
 */
export function createShuffledMixedCycle(lastSkill?: CanonicalSkillId | null): CanonicalSkillId[] {
  const cycle = [...MIXED_PRACTICE_CANONICAL_SKILLS];

  // Fisher-Yates random shuffle
  for (let i = cycle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cycle[i], cycle[j]] = [cycle[j], cycle[i]];
  }

  // Ensure first skill of new cycle is not equal to last skill of previous cycle
  if (lastSkill && cycle[0] === lastSkill) {
    const swapIdx = Math.floor(Math.random() * (cycle.length - 1)) + 1;
    [cycle[0], cycle[swapIdx]] = [cycle[swapIdx], cycle[0]];
  }

  return cycle;
}

// Single Source of Truth persistent state for Mixed Practice queue
interface MixedPracticeQueueState {
  cycle: CanonicalSkillId[];
  index: number;
  lastSkillOfPreviousCycle: CanonicalSkillId | null;
}

const mixedQueueState: MixedPracticeQueueState = {
  cycle: createShuffledMixedCycle(null),
  index: 0,
  lastSkillOfPreviousCycle: null,
};

export function getMixedPracticeQueueState(): {
  cycle: CanonicalSkillId[];
  index: number;
  lastSkillOfPreviousCycle: CanonicalSkillId | null;
} {
  return {
    cycle: [...mixedQueueState.cycle],
    index: mixedQueueState.index,
    lastSkillOfPreviousCycle: mixedQueueState.lastSkillOfPreviousCycle,
  };
}

export function resetMixedPracticeCycle(): void {
  mixedQueueState.cycle = createShuffledMixedCycle(null);
  mixedQueueState.index = 0;
  mixedQueueState.lastSkillOfPreviousCycle = null;
}

/**
 * SINGLE SOURCE OF TRUTH FOR MIXED PRACTICE SKILL ADVANCEMENT:
 * 1. Reads the skill at the current index.
 * 2. Increments the index by exactly 1.
 * 3. Only after index reaches 10: creates a new shuffled array of all 10 skills,
 *    ensures first skill of new cycle != last skill of previous cycle,
 *    and resets index to 0.
 */
export function advanceMixedPracticeQueue(): CanonicalSkillId {
  // Only after index reaches 10 (all 10 skills consumed):
  if (mixedQueueState.index >= 10 || mixedQueueState.cycle.length !== 10) {
    const previousLastSkill =
      mixedQueueState.cycle.length === 10
        ? mixedQueueState.cycle[9]
        : mixedQueueState.lastSkillOfPreviousCycle;
    mixedQueueState.lastSkillOfPreviousCycle = previousLastSkill;
    mixedQueueState.cycle = createShuffledMixedCycle(previousLastSkill);
    mixedQueueState.index = 0;
  }

  const currentSkill = mixedQueueState.cycle[mixedQueueState.index];
  mixedQueueState.index += 1;
  return currentSkill;
}

// Standalone generator for an exact skill (does NOT touch or reshuffle the mixed queue)
export function generateProblemByExactSkill(
  skill: PracticeSkillId | CanonicalSkillId
): PracticeProblem {
  const normalized = normalizeSkillId(skill);
  let problem: PracticeProblem;

  switch (normalized) {
    case 'scale-factor':
      problem = generateScaleFactorProblem();
      break;
    case 'enlargement-reduction':
      problem = generateEnlargementReductionProblem();
      break;
    case 'origin-dilation':
      problem = generateOriginDilationProblem();
      break;
    case 'non-origin-dilation':
      problem = generateNonOriginDilationProblem();
      break;
    case 'algebraic-rules':
      problem = generateAlgebraicRuleProblem();
      break;
    case 'similar-figures':
      problem = generateSimilarFiguresProblem();
      break;
    case 'perimeter-scaling':
      problem = generatePerimeterScalingProblem();
      break;
    case 'area-scaling':
      problem = generateAreaScalingProblem();
      break;
    case 'scale-drawings':
      problem = generateScaleDrawingProblem();
      break;
    case 'shadow-measurement':
      problem = generateShadowMeasurementProblem();
      break;
    default:
      problem = generateScaleFactorProblem();
      break;
  }

  problem.canonicalSkillId = toCanonicalSkillId(normalized);
  return problem;
}

// Master Generator by Skill ID (or 'all' for Mixed Practice)
export function generateProblemBySkill(
  skillId: PracticeSkillId | CanonicalSkillId | 'all'
): PracticeProblem {
  if (skillId === 'all') {
    const nextSkill = advanceMixedPracticeQueue();
    return generateProblemByExactSkill(nextSkill);
  }
  return generateProblemByExactSkill(skillId);
}
