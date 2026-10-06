export type Unit4MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit4SolutionType =
  | 'One Solution'
  | 'No Solution (Parallel Lines)'
  | 'Infinitely Many Solutions (Coincident Lines)';

export type Unit4RepresentationCategory =
  | 'Graph'
  | 'Equations'
  | 'Real-World Verbal Model'
  | 'Table + Equation'
  | 'Table + Table'
  | 'Multiple Representations';

export type Unit4SkillCategory =
  | 'Graphical Solution & Point of Intersection'
  | 'Verify an Ordered Pair / Simultaneous Solution'
  | 'Systems from Equations (Graphical Intersection)'
  | 'Systems in Real-World Contexts & Interpreting Intersection'
  | 'Table + Equation Systems'
  | 'Table + Table Systems'
  | 'Parallel Lines & No Solution'
  | 'Same Line / Coincident Lines & Infinitely Many Solutions';

export interface Unit4StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // 'staar-sys-01' .. 'staar-sys-36'
  representationCategory: Unit4RepresentationCategory;
  solutionType: Unit4SolutionType;
  teks: 'TEKS 8.9A';
  skillCategory: Unit4SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit4MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit4StaarHistoricalSummary {
  unitTitle: string;
  unitSubtitle: string;
  administrationsReviewed: number[];
  teksBreakdown: {
    code: string;
    standardType: 'Supporting';
    description: string;
    frequencySummary: string;
  }[];
  skillCategories: {
    name: Unit4SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_4_STAAR_HISTORICAL_SUMMARY: Unit4StaarHistoricalSummary = {
  unitTitle: 'Unit 4 — Systems of Linear Equations: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions aligned to TEKS 8.9A.',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.9A',
      standardType: 'Supporting',
      description:
        'Identify and verify the values of x and y that simultaneously satisfy two linear equations in the form y = mx + b from the intersections of the graphed equations.',
      frequencySummary:
        'Documented in reviewed released materials; verified released items include 2019 Grade 8 Mathematics (Item 3) and 2022 Grade 8 Mathematics (Item 28).',
    },
  ],
  skillCategories: [
    {
      name: 'Graphical Solution & Point of Intersection',
      description:
        'Identifying the ordered pair (x, y) where two graphed linear equations intersect across Quadrants I, II, IV, on axes, with horizontal lines, and with fractional slopes (One Solution).',
    },
    {
      name: 'Verify an Ordered Pair / Simultaneous Solution',
      description:
        'Testing candidate ordered pairs (x, y) by substitution to verify which values simultaneously satisfy both equations in a linear system.',
    },
    {
      name: 'Systems from Equations (Graphical Intersection)',
      description:
        'Determining the coordinate-plane intersection point (x, y), quadrant location, or target coordinate from two linear equations in y = mx + b form.',
    },
    {
      name: 'Systems in Real-World Contexts & Interpreting Intersection',
      description:
        'Finding the simultaneous solution of two real-world linear models and interpreting the contextual meaning of x, y, and the ordered pair (x, y).',
    },
    {
      name: 'Table + Equation Systems',
      description:
        'Connecting a linear relationship represented by a table of values with a second line given as an equation to determine their point of intersection.',
    },
    {
      name: 'Table + Table Systems',
      description:
        'Analyzing two side-by-side coordinate tables to identify the common ordered pair (x, y) that simultaneously satisfies both linear functions.',
    },
    {
      name: 'Parallel Lines & No Solution',
      description:
        'Recognizing that two linear equations with equal slopes (m₁ = m₂) and different y-intercepts (b₁ ≠ b₂) form parallel lines with 0 points of intersection (No Solution).',
    },
    {
      name: 'Same Line / Coincident Lines & Infinitely Many Solutions',
      description:
        'Recognizing that two equivalent linear equations with identical slopes and identical y-intercepts represent the exact same line with infinitely many solutions.',
    },
  ],
  disclaimers: {
    primaryDisclaimer:
      'The questions in Mr. Pinilla’s Math Lab are original questions and are not official STAAR questions. The STAAR references shown here identify released STAAR items with similar TEKS, mathematical skills, reasoning, structure, or item style that were used as guidance when developing the Math Lab practice bank. Numerical values, wording, diagrams, contexts, answer choices, and/or item formats may differ from the official released STAAR items.',
    classificationDisclaimer:
      'These classifications describe similarity—not question origin. No Math Lab question should be interpreted as an official STAAR question.',
    frequencyDisclaimer:
      'Historical Frequency is based only on publicly released STAAR materials reviewed. It does not represent all STAAR forms administered statewide and does not predict future STAAR questions.',
  },
};

const TEKS_89A_FREQ =
  'Documented in reviewed released materials (Verified released items: 2019 Grade 8 Mathematics Item 3 & 2022 Grade 8 Mathematics Item 28)';

export const UNIT_4_STAAR_REFERENCE_DATA: Unit4StaarQuestionReference[] = [
  // =========================================================================
  // SUBTOPIC 1: GRAPHICAL SYSTEMS (Q1–Q12)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'staar-sys-01',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the ordered-pair solution (x, y) of a system of two linear equations from their graphed point of intersection',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection of Two Linear Equations)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2019 STAAR Item 3 and 2022 STAAR Item 28, where two linear equations are graphed on a coordinate plane and students identify the ordered pair at the point of intersection that simultaneously satisfies both equations.',
    mathLabAdaptation:
      'Original graphed system y = x + 1 and y = -x + 5 intersecting at (2, 3), with coordinate-reversal distractor (3, 2) and y-intercept distractors (0, 1) and (0, 5).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'staar-sys-02',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Identify the ordered pair representing the intersection of two graphed linear equations in Quadrant I',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical System Solution)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2019 STAAR Item 3 and 2022 STAAR Item 28 by requiring students to locate the intersection point of two graphed lines and read its (x, y) coordinates accurately.',
    mathLabAdaptation:
      'Original graphed system y = 2x - 1 and y = -x + 8 intersecting at (3, 5), contrasting against reversed pair (5, 3) and y-intercept (0, 8).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 3,
    questionId: 'staar-sys-03',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the intersection of Line p and Line q from a coordinate graph where one line passes through the origin',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Point of Intersection on a Coordinate Plane)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the core TEKS 8.9A graphical intersection task verified in 2019 Item 3 and 2022 Item 28, distinguishing the shared intersection point from axis intercepts.',
    mathLabAdaptation:
      'Original Line p (y = -2x + 6) and proportional Line q (y = x) intersecting at (2, 2), with axis-intercept distractors (0, 6) and (3, 0).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'staar-sys-04',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the solution of a graphed system of two linear equations with positive and negative y-intercepts',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches the graphical systems task in 2019 Item 3 and 2022 Item 28, where students identify the single ordered pair satisfying both graphed lines.',
    mathLabAdaptation:
      'Original graphed system y = 3x - 2 and y = -x + 6 intersecting at (2, 4), with reversed-coordinate distractor (4, 2) and y-intercepts (0, 6) and (0, -2).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 5,
    questionId: 'staar-sys-05',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Identify the coordinate point on the x-axis that simultaneously satisfies both graphed linear relationships',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the same TEKS 8.9A graphical intersection skill as 2019 Item 3 and 2022 Item 28, located directly on the horizontal x-axis where y = 0.',
    mathLabAdaptation:
      'Original system y = -x + 3 and y = 2x - 6 intersecting on the x-axis at (3, 0), distinguishing the shared x-intercept from y-intercepts (0, 3) and (0, -6).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'staar-sys-06',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the ordered-pair solution of two graphed linear equations where one line has a decimal/fractional slope',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2019 STAAR Item 3 and 2022 STAAR Item 28 by requiring students to read the intersection point of two graphed lines with non-integer and integer slopes.',
    mathLabAdaptation:
      'Original graphed system y = 0.5x + 3 and y = -x + 6 intersecting at (2, 4).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 7,
    questionId: 'staar-sys-07',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Identify the intersection of two lines with opposite-sign slopes from a coordinate grid',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2019 STAAR Item 3 and 2022 STAAR Item 28, where two lines with positive and negative slopes intersect on a coordinate grid.',
    mathLabAdaptation:
      'Original graphed system y = 2x - 5 and y = -x + 4 intersecting at (3, 1), contrasting against reversed coordinates (1, 3) and y-intercepts (0, 4) and (0, -5).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 8,
    questionId: 'staar-sys-08',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine a system solution located in Quadrant II with a negative x-coordinate and positive y-coordinate',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Four-Quadrant Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches the TEKS 8.9A four-quadrant coordinate-plane intersection task assessed in 2019 Item 3 and 2022 Item 28, testing signed coordinates in Quadrant II.',
    mathLabAdaptation:
      'Original graphed system y = x + 4 and y = -2x - 2 intersecting in Quadrant II at (-2, 2), with sign-reversal distractor (2, -2).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 9,
    questionId: 'staar-sys-09',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine a system intersection located on the negative x-axis involving negative coordinate reasoning',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the same TEKS 8.9A graphical intersection skill as 2019 Item 3 and 2022 Item 28 while requiring students to distinguish an x-axis intersection (-2, 0) from a y-axis point (0, -2).',
    mathLabAdaptation:
      'Original graphed system y = 2x + 4 and y = -x - 2 intersecting on the negative x-axis at (-2, 0).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 10,
    questionId: 'staar-sys-10',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the intersection of a horizontal line (y = k) and a slanted line (y = mx + b) on a coordinate plane',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the TEKS 8.9A graphical intersection skill verified in 2019 Item 3 and 2022 Item 28 using the special case where one line is horizontal (y = 3).',
    mathLabAdaptation:
      'Original system with horizontal line y = 3 and slanted line y = 2x - 1 intersecting at (2, 3).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 11,
    questionId: 'staar-sys-11',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine a system solution involving a Quadrant IV intersection with positive x and negative y',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Four-Quadrant Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2019 STAAR Item 3 and 2022 STAAR Item 28 by requiring students to read the signed coordinates of an intersection point in Quadrant IV.',
    mathLabAdaptation:
      'Original graphed system y = -x + 1 and y = 2x - 5 intersecting in Quadrant IV at (2, -1), with reversed-coordinate distractor (-1, 2).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },
  {
    questionNumber: 12,
    questionId: 'staar-sys-12',
    representationCategory: 'Graph',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Graphical Solution & Point of Intersection',
    questionSkill:
      'Determine the intersection of a graphed linear system involving a gentle fractional slope',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2019 STAAR Item 3 and 2022 STAAR Item 28, where students identify the intersection point of two lines with fractional and integer slopes on a coordinate grid.',
    mathLabAdaptation:
      'Original Line r (y = (1/3)x + 1) and Line s (y = -x + 5) intersecting at (3, 2).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verified released-item evidence identified in 2019 (Item 3) and 2022 (Item 28) released administrations reviewed',
  },

  // =========================================================================
  // SUBTOPIC 2: VERIFY / DETERMINE ORDERED-PAIR SOLUTIONS (Q13–Q26)
  // =========================================================================
  {
    questionNumber: 13,
    questionId: 'staar-sys-13',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Identify which ordered pair (x, y) simultaneously satisfies both equations in a linear system',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Verifying Simultaneous Satisfaction)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the verification component of TEKS 8.9A ("identify and verify the values of x and y that simultaneously satisfy two linear equations") without a provided graph, requiring substitution into both equations.',
    mathLabAdaptation:
      'Original system y = 2x + 3 and x + y = 9 where (2, 7) satisfies both equations, while (1, 5) and (4, 5) satisfy only one equation each.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 14,
    questionId: 'staar-sys-14',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Verify which candidate ordered pair satisfies both linear equations simultaneously',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Tests the TEKS 8.9A simultaneous-satisfaction criterion algebraically by substituting candidate pairs (x, y) into both equations.',
    mathLabAdaptation:
      'Original system y = 4x - 5 and 2x + y = 7 satisfied by (2, 3), with coordinate-reversal distractor (3, 2) and single-equation distractors (1, -1) and (0, 7).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 15,
    questionId: 'staar-sys-15',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Test a specific point (2, 4) in two linear equations and explain whether it satisfies both equations simultaneously',
    itemFormat: 'Multiple Choice (Verification & Conceptual Justification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Identifying and Verifying Simultaneous Solutions)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence:Directly targets the "verify the values of x and y that simultaneously satisfy two linear equations" clause of TEKS 8.9A by evaluating a student claim about point (2, 4).',
    mathLabAdaptation:
      'Original system y = -3x + 10 and y = x + 2 verifying that (2, 4) yields 4 = 4 in both equations simultaneously.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verifying simultaneous satisfaction documented in TEKS 8.9A released materials',
  },
  {
    questionNumber: 16,
    questionId: 'staar-sys-16',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Identify the ordered pair that satisfies both a standard-form equation and a slope-intercept equation',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses TEKS 8.9A simultaneous satisfaction by testing ordered pairs across two linear equations.',
    mathLabAdaptation:
      'Original system 3x - y = 5 and y = 2x - 1 satisfied by (4, 7).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 17,
    questionId: 'staar-sys-17',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Identify the ordered-pair solution of a system while eliminating points that satisfy only one of the two lines',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Reinforces the TEKS 8.9A principle that a solution must lie on both lines simultaneously, rejecting single-line distractors.',
    mathLabAdaptation:
      'Original system x + 2y = 14 and y = -2x + 10 where (2, 6) satisfies both, while (4, 5) satisfies only the first equation and (1, 8) satisfies only the second.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 18,
    questionId: 'staar-sys-18',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Identify the ordered pair (x, y) that simultaneously satisfies two linear equations',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses verifying values of x and y that simultaneously satisfy two linear equations.',
    mathLabAdaptation:
      'Original system y = 5x - 4 and 2x + y = 17 satisfied by (3, 11), with reversed distractor (11, 3).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 19,
    questionId: 'staar-sys-19',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Test the point (3, 2) in two linear equations and justify why it is the simultaneous solution to the system',
    itemFormat: 'Multiple Choice (Verification & Justification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Verifying Simultaneous Satisfaction)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the conceptual definition of a system solution under TEKS 8.9A—confirming that substituting x = 3 and y = 2 produces true statements in both equations (2 = 2 and 11 = 11), even though the two right-hand constants differ.',
    mathLabAdaptation:
      'Original system y = -x + 5 and 3x + y = 11 addressing the misconception that both equations must evaluate to the same constant number.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verifying simultaneous satisfaction documented in TEKS 8.9A released materials',
  },
  {
    questionNumber: 20,
    questionId: 'staar-sys-20',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Verify an Ordered Pair / Simultaneous Solution',
    questionSkill:
      'Identify the ordered pair that satisfies two slope-intercept equations involving a decimal coefficient',
    itemFormat: 'Multiple Choice (Ordered-Pair Verification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution in y = mx + b)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses verifying the ordered pair (x, y) that simultaneously satisfies two equations in the form y = mx + b.',
    mathLabAdaptation:
      'Original system y = 0.5x + 3 and y = 2x - 3 satisfied by (4, 5).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair verification aligned to TEKS 8.9A (2019 Item 3, 2022 Item 28)',
  },
  {
    questionNumber: 21,
    questionId: 'staar-sys-21',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine the coordinate point at which the graphs of two linear equations in y = mx + b form intersect',
    itemFormat: 'Multiple Choice (Equations to Intersection Point)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Intersection of Two Linear Equations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects two equations in y = mx + b form to their graphical point of intersection (x, y) by finding or verifying the pair where both outputs are equal.',
    mathLabAdaptation:
      'Original system y = 2x + 1 and y = -3x + 16 intersecting at (3, 7).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining intersection coordinates of two linear equations aligned to TEKS 8.9A',
  },
  {
    questionNumber: 22,
    questionId: 'staar-sys-22',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine the point of intersection for the graphs of two linear equations in y = mx + b form',
    itemFormat: 'Multiple Choice (Equations to Intersection Point)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Point of Intersection)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses identifying the ordered pair (x, y) where two lines in y = mx + b form intersect on a coordinate plane.',
    mathLabAdaptation:
      'Original system y = -x + 8 and y = 3x - 4 intersecting at (3, 5).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining intersection coordinates of two linear equations aligned to TEKS 8.9A',
  },
  {
    questionNumber: 23,
    questionId: 'staar-sys-23',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine the coordinates where the graphs of two linear equations in y = mx + b form cross',
    itemFormat: 'Multiple Choice (Equations to Intersection Point)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Intersection Point)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses determining the simultaneous solution (x, y) where two linear functions in slope-intercept form cross.',
    mathLabAdaptation:
      'Original system y = 4x - 3 and y = x + 6 crossing at (3, 9), with coordinate-reversal distractor (9, 3).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining intersection coordinates of two linear equations aligned to TEKS 8.9A',
  },
  {
    questionNumber: 24,
    questionId: 'staar-sys-24',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine the coordinate-plane intersection of two linear equations involving negative and decimal slopes',
    itemFormat: 'Multiple Choice (Equations to Intersection Point)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Intersection of Linear Equations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses finding and verifying the ordered pair (x, y) that simultaneously satisfies two linear equations in y = mx + b form.',
    mathLabAdaptation:
      'Original system y = -2x + 9 and y = 0.5x - 1 intersecting at (4, 1).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining intersection coordinates of two linear equations aligned to TEKS 8.9A',
  },
  {
    questionNumber: 25,
    questionId: 'staar-sys-25',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine both the coordinate-plane quadrant and the ordered pair of the intersection of two linear equations',
    itemFormat: 'Multiple Choice (Quadrant & Intersection Point)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Four-Quadrant Intersection)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines finding the simultaneous solution (x, y) of two y = mx + b equations with classifying the quadrant location of (+x, -y).',
    mathLabAdaptation:
      'Original system y = x - 5 and y = -2x + 4 intersecting at (3, -2) in Quadrant IV.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Simultaneous solution and coordinate-quadrant reasoning aligned to TEKS 8.9A',
  },
  {
    questionNumber: 26,
    questionId: 'staar-sys-26',
    representationCategory: 'Equations',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems from Equations (Graphical Intersection)',
    questionSkill:
      'Determine specifically the y-coordinate of the point of intersection for two linear equations in y = mx + b form',
    itemFormat: 'Multiple Choice (Targeted Coordinate of Intersection)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Identifying x and y Values at Intersection)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses finding the simultaneous solution (x, y) of two linear equations and isolating the requested y-coordinate rather than selecting the x-coordinate or y-intercept distractors.',
    mathLabAdaptation:
      'Original system y = 3x - 8 and y = -x + 4 intersecting at (3, 1), asking specifically for the y-coordinate 1.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Isolating a specific coordinate of a system solution aligned to TEKS 8.9A',
  },

  // =========================================================================
  // SUBTOPIC 3: REAL-WORLD SYSTEMS (Q27–Q32)
  // =========================================================================
  {
    questionNumber: 27,
    questionId: 'staar-sys-27',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Determine the point of intersection (x, y) of two streaming-service cost equations and interpret the contextual meaning of x (months), y (dollars), and the ordered pair',
    itemFormat: 'Multiple Choice (Real-World System & Contextual Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution in Context)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Connects the TEKS 8.9A intersection of two y = mx + b equations (y = 6x + 12 and y = 9x) to interpreting the simultaneous solution (4, 36) as 4 months and $36 equal total cost.',
    mathLabAdaptation:
      'Original comparison of StreamPass (y = 6x + 12) and CineBox (y = 9x) intersecting at (4, 36), with reversed-unit distractor (36, 4).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Contextual interpretation of the simultaneous solution (x, y) aligned to TEKS 8.9A',
  },
  {
    questionNumber: 28,
    questionId: 'staar-sys-28',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Determine the intersection (x, y) of two linear savings equations and interpret x (weeks) and y (total dollars saved) in context',
    itemFormat: 'Multiple Choice (Real-World System & Contextual Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution in Context)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Assesses finding the point (x, y) that simultaneously satisfies two linear savings models (y = 15x + 40 and y = 20x + 10) and interpreting (6, 130) as equal savings of $130 at 6 weeks.',
    mathLabAdaptation:
      'Original savings system for Liam (y = 15x + 40) and Sophia (y = 20x + 10) intersecting at (6, 130), contrasting against reversed interpretation (130, 6).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Contextual interpretation of the simultaneous solution (x, y) aligned to TEKS 8.9A',
  },
  {
    questionNumber: 29,
    questionId: 'staar-sys-29',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Compare two bicycle-rental linear cost models to determine the rental hours (x) and equal total cost (y) at their intersection',
    itemFormat: 'Multiple Choice (Real-World System Solution)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Satisfaction of Two Linear Equations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Requires finding both coordinates of the simultaneous solution (x = 3 hours, y = $34 total cost) for two linear cost equations in y = mx + b form.',
    mathLabAdaptation:
      'Original electric bike rental comparison between PedalFast (y = 8x + 10) and CityCruiser (y = 10x + 4) meeting at 3 hours and $34.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Simultaneous solution of real-world linear models aligned to TEKS 8.9A',
  },
  {
    questionNumber: 30,
    questionId: 'staar-sys-30',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Determine and interpret the ordered-pair solution (c, a) of a real-world system representing total wristbands sold and total revenue collected',
    itemFormat: 'Multiple Choice (Real-World System & Ordered-Pair Meaning)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Verifying Simultaneous Solutions)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Assesses verifying which ordered pair (c, a) simultaneously satisfies both the quantity equation (c + a = 80) and the revenue equation (4c + 7a = 410) and interpreting each variable in context.',
    mathLabAdaptation:
      'Original school carnival wristband system (c + a = 80 and 4c + 7a = 410) with solution (50, 30) representing 50 child wristbands and 30 adult wristbands.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Verifying and interpreting ordered-pair solutions in context aligned to TEKS 8.9A',
  },
  {
    questionNumber: 31,
    questionId: 'staar-sys-31',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Determine the intersection point (x, y) of two vehicle distance equations and interpret when one truck catches the other in hours and miles',
    itemFormat: 'Multiple Choice (Real-World System & Contextual Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Graphical Intersection Meaning)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Connects the graphical intersection of y = 45x and y = 30x + 30 to its physical meaning—at x = 2 hours, both trucks are at mile marker y = 90.',
    mathLabAdaptation:
      'Original catch-up distance model for Truck Alpha (y = 45x) and Truck Beta (y = 30x + 30) intersecting at (2, 90).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Contextual interpretation of the simultaneous solution (x, y) aligned to TEKS 8.9A',
  },
  {
    questionNumber: 32,
    questionId: 'staar-sys-32',
    representationCategory: 'Real-World Verbal Model',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Systems in Real-World Contexts & Interpreting Intersection',
    questionSkill:
      'Determine the calling minutes (x) and equal total cost (y) that simultaneously satisfy two mobile-plan linear equations',
    itemFormat: 'Multiple Choice (Real-World System Solution)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Solution)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Assesses finding the values of x and y that simultaneously satisfy two decimal-rate linear cost equations in y = mx + b form.',
    mathLabAdaptation:
      'Original prepaid calling comparison between TalkMore (y = 0.10x + 25) and GlobalConnect (y = 0.20x + 15) equal at 100 minutes and $35.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Simultaneous solution of real-world linear models aligned to TEKS 8.9A',
  },

  // =========================================================================
  // SUBTOPIC 4: MULTIPLE REPRESENTATIONS / SPECIAL CASES (Q33–Q36)
  // =========================================================================
  {
    questionNumber: 33,
    questionId: 'staar-sys-33',
    representationCategory: 'Table + Equation',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Table + Equation Systems',
    questionSkill:
      'Compare a linear relationship represented by a table of values with another represented by an equation to determine their point of intersection',
    itemFormat: 'Multiple Choice (Table + Equation System)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Simultaneous Satisfaction)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Applies the TEKS 8.9A simultaneous-satisfaction criterion across two representations by testing which ordered pair (x, y) in Line A’s table also satisfies Line B’s equation y = -x + 7.',
    mathLabAdaptation:
      'Original Line A table [(0, 1), (1, 3), (2, 5), (3, 7)] paired with Line B equation y = -x + 7, intersecting at (2, 5).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Cross-representation simultaneous solution reasoning aligned to TEKS 8.9A',
  },
  {
    questionNumber: 34,
    questionId: 'staar-sys-34',
    representationCategory: 'Multiple Representations',
    solutionType: 'No Solution (Parallel Lines)',
    teks: 'TEKS 8.9A',
    skillCategory: 'Parallel Lines & No Solution',
    questionSkill:
      'Analyze two linear relationships with equal slopes and different y-intercepts to determine that the lines are parallel and have no solution (0 points of intersection)',
    itemFormat: 'Multiple Choice (Equation + Two Points Special Case)',
    comparableReleasedStaar:
      'TEKS 8.9A / 8.4C Special-Case Graphical Systems Reasoning (Parallel Lines / No Simultaneous Solution)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Integrated Skill Evidence: Extends TEKS 8.9A graphical intersection reasoning to the special case where Line 1 (y = 2x + 3) and Line 2 through (0, -1) and (2, 3) share the same slope (m = 2) with different y-intercepts, producing parallel lines that never intersect.',
    mathLabAdaptation:
      'Original comparison of Line 1 (y = 2x + 3) and Line 2 through (0, -1) and (2, 3), contrasting 0 intersections (parallel) against 1 intersection and infinitely many intersections.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.9A conceptual extension (parallel lines / no solution)',
  },
  {
    questionNumber: 35,
    questionId: 'staar-sys-35',
    representationCategory: 'Table + Table',
    solutionType: 'One Solution',
    teks: 'TEKS 8.9A',
    skillCategory: 'Table + Table Systems',
    questionSkill:
      'Analyze a table of coordinate values for two linear functions to identify the common ordered pair (x, y) that solves the system',
    itemFormat: 'Multiple Choice (Dual-Table System)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 3 & 2022 Item 28 (TEKS 8.9A Identifying Values of x and y that Simultaneously Satisfy Two Linear Equations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly assesses the TEKS 8.9A concept of simultaneous satisfaction in tabular form—finding the input x = 3 where both Line J and Line K produce the identical output y = 10.',
    mathLabAdaptation:
      'Original dual-column coordinate table for Line J and Line K sharing the common ordered pair (3, 10), with reversed distractor (10, 3).',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Simultaneous ordered-pair identification aligned to TEKS 8.9A',
  },
  {
    questionNumber: 36,
    questionId: 'staar-sys-36',
    representationCategory: 'Multiple Representations',
    solutionType: 'Infinitely Many Solutions (Coincident Lines)',
    teks: 'TEKS 8.9A',
    skillCategory: 'Same Line / Coincident Lines & Infinitely Many Solutions',
    questionSkill:
      'Recognize that two equivalent linear equations with the same slope and same y-intercept represent the exact same line and have infinitely many points of intersection',
    itemFormat: 'Multiple Choice (Equivalent Equations Special Case)',
    comparableReleasedStaar:
      'TEKS 8.9A Special-Case Graphical Systems Reasoning (Coincident Lines / Infinitely Many Solutions)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Integrated Skill Evidence: Extends TEKS 8.9A graphical intersection reasoning to the special case where y = -2x + 6 and 2x + y = 6 simplify to the exact same slope-intercept equation, meaning the lines coincide and share infinitely many points of intersection.',
    mathLabAdaptation:
      'Original system y = -2x + 6 and 2x + y = 6 contrasting infinitely many points of intersection (same line) against parallel lines (no solution) and single-point intersection distractors.',
    teksFrequency: TEKS_89A_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.9A conceptual extension (coincident lines / infinitely many solutions)',
  },
];
