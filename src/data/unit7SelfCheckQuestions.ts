export type Unit7SelfCheckDiagramConfig =
  | {
      kind: 'transversal';
      angleAIndex: number; // 1..8
      angleBIndex: number; // 1..8
      labelA: string;
      labelB: string;
      roleLabelA?: string;
      roleLabelB?: string;
    }
  | {
      kind: 'triangle';
      showExterior: boolean;
      vertexLabels?: [string, string, string, string?]; // default ['A','B','C','D']
      labelA: string;
      labelB: string;
      labelC: string;
      labelExt?: string;
    }
  | {
      kind: 'aa-triangles';
      tri1Vertices: [string, string, string];
      tri2Vertices: [string, string, string];
      tri1Angles: [string, string, string]; // [left, top, right]
      tri2Angles: [string, string, string]; // [left, top, right]
      highlightPairs?: ('left' | 'top' | 'right')[];
    };

export interface Unit7SelfCheckQuestion {
  id: string;
  round: 1 | 2 | 3;
  questionInRound: 1 | 2 | 3 | 4 | 5 | 6;
  overallNumber: number; // 1..18
  lesson: 'Lesson 7.1' | 'Lesson 7.2' | 'Lesson 7.3';
  lessonTopic: string;
  teks: 'TEKS 8.8D';
  type: 'multiple-choice' | 'numeric-input';
  prompt: string;
  diagram: Unit7SelfCheckDiagramConfig;
  options?: string[];
  correctAnswer: string; // exact option string for MC, or numeric string for numeric-input
  correctIndex?: number; // 0..3 for MC
  hint: string;
  explanation: string;
}

export const UNIT_7_SELF_CHECK_QUESTIONS: Unit7SelfCheckQuestion[] = [
  // ===========================================================================
  // ROUND 1 (Questions 1–6): 2 × Lesson 7.1, 2 × Lesson 7.2, 2 × Lesson 7.3
  // ===========================================================================
  {
    id: 'u7-sc-q01',
    round: 1,
    questionInRound: 1,
    overallNumber: 1,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Parallel Lines & Transversal Angle Relationships',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Parallel lines l and m are cut by transversal t. Which angle relationship best describes the two highlighted angles ∠3 and ∠6?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 3,
      angleBIndex: 6,
      labelA: '∠3',
      labelB: '∠6',
      roleLabelA: 'Interior (Left of t)',
      roleLabelB: 'Interior (Right of t)',
    },
    options: [
      'Corresponding Angles',
      'Alternate Interior Angles',
      'Same-Side Interior Angles',
      'Alternate Exterior Angles',
    ],
    correctAnswer: 'Alternate Interior Angles',
    correctIndex: 1, // B
    hint: 'Look at where ∠3 and ∠6 are located: both lie INSIDE the parallel lines (interior) and on OPPOSITE sides of transversal t.',
    explanation:
      '∠3 and ∠6 lie between parallel lines l and m on opposite sides of transversal t, so they are Alternate Interior Angles (and their measures are equal).',
  },
  {
    id: 'u7-sc-q02',
    round: 1,
    questionInRound: 2,
    overallNumber: 2,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Corresponding Angles on Parallel Lines',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'In the diagram, line l is parallel to line m, and m∠1 = 128°. What is the measure of highlighted angle ∠5?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 5,
      labelA: '128°',
      labelB: '?°',
      roleLabelA: 'Top-Left Corner',
      roleLabelB: 'Top-Left Corner',
    },
    options: ['52°', '62°', '128°', '118°'],
    correctAnswer: '128°',
    correctIndex: 2, // C
    hint: 'Compare the positions of ∠1 and ∠5 at each intersection. Are corresponding angles congruent (equal) or supplementary?',
    explanation:
      '∠1 and ∠5 are Corresponding Angles because both are in the top-left position at their intersections. Since l ∥ m, corresponding angles are congruent: m∠5 = m∠1 = 128°.',
  },
  {
    id: 'u7-sc-q03',
    round: 1,
    questionInRound: 3,
    overallNumber: 3,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Triangle Sum Theorem',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'In △ABC, the highlighted interior angles measure m∠A = 52° and m∠B = 68°. What is the measure of the third interior angle ∠C in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '52°',
      labelB: '68°',
      labelC: '?°',
    },
    correctAnswer: '60',
    hint: 'By the Triangle Sum Theorem, the three interior angles of every triangle add up to 180°. Add 52° + 68° first, then subtract from 180°.',
    explanation:
      'By the Triangle Sum Theorem, m∠A + m∠B + m∠C = 180° → 52° + 68° + m∠C = 180° → 120° + m∠C = 180° → m∠C = 60°.',
  },
  {
    id: 'u7-sc-q04',
    round: 1,
    questionInRound: 4,
    overallNumber: 4,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Exterior Angle Theorem',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'In △PQR, side QR is extended to point S to form exterior angle ∠PRS. Given remote interior angles m∠P = 47° and m∠Q = 68°, what is m∠PRS?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['P', 'Q', 'R', 'S'],
      labelA: '47°',
      labelB: '68°',
      labelC: '',
      labelExt: '?°',
    },
    options: ['65°', '113°', '133°', '115°'],
    correctAnswer: '115°',
    correctIndex: 3, // D
    hint: 'By the Exterior Angle Theorem, the measure of the exterior angle equals the sum of the two remote interior angles (∠P and ∠Q).',
    explanation:
      'By the Exterior Angle Theorem, m∠PRS = m∠P + m∠Q = 47° + 68° = 115°.',
  },
  {
    id: 'u7-sc-q05',
    round: 1,
    questionInRound: 5,
    overallNumber: 5,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Angle-Angle (AA) Similarity Criterion',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Examine △ABC and △DEF shown below. Which statement correctly explains why △ABC ~ △DEF?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['45°', '75°', ''],
      tri2Angles: ['45°', '75°', ''],
      highlightPairs: ['left', 'top'],
    },
    options: [
      'Two pairs of corresponding angles are congruent (∠A ≅ ∠D and ∠B ≅ ∠E), satisfying the AA Similarity Criterion.',
      'All triangles with acute angles are automatically similar.',
      'The interior angles of each triangle add up to 120°.',
      'The triangles must be congruent in size to be similar.',
    ],
    correctAnswer:
      'Two pairs of corresponding angles are congruent (∠A ≅ ∠D and ∠B ≅ ∠E), satisfying the AA Similarity Criterion.',
    correctIndex: 0, // A
    hint: 'Look at the highlighted angle pairs in both triangles: m∠A = m∠D = 45° and m∠B = m∠E = 75°. What criterion uses two pairs of congruent angles?',
    explanation:
      'Because ∠A ≅ ∠D (45°) and ∠B ≅ ∠E (75°), two pairs of corresponding angles are congruent. By the Angle-Angle (AA) Similarity Criterion, △ABC ~ △DEF.',
  },
  {
    id: 'u7-sc-q06',
    round: 1,
    questionInRound: 6,
    overallNumber: 6,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Corresponding Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'Given that △JKL ~ △MNP with m∠J = 54° and m∠K = 76°, what is the measure of corresponding angle ∠P in degrees?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['J', 'K', 'L'],
      tri2Vertices: ['M', 'N', 'P'],
      tri1Angles: ['54°', '76°', '?°'],
      tri2Angles: ['54°', '76°', '?°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    correctAnswer: '50',
    hint: 'In similar triangles △JKL ~ △MNP, corresponding angles are congruent (∠L ≅ ∠P). Use the Triangle Sum Theorem (180°) on △JKL to find m∠L, which equals m∠P.',
    explanation:
      'First find m∠L in △JKL: 180° - (54° + 76°) = 180° - 130° = 50°. Because △JKL ~ △MNP, corresponding angles ∠L and ∠P are congruent, so m∠P = 50°.',
  },

  // ===========================================================================
  // ROUND 2 (Questions 7–12): 2 × Lesson 7.1, 2 × Lesson 7.2, 2 × Lesson 7.3
  // ===========================================================================
  {
    id: 'u7-sc-q07',
    round: 2,
    questionInRound: 1,
    overallNumber: 7,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Same-Side Interior Angles',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'Parallel lines l and m are cut by transversal t. Highlighted angles ∠4 and ∠6 are same-side interior angles. If m∠4 = 116°, what is m∠6 in degrees?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 4,
      angleBIndex: 6,
      labelA: '116°',
      labelB: '?°',
      roleLabelA: 'Same-Side Interior 1',
      roleLabelB: 'Same-Side Interior 2',
    },
    correctAnswer: '64',
    hint: 'Same-side interior angles between parallel lines are supplementary—their measures add up to 180°.',
    explanation:
      'Same-side interior angles ∠4 and ∠6 are supplementary: m∠4 + m∠6 = 180° → 116° + m∠6 = 180° → m∠6 = 64°.',
  },
  {
    id: 'u7-sc-q08',
    round: 2,
    questionInRound: 2,
    overallNumber: 8,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Algebraic Alternate Interior Angles',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Parallel lines l and m are cut by transversal t. Highlighted alternate interior angles measure m∠3 = (4x + 10)° and m∠6 = 74°. What is the value of x?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 3,
      angleBIndex: 6,
      labelA: '(4x + 10)°',
      labelB: '74°',
      roleLabelA: 'Alternate Interior 1',
      roleLabelB: 'Alternate Interior 2',
    },
    options: ['x = 24', 'x = 21', 'x = 16', 'x = 18'],
    correctAnswer: 'x = 16',
    correctIndex: 2, // C
    hint: 'Alternate interior angles between parallel lines are congruent (equal). Set 4x + 10 = 74 and solve for x.',
    explanation:
      'Because ∠3 and ∠6 are alternate interior angles, they are congruent: 4x + 10 = 74 → 4x = 64 → x = 16.',
  },
  {
    id: 'u7-sc-q09',
    round: 2,
    questionInRound: 3,
    overallNumber: 9,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Triangle Sum Theorem Equation Setup',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Examine the three highlighted interior angles of △ABC. Which equation can be used to find the value of x?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '(2x + 10)°',
      labelB: '(3x - 5)°',
      labelC: '55°',
    },
    options: [
      '2x + 10 = 3x - 5',
      '(2x + 10) + (3x - 5) + 55 = 180',
      '(2x + 10) + (3x - 5) = 55',
      '(2x + 10) + (3x - 5) = 180',
    ],
    correctAnswer: '(2x + 10) + (3x - 5) + 55 = 180',
    correctIndex: 1, // B
    hint: 'All three angles are inside △ABC. By the Triangle Sum Theorem, what must the sum of all three interior angles equal?',
    explanation:
      'By the Triangle Sum Theorem, the three interior angles of △ABC sum to 180°: (2x + 10) + (3x - 5) + 55 = 180.',
  },
  {
    id: 'u7-sc-q10',
    round: 2,
    questionInRound: 4,
    overallNumber: 10,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Finding a Remote Interior Angle',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'In △ABC, side BC is extended to point D. Exterior angle m∠ACD = 128° and remote interior angle m∠B = 63°. What is the measure of remote interior angle ∠A in degrees?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '?°',
      labelB: '63°',
      labelC: '',
      labelExt: '128°',
    },
    correctAnswer: '65',
    hint: 'By the Exterior Angle Theorem, Remote Interior ∠A + Remote Interior ∠B = Exterior ∠ACD (m∠A + 63° = 128°).',
    explanation:
      'By the Exterior Angle Theorem, m∠A + m∠B = m∠ACD → m∠A + 63° = 128° → m∠A = 128° - 63° = 65°.',
  },
  {
    id: 'u7-sc-q11',
    round: 2,
    questionInRound: 5,
    overallNumber: 11,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Using Missing Angles to Prove AA Similarity',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'In △ABC, m∠A = 38° and m∠B = 82°. In △DEF, m∠D = 38° and m∠F = 60°. After finding m∠C, what can you conclude about △ABC and △DEF?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['38°', '82°', '?°'],
      tri2Angles: ['38°', '?°', '60°'],
      highlightPairs: ['left', 'right'],
    },
    options: [
      'The triangles are not similar because 82° ≠ 60°.',
      'There is not enough information without knowing the side lengths.',
      'Since m∠C = 60°, the triangles share two pairs of congruent angles (38° and 60°), so △ABC ~ △DEF.',
      'Since m∠C = 70°, the triangles are not similar.',
    ],
    correctAnswer:
      'Since m∠C = 60°, the triangles share two pairs of congruent angles (38° and 60°), so △ABC ~ △DEF.',
    correctIndex: 2, // C
    hint: 'First use the Triangle Sum Theorem on △ABC: m∠C = 180° - (38° + 82°). Then compare m∠C with m∠F = 60°!',
    explanation:
      'In △ABC, m∠C = 180° - (38° + 82°) = 60°. Now ∠A ≅ ∠D (38°) and ∠C ≅ ∠F (60°), so △ABC ~ △DEF by the AA Similarity Criterion.',
  },
  {
    id: 'u7-sc-q12',
    round: 2,
    questionInRound: 6,
    overallNumber: 12,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Testing Triangle Similarity with AA',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Triangle PQR has interior angles m∠P = 50° and m∠Q = 65°. Triangle XYZ has interior angles m∠X = 50° and m∠Z = 60°. Are △PQR and △XYZ similar?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['P', 'Q', 'R'],
      tri2Vertices: ['X', 'Y', 'Z'],
      tri1Angles: ['50°', '65°', '?°'],
      tri2Angles: ['50°', '?°', '60°'],
      highlightPairs: ['left'],
    },
    options: [
      'Yes, because both triangles have a 50° angle.',
      'Yes, because all acute triangles are similar.',
      'Yes, because m∠R = 60° matches m∠Z = 60°.',
      'No, because the angles of △PQR are 50°, 65°, and 65°, while the angles of △XYZ are 50°, 70°, and 60°.',
    ],
    correctAnswer:
      'No, because the angles of △PQR are 50°, 65°, and 65°, while the angles of △XYZ are 50°, 70°, and 60°.',
    correctIndex: 3, // D
    hint: 'Find the third angle of △PQR: 180° - (50° + 65°). Does △PQR have a 60° angle to match ∠Z?',
    explanation:
      'In △PQR, m∠R = 180° - (50° + 65°) = 65°. In △XYZ, m∠Y = 180° - (50° + 60°) = 70°. Since only one pair of angles is congruent (50°), the triangles are not similar.',
  },

  // ===========================================================================
  // ROUND 3 (Questions 13–18): 2 × Lesson 7.1, 2 × Lesson 7.2, 2 × Lesson 7.3
  // ===========================================================================
  {
    id: 'u7-sc-q13',
    round: 3,
    questionInRound: 1,
    overallNumber: 13,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Algebraic Same-Side Interior Angles',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Parallel lines l and m are cut by transversal t. Highlighted same-side interior angles measure m∠4 = (5x + 15)° and m∠6 = (3x + 5)°. What are the values of x and m∠4?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 4,
      angleBIndex: 6,
      labelA: '(5x + 15)°',
      labelB: '(3x + 5)°',
      roleLabelA: 'Same-Side Interior 1',
      roleLabelB: 'Same-Side Interior 2',
    },
    options: [
      'x = 20 and m∠4 = 115°',
      'x = 10 and m∠4 = 65°',
      'x = 20 and m∠4 = 65°',
      'x = 22 and m∠4 = 125°',
    ],
    correctAnswer: 'x = 20 and m∠4 = 115°',
    correctIndex: 0, // A
    hint: 'Same-side interior angles are supplementary (add to 180°). Solve (5x + 15) + (3x + 5) = 180 for x, then substitute x into (5x + 15)°.',
    explanation:
      'Set the sum equal to 180°: (5x + 15) + (3x + 5) = 180 → 8x + 20 = 180 → 8x = 160 → x = 20. Then m∠4 = 5(20) + 15 = 115°.',
  },
  {
    id: 'u7-sc-q14',
    round: 3,
    questionInRound: 2,
    overallNumber: 14,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Algebraic Linear Pair on a Transversal',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'In the diagram, highlighted angles ∠1 and ∠2 form a linear pair along straight line l. If m∠1 = (6x - 4)° and m∠2 = 64°, what is the value of x?',
    diagram: {
      kind: 'transversal',
      angleAIndex: 1,
      angleBIndex: 2,
      labelA: '(6x - 4)°',
      labelB: '64°',
      roleLabelA: 'Linear Pair 1',
      roleLabelB: 'Linear Pair 2',
    },
    correctAnswer: '20',
    hint: 'Angles in a linear pair form a straight line and add to 180°. Set (6x - 4) + 64 = 180 and solve for x.',
    explanation:
      'Because ∠1 and ∠2 form a linear pair, (6x - 4) + 64 = 180 → 6x + 60 = 180 → 6x = 120 → x = 20.',
  },
  {
    id: 'u7-sc-q15',
    round: 3,
    questionInRound: 3,
    overallNumber: 15,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Solving for an Angle Using the Triangle Sum Theorem',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'In △ABC, the interior angles measure m∠A = (2x + 8)°, m∠B = (3x + 2)°, and m∠C = 50°. What is the degree measure of ∠B?',
    diagram: {
      kind: 'triangle',
      showExterior: false,
      vertexLabels: ['A', 'B', 'C'],
      labelA: '(2x + 8)°',
      labelB: '(3x + 2)°',
      labelC: '50°',
    },
    options: ['24°', '56°', '74°', '82°'],
    correctAnswer: '74°',
    correctIndex: 2, // C
    hint: 'First solve (2x + 8) + (3x + 2) + 50 = 180 for x. Then substitute x into m∠B = (3x + 2)°!',
    explanation:
      'By the Triangle Sum Theorem, (2x + 8) + (3x + 2) + 50 = 180 → 5x + 60 = 180 → 5x = 120 → x = 24. Substituting x = 24 gives m∠B = 3(24) + 2 = 74°.',
  },
  {
    id: 'u7-sc-q16',
    round: 3,
    questionInRound: 4,
    overallNumber: 16,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Algebraic Exterior Angle Theorem',
    teks: 'TEKS 8.8D',
    type: 'numeric-input',
    prompt:
      'In △ABC, remote interior angles measure m∠A = (3x + 6)° and m∠B = (2x + 9)°, and exterior angle m∠ACD = 130°. What is the value of x?',
    diagram: {
      kind: 'triangle',
      showExterior: true,
      vertexLabels: ['A', 'B', 'C', 'D'],
      labelA: '(3x + 6)°',
      labelB: '(2x + 9)°',
      labelC: '',
      labelExt: '130°',
    },
    correctAnswer: '23',
    hint: 'By the Exterior Angle Theorem, add the two remote interior angles and set their sum equal to the exterior angle: (3x + 6) + (2x + 9) = 130.',
    explanation:
      'By the Exterior Angle Theorem, (3x + 6) + (2x + 9) = 130 → 5x + 15 = 130 → 5x = 115 → x = 23.',
  },
  {
    id: 'u7-sc-q17',
    round: 3,
    questionInRound: 5,
    overallNumber: 17,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Algebraic Corresponding Angles in Similar Triangles',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'Triangles ABC and DEF are similar (△ABC ~ △DEF). Corresponding angles ∠B and ∠E measure m∠B = (4x - 8)° and m∠E = 68°. What value of x makes ∠B ≅ ∠E?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['48°', '(4x - 8)°', ''],
      tri2Angles: ['48°', '68°', ''],
      highlightPairs: ['left', 'top'],
    },
    options: ['x = 15', 'x = 19', 'x = 17', 'x = 21'],
    correctAnswer: 'x = 19',
    correctIndex: 1, // B
    hint: 'Corresponding angles of similar triangles are congruent (equal). Set 4x - 8 = 68 and solve for x.',
    explanation:
      'Since △ABC ~ △DEF, corresponding angles ∠B and ∠E are congruent: 4x - 8 = 68 → 4x = 76 → x = 19.',
  },
  {
    id: 'u7-sc-q18',
    round: 3,
    questionInRound: 6,
    overallNumber: 18,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Determining Unknown Angles for AA Similarity',
    teks: 'TEKS 8.8D',
    type: 'multiple-choice',
    prompt:
      'In △ABC, m∠A = 41° and m∠C = 64°. For △DEF to be similar to △ABC by the AA Similarity Criterion with m∠D = 41°, which angle measure could ∠E have?',
    diagram: {
      kind: 'aa-triangles',
      tri1Vertices: ['A', 'B', 'C'],
      tri2Vertices: ['D', 'E', 'F'],
      tri1Angles: ['41°', '?°', '64°'],
      tri2Angles: ['41°', '?°', '64°'],
      highlightPairs: ['left', 'top', 'right'],
    },
    options: ['65°', '85°', '79°', '75°'],
    correctAnswer: '75°',
    correctIndex: 3, // D
    hint: 'Find m∠B in △ABC using the Triangle Sum Theorem: 180° - (41° + 64°). In similar triangles △ABC ~ △DEF, m∠E must match m∠B!',
    explanation:
      'In △ABC, m∠B = 180° - (41° + 64°) = 180° - 105° = 75°. Therefore, corresponding angle ∠E in △DEF must measure 75°.',
  },
];
