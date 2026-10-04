import { Unit7SelfCheckDiagramConfig } from '../unit7SelfCheckQuestions';

export type Unit7StaarItemFormat = 'multiple-choice' | 'numeric-input';

export interface Unit7StaarQuestion {
  id: string;
  round: 1 | 2 | 3;
  questionInRound: number; // 1..12
  questionNumber: number; // 1..36
  lesson: 'Lesson 7.1' | 'Lesson 7.2' | 'Lesson 7.3';
  strand: string;
  teks: 'TEKS 8.8D';
  staarEraBadge: string;
  itemFormat?: Unit7StaarItemFormat; // default 'multiple-choice'
  prompt: string;
  diagram: Unit7SelfCheckDiagramConfig;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  correctAnswer: string;
  numericValue?: number; // for digital STAAR equation-editor / numeric-entry items
  unitLabel?: string; // e.g. '°' or ''
  hint: string;
  explanation: string;
}

// Round 3 Correct Answer Sequence (Q25–Q36): A, C, B, D, A, B, C, D, B, C, D, A (3 A, 3 B, 3 C, 3 D)
export const UNIT_7_STAAR_ROUND_3_QUESTIONS: Unit7StaarQuestion[] = [
  {
    id: 'u7-staar-q25',
    round: 3,
    questionInRound: 1,
    questionNumber: 25,
    lesson: 'Lesson 7.1',
    strand: 'Multi-Step Parallel Lines & Linear Pair Synthesis',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2025–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Two parallel rails, line l and line m, are intersected by a diagonal brace, transversal t. In the figure, alternate interior angles measure m∠3 = (5x - 12)° and m∠6 = (3x + 24)°. Based on this information, what is the measure in degrees of obtuse angle ∠4, which forms a linear pair with ∠3?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 3,
      angleBIndex: 6,
      labelA: '(5x - 12)°',
      labelB: '(3x + 24)°',
      roleLabelA: 'Alternate Interior (∠3)',
      roleLabelB: 'Alternate Interior (∠6)',
    },
    options: ['102°', '78°', '18°', '112°'],
    correctIndex: 0, // A
    correctAnswer: '102°',
    hint: 'Step 1: Set the alternate interior angles equal (5x - 12 = 3x + 24) to solve for x and find m∠3. Step 2: Subtract m∠3 from 180° to find obtuse angle ∠4 (avoid stopping at 78° or x = 18!).',
    explanation:
      'Step 1: Because lines l and m are parallel, alternate interior angles ∠3 and ∠6 are congruent: 5x - 12 = 3x + 24 → 2x = 36 → x = 18. Step 2: Substitute x = 18 into m∠3 = 5(18) - 12 = 78°. Step 3: Because ∠3 and ∠4 form a linear pair along line l, m∠4 = 180° - 78° = 102°.',
  },
  {
    id: 'u7-staar-q26',
    round: 3,
    questionInRound: 2,
    questionNumber: 26,
    lesson: 'Lesson 7.1',
    strand: 'Same-Side Interior & Corresponding Angle Transfer',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'In the diagram, line l is parallel to line m and cut by transversal t. Consecutive (same-side) interior angles measure m∠4 = (7x - 8)° and m∠6 = (3x + 8)°. What is the measure of ∠2 in degrees, given that ∠2 and ∠6 are corresponding angles?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 4,
      angleBIndex: 6,
      labelA: '(7x - 8)°',
      labelB: '(3x + 8)°',
      roleLabelA: 'Same-Side Interior (∠4)',
      roleLabelB: 'Same-Side Interior (∠6)',
    },
    options: ['118°', '18°', '62°', '72°'],
    correctIndex: 2, // C
    correctAnswer: '62°',
    numericValue: 62,
    unitLabel: '°',
    hint: 'Same-side interior angles ∠4 and ∠6 are supplementary: (7x - 8) + (3x + 8) = 180. Solve for x, then substitute x into (3x + 8)° because corresponding angles ∠2 and ∠6 are congruent.',
    explanation:
      'Step 1: Same-side interior angles sum to 180°: (7x - 8) + (3x + 8) = 180 → 10x = 180 → x = 18. Step 2: Substitute x = 18 to find m∠6 = 3(18) + 8 = 62°. Step 3: Since ∠2 and ∠6 are corresponding angles on parallel lines, m∠2 = m∠6 = 62°.',
  },
  {
    id: 'u7-staar-q27',
    round: 3,
    questionInRound: 3,
    questionNumber: 27,
    lesson: 'Lesson 7.1',
    strand: 'Error Analysis & Informal Geometric Argument',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'A student analyzed parallel lines l and m intersected by transversal t, where exterior angles on the same side of the transversal measure m∠1 = (6x + 14)° and m∠7 = (4x - 4)°. Which equation and informal geometric argument correctly determine the value of x?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 7,
      labelA: '(6x + 14)°',
      labelB: '(4x - 4)°',
      roleLabelA: 'Obtuse Exterior (∠1)',
      roleLabelB: 'Acute Exterior (∠7)',
    },
    options: [
      '6x + 14 = 4x - 4, because any two exterior angles formed by parallel lines are congruent; x = -9',
      '(6x + 14) + (4x - 4) = 180, because ∠1 corresponds to ∠5 and ∠5 forms a linear pair with ∠7, making ∠1 and ∠7 supplementary; x = 17',
      '(6x + 14) + (4x - 4) = 90, because exterior angles on the same side of a transversal are complementary; x = 8',
      '(6x + 14) - (4x - 4) = 180, because obtuse and acute exterior angles differ by 180°; x = 81',
    ],
    correctIndex: 1, // B
    correctAnswer:
      '(6x + 14) + (4x - 4) = 180, because ∠1 corresponds to ∠5 and ∠5 forms a linear pair with ∠7, making ∠1 and ∠7 supplementary; x = 17',
    hint: 'Trace the relationship from ∠1 to ∠7: corresponding angles give m∠1 = m∠5, and ∠5 + ∠7 = 180° (linear pair). Therefore, same-side exterior angles ∠1 and ∠7 are supplementary!',
    explanation:
      'Corresponding angles ∠1 and ∠5 are congruent, and ∠5 is supplementary to ∠7 along transversal t. By substitution, (6x + 14) + (4x - 4) = 180 → 10x + 10 = 180 → 10x = 170 → x = 17.',
  },
  {
    id: 'u7-staar-q28',
    round: 3,
    questionInRound: 4,
    questionNumber: 28,
    lesson: 'Lesson 7.1',
    strand: 'Alternate Exterior Angles & Adjacent Acute Measure',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Parallel lines l and m are intersected by transversal t. In the diagram, alternate exterior angles measure m∠1 = (8x - 19)° and m∠8 = (5x + 29)°. What is the measure of acute angle ∠2, which is adjacent to ∠1 along line l?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 8,
      labelA: '(8x - 19)°',
      labelB: '(5x + 29)°',
      roleLabelA: 'Alternate Exterior (∠1)',
      roleLabelB: 'Alternate Exterior (∠8)',
    },
    options: ['16°', '109°', '81°', '71°'],
    correctIndex: 3, // D
    correctAnswer: '71°',
    hint: 'First set the alternate exterior angles equal: 8x - 19 = 5x + 29 to find x and m∠1. Then use the linear pair m∠1 + m∠2 = 180° to find acute angle ∠2!',
    explanation:
      'Step 1: Alternate exterior angles are congruent: 8x - 19 = 5x + 29 → 3x = 48 → x = 16. Step 2: m∠1 = 8(16) - 19 = 128 - 19 = 109°. Step 3: Because ∠1 and ∠2 form a linear pair on line l, m∠2 = 180° - 109° = 71°.',
  },
  {
    id: 'u7-staar-q29',
    round: 3,
    questionInRound: 5,
    questionNumber: 29,
    lesson: 'Lesson 7.2',
    strand: 'Three Algebraic Interior Angles & Greatest Angle Measure',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'In △ABC, the measures of all three interior angles are given as algebraic expressions: m∠A = (2x + 7)°, m∠B = (3x - 2)°, and m∠C = (x + 7)°. What is the degree measure of the GREATEST interior angle in △ABC?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '(2x + 7)°',
      labelB: '(3x - 2)°',
      labelC: '(x + 7)°',
    },
    options: ['82°', '63°', '35°', '28°'],
    correctIndex: 0, // A
    correctAnswer: '82°',
    numericValue: 82,
    unitLabel: '°',
    hint: 'Write the Triangle Sum equation (2x + 7) + (3x - 2) + (x + 7) = 180 and solve for x. Then substitute x into all three angle expressions to identify the greatest angle measure!',
    explanation:
      'By the Triangle Sum Theorem: (2x + 7) + (3x - 2) + (x + 7) = 180 → 6x + 12 = 180 → 6x = 168 → x = 28. Substituting x = 28 gives m∠A = 2(28) + 7 = 63°, m∠B = 3(28) - 2 = 82°, and m∠C = 28 + 7 = 35°. The greatest interior angle is 82°.',
  },
  {
    id: 'u7-staar-q30',
    round: 3,
    questionInRound: 6,
    questionNumber: 30,
    lesson: 'Lesson 7.2',
    strand: 'Exterior Angle Theorem with Variables on Both Sides',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2025–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'In △PQR, side QR is extended through vertex R to point S. The remote interior angles measure m∠P = (3x + 8)° and m∠Q = (2x + 11)°, and exterior angle m∠PRS = (7x - 15)°. What is the degree measure of interior angle ∠PRQ (adjacent to ∠PRS)?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['P', 'Q', 'R', 'S'],
      labelA: '(3x + 8)°',
      labelB: '(2x + 11)°',
      labelC: '?°',
      labelExt: '(7x - 15)°',
    },
    options: ['104°', '76°', '17°', '59°'],
    correctIndex: 1, // B
    correctAnswer: '76°',
    hint: 'Step 1: Set the sum of the remote interior angles equal to the exterior angle: (3x + 8) + (2x + 11) = 7x - 15. Step 2: Find m∠PRS. Step 3: Subtract m∠PRS from 180° to find adjacent interior angle ∠PRQ!',
    explanation:
      'Step 1: By the Exterior Angle Theorem, (3x + 8) + (2x + 11) = 7x - 15 → 5x + 19 = 7x - 15 → 2x = 34 → x = 17. Step 2: Exterior angle m∠PRS = 7(17) - 15 = 104°. Step 3: Because ∠PRQ and ∠PRS form a linear pair along QS, m∠PRQ = 180° - 104° = 76°.',
  },
  {
    id: 'u7-staar-q31',
    round: 3,
    questionInRound: 7,
    questionNumber: 31,
    lesson: 'Lesson 7.2',
    strand: 'Multi-Step Exterior Angle & Difference of Remote Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, side BC is extended to point D. Remote interior angle ∠A measures (4x - 5)°, remote interior angle ∠B measures (2x + 17)°, and exterior angle ∠ACD measures 120°. What is the positive difference, in degrees, between m∠A and m∠B (m∠A - m∠B)?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '(4x - 5)°',
      labelB: '(2x + 17)°',
      labelC: '',
      labelExt: '120°',
    },
    options: ['67°', '53°', '14°', '18°'],
    correctIndex: 2, // C
    correctAnswer: '14°',
    hint: 'First solve (4x - 5) + (2x + 17) = 120 for x. Next, evaluate both m∠A and m∠B, and subtract m∠A - m∠B.',
    explanation:
      'Step 1: By the Exterior Angle Theorem, (4x - 5) + (2x + 17) = 120 → 6x + 12 = 120 → 6x = 108 → x = 18. Step 2: m∠A = 4(18) - 5 = 67° and m∠B = 2(18) + 17 = 53°. Step 3: Subtract to find the difference: 67° - 53° = 14°.',
  },
  {
    id: 'u7-staar-q32',
    round: 3,
    questionInRound: 8,
    questionNumber: 32,
    lesson: 'Lesson 7.2',
    strand: 'Algebraic Triangle Classification & Verification',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, the interior angles are represented by m∠A = (3x + 4)°, m∠B = (3x + 4)°, and m∠C = (2x - 4)°. Which statement is true about the value of x and the interior angle measures of △ABC?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '(3x + 4)°',
      labelB: '(3x + 4)°',
      labelC: '(2x - 4)°',
    },
    options: [
      'x = 23, and the interior angles measure 73°, 73°, and 42°.',
      'x = 22, and the interior angles measure 66°, 66°, and 48°.',
      'x = 20, and the interior angles measure 64°, 64°, and 52°.',
      'x = 22, and the interior angles measure 70°, 70°, and 40°.',
    ],
    correctIndex: 3, // D
    correctAnswer: 'x = 22, and the interior angles measure 70°, 70°, and 40°.',
    hint: 'Combine like terms in the Triangle Sum equation: (3x + 4) + (3x + 4) + (2x - 4) = 180 → 8x + 4 = 180. Solve for x and substitute x into each angle expression.',
    explanation:
      'By the Triangle Sum Theorem: (3x + 4) + (3x + 4) + (2x - 4) = 180 → 8x + 4 = 180 → 8x = 176 → x = 22. Substituting x = 22 yields m∠A = 3(22) + 4 = 70°, m∠B = 70°, and m∠C = 2(22) - 4 = 40° (70° + 70° + 40° = 180°).',
  },
  {
    id: 'u7-staar-q33',
    round: 3,
    questionInRound: 9,
    questionNumber: 33,
    lesson: 'Lesson 7.3',
    strand: 'Multi-Step Algebraic AA Similarity & Third Angle Synthesis',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2025–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangle ABC is similar to triangle DEF (△ABC ~ △DEF). In △ABC, m∠A = 46° and m∠B = (5x - 6)°. In △DEF, m∠D = 46° and m∠E = (3x + 22)°. What is the measure of the third interior angle, ∠F, in △DEF?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['46°', '(5x - 6)°', '?°'],
      tri2Angles: ['46°', '(3x + 22)°', '?°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: ['64°', '70°', '14°', '66°'],
    correctIndex: 1, // B
    correctAnswer: '70°',
    hint: 'Step 1: Set corresponding angles ∠B and ∠E equal (5x - 6 = 3x + 22) to find x and m∠E. Step 2: Use the Triangle Sum Theorem on △DEF: m∠F = 180° - (46° + m∠E).',
    explanation:
      'Step 1: Corresponding angles ∠B and ∠E in similar triangles are congruent: 5x - 6 = 3x + 22 → 2x = 28 → x = 14. Step 2: m∠E = 3(14) + 22 = 64°. Step 3: By the Triangle Sum Theorem in △DEF, m∠F = 180° - (46° + 64°) = 180° - 110° = 70°.',
  },
  {
    id: 'u7-staar-q34',
    round: 3,
    questionInRound: 10,
    questionNumber: 34,
    lesson: 'Lesson 7.3',
    strand: 'Solving for x to Satisfy the AA Similarity Criterion',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'In △JKL, m∠J = 52° and m∠K = (4x + 4)°. In △MNP, m∠M = 52° and m∠P = 60°. What value of x establishes that △JKL is similar to △MNP (△JKL ~ △MNP) by the Angle-Angle similarity criterion?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['J', 'K', 'L'],
      tri2Vertices: ['M', 'N', 'P'],
      tri1Angles: ['52°', '(4x + 4)°', ''],
      tri2Angles: ['52°', '?°', '60°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: ['x = 14', 'x = 12', 'x = 16', 'x = 18'],
    correctIndex: 2, // C
    correctAnswer: 'x = 16',
    numericValue: 16,
    unitLabel: '',
    hint: 'First find m∠N in △MNP using the Triangle Sum Theorem: 180° - (52° + 60°). Then set corresponding angle m∠K = m∠N: 4x + 4 = 68!',
    explanation:
      'Step 1: In △MNP, m∠N = 180° - (52° + 60°) = 68°. Step 2: For △JKL ~ △MNP, corresponding angles ∠K and ∠N must be congruent: 4x + 4 = 68 → 4x = 64 → x = 16.',
  },
  {
    id: 'u7-staar-q35',
    round: 3,
    questionInRound: 11,
    questionNumber: 35,
    lesson: 'Lesson 7.3',
    strand: 'Informal Geometric Argument for AA Similarity with Variables',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangle ABC has interior angles m∠A = (2x + 10)°, m∠B = (3x)°, and m∠C = 70°. Triangle DEF has interior angles m∠D = 50° and m∠F = 70°. After solving for x, which informal argument is true?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['(2x + 10)°', '(3x)°', '70°'],
      tri2Angles: ['50°', '?°', '70°'],
      highlightPairs: ['left', 'right'],
    },
    options: [
      'x = 20, so m∠A = 40° and △ABC is not similar to △DEF.',
      'x = 22, so m∠A = 54° and △ABC is not similar to △DEF.',
      'x = 18, so m∠B = 54° and △ABC ~ △DEF.',
      'x = 20, so m∠A = 50° and m∠C = 70°, proving △ABC ~ △DEF by the Angle-Angle similarity criterion.',
    ],
    correctIndex: 3, // D
    correctAnswer:
      'x = 20, so m∠A = 50° and m∠C = 70°, proving △ABC ~ △DEF by the Angle-Angle similarity criterion.',
    hint: 'In △ABC, solve (2x + 10) + 3x + 70 = 180 for x. Then substitute x into m∠A = (2x + 10)° and compare the angles of △ABC and △DEF!',
    explanation:
      'In △ABC: (2x + 10) + 3x + 70 = 180 → 5x + 80 = 180 → 5x = 100 → x = 20. Substituting x = 20 gives m∠A = 2(20) + 10 = 50° and m∠B = 3(20) = 60°. Because ∠A ≅ ∠D (50°) and ∠C ≅ ∠F (70°), △ABC ~ △DEF by AA similarity.',
  },
  {
    id: 'u7-staar-q36',
    round: 3,
    questionInRound: 12,
    questionNumber: 36,
    lesson: 'Lesson 7.3',
    strand: 'Cross-Concept Synthesis: Exterior Angle Theorem & AA Similarity',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2025–2026 Digital STAAR Synthesis',
    itemFormat: 'multiple-choice',
    prompt:
      'Two triangles share a pair of congruent angles: m∠A = m∠D = 58°. In △ABC, the exterior angle adjacent to ∠C measures 122°. In △DEF, interior angle m∠E = 64°. Which informal geometric argument correctly determines whether △ABC and △DEF are similar?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['58°', '?°', '58°'],
      tri2Angles: ['58°', '64°', '?°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: [
      'By the Exterior Angle Theorem on △ABC, 58° + m∠B = 122°, so m∠B = 64°. Since ∠A ≅ ∠D (58°) and ∠B ≅ ∠E (64°), △ABC ~ △DEF by AA similarity.',
      'Because 122° ≠ 64°, the two triangles do not have a second pair of congruent angles and are not similar.',
      'By the Triangle Sum Theorem, m∠B = 180° - 122° = 58°, so △ABC has two 58° angles and is not similar to △DEF.',
      'Similarity cannot be established because an exterior angle was given instead of a side length.',
    ],
    correctIndex: 0, // A
    correctAnswer:
      'By the Exterior Angle Theorem on △ABC, 58° + m∠B = 122°, so m∠B = 64°. Since ∠A ≅ ∠D (58°) and ∠B ≅ ∠E (64°), △ABC ~ △DEF by AA similarity.',
    hint: 'Apply the Exterior Angle Theorem to △ABC: m∠A + m∠B = 122° → 58° + m∠B = 122°. Compare the resulting m∠B to m∠E = 64° in △DEF!',
    explanation:
      'In △ABC, the exterior angle at C equals the sum of remote interior angles ∠A and ∠B: 58° + m∠B = 122° → m∠B = 64° (and interior m∠C = 180° - 122° = 58°). Since ∠A ≅ ∠D (58°) and ∠B ≅ ∠E (64°), △ABC ~ △DEF by the AA Similarity Criterion.',
  },
];
