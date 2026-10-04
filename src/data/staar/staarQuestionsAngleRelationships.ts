import {
  Unit7StaarQuestion,
  Unit7StaarItemFormat,
  UNIT_7_STAAR_ROUND_3_QUESTIONS,
} from './staarQuestionsAngleRelationshipsRound3';

export type { Unit7StaarQuestion, Unit7StaarItemFormat };

// =============================================================================
// ROUND 1 (Q1–Q12): FOUNDATIONAL STAAR (4 × 7.1, 4 × 7.2, 4 × 7.3)
// Primary 2023–2026 Digital STAAR style + 2012–2022 Texas STAAR variety
// Correct Answer Sequence: B, D, A, C, B, A, D, C, A, D, B, C (3 A, 3 B, 3 C, 3 D)
// =============================================================================
const ROUND_1_QUESTIONS: Unit7StaarQuestion[] = [
  {
    id: 'u7-staar-q01',
    round: 1,
    questionInRound: 1,
    questionNumber: 1,
    lesson: 'Lesson 7.1',
    strand: 'Corresponding Angles on Parallel Lines',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Two parallel streets, line l and line m, are intersected by a straight bike trail, transversal t, as shown in the diagram. If m∠1 = 123°, what is the measure of ∠5 in degrees?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 5,
      labelA: '123°',
      labelB: '?°',
      roleLabelA: 'Top-Left (Line l)',
      roleLabelB: 'Top-Left (Line m)',
    },
    options: ['57°', '123°', '67°', '113°'],
    correctIndex: 1, // B
    correctAnswer: '123°',
    hint: '∠1 and ∠5 occupy the same relative position (top-left) at each intersection along parallel lines l and m. Are corresponding angles congruent or supplementary?',
    explanation:
      '∠1 and ∠5 are Corresponding Angles formed by parallel lines l and m and transversal t. Corresponding angles are congruent, so m∠5 = m∠1 = 123° (57° is the supplement 180° - 123°).',
  },
  {
    id: 'u7-staar-q02',
    round: 1,
    questionInRound: 2,
    questionNumber: 2,
    lesson: 'Lesson 7.1',
    strand: 'Same-Side Interior Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Parallel lines l and m are intersected by transversal t. In the diagram, ∠4 and ∠6 are same-side interior angles, and m∠4 = 119°. What is the measure of ∠6?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 4,
      angleBIndex: 6,
      labelA: '119°',
      labelB: '?°',
      roleLabelA: 'Same-Side Interior (∠4)',
      roleLabelB: 'Same-Side Interior (∠6)',
    },
    options: ['119°', '71°', '59°', '61°'],
    correctIndex: 3, // D
    correctAnswer: '61°',
    hint: 'Observe that ∠4 is obtuse and ∠6 is acute inside the parallel lines on the same side of transversal t. Same-side interior angles are supplementary (sum to 180°).',
    explanation:
      'Same-side interior angles between parallel lines are supplementary: m∠4 + m∠6 = 180° → 119° + m∠6 = 180° → m∠6 = 61°.',
  },
  {
    id: 'u7-staar-q03',
    round: 1,
    questionInRound: 3,
    questionNumber: 3,
    lesson: 'Lesson 7.1',
    strand: 'Algebraic Alternate Interior Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'Parallel lines l and m are cut by transversal t. In the diagram, the highlighted alternate interior angles measure m∠3 = (2x + 14)° and m∠6 = 72°. What is the value of x?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 3,
      angleBIndex: 6,
      labelA: '(2x + 14)°',
      labelB: '72°',
      roleLabelA: 'Alternate Interior (∠3)',
      roleLabelB: 'Alternate Interior (∠6)',
    },
    options: ['x = 29', 'x = 47', 'x = 43', 'x = 58'],
    correctIndex: 0, // A
    correctAnswer: 'x = 29',
    numericValue: 29,
    unitLabel: '',
    hint: 'Alternate interior angles between parallel lines have equal measures. Write the equation 2x + 14 = 72 and solve for x.',
    explanation:
      'Since alternate interior angles are congruent when lines are parallel, 2x + 14 = 72 → 2x = 58 → x = 29.',
  },
  {
    id: 'u7-staar-q04',
    round: 1,
    questionInRound: 4,
    questionNumber: 4,
    lesson: 'Lesson 7.1',
    strand: 'Writing Equations from Linear Pairs',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Equation Selection',
    itemFormat: 'multiple-choice',
    prompt:
      'In the diagram, line l is intersected by line t, forming adjacent angles ∠1 and ∠2 along straight line l with measures 126° and (3x + 6)°. Which equation can be used to find the value of x?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 2,
      labelA: '126°',
      labelB: '(3x + 6)°',
      roleLabelA: 'Linear Pair (∠1)',
      roleLabelB: 'Linear Pair (∠2)',
    },
    options: [
      '3x + 6 = 126',
      '126 - (3x + 6) = 90',
      '126 + (3x + 6) = 180',
      '3x + 6 = 180',
    ],
    correctIndex: 2, // C
    correctAnswer: '126 + (3x + 6) = 180',
    hint: 'Adjacent angles that form a straight line (a linear pair) are supplementary, so their degree measures add up to 180°.',
    explanation:
      'Because ∠1 and ∠2 form a linear pair along straight line l, their measures sum to 180°: 126 + (3x + 6) = 180.',
  },
  {
    id: 'u7-staar-q05',
    round: 1,
    questionInRound: 5,
    questionNumber: 5,
    lesson: 'Lesson 7.2',
    strand: 'Triangle Sum Theorem',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'A triangular support truss △ABC has interior angle measures m∠A = 44° and m∠B = 79°. What is the measure of interior angle ∠C in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '44°',
      labelB: '79°',
      labelC: '?°',
    },
    options: ['67°', '57°', '123°', '47°'],
    correctIndex: 1, // B
    correctAnswer: '57°',
    hint: 'The three interior angles of any triangle always add up to 180°. Subtract the sum of 44° and 79° (123°) from 180°.',
    explanation:
      'By the Triangle Sum Theorem: 44° + 79° + m∠C = 180° → 123° + m∠C = 180° → m∠C = 57° (123° is the sum of the two given angles before subtracting from 180°).',
  },
  {
    id: 'u7-staar-q06',
    round: 1,
    questionInRound: 6,
    questionNumber: 6,
    lesson: 'Lesson 7.2',
    strand: 'Exterior Angle Theorem',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'In △ABC, side BC is extended through vertex C to point D. The two remote interior angles measure m∠A = 56° and m∠B = 69°. What is the measure of exterior angle ∠ACD in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '56°',
      labelB: '69°',
      labelC: '',
      labelExt: '?°',
    },
    options: ['125°', '55°', '115°', '135°'],
    correctIndex: 0, // A
    correctAnswer: '125°',
    numericValue: 125,
    unitLabel: '°',
    hint: 'By the Exterior Angle Theorem, the measure of an exterior angle of a triangle equals the sum of its two remote interior angles.',
    explanation:
      'By the Exterior Angle Theorem, m∠ACD = m∠A + m∠B = 56° + 69° = 125° (55° is the adjacent interior angle ∠ACB).',
  },
  {
    id: 'u7-staar-q07',
    round: 1,
    questionInRound: 7,
    questionNumber: 7,
    lesson: 'Lesson 7.2',
    strand: 'Algebraic Triangle Sum Theorem',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC shown below, the interior angles measure m∠A = 55°, m∠B = (3x + 5)°, and m∠C = 60°. What is the value of x?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '55°',
      labelB: '(3x + 5)°',
      labelC: '60°',
    },
    options: ['x = 25', 'x = 35', 'x = 18', 'x = 20'],
    correctIndex: 3, // D
    correctAnswer: 'x = 20',
    hint: 'Set the sum of all three interior angles equal to 180°: 55 + (3x + 5) + 60 = 180.',
    explanation:
      'By the Triangle Sum Theorem: 55 + (3x + 5) + 60 = 180 → 3x + 120 = 180 → 3x = 60 → x = 20.',
  },
  {
    id: 'u7-staar-q08',
    round: 1,
    questionInRound: 8,
    questionNumber: 8,
    lesson: 'Lesson 7.2',
    strand: 'Algebraic Exterior Angle Theorem',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2018–2026 STAAR Problem Structure',
    itemFormat: 'multiple-choice',
    prompt:
      'In △PQR, side QR is extended to point S. The remote interior angles measure m∠P = (2x + 10)° and m∠Q = 54°, and exterior angle m∠PRS = 118°. What is the value of x?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['P', 'Q', 'R', 'S'],
      labelA: '(2x + 10)°',
      labelB: '54°',
      labelC: '',
      labelExt: '118°',
    },
    options: ['x = 32', 'x = 59', 'x = 27', 'x = 54'],
    correctIndex: 2, // C
    correctAnswer: 'x = 27',
    hint: 'Add the two remote interior angles and set their sum equal to the exterior angle: (2x + 10) + 54 = 118.',
    explanation:
      'By the Exterior Angle Theorem: (2x + 10) + 54 = 118 → 2x + 64 = 118 → 2x = 54 → x = 27 (54 is the measure of 2x before dividing by 2).',
  },
  {
    id: 'u7-staar-q09',
    round: 1,
    questionInRound: 9,
    questionNumber: 9,
    lesson: 'Lesson 7.3',
    strand: 'Identifying Angle-Angle (AA) Similarity',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC and △DEF shown below, m∠A = 51°, m∠B = 67°, m∠D = 51°, and m∠E = 67°. Which statement is supported by this information?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['51°', '67°', ''],
      tri2Angles: ['51°', '67°', ''],
      highlightPairs: ['left', 'top'],
    },
    options: [
      '△ABC ~ △DEF because two pairs of corresponding angles are congruent.',
      '△ABC and △DEF are not similar because the third interior angle is unknown.',
      '△ABC and △DEF are similar only if their corresponding side lengths are equal.',
      '△ABC ~ △DEF only if all three interior angles equal 60°.',
    ],
    correctIndex: 0, // A
    correctAnswer: '△ABC ~ △DEF because two pairs of corresponding angles are congruent.',
    hint: 'Compare ∠A with ∠D (51°) and ∠B with ∠E (67°). How many pairs of congruent corresponding angles are required by the Angle-Angle (AA) Similarity Criterion?',
    explanation:
      'Since ∠A ≅ ∠D (51°) and ∠B ≅ ∠E (67°), two pairs of corresponding angles are congruent, which proves △ABC ~ △DEF by the AA Similarity Criterion.',
  },
  {
    id: 'u7-staar-q10',
    round: 1,
    questionInRound: 10,
    questionNumber: 10,
    lesson: 'Lesson 7.3',
    strand: 'Corresponding Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangle ABC is similar to triangle DEF (△ABC ~ △DEF). If m∠A = 40° and m∠B = 85°, what is the measure of ∠F in △DEF?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['40°', '85°', '?°'],
      tri2Angles: ['40°', '85°', '?°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: ['45°', '85°', '65°', '55°'],
    correctIndex: 3, // D
    correctAnswer: '55°',
    hint: 'First find m∠C in △ABC using 180° - (40° + 85°). Because △ABC ~ △DEF, corresponding angle ∠F has the same measure as ∠C.',
    explanation:
      'In △ABC, m∠C = 180° - (40° + 85°) = 180° - 125° = 55°. Because △ABC ~ △DEF, corresponding angles ∠C and ∠F are congruent, so m∠F = 55°.',
  },
  {
    id: 'u7-staar-q11',
    round: 1,
    questionInRound: 11,
    questionNumber: 11,
    lesson: 'Lesson 7.3',
    strand: 'Algebraic Corresponding Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangles JKL and MNP are similar (△JKL ~ △MNP). In the diagram, m∠J = 62°, m∠M = 62°, m∠K = (3x + 9)°, and m∠N = 75°. What is the value of x?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['J', 'K', 'L'],
      tri2Vertices: ['M', 'N', 'P'],
      tri1Angles: ['62°', '(3x + 9)°', ''],
      tri2Angles: ['62°', '75°', ''],
      highlightPairs: ['left', 'top'],
    },
    options: ['x = 28', 'x = 22', 'x = 18', 'x = 25'],
    correctIndex: 1, // B
    correctAnswer: 'x = 22',
    hint: 'In similar triangles △JKL ~ △MNP, corresponding angles ∠K and ∠N are congruent. Set 3x + 9 = 75 and solve for x.',
    explanation:
      'Corresponding angles of similar triangles have equal measures: 3x + 9 = 75 → 3x = 66 → x = 22.',
  },
  {
    id: 'u7-staar-q12',
    round: 1,
    questionInRound: 12,
    questionNumber: 12,
    lesson: 'Lesson 7.3',
    strand: 'Determining Triangle Similarity Using Missing Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2016–2026 STAAR Informal Argument',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, m∠A = 45° and m∠B = 60°. In △DEF, m∠D = 45° and m∠F = 75°. Which informal geometric argument correctly explains whether △ABC and △DEF are similar?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['45°', '60°', '?°'],
      tri2Angles: ['45°', '?°', '75°'],
      highlightPairs: ['left', 'right'],
    },
    options: [
      'They are not similar because 60° ≠ 75°.',
      'They are not similar because the lengths of the sides are not given.',
      'They are similar because m∠C = 180° - (45° + 60°) = 75°, giving two pairs of congruent angles (45° and 75°).',
      'They are similar because any two triangles that share one 45° angle are similar.',
    ],
    correctIndex: 2, // C
    correctAnswer:
      'They are similar because m∠C = 180° - (45° + 60°) = 75°, giving two pairs of congruent angles (45° and 75°).',
    hint: 'Don’t stop before checking the third angle! Calculate m∠C in △ABC using 180° - (45° + 60°) and compare it to m∠F = 75°.',
    explanation:
      'In △ABC, m∠C = 180° - (45° + 60°) = 75°. Therefore, ∠A ≅ ∠D (45°) and ∠C ≅ ∠F (75°), proving △ABC ~ △DEF by the AA Similarity Criterion.',
  },
];

// =============================================================================
// ROUND 2 (Q13–Q24): INTERMEDIATE STAAR (4 × 7.1, 4 × 7.2, 4 × 7.3)
// Primary 2023–2026 Digital STAAR style + 2012–2022 Texas STAAR variety
// Correct Answer Sequence: C, A, D, B, C, D, A, B, D, A, C, B (3 A, 3 B, 3 C, 3 D)
// =============================================================================
const ROUND_2_QUESTIONS: Unit7StaarQuestion[] = [
  {
    id: 'u7-staar-q13',
    round: 2,
    questionInRound: 1,
    questionNumber: 13,
    lesson: 'Lesson 7.1',
    strand: 'Two Variable Expressions with Corresponding Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Parallel lines l and m are intersected by transversal t. Highlighted corresponding angles measure m∠1 = (6x - 10)° and m∠5 = (4x + 30)°. What is the degree measure of ∠5?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 5,
      labelA: '(6x - 10)°',
      labelB: '(4x + 30)°',
      roleLabelA: 'Corresponding (∠1)',
      roleLabelB: 'Corresponding (∠5)',
    },
    options: ['20°', '70°', '110°', '120°'],
    correctIndex: 2, // C
    correctAnswer: '110°',
    hint: 'Corresponding angles are congruent: solve 6x - 10 = 4x + 30 for x. Then substitute x into (4x + 30)° to find m∠5 (20 is the value of x, not the angle measure!).',
    explanation:
      'Step 1: Set corresponding angles equal: 6x - 10 = 4x + 30 → 2x = 40 → x = 20. Step 2: Substitute x = 20 into m∠5 = 4(20) + 30 = 110° (70° is the supplement).',
  },
  {
    id: 'u7-staar-q14',
    round: 2,
    questionInRound: 2,
    questionNumber: 14,
    lesson: 'Lesson 7.1',
    strand: 'Same-Side Interior Equation Selection & Solution',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Two-Part Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In the diagram, line l is parallel to line m. Same-side interior angles ∠3 and ∠5 measure m∠3 = (3x + 7)° and m∠5 = (5x + 13)°. Which equation and value of x correctly represent this geometric relationship?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 3,
      angleBIndex: 5,
      labelA: '(3x + 7)°',
      labelB: '(5x + 13)°',
      roleLabelA: 'Same-Side Interior (∠3)',
      roleLabelB: 'Same-Side Interior (∠5)',
    },
    options: [
      '(3x + 7) + (5x + 13) = 180; x = 20',
      '3x + 7 = 5x + 13; x = -3',
      '(3x + 7) + (5x + 13) = 90; x = 8.75',
      '(5x + 13) - (3x + 7) = 180; x = 87',
    ],
    correctIndex: 0, // A
    correctAnswer: '(3x + 7) + (5x + 13) = 180; x = 20',
    hint: 'Same-side interior angles between parallel lines are supplementary (one is acute and one is obtuse, so their sum is 180°).',
    explanation:
      'Same-side interior angles ∠3 and ∠5 sum to 180°: (3x + 7) + (5x + 13) = 180 → 8x + 20 = 180 → 8x = 160 → x = 20.',
  },
  {
    id: 'u7-staar-q15',
    round: 2,
    questionInRound: 3,
    questionNumber: 15,
    lesson: 'Lesson 7.1',
    strand: 'Alternate Exterior Angles with Variables on Both Sides',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'Parallel lines l and m are cut by transversal t. Highlighted alternate exterior angles measure m∠2 = (4x - 7)° and m∠7 = (2x + 25)°. What is the measure of ∠2 in degrees?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 2,
      angleBIndex: 7,
      labelA: '(4x - 7)°',
      labelB: '(2x + 25)°',
      roleLabelA: 'Alternate Exterior (∠2)',
      roleLabelB: 'Alternate Exterior (∠7)',
    },
    options: ['16°', '123°', '67°', '57°'],
    correctIndex: 3, // D
    correctAnswer: '57°',
    numericValue: 57,
    unitLabel: '°',
    hint: 'Alternate exterior angles are congruent. Solve 4x - 7 = 2x + 25 for x, then substitute x back into (4x - 7)° to find m∠2!',
    explanation:
      'Step 1: Set alternate exterior angles equal: 4x - 7 = 2x + 25 → 2x = 32 → x = 16. Step 2: Substitute x = 16 into m∠2 = 4(16) - 7 = 64 - 7 = 57°.',
  },
  {
    id: 'u7-staar-q16',
    round: 2,
    questionInRound: 4,
    questionNumber: 16,
    lesson: 'Lesson 7.1',
    strand: 'Vertical Angles with Variables on Both Sides',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2019–2026 STAAR Problem Structure',
    itemFormat: 'multiple-choice',
    prompt:
      'At the intersection of line l and transversal t, vertical angles ∠1 and ∠4 measure m∠1 = (5x + 14)° and m∠4 = (7x - 18)°. What is the value of x, and what is the degree measure of each vertical angle?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 4,
      labelA: '(5x + 14)°',
      labelB: '(7x - 18)°',
      roleLabelA: 'Vertical Angle (∠1)',
      roleLabelB: 'Vertical Angle (∠4)',
    },
    options: [
      'x = 15, and each vertical angle measures 89°',
      'x = 16, and each vertical angle measures 94°',
      'x = 16, and each vertical angle measures 86°',
      'x = 14, and each vertical angle measures 84°',
    ],
    correctIndex: 1, // B
    correctAnswer: 'x = 16, and each vertical angle measures 94°',
    hint: 'Vertical angles are always congruent. Solve 5x + 14 = 7x - 18 for x, then substitute x into (5x + 14)°.',
    explanation:
      'Vertical angles have equal measures: 5x + 14 = 7x - 18 → 2x = 32 → x = 16. Substituting x = 16 gives 5(16) + 14 = 80 + 14 = 94°.',
  },
  {
    id: 'u7-staar-q17',
    round: 2,
    questionInRound: 5,
    questionNumber: 17,
    lesson: 'Lesson 7.2',
    strand: 'Triangle Sum Theorem with Multiple Algebraic Angles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, the interior angles measure m∠A = (3x + 6)°, m∠B = (2x + 9)°, and m∠C = 55°. What is the measure of ∠A in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '(3x + 6)°',
      labelB: '(2x + 9)°',
      labelC: '55°',
    },
    options: ['22°', '53°', '72°', '68°'],
    correctIndex: 2, // C
    correctAnswer: '72°',
    hint: 'First solve (3x + 6) + (2x + 9) + 55 = 180 for x. Then substitute x into m∠A = (3x + 6)° (note that 53° is m∠B and 22 is x!).',
    explanation:
      'By the Triangle Sum Theorem: (3x + 6) + (2x + 9) + 55 = 180 → 5x + 70 = 180 → 5x = 110 → x = 22. Substituting x = 22 into m∠A gives 3(22) + 6 = 72°.',
  },
  {
    id: 'u7-staar-q18',
    round: 2,
    questionInRound: 6,
    questionNumber: 18,
    lesson: 'Lesson 7.2',
    strand: 'Exterior Angle Theorem Equation & Solution',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Two-Part Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, side BC is extended to point D. Remote interior angles measure m∠A = (3x - 4)° and m∠B = (2x + 16)°, and exterior angle m∠ACD = 132°. Which equation and solution correctly represent this relationship?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '(3x - 4)°',
      labelB: '(2x + 16)°',
      labelC: '',
      labelExt: '132°',
    },
    options: [
      '(3x - 4) + (2x + 16) + 132 = 180; x = 7.2',
      '3x - 4 = 2x + 16; x = 20',
      '132 - (3x - 4) = 180; x = -14.6',
      '(3x - 4) + (2x + 16) = 132; x = 24',
    ],
    correctIndex: 3, // D
    correctAnswer: '(3x - 4) + (2x + 16) = 132; x = 24',
    hint: 'By the Exterior Angle Theorem, the sum of the two remote interior angles equals the exterior angle (132°), not 180°.',
    explanation:
      'By the Exterior Angle Theorem: (3x - 4) + (2x + 16) = 132 → 5x + 12 = 132 → 5x = 120 → x = 24.',
  },
  {
    id: 'u7-staar-q19',
    round: 2,
    questionInRound: 7,
    questionNumber: 19,
    lesson: 'Lesson 7.2',
    strand: 'Exterior Angle Theorem Multi-Step Measure',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2024–2026 Digital STAAR Numeric Entry',
    itemFormat: 'numeric-input',
    prompt:
      'In △PQR, side QR is extended to point S. Remote interior angles measure m∠P = (2x + 14)° and m∠Q = (3x - 9)°, and exterior angle m∠PRS = 115°. What is the measure of interior angle ∠Q in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['P', 'Q', 'R', 'S'],
      labelA: '(2x + 14)°',
      labelB: '(3x - 9)°',
      labelC: '',
      labelExt: '115°',
    },
    options: ['57°', '58°', '22°', '65°'],
    correctIndex: 0, // A
    correctAnswer: '57°',
    numericValue: 57,
    unitLabel: '°',
    hint: 'Solve (2x + 14) + (3x - 9) = 115 for x, then substitute x into m∠Q = (3x - 9)° (58° is m∠P and 22 is x).',
    explanation:
      'Step 1: (2x + 14) + (3x - 9) = 115 → 5x + 5 = 115 → 5x = 110 → x = 22. Step 2: Substitute x = 22 into m∠Q = 3(22) - 9 = 66 - 9 = 57°.',
  },
  {
    id: 'u7-staar-q20',
    round: 2,
    questionInRound: 8,
    questionNumber: 20,
    lesson: 'Lesson 7.2',
    strand: 'Connecting Triangle Sum & Exterior Angle Relationships',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2017–2026 STAAR Multi-Angle Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, side BC is extended to point D. Remote interior angle m∠A = 53° and adjacent interior angle m∠ACB = 68°. What are the measures of remote interior angle ∠B and exterior angle ∠ACD?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '53°',
      labelB: '?°',
      labelC: '68°',
      labelExt: '?°',
    },
    options: [
      'm∠B = 68° and m∠ACD = 121°',
      'm∠B = 59° and m∠ACD = 112°',
      'm∠B = 59° and m∠ACD = 127°',
      'm∠B = 69° and m∠ACD = 112°',
    ],
    correctIndex: 1, // B
    correctAnswer: 'm∠B = 59° and m∠ACD = 112°',
    hint: 'Use the Triangle Sum Theorem (53° + m∠B + 68° = 180°) to find m∠B, and use either the linear pair (180° - 68°) or Exterior Angle Theorem (53° + m∠B) to find m∠ACD.',
    explanation:
      'By the Triangle Sum Theorem, m∠B = 180° - (53° + 68°) = 59°. By the Exterior Angle Theorem, m∠ACD = 53° + 59° = 112° (which also equals the linear pair 180° - 68° = 112°).',
  },
  {
    id: 'u7-staar-q21',
    round: 2,
    questionInRound: 9,
    questionNumber: 21,
    lesson: 'Lesson 7.3',
    strand: 'AA Similarity Multi-Step Angle Comparison',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Reasoning',
    itemFormat: 'multiple-choice',
    prompt:
      'In △ABC, m∠A = 47° and m∠B = 68°. In △DEF, m∠E = 68° and m∠F = 65°. Which statement accurately compares △ABC and △DEF?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['47°', '68°', '?°'],
      tri2Angles: ['?°', '68°', '65°'],
      highlightPairs: ['top', 'right'],
    },
    options: [
      'The triangles are not similar because 47° ≠ 65°.',
      'The triangles are similar only if side AB is congruent to side DE.',
      'In △ABC, m∠C = 75°, so the triangles are not similar.',
      'In △ABC, m∠C = 65°, so ∠B ≅ ∠E (68°) and ∠C ≅ ∠F (65°), proving △ABC ~ △DEF by AA similarity.',
    ],
    correctIndex: 3, // D
    correctAnswer:
      'In △ABC, m∠C = 65°, so ∠B ≅ ∠E (68°) and ∠C ≅ ∠F (65°), proving △ABC ~ △DEF by AA similarity.',
    hint: 'Calculate m∠C in △ABC using 180° - (47° + 68°). Then compare the corresponding angle measures of both triangles!',
    explanation:
      'In △ABC, m∠C = 180° - (47° + 68°) = 180° - 115° = 65°. Since ∠B ≅ ∠E (68°) and ∠C ≅ ∠F (65°), △ABC ~ △DEF by the AA Similarity Criterion.',
  },
  {
    id: 'u7-staar-q22',
    round: 2,
    questionInRound: 10,
    questionNumber: 22,
    lesson: 'Lesson 7.3',
    strand: 'Algebraic Corresponding Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Given △ABC ~ △DEF, corresponding angles ∠C and ∠F measure m∠C = (5x - 11)° and m∠F = (3x + 25)°. What is the degree measure of ∠C?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['42°', '', '(5x - 11)°'],
      tri2Angles: ['42°', '', '(3x + 25)°'],
      highlightPairs: ['left', 'right'],
    },
    options: ['79°', '18°', '69°', '59°'],
    correctIndex: 0, // A
    correctAnswer: '79°',
    hint: 'Since △ABC ~ △DEF, corresponding angles ∠C and ∠F are equal: 5x - 11 = 3x + 25. Solve for x, then substitute x into (5x - 11)° (18 is x, not m∠C!).',
    explanation:
      'Step 1: Set corresponding angles equal: 5x - 11 = 3x + 25 → 2x = 36 → x = 18. Step 2: Substitute x = 18 into m∠C = 5(18) - 11 = 90 - 11 = 79°.',
  },
  {
    id: 'u7-staar-q23',
    round: 2,
    questionInRound: 11,
    questionNumber: 23,
    lesson: 'Lesson 7.3',
    strand: 'Distinguishing Similar and Non-Similar Triangles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2015–2026 STAAR Conceptual Justification',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangle JKL has interior angles m∠J = 55° and m∠K = 62°. Triangle MNP has interior angles m∠M = 55° and m∠P = 68°. Which statement explains why △JKL and △MNP are NOT similar?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['J', 'K', 'L'],
      tri2Vertices: ['M', 'N', 'P'],
      tri1Angles: ['55°', '62°', '?°'],
      tri2Angles: ['55°', '?°', '68°'],
      highlightPairs: ['left'],
    },
    options: [
      'Because similar triangles must contain at least one right angle.',
      'Because 55° + 62° is less than 180°.',
      'Because the third angle of △JKL is m∠L = 63°, so the triangles share only one pair of congruent angles (55°) instead of two.',
      'Because the third angle of △JKL is m∠L = 73°.',
    ],
    correctIndex: 2, // C
    correctAnswer:
      'Because the third angle of △JKL is m∠L = 63°, so the triangles share only one pair of congruent angles (55°) instead of two.',
    hint: 'Find m∠L in △JKL using 180° - (55° + 62°). Compare the three angles of △JKL {55°, 62°, 63°} with the angles of △MNP!',
    explanation:
      'In △JKL, m∠L = 180° - (55° + 62°) = 63°. Thus △JKL has angles {55°, 62°, 63°} while △MNP has angles {55°, 57°, 68°}. Since only one pair of angles is congruent, the triangles are not similar.',
  },
  {
    id: 'u7-staar-q24',
    round: 2,
    questionInRound: 12,
    questionNumber: 24,
    lesson: 'Lesson 7.3',
    strand: 'Finding Unknown Algebraic Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    staarEraBadge: '2023–2026 Digital STAAR Style',
    itemFormat: 'multiple-choice',
    prompt:
      'Triangles PQR and XYZ are similar (△PQR ~ △XYZ). In △PQR, m∠P = 44° and m∠R = 58°. In △XYZ, m∠Y = (4x + 6)°. What is the value of x?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['P', 'Q', 'R'],
      tri2Vertices: ['X', 'Y', 'Z'],
      tri1Angles: ['44°', '?°', '58°'],
      tri2Angles: ['44°', '(4x + 6)°', '58°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: ['x = 16', 'x = 18', 'x = 21', 'x = 13'],
    correctIndex: 1, // B
    correctAnswer: 'x = 18',
    hint: 'First find m∠Q in △PQR using 180° - (44° + 58°). Because ∠Q corresponds to ∠Y in △PQR ~ △XYZ, set 4x + 6 = m∠Q and solve for x.',
    explanation:
      'Step 1: In △PQR, m∠Q = 180° - (44° + 58°) = 180° - 102° = 78°. Step 2: Since △PQR ~ △XYZ, corresponding angle m∠Y = m∠Q = 78° → 4x + 6 = 78 → 4x = 72 → x = 18.',
  },
];

export const STAAR_ANGLE_RELATIONSHIPS_QUESTIONS: Unit7StaarQuestion[] = [
  ...ROUND_1_QUESTIONS,
  ...ROUND_2_QUESTIONS,
  ...UNIT_7_STAAR_ROUND_3_QUESTIONS,
];
