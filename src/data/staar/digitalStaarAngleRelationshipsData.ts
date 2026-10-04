// src/data/staar/digitalStaarAngleRelationshipsData.ts
// 12 Original Technology-Enhanced Geometry Questions for Unit 7 Digital STAAR Simulator
// Primary TEKS: 8.8D — Angle Relationships in Parallel Lines and Triangles

export type Unit7DigitalStaarQuestionId =
  | 'u7-dstaar-q01'
  | 'u7-dstaar-q02'
  | 'u7-dstaar-q03'
  | 'u7-dstaar-q04'
  | 'u7-dstaar-q05'
  | 'u7-dstaar-q06'
  | 'u7-dstaar-q07'
  | 'u7-dstaar-q08'
  | 'u7-dstaar-q09'
  | 'u7-dstaar-q10'
  | 'u7-dstaar-q11'
  | 'u7-dstaar-q12';

export interface Unit7DigitalStaarBaseQuestion {
  id: Unit7DigitalStaarQuestionId;
  questionNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lesson: 'Lesson 7.1' | 'Lesson 7.2' | 'Lesson 7.3';
  lessonTopic: string;
  teks: 'TEKS 8.8D';
  prompt: string;
  instruction: string;
  hint: string;
  explanation: string;
}

// Q1 — HOT SPOT
export interface Q1HotSpotQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q1-hotspot';
  referenceAngle: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  correctTargetAngle: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

// Q2 — INLINE CHOICE
export interface Q2InlineChoiceQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q2-inline-choice';
  angleAIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  angleBIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  labelA: string;
  labelB: string;
  dropdown1Options: string[];
  correctDropdown1: string;
  dropdown2Options: string[];
  correctDropdown2: string;
  dropdown3Options: string[];
  correctDropdown3: string;
}

// Q3 — NUMERIC / EQUATION ENTRY
export interface Q3NumericEquationEntryQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q3-numeric-equation';
  angleAIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  angleBIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  labelA: string;
  labelB: string;
  relationshipOptions: string[];
  correctRelationship: string;
  equationOptions: string[];
  correctEquation: string;
  correctX: number;
  correctAngleMeasure: number;
  requestedAngleLabel: string;
}

// Q4 — DRAG & DROP CLASSIFICATION
export interface Q4DragDropPairCard {
  id: string;
  label: string;
  correctCategoryId: 'corresponding' | 'alt-interior' | 'alt-exterior' | 'same-side-interior';
}

export interface Q4DragDropClassificationQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q4-drag-drop-classification';
  categories: {
    id: 'corresponding' | 'alt-interior' | 'alt-exterior' | 'same-side-interior';
    title: string;
    subtitle: string;
  }[];
  cards: Q4DragDropPairCard[];
}

// Q5 — MULTI-SELECT (Parallel Line + Triangle)
export interface Q5MultiSelectQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q5-multi-select';
  statements: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

// Q6 — NUMERIC ENTRY (Triangle Sum Theorem)
export interface Q6NumericTriangleSumQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q6-numeric-triangle-sum';
  vertexLabels: [string, string, string];
  labelA: string;
  labelB: string;
  labelC: string;
  correctX: number;
  correctAngleA: number;
  correctLargestAngle: number;
}

// Q7 — EQUATION EDITOR / NUMERIC RESPONSE (Exterior Angle Theorem)
export interface Q7ExteriorAngleEquationQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q7-exterior-equation';
  vertexLabels: [string, string, string, string]; // P, Q, R, S
  labelRemote1: string; // ∠P = (3x + 11)°
  labelRemote2: string; // ∠Q = (2x + 14)°
  labelExterior: string; // ∠PRS = (7x - 19)°
  equationDropdownOptions: string[];
  correctEquation: string;
  correctX: number;
  correctExteriorMeasure: number;
  correctAdjacentInteriorMeasure: number;
}

// Q8 — MATCH / TABLE GRID
export interface Q8TableGridRow {
  id: string;
  situation: string;
  givenInfo: string;
  correctColumnId: 'triangle-sum' | 'exterior-angle' | 'linear-pair' | 'congruent-angles';
}

export interface Q8MatchTableGridQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q8-match-table-grid';
  columns: {
    id: 'triangle-sum' | 'exterior-angle' | 'linear-pair' | 'congruent-angles';
    label: string;
  }[];
  rows: Q8TableGridRow[];
}

// Q9 — DRAG & DROP MATCHING (Corresponding Angles in Similar Triangles)
export interface Q9DragDropMatchingQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q9-drag-drop-matching';
  tri1Name: string;
  tri2Name: string;
  draggableTiles: {
    id: string;
    label: string;
  }[];
  targets: {
    id: string;
    tri1AngleLabel: string;
    tri1GivenMeasure: string;
    correctTileId: string;
  }[];
}

// Q10 — MULTI-SELECT (AA Similarity Evidence)
export interface Q10MultiSelectAASimilarityQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q10-multi-select-aa';
  statements: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

// Q11 — INLINE CHOICE + NUMERIC ENTRY (Algebraic AA Similarity)
export interface Q11InlineNumericAASimilarityQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q11-inline-numeric-aa';
  part1Options: string[];
  correctPart1: string;
  correctX: number;
  correctAngleB: number;
  correctAngleF: number;
  part4Options: string[];
  correctPart4: string;
}

// Q12 — FINAL INTEGRATED CHALLENGE (Parallel Lines + Intersecting Transversals + Two Triangles)
export interface Q12IntegratedChallengeQuestion extends Unit7DigitalStaarBaseQuestion {
  kind: 'q12-integrated-challenge';
  correctHotspotAngleId: 'angle-D' | 'angle-E' | 'angle-AEB' | 'angle-DEC';
  part2DropdownOptions: string[];
  correctPart2Dropdown: string;
  correctAngleMeasureD: number; // 54
  correctAngleMeasureDEC: number; // 63
  part4ConclusionOptions: string[];
  correctPart4Conclusion: string;
}

export type Unit7DigitalStaarQuestion =
  | Q1HotSpotQuestion
  | Q2InlineChoiceQuestion
  | Q3NumericEquationEntryQuestion
  | Q4DragDropClassificationQuestion
  | Q5MultiSelectQuestion
  | Q6NumericTriangleSumQuestion
  | Q7ExteriorAngleEquationQuestion
  | Q8MatchTableGridQuestion
  | Q9DragDropMatchingQuestion
  | Q10MultiSelectAASimilarityQuestion
  | Q11InlineNumericAASimilarityQuestion
  | Q12IntegratedChallengeQuestion;

export const UNIT_7_DIGITAL_STAAR_QUESTIONS: Unit7DigitalStaarQuestion[] = [
  // ===========================================================================
  // Q1 — LESSON 7.1 (HOT SPOT)
  // ===========================================================================
  {
    id: 'u7-dstaar-q01',
    questionNumber: 1,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Parallel Lines Cut by a Transversal',
    teks: 'TEKS 8.8D',
    kind: 'q1-hotspot',
    prompt:
      'Parallel lines l and m are intersected by transversal t, forming eight angles numbered ∠1 through ∠8. Angle ∠3 is highlighted on the diagram.',
    instruction:
      'Select the angle on the diagram that is alternate interior to the highlighted angle ∠3.',
    referenceAngle: 3,
    correctTargetAngle: 6,
    hint: 'Alternate interior angles lie between the two parallel lines (interior region) and on opposite sides of transversal t.',
    explanation:
      'Angle ∠3 lies in the interior region between parallel lines l and m on the left side of transversal t. Angle ∠6 lies in the interior region on the opposite (right) side of transversal t at the other intersection, so ∠6 is alternate interior to ∠3.',
  },

  // ===========================================================================
  // Q2 — LESSON 7.1 (INLINE CHOICE)
  // ===========================================================================
  {
    id: 'u7-dstaar-q02',
    questionNumber: 2,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Parallel Lines Cut by a Transversal',
    teks: 'TEKS 8.8D',
    kind: 'q2-inline-choice',
    prompt:
      'In the diagram, line l is parallel to line m, and transversal t intersects both lines. Two interior angles on the right side of transversal t are marked: m∠4 = 124° and ∠6.',
    instruction:
      'Choose the correct option from each drop-down menu to complete the geometric argument.',
    angleAIndex: 4,
    angleBIndex: 6,
    labelA: '124°',
    labelB: '∠6',
    dropdown1Options: [
      'corresponding angles',
      'alternate interior angles',
      'alternate exterior angles',
      'same-side interior angles',
    ],
    correctDropdown1: 'same-side interior angles',
    dropdown2Options: ['congruent', 'supplementary'],
    correctDropdown2: 'supplementary',
    dropdown3Options: ['56°', '66°', '124°', '180°'],
    correctDropdown3: '56°',
    hint: 'Look at the positions of ∠4 and ∠6: both are between parallel lines l and m on the same side of transversal t. One is obtuse (124°) and the other is acute.',
    explanation:
      'Because ∠4 and ∠6 lie between parallel lines l and m on the same side of transversal t, they are same-side interior angles. Therefore, their measures are supplementary (add to 180°), so m∠6 = 180° − 124° = 56°.',
  },

  // ===========================================================================
  // Q3 — LESSON 7.1 (NUMERIC / EQUATION ENTRY)
  // ===========================================================================
  {
    id: 'u7-dstaar-q03',
    questionNumber: 3,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Parallel Lines Cut by a Transversal',
    teks: 'TEKS 8.8D',
    kind: 'q3-numeric-equation',
    prompt:
      'Parallel lines l and m are intersected by transversal t. Two highlighted angles in the diagram have measures m∠2 = (4x + 7)° and m∠6 = (6x - 29)°.',
    instruction:
      'Choose the angle relationship and equation, then enter the value of x and the degree measure of ∠2.',
    angleAIndex: 2,
    angleBIndex: 6,
    labelA: '(4x + 7)°',
    labelB: '(6x - 29)°',
    relationshipOptions: [
      'Corresponding angles (congruent)',
      'Same-side interior angles (supplementary)',
      'Linear pair (supplementary)',
      'Alternate interior angles (congruent)',
    ],
    correctRelationship: 'Corresponding angles (congruent)',
    equationOptions: [
      '4x + 7 = 6x - 29',
      '(4x + 7) + (6x - 29) = 180',
      '6x - 29 - (4x + 7) = 90',
      '4x + 6x = 29 - 7',
    ],
    correctEquation: '4x + 7 = 6x - 29',
    correctX: 18,
    correctAngleMeasure: 79,
    requestedAngleLabel: 'm∠2',
    hint: 'Angles ∠2 and ∠6 are both in the top-right position at their intersections (corresponding angles), so their measures are equal. Set 4x + 7 = 6x - 29, solve for x, and substitute x back into (4x + 7)°.',
    explanation:
      'Step 1: ∠2 and ∠6 are corresponding angles on parallel lines, so they are congruent. Step 2: Set 4x + 7 = 6x - 29 → 36 = 2x → x = 18. Step 3: Substitute x = 18 into m∠2 = 4(18) + 7 = 72 + 7 = 79°.',
  },

  // ===========================================================================
  // Q4 — LESSON 7.1 (DRAG & DROP CLASSIFICATION)
  // ===========================================================================
  {
    id: 'u7-dstaar-q04',
    questionNumber: 4,
    lesson: 'Lesson 7.1',
    lessonTopic: 'Parallel Lines Cut by a Transversal',
    teks: 'TEKS 8.8D',
    kind: 'q4-drag-drop-classification',
    prompt:
      'Parallel lines l and m are cut by transversal t to form eight angles numbered ∠1 through ∠8.',
    instruction:
      'Drag each angle-pair card into its correct geometric classification box (or select a card and tap a category box to place it).',
    categories: [
      {
        id: 'corresponding',
        title: 'Corresponding Angles',
        subtitle: 'Same corner position at each intersection',
      },
      {
        id: 'alt-interior',
        title: 'Alternate Interior Angles',
        subtitle: 'Inside parallel lines, opposite sides of t',
      },
      {
        id: 'alt-exterior',
        title: 'Alternate Exterior Angles',
        subtitle: 'Outside parallel lines, opposite sides of t',
      },
      {
        id: 'same-side-interior',
        title: 'Same-Side Interior Angles',
        subtitle: 'Inside parallel lines, same side of t',
      },
    ],
    cards: [
      { id: 'pair-1-5', label: '∠1 and ∠5', correctCategoryId: 'corresponding' },
      { id: 'pair-3-6', label: '∠3 and ∠6', correctCategoryId: 'alt-interior' },
      { id: 'pair-2-7', label: '∠2 and ∠7', correctCategoryId: 'alt-exterior' },
      { id: 'pair-4-6', label: '∠4 and ∠6', correctCategoryId: 'same-side-interior' },
    ],
    hint: 'Use the numbered diagram: ∠3, ∠4, ∠5, ∠6 are interior angles (between lines l and m), while ∠1, ∠2, ∠7, ∠8 are exterior angles.',
    explanation:
      '• ∠1 and ∠5 are both top-left angles (Corresponding Angles).\n• ∠3 and ∠6 are inside the parallel lines on opposite sides of t (Alternate Interior Angles).\n• ∠2 and ∠7 are outside the parallel lines on opposite sides of t (Alternate Exterior Angles).\n• ∠4 and ∠6 are inside the parallel lines on the right side of t (Same-Side Interior Angles).',
  },

  // ===========================================================================
  // Q5 — LESSON 7.2 (MULTI-SELECT)
  // ===========================================================================
  {
    id: 'u7-dstaar-q05',
    questionNumber: 5,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Angle Theorems for Triangles',
    teks: 'TEKS 8.8D',
    kind: 'q5-multi-select',
    prompt:
      'In the diagram, line DE is parallel to side BC of △ABC, and vertex A lies on line DE. The angle formed on the left between ray AD and side AB is m∠DAB = 54°, and interior angle m∠B = 54°. Interior angle m∠BAC = 68°.',
    instruction:
      'Select ALL statements that must be true based on the geometric relationships in the diagram.',
    statements: [
      {
        id: 'q5-s1',
        text: '∠DAB and ∠ABC are alternate interior angles, so m∠ABC = 54°.',
        isCorrect: true,
      },
      {
        id: 'q5-s2',
        text: 'By the Triangle Sum Theorem in △ABC, m∠ACB = 180° − (68° + 54°) = 58°.',
        isCorrect: true,
      },
      {
        id: 'q5-s3',
        text: 'The three angles along straight line DE at vertex A satisfy m∠DAB + m∠BAC + m∠EAC = 180°, so m∠EAC = 58°.',
        isCorrect: true,
      },
      {
        id: 'q5-s4',
        text: 'Angles ∠EAC and ∠ABC are alternate interior angles, so m∠EAC = 54°.',
        isCorrect: false,
      },
      {
        id: 'q5-s5',
        text: 'Because line DE is parallel to segment BC, △ABC must be an equilateral triangle with all 60° angles.',
        isCorrect: false,
      },
    ],
    hint: 'Check which transversal connects ∠EAC to an interior angle of △ABC (transversal AC connects ∠EAC and ∠ACB), and verify the sum of the three angles in △ABC: 54° + 68° + 58° = 180°.',
    explanation:
      '• Statement 1 is true: With DE ∥ BC and transversal AB, ∠DAB and ∠ABC are alternate interior angles (54°).\n• Statement 2 is true: In △ABC, m∠ACB = 180° − (68° + 54°) = 58°.\n• Statement 3 is true: Along straight line DE, 54° + 68° + m∠EAC = 180°, so m∠EAC = 58° (which also equals alternate interior angle ∠ACB).',
  },

  // ===========================================================================
  // Q6 — LESSON 7.2 (NUMERIC ENTRY — TRIANGLE SUM THEOREM)
  // ===========================================================================
  {
    id: 'u7-dstaar-q06',
    questionNumber: 6,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Angle Theorems for Triangles',
    teks: 'TEKS 8.8D',
    kind: 'q6-numeric-triangle-sum',
    prompt:
      'In △ABC, the three interior angles measure m∠A = (3x + 4)°, m∠B = (4x - 7)°, and m∠C = (2x + 3)°.',
    instruction:
      'Enter the value of x, the degree measure of ∠A, and the degree measure of the largest interior angle of △ABC.',
    vertexLabels: ['A', 'B', 'C'],
    labelA: '(3x + 4)°',
    labelB: '(4x - 7)°',
    labelC: '(2x + 3)°',
    correctX: 20,
    correctAngleA: 64,
    correctLargestAngle: 73,
    hint: 'By the Triangle Sum Theorem, (3x + 4) + (4x - 7) + (2x + 3) = 180. Combine like terms (9x = 180) to find x, then substitute x into each angle expression.',
    explanation:
      'Step 1: By the Triangle Sum Theorem, (3x + 4) + (4x - 7) + (2x + 3) = 180 → 9x + 0 = 180 → x = 20.\nStep 2: Substitute x = 20:\n• m∠A = 3(20) + 4 = 64°\n• m∠B = 4(20) - 7 = 73°\n• m∠C = 2(20) + 3 = 43°\nCheck: 64° + 73° + 43° = 180°. The largest interior angle is 73°.',
  },

  // ===========================================================================
  // Q7 — LESSON 7.2 (EQUATION EDITOR / NUMERIC RESPONSE — EXTERIOR ANGLE)
  // ===========================================================================
  {
    id: 'u7-dstaar-q07',
    questionNumber: 7,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Angle Theorems for Triangles',
    teks: 'TEKS 8.8D',
    kind: 'q7-exterior-equation',
    prompt:
      'In △PQR, side QR is extended through vertex R to point S to form exterior angle ∠PRS. The two remote interior angles measure m∠P = (3x + 11)° and m∠Q = (2x + 14)°, and exterior angle m∠PRS = (7x - 19)°.',
    instruction:
      'Establish the Exterior Angle Theorem equation, then enter the value of x, the exterior angle measure m∠PRS, and the adjacent interior angle measure m∠PRQ.',
    vertexLabels: ['P', 'Q', 'R', 'S'],
    labelRemote1: '(3x + 11)°',
    labelRemote2: '(2x + 14)°',
    labelExterior: '(7x - 19)°',
    equationDropdownOptions: [
      '(3x + 11) + (2x + 14) = 7x - 19',
      '(3x + 11) + (2x + 14) + (7x - 19) = 180',
      '3x + 11 = 7x - 19',
      '(7x - 19) - (3x + 11) = 180',
    ],
    correctEquation: '(3x + 11) + (2x + 14) = 7x - 19',
    correctX: 22,
    correctExteriorMeasure: 135,
    correctAdjacentInteriorMeasure: 45,
    hint: 'By the Exterior Angle Theorem, Remote Interior Angle 1 + Remote Interior Angle 2 = Exterior Angle: (3x + 11) + (2x + 14) = 7x - 19. Solve 5x + 25 = 7x - 19 for x, find m∠PRS, and subtract from 180° for adjacent interior angle ∠PRQ.',
    explanation:
      'Step 1: Exterior Angle Theorem: (3x + 11) + (2x + 14) = 7x - 19 → 5x + 25 = 7x - 19 → 44 = 2x → x = 22.\nStep 2: Exterior angle m∠PRS = 7(22) - 19 = 154 - 19 = 135° (also 3(22)+11 + 2(22)+14 = 77° + 58° = 135°).\nStep 3: Adjacent interior angle m∠PRQ forms a linear pair with ∠PRS: 180° − 135° = 45°.',
  },

  // ===========================================================================
  // Q8 — LESSON 7.2 (MATCH / TABLE GRID)
  // ===========================================================================
  {
    id: 'u7-dstaar-q08',
    questionNumber: 8,
    lesson: 'Lesson 7.2',
    lessonTopic: 'Angle Theorems for Triangles',
    teks: 'TEKS 8.8D',
    kind: 'q8-match-table-grid',
    prompt:
      'Four geometric situations involving triangles and intersecting lines are described in the table below.',
    instruction:
      'For each geometric situation in the table, select the column that identifies the mathematical relationship or theorem used to write the equation.',
    columns: [
      { id: 'triangle-sum', label: 'Triangle Sum Theorem' },
      { id: 'exterior-angle', label: 'Exterior Angle Theorem' },
      { id: 'linear-pair', label: 'Supplementary Linear Pair' },
      { id: 'congruent-angles', label: 'Congruent Angle Relationship' },
    ],
    rows: [
      {
        id: 'row-1',
        situation: 'In △ABC, interior angles are 48°, 65°, and (2x + 7)°.',
        givenInfo: 'Equation: 48 + 65 + (2x + 7) = 180',
        correctColumnId: 'triangle-sum',
      },
      {
        id: 'row-2',
        situation: 'In △PQR with side QR extended to S, remote interior angles are 52° and 61°, and exterior angle is ∠PRS.',
        givenInfo: 'Equation: m∠PRS = 52 + 61',
        correctColumnId: 'exterior-angle',
      },
      {
        id: 'row-3',
        situation: 'At vertex C of △ABC, interior angle ∠ACB = 64° is adjacent to exterior angle ∠ACD along straight line BCD.',
        givenInfo: 'Equation: 64 + m∠ACD = 180',
        correctColumnId: 'linear-pair',
      },
      {
        id: 'row-4',
        situation: 'Two triangles share vertex V where lines intersect, forming vertical angles ∠AVB = (5x - 10)° and ∠CVD = 75°.',
        givenInfo: 'Equation: 5x - 10 = 75',
        correctColumnId: 'congruent-angles',
      },
    ],
    hint: 'Match each equation to its geometric reason: three interior angles adding to 180° is Triangle Sum; two remote interior angles equaling the exterior angle is Exterior Angle Theorem; two adjacent angles on a straight line adding to 180° is a Linear Pair; vertical angles are Congruent.',
    explanation:
      '• Row 1 uses the Triangle Sum Theorem (three interior angles sum to 180°).\n• Row 2 uses the Exterior Angle Theorem (exterior angle equals the sum of the two remote interior angles).\n• Row 3 uses a Supplementary Linear Pair (adjacent interior and exterior angles along a straight line sum to 180°).\n• Row 4 uses a Congruent Angle Relationship (vertical angles are equal).',
  },

  // ===========================================================================
  // Q9 — LESSON 7.3 (DRAG & DROP MATCHING — SIMILAR TRIANGLES)
  // ===========================================================================
  {
    id: 'u7-dstaar-q09',
    questionNumber: 9,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Angle-Angle (AA) Similarity',
    teks: 'TEKS 8.8D',
    kind: 'q9-drag-drop-matching',
    prompt:
      'Triangle ABC and triangle DEF are shown in the diagram. In △ABC, m∠A = 46° and m∠B = 72°. In △DEF, m∠E = 72° and m∠F = 62°.',
    instruction:
      'First use the Triangle Sum Theorem to determine the missing interior angle in each triangle. Then drag each angle from △DEF to match its congruent corresponding angle in △ABC (or tap a tile and tap its matching slot).',
    tri1Name: '△ABC',
    tri2Name: '△DEF',
    draggableTiles: [
      { id: 'tile-D', label: '∠D (46°)' },
      { id: 'tile-E', label: '∠E (72°)' },
      { id: 'tile-F', label: '∠F (62°)' },
    ],
    targets: [
      {
        id: 'target-A',
        tri1AngleLabel: '∠A in △ABC',
        tri1GivenMeasure: 'Given: m∠A = 46°',
        correctTileId: 'tile-D',
      },
      {
        id: 'target-B',
        tri1AngleLabel: '∠B in △ABC',
        tri1GivenMeasure: 'Given: m∠B = 72°',
        correctTileId: 'tile-E',
      },
      {
        id: 'target-C',
        tri1AngleLabel: '∠C in △ABC',
        tri1GivenMeasure: 'Calculated: m∠C = 180° − (46° + 72°) = 62°',
        correctTileId: 'tile-F',
      },
    ],
    hint: 'In △ABC, m∠C = 180° − (46° + 72°) = 62°. In △DEF, m∠D = 180° − (72° + 62°) = 46°. Match the angles that have equal degree measures!',
    explanation:
      'By the Triangle Sum Theorem:\n• In △ABC, m∠C = 180° − 118° = 62°.\n• In △DEF, m∠D = 180° − 134° = 46°.\nMatching congruent corresponding angles gives ∠A ≅ ∠D (46°), ∠B ≅ ∠E (72°), and ∠C ≅ ∠F (62°), establishing △ABC ~ △DEF.',
  },

  // ===========================================================================
  // Q10 — LESSON 7.3 (MULTI-SELECT — AA SIMILARITY EVIDENCE)
  // ===========================================================================
  {
    id: 'u7-dstaar-q10',
    questionNumber: 10,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Angle-Angle (AA) Similarity',
    teks: 'TEKS 8.8D',
    kind: 'q10-multi-select-aa',
    prompt:
      'Examine △JKL and △MNP in the diagram. In △JKL, m∠J = 53° and m∠K = 64°. In △MNP, m∠M = 53° and m∠P = 63°.',
    instruction:
      'Select ALL statements that provide valid mathematical evidence that △JKL and △MNP are similar by the Angle-Angle (AA) Similarity Criterion.',
    statements: [
      {
        id: 'q10-s1',
        text: 'Corresponding angles ∠J and ∠M are congruent because both measure 53°.',
        isCorrect: true,
      },
      {
        id: 'q10-s2',
        text: 'Using the Triangle Sum Theorem on △JKL, m∠L = 180° − (53° + 64°) = 63°, which proves ∠L ≅ ∠P (63°).',
        isCorrect: true,
      },
      {
        id: 'q10-s3',
        text: 'Using the Triangle Sum Theorem on △MNP, m∠N = 180° − (53° + 63°) = 64°, which proves ∠K ≅ ∠N (64°).',
        isCorrect: true,
      },
      {
        id: 'q10-s4',
        text: 'The triangles are NOT similar because 64° is not equal to 63°.',
        isCorrect: false,
      },
      {
        id: 'q10-s5',
        text: 'Having a single pair of 53° angles is sufficient by itself to prove any two triangles are similar without checking a second angle.',
        isCorrect: false,
      },
    ],
    hint: 'Solve for the missing third angle in both triangles: in △JKL, 180° − (53° + 64°) = 63°; in △MNP, 180° − (53° + 63°) = 64°. Both triangles have interior angles {53°, 64°, 63°}!',
    explanation:
      'When we find the missing interior angle in each triangle, △JKL has angles {53°, 64°, 63°} and △MNP has angles {53°, 64°, 63°}. Therefore, ∠J ≅ ∠M (53°), ∠K ≅ ∠N (64°), and ∠L ≅ ∠P (63°), providing valid AA similarity evidence.',
  },

  // ===========================================================================
  // Q11 — LESSON 7.3 (INLINE CHOICE + NUMERIC ENTRY)
  // ===========================================================================
  {
    id: 'u7-dstaar-q11',
    questionNumber: 11,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Angle-Angle (AA) Similarity',
    teks: 'TEKS 8.8D',
    kind: 'q11-inline-numeric-aa',
    prompt:
      'In the diagram, △ABC is similar to △DEF. In △ABC, m∠A = 48° and m∠B = (5x - 8)°. In △DEF, m∠D = 48° and m∠E = (3x + 20)°.',
    instruction:
      'Complete each part below to determine the relationship between corresponding angles, solve for x, find the angle measures, and complete the similarity statement in the correct vertex order.',
    part1Options: [
      'congruent (5x - 8 = 3x + 20)',
      'supplementary ((5x - 8) + (3x + 20) = 180)',
      'complementary ((5x - 8) + (3x + 20) = 90)',
    ],
    correctPart1: 'congruent (5x - 8 = 3x + 20)',
    correctX: 14,
    correctAngleB: 62,
    correctAngleF: 70,
    part4Options: ['△DEF', '△EDF', '△FDE', '△DFE'],
    correctPart4: '△DEF',
    hint: 'Step 1: Corresponding angles ∠B and ∠E in similar triangles are congruent: 5x - 8 = 3x + 20 → 2x = 28 → x = 14. Step 2: m∠B = 5(14) - 8 = 62°. Step 3: m∠F = 180° − (48° + 62°) = 70°. Step 4: Match vertices A↔D, B↔E, C↔F.',
    explanation:
      '1. Corresponding angles of similar triangles are congruent: 5x - 8 = 3x + 20.\n2. Solving gives 2x = 28 → x = 14.\n3. Substituting x = 14 gives m∠B = m∠E = 5(14) - 8 = 62°, and by the Triangle Sum Theorem, m∠C = m∠F = 180° − (48° + 62°) = 70°.\n4. Matching corresponding vertices in order gives △ABC ~ △DEF.',
  },

  // ===========================================================================
  // Q12 — FINAL INTEGRATED CHALLENGE (7.1 + 7.2 + 7.3 SYNTHESIS)
  // ===========================================================================
  {
    id: 'u7-dstaar-q12',
    questionNumber: 12,
    lesson: 'Lesson 7.3',
    lessonTopic: 'Integrated Synthesis: Parallel Lines, Triangle Sum & AA Similarity',
    teks: 'TEKS 8.8D',
    kind: 'q12-integrated-challenge',
    prompt:
      'In the figure, segment AB is parallel to segment CD (AB ∥ CD). Segments AD and BC intersect at point E, forming △ABE and △DCE. In △ABE, m∠BAE = 54° and m∠ABE = 63°.',
    instruction:
      'Complete all four parts of this synthesis challenge using the coherent diagram.',
    correctHotspotAngleId: 'angle-D',
    part2DropdownOptions: [
      'Alternate interior angles (AB ∥ CD cut by transversal AD)',
      'Same-side interior angles (AB ∥ CD cut by transversal AD)',
      'Vertical angles at intersection E',
      'Exterior Angle Theorem on △ABE',
    ],
    correctPart2Dropdown: 'Alternate interior angles (AB ∥ CD cut by transversal AD)',
    correctAngleMeasureD: 54,
    correctAngleMeasureDEC: 63,
    part4ConclusionOptions: [
      'Yes — △ABE ~ △DCE by AA Similarity (∠BAE ≅ ∠CDE = 54°, ∠ABE ≅ ∠DCE = 63°, and vertical angles ∠AEB ≅ ∠DEC = 63°)',
      'Yes — △ABE ~ △CDE because ∠BAE and ∠CDE are supplementary',
      'No — △ABE and △DCE share only one pair of congruent angles',
      'Cannot be determined without knowing the side lengths of AB and CD',
    ],
    correctPart4Conclusion:
      'Yes — △ABE ~ △DCE by AA Similarity (∠BAE ≅ ∠CDE = 54°, ∠ABE ≅ ∠DCE = 63°, and vertical angles ∠AEB ≅ ∠DEC = 63°)',
    hint: '1. Along transversal AD between parallel segments AB and CD, ∠BAE (54°) and ∠CDE (at vertex D) are alternate interior angles. 2. In △ABE, m∠AEB = 180° − (54° + 63°) = 63°, and vertical angle ∠DEC has the same measure (63°). 3. Match corresponding vertices A↔D (54°), B↔C (63°), E↔E (63°): △ABE ~ △DCE!',
    explanation:
      '• Part 1 & 2: Since AB ∥ CD with transversal AD, ∠BAE and ∠CDE (at vertex D) are alternate interior angles, so m∠CDE = 54°.\n• Part 3: By the Triangle Sum Theorem in △ABE, m∠AEB = 180° − (54° + 63°) = 63°. Vertical angle ∠DEC is congruent to ∠AEB, so m∠DEC = 63° (and alternate interior angle m∠DCE = m∠ABE = 63°).\n• Part 4: Because corresponding angles are congruent (54°, 63°, 63°), △ABE ~ △DCE by the Angle-Angle (AA) Similarity Criterion.',
  },
];
