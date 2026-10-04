export type LabStationId = 'station-1' | 'station-2' | 'station-3';

export type AngleRelationshipChoice =
  | 'Corresponding Angles'
  | 'Alternate Interior Angles'
  | 'Alternate Exterior Angles'
  | 'Same-Side Interior Angles'
  | 'Vertical Angles'
  | 'Linear Pair (Adjacent Supplementary)'
  | 'Triangle Interior Angles (Triangle Sum Theorem)'
  | 'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)';

export type MathRuleChoice =
  | 'Congruent (Measures are EQUAL)'
  | 'Supplementary (Measures ADD to 180°)'
  | 'Triangle Sum (3 Interior Angles ADD to 180°)'
  | 'Exterior Angle = Remote Interior 1 + Remote Interior 2';

export interface TransversalDiagramConfig {
  kind: 'transversal';
  angleAIndex: number; // 1..8
  angleBIndex: number; // 1..8
  labelA: string;
  labelB: string;
  obtuseDeg: number; // visual obtuse angle measure (e.g. 115..140)
  targetPromptLabel: string; // e.g. "m∠5" or "m∠3"
  extraTargetIndex?: number; // optional third angle to find
}

export interface TriangleDiagramConfig {
  kind: 'triangle';
  showExterior: boolean;
  labelA: string; // top/left remote interior ∠A
  labelB: string; // top/right remote interior ∠B
  labelC: string; // bottom-right interior ∠ACB
  labelExt?: string; // exterior angle ∠ACD
  degA: number;
  degB: number;
  degC: number;
  degExt: number;
  highlightedRoles: ('A' | 'B' | 'C' | 'EXT')[];
  targetRole: 'A' | 'B' | 'C' | 'EXT';
}

export interface LabChallenge {
  id: string;
  station: LabStationId;
  stationBadge: string;
  problemTypeBadge: string;
  title: string;
  prompt: string;
  diagram: TransversalDiagramConfig | TriangleDiagramConfig;
  // Step 1: Identify Angle Relationship
  relationshipOptions: AngleRelationshipChoice[];
  correctRelationship: AngleRelationshipChoice;
  relationshipHint: string;
  // Step 2: Decide Mathematical Rule
  ruleOptions: MathRuleChoice[];
  correctRule: MathRuleChoice;
  ruleHint: string;
  // Step 3: Build/Select the Correct Equation
  equationOptions: string[];
  correctEquationIndex: number;
  equationHint: string;
  // Step 4: Solve for x (if algebraic)
  hasVariableX: boolean;
  correctX?: number;
  xHint?: string;
  // Step 5: Find Actual Requested Angle Measure
  targetAngleLabel: string; // e.g. "m∠B" or "m∠6" or "m∠ACD"
  correctAngleMeasure: number;
  angleHint: string;
  // Optional secondary angle check for Type C (Verify all 3 angles sum to 180°)
  secondaryAngleLabel?: string;
  correctSecondaryAngleMeasure?: number;
  // Step 6: Mathematical Justification shown upon complete correct response
  justification: string;
  verificationSummary: string;
}

const TRANSVERSAL_RELATIONSHIP_OPTIONS: AngleRelationshipChoice[] = [
  'Corresponding Angles',
  'Alternate Interior Angles',
  'Alternate Exterior Angles',
  'Same-Side Interior Angles',
  'Vertical Angles',
  'Linear Pair (Adjacent Supplementary)',
];

const TRIANGLE_RELATIONSHIP_OPTIONS: AngleRelationshipChoice[] = [
  'Triangle Interior Angles (Triangle Sum Theorem)',
  'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)',
  'Linear Pair (Adjacent Supplementary)',
];

const ALL_RULE_OPTIONS: MathRuleChoice[] = [
  'Congruent (Measures are EQUAL)',
  'Supplementary (Measures ADD to 180°)',
  'Triangle Sum (3 Interior Angles ADD to 180°)',
  'Exterior Angle = Remote Interior 1 + Remote Interior 2',
];

function formatLinearExpr(m: number, b: number): string {
  const xPart = m === 1 ? 'x' : `${m}x`;
  if (b === 0) return `${xPart}`;
  if (b > 0) return `${xPart} + ${b}`;
  return `${xPart} - ${Math.abs(b)}`;
}

function shuffleWithCorrect(
  correct: string,
  distractors: string[]
): { options: string[]; correctIndex: number } {
  const unique = [correct, ...distractors.filter((d) => d !== correct)].slice(0, 4);
  // Deterministic-Looking shuffle using random sort
  const indexed = unique.map((item, idx) => ({ item, isCorrect: idx === 0, sort: Math.random() }));
  indexed.sort((a, b) => a.sort - b.sort);
  return {
    options: indexed.map((x) => x.item),
    correctIndex: indexed.findIndex((x) => x.isCorrect),
  };
}

// ============================================================================
// CURATED & VALIDATED CHALLENGE BANK + DYNAMIC GENERATOR
// Every problem is strictly validated:
// - Integer x > 0
// - Every angle measure is strictly between 20° and 160°
// - Parallel line obtuse/acute pairs sum to 180°
// - Triangle interior angles sum to 180°
// - Exterior angle equals sum of two remote interior angles
// ============================================================================

export function generateStation1Challenge(excludeId?: string): LabChallenge {
  const templates: (() => LabChallenge)[] = [
    // 1. Alternate Interior - Algebraic (2 expressions, Congruent)
    () => {
      const x = 14;
      // 5x + 6 = 76°, 3x + 34 = 76°
      const exprA = formatLinearExpr(5, 6);
      const exprB = formatLinearExpr(3, 34);
      const deg = 5 * x + 6; // 76° (acute: 3 and 6)
      const eq = shuffleWithCorrect(`${exprA} = ${exprB}`, [
        `(${exprA}) + (${exprB}) = 180`,
        `(${exprA}) - (${exprB}) = 180`,
        `(${exprA}) + (${exprB}) = 90`,
      ]);
      return {
        id: 's1-alt-int-alg-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Two Variable Expressions · Congruent',
        title: 'Alternate Interior Angles with Algebraic Expressions',
        prompt:
          'Parallel lines l and m are cut by transversal t. Examine the highlighted angles ∠3 and ∠6 on the diagram, build the correct equation, solve for x, and find m∠6.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 3,
          angleBIndex: 6,
          labelA: `(${exprA})°`,
          labelB: `(${exprB})°`,
          obtuseDeg: 180 - deg,
          targetPromptLabel: 'm∠6',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Alternate Interior Angles',
        relationshipHint:
          'Look at where ∠3 and ∠6 sit: both are INSIDE the parallel lines (interior) and on OPPOSITE sides of the transversal.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Congruent (Measures are EQUAL)',
        ruleHint:
          'Look at the size of ∠3 and ∠6 in the diagram—both are acute angles! Alternate interior angles between parallel lines have EQUAL measures.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'Since alternate interior angles are CONGRUENT, set the two expressions EQUAL to each other rather than adding them to 180°.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Solve 5x + 6 = 3x + 34 by subtracting 3x from both sides (2x + 6 = 34), then subtracting 6.',
        targetAngleLabel: 'm∠6',
        correctAngleMeasure: deg,
        angleHint: `Substitute x = ${x} into (${exprB})°: 3(${x}) + 34.`,
        justification: `∠3 and ∠6 are Alternate Interior Angles, so they are congruent: 5x + 6 = 3x + 34 → 2x = 28 → x = 14. Substituting x = 14 gives m∠6 = 3(14) + 34 = 76°.`,
        verificationSummary: `m∠3 = 5(14) + 6 = 76° and m∠6 = 3(14) + 34 = 76° (Congruent ✔)`,
      };
    },

    // 2. Same-Side Interior - Algebraic (2 expressions, Supplementary)
    () => {
      const x = 18;
      // ∠4 = (6x + 12)° = 120°, ∠6 = (3x + 6)° = 60° -> sum = 180°
      const exprA = formatLinearExpr(6, 12);
      const exprB = formatLinearExpr(3, 6);
      const eq = shuffleWithCorrect(`(${exprA}) + (${exprB}) = 180`, [
        `${exprA} = ${exprB}`,
        `(${exprA}) - (${exprB}) = 180`,
        `(${exprA}) + (${exprB}) = 90`,
      ]);
      return {
        id: 's1-ssi-alg-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Two Variable Expressions · Supplementary',
        title: 'Same-Side Interior Angles with Algebraic Expressions',
        prompt:
          'Parallel lines l and m are cut by transversal t. Examine the highlighted angles ∠4 and ∠6, determine their relationship, choose the equation, solve for x, and find m∠4.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 4,
          angleBIndex: 6,
          labelA: `(${exprA})°`,
          labelB: `(${exprB})°`,
          obtuseDeg: 120,
          targetPromptLabel: 'm∠4',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Same-Side Interior Angles',
        relationshipHint:
          'Both ∠4 and ∠6 lie BETWEEN the parallel lines (interior) and on the SAME side of the transversal.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Supplementary (Measures ADD to 180°)',
        ruleHint:
          'Notice that ∠4 is obtuse and ∠6 is acute! Same-side interior angles are supplementary, meaning their measures add to 180°.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'When two angles are SUPPLEMENTARY, add their expressions together and set the sum equal to 180°.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Combine like terms in (6x + 12) + (3x + 6) = 180 → 9x + 18 = 180. Subtract 18, then divide by 9.',
        targetAngleLabel: 'm∠4',
        correctAngleMeasure: 120,
        angleHint: `Substitute x = ${x} into (${exprA})°: 6(${x}) + 12.`,
        justification: `∠4 and ∠6 are Same-Side Interior Angles, so they are supplementary: (6x + 12) + (3x + 6) = 180 → 9x + 18 = 180 → x = 18. Then m∠4 = 6(18) + 12 = 120°.`,
        verificationSummary: `m∠4 = 120° + m∠6 = 60° → 120° + 60° = 180° (Supplementary ✔)`,
      };
    },

    // 3. Corresponding Angles - Algebraic (2 expressions, Congruent)
    () => {
      const x = 9;
      // ∠1 = (11x + 26)° = 125°, ∠5 = (14x - 1)° = 125°
      const exprA = formatLinearExpr(11, 26);
      const exprB = formatLinearExpr(14, -1);
      const eq = shuffleWithCorrect(`${exprA} = ${exprB}`, [
        `(${exprA}) + (${exprB}) = 180`,
        `(${exprA}) - (${exprB}) = 180`,
        `14x - 11x = 180`,
      ]);
      return {
        id: 's1-corr-alg-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Two Variable Expressions · Congruent',
        title: 'Corresponding Angles on Parallel Lines',
        prompt:
          'Look at ∠1 and ∠5 in the diagram. Identify their geometric relationship, select the correct algebraic equation, solve for x, and find the measure of ∠5.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 1,
          angleBIndex: 5,
          labelA: `(${exprA})°`,
          labelB: `(${exprB})°`,
          obtuseDeg: 125,
          targetPromptLabel: 'm∠5',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Corresponding Angles',
        relationshipHint:
          '∠1 and ∠5 are in the exact same top-left corner position at each intersection.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Congruent (Measures are EQUAL)',
        ruleHint:
          'Corresponding angles on parallel lines have identical openings—both are obtuse angles with equal measures.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'Congruent angles have equal measures, so set the two expressions equal to each other.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Solve 11x + 26 = 14x - 1: subtract 11x from both sides (26 = 3x - 1), add 1 (27 = 3x), and divide by 3.',
        targetAngleLabel: 'm∠5',
        correctAngleMeasure: 125,
        angleHint: `Substitute x = ${x} into (14x - 1)°: 14(${x}) - 1.`,
        justification: `∠1 and ∠5 are Corresponding Angles, which are congruent: 11x + 26 = 14x - 1 → 3x = 27 → x = 9. Substituting x = 9 gives m∠5 = 14(9) - 1 = 125°.`,
        verificationSummary: `m∠1 = 11(9) + 26 = 125° and m∠5 = 14(9) - 1 = 125° (Congruent ✔)`,
      };
    },

    // 4. Linear Pair - One Variable Expression + Number (Supplementary)
    () => {
      const x = 15;
      // ∠1 = 118°, ∠2 = (4x + 2)° = 62°
      const exprB = formatLinearExpr(4, 2);
      const eq = shuffleWithCorrect(`118 + (${exprB}) = 180`, [
        `${exprB} = 118`,
        `(${exprB}) - 118 = 180`,
        `118 + (${exprB}) = 90`,
      ]);
      return {
        id: 's1-linpair-alg-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Number + Variable Expression · Supplementary',
        title: 'Adjacent Supplementary Angles (Linear Pair)',
        prompt:
          'Look at adjacent angles ∠1 and ∠2 along straight line l. Identify their angle relationship, select the equation, solve for x, and find m∠2.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 1,
          angleBIndex: 2,
          labelA: '118°',
          labelB: `(${exprB})°`,
          obtuseDeg: 118,
          targetPromptLabel: 'm∠2',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Linear Pair (Adjacent Supplementary)',
        relationshipHint:
          '∠1 and ∠2 share a common ray and sit side-by-side along straight line l.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Supplementary (Measures ADD to 180°)',
        ruleHint:
          'Two adjacent angles that form a straight line always add up to 180°.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'Because ∠1 and ∠2 form a straight line (180°), add 118 and (4x + 2) and set the sum equal to 180.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Simplify 118 + 4x + 2 = 180 → 4x + 120 = 180 → 4x = 60.',
        targetAngleLabel: 'm∠2',
        correctAngleMeasure: 62,
        angleHint: 'Substitute x = 15 into (4x + 2)°: 4(15) + 2, or subtract 180° - 118°.',
        justification: `∠1 and ∠2 form a Linear Pair along a straight line, so 118 + (4x + 2) = 180 → 4x + 120 = 180 → x = 15. Thus m∠2 = 4(15) + 2 = 62°.`,
        verificationSummary: `118° + 62° = 180° (Straight Line Supplementary ✔)`,
      };
    },

    // 5. Alternate Exterior - Numerical Only
    () => {
      const obtuse = 132;
      const eq = shuffleWithCorrect(`m∠8 = 132`, [
        `132 + m∠8 = 180`,
        `132 - m∠8 = 90`,
        `m∠8 = 180 - 132`,
      ]);
      return {
        id: 's1-alt-ext-num-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Numbers Only · Congruent',
        title: 'Alternate Exterior Angles (Numerical Reasoning)',
        prompt:
          'Given m∠1 = 132°, examine the position of ∠8. Identify the relationship, choose the equation that represents it, and find m∠8.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 1,
          angleBIndex: 8,
          labelA: '132°',
          labelB: '?°',
          obtuseDeg: obtuse,
          targetPromptLabel: 'm∠8',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Alternate Exterior Angles',
        relationshipHint:
          '∠1 and ∠8 are both OUTSIDE the parallel lines (exterior) and on OPPOSITE sides of the transversal.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Congruent (Measures are EQUAL)',
        ruleHint:
          'Alternate exterior angles formed by parallel lines are congruent (both are obtuse angles here).',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint: 'Since alternate exterior angles are congruent, m∠8 is equal to 132°.',
        hasVariableX: false,
        targetAngleLabel: 'm∠8',
        correctAngleMeasure: 132,
        angleHint: 'Alternate exterior angles have the exact same measure.',
        justification: `∠1 and ∠8 are Alternate Exterior Angles, which are congruent when lines are parallel. Therefore, m∠8 = m∠1 = 132°.`,
        verificationSummary: `m∠1 = 132° and m∠8 = 132° (Congruent ✔)`,
      };
    },

    // 6. Vertical Angles - Algebraic (2 expressions, Congruent)
    () => {
      const x = 12;
      // ∠2 = (5x + 8)° = 68°, ∠3 = (7x - 16)° = 68°
      const exprA = formatLinearExpr(5, 8);
      const exprB = formatLinearExpr(7, -16);
      const eq = shuffleWithCorrect(`${exprA} = ${exprB}`, [
        `(${exprA}) + (${exprB}) = 180`,
        `(${exprB}) - (${exprA}) = 180`,
        `(${exprA}) + (${exprB}) = 90`,
      ]);
      return {
        id: 's1-vert-alg-1',
        station: 'station-1',
        stationBadge: 'Station 1 · 7.1 Transversal Explorer',
        problemTypeBadge: 'Two Variable Expressions · Congruent',
        title: 'Vertical Angles at an Intersection',
        prompt:
          'Look at ∠2 and ∠3 across from each other at the top intersection. Identify their relationship, select the equation, solve for x, and find m∠3.',
        diagram: {
          kind: 'transversal',
          angleAIndex: 2,
          angleBIndex: 3,
          labelA: `(${exprA})°`,
          labelB: `(${exprB})°`,
          obtuseDeg: 112,
          targetPromptLabel: 'm∠3',
        },
        relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Vertical Angles',
        relationshipHint:
          '∠2 and ∠3 are directly opposite each other where line l and transversal t intersect (forming an X).',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Congruent (Measures are EQUAL)',
        ruleHint: 'Vertical angles are always congruent—their measures are equal.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint: 'Because vertical angles are equal, set 5x + 8 equal to 7x - 16.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Subtract 5x from both sides (8 = 2x - 16), add 16 to both sides (24 = 2x), and divide by 2.',
        targetAngleLabel: 'm∠3',
        correctAngleMeasure: 68,
        angleHint: 'Substitute x = 12 into (7x - 16)°: 7(12) - 16.',
        justification: `∠2 and ∠3 are Vertical Angles, so 5x + 8 = 7x - 16 → 2x = 24 → x = 12. Substituting x = 12 gives m∠3 = 7(12) - 16 = 68°.`,
        verificationSummary: `m∠2 = 5(12) + 8 = 68° and m∠3 = 7(12) - 16 = 68° (Congruent ✔)`,
      };
    },
  ];

  const pool = templates.map((fn) => fn());
  const filtered = excludeId ? pool.filter((c) => c.id !== excludeId) : pool;
  return filtered[Math.floor(Math.random() * filtered.length)] || pool[0];
}

export function generateStation2Challenge(excludeId?: string): LabChallenge {
  const templates: (() => LabChallenge)[] = [
    // 1. Exterior Angle Theorem - Numerical
    () => {
      const degA = 54;
      const degB = 72;
      const degExt = degA + degB; // 126
      const degC = 180 - degExt; // 54
      const eq = shuffleWithCorrect(`m∠ACD = 54 + 72`, [
        `54 + 72 + m∠ACD = 180`,
        `m∠ACD = 72 - 54`,
        `m∠ACD + 72 = 54`,
      ]);
      return {
        id: 's2-ext-num-1',
        station: 'station-2',
        stationBadge: 'Station 2 · 7.2 Triangle Theorems Lab',
        problemTypeBadge: 'Numbers Only · Exterior Angle Theorem',
        title: 'Exterior Angle Theorem (Numerical)',
        prompt:
          'In △ABC, side BC is extended to form exterior angle ∠ACD. Given remote interior angles m∠A = 54° and m∠B = 72°, determine the relationship and find m∠ACD.',
        diagram: {
          kind: 'triangle',
          showExterior: true,
          labelA: '54°',
          labelB: '72°',
          labelC: '',
          labelExt: '?°',
          degA,
          degB,
          degC,
          degExt,
          highlightedRoles: ['A', 'B', 'EXT'],
          targetRole: 'EXT',
        },
        relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
        correctRelationship:
          'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)',
        relationshipHint:
          '∠ACD is outside the triangle on the extended side, and ∠A and ∠B are the two remote interior angles farthest from it.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Exterior Angle = Remote Interior 1 + Remote Interior 2',
        ruleHint:
          'By the Exterior Angle Theorem, the measure of an exterior angle equals the sum of its two remote interior angles.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'Add the two remote interior angles (54° and 72°) to equal the exterior angle ∠ACD. Do not add all three to 180°!',
        hasVariableX: false,
        targetAngleLabel: 'm∠ACD',
        correctAngleMeasure: degExt,
        angleHint: 'Add the two remote interior angles: 54° + 72°.',
        justification: `By the Exterior Angle Theorem, m∠ACD = m∠A + m∠B = 54° + 72° = 126°.`,
        verificationSummary: `Remote Interior Sum: 54° + 72° = 126° = m∠ACD ✔`,
      };
    },

    // 2. Exterior Angle Theorem - Algebraic (Solve for x and remote angle)
    () => {
      const x = 16;
      // ∠A = (3x + 10)° = 58°, ∠B = (4x + 4)° = 68°, Ext = 126°
      const exprA = formatLinearExpr(3, 10);
      const exprB = formatLinearExpr(4, 4);
      const degA = 58;
      const degB = 68;
      const degExt = 126;
      const degC = 54;
      const eq = shuffleWithCorrect(`(${exprA}) + (${exprB}) = 126`, [
        `(${exprA}) + (${exprB}) + 126 = 180`,
        `${exprA} = ${exprB}`,
        `126 - (${exprA}) = 180`,
      ]);
      return {
        id: 's2-ext-alg-1',
        station: 'station-2',
        stationBadge: 'Station 2 · 7.2 Triangle Theorems Lab',
        problemTypeBadge: 'Two Variable Expressions · Exterior Angle Theorem',
        title: 'Exterior Angle Theorem with Algebraic Expressions',
        prompt:
          'Examine △ABC with exterior angle m∠ACD = 126° and remote interior angles m∠A = (3x + 10)° and m∠B = (4x + 4)°. Select the correct equation, solve for x, and find m∠B.',
        diagram: {
          kind: 'triangle',
          showExterior: true,
          labelA: `(${exprA})°`,
          labelB: `(${exprB})°`,
          labelC: '',
          labelExt: '126°',
          degA,
          degB,
          degC,
          degExt,
          highlightedRoles: ['A', 'B', 'EXT'],
          targetRole: 'B',
        },
        relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
        correctRelationship:
          'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)',
        relationshipHint:
          'Compare the outside exterior angle (126°) with the two non-adjacent interior angles ∠A and ∠B.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Exterior Angle = Remote Interior 1 + Remote Interior 2',
        ruleHint:
          'The exterior angle (126°) equals the sum of the two remote interior angles ∠A and ∠B.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint:
          'Set the sum of the two remote interior expressions equal to the exterior angle 126°: (3x + 10) + (4x + 4) = 126.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Combine like terms: 7x + 14 = 126. Subtract 14 (7x = 112) and divide by 7.',
        targetAngleLabel: 'm∠B',
        correctAngleMeasure: degB,
        angleHint: `Substitute x = ${x} into m∠B = (4x + 4)°: 4(${x}) + 4.`,
        justification: `By the Exterior Angle Theorem, (3x + 10) + (4x + 4) = 126 → 7x + 14 = 126 → 7x = 112 → x = 16. Substituting x = 16 into ∠B gives 4(16) + 4 = 68°.`,
        verificationSummary: `m∠A = 58°, m∠B = 68°, and 58° + 68° = 126° = m∠ACD ✔`,
      };
    },

    // 3. Exterior Angle Theorem - Find Remote Interior When Exterior Has Variable
    () => {
      const x = 15;
      // ∠A = 49°, ∠B = (3x + 12)° = 57°, ∠Ext = (7x + 1)° = 106°
      const exprB = formatLinearExpr(3, 12);
      const exprExt = formatLinearExpr(7, 1);
      const degA = 49;
      const degB = 57;
      const degExt = 106;
      const degC = 74;
      const eq = shuffleWithCorrect(`49 + (${exprB}) = ${exprExt}`, [
        `49 + (${exprB}) + (${exprExt}) = 180`,
        `${exprB} = ${exprExt}`,
        `(${exprExt}) + 49 = ${exprB}`,
      ]);
      return {
        id: 's2-ext-alg-2',
        station: 'station-2',
        stationBadge: 'Station 2 · 7.2 Triangle Theorems Lab',
        problemTypeBadge: 'Variable on Both Sides · Exterior Angle',
        title: 'Exterior Angle Equation with Variables on Both Sides',
        prompt:
          'In △ABC, m∠A = 49°, m∠B = (3x + 12)°, and exterior angle m∠ACD = (7x + 1)°. Identify the relationship, choose the equation, solve for x, and find the exterior angle m∠ACD.',
        diagram: {
          kind: 'triangle',
          showExterior: true,
          labelA: '49°',
          labelB: `(${exprB})°`,
          labelC: '',
          labelExt: `(${exprExt})°`,
          degA,
          degB,
          degC,
          degExt,
          highlightedRoles: ['A', 'B', 'EXT'],
          targetRole: 'EXT',
        },
        relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
        correctRelationship:
          'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)',
        relationshipHint:
          '∠A and ∠B are the two remote interior angles, and ∠ACD is the exterior angle.',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Exterior Angle = Remote Interior 1 + Remote Interior 2',
        ruleHint:
          'Add the two remote interior angles and set them equal to the exterior angle.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint: 'Remote Interior 1 + Remote Interior 2 = Exterior Angle → 49 + (3x + 12) = 7x + 1.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Simplify the left side: 3x + 61 = 7x + 1 → 60 = 4x → x = 15.',
        targetAngleLabel: 'm∠ACD',
        correctAngleMeasure: degExt,
        angleHint: 'Substitute x = 15 into (7x + 1)°: 7(15) + 1.',
        justification: `By the Exterior Angle Theorem, 49 + (3x + 12) = 7x + 1 → 3x + 61 = 7x + 1 → 4x = 60 → x = 15. Then m∠ACD = 7(15) + 1 = 106°.`,
        verificationSummary: `m∠A + m∠B = 49° + 57° = 106° = m∠ACD ✔`,
      };
    },

    // 4. Triangle Sum Theorem in Station 2 (Interior Angles)
    () => {
      const x = 11;
      // ∠A = 64°, ∠B = (5x - 3)° = 52°, ∠C = (6x - 2)° = 64°
      const exprB = formatLinearExpr(5, -3);
      const exprC = formatLinearExpr(6, -2);
      const eq = shuffleWithCorrect(`64 + (${exprB}) + (${exprC}) = 180`, [
        `(${exprB}) + (${exprC}) = 64`,
        `${exprB} = ${exprC}`,
        `64 + (${exprB}) = ${exprC}`,
      ]);
      return {
        id: 's2-trisum-alg-1',
        station: 'station-2',
        stationBadge: 'Station 2 · 7.2 Triangle Theorems Lab',
        problemTypeBadge: 'Triangle Sum Theorem · Algebraic',
        title: 'Triangle Sum Theorem with Interior Angles',
        prompt:
          'All three angles shown are INSIDE △ABC: m∠A = 64°, m∠B = (5x - 3)°, and m∠ACB = (6x - 2)°. Identify the relationship, select the equation, solve for x, and find m∠B.',
        diagram: {
          kind: 'triangle',
          showExterior: false,
          labelA: '64°',
          labelB: `(${exprB})°`,
          labelC: `(${exprC})°`,
          degA: 64,
          degB: 52,
          degC: 64,
          degExt: 116,
          highlightedRoles: ['A', 'B', 'C'],
          targetRole: 'B',
        },
        relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
        correctRelationship: 'Triangle Interior Angles (Triangle Sum Theorem)',
        relationshipHint: 'All three labeled angles are inside the triangle (interior angles).',
        ruleOptions: ALL_RULE_OPTIONS,
        correctRule: 'Triangle Sum (3 Interior Angles ADD to 180°)',
        ruleHint: 'The three interior angles of any triangle always sum to 180°.',
        equationOptions: eq.options,
        correctEquationIndex: eq.correctIndex,
        equationHint: 'Add all three interior angles and set their sum equal to 180°.',
        hasVariableX: true,
        correctX: x,
        xHint: 'Combine like terms: 64 + 5x - 3 + 6x - 2 = 180 → 11x + 59 = 180 → 11x = 121.',
        targetAngleLabel: 'm∠B',
        correctAngleMeasure: 52,
        angleHint: 'Substitute x = 11 into (5x - 3)°: 5(11) - 3.',
        justification: `By the Triangle Sum Theorem, 64 + (5x - 3) + (6x - 2) = 180 → 11x + 59 = 180 → x = 11. Substituting x = 11 gives m∠B = 5(11) - 3 = 52°.`,
        verificationSummary: `64° + 52° + 64° = 180° (Triangle Sum ✔)`,
      };
    },
  ];

  const pool = templates.map((fn) => fn());
  const filtered = excludeId ? pool.filter((c) => c.id !== excludeId) : pool;
  return filtered[Math.floor(Math.random() * filtered.length)] || pool[0];
}

export function generateStation3Challenge(
  forcedSubType?: 'type-a' | 'type-b' | 'type-c' | 'type-d',
  excludeId?: string
): LabChallenge {
  const typeA = (): LabChallenge => {
    // TYPE A — NUMBERS ONLY
    const degA = 48;
    const degB = 67;
    const degC = 65; // 48 + 67 + 65 = 180
    const eq = shuffleWithCorrect(`48 + 67 + m∠C = 180`, [
      `48 + 67 = m∠C`,
      `67 - 48 = m∠C`,
      `48 + 67 + m∠C = 90`,
    ]);
    return {
      id: 's3-type-a-num',
      station: 'station-3',
      stationBadge: 'Station 3 · 7.3 Triangle Equations Lab',
      problemTypeBadge: 'Type A · Numbers Only',
      title: 'Type A: Finding a Missing Interior Angle (Numbers Only)',
      prompt:
        'In △ABC, m∠A = 48° and m∠B = 67°. Identify the relationship, choose the equation that represents all three interior angles, and find m∠C.',
      diagram: {
        kind: 'triangle',
        showExterior: false,
        labelA: '48°',
        labelB: '67°',
        labelC: '?°',
        degA,
        degB,
        degC,
        degExt: degA + degB,
        highlightedRoles: ['A', 'B', 'C'],
        targetRole: 'C',
      },
      relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
      correctRelationship: 'Triangle Interior Angles (Triangle Sum Theorem)',
      relationshipHint: '∠A, ∠B, and ∠C are the three interior angles of △ABC.',
      ruleOptions: ALL_RULE_OPTIONS,
      correctRule: 'Triangle Sum (3 Interior Angles ADD to 180°)',
      ruleHint: 'Remember that the three interior angles of every triangle total 180°.',
      equationOptions: eq.options,
      correctEquationIndex: eq.correctIndex,
      equationHint: 'The sum of all three interior angles equals 180°: 48 + 67 + m∠C = 180.',
      hasVariableX: false,
      targetAngleLabel: 'm∠C',
      correctAngleMeasure: degC,
      angleHint: 'Add 48 + 67 = 115, then subtract 180 - 115.',
      justification: `48° + 67° + 65° = 180°. Therefore m∠C = 65°. (Using the Triangle Sum Theorem: 48° + 67° + m∠C = 180° → 115° + m∠C = 180° → m∠C = 65°.)`,
      verificationSummary: `48° + 67° + 65° = 180° — Therefore m∠C = 65° ✔`,
    };
  };

  const typeB = (): LabChallenge => {
    // TYPE B — NUMBER + VARIABLE EXPRESSION
    // Angle A = 55°, Angle B = (2x + 5)°, Angle C = 65° -> x = 27.5? Wait: let's make x an exact integer!
    // Wait: in the prompt example: 55 + (2x + 5) + 65 = 180 -> 2x + 125 = 180 ->let's use Angle A = 50°, Angle B = (2x + 5)°, Angle C = 65° so 50 + (2x + 5) + 65 = 180 -> 2x + 120 = 180 -> x = 30, Angle B = 65°!
    const x = 30;
    const degA = 50;
    const degB = 65; // 2(30) + 5 = 65
    const degC = 65;
    const eq = shuffleWithCorrect(`50 + (2x + 5) + 65 = 180`, [
      `2x + 5 = 50 + 65`,
      `50 + 65 - (2x + 5) = 180`,
      `2x + 5 = 65`,
    ]);
    return {
      id: 's3-type-b-one-var',
      station: 'station-3',
      stationBadge: 'Station 3 · 7.3 Triangle Equations Lab',
      problemTypeBadge: 'Type B · Number + Variable Expression',
      title: 'Type B: One Variable Expression in a Triangle',
      prompt:
        'In △ABC, m∠A = 50°, m∠B = (2x + 5)°, and m∠C = 65°. Construct the Triangle Sum equation, solve for x, and substitute x to find the actual measure of ∠B.',
      diagram: {
        kind: 'triangle',
        showExterior: false,
        labelA: '50°',
        labelB: '(2x + 5)°',
        labelC: '65°',
        degA,
        degB,
        degC,
        degExt: degA + degB,
        highlightedRoles: ['A', 'B', 'C'],
        targetRole: 'B',
      },
      relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
      correctRelationship: 'Triangle Interior Angles (Triangle Sum Theorem)',
      relationshipHint: 'All three angles are interior angles inside △ABC.',
      ruleOptions: ALL_RULE_OPTIONS,
      correctRule: 'Triangle Sum (3 Interior Angles ADD to 180°)',
      ruleHint: 'The three interior angles of a triangle always add up to 180°.',
      equationOptions: eq.options,
      correctEquationIndex: eq.correctIndex,
      equationHint: 'Add all three interior angle measures together and set the total equal to 180°.',
      hasVariableX: true,
      correctX: x,
      xHint: 'Combine the constants: 50 + 5 + 65 = 120, so 2x + 120 = 180. Subtract 120 and divide by 2.',
      targetAngleLabel: 'm∠B',
      correctAngleMeasure: degB,
      angleHint: 'Remember that x = 30 is not the angle measure! Substitute x = 30 into (2x + 5)°: 2(30) + 5.',
      justification: `By the Triangle Sum Theorem, 50 + (2x + 5) + 65 = 180 → 2x + 120 = 180 → 2x = 60 → x = 30. Substituting x = 30 into (2x + 5)° gives m∠B = 2(30) + 5 = 65°.`,
      verificationSummary: `50° + 65° + 65° = 180° (Triangle Sum ✔)`,
    };
  };

  const typeC = (): LabChallenge => {
    // TYPE C — TWO VARIABLE EXPRESSIONS
    // Prompt example: Angle A = (2x + 10)°, Angle B = (3x + 5)°, Angle C = 45°
    // (2x + 10) + (3x + 5) + 45 = 180 -> 5x + 60 = 180 -> 5x = 120 -> x = 24!
    // Angle A = 2(24) + 10 = 58°, Angle B = 3(24) + 5 = 77°, Angle C = 45° -> 58 + 77 + 45 = 180°!
    const x = 24;
    const degA = 58;
    const degB = 77;
    const degC = 45;
    const eq = shuffleWithCorrect(`(2x + 10) + (3x + 5) + 45 = 180`, [
      `2x + 10 = 3x + 5`,
      `(2x + 10) + (3x + 5) = 45`,
      `(2x + 10) + (3x + 5) = 180`,
    ]);
    return {
      id: 's3-type-c-two-vars',
      station: 'station-3',
      stationBadge: 'Station 3 · 7.3 Triangle Equations Lab',
      problemTypeBadge: 'Type C · Two Variable Expressions',
      title: 'Type C: Two Variable Expressions in a Triangle',
      prompt:
        'In △ABC, m∠A = (2x + 10)°, m∠B = (3x + 5)°, and m∠C = 45°. Build the equation, solve for x, and find BOTH m∠A and m∠B to verify that all three angles total 180°.',
      diagram: {
        kind: 'triangle',
        showExterior: false,
        labelA: '(2x + 10)°',
        labelB: '(3x + 5)°',
        labelC: '45°',
        degA,
        degB,
        degC,
        degExt: degA + degB,
        highlightedRoles: ['A', 'B', 'C'],
        targetRole: 'A',
      },
      relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
      correctRelationship: 'Triangle Interior Angles (Triangle Sum Theorem)',
      relationshipHint: 'All three angles (2x + 10)°, (3x + 5)°, and 45° are interior angles of △ABC.',
      ruleOptions: ALL_RULE_OPTIONS,
      correctRule: 'Triangle Sum (3 Interior Angles ADD to 180°)',
      ruleHint: 'All three interior angles must be added together to equal 180°.',
      equationOptions: eq.options,
      correctEquationIndex: eq.correctIndex,
      equationHint: 'Include all three interior angles in the sum: (2x + 10) + (3x + 5) + 45 = 180.',
      hasVariableX: true,
      correctX: x,
      xHint: 'Combine like terms: (2x + 3x) + (10 + 5 + 45) = 180 → 5x + 60 = 180 → 5x = 120.',
      targetAngleLabel: 'm∠A',
      correctAngleMeasure: degA,
      secondaryAngleLabel: 'm∠B',
      correctSecondaryAngleMeasure: degB,
      angleHint: 'Substitute x = 24 into m∠A = 2(24) + 10 and m∠B = 3(24) + 5.',
      justification: `Combining like terms in (2x + 10) + (3x + 5) + 45 = 180 gives 5x + 60 = 180 → 5x = 120 → x = 24. Then m∠A = 2(24) + 10 = 58° and m∠B = 3(24) + 5 = 77°.`,
      verificationSummary: `58° + 77° + 45° = 180° (All three interior angles verified ✔)`,
    };
  };

  const typeD = (): LabChallenge => {
    // TYPE D — FIND AN ANGLE WHERE x IS AN INTERMEDIATE STEP (OR FIND ADJACENT INTERIOR ANGLE C FROM EXTERIOR ANGLE EQUATION)
    // Remote ∠A = (3x + 4)° = 46°, Remote ∠B = 62°, Exterior ∠ACD = (7x + 10)° = 108° (x = 14)
    // Question asks for INTERIOR angle m∠ACB (which does NOT contain x directly: m∠ACB = 180° - 108° = 72°)!
    const x = 14;
    const degA = 46; // 3(14) + 4 = 46
    const degB = 62;
    const degExt = 108; // 7(14) + 10 = 108
    const degC = 72; // 180 - 108 = 72
    const eq = shuffleWithCorrect(`(3x + 4) + 62 = 7x + 10`, [
      `(3x + 4) + 62 + (7x + 10) = 180`,
      `3x + 4 = 7x + 10`,
      `(7x + 10) + 62 = 180`,
    ]);
    return {
      id: 's3-type-d-intermediate-x',
      station: 'station-3',
      stationBadge: 'Station 3 · 7.3 Triangle Equations Lab',
      problemTypeBadge: 'Type D · Multi-Step Target Angle (x is Intermediate)',
      title: 'Type D: Finding an Unlabeled Interior Angle After Solving for x',
      prompt:
        'Careful! In △ABC, remote interior angles are m∠A = (3x + 4)° and m∠B = 62°, and exterior angle m∠ACD = (7x + 10)°. First solve for x, then find the interior angle m∠ACB (note: ∠ACB is adjacent to the exterior angle and does not contain x directly!).',
      diagram: {
        kind: 'triangle',
        showExterior: true,
        labelA: '(3x + 4)°',
        labelB: '62°',
        labelC: '?°',
        labelExt: '(7x + 10)°',
        degA,
        degB,
        degC,
        degExt,
        highlightedRoles: ['A', 'B', 'C', 'EXT'],
        targetRole: 'C',
      },
      relationshipOptions: TRIANGLE_RELATIONSHIP_OPTIONS,
      correctRelationship:
        'Exterior Angle & Two Remote Interior Angles (Exterior Angle Theorem)',
      relationshipHint:
        'To find x first, use the relationship between the exterior angle (7x + 10)° and the two remote interior angles (3x + 4)° and 62°.',
      ruleOptions: ALL_RULE_OPTIONS,
      correctRule: 'Exterior Angle = Remote Interior 1 + Remote Interior 2',
      ruleHint:
        'Set the sum of the two remote interior angles equal to the exterior angle.',
      equationOptions: eq.options,
      correctEquationIndex: eq.correctIndex,
      equationHint:
        'Add the two remote interior angles (3x + 4) and 62, and set them equal to the exterior angle (7x + 10).',
      hasVariableX: true,
      correctX: x,
      xHint: 'Simplify (3x + 4) + 62 = 7x + 10 → 3x + 66 = 7x + 10 → 56 = 4x → x = 14.',
      targetAngleLabel: 'Interior m∠ACB',
      correctAngleMeasure: degC,
      angleHint:
        'First find the exterior angle: 7(14) + 10 = 108° (or m∠A = 46°). Then use the straight line (180° - 108°) or Triangle Sum (180° - 46° - 62°) to find interior angle m∠ACB!',
      justification: `Step 1: (3x + 4) + 62 = 7x + 10 → 4x = 56 → x = 14. Step 2: Exterior angle m∠ACD = 7(14) + 10 = 108° (and m∠A = 46°). Step 3: The requested interior angle m∠ACB = 180° - 108° = 72° (or 180° - 46° - 62° = 72°).`,
      verificationSummary: `x = 14 → m∠A = 46°, m∠B = 62°, m∠ACB = 72° → 46° + 62° + 72° = 180° ✔`,
    };
  };

  if (forcedSubType === 'type-a') return typeA();
  if (forcedSubType === 'type-b') return typeB();
  if (forcedSubType === 'type-c') return typeC();
  if (forcedSubType === 'type-d') return typeD();

  const pool = [typeA(), typeB(), typeC(), typeD()];
  const filtered = excludeId ? pool.filter((c) => c.id !== excludeId) : pool;
  return filtered[Math.floor(Math.random() * filtered.length)] || pool[0];
}

// Dynamic / Random Mixed Challenge Generator across ALL 3 Stations
export function generateRandomMixedChallenge(excludeId?: string): LabChallenge {
  // Also include additional dynamically parameterized challenges so students get endless variety
  const dynamicGenerators: (() => LabChallenge)[] = [
    () => generateStation1Challenge(excludeId),
    () => generateStation2Challenge(excludeId),
    () => generateStation3Challenge(undefined, excludeId),
    // Dynamic Parallel Lines Congruent / Supplementary generator
    () => {
      const isSupplementary = Math.random() < 0.5;
      const x = Math.floor(Math.random() * 8) + 10; // integer x in 10..17
      if (!isSupplementary) {
        // Alternate Interior (∠4 and ∠5, both obtuse)
        const m1 = 6;
        const m2 = 4;
        const obtuse = Math.min(145, Math.max(110, m1 * x + 40));
        const b1 = obtuse - m1 * x;
        const b2 = obtuse - m2 * x;
        const exprA = formatLinearExpr(m1, b1);
        const exprB = formatLinearExpr(m2, b2);
        const eq = shuffleWithCorrect(`${exprA} = ${exprB}`, [
          `(${exprA}) + (${exprB}) = 180`,
          `(${exprA}) - (${exprB}) = 180`,
          `(${exprA}) + (${exprB}) = 90`,
        ]);
        return {
          id: `dyn-s1-altint-${x}`,
          station: 'station-1',
          stationBadge: 'Mixed Challenge · 7.1 Parallel Lines',
          problemTypeBadge: 'Two Variable Expressions · Congruent',
          title: 'Parallel Lines: Alternate Interior Angles',
          prompt: `Examine highlighted angles ∠4 and ∠5. Identify their relationship, choose the equation, solve for x, and find m∠5.`,
          diagram: {
            kind: 'transversal',
            angleAIndex: 4,
            angleBIndex: 5,
            labelA: `(${exprA})°`,
            labelB: `(${exprB})°`,
            obtuseDeg: obtuse,
            targetPromptLabel: 'm∠5',
          },
          relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
          correctRelationship: 'Alternate Interior Angles',
          relationshipHint: 'Both ∠4 and ∠5 are inside the parallel lines and on opposite sides of transversal t.',
          ruleOptions: ALL_RULE_OPTIONS,
          correctRule: 'Congruent (Measures are EQUAL)',
          ruleHint: 'Alternate interior angles on parallel lines have equal measures.',
          equationOptions: eq.options,
          correctEquationIndex: eq.correctIndex,
          equationHint: 'Because the angles are congruent, set the two expressions equal to each other.',
          hasVariableX: true,
          correctX: x,
          xHint: `Set ${exprA} = ${exprB} and isolate x.`,
          targetAngleLabel: 'm∠5',
          correctAngleMeasure: obtuse,
          angleHint: `Substitute x = ${x} into (${exprB})°.`,
          justification: `∠4 and ∠5 are Alternate Interior Angles (congruent): ${exprA} = ${exprB} → x = ${x}, so m∠5 = ${obtuse}°.`,
          verificationSummary: `m∠4 = ${obtuse}° and m∠5 = ${obtuse}° (Congruent ✔)`,
        };
      } else {
        // Same-Side Interior (∠3 and ∠5: ∠3 acute, ∠5 obtuse -> sum = 180)
        const acute = 65;
        const obtuse = 115;
        const m1 = 3;
        const m2 = 5;
        const b1 = acute - m1 * x;
        const b2 = obtuse - m2 * x;
        const exprA = formatLinearExpr(m1, b1);
        const exprB = formatLinearExpr(m2, b2);
        const eq = shuffleWithCorrect(`(${exprA}) + (${exprB}) = 180`, [
          `${exprA} = ${exprB}`,
          `(${exprB}) - (${exprA}) = 180`,
          `(${exprA}) + (${exprB}) = 90`,
        ]);
        return {
          id: `dyn-s1-ssi-${x}`,
          station: 'station-1',
          stationBadge: 'Mixed Challenge · 7.1 Parallel Lines',
          problemTypeBadge: 'Two Variable Expressions · Supplementary',
          title: 'Parallel Lines: Same-Side Interior Angles',
          prompt: `Examine highlighted angles ∠3 and ∠5. Identify their relationship, choose the equation, solve for x, and find m∠3.`,
          diagram: {
            kind: 'transversal',
            angleAIndex: 3,
            angleBIndex: 5,
            labelA: `(${exprA})°`,
            labelB: `(${exprB})°`,
            obtuseDeg: obtuse,
            targetPromptLabel: 'm∠3',
          },
          relationshipOptions: TRANSVERSAL_RELATIONSHIP_OPTIONS,
          correctRelationship: 'Same-Side Interior Angles',
          relationshipHint: 'Both ∠3 and ∠5 are inside the parallel lines and on the same side of transversal t.',
          ruleOptions: ALL_RULE_OPTIONS,
          correctRule: 'Supplementary (Measures ADD to 180°)',
          ruleHint: 'One angle is acute and the other is obtuse—same-side interior angles sum to 180°.',
          equationOptions: eq.options,
          correctEquationIndex: eq.correctIndex,
          equationHint: 'Because the angles are supplementary, add both expressions and set the sum equal to 180°.',
          hasVariableX: true,
          correctX: x,
          xHint: `Add (${exprA}) + (${exprB}) = 180, combine like terms (8x + ${b1 + b2} = 180), and solve for x.`,
          targetAngleLabel: 'm∠3',
          correctAngleMeasure: acute,
          angleHint: `Substitute x = ${x} into (${exprA})°.`,
          justification: `∠3 and ∠5 are Same-Side Interior Angles (supplementary): (${exprA}) + (${exprB}) = 180 → x = ${x}, so m∠3 = ${acute}°.`,
          verificationSummary: `m∠3 = ${acute}° + m∠5 = ${obtuse}° = 180° (Supplementary ✔)`,
        };
      }
    },
  ];

  for (let attempt = 0; attempt < 6; attempt++) {
    const pick = dynamicGenerators[Math.floor(Math.random() * dynamicGenerators.length)]();
    if (!excludeId || pick.id !== excludeId) {
      return pick;
    }
  }
  return generateStation1Challenge();
}
