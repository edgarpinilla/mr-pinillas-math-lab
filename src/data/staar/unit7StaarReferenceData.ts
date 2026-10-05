export type Unit7MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit7SkillCategory =
  | 'Parallel Lines & Transversals'
  | 'Triangle Angle Theorems'
  | 'AA Similarity'
  | 'Integrated Angle Relationships';

export interface Unit7StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // e.g., 'u7-staar-q01'
  round: 1 | 2 | 3;
  lesson: 'Lesson 7.1' | 'Lesson 7.2' | 'Lesson 7.3';
  teks: 'TEKS 8.8D';
  skillCategory: Unit7SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit7MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit7StaarHistoricalSummary {
  teksCode: string;
  teksDescription: string;
  standardType: 'Supporting';
  reportingCategory: 3;
  administrationsReviewed: number[];
  teksIdentifiedYears: number[];
  teksFrequencyLabel: string;
  skillCategories: {
    name: Unit7SkillCategory;
    description: string;
    lessonsCovered: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_7_STAAR_HISTORICAL_SUMMARY: Unit7StaarHistoricalSummary = {
  teksCode: 'TEKS 8.8D',
  teksDescription:
    'Establish facts about the angle sum and exterior angle of triangles, the angles created when parallel lines are cut by a transversal, and the angle-angle criterion for similarity of triangles.',
  standardType: 'Supporting',
  reportingCategory: 3,
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksIdentifiedYears: [2018, 2019, 2021, 2024],
  teksFrequencyLabel: '4 of 8 released administrations reviewed (50%)',
  skillCategories: [
    {
      name: 'Parallel Lines & Transversals',
      description:
        'Corresponding, alternate interior, alternate exterior, same-side interior, vertical, and linear pair angle relationships with numeric and algebraic expressions.',
      lessonsCovered: 'Lesson 7.1',
    },
    {
      name: 'Triangle Angle Theorems',
      description:
        'Triangle Sum Theorem (interior angles sum to 180°) and Exterior Angle Theorem (exterior angle equals the sum of its two remote interior angles).',
      lessonsCovered: 'Lesson 7.2',
    },
    {
      name: 'AA Similarity',
      description:
        'Establishing triangle similarity using the Angle-Angle (AA) criterion and solving for unknown corresponding angles in similar triangles.',
      lessonsCovered: 'Lesson 7.3',
    },
    {
      name: 'Integrated Angle Relationships',
      description:
        'Multi-step geometric synthesis combining parallel line angle pairs, linear pairs, exterior angles, and AA triangle similarity.',
      lessonsCovered: 'Lessons 7.1–7.3 Synthesis',
    },
  ],
  disclaimers: {
    primaryDisclaimer:
      'Mr. Pinilla’s Math Lab questions are original questions and are not official STAAR questions. The STAAR references shown here identify released STAAR items with similar TEKS, mathematical skills, reasoning, structure, or item style that were used as guidance when developing the Math Lab practice bank. Numerical values, wording, diagrams, contexts, answer choices, and/or item formats may differ from the official released STAAR items.',
    classificationDisclaimer:
      'These classifications describe similarity—not question origin. No Math Lab question should be interpreted as an official STAAR question.',
    frequencyDisclaimer:
      'Historical Frequency is based only on publicly released STAAR materials reviewed. It does not represent all STAAR forms administered statewide and does not predict future STAAR questions.',
  },
};

const TEKS_FREQ_TEXT =
  '4 of 8 released administrations reviewed (50%: 2018, 2019, 2021, 2024)';

export const UNIT_7_STAAR_REFERENCE_DATA: Unit7StaarQuestionReference[] = [
  // =========================================================================
  // ROUND 1 (Questions 1–12)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'u7-staar-q01',
    round: 1,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Corresponding Angles on Parallel Lines (Numeric Measure)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2018 STAAR Grade 8 Released (TEKS 8.8D Transversal Item)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Both assess determining an unknown angle measure formed by two parallel lines intersected by a transversal using congruent angle-pair relationships.',
    mathLabAdaptation:
      'Original street-and-bike-trail context with m∠1 = 123° at the top-left intersection and custom distractor set including the 57° supplement.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'u7-staar-q02',
    round: 1,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Same-Side Interior Angles (Supplementary Measure)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2018 & 2021 STAAR Grade 8 Released (TEKS 8.8D Parallel Lines)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Both require recognizing supplementary interior angle pairs between parallel lines cut by a transversal and subtracting from 180°.',
    mathLabAdaptation:
      'Original diagram highlighting same-side interior angles ∠4 = 119° and ∠6 = ?° with targeted congruent vs. supplementary distractors.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 3,
    questionId: 'u7-staar-q03',
    round: 1,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Algebraic Alternate Interior Angles (Solving for x)',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2021 STAAR Grade 8 Released (TEKS 8.8D Algebraic Transversal)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Directly mirrors the released STAAR structure where alternate interior angles on parallel lines are given as a linear binomial and a degree measure to solve for x.',
    mathLabAdaptation:
      'Original expressions m∠3 = (2x + 14)° and m∠6 = 72° adapted for both multiple-choice and 2024–2026 Digital STAAR numeric entry.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'u7-staar-q04',
    round: 1,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Writing Equations from Linear Pairs on a Transversal',
    itemFormat: 'Multiple Choice (Equation Setup)',
    comparableReleasedStaar: 'TEKS 8.8D / 8.8A Released Equation-Setup Pattern (2018, 2021)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Assesses setting up an algebraic equation (sum = 180°) from supplementary adjacent angles along a straight line before solving.',
    mathLabAdaptation:
      'Original linear pair ∠1 = 126° and ∠2 = (3x + 6)° testing equation structure selection rather than numeric computation alone.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Linear Pair & Transversal Equation Setup aligned to TEKS 8.8D released history',
  },
  {
    questionNumber: 5,
    questionId: 'u7-staar-q05',
    round: 1,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Triangle Sum Theorem (Missing Interior Angle)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Triangle Angle Sum Released Item Pattern (2019, 2024)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies the foundational Triangle Sum Theorem (m∠A + m∠B + m∠C = 180°) embedded within TEKS 8.8D triangle reasoning items.',
    mathLabAdaptation:
      'Original triangular support truss context with m∠A = 44° and m∠B = 79°, including the partial-sum distractor 123°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'u7-staar-q06',
    round: 1,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Exterior Angle Theorem (Sum of Remote Interior Angles)',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Exterior Angle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Both present a triangle with one side extended to form an exterior angle and require using the two remote interior angles to determine the exterior angle measure.',
    mathLabAdaptation:
      'Original △ABC with extended side BD and remote interior angles 56° and 69°, formatted for Digital STAAR numeric entry.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Exterior Angle Theorem documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 7,
    questionId: 'u7-staar-q07',
    round: 1,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Algebraic Triangle Sum Theorem (Solving for x)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Triangle Equations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Combines interior triangle angle sum (180°) with solving a two-step linear equation for variable x.',
    mathLabAdaptation:
      'Original △ABC with interior angles 55°, (3x + 5)°, and 60° yielding 3x + 120 = 180.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 8,
    questionId: 'u7-staar-q08',
    round: 1,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Algebraic Exterior Angle Theorem (Solving for x)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Exterior Angle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Directly parallels released STAAR Exterior Angle Theorem items where an algebraic remote interior angle and a numeric remote interior angle equal a given exterior angle.',
    mathLabAdaptation:
      'Original △PQR with m∠P = (2x + 10)°, m∠Q = 54°, and exterior m∠PRS = 118°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Exterior Angle Theorem documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 9,
    questionId: 'u7-staar-q09',
    round: 1,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Identifying Angle-Angle (AA) Similarity Criterion',
    itemFormat: 'Multiple Choice (Conceptual Reasoning)',
    comparableReleasedStaar: 'TEKS 8.8D Released AA Similarity Criterion Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses the third clause of TEKS 8.8D—establishing the Angle-Angle criterion for similarity of triangles using two pairs of congruent corresponding angles.',
    mathLabAdaptation:
      'Original side-by-side triangles △ABC and △DEF sharing 51° and 67° angle pairs with conceptual justification choices.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 10,
    questionId: 'u7-staar-q10',
    round: 1,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Corresponding Angles in Similar Triangles via Triangle Sum',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Released Similar Triangle Angle Transfer Pattern',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Requires finding a missing third interior angle using 180° and transferring that measure to the corresponding vertex of a similar triangle.',
    mathLabAdaptation:
      'Original △ABC ~ △DEF with m∠A = 40° and m∠B = 85° solving for m∠F = 55°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity & Triangle Sum synthesis aligned to TEKS 8.8D',
  },
  {
    questionNumber: 11,
    questionId: 'u7-staar-q11',
    round: 1,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Algebraic Corresponding Angles in Similar Triangles',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Algebraic Angle Congruence Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Connects congruent corresponding angles in similar triangles (△JKL ~ △MNP) to solving a linear equation for x.',
    mathLabAdaptation:
      'Original triangles △JKL and △MNP with m∠K = (3x + 9)° and m∠N = 75°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 12,
    questionId: 'u7-staar-q12',
    round: 1,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Determining Triangle Similarity Using Missing Interior Angles',
    itemFormat: 'Multiple Choice (Informal Geometric Argument)',
    comparableReleasedStaar: 'TEKS 8.8D Released Informal Argument for AA Similarity',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Mirrors STAAR items where two triangles appear to have different given angles until the third angle is calculated via 180° to prove or disprove AA similarity.',
    mathLabAdaptation:
      'Original △ABC (45°, 60°) and △DEF (45°, 75°) where calculating m∠C = 75° establishes two congruent angle pairs.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },

  // =========================================================================
  // ROUND 2 (Questions 13–24)
  // =========================================================================
  {
    questionNumber: 13,
    questionId: 'u7-staar-q13',
    round: 2,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Corresponding Angles with Variables on Both Sides (Finding Angle Measure)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2018 & 2021 STAAR Grade 8 Released (TEKS 8.8D / 8.8C Multi-Step)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Matches released STAAR transversal items where both highlighted angles contain variable x on both sides of the equation and students must substitute x back to find the degree measure.',
    mathLabAdaptation:
      'Original corresponding angles m∠1 = (6x - 10)° and m∠5 = (4x + 30)° where x = 20 is included as a distractor for m∠5 = 110°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 14,
    questionId: 'u7-staar-q14',
    round: 2,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Same-Side Interior Angles Two-Part Equation & Solution',
    itemFormat: 'Multiple Choice (Two-Part Reasoning)',
    comparableReleasedStaar: '2021 STAAR Grade 8 Released (TEKS 8.8D Supplementary Transversal)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Assesses setting the sum of two algebraic consecutive interior angles equal to 180° and solving for x.',
    mathLabAdaptation:
      'Original same-side interior expressions m∠3 = (3x + 7)° and m∠5 = (5x + 13)° paired with both the setup equation and x = 20.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 15,
    questionId: 'u7-staar-q15',
    round: 2,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Alternate Exterior Angles with Variables on Both Sides',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2018 & 2021 STAAR Grade 8 Released (TEKS 8.8D Exterior Transversal)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Directly parallels released STAAR items requiring students to equate alternate exterior angle expressions and substitute x to compute the angle measure.',
    mathLabAdaptation:
      'Original alternate exterior angles m∠2 = (4x - 7)° and m∠7 = (2x + 25)° formatted for Digital STAAR numeric entry (57°).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 16,
    questionId: 'u7-staar-q16',
    round: 2,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Vertical Angles with Variables on Both Sides',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D / 8.8C Intersecting Lines & Vertical Angles Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Uses vertical angle congruence at a transversal intersection with linear expressions on both sides to solve for x and the angle measure.',
    mathLabAdaptation:
      'Original vertical angles m∠1 = (5x + 14)° and m∠4 = (7x - 18)° yielding x = 16 and 94°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 17,
    questionId: 'u7-staar-q17',
    round: 2,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Triangle Sum Theorem with Multiple Algebraic Angles (Substitute for Measure)',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Multi-Step Triangle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Matches released STAAR triangle items where multiple interior angles are algebraic expressions and students must solve for x and substitute back to find a specific angle measure.',
    mathLabAdaptation:
      'Original △ABC with m∠A = (3x + 6)°, m∠B = (2x + 9)°, and m∠C = 55° asking for m∠A = 72° (with x = 22 and m∠B = 53° as distractors).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 18,
    questionId: 'u7-staar-q18',
    round: 2,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Exterior Angle Theorem Equation Setup & Solution',
    itemFormat: 'Multiple Choice (Two-Part Reasoning)',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Exterior Angle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Directly reflects released STAAR items testing whether students equate the sum of two algebraic remote interior angles to the exterior angle rather than setting all three equal to 180°.',
    mathLabAdaptation:
      'Original △ABC with remote interior angles (3x - 4)° and (2x + 16)° and exterior angle 132°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Exterior Angle Theorem documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 19,
    questionId: 'u7-staar-q19',
    round: 2,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Exterior Angle Theorem Multi-Step Interior Angle Evaluation',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2024 STAAR Grade 8 Released (TEKS 8.8D Digital Exterior Angle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Mirrors 2024 Digital STAAR multi-step triangle items where students solve an Exterior Angle Theorem equation for x and substitute x to evaluate one of the remote interior angles.',
    mathLabAdaptation:
      'Original △PQR with m∠P = (2x + 14)°, m∠Q = (3x - 9)°, and exterior m∠PRS = 115°, solving for m∠Q = 57°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Exterior Angle Theorem documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 20,
    questionId: 'u7-staar-q20',
    round: 2,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Connecting Triangle Sum, Linear Pair, and Exterior Angle Theorem',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Triangle Exterior/Interior)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Assesses simultaneous mastery of interior triangle angle sum (180°) and supplementary linear pair / exterior angle relationships at an extended vertex.',
    mathLabAdaptation:
      'Original △ABC with m∠A = 53° and adjacent interior m∠ACB = 68° requiring both m∠B = 59° and m∠ACD = 112°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 21,
    questionId: 'u7-staar-q21',
    round: 2,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'AA Similarity Multi-Step Angle Comparison',
    itemFormat: 'Multiple Choice (Conceptual Reasoning)',
    comparableReleasedStaar: 'TEKS 8.8D Released AA Similarity Multi-Step Comparison',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Requires computing an unknown interior angle in the first triangle to verify whether two pairs of corresponding angles match the second triangle.',
    mathLabAdaptation:
      'Original △ABC (47°, 68°) and △DEF (68°, 65°) where m∠C = 65° proves △ABC ~ △DEF.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 22,
    questionId: 'u7-staar-q22',
    round: 2,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Variables on Both Sides in Similar Triangle Corresponding Angles',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D / 8.8C Algebraic Angle Congruence Synthesis',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Synthesizes TEKS 8.8D corresponding angle congruence in similar triangles with solving a linear equation having variables on both sides and substituting for the degree measure.',
    mathLabAdaptation:
      'Original △ABC ~ △DEF with m∠C = (5x - 11)° and m∠F = (3x + 25)° yielding x = 18 and m∠C = 79°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 23,
    questionId: 'u7-staar-q23',
    round: 2,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Justifying Why Two Triangles Are Not Similar (Counterexample Analysis)',
    itemFormat: 'Multiple Choice (Conceptual Justification)',
    comparableReleasedStaar: 'TEKS 8.8D Released Informal Argument / Non-Similarity Justification',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Tests whether students calculate the third interior angle (180° - 55° - 62° = 63°) to prove that two triangles share only one pair of congruent angles instead of two.',
    mathLabAdaptation:
      'Original △JKL (55°, 62°) and △MNP (55°, 68°) where m∠L = 63° ≠ 68°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 24,
    questionId: 'u7-staar-q24',
    round: 2,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Finding Unknown Algebraic Angles Across Similar Triangles',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Multi-Step Similar Triangle Angle Equation',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Combines the Triangle Sum Theorem in △PQR with corresponding angle congruence in △XYZ to solve an algebraic equation for x.',
    mathLabAdaptation:
      'Original △PQR ~ △XYZ with m∠P = 44°, m∠R = 58°, and m∠Y = (4x + 6)° yielding 4x + 6 = 78 → x = 18.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },

  // =========================================================================
  // ROUND 3 (Questions 25–36)
  // =========================================================================
  {
    questionNumber: 25,
    questionId: 'u7-staar-q25',
    round: 3,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Multi-Step Alternate Interior Angles & Linear Pair Synthesis',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2018 & 2021 STAAR Grade 8 Released (TEKS 8.8D Multi-Step Transversal)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Matches high-rigor released STAAR transversal items where students first equate algebraic alternate interior angles to find x and one angle, then use a linear pair (180°) to find the adjacent obtuse angle.',
    mathLabAdaptation:
      'Original parallel rails context with m∠3 = (5x - 12)° and m∠6 = (3x + 24)°, solving for adjacent obtuse angle m∠4 = 102°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 26,
    questionId: 'u7-staar-q26',
    round: 3,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Same-Side Interior Equations & Corresponding Angle Transfer',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2021 STAAR Grade 8 Released (TEKS 8.8D Multi-Step Transversal)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Requires solving a supplementary consecutive-interior equation for x, evaluating m∠6, and transferring the measure to corresponding angle ∠2.',
    mathLabAdaptation:
      'Original expressions m∠4 = (7x - 8)° and m∠6 = (3x + 8)° formatted for Digital STAAR numeric entry (m∠2 = 62°).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 27,
    questionId: 'u7-staar-q27',
    round: 3,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Parallel Lines & Transversals',
    questionSkill: 'Same-Side Exterior Angles Informal Geometric Argument & Solution',
    itemFormat: 'Multiple Choice (Reasoning & Error Analysis)',
    comparableReleasedStaar: 'TEKS 8.8D Released Informal Geometric Argument Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses chained geometric reasoning (corresponding angle + linear pair) to justify why same-side exterior angles are supplementary.',
    mathLabAdaptation:
      'Original exterior angles m∠1 = (6x + 14)° and m∠7 = (4x - 4)° with misconception distractors (congruent vs. complementary vs. supplementary).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 28,
    questionId: 'u7-staar-q28',
    round: 3,
    lesson: 'Lesson 7.1',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Alternate Exterior Angles & Adjacent Acute Linear Pair',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2018 & 2021 STAAR Grade 8 Released (TEKS 8.8D Multi-Step Transversal)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Mirrors released STAAR multi-step transversal items that require solving an alternate-exterior equation for x, finding the obtuse angle, and computing its supplementary adjacent acute angle.',
    mathLabAdaptation:
      'Original expressions m∠1 = (8x - 19)° and m∠8 = (5x + 29)° solving for adjacent acute angle m∠2 = 71°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Parallel Lines & Transversals documented in 2018 & 2021 released administrations reviewed',
  },
  {
    questionNumber: 29,
    questionId: 'u7-staar-q29',
    round: 3,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Three Algebraic Interior Angles & Identifying the Greatest Angle Measure',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Algebraic Triangle Sum)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Assesses setting the sum of three algebraic interior angles equal to 180°, solving for x, and evaluating all three expressions to identify a target angle.',
    mathLabAdaptation:
      'Original △ABC with (2x + 7)°, (3x - 2)°, and (x + 7)° asking for the greatest interior angle measure (82°).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 30,
    questionId: 'u7-staar-q30',
    round: 3,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Exterior Angle Theorem with Variables on Both Sides & Adjacent Interior Angle',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Exterior Angle)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Closely aligns with released STAAR Exterior Angle Theorem items where both the remote interior angles and the exterior angle involve algebraic expressions.',
    mathLabAdaptation:
      'Original △PQR with m∠P = (3x + 8)°, m∠Q = (2x + 11)°, and exterior m∠PRS = (7x - 15)°, adding a final linear-pair step to find adjacent interior m∠PRQ = 76°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Exterior Angle Theorem documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 31,
    questionId: 'u7-staar-q31',
    round: 3,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Exterior Angle Theorem & Positive Difference of Remote Interior Angles',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Multi-Step Exterior Angle Synthesis',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'Extends the TEKS 8.8D Exterior Angle Theorem by asking for the positive difference (m∠A - m∠B) between the two remote interior angles after solving for x.',
    mathLabAdaptation:
      'Original synthesis item with m∠A = (4x - 5)°, m∠B = (2x + 17)°, and exterior m∠ACD = 120° yielding 67° - 53° = 14°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Extension synthesis built on TEKS 8.8D Exterior Angle Theorem',
  },
  {
    questionNumber: 32,
    questionId: 'u7-staar-q32',
    round: 3,
    lesson: 'Lesson 7.2',
    teks: 'TEKS 8.8D',
    skillCategory: 'Triangle Angle Theorems',
    questionSkill: 'Algebraic Isosceles Triangle Angle Verification',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: '2019 & 2024 STAAR Grade 8 Released (TEKS 8.8D Triangle Sum)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Uses the Triangle Sum Theorem with three algebraic expressions to verify both the value of x and all three resulting interior angle measures.',
    mathLabAdaptation:
      'Original △ABC with congruent base angles (3x + 4)°, (3x + 4)°, and vertex angle (2x - 4)° yielding x = 22 and angles 70°, 70°, 40°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Triangle Angle Theorems documented in 2019 & 2024 released administrations reviewed',
  },
  {
    questionNumber: 33,
    questionId: 'u7-staar-q33',
    round: 3,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Multi-Step Algebraic AA Similarity & Third Angle Synthesis',
    itemFormat: 'Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D AA Similarity & Triangle Sum Synthesis',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Integrates solving a variables-on-both-sides equation for corresponding angles in similar triangles with the Triangle Sum Theorem to find the third interior angle.',
    mathLabAdaptation:
      'Original △ABC ~ △DEF with m∠A = m∠D = 46°, m∠B = (5x - 6)°, and m∠E = (3x + 22)°, solving for third angle m∠F = 70°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Integrated AA Similarity & Triangle Sum within TEKS 8.8D',
  },
  {
    questionNumber: 34,
    questionId: 'u7-staar-q34',
    round: 3,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'AA Similarity',
    questionSkill: 'Solving for x to Satisfy the AA Similarity Criterion',
    itemFormat: 'Numeric Entry / Multiple Choice',
    comparableReleasedStaar: 'TEKS 8.8D Algebraic AA Similarity Criterion',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Requires finding a missing interior angle in △MNP (68°) and solving 4x + 4 = 68 so that △JKL ~ △MNP by AA similarity.',
    mathLabAdaptation:
      'Original △JKL and △MNP formatted for Digital STAAR numeric entry (x = 16).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'AA Similarity Criterion assessed within TEKS 8.8D curriculum scope',
  },
  {
    questionNumber: 35,
    questionId: 'u7-staar-q35',
    round: 3,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Informal Geometric Argument for AA Similarity Using Algebraic Triangle Sum',
    itemFormat: 'Multiple Choice (Informal Geometric Argument)',
    comparableReleasedStaar: 'TEKS 8.8D Released Informal Argument & Triangle Sum Synthesis',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Combines algebraic Triangle Sum equation solving in one triangle with evaluating whether the resulting angle measures satisfy the AA similarity criterion with a second triangle.',
    mathLabAdaptation:
      'Original △ABC with (2x + 10)°, (3x)°, and 70° compared against △DEF with 50° and 70°.',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Integrated AA Similarity & Triangle Sum within TEKS 8.8D',
  },
  {
    questionNumber: 36,
    questionId: 'u7-staar-q36',
    round: 3,
    lesson: 'Lesson 7.3',
    teks: 'TEKS 8.8D',
    skillCategory: 'Integrated Angle Relationships',
    questionSkill: 'Cross-Concept Synthesis: Exterior Angle Theorem & AA Similarity',
    itemFormat: 'Multiple Choice (Cross-Concept Synthesis)',
    comparableReleasedStaar: 'TEKS 8.8D Cross-Concept Synthesis (No Single Direct Item)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'Synthesizes two core clauses of TEKS 8.8D—using an exterior angle of △ABC (122°) to find remote interior angle ∠B (64°) and then applying the AA similarity criterion to compare △ABC with △DEF.',
    mathLabAdaptation:
      'Original capstone synthesis problem bridging Lesson 7.2 (Exterior Angle Theorem) and Lesson 7.3 (AA Similarity).',
    teksFrequency: TEKS_FREQ_TEXT,
    questionSkillFrequency:
      'Capstone cross-concept synthesis within TEKS 8.8D',
  },
];
